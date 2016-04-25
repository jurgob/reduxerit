import chai from 'chai';
import {utils} from '../src/';

const {setIn,updateIn} = utils;

chai.should();

describe('Test utils', () => {
  const obj = {
    a: "aa",
    b: {
      c:"cc"
    }
  }


  it('setIn with target="a"', () =>
    setIn(obj, 'a', 'aaaa!')
    .should.be.deep.equal({
      a: "aaaa!",
      b: {
        c:"cc"
      }
    })
  )

  it('setIn with target=["a"]', () =>
    setIn(obj, ['a'], 'aaaa!')
    .should.be.deep.equal({
      a: "aaaa!",
      b: {
        c:"cc"
      }
    })
  )

  it("setIn with target=['a','b','c']", () =>
    setIn(obj, ['b','c'], 'changed!')
    .should.be.deep.equal({
      a: "aa",
      b: {
        c:"changed!"
      }
    })
  )

  const obj1 = {
    a:"a",
    b:{
      c:4
    }
  }

  it("updateIn updateIn(obj1, ['b','c'], (el) => el*2 )", () =>
    updateIn(obj1, ['b','c'], (el) => el*2 )
    .should.be.deep.equal({
      a: "a",
      b: {
        c:8
      }
    })
  )


})
