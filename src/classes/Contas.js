class Contas{
    create(dados){
        const contas = this.read();
        const index = contas.findIndex(conta=> conta.nome == dados.nome && conta.usuario == dados.usuario);
        if(index == -1){
            contas.push(dados);
            localStorage.setItem('contas',JSON.stringify(contas));
            alert("Conta cadastrada com sucesso");
        }else{
            alert("não pode criar duas contas com mesmo nome");
        }
    }
    read(){
        const localData = JSON.parse(localStorage.getItem('contas'));
        if(localData === null){
            localStorage.setItem('contas', JSON.stringify([]));
        }
        return JSON.parse(localStorage.getItem('contas'));
    }
    readUser(session){
        const todasContas = this.read();
        const contasFiltradas = todasContas.filter(conta => conta.usuario == session);
        return contasFiltradas;
    }
    update(){

    }
    delete(id){
        const contas = this.read();
        const index = contas.findIndex(conta => conta.id == id);
        const deletado = contas.splice(index,1);
        localStorage.setItem('contas', JSON.stringify(contas));
        return `A categoria ${deletado[0].nome} foi excluida`;
    }
}

export default Contas;