import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProjectContext } from '../../../hooks/useProjectContext';
import { useToastMessageContext } from '../../../hooks/useToastMessageContext';
import { Project } from '../../../interfaces/project.interface';
import { getAllProjects } from '../../../services/projectsService';
import { Container } from '../../SharedUI/Container/Container';
import { Button } from '../../SharedUI/RoundButton/Button';
import { SmallModal } from '../../SharedUI/SmallModal/SmallModal';
import { FiSettings } from 'react-icons/fi';

import styles from './ProjectSelect.module.css';

export const ProjectSelect = ({ handleEdit, handleToggleCreateEdit }: ProjectSelectProps) => {
  const { addProjectId } = useProjectContext();
  const [isLoading, setIsLoading] = useState(false);
  const { addToastMessage } = useToastMessageContext();
  const [projects, setProjects] = useState<Project[] | null>(null);
  const navigate = useNavigate();

  const selectProject = (id: string) => {
    addProjectId(id);
    navigate('../', { replace: true });
  };

  const editProject = (project: Project) => {
    handleEdit(project);
    handleToggleCreateEdit();
  };

  const addNewProject = () => {
    handleToggleCreateEdit();
  };

  const getProjects = useCallback(async () => {
    try {
      setIsLoading(true);
      const projects = await getAllProjects();
      if (projects) {
        setProjects(projects);
      }
      setIsLoading(false);
    } catch (error) {
      addToastMessage(`Something went wrong. Please try again later.`);
    }
  }, [addToastMessage]);

  useEffect(() => {
    getProjects();
  }, [getProjects]);

  return (
    <Container>
      <ul className={styles.list}>
        {projects &&
          projects.map((project) => {
            return (
              <li className={styles.element} key={project.id}>
                <SmallModal>
                  <div className={styles.card}>
                    <div className={styles.header}>
                      <h1 className={styles.title}>{project.title}</h1>
                      {/* <Button height={'40px'} radius={'100%'} width={'40px'} onClick={() => { editProject(project) }}>
                                        <FiSettings className={styles.icon} />
                                    </Button> */}

                      <FiSettings
                        className={styles.icon}
                        onClick={() => {
                          editProject(project);
                        }}
                      />
                    </div>
                    <p className={styles.description}>{project.content}</p>
                    <Button
                      height={'50px'}
                      width={'200px'}
                      onClick={() => {
                        selectProject(project.id);
                      }}
                    >
                      Select Project
                    </Button>
                  </div>
                </SmallModal>
              </li>
            );
          })}
      </ul>
      <div className={styles.rounded_btn}>
        <Button height={'75px'} radius={'100px'} width={'75px'} onClick={addNewProject}>
          +
        </Button>
      </div>
    </Container>
  );
};

type ProjectSelectProps = {
  handleEdit: (val: Project | null) => void;
  handleToggleCreateEdit: () => void;
};
