/**
 * Created by victor on 2017/8/17.
 */
import projectListActions from '../../../client/src/modules/projectList/action';
import projectListReducers from '../../../client/src/modules/projectList/reducer';
import api from '../../../client/src/modules/projectList/api';
import {Map} from 'immutable';
import sinon from 'sinon';
import context from '../../../client/src/index';

describe('ProjectList Reducers', function () {
    it('Should be reject model status', function (done) {
        var state = Map({}),
            mock = Map({reject_model: true}),
            action =  {type:'rejectModel', payload: mock};
        assert.ok(projectListReducers.model(state, action).equals(mock));
        done();
    });
    it('Should be agreement model status', function (done) {
        var state = Map({}),
            mock = Map({agreement_model: true}),
            action =  {type:'agreementModel', payload: mock};
        assert.ok(projectListReducers.model(state, action).equals(mock));
        done();
    });
    it('Should be projects list', function (done) {
        var state = Map({}),
            mock = Map({project_list: [1,2,3,4,5,6,7]}),
            action = {type:'getProjects', payload: mock};
        assert.ok(projectListReducers.projects(state, action).equals(mock));
        done();
    })
});

describe('ProjectList Actions', function () {
    describe('Check Project Action', function () {
        var store = null, checkProject = null;
        beforeEach(function (done) {
            checkProject = sinon.stub(api, 'checkProject')
            store = context.store.getInstance();
            done();
        });
        afterEach(function (done) {
            store.restore();
            done();
        });
        it('should be ok with correct feedback', function (done) {
            checkProject.resolve({code:''});
            projectListActions.checkProject()
                .then(function (checkProject) {
                    return checkProject;
                })
                .then(function (res) {
                    assert.ok(store.get('model').get('agreement_model') === true);
                    done();
                })
        })

        it('should be ok with wrong feedback (wrong msg)', function (done) {
            checkProject.resolve({code:'wrong'});
            projectListActions.checkProject()
                .then(function (checkProject) {
                    return checkProject;
                })
                .then(function (res) {
                    assert.ok(store.get('model').get('agreement_model') === false);
                    done();
                })
        })
    });

    describe('Get Projects Action', function () {
        var store = null, getProjects = null;
        beforeEach(function (done) {
            getProjects = sinon.stub(api, 'getUserProjects');
            store = context.store.getInstance();
            done();
        });

        afterEach(function (done) {
            store.restore();
            done();
        });
        it('Should be ok with correct feedback (project list)', function (done) {
            getProjects.resolve({code:'', project_list:[1,2,3,4,5,6]});
            projectListActions.getProjects()
                .then(function (getProjects) {
                    return getProjects;
                })
                .then(function (res) {
                    assert.ok(store.get('projects').get('project_list').isArray);
                    assert.ok(store.get('projects').get('project_list').length === 7)
                    done();
                })
        });
        it('Should be ok with wrong feedback (wrong msg)', function (done) {
            getProjects.resolve({code:'wrong'});
            projectListActions.getProjects()
                .then(function (getProjects) {
                    return getProjects;
                })
                .then(function (res) {
                    assert.ok(store.get('projects').get('code') === 'wrong');
                    done();
                })
        })
    })
})













