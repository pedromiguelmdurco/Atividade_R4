import React from 'react';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import {Home} from './pages/Home/Home';
import {Contas} from './pages/Contas/Contas'
import {NoMatch} from './pages/NoMatch/NoMatch';
import {Perfil} from './pages/Perfil/Perfil';
import {CadForm} from './pages/Cadastrar/Cadastrar';
import {Principal} from './pages/Principal/Principal';
import {ContaDetalhe} from './pages/ContaDetalhe/ContaDetalhe';
import {Categorias} from './pages/Categoria/Categoria';
import {CriarConta} from './pages/CriarConta/CriarConta';

export const Routes =  () => (
        
    <Router >
        <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/Cadastrar" component={CadForm}/>
        <Route exact path="/Contas" component={Contas}/>
        <Route exact path="/Perfil" component={Perfil}/>
        <Route exact path="/Principal" component={Principal}/>
        <Route exact path="/Categorias" component={Categorias}/>
        <Route exact path="/Contas/ContaDetalhe" component={ContaDetalhe}/>
        <Route exact path="/Contas/CriarContas" component={CriarConta} />
        <Route component={NoMatch}/>
        </Switch>
    </Router>
);