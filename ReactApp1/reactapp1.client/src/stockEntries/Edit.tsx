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
} from '@mui/material'; import { StockEntry } from '../types/Entry';
import { Product } from '../types/Types';
import { ApiResponse } from '../types/ApiResponse';
import axios from 'axios';

interface EditStockEntryDialogProps {
    open: boolean;
    entry: StockEntry | null;
    onClose: () => void;
    onSave: (entry: StockEntry) => void;
}

const EditStockEntryDialog: React.FC<EditStockEntryDialogProps> = ({ open, entry, onClose, onSave }) => {
    const [description, setDescription] = useState('');
    const [idProduct, setIdProduct] = useState<number | string>('');
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
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

    useEffect(() => {
        if (entry) {
            setDescription(entry.description);
            setIdProduct(entry.idProduct);
            setPrice(entry.price);
            setQuantity(entry.quantity);
        } else {
          
            setDescription('');
            setIdProduct(0);
            setPrice(0);
            setQuantity(0);
        }
    }, [entry]);

    const handleSave = () => {
        if (entry) {
            const updatedEntry: StockEntry = {
                ...entry, 
                description,
                idProduct: Number(idProduct),
                price,
                quantity,
            };

            onSave(updatedEntry);
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Perditeso te dhenat</DialogTitle>
            <DialogContent>
                <FormControl fullWidth margin="dense">
                    <InputLabel id="product-select-label">Zgjedh produktin:</InputLabel>
                    <Select
                        labelId="product-select-label"
                        value={idProduct}
                        onChange={(e) => setIdProduct(Number(e.target.value))}
                        renderValue={(selected) => {
                            console.log(products)
                            const selectedProduct = products.find((product) => product.id === Number(selected));
                            return selectedProduct ? selectedProduct.name : 'Zgjedh produktin';
                        }}
                    >
                        {products.map((product) => (
                            <MenuItem key={product.id} value={product.id}>
                                {product.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <TextField
                    label="Pershkrimi"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    fullWidth
                    margin="dense"
                />
               
                <TextField
                    label="Cmimi"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    fullWidth
                    margin="dense"
                />
                <TextField
                    label="Sasia"
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    fullWidth
                    margin="dense"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">
                    Anulo
                </Button>
                <Button onClick={handleSave} color="primary">
                   Ruaj
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditStockEntryDialog;
