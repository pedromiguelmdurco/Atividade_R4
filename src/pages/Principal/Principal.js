import React, {useEffect, useState} from 'react';
import Conta from '../../classes/Contas';
import Grafico from '../../components/Grafico.js';
import {Jumbotron,Row,CardDeck} from 'react-bootstrap';
import {EntradasCard,
        SaidasCard,
        AjudaCard,
        SituaCard} from '../../components/ContaCard';
import '../../assets/contacard.css';
import {Navigationbar} from '../../components/Navbar';
import {Layout} from '../../components/Layout';


export const Principal = () => {
    const objConta = new Conta();

    const [entradas, setEntradas] = useState(0);
    const [saidas, setSaidas] = useState(0);
    const [total, setTotal] = useState(0);
    useEffect(()=>{
        const contas = objConta.readUser(localStorage.getItem('session'));
        let ativa = 0;
        let passiva = 0;
        let total = 0;
        contas.forEach(conta =>{
            if(conta.tipo == "Entrada"){
                ativa++;
                total += Number(conta.valor);
            }else{
                passiva++
                total -= Number(conta.valor);
            }
        });
        setTotal(total);
        setSaidas(passiva);
        setEntradas(ativa);
    },[])

    return(
    <>
    <Navigationbar/>
    <Layout>
    <Row>
       <Jumbotron id="menu">
           <CardDeck>
                <EntradasCard numero={entradas}/>
                <SaidasCard numero={saidas}/>
                <AjudaCard valor={total}/>
            </CardDeck>
       </Jumbotron>
    </Row>
    <Row>
        <Jumbotron id="menu">
            <CardDeck>
                <SituaCard situacao={total > 0}/>  
            </CardDeck>
        </Jumbotron> 
    </Row>
    <Row>
        <Jumbotron id="menu">
            <Grafico dados={objConta.readUser(localStorage.getItem('session'))}/>
        </Jumbotron>
    </Row>
    </Layout>
    </>
)}