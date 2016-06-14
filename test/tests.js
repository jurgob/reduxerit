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

  it("set - set('a')", () =>{
    const action = {
      type:'TYPE',
      payload:"new value for a!"
    }

    set(['a'])(state,action)
    .should.be.deep.equal({
      a: "new value for a!",
      b: {
        c:4,
        d: "dd"
      }
    })

    set('a')(
      state,
      {
        type:'TYPE',
        payload:"another value for a!"
      }
    )
    .should.be.deep.equal({
      a: "another value for a!",
      b: {
        c:4,
        d: "dd"
      }
    })



  })


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


  it("set - nested set", () =>{

    const state = {
      sideMenu: {
        expanded: true
      }
    }

    const actionSetFalse = {
      type:'TYPE',
      payload:false
    }

    const actionSetTrue = {
      type:'TYPE',
      payload:true
    }

    set(['sideMenu', 'expanded'])(state,actionSetFalse)
    .should.be.deep.equal({
      sideMenu: {
        expanded: false
      }
    })

    set(['sideMenu', 'expanded'])(state,actionSetTrue)
    .should.be.deep.equal({
      sideMenu: {
        expanded: true
      }
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
  it("update - update collaback", () =>{
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

  it("update - set fixed value", () =>{
    const action = {
      type:'TYPE'
    }

    update(['b','c'] , 'settedWithoutCallback' )(state,action)
    .should.be.deep.equal({
      a: "aa",
      b: {
        c:"settedWithoutCallback",
        d: "dd"
      }
    })
  })


  it("remove - remove b.c", () =>{
    const action = {
      type:'TYPE'
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
