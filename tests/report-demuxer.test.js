var helper = require("node-red-node-test-helper");
var reportDemuxer = require("../report-demuxer.js");
const NAME = "report-demuxer";
describe('Test ' + NAME + ' Node', function () {

  afterEach(function () {
    helper.unload();
  });

  it('config should be loaded', function (done) {
    const flow = [{ 
      id: "parser", 
      type: NAME, 
      name: "Parser Name" 
    }];
    helper.load(reportDemuxer, flow, () => {
      const parser = helper.getNode("parser");
      parser.should.have.property("name", flow[0].name);
      done();
    });
  });

  it('should parse incoming report', (done) => {
    const flow = [{ 
      id: "parser", 
      type: NAME, 
      name: "Parser Name" 
    }];
    helper.load(reportDemuxer, flow, () => {
      const parser = helper.getNode("parser");
      done();
    });
  });
});