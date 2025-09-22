import { useState } from "react";
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';


export default function ProjectItem({ project, onDelete }) {

    const handleDeleteProject = () => {
        onDelete(project._id);
    }

    return (
        <Card style={{minWidth: `50rem`}}>
            <Card.Body>
                <Card.Title>
                    <Link to={`/dashboard/${project._id}`}>
                        {project.name}
                    </Link>
                </Card.Title>
                <Card.Text>{project.description}</Card.Text>
                <Button variant="danger" onClick={handleDeleteProject}>Delete</Button>
            </Card.Body>
        </Card>
    )
}