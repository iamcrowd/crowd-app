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
    }

    //add joint uml class to palette elements
    crowd.palette.elements.class = new joint.shapes.uml.Class({
      parentType: 'class',
      type: 'class',
      name: 'Class',
      uri: 'http://crowd.fi.uncoma.edu.ar#Class',
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
        width: 100,
        height: 80
      },
    });

    //add joint uml abstract to palette elements
    crowd.palette.elements.abstract = new joint.shapes.uml.Abstract({
      parentType: 'class',
      type: 'abstract',
      name: 'Abstract',
      uri: 'http://crowd.fi.uncoma.edu.ar#Abstract',
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
        width: 100,
        height: 80
      },
    });

    //add joint uml interface to palette elements
    crowd.palette.elements.interface = new joint.shapes.uml.Interface({
      parentType: 'class',
      type: 'interface',
      name: 'Interface',
      uri: 'http://crowd.fi.uncoma.edu.ar#Interface',
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
        width: 100,
        height: 80
      },
    });

    //add joint uml association to palette links
    crowd.palette.links.association = new joint.shapes.standard.Link({
      type: 'association',
      cardinality: {
        source: null,
        target: null
      },
      direction: 'target',
      uri: 'http://crowd.fi.uncoma.edu.ar#Association',
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
      direction: 'target',
      uri: 'http://crowd.fi.uncoma.edu.ar#Aggregation',
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
      direction: 'target',
      uri: 'http://crowd.fi.uncoma.edu.ar#Composition',
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
      direction: 'target',
      uri: 'http://crowd.fi.uncoma.edu.ar#Generalization',
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
      direction: 'target',
      uri: 'http://crowd.fi.uncoma.edu.ar#Implementation',
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
    //add the link tool with the uml association link type to the basic tools of crowd editor
    crowd.workspace.tools.elements.basicTools.push(crowd.workspace.tools.elements.linkTool({
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
    }));

    //add the link tool with the uml aggregation link type to the basic tools of crowd editor
    crowd.workspace.tools.elements.basicTools.push(crowd.workspace.tools.elements.linkTool({
      link: {
        type: 'aggregation',
        props: {
          cardinality: { source: '0..1', target: '0..1' }
        }
      },
      offset: { x: -10, y: -10 },
      markup: crowd.workspace.tools.elements.markup({
        icon: 'arrow_upward',
        tooltip: {
          title: 'Click and drag to connect the object with an <b class="crowd-bold-color">aggregation</b>',
          placement: "top"
        }
      })
    }));

    //add the link tool with the uml composition link type to the basic tools of crowd editor
    crowd.workspace.tools.elements.basicTools.push(crowd.workspace.tools.elements.linkTool({
      link: {
        type: 'composition',
        props: {
          cardinality: { source: '0..1', target: '0..1' }
        }
      },
      offset: { x: 20, y: 20 },
      markup: crowd.workspace.tools.elements.markup({
        icon: 'arrow_forward',
        tooltip: {
          title: 'Click and drag to connect the object with a <b class="crowd-bold-color">composition</b>',
          placement: "right"
        }
      })
    }));

    //add the link tool with the uml generalization link type to the basic tools of crowd editor
    crowd.workspace.tools.elements.basicTools.push(crowd.workspace.tools.elements.linkTool({
      link: {
        type: 'generalization'
      },
      x: '50%',
      offset: { x: 0, y: -10 },
      markup: crowd.workspace.tools.elements.markup({
        icon: 'call_merge',
        tooltip: {
          title: 'Click and drag to connect the object with a <b class="crowd-bold-color">generalization</b>',
          placement: "top"
        }
      })
    }));

    //link tool with the uml implementation link type to the basic tools of crowd editor
    crowd.workspace.tools.elements.basicTools.push(crowd.workspace.tools.elements.linkTool({
      link: {
        type: 'implementation'
      },
      x: '0%',
      offset: { x: 10, y: -10 },
      markup: crowd.workspace.tools.elements.markup({
        icon: 'call_split',
        tooltip: {
          title: 'Click and drag to connect the object with a <b class="crowd-bold-color">implementation</b>',
          placement: "top"
        }
      })
    }));

    //link tool for classes
    var linkClassTool = function (config) {
      config = config ? config : {};
      return crowd.workspace.tools.elements.linkElementTool({
        elementType: crowd.palette.elements.class,
        x: '100%', y: '50%', offset: { x: 20, y: 10 },
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
        x: '50%', y: '100%', offset: { x: 0, y: 30 },
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
        x: '0%', y: '50%', offset: { x: -20, y: 10 },
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
            direction: config.direction
          }
        }
      });
    };

    //create tools view for classes
    crowd.workspace.tools.elements.elementsToolsView['class'] = new joint.dia.ToolsView({
      name: 'class-tools',
      tools: crowd.workspace.tools.elements.basicTools.concat([
        linkClassTool({ type: 'association', cardinality: { source: '0..1', target: '0..1' }, direction: null }),
        linkAbstractTool({ type: 'generalization', cardinality: { source: null, target: null }, direction: 'target' }),
        linkInterfaceTool({ type: 'implementation', cardinality: { source: null, target: null }, direction: 'target' }),
      ])
    });

    //create tools view for abstracts
    crowd.workspace.tools.elements.elementsToolsView['abstract'] = new joint.dia.ToolsView({
      name: 'abstract-tools',
      tools: crowd.workspace.tools.elements.basicTools.concat([
        linkClassTool({ type: 'association', cardinality: { source: '0..1', target: '0..1' }, direction: null }),
        linkAbstractTool({ type: 'association', cardinality: { source: '0..1', target: '0..1' }, direction: null }),
        linkInterfaceTool({ type: 'implementation', cardinality: { source: null, target: null }, direction: 'target' }),
      ])
    });

    //create tools view for interfaces
    crowd.workspace.tools.elements.elementsToolsView['interface'] = new joint.dia.ToolsView({
      name: 'interface-tools',
      tools: crowd.workspace.tools.elements.basicTools.concat([
        linkClassTool({ type: 'implementation', cardinality: { source: null, target: null }, direction: 'source' }),
        linkAbstractTool({ type: 'implementation', cardinality: { source: null, target: null }, direction: 'target' }),
        linkInterfaceTool({ type: 'implementation', cardinality: { source: null, target: null }, direction: 'target' }),
      ])
    });
  },
  initLinksToolsViews: function (crowd) {

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
      console.log('change:name', { element, newName });

      if (element.isElement()) {
        element.attributes.uri = element.attributes.uri.split("#")[0] + "#" + newName;
        $('#crowd-inspector-content-uri-' + crowd.id).val(element.attributes.uri);
        element.findView(crowd.workspace.paper).render();
      }
    });

    //event when the elements uri change
    crowd.workspace.graph.on('change:uri', function (element, newUri) {
      console.log('change:uri', { element, newUri });

      if (element.isElement()) {
        var newName = newUri.split('#');
        newName.shift();
        newName = newName.join('#');

        element.attributes.name = newName;
        $('#crowd-inspector-content-name-' + crowd.id).val(newName);
        element.trigger('change:name', element, element.prop('name'));
      }
    });

    //event when the links type change (types are: association, aggregation, composition, etc)
    crowd.workspace.graph.on('change:type', function (link, newType) {
      console.log('change:type', { link, newType });

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

        if (newType == 'generalization' || newType == 'implementation')
          link.attributes.cardinality = { source: null, target: null };
        link.trigger('change:cardinality', link, link.prop('cardinality'));

        crowd.inspector.loadContent();
      }
    });

    //event when the links cardinality change
    crowd.workspace.graph.on('change:cardinality', function (link, newCardinality) {
      console.log('change:cardinality', { link, newCardinality });

      if (link.isLink() && newCardinality != null) {
        link.labels([
          {
            attrs: {
              text: {
                text: (newCardinality.source != "null" ? newCardinality.source : null),
              }
            },
            position: {
              distance: 25,
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
              distance: -25,
              offset: 20
            }
          }
        ]);
      }
    });

    //event when the links direction change
    crowd.workspace.graph.on('change:direction', function (link, newDirection) {
      console.log('change:direction', { link, newDirection });

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
  },
  initInspector: function (crowd) {
    //add uri attribute to content for all types
    crowd.inspector.addAttribute({ label: 'URI', property: 'uri', type: 'text', input: 'textarea' });

    //add name and type attribute to content if are class, abstract or interface elements
    switch (crowd.inspector.model.attributes.type) {
      case 'class':
      case 'abstract':
      case 'interface':
        crowd.inspector.addAttribute({ label: 'Name', property: 'name', type: 'text', input: 'textarea' });
        crowd.inspector.addAttribute({
          label: 'Type', property: 'type', type: 'multiple',
          values: [
            { label: 'Class', value: 'class' },
            { label: 'Abstract', value: 'abstract' },
            { label: 'Interface', value: 'interface' },
          ]
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
        crowd.inspector.addAttribute({
          label: 'Direction', property: 'direction', type: 'multiple',
          values: [
            { label: 'Source', value: 'source' },
            { label: 'Target', value: 'target' },
          ]
        });
        break;
    }

    //add the cardinality attribute if are association, aggregation or composition links
    switch (crowd.inspector.model.attributes.type) {
      case 'association':
      case 'aggregation':
      case 'composition':
        crowd.inspector.addAttribute({ label: 'Cardinality Source', property: 'cardinality/source', type: 'text' });
        crowd.inspector.addAttribute({ label: 'Cardinality Target', property: 'cardinality/target', type: 'text' });
        break;
    }
  }
}
