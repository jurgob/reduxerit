import chai from 'chai';
import {set,update,remove,merge, deepmerge} from '../src/';


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

  it("set - set()", () =>{
    const action = {
      type:'TYPE',
      payload:{"newValue": "changed!"}
    }

    set()(state,action)
    .should.be.deep.equal({
      "newValue": "changed!"
    })
  })

  /* merge */
  it("merge - merge()", () =>{
    const state = {
      locations:{
        "location1":{name:"location one"},
        "location2":{name:"location two"}
      },
      next:"location_url?page=2",
      title:"Locations"
    }

    const action = {
      type:'TYPE',
      payload:{
        locations:{
          "location2":{name:"location two!!!"},
          "location3":{name:"location three"}
        },
        next:"location_url?page=3",
      }
    }

    const finalState = {
      locations:{
        "location2":{name:"location two!!!"},
        "location3":{name:"location three"}
      },
      next:"location_url?page=3",
      title:"Locations"
    }

    merge()(state,action)
    .should.be.deep.equal(finalState)
  })

  it("merge - deepmerge()", () =>{
    const state = {
      locations:{
        "location1":{name:"location one"},
        "location2":{name:"location two"}
      },
      next:"location_url?page=2"
    }

    const action = {
      type:'TYPE',
      payload:{
        locations:{
          "location2":{name:"location two!!!"},
          "location3":{name:"location three"}
        },
        next:"location_url?page=3"
      }
    }

    const finalState = {
      locations:{
        "location1":{name:"location one"},
        "location2":{name:"location two!!!"},
        "location3":{name:"location three"}
      },
      next:"location_url?page=3"
    }

    deepmerge()(state,action)
    .should.be.deep.equal(finalState)
  })

  it("merge - deepmerge(['data','locations'])", () =>{
    const state = {
      data: {
        locations:{
          "location1":{name:"location one"},
          "location2":{name:"location two"}
        },
        next:"location_url?page=2"
      }
    }

    const action = {
      type:'TYPE',
      payload:{
        "location2":{name:"location two!!!"},
        "location3":{name:"location three"}
      }
    }

    const finalState = {
      data: {
        locations:{
          "location1":{name:"location one"},
          "location2":{name:"location two!!!"},
          "location3":{name:"location three"}
        },
        next:"location_url?page=2"
      }
    }

    deepmerge(['data','locations'])(state,action)
    .should.be.deep.equal(finalState)
  })


  /* update */
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
