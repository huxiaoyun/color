import { expect } from 'chai';
import { gradient, gradient1 } from '../src/index';

describe('测试 gradient', function () {

  it('gradient()', function () {
    expect(gradient('#f00', '#fff', 3)).to.deep.equal(['#ff0000', '#ff5555', '#ffaaaa', '#ffffff']);
  });

  it('gradient1()', function () {
    expect(gradient1('#f00', 3)).to.deep.equal([
      'rgb(255, 0, 0, 0.0000)',
      'rgb(255, 0, 0, 0.3333)',
      'rgb(255, 0, 0, 0.6667)',
      'rgb(255, 0, 0, 1.0000)'
    ]);
  });

  it('gradient1()', function () {
    expect(gradient1('#f00', 3, 0.2, 0.8)).to.deep.equal(['rgb(255, 0, 0, 0.2000)','rgb(255, 0, 0, 0.4000)','rgb(255, 0, 0, 0.6000)','rgb(255, 0, 0, 0.8000)']);
  });

});
