import React, { useRef, useEffect } from "react";
import "./header.css";
import { motion } from "framer-motion";
import { Container, Row, Toast } from "reactstrap";
import logo from "../../assets/images/logo.png";
import { NavLink , useNavigate} from "react-router-dom";
import usericon from "../../assets/images/usericon.jpg";
import { useSelector } from "react-redux";
import useAuth from '../../custom-hooks/useAuth';
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import {auth} from "../../firebase.config";

const nav__links = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/shop",
    display: "Shop",
  },
  {
    path: "/cart",
    display: "Cart",
  },
];

const Header = () => {
  const headerRef = useRef(null);

  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const profileActionRef = useRef(null);
  const navigate = useNavigate();
  const {currentUser} = useAuth();

  const logout =()=> {
    signOut(auth).then(()=>{
     Toast.success('Logged out');
     navigate('/home');
   }).catch(err=>{
     Toast.error(err.massage);
   })
 }

  useEffect(() => {
    const stickyHeaderFunc = () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("sticky__header");
      } else {
        headerRef.current.classList.remove("sticky__header");
      }
    };

    window.addEventListener("scroll", stickyHeaderFunc);

    return () => {
      window.removeEventListener("scroll", stickyHeaderFunc);
    };
  }, []);

  const navigateToCart =()=>{
    navigate('/cart')

    
  };

  const toggleProfileActions = () => {
    const profileActions = profileActionRef.current;
    if (profileActions) {
      profileActions.classList.toggle('show__profileActions');
    }
  };
  
  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="nav_wrapper">
            <div className="logo">
              <img src={logo} alt="logo" />
              <div>
                <h2>
                  FURNI
                  <h5>Shop</h5>
                </h2>
              </div>
            </div>
            <div className="navigation">
              <ul className="menu">
                {nav__links.map((item, index) => (
                  <li className="nav__item" key={index}>
                    <NavLink
                      style={{ textDecoration: "none" }}
                      to={item.path}
                      isActive={(match, location) =>
                        match && location.pathname === item.path
                          ? "nav__active"
                          : ""
                      }
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
            <div className="nav__icons">
              <span className="fave__icon">
                <i className="ri-heart-line"></i>
                <span className="badge">2</span>
              </span>
              <span className="cart__icon" onClick={navigateToCart}>
                <i className="ri-shopping-cart-line"></i>
                <span className="badge">{totalQuantity}</span>
              </span>

              <div className="profile">
                <motion.img whileTap={{ scale: 1.4 }} 
                src={currentUser ? currentUser.photoURL : usericon} 
                alt="" 
                onClick={toggleProfileActions}/>

                <div className="profile_actions" ref={profileActionRef}
                  onClick={toggleProfileActions}>
                  {
                    currentUser ? (
                    <span onClick={logout}>Logout</span>
                    ) : (
                    <div className="d-flex align-items-center
                    justify-content-center flex-column ">
                      <Link to='/signup'>Signup</Link>
                      <Link to='/login'>Login</Link>
                       <Link to='/dashboard'>Dashboard</Link> 
                    </div>
                  )}
                </div>

              </div>

            </div>
            <div className="mobile__menu">
              <span>
                <i className="ri-menu-line"></i>
              </span>
            </div>
          </div>
        </Row> 
      </Container>
    </header>
  );
};

export default Header;
