import { NavLink, useLocation } from 'react-router-dom';
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
                <Navbar.Brand as={NavLink} to="/" className={location.pathname === '/' ? 'active-nav-link' : ''}>
                    Menaxhimi i stokut
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link
                            as={NavLink}
                            to="/products"
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
                                as={NavLink}
                                to="/stockentries"
                                className={location.pathname === '/stockentries' ? 'active-nav-link' : ''}
                            >
                                Hyrje
                            </NavDropdown.Item>
                            <NavDropdown.Item
                                as={NavLink}
                                to="/stockexits"
                                className={location.pathname === '/stockexits' ? 'active-nav-link' : ''}
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
