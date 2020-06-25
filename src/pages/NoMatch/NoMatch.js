import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import LinkPxl from '../../assets/Link.png';
import Coin from '../../assets/coin.gif';
import '../../assets/coinfloat.css';
import '../../assets/NoMatch.css'

export const NoMatch =()=>(

    <Container id="noresult">
        <Row>
            <Col>
                <h1> ALGO DEU ERRADO!</h1>
                <p>Essa página que você procura não existe ;w;</p>
                <p>R.I.P</p>
            </Col>
        </Row>
        <Row>
        <Col id="animationlink">
                <img style={{width:200,}}src={Coin} alt="Coin" id='coin'/>
                <img style={{width:200,}}src={LinkPxl} alt="Link" id='link' />
            </Col>
        </Row>
    </Container>
)