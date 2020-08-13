import { Component, OnInit, HostListener } from '@angular/core';
import { ToastComponent } from '../shared/toast/toast.component';
import { ActivatedRoute } from '@angular/router';

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

  conceptualModel: string;

  constructor(
    private route: ActivatedRoute,
    public toast: ToastComponent
  ) {
    this.route.params.subscribe(params => {
      this.conceptualModel = params.conceptualModel;
      this.ngOnInit();
    });
  }

  // @HostListener('window:beforeunload', ['$event'])
  // doSomething($event) {
  //   $event.returnValue = 'Are you sure you want to change the conceptual model? You lost not saved changes';
  // }

  ngOnInit(): void {
    const availableConceptualModels = {
      uml: CrowdEditorUml,
      eer: CrowdEditorEer
    }

    var editor = new CrowdEditor({
      selector: 'editor',
      availableConceptualModels: availableConceptualModels,
      conceptualModel: availableConceptualModels[this.conceptualModel] ? availableConceptualModels[this.conceptualModel] : CrowdEditorUml,
      metamodelApi: new CrowdMetamodel({
        url: 'http://crowd.fi.uncoma.edu.ar:3334/',
        error: (error) => {
          this.toast.setMessage(
            'There was an error when trying to call Metamodel API<hr>' + error.responseJSON.error + "<br>" + error.responseJSON.message,
            'danger'
          );
        }
      }),
      palette: {
        grid: {
          size: this.conceptualModel == 'eer' ? 90 : 100,
          columns: 2
        }
      }
    });
  }

}
