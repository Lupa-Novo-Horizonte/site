import { Component, OnInit} from '@angular/core';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-sharing',
  templateUrl: './sharing.component.html',
  styleUrls: ['./sharing.component.css']
})

export class SharingComponent implements OnInit {

  readonly env = environment;

  constructor() {     
  }

  ngOnInit(): void {
  }  
}
