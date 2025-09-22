import ProjectItem from "./ProjectItem";

export default function ProjectList({projects, onDelete}){
       
    const projectList = projects.map((project) =>
        <li key={project._id}>
            <ProjectItem project={project} onDelete={onDelete} />
        </li>
    );

    return(
        <ul style={{ listStyleType: 'none', padding: 0 }}>
            {projectList}
        </ul>

    )
}