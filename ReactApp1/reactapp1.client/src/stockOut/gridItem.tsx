import { Button } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
export const columns = (handleDeleteEntry: (id: number) => void): GridColDef[] => [
    { field: 'id', headerName: 'ID', width: 70 },
    {
        field: 'description', headerName: 'Pershkrimi', width: 700
    },
    {
        field: 'quantity', headerName: 'Sasia', width: 100
    },
    {
        field: 'price', headerName: 'Cmimi per sasi', width: 100,
        valueFormatter: (params) => {
            const quantity = params as number; 
            return quantity !== undefined ? quantity.toFixed(2) : '0.00'; 
        },    },
    {
        field: 'totalValue',
        headerName: 'Total Cmimi',
        width: 150,
        valueGetter: (_value,row) => {
            const quantity = row.quantity as number;
            const price = row.price as number;
            return quantity * price;
        },
        valueFormatter: (params) => {
            const totalValue = params as number;
            return totalValue !== undefined ? `${totalValue.toFixed(2)}` : '0.00'; 
        },

    },
    {
        field: 'insertionDate',
        headerName: 'Shtuar me date:',
        width: 150
    },
    {
        field: 'actions',
        headerName: 'Fshij rekordin',
        width: 300,
        renderCell: (params) => (
            <Button
                variant="contained"
                color="secondary"
                onClick={() => handleDeleteEntry(params.row.id)}
            >
                Fshij
            </Button>
        ),
    },
   
]