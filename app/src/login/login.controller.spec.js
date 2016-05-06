/**
 * Created by alex on 04.05.16.
 */

'use strict';

import chai from 'chai'
import sinon from 'sinon'
import mongoose from 'mongoose'

import LoginController from './login.controller'
import AccountModel from './../account/account.model'
import PasswordService from './../../utils/password'
import ProfileModel from './../profile/profile.model'
import TokenService from './../../utils/token'

const expect = chai.expect;
const _token = 'some token';
const _profile = {_id: 'some profile id'};
const _successData = {email: 'foo@bar.com', password: '123123'};
const _failedData = {email: 'bar@baz.com', password: 'qwerty'};

describe('LoginController', function () {
    describe('exist', function () {
        it('login method must be exist', function (done) {
            expect(LoginController.login).to.exist;
            done();
        });
    });
    describe('methods', function () {
        beforeEach(function (done) {
            sinon.stub(AccountModel, 'fetch')
                .withArgs({email: _successData.email}).returns(Promise.resolve({_id: 'account id'}))
                .withArgs({email: _failedData.email}).returns(null);

            sinon.stub(ProfileModel, 'fetch').returns(Promise.resolve(_profile));
            sinon.stub(PasswordService, 'compare').returns(true);
            sinon.stub(TokenService, 'generate').returns(_token);
            done();
        });
        afterEach(function () {
            AccountModel.fetch.restore();
            ProfileModel.fetch.restore();
            PasswordService.compare.restore();
            TokenService.generate.restore();
        });

        it('login must be success', function (done) {
            LoginController.login(_successData)
                .then(function (result) {
                    expect(result).to.deep.equal({token: _token, profile: _profile});
                    done();
                });
        });

        it('login must be failed', function (done) {
            LoginController.login(_failedData)
                .catch(function (error) {
                    expect(error.isBoom).to.be.ok;
                    done();
                });
        });
    });
    after(function (done) {
        mongoose.models = {};
        mongoose.modelSchemas = {};
        mongoose.connection.close();
        return done();
    });
});