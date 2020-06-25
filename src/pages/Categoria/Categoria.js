import React,{useEffect, useState} from 'react'
import {Row,Form,Col, Button,Jumbotron as Jumbo} from 'react-bootstrap';
import styled from 'styled-components';
import Categoria from '../../classes/Categorias'
import {CategoriaBadge} from '../../components/ContaCard';
import {Navigationbar} from '../../components/Navbar';
import {Layout} from '../../components/Layout';
import '../../assets/contacard.css';

const H2 = styled.h5`
    font-family: 'Exo 2', sans-serif;
    font-weight: Bolder;
    font-size: 35px;
`
const styleCategorias = {
    display: 'flex', 
    flexDirection: 'column',
}
const styleCategoria = {
    display: 'flex',
    justifyContent: 'space-between',
    Width: '100%',
    border: '1px solid black',
    borderRadius: '5px',
    backgroundColor: '#dcdcdc',
    color:'black',
    padding: '5px'

}

export const Categorias = () => {

    const objCat = new Categoria();

    const [categoria, setCategoria] = useState('');
    const [filtro, setFiltro] = useState([]);

    useEffect(load,[]);

    function load(){
        setFiltro(
            objCat.readUser(
                localStorage.getItem('session')
        ));
    }

    function handleSubmit(event){
        event.preventDefault();
        const data ={
            id: Date.now(),
            nome: categoria,
            usuario: localStorage.getItem('session')
        }
        objCat.create(data);
        load();
    }

    function handleChangeCategoria(event){
        setCategoria(event.target.value);
    }

    return(
    <>
    <Navigationbar/>
    <Layout>
    <Row>
        <form onSubmit={handleSubmit}>
            <Form as={Col}>
                <Form.Label><H2>Crie suas Categorias:</H2></Form.Label>
                <Form.Control 
                  required 
                  type="text" 
                  onChange={handleChangeCategoria} 
                  placeholder="Carros" />
                <Form.Text className="text-muted">
                Não repita o nome exato de uma categoria ja existente! 
                </Form.Text>
                <br/>
                <Button variant="dark" type="submit">
                    <b>Salvar</b>
                </Button>
            </Form>
        </form>
    </Row>
    <br/>
    <Row>
        <Jumbo style={styleCategorias} id="categorias">
                {
                    filtro.map(cat=>(
                        <CategoriaBadge style={styleCategoria} key={cat.nome} id={cat.id} categoria={cat.nome}/>
                    ))
                }
        </Jumbo>
    </Row>
    </Layout>
    </>
)}