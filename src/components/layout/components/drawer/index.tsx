import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import {default as DrawerMUI} from '@material-ui/core/Drawer';
import { FC } from 'react';
import useStyles from './drawer.styles';
import menu, { DrawerProps } from './drawer.types';
import { ROUTES } from '../../../../constants/routes';
import { useHistory } from 'react-router-dom';
import IconButton  from '@material-ui/core/IconButton';
import  ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import  ChevronRightIcon  from '@material-ui/icons/ChevronRight';
import { useTheme } from '@material-ui/core/styles';
import { v4 } from 'uuid';

const Drawer: FC<DrawerProps> = ({open, handleDrawerClose}) => {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  

  const handleNavigation = (url: ROUTES) => {
    history.push(url)
  };
    return (<DrawerMUI
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <img src="http://localhost:3000/laminin.png" alt="logo" className={classes.logo}/>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {menu.map((item, index) => (
            <ListItem button key={v4()} onClick={() => handleNavigation(item.url)}>
              <ListItemText primary={item.label} />
            </ListItem>
          ))}
        </List>
      </DrawerMUI>);
};

export default Drawer;