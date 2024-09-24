import { DataGrid } from '@mui/x-data-grid';
import { columns } from './gridItem'; 
import axios from 'axios';
import { ApiResponse } from '../types/ApiResponse';
import { StockEntry } from '../types/Entry';
import { List } from 'immutable';
import { formatDate } from '../helpers/dataformat';
import { useEffect, useState } from 'react';
import { CircularProgress, Button } from '@mui/material';
import AddStockEntryDialog from './AddStockEntryDialog'; 

import Notification from '../notification/Notification';
function YourGridComponent() {
    const [stockEntry, setEntry] = useState<StockEntry[]>([]);
    const [loading, setLoading] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState<'success' | 'error'>('success');

    const fetchProducts = async () => {
        setLoading(true); 
        try {
            const res = await axios.get<ApiResponse<StockEntry>>('/api/stockentries/listAllStockEntries');
            const immutableList = List(
                res.data.result.map((item) => ({
                    ...item,
                    insertionDate: formatDate(item.insertionDate),
                }))
            );
            setEntry(immutableList.toJS());
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };
    const handleAlertClose = () => {
        setAlertOpen(false);
    };
    useEffect(() => {
        fetchProducts();
    }, []);

    const handleAddEntry= async (newEntry: StockEntry) => {

        setLoading(true); 
        try {
            const formData = new FormData();
            formData.append('Description', newEntry.description);
            formData.append('IDProduct', newEntry.idProduct.toString());
            formData.append('Price', newEntry.price.toString());
            formData.append('Quantity', newEntry.quantity.toString());

            const res = await axios.post<ApiResponse<StockEntry>>('/api/stockentries/createStockEntry', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (res.data.statusCode === 0) {
                setAlertMessage('Hyrja u shtua me sukses!');
                setAlertSeverity('success');
                setAlertOpen(true);
                fetchProducts();
            } else {
                setAlertMessage(`Error: Diqka shkoi keq. Ju lutem lajmeroni personin kontaktues.`);
                console.error('Error adding product:', res.data.result);
                setAlertSeverity('error');
               
            }
            setAlertOpen(true);
        } catch (error) {
            setAlertMessage('An unexpected error occurred.');
            setAlertSeverity('error');
            setAlertOpen(true);
            console.error('Error adding product:', error);
        } finally {
            setLoading(false); 
        }
    };
    return (
        <div className='mt-5'>
            {loading && (
                <div className="loading-indicator">
                    <CircularProgress />
                </div>
            )}
            <Button
                variant="contained"
                color="primary"
                onClick={() => setDialogOpen(true)}
                sx={{ marginBottom: 2 }}
            >
                Add Stock Entry
            </Button>
            <DataGrid

                rows={stockEntry}
                columns={columns}
                pageSize={5}
                columnVisibilityModel={{ id: false, idProduct: false }}
                rowsPerPageOptions={[5, 10]}
                sx={{ border: 0 }}
            />
            <AddStockEntryDialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                onAdd={handleAddEntry}
            />
            <Notification
                open={alertOpen}
                message={alertMessage}
                severity={alertSeverity}
                onClose={handleAlertClose}
            />
        </div>

    );
}

export default YourGridComponent;
