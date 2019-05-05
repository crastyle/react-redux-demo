/**
 * Created by victor on 2017/8/22.
 */
import ProfileAcitons from '../../../client/src/modules/profile/action';
import ProfileReducers from '../../../client/src/modules/profile/reducer';
import api from '../../../client/src/modules/profile/api';
import context from '../../../client/src/index';
import {List, fromJS} from 'immutable';
import sinon from 'sinon';

describe('Profile Reducers', function () {
    it('Should input equal output', function (done) {
        var state = List(),
            mock = fromJS([1,2,3,4,5,6,7,8]),
            action = {type:'searchHospitals', payload: mock};
        assert.ok(ProfileReducers.hospitals(state,action).equals(mock));
        done();
    })
});

describe('Profile Actions', function () {
    describe('searchHospitals Action', function () {
        var store = null, searchHospitals = null;
        beforeEach(function (done) {
            store = context.store.getInstance();
            searchHospitals = sinon.stub(api, 'searchHospitals');
            done();
        })
        afterEach(function (done) {
            store.restore();
            done();
        })
        it('Its feedback should be hospital list with correct input', function (done) {
            var list = fromJS([1,2,3,4,5,6,7,8]);
            searchHospitals.resolve({code:'', list: list});
            ProfileAcitons.searchHospitals()
                .then(function (searchHospitals) {
                    return searchHospitals
                })
                .then(function (res) {
                    assert.ok(store.get('hospitals').equals());
                    done();
                })
        })
        it('Its feedback should be server tip with wrong input', function (done) {
            var list = fromJS([1,2,3,4,5,6,7,8]);
            searchHospitals.resolve({code:'wrong', list: list});
            ProfileAcitons.searchHospitals()
                .then(function (searchHospitals) {
                    return searchHospitals
                })
                .then(function (res) {
                    assert.ok(store.get('user').get('tips') === '医院不存在，请致电添加');
                    assert.ok(store.get('hospitals').equals(List()));
                    done();
                })
        })
    })
})