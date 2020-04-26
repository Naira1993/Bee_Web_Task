import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Workspace } from '../shared/interface';


@Injectable({ providedIn: 'root' })
export class WorkspaceService {
    constructor(private http: HttpClient) { }

    create(workspace: Workspace): Observable<any> {
        return this.http.post(`/api/workspace`, workspace)
    }

    getAllByUser(): Observable<any> {
        return this.http.get(`/api/workspace`)
    }

    getById(id: string): Observable<any> {
        return this.http.get(`/api/workspace/${id}`)
    }

    update(id: string, users): Observable<any> {
        return this.http.patch(`/api/workspace/${id}`, users)
    }

    delete(id: string) {
        return this.http.delete(`/api/workspace/${id}`)
    }
}
