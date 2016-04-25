const removeIn = (o, target, modifier) => {
  let cur;
  if(typeof target === 'string' )
    cur = target
  else {
    cur = target.shift()
  }

  if (target.length === 0 ||  typeof target === 'string') {
    let res = {
      ...o
    }
    delete res[cur]
    return res;
  }
  else {
    return {...o, [cur]: (removeIn(o[cur], target))}
  }
}

const updateIn = (o, target, modifier) => {
  let cur;
  if(typeof target === 'string' )
    cur = target
  else {
    cur = target.shift()
  }

  if (target.length === 0 ||  typeof target === 'string') {
    return {...o, [cur]: modifier(o[cur])}
  }
  else {
    return {...o, [cur]: (updateIn(o[cur], target, modifier))}
  }
}

export const setIn = (o, target, val) => updateIn(o, target, () => val)


export const utils = {
  removeIn,
  updateIn,
  setIn
}



export const set = target => (state, action) =>  (setIn(state,target,action.payload ))
export const update = (target, updateCB) => (state, action) => (updateIn(state,target, (oldValue) => updateCB(oldValue, action.payload) ))
// export const merge = target => (state, action) =>  updateIn(state, target, (obj) => ({...obj, ...action.payload})  )
export const remove = target => (state) =>  removeIn(state, target)

//array
export const push = (state, action) => target => updateIn(state, target, (arr) => arr.push(action.payload))
export const removeIdx = (state, action) => target => updateIn(
  state, target,
  arr => {
    const res = [...arr];
    res.splice(action.payload,1);
    return res;
  }
);
