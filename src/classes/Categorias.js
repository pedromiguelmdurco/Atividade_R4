class Categoria {
    create(dados){
        const categorias = this.read();
        const index = categorias.findIndex( cat => dados.nome == cat.nome && dados.usuario == cat.usuario);
        if(index === -1){
            categorias.push(dados);
            localStorage.setItem('categorias', JSON.stringify(categorias));
            alert('categoria criada com sucesso');
        }else{
            alert('não pode criar uma categoria igual a outra');
        }
    }
    readUser(session){
        const localData = this.read();
        const categoriasFiltradas = localData.filter(user=> user.usuario == session);
        
        return categoriasFiltradas;
    }
    read(){
        const localData = JSON.parse(localStorage.getItem('categorias'));
        if(localData === null){
            localStorage.setItem('categorias', JSON.stringify([]));
        }
        return JSON.parse(localStorage.getItem('categorias'));
    }
    delete(id){
        const categorias = this.read();
        const index = categorias.findIndex(cat => cat.id == id);
        const deletado = categorias.splice(index,1);
        localStorage.setItem('categorias', JSON.stringify(categorias));
        return `A categoria ${deletado[0].nome} foi excluida`;
    }
}
export default Categoria; 