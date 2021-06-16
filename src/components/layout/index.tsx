import React, { FC } from 'react';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';

import useStyles from './layout.styles';
import AppBar from './components/app-bar';
import Drawer from './components/drawer';
import { useContext, useState } from 'react';
import { AuthContext, AuthContextData } from '../../context/auth';


const Layout:FC = ({children}) => {
  const classes = useStyles();
    const { authenticated }  = useContext(AuthContext) as AuthContextData;
    const [open, setOpen] = useState(true);

    const handleDrawerOpen = () => {
      setOpen(true);
    };
  
    const handleDrawerClose = () => {
      setOpen(false);
    };
  return (
    <div className={classes.root}>
      <CssBaseline />
      {authenticated && <AppBar open={open} handleDrawerOpen={handleDrawerOpen}/>}
      {authenticated && <Drawer open={open} handleDrawerClose={handleDrawerClose}/>}
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
          <div className={classes.drawerHeader} />
            {children}
      </main>
    </div>
  );
}

export default Layout;