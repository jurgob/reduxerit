import chai from 'chai';
import {set} from '../src/';


chai.should();

describe('Test utils', () => {
  const state = {
    a: "aa",
    b: {
      c:4
    }
  }

  it("setIn - set(['b','c'])", () =>{
    const action = {
      type:'TYPE',
      payload:"changed!"
    }

    set(['b','c'])(state,action)
    .should.be.deep.equal({
      a: "aa",
      b: {
        c:"changed!"
      }
    })
  })




})
