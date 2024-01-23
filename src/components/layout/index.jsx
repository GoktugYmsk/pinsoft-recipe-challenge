import React from 'react'
import { Row, Col } from 'react-bootstrap';
import Header from '../header';
import Content from '../content';
import Footer from '../footer';

import './index.scss'


function Layout() {
    return (
        <div className='container-layout' >
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
    )
}

export default Layout
