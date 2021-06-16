import {
    Switch,
    Route,
    Redirect
} from "react-router-dom";

import Login from '../views/auth/login/index';
import React from 'react';
import { AuthContext } from "../context/auth";
import SignUp from "../views/auth/sign-up";
import { AuthContextData } from './../context/auth';
import { ROUTES } from "../constants/routes";
import Dashboard from "../views/dashboard";
import Market from "../views/market";
import CreateMarket from './../views/market/views/create/index';

export const Routes = () => {
    const { authenticated } = React.useContext(AuthContext) as AuthContextData;

    return (
        <Switch>
            <AuthRoute exact={true} path={ROUTES.LOGIN} component={Login} isAuthenticated={authenticated}/>
            <AuthRoute exact={true} path={ROUTES.REGISTER} component={SignUp} isAuthenticated={authenticated}/>
            <ProtectedRoute exact={true} path={ROUTES.DASHBOARD} component={Dashboard} isAuthenticated={authenticated}/>
            <ProtectedRoute exact={true} path={ROUTES.MARKET} component={Market} isAuthenticated={authenticated}/>
            <ProtectedRoute exact={true} path={ROUTES.MARKET_CREATE} component={CreateMarket} isAuthenticated={authenticated}/>
            <ProtectedRoute exact={true} path={ROUTES.ROOT} component={Login} isAuthenticated={authenticated}/>

        </Switch>);
}

const AuthRoute = ({component, isAuthenticated, ...rest}: any) => {
    const routeComponent = (props: any) => (
        !isAuthenticated
            ? React.createElement(component, props)
            : <Redirect to={{pathname: ROUTES.DASHBOARD}}/>
    );
    return <Route {...rest} render={routeComponent}/>;
};

export const ProtectedRoute = ({component, isAuthenticated, ...rest}: any) => {
    const routeComponent = (props: any) => (
        isAuthenticated
            ? React.createElement(component, props)
            : <Redirect to={{pathname: ROUTES.LOGIN}}/>
    );
    return <Route {...rest} render={routeComponent}/>;
};
