import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class MessageService {
    constructor(private http: HttpClient) { }

    create(message): Observable<any> {
        return this.http.post(`/api/message`, message)
    }

    getAllByWorkspace(id: string): Observable<any> {
        return this.http.get(`/api/message/${id}`)
    }

    getById(id: string): Observable<any> {
        return this.http.get(`/api/workspace/${id}`)
    }

    update(id: string, users): Observable<any> {
        return this.http.patch(`/api/workspace/${id}`, users)
    }
}
