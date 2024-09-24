import React, { useEffect, useState } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Product } from '../types/Types';

interface EditProductDialogProps {
    open: boolean;
    onClose: () => void;
    product: Product | null;
    onEdit: (updatedProduct: Product) => void;
}

const EditProductDialog: React.FC<EditProductDialogProps> = ({ open, onClose, product, onEdit }) => {
    const [name, setName] = useState('');

    useEffect(() => {
        if (product) {
            setName(product.name);
        }
    }, [product]);

    const handleEditProduct = () => {
        if (product) {
            onEdit({ ...product, name });
            setName('');
            onClose();
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Perditeso produktin</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Produkti"
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleEditProduct} variant="contained" color="primary">Perditeso</Button>
                <Button onClick={onClose} variant="outlined" color="secondary">Anulo</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditProductDialog;
