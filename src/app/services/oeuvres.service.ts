import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@capacitor/storage';
import { environment } from '../../environments/environment';
import { Oeuvre } from '../models/oeuvre';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class OeuvreService {
    private url = environment.apiUrl;

    constructor(private http: HttpClient){}

    getAll(){
        const observable = new Observable<Array<any>>(observer => {
            Storage.get({
                key: 'oeuvres',
            }).then(cached => {
                if(cached.value){
                    observer.next(JSON.parse(cached.value));
                }else{
                    this.http.get<Array<any>>(this.url).subscribe(data => {
                        observer.next(data);
                        Storage.set({
                            key: 'oeuvres',
                            value: JSON.stringify(data),
                        });
                    });
                }
            });
        });

        return observable;
    }

    get(id: number){
        return this.http.get<any>(this.url + '/' + id);
    }

    add(oeuvre: Oeuvre){
        return this.http.post(this.url, oeuvre);
    }
}
