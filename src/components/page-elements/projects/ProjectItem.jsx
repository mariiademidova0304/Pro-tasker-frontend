import { useState } from "react";


export default function ProjectItem({project, onDelete}) {

    
    const handleDeleteProject = () => {
        onDelete(project._id);
    }

    return(
         <main style={{display: 'flex', justifyContent: 'space-between', padding: '10px'}}>
              <div style={{display: 'flex', flexDirection: 'column', gap: '5px'}}>
                <p>{project.name}</p>
                <p>{project.description}</p>
            </div>
            <div style={{display: 'flex', justifyContent:'flex-end',height:'fit-content'}}>
                <button onClick={handleDeleteProject}>Delete</button>
            </div>
        </main>
    )
}