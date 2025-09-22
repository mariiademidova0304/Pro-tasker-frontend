import { useState } from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';

//task item component that gets tasks from parent and callbacks for the parent to do something
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
                <Form>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            id="title"
                            value={editedTitle}
                            onChange={(event) => setEditedTitle(event.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type="text"
                            id="description"
                            value={editedDescription}
                            onChange={(event) => setEditedDescription(event.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <select value={task.status} onChange={handleStatusChange}>
                            <option value='To do'>To Do</option>
                            <option value='In progress'>In Progress</option>
                            <option value='Done'>Done</option>
                        </select>
                    </Form.Group>
                    <Form.Group>
                        <ListGroup horizontal>
                            <ListGroup.Item>
                                <Button onClick={handleDetailsChange}>Save Changes</Button>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button variant="danger" onClick={handleCancel}>Cancel</Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Form.Group>
                </Form>
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