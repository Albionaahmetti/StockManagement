import { GridColDef } from '@mui/x-data-grid';
export const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70},
    { field: 'idProduct', headerName: 'Product ID', width: 150 },
    { field: 'productName', headerName: 'Produkti', width: 150 },
    { field: 'description', headerName: 'Pershkrimi', width: 200 },
    {
        field: 'quantity', headerName: 'Sasia', width: 150
    },
    {
        field: 'price', headerName: 'Cmimi per sasi', width: 150,
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
   
];
