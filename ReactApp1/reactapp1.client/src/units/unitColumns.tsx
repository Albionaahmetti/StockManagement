import { GridColDef } from "@mui/x-data-grid";

export const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70, hideable: false },

    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'insertionDate', headerName: 'Insertion Date', width: 180 },
];
