import TaskItem from "./TaskItem";

//renders list of tasks received from parent
export default function TaskList({tasks, onStatusChange, onDelete, onDetailsChange}){
       
    const taskList = tasks.map((task) =>
        <li key={task._id}>
            <TaskItem task={task} onStatusChange={onStatusChange} onDelete={onDelete} onDetailsChange={onDetailsChange}/>
        </li>
    );

    return(
        <ul style={{ listStyleType: 'none', padding: 0 }}>
            {taskList}
        </ul>

    )
}