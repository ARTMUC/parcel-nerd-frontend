import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { useToastMessageContext } from '../../../hooks/useToastMessageContext';
import { CreateProject } from '../../../interfaces/createProject.interface';
import { Project } from '../../../interfaces/project.interface';
import { addProject, getAllProjects } from '../../../services/projectsService';
import { FormButton } from '../../atoms/FormButton/FormButton';
import { LoadingCircle } from '../../LoadingCircle_old';
import { FormButtonWithLink } from '../../molecules/FormButtonWithLink/FormButtonWithLink';
import { InputWithError } from '../../molecules/InputWithError/InputWithError';

import styles from './ProjectCreate.module.css';

export const ProjectCreate = () => {

    const { addToastMessage } = useToastMessageContext();
    const [isLoading, setIsLoading] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm<CreateProject>();
    const { addUserContext } = useAuthContext()
    const [projects, setProjects] = useState<Project[] | null>(null)

    const getProjects = async () => {
        try {
            setIsLoading(true)
            const projects = await getAllProjects()
            if (projects) {
                setProjects(projects)
            }
            setIsLoading(false)
        } catch (error) {
            console.log('err')
        }
    }

    useEffect(() => {
        getProjects()
    }, [])

    const onSubmit: SubmitHandler<CreateProject> = async (data) => {
        setIsLoading(true)
        addProject(data)
        setIsLoading(false)
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>

            <InputWithError type="text" placeholder="title" register={{ ...register("title", { required: 'This field is required', min: 3 }) }} error={errors.title} />

            <InputWithError type="content" placeholder="description" register={{ ...register("content", { required: 'This field is required', min: 3 }) }} error={errors.content} />

            {isLoading ? <LoadingCircle /> : <FormButton type={'submit'} value={'create-project'}></FormButton>}

        </form>
    );
}

