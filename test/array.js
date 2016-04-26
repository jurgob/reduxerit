import chai from 'chai';
import {push,removeIdx} from '../src/';


chai.should();

describe('Test reduxit funcs for array', () => {
  const state = {
    a: "aa",
    b: {
      c:[1,2,3],
      d: "dd"
    }
  }

  it("push - ", () =>{
    const action = {
      type:'TYPE',
      payload: 4
    }

    push(['b','c'])(state,action)
    .should.be.deep.equal({
      a: "aa",
      b: {
        c:[1,2,3,4],
        d: "dd"
      }
    })
  })

  it("removeIdx - ", () =>{
    const action = {
      type:'TYPE',
      payload: 1
    }

    removeIdx(['b','c'])(state,action)
    .should.be.deep.equal({
      a: "aa",
      b: {
        c:[1,3],
        d: "dd"
      }
    })
  })




})
