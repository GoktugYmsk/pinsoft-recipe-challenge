import React, { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap';
import Header from '../header';
import Content from '../content';
import Footer from '../footer';
import HamburgerMenu from '../hamburgerMenu';

import './index.scss'
import { useSelector } from 'react-redux';


function Layout() {

    const isHamburger = useSelector((state) => state.recipeBooleanControl.isHamburger);

    useEffect(() => {
        console.log('isHamburger', isHamburger)
    }, [isHamburger]);

    return (
        <>
            <div className={`container-layout ${isHamburger ? 'opacityActive' : ''}`} >
                <Row>
                    <Col md={12} >
                        <Header />
                    </Col>
                </Row>
                <Row>
                    <Col md={12} >
                        <Content />
                    </Col>
                </Row>
                {/* <Row>
                <Col md={12} >
                    <Footer />
                </Col>
            </Row> */}
            </div>
            {isHamburger &&
                <HamburgerMenu />
            }
        </>
    )
}

export default Layout
