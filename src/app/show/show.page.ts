import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OeuvreService } from '../services/oeuvres.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.page.html',
  styleUrls: ['./show.page.scss'],
})
export class ShowPage{
    oeuvre: any;
    loading = true;

    constructor(route: ActivatedRoute, private oeuvreService: OeuvreService){
        const id = parseInt(route.snapshot.params.id, 10);
        this.load(id);
    }

    load(id: number){
        this.oeuvreService.get(id).subscribe(data => {
            this.oeuvre = data;
            this.loading = false;
        }, () => {
            this.loading = false;
        });
    }
}
