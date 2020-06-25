import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {Col,Form,Jumbotron,Button} from 'react-bootstrap';
import Categoria from '../../classes/Categorias'
import Conta from '../../classes/Contas'
import {Navigationbar} from '../../components/Navbar'
import {Layout} from '../../components/Layout'
const H5 = styled.h5`
    color: grey;
    font-weight: normal;
    font-size: 15px;
    font-family: 'Exo 2', sans-serif;`
;
const H2 = styled.h5`
    font-family: 'Exo 2', sans-serif;
    font-weight: Bolder;
    font-size: 35px;`

export const CriarConta = ()=>{
    const objCat = new Categoria();
    const objConta = new Conta();

    const [categorias, setCategorias] = useState([]);
    const [nome, setNome] = useState("");
    const [valor, setValor] = useState("");
    const [tipo, setTipo] = useState("");
    const [categoria, setCategoria] = useState("");

    useEffect(()=>
    {
        const cats = objCat.readUser(localStorage.getItem('session'))
        if(cats.length === 0){
            alert('você deve cadastrar uma categoria primeiro')
        }else{
            setCategorias(cats);
        }
    }, []);

    function handleSubmit(event){
        event.preventDefault();
        const dados = {
            id: Date.now(),
            nome,
            tipo,
            categoria,
            valor,
            usuario: localStorage.getItem('session')
        }
        objConta.create(dados);
    }

    function handleChangeNome(event){
        setNome(event.target.value);
    }
    function handleChangeValor(event){
        setValor(event.target.value);
    }
    function handleChangeTipo(event){
        setTipo(event.target.value);
    }
    function handleChangeCategoria(event){
        setCategoria(event.target.value);
    }

    return(
        <>
        <Navigationbar/>
        <Layout>
        <H2>Cadastre uma conta</H2>
            <Jumbotron id="perfilform">
                <form onSubmit={handleSubmit}>
                    <Form.Row id="cadform">
                        <Form.Group as={Col} md="6" controlId="formBasicEmail">
                        <Form.Label id="formlbl">Nome:</Form.Label>
                        <Form.Control type="text" placeholder="" onChange={handleChangeNome} required/>
                        </Form.Group>
                
                        <Form.Group as={Col} md="6"controlId="formBasicTelephone">
                        <Form.Label id="formlbl">Valor:</Form.Label>
                        <Form.Control type="number" onChange={handleChangeValor} required/>
                        </Form.Group>
                
                        <Form.Group as={Col} md="6" controlId="formGridState">
                                <Form.Label>Tipo</Form.Label>
                                <Form.Control as="select" onChange={handleChangeTipo} required>
                                <option value="">Selecione uma opção</option>
                                <option value="Entrada">Entrada</option>
                                <option value="Saida">Saida</option>
                                </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} md="6" controlId="formGridState">
                                <Form.Label>Categoria</Form.Label>
                                <Form.Control as="select" onChange={handleChangeCategoria} required>
                                <option value="">Selecione uma opção</option>
                                {
                                    categorias.map(cat=>(
                                        <option key={cat.id} value={cat.nome}>{cat.nome}</option>
                                    ))
                                }
                                </Form.Control>
                        </Form.Group>
                        
                    </Form.Row>
                    <Button style={{width: '100%'}} variant="success" type="submit" id="formlbl">
                    Salvar
                    </Button>
                </form>
            </Jumbotron>
        </Layout>
        </>
    )
}