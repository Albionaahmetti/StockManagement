import { useState, useEffect } from 'react';
import { List } from 'immutable';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { columns } from './productColumns';
import { ApiResponse } from '../types/ApiResponse';

interface Product {
    id: number;
    name: string;
    filePath?: string;
    insertionDate: string;
}

function Products() {
    const [products, setProducts] = useState<Product[]>([]);
    const [open, setOpen] = useState(false); // To handle the dialog open/close state
    const [newProduct, setNewProduct] = useState<Product>({ id: 0, name: '', filePath: '', insertionDate: '' }); // Store new product details

    const formatDate = (dateString: string | number | Date) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB');
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get<ApiResponse<Product>>('/api/product/listAllProducts');
                
                const immutableList = List(
                    res.data.result.map((item) => ({
                        ...item,
                        insertionDate: formatDate(item.insertionDate),
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

    const handleAddProduct = () => {
        const formattedProduct = { ...newProduct, insertionDate: formatDate(new Date()) };
        const updatedProducts = List(products).push(formattedProduct);
        setProducts(updatedProducts.toJS());
        setNewProduct({ id: 0, name: '', filePath: '', insertionDate: '' }); // Reset the form
        handleClose();
    };

    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleClickOpen} sx={{ marginBottom: 2 }}>
                Add Product
            </Button>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add New Product</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Product Name"
                        fullWidth
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="File Path"
                        fullWidth
                        value={newProduct.filePath}
                        onChange={(e) => setNewProduct({ ...newProduct, filePath: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAddProduct} variant="contained" color="primary">Add</Button>
                    <Button onClick={handleClose} variant="outlined" color="secondary">Cancel</Button>
                </DialogActions>
            </Dialog>

            <Paper sx={{ height: '100vh', width: '100%' }}>
                <DataGrid
                    rows={products}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5, 10]}
                    columnVisibilityModel={{
                        id: false, // This will hide the 'id' column
                    }}
                    sx={{ border: 0 }}
                />
            </Paper>
        </div>
    );
}

export default Products;
