import { configureStore } from '@reduxjs/toolkit';

import { apiContact } from '../api/apiContact';

const stringMiddleware = () => (next) => (action) => {
    if (typeof action === 'string') {
        return next({
            type: action,
        });
    }
    return next(action);
};

const store = configureStore({
    reducer: {
        [apiContact.reducerPath]: apiContact.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(stringMiddleware, apiContact.middleware),
    devTools: process.env.NODE_ENV !== 'production',
});

export default store;
