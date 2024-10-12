
import { useLocation } from 'react-router-dom'; 
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './CustomNavbar.css';
function CustomNavbar() {
    const location = useLocation(); 

    return (
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand
                >
                    Menagjimi stokut
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link
                            href="/products"
                            className={location.pathname === '/products' ? 'active-nav-link' : ''}
                        >
                            Produktet
                        </Nav.Link>
                        <NavDropdown
                            title="Stoku"
                            id="collapsible-nav-dropdown"
                            className={location.pathname.startsWith('/stock') ? 'active-nav-link' : ''}
                        >
                            <NavDropdown.Item
                                href="/stockentries"
                                className={location.pathname === '/stockentries ' ? 'active-nav-link' : ''}
                            >
                                Hyrje
                            </NavDropdown.Item>
                            <NavDropdown.Item
                                href="/stockout"
                                className={location.pathname === '/stockout' ? 'active-nav-link' : ''}
                            >
                                Dalje
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default CustomNavbar;
