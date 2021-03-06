import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useToastMessageContext } from '../../hooks/useToastMessageContext';
import { LoginData } from '../../interfaces/login-data.interface';
import { loginUser } from '../../services/authService';
import { Container } from '../SharedUI/Container/Container';
import { IconGlobe } from '../SharedUI/IconGlobe/IconGlobe';
import { SmallModal } from '../SharedUI/SmallModal/SmallModal';
import { FormButtonWithLink } from '../SharedUI/FormButtonWithLink/FormButtonWithLink';
import { InputWithError } from '../SharedUI/InputWithError/InputWithError';

import styles from './SigninForm.module.css';

export const SigninForm = () => {
  const { addToastMessage } = useToastMessageContext();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginData>();
  const { addUserContext } = useAuthContext();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginData> = async (data) => {
    try {
      setIsLoading(true);
      const response = await loginUser(data);
      if (!response) {
        return;
      }
      addToastMessage(`You've signed in successfully.`);
      addUserContext(response);
      setIsLoading(false);
      navigate('../select-project', { replace: true });
    } catch (error: unknown) {
      if (error instanceof Error) {
        addToastMessage(error.message);
        setIsLoading(false);
      }
    }
  };

  return (
    <Container>
      <SmallModal>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <IconGlobe />

          <InputWithError
            type="text"
            placeholder="Email"
            register={{
              ...register('email', {
                required: 'Please provide valid email',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Invalid email address'
                }
              })
            }}
            error={errors.email}
          />

          <InputWithError
            type="password"
            placeholder="Password"
            register={{ ...register('password', { required: 'This field is required', min: 3 }) }}
            error={errors.password}
          />

          <FormButtonWithLink
            type="submit"
            value="login"
            to="/signup"
            text="If you do not have an account please"
            linkText="sign up here"
            isLoading={isLoading}
          />
        </form>
      </SmallModal>
    </Container>
  );
};
