import { useParams } from "react-router-dom";
import useFetchAPI from "../../utils/useFetchAPI";
import TaskList from "../page-elements/tasks/TaskList";
import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../../context/ContextAPI";
import TaskForm from "../page-elements/tasks/TaskForm";
import LogoutButton from "../page-elements/LogoutButton";
import NavigateBackButton from "../page-elements/NavigateBackButton";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default function ProjectDetailsPage() {
    const { projectID } = useParams();
    const [displayingTasks, setDisplayingTasks] = useState([]);
    const [updateError, setUpdateError] = useState(null);
    const [deleteError, setDeleteError] = useState(null);
    const { jwt } = useContext(CurrentUserContext);
    const [editMode, setEditMode] = useState(false);
    const [editedName, setEditedName] = useState('');
    const [editedDescription, setEditedDescription] = useState('');

    ///////////////////SETTING UP PROJECT, TASKS, STATE///////////////////
    //using hook multiple times to avoid the same name we use aliasing
    const { apiData: project, loading: projectLoading, error: projectError } = useFetchAPI(`${import.meta.env.VITE_SERVER_ORIGIN}/api/projects/${projectID}`);
    const { apiData: tasks, loading: tasksLoading, error: tasksError } = useFetchAPI(`${import.meta.env.VITE_SERVER_ORIGIN}/api/projects/${projectID}/tasks`)

    //setting tasks in state for rendering, using useEffect to avoid infinite loops
    useEffect(() => {
        if (tasks) {
            setDisplayingTasks(tasks);
        }
    }, [tasks])

    useEffect(() => {
        if (project) {
            setEditedName(project.name);
            setEditedDescription(project.description);
        }
    }, [project]);

    if (projectLoading || tasksLoading) return <p>Loading ...</p>
    if (projectError) return <p>Error: {projectError.message}</p>;
    if (tasksError) return <p>Error: {tasksError.message}</p>;
    if (project === null) return <p>Project not found</p>

    //////////////////////////////MANIPULATING PROJECT DETAILS///////////////////////////
    const handleProjectSave = async () => {
        setUpdateError(null);
        try {
            const requestOptions = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwt}`
                },
                body: JSON.stringify({
                    'name': editedName,
                    'description': editedDescription
                })
            }
            const response = await fetch(`${import.meta.env.VITE_SERVER_ORIGIN}/api/projects/${projectID}`, requestOptions);
            if (!response.ok) {
                throw new Error(`Error! Status: ${response.status}`);
            }
            const updProject = await response.json();
            setEditedName(updProject.name);
            setEditedDescription(updProject.description);
            setEditMode(false);
            return true;
        } catch (error) {
            setUpdateError(error);
            setEditMode(false);
        }
    }

    const handleProjectCancel = async () => {
        try {
            const responseUpdProject = await fetch(`${import.meta.env.VITE_SERVER_ORIGIN}/api/projects/${projectID}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${jwt}`
                    }
                }
            );
            if (!responseUpdProject.ok) {
                throw new Error(`Error! Status: ${response.status}`);
            }
            const updProject = await responseUpdProject.json();
            setEditedName(updProject.name);
            setEditedDescription(updProject.description);
            setEditMode(false);
        } catch (error) {
            setUpdateError(error);
            setEditMode(false);
        }
    }

    ////////////////////////////////////TASKS MANIPULATION///////////////////////////////////////
    //copied this off lesson example, mapping to set a new state of the tasks where updated task has its new status
    const changeTaskStatus = async (taskId, newStatus) => {
        setUpdateError(null);
        try {
            const requestOptions = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwt}`
                },
                body: JSON.stringify({
                    'status': newStatus
                })
            }
            const response = await fetch(`${import.meta.env.VITE_SERVER_ORIGIN}/api/tasks/${taskId}`, requestOptions);
            if (!response.ok) {
                throw new Error(`Error! Status: ${response.status}`);
            }

            const responseUpdTasks = await fetch(`${import.meta.env.VITE_SERVER_ORIGIN}/api/projects/${projectID}/tasks`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${jwt}`
                    }
                }
            );
            if (!responseUpdTasks.ok) {
                throw new Error(`Error! Status: ${response.status}`);
            }
            const updatedTasks = await responseUpdTasks.json();
            setDisplayingTasks(updatedTasks);
        } catch (error) {
            setUpdateError(error);
        }
    }
    //filtering to a new array that doesn't include a task with delete id 
    const deleteTask = async (taskId) => {
        setDeleteError(null);
        try {
            const requestOptions = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwt}`
                }
            }
            const response = await fetch(`${import.meta.env.VITE_SERVER_ORIGIN}/api/tasks/${taskId}`, requestOptions);
            if (!response.ok) {
                throw new Error(`Error! Status: ${response.status}`);
            }

            const responseUpdTasks = await fetch(`${import.meta.env.VITE_SERVER_ORIGIN}/api/projects/${projectID}/tasks`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${jwt}`
                    }
                }
            );
            if (!responseUpdTasks.ok) {
                throw new Error(`Error! Status: ${response.status}`);
            }
            const updatedTasks = await responseUpdTasks.json();
            setDisplayingTasks(updatedTasks);
        } catch (error) {
            setDeleteError(error);
        }
    }

    const changeTaskDetails = async (taskId, editedTitle, editedDescription) => {
        setUpdateError(null);
        try {
            const requestOptions = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwt}`
                },
                body: JSON.stringify({
                    'title': editedTitle,
                    'description': editedDescription
                })
            }
            const response = await fetch(`${import.meta.env.VITE_SERVER_ORIGIN}/api/tasks/${taskId}`, requestOptions);
            if (!response.ok) {
                throw new Error(`Error! Status: ${response.status}`);
            }

            const responseUpdTasks = await fetch(`${import.meta.env.VITE_SERVER_ORIGIN}/api/projects/${projectID}/tasks`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${jwt}`
                    }
                }
            );
            if (!responseUpdTasks.ok) {
                throw new Error(`Error! Status: ${response.status}`);
            }
            const updatedTasks = await responseUpdTasks.json();
            setDisplayingTasks(updatedTasks);
        } catch (error) {
            setUpdateError(error);
        }
    }

    /////////////////REFRESH AFTER SUBMITTING NEW TASKS/////////////////////////////////
    const handleRefreshTasks = async () => {
        setUpdateError(null);
        try {
            const responseUpdTasks = await fetch(`${import.meta.env.VITE_SERVER_ORIGIN}/api/projects/${projectID}/tasks`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${jwt}`
                    }
                }
            );
            if (!responseUpdTasks.ok) {
                throw new Error(`Error! Status: ${response.status}`);
            }
            const updatedTasks = await responseUpdTasks.json();
            setDisplayingTasks(updatedTasks);
        } catch (error) {
            setUpdateError(error.message)
        }
    }

    return (
        <>
            <TaskForm projectId={projectID} onTaskSubmitted={handleRefreshTasks} />
            {editMode ? (<div>
                <input
                    type="text"
                    id="name"
                    value={editedName}
                    onChange={(event) => setEditedName(event.target.value)}
                    required
                />
                <input
                    type="text"
                    id="description"
                    value={editedDescription}
                    onChange={(event) => setEditedDescription(event.target.value)}
                    required
                />
                <button onClick={handleProjectSave}>Save Changes</button>
                <button onClick={handleProjectCancel}>Cancel</button>
            </div>) : (<Card border="primary">
                <Card.Body>
                    <Card.Title>{editedName}</Card.Title>
                    <Card.Text>{editedDescription}</Card.Text>
                </Card.Body>
                <Button onClick={() => setEditMode(true)}>Edit Project</Button>
            </Card>)}

            {displayingTasks.length > 0 ? <TaskList tasks={displayingTasks || []}
                onStatusChange={changeTaskStatus}
                onDelete={deleteTask}
                onDetailsChange={changeTaskDetails} /> : <p>No tasks found</p>}
            {updateError && <p style={{ color: 'red' }}>{updateError.message}</p>}
            {deleteError && <p style={{ color: 'red' }}>{deleteError.message}</p>}
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
                <LogoutButton /> <NavigateBackButton />
            </div>
        </>
    )

}