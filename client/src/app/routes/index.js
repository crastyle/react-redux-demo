import AppContainer from '../../app/containers/AppContainer'

export default function routes() {
    return {
        component: AppContainer,
        childRoutes: [
            require('./landing').default || require('./landing'),
            require('./notFound').default || require('./notFound'),
        ]
    }
}