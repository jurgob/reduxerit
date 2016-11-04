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
}, {})

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
},{})
```

why you have to use ```set()``` and not ```set```?
becouse the first argument can be a subpatch of the state you want to modify. Let's do an example:

you have an api witch returns you {data:[],pages:{cur:1, totPages:100} }. Let's say that you have 2 methods in this api, 1 to get the whole response and one to refresh just totPages. With reduxerit you can do it like this:

```js
const apiResponse = handleActions({
  'RECEVE_RESPONSE': set(),
  'RECEVE_UPDATED_TOT_PAGES':set(['pages', 'totPages'])
},{})

```
let's see the code without reduxerit:

```js
/* WITHOUT REDUXERIT*/
const apiResponse = handleActions({
  'RECEVE_RESPONSE': (state, action) => ({
     ...state,
     ...action.payload
   }),
  'RECEVE_UPDATED_TOT_PAGES':(state, action) => ({
     ...state,
     pages:{
       ...state.pages,
       totPages: action.payload
     }
   })
}, {})
```

lot of "boilerplate", right?


##when to NOT use reduxerit

redux comes with the ```combineReducers``` function, so you should use it as mutch as you can. as intance, if you need a "loading" status for the api, you should use ```combineReducers``` rather then reduxerit:

```js
const loading = handleActions({
  'SEND_REQUST': true  
  'RECEVE_RESPONSE':false
}, false)

const api = combineReducers({
  response:apiResponse,
  loading
})  

so don't use reduxerit if you don't need it!
```







