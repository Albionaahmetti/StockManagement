import { useState, useEffect } from 'react';
import { List } from 'immutable';
import axios from 'axios';
import { DataGrid, GridRowParams } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import AddProductDialog from './AddProductDialog';
import EditProductDialog from './EditProductDialog'; // Import the edit dialog
import { columns } from './productColumns';
import { ApiResponse } from '../types/ApiResponse';
import Notification from '../notification/Notification';
import './Products.css';
import { Product } from '../types/Types';

function Products() {
    const [products, setProducts] = useState<Product[]>([]);
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState<'success' | 'error'>('success');
    const [open, setOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false); // State for the edit dialog
    const [currentProduct, setCurrentProduct] = useState<Product | null>(null); // Product being edited

    const formatDate = (date: Date | string) => {
        return new Date(date).toLocaleDateString('en-GB');
    };

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

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAlertClose = () => {
        setAlertOpen(false);
    };

    const handleAddProduct = async (name: string, file: File) => {
      
            try {

                const formData = new FormData();
                formData.append('Name', name);
                formData.append('Document', file);

                const res = await axios.post<ApiResponse<Product>>('/api/product/createProduct', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                // Check the response status code and show alerts
                if (res.data.statusCode === 0) {
                    setAlertMessage('Produkti u shtua me sukses!');
                    setAlertSeverity('success');
                    fetchProducts();
                } else {
                    setAlertMessage(`Error: ${'Diqka shkoi keq.Ju lutem lajmeroni personin kontaktues'}`);
                    setAlertSeverity('error');
                    fetchProducts();
                }
                setAlertOpen(true); // Show the alert
                fetchProducts();
            } catch (error) {
                setAlertMessage('An unexpected error occurred.');
                setAlertSeverity('error');
                setAlertOpen(true); // Show the alert
                console.error('Error adding product:', error);
                fetchProducts();
            }

    };

    const handleDoubleClick = (params: GridRowParams) => {
        setCurrentProduct(params.row as Product); // Cast to Product type if needed
        setEditOpen(true);
    };

    const handleEditProduct = async (updatedProduct: Product) => {
        try {
            const res = await axios.put<ApiResponse<Product>>(`/api/product/updateProduct/${updatedProduct.id}`, updatedProduct);
            if (res.data.statusCode === 0) {
                setAlertMessage('Produkti u përditësua me sukses!');
                setAlertSeverity('success');
            } else {
                setAlertMessage('Diçka shkoi keq. Ju lutem provoni përsëri.');
                setAlertSeverity('error');
            }
            setAlertOpen(true);
            fetchProducts(); // Refresh the product list
            setEditOpen(false); // Close the edit dialog
        } catch (error) {
            setAlertMessage('Një gabim ndodhi gjatë përditësimit.');
            setAlertSeverity('error');
            setAlertOpen(true);
            setEditOpen(false);
            console.error('Error updating product:', error);
        }
    };

    return (
        <div className="products-container mt-5">
            <AddProductDialog open={open} onClose={handleClose} onAdd={handleAddProduct} />
            <EditProductDialog open={editOpen} onClose={() => setEditOpen(false)} product={currentProduct} onEdit={handleEditProduct} />

            <Paper sx={{ height: '100vh', width: '100%' }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleClickOpen}
                    sx={{ marginBottom: 2 }}
                >
                    Shto produkt te ri
                </Button>
                <DataGrid
                    rows={products}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5, 10]}
                    columnVisibilityModel={{ id: false }}
                    sx={{ border: 0 }}
                    onRowDoubleClick={handleDoubleClick} // Handle double-click
                />
            </Paper>
            <Notification
                open={alertOpen}
                message={alertMessage}
                severity={alertSeverity}
                onClose={handleAlertClose}
            />
        </div>
    );
}

export default Products;
