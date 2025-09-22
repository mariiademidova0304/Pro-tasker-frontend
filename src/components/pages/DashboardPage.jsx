import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../../context/ContextAPI";
import ProjectForm from "../page-elements/projects/ProjectForm";
import ProjectList from "../page-elements/projects/ProjectList";
import useFetchAPI from "../../utils/useFetchAPI";
import Button from "react-bootstrap/esm/Button";
import LogoutButton from "../page-elements/LogoutButton";
import NavigateBackButton from "../page-elements/NavigateBackButton";

export default function DashBoardPage() {
    const { jwt, logout } = useContext(CurrentUserContext);
    const [displayingProjects, setDisplayingProjects] = useState([])
    const { apiData: projects, loading: projectsLoading, error: projectsError } = useFetchAPI(`${import.meta.env.VITE_SERVER_ORIGIN}/api/projects`)
    const [refreshError, setRefreshError] = useState(null);
    const [deleteError, setDeleteError] = useState(null);

    useEffect(() => {
        setDisplayingProjects(projects);
    }, [projects])

    const deleteProject = async (projectId) => {
        setDeleteError(null);
        try {
            const requestOptions = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwt}`
                }
            }
            const response = await fetch(`${import.meta.env.VITE_SERVER_ORIGIN}/api/projects/${projectId}`, requestOptions);
            if (!response.ok) {
                throw new Error(`Error! Status: ${response.status}`);
            }

            const responseUpdProjects = await fetch(`${import.meta.env.VITE_SERVER_ORIGIN}/api/projects`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${jwt}`
                    }
                }
            );
            if (!responseUpdProjects.ok) {
                throw new Error(`Error! Status: ${response.status}`);
            }
            const updProjects = await responseUpdProjects.json();
            setDisplayingProjects(updProjects);
        } catch (error) {
            setDeleteError(error);
        }
    }

    /////////////////REFRESH AFTER SUBMITTING NEW PROJECT/////////////////////////////////
    const handleRefresh = async () => {
        setRefreshError(null);
        try {
            const responseUpdProjects = await fetch(`${import.meta.env.VITE_SERVER_ORIGIN}/api/projects`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${jwt}`
                    }
                }
            );
            if (!responseUpdProjects.ok) {
                throw new Error(`Error! Status: ${response.status}`);
            }
            const updProjects = await responseUpdProjects.json();
            setDisplayingProjects(updProjects);
        } catch (error) {
            setRefreshError(error.message)
        }
    }

    if (projectsLoading) return <p>Loading ...</p>
    if (projectsError) return <p>Error: {projectsError.message}</p>;

    return (
        <div>
             <h1>Welcome!</h1>
        <p>Now you can create projects and add tasks</p>
            <ProjectForm onProjectSubmit={handleRefresh} />
            <ProjectList projects={displayingProjects || []} onDelete={deleteProject} />
            {refreshError && <p style={{ color: 'red' }}>{refreshError}</p>}
            {deleteError && <p style={{ color: 'red' }}>{deleteError.message}</p>}
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
                <LogoutButton /> <NavigateBackButton />
            </div>
        </div>
    )
}