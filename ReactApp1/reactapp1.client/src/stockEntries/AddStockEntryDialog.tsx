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
    const [idProduct, setIdProduct] = useState<number | string>('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [products, setProducts] = useState<Product[]>([]);

    const fetchProducts = async () => {
        try {
            const res = await axios.get<ApiResponse<Product>>('/api/product/listAllProducts');
            if (res.data.statusCode === 0) {
                setProducts(res.data.result);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        fetchProducts(); 
    }, [open]);

    const handleSubmit = async () => {
        const newEntry: StockEntry = {
            id: 0,
            description,
            idProduct: Number(idProduct), 
            quantity: parseFloat(quantity),
            price: parseFloat(price),
            productName: '', 
            insertionDate: new Date().toISOString(), 
        };

        try {
           
                onAdd(newEntry);
                onClose();
            
        } catch (error) {
            console.error('Error adding stock entry:', error);
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Shto hyrje te re</DialogTitle>
            <DialogContent>
               
                <FormControl fullWidth margin="dense">
                    <InputLabel id="product-select-label">Zgjedh produktin:</InputLabel>
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
                    label="Sasia"
                    type="number"
                    fullWidth
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                />
                <TextField
                    margin="dense"
                    label="Cmimi"
                    type="number"
                    fullWidth
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    label="Pershkrimi"
                    type="text"
                    fullWidth
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Anulo
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    Shto
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddStockEntryDialog;
