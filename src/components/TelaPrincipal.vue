<template>
  <main class="apresentacao-impeditivo">
    <section class="conteudo-impeditivo">
      <div class="titulo-cadastro-impeditivo">
        <label class="nome-titulo">
          Organiza ai man
        </label>
      </div>
      <span class="divisoria-titulo"></span>
      <section class="selecionar-periodo-ocorrencia">
        <form @submit.prevent="salvarCadastro">
      <label for="nome">Nome:</label>
      <input v-model="usuario.nome" type="text" id="nome" required />

      <label for="email">Email:</label>
      <input v-model="usuario.email" type="email" id="email" required />

      <label for="cpf">CPF:</label>
      <input v-model="usuario.cpf" type="text" id="cpf" required />
      <label for="cpf">idade:</label>
      <input v-model="usuario.idade" type="text" id="cpf" required />

      <button type="submit">Salvar</button>
    </form>
        <div class="selecionar-periodo">
          <label for="periodo" class="label-periodo">
            Período <strong>*</strong>
          </label>
          <Dropdown v-model="usuarioSelecionado" :options="usuarios" optionValue="id" optionLabel="nome"
            placeholder="Selecione um usuário" class="dropdown-periodo " />
        </div>
          <Dropdown v-model="dividaSelecionada" :options="dividas" option-label="descricao"
              option-value="id" placeholder="Selecione uma divida" class="dropdown-ocorrencia" @change="obterDebito"/>
        
        <!-- <label for="Ocorrencia" class="label-ocorrencia">
          Ocorrência <strong>*</strong>
        </label>
        <div class="selecionar-ocorrencia">
          <Dropdown
            option-value="idOcorrencia" placeholder="Selecione uma ocorrência" class="dropdown-ocorrencia" />
          <Button label="Secondary" severity="secondary" class="adicionar-ocorrencia"
            @click="">Adicionar ocorrência</Button>
        </div> -->
      </section>
      <div class="listagem">
        <div class="ocorrencias-selecionadas">
          <DataTable :value="listaOcorrencia" tableStyle="min-width: 50rem;">
            <Column field="valorTotal" header="valor total" style="display: flex;text-align: ;"></Column>
            <Column field="valorPago" header="valor pago"></Column>
            <Column field="valorRestante" header="valor restante"></Column>
            <Column field="descricao" header="descricao"></Column>
        </DataTable>
        </div>
      </div>

    </section>
  </main>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import Dropdown from 'primevue/dropdown';
import { obterDividas, obterUsuario, cadastroUsuario } from '@/http'
import type Usuario from '@/interfaces/Usuario'
import type Dividas from '@/interfaces/Dividas';
import type CadastrarUsuario from '@/interfaces/CadastrarUsuario';
export default defineComponent({
components:{
      Dropdown,

    },
  data(){
 
      return{
          usuarios: [] as Usuario [],
          usuarioSelecionado: 0,
          listaOcorrencia: [] as Dividas [],
          dividas: [] as Dividas [],
          dividaSelecionada: 0, 
          usuario:{
        nome: '',
        email: '',
        cpf: '',
        idade: 0,
      },
          
          
      }

  },
  methods:{
   async obterUser(){
      const user = await obterUsuario() as Usuario [];
      this.usuarios = user

    },
    async obterDebito(){
      const dividas = await obterDividas(this.usuarioSelecionado) as Dividas [];
      this.dividas = dividas
      // if (this.usuarioSelecionado) {
      //   const dividas = await obterDividas(this.usuarioSelecionado) as Dividas [];
      //   const dividendo = dividas.map((divida:{id: number; valorTotal: number;
      //     valorPago: number; valorRestante: number; descricao: string; situacaoDividas: string }) => ({
      //     id: divida.id,
      //     valorTotal: divida.valorTotal,
      //     valorPago:divida.valorPago,
      //     valorRestante: divida.valorRestante,
      //     descricao: divida.descricao,
      //     situacaoDividas: divida.situacaoDividas
      //   }));
      //   this.dividas = dividas
      //   this.listaOcorrencia.push(...dividendo)
      //   console.log(this.listaOcorrencia);
        
     
      
      // } 
    

    },
    async salvarCadastro(){
      const salvar =  await cadastroUsuario(this.usuario);
    }

  },
  async created(){
    this.obterUser()
    this.obterDebito()
    
  }


})
</script>
  <style scoped>
  .titulo-cadastro-impeditivo {
    padding: 0 2%;
    height: 8%;
    display: flex;
    align-items: end;
  }
  
  .divisoria-titulo {
    background-color: var(--cor-marcacao);
    display: inline-block;
    width: 96%;
    height: 3px;
    margin: 8px 20px;
  }
  
  .apresentacao-impeditivo {
    padding: 0% 10%;
  }
  
  .conteudo-impeditivo {
    width: 100%;
    height: 50rem;
    background-color: white;
  }
  
  .selecionar-periodo-ocorrencia {
    display: flex;
    flex-direction: column;
    padding: 2% 18%;
    margin-bottom: 16px;
  }
  
  .selecionar-periodo {
    width: 38%;
    display: flex;
    flex-direction: column;
    padding: 2% 2px;
    gap: 10px;
    border-radius: 10px;
  }
  
  .dropdown-periodo {
    border-radius: 5px;
    height: 30px;
    align-items: center;
    padding: 0 2%;
  
  }
  
  .selecionar-ocorrencia {
    width: 95%;
    display: flex;
    padding: 1% 2px;
    gap: 10px;
    border-radius: 10px;
    background-color: blue;
  }
  
  .dropdown-ocorrencia {
    border-radius: 5px;
    height: 30px;
    align-items: center;
    padding: 0 2%;
    width: 100%;
  }
  
  strong {
    color: red
  }
  
  .adicionar-ocorrencia {
    width: 40%;
    justify-content: center;
    background-color: var(--cor-marcacao);
  }
  
  .salvar-cancelar {
    width: 60%;
      display: flex;
      gap: 73%;
      margin-top: 20px;
      position: relative;
      margin-inline: 20%;
      justify-content: left;
  }
  
  a {
    text-decoration: none;
  }
  
  
  .enviar {
    width: 12%;
    height: 2rem;
    margin-bottom: 10px;
    background-color: limegreen;
    border-radius: 5px;
    box-shadow: 0px 0px 0px 0px;
  }
  
  .cancelar {
    width: 12%;
    height: 2rem;
    margin-bottom: 10px;
    border: var(--cor-marcacao) 1px solid;
    box-shadow: 0px 0px 0px 0px;
    border-radius: 5px;
  }
  
  .listagem {
    width: 61%;
    height: 20rem;
    background-color: white;
    box-shadow: 0px -5px 0px -2px var(--cor-marcacao);
    margin: 0 18%;
    display: flex;
    margin-bottom: 30px;
    overflow-x: hidden;
  
  }
  
  .icone-excluir {
    font-size: 16px;
    background-color: transparent;
    border: none;
    color: #044cf4;
    background-color: transparent;
    border: none;
    color: var(--cor-marcacao);
  
  }
  
  .footer {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 15px 0;
    background-color: white;
    color: darkgray;
    width: 100%;
    box-sizing: border-box;
  }
  .ocorrencias-selecionadas {
    text-align: center;
    width: 100%;
  
    display: flex;
    overflow-y: auto;
    overflow-x: hidden;
    max-height: 300px;
  }
  
  .area-footer {
    max-width: 1081px;
    margin: 0 auto;
    width: 100%;
    box-sizing: border-box;
  }
  
  
  .table {
    width: 100%;
    height: 0;
    border-collapse: collapse;
  }
  
  .table th,
  .table td {
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #ddd;
    height: 2rem;
  
  }
  
  .table th {
    background-color: white;
    padding: 8px;
    top: 0;
    position: sticky;
    z-index: 1;
  }
  
  .table tbody tr:nth-child(even) {
    background-color: white;
  }
  
  .table tbody tr:nth-child(odd) {
    background-color: #d5eaf1;
  }
  
  @media only screen and (max-width: 943px) {
    .conteudo-impeditivo {
      height: 50rem;
    }
  
    .divisoria-titulo {
      width: 80%;
    }
  
    .selecionar-ocorrencia {
      display: flex;
      flex-direction: column;
    }
  
    .titulo-cadastro-impeditivo {
      font-size: 1.2rem;
    }
  
    .adicionar-ocorrencia {
      width: 100%;
    }
  
    .salvar-cancelar {
      flex-direction: column;
      
     
    }
  
    .selecionar-periodo-ocorrencia {
      padding: 2% 5%;
    }
  
    .enviar,
    .cancelar {
      width: 100%;
    }
  
    .listagem {
      width: 80%;
      margin: 0 5%;
    }
  }
  
  
  </style>