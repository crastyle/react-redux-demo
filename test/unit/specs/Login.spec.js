/**
 * Created by victor on 2017/8/14.
 */
import {Map, fromJS} from 'immutable'
import sinon from 'sinon'
import LoginAction from '../../../client/src/modules/login/action'
import LoginReducer from '../../../client/src/modules/login/reducer'
import api from '../../../client/src/modules/login/api'
import { context } from '../../../client/src/index'

describe('Login Reducers', function () {
    it('should be user object', function (done) {
        var state = Map({});
        var mock = Map({
            cellphone: 13555555555,
            id: 1
        });

        var action = {type: 'login', payload: mock};
        var user = LoginReducer.user(state, action);
        assert.ok(user.equals(mock));
        done()
    })
    it('should be wait object', function (done) {
        var state = Map({}),
            mock = Map({wait: true}),
            action = {type: 'waitAuthCode', payload: mock},
            waitAuthCode = LoginReducer.user(state, action);
        assert.ok(waitAuthCode.equals(mock));
        done();
    });
    it('should be tip object', function (done) {
        var state = Map({}),
            mock = Map({tips: '测试信息'}),
            action = {type: 'serverTips', payload: mock},
            serverTips = LoginReducer.user(state, action);
        assert.ok(serverTips.equals(mock));
        done();
    });
});

describe('Login Actions', function () {
    describe('login action', function() {
      var login = null;
      var store = null;
      beforeEach(function(done) {
        // wrap api or sdk to fake
        login = sinon.stub(api, 'login');
        store = context.store.getInstance();
        done()
      });
      afterEach(function(done) {
        login.restore();
        done()
      });
      it('should be login ok with correct feedback', function(done) {
        login.resolves({status: 1, user: {username: '111'}});
        LoginAction.login()
          .then(function(login) {
            return login(store.dispatch, store.getState)
          })
          .then(function(res) {
            assert.ok(store.getState().get('user').get('tips') === '登陆成功');
            assert.ok(store.getState().get('user').get('username') === '111');
            done()
          })
      });
      it('should be login ok with wrong feedback', function(done) {
        login.resolves({status: 0});
        LoginAction.login()
          .then(function(login) {
            return login(store.dispatch, store.getState)
          })
          .then(function(res) {
            assert.ok(store.getState().get('user').equals(Map({})));
            done()
          })
      })
    });
    describe('sendAuthCode action', function() {
        var sendAuthCode = null;
        var store = null;
        beforeEach(function(done) {
            // wrap api or sdk to fake
            sendAuthCode = sinon.stub(api, 'sendAuthCode');
            store = context.store.getInstance();
            done()
        });
        afterEach(function(done) {
            sendAuthCode.restore();
            done()
        });
        it('should be sendAuthCode ok with correct feedback', function(done) {
            sendAuthCode.resolves({status: 1});
            LoginAction.sendAuthCode()
                .then(function(sendAuthCode) {
                    return sendAuthCode(store.dispatch, store.getState)
                })
                .then(function(res) {
                    assert.ok(store.getState().get('user').get('wait') === true);
                    assert.ok(store.getState().get('user').get('status') === 1);
                    done()
                })
        });
        it('should be sendAuthCode ok with wrong feedback', function(done) {
            sendAuthCode.resolves({status: 0});
            LoginAction.sendAuthCode()
                .then(function(sendAuthCode) {
                    return sendAuthCode(store.dispatch, store.getState)
                })
                .then(function(res) {
                    assert.ok(store.getState().get('user').get('status') === 0);
                    done()
                })
        })
    });

    it('should be serverTips Action', function (done) {
        var payload = {tips: '测试hello'},
            action = fromJS({
                type: 'serverTips',
                payload: payload
            }),
            server_tips = fromJS(LoginAction.serverTips(payload));
        assert.ok(server_tips.equals(action));
        done();
    });
    it('should be waitAuthCode Action', function (done) {
        var payload = {wait: true},
            action = fromJS({
                type: 'waitAuthCode',
                payload: payload
            }),
            wait_auth_code_action = fromJS(LoginAction.waitAuthCode(payload));
        assert.ok(wait_auth_code_action.equals(action));
        done();
    });
});














