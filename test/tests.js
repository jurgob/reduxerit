import chai from 'chai';
import {set,update,remove} from '../src/';


chai.should();

describe('Test reduxit funcs', () => {
  const state = {
    a: "aa",
    b: {
      c:4,
      d: "dd"
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
        c:"changed!",
        d: "dd"
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
        c:"4_5",
        d: "dd"
      }
    })
  })

  it("remove - ", () =>{
    const action = {
      type:'TYPE',
      payload:5
    }

    remove(['b','c'])(state,action)
    .should.be.deep.equal({
      a: "aa",
      b: {
        d: "dd"
      }
    })
  })


})
