import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from '../pages/ErrorPage';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import TaskSearch from '../pages/TaskSearch';

const router = createBrowserRouter([ 
    { path: "/", element: <Home /> },
    { path: "/task-search", element: <TaskSearch /> },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <Signup /> },
    {
        path: "*", // 未定義のルートをキャッチ
        element: <ErrorPage />,
    },
]);
export default router;
