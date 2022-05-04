import { useState } from 'react';
import { Project } from '../../../interfaces/project.interface';
import styles from './Projects.module.css';

import { ProjectSelect } from '../ProjectSelect/ProjectSelect';
import { ProjectCreateEdit } from '../ProjectCreateEdit/ProjectCreateEdit';

export const Projects = () => {

    const [editProject, setEditProject] = useState<Project | null>(null)
    const [isCreateEdit, setIsCreateEdit] = useState(false)

    const handleEdit = (val: Project | null) => {
        setEditProject(val)
    }

    const handleToggleCreateEdit = () => {
        setIsCreateEdit(prev => !prev)
    }

    return (
        <>
            {isCreateEdit ? <ProjectCreateEdit editProject={editProject} isCreateEdit={isCreateEdit} /> : <ProjectSelect handleEdit={handleEdit} handleToggleCreateEdit={handleToggleCreateEdit} />}
        </>

    );
}



