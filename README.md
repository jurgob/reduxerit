# reduxerit
reduxerit is strongly influenced from redux-modifiers (https://github.com/calvinfroedge/redux-modifiers), It try to semplify writing the redux reducer, but without using immutablejs.

it is intended to work with redux-actions (https://github.com/acdlite/redux-actions) , but it is not mandatory.

###How it looks like:

```js
import { handleActions } from 'redux-actions'
import { set, removeIdx,push } from 'reduxerit'

const reducerToDoList = handleActions({
  
  'SET_TITLE': set('title'),
  'ADD_ITEM': push('items'),
  'REMOVE_ITEM': removeIdx('items'),
}, 
{
  title:"",
  items:[]
});
```

##DOCS

##simple example:

often you want just assign the entire payload of your action to a particular reducer. you can do it like this

```js

import { handleActions } from 'redux-actions'
import { set, removeIdx,push } from 'reduxerit'

const apiResponse = handleActions({
  'RECEVE_RESPONSE': set()
})

```
now if you raise an action with a payload, you will see the entire apiResponse state equals to the palyload

```js
  store.dipatch({type:'RECEVE_RESPONSE', payload:{ data:[]}}  )
```

now ```store.getState().apiResponse``` will be ```js  { data:[]}}```

the reducer without reduxerit would be:

```js
  /*WITHOUT REDUXERIT */
  
  const apiResponse = handleActions({
  'RECEVE_RESPONSE': (state, action) => ({
      ...state,
      ...action.payload
   })
})

```











