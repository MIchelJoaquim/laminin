import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        '.MuiGrid-item': {
            marginTop: theme.spacing(1),
        },
        root: {
            flexGrow: 1,
        },
        button: {
            height: theme.spacing(7),
            marginTop: theme.spacing(2)
        }
    }),
);
export default useStyles;