// AddProductDialog.tsx
import React from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

interface AddProductDialogProps {
    open: boolean;
    onClose: () => void;
    onAdd: (name: string, file: File | null) => void;
}

const AddProductDialog: React.FC<AddProductDialogProps> = ({ open, onClose, onAdd }) => {
    const [name, setName] = React.useState('');
    const [file, setFile] = React.useState<File | null>(null); // State for the uploaded file

    const handleAddProduct = () => {
        if (name && file) {
            onAdd(name, file);
            setName(''); // Reset the name input
            setFile(null); // Reset the file input
            onClose();
        }
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
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="file"
                    onChange={(e) => {
                        if (e.target.files) {
                            setFile(e.target.files[0]); // Set the selected file
                        }
                    }}
                    style={{ marginTop: 16 }} // Add some space
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
