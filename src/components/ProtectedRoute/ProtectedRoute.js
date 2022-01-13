import React from 'react'
import { Route, Redirect } from 'react-router-dom'

function ProtectedRoute({ component: Component, isAuth, ...rest }) {
    return (
        <Route
            {...rest}
            render={(props) => {
                if (isAuth) {
                    return localStorage["token"] ? <Redirect to='/' /> : <Component {...props} />
                } else {
                    return localStorage["token"] ? <Component {...props} /> : <Redirect to='/auth' />
                }
            }}>
        </Route>
    )
}

export default ProtectedRoute;