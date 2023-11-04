import { createBrowserRouter } from "react-router-dom";
import Base from "pages/Base";
import HomePage from "pages/home";
import SupervisorDashboard from "pages/supervisor/dashboard";
import UserDashboard from "pages/user/dashboard";
import UserArticlesDataBase from "pages/user/articlesDataBase";
import SupArticlesDataBase from "pages/supervisor/articlesDataBase";
import Task from "pages/user/task";
import Profile from "pages/user/profile";

export const router = createBrowserRouter([
    {
        path: '/',
        errorElement: 'tttest11',
        element: <HomePage />,
    },
    {
        path: '/user',
        element: <Base type={'user'}/>,
        errorElement: 'error user pages',
        loader: () => (localStorage.getItem('type') !== 'user' && window.location.href('/')),
        children: [
            {
                path: 'dashboard',
                element: <UserDashboard />,
            },
            {
                path: 'articles_database',
                element: <UserArticlesDataBase />,
            },
            {
                path: 'task/:id/:type',
                element: <Task />,
            },
            {
                path: 'my_profile',
                element: <Profile />,
            }
            // a user see other user profile
        ]
    },

    {
        path: '/supervisor',
        element: <Base type={'supervisor'}/>,
        errorElement: 'error supervisor pages',
        loader: () => (localStorage.getItem('type') !== 'supervisor' && window.location.href('/')),
        children: [
            {
                path: 'dashboard',
                element: <SupervisorDashboard />,  
            },
            {
                path: 'articles_database',
                element: <SupArticlesDataBase />,
            },
            {
                path: 'user_profile/:id',
                element: <Profile />,
            }
        ]
    },
])
