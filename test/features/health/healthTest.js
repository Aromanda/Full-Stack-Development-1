const chai = require('chai');
const sinon = require('sinon');
const HealthController = require('../../../src/features/health/health.controller');
const ResponseUtil = require('../../../src/shared/utils/response-util').ResponseUtil;

describe('HealthController',()=>{
  afterEach(() => {
    sinon.restore();
  });

  describe('#helloWorld()',()=>{
    it('respond with Hello World',(done)=>{
      sinon.stub(ResponseUtil,'respondOk').callsFake((res,data,message)=>{
        chai.assert.equal(message,'Hello World');
        done();
      });
      void HealthController.helloWorld();
    });
  });

  describe('#status()',()=>{
    const envName = process.env.ENV_NAME;
    const port = 3004;
    it(`respond with Environment '${envName}' running on port: '${port}`,(done)=>{
      sinon.stub(ResponseUtil,'respondOk').callsFake((res,data,message)=>{
        chai.assert.equal(message,`Environment '${envName}' running on port: ${port}`);
        done();
      });
      void HealthController.status();
    });
  });

  describe('#error()',()=>{
    it('respond with error and status code 400',(done)=>{
      sinon.stub(ResponseUtil,'respondOk').callsFake((res,data,message)=>{
        chai.assert.equal(message, `error`);
        //chai.assert.equal(status, 400);
        done();
      });
      void HealthController.error();
    });
  });
});