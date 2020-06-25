import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import {Card,Button,} from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import '../assets/contacard.css'

export const ExampleCard = (props) => {
  
  const history = useHistory();

  const [message, setMessage] = useState();

  useEffect(()=>{
    if(props.texto != 0){
      
      setMessage((<b>Parece que não há nada aqui...  :c
      Que tal criar uma conta?</b>));
    }else{
      setMessage((<b>Adicione uma nova conta</b>));
    }
  }, []);
  
  function handleClickCriar(event){
    history.push(event.target.id);
  }

  return(

    <Card id='conta' style={{ width: '18rem' }}>
       <Card.Body >        
         <Card.Title>Minhas Contas</Card.Title>
         <Card.Subtitle className="mb-2 text-muted">
          Visão geral
         </Card.Subtitle>
         <Card.Text>
          {
            message
          }
         </Card.Text>
         <Button variant="success" id="/Contas/CriarContas" onClick={handleClickCriar}> <FaPlus/> Criar Conta</Button>           
      </Card.Body>
    </Card>

)
}