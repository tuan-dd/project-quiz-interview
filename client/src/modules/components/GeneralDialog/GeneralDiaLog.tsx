import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { useDisplayDataContext } from '@/contexts/displayData';

const GeneralDiaLog = () => {
  const { toggleOpen, title, content, onOk, onCancel, ...rest } = useDisplayDataContext();

  return (
    <Dialog
      {...rest}
      onClose={() => {
        toggleOpen();
      }}
    >
      {title && <DialogTitle id="alert-dialog-title">{title}</DialogTitle>}
      <DialogContent>
        {content && <DialogContentText id="alert-dialog-description">{content}</DialogContentText>}
      </DialogContent>
      <DialogActions>
        {/*<ThemeProvider theme={theme === THEME_MODE.DARK ? darkThemeConfig : lightThemeConfig}>*/}
        <Button
          size={'small'}
          variant={'outlined'}
          onClick={() => {
            if (onCancel) {
              onCancel();
            }
            toggleOpen();
          }}
        >
          cancel
        </Button>
        <Button
          size={'small'}
          variant={'contained'}
          onClick={(e) => {
            if (onOk) {
              onOk();
            }
            toggleOpen();
          }}
        >
          OK
        </Button>
        {/*</ThemeProvider>*/}
      </DialogActions>
    </Dialog>
  );
};

export default GeneralDiaLog;
