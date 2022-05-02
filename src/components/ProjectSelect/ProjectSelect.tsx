import { useCallback, useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useProjectContext } from '../../hooks/useProjectContext';
import { useToastMessageContext } from '../../hooks/useToastMessageContext';
import { Project } from '../../interfaces/project.interface';
import { getAllProjects } from '../../services/projectsService';
import { Container } from '../SharedUI/atoms/Container/Container';
import { FormButton } from '../SharedUI/atoms/FormButton/FormButton';
import { Select } from '../SharedUI/atoms/Select/Select';
import { SmallModal } from '../SharedUI/atoms/SmallModal/SmallModal';

import styles from './ProjectSelect.module.css';

export const ProjectSelect = () => {

    const { projectId, addProjectId } = useProjectContext();
    const [isLoading, setIsLoading] = useState(false)
    const { addToastMessage } = useToastMessageContext();
    const [projects, setProjects] = useState<Project[] | null>(null)
    const navigate = useNavigate();


    const selectProject = (id: string) => {
        addProjectId(id)
        navigate("../", { replace: true });
    };

    const getProjects = useCallback(async () => {
        try {
            setIsLoading(true)
            const projects = await getAllProjects()
            if (projects) {
                setProjects(projects)
            }
            setIsLoading(false)
        } catch (error) {
            addToastMessage(`Something went wrong. Please try again later.`)
        }
    }, [addToastMessage])

    useEffect(() => {
        getProjects()
    }, [getProjects])

    return (
        <Container>
            <h1 className={styles.heading}>SELECT PROJECT</h1>
            <ul className={styles.list}>
                {projects && projects.map(project => {
                    return <li className={styles.element} key={project.id} onClick={() => selectProject(project.id)}>
                        <SmallModal>
                            <h2 className={styles.title}>{project.title}</h2>
                            <p>{project.content}</p>
                        </SmallModal>
                    </li>
                })}
            </ul>
        </Container>
    );
}



