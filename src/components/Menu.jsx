import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import About from './About';
import Books from './book/Books';
import Login from './user/Login';
import Cart from './book/Cart';
import { Route, Routes, useNavigate } from 'react-router-dom';

const Menu = () => {
    const navi = useNavigate();

    const onLogout = (e) => {
    e.preventDefault();
    if(window.confirm("정말 로그아웃하시겠습니까?"))
    sessionStorage.clear();
    navi('/');
}

    return (
        <>
            <Navbar expand="lg" bg="primary" data-bs-theme="dark">
            <Container fluid>
                <Navbar.Brand href="#">Home</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                <Nav
                    className="me-auto my-2 my-lg-0"
                    style={{ maxHeight: '100px' }}
                    navbarScroll>
                    <Nav.Link href="/books">도서검색</Nav.Link>
                    <Nav.Link href="/cart">장바구니</Nav.Link>
                </Nav>
                {sessionStorage.getItem('email')?
                <Nav>
                    <Nav.Link href="#">{sessionStorage.getItem('email')}</Nav.Link>
                    <Nav.Link href="#" onClick={onLogout}>로그아웃</Nav.Link>
                </Nav>
                :
                <Nav>
                    <Nav.Link href="/login">로그인</Nav.Link>
                </Nav>
                }
                </Navbar.Collapse>
            </Container>
            </Navbar>
            <Routes>
                <Route path="/" element={<About/>}/>
                <Route path="/books" element={<Books/>}/>
                <Route path="/cart" element={<Cart/>}/>
                <Route path="/login" element={<Login/>}/>
            </Routes>
        </>
      );
    }

export default Menu