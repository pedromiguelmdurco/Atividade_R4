class Lancamento{
    create(dados){
        const lancamentos = this.read();
        const contas = JSON.parse(localStorage.getItem('contas'));
        console.log(contas);
        const index = contas.findIndex(conta => conta.id == dados.conta);

        contas[index].valor = String(Number(contas[index].valor) + Number(dados.valor));

        localStorage.setItem('contas', JSON.stringify(contas) );

        lancamentos.push(dados);
        localStorage.setItem('lancamentos', JSON.stringify(lancamentos));
        alert('Lançamento feito');
        
    }
    read(){
        const localData = JSON.parse(localStorage.getItem('lancamentos'));
        if(localData === null){
            localStorage.setItem('lancamentos', JSON.stringify([]));
        }
        return JSON.parse(localStorage.getItem('lancamentos'));
    }
    readHistory(conta){
        const localData = this.read();
        return localData.filter(lanc=> lanc.conta == conta);
    }
}
export default Lancamento;