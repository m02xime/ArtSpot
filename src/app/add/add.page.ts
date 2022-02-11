import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { NativeGeocoder } from '@awesome-cordova-plugins/native-geocoder/ngx';
import { Geolocation } from '@capacitor/geolocation';

import { Oeuvre } from '../models/oeuvre';
import { location } from '../constants/location';
import { OeuvreService } from '../services/oeuvres.service';

@Component({
    selector: 'app-add',
    templateUrl: './add.page.html',
    styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
    oeuvre = new Oeuvre();
    location = location;

    constructor(
        private geocoder: NativeGeocoder,
        private router: Router,
        private toastCtrl: ToastController,
        private oeuvreService: OeuvreService
    ){}

    ngOnInit(){
        this.fillPosition();
    }

    async fillPosition(){
        Geolocation.watchPosition({enableHighAccuracy: true}, async (position, err) => {
            if(!err){
                const results = await this.geocoder.reverseGeocode(position.coords.latitude, position.coords.longitude);
                const address = results.pop();
                if(address.locality){
                    this.oeuvre.name = address.locality;
                }
                if(address.countryCode){
                    this.oeuvre.localisation = address.countryCode.toLowerCase();
                }
            }
        });
    }

    save(){
        this.oeuvreService.add(this.oeuvre).subscribe(async () => {
            const toast = await this.toastCtrl.create({
                message: 'Votre oeuvre à été ajoutée',
                duration: 5000,
                color: 'success',
            });
            toast.present();
            this.router.navigate(['/home']);
        });
    }
}
