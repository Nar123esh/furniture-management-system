import React from "react";
import './footer.css';
import { Container, Row, Col ,ListGroup, ListGroupItem} from "reactstrap";
import { Link } from "react-router-dom";


const Footer = () => {

    const year =new Date().getFullYear
    return <footer className="footer">
    <Container>
        <Row>
        <Col lg='4'>
                         <div className="logo">                        
                        <div>
                            <h2 className="text-white">FURNI<h5>Shop</h5></h2>
                        </div>
                        
                        </div>
                        <p className="footer__text mt=-4">
                            Lorem ipsum dolor, sit amet consectetur
                             adipisicing elit. Dicta sapiente unde 
                             nulla nemo quo, ex sunt voluptates 
                             temporibus esse asperiores, aliquam 
                             voluptatem perspiciatis quasi quod.
                         
                        </p>
        </Col>

        <Col lg='3'>
        <div className="footer_quick-links ">
            <h4 className="quick_links-title">Top Categories </h4>
            <ListGroup>
                <ListGroupItem className="ps-0 border-0">
                    <Link to='#'style={{ textDecoration: 'none'}}> Interior Design</Link>
                </ListGroupItem>

                <ListGroupItem className="ps-0 border-0">
                    <Link to='#' style={{ textDecoration: 'none'}}>Modern Sofa</Link>
                </ListGroupItem>

                <ListGroupItem className="ps-0 border-0">
                    <Link to='#' style={{ textDecoration: 'none'}}> Arm Chair</Link>
                </ListGroupItem>

                <ListGroupItem className="ps-0 border-0">
                    <Link to='#' style={{ textDecoration: 'none'}}> Dining Table</Link>
                </ListGroupItem>
            </ListGroup>
        </div>
        </Col>

        <Col lg='2'>
        <div className="footer_quick-links">
            <h4 className="quick_links-title">Useful Links</h4>
            <ListGroup>
                <ListGroupItem className="ps-0 border-0 ">
                    <Link to='/shop' style={{ textDecoration: 'none'}}>Shop</Link>
                </ListGroupItem>

                <ListGroupItem className="ps-0 border-0">
                    <Link to='/cart' style={{ textDecoration: 'none'}}>Cart</Link>
                </ListGroupItem>

                <ListGroupItem className="ps-0 border-0">
                    <Link to='login' style={{ textDecoration: 'none'}}> Login</Link>
                </ListGroupItem>

                <ListGroupItem className="ps-0 border-0">
                    <Link to='#' style={{ textDecoration: 'none'}}>Privacy Police</Link>
                </ListGroupItem>
            </ListGroup>
            </div>
        </Col>

        <Col lg='3'>
        <div className="footer_quick-links">
            <h4 className="quick_links-title">Contact</h4>
            <ListGroup className="footer__contact">
                <ListGroupItem className="ps-0 border-0 d-flex align-item-center gap-2">
                    <span> <i class="ri-map-pin-2-line"></i></span>
                    <p>123 adresss name other</p>
                </ListGroupItem>

                <ListGroupItem className="ps-0 border-0 d-flex align-item-center gap-2">
                <span><i class="ri-phone-line"></i></span>
                    <p>+91-0000-00-0000</p>
                </ListGroupItem>

                <ListGroupItem className="ps-0 border-0 d-flex align-item-center gap-2">
                <span><i class="ri-mail-unread-line"></i></span>
                    <p>example123@gmail.com</p>
                </ListGroupItem>

            </ListGroup>
            </div>
        </Col>
        <Col lg='12'>
            <p className="footer__copyright">
                Copyright {year} developed by Panchal Naresh. All right</p>
        </Col>
        </Row>
    </Container>
    </footer>
};

export default Footer;