import { useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useToastMessageContext } from '../../../hooks/useToastMessageContext';
import { Project } from '../../../interfaces/project.interface';
import { getAllProjects } from '../../../services/projectsService';
import { Select } from '../../atoms/Select/Select';
import { SmallModal } from '../../atoms/SmallModal/SmallModal';
import styles from './ProjectSelect.module.css';

export const ProjectSelect = () => {

    interface ProjectSelect {
        [x: string]: string
    }

    const { addToastMessage } = useToastMessageContext();
    const [isLoading, setIsLoading] = useState(false)
    const [projects, setProjects] = useState<Project[] | null>(null)

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit: SubmitHandler<ProjectSelect> = (data) => console.log(data);



    const getProjects = async () => {
        try {
            setIsLoading(true)
            const projects = await getAllProjects()
            if (projects) {
                setProjects(projects)
            }
            setIsLoading(false)
        } catch (error) {

        }
    }

    useEffect(() => {
        getProjects()
    }, [])

    const projectsTitles = projects && projects.map(project => project.title)

    return (
        <SmallModal>
            <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
                <Select name='project' options={projectsTitles} register={register("project", { required: true })} />
                <input type="submit" />
            </form>
        </SmallModal >
    );
}



