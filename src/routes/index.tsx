import {
    Switch,
    Route,
    Redirect
} from "react-router-dom";

import Login from '../views/auth/login/index';
import React from 'react';
import AuthApi from "../context/auth";
import SignUp from "../views/auth/sign-up";

export const Routes = () => {
    const Auth = React.useContext(AuthApi);

    return (
        <Switch>
            <Route exact={true} path="/login" component={Login}/>
            <Route exact={true} path="/register" component={SignUp}/>
            <ProtectedRoute exact={true} path="/dashboard" component={Login} isAuthenticated={Auth.auth}/>
            <ProtectedRoute exact={true} path="/" component={Login} isAuthenticated={Auth.auth}/>

        </Switch>);
}

export const ProtectedRoute = ({component, isAuthenticated, ...rest}: any) => {
    const routeComponent = (props: any) => (
        isAuthenticated
            ? React.createElement(component, props)
            : <Redirect to={{pathname: '/login'}}/>
    );
    return <Route {...rest} render={routeComponent}/>;
};
