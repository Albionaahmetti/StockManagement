import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Button,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
} from '@mui/material';
import { StockEntry } from '../types/Entry';
import axios from 'axios';
import { ApiResponse } from '../types/ApiResponse';
import { Product } from '../types/Types';

interface AddStockEntryDialogProps {
    open: boolean;
    onClose: () => void;
    onAdd: (newEntry: StockEntry) => void;
}

const AddStockEntryDialog: React.FC<AddStockEntryDialogProps> = ({ open, onClose, onAdd }) => {
    const [description, setDescription] = useState('');
    const [idProduct, setIdProduct] = useState<number | string>(''); // Store product ID
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [products, setProducts] = useState<Product[]>([]); // Store products

    const fetchProducts = async () => {
        try {
            const res = await axios.get<ApiResponse<Product>>('/api/product/listAllProducts'); // Adjust API endpoint
            if (res.data.statusCode === 0) {
                setProducts(res.data.result);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        fetchProducts(); // Fetch products when the dialog opens
    }, [open]);

    const handleSubmit = async () => {
        const newEntry: StockEntry = {
            id: 0, // Assuming the ID will be auto-generated
            description,
            idProduct: Number(idProduct), // Convert to number for ID
            quantity: parseFloat(quantity),
            price: parseFloat(price),
            productName: '', // This can be updated as needed
            insertionDate: new Date().toISOString(), // Set to current date/time
        };

        try {
           
                onAdd(newEntry);
                onClose(); // Close the dialog
            
        } catch (error) {
            console.error('Error adding stock entry:', error);
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add Stock Entry</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Description"
                    type="text"
                    fullWidth
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <FormControl fullWidth margin="dense">
                    <InputLabel id="product-select-label">Product</InputLabel>
                    <Select
                        labelId="product-select-label"
                        value={idProduct}
                        onChange={(e) => setIdProduct(e.target.value)}
                    >
                        {products.map((product) => (
                            <MenuItem key={product.id} value={product.id}>
                                {product.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    margin="dense"
                    label="Quantity"
                    type="number"
                    fullWidth
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                />
                <TextField
                    margin="dense"
                    label="Price"
                    type="number"
                    fullWidth
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddStockEntryDialog;
