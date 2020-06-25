import React, {useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import {LoginForm} from '../../components/Form';
import {Layout} from '../../components/Layout';
import '../../assets/Form.css'

export const Home = ()=>{

    const history = useHistory();

    useEffect(()=>{
        if(localStorage.getItem('session') != null){
            history.push('/Principal')
        }
    },null)

    return(
    <Layout>
        <div id="fontpattern">
            
            <h2>Login</h2>
            <p>Aproxime-se para entrar no sistema</p>
            <LoginForm/>
            
        </div>
    </Layout>
)}