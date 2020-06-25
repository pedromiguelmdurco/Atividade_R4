import React, {useState} from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom'
import {Layout} from '../../components/Layout'
import Usuario from '../../classes/Usuarios'
import {Form,
        Button,
        Col,
        InputGroup,} from 'react-bootstrap'; 
// import { FaUserCircle, FaLock, FaPhone } from 'react-icons/fa';
import '../../assets/CadForm.css';
    
    

export const CadForm = () =>{
    const [nome, setNome] = useState("");
    const [cep, setCep] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [telefone, setTelefone] = useState("");

    function handleChangeNome(event){
        setNome(event.target.value);
    }
    function handleChangeCep(event){
        setCep(event.target.value);
    }
    function handleChangeEmail(event){
        setEmail(event.target.value);
    }
    function handleChangeSenha(event){
        setSenha(event.target.value);
    }
    function handleChangeTelefone(event){
        setTelefone(event.target.value);
    }
    
    function handleSubmit(event){
        try{
        event.preventDefault();
        axios.get(`http://viacep.com.br/ws/${cep}/json/`).then(response => {
            if(response.data.erro){
                throw new Error('Cep não existe');
            }else{
                return response.data;
            }
        }).then(
            async response => {
                const dados = {
                    id: Date.now(),
                    nome,
                    endereco: response,
                    senha,
                    email,
                    telefone,
                    status: 'ativo',
                }
                const objUser = new Usuario();
                objUser.create(dados);
                alert('Usuario criado com sucesso');
                history.push('/');
            }
        ).catch(error => {
            alert(`Erro: ${error}`);
        });
        }catch(error){
            alert(`Erro: ${error.message}`)
        }
        
        
    }

    const history = useHistory();

    return(
        <Layout>
            <form action="" onSubmit={handleSubmit}>
                
                <Form.Row id="cadform">

                    <Form.Group as={Col} md="12" controlId="formBasicEmail">
                    <Form.Label id="formlbl">Nome:</Form.Label>
                    <InputGroup.Prepend>
                        <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                    <Form.Control onChange={handleChangeNome} type="text" aria-describedby="inputGroupPrepend" placeholder="Digite seu nome" required/>
                    </InputGroup.Prepend>
                    </Form.Group>

                    <Form.Group as={Col} md="12"controlId="formBasicTelephone">
                    <Form.Label id="formlbl">Telefone:</Form.Label>
                    <Form.Control type="number" onChange={handleChangeTelefone} placeholder="(00)0000-0000" minLength="10" required/>
                    </Form.Group>

                    <Form.Group as={Col} md="12" controlId="formBasicEmail">
                    <Form.Label id="formlbl">Email:</Form.Label>
                    <Form.Control type="email" onChange={handleChangeEmail} placeholder="exemplo@email.com" required/>
                    </Form.Group>

                    <Form.Group as={Col} md="12" controlId="formBasicEmail">
                    <Form.Label id="formlbl">Cep:</Form.Label>
                    <Form.Control onChange={handleChangeCep} type="text" placeholder="XXXXXXXX" minLength="8" maxLength="8" required/>
                    </Form.Group>

                    <Form.Group as={Col} md="12" controlId="formBasicPassword">
                    <Form.Label id="formlbl">Senha:</Form.Label>
                    <Form.Control type="password" onChange={handleChangeSenha} placeholder="" required/>
                    <Form.Text className="text-muted">
                    Não compartilhe essa informação com mais ninguem!
                    </Form.Text>
                    </Form.Group>

                    <Button variant="dark" type="submit" id="formlbl">
                    Cadastrar
                    </Button>
                </Form.Row>
            </form>
        </Layout>
)}

