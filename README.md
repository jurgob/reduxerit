# reduxerit
reduxerit is strongly influenced from redux-modifiers (https://github.com/calvinfroedge/redux-modifiers), It try to semplify writing the redux reducer, but without using immutablejs.

it is intended to work with redux-actions (https://github.com/acdlite/redux-actions) , but it is not mandatory.

###THIS IS STILL A BETA! 


###an example

```
import { handleActions } from 'redux-actions'
import { set, removeIdx,push } from 'redux-modifiers'

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
