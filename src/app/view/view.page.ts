import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';

@Component({
    selector: 'app-view',
    templateUrl: './view.page.html',
    styleUrls: ['./view.page.scss'],
})
export class ViewPage implements OnInit {
    picture: string;

    constructor(){}

    ngOnInit(){
        Camera.getPhoto({
            quality: 80,
            resultType: CameraResultType.DataUrl,
        }).then(data => {
            this.picture = data.dataUrl;
        });
    }

}
