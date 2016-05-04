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

describe('LoginController', function () {
    describe('exist', function () {
        it('login method must be exist', function (done) {
            expect(LoginController.login).to.exist;
            done();
        });
    });
    describe('methods', function () {
        beforeEach(function (done) {
            sinon.stub(AccountModel, 'fetch').returns(Promise.resolve({_id: 'account id'}));
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
            let params = {email: 'foo@bar.com'};
            LoginController.login(params)
                .then(function(result) {
                    expect(result).to.deep.equal({token: _token, profile: _profile});
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