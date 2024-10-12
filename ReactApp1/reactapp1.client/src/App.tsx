import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

import MainLayout from '../layouts/MainLayout';
import NotFoundPage from '../pages/NotFound';
import Products from './products/Products';
import Home from './Home';
import StockIN from './stockEntries/StockEntry';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<MainLayout />} >
            <Route index element={<Home />} /> 
            <Route path='/products' element={<Products />} />
            <Route path='/stockentries' element={<StockIN />} />
            <Route path='*' element={<NotFoundPage />} />
        </Route>
    )
);

function App() {
    return (
        <RouterProvider router={router}></RouterProvider>
    );
}

export default App;
