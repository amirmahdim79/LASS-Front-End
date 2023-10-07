import Base from "pages/Base";
import HomePage from "pages/home";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Base />,
        errorElement: 'test',
        children: [
            {
                path: '/',
                element: <HomePage />,
            }
        ]
    },
])
