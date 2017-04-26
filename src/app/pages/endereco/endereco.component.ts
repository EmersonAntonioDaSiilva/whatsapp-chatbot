import { Estado } from './estado';
import { Municipio } from './municipio';
import { EnderecoService } from './endereco.service';
import { Endereco } from './endereco';
import { ViewCommandEnum } from '../enuns/view-command.enum'

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-endereco',
  templateUrl: './endereco.component.html',
  styleUrls: ['./endereco.component.css']
})
export class EnderecoComponent implements OnInit {
  private acao: ViewCommandEnum = ViewCommandEnum.SEARCH;
  private endereco: Endereco;
  private enderecos: Array<Endereco>;

  constructor(private enderecoService: EnderecoService) {}

  ngOnInit() {
    this.inicializar();
  }

  private inicializar(){
    this.endereco = new Endereco();
    this.endereco.municipio = new Municipio();
    this.endereco.municipio.estado = new Estado();

    this.enderecos = new  Array<Endereco>();
  }

  searchDados(){
    this.acao = ViewCommandEnum.SEARCH;
    this.enderecos =  this.enderecoService.search(this.endereco);
  }

  cleanDados(){
    this.acao = ViewCommandEnum.SEARCH;
    
    this.inicializar();
  }

  insertDados(){
    this.acao = ViewCommandEnum.INSERT;
  }

  saveDados(){
    if(this.acao === ViewCommandEnum.INSERT){
      this.enderecoService.insert(this.endereco);

    }else if(this.acao === ViewCommandEnum.UPDATE){
      this.enderecoService.update(this.endereco);

    }

    this.acao = ViewCommandEnum.SEARCH;
    this.inicializar();
  }

  detailDados(endereco: Endereco){
    this.acao = ViewCommandEnum.DETAIL;

    this.endereco = endereco;

  }

  updateDados(endereco: Endereco){
    this.acao = ViewCommandEnum.UPDATE;

    this.endereco = endereco;

  }

  deleteDados(endereco: Endereco){
    this.acao = ViewCommandEnum.SEARCH;

    this.enderecoService.delete(this.endereco);

  }

  isSeach(){
    return this.acao === ViewCommandEnum.SEARCH;
  }

  isDetails(){
    return this.acao === ViewCommandEnum.DETAIL;
  }

  isEditOrNew(){
    return this.acao === ViewCommandEnum.UPDATE || this.acao === ViewCommandEnum.INSERT;
  }
}
