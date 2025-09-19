
//const taskSchema = new Schema({
//     title: String,
//     description: String,
//     status: {
//                 enum: ['To do', 'In progress', 'Done']
//     },
//     dueDate: Date,
//     project: {
//         type: Schema.Types.ObjectId,
//         ref: 'Project',
//         required: true
//     }
// });


export default function TaskItem({task, onStatusChange, onDelete}) {

    const handleStatusChange = (event) => {
        const updatedStatus = event.target.value;
        onStatusChange(task._id, updatedStatus);
    }
    
    const deleteTask = () => {
        onDelete(task._id);
    }

    return(
         <main style={{display: 'flex', justifyContent: 'space-between', padding: '10px'}}>
            <div style={{display: 'flex', flexDirection: 'column', gap: '5px'}}>
                <h2>{task.title}</h2>
                <p>{task.description}</p>
                <div>
                    <span>Due date: {task.dueDate}</span>
                </div>
            </div>
            <div style={{display: 'flex', justifyContent:'flex-end',height:'fit-content'}}>
                <select value={task.status} onChange={handleStatusChange}>
                    <option value='To do'>To Do</option>
                    <option value='In Progress'>In Progress</option>
                    <option value='Done'>Done</option>
                </select>
                <button onClick={deleteTask}>Delete</button>
            </div>
        </main>
    )
}