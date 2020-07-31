import { Component, OnInit } from '@angular/core';

declare var CrowdEditor;

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    var editor = new CrowdEditor({
      selector: 'editor',
      palette: {
        grid: {
          size: 90,
          columns: 2
        }
      }
    });
  }

}
