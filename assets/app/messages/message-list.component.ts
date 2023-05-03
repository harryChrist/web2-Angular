import { Component, OnInit} from "@angular/core";
import { Message } from "./message.model";

import { MessageService } from "./message.services"

@Component({
    selector: 'app-message-list',
    template: `
    <div class="col-md8 col-md-offset-2">
            <app-message [messageVarClasse]="msg"
            (editClicked_MessageMetodoClasse)="msg.content = $event"
            *ngFor="let msg of messageS">
        </app-message>
    </div>`,
    providers: [MessageService]
})

export class MessageListComponent implements OnInit {

    constructor(private messageService: MessageService) {}

    messageS: Message[] = [
        new Message("user1", "Texto 1", "", ""),
        new Message("user2", "Texto 2", "", ""),
    ]

    ngOnInit(): void {
        this.messageService.getMessages()
        .subscribe(
                (dadosSucesso: Message[]) => {
                    this.messageS = dadosSucesso;
                    console.log(dadosSucesso)
                },
                dadosErro => console.log(dadosErro)
            )
    }
}