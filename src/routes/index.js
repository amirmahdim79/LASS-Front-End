import { createBrowserRouter } from "react-router-dom";
import { redirect } from "next/dist/server/api-utils"
import Base from "pages/Base";
import HomePage from "pages/home";
import SupervisorDashboard from "pages/supervisor/dashboard";
import UserDashboard from "pages/user/dashboard";
import UserArticlesDataBase from "pages/user/articlesDataBase";
import SupArticlesDataBase from "pages/supervisor/articlesDataBase";

export const router = createBrowserRouter([
    {
        path: '/',
        errorElement: 'tttest11',
        element: <HomePage />,
    },
    {
        path: '/user',
        element: <Base type={'user'}/>,
        errorElement: 'besik outttttttttttttt',
        loader: () => (localStorage.getItem('type') !== 'user' ? redirect('/') : null),
        children: [
            {
                path: 'dashboard',
                element: <UserDashboard />,
            },
            {
                path: 'articles_database',
                element: <UserArticlesDataBase />,
            }
        ]
    },

    {
        path: '/supervisor',
        element: <Base type={'supervisor'}/>,
        errorElement: 'besik biroooooon',
        loader: () => (localStorage.getItem('type') !== 'supervisor' ? redirect('/') : null),
        children: [
            {
                path: 'dashboard',
                element: <SupervisorDashboard />,  
            },
            {
                path: 'articles_database',
                element: <SupArticlesDataBase />,
            }
        ]
    },
])
