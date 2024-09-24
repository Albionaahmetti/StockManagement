// AddProductDialog.tsx
import React from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, FormHelperText } from '@mui/material';

interface AddProductDialogProps {
    open: boolean;
    onClose: () => void;
    onAdd: (name: string) => void;
}

const AddProductDialog: React.FC<AddProductDialogProps> = ({ open, onClose, onAdd }) => {
    const [name, setName] = React.useState('');
    const handleAddProduct = () => {
   
        if (!name) {
            <div style={{ color: 'red' }}>
                Please enter a product name
            </div>
        return;
    }
    if (name) {
        onAdd(name); 
        setName('');  
        onClose();
    }
};
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Shto produkt te ri</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Emri i produktit"
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    error={name === ''} // Add an error prop to the TextField
                />

                {!name && (
                    <FormHelperText error>
                       Ju lutem shenoni emrin e produktit!
                    </FormHelperText>
                )}
               
            </DialogContent>
            <DialogActions>
                <Button onClick={handleAddProduct} variant="contained" color="primary">Add</Button>
                <Button onClick={onClose} variant="outlined" color="secondary">Cancel</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddProductDialog;
