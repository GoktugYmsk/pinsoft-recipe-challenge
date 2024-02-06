import React from 'react'
import { useSelector } from 'react-redux';

import { Row, Col } from 'react-bootstrap';

import Header from '../header';
import Content from '../content';
import HamburgerMenu from '../hamburgerMenu';

import './index.scss'


function Layout() {

    const isHamburger = useSelector((state) => state.recipeBooleanControl.isHamburger);

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
