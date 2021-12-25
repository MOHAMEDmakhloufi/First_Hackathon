import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Chat } from '../models/Chat';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  public host = environment.chatBaseUrl + "/api/chat";
  constructor(private httpClient: HttpClient,
    private router: Router) { }

// communication with dataBase
  addMsg(chat: Chat) {
    this.httpClient.post<Chat>(this.host, chat)
      .subscribe(
        (reponse : Chat) => {
          console.log(reponse);
          console.log('enregistrement terminé !');
        },
        (error) => {
          console.log('erreur de sauvegarde !' + error);
        }
      );
  }
  getAllMsgR(idSender: number, idReceiver: number): Observable<String[]> {
    const url = `${this.host}/${idSender}/${idReceiver}`;
    return this.httpClient.get<String[]>(url);
}
}

