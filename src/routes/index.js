import Base from "pages/Base";
import HomePage from "pages/home";
import SupervisorDashboard from "pages/supervisor/dashboard";
import ArticlesDataBase from "pages/user/articlesDataBase";
import UserDashboard from "pages/user/dashboard";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
    {
        path: '/',
        errorElement: 'tttest11',
        element: <HomePage />,
    },

    {
        path: '/user',
        element: <Base />,
        errorElement: 'user test',
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
        element: <Base />,
        errorElement: 'supervisor test',
        children: [
            {
                path: 'dashboard',
                element: <SupervisorDashboard />,
            }
        ]
    },
])
