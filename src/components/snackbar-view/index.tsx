import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { FC } from 'react';

import { SnackbarViewProps } from './snackbar-view.types';

const SnackbarView: FC<SnackbarViewProps> = ({ onClose, snackMessage, ...rest }) => (
  <Snackbar
    style={{ maxWidth: 400 }}
    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    open={!!snackMessage}
    key="toast"
    onClose={onClose}
    autoHideDuration={2000}
    {...rest}
  >
    <Alert aria-label="snackbar-alert" severity={snackMessage?.isError ? 'error' : 'success'}>
      {snackMessage?.message}
    </Alert>
  </Snackbar>
);

export default SnackbarView;
