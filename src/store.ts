import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit'

import workReducer from 'src/reducer/workReducer'

const dataReducer = combineReducers({
    works: workReducer,
});

const store = configureStore({
    reducer: dataReducer,
});

export type RootState = ReturnType<typeof dataReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;