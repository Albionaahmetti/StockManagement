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
} from '@mui/material'; import { IStockOut } from '../types/IStockOut';
import { ApiResponse } from '../types/ApiResponse';
import axios from 'axios';
import { StockEntry } from '../types/Entry';

interface EditStockOutDialogProps {
    open: boolean;
    entry: IStockOut | null;
    onClose: () => void;
    onSave: (entry: IStockOut) => void;
}

const EditStockOutDialog: React.FC<EditStockOutDialogProps> = ({ open, entry, onClose, onSave }) => {
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [price, setPrice] = useState(0);
    const [entries, setEntries] = useState<StockEntry[]>([]);
    const [idStockEntry, setIdStockEntry] = useState<number | string>('');

    const fetchEntries = async () => {
        try {
            const res = await axios.get<ApiResponse<StockEntry>>('/api/stockEntries/ListAllStockEntries');
            if (res.data.statusCode === 0) {
                setEntries(res.data.result);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        fetchEntries();
    }, [open]);

    useEffect(() => {
        if (entry) {
            setDescription(entry.description);
            setIdStockEntry(entry.idStockEntry);
            setPrice(entry.price);
            setQuantity(entry.quantity);
        } else {
          
            setDescription('');
            setIdStockEntry(0);
            setPrice(0);
            setQuantity(0);
        }
    }, [entry]);

    const handleSave = () => {
        if (entry) {
            const updatedEntry: IStockOut = {
                ...entry, 
                description,
                idStockEntry: Number(idStockEntry),
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
                    <InputLabel id="product-select-label">Zgjedh hyrjen:</InputLabel>
                    <Select
                        labelId="product-select-label"
                        value={idStockEntry}
                        onChange={(e) => setIdStockEntry(Number(e.target.value))}
                        renderValue={(selected) => {
                            const selectedEntry = entries.find((entry) => entry.id === Number(selected));
                            return selectedEntry ? selectedEntry.descriptionForStockOut : 'Zgjedh hyrjen';
                        }}
                        disabled // This makes the Select component readonly
                    >
                        {entries.map((entry) => (
                            <MenuItem key={entry.id} value={entry.id}>
                                {entry.descriptionForStockOut}
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

export default EditStockOutDialog;
