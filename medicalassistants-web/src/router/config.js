import Login from '../views/Login.tsx';
import Home from '../views/Home.tsx';
import NotFound from '../components/404.tsx';
import Register from '../views/Register.tsx';
export const routerConfig = [
    {
        path: '/',
        component: Home,
        auth: true
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/404',
        component: NotFound,
        auth: true

    },
    //
    // {
    //     path: '/register',
    //     component: Register,
    //     auth: false
    // }


    {
        path: '/register',
        component: Register,
        auth: true
    }

]

