import {applyMiddleware, compose, createStore} from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducers/index'

const composeEnhancer = (process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null) || compose;


const enhancer = composeEnhancer(
    applyMiddleware(thunk)
)

export default createStore(reducer, enhancer)