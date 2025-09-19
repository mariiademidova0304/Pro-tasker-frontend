import TaskItem from "./TaskItem";

export default function TaskList({tasks, onStatusChange, onDelete}){
       
    const taskList = tasks.map((task) =>
        <li key={task._id}>
            <TaskItem task={task} onStatusChange={onStatusChange} onDelete={onDelete}/>
        </li>
    );

    return(
        <ul>
            {taskList}
        </ul>

    )
}