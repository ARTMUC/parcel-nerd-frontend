import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useToastMessageContext } from '../../../hooks/useToastMessageContext';
import { Project } from '../../../interfaces/project.interface';
import { addProject, patchProject } from '../../../services/projectsService';
import { FormButton } from '../../SharedUI/FormButton/FormButton';

import styles from './ProjectCreateEdit.module.css';
import { InputWithError } from '../../SharedUI/InputWithError/InputWithError';
import { LoadingCircle } from '../../SharedUI/LoadingCircle/LoadingCircle';
import { Container } from '../../SharedUI/Container/Container';

export const ProjectCreateEdit = ({ editProject, isCreateEdit }: ProjectCreateEditProps) => {
  const { addToastMessage } = useToastMessageContext();
  const [isLoading, setIsLoading] = useState(false);
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Project>();

  const onSubmit: SubmitHandler<Project> = async (data) => {
    setIsLoading(true);
    if (editProject) {
      const responce = await patchProject({ ...editProject, ...data });
    } else {
      const responce = await addProject(data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (!editProject) {
      return;
    }
    setValue('title', editProject.title);
    setValue('content', editProject.content);
  }, [editProject, setValue]);

  return (
    <Container>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <InputWithError
          type="text"
          placeholder="title"
          register={{ ...register('title', { required: 'This field is required', min: 3 }) }}
          error={errors.title}
        />

        <InputWithError
          type="content"
          placeholder="description"
          register={{ ...register('content', { required: 'This field is required', min: 3 }) }}
          error={errors.content}
        />

        {isLoading ? <LoadingCircle /> : <FormButton type={'submit'} value={'create-project'}></FormButton>}
      </form>
    </Container>
  );
};

type ProjectCreateEditProps = {
  editProject: Project | null;
  isCreateEdit: boolean;
};
