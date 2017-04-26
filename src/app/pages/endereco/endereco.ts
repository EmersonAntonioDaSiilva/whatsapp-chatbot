import { Municipio } from './municipio';

export class Endereco {
    id: number;
    cep: string;
    logradouro: string;
    municipio: Municipio;
    bairro: string;
    
}