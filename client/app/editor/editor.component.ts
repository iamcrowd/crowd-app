import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { DiagramService } from '../services/diagram.service';
import { Diagram } from '../shared/models/diagram.model';

declare var iziToast;

declare var CrowdEditor;
declare var CrowdEditorEer;
declare var CrowdEditorUml;
declare var CrowdMetamodel;

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  editor: any;
  conceptualModel: string;
  diagrams: Diagram[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private diagramService: DiagramService
  ) {
    this.route.params.subscribe(params => {
      this.conceptualModel = params.conceptualModel;
      this.ngOnInit();
    });
  }

  @HostListener('window:beforeunload', ['$event'])
  doSomething($event) {
    if (this.hasChanges()) {
      $event.returnValue = 'Are you sure you want to leave page? You lost not saved changes';
    }
  }

  ngOnInit(): void {
    const availableConceptualModels = {
      uml: CrowdEditorUml,
      eer: CrowdEditorEer,
      orm: { name: 'orm' },
      meta: { name: 'meta' }
    }

    this.editor = new CrowdEditor({
      selector: 'editor',
      availableConceptualModels: availableConceptualModels,
      conceptualModel: availableConceptualModels[this.conceptualModel] ? availableConceptualModels[this.conceptualModel] : CrowdEditorUml,
      metamodelApi: new CrowdMetamodel({
        url: environment.metamodelUrl,
        error: (error) => {
          iziToast.error({
            title: 'Error',
            message: 'There was an error when trying to call Metamodel API<br>' +
              (error.responseJSON != null
                ? error.responseJSON.error + "<br>" + error.responseJSON.message
                : error.responseText),
          });
        }
      }),
      palette: {
        grid: {
          size: this.conceptualModel == 'eer' ? 90 : 100,
          columns: 2
        }
      },
      ngRouter: this.router,
      ngFiles: {
        load: {
          modal: 'crowd-tools-load-modal',
          get: this.getDiagrams()
        }
      }
    });
  }

  hasChanges(): boolean {
    return this.editor.hasChanges();
  }

  getDiagrams(): void {
    this.diagramService.getDiagrams().subscribe(
      data => this.diagrams = data,
      error => console.log(error)
    );
  }

  loadDiagram(diagram: Diagram): void {
    this.editor.tools.load.loadFile(diagram.content);
  }

}
