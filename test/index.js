import Shukjitz from '../lib';
import assert from 'assert';

describe('shukjitz', () => {
  var shukjitz;

  before((done) => {
    shukjitz = new Shukjitz({}, done);
  });

  it('大晦日は祝日じゃない', (done) => {
    let date = new Date(2016, 0, 0);
    shukjitz.check(date, (res) => {
      assert.equal(res, null);
      done();
    });
  });

  it('元日は祝日 (Callback)', (done) => {
    let date = new Date(2016, 0, 1);
    shukjitz.check(date, (res) => {
      assert.equal(res, '元日');
      done();
    });
  });

  it('元日は祝日 (Promise)', (done) => {
    let date = new Date(2016, 0, 1);
    shukjitz.check(date).then((res) => {
      assert.equal(res, '元日');
      done();
    });
  });

});
