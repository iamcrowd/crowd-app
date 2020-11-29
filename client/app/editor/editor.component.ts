import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { DiagramService } from '../services/diagram.service';
import { Diagram } from '../shared/models/diagram.model';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from '../services/auth.service';

declare var iziToast;
declare var $;

declare var CrowdEditor;
declare var CrowdEditorEer;
declare var CrowdEditorUml;
declare var CrowdEditorOrm;
declare var CrowdMetamodel;
declare var CrowdReasoning;

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
  //actual edited diagram
  diagram: Diagram;
  //diagrams loaded from db
  diagrams: Diagram[] = [];
  //for actual editing file (that is saved on cloud)
  file: object;
  //for preloaded schema
  schema: object;
  //reference to actual preview of diagram
  preview: string;
  //to manage event from where is setted an action
  setEvent: any;

  //diagram save form
  diagramForm: FormGroup;
  diagramName = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
    Validators.maxLength(30),
    Validators.pattern('[a-zA-Z0-9_-\\s]*')
  ]);
  // diagramMeta = new FormControl('checked');

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private diagramService: DiagramService,
    private formBuilder: FormBuilder,
    public auth: AuthService
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
    console.log(this.auth.currentUser);

    this.file = this.router.getCurrentNavigation()?.extras?.state?.file;
    this.schema = this.router.getCurrentNavigation()?.extras?.state?.schema;

    const availableConceptualModels = {
      uml: CrowdEditorUml,
      eer: CrowdEditorEer,
      orm: CrowdEditorOrm,
      kf: { name: 'kf', export: true },
      owl: { name: 'owl', import: false }
    }

    const paletteSizes = {
      uml: { width: 120, height: 100, columns: 1 },
      eer: { width: 110, height: 80, columns: 2 },
      orm: { width: 120, height: 60, columns: 1 },
    }

    this.editor = new CrowdEditor({
      selector: 'editor',
      availableConceptualModels: availableConceptualModels,
      conceptualModel: availableConceptualModels[this.conceptualModel] ? availableConceptualModels[this.conceptualModel] : CrowdEditorUml,
      metamodelApi: new CrowdMetamodel({
        url: environment.metamodelUrl,
        owlUrl: environment.metamodelOwlUrl,
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
      reasoningApi: new CrowdReasoning({
        url: environment.reasoningUrl,
        error: (error) => {
          iziToast.error({
            title: 'Error',
            message: 'There was an error when trying to call Reasoning API<br>' +
              (error.responseJSON != null
                ? error.responseJSON.error + "<br>" + error.responseJSON.message
                : error.responseText),
          });
        }
      }),
      palette: {
        grid: paletteSizes[this.conceptualModel] ? paletteSizes[this.conceptualModel] : { width: 100, height: 100, columns: 2 }
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
          // modal: 'crowd-tools-load-modal',
          get: 'getDiagrams'
        },
        save: {
          modal: 'crowd-tools-save-modal',
          put: 'editDiagram'
        },
        rename: {
          // modal: 'crowd-tools-rename-modal',
          set: 'setDiagram'
        },
        delete: {
          set: 'setDiagram'
        },
        user: this.auth?.currentUser?._id
      },
      preloadedSchema: this.schema,
      actualFile: this.file
    });

    this.diagramForm = this.formBuilder.group({
      diagramName: this.diagramName,
      // diagramMeta: this.diagramMeta
    });
  }

  hasChanges(): boolean {
    return this.editor.hasChanges();
  }

  getDiagrams(): void {
    this.diagramService.getDiagrams().subscribe(
      data => {
        this.diagrams = data;

        $('#crowd-tools-load-modal').modal();
        setTimeout(() => $('[data-toggle="tooltip"]').tooltip({ html: true }));
      },
      error => console.log(error)
    );
  }

  setDiagram(action: string, diagram: Diagram, event): void {
    event?.preventDefault();
    event?.stopPropagation();

    this.diagram = diagram ? diagram : this.editor.config.actualFile;
    this.diagramName.setValue(this.diagram.name);
    this.setEvent = event;

    switch (action) {
      case 'rename':
        $('#crowd-tools-rename-modal').modal();
        break;
      case 'delete':
        $('#crowd-tools-delete-modal').modal();
        break;
    }

    $('[data-toggle="tooltip"]').tooltip('hide');
    if (event) $(event.currentTarget).blur();
  }

  loadDiagram(diagram: Diagram): void {
    if (diagram.meta) {
      var actualConceptualModel = this.editor.config.conceptualModel.name;
      this.editor.config.metamodelApi.request({
        from: 'meta',
        to: actualConceptualModel,
        data: diagram.meta,
        success: (response) => {
          response.hasPositions = false;
          this.editor.tools.import.importFrom({ model: actualConceptualModel, schema: response, file: diagram });
        }
      });
    } else {
      this.editor.tools.import.importFrom({ model: diagram.model, schema: diagram.content, file: diagram });
    }
  }

  editDiagram(): void {
    this.editor.tools.file.getFile((diagram, translateError) => {
      if (translateError && diagram.meta) {
        diagram.meta = null;
      }
      console.log(diagram);
      this.diagramService.editDiagram(diagram).subscribe(
        res => {
          if (!translateError) {
            iziToast.success({ message: '<b>Diagram saved successfully.</b>' });
          } else {
            iziToast.warning({
              message: '<b>Diagram saved successfully.</b><br>' +
                'Metamodel cannot be generated due an translate error, this means that your diagram can\'t be translated to another conceptual model.'
            });
          }
        },
        error => {
          console.log(error);
          iziToast.error({ message: 'There was an error when try to save the Diagram.' })
        }
      );
    });
  }

  renameDiagram(): void {
    if (this.diagramForm.valid) {
      if (this.diagram._id == this.editor?.config?.actualFile?._id)
        this.editor.config.actualFile.name = this.diagramName.value;
      this.diagram.name = this.diagramName.value;
      this.diagramService.editDiagram(this.diagram).subscribe(
        res => {
          iziToast.success({ message: '<b>Diagram renamed successfully.</b>' });
          this.editor.tools.file.updateActualFile({ parent: 'crowd-tools-rename-modal' });
          this.resetDiagramForm();
        },
        error => {
          console.log(error);
          iziToast.error({ message: 'There was an error when try to rename the Diagram.' })
        }
      );
    }
  }

  addDiagram(): void {
    console.log('addDiagram');
    this.diagramForm.markAllAsTouched();
    if (this.diagramForm.valid) {
      this.editor.tools.file.getFile((diagram, translateError) => {
        delete diagram._id;
        diagram.name = this.diagramName.value;
        // if (this.diagramMeta.value != 'checked') {
        //   delete diagram.meta;
        // }
        this.diagramService.addDiagram(diagram).subscribe(
          res => {
            if (!translateError) {
              iziToast.success({ message: '<b>Diagram saved successfully.</b>' });
            } else {
              iziToast.warning({
                message: '<b>Diagram saved successfully.</b><br>' +
                  'Metamodel cannot be generated due an translate error, this means that your diagram can\'t be translated to another conceptual model.'
              });
            }
            this.editor.config.actualFile = res;
            this.editor.tools.file.updateActualFile();
            this.resetDiagramForm();
          },
          error => {
            console.log(error);
            iziToast.error({ message: 'There was an error when try to save the Diagram.' })
          }
        );
      });
    }
  }

  deleteDiagram(): void {
    this.diagramService.deleteDiagram(this.diagram).subscribe(
      data => {
        iziToast.success({ message: 'Diagram deleted successfully.' });
        if (this.diagram._id == this.editor?.config?.actualFile?._id) {
          this.editor.config.actualFile = null;
          this.editor.tools.file.updateActualFile({ parent: false });
          this.editor.tools.clearWorkspace.clear();
        }

        if (this.setEvent) this.getDiagrams();
        this.resetDiagramForm();
      },
      error => console.log(error),
    );
  }

  resetDiagramForm(): void {
    this.diagramForm.reset();
    this.diagram = null;
    this.setEvent = null;
  }

  setValid(control): object {
    return {
      'is-invalid': this[control].touched && !this[control].valid,
      'is-valid': this[control].touched && this[control].valid
    };
  }
}
