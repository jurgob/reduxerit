
const getReducerName = (reducerName) => reducerName+ '_SET_STATE';

function createReducer(initialState, handlers) {
 return function reducer(state = initialState, action) {
  if (handlers.hasOwnProperty(action.type)) {
   return handlers[action.type](state, action)
  }
  else {
   return state
  }
 }
}

export const createBasicReducer = (reducerName , initialState) => {

 const _initialState = {
  ...initialState,
  reducerName
 }

 return createReducer(
  _initialState,
  {
   [getReducerName(reducerName)] : (state, action) => ({
    ...state,
    ...action.state
  }
 )

})}

export const getReducerState = (store, reducerName) => {
 return function(){
  const globalState = store.getState()
  const stateReducerName = Object.keys(globalState).find((p) => globalState[p].reducerName === reducerName )
  return globalState[stateReducerName]
 }
}

export const createUpdateStateAction = (reducerName) => {
 return (state) => ({
  type:getReducerName(reducerName),
  state
 })
}
