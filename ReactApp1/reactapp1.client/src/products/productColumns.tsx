import { GridColDef } from "@mui/x-data-grid";

export const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70, hideable:false},

    { field: 'name', headerName: 'Name', width: 150 },
    {
        field: 'filePath',
        headerName: 'Product Image',
        width: 200,
        renderCell: (params) => (
            <img
                src={params.value}
                alt="Product"
                style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
        ),
    },
    { field: 'insertionDate', headerName: 'Insertion Date', width: 180 },
];
