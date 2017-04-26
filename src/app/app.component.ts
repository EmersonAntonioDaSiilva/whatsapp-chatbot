import { Component } from '@angular/core';

import { MessageService } from './message.service';
import { MessageTransport } from './messageTransport';
import { MessageEnum } from './pages/enuns/message.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';

  messageTransport: MessageTransport;

  constructor(private messageService: MessageService){  }

  ngOnInit(){
    this.messageTransport = new MessageTransport();
    this.messageTransport.message = '';
    this.messageTransport.typeMessage = MessageEnum.EMPTY;

    this.messageService.mostrarMessage.subscribe(
      msg => this.messageTransport = msg
    )
  }

  isMsgError(){
    return this.messageTransport.typeMessage === MessageEnum.ERROR;
  }

  isMsgSuccessful(){
    return this.messageTransport.typeMessage === MessageEnum.SUCCESSFUL;
  }

  isMsgWarning(){
    return this.messageTransport.typeMessage === MessageEnum.WARNING;
  }
}
