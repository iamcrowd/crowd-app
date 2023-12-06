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

  //object for store general events of the editor
  self.events = {};
  self.events.onAfterFromSchema = [];

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
  if (!self.config.conceptualModel.initSyntaxValidator) {
    self.config.conceptualModel.initSyntaxValidator = function () { console.warn("CrowdEditor conceptual model syntax validator is not defined."); }
  }
  if (!self.config.conceptualModel.initReasoningValidator) {
    self.config.conceptualModel.initReasoningValidator = function () { console.warn("CrowdEditor conceptual model reasoning validator is not defined."); }
  }
  if (!self.config.conceptualModel.initRepairingTools) {
    self.config.conceptualModel.initRepairingTools = function () { console.warn("CrowdEditor conceptual model repairing tools are not defined."); }
  }
  if (!self.config.conceptualModel.fromJSONSchema) {
    self.config.conceptualModel.fromJSONSchema = function () { console.warn("CrowdEditor conceptual model fromJSONSchema is not defined."); }
  }
  if (self.config.reasoningApi && !self.config.conceptualModel.fromReasoning) {
    self.config.conceptualModel.fromReasoning = function () { console.warn("CrowdEditor conceptual model fromReasoning is not defined and the Reasoning API is active."); }
  }
  if (self.config.metamodelApi && !self.config.conceptualModel.fromRepairMark) {
    self.config.conceptualModel.fromRepairMark = function () { console.warn("CrowdEditor conceptual model fromRepairMark is not defined and the Metamodel API is active."); }
  }
  if (self.config.metamodelApi && !self.config.conceptualModel.fromRepairApply) {
    self.config.conceptualModel.fromRepairApply = function () { console.warn("CrowdEditor conceptual model fromRepairApply is not defined and the Metamodel API is active."); }
  }

  $("#" + this.config.selector).html('');

  //append dom element that contains all the editor parts
  $('#' + self.config.selector).append('<div class="crowd-container" id="crowd-container-' + self.id + '"></div>');

  //append dom element for palette
  $('#crowd-container-' + self.id).append('<div class="crowd-palette" id="crowd-palette-' + self.id + '"></div>');

  //append dom element that contains the tools and the workspace
  $('#crowd-container-' + self.id).append('<div class="crowd-container-middle" id="crowd-container-middle-' + self.id + '"></div>');

  //append dom element that contain the toggle for the side panel
  $('#crowd-container-' + self.id).append(
    '<div class="crowd-container-side-toggle" id="crowd-container-side-toggle-' + self.id + '" \
    data-toggle="tooltip" data-placement="left" title="Toggle Side Panel"></div>'
  );

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

  //append dom element for side toggle icon
  $('#crowd-container-side-toggle-' + self.id).append('<i id="crowd-container-side-toggle-icon-' + self.id + '" class="fa fa-chevron-right"></i>');

  var toggleSide = false;
  $('#crowd-container-side-toggle-' + self.id).on('click', function () {
    if (!toggleSide) {
      $('#crowd-container-side-' + self.id).css('width', '0px');
      $('#crowd-container-side-toggle-' + self.id).css('right', '0px');
      $('#crowd-container-middle-' + self.id).css('right', '15px');
    } else {
      $('#crowd-container-side-' + self.id).css('width', '300px');
      $('#crowd-container-side-toggle-' + self.id).css('right', '300px');
      $('#crowd-container-middle-' + self.id).css('right', '315px');
    }
    $('#crowd-container-side-toggle-icon-' + self.id).toggleClass('fa-chevron-right');
    $('#crowd-container-side-toggle-icon-' + self.id).toggleClass('fa-chevron-left');
    toggleSide = !toggleSide;
  });

  self.initPalette();
  self.initWorkspace();
  self.initInspector();
  self.initTools();
  self.initMap();
  self.initSyntaxValidator();
  self.initReasoningValidator();
  self.initRepairingTools();

  //fit and center the paper for first time
  self.workspace.fitPaper();
  self.workspace.centerScroll();

  //preload a schema if it's sended as parameter
  if (self.config.preloadedSchema) {
    var schema = self.config.preloadedSchema;
    self.fromJSONSchema(schema);
    if (schema.hasPositions != null && !schema.hasPositions) {
      self.tools.layout.doLayout();
    }
  }

  //update the actual file label if a file is loaded
  self.tools.file.updateActualFile();

  //initialize enumerate for elements and links in case it's setted in config
  if (self.config.enumerate) {
    self.enumerate = { elements: {}, links: {} };
    self.enumerate.getNumber = function (cell, attr) {
      if (!attr) attr = 'uri';
      var maxNumber = 0;
      self.workspace.graph.getCells().forEach(function (existentCell) {
        if (existentCell.prop(attr)?.indexOf(cell.prop(attr) + '-') != -1) {
          var number = parseInt(existentCell.prop(attr)?.split(cell.prop(attr) + '-')[1]);
          if (!isNaN(number)) {
            maxNumber = number > maxNumber ? number : maxNumber;
          }
        }
      });
      return maxNumber + 1;
    }
    self.enumerate.setEnumerations = function (cell) {
      if (cell.prop('enumerate')) {
        cell.prop('enumerate').forEach(function (attrEnum) {
          if (cell.prop(attrEnum))
            cell.prop(attrEnum, cell.prop(attrEnum) + '-' + self.enumerate.getNumber(cell, attrEnum));
        });
      }
    }
  }
}

CrowdEditor.prototype.initPalette = function () {
  var self = this;

  //set palette width with config values
  $('#crowd-palette-' + self.id).css('width', self.config.palette.grid.width * self.config.palette.grid.columns + 1);
  $('#crowd-container-middle-' + self.id).css('left', self.config.palette.grid.width * self.config.palette.grid.columns);

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

  //NOT USED: it has problems when connect two links
  //add styled jump over the lines when they collides
  // for (var link in self.palette.links) {
  //   self.palette.links[link].connector('jumpover', {
  //     size: 10
  //   });
  // }

  //add joint graph to palette
  self.palette.graph = new joint.dia.Graph();

  //add joint paper to palette
  self.palette.paper = new joint.dia.Paper({
    el: $('#crowd-palette-' + self.id)[0],
    width: $('#crowd-palette-' + self.id).width(),
    height: (Object.keys(self.palette.elements).length / self.config.palette.grid.columns + 5) * self.config.palette.grid.height,//$('#crowd-palette-' + self.id).height(),
    model: self.palette.graph,
    interactive: false,
    // background: {
    //   color: $('#crowd-palette-' + self.id).css("background-color")
    // },
    gridSize: self.config.palette.grid.height > self.config.palette.grid.width ? self.config.palette.grid.height : self.config.palette.grid.width,
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
    $('#crowd-palette-' + self.id + " svg")[0].setAttribute('height', (Object.keys(self.palette.elements).length / self.config.palette.grid.columns + 1) * self.config.palette.grid.height);

  //add palette elements to palette graph and place (change position) them on the grid
  var position = 0;
  for (var element in self.palette.elements) {
    self.palette.elements[element].attributes.position = {
      x: ((position % self.config.palette.grid.columns) * self.config.palette.grid.width) +
        (self.config.palette.grid.width - self.palette.elements[element].attributes.size.width) / 2,
      y: (Math.floor(position / self.config.palette.grid.columns) * self.config.palette.grid.height) +
        (self.config.palette.grid.height - self.palette.elements[element].attributes.size.height) / 2
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
      // var x = e.pageX;
      // var y = e.pageY;
      // var target = self.workspace.paper.$el.offset();
      // var origin = self.palette.paper.$el.offset();

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

        //enumerate the uri of the new element to differentiate it from others
        if (self.config.enumerate) {
          if (s.prop('uri'))
            s.prop('uri', s.prop('uri') + '-' + self.enumerate.getNumber(s));
        }

        //set specific enumerations defined in element
        self.enumerate.setEnumerations(s);

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

  self.tools.file = {};
  self.tools.new = {};
  self.tools.save = {};
  self.tools.load = {};
  self.tools.rename = {};
  self.tools.delete = {};
  self.tools.export = {};
  self.tools.import = {};

  self.tools.edit = {};
  self.tools.layout = {};
  self.tools.model = {};
  self.tools.translate = {};
  self.tools.clearWorkspace = {};

  self.tools.view = {};
  self.tools.viewScrollbar = {};
  self.tools.collapseClasses = {};
  self.tools.toggleRolesAssoc = {};
  self.tools.filterImplicitTerms = {};

  self.tools.tools = {};
  self.tools.namespaces = {};
  self.tools.reasoning = {};
  self.tools.undoReasoning = {};
  self.tools.clearReasoning = {};
  self.tools.repair = {};

  self.tools.help = {};
  self.tools.tutorials = {};
  self.tools.about = {};

  self.tools.zoom = {};
  self.tools.gridSize = {};
  self.tools.fullscreen = {};

  //append dom row for the tools elements
  $('#crowd-tools-' + self.id).append('<span class="row" id="crowd-tools-row-' + self.id + '"></span>');

  //append dom for menu options
  $('#crowd-tools-row-' + self.id).append(
    '<div class="form-group"><div class="btn-group" id="crowd-tools-menu-' + self.id + '" role="group"></div></div>'
  );

  //file tools
  self.tools.file.init = function () {
    //update the actual file label if a file is loaded
    self.tools.file.updateActualFile = function (config) {
      if (self.config.actualFile && self.config.actualFile.name) {
        $('#crowd-tools-actual-file-' + self.id).html(self.config.actualFile.name);
        $('#crowd-tools-rename-input-' + self.id).prop("disabled", false);
        $('#crowd-tools-delete-input-' + self.id).prop("disabled", false);
      } else {
        $('#crowd-tools-actual-file-' + self.id).html('-');
        $('#crowd-tools-rename-input-' + self.id).prop("disabled", true);
        $('#crowd-tools-delete-input-' + self.id).prop("disabled", true);
      }

      if (config?.parent || config?.parent == null) $(config?.parent ? '#' + config?.parent : '.modal').modal('hide');
    }

    self.tools.file.getFile = function (callback) {
      if (self.config.actualFile) {
        self.config.actualFile.content = self.toJSONSchema();
        self.config.actualFile.model = self.config.conceptualModel.name;
        self.toBase64({ miniature: true }, function (preview) {
          self.config.actualFile.preview = preview;
          self.tools.export.exportTo({
            model: 'kf',
            //try to export to meta
            success: function (metaSchema) {
              self.config.actualFile.meta = metaSchema;
            },
            //finally do the callback with or without the meta
            finally: function (data) {
              //   alert('Metamodel cannot be generated due an translate error, this means that your diagram can\'t be translated to another conceptual model.');
              callback(self.config.actualFile, data.statusText == 'error' ? data : null);
            },
            hideError: true
          });
        });
      } else {
        var newFile = {};
        newFile.content = self.toJSONSchema();
        newFile.model = self.config.conceptualModel.name;
        self.toBase64({ miniature: true }, function (preview) {
          newFile.preview = preview;
          self.tools.export.exportTo({
            model: 'kf',
            //try to export to meta
            success: function (metaSchema) {
              newFile.meta = metaSchema;
            },
            //finally do the callback with or without the meta
            finally: function (data) {
              //   alert('Metamodel cannot be generated due an translate error, this means that your diagram can\'t be translated to another conceptual model.');
              callback(newFile, data.statusText == 'error' ? data : null);
            },
            hideError: true
          });
        });
      }
    }

    var loggedInMessage = 'You must be logged in to use this functionality';

    //append files dropdown for all files related tools
    $('#crowd-tools-menu-' + self.id).append(
      '<div class="btn-group dropdown" id="crowd-tools-file-btn-' + self.id + '"> \
        <button class="btn btn-adaptive dropdown-toggle" type="button" id="crowd-tools-file-dropdown-' + self.id + '" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> \
          <i class="fa fa-fw fa-file"></i> File \
        </button> \
        <ul class="dropdown-menu" aria-labelledby="crowd-tools-file-dropdown-' + self.id + '"></ul> \
      </div>'
    );

    $('#crowd-workspace-' + self.id).append(
      '<div class="crowd-tools-actual-file-container"> \
        <label class="crowd-tools-actual-file-label" \
        data-toggle="tooltip" data-original-title="Diagram loaded from Cloud" data-placement="right"> \
          <i class="fa fa-file-code-o"></i>: \
          <span id="crowd-tools-actual-file-' + self.id + '"></span> \
        </label> \
      </div>'
    );

    //new file tool
    self.tools.new.init = function () {
      //append dom for new file tool
      // $('#crowd-tools-row-' + self.id).append(
      //   '<label data-toggle="tooltip" data-original-title="Diagram loaded from Cloud" data-placement="bottom"><i class="fa fa-file-code-o"></i>: \
      //     <span id="crowd-tools-actual-file-' + self.id + '"></span> \
      //   </label> \
      //   <div class="form-group"> \
      //     <button class="btn btn-danger iconify" id="crowd-tools-file-new-input-' + self.id + '" type="button" \
      //     data-toggle="tooltip" data-original-title="Create New Diagram" data-placement="bottom" \
      //     ' + (!self.config?.ngFiles?.user ? 'disabled' : '') + '> \
      //     <i class="fa fa-file"></i> New</button> \
      //   </div>'
      // );
      $('[aria-labelledby="crowd-tools-file-dropdown-' + self.id + '"]').append(
        '<li> \
        <span class="d-block" data-toggle="tooltip" data-placement="right" \
        title="' + (!self.config?.ngFiles?.user ? loggedInMessage : 'Create New Diagram') + '" > \
          <button class="dropdown-item" id="crowd-tools-file-new-input-' + self.id + '" \
          ' + (!self.config?.ngFiles?.user ? 'style="pointer-events: none;" disabled' : '') + '> \
          <i class="fa fa-fw fa-file"></i> New...</button> \
        </span> \
        </li>'
      );

      //append dom for the advertisement modal when try to make new file
      $('body').append(
        '<div id="crowd-tools-file-new-advertisement-' + self.id + '" class="modal fade"> \
          <div class="modal-dialog"> \
            <div class="modal-content"> \
              <div class="modal-header"> \
                <h5 class="modal-title"><i class="fa fa-fw fa-file"></i> Create New Diagram</h5> \
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"> \
                  <span aria-hidden="true">&times;</span> \
                </button> \
              </div> \
              <div class="modal-body"> \
                <p>Are you sure want to create a new diagram?</p> \
                <p><b>Changes may not be saved</b></p> \
              </div> \
              <div class="modal-footer"> \
                <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button> \
                <button id="crowd-tools-file-new-advertisement-proceed-' + self.id + '" \
                type="button" class="btn btn-danger" data-dismiss="modal">Proceed</button> \
              </div> \
            </div> \
          </div> \
        </div>'
      );

      //event handler when click new file that open advertisement modal
      $('#crowd-tools-file-new-input-' + self.id).on('click', function () {
        if (self.config.actualFile || self.hasChanges()) {
          $('#crowd-tools-file-new-advertisement-' + self.id).modal('show');
        }
        $(".tooltip").tooltip('hide');
        $(this).blur();
      });

      //event handler when click proceed button in advertisement for new file
      $('#crowd-tools-file-new-advertisement-proceed-' + self.id).on('click', function () {
        //clear the workspace elements
        // self.workspace.graph.clear();
        self.workspace.clearGraph()
        //center workspace scroll
        setTimeout(() => self.workspace.centerScroll());
        //clear the actual file
        self.config.actualFile = null;
        self.tools.file.updateActualFile();

        $(".tooltip").tooltip('hide');
      });
    }
    self.tools.new.init();

    //load from cloud tool
    self.tools.load.init = function () {
      //append dom for load tool
      // $('#crowd-tools-row-' + self.id).append(
      //   '<div class="form-group"> \
      //     <button class="btn btn-primary iconify" id="crowd-tools-load-input-' + self.id + '" type="button" \
      //     data-toggle="tooltip" data-original-title="Load Diagram from Cloud" data-placement="bottom" \
      //     ' + (!self.config?.ngFiles?.user ? 'disabled' : '') + '> \
      //     <i class="fa fa-cloud-download"></i> Load</button> \
      //   </div>'
      // );
      $('[aria-labelledby="crowd-tools-file-dropdown-' + self.id + '"]').append(
        '<li class="dropdown-divider"></li> \
        <li> \
        <span class="d-block" data-toggle="tooltip" data-placement="right" \
        title="' + (!self.config?.ngFiles?.user ? loggedInMessage : 'Load Diagram from Cloud') + '" > \
          <button class="dropdown-item" id="crowd-tools-load-input-' + self.id + '" \
          ' + (!self.config?.ngFiles?.user ? 'style="pointer-events: none;" disabled' : '') + '> \
          <i class="fa fa-fw fa-cloud-download"></i> Load</button> \
        </span> \
        </li>'
      );

      //event handler when click load
      $('#crowd-tools-load-input-' + self.id).on('click', function () {
        if (self.config?.ngFiles?.load?.modal) {
          $('#' + self.config.ngFiles.load.modal).modal('show'); //not used
        }
        if (self.config?.ngFiles?.load?.get) {
          self.config.ngComponent[self.config.ngFiles.load.get]();
        }

        $(".tooltip").tooltip('hide');
        $(this).blur();
      });
    }
    self.tools.load.init();

    //save to cloud tool
    self.tools.save.init = function () {
      //function to open save as modal
      self.tools.save.saveAs = function () {
        if (self.config.ngFiles) {
          if (self.config.ngFiles.save) {
            if (self.config.ngFiles.save.modal) {
              self.toBase64({ miniature: true }, function (preview) {
                self.config.ngComponent.preview = preview;
              });
              $('#' + self.config.ngFiles.save.modal).modal('show');
            }
          }
        }
      };

      //append dom for save tool
      // $('#crowd-tools-row-' + self.id).append(
      //   '<div class="form-group"> \
      //     <div class="btn-group"> \
      //       <button type="button" class="btn btn-primary" id="crowd-tools-save-input-save-' + self.id + '" \
      //       data-toggle="tooltip" data-original-title="Save Diagram on Cloud" data-placement="bottom" \
      //       ' + (!self.config?.ngFiles?.user ? 'disabled' : '') + '> \
      //         <i class="fa fa-cloud-upload"></i> Save \
      //       </button> \
      //       <button type="button" class="btn btn-primary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-reference="parent" \
      //       ' + (!self.config?.ngFiles?.user ? 'disabled' : '') + '> \
      //         <span class="sr-only">Toggle Dropdown</span> \
      //       </button> \
      //       <div class="dropdown-menu"> \
      //         <button class="dropdown-item" id="crowd-tools-save-input-saveas-' + self.id + '">Save as</button> \
      //       </div> \
      //     </div> \
      //   </div>'
      // );
      $('[aria-labelledby="crowd-tools-file-dropdown-' + self.id + '"]').append(
        '<li> \
        <span class="d-block" data-toggle="tooltip" data-placement="right" \
        title="' + (!self.config?.ngFiles?.user ? loggedInMessage : 'Save Diagram on Cloud') + '" > \
          <button class="dropdown-item" id="crowd-tools-save-input-save-' + self.id + '" \
          ' + (!self.config?.ngFiles?.user ? 'style="pointer-events: none;" disabled' : '') + '> \
          <i class="fa fa-fw fa-cloud-upload"></i> Save</button></li> \
        </span> \
        </li> \
        <li> \
        <span class="d-block" data-toggle="tooltip" data-placement="right" \
        title="' + (!self.config?.ngFiles?.user ? loggedInMessage : 'Save Diagram on Cloud as ...') + '" > \
          <button class="dropdown-item" id="crowd-tools-save-input-saveas-' + self.id + '" \
          ' + (!self.config?.ngFiles?.user ? 'style="pointer-events: none;" disabled' : '') + '> \
          <i class="fa fa-fw"></i> Save as...</button></li> \
        </span> \
        </li>'
      );

      //event handler when click save
      $('#crowd-tools-save-input-save-' + self.id).on('click', function () {
        if (self.config.actualFile)
          self.config.ngComponent[self.config.ngFiles.save.put]();
        else
          self.tools.save.saveAs();

        $(".tooltip").tooltip('hide');
        $(this).blur();
      });

      //event handler when click save as
      $('#crowd-tools-save-input-saveas-' + self.id).on('click', function () {
        self.tools.save.saveAs();

        $(".tooltip").tooltip('hide');
        $(this).blur();
      });
    }
    self.tools.save.init();

    //rename file tool
    self.tools.rename.init = function () {
      //append dom for rename tool
      $('[aria-labelledby="crowd-tools-file-dropdown-' + self.id + '"]').append(
        '<li class="dropdown-divider"></li> \
        <li> \
          <span class="d-block" data-toggle="tooltip" data-placement="right" \
          title="' + (!self.config?.ngFiles?.user ? loggedInMessage : 'Rename Diagram') + '" > \
            <button class="dropdown-item" id="crowd-tools-rename-input-' + self.id + '" \
            ' + (!self.config?.ngFiles?.user ? 'style="pointer-events: none;" disabled' : '') + '> \
            <i class="fa fa-fw fa-pencil-square-o"></i> Rename</button> \
          </span> \
        </li>'
      );

      //event handler when click rename
      $('#crowd-tools-rename-input-' + self.id).on('click', function () {
        if (self.config?.ngFiles?.rename?.modal) {
          $('#' + self.config.ngFiles.rename.modal).modal('show'); //not used
        }
        if (self.config?.ngFiles?.rename?.set) {
          self.config.ngComponent[self.config.ngFiles.rename.set]('rename');
        }

        $(".tooltip").tooltip('hide');
        $(this).blur();
      });
    }
    self.tools.rename.init();

    //delete file tool
    self.tools.delete.init = function () {
      //append dom for delete tool
      $('[aria-labelledby="crowd-tools-file-dropdown-' + self.id + '"]').append(
        '<li> \
          <span class="d-block" data-toggle="tooltip" data-placement="right" \
          title="' + (!self.config?.ngFiles?.user ? loggedInMessage : 'Delete Diagram') + '" > \
            <button class="dropdown-item" style="color: #dc3545;" id="crowd-tools-delete-input-' + self.id + '" \
            ' + (!self.config?.ngFiles?.user ? 'style="pointer-events: none;" disabled' : '') + '> \
            <i class="fa fa-fw fa-trash"></i> Delete</button> \
          </span> \
        </li>'
      );

      //event handler when click delete
      $('#crowd-tools-delete-input-' + self.id).on('click', function () {
        if (self.config?.ngFiles?.delete?.modal) {
          $('#' + self.config.ngFiles.delete.modal).modal('show'); //not used
        }
        if (self.config?.ngFiles?.delete?.set) {
          self.config.ngComponent[self.config.ngFiles.delete.set]('delete');
        }

        $(".tooltip").tooltip('hide');
        $(this).blur();
      });
    }
    self.tools.delete.init();

    //export tool
    self.tools.export.init = function () {
      //define function to convert the actual model json schema to another model using the metamodelApi
      //in case the parameter model was equal to the actual model it exports json without using metamodelApi
      self.tools.export.exportTo = function (options) {
        if (self.config.conceptualModel.name == self.config.availableConceptualModels[options?.model].name) {
          if (options?.success) options.success(self.config.conceptualModel.toJSONSchema(self));
          if (options?.finally) options.finally(self.config.conceptualModel.toJSONSchema(self));
        }
        else {
          self.config.metamodelApi.request({
            from: self.config.conceptualModel.name,
            to: 'kf',
            data: self.config.conceptualModel.toJSONSchema(self),
            success: function (response) {
              if (self.config.availableConceptualModels[options?.model].name != 'kf') {
                self.config.metamodelApi.request({
                  from: 'kf',
                  to: self.config.availableConceptualModels[options?.model].name,
                  data: response,
                  format: options?.format,
                  syntax: options?.syntax,
                  verbalization: options?.verbalization,
                  language: options?.language,
                  success: function (response) {
                    if (options?.success) options.success(response);
                    if (options?.finally) options.finally(response);
                  },
                  error: function (error) {
                    if (options?.finally) options.finally(error);
                  },
                  hideError: options?.hideError
                });
              } else {
                if (options?.success) options.success(response);
                if (options?.finally) options.finally(response);
              }
            },
            error: function (error) {
              if (options?.finally) options.finally(error);
            },
            hideError: options?.hideError
          });
        }
      }

      self.tools.export._owlExport = function (download) {
        var encoding = $('#crowd-tools-export-options-encoding-' + self.id + ' option:selected').val();
        var syntax = $('#crowd-tools-export-options-syntax-' + self.id + ' option:selected').val();
        if (encoding == "owllink-alcqi") $('#crowd-tools-export-options-syntax-menu-' + self.id).hide();
        else $('#crowd-tools-export-options-syntax-menu-' + self.id).show();

        $('#crowd-tools-export-options-encoding-' + self.id).prop("disabled", true);
        $('#crowd-tools-export-options-syntax-' + self.id).prop("disabled", true);
        $('#crowd-tools-export-loading-' + self.id).show();
        self.tools.export.exportTo({
          model: 'owl',
          format: encoding,
          syntax: syntax,
          success: function (schema) {
            $('#crowd-tools-export-check-schema-modal-' + self.id + ' .modal-body pre').html(escapeXML(formatXML(schema)));

            if (download)
              self.tools.export._download({
                name: "owl-schema",
                format: "owl",
                type: "application/xml",
                encoding: "charset=utf-8",
                data: formatXML(schema)
              });
          },
          finally: function () {
            $('[aria-labelledby="crowd-tools-export-dropdown-' + self.id + '"]').dropdown('hide');
            $('#crowd-tools-export-options-encoding-' + self.id).prop("disabled", false);
            $('#crowd-tools-export-options-syntax-' + self.id).prop("disabled", false);
            $('#crowd-tools-export-loading-' + self.id).hide();
          }
        });
      }

      self.tools.export._verbalizationExport = function (download) {
        var verbalization = $('#crowd-tools-export-options-verbalization-' + self.id + ' option:selected').val();
        var language = $('#crowd-tools-export-options-language-' + self.id + ' option:selected').val();

        $('#crowd-tools-export-options-verbalization-' + self.id).prop("disabled", true);
        $('#crowd-tools-export-options-language-' + self.id).prop("disabled", true);
        $('#crowd-tools-export-loading-' + self.id).show();
        self.tools.export.exportTo({
          model: 'verbalization',
          verbalization: verbalization,
          language: language,
          success: function (schema) {
            $('#crowd-tools-export-check-schema-modal-' + self.id + ' .modal-body pre').html(schema.CNLen.join("\n"));

            if (download)
              self.tools.export._download({
                name: "verbalization-schema",
                format: "txt",
                type: "application/txt",
                encoding: "charset=utf-8",
                data: schema.CNLen.join("\n")
              });
          },
          finally: function () {
            $('[aria-labelledby="crowd-tools-export-dropdown-' + self.id + '"]').dropdown('hide');
            $('#crowd-tools-export-options-verbalization-' + self.id).prop("disabled", false);
            $('#crowd-tools-export-options-language-' + self.id).prop("disabled", false);
            $('#crowd-tools-export-loading-' + self.id).hide();
          }
        });
      }

      self.tools.export._imageExport = function (download) {
        var format = $('#crowd-tools-export-options-format-' + self.id + ' option:selected').val();
        var useZoom = $('#crowd-tools-export-options-use-zoom-' + self.id).is(":checked");
        var useGrid = format == "pdf" ? false : $('#crowd-tools-export-options-use-grid-' + self.id).is(":checked");
        var onlyContent = $('#crowd-tools-export-options-only-content-' + self.id).is(":checked");
        if (format == "pdf") $('#crowd-tools-export-options-use-grid-menu-' + self.id).hide();
        else $('#crowd-tools-export-options-use-grid-menu-' + self.id).show();

        $('#crowd-tools-export-options-use-zoom-' + self.id).prop("disabled", true);
        $('#crowd-tools-export-options-use-grid-' + self.id).prop("disabled", true);
        $('#crowd-tools-export-options-only-content-' + self.id).prop("disabled", true);
        $('#crowd-tools-export-options-format-' + self.id).prop("disabled", true);
        $('#crowd-tools-export-loading-' + self.id).show();
        self.toBase64({ format: format, useZoom: useZoom, useGrid: useGrid, onlyContent: onlyContent }, function (image) {
          $('#crowd-tools-export-check-schema-modal-' + self.id + ' .modal-body img').attr('src', image);

          $('[aria-labelledby="crowd-tools-export-dropdown-' + self.id + '"]').dropdown('hide');
          $('#crowd-tools-export-options-use-zoom-' + self.id).prop("disabled", false);
          $('#crowd-tools-export-options-use-grid-' + self.id).prop("disabled", false);
          $('#crowd-tools-export-options-only-content-' + self.id).prop("disabled", false);
          $('#crowd-tools-export-options-format-' + self.id).prop("disabled", false);
          $('#crowd-tools-export-loading-' + self.id).hide();

          if (download) {
            // var hrefImage = format == 'application/pdf' ? image.replace('image/png', 'application/pdf') : image;
            self.tools.export._download({ name: "image", format: format, href: image, onlyContent: onlyContent });
          }
        });
      }

      self.tools.export._download = function (options) {
        if (options.format == "pdf") {
          var svg = $("#crowd-workspace-paper-" + self.id + " svg");
          var content = self.workspace.paper.getContentBBox();
          var pdfSettings = {
            name: "image",
            pageWidth: options.onlyContent ? content.width + self.workspace.paperPadding * 2 : svg.width(),
            pageHeight: options.onlyContent ? content.height + self.workspace.paperPadding * 2 : svg.height(),
            x: options.onlyContent ? -(content.x - self.workspace.paperPadding) : 0,
            y: options.onlyContent ? -(content.y - self.workspace.paperPadding) : 0,
            width: svg.width(),
            height: svg.height()
          };
          SVGtoPDFDownload(svg[0], pdfSettings);
        } else {
          $("<a />", {
            "download": options.name + (options.format ? "." + options.format : ""),
            "href": (options.href ? options.href : "data:" + options.type + ";" + options.encoding + "," + encodeURIComponent(options.data))
          }).appendTo("body").click(function () {
            $(this).remove()
          })[0].click();
        }
      }

      //append dom for export tool
      // $('#crowd-tools-row-' + self.id).append(
      //   '<div class="form-group"> \
      //     <div class="dropdown"> \
      //       <button class="btn btn-primary dropdown-toggle" type="button" id="crowd-tools-export-dropdown-' + self.id + '" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> \
      //         <i class="fa fa-download"></i> Export \
      //       </button> \
      //       <div class="dropdown-menu" aria-labelledby="crowd-tools-export-dropdown-' + self.id + '"></div> \
      //     </div> \
      //   </div>'
      // );
      $('[aria-labelledby="crowd-tools-file-dropdown-' + self.id + '"]').append(
        '<li class="dropdown-divider"></li> \
        <li class="dropdown"> \
          <button class="dropdown-item dropdown-toggle" type="button" id="crowd-tools-export-dropdown-' + self.id + '" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> \
            <i class="fa fa-fw fa-download"></i> Export \
          </button> \
          <ul class="dropdown-menu" aria-labelledby="crowd-tools-export-dropdown-' + self.id + '"></ul> \
        </li>'
      );

      //draw a button for each conceptual model and put the name on data attribute
      $.each(self.config.availableConceptualModels, function (conceptualModelName, conceptualModel) {
        if (conceptualModel.export == null || conceptualModel.export) {
          var title = conceptualModel.title ? conceptualModel.title : conceptualModelName.toUpperCase();
          $('[aria-labelledby="crowd-tools-export-dropdown-' + self.id + '"]').append(
            '<li><button class="dropdown-item" data-model="' + conceptualModelName + '" name="crowd-tools-export-check-schema-' + self.id + '">' +
            '<i class="fa fa-fw fa-long-arrow-right"></i> ' + title + '</button></li>'
          );
        }
      });

      //append dom for the schemas modal when check export schemas
      $('body').append(
        '<div id="crowd-tools-export-check-schema-modal-' + self.id + '" class="modal fade"> \
          <div class="modal-dialog modal-dialog-scrollable modal-lg"> \
            <div class="modal-content"> \
              <div class="modal-header"> \
                <h5 class="modal-title"></h5> &nbsp;\
                <div class="spinner-border text-primary" role="status" id="crowd-tools-export-loading-' + self.id + '" style="display: none"> \
                  <span class="sr-only">Loading...</span> \
                </div>\
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"> \
                  <span aria-hidden="true">&times;</span> \
                </button> \
              </div> \
              <div class="modal-body"> \
              <div id="crowd-tools-export-owl-options-' + self.id + '" style="display: none"> \
                <div class="row"> \
                  <div class="form-group col-6"> \
                    <label class="" for="">Encoding</label> \
                    <select class=" form-control custom-select my-1 mr-sm-2" id="crowd-tools-export-options-encoding-' + self.id + '"> \
                      <option value="owl2-alcqi">OWL2 - ALCQI</option> \
                      <option value="owllink-alcqi">OLWLink - ALCQI</option> \
                    </select> \
                  </div>\
                  <div class="form-group col-6" id="crowd-tools-export-options-syntax-menu-' + self.id + '"> \
                    <label class="" for="">Syntax</label> \
                    <select class=" form-control custom-select my-1 mr-sm-2" id="crowd-tools-export-options-syntax-' + self.id + '"> \
                      <option value="rdfxml">RDF/XML</option> \
                      <option value="owlxml">OWL/XML</option> \
                      <option value="turtle">Turtle</option> \
                      <option value="ntriples">N-Triples</option> \
                      <option value="manchester">Manchester</option> \
                      <option value="functional">Functional</option> \
                    </select> \
                  </div>\
                </div> \
              </div> \
              <div id="crowd-tools-export-verbalization-options-' + self.id + '" style="display: none"> \
                <div class="row"> \
                  <div class="form-group col-6"> \
                    <label class="" for="">Verbalization</label> \
                    <select class=" form-control custom-select my-1 mr-sm-2" id="crowd-tools-export-options-verbalization-' + self.id + '"> \
                      <option value="cnl">CNL</option> \
                      <option value="nlg" disabled>NLG</option> \
                    </select> \
                  </div>\
                  <div class="form-group col-6" id="crowd-tools-export-options-language-menu-' + self.id + '"> \
                    <label class="" for="">Language</label> \
                    <select class=" form-control custom-select my-1 mr-sm-2" id="crowd-tools-export-options-language-' + self.id + '"> \
                      <option value="en">English</option> \
                      <option value="sp" disabled>Spanish</option> \
                    </select> \
                  </div>\
                </div> \
              </div> \
              <div id="crowd-tools-export-image-options-' + self.id + '" style="display: none"> \
                <div class="row"> \
                  <div class="form-group col-6"> \
                    <label class="" for="">Format</label> \
                    <select class=" form-control custom-select my-1 mr-sm-2" id="crowd-tools-export-options-format-' + self.id + '"> \
                      <option value="jpeg">JPG</option> \
                      <option value="png">PNG</option> \
                      <option value="pdf">PDF</option> \
                    </select> \
                  </div>\
                  <div class="form-group col-3"> \
                    <div class="form-group form-check"> \
                      <input type="checkbox" class="form-check-input" id="crowd-tools-export-options-use-zoom-' + self.id + '"> \
                      <label class="form-check-label" for="crowd-tools-export-options-use-zoom-' + self.id + '">Use Zoom</label> \
                    </div>\
                    <div class="form-group form-check" id="crowd-tools-export-options-use-grid-menu-' + self.id + '"> \
                      <input type="checkbox" class="form-check-input" id="crowd-tools-export-options-use-grid-' + self.id + '"> \
                      <label class="form-check-label" for="crowd-tools-export-options-use-grid-' + self.id + '">Use Grid</label> \
                    </div>\
                  </div> \
                  <div class="form-group col-3"> \
                    <div class="form-group form-check"> \
                      <input type="checkbox" class="form-check-input" id="crowd-tools-export-options-only-content-' + self.id + '" checked> \
                      <label class="form-check-label" for="crowd-tools-export-options-only-content-' + self.id + '">Only Content</label> \
                    </div>\
                  </div> \
                </div>\
              </div> \
              <pre id="crowd-tools-export-check-schema-modal-pre-' + self.id + '" \
              style="overflow: hidden; overflow-wrap: break-word; white-space: pre-wrap;"></pre> \
              <div style="width: 100%; text-align: center;">\
                <img id="crowd-tools-export-check-schema-modal-img-' + self.id + '" \
              style="max-width: 100%;" \> \
              </div> \
              </div> \
              <div class="modal-footer"> \
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button> \
                <button class="btn btn-adaptive" data-clipboard-target="#crowd-tools-export-check-schema-modal-pre-' + self.id + '"> \
                  Copy to Clipboard \
                </button> \
                <button class="btn btn-adaptive" data-model="" id="crowd-tools-export-schema-' + self.id + '">Download</button> \
              </div> \
            </div> \
          </div> \
        </div>'
      );

      //init copy clipboard functionality
      new ClipboardJS('.btn');

      //event on select option of encoding on owl options
      $('#crowd-tools-export-options-encoding-' + self.id + ', #crowd-tools-export-options-syntax-' + self.id).change(function () {
        self.tools.export._owlExport();
      });

      //event on select option of verbalization and language on verbalization options
      $('#crowd-tools-export-options-verbalization-' + self.id + ', #crowd-tools-export-options-lanaguage-' + self.id).change(function () {
        self.tools.export._verbalizationExport();
      });

      //event on select option of use zoom and use grid on image options
      $('#crowd-tools-export-options-use-zoom-' + self.id +
        ', #crowd-tools-export-options-use-grid-' + self.id +
        ', #crowd-tools-export-options-only-content-' + self.id +
        ', #crowd-tools-export-options-format-' + self.id).change(function () {
          self.tools.export._imageExport();
        });

      //event handler when click export check schema
      $('[name="crowd-tools-export-check-schema-' + self.id + '"]').on('click', function (event) {
        var btn = this;
        event.stopPropagation();

        var model = $(this).attr('data-model');
        var modelObj = self.config.availableConceptualModels[model];

        $('#crowd-tools-export-schema-' + self.id).attr('data-model', model);

        $('#crowd-tools-export-check-schema-modal-pre-' + self.id).show();
        $('#crowd-tools-export-check-schema-modal-pre-' + self.id).html("");
        $('#crowd-tools-export-check-schema-modal-img-' + self.id).hide();
        $('#crowd-tools-export-check-schema-modal-img-' + self.id).attr("src", "");
        $('#crowd-tools-export-owl-options-' + self.id).hide();
        $('#crowd-tools-export-verbalization-options-' + self.id).hide();
        $('#crowd-tools-export-image-options-' + self.id).hide();

        if (model == 'owl') {
          $('#crowd-tools-export-owl-options-' + self.id).show();
          $('#crowd-tools-export-check-schema-modal-' + self.id + ' .modal-title').html('<i class="fa fa-fw fa-download"></i> Export ' + modelObj.title);
          $('#crowd-tools-export-check-schema-modal-' + self.id).modal('show');
          self.tools.export._owlExport();
        }
        else if (model == 'verbalization') {
          $('#crowd-tools-export-verbalization-options-' + self.id).show();
          $('#crowd-tools-export-check-schema-modal-' + self.id + ' .modal-title').html('<i class="fa fa-fw fa-download"></i> Export ' + modelObj.title);
          $('#crowd-tools-export-check-schema-modal-' + self.id).modal('show');
          self.tools.export._verbalizationExport();
        }
        else if (model == 'image') {
          $('#crowd-tools-export-check-schema-modal-pre-' + self.id).hide();
          $('#crowd-tools-export-check-schema-modal-img-' + self.id).show();
          $('#crowd-tools-export-image-options-' + self.id).show();
          $('#crowd-tools-export-check-schema-modal-' + self.id + ' .modal-title').html('<i class="fa fa-fw fa-download"></i> Export ' + modelObj.title);
          $('#crowd-tools-export-check-schema-modal-' + self.id).modal('show');
          self.tools.export._imageExport();
        }
        else {
          var originalBtn = $(btn).html();
          $(btn).html(originalBtn + ' <i class="loading fa fa-circle-o-notch fa-spin"></i>');

          self.tools.export.exportTo({
            model: model,
            success: function (schema) {
              $('#crowd-tools-export-check-schema-modal-' + self.id + ' .modal-title').html('<i class="fa fa-fw fa-download"></i> Export ' + model.toUpperCase() + ' Schema');
              $('#crowd-tools-export-check-schema-modal-' + self.id + ' .modal-body pre').html(JSON.stringify(schema, null, 4));
              $('#crowd-tools-export-check-schema-modal-' + self.id).modal('show');
              // copyToClipboard('#crowd-tools-export-check-schema-modal-' + self.id + ' .modal-body pre');
            },
            finally: function () {
              $(btn).html(originalBtn);
              $('[aria-labelledby="crowd-tools-export-dropdown-' + self.id + '"]').dropdown('hide');
            }
          });
        }

        $(".tooltip").tooltip('hide');
        $(this).blur();
        $('.dropdown-toggle').dropdown('hide');
      });

      //event handler when click download exported schema
      $('#crowd-tools-export-schema-' + self.id).on('click', function () {
        var model = $(this).attr('data-model');

        switch (model) {
          case 'owl':
            self.tools.export._owlExport(true);
            break;
          case 'verbalization':
            self.tools.export._verbalizationExport(true);
            break;
          case 'image':
            self.tools.export._imageExport(true);
            break;
          default:
            self.tools.export.exportTo({
              model: model,
              success: function (schema) {
                self.tools.export._download({
                  name: model + "-schema",
                  format: "json",
                  type: "application/json",
                  encoding: "charset=utf-8",
                  data: JSON.stringify(schema, null, 4)
                });
              }
            });
            break;
        }
      });
    }
    self.tools.export.init();

    //import tool
    self.tools.import.init = function () {
      //this function do the import actions when the conceptual model is not changed using self.tools.import.diagramToImport object
      self.tools.import.importFromLocal = function () {
        //load the schema on workspace
        self.fromJSONSchema(self.tools.import.diagramToImport.schema);
        //do a layout if hasPositions is false
        if (self.tools.import.diagramToImport.schema.hasPositions != null && !self.tools.import.diagramToImport.schema.hasPositions) {
          self.tools.layout.doLayout();
        }
        //update actual file with the imported
        self.config.actualFile = self.tools.import.diagramToImport.file;
        self.tools.file.updateActualFile();
      };

      //this function is called from outside editor for load a file through load modal or internally for import tool
      self.tools.import.importFrom = function (diagram) {
        //preserve the actual diagram to be imported
        self.tools.import.diagramToImport = diagram;

        //in case that the model to import was in kf metamodel, translate it to the actual visualized conceptual model and import it
        if (diagram.model == 'kf') {
          self.config.metamodelApi.request({
            from: 'kf',
            to: self.config.conceptualModel.name,
            data: diagram.schema,
            success: (response) => {
              response.hasPositions = false;
              self.tools.import.importFrom({ model: self.config.conceptualModel.name, schema: response, file: self.config.conceptualModel.file });
            }
          });
          return;
        } else if (!self.config.availableConceptualModels[diagram.model].initPalette) {
          self.config.metamodelApi.request({
            from: diagram.model,
            to: 'kf',
            data: diagram.schema,
            success: (response) => {
              response.hasPositions = false;
              self.tools.import.importFrom({ model: 'kf', schema: response, file: self.config.conceptualModel.file });
            }
          });
          return;
        }

        //in case that actual conceptual model was the same of the file, just load it from schema
        if (diagram.model == self.config.conceptualModel.name) {
          if (self.hasChanges() && (diagram.forced == null || !diagram.forced)) {
            $('#crowd-tools-import-advertisement-' + self.id).modal('show');
            // $('.modal').modal('hide');
          } else {
            self.tools.import.importFromLocal();
            // $('.modal').modal('hide');
          }
        }
        //in case that actual conceptual model was different, redirect to url of the correct model sending the diagram schema as parameter
        else {
          if (self.config.availableConceptualModels[diagram.model].initPalette != null) {
            if (self.config.ngRouter) {
              self.config.ngRouter.navigate(['/editor/' + diagram.model], { state: { schema: diagram.schema, file: diagram.file } });
              // $('.modal').modal('hide');
            } else {
              window.location.href = '/editor/' + diagram.model;
            }
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
                <h5 class="modal-title"><i class="fa fa-fw fa-upload"></i> Import Diagram</h5> \
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"> \
                  <span aria-hidden="true">&times;</span> \
                </button> \
              </div> \
              <div class="modal-body"> \
                <p>Are you sure want to import the diagram?</p> \
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
        self.tools.import.importFromLocal();
        $(".tooltip").tooltip('hide');
      });

      //append dom for import tool
      // $('#crowd-tools-row-' + self.id).append(
      //   '<div class="form-group"> \
      //     <div class="dropdown"> \
      //       <button class="btn btn-primary dropdown-toggle" type="button" id="crowd-tools-import-dropdown-' + self.id + '" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> \
      //         <i class="fa fa-upload"></i> Import \
      //       </button> \
      //       <div class="dropdown-menu" aria-labelledby="crowd-tools-import-dropdown-' + self.id + '"></div> \
      //     </div> \
      //   </div>'
      // );
      $('[aria-labelledby="crowd-tools-file-dropdown-' + self.id + '"]').append(
        '<li class="dropdown"> \
          <button class="dropdown-item dropdown-toggle" type="button" id="crowd-tools-import-dropdown-' + self.id + '" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> \
            <i class="fa fa-fw fa-upload"></i> Import \
          </button> \
          <ul class="dropdown-menu" aria-labelledby="crowd-tools-import-dropdown-' + self.id + '"></ul> \
        </li>'
      );

      //draw a button for each conceptual model and put the name on data attribute
      $.each(self.config.availableConceptualModels, function (conceptualModelName, conceptualModel) {
        // if (conceptualModel.initPalette != null || conceptualModel.name == 'kf') {
        if (conceptualModel.import == null || conceptualModel.import) {
          $('[aria-labelledby="crowd-tools-import-dropdown-' + self.id + '"]').append(
            '<li><button class="dropdown-item" data-model="' + conceptualModelName + '" name="crowd-tools-import-check-schema-' + self.id + '">' +
            '<i class="fa fa-fw fa-long-arrow-left"></i> ' + conceptualModelName.toUpperCase() + '</button></li>'
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
                <button class="btn btn-adaptive" data-model="" id="crowd-tools-import-schema-' + self.id + '">Upload</button> \
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
        // var btn = this;
        event.stopPropagation();

        var model = $(this).attr('data-model');
        $('#crowd-tools-import-schema-' + self.id).attr('data-model', model);

        $('#crowd-tools-import-check-schema-modal-' + self.id + ' .modal-title').html('<i class="fa fa-fw fa-upload"></i> Import ' + model.toUpperCase() + ' Schema');
        $('#crowd-tools-import-check-schema-modal-' + self.id).modal('show');

        $('[aria-labelledby="crowd-tools-import-dropdown-' + self.id + '"]').dropdown('hide');
        $(".tooltip").tooltip('hide');
        $(this).blur();
        $('.dropdown-toggle').dropdown('hide');
      });

      //event handler when click upload imported schema
      $('#crowd-tools-import-schema-' + self.id).on('click', function () {
        var schema = JSON.parse($('#crowd-tools-import-raw-' + self.id).val());
        if (JSON.stringify(schema).indexOf('"position": {') == -1)
          schema.hasPositions = false;
        self.tools.import.importFrom({ model: $(this).attr('data-model'), schema: schema, file: self.config.actualFile });
      });

      //event on close import modal
      $('#crowd-tools-import-check-schema-modal-' + self.id).on("hidden.bs.modal", function () {
        $('#crowd-tools-import-file-' + self.id).val('');
        $('#crowd-tools-import-file-' + self.id).next('.custom-file-label').html('Choose file');
        $('#crowd-tools-import-raw-' + self.id).val('');
      });
    }
    self.tools.import.init();

    //activate bootstrap nested dropdowns for files tools
    $('#crowd-tools-file-btn-' + self.id).bootnavbar({});

    //blur on hide
    $('#crowd-tools-file-btn-' + self.id).on('hide.bs.dropdown', function () {
      $('#crowd-tools-file-dropdown-' + self.id).blur();
    });
  }
  self.tools.file.init();

  //edit tools
  self.tools.edit.init = function () {
    //append edit dropdown for all edit related tools
    $('#crowd-tools-menu-' + self.id).append(
      '<div class="btn-group dropdown" id="crowd-tools-edit-btn-' + self.id + '"> \
        <button class="btn btn-adaptive dropdown-toggle" type="button" id="crowd-tools-edit-dropdown-' + self.id + '" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> \
          <i class="fa fa-fw fa-pencil"></i> Edit \
        </button> \
        <ul class="dropdown-menu" aria-labelledby="crowd-tools-edit-dropdown-' + self.id + '"></ul> \
      </div>'
    );

    //layout tool
    self.tools.layout.init = function () {
      //this function do the automatic layout (it's used in external functionalities)
      self.tools.layout.doLayout = function (options) {
        if (!options) options = {};
        if (!options.algorithm) options.algorithm = 'cola';

        setTimeout(() => {
          //get only cells that have not "layoutIgnore" property
          var filteredGraph = self.workspace.graph.getSubgraph(self.workspace.graph.getCells()).filter(function (cell) {
            return !cell.prop('layoutIgnore') &&
              (!cell.isLink() ||
                (!cell.getSourceCell()?.prop('layoutIgnore') && !cell.getTargetCell()?.prop('layoutIgnore') &&
                  !cell.getSourceCell()?.isLink() && !cell.getTargetCell()?.isLink()));
          });

          console.log('filteredGraph', filteredGraph);

          //initiate data for d3
          var elements = [];

          //set nodes for cytoscape graph
          filteredGraph.forEach((cell) => {
            if (cell.isElement()) {
              elements.push({
                data: {
                  id: cell.id,
                }
              });
            }
          });

          //set links for cytoscape graph base on nodes indexes
          filteredGraph.forEach((cell) => {
            if (cell.isLink()) {
              // var sourceCell = data.nodes.findIndex((element) => {
              //   return element.name == cell.getSourceCell().id;
              // });
              // var targetCell = data.nodes.findIndex((element) => {
              //   return element.name == cell.getTargetCell().id;
              // });
              elements.push({
                data: {
                  id: cell.id,
                  source: cell.getSourceCell().id,
                  target: cell.getTargetCell().id
                }
              });
            }
          });

          var cyGraph = self.config.cytoscape({
            elements: elements
          });

          console.log('Layout with ' + options.algorithm + ' algorithm');

          //set specific settings for each algorithm
          layoutSettings = {
            grid: {
              spacingFactor: 1
            },
            circle: {},
            concentric: {
              minNodeSpacing: 200
            },
            breadthfirst: {},
            // elk: {},
            klay: {
              klay: {
                inLayerSpacingFactor: 2.0,
                spacing: 100
              }
            },
            // euler: {},
            cose: {},
            cola: {
              edgeLength: 200,
              maxSimulationTime: 10000,
              // avoidOverlap: true,
              // nodeSpacing: function (node) { return 40; },
            }
          }

          //adjust width and height of bounding box relative to the amount of elements
          var size = 250;
          var amountElements = self.workspace.graph.getElements().length;
          if (amountElements <= 20) size = 500
          else if (amountElements <= 30) size = 750
          else size = 1000

          var w = size;
          var h = size;

          var cyLayout = cyGraph.layout({
            name: options.algorithm,
            fit: true,
            animate: false,
            boundingBox: { x1: 0, y1: 0, w: w, h: h },
            ...layoutSettings[options.algorithm],
            stop: () => {
              // console.log("layouted graph", cyGraph.json().elements);
              cyGraph.json().elements?.nodes?.forEach((node) => {
                var graphNode = filteredGraph.find((cell) => {
                  return cell.id == node.data?.id;
                });
                if (node.position?.x != null && node.position?.y != null)
                  graphNode.set('position', { x: node.position.x + 100, y: node.position.y + 100 });
              });
            }
          });

          cyLayout.run();

          console.log("cytoscape", cyGraph, cyLayout);

          setTimeout(() => {
            self.workspace.fitPaper();
            self.workspace.paper.hideTools();
            self.inspector.hideInformation();
          });
        }, 100);
      }

      //append dom for layout tool
      // $('#crowd-tools-row-' + self.id).append(
      //   '<div class="form-group"> \
      //     <button class="btn btn-primary" id="crowd-tools-layout-input-' + self.id + '" type="button" \
      //     data-toggle="tooltip" data-original-title="Automatic Layout" data-placement="bottom" > \
      //     <i class="material-icons">timeline</i></button> \
      //   </div>'
      // );
      $('[aria-labelledby="crowd-tools-edit-dropdown-' + self.id + '"]').append(
        // '<li> \
        //   <span class="d-block" data-toggle="tooltip" data-placement="right" title="Automatic Layout"> \
        //     <button class="dropdown-item" id="crowd-tools-layout-input-' + self.id + '"> \
        //     <i class="fa fa-fw fa-sitemap"></i> Layout</button> \
        //   </span> \
        // </li>'
        '<li class="dropdown"> \
          <button class="dropdown-item dropdown-toggle" type="button" id="crowd-tools-layout-dropdown-' + self.id + '" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> \
            <i class="fa fa-fw fa-sitemap"></i> Layout \
          </button> \
          <ul class="dropdown-menu" aria-labelledby="crowd-tools-layout-dropdown-' + self.id + '"></ul> \
        </li>'
      );

      //draw a button for each layout algorithm
      $.each(['grid', 'circle', 'concentric', 'breadthfirst', 'klay', 'cose', 'cola'], function (index, algorithm) {
        $('[aria-labelledby="crowd-tools-layout-dropdown-' + self.id + '"]').append(
          '<button class="dropdown-item" data-algorithm="' + algorithm + '" name="crowd-tools-layout-algorithm-' + self.id + '">' +
          '<i class="fa fa-fw fa-long-arrow-right"></i> ' + upperFirstLetter(algorithm) + '</button>'
        );
      })

      //event handler when click layout algorithm
      $('[name=crowd-tools-layout-algorithm-' + self.id + ']').on('click', function () {
        var algorithm = $(this).attr('data-algorithm');
        self.tools.layout.doLayout({ algorithm: algorithm });

        $(".tooltip").tooltip('hide');
        $(this).blur();
      });
    }
    self.tools.layout.init();

    //change conceptual model tool
    self.tools.model.init = function () {
      //append dom for change conceptual model tool
      // $('#crowd-tools-row-' + self.id).append(
      //   '<div class="form-group"> \
      //   <div class="dropdown"> \
      //     <button class="btn btn-danger dropdown-toggle" type="button" id="crowd-tools-model-dropdown-' + self.id + '" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> \
      //       <i class="fa fa-th"></i> Model \
      //     </button> \
      //     <div class="dropdown-menu" aria-labelledby="crowd-tools-model-dropdown-' + self.id + '"></div> \
      //   </div> \
      // </div>'
      // );
      $('[aria-labelledby="crowd-tools-edit-dropdown-' + self.id + '"]').append(
        '<li class="dropdown-divider"></li> \
        <li class="dropdown"> \
          <button class="dropdown-item dropdown-toggle" type="button" id="crowd-tools-model-dropdown-' + self.id + '" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> \
            <i class="fa fa-fw fa-th"></i> Model \
          </button> \
          <ul class="dropdown-menu" aria-labelledby="crowd-tools-model-dropdown-' + self.id + '"></ul> \
        </li>'
      );

      //draw a button for each conceptual model and put the name on data attribute
      $.each(self.config.availableConceptualModels, function (conceptualModelName, conceptualModel) {
        if (conceptualModel.initPalette != null) {
          $('[aria-labelledby="crowd-tools-model-dropdown-' + self.id + '"]').append(
            // '<button class="dropdown-item" data-model="' + conceptualModelName + '" name="crowd-tools-model-input-' + self.id + '" ' + (self.config.conceptualModel.name == conceptualModel.name ? 'disabled' : '') + '>' + conceptualModelName.toUpperCase() + '</button>'
            '<button class="dropdown-item" data-model="' + conceptualModelName + '" name="crowd-tools-model-advertisement-proceed-' + self.id + '" ' +
            (self.config.conceptualModel.name == conceptualModel.name ? 'disabled' : '') + '>' +
            (self.config.conceptualModel.name == conceptualModel.name ? '<i class="fa fa-fw fa-check"></i> ' : '<i class="fa fa-fw fa-long-arrow-right"></i> ') + conceptualModelName.toUpperCase() + '</button>'
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
                <p>Are you sure want to change the conceptual model?</p> \
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
          self.config.ngRouter.navigate(['/editor/' + $(this).attr('data-model')], { state: { file: self.config.actualFile } });
        else
          window.location.href = '/editor/' + $(this).attr('data-model');
      });
    }
    // self.tools.model.init();

    //translate conceptual model tool
    self.tools.translate.init = function () {
      //append dom for change translate tool
      // $('#crowd-tools-row-' + self.id).append(
      //   '<div class="form-group"> \
      //     <div class="dropdown"> \
      //       <button class="btn btn-danger dropdown-toggle" type="button" id="crowd-tools-translate-dropdown-' + self.id + '" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> \
      //         <i class="fa fa-random"></i> Translate \
      //       </button> \
      //       <div class="dropdown-menu" aria-labelledby="crowd-tools-translate-dropdown-' + self.id + '"></div> \
      //     </div> \
      //   </div>'
      // );
      $('[aria-labelledby="crowd-tools-edit-dropdown-' + self.id + '"]').append(
        '<li class="dropdown"> \
          <button class="dropdown-item dropdown-toggle" type="button" id="crowd-tools-translate-dropdown-' + self.id + '" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> \
            <i class="fa fa-fw fa-random"></i> Translate \
          </button> \
          <ul class="dropdown-menu" aria-labelledby="crowd-tools-translate-dropdown-' + self.id + '"></ul> \
        </li>'
      );

      //draw a button for each conceptual model and put the name on data attribute
      $.each(self.config.availableConceptualModels, function (conceptualModelName, conceptualModel) {
        if (conceptualModel.initPalette != null) {
          $('[aria-labelledby="crowd-tools-translate-dropdown-' + self.id + '"]').append(
            '<button class="dropdown-item" data-model="' + conceptualModelName + '" name="crowd-tools-translate-schema-' + self.id + '" ' +
            (self.config.conceptualModel.name == conceptualModel.name ? 'disabled' : '') + '>' +
            (self.config.conceptualModel.name == conceptualModel.name ? '<i class="fa fa-fw fa-check"></i> ' : '<i class="fa fa-fw fa-long-arrow-right"></i> ') + conceptualModelName.toUpperCase() + '</button>'
          );
        }
      })

      //event handler when click a translate button
      $('[name=crowd-tools-translate-schema-' + self.id + ']').on('click', function () {
        var btn = this;
        event.stopPropagation();

        var model = $(this).attr('data-model');
        $('#crowd-tools-translate-schema-' + self.id).attr('data-model', model);

        var originalBtn = $(btn).html();
        $(btn).html(originalBtn + ' <i class="loading fa fa-circle-o-notch fa-spin"></i>');

        self.tools.export.exportTo({
          model: model,
          success: function (schema) {
            schema.hasPositions = false;
            self.tools.import.importFrom({ model: model, schema: schema, file: self.config.actualFile });
          },
          finally: function () {
            $(btn).html(originalBtn);
            $('[aria-labelledby="crowd-tools-translate-dropdown-' + self.id + '"]').dropdown('hide');
          }
        });

        $(".tooltip").tooltip('hide');
        $(this).blur();
        $('.dropdown-toggle').dropdown('hide');
      });
    }
    self.tools.translate.init();

    //clear workspace tool
    self.tools.clearWorkspace.init = function () {
      //clear the workspace and center the scroll
      self.tools.clearWorkspace.clear = function () {
        //clear the workspace elements
        // self.workspace.graph.clear();
        self.workspace.clearGraph()
        //center workspace scroll
        setTimeout(() => self.workspace.centerScroll());
      }

      //append dom for clear workspace tool
      // $('#crowd-tools-row-' + self.id).append(
      //   '<div class="form-group"> \
      //     <button class="btn btn-danger" id="crowd-tools-clear-workspace-input-' + self.id + '" type="button" \
      //     data-toggle="tooltip" data-original-title="Clear Diagram" data-placement="bottom" > \
      //     <i class="material-icons">delete_forever</i></button> \
      //   </div>'
      // );
      $('[aria-labelledby="crowd-tools-edit-dropdown-' + self.id + '"]').append(
        '<li class="dropdown-divider"></li> \
        <li> \
          <span class="d-block" data-toggle="tooltip" data-placement="right" title="Clear Paper"> \
            <button class="dropdown-item" style="color: #dc3545;" id="crowd-tools-clear-workspace-input-' + self.id + '"> \
            <i class="fa fa-fw fa-eraser"></i> Clear</button> \
          </span> \
        </li>'
      );

      //append dom for the advertisement modal when try clear workspace
      $('body').append(
        '<div id="crowd-tools-clear-workspace-advertisement-' + self.id + '" class="modal fade"> \
          <div class="modal-dialog"> \
            <div class="modal-content"> \
              <div class="modal-header"> \
                <h5 class="modal-title"><i class="fa fa-fw fa-eraser"></i> Clear Paper</h5> \
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"> \
                  <span aria-hidden="true">&times;</span> \
                </button> \
              </div> \
              <div class="modal-body"> \
                <p>Are you sure want to clear the paper?</p> \
                <p><b>Changes may not be saved</b></p> \
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
        self.tools.clearWorkspace.clear();

        $(".tooltip").tooltip('hide');
      });
    }
    self.tools.clearWorkspace.init();

    //activate bootstrap nested dropdowns for edit tools
    $('#crowd-tools-edit-btn-' + self.id).bootnavbar({});

    //blur on hide
    $('#crowd-tools-edit-btn-' + self.id).on('hide.bs.dropdown', function () {
      $('#crowd-tools-edit-dropdown-' + self.id).blur();
    });
  }
  self.tools.edit.init();

  //view tools
  self.tools.view.init = function () {
    //append edit dropdown for all view related tools
    $('#crowd-tools-menu-' + self.id).append(
      '<div class="btn-group dropdown" id="crowd-tools-view-btn-' + self.id + '"> \
        <button class="btn btn-adaptive dropdown-toggle" type="button" id="crowd-tools-view-dropdown-' + self.id + '" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> \
          <i class="fa fa-fw fa-eye"></i> View \
        </button> \
        <ul class="dropdown-menu" aria-labelledby="crowd-tools-view-dropdown-' + self.id + '"></ul> \
      </div>'
    );

    //view scrollbar tool
    self.tools.viewScrollbar.init = function () {
      //append dom for view scrollbar tool
      $('[aria-labelledby="crowd-tools-view-dropdown-' + self.id + '"]').append(
        '<li> \
          <span class="d-block" data-toggle="tooltip" data-placement="right" title="Show/Hide Scrollbar"> \
            <button class="dropdown-item" id="crowd-tools-view-scrollbar-input-' + self.id + '"> \
            <i class="fa fa-fw fa-window-maximize"></i> Scrollbars</button> \
          </span> \
        </li>'
      );

      //event handler when click view scrollbar
      $('#crowd-tools-view-scrollbar-input-' + self.id).on('click', function () {
        $('#crowd-workspace-' + self.id).css('overflow', $('#crowd-workspace-' + self.id).css('overflow') == 'hidden' ? 'scroll' : 'hidden');
        $(".tooltip").tooltip('hide');
        $(this).blur();
      });
    }
    self.tools.viewScrollbar.init();

    //collapse classes tool
    self.tools.collapseClasses.init = function () {
      self.tools.collapseClasses.collapsed = true;
      self.tools.collapseClasses.elementsHeights = {};

      self.tools.collapseClasses.updateCollapsed = function () {
        self.workspace.graph.getElements().forEach(function (element) {
          element.prop('collapsed', self.tools.collapseClasses.collapsed);
        });

        setTimeout(() => {
          self.workspace.fitPaper();
          self.workspace.paper.hideTools();
          self.inspector.hideInformation();
        });
      }

      self.workspace.graph.on('add remove', function () {
        self.tools.collapseClasses.updateCollapsed();
      });

      //append dom for collapse classes tool
      $('[aria-labelledby="crowd-tools-view-dropdown-' + self.id + '"]').append(
        '<li class="dropdown-divider"></li> \
        <li> \
          <span class="d-block" data-toggle="tooltip" data-placement="right" \
          title="' + (self.config.conceptualModel.name != 'uml' ? 'This functionality is only available for UML model' : 'Show/Hide Attributes and Methods on Classes') + '"> \
            <button class="dropdown-item" id="crowd-tools-collapse-classes-input-' + self.id + '" \
            ' + (self.config.conceptualModel.name != 'uml' ? 'style="pointer-events: none;" disabled' : '') + '> \
            <i id="crowd-tools-collapse-classes-icon-' + self.id + '" class="fa fa-fw fa-compress"></i> Collapse Classes</button> \
          </span> \
        </li>'
      );

      //event handler when click collapse classes
      $('#crowd-tools-collapse-classes-input-' + self.id).on('click', function () {
        self.tools.collapseClasses.collapsed = !self.tools.collapseClasses.collapsed;
        $('#crowd-tools-collapse-classes-icon-' + self.id).removeClass(self.tools.collapseClasses.collapsed ? 'fa-compress' : 'fa-expand');
        $('#crowd-tools-collapse-classes-icon-' + self.id).addClass(self.tools.collapseClasses.collapsed ? 'fa-expand' : 'fa-compress');
        self.tools.collapseClasses.updateCollapsed();

        $(".tooltip").tooltip('hide');
        $(this).blur();
      });
    }
    self.tools.collapseClasses.init();

    //toggle roles associations tool
    self.tools.toggleRolesAssoc.init = function () {
      self.tools.toggleRolesAssoc.toggleRoles = false;
      self.tools.toggleRolesAssoc.toggleAssoc = true;

      self.tools.toggleRolesAssoc.updateLabels = function () {
        if (self.config.conceptualModel.name == 'uml') {
          self.workspace.graph.getLinks().forEach(function (link) {
            link.prop('showRoles', self.tools.toggleRolesAssoc.toggleRoles);
            link.prop('showAssoc', self.tools.toggleRolesAssoc.toggleAssoc);
          });
        }
      }

      self.workspace.graph.on('add remove', function () {
        if (self.config.conceptualModel.name == 'uml') {
          self.tools.toggleRolesAssoc.updateLabels();
        }
      });

      //append dom for toggle roles associations tool
      $('[aria-labelledby="crowd-tools-view-dropdown-' + self.id + '"]').append(
        '<li class="dropdown"> \
          <span class="d-block" \
          ' + (self.config.conceptualModel.name != 'uml' ? 'data-toggle="tooltip" data-placement="right" title="This functionality is only available for UML model"' : '') + '> \
              <button class="dropdown-item ' + (self.config.conceptualModel.name != 'uml' ? "disabled" : "dropdown-toggle") + '" \
              type="button" id="crowd-tools-toggle-roles-assoc-dropdown-' + self.id + '" \
              data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> \
                <i class="fa fa-fw fa-arrows-h"></i> Toggle Roles/Assoc. \
              </button> \
            ' + (self.config.conceptualModel.name == 'uml' ?
          '<ul class="dropdown-menu" aria-labelledby="crowd-tools-toggle-roles-assoc-dropdown-' + self.id + '" \
            style="width: 220px"> \
              <li><button class="dropdown-item" id="crowd-tools-toggle-roles-assoc-input-roles-' + self.id + '"> \
              Toggle Roles \
              <i class="fa fa-fw fa-toggle-off pull-right" id="crowd-tools-toggle-roles-assoc-check-roles-' + self.id + '"></i> \
              </button> \
              </li> \
              <li><button class="dropdown-item" id="crowd-tools-toggle-roles-assoc-input-assoc-' + self.id + '"> \
              Toggle Associations \
              <i class="fa fa-fw fa-toggle-on pull-right" id="crowd-tools-toggle-roles-assoc-check-assoc-' + self.id + '"></i> \
              </button> \
              </li> \
            </ul>' : '') + ' \
          </span> \
        </li>'
      );

      //event handler when click toggle roles
      $('#crowd-tools-toggle-roles-assoc-input-roles-' + self.id).on('click', function () {
        self.tools.toggleRolesAssoc.toggleRoles = !self.tools.toggleRolesAssoc.toggleRoles;
        $('#crowd-tools-toggle-roles-assoc-check-roles-' + self.id).toggleClass('fa-toggle-on');
        $('#crowd-tools-toggle-roles-assoc-check-roles-' + self.id).toggleClass('fa-toggle-off');
        self.tools.toggleRolesAssoc.updateLabels();

        $(".tooltip").tooltip('hide');
        $(this).blur();
      });

      //event handler when click toggle associations
      $('#crowd-tools-toggle-roles-assoc-input-assoc-' + self.id).on('click', function () {
        self.tools.toggleRolesAssoc.toggleAssoc = !self.tools.toggleRolesAssoc.toggleAssoc;
        $('#crowd-tools-toggle-roles-assoc-check-assoc-' + self.id).toggleClass('fa-toggle-on');
        $('#crowd-tools-toggle-roles-assoc-check-assoc-' + self.id).toggleClass('fa-toggle-off');
        self.tools.toggleRolesAssoc.updateLabels();

        $(".tooltip").tooltip('hide');
        $(this).blur();
      });
    }
    self.tools.toggleRolesAssoc.init();

    //filter implicit terms tool
    self.tools.filterImplicitTerms.init = function () {
      self.tools.filterImplicitTerms.filtered = true;

      self.tools.filterImplicitTerms.updateFilter = function () {
        console.log('filter implicit terms');
        self.workspace.graph.getElements().forEach(function (element) {
          if (element.prop('uri') == 'http://www.w3.org/2002/07/owl#Thing' || element.prop('uri') == 'http://www.w3.org/2002/07/owl#Nothing') {
            element.attr('./display', self.tools.filterImplicitTerms.filtered ? 'none' : true);
            self.workspace.graph.getConnectedLinks(element).forEach(function (link) {
              link.attr('./display', self.tools.filterImplicitTerms.filtered ? 'none' : true);
              self.workspace.graph.getConnectedLinks(link).forEach(function (subLink) {
                subLink.attr('./display', self.tools.filterImplicitTerms.filtered ? 'none' : true);
              });
            });
          }
        });

        setTimeout(() => {
          self.workspace.fitPaper();
          self.workspace.paper.hideTools();
          self.inspector.hideInformation();
        });
      }

      self.workspace.graph.on('add remove', function () {
        setTimeout(() => {
          self.tools.filterImplicitTerms.updateFilter();
        });
      });

      //append dom for filter implicit terms tool
      $('[aria-labelledby="crowd-tools-view-dropdown-' + self.id + '"]').append(
        '<li class="dropdown-divider"></li> \
        <li> \
          <span class="d-block" data-toggle="tooltip" data-placement="right" \
          title="Filter implicit terms like owl:Thing and owl:Nothing from ontology"> \
            <button class="dropdown-item" id="crowd-tools-filter-implicit-terms-input-' + self.id + '"> \
            <i id="crowd-tools-filter-implicit-terms-icon-' + self.id + '" class="fa fa-fw fa-toggle-on"></i> Filter Implicit Terms</button> \
          </span> \
        </li>'
      );

      //event handler when filter implicit terms
      $('#crowd-tools-filter-implicit-terms-input-' + self.id).on('click', function () {
        self.tools.filterImplicitTerms.filtered = !self.tools.filterImplicitTerms.filtered;
        $('#crowd-tools-filter-implicit-terms-icon-' + self.id).removeClass(self.tools.filterImplicitTerms.filtered ? 'fa-toggle-off' : 'fa-toggle-on');
        $('#crowd-tools-filter-implicit-terms-icon-' + self.id).addClass(self.tools.filterImplicitTerms.filtered ? 'fa-toggle-on' : 'fa-toggle-off');
        self.tools.filterImplicitTerms.updateFilter();

        $(".tooltip").tooltip('hide');
        $(this).blur();
      });
    }
    self.tools.filterImplicitTerms.init();

    //activate bootstrap nested dropdowns for view tools
    $('#crowd-tools-view-btn-' + self.id).bootnavbar({});

    //blur on hide
    $('#crowd-tools-view-btn-' + self.id).on('hide.bs.dropdown', function () {
      $('#crowd-tools-view-dropdown-' + self.id).blur();
    });
  }
  self.tools.view.init();

  //tools tools
  self.tools.tools.init = function () {
    //append edit dropdown for all tools related tools
    $('#crowd-tools-menu-' + self.id).append(
      '<div class="btn-group dropdown" id="crowd-tools-tools-btn-' + self.id + '"> \
        <button class="btn btn-adaptive dropdown-toggle" type="button" id="crowd-tools-tools-dropdown-' + self.id + '" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> \
          <i class="fa fa-fw fa-wrench"></i> Tools \
        </button> \
        <ul class="dropdown-menu" aria-labelledby="crowd-tools-tools-dropdown-' + self.id + '"></ul> \
      </div>'
    );

    var loggedInMessage = 'You must be logged in to use this functionality';

    //namespaces tool
    self.tools.namespaces.init = function () {
      //append dom for namespaces tool
      $('[aria-labelledby="crowd-tools-tools-dropdown-' + self.id + '"]').append(
        '<li> \
          <span class="d-block" data-toggle="tooltip" data-placement="right" \
          title="' + (!self.config?.ngFiles?.user ? loggedInMessage : 'Edit your collection of namespaces for use it on URIs') + '" > \
            <button class="dropdown-item" id="crowd-tools-namespaces-input-' + self.id + '" \
            ' + (!self.config?.ngFiles?.user ? 'style="pointer-events: none;" disabled' : '') + '> \
            <i class="fa fa-fw fa-hashtag"></i> Namespaces</button> \
          </span> \
        </li> \
        <li class="dropdown-divider"></li>'
      );

      //event handler when click namespaces
      $('#crowd-tools-namespaces-input-' + self.id).on('click', function () {
        if (self.config?.ngFiles?.namespaces?.modal) {
          $('#' + self.config.ngFiles.namespaces.modal).modal('show'); //not used
        }
        if (self.config?.ngFiles?.namespaces?.get) {
          self.config.ngComponent[self.config.ngFiles.namespaces.get](true);
        }

        $(".tooltip").tooltip('hide');
        $(this).blur();
      });
    }
    self.tools.namespaces.init();

    //reasoning tool
    self.tools.reasoning.init = function () {
      //call the reasoning with the actual diagram transalted to meta
      self.tools.reasoning.callReasoning = function (options) {
        self.tools.export.exportTo({
          model: 'kf',
          success: function (schema) {
            console.log('success meta', schema);
            self.config.reasoningApi.request({
              kf: schema,
              reasoner: options?.reasoner,
              strategy: options?.strategy,
              cards: options?.cards,
              success: (res) => {
                // if (options?.success) options?.success({ reasoning: res })
                self.config.metamodelApi.request({
                  from: 'kf',
                  to: self.config.conceptualModel.name,
                  data: res.KF,
                  success: (schema) => { if (options?.success) options?.success({ schema: schema, reasoning: res }) },
                  error: (error) => { if (options?.error) options?.error(error) }
                });
              },
              error: (error) => { if (options?.error) options?.error(error) }
            });
          }
        });
      };

      //append dom for reasoning tool
      $('[aria-labelledby="crowd-tools-tools-dropdown-' + self.id + '"]').append(
        '<li> \
          <span class="d-block" data-toggle="tooltip" data-placement="right" title="Call Reasoner"> \
            <button class="dropdown-item" id="crowd-tools-reasoning-input-' + self.id + '"> \
            <i class="fa fa-fw fa-lightbulb-o"></i> Reasoning</button> \
          </span> \
        </li>'
      );
      // $('#crowd-tools-row-' + self.id).append(
      //   '<div class="form-group"> \
      //     <button class="btn btn-warning iconify" id="crowd-tools-reasoning-input-' + self.id + '" type="button" \
      //     data-toggle="tooltip" data-original-title="Call Reasoner" data-placement="bottom"> \
      //     <i class="fa fa-lightbulb-o"></i> Reasoning</button> \
      //   </div>'
      // );

      //append dom for modal to set reasoning options before call reasoning api
      $('body').append(
        '<div id="crowd-tools-reasoning-options-modal-' + self.id + '" class="modal fade"> \
          <div class="modal-dialog modal-dialog-scrollable modal-sm"> \
            <div class="modal-content"> \
              <div class="modal-header"> \
                <h5 class="modal-title"><i class="fa fa-fw fa-lightbulb-o"></i> Reasoning</h5> \
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"> \
                  <span aria-hidden="true">&times;</span> \
                </button> \
              </div> \
              <div class="modal-body"> \
                <div class="form-group"> \
                  <label for="">Reasoner</label> \
                  <select class="form-control custom-select my-1 mr-sm-2" id="crowd-tools-reasoning-options-reasoner-' + self.id + '"> \
                    <option>Racer</option> \
                    <option>Konclude</option> \
                  </select> \
                </div> \
                <div class="form-group"> \
                  <label for="">Encoding</label> \
                  <select class="form-control custom-select my-1 mr-sm-2" id="crowd-tools-reasoning-options-encoding-' + self.id + '"> \
                    <option>ALCQI</option> \
                  </select> \
                </div> \
                <div class="form-group form-check"> \
                  <input type="checkbox" class="form-check-input" id="crowd-tools-reasoning-options-cards-' + self.id + '"> \
                  <label class="form-check-label" for="crowd-tools-reasoning-options-cards-' + self.id + '">Reason Cardinalities</label><br> \
                  <small class="text-muted">(this may take too much time)</small><br> \
                  <small class="text-danger">(warning: this will replace the current cardinalities with the inferred ones)</small> \
                </div> \
              </div> \
              <div class="modal-footer"> \
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button> \
                <button class="btn btn-warning" data-model="" id="crowd-tools-reasoning-call-' + self.id + '">Call Reasoner</button> \
              </div> \
            </div> \
          </div> \
        </div>'
      );

      //event handler when click reasoning to open reasoning options
      $('#crowd-tools-reasoning-input-' + self.id).on('click', function () {
        $('#crowd-tools-reasoning-options-modal-' + self.id).modal('show');

        $(".tooltip").tooltip('hide');
        $(this).blur();
      });

      //event handler when click call reasoner
      $('#crowd-tools-reasoning-call-' + self.id).on('click', function () {
        self.tools.reasoning.callReasoning({
          reasoner: $('#crowd-tools-reasoning-options-reasoner-' + self.id + ' option:selected').val(),
          strategy: $('#crowd-tools-reasoning-options-encoding-' + self.id + ' option:selected').val().toLowerCase(),
          cards: $('#crowd-tools-reasoning-options-cards-' + self.id).is(":checked"),
          success: function (response) {
            //call reasoning interpretation for the specific conceptual model
            self.fromReasoning(response.schema, response.reasoning);

            $('#crowd-tools-reasoning-options-modal-' + self.id).modal('hide');

            // response.reasoning.KF.hasPositions = false;
            // self.tools.import.importFrom({ model: 'kf', schema: response.reasoning.KF, file: self.config.actualFile });
          }
        });
      });
    }
    self.tools.reasoning.init();

    //undo reasoning tool
    self.tools.undoReasoning.init = function () {
      //append dom for undo reasoning tool
      $('[aria-labelledby="crowd-tools-tools-dropdown-' + self.id + '"]').append(
        '<li> \
      <span class="d-block" data-toggle="tooltip" data-placement="right" title="Remove Reasoning Inferences and Clear Marks"> \
        <button class="dropdown-item" style="color: #dc3545;" id="crowd-tools-undo-reasoning-input-' + self.id + '"> \
        <i class="fa fa-fw fa-undo"></i> Undo Reasoning</button> \
      </span> \
    </li>'
      );

      //append dom for the advertisement modal when try undo reasoning
      $('body').append(
        '<div id="crowd-tools-undo-reasoning-advertisement-' + self.id + '" class="modal fade"> \
      <div class="modal-dialog"> \
        <div class="modal-content"> \
          <div class="modal-header"> \
            <h5 class="modal-title"><i class="fa fa-fw fa-undo"></i> Undo Reasoning</h5> \
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"> \
              <span aria-hidden="true">&times;</span> \
            </button> \
          </div> \
          <div class="modal-body"> \
            <p>Are you sure want to undo the reasoning inferred elements and marks?</p> \
            <p><b>This action cannot be reverted</b></p> \
          </div> \
          <div class="modal-footer"> \
            <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button> \
            <button id="crowd-tools-undo-reasoning-advertisement-proceed-' + self.id + '" \
            type="button" class="btn btn-danger" data-dismiss="modal">Proceed</button> \
          </div> \
        </div> \
      </div> \
    </div>'
      );

      //event handler when click undo reasoning that open advertisement modal
      $('#crowd-tools-undo-reasoning-input-' + self.id).on('click', function () {
        if (self.hasChanges()) {
          $('#crowd-tools-undo-reasoning-advertisement-' + self.id).modal('show');
        }
        $(".tooltip").tooltip('hide');
        $(this).blur();
      });

      //event handler when click proceed button in advertisement for undo reasoning
      $('#crowd-tools-undo-reasoning-advertisement-proceed-' + self.id).on('click', function () {
        self.reasoning.undoSemantic();

        $(".tooltip").tooltip('hide');
      });
    }
    self.tools.undoReasoning.init();

    //clear reasoning tool
    self.tools.clearReasoning.init = function () {
      //append dom for clear reasoning tool
      $('[aria-labelledby="crowd-tools-tools-dropdown-' + self.id + '"]').append(
        '<li> \
          <span class="d-block" data-toggle="tooltip" data-placement="right" title="Preserve Reasoning Inferences and Clear Marks"> \
            <button class="dropdown-item" style="color: #dc3545;" id="crowd-tools-clear-reasoning-input-' + self.id + '"> \
            <i class="fa fa-fw fa-eraser"></i> Clear Reasoning</button> \
          </span> \
        </li>'
      );

      //append dom for the advertisement modal when try clear reasoning
      $('body').append(
        '<div id="crowd-tools-clear-reasoning-advertisement-' + self.id + '" class="modal fade"> \
          <div class="modal-dialog"> \
            <div class="modal-content"> \
              <div class="modal-header"> \
                <h5 class="modal-title"><i class="fa fa-fw fa-eraser"></i> Clear Reasoning</h5> \
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"> \
                  <span aria-hidden="true">&times;</span> \
                </button> \
              </div> \
              <div class="modal-body"> \
                <p>Are you sure want to clear the reasoning marks?</p> \
                <p><b>This action cannot be reverted</b></p> \
              </div> \
              <div class="modal-footer"> \
                <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button> \
                <button id="crowd-tools-clear-reasoning-advertisement-proceed-' + self.id + '" \
                type="button" class="btn btn-danger" data-dismiss="modal">Proceed</button> \
              </div> \
            </div> \
          </div> \
        </div>'
      );

      //event handler when click clear reasoning that open advertisement modal
      $('#crowd-tools-clear-reasoning-input-' + self.id).on('click', function () {
        if (self.hasChanges()) {
          $('#crowd-tools-clear-reasoning-advertisement-' + self.id).modal('show');
        }
        $(".tooltip").tooltip('hide');
        $(this).blur();
      });

      //event handler when click proceed button in advertisement for clear reasoning
      $('#crowd-tools-clear-reasoning-advertisement-proceed-' + self.id).on('click', function () {
        self.reasoning.clearMark();

        $(".tooltip").tooltip('hide');
      });
    }
    self.tools.clearReasoning.init();

    //repair tool
    self.tools.repair.init = function () {
      //call the repair with the actual diagram transalted to meta
      self.tools.repair.callRepair = function (options) {
        self.tools.export.exportTo({
          model: 'kf',
          success: function (schema) {
            console.log('success meta', schema);
            self.config.metamodelApi.request({
              repair: true,
              meta: schema,
              entity: options?.entity,
              reasoner: options?.reasoner,
              maxExplanations: options?.maxExplanations,
              timeout: options?.timeout,
              success: (res) => {
                options?.success(res);
              },
              error: (error) => { if (options?.error) options?.error(error) }
            });
          }
        });

      }

      self.tools.repair.openExplanationsWindow = function (options) {
        //clear explanations sets
        $('.crowd-tools-repair-explanations-sets').empty();

        //show explanations window
        $('.crowd-tools-repair-explanations-container').removeClass('d-none');

        //append explanations sets obtained from repair Explanations object
        if (options?.Explanations) {
          Object.keys(options?.Explanations).forEach(function (key, index) {
            let explanationsSet = options?.Explanations[key];

            //create explanations radios for each axiom
            let axiomsRadios = '';
            Object.keys(explanationsSet).forEach(function (key2, index2) {
              let axiom = explanationsSet[key2];

              console.log('axiom', axiom);

              axiomsRadios +=
                '<div class="form-check" id="crowd-tools-repair-explanations-set-container-' + self.id + '-' + (index + 1) + '-' + (index2 + 1) + '"> \
                  <input class="form-check-input" type="radio" name="crowd-tools-repair-explanations-set-' + self.id + '-' + (index + 1) + '" \
                  id="crowd-tools-repair-explanations-set-' + self.id + '-' + (index + 1) + '-' + (index2 + 1) + '" ' + (index2 == 0 ? 'checked' : '') + ' \
                  data-explanation="'+ key + '" data-axiom="' + key2 + '"> \
                  <label class="form-check-label" for="crowd-tools-repair-explanations-set-' + self.id + '-' + (index + 1) + '-' + (index2 + 1) + '"> \
                    ' + self.tools.repair.prettyAxiom(axiom) + ' \
                  </label> \
                </div>';
            });

            //creates explanations set dom
            $('.crowd-tools-repair-explanations-sets').append(
              '<div id="crowd-tools-repair-explanations-set-' + self.id + '-' + (index + 1) + '" \
              class="crowd-tools-repair-explanations-set ' + (index == 0 ? 'selected' : '') + '"> \
                <div> \
                  <h6>Explanation ' + (index + 1) + '</h6> \
                </div> \
                <div> \
                  ' + axiomsRadios + ' \
                </div> \
              </div>'
            );

            //event handler when click explanations set
            //makes set selected
            // $('#crowd-tools-repair-explanations-set-' + self.id + '-' + (index + 1)).on('click', function () {
            //   $('.crowd-tools-repair-explanations-set').removeClass('selected');
            //   $(this).addClass('selected');
            // });
          });

          //event handler when select a explanations set radio input in explanations window
          $('input[name^="crowd-tools-repair-explanations-set-' + self.id + '-"]').on('change', function () {
            //if propagate explanation is checked then check the same axiom in all explanations sets that has it
            if ($('#crowd-tools-repair-explanations-propagate-' + self.id).is(':checked')) {
              var selectedAxiom = options?.Explanations[$(this).attr('data-explanation')][$(this).attr('data-axiom')];
              $('input[name^="crowd-tools-repair-explanations-set-' + self.id + '-"]').each(function () {
                var axiom = options?.Explanations[$(this).attr('data-explanation')][$(this).attr('data-axiom')];
                if (axiom == selectedAxiom) {
                  $(this).prop('checked', true);
                }
              });
            }

            self.tools.repair.markExplanations();
          });

          //call repair mark interpretation for the specific conceptual model
          //with the default selected axioms of each explanation
          self.tools.repair.markExplanations();

          //event on mouse over axiom container in explanations window
          //highlight axiom in workspace
          // $("#crowd-tools-repair-explanations-set-container-" + self.id).hover(function () {
          //   //get axiom and explanation from radio input
          //   let hoveredAxiom = {
          //     explanation: $(this).find('input').attr('data-explanation'),
          //     axiom: $(this).find('input').attr('data-axiom')
          //   };

          //   //highlight axiom in workspace
          //   self.repairing.genericHighlightAxiom(options, hoveredAxiom);
          // });
        }
      }

      self.tools.repair.markExplanations = function () {
        //get all selected axioms in each explanations set
        let selectedAxioms = [];
        $('input[name^="crowd-tools-repair-explanations-set-' + self.id + '-"]:checked').each(function () {
          selectedAxioms.push({
            explanation: $(this).attr('data-explanation'),
            axiom: $(this).attr('data-axiom')
          });
        });

        //call repair mark interpretation for the specific conceptual model
        self.fromRepairMark(self.tools.repair.response, selectedAxioms);
      }

      self.tools.repair.prettyAxiom = function (axiom) {
        let prettyAxiom = axiom;

        // find entities between < and > and replace with the URI fragment (without < and >)
        let entities = axiom.match(/<[^>]*>/g);
        if (entities) {
          entities.forEach(function (entity) {
            let entityFragment = entity.replace('<', '').replace('>', '').split('#')[1];
            prettyAxiom = prettyAxiom.replace(entity, entityFragment);
          });
        }

        return prettyAxiom;
      }

      //append dom for repair tool
      $('[aria-labelledby="crowd-tools-tools-dropdown-' + self.id + '"]').append(
        '<li class="dropdown-divider"></li> \
        <li> \
            <span class="d-block" data-toggle="tooltip" data-placement="right" title="Use the KF Repair Tool for Generate Explanations"> \
              <button class="dropdown-item" id="crowd-tools-repair-input-' + self.id + '"> \
              <i class="fa fa-fw fa-wrench"></i> Repair</button> \
            </span> \
          </li>'
      );

      //append dom for modal to set repair options before call metamodel api
      $('body').append(
        '<div id="crowd-tools-repair-options-modal-' + self.id + '" class="modal fade"> \
              <div class="modal-dialog modal-dialog-scrollable modal-sm"> \
                <div class="modal-content"> \
                  <div class="modal-header"> \
                    <h5 class="modal-title"><i class="fa fa-fw fa-wrench"></i> Repair</h5> \
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"> \
                      <span aria-hidden="true">&times;</span> \
                    </button> \
                  </div> \
                  <div class="modal-body"> \
                    <div class="form-group text-center"> \
                      <button class="btn btn-sm btn-danger" id="crowd-tools-repair-options-find-unsat-concepts-' + self.id + '" type="button" \
                      data-toggle="tooltip" data-placement="bottom" title="Search if your diagram have some unsatisfacible concept for repair."> \
                        Find Unsatisfiable Concepts <i class="fa fa-fw fa-search"></i> \
                      </button> \
                    </div> \
                    <div class="form-group"> \
                      <label for="">Concept</label> \
                      <select class="form-control custom-select my-1 mr-sm-2" id="crowd-tools-repair-options-concept-' + self.id + '" disabled> \
                      </select> \
                    </div> \
                    <div class="form-group"> \
                      <label for="">Reasoner</label> \
                      <select class="form-control custom-select my-1 mr-sm-2" id="crowd-tools-repair-options-reasoner-' + self.id + '"> \
                        <option>JFact</option> \
                        <option selected>Pellet</option> \
                        <option>Racer</option> \
                        <option>Konclude</option> \
                      </select> \
                    </div> \
                    <div class="form-group row"> \
                      <label class="col-auto col-form-label">Max. Explanations</label> \
                      <div class="col"> \
                        <input type="text" value="5" class="form-control" id="crowd-tools-repair-options-maxexplain-' + self.id + '"> \
                      </div> \
                    </div> \
                  </div> \
                  <div class="modal-footer"> \
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button> \
                    <button class="btn btn-warning" data-model="" id="crowd-tools-repair-call-' + self.id + '" disabled>Call Repair</button> \
                  </div> \
                </div> \
              </div> \
            </div>'
      );

      //append dom for explanations window
      $('#crowd-workspace-' + self.id).append(
        '<div class="crowd-tools-repair-explanations-container d-none"> \
          <div> \
            <h5 class="text-center">Explanations</h5> \
          </div> \
          <div> \
            Select one Axiom to be removed of each set: \
            <div class="col ml-1"> \
              <input type="checkbox" class="form-check-input" id="crowd-tools-repair-explanations-propagate-' + self.id + '" checked> \
              <label class="form-check-label" for="crowd-tools-repair-explanations-propagate-' + self.id + '"><b>Propagate Selection</b></label> \
            </div> \
            <div class="crowd-tools-repair-explanations-sets mt-2"> \
            </div> \
            <div class="text-center mt-2"> \
              <button class="btn btn-default text-secondary" id="crowd-tools-repair-explanations-cancel-' + self.id + '">Cancel</button> \
              <button class="btn btn-warning" id="crowd-tools-repair-explanations-apply-' + self.id + '">Apply</button> \
            </div> \
          </div> \
        </div>'
      );

      //event handler when click repair to open repair options
      $('#crowd-tools-repair-input-' + self.id).on('click', function () {
        //clear unsat concepts select options
        $('#crowd-tools-repair-options-concept-' + self.id).empty();
        //disable unsat concepts select
        $('#crowd-tools-repair-options-concept-' + self.id).prop('disabled', true);
        //disable call repair button
        $('#crowd-tools-repair-call-' + self.id).prop('disabled', true);

        $('#crowd-tools-repair-options-modal-' + self.id).modal('show');

        $(".tooltip").tooltip('hide');
        $(this).blur();
      });

      //event handler when click find unsat concepts
      $('#crowd-tools-repair-options-find-unsat-concepts-' + self.id).on('click', function () {
        //disable find unsat concepts button
        $('#crowd-tools-repair-options-find-unsat-concepts-' + self.id).prop('disabled', true);
        self.tools.reasoning.callReasoning({
          reasoner: "Racer",
          strategy: "alcqi",
          cards: false,
          success: function (response) {
            //clear select options
            $('#crowd-tools-repair-options-concept-' + self.id).empty();
            //disable select
            $('#crowd-tools-repair-options-concept-' + self.id).prop('disabled', true);
            //disable call repair button
            $('#crowd-tools-repair-call-' + self.id).prop('disabled', true);

            //add unsat concepts to the select
            response.reasoning['KF output']['UNSATisfiable Entity types'].forEach(function (concept) {
              $('#crowd-tools-repair-options-concept-' + self.id).append('<option>' + concept + '</option>');
            });

            //enable select and call repair button if there are unsat concepts
            if (response.reasoning['KF output']['UNSATisfiable Entity types'].length > 0) {
              $('#crowd-tools-repair-options-concept-' + self.id).prop('disabled', false);
              $('#crowd-tools-repair-call-' + self.id).prop('disabled', false);
            } else {
              alert('There are no unsatisfiable concepts in your diagram.');
            }

            //enable find unsat concepts button
            $('#crowd-tools-repair-options-find-unsat-concepts-' + self.id).prop('disabled', false);
          },
          error: function (error) {
            //enable find unsat concepts button
            $('#crowd-tools-repair-options-find-unsat-concepts-' + self.id).prop('disabled', false);

            //disable call repair button
            $('#crowd-tools-repair-call-' + self.id).prop('disabled', true);
          }
        });
      });

      //event handler when click call repair
      $('#crowd-tools-repair-call-' + self.id).on('click', function () {
        //disable call repair button
        $('#crowd-tools-repair-call-' + self.id).prop('disabled', true);

        self.tools.repair.callRepair({
          reasoner: $('#crowd-tools-repair-options-reasoner-' + self.id + ' option:selected').val(),
          entity: $('#crowd-tools-repair-options-concept-' + self.id + ' option:selected').val(),
          maxExplanations: $('#crowd-tools-repair-options-maxexplain-' + self.id).val() || 5,
          timeout: 120000,
          success: function (response) {
            //preserve repair response
            self.tools.repair.response = response;

            //call open explanations window
            self.tools.repair.openExplanationsWindow(response);

            $('#crowd-tools-repair-options-modal-' + self.id).modal('hide');

            //enable call repair button
            $('#crowd-tools-repair-call-' + self.id).prop('disabled', false);
          },
          error: function (error) {
            //enable call repair button
            $('#crowd-tools-repair-call-' + self.id).prop('disabled', false);
          }
        })
      });

      //event handler when click cancel button in explanations window
      $('#crowd-tools-repair-explanations-cancel-' + self.id).on('click', function () {
        //hide explanations window
        $('.crowd-tools-repair-explanations-container').addClass('d-none');

        //clear marks
        self.repairing.clearMark();
      });

      //event handler when click apply button in explanations window
      $('#crowd-tools-repair-explanations-apply-' + self.id).on('click', function () {
        //hide explanations window
        $('.crowd-tools-repair-explanations-container').addClass('d-none');

        //get all selected axioms in each explanations set
        let selectedAxioms = [];
        $('input[name^="crowd-tools-repair-explanations-set-' + self.id + '-"]:checked').each(function () {
          selectedAxioms.push({
            explanation: $(this).attr('data-explanation'),
            axiom: $(this).attr('data-axiom')
          });
        });

        //call repair interpretation for the specific conceptual model
        self.fromRepairApply(self.tools.repair.response, selectedAxioms);
      });
    }
    self.tools.repair.init();

    //activate bootstrap nested dropdowns for tools tools
    $('#crowd-tools-tools-btn-' + self.id).bootnavbar({});

    //blur on hide
    $('#crowd-tools-tools-btn-' + self.id).on('hide.bs.dropdown', function () {
      $('#crowd-tools-tools-dropdown-' + self.id).blur();
    });
  }
  self.tools.tools.init();

  //tools help
  self.tools.help.init = function () {
    //append edit dropdown for all tools related tools
    $('#crowd-tools-menu-' + self.id).append(
      '<div class="btn-group dropdown" id="crowd-tools-help-btn-' + self.id + '"> \
        <button class="btn btn-adaptive dropdown-toggle" type="button" id="crowd-tools-help-dropdown-' + self.id + '" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> \
          <i class="fa fa-fw fa-question"></i> Help \
        </button> \
        <ul class="dropdown-menu" aria-labelledby="crowd-tools-help-dropdown-' + self.id + '"></ul> \
      </div>'
    );

    //tutorials tool
    self.tools.tutorials.init = function () {
      //append dom for tutorials tool
      $('[aria-labelledby="crowd-tools-help-dropdown-' + self.id + '"]').append(
        '<li> \
          <span class="d-block" data-toggle="tooltip" data-placement="right" title="Video Tutorials List"> \
            <button class="dropdown-item" id="crowd-tools-help-tutorials-input-' + self.id + '"> \
            <i class="fa fa-fw fa-youtube"></i> Tutorials</button> \
          </span> \
        </li>'
      );

      //append dom for the tutorials modal
      // $('body').append(
      //   '<div id="crowd-tools-help-tutorials-modal-' + self.id + '" class="modal fade"> \
      //     <div class="modal-dialog modal-dialog-scrollable modal-lg"> \
      //       <div class="modal-content"> \
      //         <div class="modal-header"> \
      //           <h5 class="modal-title">Tutorials</h5> \
      //           <button type="button" class="close" data-dismiss="modal" aria-label="Close"> \
      //             <span aria-hidden="true">&times;</span> \
      //           </button> \
      //         </div> \
      //         <iframe width="560" height="315" src="https://www.youtube.com/embed/yfkr0LOHrL4" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> \
      //         <div class="modal-footer"> \
      //           <button type="button" class="btn btn-default" data-dismiss="modal">Close</button> \
      //         </div> \
      //       </div> \
      //     </div> \
      //   </div>'
      // );

      //event handler when click tutorials
      $('#crowd-tools-help-tutorials-input-' + self.id).on('click', function () {
        // $('#crowd-tools-help-tutorials-modal-' + self.id).modal('show');
        if (self.config?.ngFiles?.tutorials?.modal) {
          $('#' + self.config.ngFiles.tutorials.modal).modal('show');
        }

        $(".tooltip").tooltip('hide');
        $(this).blur();
      });
    }
    self.tools.tutorials.init();

    //about tool
    self.tools.about.init = function () {
      //append dom for about tool
      $('[aria-labelledby="crowd-tools-help-dropdown-' + self.id + '"]').append(
        '<li> \
          <span class="d-block" data-toggle="tooltip" data-placement="right" title="About crowd tool and team"> \
            <button class="dropdown-item" id="crowd-tools-help-about-input-' + self.id + '"> \
            <i class="fa fa-fw fa-info"></i> About <span class="crowd-font lg">crowd</span></button> \
          </span> \
        </li>'
      );

      //append dom for the about modal
      $('body').append(
        '<div id="crowd-tools-help-about-modal-' + self.id + '" class="modal fade"> \
          <div class="modal-dialog modal-dialog-scrollable modal-sm"> \
            <div class="modal-content"> \
              <div class="modal-header"> \
                <h5 class="modal-title"><i class="fa fa-fw fa-info"></i> About <span class="crowd-font lg">crowd</span></h5> \
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"> \
                  <span aria-hidden="true">&times;</span> \
                </button> \
              </div> \
              <div class="modal-body"> \
                <p><span class="crowd-font lg">crowd</span> 2.0 tool was developed by a collaborative work of students, professors and researchers of UNComa, UNS and CONICET.</p> \
                <br > \
                <p class="text-muted">Realeased under the terms of the GNU General Public License</p> \
              </div> \
              <div class="modal-footer"> \
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button> \
              </div> \
            </div> \
          </div> \
        </div>'
      );

      //event handler when click about
      $('#crowd-tools-help-about-input-' + self.id).on('click', function () {
        $('#crowd-tools-help-about-modal-' + self.id).modal('show');

        $(".tooltip").tooltip('hide');
        $(this).blur();
      });
    }
    self.tools.about.init();
  }
  self.tools.help.init();

  //zoom tool
  self.tools.zoom.init = function () {
    //function to set zoom and adjust controllers
    self.tools.zoom.set = function (value) {
      //set new zoom value
      self.workspace.zoom = value;

      //fit paper with the new zoom setted
      self.workspace.fitPaper();

      //change zoom label percentage
      $('#crowd-tools-zoom-label-' + self.id).html((value * 100) + "%");
    }

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
      self.tools.zoom.set(this.value / 100);
    });
  }
  self.tools.zoom.init();

  //grid size tool
  self.tools.gridSize.init = function () {
    //function to set grid size and adjust controllers
    self.tools.gridSize.set = function (value) {
      //set new grid size value
      self.workspace.gridSize = value;

      //set grid size of paper
      self.workspace.paper.setGridSize(value);

      //change grid size label value
      $('#crowd-tools-grid-size-label-' + self.id).html(value);
    }

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
      self.tools.gridSize.set(this.value);
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
  //the zoom of paper is initially 100%
  self.workspace.zoom = 1;
  //the grid size is initially 10
  self.workspace.gridSize = 10;
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
    gridSize: self.workspace.gridSize,
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
    validateConnection: function (cellViewS, magnetS, cellViewT, magnetT, end, linkView) {
      //it allows connect links with other links
      //in the future this function needs to be more restrictive
      return true;
    }
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

  self.workspace.clearGraph = function () {
    self.workspace.graph.getCells().forEach(function (cell) {
      cell.remove();
    });
  }

  this.initChangeAttributesEvents();

  this.initElementsToolsViews();

  this.initLinksToolsViews();

  //function to render the tools of a element view (may be used for update in case of change element type)
  self.workspace.renderElementTools = function (elementView) {
    if (elementView.model.attributes.enableTools == null || elementView.model.attributes.enableTools) {
      self.workspace.paper.hideTools();
      var toolsView = self.workspace.tools.elements.elementsToolsView[elementView.model.attributes.type];
      elementView.addTools(toolsView != null ? toolsView : self.workspace.tools.elements.elementsToolsView.basic);
      elementView.showTools();
    }
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
    var offsetWidth = $('#crowd-workspace-' + self.id).width() > $('#crowd-workspace-paper-' + self.id).width() ? 0 : 50;
    var widthToFit = $('#crowd-workspace-' + self.id).width() > $('#crowd-workspace-paper-' + self.id).width()
      ? $('#crowd-workspace-' + self.id).width()
      : $('#crowd-workspace-paper-' + self.id).width();
    var offsetHeight = $('#crowd-workspace-' + self.id).height() > $('#crowd-workspace-paper-' + self.id).height() ? 0 : 50;
    var heightToFit = $('#crowd-workspace-' + self.id).height() > $('#crowd-workspace-paper-' + self.id).height()
      ? $('#crowd-workspace-' + self.id).height()
      : $('#crowd-workspace-paper-' + self.id).height();
    $('#crowd-workspace-' + self.id).scrollLeft(($('#crowd-workspace-scrollable-' + self.id).width() - widthToFit) / 2 - offsetWidth);
    $('#crowd-workspace-' + self.id).scrollTop(($('#crowd-workspace-scrollable-' + self.id).height() - heightToFit) / 2 - offsetHeight);
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
          opacity: config.attributes?.circle?.opacity != null ? config.attributes?.circle?.opacity : '0.7'
        },
        attributes: {
          r: config.attributes?.circle?.r != null ? config.attributes?.circle?.r : 10,
          cx: config.attributes?.circle?.cx != null ? config.attributes?.circle?.cx : 0,
          cy: config.attributes?.circle?.cy != null ? config.attributes?.circle?.cy : -10,
          fill: config.background != null ? config.background : 'black',
          cursor: config.attributes?.circle?.cursor != null ? config.attributes?.circle?.cursor : 'pointer'
        }
      },
      //draw the icon with the material icons of google
      //https://material.io/resources/icons
      {
        tagName: 'text',
        className: 'material-icons crowd-workspace-tools-icon',
        style: {
          'font-size': config.attributes?.text?.fontSize ? config.attributes?.text?.fontSize : '14px'
        },
        attributes: {
          x: config.attributes?.text?.x != null ? config.attributes?.text?.x : -7,
          y: config.attributes?.text?.y != null ? config.attributes?.text?.y : -3,
          fill: config.attributes?.text?.color != null ? config.attributes?.text?.color : 'white',
          cursor: config.attributes?.text?.cursor != null ? config.attributes?.text?.cursor : 'pointer',
          title: config.tooltip?.title != null ? config.tooltip?.title : '',
          'data-toggle': "tooltip",
          'data-placement': config.tooltip?.placement != null ? config.tooltip?.placement : 'top'
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
        link.source({
          id: this.model.id,
          ...config.link?.port ? { port: config.link.port } : {},
          ...config.link?.magnet ? { magnet: config.link.magnet } : {},
        });

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

        //to put links behind elements
        link.toBack();

        //enumerate the uri of the new link to differentiate it from others
        if (self.config.enumerate) {
          link.prop('uri', link.prop('uri') + '-' + self.enumerate.getNumber(link));
        }

        //set specific enumerations defined in element
        self.enumerate.setEnumerations(link);

        //change specific props of the link if they are defined
        if (config.link && config.link.props) {
          for (let prop in config.link.props) {
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

      //fix for the case it has been type changed
      clonedElement.markup = this.model.markup;
      clonedElement.attributes.attrs = $.extend(true, {}, this.model.attributes.attrs);
      clonedElement.getClassName = this.model.getClassName;

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

        //enumerate the uri of the new element to differentiate it from others
        if (self.config.enumerate) {
          newElement.prop('uri', newElement.prop('uri') + '-' + self.enumerate.getNumber(newElement));
        }

        //set specific enumerations defined in element
        self.enumerate.setEnumerations(newElement);

        //create the link of the indicated type or else basic type for connect the selected element with the new element
        var link = config.link && config.link.type ? self.palette.links[config.link.type].clone() : self.palette.links.basic.clone();

        //set the source to the selected element
        link.source({ id: this.model.id });

        //set the target to the new element
        link.target({ id: newElement.id });

        //add link to the graph
        self.workspace.graph.addCell(link);

        //enumerate the uri of the new link to differentiate it from others
        if (self.config.enumerate) {
          link.prop('uri', link.prop('uri') + '-' + self.enumerate.getNumber(link));
        }

        //set specific enumerations defined in element
        self.enumerate.setEnumerations(link);

        //change specific props of the link if they are defined
        if (config.link && config.link.props) {
          for (let prop in config.link.props) {
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
        config.maxSize = config.maxSize ? config.maxSize : { width: 500, height: 500 };
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
          newSize.width = newSize.width + addSize.width > config.minSize.width
            && newSize.width + addSize.width < config.maxSize.width
            ? newSize.width + addSize.width : newSize.width;
          newSize.height = newSize.height + addSize.height > config.minSize.height
            && newSize.height + addSize.height < config.maxSize.height
            ? newSize.height + addSize.height : newSize.height;

          //restrict new size to a multiple of grid size to simulate snap to grid effect
          if (config.snapGrid || config.snapGrid == null) {
            // var gridSize = self.workspace.paper.options.gridSize / self.workspace.paper.scale().sx;
            var gridSize = self.workspace.paper.options.gridSize;
            newSize.width = Math.round(newSize.width / gridSize) * gridSize > config.minSize.width
              && Math.round(newSize.width / gridSize) * gridSize < config.maxSize.width
              ? Math.round(newSize.width / gridSize) * gridSize : newSize.width;
            newSize.height = Math.round(newSize.height / gridSize) * gridSize > config.minSize.height
              && Math.round(newSize.height / gridSize) * gridSize < config.maxSize.height
              ? Math.round(newSize.height / gridSize) * gridSize : newSize.height;
          }

          //resize the view to the new size calculated in the correpondiente direction of resizing
          elementView.model.resize(newSize.width, newSize.height, { direction: config.direction });

          //re-set name for wrap it to the new size
          if (elementView.model.prop('name'))
            elementView.model.trigger('change:name', elementView.model, elementView.model.prop('name'));
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

  self.workspace.tools.links.linkTool = function (config) {
    return new joint.linkTools.Button({
      focusOpacity: 1,
      distance: config.distance != null ? config.distance : '50%',
      offset: config.offset != null ? config.offset : 0,
      action: function (evt, linkView, buttonView) {
        console.log('linkTool', this, { evt, linkView, buttonView });
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

        //enumerate the uri of the new link to differentiate it from others
        if (self.config.enumerate) {
          link.prop('uri', link.prop('uri') + '-' + self.enumerate.getNumber(link));
        }

        //set specific enumerations defined in element
        self.enumerate.setEnumerations(link);

        //change specific props of the link if they are defined
        if (config.link && config.link.props) {
          for (let prop in config.link.props) {
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
      markup: config.markup != null ? config.markup :
        self.workspace.tools.elements.markup({
          icon: 'call_made', tooltip: { title: 'Click and drag to connect the object', placement: "top" },
          attributes: {
            circle: { cy: 0, opacity: 1 },
            text: { x: -7, y: 7 }
          }
        })
    });
  }

  self.workspace.tools.links.linkRoleTool = function (config) {
    return new joint.linkTools.Button({
      focusOpacity: 1,
      distance: config.distance != null ? config.distance : '25%',
      offset: config.offset != null ? config.offset : 0,
      action: function (evt, linkView, buttonView) {
        console.log('linkRoleTool', this, { evt, linkView, buttonView });
        //create the link
        var link = config.link && config.link.type ? self.palette.links[config.link.type].clone() : self.palette.links.basic.clone();

        //set the source to the correspondiet port for the target role
        console.log(this.model.ports, config.role)
        link.source({ id: this.model.ports[config.role].id });

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

        //enumerate the uri of the new link to differentiate it from others
        if (self.config.enumerate) {
          link.prop('uri', link.prop('uri') + '-' + self.enumerate.getNumber(link));
        }

        //set specific enumerations defined in element
        self.enumerate.setEnumerations(link);

        //change specific props of the link if they are defined
        if (config.link && config.link.props) {
          for (let prop in config.link.props) {
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
      markup: config.markup != null ? config.markup :
        self.workspace.tools.elements.markup({
          icon: 'call_made', tooltip: { title: 'Click and drag to connect the object', placement: "top" },
          attributes: {
            circle: { cy: 0, opacity: 1 },
            text: { x: -7, y: 7 }
          }
        })
    });
  }

  self.workspace.tools.links.linkRolePort = function (config) {
    var fakePort = new joint.shapes.basic.Circle({
      type: "role",
      uri: config.uri,
      role: config.role,
      enableTools: false,
      size: { width: 15, height: 15 },
      layoutIgnore: true
    });
    self.workspace.graph.addCell(fakePort);

    var fakePortView = fakePort.findView(self.workspace.paper);
    fakePortView.setInteractivity(false);
    fakePort.toFront();

    config.link.embed(fakePort);
    config.link.ports[config.role] = fakePort;

    var parentView = config.link.findView(self.workspace.paper);
    self.workspace.paper.on('render:done', function (evt, b, c, d, e) {
      if (parentView) {
        var labelPoint = parentView.getLabelCoordinates(config.position ? config.position : { distance: 0.25, offset: 0 });
        fakePort.position(labelPoint.x - fakePort.size().width / 2, labelPoint.y - fakePort.size().height / 2);
      }
    });
  }

  //save basic tools array
  self.workspace.tools.links.basic = function () {
    return [
      new joint.linkTools.Vertices(),
      new joint.linkTools.Segments(),
      new joint.linkTools.TargetArrowhead(), //second position of the _toolsView.tools array of the linkView
      new joint.linkTools.SourceArrowhead(),
      new joint.linkTools.TargetAnchor(),
      new joint.linkTools.SourceAnchor(),
      new joint.linkTools.Boundary(),
      new joint.linkTools.Remove({ distance: 20 })
    ]
  };

  //create tools view for basic links
  self.workspace.tools.links.linksToolsView['basic'] = function () {
    return new joint.dia.ToolsView({
      name: 'link-basic-tools',
      tools: self.workspace.tools.links.basic()
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
              <input class="form-check-input" type="checkbox" value="" id="crowd-inspector-content-' + attribute.elementID + '-' + self.id + '"> \
              <label class="form-check-label" for="crowd-inspector-content-' + attribute.elementID + '-' + self.id + '">' + attribute.label + '</label> \
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
              <input class="form-check-input" type="radio" name="crowd-inspector-content-' + attribute.elementID + '-' + self.id + '" \
              id="crowd-inspector-content-' + attribute.elementID + '-' + value.value + '-' + self.id + '" value="' + value.value + '"> \
              <label class="form-check-label" for="crowd-inspector-content-' + attribute.elementID + '-' + value.value + '-' + self.id + '">' + value.label + '</label> \
            </div>'
          );
        });
        break;
      case 'select':
        dom = $('<span class="row"> \
          <div class="col"> \
            <div class="form-group"> \
              ' + (attribute.label ? '<label>' + attribute.label + '</label><br>' : '') + '\
              <select class="custom-select custom-select-sm" id="crowd-inspector-content-' + attribute.elementID + '-' + self.id + '"> \
              </select> \
            </div> \
          </div> \
        </span>');
        attribute.values.forEach(function (value) {
          $(dom).find('select').append(
            '<option value="' + value.value + '">' + value.label + '</option>'
          );
        });
        break;
      case 'alert':
        dom = $((attribute.label ? '<label>' + attribute.label + '</label>' : '') + ' \
          <div class="alert alert-' + (attribute.color ? attribute.color : 'dark') + '" role="alert" \
          id="crowd-inspector-content-' + attribute.elementID + '-' + self.id + '"></div>');
        break;
      case 'object':
        dom = $('<span class="row"> \
          <div class="col"> \
            <div class="form-group" id="crowd-inspector-parameters-' + attribute.elementID + '-' + self.id + '"> \
              ' + (attribute.label ? '<label>' + attribute.label + '</label><br>' : '') + '\
            </div> \
          </div> \
        </span>');
        attribute.parameters.forEach(function (parameter) {
          //change parameter data with their parent references
          parameter.container = attribute.elementID;
          parameter.parentProperty = attribute.property + (attribute.index !== '' ? '/' + attribute.index : '');
          parameter.index = '';
          parameter.elementID = formatSelector(parameter.container + '-' + parameter.property + '-' + parameter.index);
          parameter.propertyPath =
            (parameter.parentProperty !== '' ? parameter.parentProperty + '/' : '') +
            parameter.property +
            (parameter.index !== '' ? '/' + parameter.index : '');
          //add the dom of each parameter to the attribute dom
          $(dom).find('#crowd-inspector-parameters-' + attribute.elementID + '-' + self.id)
            .append(self.inspector._makeAttributeDom(parameter));
        });
        break;
      case 'list':
        dom = $('<span class="row"> \
          <div class="form-group"> \
            ' + (attribute.label ? '<label>' + attribute.label + '</label>' : '') + '\
            <div class="form-group" id="crowd-inspector-content-elements-' + attribute.elementID + '-' + self.id + '"></div> \
            <div class="text-center"> \
              <button class="btn btn-primary" id="crowd-inspector-content-add-' + attribute.elementID + '-' + self.id + '" \
              data-toggle="tooltip" data-original-title="Add element" data-placement="top"><i class="fa fa-fw fa-plus"></i></button> \
            </div> \
          </div> \
        </span>');
        break;
      case 'uri':
        dom = $('<span class="row"> \
            <div class="col"> \
              <div class="form-group"> \
                ' + (attribute.label ? '<label>' + attribute.label + '</label>' : '') + ' \
                <select class="custom-select custom-select-sm" id="crowd-inspector-content-namespace-' + attribute.elementID + '-' + self.id + '" \
                placeholder="Namespace"> \
                </select> \
                <' + (attribute.input == 'textarea' ? 'textarea rows="' + (attribute.inputRows ? attribute.inputRows : 3) + '"' : 'input type="text"') + ' \
                placeholder="Fragment" class="form-control" id="crowd-inspector-content-fragment-' + attribute.elementID + '-' + self.id + '" /> \
              </div> \
            </div> \
          </span>');
        if (attribute.values) {
          attribute.values.forEach(function (value) {
            $(dom).find('select').append(
              '<option value="' + value.value + '">' + value.label + '</option>'
            );
          });
        } else {
          console.log("namespaces", self.config.ngComponent.namespaces);
          $(dom).find('select').append(
            '<option value="' + self.config.defaultNamespace + '" title="' + self.config.defaultNamespace + '" selected>crowd</option>'
          );
          self.config.ngComponent.namespaces.forEach(function (namespace) {
            $(dom).find('select').append(
              '<option value="' + namespace.url + '" title="' + namespace.url + '">' + namespace.prefix + '</option>'
            );
          });
          self.inspector._setAttribute(attribute);
        }
        break;
      case 'text': default:
        dom = $('<span class="row"> \
          <div class="col"> \
            <div class="form-group"> \
              ' + (attribute.label ? '<label>' + attribute.label + '</label>' : '') + ' \
              <' + (attribute.input == 'textarea' ? 'textarea rows="' + (attribute.inputRows ? attribute.inputRows : 3) + '"' : 'input type="text"') + ' \
              placeholder="' + (attribute.placeholder ? attribute.placeholder : attribute.label) + '" \
              class="form-control" id="crowd-inspector-content-' + attribute.elementID + '-' + self.id + '" /> \
            </div> \
          </div> \
        </span>');
        break;
    }

    if (attribute.canRemove) {
      $(dom).append(
        '<div class="col-2"> \
          <button class="btn btn-danger"  id="crowd-inspector-content-remove-' + attribute.elementID + '-' + self.id + '" \
          data-toggle="tooltip" data-original-title="Remove element" data-placement="top"><i class="fa fa-fw fa-minus"></i></button> \
        </div>'
      );
    }

    var jumpLine;
    if (attribute.container == '')
      jumpLine = $('<hr>');

    return dom.add(jumpLine);
  }

  //append an specified attribute to the content dom element
  self.inspector.addAttribute = function (attribute) {
    //check if attribute is inside a container else assign a empty string for selector usage
    attribute.container = attribute.container != null ? attribute.container : '';
    attribute.parentProperty = attribute.parentProperty != null ? attribute.parentProperty : '';
    attribute.index = attribute.index != null ? attribute.index : '';
    //compound the element ID for the actual attribute
    attribute.elementID = formatSelector(attribute.container + '-' + attribute.property + '-' + attribute.index);
    //compound the property path of the attribute with the parentProperty, property and index
    attribute.propertyPath =
      (attribute.parentProperty !== '' ? attribute.parentProperty + '/' : '') +
      attribute.property +
      (attribute.index !== '' ? '/' + attribute.index : '');

    //append dom element to the inspector content
    if (attribute.container != '')
      $('#crowd-inspector-content-elements-' + formatSelector(attribute.container) + '-' + self.id).append(self.inspector._makeAttributeDom(attribute));
    else
      $('#crowd-inspector-' + self.id + ' .crowd-inspector-content').append(self.inspector._makeAttributeDom(attribute));

    self.inspector._setAttribute(attribute);

    if (attribute.canRemove) {
      $('#crowd-inspector-content-remove-' + attribute.elementID + '-' + self.id).on('click', function () {
        var newValue = self.inspector.model.prop(attribute.property).slice();
        newValue.splice(attribute.index, 1);
        self.inspector.model.prop(attribute.property, null);
        self.inspector.model.prop(attribute.property, newValue);
        console.log('remove', attribute.property, newValue);
        self.inspector.loadContent();
        $(".tooltip").tooltip('hide');
      });
    }

    self.inspector._setEventAttribute(attribute);

    attribute.parameters?.forEach(function (parameter) {
      self.inspector._setEventAttribute(parameter);
    });

    $('[data-toggle="tooltip"]').tooltip({ html: true });
  }

  //set the dom input value with the property value according to the attribute type
  self.inspector._setAttribute = function (attribute) {
    //get the property value and map it in case that a map is defined
    var propertyValue = attribute.map
      ? Object.keys(attribute.map).find(key =>
        attribute.map[key] == self.inspector.model.prop(attribute.propertyPath)
      )
      : self.inspector.model.prop(attribute.propertyPath);

    switch (attribute.type) {
      case 'boolean':
        $('#crowd-inspector-content-' + attribute.elementID + '-' + self.id).prop("checked", propertyValue == 'true');
        break;
      case 'multiple':
        $('#crowd-inspector-content-' + attribute.elementID + '-' + propertyValue + '-' + self.id).prop("checked", true);
        break;
      case 'alert':
        if (propertyValue.title && propertyValue.contents) {
          propertyValue =
            '<b>' + propertyValue.title + '</b><br>' +
            '<ul><li>' + propertyValue.contents.map(function (content) { return content.text ? content.text : (content.value ? content.value : content) }).join('</li><li>') + '</li>';
        }
        $('#crowd-inspector-content-' + attribute.elementID + '-' + self.id).html(propertyValue);
        break;
      case 'object':
        attribute.parameters.forEach(function (parameter) {
          self.inspector._setAttribute(parameter);
        });
        break;
      case 'list':
        if (propertyValue) {
          for (var i = 0; i < propertyValue.length; i++) {
            self.inspector.addAttribute($.extend({}, attribute.template, {
              container: attribute.elementID,
              property: attribute.property + (attribute.index !== '' ? '/' + attribute.index : ''),
              index: i,
              canRemove: true
            }));
          }
          $('#crowd-inspector-content-add-' + attribute.elementID + '-' + self.id).on('click', function () {
            // self.inspector.addAttribute($.extend({}, attribute.template, {
            //   container: attribute.elementID,
            //   property: attribute.property + (attribute.index !== '' ? '/' + attribute.index : ''),
            //   index: self.inspector.model.prop(attribute.property).length,
            //   canRemove: true
            // }));
            self.inspector.model.prop(attribute.property + '/' + self.inspector.model.prop(attribute.property).length, (attribute.default ? attribute.default : ''));
            self.inspector.loadContent();
            $(".tooltip").tooltip('hide');
          });
        }
        break;
      case 'uri':

        namespace = propertyValue && propertyValue != "" ? getURINamespace(propertyValue) : getURINamespace(attribute.default);
        fragment = propertyValue && propertyValue != "" ? getURIFragment(propertyValue) : getURIFragment(attribute.default);
        foundedNamespace = namespace == self.config.defaultNamespace || self.config.ngComponent.namespaces.find(ns => ns.url == namespace) != null;

        console.log("namespaces/namespace/founded", self.config.ngComponent.namespaces, namespace, fragment, foundedNamespace);

        if (!foundedNamespace) {
          $('#crowd-inspector-content-namespace-' + attribute.elementID + '-' + self.id).append(
            '<option value="' + namespace + '" title="' + namespace + '">' + namespace + '</option>'
          );
        }

        $('#crowd-inspector-content-fragment-' + attribute.elementID + '-' + self.id).prop('disabled', !foundedNamespace);
        $('#crowd-inspector-content-namespace-' + attribute.elementID + '-' + self.id).prop('disabled', !foundedNamespace);

        $('#crowd-inspector-content-namespace-' + attribute.elementID + '-' + self.id).val(namespace);
        $('#crowd-inspector-content-fragment-' + attribute.elementID + '-' + self.id).val(fragment);
        break;
      case 'text': default:
        $('#crowd-inspector-content-' + attribute.elementID + '-' + self.id).val(propertyValue);
        //restrict space characters on text field
        $('#crowd-inspector-content-' + attribute.elementID + '-' + self.id).on({
          keydown: function (e) {
            if (e.which === 32 || e.which === 13)
              return false;
          },
          change: function () {
            this.value = this.value.replace(/\s/g, "");
          }
        });
        break;
    }
  }

  //set event when the input is modified that change the model property value by the user input
  self.inspector._setEventAttribute = function (attribute) {
    //need to clone the object because event would be attached to this object and it can be iterated in the caller method
    attribute = $.extend({}, attribute);
    //event when change the correspondent/s input/s to the attribute sended
    $('#crowd-inspector-content-' + attribute.elementID + '-' + self.id +
      ',[name="crowd-inspector-content-' + attribute.elementID + '-' + self.id + '"]' +
      ',#crowd-inspector-content-fragment-' + attribute.elementID + '-' + self.id +
      ',#crowd-inspector-content-namespace-' + attribute.elementID + '-' + self.id).on('keyup change', function () {
        var newPropertyValue;

        //get the dom input value according to the attribute type
        switch (attribute.type) {
          case 'boolean':
            newPropertyValue = $(this).prop('checked');
            break;
          case 'multiple':
            newPropertyValue = $('[name="crowd-inspector-content-' + attribute.elementID + '-' + self.id + '"]:checked').val();
            break;
          case 'select':
            newPropertyValue = $('#crowd-inspector-content-' + attribute.elementID + '-' + self.id + ' option:selected').val();
            break;
          case 'uri':
            newPropertyValue = $('#crowd-inspector-content-namespace-' + attribute.elementID + '-' + self.id + ' option:selected').val() +
              $('#crowd-inspector-content-fragment-' + attribute.elementID + '-' + self.id).val();
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
        self.inspector.model.prop(attribute.propertyPath, newPropertyValue == "null" ? null : newPropertyValue);
      });
  }

  self.inspector.loadContent = function () {
    self.config.ngComponent[self.config.ngFiles.namespaces.get](false, (error) => {
      if (self.inspector.model) {
        //get focused element and their caret position
        if ($(document.activeElement).prop('tagName') == 'TEXTAREA' ||
          ($(document.activeElement).prop('tagName') == 'INPUT' && $(document.activeElement).prop('type') == 'text')) {
          self.inspector.lastFocus = {
            elem: $(document.activeElement).attr('id'),
            caret: {
              start: document.activeElement.selectionStart,
              end: document.activeElement.selectionEnd
            }
          };
        }

        //toggle the content on
        self.inspector.toggleContent(true);

        //make the title with the name of the element or link
        $('#crowd-inspector-' + self.id + ' .crowd-inspector-title').html(
          self.inspector.model.attributes.label ? self.inspector.model.attributes.label : formatString(self.inspector.model.attributes.type)
        );

        //clear attributes of the lastest model
        self.inspector.clearAttributes();

        //call initialization of inspector for the specific conceptual model

        self.config.conceptualModel.initInspector(self);

        if (self.inspector.lastFocus && $("#" + self.inspector.lastFocus.elem)[0]) {
          //set focus on last element if it exist
          $("#" + self.inspector.lastFocus.elem).focus();
          //set caret in the last position
          setSelectionRange($("#" + self.inspector.lastFocus.elem)[0], self.inspector.lastFocus.caret.start, self.inspector.lastFocus.caret.end);
          //reset last focus
          self.inspector.lastFocus = null;
        }
      }
    });
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

  self.workspace.graph.on('add remove', function () {
    self.inspector.hideInformation();
    self.workspace.linkClickedFlag = false;
    self.workspace.paper.hideTools();
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
      color: $('#crowd-map-' + self.id).css("background-color"),
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
  // self.workspace.graph.clear();
  self.workspace.clearGraph()

  //call the function to load a json schema for the specific conceptual model
  self.config.conceptualModel.fromJSONSchema(self, schema);

  //hide tools
  self.workspace.linkClickedFlag = false;
  self.workspace.paper.hideTools();

  //trigger events on after finish from schema
  if (self.events.onAfterFromSchema && Array.isArray(self.events.onAfterFromSchema)) {
    //call all events registered
    self.events.onAfterFromSchema.forEach(function (event) { event() });
    //clear the events
    self.events.onAfterFromSchema = [];
  }
}

CrowdEditor.prototype.initSyntaxValidator = function () {
  var self = this;

  //initialize syntax validator objects
  self.syntax = {};
  self.syntax.events = [];

  //call initialization of syntax validator for the specific conceptual model
  self.config.conceptualModel.initSyntaxValidator(self);

  if (self.syntax.validateCell) {
    //call validation on connect or disconnect elements
    self.workspace.paper.on('link:connect link:disconnect', function (linkView, evt, cellDisconnected) {
      console.log(linkView, cellDisconnected);
      self.syntax.validateCell(linkView.model);
      self.syntax.validateCell(cellDisconnected.model);
    });

    //call validation on add cells, remove cells or every specific event configured
    self.workspace.graph.on('add remove ' + $.map(self.syntax.events, function (e) { return 'change:' + e }).join(' '), function (cell) {
      self.syntax.validateCell(cell);
      if (cell.isLink()) {
        var sourceCell = self.workspace.graph.getCell(cell.attributes.source.id);
        var targetCell = self.workspace.graph.getCell(cell.attributes.target.id);
        if (sourceCell) self.syntax.validateCell(sourceCell);
        if (targetCell) self.syntax.validateCell(targetCell);
      }
    });
  }
}

CrowdEditor.prototype.initReasoningValidator = function () {
  var self = this;

  self.reasoning = {}

  //clear semantic attribute of all cells
  self.reasoning.clearMark = function () {
    self.workspace.graph.getCells().forEach(function (cell) {
      cell.prop('semantic', { title: 'Semantic Deductions', contents: [] });
    });
  };

  //undo new inferred cells and clear semantic attributes
  self.reasoning.undoSemantic = function () {
    self.workspace.graph.getCells().forEach(function (cell) {
      if (cell.prop('semantic/contents')?.some(function (e) { return e.value == 'inferred' && e.inferredType != 'cardinality' })) {
        cell.remove();
      } else {
        cell.prop('semantic', { title: 'Semantic Deductions', contents: [] });
      }
    });
  };

  //generic method for put semantic attributes on cells with a resoner response
  self.reasoning.genericMark = function (reasoning) {
    //call clear reasoning marks
    self.reasoning.clearMark();

    //mark all unsatisfiable cells with the reasoning response
    var unsatCells = reasoning['KF output']['UNSATisfiable Entity types'].concat(reasoning['KF output']['UNSATisfiable Roles']);
    unsatCells.forEach(function (uri) {
      var cell = self.workspace.graph.getCells().find(function (cell) {
        return cell.prop('uri') == uri;
      });

      cell?.prop('semantic/contents/' + cell.prop('semantic/contents').length, { value: 'unsatisfiable', text: '<span class="crowd-unsat-color"><b>Unsatisfiable</b></span>' });
    });

    //mark all inferred subsumptions cells with the reasoning response
    var subsumptionsCells = reasoning['KF output']['Subsumptions'];
    subsumptionsCells.forEach(function (uri) {
      var cell = self.workspace.graph.getCells().find(function (cell) {
        return cell.prop('uri') == uri;
      });

      cell?.prop('semantic/contents/' + cell.prop('semantic/contents').length, { value: 'inferred', text: '<span class="crowd-inferred-color"><b>Inferred Subsumption</b></span>' });
      if (cell?.isElement()) {
        self.workspace.graph.getConnectedLinks(cell).forEach(function (link) {
          link.prop('semantic/contents/' + link.prop('semantic/contents').length, { value: 'inferred', text: '<span class="crowd-inferred-color"><b>Inferred Subsumption</b></span>' });
        });
      }
    });

    //mark all inferred cardinalities with the reasoning response
    var cardinalitiesInferred = reasoning['KF output']['Object types cardinalities'];
    cardinalitiesInferred.forEach(function (card) {
      var kfRole = reasoning['KF']['Role'].find(function (kfRole) {
        return kfRole['object type cardinality'].includes(card);
      });

      var cell = self.workspace.graph.getCells().find(function (cell) {
        return cell.prop('uri') == kfRole.relationship;
      });

      cell?.prop('semantic/contents/' + cell.prop('semantic/contents').length,
        { inferredType: 'cardinality', value: 'inferred', text: '<span class="crowd-inferred-color"><b>Inferred Cardinality for role </b><i>' + kfRole.rolename + '</i></span>' }
      );
    });

    //message to show for each owl axiom
    var owlAxiomsMessagesMap = {
      'Disjoint Class Axioms': 'Disjoint with',
      'Disjoint DataProperty Axioms': 'Disjoint with',
      'Disjoint ObjectProperty Axioms': 'Disjoint with',
      'Equivalent Class Axioms': 'Equivalent with',
      'Equivalent DataProperty Axioms': 'Equivalent with',
      'Equivalent ObjectProperty Axioms': 'Equivalent with',
    };

    //mark all owl axioms on the cells with the reasoning response
    $.each(reasoning['OWL Axioms'], function (axiom, axiomPairs) {
      axiomPairs.forEach(function (uris) {
        var cells = [];
        cells[0] = self.workspace.graph.getCells().find(function (cell) {
          return cell.prop('uri') == uris[0];
        });
        cells[1] = self.workspace.graph.getCells().find(function (cell) {
          return cell.prop('uri') == uris[1];
        });

        if (cells[0] && cells[1] && !unsatCells.find(function (cell) { return cell == cells[0].prop('uri') || cell == cells[1].prop('uri') })) {
          cells[0]?.prop('semantic/contents/' + cells[0]?.prop('semantic/contents').length, owlAxiomsMessagesMap[axiom] + ' <b>' + fromURI(uris[1]) + '</b>');
          if (owlAxiomsMessagesMap[axiom] == 'Equivalent with')
            cells[1]?.prop('semantic/contents/' + cells[1]?.prop('semantic/contents').length, owlAxiomsMessagesMap[axiom] + ' <b>' + fromURI(uris[0]) + '</b>');
        }
      });
    });
  };

  self.reasoning.importPositionedSchema = function (schema) {
    console.log('reasoned schema', schema);
    // var positionedSchema = $.extend(true, self.toJSONSchema(), schema);
    var positionedSchema = self.config.conceptualModel.positioningJSONSchema(schema, self.toJSONSchema());
    console.log('positioned reasoned schema', positionedSchema);
    self.tools.import.importFrom({ model: self.config.conceptualModel.name, schema: positionedSchema, file: self.config.actualFile, forced: true });
  }

  //call initialization of reasoning validator for the specific conceptual model
  self.config.conceptualModel.initReasoningValidator(self);
}

CrowdEditor.prototype.initRepairingTools = function () {
  var self = this;

  //initialize repairing tools objects
  self.repairing = {};

  //define function for return the specific type names from the conceptual model
  //this function must be overloaded in the specific conceptual model
  self.repairing.typeName = function (type) {
    var specificType;
    switch (type) {
      case 'SubsumptionLink':
        specificType = 'generalization';
        break;
      case 'SubsumptionElement':
        specificType = 'inheritance';
        break;
      case 'DisjointObjectTypeElement':
        specificType = 'inheritance';
        break;
    }
    return specificType;
  }

  //define a function for remove disjoint of a cell, it needs to be implemented in the specific conceptual model
  self.repairing.removeDisjoint = function (cell) {
    cell.prop('subtype', 'overlaped');
  }

  //define functions to return type names of each

  //clear repairing attribute of all cells
  self.repairing.clearMark = function () {
    self.workspace.graph.getCells().forEach(function (cell) {
      cell.prop('repairing', { title: 'Repairing', contents: [] });
    });
  }

  //generic method for put repairing attributes on cells with a repair response, a selected explanation and a selected axiom
  self.repairing.genericRepairMark = function (repair, selectedAxioms) {
    //call clear repairing marks
    self.repairing.clearMark();

    //mark all cells for the selected axioms as "remove" or "restrict" (for the disjoint constraints)
    selectedAxioms.forEach(function (selectedAxiom) {
      //get selected axiom mapped entity
      var mappedEntity = repair['TBoxMap'][repair['Explanations'][selectedAxiom.explanation][selectedAxiom.axiom]];

      self.repairing.findCellsByAxiom(repair, mappedEntity).forEach(function (cell) {
        //if the cell is marked as "keep" then conserve their mark
        //unless the axiom selected was a disjoint constraint then add the "restrict" mark
        if (mappedEntity.split('@')[0] != 'DisjointObjectType') {
          if (!cell.prop('repairing/contents')?.some(function (e) { return e.value == 'keep' })) {
            cell.prop('repairing', { title: 'Repairing', contents: [] });
            cell.prop('repairing/contents/' + cell.prop('repairing/contents').length, { value: 'remove', text: '<span class="crowd-repairing-remove-color"><b>It will be removed if Repair is applied.</b></span>' });
          }
        } else {
          cell.prop('repairing', { title: 'Repairing', contents: [] });
          cell.prop('repairing/contents/' + cell.prop('repairing/contents').length, { value: 'restrict', text: '<span class="crowd-repairing-restrict-color"><b>It will be kept if Repair is applied but the Disjoint restriction were removed.</b></span>' });
        }
        //send cell to front (for the case it's graphically overlapped with another one)
        cell.toFront();
      });
    });

    //for the rest of cells in the graph that are not marked as "remove" or "restrict" mark them as "keep"
    self.workspace.graph.getCells().forEach(function (cell) {
      if (!cell.prop('repairing/contents') || cell.prop('repairing/contents').length == 0) {
        cell.prop('repairing/contents/' + cell.prop('repairing/contents').length, { value: 'keep', text: '<span class="crowd-repairing-keep-color"><b>It will be kept if Repair is applied.</b></span>' });
      }
    });
  }

  // method to find cell or cells associated to a axiom given from TBoxMap, and using KF and workspace graph
  self.repairing.findCellsByAxiom = function (repair, mappedAxiom) {
    //get entity type and name base on the mapped entity string (e.g. "Subsumption@c167_HWjZ")
    var entityType = mappedAxiom.split('@')[0];
    var entityName = mappedAxiom.split('@')[1];

    //get entity from response kf based on type and name
    var entity;
    switch (entityType) {
      case 'Subsumption':
        entity = repair['KF']['Relationship']['Subsumption'].find(function (subsumption) {
          return subsumption['name'] == entityName;
        });
        break;
      case 'DisjointObjectType':
        entity = repair['KF']['Constraints']['Disjointness constraints']['Disjoint object type'].find(function (disjointClasses) {
          return disjointClasses['name'] == entityName;
        });
        break;
    }

    //get cells from graph based on entity type and entities associated
    var cells = [];
    switch (entityType) {
      case 'Subsumption':
        //find the link cell that is the subsumption link or the element that is the subsumption element with their two links
        //use the kf entity child and parent uris to find the cells
        var childCell = self.workspace.graph.getCells().find(function (cell) {
          return cell.prop('uri') == entity['entity child'];
        });
        var parentCell = self.workspace.graph.getCells().find(function (cell) {
          return cell.prop('uri') == entity['entity parent'];
        });

        cells[0] = self.workspace.graph.getConnectedLinks(childCell).find(function (link) {
          return link.prop('source').id == childCell.id && link.prop('target').id == parentCell.id && link.prop('type') == self.repairing.typeName(entityType + "Link");
        });

        if (cells[0] == null) {
          //if the link cell is not found then find the element cell that is the subsumption element with their two links
          self.workspace.graph.getConnectedLinks(childCell).forEach(function (link) {
            if (link.prop('type') == self.repairing.typeName(entityType + "Link")) {
              var subsumptionElement = link.prop('source').id == childCell.id
                ? self.workspace.graph.getCell(link.prop('target').id)
                : self.workspace.graph.getCell(link.prop('source').id);

              var connectedLinksSubsumptionElement = self.workspace.graph.getConnectedLinks(subsumptionElement);
              connectedLinksSubsumptionElement.forEach(function (sublink) {
                if (sublink.prop('type') == self.repairing.typeName(entityType + "Link")) {
                  if ((sublink.prop('source').id == subsumptionElement.id && sublink.prop('target').id == parentCell.id)
                    || (sublink.prop('target').id == subsumptionElement.id && sublink.prop('source').id == parentCell.id)) {
                    // if the inheritance has more than two links, then it connects others entities too, so we need to only mark the child connector link
                    if (connectedLinksSubsumptionElement.length <= 2) {
                      cells[0] = link;
                      cells[1] = subsumptionElement;
                      cells[2] = sublink;
                    } else {
                      cells[0] = link;
                    }
                  }
                }
              });
            }
          });
        }
        break;
      case 'DisjointObjectType':
        //for each disjoint classes entities get the cell that is the disjoint element between them
        var disjointEntitiesCells = [];
        entity.entities.forEach(function (entity) {
          disjointEntitiesCells.push(self.workspace.graph.getCells().find(function (cell) {
            return cell.prop('uri') == entity;
          }));
        });

        //for each disjoint element cell get the link that is the disjoint link between them
        self.workspace.graph.getConnectedLinks(disjointEntitiesCells[0]).forEach(function (link) {
          //check if the link connects with a disjoint element cell
          var disjointElementCell = link.prop('source').id == disjointEntitiesCells[0].id
            ? self.workspace.graph.getCell(link.prop('target').id)
            : self.workspace.graph.getCell(link.prop('source').id);

          if (disjointElementCell.prop('type') == self.repairing.typeName(entityType + "Element")) {
            //check if the disjoint element cell is connected with the other entities
            var disjointElementCellConnected = true;
            for (var i = 1; i < disjointEntitiesCells.length; i++) {
              var cellConnectionToDisjoint = self.workspace.graph.getConnectedLinks(disjointEntitiesCells[i]).find(function (link) {
                return (link.prop('source').id == disjointEntitiesCells[i].id && link.prop('target').id == disjointElementCell.id)
                  || (link.prop('target').id == disjointEntitiesCells[i].id && link.prop('source').id == disjointElementCell.id);
              });
              disjointElementCellConnected = disjointElementCellConnected && cellConnectionToDisjoint;
              if (!disjointElementCellConnected) break;
            }

            if (disjointElementCellConnected) {
              cells[1] = disjointElementCell;
            }
          }
        });

        break;
    }

    return cells;
  }

  //generic method for apply repairing on cells, using the marks on the cells
  self.repairing.genericRepairApply = function () {
    //get all cells that are marked as "remove" and remove them
    self.workspace.graph.getCells().forEach(function (cell) {
      if (cell.prop('repairing/contents')?.some(function (e) { return e.value == 'remove' })) {
        cell.remove();
      }
    });

    //get all cells that are marked as "restrict" and remove the disjoint constraint (based on the specific conceptual model)
    self.workspace.graph.getCells().forEach(function (cell) {
      if (cell.prop('repairing/contents')?.some(function (e) { return e.value == 'restrict' })) {
        self.repairing.removeDisjoint(cell);
      }
    });

    //clear marks
    self.repairing.clearMark();
  }

  //generic method for highlight axiom cells when the mouse is over the axiom on the repairing panel
  self.repairing.genericHighlightAxiom = function (repair, selectedAxiom) {
    //remove highlighted to all highlighted cells
    self.workspace.graph.getCells().forEach(function (cell) {
      if (cell.prop('highlighted'))
        cell.prop('highlighted', false);
    });

    //get selected axiom mapped entity
    var mappedEntity = repair['TBoxMap'][repair['Explanations'][selectedAxiom.explanation][selectedAxiom.axiom]];

    //get cells from graph based on entity type and entities associated
    var cells = self.repairing.findCellsByAxiom(repair, mappedEntity);

    //highlight cells
    cells.forEach(function (cell) {
      cell.prop('highlighted', true);
    });
  }

  //call initialization of repairing tools for the specific conceptual model
  self.config.conceptualModel.initRepairingTools(self);
}

CrowdEditor.prototype.fromReasoning = function (schema, reasoning) {
  var self = this;

  //call the function to do the semantic marks with the resoner response for the specific conceptual model
  //it can do use of generic mark function
  self.config.conceptualModel.fromReasoning(self, schema, reasoning);
}

CrowdEditor.prototype.fromRepairMark = function (repair, selectedAxioms) {
  var self = this;

  //call the function to do the repairing marks for the specific conceptual model
  //it can do use of generic mark function
  self.config.conceptualModel.fromRepairMark(self, repair, selectedAxioms);
}

CrowdEditor.prototype.fromRepairApply = function (repair, selectedAxioms) {
  var self = this;

  //call the function to do apply repairing for the specific conceptual model
  //it can do use of generic repairing apply function
  self.config.conceptualModel.fromRepairApply(self, repair, selectedAxioms);
}

CrowdEditor.prototype.toBase64 = function (options, callback) {
  var self = this;

  if (!options) options = {};
  if (!options.format) options.format = "png";

  var canvasContainer = options.miniature ? '#crowd-map-paper-' + self.id : '#crowd-workspace-paper-' + self.id

  if (options.miniature) {
    html2canvas($(canvasContainer)[0]).then(function (canvas) {
      callback(canvas.toDataURL("image/png"));
    });
  } else {
    var previousValues = {};
    if (!options.miniature) {
      previousValues.zoom = self.workspace.zoom;
      previousValues.gridSize = self.workspace.gridSize;

      if (!options.useZoom) self.tools.zoom.set(1);
      if (!options.useGrid) self.tools.gridSize.set(1);
      $(canvasContainer).css({ boxShadow: 'none' });

      self.workspace.paper.hideTools();
      self.inspector.hideInformation();
    }

    html2canvas($(canvasContainer)[0]).then(function (canvas) {
      options.format = "image/" + (options.format != 'pdf' ? options.format : 'jpeg');
      if (options.onlyContent) {
        var content = self.workspace.paper.getContentBBox();
        canvas = cropCanvas(canvas,
          content.x - self.workspace.paperPadding, content.y - self.workspace.paperPadding,
          content.width + self.workspace.paperPadding * 2, content.height + self.workspace.paperPadding * 2);
      }
      callback(canvas.toDataURL(options.format));

      self.tools.zoom.set(previousValues.zoom);
      self.tools.gridSize.set(previousValues.gridSize);
      $(canvasContainer).css({ boxShadow: getCSS('box-shadow', 'crowd-workspace-paper') });
    });
  }
}

CrowdEditor.prototype.hasChanges = function () {
  var self = this;
  return self.workspace.graph.getElements().length > 0;
}
