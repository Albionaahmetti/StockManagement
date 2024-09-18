import { useState, useEffect } from 'react';
import { List } from 'immutable';
import axios from 'axios';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

interface Product {
    id: number;
    name: string;
    filePath?: string;


    insertionDate: string;
}

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'filePath', headerName: 'File Path', width: 200 },
    { field: 'insertionDate', headerName: 'Insertion Date', width: 180 }
];

function Products() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get<Product[]>('/api/product/GetAll');
                // Convert response data to immutable list and then to an array
                const immutableList = List(res.data);
                setProducts(immutableList.toJS()); // Convert Immutable.List to a plain array
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <Paper sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={products}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5, 10]}
                checkboxSelection
                sx={{ border: 0 }}
            />
        </Paper>
    );
}

export default Products;
