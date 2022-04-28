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

    interface ProjectSelect {
        [x: string]: string
    }

    const { projectId, addProjectId } = useProjectContext();
    const { addToastMessage } = useToastMessageContext();
    const [isLoading, setIsLoading] = useState(false)
    const [projects, setProjects] = useState<Project[] | null>(null)
    const navigate = useNavigate();


    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit: SubmitHandler<ProjectSelect> = async (data) => {
        addProjectId(data.project)
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

    const projectsTitles = projects && projects.map(project => {
        return {
            id: project.id,
            text: project.title
        }
    })

    return (
        <Container>
            <SmallModal>
                <div>
                    <h1>SELECT PROJECT TO START</h1>
                    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                        <Select options={projectsTitles} register={register("project", { required: true })} />
                        <FormButton type={'submit'} value={'Open Project'} />
                    </form>
                    <FormButton type={'submit'} value={'Manage Projects'} />
                </div>
            </SmallModal >
        </Container>

    );
}



