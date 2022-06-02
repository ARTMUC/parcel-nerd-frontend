import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import styles from './CloseButton.module.css';

export const CloseButton = ({ handleClick }: CloseButtonProps) => {
  return (
    <div className={styles.button_close}>
      <IconButton onClick={handleClick} color="secondary">
        <CloseIcon fontSize="large" />
      </IconButton>
    </div>
  );
};

type CloseButtonProps = {
  handleClick: () => void;
};
