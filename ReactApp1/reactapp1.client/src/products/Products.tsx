import { useState, useEffect } from 'react';
import { List } from 'immutable';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import AddProductDialog from './AddProductDialog'; 
import { columns } from './productColumns';
import { ApiResponse } from '../types/ApiResponse';
import './Products.css'

interface Product {
    id: number;
    name: string;
    filePath?: string;
    insertionDate: string;
}

function Products() {
    const [products, setProducts] = useState<Product[]>([]);
    const [open, setOpen] = useState(false); // Dialog state


    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get<ApiResponse<Product>>('/api/product/listAllProducts');
               
                const immutableList = List(
                    res.data.result.map((item) => ({
                        ...item,
                        
                    }))
                );
                setProducts(immutableList.toJS());
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const handleClickOpen = () => {
        setOpen(true); // Open the dialog
    };

    const handleClose = () => {
        setOpen(false); // Close the dialog
    };

    const handleAddProduct = (newProduct: Product) => {
        const updatedProducts = List(products).push(newProduct);
        setProducts(updatedProducts.toJS());
    };

    return (
        <div className="products-container mt-5">
           
            <AddProductDialog open={open} onClose={handleClose} onAdd={handleAddProduct} />

            <Paper sx={{ height: '100vh', width: '100%' }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleClickOpen}
                    sx={{
                        marginBottom: 2
                    }}
                >
                    Shto produkt te ri
                </Button>
                <DataGrid
                    rows={products}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5, 10]}
                    columnVisibilityModel={{
                        id: false, // Hide the 'id' column
                    }}
                    sx={{ border: 0 }}
                />
            </Paper>
        </div>
    );
}

export default Products;
