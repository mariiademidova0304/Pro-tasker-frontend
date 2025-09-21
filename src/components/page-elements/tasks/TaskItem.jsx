import { useState } from "react";


export default function TaskItem({task, onStatusChange, onDelete, onDetailsChange}) {
const [editMode, setEditMode] = useState(false);
const [editedTitle, setEditedTitle] = useState(task.title);
const [editedDescription, setEditedDescription] = useState(task.description);

    const handleStatusChange = (event) => {
        const updatedStatus = event.target.value;
        onStatusChange(task._id, updatedStatus);
    }
    
    const handleDeleteTask = () => {
        onDelete(task._id);
    }

    const handleDetailsChange = () => {
        onDetailsChange(task._id, editedTitle, editedDescription)
        setEditMode(false);
    }

    const handleCancel = () => {
        setEditedTitle(task.title);
        setEditedDescription(task.description);
        setEditMode(false);
    }

    return(
         <main style={{display: 'flex', justifyContent: 'space-between', padding: '10px'}}>
              {editMode ? (
                <div>
                <input
                    type="text"
                    id="title"
                    value={editedTitle}
                    onChange={(event) => setEditedTitle(event.target.value)}
                    required
                />
                <input
                    type="text"
                    id="description"
                    value={editedDescription}
                    onChange={(event) => setEditedDescription(event.target.value)}
                    required
                />
                <div style={{display: 'flex', justifyContent:'flex-end',height:'fit-content'}}>
                <select value={task.status} onChange={handleStatusChange}>
                    <option value='To do'>To Do</option>
                    <option value='In progress'>In Progress</option>
                    <option value='Done'>Done</option>
                </select>
                </div>
                <button onClick={handleDetailsChange}>Save Changes</button>
                <button onClick={handleCancel}>Cancel</button>
            </div>
              ) : (<><div style={{display: 'flex', flexDirection: 'column', gap: '5px'}}>
                <p>{task.title}</p>
                <p>{task.description}</p>
                <div>
                    <span>Due date: {task.dueDate}</span>
                </div>
            </div>
            <div style={{display: 'flex', justifyContent:'flex-end',height:'fit-content'}}>
                <select value={task.status} onChange={handleStatusChange}>
                    <option value='To do'>To Do</option>
                    <option value='In progress'>In Progress</option>
                    <option value='Done'>Done</option>
                </select>
                <button onClick={() => setEditMode(true)}>Edit</button>
                <button onClick={handleDeleteTask}>Delete</button>
            </div></>)}
        </main>
    )
}