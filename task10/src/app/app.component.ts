import { Component, OnInit } from '@angular/core';
import { environment } from './../environments/environment';
import { HttpService } from './service/http/http.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  // constructor(private userService:HttpServiceService)z
  title = 'task9';

}
