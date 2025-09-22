import { useState } from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';


export default function TaskItem({ task, onStatusChange, onDelete, onDetailsChange }) {
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

    return (
        <main style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
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
                    <div style={{ display: 'flex', justifyContent: 'flex-end', height: 'fit-content' }}>
                        <select value={task.status} onChange={handleStatusChange}>
                            <option value='To do'>To Do</option>
                            <option value='In progress'>In Progress</option>
                            <option value='Done'>Done</option>
                        </select>
                    </div>
                    <button onClick={handleDetailsChange}>Save Changes</button>
                    <button onClick={handleCancel}>Cancel</button>
                </div>
            ) : (<Card>
                <Card.Body>
                    <Card.Title>{task.title}</Card.Title>
                    <Card.Text>{task.description}</Card.Text>
                    <ListGroup horizontal>
                        <ListGroup.Item>
                            <select value={task.status} onChange={handleStatusChange}>
                                <option value='To do'>To Do</option>
                                <option value='In progress'>In Progress</option>
                                <option value='Done'>Done</option>
                            </select>
                        </ListGroup.Item>
                        <ListGroup.Item>Due date: {new Date(task.dueDate).toISOString().substring(0, 10)}</ListGroup.Item>
                        <ListGroup.Item><Button onClick={() => setEditMode(true)}>Edit</Button></ListGroup.Item>
                        <ListGroup.Item><Button variant="danger" onClick={handleDeleteTask}>Delete</Button></ListGroup.Item>
                    </ListGroup>
                </Card.Body>
            </Card>)}
        </main>
    )
}