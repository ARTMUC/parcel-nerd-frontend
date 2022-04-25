import { useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useToastMessageContext } from '../../../hooks/useToastMessageContext';
import { Project } from '../../../interfaces/project.interface';
import { getAllParcels } from '../../../services/parcelsService';
import { getAllProjects } from '../../../services/projectsService';
import { Container } from '../../atoms/Container/Container';
import { FormButton } from '../../atoms/FormButton/FormButton';
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
    const onSubmit: SubmitHandler<ProjectSelect> = async (data) => console.log(await getAllParcels(data.project)); 
    // here we should only set context project ID to work with it later



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

    const projectsTitles = projects && projects.map(project => {
       return {
        id: project.id,
        text: project.title
    }
    })
// should pass project id somehow - now we are passing title only
    return (
        <Container>
        <SmallModal>
            <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
                <Select options={projectsTitles} register={register("project", { required: true })} />
                <FormButton type={'submit'} value={'Open Project'}/>
            </form>
        </SmallModal >
        </Container>

    );
}



