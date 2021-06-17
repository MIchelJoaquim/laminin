import { createStyles, makeStyles, Theme } from "@material-ui/core";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        header: {
            marginBottom: theme.spacing(2)
        },
        containerButton: {
            paddingTop: theme.spacing(3)
        }
    }),
);

export default useStyles;