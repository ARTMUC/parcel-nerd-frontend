import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { useToastMessageContext } from '../../../hooks/useToastMessageContext';
import { CreateProject } from '../../../interfaces/createProject.interface';
import { Project } from '../../../interfaces/project.interface';
import { addProject, getAllProjects } from '../../../services/projectsService';
import { FormButton } from '../../SharedUI/atoms/FormButton/FormButton';



import styles from './ProjectCreateEdit.module.css';
import { InputWithError } from '../../SharedUI/molecules/InputWithError/InputWithError';
import { LoadingCircle } from '../../SharedUI/atoms/LoadingCircle/LoadingCircle';
import { Container } from '../../SharedUI/atoms/Container/Container';


export const ProjectCreateEdit = ({ editProject, isCreateEdit }: ProjectCreateEditProps) => {

    const { addToastMessage } = useToastMessageContext();
    const [isLoading, setIsLoading] = useState(false)
    const { setValue, register, handleSubmit, formState: { errors } } = useForm<CreateProject>();



    const onSubmit: SubmitHandler<CreateProject> = async (data) => {
        setIsLoading(true)
        if (editProject) {
            console.log(JSON.stringify(data), 'changed')
        } else (
            console.log(JSON.stringify(data), 'created')
        )
        setIsLoading(false)
    }

    useEffect(() => {
        if (!editProject) { return }
        setValue("title", editProject.title)
        setValue("content", editProject.content)
    }, [editProject, setValue])

    return (
        <Container>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>

                <InputWithError type="text" placeholder="title" register={{ ...register("title", { required: 'This field is required', min: 3 }) }} error={errors.title} />

                <InputWithError type="content" placeholder="description" register={{ ...register("content", { required: 'This field is required', min: 3 }) }} error={errors.content} />

                {isLoading ? <LoadingCircle /> : <FormButton type={'submit'} value={'create-project'}></FormButton>}

            </form>
        </Container>
    );
}

type ProjectCreateEditProps = {
    editProject: Project | null,
    isCreateEdit: boolean
}

