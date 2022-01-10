import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import anecdoteReducer from './reducers/anecdoteReducer'
import popupReducer from './reducers/popupReducer'
import filterReducer from './reducers/filterReducer'

const reducer = combineReducers({
    anecdotes : anecdoteReducer,
    popUps : popupReducer,
    filter : filterReducer
})

const store = createStore(reducer,composeWithDevTools(applyMiddleware(thunk)))



export default store