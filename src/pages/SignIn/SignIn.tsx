import { SigninForm } from '../../components/organisms/SignInForm/SigninForm';
import { User } from '../../interfaces/user.interface';
import styles from './SignIn.module.css';

export const SignIn = () => {

    return (
        <div className={styles.container} >
            <SigninForm />
        </div>
    );
}







