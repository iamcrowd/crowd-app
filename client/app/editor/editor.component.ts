import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { DiagramService } from '../services/diagram.service';
import { Diagram } from '../shared/models/diagram.model';
import { NamespaceService } from '../services/namespace.service';
import { Namespace } from '../shared/models/namespace.model';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import cytoscape from 'cytoscape';
import cola from 'cytoscape-cola';

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
  //actual edited namespace
  namespace: Namespace;
  //namespaces loaded from db
  namespaces: Namespace[] = [];
  //for actual editing file (that is saved on cloud)
  file: object;
  //for preloaded schema
  schema: object;
  //reference to actual preview of diagram
  preview: string;
  //to manage event from where is setted an action
  setEvent: any;
  //array of youtube video tutorials urls
  tutorials: any = [
    { title: 'First Steps', id: 'yfkr0LOHrL4' },
    { title: 'Modelling', id: 'YJG-X3sMWII' },
    { title: 'Translate', id: 'ldaZnWkvBhU' },
    { title: 'Reasoning', id: '6IXJPw2KPuA' },
  ];

  //diagram save form
  diagramForm: FormGroup;
  diagramName = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
    Validators.maxLength(30),
    Validators.pattern('[a-zA-Z0-9_-\\s]*')
  ]);
  // diagramMeta = new FormControl('checked');

  //namespace save form
  namespaceForm: FormGroup;
  namespaceUrl = new FormControl('', [
    Validators.required,
    Validators.maxLength(1000),
    Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?#?')
  ]);
  namespacePrefix = new FormControl('', [
    Validators.required,
    Validators.minLength(1),
    Validators.maxLength(100),
    Validators.pattern('[a-zA-Z0-9_-\\s]*')
  ]);
  namespaceDescription = new FormControl('', [
    Validators.maxLength(1000)
  ]);
  namespaceFile = new FormControl('', [
    Validators.maxLength(1000),
    Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?#?')
  ]);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private diagramService: DiagramService,
    private namespaceService: NamespaceService,
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
      orm: { width: 120, height: 70, columns: 1 },
    }

    cytoscape.use(cola);

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
        tutorials: {
          modal: 'crowd-tools-tutorials-modal'
        },
        namespaces: {
          get: 'getNamespaces'
        },
        user: this.auth?.currentUser?._id
      },
      cytoscape: cytoscape,
      preloadedSchema: this.schema,
      actualFile: this.file
    });

    this.diagramForm = this.formBuilder.group({
      diagramName: this.diagramName,
      // diagramMeta: this.diagramMeta
    });

    this.namespaceForm = this.formBuilder.group({
      namespaceUrl: this.namespaceUrl,
      namespacePrefix: this.namespacePrefix,
      namespaceDescription: this.namespaceDescription,
      namespaceFile: this.namespaceFile
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
        iziToast.success({ message: '<b>Diagram deleted successfully.</b>' });
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

  getNamespaces(): void {
    this.namespaceService.getNamespaces().subscribe(
      data => {
        this.namespaces = data;

        $('#crowd-tools-namespaces-modal').modal();
        setTimeout(() => $('[data-toggle="tooltip"]').tooltip({ html: true }));
      },
      error => console.log(error)
    );
  }

  setNamespace(action: string, namespace?: Namespace): void {
    this.namespace = namespace;
    if (this.namespace) {
      this.namespaceUrl.setValue(this.namespace.url);
      this.namespacePrefix.setValue(this.namespace.prefix);
      this.namespaceDescription.setValue(this.namespace.description);
      this.namespaceFile.setValue(this.namespace.file);
    }

    switch (action) {
      case 'add':
        $('#crowd-tools-namespace-modal').modal();
        break;
      case 'edit':
        $('#crowd-tools-namespace-modal').modal();
        break;
      case 'delete':
        $('#crowd-tools-namespace-delete-modal').modal();
        break;
    }

    $('[data-toggle="tooltip"]').tooltip('hide');
  }

  saveNamespace(): void {
    this.namespaceForm.markAllAsTouched();
    if (this.namespaceForm.valid) {
      if (!this.namespace) {
        this.namespace = {
          url: this.namespaceUrl.value,
          prefix: this.namespacePrefix.value,
          description: this.namespaceDescription.value,
          file: this.namespaceFile.value
        };
        this.namespaceService.addNamespace(this.namespace).subscribe(
          res => {
            iziToast.success({ message: '<b>Namespace saved successfully.</b>' });
            this.getNamespaces();
            this.resetNamespaceForm();
            $('#crowd-tools-namespace-modal').modal('hide');
          },
          error => iziToast.error({ message: 'There was an error when try to save the Namespace.' })
        );
      } else {
        this.namespace.url = this.namespaceUrl.value;
        this.namespace.prefix = this.namespacePrefix.value;
        this.namespace.description = this.namespaceDescription.value;
        this.namespace.file = this.namespaceFile.value;
        this.namespaceService.editNamespace(this.namespace).subscribe(
          res => {
            iziToast.success({ message: '<b>Namespace saved successfully.</b>' });
            this.getNamespaces();
            this.resetNamespaceForm();
            $('#crowd-tools-namespace-modal').modal('hide');
          },
          error => iziToast.error({ message: 'There was an error when try to save the Namespace.' })
        );
      }
    } else {
      iziToast.error({ message: 'Some values are invalid, please check.' });
    }
  }

  deleteNamespace(): void {
    this.namespaceService.deleteNamespace(this.namespace).subscribe(
      data => {
        iziToast.success({ message: '<b>Namespace deleted successfully.</b>' });

        this.getNamespaces();
        this.resetNamespaceForm();
      },
      error => console.log(error),
    );
  }

  resetNamespaceForm(): void {
    this.namespaceForm.reset();
    this.namespace = null;
  }

  setValid(control): object {
    return {
      'is-invalid': this[control].touched && !this[control].valid,
      'is-valid': this[control].touched && this[control].valid
    };
  }
}
