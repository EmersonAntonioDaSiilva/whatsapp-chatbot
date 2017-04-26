import { MessageService } from './../../message.service';
import { Estado } from './estado';
import { Municipio } from './municipio';
import { Endereco } from './endereco';

import { Injectable } from '@angular/core';

@Injectable()
export class EnderecoService {
  private endereco: Endereco;

  private enderecos: Array<Endereco> = new Array<Endereco>();

  constructor(private messageService: MessageService) {
    this.inicializar();
   }

  private inicializar(){
    this.endereco = new Endereco();
    this.endereco.id = 1;
    this.endereco.cep = '06162-010';
    this.endereco.logradouro = 'Rua Maria de Lourdes Galvão de França';
    this.endereco.bairro = 'Jd. Padroeira';

    this.endereco.municipio = new Municipio();
    this.endereco.municipio.nome = 'Osasco';
    this.endereco.municipio.estado = new Estado();
    this.endereco.municipio.estado.nome = 'São Paulo';
    this.endereco.municipio.estado.uf = 'SP';
    this.enderecos.push(this.endereco);

    this.endereco = new Endereco();
    this.endereco.id = 2;
    this.endereco.cep = '06154-224';
    this.endereco.logradouro = 'Rua José Maria de Barros';
    this.endereco.bairro = 'Jd. Padroeira';

    this.endereco.municipio = new Municipio();
    this.endereco.municipio.nome = 'Osasco';
    this.endereco.municipio.estado = new Estado();
    this.endereco.municipio.estado.nome = 'São Paulo';
    this.endereco.municipio.estado.uf = 'SP';
    this.enderecos.push(this.endereco);

    this.endereco = new Endereco();
    this.endereco.id = 3;
    this.endereco.cep = '06162-290';
    this.endereco.logradouro = 'Rua Maria Bombonatti da Silva';
    this.endereco.bairro = 'Jd. Padroeira';

    this.endereco.municipio = new Municipio();
    this.endereco.municipio.nome = 'Osasco';
    this.endereco.municipio.estado = new Estado();
    this.endereco.municipio.estado.nome = 'São Paulo';
    this.endereco.municipio.estado.uf = 'SP';
    this.enderecos.push(this.endereco);

    this.endereco = new Endereco();
    this.endereco.id = 4;
    this.endereco.cep = '06162-100';
    this.endereco.logradouro = 'Rua Maria Nazaré do Espírito Santo';
    this.endereco.bairro = 'Jd. Padroeira';

    this.endereco.municipio = new Municipio();
    this.endereco.municipio.nome = 'Osasco';
    this.endereco.municipio.estado = new Estado();
    this.endereco.municipio.estado.nome = 'São Paulo';
    this.endereco.municipio.estado.uf = 'SP';
    this.enderecos.push(this.endereco);

    this.endereco = new Endereco();
    this.endereco.id = 5;
    this.endereco.cep = '06162-150';
    this.endereco.logradouro = 'Rua Maria Quitéria de Jesus Medeiros';
    this.endereco.bairro = 'Jd. Padroeira';

    this.endereco.municipio = new Municipio();
    this.endereco.municipio.nome = 'Osasco';
    this.endereco.municipio.estado = new Estado();
    this.endereco.municipio.estado.nome = 'São Paulo';
    this.endereco.municipio.estado.uf = 'SP';
    this.enderecos.push(this.endereco);
  }

  search(endereco: Endereco){
    this.messageService.addInformationMessage('Apenas estes registros foram encontrados!')
    return this.enderecos;

  }

  insert(endereco: Endereco){
    endereco.id = this.enderecos.length;
    this.enderecos.push(endereco);
    this.messageService.addSucessfulMessage('O Endereço: ' + endereco.logradouro + ' foi incluido com sucesso!')
  }

  update(endereco: Endereco){
    
  }

  delete(endereco: Endereco){
    for(let end  of this.enderecos){
      if(end.id === endereco.id){
        console.log(end);
      }
    }

    this.messageService.addErrorMessage('O Endereço: ' + endereco.logradouro + ' não pode ser excluido!')
  }
}
