import { useParams } from "react-router-dom";
import useFetchAPI from "../../utils/useFetchAPI";
import TaskList from "../page-elements/tasks/TaskList";
import { useEffect, useState } from "react";

export default function ProjectDetailsPage() {
    const { projectID } = useParams();
    const [displayingTasks, setDisplayingTasks] = useState([]);

    //using hook multiple times to avoid the same name we use aliasing
    const { apiData: project, loading: projectLoading, error: projectError } = useFetchAPI(`${import.meta.env.VITE_SERVER_ORIGIN}/api/projects/${projectID}`);
    const { apiData: tasks, loading: tasksLoading, error: tasksError } = useFetchAPI(`${import.meta.env.VITE_SERVER_ORIGIN}/api/projects/${projectID}/tasks`)

    //setting tasks in state for rendering, using useEffect to avoid infinite loops
    useEffect(() => {
        if (tasks) {
            setDisplayingTasks(tasks);
        }
    }, [tasks])

    if (projectLoading || tasksLoading) return <p>Loading ...</p>
    if (projectError) return <p>Error: {projectError.message}</p>;
    if (tasksError) return <p>Error: {tasksError.message}</p>;
    if (project === null) return <p>Project not found</p>

    //copied this off lesson example, mapping to set a new state of the tasks where updated task has its new status
    const changeTaskStatus = async (taskId, newStatus) => {
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
            const updatedTasks = await responseUpdTasks.JSON();
            setDisplayingTasks(updatesTasks);
        }catch(error){
            console.log(error.message);
        }   
    }
    //filtering to a new array that doesn't include a task with delete id 
    const deleteTask = (taskId: string) => {
        setDisplayingTasks(prevDisplayingTasks =>
            prevDisplayingTasks.filter(task => task.id !== taskId)
        )
    }


    return (
        <>
            <h1>{project.name}</h1>
            <p>{project.description}</p>
            {displayingTasks.length > 0 ? <TaskList tasks={tasks} /> : <p>No tasks found</p>}
        </>
    )

}