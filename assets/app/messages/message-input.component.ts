import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Message } from "./message.model";
import { MessageService } from "./message.services"

@Component({
    selector: 'app-message-input',
    templateUrl: './message-input.component.html'
})

export class MessageInputComponent{

    constructor(private messageService: MessageService){}

    onSave(textoConsole: string){
        this.messageService.addMessage(textoConsole);
        console.log(textoConsole);
    }
}