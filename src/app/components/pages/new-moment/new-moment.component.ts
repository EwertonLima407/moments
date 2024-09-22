import { Moment } from 'src/app/Moment';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessagesService } from 'src/app/service/messages/messages.service';
import { MomentService } from 'src/app/service/moment/moment.service';


@Component({
  selector: 'app-new-moment',
  templateUrl: './new-moment.component.html',
  styleUrls: ['./new-moment.component.css']
})
export class NewMomentComponent implements OnInit {
  btnText: string = 'Compartilhar!';
  image?: File;

  constructor(
    private momentService: MomentService,
    private router: Router,
    private messagesService: MessagesService
  ) {}

  ngOnInit(): void {}

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    this.image = file;
  }

  buildForm() {}

  async createHandler(moment: Moment) {
    const formData = new FormData();

    formData.append('title', moment.title);
    formData.append('description', moment.description);

    if (moment.image) {
      formData.append('image', moment.image);
    }

    await this.momentService.createMoment(formData).subscribe();

    this.messagesService.add(`Momento adicionado com sucesso!`);

    this.router.navigate(['/']);
  }
}
