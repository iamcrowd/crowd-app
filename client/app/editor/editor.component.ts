import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { DiagramService } from '../services/diagram.service';
import { Diagram } from '../shared/models/diagram.model';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';

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

  //reference to editor object
  editor: any;
  //actual conceptual model for the editor palette
  conceptualModel: string;
  //diagrams loaded from db
  diagrams: Diagram[] = [];
  //for actual editing file (that is saved on cloud)
  file: object;
  //for preloaded schema
  schema: object;
  //reference to actual preview of diagram
  preview: string;

  //diagram save form
  diagramForm: FormGroup;
  diagramName = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
    Validators.maxLength(30),
    Validators.pattern('[a-zA-Z0-9_-\\s]*')
  ]);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private diagramService: DiagramService,
    private formBuilder: FormBuilder
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
    this.file = this.router.getCurrentNavigation()?.extras?.state?.file;
    this.schema = this.router.getCurrentNavigation()?.extras?.state?.schema;

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
          size: 100,
          columns: 2
        }
      },
      enumerate: true,
      tools: {
        import: {
          errors: {
            missingModelPalette: (model) => {
              iziToast.error({
                title: 'Error',
                message: 'There is no palette for the conceptual model <b>' + model.toUpperCase() + '</b>.'
              });
            }
          }
        }
      },
      ngComponent: this,
      ngRouter: this.router,
      ngFiles: {
        load: {
          modal: 'crowd-tools-load-modal',
          get: 'getDiagrams'
        },
        save: {
          modal: 'crowd-tools-save-modal',
          put: 'editDiagram'
        }
      },
      preloadedSchema: this.schema,
      actualFile: this.file
    });

    this.diagramForm = this.formBuilder.group({
      diagramName: this.diagramName
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
    this.editor.tools.import.importFrom({ model: diagram.model, schema: diagram.content, file: diagram });
  }

  editDiagram(): void {
    this.editor.tools.file.getFile((diagram) => {
      this.diagramService.editDiagram(diagram).subscribe(
        res => iziToast.success({ message: 'Diagram saved successfully.' }),
        error => iziToast.error({ message: 'There was an error when try to save the Diagram.' })
      );
    });
  }

  addDiagram(): void {
    console.log('addDiagram');
    this.diagramForm.markAllAsTouched();
    if (this.diagramForm.valid) {
      this.editor.tools.file.getFile((diagram) => {
        diagram._id = null;
        diagram.name = this.diagramName.value;
        this.diagramService.addDiagram(diagram).subscribe(
          res => {
            console.log(res);
            iziToast.success({ message: 'Diagram saved successfully.' });
            this.editor.config.actualFile = res;
            this.editor.tools.file.updateActualFile();
            this.resetDiagramForm();
          },
          error => iziToast.error({ message: 'There was an error when try to save the Diagram.' })
        );
      });
    }
  }

  resetDiagramForm(): void {
    this.diagramForm.reset();
  }

  setValid(control): object {
    return {
      'is-invalid': this[control].touched && !this[control].valid,
      'is-valid': this[control].touched && this[control].valid
    };
  }
}
