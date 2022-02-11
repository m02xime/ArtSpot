import { Component } from '@angular/core';
import {OeuvreService} from '../services/oeuvres.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage{
  oeuvres: Array<any>;
  loading = true;

  constructor(private oeuvreService: OeuvreService){
      this.load();
  }

  load(){
      this.oeuvreService.getAll().subscribe(data => {
          this.oeuvres = data;
          this.loading = false;
      }, () => {
          this.loading = false;
      });
  }
}
