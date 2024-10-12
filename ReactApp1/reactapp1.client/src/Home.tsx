
import { Container, Grid, Typography, Card, CardContent } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    dashboard: {
        padding: theme.spacing(3),
        display: 'flex',
        flexDirection: 'column',
    },
    card: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    gridItem: {
        margin: theme.spacing(2),
    },
}));

const Dashboard = () => {
    const classes = useStyles();

    return (
        <Container className={classes.dashboard}>
            <Typography variant="h4" gutterBottom>
                Welcome to the Dashboard
            </Typography>

            <Grid container spacing={3}>
                {/* Example Cards in Dashboard */}
                <Grid item xs={12} sm={6} md={4} className={classes.gridItem}>
                    <Card className={classes.card}>
                        <CardContent>
                            <Typography variant="h6">Products</Typography>
                            <Typography variant="body1">Manage your products</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={4} className={classes.gridItem}>
                    <Card className={classes.card}>
                        <CardContent>
                            <Typography variant="h6">Stock Entries</Typography>
                            <Typography variant="body1">Manage stock entries</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={4} className={classes.gridItem}>
                    <Card className={classes.card}>
                        <CardContent>
                            <Typography variant="h6">Stock Exits</Typography>
                            <Typography variant="body1">Manage stock exits</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Dashboard;
