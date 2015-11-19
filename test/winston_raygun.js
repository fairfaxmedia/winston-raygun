// -*- mode: js2; tab-width: 2; js2-basic-offset: 2; -*-

var chai      = require('chai');
var sinon     = require('sinon');
var sinonChai = require('sinon-chai');
var winston   = require('winston');
var Raygun    = require(__dirname+'/../lib/winston_raygun.js');

var expect    = chai.expect();
chai.use(sinonChai);

describe('Winston Raygun transport', function() {
  describe('with default options', function() {
    before(function() {
      winston.add(Raygun, { apiKey: 'test_api_key' });
    });

    // after(function() {
    //   winston.remove(Raygun);
    // });

    it('should log add Raygun transport to winston.Transport', function() {
      chai.assert(winston.transports.hasOwnProperty('Raygun'));
    });

    it('should log multiple error object', function() {
      var error_object = { error_type: 'invalid_request', message: 'error message?'};
      winston.error('TEST ERROR!', error_object, 'Error', new Error('another'), 'string', false, 9);
    });

    it('allows passing in custom Raygun clients', function() {
      var raygunClient = { name: 'test raygunClient' };
      var transport = new Raygun({ raygunClient: raygunClient });
      chai.assert(transport.raygunClient === raygunClient);
    });
  });

  // describe('with non-default allowed levels', function() {
  //   before(function() {
  //     winston.add(Raygun, { apiKey: 'test_api_key', enableLevels: ['info'] });
  //     sinon.stub(Raygun.raygunClient, "send");
  //   });

  //   it('only logs messages of re-defined levels', function() {
  //     var error_object = { error_type: 'invalid_request', message: 'error message?'};
  //     winston.info('TEST ERROR!', error_object, 'Error', new Error('another'), 'string', false, 9);

  //     chai.expect(Raygun.raygunClient.send).to.have.been.calledOnce();
  //   });
  // });
});
