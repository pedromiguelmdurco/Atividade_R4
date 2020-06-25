import React, {useEffect, useState} from 'react';
import Conta from '../../classes/Contas'
import {Row, Col} from 'react-bootstrap';
import {ExampleCard} from '../../components/ExampleConta';
import {ContaCard} from '../../components/ContaCard';
import {Navigationbar} from '../../components/Navbar';
import {Layout} from '../../components/Layout';


export const Contas = () =>{

     const objConta = new Conta;

     const [contas, setContas] = useState([]);

     useEffect( () => {

               const listaContas = objConta.readUser(localStorage.getItem('session'));
               if(listaContas.length !== 0){
                    setContas(listaContas);
               }else{
                    alert('Crie uma conta para continuar');
               }
          }    
     ,[]);
     
     return(
     <> 
     <Navigationbar/>
     <Layout>
     <Row>
        <ExampleCard texto={contas.length}/>
        {
             contas.map(conta => (
               <ContaCard key={conta.id} nome={conta.nome} tipo={conta.tipo} categoria={conta.categoria} id={conta.id}/>
             ))
        }
    </Row>
    </Layout>
     </>
)} 