import React from 'react';

import { Box, useTheme } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

import { tokens } from '../../theme';

import { useGetContactQuery } from '../../api/apiContact';
import Spinner from '../../components/spinner/spinner';

type Props = {};

const Contacts = (props: Props) => {
    const { data = [], error, isLoading } = useGetContactQuery();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const columns = [
        { field: '_id', headerName: 'ID' },
        {
            field: 'firstName',
            headerName: 'Frst Name',
            flex: 1,
            cellClassName: 'name-column--cell',
        },
        {
            field: 'lastName',
            headerName: 'Last Name',
            flex: 1,
        },
        {
            field: 'email',
            headerName: 'Email',
            flex: 1,
        },
        {
            field: 'phone',
            headerName: 'Phone',
            flex: 1,
        },
    ];

    if (isLoading) {
        return <Spinner />;
    }

    if (error) {
        return <p>Error fetching data: {error}</p>;
    }

    if (!data) {
        return null; // если данные не загружены
    }

    return (
        <Box m="20px">
            <Box
                m="40px 0 0 0"
                sx={{
                    '& .MuiDataGrid-root': {
                        border: 'none',
                    },
                    '& .MuiDataGrid-cell': {
                        borderBottom: 'none',
                    },
                    '& .name-column--cell': {
                        color: colors.greenAccent[300],
                    },
                    '& .MuiDataGrid-columnHeaders': {
                        backgroundColor: colors.blueAccent[700],
                        borderBottom: 'none',
                    },
                    '& .MuiDataGrid-virtualScroller': {
                        backgroundColor: colors.primary[400],
                    },
                    '& .MuiDataGrid-footerContainer': {
                        borderTop: 'none',
                        backgroundColor: colors.blueAccent[700],
                    },
                    '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
                        color: `${colors.grey[100]} !important`,
                    },
                }}
            >
                <DataGrid
                    rows={data}
                    columns={columns}
                    components={{ toolbar: GridToolbar }}
                    getRowId={(row) => row._id}
                />
            </Box>
        </Box>
    );
};

export default Contacts;
