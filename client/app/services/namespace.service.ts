import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Namespace } from '../shared/models/namespace.model';

@Injectable()
export class NamespaceService {

  constructor(private http: HttpClient) { }

  getNamespaces(): Observable<Namespace[]> {
    return this.http.get<Namespace[]>('/api/namespaces');
  }

  countNamespaces(): Observable<number> {
    return this.http.get<number>('/api/namespaces/count');
  }

  getNamespace(namespace: Namespace): Observable<Namespace> {
    return this.http.get<Namespace>(`/api/namespace/${namespace._id}`);
  }

  addNamespace(namespace: Namespace): Observable<Namespace> {
    return this.http.post<Namespace>('/api/namespace', namespace);
  }

  editNamespace(namespace: Namespace): Observable<any> {
    return this.http.put(`/api/namespace/${namespace._id}`, namespace, { responseType: 'text' });
  }

  deleteNamespace(namespace: Namespace): Observable<any> {
    return this.http.delete(`/api/namespace/${namespace._id}`, { responseType: 'text' });
  }
}
