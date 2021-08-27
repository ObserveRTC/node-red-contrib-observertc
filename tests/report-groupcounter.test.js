var helper = require("node-red-node-test-helper");
var reportGroupCounter = require("../report-groupcounter.js");
const NAME = "report-groupcounter";
describe('Test ' + NAME + ' Node', function () {

  afterEach(function () {
    helper.unload();
  });

  it('config should be loaded', function (done) {
    const flow = [{ 
      id: "groupcounter", 
      type: NAME, 
    }];
    helper.load(reportGroupCounter, flow, () => {
      done();
    });
  });
});