var CrowdEditorUml = {
  name: 'uml',
  initPalette: function (crowd) {
    //colors for palette elements
    crowd.palette.colors = {
      class: getCSS('color', 'crowd-class-color'),
      classAlt: getCSS('color', 'crowd-class-alt-color'),
      abstract: getCSS('color', 'crowd-abstract-color'),
      abstractAlt: getCSS('color', 'crowd-abstract-alt-color'),
      interface: getCSS('color', 'crowd-interface-color'),
      interfaceAlt: getCSS('color', 'crowd-interface-alt-color'),
      inheritance: getCSS('color', 'crowd-inheritance-color'),
    }

    //add joint uml class to palette elements
    crowd.palette.elements.class = new joint.shapes.uml.Class({
      parentType: 'class',
      type: 'class',
      name: 'Class',
      uri: 'http://crowd.fi.uncoma.edu.ar#class',
      properties: {
        attributes: [],
        methods: []
      },
      collapsed: false,
      attrs: {
        '.uml-class-name-rect': {
          fill: crowd.palette.colors.class,
          stroke: '#fff',
          'stroke-width': 0.5
        },
        '.uml-class-attrs-rect': {
          fill: crowd.palette.colors.classAlt,
          stroke: '#fff',
          'stroke-width': 0.5
        },
        '.uml-class-methods-rect': {
          fill: crowd.palette.colors.classAlt,
          stroke: '#fff',
          'stroke-width': 0.5
        },
        '.uml-class-name-text': { fill: 'white' },
        '.uml-class-attrs-text': { fill: 'white' },
        '.uml-class-methods-text': { fill: 'white' }
      },
      size: {
        width: 90,
        height: 90
      },
    });

    //add joint uml abstract to palette elements
    crowd.palette.elements.abstract = new joint.shapes.uml.Abstract({
      parentType: 'class',
      type: 'abstract',
      name: 'Abstract',
      uri: 'http://crowd.fi.uncoma.edu.ar#abstract',
      properties: {
        attributes: [],
        methods: []
      },
      collapsed: false,
      attrs: {
        '.uml-class-name-rect': {
          fill: crowd.palette.colors.abstract,
          stroke: '#ffffff',
          'stroke-width': 0.5
        },
        '.uml-class-attrs-rect': {
          fill: crowd.palette.colors.abstractAlt,
          stroke: '#fff',
          'stroke-width': 0.5
        },
        '.uml-class-methods-rect': {
          fill: crowd.palette.colors.abstractAlt,
          stroke: '#fff',
          'stroke-width': 0.5
        },
        '.uml-class-name-text': { fill: 'white' },
        '.uml-class-attrs-text': { fill: 'white' },
        '.uml-class-methods-text': { fill: 'white' }
      },
      size: {
        width: 90,
        height: 90
      },
    });

    //add joint uml interface to palette elements
    crowd.palette.elements.interface = new joint.shapes.uml.Interface({
      parentType: 'class',
      type: 'interface',
      name: 'Interface',
      uri: 'http://crowd.fi.uncoma.edu.ar#interface',
      properties: {
        attributes: [],
        methods: []
      },
      collapsed: false,
      attrs: {
        '.uml-class-name-rect': {
          fill: crowd.palette.colors.interface,
          stroke: '#ffffff',
          'stroke-width': 0.5
        },
        '.uml-class-attrs-rect': {
          fill: crowd.palette.colors.interfaceAlt,
          stroke: '#fff',
          'stroke-width': 0.5
        },
        '.uml-class-methods-rect': {
          fill: crowd.palette.colors.interfaceAlt,
          stroke: '#fff',
          'stroke-width': 0.5
        },
        '.uml-class-name-text': { fill: 'white' },
        '.uml-class-attrs-text': { fill: 'white' },
        '.uml-class-methods-text': { fill: 'white' }
      },
      size: {
        width: 90,
        height: 90
      },
    });

    //add joint uml inheritance to palette elements
    crowd.palette.elements.inheritance = new joint.shapes.erd.Attribute({
      parentType: 'inheritance',
      type: 'inheritance',
      subtype: 'overlaped',
      covering: false,
      attrs: {
        text: {
          fill: 'white',
          text: 'o',
          class: 'crowd-element-text inheritance'
        },
        '.outer': {
          fill: crowd.palette.colors.inheritance,
          stroke: crowd.palette.colors.inheritance
        }
      },
      size: {
        width: 30,
        height: 30
      }
    });

    //add joint uml association to palette links
    crowd.palette.links.association = new joint.shapes.standard.Link({
      type: 'association',
      cardinality: {
        source: null,
        target: null
      },
      roles: {
        source: 'http://crowd.fi.uncoma.edu.ar#role-a',
        target: 'http://crowd.fi.uncoma.edu.ar#role-b'
      },
      direction: 'target',
      uri: 'http://crowd.fi.uncoma.edu.ar#association',
      attrs: {
        line: {
          stroke: 'black',
          strokeWidth: 2,
          sourceMarker: {},
          targetMarker: {
            d: 'M 20 10 0 0 20 -10 Z'
          }
        }
      }
    });

    //add joint uml aggregation to palette links
    crowd.palette.links.aggregation = new joint.shapes.standard.Link({
      type: 'aggregation',
      cardinality: {
        source: null,
        target: null
      },
      roles: {
        source: 'http://crowd.fi.uncoma.edu.ar#role-a',
        target: 'http://crowd.fi.uncoma.edu.ar#role-b'
      },
      direction: 'target',
      uri: 'http://crowd.fi.uncoma.edu.ar#aggregation',
      attrs: {
        line: {
          stroke: 'black',
          strokeWidth: 2,
          sourceMarker: {},
          targetMarker: {
            fill: 'white',
            d: 'M 40 0 20 10 0 0 20 -10 Z'
          }
        }
      },
    });

    //add joint uml composition to palette links
    crowd.palette.links.composition = new joint.shapes.standard.Link({
      type: 'composition',
      cardinality: {
        source: null,
        target: null
      },
      roles: {
        source: 'http://crowd.fi.uncoma.edu.ar#role-a',
        target: 'http://crowd.fi.uncoma.edu.ar#role-b'
      },
      direction: 'target',
      uri: 'http://crowd.fi.uncoma.edu.ar#composition',
      attrs: {
        line: {
          stroke: 'black',
          strokeWidth: 2,
          sourceMarker: {},
          targetMarker: {
            fill: 'black',
            d: 'M 40 0 20 10 0 0 20 -10 Z'
          }
        }
      },
    });

    //add joint uml generalization to palette links
    crowd.palette.links.generalization = new joint.shapes.standard.Link({
      type: 'generalization',
      cardinality: {
        source: null,
        target: null
      },
      roles: {
        source: null,
        target: null
      },
      inheritChild: false,
      direction: 'target',
      uri: 'http://crowd.fi.uncoma.edu.ar#generalization',
      attrs: {
        line: {
          stroke: 'black',
          strokeWidth: 2,
          sourceMarker: {},
          targetMarker: {
            fill: 'white',
            d: 'M 20 10 0 0 20 -10 Z'
          }
        }
      },
    });

    //add joint uml generalization to palette links
    crowd.palette.links.implementation = new joint.shapes.standard.Link({
      type: 'implementation',
      cardinality: {
        source: null,
        target: null
      },
      roles: {
        source: null,
        target: null
      },
      inheritChild: false,
      direction: 'target',
      uri: 'http://crowd.fi.uncoma.edu.ar#implementation',
      attrs: {
        line: {
          stroke: 'black',
          strokeWidth: 2,
          strokeDasharray: '4 2',
          sourceMarker: {},
          targetMarker: {
            fill: 'white',
            d: 'M 20 10 0 0 20 -10 Z'
          }
        }
      },
    });
  },
  initElementsToolsViews: function (crowd) {
    //link tool with the uml association link type
    var linkAssociationTool = crowd.workspace.tools.elements.linkTool({
      link: {
        type: 'association',
        props: {
          cardinality: { source: '0..1', target: '0..1' },
          direction: null
        }
      },
      markup: crowd.workspace.tools.elements.markup({
        icon: 'call_made',
        tooltip: {
          title: 'Click and drag to connect the object with an <b class="crowd-bold-color">association</b>',
          placement: "right"
        }
      })
    });

    //link tool with the uml aggregation link type
    var linkAggregationTool = crowd.workspace.tools.elements.linkTool({
      link: {
        type: 'aggregation',
        props: {
          cardinality: { source: '0..1', target: '0..1' }
        }
      },
      x: '75%',
      offset: { x: 12, y: -15 },
      markup: crowd.workspace.tools.elements.markup({
        icon: 'arrow_upward',
        tooltip: {
          title: 'Click and drag to connect the object with an <b class="crowd-bold-color">aggregation</b>',
          placement: "top"
        }
      })
    });

    //link tool with the uml composition link type
    var linkCompositionTool = crowd.workspace.tools.elements.linkTool({
      link: {
        type: 'composition',
        props: {
          cardinality: { source: '0..1', target: '0..1' }
        }
      },
      y: '25%',
      offset: { x: 25, y: -2 },
      markup: crowd.workspace.tools.elements.markup({
        icon: 'arrow_forward',
        tooltip: {
          title: 'Click and drag to connect the object with a <b class="crowd-bold-color">composition</b>',
          placement: "right"
        }
      })
    });

    //link tool with the uml generalization link type
    var linkGeneralizationTool = function (config) {
      config = config ? config : {};
      return crowd.workspace.tools.elements.linkTool({
        link: {
          type: 'generalization',
          props: {
            direction: config.direction ? config.direction : 'target',
            inheritChild: config.inheritChild != null ? config.inheritChild : false
          }
        },
        x: config.position?.x ? config.position?.x : '50%',
        y: config.position?.y ? config.position?.y : null,
        offset: {
          x: config.offset?.x ? config.offset?.x : 0,
          y: config.offset?.y ? config.offset?.y : -15
        },
        markup: crowd.workspace.tools.elements.markup({
          icon: config.icon ? config.icon : 'call_merge',
          tooltip: {
            title: 'Click and drag to connect the object with a <b class="crowd-bold-color">generalization</b>' + (config.inheritChild ? ' child' : ' parent'),
            placement: "top"
          }
        })
      });
    };

    //link tool with the uml implementation link type
    var linkImplementationTool = crowd.workspace.tools.elements.linkTool({
      link: {
        type: 'implementation'
      },
      x: '25%',
      offset: { x: -12, y: -15 },
      markup: crowd.workspace.tools.elements.markup({
        icon: 'call_split',
        tooltip: {
          title: 'Click and drag to connect the object with a <b class="crowd-bold-color">implementation</b>',
          placement: "top"
        }
      })
    });

    //link tool for classes
    var linkClassTool = function (config) {
      config = config ? config : {};
      return crowd.workspace.tools.elements.linkElementTool({
        elementType: crowd.palette.elements.class,
        x: '100%', y: '50%', offset: { x: 25, y: 10 },
        markup: crowd.workspace.tools.elements.markup({
          icon: 'share',
          background: crowd.palette.colors.class,
          tooltip: {
            title: 'Click and drag to make a <b class="crowd-class-color">class</b> and connect with it',
            placement: "right"
          }
        }),
        link: {
          type: config.type,
          props: {
            cardinality: config.cardinality,
            inheritChild: config.inheritChild != null ? config.inheritChild : false,
            direction: config.direction
          }
        }
      });
    };

    //link tool for abstract
    var linkAbstractTool = function (config) {
      config = config ? config : {};
      return crowd.workspace.tools.elements.linkElementTool({
        elementType: crowd.palette.elements.abstract,
        x: '50%', y: '100%', offset: { x: 0, y: 35 },
        markup: crowd.workspace.tools.elements.markup({
          icon: 'share',
          background: crowd.palette.colors.abstract,
          tooltip: {
            title: 'Click and drag to make an <b class="crowd-abstract-color">abstract</b> and connect with it',
            placement: "bottom"
          }
        }),
        link: {
          type: config.type,
          props: {
            cardinality: config.cardinality,
            inheritChild: config.inheritChild != null ? config.inheritChild : false,
            direction: config.direction
          }
        }
      });
    };

    //link tool for interface
    var linkInterfaceTool = function (config) {
      config = config ? config : {};
      return crowd.workspace.tools.elements.linkElementTool({
        elementType: crowd.palette.elements.interface,
        x: '0%', y: '50%', offset: { x: -25, y: 10 },
        markup: crowd.workspace.tools.elements.markup({
          icon: 'share',
          background: crowd.palette.colors.interface,
          tooltip: {
            title: 'Click and drag to make a <b class="crowd-interface-color">interface</b> and connect with it',
            placement: "left"
          }
        }),
        link: {
          type: config.type,
          props: {
            cardinality: config.cardinality,
            inheritChild: config.inheritChild != null ? config.inheritChild : false,
            direction: config.direction
          }
        }
      });
    };

    //link tool for inheritance
    var linkInheritanceTool = function (config) {
      config = config ? config : {};
      return crowd.workspace.tools.elements.linkElementTool({
        elementType: crowd.palette.elements.inheritance,
        x: '75%', y: '100%', offset: { x: 12, y: 35 },
        markup: crowd.workspace.tools.elements.markup({
          icon: 'share',
          background: crowd.palette.colors.inheritance,
          tooltip: {
            title: 'Click and drag to make a <b class="crowd-inheritance-color">inheritance</b> and connect with it',
            placement: "left"
          }
        }),
        link: {
          type: config.type,
          props: {
            cardinality: config.cardinality,
            direction: config.direction,
            inheritChild: config.inheritChild != null ? config.inheritChild : true
          }
        }
      });
    };

    //create tools view for classes
    crowd.workspace.tools.elements.elementsToolsView['class'] = new joint.dia.ToolsView({
      name: 'class-tools',
      tools: crowd.workspace.tools.elements.basicTools.concat([
        linkAssociationTool,
        linkAggregationTool,
        linkCompositionTool,
        linkGeneralizationTool(),
        linkImplementationTool,
        linkClassTool({ type: 'association', cardinality: { source: '0..1', target: '0..1' }, direction: null }),
        linkAbstractTool({ type: 'generalization', cardinality: { source: null, target: null }, direction: 'target' }),
        linkInterfaceTool({ type: 'implementation', cardinality: { source: null, target: null }, direction: 'target' }),
        linkInheritanceTool({ type: 'generalization', cardinality: { source: null, target: null }, direction: 'source', inheritChild: false }),
      ])
    });

    //create tools view for abstracts
    crowd.workspace.tools.elements.elementsToolsView['abstract'] = new joint.dia.ToolsView({
      name: 'abstract-tools',
      tools: crowd.workspace.tools.elements.basicTools.concat([
        linkAssociationTool,
        linkAggregationTool,
        linkCompositionTool,
        linkGeneralizationTool(),
        linkImplementationTool,
        linkClassTool({ type: 'generalization', cardinality: { source: '0..1', target: '0..1' }, direction: 'source' }),
        linkAbstractTool({ type: 'association', cardinality: { source: '0..1', target: '0..1' }, direction: null }),
        linkInterfaceTool({ type: 'implementation', cardinality: { source: null, target: null }, direction: 'target' }),
        linkInheritanceTool({ type: 'generalization', cardinality: { source: null, target: null }, direction: 'source', inheritChild: false }),
      ])
    });

    //create tools view for interfaces
    crowd.workspace.tools.elements.elementsToolsView['interface'] = new joint.dia.ToolsView({
      name: 'interface-tools',
      tools: crowd.workspace.tools.elements.basicTools.concat([
        linkAssociationTool,
        linkAggregationTool,
        linkCompositionTool,
        linkGeneralizationTool(),
        linkImplementationTool,
        linkClassTool({ type: 'implementation', cardinality: { source: null, target: null }, direction: 'source' }),
        linkAbstractTool({ type: 'implementation', cardinality: { source: null, target: null }, direction: 'source' }),
        linkInterfaceTool({ type: 'implementation', cardinality: { source: null, target: null }, direction: 'target' }),
        linkInheritanceTool({ type: 'generalization', cardinality: { source: null, target: null }, direction: 'source', inheritChild: false }),
      ])
    });

    //create tools view for inheritance
    crowd.workspace.tools.elements.elementsToolsView['inheritance'] = new joint.dia.ToolsView({
      name: 'inheritance-tools',
      tools: crowd.workspace.tools.elements.basicTools.concat([
        linkGeneralizationTool(),
        linkGeneralizationTool({ icon: 'play_for_work', position: { x: '100%' }, offset: { x: 25, y: -15 }, inheritChild: true, direction: null }),
        linkClassTool({ type: 'generalization', cardinality: { source: null, target: null }, direction: null, inheritChild: true }),
        linkAbstractTool({ type: 'generalization', cardinality: { source: null, target: null }, direction: null, inheritChild: true }),
        linkInterfaceTool({ type: 'generalization', cardinality: { source: null, target: null }, direction: null, inheritChild: true }),
      ])
    });
  },
  initLinksToolsViews: function (crowd) {
    //no extra links tools
  },
  initChangeAttributesEvents: function (crowd) {
    //event when the elements type change (types are: entity, weakEntity, attribute, etc)
    crowd.workspace.graph.on('change:type', function (element, newType) {
      console.log('change:type', { element, newType });

      if (element.isElement()) {
        //replace element attributes, markup and getClassName function with the palette default component of the newtype
        element.attributes.attrs = $.extend(true, {}, crowd.palette.elements[newType].attributes.attrs);
        element.markup = crowd.palette.elements[newType].markup;
        element.getClassName = crowd.palette.elements[newType].getClassName;

        //get element view
        var elementView = element.findView(crowd.workspace.paper);

        //redraw the element and their tools with the new type style
        elementView.render();
        crowd.workspace.renderElementTools(elementView);

        //trigger the change name event to update the text with the name of the element
        //(because it is overwrited when replaced the attributes.attrs)
        element.trigger('change:name', element, element.prop('name'));
      }
    });

    //event when the elements name change
    crowd.workspace.graph.on('change:name', function (element, newName) {
      // console.log('change:name', { element, newName });

      if (element.isElement()) {
        // element.attributes.uri = element.attributes.uri.split("#")[0] + "#" + toURI(newName);
        // $('#crowd-inspector-content--uri--' + crowd.id).val(element.attributes.uri);
        element.findView(crowd.workspace.paper).render();
      }
    });

    //event when the elements uri change
    crowd.workspace.graph.on('change:uri', function (element, newUri) {
      // console.log('change:uri', { element, newUri });

      if (element.isElement()) {
        element.attributes.name = fromURI(newUri);
        $('#crowd-inspector-content--name--' + crowd.id).val(fromURI(newUri));
        element.trigger('change:name', element, element.prop('name'));
      }
    });

    var classFitToContent = function (element) {
      //get element view
      var elementView = element.findView(crowd.workspace.paper);

      element.size({ width: 70, height: 60 });
      setTimeout(function () {
        for (var i = 0; i < 10; i++) {
          var bbox = elementView.getBBox();
          element.size(bbox);
        }

        var actualSize = element.size();
        actualSize.width += 20;
        actualSize.height += 40;

        element.size(actualSize);

        //redraw the element and their tools with the new type style
        elementView.render();
        crowd.workspace.renderElementTools(elementView);
      });
    }

    //event when the elements attributes change
    crowd.workspace.graph.on('change:attributes', function (element, newAttributes, opt) {
      // console.log('change:attributes', { element, previosAttributes: element._previousAttributes.attributes, newAttributes, opt });

      if (element.isElement() && !element.prop('collapsed')) {
        //adjust element size if add or remove element
        // if (element._previousAttributes.attributes.length > newAttributes.length)
        //   element.size(element.size().width, element.size().height - 10);
        // else if (element._previousAttributes.attributes.length < newAttributes.length)
        //   element.size(element.size().width, element.size().height + 10);

        classFitToContent(element);
      }
    });

    //event when the elements methods change
    crowd.workspace.graph.on('change:methods', function (element, newMethods, opt) {
      // console.log('change:methods', { element, previosMethods: element._previousAttributes.methods, newMethods, opt });

      if (element.isElement() && !element.prop('collapsed')) {
        //adjust element size if add or remove element
        // if (element._previousAttributes.methods.length > newMethods.length)
        //   element.size(element.size().width, element.size().height - 10);
        // else if (element._previousAttributes.methods.length < newMethods.length)
        //   element.size(element.size().width, element.size().height + 10);

        classFitToContent(element);
      }
    });

    //event when the elements properties/attributes (semantic attributes) change
    crowd.workspace.graph.on('change:properties', function (element, newProperties, opt) {
      console.log('change:properties', { element, previosAttributes: element._previousAttributes.attributes, newProperties, opt });

      if (element.isElement()) {
        //set visual attributes property on element
        element.prop('attributes', $.map(newProperties.attributes, function (attribute) {
          return '- ' + (attribute.name ? toInfixCaps(fromURI(attribute.name)) : '_') + ' : ' + (attribute.datatype ? attribute.datatype : '_');
        }));

        //set visual methods property on element
        element.prop('methods', $.map(newProperties.methods, function (method) {
          return '+ ' + (method ? toInfixCaps(fromURI(method)) + '()' : '_');
        }));

        // //get element view
        // var elementView = element.findView(crowd.workspace.paper);

        // //redraw the element and their tools with the new type style
        // elementView.render();
        // crowd.workspace.renderElementTools(elementView);
      }
    });

    //event when the elements collapsed option change
    crowd.workspace.graph.on('change:collapsed', function (element, newCollapsed, opt) {
      // console.log('change:collapsed', { element, newCollapsed, opt });

      if (element.isElement()) {
        if (element.prop('attrs/.uml-class-attrs-rect/height') != 0 && element.prop('attrs/.uml-class-methods-rect/height') != 0) {
          element.prop('.uml-class-attrs-rect/lastHeight', element.prop('attrs/.uml-class-attrs-rect/height'));
          element.prop('.uml-class-attrs-text/lastText', element.prop('attrs/.uml-class-attrs-text/text'));
          element.prop('.uml-class-methods-rect/lastHeight', element.prop('attrs/.uml-class-methods-rect/height'));
          element.prop('.uml-class-methods-text/lastText', element.prop('attrs/.uml-class-methods-text/text'));
        }

        element.prop('attrs/.uml-class-attrs-rect/visibility', newCollapsed ? 'hidden' : 'visible');
        element.prop('attrs/.uml-class-attrs-text/fill-opacity', newCollapsed ? '0' : '1');
        // element.prop('attrs/.uml-class-attrs-text/text',
        //   newCollapsed ? '' : element.prop('.uml-class-attrs-text/lastText'));
        // element.prop('attrs/.uml-class-attrs-rect/height',
        //   newCollapsed ? 0 : element.prop('.uml-class-attrs-rect/lastHeight'));

        element.prop('attrs/.uml-class-methods-rect/visibility', newCollapsed ? 'hidden' : 'visible');
        element.prop('attrs/.uml-class-methods-text/fill-opacity', newCollapsed ? '0' : '1');
        // element.prop('attrs/.uml-class-methods-text/text',
        //   newCollapsed ? '' : element.prop('.uml-class-methods-text/lastText'));
        // element.prop('attrs/.uml-class-methods-rect/height',
        //   newCollapsed ? 0 : element.prop('.uml-class-methods-rect/lastHeight'));

        if (!newCollapsed) {
          setTimeout(function () {
            // var tempProp = element.prop('properties');
            // element.prop('properties', { attributes: [], methods: [] });
            // element.prop('properties', tempProp);
            // var elementView = element.findView(self.workspace.paper);
            // elementView.render();
          });
        }
      }
    });

    //event when change element size
    crowd.workspace.graph.on('change:size', function (element, newSize, opt) {
      if (element.prop('collapsed')) {
        // element.prop('attrs/.uml-class-attrs-text/text', '');
        // element.prop('attrs/.uml-class-attrs-rect/height', 0);
        // element.prop('attrs/.uml-class-methods-text/text', '');
        // element.prop('attrs/.uml-class-methods-rect/height', 0);
      }
    });


    //event when the links type change (types are: association, aggregation, composition, etc)
    crowd.workspace.graph.on('change:type', function (link, newType) {
      // console.log('change:type', { link, newType });

      if (link.isLink()) {
        //replace link attributes and markup with the palette default component of the newtype
        link.attributes.attrs = $.extend(true, {}, crowd.palette.links[newType].attributes.attrs);
        link.markup = crowd.palette.links[newType].markup;

        //get link view
        var linkView = link.findView(crowd.workspace.paper);

        //redraw the link with the new style
        linkView.render();

        //trigger the change direction event to update the marker with the direction of the link
        //(because it is overwrited when replaced the attributes.attrs)
        //check if the newType is valid with that direction
        if (newType != 'association' && (!link.prop('direction') || link.prop('direction') == 'null'))
          link.attributes.direction = 'target';
        link.trigger('change:direction', link, link.prop('direction'));

        if (newType == 'generalization' || newType == 'implementation') {
          link.attributes.cardinality = { source: null, target: null };
          link.attributes.roles = { source: null, target: null };
        }
        link.trigger('change:cardinality', link, link.prop('cardinality'));
        link.trigger('change:roles', link, link.prop('roles'));

        crowd.inspector.loadContent();
      }
    });

    //event when the links cardinality or roles change
    crowd.workspace.graph.on('change:cardinality change:roles', function (link, newCardinalityRole) {
      // console.log('change:cardinality', { link, newCardinality });

      if (link.isLink() && newCardinalityRole != null) {
        var newCardinality = link.attributes.cardinality;
        var newRoles = link.attributes.roles;
        link.labels([
          {
            attrs: {
              text: {
                text: (newCardinality.source != "null" ? newCardinality.source : null),
              }
            },
            position: {
              distance: 15,
              offset: 20
            }
          },
          {
            attrs: {
              text: {
                text: (newCardinality.target != "null" ? newCardinality.target : null),
              }
            },
            position: {
              distance: -15,
              offset: 20
            }
          },
          {
            attrs: {
              text: {
                text: (newRoles.source != "null" ? fromURI(newRoles.source) : null),
              }
            },
            position: {
              distance: 0.25,
              offset: -20
            }
          },
          {
            attrs: {
              text: {
                text: (newRoles.target != "null" ? fromURI(newRoles.target) : null),
              }
            },
            position: {
              distance: 0.75,
              offset: -20
            }
          },
        ]);
      }
    });

    //event when the links direction change
    crowd.workspace.graph.on('change:direction', function (link, newDirection) {
      // console.log('change:direction', { link, newDirection });

      if (link.isLink()) {
        if (newDirection == 'source') {
          link.attributes.attrs.line.sourceMarker = $.extend(true, {}, crowd.palette.links[link.attributes.type].attributes.attrs.line.targetMarker);
          link.attributes.attrs.line.targetMarker = {};
        }
        else if (newDirection == 'target') {
          link.attributes.attrs.line.targetMarker = $.extend(true, {}, crowd.palette.links[link.attributes.type].attributes.attrs.line.targetMarker);
          link.attributes.attrs.line.sourceMarker = {};
        } else {
          link.attributes.attrs.line.targetMarker = {};
          link.attributes.attrs.line.sourceMarker = {};
        }
      }

      //get link view
      var linkView = link.findView(crowd.workspace.paper);

      //redraw the link with the new style
      linkView.render();
    });

    //event when the link inherit child change
    crowd.workspace.graph.on('change:inheritChild', function (link, newInheritChild) {
      // console.log('change:inheritChild', { link, newInheritChild });

      if (link.isLink()) {
        if (newInheritChild)
          link.prop('direction', null);
        else
          link.prop('direction', 'target');
        crowd.inspector.loadContent();
      }
    });

    //event when the elements (specificly inheritance) subtype change
    crowd.workspace.graph.on('change:subtype', function (element, newSubtype) {
      // console.log('change:subtype', { element, newSubtype });

      if (element.isElement() && element.prop('type') == 'inheritance') {
        var subtypesText = { overlaped: 'o', disjoint: 'd' };
        element.attr('text/text', (element.prop('covering') ? 'c,' : '') + subtypesText[newSubtype]);
      }
    });

    //event when the elements (specificly inheritance) covering change
    crowd.workspace.graph.on('change:covering', function (element, newCovering) {
      // console.log('change:covering', { element, newCovering });

      if (element.isElement() && element.prop('type') == 'inheritance') {
        element.trigger('change:subtype', element, element.prop('subtype'));
      }
    });

    //event when the links source or target change
    crowd.workspace.graph.on('change:source change:target', function (link, newSourceTarget) {
      // console.log('change:source change:target', { link, newSourceTarget });

      if (link.isLink()) {
        // link.trigger('change:cardinality', link, link.prop('cardinality'));
        // link.trigger('change:inheritChild', link, link.prop('inheritChild'));
      }
    });
  },
  initInspector: function (crowd) {
    //add uri attribute to content for all types
    // crowd.inspector.addAttribute({ label: 'URI', property: 'uri', type: 'text', input: 'textarea' });
    switch (crowd.inspector.model.attributes.type) {
      case 'class':
      case 'abstract':
      case 'interface':
      case 'association':
      case 'aggregation':
      case 'composition':
        crowd.inspector.addAttribute({ label: 'URI', property: 'uri', type: 'text', input: 'textarea' });
        break;
    }

    //add name and type attribute to content if are class, abstract or interface elements
    switch (crowd.inspector.model.attributes.type) {
      case 'class':
      case 'abstract':
      case 'interface':
        // crowd.inspector.addAttribute({ label: 'Name', property: 'name', type: 'text', input: 'textarea' });
        crowd.inspector.addAttribute({
          label: 'Type', property: 'type', type: 'multiple',
          values: [
            { label: 'Class', value: 'class' },
            { label: 'Abstract', value: 'abstract' },
            { label: 'Interface', value: 'interface' },
          ]
        });
        crowd.inspector.addAttribute({
          label: 'Attributes', property: 'properties/attributes', type: 'list',
          default: { name: 'http://crowd.fi.uncoma.edu.ar#attribute', datatype: 'Integer' },
          template: {
            type: 'object',
            parameters: [
              { property: 'name', type: 'text', input: 'textarea', inputRows: 2, placeholder: 'Attribute' },
              {
                property: 'datatype', type: 'multiple',
                values: [
                  { label: 'Int', value: 'Integer' },
                  { label: 'String', value: 'String' },
                  { label: 'Bool', value: 'Boolean' }
                ]
              }
            ]
          }
        });
        crowd.inspector.addAttribute({
          label: 'Methods', property: 'properties/methods', type: 'list',
          default: 'http://crowd.fi.uncoma.edu.ar#method',
          template: { type: 'text', input: 'textarea', inputRows: 2, placeholder: 'Method' }
        });
        break;
    }

    //add the type attribute for links
    switch (crowd.inspector.model.attributes.type) {
      case 'association':
      case 'aggregation':
      case 'composition':
      case 'generalization':
      case 'implementation':
        crowd.inspector.addAttribute({
          label: 'Type', property: 'type', type: 'multiple',
          values: [
            { label: 'Association', value: 'association' },
            { label: 'Aggregation', value: 'aggregation' },
            { label: 'Composition', value: 'composition' },
            { label: 'Generalization', value: 'generalization' },
            { label: 'Implementation', value: 'implementation' },
          ]
        });
        break;
    }

    //add the inherit child attribute if are generalization or implementation links
    switch (crowd.inspector.model.attributes.type) {
      case 'generalization':
      case 'implementation':
        crowd.inspector.addAttribute({ label: 'Is Child Connector?', property: 'inheritChild', type: 'boolean', map: { true: true, false: false } });
        break;
    }

    //add the nullable direction attribute if are association links
    switch (crowd.inspector.model.attributes.type) {
      case 'association':
        crowd.inspector.addAttribute({
          label: 'Direction', property: 'direction', type: 'multiple',
          values: [
            { label: 'None', value: null },
            { label: 'Source', value: 'source' },
            { label: 'Target', value: 'target' },
          ]
        });
        break;
    }

    //add the not-nullable direction attribute if are aggregation, composition, generalization or implementation links
    switch (crowd.inspector.model.attributes.type) {
      case 'aggregation':
      case 'composition':
      case 'generalization':
      case 'implementation':
        if (!crowd.inspector.model.attributes.inheritChild) {
          crowd.inspector.addAttribute({
            label: 'Direction', property: 'direction', type: 'multiple',
            values: [
              { label: 'Source', value: 'source' },
              { label: 'Target', value: 'target' },
            ]
          });
        }
        break;
    }

    //add the cardinalities and roles attributes if are association, aggregation or composition links
    switch (crowd.inspector.model.attributes.type) {
      case 'association':
      case 'aggregation':
      case 'composition':
        crowd.inspector.addAttribute({
          label: 'Cardinality', property: 'cardinality', type: 'object',
          parameters: [
            { label: 'Source', property: 'source', type: 'text', placeholder: 'Source Cardinality' },
            { label: 'Target', property: 'target', type: 'text', placeholder: 'Target Cardinality' }
          ]
        });
        crowd.inspector.addAttribute({
          label: 'Roles', property: 'roles', type: 'object',
          parameters: [
            { label: 'Source', property: 'source', type: 'text', input: 'textarea', inputRows: 2, placeholder: 'Source Role' },
            { label: 'Target', property: 'target', type: 'text', input: 'textarea', inputRows: 2, placeholder: 'Target Role' }
          ]
        });
        // crowd.inspector.addAttribute({ label: 'Cardinality Source', property: 'cardinality/source', type: 'text' });
        // crowd.inspector.addAttribute({ label: 'Cardinality Target', property: 'cardinality/target', type: 'text' });
        break;
    }

    //add the subtype attribute for inheritance
    switch (crowd.inspector.model.attributes.type) {
      case 'inheritance':
        crowd.inspector.addAttribute({
          label: 'Type', property: 'subtype', type: 'multiple',
          values: [
            { label: 'Overlaped', value: 'overlaped' },
            { label: 'Disjoint', value: 'disjoint' },
          ]
        });
        crowd.inspector.addAttribute({ label: 'Covering?', property: 'covering', type: 'boolean', map: { true: true, false: false } });
        break;
    }
  },
  toJSONSchema: function (crowd) {
    //define basic structure of uml json according to schema
    var jsonSchema = {
      classes: [],
      links: []
    };

    //mapping of inheritances to the requested format of schema
    var linkTypeMap = {
      'association': 'association',
      'aggregation': 'association',
      'composition': 'association',
      'generalization': 'generalization',
      'implementation': 'generalization'
    }

    //iterates each element and add it to the correspondent collection
    crowd.workspace.graph.getElements().forEach(function (element) {
      switch (element.attributes.parentType) {
        case 'class':
          jsonSchema.classes.push({
            uri: element.attributes.uri,
            name: element.attributes.uri,
            attrs: element.attributes.properties.attributes,
            methods: element.attributes.properties.methods,
            position: element.attributes.position,
            size: element.attributes.size
          });

          //search for links connected to the class for add them to the links collection
          crowd.workspace.graph.getConnectedLinks(element).forEach(function (link) {
            var connectedClass;
            if (link.attributes.direction && link.attributes[link.attributes.direction].id != element.id) {
              connectedClass = link.attributes.direction == 'source' ? link.getSourceElement() : link.getTargetElement();
            } else if (!link.attributes.direction && link.attributes.target.id != element.id) {
              connectedClass = link.getTargetElement();
            }

            if (connectedClass && connectedClass?.attributes?.parentType == 'class') {
              jsonSchema.links.push({
                ...linkTypeMap[link.attributes.type] != 'generalization' ? { uri: link.attributes.uri } : {},
                name: link.attributes.uri,
                ...linkTypeMap[link.attributes.type] == 'generalization' ? { parent: connectedClass.attributes.uri } : {},
                classes: [
                  element.attributes.uri,
                  ...linkTypeMap[link.attributes.type] != 'generalization' ? [connectedClass.attributes.uri] : []
                ],
                type: linkTypeMap[link.attributes.type],
                ...linkTypeMap[link.attributes.type] != 'generalization' ? {
                  multiplicity: [
                    link.attributes.direction && link.attributes.direction == 'source' ? link.attributes.cardinality.target : link.attributes.cardinality.source,
                    link.attributes.direction && link.attributes.direction == 'source' ? link.attributes.cardinality.source : link.attributes.cardinality.target
                  ]
                } : {},
                ...linkTypeMap[link.attributes.type] != 'generalization' ? {
                  roles: [
                    link.attributes.direction && link.attributes.direction == 'source'
                      ? (link.attributes.roles.target ? link.attributes.roles.target : element.attributes.uri)
                      : (link.attributes.roles.source ? link.attributes.roles.source : element.attributes.uri),
                    link.attributes.direction && link.attributes.direction == 'source'
                      ? (link.attributes.roles.source ? link.attributes.roles.source : connectedClass.attributes.uri)
                      : (link.attributes.roles.target ? link.attributes.roles.target : connectedClass.attributes.uri)
                  ]
                } : {},
                ...linkTypeMap[link.attributes.type] != 'association' ? {
                  constraint: []
                } : {}
              });
            }
          });
          break;
        case 'inheritance':
          //create the link for this inheritance
          var inheritanceLink = {
            name: element.cid,
            parent: null,
            classes: [],
            constraint: [],
            type: 'generalization',
            position: element.attributes.position,
            size: element.attributes.size
          }
          if (element.attributes.subtype == 'disjoint') inheritanceLink.constraint.push('disjoint');
          if (element.attributes.covering) inheritanceLink.constraint.push('covering');

          //search for links connected to the inheritance for add classes to inheritance link
          crowd.workspace.graph.getConnectedLinks(element).forEach(function (link) {
            if (link.attributes.type == 'generalization') {
              var connectedClass = link.attributes.source.id != element.id
                && (link.getSourceElement().attributes.parentType == 'class')
                ? link.getSourceElement()
                : (link.attributes.target.id != element.id
                  && (link.getTargetElement().attributes.parentType == 'class')
                  ? link.getTargetElement()
                  : null);
              if (connectedClass) {
                if (!link.attributes.inheritChild) {
                  inheritanceLink.parent = connectedClass.attributes.uri;
                }
                else {
                  inheritanceLink.classes.push(connectedClass.attributes.uri);
                }
              }
            }
          });
          jsonSchema.links.push(inheritanceLink);
          break;
      }
    });

    return jsonSchema;
  },
  fromJSONSchema: function (crowd, schema) {
    console.log('loadUML', schema);

    var classesObj = {};
    var inheritancesObj = {};
    var linksObj = {};

    if (schema) {
      //add each class and their properties
      if (schema.classes) {
        schema.classes.forEach(function (classe) {
          classesObj[classe.name] = crowd.palette.elements.class.clone();
          crowd.workspace.graph.addCell(classesObj[classe.name]);
          $.each(classe, function (attribute, value) {
            switch (attribute) {
              case 'name':
                classesObj[classe.name].prop('uri', value);
                break;
              case 'attrs':
                classesObj[classe.name].prop('properties/attributes', value)
                break;
              default:
                classesObj[classe.name].prop(attribute, value)
                break;
            }
          });
        });
      }

      //add each link and their properties
      if (schema.links) {
        schema.links.forEach(function (link) {
          if (link.type != "generalization" || (link.classes.length <= 1 && link.constraint.length <= 0)) {
            console.log('common', link);
            linksObj[link.name] = crowd.palette.links[link.type].clone();
            crowd.workspace.graph.addCell(linksObj[link.name]);
            $.each(link, function (attribute, value) {
              switch (attribute) {
                case 'name':
                  linksObj[link.name].prop('uri', value);
                  break;
                case 'classes':
                  if (link.type == "generalization") {
                    linksObj[link.name].source(classesObj[value[0]]);
                  } else {
                    linksObj[link.name].source(classesObj[value[0]]);
                    linksObj[link.name].target(classesObj[value[1]]);
                    linksObj[link.name].prop('direction', null);
                  }
                  break;
                case 'parent':
                  linksObj[link.name].target(classesObj[value]);
                  break;
                case 'multiplicity':
                  linksObj[link.name].prop('cardinality/source', value[0]);
                  linksObj[link.name].prop('cardinality/target', value[1]);
                  break;
                case 'roles':
                  linksObj[link.name].prop('roles/source', value[0]);
                  linksObj[link.name].prop('roles/target', value[1]);
                  break;
                default:
                  linksObj[link.name].prop(attribute, value)
                  break;
              }
            });
          } else {
            console.log('inheritance', link);
            var inheritanceName = link.name;//link.name.split('_')[0];
            if (!inheritancesObj[inheritanceName]) {
              inheritancesObj[inheritanceName] = crowd.palette.elements.inheritance.clone();
              crowd.workspace.graph.addCell(inheritancesObj[inheritanceName]);
              $.each(link, function (attribute, value) {
                switch (attribute) {
                  case 'constraint':
                    value?.forEach(function (constraint) {
                      switch (constraint) {
                        case 'disjoint':
                          inheritancesObj[inheritanceName].prop('subtype', 'disjoint');
                          break;
                        case 'covering':
                          inheritancesObj[inheritanceName].prop('covering', true);
                          break;
                      }
                    });
                    break;
                  case 'position': case 'size': case 'uri':
                    inheritancesObj[inheritanceName].prop(attribute, value)
                    break;
                }
              });
            }

            var parentLinkName = link.parent + '-' + fromURI(inheritanceName);
            linksObj[parentLinkName] = crowd.palette.links.generalization.clone();
            linksObj[parentLinkName].source(inheritancesObj[inheritanceName]);
            linksObj[parentLinkName].target(classesObj[link.parent]);
            crowd.workspace.graph.addCell(linksObj[parentLinkName]);
            linksObj[parentLinkName].prop('uri', parentLinkName);


            link.classes.forEach(function (connectedClass, index) {
              console.log(connectedClass);
              var linkName = link.classes[index] + '-' + fromURI(inheritanceName);
              linksObj[linkName] = crowd.palette.links.generalization.clone();
              linksObj[linkName].source(inheritancesObj[inheritanceName]);
              linksObj[linkName].target(classesObj[connectedClass]);
              crowd.workspace.graph.addCell(linksObj[linkName]);
              linksObj[linkName].prop('uri', linkName);
              linksObj[linkName].prop('inheritChild', true);
            });
          }
        });
      }

    }
  },
}
