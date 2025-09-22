import { useState } from "react";
import { useContext } from "react";
import { CurrentUserContext } from "../../../context/ContextAPI";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

//input form for tasks,
export default function TaskForm({ projectId, onTaskSubmitted }) {

    const initialState = {
        title: '',
        description: '',
        status: 'To do',
        dueDate: '',
    }

    const [inputFormData, setInputFormData] = useState(initialState);
    const [titleError, setTitleError] = useState(null);
    const [descriptionError, setDescriptionError] = useState(null);
    const [dueDateError, setDueDateError] = useState(null);
    const { jwt } = useContext(CurrentUserContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    //handling input, removing previous erros, functionally updating input data
    const handleChange = (event) => {
        const { name, value } = event.target;
        if(event.target.name === 'title'){
            setTitleError(null);
        }
        if(event.target.name === 'description'){
            setDescriptionError(null);
        }
        if(event.target.name === 'dueDate'){
            setDueDateError(null);
        }
        //updating the state based off where change was done
        //then linking name to the name in the state and changing value
        setInputFormData(prevInputFormData => ({
            ...prevInputFormData,
            [name]: value
        }))
    }

    //accepting input data, checking it's not empty, setting errors for empty inputs
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);
        if (inputFormData.title.trim() === '') {
            setTitleError('Title can not be empty');
            setLoading(false);
            return false;
        }

        if (inputFormData.description.trim() === '') {
            setDescriptionError('Description can not be empty');
            setLoading(false);
            return false;
        }

        if (!inputFormData.dueDate) {
            setDueDateError('Task must have a due date')
            setLoading(false);
            return false;
        }
        try {
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwt}`
                },
                body: JSON.stringify({
                    'title': inputFormData.title,
                    'description': inputFormData.description,
                    'status': inputFormData.status,
                    'dueDate': inputFormData.dueDate
                })
            }
            const response = await fetch(`${import.meta.env.VITE_SERVER_ORIGIN}/api/projects/${projectId}/tasks`, requestOptions);
            if (!response.ok) {
                throw new Error(`Error! Status: ${response.status}`);
            }
            //running function so the parent will be able to refresh tasks - getting everything from backend
            onTaskSubmitted();
            setInputFormData(initialState);
            return true;
        } catch (error) {
            setLoading(false);
            setError(error);
            return false;
        } finally {
            setLoading(false);
        }

    }


    return (
        <Form onSubmit={handleSubmit} noValidate>
            <Form.Group className="mb-3">
                <Form.Label>Task</Form.Label>
                <Form.Control value={inputFormData.title} type="text" name="title" placeholder="Enter task name" onChange={handleChange} required/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control value={inputFormData.description} type="text" name="description" placeholder="Enter description" onChange={handleChange} required/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Status</Form.Label>
                <Form.Select name="status" id="select-status" value={inputFormData.status} onChange={handleChange}>
                    <option value='To do'>To Do</option>
                    <option value='In progress'>In progress</option>
                    <option value='Done'>Done</option>
                </Form.Select>
            </Form.Group>
            <Form.Group>
                <Form.Label>Due Date</Form.Label>
                <Form.Control value={inputFormData.dueDate} type="date" name="dueDate" id="input-date" onChange={handleChange} required/>
                {loading && <p style={{ color: 'blue' }}>Loading...</p>}
                {error && <p style={{ color: 'red' }}>{error.message}</p>}
                {titleError && <p style={{ color: 'red' }}>{titleError}</p>}
                {descriptionError && <p style={{ color: 'red' }}>{descriptionError}</p>}
                {dueDateError && <p style={{ color: 'red' }}>{dueDateError}</p>}
            </Form.Group>
            <Button className="my-3" type="submit">Add Task</Button>
        </Form>
    )
}

