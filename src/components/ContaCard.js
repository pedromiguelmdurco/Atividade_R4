import React, {useEffect, useState} from 'react';
import Categoria from '../classes/Categorias'
import Conta from '../classes/Contas'
import {Card,Button} from 'react-bootstrap';
import {useHistory} from 'react-router-dom'
import { FaTrash,
         FaSearchPlus,
         FaArrowUp,
         FaArrowDown,
         FaEnvelope, } from 'react-icons/fa';
import '../assets/contacard.css';


export const ContaCard = (props) => {
    const history = useHistory();

    const objConta = new Conta();



    function handleClickDelete(){
        const message = objConta.delete(props.id);
        alert(message);
        history.go("/Contas");
    }
    function handleClickView(event){
        localStorage.setItem('sessionConta', props.id);
        history.push(event.target.id);
    }
    return(

    <Card id='conta' style={{ width: '18rem' }}>
       <Card.Body >        
         <Card.Title>{props.nome}</Card.Title>
         <Card.Subtitle className="mb-2 text-muted">
          {props.tipo}
         </Card.Subtitle>
         <Card.Text>
           {props.categoria}
         </Card.Text>
            <Card.Link><Button id="/Contas/ContaDetalhe" onClick={handleClickView} variant="outline-info"><FaSearchPlus/> Vizualizar</Button></Card.Link>
            <Card.Link><Button variant="danger" onClick={handleClickDelete}><FaTrash/>Excluir</Button></Card.Link> 
      </Card.Body>
    </Card>

)}

export const EntradasCard = (props) => (
    
    <Card className=" text-white" style={{ width: '18rem' }}>
        <Card.Header className="bg-success"><Card.Title>Entradas <FaArrowUp/></Card.Title></Card.Header>
        <Card.Body id="cardbody">
        <Card.Text>
            {props.numero}
        </Card.Text>
        </Card.Body>
    </Card>
)

export const SaidasCard = (props) => (
    
    <Card className=" text-white" style={{ width: '18rem' }}>
        <Card.Header className="bg-warning"><Card.Title>Saidas <FaArrowDown/></Card.Title></Card.Header>
        <Card.Body id="cardbody">
        <Card.Text >
                {props.numero}
        </Card.Text>
        </Card.Body>
    </Card>
)

export const AjudaCard = (props) => (
    
    <Card id="helpcard" className="bg-light text-black" style={{ width: '18rem' }}>
        <Card.Header id="cardhelp"><Card.Title> Saldo </Card.Title></Card.Header>
        <Card.Body>
            {Number(props.valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </Card.Body>
    </Card>
)

export const SituaCard = (props) => {

    if(props.situacao){
    return(
    
    <Card  className=" text-black text-center" style={{}}>
        <Card.Header className="bg-success"><Card.Title>Situação </Card.Title></Card.Header>
        <Card.Body>
        Positivo! Pelo visto você sabe bem cuidar do seu dinheiro! :)
        </Card.Body>
    </Card>
    )}else{
    return(
        <Card  className="text-black text-center" style={{}}>
            <Card.Header className="bg-danger"><Card.Title>Situação </Card.Title></Card.Header>
            <Card.Body>
            Negativo! tente controlar melhor seus gastos :/
            </Card.Body>
        </Card>
        )}

}

export const CategoriaBadge = (props) => {
    const objCat = new Categoria();

    function handleClickDelete(){
        const message = objCat.delete(props.id);
        alert(message);
        history.go('/');
    }
    const history = useHistory();
    return(
   <h5 style={props.style}>
       {props.categoria}
       <Button variant="danger" size="sm" id="excluir" onClick={handleClickDelete}>
        X
       </Button>
   </h5>
  
)}

export const Historicoentrada = (props) => (
    <p><b>{props.data}</b> Valor: {props.valor} </p>
)