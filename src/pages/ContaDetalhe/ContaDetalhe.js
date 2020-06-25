import React, { useEffect,useState} from 'react';
import {useHistory} from 'react-router-dom';
import Conta from '../../classes/Contas';
import Lancamento from '../../classes/Lancamentos';
import {Row,Form,Col, Button,Jumbotron as Jumbo, Spinner} from 'react-bootstrap';
import {Historicoentrada } from '../../components/ContaCard';
import styled from 'styled-components';
import '../../assets/contacard.css';
import {Navigationbar} from '../../components/Navbar';
import {Layout} from '../../components/Layout';

const H2 = styled.h5`
    font-family: 'Exo 2', sans-serif;
    font-weight: Bolder;
    font-size: 35px;
`

export const ContaDetalhe = () => {
    const objLanc = new Lancamento();
    const objConta = new Conta();

    const [conta, setConta] = useState({
        categoria: "",
        id: 0,
        nome: "",
        tipo: "",
        usuario: "",
        valor: ""
    });
    const [historico, setHistorico] = useState([
        {
            conta: "",
            data: "",
            hora: "",
            id: 0,
            valor: "0"
        }
    ]);
    const [hora, setHora] = useState();
    const [valor, setValor] = useState();
    const [data, setData] = useState();

    const history = useHistory();

    useEffect(()=>{
        const contasUser = objConta.readUser(localStorage.getItem('session'));
        const index = contasUser.findIndex(conta => conta.id == localStorage.getItem('sessionConta'));
        if(index == -1){
            alert('conta não encontrada');
            history.push('/Contas')
        }else{
            setConta(contasUser[index]);
        }
        //carregamento do histórico
        setHistorico(objLanc.readHistory(localStorage.getItem('sessionConta')));

    },[]);

    function handleSubmit(event){
        event.preventDefault();
        const dados = {
            id: Date.now(),
            conta : localStorage.getItem('sessionConta'),
            hora,
            valor,
            data
        }
        objLanc.create(dados);
        history.go('/Contas/ContaDetalhe');
    }

    function handleChangeValor(event){
        setValor(event.target.value);
    }

    function handleChangeData(event){
        setData(event.target.value);
    }

    function handleChangeHora(event){
        setHora(event.target.value)
    }

    return(
    
    <>
    <Navigationbar/>
    <Layout>
     <Row>
        <H2>Visão Geral:</H2>
        <Jumbo id="categorias-3">
            <p><b>Saldo Total:</b> {
                Number(conta.valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
            } </p>
        </Jumbo>
    </Row>
    <Row>
        <H2>Fazer Lançamento:</H2>
        <Jumbo id="categorias-2">
            <form onSubmit={handleSubmit}>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Valor</Form.Label>
                        <Form.Control type="number" placeholder="100,01" onChange={handleChangeValor} required/>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Data</Form.Label>
                        <Form.Control type="date" placeholder="30/01/2002" onChange={handleChangeData} required/>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                        <Form.Group as={Col} controlId="formGridState">
                            <Form.Label>Hora</Form.Label>
                            <input className="form-control col-md-12" type="time" step="2" onChange={handleChangeHora} required/>
                                
                        </Form.Group>
                </Form.Row>
                <Button variant="success" type="submit">
                    <b>Registrar</b>
                </Button>
            </form>
        </Jumbo>
    </Row>
    <Row>
        <H2>Histórico de Lançamentos:</H2>
        <Jumbo id="categorias">
            {
                historico.map(log =>
                    (<Historicoentrada key={log.id} data={log.data} valor={log.valor} />)
                )
            }
        </Jumbo>
    </Row>
    </Layout>
    </>
)}