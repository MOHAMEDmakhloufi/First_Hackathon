import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TypeAndString } from '../models/TypeAndString';
import { User } from '../models/User';
import { AuthService } from '../services/auth.service';
import { ChatService } from '../services/chat.service';
import { ProfileService } from '../services/Profile.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  myMsg: TypeAndString[] = [];
  messege!: String;
  ourMsg!: String[];
  idUser!: number;
  friend!: User;
  constructor(private activatedRoute: ActivatedRoute,
    private chatService: ChatService,
    private authService: AuthService,
    private profileService: ProfileService) { }

  ngOnInit(): void {
    this.getFriend();
    this.getUser();
    this.getMsgR();
  }
  send() {
    console.log(this.messege);
    this.myMsg.push(
      {
        messege: this.messege,
        type: 's'
      }
    );
    console.log(this.myMsg);
    let chat = {
      id: -1,
      idSender:this.idUser,
      idReceiver: this.activatedRoute.snapshot.params.id,
      messege: this.messege
    }
    this.messege = '';
    this.chatService.addMsg(chat);
    this.getMsgR();
  }
  getFriend() {
    this.profileService.getUserById(this.activatedRoute.snapshot.params.id)
      .subscribe(
        (reponse: User) => {
          this.friend = reponse;
        },
        (error) => {
          console.log('errer get !' + error);
        }
      );
  }
  getUser() {
    this.authService.getUser(localStorage.getItem('loggedUser'))
      .subscribe(
        (reponse: User) => {
          this.idUser = reponse.id;
        },
        (error) => {
          console.log('errer get !' + error);
        }
      );
  }
  getMsgR() {
    return new Promise(
      (resolve, reject) => {
        setTimeout(
          () => {
            this.chatService.getAllMsgR(this.idUser, this.activatedRoute.snapshot.params.id)
              .subscribe(
                (reponse: String[]) => {
                  this.ourMsg = reponse;
                  for (let msg of reponse) {
                    this.myMsg.push(
                      {
                        messege: msg,
                        type: 'r'
                      }
                    );
                  }
                  console.log(reponse);
                  console.log('getMsgR finish !');
                },
                (error) => {
                  console.log('errer with getMsgR !' + error);
                }
              );
          }, 3000
        );
      }
    );

  }

}
