import React from 'react';
import HomePage from './containers/public/pages/HomePage/HomePage';
import SignInPage from './containers/public/pages/SignInPage/SignInPage';
import SignUpPage from './containers/public/pages/SignUpPage/SignUpPage';

const routes = [
    {
        path : "/",
        exact : true,
        main : ({history}) => <HomePage history={history}/>
    },
    {
        path : "/sign-in",
        exact : false,
        main : ({history}) => <SignInPage history={history}/>
    },
    {
        path : "/sign-up",
        exact : false,
        main : ({history}) => <SignUpPage history={history}/>
    }
]

export default routes;