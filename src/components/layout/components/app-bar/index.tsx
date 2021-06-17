import { FC } from 'react';
import {default as AppBarMUI} from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import useStyles from './app-bar.styles';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import { useContext } from 'react';
import { AuthContext, AuthContextData } from '../../../../context/auth';
import { AppBarProps } from './app-bar.types';
import MenuIcon from '@material-ui/icons/Menu';

const AppBar: FC<AppBarProps> = ({open, handleDrawerOpen}) => {
    const classes = useStyles();
    const { handleLogout } = useContext(AuthContext) as AuthContextData;
    return (
        <AppBarMUI
            position="fixed"
            className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
            })}
        >
            <Toolbar className={classes.toolbar}>
                <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton, open && classes.hide)}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="body1" noWrap >
                    LAMININ SYSTEMS
                </Typography>
                <IconButton
                    aria-label="logout"
                    color="inherit"
                    onClick={handleLogout}
                >
                    <PowerSettingsNewIcon />
                </IconButton>
            </Toolbar>
        </AppBarMUI>
    );
};

export default AppBar;