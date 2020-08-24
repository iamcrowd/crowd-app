import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Diagram } from '../shared/models/diagram.model';

@Injectable()
export class DiagramService {

  constructor(private http: HttpClient) { }

  getDiagrams(): Observable<Diagram[]> {
    return this.http.get<Diagram[]>('/api/diagrams');
  }

  countDiagrams(): Observable<number> {
    return this.http.get<number>('/api/diagrams/count');
  }

  getDiagram(diagram: Diagram): Observable<Diagram> {
    return this.http.get<Diagram>(`/api/diagram/${diagram._id}`);
  }

  addDiagram(diagram: Diagram): Observable<Diagram> {
    return this.http.post<Diagram>('/api/diagram', diagram);
  }

  editDiagram(diagram: Diagram): Observable<any> {
    return this.http.put(`/api/diagram/${diagram._id}`, diagram, { responseType: 'text' });
  }

  deleteDiagram(diagram: Diagram): Observable<any> {
    return this.http.delete(`/api/diagram/${diagram._id}`, { responseType: 'text' });
  }
}
