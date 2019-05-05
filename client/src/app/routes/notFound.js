import LandingContainer from '../../modules/landing/containers/LandingContainer';

export default {
  path: '*',
  component: LandingContainer,
  getIndexRoute(partialNextState, cb) {
    require.ensure([], require => {
      cb(null, { component: require('../../modules/notFound/components/NotFound').default });
    })
  }
}