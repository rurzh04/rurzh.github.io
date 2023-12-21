import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiContact = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
    endpoints: (builder) => ({
        getContact: builder.query({
            query: () => '/users',
        }),
    }),
});

export const { useGetContactQuery } = apiContact;
