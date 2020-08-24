//this array is a global variable that contains all the created CrowdEditor
var CrowdEditorArr = new Object();

var CrowdEditor = function (config) {
  this.id = uuidv4();
  this.config = config;
  CrowdEditorArr[this.config.selector] = this;
  this.init();
}

CrowdEditor.prototype.init = function () {
  var self = this;

  if (!self.config.conceptualModel) {
    self.config.conceptualModel = {}
  }
  if (!self.config.conceptualModel.initPalette) {
    self.config.conceptualModel.initPalette = function () { console.warn("CrowdEditor conceptual model palette is not defined."); }
  }
  if (!self.config.conceptualModel.initElementsToolsViews) {
    self.config.conceptualModel.initElementsToolsViews = function () { console.warn("CrowdEditor conceptual model elements tools views are not defined."); }
  }
  if (!self.config.conceptualModel.initLinksToolsViews) {
    self.config.conceptualModel.initLinksToolsViews = function () { console.warn("CrowdEditor conceptual model links tools views are not defined."); }
  }
  if (!self.config.conceptualModel.initChangeAttributesEvents) {
    self.config.conceptualModel.initChangeAttributesEvents = function () { console.warn("CrowdEditor conceptual model change attributes events are not defined."); }
  }
  if (!self.config.conceptualModel.initInspector) {
    self.config.conceptualModel.initInspector = function () { console.warn("CrowdEditor conceptual model inspector is not defined."); }
  }
  if (!self.config.conceptualModel.fromJSONSchema) {
    self.config.conceptualModel.fromJSONSchema = function () { console.warn("CrowdEditor conceptual model fromJSONSchema is not defined."); }
  }

  $("#" + this.config.selector).html('');

  //append dom element that contains all the editor parts
  $('#' + self.config.selector).append('<div class="crowd-container" id="crowd-container-' + self.id + '"></div>');

  //append dom element for palette
  $('#crowd-container-' + self.id).append('<div class="crowd-palette" id="crowd-palette-' + self.id + '"></div>');

  //append dom element that contains the tools and the workspace
  $('#crowd-container-' + self.id).append('<div class="crowd-container-middle" id="crowd-container-middle-' + self.id + '"></div>');

  //append dom element that contains the inspector and map
  $('#crowd-container-' + self.id).append('<div class="crowd-container-side" id="crowd-container-side-' + self.id + '"></div>');

  //append dom element for tools
  $('#crowd-container-middle-' + self.id).append('<div class="crowd-tools" id="crowd-tools-' + self.id + '"></div>');

  //append dom element for workspace
  $('#crowd-container-middle-' + self.id).append('<div class="crowd-workspace" id="crowd-workspace-' + self.id + '"></div>');

  //append dom element for inspector
  $('#crowd-container-side-' + self.id).append('<div class="crowd-inspector" id="crowd-inspector-' + self.id + '"></div>');

  //append dom element for map
  $('#crowd-container-side-' + self.id).append('<div class="crowd-map" id="crowd-map-' + self.id + '"></div>');

  self.initPalette();
  self.initTools();
  self.initWorkspace();
  self.initInspector();
  self.initMap();

  //fit and center the paper for first time
  self.workspace.fitPaper();
  self.workspace.centerScroll();

  if (self.config.preloadDiagram) {
    self.fromJSONSchema(JSON.parse(self.config.preloadDiagram));
  }
}

CrowdEditor.prototype.initPalette = function () {
  var self = this;

  //set palette width with config values
  $('#crowd-palette-' + self.id).css('width', self.config.palette.grid.size * self.config.palette.grid.columns + 1);
  $('#crowd-container-middle-' + self.id).css('left', self.config.palette.grid.size * self.config.palette.grid.columns);

  //initialize palette objects
  self.palette = new Object();
  self.palette.elements = new Object();
  self.palette.links = new Object();

  //add joint basic link to palette links
  self.palette.links.basic = new joint.shapes.standard.Link({
    type: 'Link',
    attrs: {
      line: {
        stroke: 'black',
        strokeWidth: 2,
        sourceMarker: {},
        targetMarker: {
          'd': ''
        }
      }
    },
    labels: [{
      attrs: {
        text: {
          text: null
        }
      }
    }]
  });

  //call initialization of palette elements and links for the specific conceptual model
  self.config.conceptualModel.initPalette(self);

  //add styled jump over the lines when they collides
  for (var link in self.palette.links) {
    self.palette.links[link].connector('jumpover', {
      size: 10
    });
  }

  //add joint graph to palette
  self.palette.graph = new joint.dia.Graph();

  //add joint paper to palette
  self.palette.paper = new joint.dia.Paper({
    el: $('#crowd-palette-' + self.id)[0],
    width: $('#crowd-palette-' + self.id).width(),
    height: (Object.keys(self.palette.elements).length / self.config.palette.grid.columns + 5) * self.config.palette.grid.size,//$('#crowd-palette-' + self.id).height(),
    model: self.palette.graph,
    interactive: false,
    background: {
      color: $('#crowd-palette-' + self.id).css("background-color")
    },
    gridSize: self.config.palette.grid.size,
    // drawGrid:
    // {
    //   name: 'mesh',
    //   args: [
    //     {
    //       color: 'black',
    //       thickness: 1
    //     }
    //   ]
    // }
  });

  //adjust joint svg height to the space occupied by the added elements (able to scroll palette when screen is small)
  if ($('#crowd-palette-' + self.id + " svg")[0])
    $('#crowd-palette-' + self.id + " svg")[0].setAttribute('height', (Object.keys(self.palette.elements).length / self.config.palette.grid.columns + 1) * self.config.palette.grid.size);

  //add palette elements to palette graph and place (change position) them on the grid
  var position = 0;
  for (var element in self.palette.elements) {
    self.palette.elements[element].attributes.position = {
      x: ((position % self.config.palette.grid.columns) * self.config.palette.grid.size) +
        (self.config.palette.grid.size - self.palette.elements[element].attributes.size.width) / 2,
      y: (Math.floor(position / self.config.palette.grid.columns) * self.config.palette.grid.size) +
        (self.config.palette.grid.size - self.palette.elements[element].attributes.size.height) / 2
    };
    self.palette.graph.addCell(self.palette.elements[element]);
    position++;
  }

  //event for drag and drop from palette to workspace
  self.palette.paper.on('cell:pointerdown', function (cellView, e) {
    var flyid = uuidv4();

    $('body').append('<div class="crowd-flypaper" id="crowd-flypaper-' + flyid + '"></div>');

    var flyGraph = new joint.dia.Graph;
    var flyPaper = new joint.dia.Paper({
      el: $('#crowd-flypaper-' + flyid),
      model: flyGraph,
      interactive: false,
    });
    var flyShape = cellView.model.clone();
    var offset = {
      x: flyShape.attributes.size.width / 2 * self.workspace.paper.scale().sx,
      y: flyShape.attributes.size.height / 2 * self.workspace.paper.scale().sy
      // x: flyShape.attributes.size.width / 2 * self.workspace.zoom,
      // y: flyShape.attributes.size.height / 2 * self.workspace.zoom
    };

    flyPaper.scale(self.workspace.zoom);
    flyShape.position(0, 0);
    flyGraph.addCell(flyShape);

    $('#crowd-flypaper-' + flyid).offset({
      left: (e.pageX - offset.x),
      top: (e.pageY - offset.y)
    });

    $('body').on('mousemove.fly', function (e) {
      $('#crowd-flypaper-' + flyid).offset({
        left: (e.pageX - offset.x),
        top: (e.pageY - offset.y)
      });
    });

    $('body').on('mouseup.fly', function (e) {
      var x = e.pageX;
      var y = e.pageY;
      var target = self.workspace.paper.$el.offset();
      var origin = self.palette.paper.$el.offset();

      //dropped over workspaces and not over palette
      // if ((x > target.left && x < target.left + self.workspace.paper.$el.width() && y > target.top && y < target.top + self.workspace.paper.$el.height()) &&
      //   !(x > origin.left && x < origin.left + self.palette.paper.$el.width() && y > origin.top && y < origin.top + self.palette.paper.$el.height())) {
      // if ($('#crowd-workspace-paper-' + self.id + ':hover').length) {
      if ($('#crowd-workspace-scrollable-' + self.id + ':hover').length) {
        var s = flyShape.clone();

        //get event mouse point depending on browser
        var eventPoint = getEventClientPoint(e);

        //variable to manage the relative position of the mouse in respect to paper div
        var relativePos = eventPoint;

        //in case of beign dropped on scrollable div and not on paper div
        if (!$('#crowd-workspace-paper-' + self.id + ':hover').length) {
          //get the paper div position relative to scrollable div
          var paperPos = {
            x: $('#crowd-workspace-paper-' + self.id).offset().left - $('#crowd-workspace-scrollable-' + self.id).offset().left,
            y: $('#crowd-workspace-paper-' + self.id).offset().top - $('#crowd-workspace-scrollable-' + self.id).offset().top
          }
          //calculate the relative position of the mouse in respect to paper div
          relativePos = {
            x: eventPoint.x - paperPos.x,
            y: eventPoint.y - paperPos.y,
          }
        }

        //final position wich is scalated and translated in respect to paper
        var p = {
          x: (relativePos.x - self.workspace.paper.translate().tx) / self.workspace.paper.scale().sx,
          y: (relativePos.y - self.workspace.paper.translate().ty) / self.workspace.paper.scale().sy
        }

        //repostion the final position to adjust to grid
        var gridSize = self.workspace.paper.options.gridSize;
        s.position(
          Math.round((p.x - (s.attributes.size.width / 2)) / gridSize) * gridSize,
          Math.round((p.y - (s.attributes.size.height / 2)) / gridSize) * gridSize
        );

        //add the cell to workspace graph
        self.workspace.graph.addCell(s);

        //fit paper to the new content
        self.workspace.fitPaper();
      }
      $('body').off('mousemove.fly').off('mouseup.fly');
      flyShape.remove();
      $('#crowd-flypaper-' + flyid).remove();
    });
  });
}

CrowdEditor.prototype.initTools = function () {
  var self = this;

  //initialize tools objects
  self.tools = {};
  self.tools.zoom = {};
  self.tools.gridSize = {};
  self.tools.fullscreen = {};
  self.tools.layout = {};
  self.tools.export = {};
  self.tools.import = {};
  self.tools.load = {};
  self.tools.save = {};
  self.tools.model = {};
  self.tools.clearWorkspace = {};

  //append dom row for the tools elements
  $('#crowd-tools-' + self.id).append('<span class="row" id="crowd-tools-row-' + self.id + '"></span>');

  //zoom tool
  self.tools.zoom.init = function () {
    //append dom for zoom tool
    $('#crowd-tools-row-' + self.id).append(
      '<div class="form-group"> \
        <i class="material-icons" style="font-size: 14px">zoom_in</i> <label>Zoom</label> \
        <label id="crowd-tools-zoom-label-' + self.id + '" style="float: right">100%</label> \
        <input class="form-control-range" id="crowd-tools-zoom-input-' + self.id + '" type="range" min="25" max="250" step="25" value="100" /> \
      </div>'
    );

    //event handler when change zoom
    //updates zoom label and change scale of the workspace paper
    $('#crowd-tools-zoom-input-' + self.id).on('input', function () {
      //set new zoom value
      self.workspace.zoom = this.value / 100;

      //fit paper with the new zoom setted
      self.workspace.fitPaper();

      //change zoom label percentage
      $('#crowd-tools-zoom-label-' + self.id).html(this.value + "%");
    });
  }
  self.tools.zoom.init();

  //grid size tool
  self.tools.gridSize.init = function () {
    //append dom for grid size tool
    $('#crowd-tools-row-' + self.id).append(
      '<div class="form-group"> \
        <i class="material-icons" style="font-size: 12px">grid_on</i> <label>Grid Size</label> \
        <label id="crowd-tools-grid-size-label-' + self.id + '" style="float: right">10</label> \
        <input class="form-control-range" id="crowd-tools-grid-size-input-' + self.id + '" type="range" min="1" max="50" step="1" value="10" /> \
      </div>'
    );

    //event handler when change grid size
    //updates grid size label and change grid size of the workspace paper
    $('#crowd-tools-grid-size-input-' + self.id).on('input', function () {
      $('#crowd-tools-grid-size-label-' + self.id).html(this.value);
      self.workspace.paper.setGridSize(this.value);
    });
  }
  self.tools.gridSize.init();

  //fullscreen tool
  self.tools.fullscreen.init = function () {
    //append dom for fullscreen tool
    $('#crowd-tools-row-' + self.id).append(
      '<div class="form-group"> \
        <button class="btn btn-primary" id="crowd-tools-fullscreen-input-' + self.id + '" type="button" \
        data-toggle="tooltip" data-original-title="Toggle Fullscreen Mode" data-placement="bottom" > \
        <i class="material-icons">fullscreen</i></button> \
      </div>'
    );

    //event handler when click fullscreen
    $('#crowd-tools-fullscreen-input-' + self.id).on('click', function () {
      toggleFullScreen(document.documentElement);
      $(".tooltip").tooltip('hide');
      $(this).blur();
    });
  }
  self.tools.fullscreen.init();

  //layout tool
  self.tools.layout.init = function () {
    //append dom for layout tool
    $('#crowd-tools-row-' + self.id).append(
      '<div class="form-group"> \
        <button class="btn btn-primary" id="crowd-tools-layout-input-' + self.id + '" type="button" \
        data-toggle="tooltip" data-original-title="Automatic Layout" data-placement="bottom" > \
        <i class="material-icons">timeline</i></button> \
      </div>'
    );

    //event handler when click layout
    $('#crowd-tools-layout-input-' + self.id).on('click', function () {
      joint.layout.DirectedGraph.layout(self.workspace.graph,
        {
          marginX: 100,
          marginY: 100
        }
      );

      setTimeout(() => self.workspace.fitPaper());

      $(".tooltip").tooltip('hide');
      $(this).blur();
    });
  }
  self.tools.layout.init();

  //export tool
  self.tools.export.init = function () {
    //define function to convert the actual model json schema to another model using the metamodelApi
    //in case the parameter model was equal to the actual model it exports json without using metamodelApi
    self.tools.export.exportTo = function (model, callback, callbackFinally) {
      if (self.config.conceptualModel.name == self.config.availableConceptualModels[model].name) {
        if (callback) callback(self.config.conceptualModel.toJSONSchema(self));
        if (callbackFinally) callbackFinally(self.config.conceptualModel.toJSONSchema(self));
      }
      else {
        self.config.metamodelApi.request({
          from: self.config.conceptualModel.name,
          to: 'meta',
          data: self.config.conceptualModel.toJSONSchema(self),
          success: function (response) {
            if (self.config.availableConceptualModels[model].name != 'meta') {
              self.config.metamodelApi.request({
                from: 'meta',
                to: self.config.availableConceptualModels[model].name,
                data: response,
                success: function (response) {
                  if (callback) callback(response);
                  if (callbackFinally) callbackFinally(response);
                },
                error: function (error) {
                  if (callbackFinally) callbackFinally(error);
                }
              });
            } else {
              if (callback) callback(response);
              if (callbackFinally) callbackFinally(response);
            }
          },
          error: function (error) {
            if (callbackFinally) callbackFinally(error);
          }
        });
      }
    }

    //append dom for export tool
    $('#crowd-tools-row-' + self.id).append(
      '<div class="form-group"> \
        <div class="dropdown"> \
          <button class="btn btn-primary dropdown-toggle" type="button" id="crowd-tools-export-dropdown-' + self.id + '" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> \
            <i class="fa fa-download"></i> Export \
          </button> \
          <div class="dropdown-menu" aria-labelledby="crowd-tools-export-dropdown-' + self.id + '"></div> \
        </div> \
      </div>'
    );

    //draw a button for each conceptual model and put the name on data attribute
    $.each(self.config.availableConceptualModels, function (conceptualModelName) {
      $('[aria-labelledby="crowd-tools-export-dropdown-' + self.id + '"]').append(
        '<button class="dropdown-item" data-model="' + conceptualModelName + '" name="crowd-tools-export-check-schema-' + self.id + '">' + conceptualModelName.toUpperCase() + ' Schema</button>'
      );
    });

    //append dom for the schemas modal when check export schemas
    $('body').append(
      '<div id="crowd-tools-export-check-schema-modal-' + self.id + '" class="modal fade"> \
        <div class="modal-dialog modal-dialog-scrollable modal-lg"> \
          <div class="modal-content"> \
            <div class="modal-header"> \
              <h5 class="modal-title"></h5> \
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"> \
                <span aria-hidden="true">&times;</span> \
              </button> \
            </div> \
            <div class="modal-body"><pre id="crowd-tools-export-check-schema-modal-pre-' + self.id + '" \
            style="overflow: hidden; overflow-wrap: break-word;"></pre></div> \
            <div class="modal-footer"> \
              <button type="button" class="btn btn-default" data-dismiss="modal">Close</button> \
              <button class="btn btn-dark" data-clipboard-target="#crowd-tools-export-check-schema-modal-pre-' + self.id + '"> \
                Copy to Clipboard \
              </button> \
              <button class="btn btn-dark" data-model="" id="crowd-tools-export-schema-' + self.id + '">Download</button> \
            </div> \
          </div> \
        </div> \
      </div>'
    );

    //init copy clipboard functionality
    new ClipboardJS('.btn');

    //event handler when click export check schema
    $('[name="crowd-tools-export-check-schema-' + self.id + '"]').on('click', function (event) {
      var btn = this;
      event.stopPropagation();

      var model = $(this).attr('data-model');
      $('#crowd-tools-export-schema-' + self.id).attr('data-model', model);

      var originalBtn = $(btn).html();
      $(btn).html(originalBtn + ' <i class="loading fa fa-circle-o-notch fa-spin"></i>');

      self.tools.export.exportTo(model,
        function (schema) {
          $('#crowd-tools-export-check-schema-modal-' + self.id + ' .modal-title').html('Export ' + model.toUpperCase() + ' Schema');
          $('#crowd-tools-export-check-schema-modal-' + self.id + ' .modal-body pre').html(JSON.stringify(schema, null, 4));
          $('#crowd-tools-export-check-schema-modal-' + self.id).modal('show');
          // copyToClipboard('#crowd-tools-export-check-schema-modal-' + self.id + ' .modal-body pre');
        },
        function () {
          $(btn).html(originalBtn);
          $('[aria-labelledby="crowd-tools-export-dropdown-' + self.id + '"]').dropdown('hide');
        }
      );

      $(".tooltip").tooltip('hide');
    });

    //event handler when click download exported schema
    $('#crowd-tools-export-schema-' + self.id).on('click', function () {
      var model = $(this).attr('data-model');

      self.tools.export.exportTo(model, function (schema) {
        $("<a />", {
          "download": model + "-schema.json",
          "href": "data:application/json;charset=utf-8," + encodeURIComponent(JSON.stringify(schema, null, 4)),
        }).appendTo("body")
          .click(function () {
            $(this).remove()
          })[0].click();
      });
    });
  }
  self.tools.export.init();

  //import tool
  self.tools.import.init = function () {
    //this function is called from outside editor for load a file through load modal or internally for import tool
    self.tools.import.importFrom = function (diagram) {
      //preserve the actual diagram to be imported
      self.tools.import.diagramToImport = diagram;

      //in case that actual conceptual model was the same of the file, just load it from schema
      if (diagram.model == self.config.conceptualModel.name) {
        if (self.hasChanges()) {
          $('#crowd-tools-import-advertisement-' + self.id).modal('show');
          $('.modal').modal('hide');
        } else {
          self.fromJSONSchema(JSON.parse(diagram.schema));
          $('.modal').modal('hide');
        }
      }
      //in case that actual conceptual model was different, redirect to url of the correct model sending the diagram schema as parameter
      else {
        if (self.config.availableConceptualModels[diagram.model].initPalette != null) {
          if (self.config.ngRouter) {
            self.config.ngRouter.navigate(['/editor/' + diagram.model], { state: { diagram: diagram.schema } });
            $('.modal').modal('hide');
          } else
            window.location.href = '/editor/' + diagram.model;
        } else {
          if (self.config.tools && self.config.tools.import && self.config.tools.import.errors && self.config.tools.import.errors.missingModelPalette)
            self.config.tools.import.errors.missingModelPalette(diagram.model);
          else
            alert('There is no palette for the conceptual model ' + model.toUpperCase() + '.');
        }
      }
    };

    //append dom for the advertisement modal when try to import a diagram
    $('body').append(
      '<div id="crowd-tools-import-advertisement-' + self.id + '" class="modal fade"> \
        <div class="modal-dialog"> \
          <div class="modal-content"> \
            <div class="modal-header"> \
              <h5 class="modal-title">Import Diagram</h5> \
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"> \
                <span aria-hidden="true">&times;</span> \
              </button> \
            </div> \
            <div class="modal-body"> \
              <p>Are you sure you want to import the diagram?</p> \
              <p><b>Changes may not be saved</b></p> \
            </div> \
            <div class="modal-footer"> \
              <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button> \
              <button id="crowd-tools-import-advertisement-proceed-' + self.id + '" \
              type="button" class="btn btn-danger" data-dismiss="modal">Proceed</button> \
            </div> \
          </div> \
        </div> \
      </div>'
    );

    //event handler when click proceed button in advertisement for import diagram
    $('#crowd-tools-import-advertisement-proceed-' + self.id).on('click', function () {
      self.fromJSONSchema(JSON.parse(self.tools.import.diagramToImport.schema));
      $(".tooltip").tooltip('hide');
    });

    //append dom for import tool
    $('#crowd-tools-row-' + self.id).append(
      '<div class="form-group"> \
        <div class="dropdown"> \
          <button class="btn btn-primary dropdown-toggle" type="button" id="crowd-tools-import-dropdown-' + self.id + '" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> \
            <i class="fa fa-upload"></i> Import \
          </button> \
          <div class="dropdown-menu" aria-labelledby="crowd-tools-import-dropdown-' + self.id + '"></div> \
        </div> \
      </div>'
    );

    //draw a button for each conceptual model and put the name on data attribute
    $.each(self.config.availableConceptualModels, function (conceptualModelName, conceptualModel) {
      if (conceptualModel.initPalette != null) {
        $('[aria-labelledby="crowd-tools-import-dropdown-' + self.id + '"]').append(
          '<button class="dropdown-item" data-model="' + conceptualModelName + '" name="crowd-tools-import-check-schema-' + self.id + '">' + conceptualModelName.toUpperCase() + ' Schema</button>'
        );
      }
    });

    //append dom for the schemas modal when check import schemas
    $('body').append(
      '<div id="crowd-tools-import-check-schema-modal-' + self.id + '" class="modal fade"> \
        <div class="modal-dialog modal-dialog-scrollable modal-lg"> \
          <div class="modal-content"> \
            <div class="modal-header"> \
              <h5 class="modal-title"></h5> \
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"> \
                <span aria-hidden="true">&times;</span> \
              </button> \
            </div> \
            <div class="modal-body"> \
              <div class="form-group"> \
                <label for="crowd-tools-import-file-' + self.id + '">Select a schema file</label> \
                <div class="custom-file"> \
                  <input type="file" class="custom-file-input" id="crowd-tools-import-file-' + self.id + '"> \
                  <label class="custom-file-label" for="crowd-tools-import-file-' + self.id + '">Choose file</label> \
                </div> \
              </div> \
              <div class="form-group"> \
                <label for="crowd-tools-import-raw-' + self.id + '">Or paste the JSON directly</label> \
                <textarea class="form-control" id="crowd-tools-import-raw-' + self.id + '" rows="10"></textarea> \
              </div> \
            </div> \
            <div class="modal-footer"> \
              <button type="button" class="btn btn-default" data-dismiss="modal">Close</button> \
              <button class="btn btn-dark" data-model="" id="crowd-tools-import-schema-' + self.id + '">Upload</button> \
            </div> \
          </div> \
        </div> \
      </div>'
    );

    //event when select a file to import
    $('#crowd-tools-import-file-' + self.id).on('change', function () {
      var fileName = 'Choose file';
      if (this.files[0])
        fileName = document.getElementById('crowd-tools-import-file-' + self.id).files[0].name;
      $(this).next('.custom-file-label').html(fileName);

      var fr = new FileReader();
      fr.onload = function () {
        $('#crowd-tools-import-raw-' + self.id).val(fr.result);
      }
      fr.readAsText(this.files[0]);
    });

    //event handler when click import check schema
    $('[name="crowd-tools-import-check-schema-' + self.id + '"]').on('click', function (event) {
      var btn = this;
      event.stopPropagation();

      var model = $(this).attr('data-model');
      $('#crowd-tools-import-schema-' + self.id).attr('data-model', model);

      $('#crowd-tools-import-check-schema-modal-' + self.id + ' .modal-title').html('Import ' + model.toUpperCase() + ' Schema');
      $('#crowd-tools-import-check-schema-modal-' + self.id).modal('show');

      $('[aria-labelledby="crowd-tools-import-dropdown-' + self.id + '"]').dropdown('hide');
      $(".tooltip").tooltip('hide');
    });

    //event handler when click upload imported schema
    $('#crowd-tools-import-schema-' + self.id).on('click', function () {
      self.tools.import.importFrom({ model: $(this).attr('data-model'), schema: $('#crowd-tools-import-raw-' + self.id).val() });
    });
  }
  self.tools.import.init();

  //save to cloud tool
  self.tools.save.init = function () {
    //append dom for save tool
    $('#crowd-tools-row-' + self.id).append(
      '<div class="form-group"> \
        <button class="btn btn-primary" id="crowd-tools-save-input-' + self.id + '" type="button" \
        data-toggle="tooltip" data-original-title="Save Diagram on Cloud" data-placement="bottom" > \
        <i class="material-icons">cloud_upload</i></button> \
      </div>'
    );

    //event handler when click save
    $('#crowd-tools-save-input-' + self.id).on('click', function () {
      if (self.config.ngFiles) {
        if (self.config.ngFiles.save) {
          if (self.config.ngFiles.save.modal) {
            $('#' + self.config.ngFiles.save.modal).modal('show');
          }
        }
      }
      $(".tooltip").tooltip('hide');
      $(this).blur();
    });
  }
  self.tools.save.init();

  //load from cloud tool
  self.tools.load.init = function () {
    //append dom for load tool
    $('#crowd-tools-row-' + self.id).append(
      '<div class="form-group"> \
        <button class="btn btn-primary" id="crowd-tools-load-input-' + self.id + '" type="button" \
        data-toggle="tooltip" data-original-title="Load Diagram from Cloud" data-placement="bottom" > \
        <i class="material-icons">cloud_download</i></button> \
      </div>'
    );

    //event handler when click load
    $('#crowd-tools-load-input-' + self.id).on('click', function () {
      if (self.config.ngFiles) {
        if (self.config.ngFiles.load) {
          if (self.config.ngFiles.load.modal) {
            $('#' + self.config.ngFiles.load.modal).modal('show');
          }
          if (self.config.ngFiles.load.get) {
            self.config.ngFiles.load.get();
          }
        }
      }
      $(".tooltip").tooltip('hide');
      $(this).blur();
    });
  }
  self.tools.load.init();

  //change conceptual model tool
  self.tools.model.init = function () {
    //append dom for change conceptual model tool
    $('#crowd-tools-row-' + self.id).append(
      '<div class="form-group"> \
        <div class="dropdown"> \
          <button class="btn btn-danger dropdown-toggle" type="button" id="crowd-tools-model-dropdown-' + self.id + '" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> \
            <i class="fa fa-th"></i> Model \
          </button> \
          <div class="dropdown-menu" aria-labelledby="crowd-tools-model-dropdown-' + self.id + '"></div> \
        </div> \
      </div>'
    );

    //draw a button for each conceptual model and put the name on data attribute
    $.each(self.config.availableConceptualModels, function (conceptualModelName, conceptualModel) {
      if (conceptualModel.initPalette != null) {
        $('[aria-labelledby="crowd-tools-model-dropdown-' + self.id + '"]').append(
          // '<button class="dropdown-item" data-model="' + conceptualModelName + '" name="crowd-tools-model-input-' + self.id + '" ' + (self.config.conceptualModel.name == conceptualModel.name ? 'disabled' : '') + '>' + conceptualModelName.toUpperCase() + '</button>'
          '<button class="dropdown-item" data-model="' + conceptualModelName + '" name="crowd-tools-model-advertisement-proceed-' + self.id + '" ' + (self.config.conceptualModel.name == conceptualModel.name ? 'disabled' : '') + '>' + conceptualModelName.toUpperCase() + '</button>'
          //'<a href="/editor/' + conceptualModelName + '" class="dropdown-item ' + (self.config.conceptualModel.name == conceptualModel.name ? 'disabled' : '') + '">' + conceptualModelName.toUpperCase() + '</a>'
        );
      }
    })

    // (not in use)
    //append dom for the advertisement modal when try to change conceptual model
    $('body').append(
      '<div id="crowd-tools-model-advertisement-' + self.id + '" class="modal fade"> \
        <div class="modal-dialog"> \
          <div class="modal-content"> \
            <div class="modal-header"> \
              <h5 class="modal-title">Change Conceptual Model</h5> \
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"> \
                <span aria-hidden="true">&times;</span> \
              </button> \
            </div> \
            <div class="modal-body"> \
              <p>Are you sure you want to change the conceptual model?</p> \
              <p><b>You lost not saved changes</b></p> \
            </div> \
            <div class="modal-footer"> \
              <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button> \
              <button name="crowd-tools-model-advertisement-proceed-' + self.id + '" \
              type="button" class="btn btn-danger" data-dismiss="modal">Proceed</button> \
            </div> \
          </div> \
        </div> \
      </div>'
    );

    // (not in use)
    //event handler when click model change that open advertisement modal
    $('[name=crowd-tools-model-input-' + self.id + "]").on('click', function () {
      $('#crowd-tools-model-advertisement-' + self.id).modal('show');
      $('#crowd-tools-model-advertisement-proceed-' + self.id).attr('data-model', $(this).attr('data-model'));
      $(".tooltip").tooltip('hide');
    });

    //event handler when click proceed button in advertisement for model change
    $('[name=crowd-tools-model-advertisement-proceed-' + self.id + "]").on('click', function () {
      console.log('/editor/' + $(this).attr('data-model'));
      if (self.config.ngRouter)
        self.config.ngRouter.navigate(['/editor/' + $(this).attr('data-model')]);
      else
        window.location.href = '/editor/' + $(this).attr('data-model');
    });
  }
  self.tools.model.init();

  //clear workspace tool
  self.tools.clearWorkspace.init = function () {
    //append dom for clear workspace tool
    $('#crowd-tools-row-' + self.id).append(
      '<div class="form-group"> \
        <button class="btn btn-danger" id="crowd-tools-clear-workspace-input-' + self.id + '" type="button" \
        data-toggle="tooltip" data-original-title="Clear Diagram" data-placement="bottom" > \
        <i class="material-icons">delete_forever</i></button> \
      </div>'
    );

    //append dom for the advertisement modal when try clear workspace
    $('body').append(
      '<div id="crowd-tools-clear-workspace-advertisement-' + self.id + '" class="modal fade"> \
        <div class="modal-dialog"> \
          <div class="modal-content"> \
            <div class="modal-header"> \
              <h5 class="modal-title">Clear Diagram</h5> \
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"> \
                <span aria-hidden="true">&times;</span> \
              </button> \
            </div> \
            <div class="modal-body"> \
              <p>Are you sure you want to clear the diagram?</p> \
            </div> \
            <div class="modal-footer"> \
              <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button> \
              <button id="crowd-tools-clear-workspace-advertisement-proceed-' + self.id + '" \
              type="button" class="btn btn-danger" data-dismiss="modal">Proceed</button> \
            </div> \
          </div> \
        </div> \
      </div>'
    );

    //event handler when click clear workspace that open advertisement modal
    $('#crowd-tools-clear-workspace-input-' + self.id).on('click', function () {
      if (self.hasChanges()) {
        $('#crowd-tools-clear-workspace-advertisement-' + self.id).modal('show');
      }
      $(".tooltip").tooltip('hide');
      $(this).blur();
    });

    //event handler when click proceed button in advertisement for clear workspace
    $('#crowd-tools-clear-workspace-advertisement-proceed-' + self.id).on('click', function () {
      //clear the workspace elements
      self.workspace.graph.clear();
      //center workspace scroll
      setTimeout(() => self.workspace.centerScroll());

      $(".tooltip").tooltip('hide');
    });
  }
  self.tools.clearWorkspace.init();

  $('[data-toggle="tooltip"]').tooltip({ html: true });
}

CrowdEditor.prototype.initWorkspace = function () {
  var self = this;

  //initialize workspace objects
  self.workspace = new Object();
  self.workspace.tools = new Object();
  self.workspace.tools.elements = new Object();
  self.workspace.tools.links = new Object();
  //the size of map paper is obtained from css
  self.workspace.paperSize = {
    width: parseFloat(getCSS('width', 'crowd-workspace-paper')),
    height: parseFloat(getCSS('height', 'crowd-workspace-paper')),
  };
  //the zoom of paper is initialy 100%
  self.workspace.zoom = 1;
  //the paper padding is setted to avoid element tools to be outside paper when they are close to edge
  self.workspace.paperPadding = 40;

  //add joint graph to workspace
  self.workspace.graph = new joint.dia.Graph();

  //append dom element for workspace scrollable
  $('#crowd-workspace-' + self.id).append('<div class="crowd-workspace-scrollable" id="crowd-workspace-scrollable-' + self.id + '"></div>');

  //append dom element for workspace paper
  $('#crowd-workspace-scrollable-' + self.id).append('<div class="crowd-workspace-paper" id="crowd-workspace-paper-' + self.id + '"></div>');

  //add joint paper to workspace
  self.workspace.paper = new joint.dia.Paper({
    el: $('#crowd-workspace-paper-' + self.id)[0],
    width: self.workspace.paperSize.width,//$('#crowd-workspace-' + self.id).width(),
    height: self.workspace.paperSize.height,//$('#crowd-workspace-' + self.id).height(),
    // origin: { x: self.workspace.paperPadding, y: self.workspace.paperPadding },
    model: self.workspace.graph,
    gridSize: 10,
    background: {
      color: $('#crowd-workspace-' + self.id).css("background-color")
    },
    drawGrid: {
      name: 'fixedDot',
      args: [
        {
          color: 'black',
        }
      ]
    },
    // defaultLink: function () {
    //   return createLink();
    // },
    // connectionStrategy: function (end) {
    //   //removing `magnet: 'tool'` from the end object
    //   return {
    //     id: end.id
    //   };
    // },
    // validateConnection: function (cellViewS, magnetS, cellViewT, magnetT, end, linkView) {
    //   //prevent invalid conections
    //   if (cellViewS == null || cellViewT == null || cellViewS.model.attributes.type === 'standard.Link' || cellViewT.model.attributes.type === 'standard.Link') {
    //     return false;
    //   }
    //   return canConnect(cellViewS.model, cellViewT.model);
    // }
  });

  this.initChangeAttributesEvents();

  this.initLinksToolsViews();

  this.initElementsToolsViews();

  //function to render the tools of a element view (may be used for update in case of change element type)
  self.workspace.renderElementTools = function (elementView) {
    self.workspace.paper.hideTools();
    var toolsView = self.workspace.tools.elements.elementsToolsView[elementView.model.attributes.type];
    elementView.addTools(toolsView != null ? toolsView : self.workspace.tools.elements.elementsToolsView.basic);
    elementView.showTools();
    $('[data-toggle="tooltip"]').tooltip({ html: true });
  }

  //add tools to an element when it's clicked (hide all the others tools)
  self.workspace.paper.on('element:pointerup', function (elementView) {
    self.workspace.renderElementTools(elementView);
  });

  //hide tools when click over the workspace paper
  self.workspace.paper.on('blank:pointerdown', function (elementView) {
    self.workspace.linkClickedFlag = false;
    self.workspace.paper.hideTools();
  });

  //hide the tooltips when click the workspace paper (fix in case that parent element was deleted)
  $('#crowd-workspace-' + self.id).on('mouseup mousedown', function (event) {
    $(".tooltip").tooltip('hide');
  });

  self.workspace.linkClickedFlag = false;

  //show basic tools to a link when it's hover
  self.workspace.paper.on('link:mouseenter', function (linkView) {
    if (!self.workspace.linkClickedFlag) {
      linkView.showTools();
      linkView._toolsView.tools.filter(function (tool) {
        return !(
          // tool.el.dataset.toolName == "vertices" ||
          // tool.el.dataset.toolName == "segments" ||
          tool.el.dataset.toolName == "source-arrowhead" ||
          tool.el.dataset.toolName == "target-arrowhead");
      }).forEach(function (tool) {
        tool.hide();
      });
    }
    $('[data-toggle="tooltip"]').tooltip({ html: true });
  });

  //show all tools to a link when it's clicked
  self.workspace.paper.on('link:pointerup', function (linkView) {
    self.workspace.paper.hideTools();
    self.workspace.linkClickedFlag = true;
    linkView.showTools();
    $('[data-toggle="tooltip"]').tooltip({ html: true });
  });

  //hide tools of a link when it's no more hover or paper is clicked
  self.workspace.paper.on('link:mouseleave', function (linkView) {
    if (!self.workspace.linkClickedFlag) {
      linkView.hideTools();
    }
    $('[data-toggle="tooltip"]').tooltip({ html: true });
  });

  //function that set workspace scroll to the center
  self.workspace.centerScroll = function () {
    $('#crowd-workspace-' + self.id).scrollLeft(($('#crowd-workspace-scrollable-' + self.id).width() - $('#crowd-workspace-' + self.id).width()) / 2);
    $('#crowd-workspace-' + self.id).scrollTop(($('#crowd-workspace-scrollable-' + self.id).height() - $('#crowd-workspace-' + self.id).height()) / 2);
  };

  //function that fits the paper size and scroll to the elements position
  self.workspace.fitPaper = function () {
    //preserve previous zoom for later calculus
    var zoomPrev = self.workspace.paper.scale().sx;
    //flag to determine that the zoom has changed
    var zoomChange = self.workspace.paper.scale().sx != self.workspace.zoom;

    //save the proportion of workspace view relative to paper for adjust scroll when zooming
    if ($('#crowd-workspace-paper-' + self.id).position()) {
      var prop = {
        left: ($('#crowd-workspace-' + self.id).scrollLeft() - $('#crowd-workspace-paper-' + self.id).position().left) / $('#crowd-workspace-paper-' + self.id).width(),
        top: ($('#crowd-workspace-' + self.id).scrollTop() - $('#crowd-workspace-paper-' + self.id).position().top) / $('#crowd-workspace-paper-' + self.id).height(),
        width: $('#crowd-workspace-' + self.id).width() - $('#crowd-workspace-paper-' + self.id).width(),
        height: $('#crowd-workspace-' + self.id).height() - $('#crowd-workspace-paper-' + self.id).height()
      }
    }

    //scale the workspace paper elements to the zoom value
    //it needs to be proportional to the paper size of workspace
    self.workspace.paper.scale(self.workspace.zoom);

    //get the size of the paper before fitting it
    var oldPaperArea = self.workspace.paper.getArea();

    self.workspace.paper.fitToContent({
      allowNewOrigin: 'any',
      gridWidth: self.workspace.paperSize.width * self.workspace.zoom,
      gridHeight: self.workspace.paperSize.height * self.workspace.zoom,
      // useModelGeometry: true,
      contentArea: {
        x: self.workspace.paper.getContentArea().x > 0 ? 0 : self.workspace.paper.getContentArea().x,
        y: self.workspace.paper.getContentArea().y > 0 ? 0 : self.workspace.paper.getContentArea().y,
        width: self.workspace.paper.getContentArea().x > 0
          ? Math.abs(self.workspace.paper.getContentArea().x) + self.workspace.paper.getContentArea().width
          : self.workspace.paper.getContentArea().width,
        height: self.workspace.paper.getContentArea().y > 0
          ? Math.abs(self.workspace.paper.getContentArea().y) + self.workspace.paper.getContentArea().height
          : self.workspace.paper.getContentArea().height
      },
      padding: self.workspace.paperPadding * self.workspace.zoom
    });

    //get the size of the paper after fitting it
    var newPaperArea = self.workspace.paper.getArea();

    //calculate the growth or shrink size and origin move of the paper area with the old and new area
    var paperAreaDiff = {
      x: newPaperArea.x - oldPaperArea.x,
      y: newPaperArea.y - oldPaperArea.y,
      width: newPaperArea.width - oldPaperArea.width,
      height: newPaperArea.height - oldPaperArea.height
    }

    //growth or shrink the scrollable div with the area difference value to preserve the distance of the paper to the edge of container
    $('#crowd-workspace-scrollable-' + self.id).width($('#crowd-workspace-scrollable-' + self.id).width() + paperAreaDiff.width * self.workspace.zoom);
    $('#crowd-workspace-scrollable-' + self.id).height($('#crowd-workspace-scrollable-' + self.id).height() + paperAreaDiff.height * self.workspace.zoom);

    //moves the workspace scroll to preserve the camera on the center of view when zooming in or out
    if (zoomChange) {
      var newProp = {
        width: $('#crowd-workspace-' + self.id).width() - $('#crowd-workspace-paper-' + self.id).width(),
        height: $('#crowd-workspace-' + self.id).height() - $('#crowd-workspace-paper-' + self.id).height()
      }

      // console.log('prop', prop);
      // console.log('newProp', newProp);
      // console.log(paperAreaDiff);
      // console.log($('#crowd-workspace-' + self.id).scrollLeft(), $('#crowd-workspace-' + self.id).scrollTop());
      // console.log('wsL', $('#crowd-workspace-' + self.id).scrollLeft());
      // console.log('wsW', $('#crowd-workspace-' + self.id).width());
      // console.log('wsCenter', ($('#crowd-workspace-' + self.id).scrollLeft() + $('#crowd-workspace-' + self.id).width() / 2));
      // console.log('ppL', $('#crowd-workspace-paper-' + self.id).position().left);
      // console.log('distWSPP', (($('#crowd-workspace-' + self.id).scrollLeft() + $('#crowd-workspace-' + self.id).width() / 2) - $('#crowd-workspace-paper-' + self.id).position().left));
      $('#crowd-workspace-' + self.id).scrollLeft(($('#crowd-workspace-paper-' + self.id).width() * prop.left) + $('#crowd-workspace-paper-' + self.id).position().left +
        Math.abs(newProp.width - prop.width) * (self.workspace.zoom - zoomPrev));
      $('#crowd-workspace-' + self.id).scrollTop(($('#crowd-workspace-paper-' + self.id).height() * prop.top) + $('#crowd-workspace-paper-' + self.id).position().top +
        Math.abs(newProp.height - prop.height) * (self.workspace.zoom - zoomPrev));
    }

    //scroll the workspace container when the origin of paper change to preserve the view in the same relative position when resize the paper div
    if (Math.abs(paperAreaDiff.x) > 0 && !zoomChange) {
      $('#crowd-workspace-' + self.id).scrollLeft($('#crowd-workspace-' + self.id).scrollLeft() + paperAreaDiff.width * self.workspace.zoom);
    }
    if (Math.abs(paperAreaDiff.y) > 0 && !zoomChange) {
      $('#crowd-workspace-' + self.id).scrollTop($('#crowd-workspace-' + self.id).scrollTop() + paperAreaDiff.height * self.workspace.zoom);
    }

    //call the fit paper function of the mini map
    self.map.fitPaper();
  };

  //event that fit the workspace paper when elements or links are moved
  self.workspace.graph.on('change:position change:target change:source remove add', function () {
    setTimeout(() => self.workspace.fitPaper());
  });

  //this will contain the start position in the workspace paper when user drag it
  self.workspace.dragStartPosition = null;

  //function that save start position of dragging of the workspace
  self.workspace.dragStart = function (evt) {
    self.workspace.dragStartPosition = {
      //the current scroll
      left: $('#crowd-workspace-' + self.id)[0].scrollLeft,
      top: $('#crowd-workspace-' + self.id)[0].scrollTop,
      //get the current mouse position
      x: evt.clientX,
      y: evt.clientY
    };
  }

  //event for save start position of dragging of the workspace paper when click over scrollable div and not over paper
  $('#crowd-workspace-scrollable-' + self.id).on('mousedown', function (evt) {
    if (!$('#crowd-workspace-paper-' + self.id + ':hover').length)
      self.workspace.dragStart(evt);
  });

  //event for save start position of dragging of the workspace paper when click over blank position of the paper
  self.workspace.paper.on('blank:pointerdown', function (evt, x, y) {
    self.workspace.dragStart(evt);
  });

  //event for clear the drag start position for drag workspace paper
  $('#crowd-workspace-scrollable-' + self.id).on('mouseup mouseleave', function (evt) {
    self.workspace.dragStartPosition = null;
  });

  //event for drag workspace paper with the drag start position saved previously
  $('#crowd-workspace-scrollable-' + self.id).on('mousemove', function (evt) {
    if (self.workspace.dragStartPosition) {
      //how far the mouse has been moved
      const dx = evt.clientX - self.workspace.dragStartPosition.x;
      const dy = evt.clientY - self.workspace.dragStartPosition.y;
      //scroll the element
      $('#crowd-workspace-' + self.id)[0].scrollTop = self.workspace.dragStartPosition.top - dy;
      $('#crowd-workspace-' + self.id)[0].scrollLeft = self.workspace.dragStartPosition.left - dx;
    }
  });
}

CrowdEditor.prototype.initElementsToolsViews = function () {
  var self = this;

  //design of tools icons with markup (svg in json notation)
  //https://www.w3schools.com/graphics/svg_intro.asp
  //https://resources.jointjs.com/docs/jointjs/v3.2/joint.html#dia.Cell.markup
  self.workspace.tools.elements.markup = function (config) {
    return [
      //draw a circle for the icon background
      {
        tagName: 'circle',
        selector: 'button',
        className: '',
        style: {
          opacity: '0.7'
        },
        attributes: {
          r: 10,
          cx: 0,
          cy: -10,
          fill: config.background ? config.background : 'black',
          cursor: 'pointer'
        }
      },
      //draw the icon with the material icons of google
      //https://material.io/resources/icons
      {
        tagName: 'text',
        className: 'material-icons crowd-workspace-tools-icon',
        style: {
          'font-size': '14px'
        },
        attributes: {
          x: -7,
          y: -3,
          fill: 'white',
          cursor: 'pointer',
          title: config.tooltip.title,
          'data-toggle': "tooltip",
          'data-placement': config.tooltip.placement
        },
        textContent: config.icon
      }
    ];
  }

  //design of resize tools icons with markup (svg in json notation)
  self.workspace.tools.elements.resizeMarkup = function (config) {
    return [
      //draw a little rectangle
      {
        tagName: 'rect',
        selector: 'button',
        className: '',
        style: {
          opacity: '0.7'
        },
        attributes: {
          width: 8,
          height: 8,
          x: 0,
          y: 0,
          fill: config.background ? config.background : 'black',
          cursor: config.cursor ? config.cursor : 'nw-resize'
        }
      },
    ];
  }

  //add remove tool to workspace tools
  self.workspace.tools.elements.removeTool = new joint.elementTools.Remove({
    focusOpacity: 1,
    rotate: true,
    offset: { x: -25, y: -15 },
    markup: self.workspace.tools.elements.markup({ icon: 'clear', tooltip: { title: 'Click to remove the object', placement: "left" } })
  });

  //add link tool to workspace tools
  self.workspace.tools.elements.linkTool = function (config) {
    return new joint.elementTools.Button({
      focusOpacity: 1,
      rotate: true,
      x: config.x != null ? config.x : '100%',
      y: config.y != null ? config.y : null,
      offset: config.offset != null ? config.offset : { x: 25, y: -15 },
      action: function (evt, elementView, buttonView) {
        console.log('linkTool', this, { evt, elementView, buttonView });
        //create the link
        var link = config.link && config.link.type ? self.palette.links[config.link.type].clone() : self.palette.links.basic.clone();

        //set the source to the selected element
        link.source({ id: this.model.id });

        //get event mouse point depending on browser
        var eventPoint = getEventClientPoint(evt);

        //place it at mouse position
        link.target({
          x: (eventPoint.x - self.workspace.paper.translate().tx) / self.workspace.paper.scale().sx,
          y: (eventPoint.y - self.workspace.paper.translate().ty) / self.workspace.paper.scale().sy
          // x: (evt.originalEvent.offsetX - self.workspace.paper.translate().tx),
          // y: (evt.originalEvent.offsetY - self.workspace.paper.translate().ty)
        });

        //add it to the graph
        self.workspace.graph.addCell(link);

        //change specific props of the link if they are defined
        if (config.link && config.link.props) {
          for (prop in config.link.props) {
            link.prop(prop, config.link.props[prop]);
          }
        }

        //get link view of the new link in the workspace paper
        var linkView = link.findView(self.workspace.paper);

        //simulate pointerdown event (mousedown) over the dom element of the link tool "TargetArrowhead"
        var clickEvent = document.createEvent('MouseEvents');
        clickEvent.initMouseEvent('mousedown', true, true, evt.view, evt.detail, evt.screenX, evt.screenY, eventPoint.x, eventPoint.y, null, null, null, null, null, new EventTarget('marker-arrowhead'));
        linkView._toolsView.tools[2].el.dispatchEvent(clickEvent); //second position of the array correspond to "TargetArrowhead" tool
      },
      markup: config.markup != null ? config.markup : self.workspace.tools.elements.markup({ icon: 'call_made', tooltip: { title: 'Click and drag to connect the object', placement: "right" } })
    });
  }

  //add clone tool to workspace tools
  self.workspace.tools.elements.cloneTool = new joint.elementTools.Button({
    focusOpacity: 1,
    rotate: true,
    x: '100%',
    y: '100%',
    offset: { x: 25, y: 35 },
    action: function (evt, elementView, buttonView) {
      console.log('cloneTool', this, { evt, elementView, buttonView });
      //clone the element
      var clonedElement = this.model.clone();

      //get event mouse point depending on browser
      var eventPoint = getEventClientPoint(evt);

      //place it at mouse position
      clonedElement.attributes.position = {
        x: (eventPoint.x - self.workspace.paper.translate().tx) / self.workspace.paper.scale().sx - (clonedElement.attributes.size.width / 2),
        y: (eventPoint.y - self.workspace.paper.translate().ty) / self.workspace.paper.scale().sy - (clonedElement.attributes.size.height / 2)
        // x: (evt.originalEvent.layerX - self.workspace.paper.translate().tx) - (clonedElement.attributes.size.width / 2),
        // y: (evt.originalEvent.layerY - self.workspace.paper.translate().ty) - (clonedElement.attributes.size.height / 2)
      };

      //add it to the graph
      self.workspace.graph.addCell(clonedElement);

      //get element view of the cloned element in the workspace paper
      var clonedElementView = clonedElement.findView(self.workspace.paper);

      //simulate pointerdown event (mousedown) over the dom element of the element view of cloned element
      var clickEvent = document.createEvent('MouseEvents');
      clickEvent.initMouseEvent('mousedown', true, true, evt.view, evt.detail, evt.screenX, evt.screenY, evt.clientX, evt.clientY);
      clonedElementView.el.dispatchEvent(clickEvent);
    },
    markup: self.workspace.tools.elements.markup({ icon: 'content_copy', tooltip: { title: 'Click and drag to clone the object', placement: "right" } })
  });

  //add remove links tool to workspace tools
  self.workspace.tools.elements.removeLinksTool = new joint.elementTools.Button({
    focusOpacity: 1,
    rotate: true,
    y: '100%',
    offset: { x: -25, y: 35 },
    action: function (evt, elementView, buttonView) {
      console.log('removeLinksTool', this, { evt, elementView, buttonView });

      self.workspace.graph.getConnectedLinks(elementView.model).forEach(function (connectedLink) {
        connectedLink.remove();
      });
    },
    markup: self.workspace.tools.elements.markup({ icon: 'content_cut', tooltip: { title: 'Click to break all connections to other objects', placement: "left" } })
  });

  //add boundary tool to workspace tools
  self.workspace.tools.elements.boundaryTool = new joint.elementTools.Boundary({
    focusOpacity: 0.5
  });

  //function for generate link element tool with a specific element type
  self.workspace.tools.elements.linkElementTool = function (config) {
    return new joint.elementTools.Button({
      focusOpacity: 1,
      rotate: true,
      x: config.x != null ? config.x : '50%',
      y: config.y != null ? config.y : null,
      offset: config.offset != null ? config.offset : { x: -25, y: -15 },
      action: function (evt, elementView, buttonView) {
        console.log('linkTool', this, { evt, elementView, buttonView });
        //create the new element
        var newElement = config.elementType.clone();

        //get event mouse point depending on browser
        var eventPoint = getEventClientPoint(evt);

        //place it at mouse position
        newElement.attributes.position = {
          x: (eventPoint.x - self.workspace.paper.translate().tx) / self.workspace.paper.scale().sx - (newElement.attributes.size.width / 2),
          y: (eventPoint.y - self.workspace.paper.translate().ty) / self.workspace.paper.scale().sy - (newElement.attributes.size.height / 2)
          // x: (evt.originalEvent.offsetX - self.workspace.paper.translate().tx) - (newElement.attributes.size.width / 2),
          // y: (evt.originalEvent.offsetY - self.workspace.paper.translate().ty) - (newElement.attributes.size.height / 2)
        };

        //add new element to the graph
        self.workspace.graph.addCell(newElement);

        //create the link of the indicated type or else basic type for connect the selected element with the new element
        var link = config.link && config.link.type ? self.palette.links[config.link.type].clone() : self.palette.links.basic.clone();

        //set the source to the selected element
        link.source({ id: this.model.id });

        //set the target to the new element
        link.target({ id: newElement.id });

        //add link to the graph
        self.workspace.graph.addCell(link);

        //change specific props of the link if they are defined
        if (config.link && config.link.props) {
          for (prop in config.link.props) {
            link.prop(prop, config.link.props[prop]);
          }
        }

        //get element view of the new element in the workspace paper
        var newElementView = newElement.findView(self.workspace.paper);

        //simulate pointerdown event (mousedown) over the dom element of the element view of new element
        var clickEvent = document.createEvent('MouseEvents');
        clickEvent.initMouseEvent('mousedown', true, true, evt.view, evt.detail, evt.screenX, evt.screenY, evt.clientX, evt.clientY);
        newElementView.el.dispatchEvent(clickEvent);
      },
      markup: config.markup != null ? config.markup : self.workspace.tools.elements.markup({ icon: 'share', tooltip: { title: 'Click and drag to make new object and connect with it', placement: "top" } })
    });
  }

  //function for generate resize tools
  self.workspace.tools.elements.resizeTool = function (config) {
    return new joint.elementTools.Button({
      focusOpacity: 1,
      rotate: false,
      x: config.x != null ? config.x : null,
      y: config.y != null ? config.y : null,
      offset: config.offset != null ? config.offset : { x: -14, y: -14 },
      action: function (evt, elementView, buttonView) {
        console.log('resizeTool', this, { evt, elementView, buttonView });

        config.minSize = config.minSize ? config.minSize : { width: 20, height: 20 };
        config.direction = config.direction ? config.direction : 'top-left';

        $('#crowd-workspace-' + self.id).on('mousemove.resizing', function (evt) {
          // console.log('resizing', evt);

          //create object with the distances between buttonView and the cursor position
          var addSize = { height: 0, width: 0 };
          //calculates the added width and height depends on the resizing direction
          switch (config.vdirection) {
            case 'top':
              addSize.height = buttonView.$el.position().top - evt.pageY;
              break;
            case 'bottom':
              addSize.height = evt.pageY - buttonView.$el.position().top;
              break;
          }
          switch (config.hdirection) {
            case 'left':
              addSize.width = buttonView.$el.position().left - evt.pageX;
              break;
            case 'right':
              addSize.width = evt.pageX - buttonView.$el.position().left;
              break;
          }

          // console.log({ pageY: evt.pageY, pageX: evt.pageX }, buttonView.$el.position(), { addSize });

          //adjust the add size for the paper actual zoom (scale)
          // addSize.width = addSize.width / self.workspace.paper.scale().sx;
          // addSize.height = addSize.height / self.workspace.paper.scale().sy;
          addSize.width = addSize.width / self.workspace.zoom;
          addSize.height = addSize.height / self.workspace.zoom;

          //create object for the newSize and check if new width and height are bigger than min sizes individually
          var newSize = { width: elementView.model.size().width, height: elementView.model.size().height };
          newSize.width = newSize.width + addSize.width > config.minSize.width ? newSize.width + addSize.width : newSize.width;
          newSize.height = newSize.height + addSize.height > config.minSize.height ? newSize.height + addSize.height : newSize.height;

          //restrict new size to a multiple of grid size to simulate snap to grid effect
          if (config.snapGrid || config.snapGrid == null) {
            // var gridSize = self.workspace.paper.options.gridSize / self.workspace.paper.scale().sx;
            var gridSize = self.workspace.paper.options.gridSize;
            newSize.width = Math.round(newSize.width / gridSize) * gridSize > config.minSize.width
              ? Math.round(newSize.width / gridSize) * gridSize : newSize.width;
            newSize.height = Math.round(newSize.height / gridSize) * gridSize > config.minSize.height
              ? Math.round(newSize.height / gridSize) * gridSize : newSize.height;
          }

          //resize the view to the new size calculated in the correpondiente direction of resizing
          elementView.model.resize(newSize.width, newSize.height, { direction: config.direction });
        });

        $('#crowd-workspace-' + self.id).on('mouseup.finishResizing', function (evt) {
          // console.log('finishResizing', evt);

          $('#crowd-workspace-' + self.id).off('mousemove.resizing');
          $('#crowd-workspace-' + self.id).off('mouseup.finishResizing');
        });
      },
      markup: config.markup != null ? config.markup : self.workspace.tools.elements.resizeMarkup({})
    });
  }

  //initialize elements tools view object
  self.workspace.tools.elements.elementsToolsView = new Object();

  //array of basic tools for all elements
  self.workspace.tools.elements.basicTools = [
    self.workspace.tools.elements.removeTool,
    self.workspace.tools.elements.cloneTool,
    self.workspace.tools.elements.removeLinksTool,
    self.workspace.tools.elements.boundaryTool,
    self.workspace.tools.elements.resizeTool({
      direction: 'top-left', vdirection: 'top', hdirection: 'left',
      markup: self.workspace.tools.elements.resizeMarkup({ cursor: 'nw-resize' })
    }),
    self.workspace.tools.elements.resizeTool({
      x: '100%', offset: { x: 6, y: -14 },
      direction: 'top-right', vdirection: 'top', hdirection: 'right',
      markup: self.workspace.tools.elements.resizeMarkup({ cursor: 'ne-resize' })
    }),
    self.workspace.tools.elements.resizeTool({
      y: '100%', offset: { x: -14, y: 6 },
      direction: 'bottom-left', vdirection: 'bottom', hdirection: 'left',
      markup: self.workspace.tools.elements.resizeMarkup({ cursor: 'sw-resize' })
    }),
    self.workspace.tools.elements.resizeTool({
      x: '100%', y: '100%', offset: { x: 6, y: 6 },
      direction: 'bottom-right', vdirection: 'bottom', hdirection: 'right',
      markup: self.workspace.tools.elements.resizeMarkup({ cursor: 'se-resize' })
    }),
    self.workspace.tools.elements.resizeTool({
      x: '50%', offset: { x: -4, y: -14 },
      direction: 'top', vdirection: 'top', hdirection: null,
      markup: self.workspace.tools.elements.resizeMarkup({ cursor: 'ns-resize' })
    }),
    self.workspace.tools.elements.resizeTool({
      x: '50%', y: '100%', offset: { x: -4, y: 6 },
      direction: 'bottom', vdirection: 'bottom', hdirection: null,
      markup: self.workspace.tools.elements.resizeMarkup({ cursor: 'ns-resize' })
    }),
    self.workspace.tools.elements.resizeTool({
      y: '50%', offset: { x: -14, y: -4 },
      direction: 'left', vdirection: null, hdirection: 'left',
      markup: self.workspace.tools.elements.resizeMarkup({ cursor: 'ew-resize' })
    }),
    self.workspace.tools.elements.resizeTool({
      x: '100%', y: '50%', offset: { x: 6, y: -4 },
      direction: 'right', vdirection: null, hdirection: 'right',
      markup: self.workspace.tools.elements.resizeMarkup({ cursor: 'ew-resize' })
    }),
  ];

  //create tools view for basic elements
  self.workspace.tools.elements.elementsToolsView['basic'] = new joint.dia.ToolsView({
    name: 'element-basic-tools',
    tools: self.workspace.tools.elements.basicTools
  });

  //call initialization of elements tools view for the specific conceptual model
  self.config.conceptualModel.initElementsToolsViews(self);
}

CrowdEditor.prototype.initLinksToolsViews = function () {
  var self = this;

  //initialize elements tools view object
  self.workspace.tools.links.linksToolsView = new Object();

  //create tools view for basic links
  self.workspace.tools.links.linksToolsView['basic'] = function () {
    return new joint.dia.ToolsView({
      name: 'link-basic-tools',
      tools: [
        new joint.linkTools.Vertices(),
        new joint.linkTools.Segments(),
        new joint.linkTools.TargetArrowhead(), //second position of the _toolsView.tools array of the linkView
        new joint.linkTools.SourceArrowhead(),
        new joint.linkTools.TargetAnchor(),
        new joint.linkTools.SourceAnchor(),
        new joint.linkTools.Boundary(),
        new joint.linkTools.Remove({ distance: 20 })
      ]
    });
  };

  //call initialization of links tools view for the specific conceptual model
  self.config.conceptualModel.initLinksToolsViews(self);

  //capture event when add a link and add to their view the correpondent link tools
  self.workspace.graph.on('add', function (link) {
    if (link.isLink()) {
      //get link view of the new link in the workspace paper
      var linkView = link.findView(self.workspace.paper);

      //create tools view for the new link (is a bag of tools)
      var linkToolsView = self.workspace.tools.links.linksToolsView[linkView.model.attributes.type];

      //add tools to the link view
      linkView.addTools(linkToolsView != null ? linkToolsView() : self.workspace.tools.links.linksToolsView.basic());

      //hide the tools to not appear at first time after add the link
      linkView.hideTools();
    }
  });
}

CrowdEditor.prototype.initChangeAttributesEvents = function () {
  var self = this;

  //call initialization of change attributes events for the specific conceptual model
  self.config.conceptualModel.initChangeAttributesEvents(self);
}

CrowdEditor.prototype.initInspector = function () {
  var self = this;

  //initialize inspector objects
  self.inspector = new Object();

  //toggle between the empty message dom element and the title/content dom elements
  self.inspector.toggleContent = function (toggle) {
    //show empty message
    $('#crowd-inspector-' + self.id + ' .crowd-inspector-empty').toggle(!toggle);

    //hide title
    $('#crowd-inspector-' + self.id + ' .crowd-inspector-title').toggle(toggle);

    //hide content
    $('#crowd-inspector-' + self.id + ' .crowd-inspector-content').toggle(toggle);
  };

  //clear the attributes created in the content dom element
  self.inspector.clearAttributes = function () {
    $('#crowd-inspector-' + self.id + ' .crowd-inspector-content').html('');
  }

  //generate the input dom code for an attribute
  self.inspector._makeAttributeDom = function (attribute) {
    var dom;
    switch (attribute.type) {
      case 'boolean':
        dom = $('<span class="row"> \
          <div class="col"> \
            <div class="form-check"> \
              <input class="form-check-input" type="checkbox" value="" id="crowd-inspector-content-' + formatSelector(attribute.container + '-' + attribute.property + '-' + attribute.index) + '-' + self.id + '"> \
              <label class="form-check-label" for="crowd-inspector-content-' + formatSelector(attribute.container + '-' + attribute.property + '-' + attribute.index) + '-' + self.id + '">' + attribute.label + '</label> \
            </div> \
          </div> \
        </span>');
        break;
      case 'multiple':
        dom = $('<span class="row"> \
          <div class="col"> \
            <div class="form-group"> \
              ' + (attribute.label ? '<label>' + attribute.label + '</label><br>' : '') + '\
            </div> \
          </div> \
        </span>');
        attribute.values.forEach(function (value) {
          $(dom).find('.form-group').append(
            '<div class="form-check form-check-inline"> \
              <input class="form-check-input" type="radio" name="crowd-inspector-content-' + formatSelector(attribute.container + '-' + attribute.property + '-' + attribute.index) + '-' + self.id + '" \
              id="crowd-inspector-content-' + formatSelector(attribute.container + '-' + attribute.property + '-' + attribute.index) + '-' + value.value + '-' + self.id + '" value="' + value.value + '"> \
              <label class="form-check-label" for="crowd-inspector-content-' + formatSelector(attribute.container + '-' + attribute.property + '-' + attribute.index) + '-' + value.value + '-' + self.id + '">' + value.label + '</label> \
            </div>'
          );
        });
        break;
      case 'text': default:
        dom = $('<span class="row"> \
          <div class="col"> \
            <div class="form-group"> \
              ' + (attribute.label ? '<label>' + attribute.label + '</label>' : '') + '\
              <' + (attribute.input == 'textarea' ? 'textarea' : 'input type="text"') + ' placeholder="' + (attribute.placeholder ? attribute.placeholder : attribute.label) + '" class="form-control" id="crowd-inspector-content-' + formatSelector(attribute.container + '-' + attribute.property + '-' + attribute.index) + '-' + self.id + '" /> \
            </div> \
          </div> \
        </span>');
        break;
      case 'list':
        dom = $('<span class="row"> \
          <div class="form-group"> \
            ' + (attribute.label ? '<label>' + attribute.label + '</label>' : '') + '\
            <div class="form-group" id="crowd-inspector-content-elements-' + formatSelector(attribute.container + '-' + attribute.property + '-' + attribute.index) + '-' + self.id + '"></div> \
            <div class="text-center"> \
              <button class="btn btn-primary" id="crowd-inspector-content-add-' + formatSelector(attribute.container + '-' + attribute.property + '-' + attribute.index) + '-' + self.id + '" \
              data-toggle="tooltip" data-original-title="Add element" data-placement="top"><i class="fa fa-fw fa-plus"></i></button> \
            </div> \
          </div> \
        </span>');
        break;
    }

    if (attribute.canRemove) {
      $(dom).append(
        '<div class="col-3"> \
          <button class="btn btn-danger"  id="crowd-inspector-content-remove-' + formatSelector(attribute.container + '-' + attribute.property + '-' + attribute.index) + '-' + self.id + '" \
          data-toggle="tooltip" data-original-title="Remove element" data-placement="top"><i class="fa fa-fw fa-minus"></i></button> \
        </div>'
      );
    }
    return dom;
  }

  //append an specified attribute to the content dom element
  self.inspector.addAttribute = function (attribute) {
    //check if attribute is inside a container else assign a empty string for selector usage
    attribute.container = attribute.container != null ? attribute.container : '';
    attribute.index = attribute.index != null ? attribute.index : '';

    //append dom element to the inspector content
    if (attribute.container != '')
      $('#crowd-inspector-content-elements-' + formatSelector(attribute.container) + '-' + self.id).append(self.inspector._makeAttributeDom(attribute));
    else
      $('#crowd-inspector-' + self.id + ' .crowd-inspector-content').append(self.inspector._makeAttributeDom(attribute));

    //get the property value and map it in case that a map is defined
    var propertyValue = attribute.map
      ? Object.keys(attribute.map).find(key =>
        attribute.map[key] == (attribute.index !== ''
          ? self.inspector.model.prop(attribute.property)[attribute.index]
          : self.inspector.model.prop(attribute.property)))
      : (attribute.index !== ''
        ? self.inspector.model.prop(attribute.property)[attribute.index]
        : self.inspector.model.prop(attribute.property));

    //set the dom input value with the property value according to the attribute type
    switch (attribute.type) {
      case 'boolean':
        $('#crowd-inspector-content-' + formatSelector(attribute.container + '-' + attribute.property + '-' + attribute.index) + '-' + self.id).prop("checked", propertyValue == 'true');
        break;
      case 'multiple':
        $('#crowd-inspector-content-' + formatSelector(attribute.container + '-' + attribute.property + '-' + attribute.index) + '-' + propertyValue + '-' + self.id).prop("checked", true);
        break;
      case 'text': default:
        $('#crowd-inspector-content-' + formatSelector(attribute.container + '-' + attribute.property + '-' + attribute.index) + '-' + self.id).val(propertyValue);
        break;
      case 'list':
        for (var i = 0; i < propertyValue.length; i++) {
          self.inspector.addAttribute($.extend({}, attribute.template, {
            container: (attribute.container + '-' + attribute.property + '-' + attribute.index),
            property: attribute.property,
            index: i,
            canRemove: true
          }));
        }
        $('#crowd-inspector-content-add-' + formatSelector(attribute.container + '-' + attribute.property + '-' + attribute.index) + '-' + self.id).on('click', function () {
          self.inspector.addAttribute($.extend({}, attribute.template, {
            container: (attribute.container + '-' + attribute.property + '-' + attribute.index),
            property: attribute.property,
            index: self.inspector.model.prop(attribute.property).length,
            canRemove: true
          }));
          self.inspector.model.prop(attribute.property + '/' + self.inspector.model.prop(attribute.property).length, '');
          $(".tooltip").tooltip('hide');
        });
        break;
    }

    if (attribute.canRemove) {
      $('#crowd-inspector-content-remove-' + formatSelector(attribute.container + '-' + attribute.property + '-' + attribute.index) + '-' + self.id).on('click', function () {
        var newValue = self.inspector.model.prop(attribute.property).slice();
        newValue.splice(attribute.index, 1);
        self.inspector.model.prop(attribute.property, newValue);
        console.log('remove', attribute.property, newValue);
        self.inspector.loadContent();
        $(".tooltip").tooltip('hide');
      });
    }

    //event when the input is modified that change the model property value by the user input
    $('#crowd-inspector-content-' + formatSelector(attribute.container + '-' + attribute.property + '-' + attribute.index) + '-' + self.id +
      ',[name="crowd-inspector-content-' + formatSelector(attribute.container + '-' + attribute.property + '-' + attribute.index) + '-' + self.id + '"]').on('keyup change', function () {
        var newPropertyValue;

        //get the dom input value according to the attribute type
        switch (attribute.type) {

          case 'boolean':
            newPropertyValue = $(this).prop('checked');
            break;
          case 'multiple':
            newPropertyValue = $('[name="crowd-inspector-content-' + formatSelector(attribute.container + '-' + attribute.property + '-' + attribute.index) + '-' + self.id + '"]:checked').val();
            break;
          case 'text': default:
            newPropertyValue = $(this).val();
            break;
        }

        //remap the property value in case that a map is defined
        newPropertyValue = attribute.map != null
          ? attribute.map[newPropertyValue]
          : newPropertyValue;

        //set the model property value to the new value
        self.inspector.model.prop(attribute.property + (attribute.index !== '' ? '/' + attribute.index : ''), newPropertyValue == "null" ? null : newPropertyValue);
      });

    $('[data-toggle="tooltip"]').tooltip({ html: true });
  }

  self.inspector.loadContent = function () {
    //toggle the content on
    self.inspector.toggleContent(true);

    //make the title with the name of the element or link
    $('#crowd-inspector-' + self.id + ' .crowd-inspector-title').html(formatString(self.inspector.model.attributes.type));

    //clear attributes of the lastest model
    self.inspector.clearAttributes();

    //call initialization of inspector for the specific conceptual model
    self.config.conceptualModel.initInspector(self);
  }

  //append dom element that shows an empty message on the inspector
  $('#crowd-inspector-' + self.id).append(
    '<div class="crowd-inspector-empty"> \
      <p>There is no object or connector selected</p> \
    </div>'
  );

  //append dom element that contains the title of the element or link inspected
  $('#crowd-inspector-' + self.id).append('<h4 class="crowd-inspector-title"></h4>');

  //append dom element that contains the content of the element or link inspected
  $('#crowd-inspector-' + self.id).append('<div class="crowd-inspector-content"></div>');

  //init with the inspector empty
  self.inspector.toggleContent(false);

  //event for show the information of a element or link when clicked on it
  self.workspace.paper.on('cell:pointerup', function (cellView) {
    console.log(cellView);

    //get cell view (that can be element view or link view) model
    self.inspector.model = cellView.model;

    self.inspector.loadContent();
  });

  //function for hide information presented
  self.inspector.hideInformation = function () {
    //toggle the content off
    self.inspector.toggleContent(false);
    //clear attributes of the actual model
    self.inspector.clearAttributes();
    //clear the model var
    self.inspector.model = null;
  }

  //events for hide the present information and show the empty message again when the element or link is no more selected
  self.workspace.paper.on('blank:pointerup blank:pointerdown', function () {
    self.inspector.hideInformation();
  });

  self.workspace.graph.on('remove', function () {
    self.inspector.hideInformation();
  });
}

CrowdEditor.prototype.initMap = function () {
  var self = this;

  //initialize workspace objects
  self.map = new Object();
  //the size of map paper is obtained from css
  self.map.paperSize = {
    width: parseFloat(getCSS('width', 'crowd-map-paper')),
    height: parseFloat(getCSS('height', 'crowd-map-paper')),
  };
  //the zoom is the proportion of map paper size with respect to workspace paper size
  self.map.zoom = self.map.paperSize.width / self.workspace.paperSize.width;
  //the initial grid size is equivalent to the map paper size
  self.map.gridSize = {
    width: self.map.paperSize.width,
    height: self.map.paperSize.height
  };

  //append dom element for map scrollable
  $('#crowd-map-' + self.id).append('<div class="crowd-map-scrollable" id="crowd-map-scrollable-' + self.id + '"></div>');

  //append dom element for map paper
  $('#crowd-map-scrollable-' + self.id).append('<div class="crowd-map-paper" id="crowd-map-paper-' + self.id + '"></div>');

  //append dom element for camera view over workspace paper
  $('#crowd-map-scrollable-' + self.id).append('<div class="crowd-map-camera" id="crowd-map-camera-' + self.id + '"></div>');

  //add joint paper to map
  self.map.paper = new joint.dia.Paper({
    el: $('#crowd-map-paper-' + self.id)[0],
    width: self.map.paperSize.width,
    height: self.map.paperSize.height,
    model: self.workspace.graph,
    gridSize: 1,
    background: {
      color: $('#crowd-map-' + self.id).css("background-color")
    },
    interactive: false
  });

  //scale the map paper elements to the zoom value
  //it needs to be proportional to the paper size of workspace scalated to map paper
  self.map.paper.scale(self.map.zoom);

  //function that fits the map paper size to the elements position and proportion of space container
  self.map.fitPaper = function () {
    //calculate the size of the map paper with the actual workspace paper size and the zoom in the map
    var scaledPaperSize = {
      width: self.workspace.paper.getArea().width * self.map.zoom,
      height: self.workspace.paper.getArea().height * self.map.zoom
    };

    //calculate the resize ratio with the actual and new paper size
    //(resize ratio is a percentage of the amount of growth or shrink of the paper)
    var resizeRatio = scaledPaperSize.width >= scaledPaperSize.height
      ? (self.map.paperSize.width * 100 / scaledPaperSize.width) / 100
      : (self.map.paperSize.height * 100 / scaledPaperSize.height) / 100;

    //adjust the zoom (scale) of the elements on map paper with the resize ratio
    self.map.zoom = self.map.zoom * resizeRatio;
    self.map.paper.scale(self.map.zoom);

    //calculate the new grid size with the resize ratio
    self.map.gridSize = {
      width: self.map.gridSize.width * resizeRatio,
      height: self.map.gridSize.height * resizeRatio
    };

    //fit paper to the elements on map paper using grid size
    //and adjusting the content area to preserve the (0,0) origin when it's on positive quadrant
    self.map.paper.fitToContent({
      allowNewOrigin: 'any',
      gridWidth: self.map.gridSize.width,
      gridHeight: self.map.gridSize.height,
      // useModelGeometry: true,
      contentArea: {
        x: self.map.paper.getContentArea().x > 0 ? 0 : self.map.paper.getContentArea().x,
        y: self.map.paper.getContentArea().y > 0 ? 0 : self.map.paper.getContentArea().y,
        width: self.map.paper.getContentArea().x > 0
          ? self.map.paper.getContentArea().x + self.map.paper.getContentArea().width - 10
          : self.map.paper.getContentArea().width,
        height: self.map.paper.getContentArea().y > 0
          ? self.map.paper.getContentArea().y + self.map.paper.getContentArea().height - 10
          : self.map.paper.getContentArea().height
      },
      padding: (self.workspace.paperPadding - 10) * self.map.zoom
    });

    $('#crowd-map-paper-' + self.id).css({
      left: ($('#crowd-map-scrollable-' + self.id).width() - $('#crowd-map-paper-' + self.id).width()) / 2,
      top: ($('#crowd-map-scrollable-' + self.id).height() - $('#crowd-map-paper-' + self.id).height()) / 2
    });

    self.map.fitCamera();
  }

  //fit the camera of the map relatively to the workspace view of the paper
  self.map.fitCamera = function () {
    if ($('#crowd-workspace-paper-' + self.id).position()) {
      $('#crowd-map-camera-' + self.id).css({
        left: (($('#crowd-workspace-' + self.id).scrollLeft() - $('#crowd-workspace-paper-' + self.id).position().left) * self.map.zoom * (1 / self.workspace.zoom))
          + $('#crowd-map-paper-' + self.id).position().left,
        top: (($('#crowd-workspace-' + self.id).scrollTop() - $('#crowd-workspace-paper-' + self.id).position().top) * self.map.zoom * (1 / self.workspace.zoom))
          + $('#crowd-map-paper-' + self.id).position().top,
        width: $('#crowd-map-paper-' + self.id).width() * $('#crowd-workspace-' + self.id).width() / $('#crowd-workspace-paper-' + self.id).width(),
        height: $('#crowd-map-paper-' + self.id).height() * $('#crowd-workspace-' + self.id).height() / $('#crowd-workspace-paper-' + self.id).height(),
      });
    }
  }

  //event when scroll over workspace
  $('#crowd-workspace-' + self.id).scroll(function () {
    self.map.fitCamera();
  });
}

CrowdEditor.prototype.toJSONSchema = function () {
  var self = this;

  //return the json schema generation for the specific conceptual model
  return self.config.conceptualModel.toJSONSchema ? self.config.conceptualModel.toJSONSchema(self) : {};
}

CrowdEditor.prototype.fromJSONSchema = function (schema) {
  var self = this;

  //clear the workspace elements
  self.workspace.graph.clear();

  //call the function to load a json schema for the specific conceptual model
  self.config.conceptualModel.fromJSONSchema(self, schema);
}

CrowdEditor.prototype.toBase64 = function (callback) {
  var self = this;

  SVG2PNG($('#crowd-workspace-paper-' + self.id + ' svg')[0], function (canvas) {
    var base64 = canvas.toDataURL("image/png");
    callback(base64);
  });
}

CrowdEditor.prototype.hasChanges = function () {
  var self = this;
  return self.workspace.graph.getElements().length > 0;
}
