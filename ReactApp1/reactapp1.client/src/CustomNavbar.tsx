import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
function CustomNavbar() {
    return (
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="/">Menagjimi stokut</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/products">
                          Produktet
                        </Nav.Link>
                        <Nav.Link href="#pricing">Nj&#235;sia</Nav.Link>
                        <NavDropdown title="Stoku" id="collapsible-nav-dropdown">
                            <NavDropdown.Item href="/stockentries">Hyrje</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">
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