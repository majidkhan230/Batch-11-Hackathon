import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from '@/store/features/userSlice.js'
import sessionStorage from 'redux-persist/es/storage/session';
import { persistReducer, persistStore } from 'redux-persist';

const rootReducer  = combineReducers({
    user: userReducer
})

const persistConfig = {
  key: 'root',
  storage:sessionStorage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer : persistedReducer,
    middleware: (getDefaultMiddleware) =>{
        return   getDefaultMiddleware({serializableCheck:false   })
    }

})

export const persistor =  persistStore(store)

export default store;