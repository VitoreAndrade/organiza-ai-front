export default interface Usuario {
    id: number;
    nome: string;
    email: string;
    dividas: {
        valorTotal: number;
        valorPago: number;
        valorRestante: number;
        descricao: string;
    }[];
}
