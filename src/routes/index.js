import Base from "pages/Base";
import HomePage from "pages/home";
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
            }
        ]
    },
])
