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
    self.config.conceptualModel.initPalette = () => console.warn("CrowdEditor conceptual model palette is not defined.");
  }
  if (!self.config.conceptualModel.initElementsToolsViews) {
    self.config.conceptualModel.initElementsToolsViews = () => console.warn("CrowdEditor conceptual model elements tools views are not defined.");
  }
  if (!self.config.conceptualModel.initLinksToolsViews) {
    self.config.conceptualModel.initLinksToolsViews = () => console.warn("CrowdEditor conceptual model links tools views are not defined.");
  }
  if (!self.config.conceptualModel.initChangeAttributesEvents) {
    self.config.conceptualModel.initChangeAttributesEvents = () => console.warn("CrowdEditor conceptual model change attributes events are not defined.");
  }
  if (!self.config.conceptualModel.initInspector) {
    self.config.conceptualModel.initInspector = () => console.warn("CrowdEditor conceptual model inspector is not defined.");
  }

  $("#" + this.config.selector).html('');

  //append dom element that contains all the editor parts
  $('#' + self.config.selector).append('<div class="crowd-container row" id="crowd-container-' + self.id + '"></div>');

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
}

CrowdEditor.prototype.initPalette = function () {
  var self = this;

  //set palette width with config values
  $('#crowd-palette-' + self.id).css('width', self.config.palette.grid.size * self.config.palette.grid.columns + 1);

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
    };

    flyPaper.scale(self.workspace.paper.scale().sx);
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
      if ((x > target.left && x < target.left + self.workspace.paper.$el.width() && y > target.top && y < target.top + self.workspace.paper.$el.height()) &&
        !(x > origin.left && x < origin.left + self.palette.paper.$el.width() && y > origin.top && y < origin.top + self.palette.paper.$el.height())) {
        var s = flyShape.clone();
        var p = self.workspace.paper.clientToLocalPoint(e.clientX, e.clientY);
        s.position(p.x - (s.attributes.size.width / 2), p.y - (s.attributes.size.height / 2));
        self.workspace.graph.addCell(s);
      }
      $('body').off('mousemove.fly').off('mouseup.fly');
      flyShape.remove();
      $('#crowd-flypaper-' + flyid).remove();
    });
  });
}

CrowdEditor.prototype.initTools = function () {
  var self = this;

  //append dom row for the tools elements
  $('#crowd-tools-' + self.id).append('<span class="row" id="crowd-tools-row-' + self.id + '"></span>');

  //append dom for zoom tool
  $('#crowd-tools-row-' + self.id).append(
    '<div class="form-group"> \
      <label>Zoom</label> \
      <label id="crowd-tools-zoom-label-' + self.id + '" style="float: right">100%</label> \
      <input class="form-control-range" id="crowd-tools-zoom-input-' + self.id + '" type="range" min="50" max="200" step="25" value="100" /> \
    </div>'
  );

  //event handler when change zoom
  //updates zoom label and change scale of the workspace paper
  $('#crowd-tools-zoom-input-' + self.id).on('input', function () {
    $('#crowd-tools-zoom-label-' + self.id).html(this.value + "%");
    self.workspace.paper.scale(this.value / 100);
  });

  //append dom for grid size tool
  $('#crowd-tools-row-' + self.id).append(
    '<div class="form-group"> \
      <label>Grid Size</label> \
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
  });

  //append dom for export tool
  $('#crowd-tools-row-' + self.id).append(
    '<div class="form-group"> \
      <div class="dropdown"> \
        <button class="btn btn-primary dropdown-toggle" type="button" id="crowd-tools-export-dropdown-' + self.id + '" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> \
          <i class="fa fa-cloud-download"></i> Export \
        </button> \
        <div class="dropdown-menu" aria-labelledby="crowd-tools-export-dropdown-' + self.id + '"> \
          <div class="btn-group dropdown-item" role="group"> \
            <button class="btn" id="crowd-tools-export-eer-schema-' + self.id + '">EER Schema</button> \
            <button class="btn" id="crowd-tools-export-check-eer-schema-' + self.id + '" \
            data-toggle="tooltip" data-original-title="Show schema" data-placement="right"> \
            <i class="fa fa-eye"></i></button> \
          </div> \
          <button class="dropdown-item" id="crowd-tools-export-uml-schema-' + self.id + '" disabled>UML Schema</button> \
          <button class="dropdown-item" id="crowd-tools-export-orm-schema-' + self.id + '" disabled>ORM Schema</button> \
        </div> \
      </div> \
    </div>'
  );

  //event handler when click export eer schema
  $('#crowd-tools-export-eer-schema-' + self.id).on('click', function () {
    $("<a />", {
      "download": "eer-schema.json",
      "href": "data:application/json;charset=utf-8," + encodeURIComponent(JSON.stringify(self.toJSONSchema())),
    }).appendTo("body")
      .click(function () {
        $(this).remove()
      })[0].click()
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
          </div> \
        </div> \
      </div> \
    </div>'
  );

  //init copy clipboard functionality
  new ClipboardJS('.btn');

  //event handler when click export check eer schema
  $('#crowd-tools-export-check-eer-schema-' + self.id).on('click', function () {
    $('#crowd-tools-export-check-schema-modal-' + self.id + ' .modal-title').html("EER Schema");
    $('#crowd-tools-export-check-schema-modal-' + self.id + ' .modal-body pre').html(JSON.stringify(self.toJSONSchema(), null, 4));
    $('#crowd-tools-export-check-schema-modal-' + self.id).modal('show');
    // copyToClipboard('#crowd-tools-export-check-schema-modal-' + self.id + ' .modal-body pre');
  });

  //append dom for change conceptual model tool
  $('#crowd-tools-row-' + self.id).append(
    '<div class="form-group"> \
  <div class="dropdown"> \
    <button class="btn btn-danger dropdown-toggle" type="button" id="crowd-tools-model-dropdown-' + self.id + '" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> \
      <i class="fa fa-th"></i> Model \
    </button> \
    <div class="dropdown-menu" aria-labelledby="crowd-tools-export-dropdown-' + self.id + '"> \
      <button class="dropdown-item" name="crowd-tools-model-input-' + self.id + '" data-model="uml" ' + (self.config.conceptualModel.name == 'uml' ? 'disabled' : '') + '>UML</button> \
      <button class="dropdown-item" name="crowd-tools-model-input-' + self.id + '" data-model="eer" ' + (self.config.conceptualModel.name == 'eer' ? 'disabled' : '') + '>EER</button> \
    </div> \
  </div> \
</div>'
  );

  //append dom for the advertisement modal when try clear workspace
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
          <button id="crowd-tools-model-advertisement-proceed-' + self.id + '" \
          type="button" class="btn btn-danger" data-dismiss="modal">Proceed</button> \
        </div> \
      </div> \
    </div> \
  </div>'
  );

  //event handler when click model change that open advertisement modal
  $('[name=crowd-tools-model-input-' + self.id + "]").on('click', function () {
    $('#crowd-tools-model-advertisement-' + self.id).modal('show');
    $('#crowd-tools-model-advertisement-proceed-' + self.id).attr('data-model', $(this).attr('data-model'));
    $(".tooltip").tooltip('hide');
  });

  //event handler when click proceed button in advertisement for model change
  $('#crowd-tools-model-advertisement-proceed-' + self.id).on('click', function () {
    console.log("/editor/" + $(this).attr('data-model'));
    window.location.href = "/editor/" + $(this).attr('data-model');
  });

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
    $('#crowd-tools-clear-workspace-advertisement-' + self.id).modal('show');
    $(".tooltip").tooltip('hide');
  });

  //event handler when click proceed button in advertisement for clear workspace
  $('#crowd-tools-clear-workspace-advertisement-proceed-' + self.id).on('click', function () {
    self.workspace.graph.clear();
    $(".tooltip").tooltip('hide');
  });

  $('[data-toggle="tooltip"]').tooltip({ html: true });
}

CrowdEditor.prototype.initWorkspace = function () {
  var self = this;

  //initialize workspace objects
  self.workspace = new Object();
  self.workspace.tools = new Object();
  self.workspace.tools.elements = new Object();
  self.workspace.tools.links = new Object();


  //add joint graph to workspace
  self.workspace.graph = new joint.dia.Graph();

  //add joint paper to workspace
  self.workspace.paper = new joint.dia.Paper({
    el: $('#crowd-workspace-' + self.id)[0],
    width: '100%',//$('#crowd-workspace-' + self.id).width(),
    height: '100%',//$('#crowd-workspace-' + self.id).height(),
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

  //this will contain the start position in the workspace paper when user drag it
  self.workspace.dragStartPosition = null;

  //event for save start position of dragging of the workspace paper
  self.workspace.paper.on('blank:pointerdown', function (event, x, y) {
    self.workspace.dragStartPosition = {
      x: x * self.workspace.paper.scale().sx,
      y: y * self.workspace.paper.scale().sy
    };
  });

  //event for clear the drag start position for drag workspace paper
  self.workspace.paper.on('cell:pointerup blank:pointerup', function () {
    self.workspace.dragStartPosition = null;
  });

  //event for drag workspace paper with the drag start position saved previously
  $('#crowd-workspace-' + self.id).mousemove(function (event) {
    if (self.workspace.dragStartPosition)
      self.workspace.paper.translate(
        event.originalEvent.layerX - self.workspace.dragStartPosition.x,
        event.originalEvent.layerY - self.workspace.dragStartPosition.y);
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

        //place it at mouse position
        link.target({
          x: (evt.originalEvent.layerX - self.workspace.paper.translate().tx) / self.workspace.paper.scale().sx,
          y: (evt.originalEvent.layerY - self.workspace.paper.translate().ty) / self.workspace.paper.scale().sy
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

        //create tools view for the new link (is a bag of tools)
        var linkToolsView = self.workspace.tools.links.linksToolsView[linkView.model.attributes.type];

        //add tools to the link view
        linkView.addTools(linkToolsView != null ? linkToolsView() : self.workspace.tools.links.linksToolsView.basic());

        //simulate pointerdown event (mousedown) over the dom element of the link tool "TargetArrowhead"
        var clickEvent = document.createEvent('MouseEvents');
        clickEvent.initMouseEvent('mousedown', true, true, evt.view, evt.detail, evt.screenX, evt.screenY, evt.clientX, evt.clientY, null, null, null, null, null, new EventTarget('marker-arrowhead'));
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

      //place it at mouse position
      clonedElement.attributes.position = {
        x: (evt.originalEvent.layerX - self.workspace.paper.translate().tx) / self.workspace.paper.scale().sx - (clonedElement.attributes.size.width / 2),
        y: (evt.originalEvent.layerY - self.workspace.paper.translate().ty) / self.workspace.paper.scale().sy - (clonedElement.attributes.size.height / 2)
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

        //place it at mouse position
        newElement.attributes.position = {
          x: (evt.originalEvent.layerX - self.workspace.paper.translate().tx) / self.workspace.paper.scale().sx - (newElement.attributes.size.width / 2),
          y: (evt.originalEvent.layerY - self.workspace.paper.translate().ty) / self.workspace.paper.scale().sy - (newElement.attributes.size.height / 2)
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

        //get link view of the new link in the workspace paper
        var linkView = link.findView(self.workspace.paper);

        //create tools view for the new link (is a bag of tools)
        var linkToolsView = self.workspace.tools.links.linksToolsView[linkView.model.attributes.type];

        //add tools to the link view
        linkView.addTools(linkToolsView != null ? linkToolsView() : self.workspace.tools.links.linksToolsView.basic());

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
          addSize.width = addSize.width / self.workspace.paper.scale().sx;
          addSize.height = addSize.height / self.workspace.paper.scale().sy;

          //create object for the newSize and check if new width and height are bigger than min sizes individually
          var newSize = { width: elementView.model.size().width, height: elementView.model.size().height };
          newSize.width = newSize.width + addSize.width > config.minSize.width ? newSize.width + addSize.width : newSize.width;
          newSize.height = newSize.height + addSize.height > config.minSize.height ? newSize.height + addSize.height : newSize.height;

          //restrict new size to a multiple of grid size to simulate snap to grid effect
          if (config.snapGrid || config.snapGrid == null) {
            var gridSize = self.workspace.paper._gridSettings[0].width / self.workspace.paper.scale().sx;
            newSize.width = Math.round(newSize.width / gridSize) * gridSize;
            newSize.height = Math.round(newSize.height / gridSize) * gridSize;
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
        self.inspector.model.prop(attribute.property + (attribute.index !== '' ? '/' + attribute.index : ''), newPropertyValue);
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

  //add joint paper to map
  self.map.paper = new joint.dia.Paper({
    el: $('#crowd-map-' + self.id)[0],
    width: '100%',
    height: '200px',
    model: self.workspace.graph,
    gridSize: 1,
    background: {
      color: $('#crowd-map-' + self.id).css("background-color")
    },
    interactive: false
  });

  //scale the map paper to see a mini map of the workspace
  self.map.paper.scale(0.1);

  //this will contain the start position in the map paper when user drag it
  self.map.dragStartPosition = null;

  //event for save start position of dragging of the map paper
  self.map.paper.on('blank:pointerdown', function (event, x, y) {
    self.map.dragStartPosition = {
      x: x * self.map.paper.scale().sx,
      y: y * self.map.paper.scale().sy
    };
  });

  //event for clear the drag start position for drag map paper
  self.map.paper.on('cell:pointerup blank:pointerup', function () {
    self.map.dragStartPosition = null;
  });

  //event for drag map paper with the drag start position saved previously
  $('#crowd-map-' + self.id).mousemove(function (event) {
    if (self.map.dragStartPosition)
      self.map.paper.translate(
        event.originalEvent.layerX - self.map.dragStartPosition.x,
        event.originalEvent.layerY - self.map.dragStartPosition.y);
  });
}

CrowdEditor.prototype.toJSONSchema = function () {
  var self = this;

  //define basic structure of eer json according to schema
  var jsonSchema = {
    entities: [],
    attributes: [],
    relationships: [],
    links: []
  };

  //mapping of datatypes to the requested format of schema
  var datatypeMap = {
    'varchar': 'String',
    'char': 'String',
    'int': 'Integer',
    'bit': 'Boolean'
  }

  //mapping of cardinalities to the requested format of schema
  var cardinalityMap = {
    '1': '1..1',
    'N': '1..*'
  }

  var inheritanceSubtypeMap = {
    'disjoint': 'disjoint',
    'overlaped': 'overlapping',
    'union': 'union'
  }

  //iterates each element and add it to the correspondent collection
  self.workspace.graph.getElements().forEach(function (element) {
    switch (element.attributes.parentType) {
      case 'entity':
        jsonSchema.entities.push({
          id: element.cid,
          uri: element.attributes.uri,
          name: element.attributes.uri,
          isWeak: element.attributes.type == 'weakEntity',
          position: element.attributes.position,
          size: element.attributes.size,
        });
        break;
      case 'attribute':
        jsonSchema.attributes.push({
          id: element.cid,
          uri: element.attributes.uri,
          name: element.attributes.uri,
          type: element.attributes.type,
          datatype: datatypeMap[element.attributes.datatype],
          position: element.attributes.position,
          size: element.attributes.size,
        });
        //create the link for this attribute
        var attributeLink = {
          id: element.cid,
          uri: element.attributes.uri,
          name: element.attributes.uri,
          entity: null,
          attribute: element.attributes.uri,
          type: 'attribute'
        }
        //search for links connected to the attribute for add entity to attribute link
        self.workspace.graph.getConnectedLinks(element).forEach(function (link) {
          var connectedEntity = link.attributes.source.id != element.id
            ? link.getSourceElement()
            : (link.attributes.target.id != element.id
              ? link.getTargetElement()
              : null);
          if (connectedEntity) {
            attributeLink.entity = connectedEntity.attributes.uri;
          }
        });
        jsonSchema.links.push(attributeLink);
        break;
      case 'relationship':
        jsonSchema.relationships.push({
          id: element.cid,
          uri: element.attributes.uri,
          name: element.attributes.uri,
          isWeak: element.attributes.type == 'weakRelationship',
          position: element.attributes.position,
          size: element.attributes.size,
        });
        //create the link for this relationship
        var relationshipLink = {
          id: element.cid,
          uri: element.attributes.uri,
          name: element.attributes.uri,
          entities: [],
          cardinality: [],
          roles: [],
          type: 'relationship'
        }
        //search for links connected to the relationship for add entities to relationship link
        self.workspace.graph.getConnectedLinks(element).forEach(function (link) {
          var connectedEntity = link.attributes.source.id != element.id && link.getSourceElement().attributes.parentType == 'entity'
            ? link.getSourceElement()
            : (link.attributes.target.id != element.id && link.getTargetElement().attributes.parentType == 'entity'
              ? link.getTargetElement()
              : null);
          if (connectedEntity) {
            relationshipLink.entities.push(connectedEntity.attributes.uri);
            relationshipLink.roles.push(connectedEntity.attributes.uri);
            relationshipLink.cardinality.push(cardinalityMap[link.attributes.cardinality]);
          }
        });
        jsonSchema.links.push(relationshipLink);
        break;
      case 'inheritance':
        //create the link for this inheritance
        var inheritanceLink = {
          id: element.cid,
          uri: element.attributes.uri,
          name: element.attributes.uri,
          parent: null,
          entities: [],
          constraint: [
            inheritanceSubtypeMap[element.attributes.subtype]
          ],
          type: 'isa'
        }
        //search for links connected to the relationship for add entities to relationship link
        self.workspace.graph.getConnectedLinks(element).forEach(function (link) {
          var connectedEntity = link.attributes.source.id != element.id && link.getSourceElement().attributes.parentType == 'entity'
            ? link.getSourceElement()
            : (link.attributes.target.id != element.id && link.getTargetElement().attributes.parentType == 'entity'
              ? link.getTargetElement()
              : null);
          if (connectedEntity) {
            if (!link.attributes.cardinality) {
              inheritanceLink.parent = connectedEntity.attributes.uri;
              if (link.attributes.total) {
                inheritanceLink.constraint.push('exclusive');
              }
            }
            else {
              inheritanceLink.entities.push(connectedEntity.attributes.uri);
            }
          }
        });
        jsonSchema.links.push(inheritanceLink);
        break;
    }
  });

  return jsonSchema;
}
