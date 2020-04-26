import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { MessageService } from '../services/message.service'
import { AuthService } from '../services/auth.service';
import { User, Message } from '../shared/interface';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {

  pageOfMessages: Array<any>;
  page: Number = 0;
  start = 0;
  end = 5;

  form: FormGroup;
  id: string;
  user: User;
  authsub: Subscription;
  sub: Subscription;
  email: string;
  messages: Message[];

  constructor(private route: ActivatedRoute,
    private messageService: MessageService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.email = localStorage.getItem('email')
    this.authsub = this.authService.getUserByEmail(this.email).subscribe(res => {
      this.user = res.user
    })
    this.id = this.route.snapshot.params['id']
    this.sub = this.messageService.getAllByWorkspace(this.id).subscribe(res => {
      this.messages = [...res.messages].reverse()  ;
      const count = Math.ceil(this.messages.length / 5);
      this.pageOfMessages = Array(count).fill(0).map((x, i) => i)
    })
    this.form = new FormGroup({
      message: new FormControl(null)
    })
  }

  ngOnDestroy() {
    this.authsub.unsubscribe();
    this.sub.unsubscribe()
  }

  setPage(item) {
    this.page = item
    this.start = item * 5;
    this.end = this.start + 5
  }

  changePage(type: boolean) {
    if (type) {
      this.page = +this.page + 1;
      this.start = this.start + 5;
      this.end = this.start + 5;
    } else if (this.start) {
      this.page = +this.page - 1;
      this.start = this.start - 5;
      this.end = this.start + 5;
    }
  }


  onSubmit() {
    this.form.disable()
    const message: Message = {
      text: this.form.value.message,
      workspace_id: this.id,
      user_name: this.user.fullName,
      createdAt: new Date()
    }
    this.messageService.create(message).subscribe();
    this.messages.unshift(message)
    this.form.reset()
    this.form.enable()
  }

}
