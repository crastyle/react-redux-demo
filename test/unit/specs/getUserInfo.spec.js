/**
 * create by wey
 */

import {Map, fromJS} from 'immutable'
import sinon from 'sinon'
import getUserInfoAction from '../../../client/src/modules/profileview/action'
import getUserInfoReducer from '../../../client/src/modules/profileview/reducer'
import api from '../../../client/src/modules/profileview/api'
import { context } from '../../../client/src/index'

describe('getUserInfo reducer', function(){
    it('should be an userInfo', function(cb){
        var state = Map({});
        const mock = Map({
            status: 1
        })
        const action = {
            type: 'get user',
            payload: fromJS({msg: '获取个人资料成功'})
        }
        const res = getUserInfoReducer.userInfo(state, mock)
        assert.ok(res.equals(mock))
        cb()
    })
})