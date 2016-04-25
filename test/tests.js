import chai from 'chai';
import {set,update} from '../src/';


chai.should();

describe('Test reduxit funcs', () => {
  const state = {
    a: "aa",
    b: {
      c:4
    }
  }

  it("set - set(['b','c'])", () =>{
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

  it("update - ", () =>{
    const action = {
      type:'TYPE',
      payload:5
    }

    update(['b','c'] , (oldValue,newValue) => oldValue+'_'+newValue )(state,action)
    .should.be.deep.equal({
      a: "aa",
      b: {
        c:"4_5"
      }
    })
  })

  

})
