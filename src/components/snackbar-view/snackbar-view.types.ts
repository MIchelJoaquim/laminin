
import { SnackbarProps } from '@material-ui/core';
import { SnackMessage } from '../../hooks/use-async-state';

export interface SnackbarViewProps extends SnackbarProps {
  snackMessage: SnackMessage | null;
}
