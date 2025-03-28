import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit'

import uiReducer from 'src/reducer/ui'

const dataReducer = combineReducers({
    ui: uiReducer,
});

const store = configureStore({
    reducer: dataReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;