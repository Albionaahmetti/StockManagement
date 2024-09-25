import { Button } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";

export const getColumns = (handleDeleteProduct: (id: number) => void): GridColDef[] => [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Emri i produktit:', width: 200 },
    { field: 'insertionDate', headerName: 'Shtuar më:', width: 150 },
    {
        field: 'actions',
        headerName: '',
        width: 150,
        renderCell: (params) => (
            <Button
                variant="contained"
                color="secondary"
                onClick={() => handleDeleteProduct(params.row.id)} 
            >
                Fshij
            </Button>
        ),
    },
];
