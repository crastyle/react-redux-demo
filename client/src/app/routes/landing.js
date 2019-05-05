 import LandingContainer from '../../modules/landing/containers/LandingContainer';
import Main from '../../modules/landing/components/Main'
import Auth from '../../framework/Auth'
import Login from '../../modules/login/components/Login';

const auth = Auth.getInstance()

export default {
    path: '/',
    component: LandingContainer,
    childRoutes: [
        {
            path: 'login',
            component: Login,
        },
        
    ],
    indexRoute: {
        component: Main
    }
}