import type CadastrarUsuario from "@/interfaces/CadastrarUsuario";
import type Usuario from "@/interfaces/Usuario";
import type Dividas from "@/interfaces/Dividas";
import axios from 'axios';
import type CadastroUsuario from "@/interfaces/CadastrarUsuario";

export async function obterUsuario():Promise<Usuario[]> {
    const resposta = await axios.get('http://localhost:8080/usuarios');
    // console.log(resposta)
  
    return resposta.data.content as Usuario [];
}
export async function obterDividas(divida:number):Promise<Dividas[]>{
    const resposta = await axios.get('http://localhost:8080/dividas');
    console.log( resposta)
    return resposta.data.content as Dividas []
}

export async function cadastroUsuario(salvarUsuario: CadastrarUsuario):Promise<string>{
    let body = JSON.stringify(salvarUsuario);
    console.log(body);
    const resposta = await axios.post('http://localhost:8080/usuarios',salvarUsuario);
        return resposta.data as string;
}