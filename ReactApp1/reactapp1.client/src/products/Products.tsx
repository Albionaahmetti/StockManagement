import { useState, useEffect } from 'react';
import { List } from 'immutable';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import { DataGrid, GridRowParams } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import AddProductDialog from './AddProductDialog';
import EditProductDialog from './EditProductDialog';
import { getColumns } from './productColumns';
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
    const [editOpen, setEditOpen] = useState(false); 
    const [currentProduct, setCurrentProduct] = useState<Product | null>(null); 
    const [loading, setLoading] = useState(false);
    const formatDate = (date: Date | string) => {
        return new Date(date).toLocaleDateString('en-GB');
    };

    const handleDeleteProduct = async (productId: number) => {
        setLoading(true);
        try {
            const res = await axios.put<ApiResponse<Product>>(`/api/product/deleteProduct/${productId}`);
            if (res.data.statusCode === 0) {
                setAlertMessage('Produkti u fshi me sukses!');
                setAlertSeverity('success');
                fetchProducts(); 
            } else {
                setAlertMessage('Dicka shkoi keq. Ju lutem provoni perseri.');
                setAlertSeverity('error');
            }
            setAlertOpen(true);
        } catch (error) {
            setAlertMessage('Nje gabim ndodhi gjate fshirjes.');
            setAlertSeverity('error');
            setAlertOpen(true);
            console.error('Error deleting product:', error);
        } finally {
            setLoading(false);
        }
    };
    
    const fetchProducts = async () => {
        setLoading(true); 
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
        } finally {
            setLoading(false); 
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

    const handleAddProduct = async (name: string) => {
        setLoading(true); // Start loading
        try {
            const formData = new FormData();
            formData.append('Name', name);

            const res = await axios.post<ApiResponse<Product>>('/api/product/createProduct', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (res.data.statusCode === 0) {
                setAlertMessage('Produkti u shtua me sukses!');
                setAlertSeverity('success');
                fetchProducts();
            } else {
                setAlertMessage(`Error: Diqka shkoi keq. Ju lutem lajmeroni personin kontaktues.`);
                setAlertSeverity('error');
                fetchProducts();
            }
            setAlertOpen(true);
        } catch (error) {
            setAlertMessage('An unexpected error occurred.');
            setAlertSeverity('error');
            setAlertOpen(true);
            console.error('Error adding product:', error);
        } finally {
            setLoading(false); // Stop loading
        }
    };

    const handleDoubleClick = (params: GridRowParams) => {
        setCurrentProduct(params.row as Product); 
        setEditOpen(true);
    };

    const handleEditProduct = async (updatedProduct: Product) => {
        try {
            const formData = new FormData();
            formData.append('Id', updatedProduct.id.toString());
            formData.append('Name', updatedProduct.name);
            formData.append('InsertionDate', updatedProduct.insertionDate);
            const res = await axios.put<ApiResponse<Product>>(`/api/product/editProduct`, formData);
            if (res.data.statusCode === 0) {
                setAlertMessage('Produkti u perditesua me sukses!');
                setAlertSeverity('success');
            } else {
                setAlertMessage('Dicka shkoi keq. Ju lutem provoni perseri.');
                setAlertSeverity('error');
            }
            setAlertOpen(true);
            fetchProducts(); 
            setEditOpen(false); 
        } catch (error) {
            setAlertMessage('Nje gabim ndodhi gjate perditesimit.');
            setAlertSeverity('error');
            setAlertOpen(true);
            setEditOpen(false);
            console.error('Error updating product:', error);
        }
    };

    return (
        <div className="products-container mt-5">
            {loading && (
                <div className="loading-indicator">
                    <CircularProgress />
                </div>
            )}
            <AddProductDialog open={open} onClose={handleClose} onAdd={handleAddProduct} />
            <EditProductDialog open={editOpen} onClose={() => setEditOpen(false)} product={currentProduct} onEdit={handleEditProduct} />
            <Paper sx={{ height: '100vh', width: '100%' }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleClickOpen}
                    sx={{ marginBottom: 2 }}
                    disabled={loading}
                >
                    Shto produkt te ri
                </Button>
                <DataGrid
                    rows={products}
                    columns={getColumns(handleDeleteProduct)}
                    pageSize={5}
                    rowsPerPageOptions={[5, 10]}
                    columnVisibilityModel={{ id: false }}
                    sx={{ border: 0 }}
                    onRowDoubleClick={handleDoubleClick}
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
