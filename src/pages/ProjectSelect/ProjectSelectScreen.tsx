
import { ProjectCreate } from '../../components/organisms/ProjectCreate/ProjectCreate';
import { ProjectSelect } from '../../components/organisms/ProjectSelect/ProjectSelect';
import styles from './ProjectSelectScreen.module.css';

export const ProjectSelectScreen = () => {

    return (
        <div className={styles.background} >
            <ProjectSelect />
        </div>
    );
}







