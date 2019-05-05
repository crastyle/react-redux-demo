import Auth from '../../framework/Auth'
import { context } from '../..'
import Cookies from 'js-cookie'
import qs from 'query-string'
import  {outputs} from 'isocall'
import { fromJS } from 'immutable'
import actionsList from '../../event-definition'
const { replace } = require('react-router-redux')
const auth = Auth.getInstance()

const loginByWx = auth.use(async (...inputs) => {
    // const [ store, router, replace, next ] = inputs
    // const { getState, dispatch } = store
    // const { location } = router
    // const { actions } = context
    // const originalId = location.query.oid
    // if (!originalId) {
    //     replace('/404')
    //     return next()
    // }
    // const loginToken = Cookies.get('wx:jwt')
    // if (loginToken) {
    //     localStorage.setItem('return_url', location.pathname + location.search)
    //     return await getPatientActionByToken.apply(null, inputs.slice(1))
    // }
    // // check wechat token.
    // const referer = location.pathname + location.search
    // const wechatOauth = agent.wechat.oauth
    // const output = await wechatOauth({originalId, referer, component: 'h5'})
    // if (output.code) {
    //     replace(`/dpc/error?msg=${output.msg}`)
    //     return next()
    // }
    // if (!output.url) {
    //     replace(`/dpc/error?msg=no_url`)
    //     return next()
    // }
    // window.location.href = output.url
    return next()
})
export default {
    loginByWx,
    
    
}