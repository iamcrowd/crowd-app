import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

declare var CrowdEditor;
declare var CrowdEditorEer;
declare var CrowdEditorUml;

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  conceptualModel: string;

  constructor(private route: ActivatedRoute) {
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
    const conceptualModelMap = {
      uml: CrowdEditorUml,
      eer: CrowdEditorEer
    }

    var editor = new CrowdEditor({
      selector: 'editor',
      conceptualModel: conceptualModelMap[this.conceptualModel] ? conceptualModelMap[this.conceptualModel] : CrowdEditorUml,
      palette: {
        grid: {
          size: this.conceptualModel == 'uml' ? 100 : 90,
          columns: 2
        }
      }
    });
  }

}
