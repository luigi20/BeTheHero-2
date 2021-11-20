import React, { Component } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { isAuthenticated } from './midllewares/auth';

const PrivateRoute = ({ children }) => {
    const logged = isAuthenticated(localStorage.getItem('token'));
    console.log(logged);
    if (logged) {
        return children;
    }

    return <Navigate to="/" />
}

export default PrivateRoute;