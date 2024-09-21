import { Outlet } from 'react-router-dom';
import Navbar from '../src/CustomNavbar'
import 'bootstrap/dist/css/bootstrap.min.css';
function MainLayout() {
    return (
        <>
            <Navbar/>
        <Outlet/>
        </>
  );
}

export default MainLayout;