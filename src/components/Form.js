import React, {useState} from 'react'
import { useHistory } from 'react-router-dom'
import Usuario from '../classes/Usuarios'
import {
        FormControl,
        Button,
        Row,
        Col,
        InputGroup} from 'react-bootstrap'; 
import { FaUserCircle } from 'react-icons/fa';
import { FaLock } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../assets/Form.css'

export const LoginForm = () =>{

    const history = useHistory();

    const [nome, setNome] =  useState();
    const [senha, setSenha] = useState(); 

    function handleChangeNome(event){
      setNome(event.target.value);
    }
    function handleChangeSenha(event){
      setSenha(event.target.value);
      console.log(senha);
    }

    async function handleSubmit(event){
      try 
      {
        event.preventDefault();
        const objUser = new Usuario();
        const usuarios = objUser.read();
        console.log(nome, senha)
        let index = usuarios.findIndex(user => user.nome == nome || user.email == nome);
        if(index != -1){
          if(usuarios[index].senha == senha){
            if(usuarios[index].status == "ativo"){
            localStorage.setItem('session', usuarios[index].id);
            await alert(`Bem vindo: ${usuarios[index].nome}`);
            history.push('/Principal');
            }else{
              throw new Error("Conta bloqueada");
            }
          }else{
            throw new Error("Senha incorreta");
          }
        }else{
          throw new Error("Usuário não encontrado");
        }

      }catch (error) {
        alert(`Erro: ${error.message}`);
      }
      
    }


  return(
      <form onSubmit={handleSubmit}>
  <InputGroup className="mb-3">
      <InputGroup.Prepend>
        <InputGroup.Text id="basic-addon1"><FaUserCircle/></InputGroup.Text>
      </InputGroup.Prepend>
      <FormControl
        required
        placeholder="Nome ou Email"
        onChange={handleChangeNome}
        aria-label="Username"
        aria-describedby="basic-addon1"
      />
    </InputGroup>
    <InputGroup className="mb-3">
      <InputGroup.Prepend>
        <InputGroup.Text id="basic-addon1"><FaLock/></InputGroup.Text>
      </InputGroup.Prepend>
      <FormControl
        required
        onChange={handleChangeSenha}
        placeholder="Senha"
        aria-label="Password"
        aria-describedby="basic-addon1"
      />
    </InputGroup>
    <Row>
      <Col xs={11}>
      <Link to="/Cadastrar" id="formlink">Não tem uma conta?</Link>
      </Col>
      <Col xs={1}>
      <Button variant="dark" type="submit">
        Entrar
      </Button>
      </Col>
    </Row>
  </form>
)}