import Base from "pages/Base";
import HomePage from "pages/home";
import SupervisorDashboard from "pages/supervisor/dashboard";
import ArticlesDataBase from "pages/user/articlesDataBase";
import UserDashboard from "pages/user/dashboard";
import { createBrowserRouter } from "react-router-dom";
import { redirect } from "next/dist/server/api-utils";

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
                element: <ArticlesDataBase />,
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
            }
        ]
    },
])
