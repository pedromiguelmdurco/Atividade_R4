import React, {useState, useEffect} from 'react';
import {Jumbotron,Form,Col,Button} from 'react-bootstrap'; 
import axios from 'axios';
import Usuario from '../classes/Usuarios'
import '../assets/contacard.css';

export const PerfilForm = () => {
    const objUser = new Usuario();

    const [nome, setNome] = useState("");
    const [cep, setCep] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [telefone, setTelefone] = useState("");
    const [usuario, setUsuario] = useState(
        {
            email: "",
            id: 0,
            nome: "",
            senha: "",
            status: "",
            telefone: ""
        }
    );
    useEffect(()=>{
        const user = objUser.readUser(localStorage.getItem('session'));
        setUsuario(user);
        setEmail(user.email);
        setSenha(user.senha);
        setNome(user.nome);
        setTelefone(user.telefone);
    }, []);

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
        event.preventDefault();
        try{
            axios.get(`http://viacep.com.br/ws/${cep}/json/`).then(response => {
            if(response.data.erro){
                throw new Error('Cep não existe');
            }else{
                return response.data;
            }
        }).then(
            async response => {
                const dados = {
                    id: localStorage.getItem('session'),
                    nome,
                    endereco: response,
                    senha,
                    email,
                    telefone,
                    status: 'ativo',
                }
                objUser.update(dados);
                alert('Usuario atualizado com sucesso');
            }
        ).catch(error => {
            alert(`Erro: ${error}`);
        });
        }catch(error){
            alert(`Erro: ${error.message}`)
        }
    }

    return(

    <Jumbotron id="perfilform">
        <form onSubmit={handleSubmit}>
            <Form.Row id="cadform">
            <Form.Group as={Col} md="6" controlId="formBasicEmail">
            <Form.Label id="formlbl">Nome:</Form.Label>
            <Form.Control required type="text" placeholder="Okita" value={nome} onChange={handleChangeNome}/>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="6"controlId="formBasicTelephone">
            <Form.Label id="formlbl">Telefone:</Form.Label>
            <Form.Control required type="number" placeholder="(31)98909-3846" value={telefone} onChange={handleChangeTelefone}/>
            </Form.Group>

            <Form.Group as={Col} md="12" controlId="formBasicEmail">
            <Form.Label id="formlbl">Email:</Form.Label>
            <Form.Control required type="email" placeholder="exemplo@email.com" value={email}  onChange={handleChangeEmail}/>
            </Form.Group>

            <Form.Group as={Col} md="12" controlId="formBasicEmail">
            <Form.Label id="formlbl">Cep:</Form.Label>
            <Form.Control required type="text" placeholder="31270390" minLength="8" maxLength="8" onChange={handleChangeCep}/>
            </Form.Group>

            <Form.Group as={Col} md="12" controlId="formBasicPassword">
            <Form.Label id="formlbl">Senha:</Form.Label>
            <Form.Control required type="password" placeholder="" value={senha} onChange={handleChangeSenha}/>
            <Form.Text className="text-muted">
            Não compartilhe essa informação com mais ninguem!
            </Form.Text>
            </Form.Group>

            <Button variant="success" type="submit" id="formlbl">
            Salvar
            </Button>
            </Form.Row>
        </form>
    </Jumbotron>

)}