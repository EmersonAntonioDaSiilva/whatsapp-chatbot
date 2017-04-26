import { MessageTransport } from './messageTransport';
import { MessageEnum } from './pages/enuns/message.enum';

import { Injectable, EventEmitter } from '@angular/core';



@Injectable()
export class MessageService {
  private message: MessageTransport;
  mostrarMessage = new EventEmitter<MessageTransport>();

  constructor() { }

  addErrorMessage(text: string){
    this.message = new MessageTransport();
    this.message.message = text;
    this.message.typeMessage = MessageEnum.ERROR;
    
    this.mostrarMessage.emit(this.message);
  }

  addSucessfulMessage(text: string){
    this.message = new MessageTransport();
    this.message.message = text;
    this.message.typeMessage = MessageEnum.SUCCESSFUL;
    
    this.mostrarMessage.emit(this.message);
  }

  addInformationMessage(text: string){
    this.message = new MessageTransport();
    this.message.message = text;
    this.message.typeMessage = MessageEnum.WARNING;
    
    this.mostrarMessage.emit(this.message);
  }
}
