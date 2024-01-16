import { createBrowserRouter } from "react-router-dom";
import Base from "pages/Base";
import HomePage from "pages/home";
import SupervisorDashboard from "pages/supervisor/dashboard";
import UserDashboard from "pages/user/dashboard";
import UserArticlesDataBase from "pages/user/articlesDataBase";
import SupArticlesDataBase from "pages/supervisor/articlesDataBase";
import Task from "pages/user/task";
import Profile from "pages/user/profile";
import Forum from "pages/common/forum";
import SupSettings from "pages/supervisor/settings";
import GroupSettings from "pages/supervisor/settings/groupSettings";
import Email from "pages/common/emails";

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
                path: 'articles-database',
                element: <UserArticlesDataBase />,
            },
            {
                path: 'task/:id/:type',
                element: <Task />,
            },
            {
                path: 'my-profile',
                element: <Profile editable={true}/>,
            },
            {
                path: 'user_profile/:id',
                element: <Profile />,
            },            {
                path: 'forum',
                element: <Forum />,
            },
            {
                path: 'forum/:id',
                element: <Forum />,
            },
            {
                path: 'new-email',
                element: <Email />,
            },
            {
                path: 'received-emails',
                element: <Email />,
            },
            {
                path: 'received-emails/:id',
                element: <Email />,
            },
            {
                path: 'email-settings',
                element: <Email />,
            },
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
                path: 'articles-database',
                element: <SupArticlesDataBase />,
            },
            {
                path: 'user_profile/:id',
                element: <Profile />,
            },
            {
                path: 'forum',
                element: <Forum />,
            },
            {
                path: 'forum/:id',
                element: <Forum />,
            },
            {
                path: 'settings',
                element: <SupSettings />,
            },
            {
                path: 'settings/group/:id',
                element: <GroupSettings />,
            },

            {
                path: 'new-email',
                element: <Email />,
            },
            {
                path: 'received-emails',
                element: <Email />,
            },
            {
                path: 'received-emails/:id',
                element: <Email />,
            },
            {
                path: 'email-settings',
                element: <Email />,
            },
        ]
    },
])
