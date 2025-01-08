import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit'

import workReducer from 'src/reducer/workReducer'
import uiReducer from 'src/reducer/ui'

const dataReducer = combineReducers({
    works: workReducer,
    ui: uiReducer,
});

const store = configureStore({
    reducer: dataReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;