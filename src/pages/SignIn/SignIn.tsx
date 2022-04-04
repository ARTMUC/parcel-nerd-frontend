
import { SigninForm } from '../../components/organisms/SignInForm/SigninForm';

import { User } from '../../interfaces/user.interface';
import styles from './SignIn.module.css';


export const SignIn = ({ handleLogin }: SignInProps) => {

    return (
        <div className={styles.container} >
            <SigninForm handleLogin={handleLogin} />
        </div>
    );
}

type SignInProps = {
    handleLogin: (data: User) => void
}





