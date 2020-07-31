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
  self.palette.colors = {
    entity: getCSS('color', 'crowd-entity-color'),
    weakEntity: getCSS('color', 'crowd-weak-entity-color'),
    relationship: getCSS('color', 'crowd-relationship-color'),
    weakRelationship: getCSS('color', 'crowd-weak-relationship-color'),
    attribute: getCSS('color', 'crowd-attribute-color'),
    multivaluedAttribute: getCSS('color', 'crowd-multivalued-attribute-color'),
    keyAttribute: getCSS('color', 'crowd-key-attribute-color'),
    weakKeyAttribute: getCSS('color', 'crowd-weak-key-attribute-color'),
    inheritance: getCSS('color', 'crowd-inheritance-color'),
    derivedAttribute: getCSS('color', 'crowd-derived-attribute-color')
  }

  //add joint eer entity to palette elements
  self.palette.elements.entity = new joint.shapes.erd.Entity({
    parentType: 'entity',
    type: 'entity',
    name: 'Entity',
    uri: 'http://crowd.fi.uncoma.edu.ar#Entity',
    attrs: {
      text: {
        fill: 'white',
        class: 'crowd-element-text'
      },
      '.outer': {
        fill: self.palette.colors.entity,
        stroke: self.palette.colors.entity
      },
      '.inner': {
        fill: self.palette.colors.entity,
        stroke: self.palette.colors.entity
      }
    },
    size: {
      width: 80,
      height: 40
    }
  });

  //add joint eer weak entity to palette elements
  self.palette.elements.weakEntity = new joint.shapes.erd.Entity({
    parentType: 'entity',
    type: 'weakEntity',
    name: 'Weak\nEntity',
    uri: 'http://crowd.fi.uncoma.edu.ar#WeakEntity',
    attrs: {
      text: {
        text: 'Weak\nEntity',
        fill: 'white',
        class: 'crowd-element-text'
      },
      '.outer': {
        fill: 'none',
        stroke: self.palette.colors.weakEntity,
      },
      '.inner': {
        fill: self.palette.colors.weakEntity,
        stroke: self.palette.colors.weakEntity,
        display: 'auto'
      }
    },
    size: {
      width: 80,
      height: 40
    }
  });

  //add joint eer relationship to palette elements
  self.palette.elements.relationship = new joint.shapes.erd.Relationship({
    parentType: 'relationship',
    type: 'relationship',
    name: 'Relationship',
    uri: 'http://crowd.fi.uncoma.edu.ar#Relationship',
    attrs: {
      text: {
        fill: 'white',
        class: 'crowd-element-text s'
      },
      '.outer': {
        fill: self.palette.colors.relationship,
        stroke: self.palette.colors.relationship
      },
      '.inner': {
        fill: self.palette.colors.relationship,
        stroke: self.palette.colors.relationship
      }
    },
    size: {
      width: 80,
      height: 60
    }
  });

  //add joint eer weak relationship to palette elements
  self.palette.elements.weakRelationship = new joint.shapes.erd.Relationship({
    parentType: 'relationship',
    type: 'weakRelationship',
    name: 'Weak\nRelationship',
    uri: 'http://crowd.fi.uncoma.edu.ar#WeakRelationship',
    attrs: {
      text: {
        text: 'Weak\nRelationship',
        fill: 'white',
        class: 'crowd-element-text s'
      },
      '.outer': {
        fill: 'none',
        stroke: self.palette.colors.weakRelationship
      },
      '.inner': {
        fill: self.palette.colors.weakRelationship,
        stroke: self.palette.colors.weakRelationship,
        display: 'auto'
      }
    },
    size: {
      width: 80,
      height: 60
    }
  });

  //add joint eer key attribute to palette elements
  self.palette.elements.keyAttribute = new joint.shapes.erd.Attribute({
    parentType: 'attribute',
    type: 'keyAttribute',
    name: 'Key\nAttribute',
    uri: 'http://crowd.fi.uncoma.edu.ar#KeyAttribute',
    datatype: 'int',
    attrs: {
      text: {
        fill: 'white',
        text: 'Key\nAttribute',
        class: 'crowd-element-text xs key-attribute'
      },
      '.outer': {
        fill: self.palette.colors.keyAttribute,
        stroke: self.palette.colors.keyAttribute
      }
    },
    size: {
      width: 60,
      height: 40
    }
  });

  //add joint eer weak key attribute to palette elements
  self.palette.elements.weakKeyAttribute = new joint.shapes.erd.Attribute({
    parentType: 'attribute',
    type: 'weakKeyAttribute',
    name: 'Weak Key\nAttribute',
    uri: 'http://crowd.fi.uncoma.edu.ar#WeakKeyAttribute',
    datatype: 'int',
    attrs: {
      text: {
        fill: 'white',
        text: 'Weak Key\nAttribute',
        class: 'crowd-element-text xs weak-key-attribute'
      },
      '.outer': {
        fill: self.palette.colors.weakKeyAttribute,
        stroke: self.palette.colors.weakKeyAttribute,
      }
    },
    size: {
      width: 60,
      height: 40
    }
  });

  //add joint eer attribute to palette elements
  self.palette.elements.attribute = new joint.shapes.erd.Attribute({
    parentType: 'attribute',
    type: 'attribute',
    name: 'Attribute',
    uri: 'http://crowd.fi.uncoma.edu.ar#Attribute',
    datatype: 'int',
    attrs: {
      text: {
        fill: 'white',
        text: 'Attribute',
        class: 'crowd-element-text xs'
      },
      '.outer': {
        fill: self.palette.colors.attribute,
        stroke: self.palette.colors.attribute
      }
    },
    size: {
      width: 60,
      height: 40
    }
  });

  //add joint eer multivalued attribute to palette elements
  self.palette.elements.multivaluedAttribute = new joint.shapes.erd.Attribute({
    parentType: 'attribute',
    type: 'multivaluedAttribute',
    name: 'Multivalued\nAttribute',
    uri: 'http://crowd.fi.uncoma.edu.ar#MultivaluedAttribute',
    datatype: 'int',
    attrs: {
      text: {
        fill: 'white',
        text: 'Multivalued\nAttribute',
        class: 'crowd-element-text xs'
      },
      '.outer': {
        fill: 'none',
        stroke: self.palette.colors.multivaluedAttribute
      },
      '.inner': {
        fill: self.palette.colors.multivaluedAttribute,
        stroke: self.palette.colors.multivaluedAttribute,
        display: 'auto'
      }
    },
    size: {
      width: 60,
      height: 40
    }
  });

  //add joint eer inheritance to palette elements
  self.palette.elements.inheritance = new joint.shapes.erd.Attribute({
    parentType: 'inheritance',
    type: 'inheritance',
    subtype: 'overlaped',
    uri: 'http://crowd.fi.uncoma.edu.ar#Inheritance',
    attrs: {
      text: {
        fill: 'white',
        text: 'o',
        class: 'crowd-element-text inheritance'
      },
      '.outer': {
        fill: self.palette.colors.inheritance,
        stroke: self.palette.colors.inheritance
      }
    },
    size: {
      width: 40,
      height: 40
    }
  });

  //add joint eer derived attribute to palette elements
  self.palette.elements.derivedAttribute = new joint.shapes.erd.Attribute({
    parentType: 'attribute',
    type: 'derivedAttribute',
    name: 'Derived\nAttribute',
    uri: 'http://crowd.fi.uncoma.edu.ar#DerivedAttribute',
    datatype: 'int',
    attrs: {
      text: {
        fill: 'white',
        text: 'Derived\nAttribute',
        class: 'crowd-element-text xs'
      },
      '.outer': {
        fill: 'none',
        stroke: self.palette.colors.derivedAttribute,
        'stroke-dasharray': '3'
      },
      '.inner': {
        fill: self.palette.colors.derivedAttribute,
        stroke: self.palette.colors.derivedAttribute,
        display: 'auto'
      }
    },
    size: {
      width: 60,
      height: 40
    }
  });

  //add joint eer connector to palette links
  self.palette.links.connector = new joint.shapes.standard.Link({
    type: 'connector',
    cardinality: null,
    total: false,
    inherit: false,
    uri: 'http://crowd.fi.uncoma.edu.ar#Connector',
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

  //add joint eer total connector to palette links
  self.palette.links.total = new joint.shapes.standard.DoubleLink({
    type: 'connector',
    cardinality: null,
    total: true,
    inherit: false,
    uri: 'http://crowd.fi.uncoma.edu.ar#Connector',
    attrs: {
      line: {
        stroke: getCSS('background-color', 'crowd-workspace'),
        sourceMarker: {},
        targetMarker: {
          'd': ''
        }
      },
      outline: {
        stroke: 'black',
        strokeWidth: 8,
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

  //add styled jump over the lines when they collides
  self.palette.links.connector.connector('jumpover', {
    size: 10
  });

  //add styled jump over the lines when they collides
  self.palette.links.total.connector('jumpover', {
    size: 10
  });

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
  $('#crowd-palette-' + self.id + " svg")[0]
    .setAttribute('height', (Object.keys(self.palette.elements).length / self.config.palette.grid.columns + 1) * self.config.palette.grid.size);

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
            <button type="button" class="btn btn-light" data-dismiss="modal">Cancel</button> \
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

  //append dom for export tool
  $('#crowd-tools-row-' + self.id).append(
    '<div class="form-group"> \
      <div class="dropdown"> \
        <button class="btn btn-primary dropdown-toggle" type="button" id="crowd-tools-export-dropdown-' + self.id + '" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> \
          <i class="fa fa-cloud-download"></i> Export \
        </button> \
        <div class="dropdown-menu" aria-labelledby="crowd-tools-export-dropdown-' + self.id + '"> \
          <button class="dropdown-item" id="crowd-tools-export-eer-schema-' + self.id + '">EER Schema</button> \
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

  $('[data-toggle="tooltip"]').tooltip({ html: true });
}

CrowdEditor.prototype.initWorkspace = function () {
  var self = this;

  //initialize workspace objects
  self.workspace = new Object();
  self.workspace.tools = new Object();

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
    var toolsView = self.workspace.tools.elementsToolsView[elementView.model.attributes.type];
    elementView.addTools(toolsView != null ? toolsView : self.workspace.tools.elementsToolsView.basic);
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
  self.workspace.tools.markup = function (config) {
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

  //add remove tool to workspace tools
  self.workspace.tools.removeTool = new joint.elementTools.Remove({
    focusOpacity: 1,
    rotate: true,
    offset: { x: -20, y: -10 },
    markup: self.workspace.tools.markup({ icon: 'clear', tooltip: { title: 'Click to remove the object', placement: "left" } })
  });

  //add link tool to workspace tools
  self.workspace.tools.linkTool = new joint.elementTools.Button({
    focusOpacity: 1,
    rotate: true,
    x: '100%',
    offset: { x: 20, y: -10 },
    action: function (evt, elementView, buttonView) {
      console.log('linkTool', this, { evt, elementView, buttonView });
      //create the link
      var link = self.palette.links.connector.clone();

      //set the source to the selected element
      link.source({ id: this.model.id });

      //place it at mouse position
      link.target({
        x: (evt.originalEvent.layerX - self.workspace.paper.translate().tx) / self.workspace.paper.scale().sx,
        y: (evt.originalEvent.layerY - self.workspace.paper.translate().ty) / self.workspace.paper.scale().sy
      });

      //add it to the graph
      self.workspace.graph.addCell(link);

      //get link view of the new link in the workspace paper
      var linkView = link.findView(self.workspace.paper);

      //create tools view for the new link (is a bag of tools)
      var linkToolsView = self.workspace.tools.linksToolsView();

      //add tools to the link view
      linkView.addTools(linkToolsView);

      //simulate pointerdown event (mousedown) over the dom element of the link tool "TargetArrowhead"
      var clickEvent = document.createEvent('MouseEvents');
      clickEvent.initMouseEvent('mousedown', true, true, evt.view, evt.detail, evt.screenX, evt.screenY, evt.clientX, evt.clientY, null, null, null, null, null, new EventTarget('marker-arrowhead'));
      linkView._toolsView.tools[3].el.dispatchEvent(clickEvent); //third position of the array correspond to "TargetArrowhead" tool
    },
    markup: self.workspace.tools.markup({ icon: 'trending_up', tooltip: { title: 'Click and drag to connect the object', placement: "right" } })
  });

  //add clone tool to workspace tools
  self.workspace.tools.cloneTool = new joint.elementTools.Button({
    focusOpacity: 1,
    rotate: true,
    x: '100%',
    y: '100%',
    offset: { x: 20, y: 30 },
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
    markup: self.workspace.tools.markup({ icon: 'content_copy', tooltip: { title: 'Click and drag to clone the object', placement: "right" } })
  });

  //add remove links tool to workspace tools
  self.workspace.tools.removeLinksTool = new joint.elementTools.Button({
    focusOpacity: 1,
    rotate: true,
    y: '100%',
    offset: { x: -20, y: 30 },
    action: function (evt, elementView, buttonView) {
      console.log('removeLinksTool', this, { evt, elementView, buttonView });

      self.workspace.graph.getConnectedLinks(elementView.model).forEach(function (connectedLink) {
        connectedLink.remove();
      });
    },
    markup: self.workspace.tools.markup({ icon: 'content_cut', tooltip: { title: 'Click to break all connections to other objects', placement: "left" } })
  });

  //add boundary tool to workspace tools
  self.workspace.tools.boundaryTool = new joint.elementTools.Boundary({
    focusOpacity: 0.5
  });

  //function for generate link element tool with a specific element type
  self.workspace.tools.linkElementTool = function (config) {
    return new joint.elementTools.Button({
      focusOpacity: 1,
      rotate: true,
      x: config.x != null ? config.x : '50%',
      y: config.y != null ? config.y : null,
      offset: config.offset != null ? config.offset : { x: -20, y: -10 },
      action: function (evt, elementView, buttonView) {
        console.log('linkAttributeTool', this, { evt, elementView, buttonView });
        //create the new element
        var newElement = config.elementType.clone();

        //place it at mouse position
        newElement.attributes.position = {
          x: (evt.originalEvent.layerX - self.workspace.paper.translate().tx) / self.workspace.paper.scale().sx - (newElement.attributes.size.width / 2),
          y: (evt.originalEvent.layerY - self.workspace.paper.translate().ty) / self.workspace.paper.scale().sy - (newElement.attributes.size.height / 2)
        };

        //add new element to the graph
        self.workspace.graph.addCell(newElement);

        //create the connector or total connector for connect the selected element with the new element
        var link = config.connector && config.connector.total ? self.palette.links.total.clone() : self.palette.links.connector.clone();

        //set the source to the selected element
        link.source({ id: this.model.id });

        //set the target to the new element
        link.target({ id: newElement.id });

        //add link to the graph
        self.workspace.graph.addCell(link);

        //change cardinality of the connector if it is defined
        if (config.connector && config.connector.cardinality) {
          link.prop('cardinality', config.connector.cardinality);
        }

        //get link view of the new link in the workspace paper
        var linkView = link.findView(self.workspace.paper);

        //create tools view for the new link (is a bag of tools)
        var linkToolsView = self.workspace.tools.linksToolsView();

        //add tools to the link view
        linkView.addTools(linkToolsView);

        //get element view of the new element in the workspace paper
        var newElementView = newElement.findView(self.workspace.paper);

        //simulate pointerdown event (mousedown) over the dom element of the element view of new element
        var clickEvent = document.createEvent('MouseEvents');
        clickEvent.initMouseEvent('mousedown', true, true, evt.view, evt.detail, evt.screenX, evt.screenY, evt.clientX, evt.clientY);
        newElementView.el.dispatchEvent(clickEvent);
      },
      markup: config.markup != null ? config.markup : self.workspace.tools.markup({ icon: 'share', tooltip: { title: 'Click and drag to make new object and connect with it', placement: "top" } })
    });
  }

  //initialize elements tools view object
  self.workspace.tools.elementsToolsView = new Object();

  //array of basic tools for all elements
  var basicTools = [
    self.workspace.tools.removeTool,
    self.workspace.tools.linkTool,
    self.workspace.tools.cloneTool,
    self.workspace.tools.removeLinksTool,
    self.workspace.tools.boundaryTool
  ];

  //create tools view for basic elements
  self.workspace.tools.elementsToolsView['basic'] = new joint.dia.ToolsView({
    name: 'basic-tools',
    tools: basicTools
  });

  //link tool for entities
  var linkEntityTool = function (config) {
    config = config ? config : {};
    return self.workspace.tools.linkElementTool({
      elementType: self.palette.elements.entity,
      x: '100%', y: '50%', offset: { x: 20, y: 10 },
      markup: self.workspace.tools.markup({
        icon: 'share',
        background: self.palette.colors.entity,
        tooltip: {
          title: 'Click and drag to make a <b class="crowd-entity-color">entity</b> and connect with it',
          placement: "right"
        }
      }),
      connector: {
        total: config.total,
        cardinality: config.cardinality
      }
    });
  };

  //link tool for weak entities
  var linkWeakEntityTool = function (config) {
    config = config ? config : {};
    return self.workspace.tools.linkElementTool({
      elementType: self.palette.elements.weakEntity,
      x: '0%', y: '50%', offset: { x: -20, y: 10 },
      markup: self.workspace.tools.markup({
        icon: 'share',
        background: self.palette.colors.weakEntity,
        tooltip: {
          title: 'Click and drag to make a <b class="crowd-weak-entity-color">weak entity</b> and connect with it',
          placement: "left"
        }
      }),
      connector: {
        total: config.total,
        cardinality: config.cardinality
      }
    });
  };

  //link tool for relationships
  var linkRelationshipTool = function (config) {
    config = config ? config : {};
    return self.workspace.tools.linkElementTool({
      elementType: self.palette.elements.relationship,
      x: '100%', y: '50%', offset: { x: 20, y: 10 },
      markup: self.workspace.tools.markup({
        icon: 'share',
        background: self.palette.colors.relationship,
        tooltip: {
          title: 'Click and drag to make a <b class="crowd-relationship-color">relationship</b> and connect with it',
          placement: "right"
        }
      }),
      connector: {
        total: config.total,
        cardinality: config.cardinality
      }
    });
  };

  //link tool for weak relationships
  var linkWeakRelationshipTool = function (config) {
    config = config ? config : {};
    return self.workspace.tools.linkElementTool({
      elementType: self.palette.elements.weakRelationship,
      x: '0%', y: '50%', offset: { x: -20, y: 10 },
      markup: self.workspace.tools.markup({
        icon: 'share',
        background: self.palette.colors.weakRelationship,
        tooltip: {
          title: 'Click and drag to make a <b class="crowd-weak-relationship-color">weak relationship</b> and connect with it',
          placement: "left"
        }
      }),
      connector: {
        total: config.total,
        cardinality: config.cardinality
      }
    })
  };

  //link tool for attributes
  var linkAttributeTool = self.workspace.tools.linkElementTool({
    elementType: self.palette.elements.attribute,
    x: '50%', offset: { x: -20, y: -10 },
    markup: self.workspace.tools.markup({
      icon: 'share',
      background: self.palette.colors.attribute,
      tooltip: {
        title: 'Click and drag to make an <b class="crowd-attribute-color">attribute</b> and connect with it',
        placement: "top"
      }
    })
  });

  //link tool for multivalued attributes
  var linkMultivaluedAttributeTool = self.workspace.tools.linkElementTool({
    elementType: self.palette.elements.multivaluedAttribute,
    x: '50%', y: '100%', offset: { x: -20, y: 30 },
    markup: self.workspace.tools.markup({
      icon: 'share',
      background: self.palette.colors.multivaluedAttribute,
      tooltip: {
        title: 'Click and drag to make a <b class="crowd-multivalued-attribute-color">multivalued attribute</b> and connect with it',
        placement: "bottom"
      }
    })
  });

  //link tool for key attributes
  var linkKeyAttributeTool = self.workspace.tools.linkElementTool({
    elementType: self.palette.elements.keyAttribute,
    x: '50%', offset: { x: 20, y: -10 },
    markup: self.workspace.tools.markup({
      icon: 'share',
      background: self.palette.colors.keyAttribute,
      tooltip: {
        title: 'Click and drag to make a <b class="crowd-key-attribute-color">key attribute</b> and connect with it',
        placement: "top"
      }
    })
  });

  //link tool for weak key attributes
  var linkWeakKeyAttributeTool = self.workspace.tools.linkElementTool({
    elementType: self.palette.elements.weakKeyAttribute,
    x: '50%', offset: { x: 20, y: -10 },
    markup: self.workspace.tools.markup({
      icon: 'share',
      background: self.palette.colors.weakKeyAttribute,
      tooltip: {
        title: 'Click and drag to make a <b class="crowd-weak-key-attribute-color">weak key attribute</b> and connect with it',
        placement: "top"
      }
    })
  });

  //link tool for inheritance
  var linkInheritanceTool = function (config) {
    config = config ? config : {};
    return self.workspace.tools.linkElementTool({
      elementType: self.palette.elements.inheritance,
      x: '50%', y: '100%', offset: { x: 20, y: 30 },
      markup: self.workspace.tools.markup({
        icon: 'share',
        background: self.palette.colors.inheritance,
        tooltip: {
          title: 'Click and drag to make a <b class="crowd-inheritance-color">inheritance</b> and connect with it',
          placement: "bottom"
        }
      }),
      connector: {
        total: config.total,
      }
    });
  }

  //create tools view for entities
  self.workspace.tools.elementsToolsView['entity'] = new joint.dia.ToolsView({
    name: 'entity-tools',
    tools: basicTools.concat([
      linkAttributeTool,
      linkKeyAttributeTool,
      linkRelationshipTool({ cardinality: '1' }),
      linkWeakRelationshipTool({ total: false, cardinality: '1' }),
      linkMultivaluedAttributeTool,
      linkInheritanceTool()
    ])
  });

  //create tools view for weak entities
  self.workspace.tools.elementsToolsView['weakEntity'] = new joint.dia.ToolsView({
    name: 'weak-entity-tools',
    tools: basicTools.concat([
      linkAttributeTool,
      linkWeakKeyAttributeTool,
      linkRelationshipTool({ cardinality: '1' }),
      linkWeakRelationshipTool({ total: true, cardinality: 'N' }),
      linkMultivaluedAttributeTool,
      linkInheritanceTool()
    ])
  });

  //create tools view for relationship
  self.workspace.tools.elementsToolsView['relationship'] = new joint.dia.ToolsView({
    name: 'relationship-tools',
    tools: basicTools.concat([
      linkAttributeTool,
      linkKeyAttributeTool,
      linkEntityTool({ cardinality: '1' }),
      linkWeakEntityTool({ total: false, cardinality: '1' })
    ])
  });

  //create tools view for weak relationship
  self.workspace.tools.elementsToolsView['weakRelationship'] = new joint.dia.ToolsView({
    name: 'weak-relationship-tools',
    tools: basicTools.concat([
      linkAttributeTool,
      linkWeakKeyAttributeTool,
      linkEntityTool({ cardinality: '1' }),
      linkWeakEntityTool({ total: true, cardinality: 'N' })
    ])
  });

  //create tools view for attribute
  self.workspace.tools.elementsToolsView['attribute'] = new joint.dia.ToolsView({
    name: 'attribute-tools',
    tools: basicTools.concat([
      linkAttributeTool
    ])
  });

  //create tools view for inheritance
  self.workspace.tools.elementsToolsView['inheritance'] = new joint.dia.ToolsView({
    name: 'inheritance-tools',
    tools: basicTools.concat([
      linkEntityTool({ cardinality: 'U' }),
      linkWeakEntityTool({ cardinality: 'U' })
    ])
  });
}

CrowdEditor.prototype.initLinksToolsViews = function () {
  var self = this;

  //initialize links tools view object
  self.workspace.tools.linksToolsView = function () {
    return new joint.dia.ToolsView({
      name: 'links-tools',
      tools: [
        //new joint.linkTools.TotalButton(),
        //new joint.linkTools.CardinalityButton(),
        new joint.linkTools.Vertices(),
        new joint.linkTools.Segments(),
        new joint.linkTools.SourceArrowhead(),
        new joint.linkTools.TargetArrowhead(), //third position of the _toolsView.tools array of the linkView
        new joint.linkTools.SourceAnchor(),
        new joint.linkTools.TargetAnchor(),
        new joint.linkTools.Boundary(),
        new joint.linkTools.Remove({ distance: 20 })
      ]
    });
  };

}

CrowdEditor.prototype.initChangeAttributesEvents = function () {
  var self = this;

  //event when the elements type change (types are: entity, weakEntity, attribute, etc)
  self.workspace.graph.on('change:type', function (element, newType) {
    console.log('change:datatype', { element, newType });

    if (element.isElement()) {
      //replace element attributes and markup with the palette default component of the newtype
      element.attributes.attrs = self.palette.elements[newType].attributes.attrs;
      element.markup = self.palette.elements[newType].markup;

      //get element view
      var elementView = element.findView(self.workspace.paper);

      //redraw the element and their tools with the new type style
      elementView.render();
      self.workspace.renderElementTools(elementView);

      //trigger the change name event to update the text with the name of the element
      //(because it is overwrited when replaced the attributes.attrs)
      element.trigger('change:name', element, element.prop('name'));
    }
  });

  //event when the elements name change
  self.workspace.graph.on('change:name', function (element, newName) {
    console.log('change:name', { element, newName });

    if (element.isElement()) {
      element.attr('text/text', newName);
    }
  });

  //event when the elements (specificly inheritance) subtype change
  self.workspace.graph.on('change:subtype', function (element, newSubtype) {
    console.log('change:subtype', { element, newSubtype });

    if (element.isElement() && element.prop('type') == 'inheritance') {
      var subtypesText = { overlaped: 'o', disjoint: 'd', union: 'U' };
      element.attr('text/text', subtypesText[newSubtype]);
    }
  });

  //event when the links cardinality change
  self.workspace.graph.on('change:cardinality', function (link, newCardinality) {
    console.log('change:cardinality', { link, newCardinality });

    if (link.isLink()) {
      link.labels([{
        attrs: {
          text: {
            text: (newCardinality != "null" ? newCardinality : null),
            class: newCardinality == 'U' ? 'crowd-link-text inherit' : ''
          },
          rect: {
            fill: newCardinality == 'U' ? "none" : getCSS('background-color', 'crowd-workspace')
          }
        },
        position: {
          angle: newCardinality == 'U' ? -90 : null,
          args: {
            keepGradient: newCardinality == 'U' ? true : false
          }
        }
      }]);
    }
  });

  //event when the elements type change (types are: entity, weakEntity, attribute, etc)
  self.workspace.graph.on('change:total', function (link, newTotal) {
    console.log('change:total', { link, newTotal });

    if (link.isLink()) {
      //replace link attributes and markup with the palette default component of the corresponding style
      link.attributes.attrs = newTotal
        ? self.palette.links.total.attributes.attrs
        : self.palette.links.connector.attributes.attrs;
      link.markup = newTotal
        ? self.palette.links.total.markup
        : self.palette.links.connector.markup;

      //get link view
      var linkView = link.findView(self.workspace.paper);

      //redraw the link with the new style
      linkView.render();
    }
  });
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
          <div class="form-check"> \
            <input class="form-check-input" type="checkbox" value="" id="crowd-inspector-content-' + attribute.property + '-' + self.id + '"> \
            <label class="form-check-label" for="crowd-inspector-content-' + attribute.property + '-' + self.id + '">' + attribute.label + '</label> \
          </div> \
        </span>');
        break;
      case 'multiple':
        dom = $('<span class="row"> \
          <div class="form-group"> \
            <label>' + attribute.label + '</label><br> \
          </div> \
        </span>');
        attribute.values.forEach(function (value) {
          $(dom).find('.form-group').append(
            '<div class="form-check form-check-inline"> \
              <input class="form-check-input" type="radio" name="crowd-inspector-content-' + attribute.property + '-' + self.id + '" \
              id="crowd-inspector-content-' + attribute.property + '-' + value.value + '-' + self.id + '" value="' + value.value + '"> \
              <label class="form-check-label" for="crowd-inspector-content-' + attribute.property + '-' + value.value + '-' + self.id + '">' + value.label + '</label> \
            </div>'
          );
        });
        break;
      case 'text': default:
        dom = $('<span class="row"> \
          <div class="form-group"> \
            <label>' + attribute.label + '</label> \
            <' + (attribute.input == 'textarea' ? 'textarea' : 'input type="text"') + ' class="form-control" id="crowd-inspector-content-' + attribute.property + '-' + self.id + '" /> \
          </div> \
        </span>');
        break;
    }
    return dom;
  }

  //append an specified attribute to the content dom element
  self.inspector.addAttribute = function (attribute) {
    //append dom element to the inspector content
    $('#crowd-inspector-' + self.id + ' .crowd-inspector-content').append(self.inspector._makeAttributeDom(attribute));

    //get the property value and map it in case that a map is defined
    var propertyValue = attribute.map != null
      ? Object.keys(attribute.map).find(key => attribute.map[key] == self.inspector.model.prop(attribute.property))
      : self.inspector.model.prop(attribute.property);

    //set the dom input value with the property value according to the attribute type
    switch (attribute.type) {

      case 'boolean':
        $('#crowd-inspector-content-' + attribute.property + '-' + self.id).prop("checked", propertyValue == 'true');
        break;
      case 'multiple':
        $('#crowd-inspector-content-' + attribute.property + '-' + propertyValue + '-' + self.id).prop("checked", true);
        break;
      case 'text': default:
        $('#crowd-inspector-content-' + attribute.property + '-' + self.id).val(propertyValue);
        break;
    }

    //event when the input is modified that change the model property value by the user input
    $('#crowd-inspector-content-' + attribute.property + '-' + self.id +
      ',[name="crowd-inspector-content-' + attribute.property + '-' + self.id + '"]').on('keyup change', function () {
        var newPropertyValue;

        //get the dom input value according to the attribute type
        switch (attribute.type) {

          case 'boolean':
            newPropertyValue = $(this).prop('checked');
            break;
          case 'multiple':
            newPropertyValue = $('[name="crowd-inspector-content-' + attribute.property + '-' + self.id + '"]:checked').val();
            break;
          case 'text': default:
            newPropertyValue = $(this).val();
            break;
        }

        console.log(newPropertyValue);

        //remap the property value in case that a map is defined
        newPropertyValue = attribute.map != null
          ? attribute.map[newPropertyValue]
          : newPropertyValue;

        //set the model property value to the new value
        self.inspector.model.prop(attribute.property, newPropertyValue);
      });
  }

  //append dom element that shows an empty message on the inspector
  $('#crowd-inspector-' + self.id).append(
    '<div class="crowd-inspector-empty"> \
      <p>There is no object or connector selected</p> \
    </div>'
  );

  //append dom element that contains the title of the element or link inspected
  $('#crowd-inspector-' + self.id).append('<h2 class="crowd-inspector-title"></h2>');

  //append dom element that contains the content of the element or link inspected
  $('#crowd-inspector-' + self.id).append('<div class="crowd-inspector-content"></div>');

  //init with the inspector empty
  self.inspector.toggleContent(false);

  //event for show the information of a element or link when clicked on it
  self.workspace.paper.on('cell:pointerup', function (cellView) {
    console.log(cellView);

    //toggle the content on
    self.inspector.toggleContent(true);

    //get cell view (that can be element view or link view) model
    self.inspector.model = cellView.model;

    //make the title with the name of the element or link
    $('#crowd-inspector-' + self.id + ' .crowd-inspector-title').html(formatString(self.inspector.model.attributes.type));

    //clear attributes of the lastest model
    self.inspector.clearAttributes();

    //add uri attribute to content for all types
    self.inspector.addAttribute({ label: 'URI', property: 'uri', type: 'text', input: 'textarea' });

    //add name attribute to content if it is of the correct type
    switch (self.inspector.model.attributes.type) {
      case 'entity':
      case 'weakEntity':
      case 'relationship':
      case 'weakRelationship':
      case 'attribute':
      case 'multivaluedAttribute':
      case 'keyAttribute':
      case 'weakKeyAttribute':
      case 'derivedAttribute':
        self.inspector.addAttribute({ label: 'Name', property: 'name', type: 'text', input: 'textarea' });
        break;
    }

    //add is weak attribute for entity and weak entity
    switch (self.inspector.model.attributes.type) {
      case 'entity':
      case 'weakEntity':
        self.inspector.addAttribute({ label: 'Is Weak?', property: 'type', type: 'boolean', map: { true: 'weakEntity', false: 'entity' } });
        break;
    }

    //add is weak attribute for relationship and weak relationship
    switch (self.inspector.model.attributes.type) {
      case 'relationship':
      case 'weakRelationship':
        self.inspector.addAttribute({ label: 'Is Weak?', property: 'type', type: 'boolean', map: { true: 'weakRelationship', false: 'relationship' } });
        break;
    }

    //add the type and datatype attributes for all attributes types
    switch (self.inspector.model.attributes.type) {
      case 'attribute':
      case 'multivaluedAttribute':
      case 'keyAttribute':
      case 'weakKeyAttribute':
      case 'derivedAttribute':
        self.inspector.addAttribute({
          label: 'Type', property: 'type', type: 'multiple',
          values: [
            { label: 'Normal', value: 'attribute' },
            { label: 'Key', value: 'keyAttribute' },
            { label: 'Weak Key', value: 'weakKeyAttribute' },
            { label: 'Multivalued', value: 'multivaluedAttribute' },
            { label: 'Derived', value: 'derivedAttribute' }
          ]
        });
        self.inspector.addAttribute({
          label: 'Datatype', property: 'datatype', type: 'multiple',
          values: [
            { label: 'varchar', value: 'varchar' },
            { label: 'char', value: 'char' },
            { label: 'int', value: 'int' },
            { label: 'bit', value: 'bit' }
          ]
        });
        break;
    }

    //add the subtype attribute for inheritance
    switch (self.inspector.model.attributes.type) {
      case 'inheritance':
        self.inspector.addAttribute({
          label: 'Type', property: 'subtype', type: 'multiple',
          values: [
            { label: 'Overlaped', value: 'overlaped' },
            { label: 'Disjoint', value: 'disjoint' },
            { label: 'Union', value: 'union' },
          ]
        });
        break;
    }

    //add the cardinality attribute for connector
    switch (self.inspector.model.attributes.type) {
      case 'connector':
        self.inspector.addAttribute({
          label: 'Cardinality', property: 'cardinality', type: 'multiple',
          values: [
            { label: 'None', value: null },
            { label: '1', value: '1' },
            { label: 'N', value: 'N' },
            { label: 'U (inherit child)', value: 'U' },
          ]
        });
        self.inspector.addAttribute({ label: 'Is Total?', property: 'total', type: 'boolean', map: { true: true, false: false } });
        break;
    }
  });

  //event for hide the present information and show the empty message again when the element or link is no more selected
  self.workspace.paper.on('blank:pointerdown', function () {
    //toggle the content off
    self.inspector.toggleContent(false);
    //clear attributes of the actual model
    self.inspector.clearAttributes();
    //clear the model var
    self.inspector.model = null;
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
          name: element.attributes.name,
          isWeak: element.attributes.type == 'weakEntity',
          position: element.attributes.position,
          size: element.attributes.size,
        });
        break;
      case 'attribute':
        jsonSchema.attributes.push({
          id: element.cid,
          uri: element.attributes.uri,
          name: element.attributes.name,
          type: element.attributes.type,
          datatype: datatypeMap[element.attributes.datatype],
          position: element.attributes.position,
          size: element.attributes.size,
        });
        //create the link for this attribute
        var attributeLink = {
          id: element.cid,
          uri: element.attributes.uri,
          name: element.attributes.name,
          entity: null,
          attribute: element.attributes.name,
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
            attributeLink.entity = connectedEntity.attributes.name;
          }
        });
        jsonSchema.links.push(attributeLink);
        break;
      case 'relationship':
        jsonSchema.relationships.push({
          id: element.cid,
          uri: element.attributes.uri,
          name: element.attributes.name,
          isWeak: element.attributes.type == 'weakRelationship',
          position: element.attributes.position,
          size: element.attributes.size,
        });
        //create the link for this relationship
        var relationshipLink = {
          id: element.cid,
          uri: element.attributes.uri,
          name: element.attributes.name,
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
            relationshipLink.entities.push(connectedEntity.attributes.name);
            relationshipLink.roles.push(connectedEntity.attributes.name);
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
              inheritanceLink.parent = connectedEntity.attributes.name;
              if (link.attributes.total) {
                inheritanceLink.constraint.push('exclusive');
              }
            }
            else {
              inheritanceLink.entities.push(connectedEntity.attributes.name);
            }
          }
        });
        jsonSchema.links.push(inheritanceLink);
        break;
    }
  });

  return jsonSchema;
}
