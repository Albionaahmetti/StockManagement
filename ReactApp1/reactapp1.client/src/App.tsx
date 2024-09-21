


import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import MainLayout from '../layouts/MainLayout';
import NotFoundPage from '../pages/NotFound';
import Products from './products/Products';
const router = createBrowserRouter(
    createRoutesFromElements(<Route path='/' element={<MainLayout />} >
        <Route index element={<HomePage />} />
        <Route path='/products' element={<Products />} />
        <Route path='*' element={<NotFoundPage />} />

    </Route>)
);
function App()
{
    return (
        <RouterProvider router={router }></RouterProvider>
    );
}
//function App() {
//    return (
//        <Router>
//            <Routes>
//                <Route path="/" element={<Home />} />
//            </Routes>
//        </Router>
//    );
//}
export default App;