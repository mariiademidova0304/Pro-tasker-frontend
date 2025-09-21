import { useState } from "react";
import { useContext } from "react";
import { CurrentUserContext } from "../../../context/ContextAPI";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function ProjectForm() {

    const initialState = {
        name: '',
        description: '',
    }

    const [inputFormData, setInputFormData] = useState(initialState);
    const [nameError, setNameError] = useState(null);
    const [descriptionError, setDescriptionError] = useState(null);
    const { jwt } = useContext(CurrentUserContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    //creating handler for changes, using union type since my fields are either input or select
    const handleChange = (event) => {
        const { name, value } = event.target;
        if(event.target.name === 'name'){
            setNameError(null);
        }
        if(event.target.name === 'description'){
            setDescriptionError(null);
        }

        
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
        if (inputFormData.name.trim() === '') {
            setTitleError('Name can not be empty');
            setLoading(false);
            return false;
        }

        if (inputFormData.description.trim() === '') {
            setDescriptionError('Description can not be empty');
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
                    'name': inputFormData.name,
                    'description': inputFormData.description,
                })
            }
            const response = await fetch(`${import.meta.env.VITE_SERVER_ORIGIN}/api/projects/`, requestOptions);
            if (!response.ok) {
                throw new Error(`Error! Status: ${response.status}`);
            }
            // onTaskSubmitted();
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
                <label htmlFor="project-name">Task</label>
                <input value={inputFormData.name} type="text" name="name" id="project-name" onChange={handleChange} required />
            </Form.Group>
            <Form.Group>
                <label htmlFor="project-description">Description</label>
                <input value={inputFormData.description} type="text" name="description" id="project-description" onChange={handleChange} required />
            </Form.Group>
            <Form.Group>
                <Button type="submit">Add Task</Button>
                {loading && <p style={{ color: 'blue' }}>Loading...</p>}
                {error && <p style={{ color: 'red' }}>{error.message}</p>}
                {nameError && <p style={{ color: 'red' }}>{nameError}</p>}
                {descriptionError && <p style={{ color: 'red' }}>{descriptionError}</p>}
            </Form.Group>
        </Form>
    )
}