import React from "react";
import { Redirect, Route } from "react-router-dom";

const checkAuth = () => {
    const token = sessionStorage.getItem('token');
    return !!token
}

const ProtectedRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        checkAuth() ? (
            <Component {...props} />
        ) : (
            <Redirect to={{ pathname: '/auth' }} />

        )
    )} />
)

export default ProtectedRoute;