import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Grid, Typography, Card, CardContent, Box } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts';
import { ApiResponse } from './types/ApiResponse';
import { List } from 'immutable';
import { localeText } from './helpers/filterGridAlbania';


interface Product {
    id: number;
    name: string;
    totalRevenue: number;
    totalProfit: number;
    totalStock: number;
    totalOut: number;
    remainingStock: number;
}

const Dashboard = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [totalProfit, setTotalProfit] = useState(0);

    useEffect(() => {
        axios.get<ApiResponse<Product>>('/api/stockout/getStockInfo')
            .then(response => {
                const immutableList = List(
                    response.data.result.map((item, index) => ({
                        ...item,
                        id: index + 1
                    }))
                );

                setProducts(immutableList.toJS());
                const revenue = immutableList.reduce((acc: number, product: Product) => acc + (product.totalRevenue || 0), 0);
                const profit = immutableList.reduce((acc: number, product: Product) => acc + (product.totalProfit || 0), 0);

                setTotalRevenue(revenue);
                setTotalProfit(profit);
            })
            .catch(error => console.error('Error fetching product data!', error));
    }, []);

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Emri i Produktit', width: 150 },
        { field: 'totalStock', headerName: 'Totali i Stokut', type: 'number', width: 120 },
        { field: 'totalOut', headerName: 'Totali i Shitjeve', type: 'number', width: 120 },
        { field: 'remainingStock', headerName: 'Stoku i Mbetur', type: 'number', width: 150 },
        { field: 'totalRevenue', headerName: 'Te Ardhurat', type: 'number', width: 130 },
        { field: 'totalProfit', headerName: 'Fitimi', type: 'number', width: 150 },
    ];
    const decodeHtml = (html: string) => {
        const txt = document.createElement('textarea');
        txt.innerHTML = html;
        return txt.value;
    };

    // Use the helper to decode HTML entities
    const revenueData = [
        { name: decodeHtml('T&#235; Ardhurat'), value: totalRevenue },
        { name: decodeHtml('E Pashfryt&#235;zuar'), value: 1000 - totalRevenue },
    ];


    const profitData = [
        { name: decodeHtml('Fitim/Humbje'), value: totalProfit },
        { name: decodeHtml('E Pashfryt&#235;zuar'), value: 1000 - totalProfit },
    ];
    const COLORS = ['#4caf50', '#f44336'];

    return (
        <Container
            sx={{
                padding: 3,
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Typography variant="h4" gutterBottom color="primary" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                Raporti i P&#235;rgjithshs&#235;m
            </Typography>

            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={6}>
                    <Card
                        sx={{
                            padding: 3,
                            textAlign: 'center',
                            color: 'white',
                            backgroundColor: totalRevenue < 0 ? '#f44336' : '#4caf50',
                            boxShadow: 3,
                            borderRadius: 2,
                        }}
                    >
                        <CardContent>
                            <Typography variant="h6">Totali i T&#235; Ardhurave</Typography>
                            <Typography variant="h4">${totalRevenue.toLocaleString()}</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                    <Card
                        sx={{
                            padding: 3,
                            textAlign: 'center',
                            color: 'white',
                            backgroundColor: totalProfit < 0 ? '#f44336' : '#4caf50',
                            boxShadow: 3,
                            borderRadius: 2,
                        }}
                    >
                        <CardContent>
                            <Typography variant="h6">Fitimi/Humbja Totale</Typography>
                            <Typography variant="h4">${totalProfit.toLocaleString()}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <Grid container spacing={3} style={{ marginTop: 20 }}>
                <Grid item xs={12} sm={6} md={6}>
                    <Typography variant="h6" gutterBottom align="center">
                        Shperndarja e Te Ardhurave
                    </Typography>
                    <Box sx={{ textAlign: 'center' }}>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={revenueData}
                                    innerRadius={60}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {revenueData.map((_entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                                    ))}
                                </Pie>
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </Box>
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                    <Typography variant="h6" gutterBottom align="center">
                        Shperndarja e Fitimit
                    </Typography>
                    <Box sx={{ textAlign: 'center' }}>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={profitData}
                                    innerRadius={60}
                                    outerRadius={100}
                                    fill="#82ca9d"
                                    dataKey="value"
                                >
                                    {profitData.map((_entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                                    ))}
                                </Pie>
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </Box>
                </Grid>
            </Grid>

            <div style={{ height: 400, width: '100%', marginTop: 20 }}>
                <DataGrid
                    rows={products}
                    columns={columns}
                    pageSize={5}
                    columnVisibilityModel={{ id: false }}
                    localeText={localeText}
                    rowsPerPageOptions={[5]}
                    getRowClassName={(params) =>
                        params.row.totalProfit < 0 ? 'negative-profit' : 'positive-profit'
                    }
                />
            </div>
        </Container>
    );
};

export default Dashboard;
