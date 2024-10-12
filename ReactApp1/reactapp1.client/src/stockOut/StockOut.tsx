import { DataGrid, GridRowParams } from '@mui/x-data-grid'; 
import { columns } from './gridItem';
import axios from 'axios';
import { ApiResponse } from '../types/ApiResponse';
import { IStockOut } from '../types/IStockOut';
import { List } from 'immutable';
import { formatDate } from '../helpers/dataformat';
import { useEffect, useState } from 'react';
import { CircularProgress, Button } from '@mui/material';
import AddStokOutDialog from './AddStockOutDialog'; 
import EditStockOutDialog from './Edit'; 

import Notification from '../notification/Notification';
function YourGridComponent() {
    const [IStockOut, setOut] = useState<IStockOut[]>([]);
    const [loading, setLoading] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState<'success' | 'error'>('success');
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [selectedEntry, setSelectedEntry] = useState<IStockOut | null>(null);
    const fetchProducts = async () => {
        setLoading(true); 
        try {
            const res = await axios.get<ApiResponse<IStockOut>>('/api/stockout/listAllstockout');
            const immutableList = List(
                res.data.result.map((item) => ({
                    ...item,
                    insertionDate: formatDate(item.insertionDate),
                }))
            );
            setOut(immutableList.toJS());
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

    const openEditDialog = (entry: IStockOut) => {
        setSelectedEntry(entry);
        setEditDialogOpen(true);
    };
    const handleRowDoubleClick = (params: GridRowParams) => {
        openEditDialog(params.row);
    };

    const handleSaveEntry = async (newEntry: IStockOut) => {

        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('Id', newEntry.id.toString());
            formData.append('IDStockEntry', newEntry.idStockEntry.toString());
            formData.append('Quantity', newEntry.quantity.toString());
            formData.append('Price', newEntry.price.toString());
            formData.append('InsertionDate', newEntry.insertionDate.toString());
            formData.append('Description', newEntry.description.toString());

            const res = await axios.put<ApiResponse<IStockOut>>('/api/stockout/editStockOut', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (res.data.statusCode === 0) {
                setAlertMessage('Dalja u perditesua me sukses!');
                setAlertSeverity('success');
                setAlertOpen(true);
                fetchProducts();
                setEditDialogOpen(false);
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
    const handleDeleteEntry = async (productId: number) => {
        setLoading(true);
        try {
            const res = await axios.put<ApiResponse<IStockOut>>(`/api/stockout/deleteStockOut/${productId}`);
            if (res.data.statusCode === 0) {
                setAlertMessage('Dalja u fshi me sukses!');
                setAlertSeverity('success');
                fetchProducts();
            } else {
                setAlertMessage('Dicka shkoi keq. Ju lutem provoni perseri.');
                setAlertSeverity('error');
            }
            setAlertOpen(true);
        } catch (error) {
            setAlertMessage('Nje gabim ndodhi gjate fshirjes.');
            setAlertSeverity('error');
            setAlertOpen(true);
            console.error('Error deleting product:', error);
        } finally {
            setLoading(false);
        }
    };


    const handleAddEntry = async (newEntry: IStockOut) => {

        setLoading(true); 
        try {
            const formData = new FormData();
            formData.append('Id', newEntry.id.toString());
            formData.append('IDStockEntry', newEntry.idStockEntry.toString());
            formData.append('Quantity', newEntry.quantity.toString());
            formData.append('Price', newEntry.price.toString());
            formData.append('InsertionDate', newEntry.insertionDate.toString());
            formData.append('Description', newEntry.description.toString());

            const res = await axios.post<ApiResponse<IStockOut>>('/api/stockout/createStockOut', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (res.data.statusCode === 0) {
                setAlertMessage('Dalja u shtua me sukses!');
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
                Shto Dalje
            </Button>
            <EditStockOutDialog
                open={editDialogOpen}
                entry={selectedEntry}
                onClose={() => setEditDialogOpen(false)}
                onSave={handleSaveEntry} 
            />
            <DataGrid

                rows={IStockOut}
                columns={columns(handleDeleteEntry)}
                onRowDoubleClick={handleRowDoubleClick} 
                pageSize={5}
                columnVisibilityModel={{ id: false, idProduct: false }}
                rowsPerPageOptions={[5, 10]}
                sx={{ border: 0 }}
            />
            <AddStokOutDialog
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
