// AddProductDialog.tsx
import React from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

interface AddProductDialogProps {
    open: boolean;
    onClose: () => void;
    onAdd: (product: { id: number; name: string; filePath?: string; insertionDate: string }) => void;
}

const AddProductDialog: React.FC<AddProductDialogProps> = ({ open, onClose, onAdd }) => {
    const [newProduct, setNewProduct] = React.useState({ id: 0, name: '', filePath: '', insertionDate: '' });

    const handleAddProduct = () => {
        const formattedProduct = { ...newProduct, insertionDate: new Date().toLocaleDateString('en-GB') };
        onAdd(formattedProduct);
        setNewProduct({ id: 0, name: '', filePath: '', insertionDate: '' }); // Reset the form
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
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
                <Button onClick={onClose} variant="outlined" color="secondary">Cancel</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddProductDialog;
