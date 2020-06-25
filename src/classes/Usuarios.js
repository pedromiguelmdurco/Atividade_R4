
class Usuario {
    create(dados){
        const usuarios = this.read();
        usuarios.push(dados);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
    }
    read(){
        const localData = JSON.parse(localStorage.getItem('usuarios'));
        if(localData === null){
            localStorage.setItem('usuarios', JSON.stringify([]));
        }
        return JSON.parse(localStorage.getItem('usuarios'));
    }
    readUser(userId){
        const usuarios = this.read();
        const index = usuarios.findIndex(user => user.id == userId);
        return usuarios[index];
    }
    update(dados){
        const usuarios = this.read();
        const index = usuarios.findIndex(user => user.id == dados.id);
        usuarios[index] = dados;
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        alert("usuário atualizado");
    }
}
export default Usuario; 