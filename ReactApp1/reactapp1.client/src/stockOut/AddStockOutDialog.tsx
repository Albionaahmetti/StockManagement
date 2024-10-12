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
import { IStockOut } from '../types/IStockOut';

interface AddStockEntryDialogProps {
    open: boolean;
    onClose: () => void;
    onAdd: (newEntry: IStockOut) => void;
}

const AddStockEntryDialog: React.FC<AddStockEntryDialogProps> = ({ open, onClose, onAdd }) => {
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [entries, setEntries] = useState<StockEntry[]>([]);
    const [idStockEntry, setIdStockEntry] = useState<number | string>('');

    const fetchentries = async () => {
        try {
            const res = await axios.get<ApiResponse<StockEntry>>('/api/stockEntries/listAllStockEntries');
            if (res.data.statusCode === 0) {
                setEntries(res.data.result);
            }
        } catch (error) {
            console.error('Error fetching entries:', error);
        }
    };

    useEffect(() => {
        fetchentries();
    }, [open]);

    const handleSubmit = async () => {
        const newStockOut: IStockOut = {
            id: 0,
            description,
            quantity: parseFloat(quantity),
            price: parseFloat(price),
            insertionDate: new Date().toISOString(),
            idStockEntry: Number(idStockEntry),
            productName: '',
            stockEntry: ''
        };

        try {
            onAdd(newStockOut);
            onClose();

        } catch (error) {
            console.error('Error adding stock entry:', error);
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Shto dalje te re</DialogTitle>
            <DialogContent>

                <FormControl fullWidth margin="dense">
                    <InputLabel id="product-select-label">Zgjedh hyrjen:</InputLabel>
                    <Select
                        labelId="product-select-label"
                        value={idStockEntry}
                        onChange={(e) => setIdStockEntry(e.target.value)}
                    >
                        {entries.map((entry) => (
                            <MenuItem key={entry.id} value={entry.id}>
                                {entry.descriptionForStockOut}
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
