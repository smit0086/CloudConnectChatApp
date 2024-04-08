import { Alert, AlertColor, Snackbar } from '@mui/material';
import { SnackbarProvider, VariantType, useSnackbar } from 'notistack'
import { createContext, useContext, useState } from 'react'

const SnackContext= createContext(null)
const CustomSnackbarProvider = (props: any) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState<AlertColor>('success');

    const handleClick = (message: string, serverity: AlertColor) => {
      setMessage(message);
      setSeverity(serverity);
      setOpen(true);
    };
  
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };
  return (
    <SnackContext.Provider value={{
      show:handleClick
    }}>
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>
        {props.children}
    </SnackContext.Provider>
  )
}

export const useCustomSnackbar = () => {
  const context = useContext(SnackContext);
  if (context === undefined) {
      throw new Error('useCustomSnackbar must be used within a CustomSnackbarProvider');
  }
  return context;
}

export default CustomSnackbarProvider