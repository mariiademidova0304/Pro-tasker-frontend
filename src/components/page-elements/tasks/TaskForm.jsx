import { useState } from "react";
import { useContext } from "react";
import { CurrentUserContext } from "../../../context/ContextAPI";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

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

    //creating handler for changes, using union type since my fields are either input or select
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
        //not entirely understanding, but we should be updating the state based off where change was done
        //then linking name to the name in the state and changing value
        setInputFormData(prevInputFormData => ({
            ...prevInputFormData,
            [name]: value
        }))
    }

    //sending state to parent with function prop, created in the index.ts and imported here
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
            <Form.Group>
                <label htmlFor="task-title">Task</label>
                <input value={inputFormData.title} type="text" name="title" id="task-title" onChange={handleChange} required />
            </Form.Group>
            <Form.Group>
                <label htmlFor="task-description">Description</label>
                <input value={inputFormData.description} type="text" name="description" id="task-description" onChange={handleChange} required />
            </Form.Group>
            <Form.Group>
                <label htmlFor="select-status">Status</label>
                <Form.Select name="status" id="select-status" value={inputFormData.status} onChange={handleChange}>
                    <option value='To do'>To Do</option>
                    <option value='In progress'>In progress</option>
                    <option value='Done'>Done</option>
                </Form.Select>
            </Form.Group>
            <Form.Group>
                <label htmlFor="input-date">Due Date</label>
                <input value={inputFormData.dueDate} type="date" name="dueDate" id="input-date" onChange={handleChange} required />
                <Button type="submit">Add Task</Button>
                {loading && <p style={{ color: 'blue' }}>Loading...</p>}
                {error && <p style={{ color: 'red' }}>{error.message}</p>}
                {titleError && <p style={{ color: 'red' }}>{titleError}</p>}
                {descriptionError && <p style={{ color: 'red' }}>{descriptionError}</p>}
                {dueDateError && <p style={{ color: 'red' }}>{dueDateError}</p>}
            </Form.Group>
        </Form>
    )
}

