import React, { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap';
import Header from '../header';
import Content from '../content';
import HamburgerMenu from '../hamburgerMenu';

import './index.scss'
import { useSelector } from 'react-redux';


function Layout() {

    const isHamburger = useSelector((state) => state.recipeBooleanControl.isHamburger);

    useEffect(() => {
        console.log('isHamburger', isHamburger)
    }, [isHamburger]);

    // ürün üstünde edit için popup açılacak bu yüzden opacity için ayrı bir state yaz is hamburger opacity'si için de ayrı olarak kontrol et 

    return (
        <>
            <div className={`container-layout ${isHamburger ? 'opacityActive' : ''}`} >
                <Row>
                    <Col xs={12} md={12} >
                        <Header />
                    </Col>
                </Row>
                <Row>
                    <Col md={12} >
                        <Content />
                    </Col>
                </Row>
            </div>
            {isHamburger &&
                <HamburgerMenu />
            }
        </>
    )
}

export default Layout
