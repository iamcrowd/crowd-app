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
      classStroke: getCSS('color', 'crowd-class-stroke-color'),
      inheritanceStroke: getCSS('color', 'crowd-inheritance-stroke-color'),
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
          stroke: crowd.palette.colors.classStroke,
          'stroke-width': 0.5
        },
        '.uml-class-attrs-rect': {
          fill: crowd.palette.colors.classAlt,
          stroke: crowd.palette.colors.classStroke,
          'stroke-width': 0.5
        },
        '.uml-class-methods-rect': {
          fill: crowd.palette.colors.classAlt,
          stroke: crowd.palette.colors.classStroke,
          'stroke-width': 0.5
        },
        '.uml-class-name-text': { fill: '#000000' },
        '.uml-class-attrs-text': { fill: '#000000' },
        '.uml-class-methods-text': { fill: '#000000' }
      },
      size: {
        width: 90,
        height: 90
      },
      uncollapsedMarkup: '<g class="rotatable"><g class="scalable"><rect class="uml-class-name-rect"/><rect class="uml-class-attrs-rect"/><rect class="uml-class-methods-rect"/></g><text class="uml-class-name-text"/><text class="uml-class-attrs-text"/><text class="uml-class-methods-text"/></g>',
      collapsedMarkup: '<g class="rotatable"><g class="scalable"><rect class="uml-class-name-rect"/></g><text class="uml-class-name-text"/></g>'
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
          stroke: crowd.palette.colors.classStroke,
          'stroke-width': 0.5
        },
        '.uml-class-attrs-rect': {
          fill: crowd.palette.colors.abstractAlt,
          stroke: crowd.palette.colors.classStroke,
          'stroke-width': 0.5
        },
        '.uml-class-methods-rect': {
          fill: crowd.palette.colors.abstractAlt,
          stroke: crowd.palette.colors.classStroke,
          'stroke-width': 0.5
        },
        '.uml-class-name-text': { fill: '#000000' },
        '.uml-class-attrs-text': { fill: '#000000' },
        '.uml-class-methods-text': { fill: '#000000' }
      },
      size: {
        width: 90,
        height: 90
      },
      uncollapsedMarkup: '<g class="rotatable"><g class="scalable"><rect class="uml-class-name-rect"/><rect class="uml-class-attrs-rect"/><rect class="uml-class-methods-rect"/></g><text class="uml-class-name-text"/><text class="uml-class-attrs-text"/><text class="uml-class-methods-text"/></g>',
      collapsedMarkup: '<g class="rotatable"><g class="scalable"><rect class="uml-class-name-rect"/></g><text class="uml-class-name-text"/></g>'
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
          stroke: crowd.palette.colors.classStroke,
          'stroke-width': 0.5
        },
        '.uml-class-attrs-rect': {
          fill: crowd.palette.colors.interfaceAlt,
          stroke: crowd.palette.colors.classStroke,
          'stroke-width': 0.5
        },
        '.uml-class-methods-rect': {
          fill: crowd.palette.colors.interfaceAlt,
          stroke: crowd.palette.colors.classStroke,
          'stroke-width': 0.5
        },
        '.uml-class-name-text': { fill: '#000000' },
        '.uml-class-attrs-text': { fill: '#000000' },
        '.uml-class-methods-text': { fill: '#000000' }
      },
      size: {
        width: 90,
        height: 90
      },
      uncollapsedMarkup: '<g class="rotatable"><g class="scalable"><rect class="uml-class-name-rect"/><rect class="uml-class-attrs-rect"/><rect class="uml-class-methods-rect"/></g><text class="uml-class-name-text"/><text class="uml-class-attrs-text"/><text class="uml-class-methods-text"/></g>',
      collapsedMarkup: '<g class="rotatable"><g class="scalable"><rect class="uml-class-name-rect"/></g><text class="uml-class-name-text"/></g>'
    });

    //add joint uml inheritance to palette elements
    crowd.palette.elements.inheritance = new joint.shapes.erd.Attribute({
      parentType: 'inheritance',
      type: 'inheritance',
      subtype: 'overlaped',
      covering: false,
      attrs: {
        text: {
          fill: crowd.palette.colors.inheritanceStroke,
          text: 'o',
          class: 'crowd-element-text l inheritance',
          'dominant-baseline': 'middle'
        },
        '.outer': {
          fill: crowd.palette.colors.inheritance,
          stroke: crowd.palette.colors.inheritanceStroke,
          'stroke-width': 2
        }
      },
      size: {
        width: 30,
        height: 30
      }
    });

    //add joint uml association to palette links
    crowd.palette.links.association = new joint.shapes.standard.Link({
      parentType: 'association',
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
      enumerate: ['roles/source', 'roles/target'],
      attrs: {
        line: {
          stroke: 'black',
          strokeWidth: 2,
          sourceMarker: {},
          targetMarker: {
            d: 'M 20 10 0 0 20 -10 Z'
          }
        }
      },
      showAssoc: true,
      showRoles: false
    });

    //add joint uml aggregation to palette links
    crowd.palette.links.aggregation = new joint.shapes.standard.Link({
      parentType: 'aggregation',
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
      enumerate: ['roles/source', 'roles/target'],
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
      showAssoc: true,
      showRoles: false
    });

    //add joint uml composition to palette links
    crowd.palette.links.composition = new joint.shapes.standard.Link({
      parentType: 'composition',
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
      enumerate: ['roles/source', 'roles/target'],
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
      showAssoc: true,
      showRoles: false
    });

    //add joint uml generalization to palette links
    crowd.palette.links.generalization = new joint.shapes.standard.Link({
      parentType: 'generalization',
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
      enumerate: ['roles/source', 'roles/target'],
      attrs: {
        line: {
          stroke: crowd.palette.colors.inheritanceStroke,
          strokeWidth: 2,
          sourceMarker: {},
          targetMarker: {
            stroke: crowd.palette.colors.inheritanceStroke,
            fill: crowd.palette.colors.inheritanceStroke,
            d: 'M 20 10 0 0 20 -10 Z'
          }
        }
      },
    });

    //add joint uml generalization to palette links
    crowd.palette.links.implementation = new joint.shapes.standard.Link({
      parentType: 'implementation',
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
      enumerate: ['roles/source', 'roles/target'],
      attrs: {
        line: {
          stroke: crowd.palette.colors.inheritanceStroke,
          strokeWidth: 2,
          strokeDasharray: '4 2',
          sourceMarker: {},
          targetMarker: {
            stroke: crowd.palette.colors.inheritanceStroke,
            fill: crowd.palette.colors.inheritanceStroke,
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
          // background: crowd.palette.colors.class,
          tooltip: {
            title: 'Click and drag to make a <b class="crowd-bold-color">class</b> and connect with it',
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
          // background: crowd.palette.colors.abstract,
          tooltip: {
            title: 'Click and drag to make an <b class="crowd-bold-color">abstract</b> and connect with it',
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
          // background: crowd.palette.colors.interface,
          tooltip: {
            title: 'Click and drag to make a <b class="crowd-bold-color">interface</b> and connect with it',
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
          // background: crowd.palette.colors.inheritance,
          tooltip: {
            title: 'Click and drag to make a <b class="crowd-bold-color">inheritance</b> and connect with it',
            placement: "bottom"
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
    //definition of association inheritance tool for links
    var linkGeneralizationTool = function () {
      return crowd.workspace.tools.links.linkTool({
        link: {
          type: 'generalization',
          props: {
            direction: 'target',
            inheritChild: false
          }
        },
        markup: crowd.workspace.tools.elements.markup({
          icon: 'call_merge',
          tooltip: {
            title: 'Click and drag to connect the link with a <b class="crowd-bold-color">generalization</b> parent',
            placement: "top"
          },
          attributes: {
            circle: { cy: 0, opacity: 1 },
            text: { x: -7, y: 7 }
          }
        })
      })
    };

    //definition of role A inheritance tool for links
    var linkRoleSourceGeneralizationTool = function () {
      return crowd.workspace.tools.links.linkRoleTool({
        role: 'roleSource',
        distance: '25%',
        link: {
          type: 'generalization',
          props: {
            direction: 'target',
            inheritChild: false
          }
        },
        markup: crowd.workspace.tools.elements.markup({
          icon: 'call_merge',
          tooltip: {
            title: 'Click and drag to connect the link role with a <b class="crowd-bold-color">generalization</b> parent',
            placement: "top"
          },
          attributes: {
            circle: { cy: 0, opacity: 1 },
            text: { x: -7, y: 7 }
          }
        })
      })
    };

    //definition of role B inheritance tool for links
    var linkRoleTargetGeneralizationTool = function () {
      return crowd.workspace.tools.links.linkRoleTool({
        role: 'roleTarget',
        distance: '75%',
        link: {
          type: 'generalization',
          props: {
            direction: 'target',
            inheritChild: false
          }
        },
        markup: crowd.workspace.tools.elements.markup({
          icon: 'call_merge',
          tooltip: {
            title: 'Click and drag to connect the link role with a <b class="crowd-bold-color">generalization</b> parent',
            placement: "top"
          },
          attributes: {
            circle: { cy: 0, opacity: 1 },
            text: { x: -7, y: 7 }
          }
        })
      })
    };

    //define tools view for association
    crowd.workspace.tools.links.linksToolsView['association'] = function () {
      return new joint.dia.ToolsView({
        name: 'link-association-tools',
        tools: [
          ...crowd.workspace.tools.links.basic(),
          ...[linkGeneralizationTool()]
          // ...[linkGeneralizationTool(), linkRoleSourceGeneralizationTool(), linkRoleTargetGeneralizationTool()]
        ]
      });
    }

    //define tools view for aggregation
    crowd.workspace.tools.links.linksToolsView['aggregation'] = function () {
      return new joint.dia.ToolsView({
        name: 'link-aggregation-tools',
        tools: [
          ...crowd.workspace.tools.links.basic(),
          ...[linkGeneralizationTool()]
          // ...[linkGeneralizationTool(), linkRoleSourceGeneralizationTool(), linkRoleTargetGeneralizationTool()]
        ]
      });
    }

    //define tools view for composition
    crowd.workspace.tools.links.linksToolsView['composition'] = function () {
      return new joint.dia.ToolsView({
        name: 'link-composition-tools',
        tools: [
          ...crowd.workspace.tools.links.basic(),
          ...[linkGeneralizationTool()]
          // ...[linkGeneralizationTool(), linkRoleSourceGeneralizationTool(), linkRoleTargetGeneralizationTool()]
        ]
      });
    }

    //add role ports for specific links when they been added
    crowd.workspace.graph.on('add', function (link) {
      // if (link.prop('type') == 'association' || link.prop('type') == 'aggregation' || link.prop('type') == 'composition') {
      //   crowd.workspace.tools.links.linkRolePort({ link: link, role: 'roleSource', position: { distance: 0.25, offset: 0 } });
      //   crowd.workspace.tools.links.linkRolePort({ link: link, role: 'roleTarget', position: { distance: 0.75, offset: 0 } });
      // }
    });
  },
  initChangeAttributesEvents: function (crowd) {
    //event when the elements type change (types are: entity, weakEntity, attribute, etc)
    crowd.workspace.graph.on('change:type', function (element, newType) {
      console.log('change:type', { element, newType });

      if (element.isElement()) {
        //replace element attributes, markup and getClassName function with the palette default component of the newtype
        element.attributes.attrs = $.extend(true, {}, crowd.palette.elements[newType].attributes.attrs);
        element.markup = element.attributes.collapsed ? crowd.palette.elements[newType].attributes.collapsedMarkup : crowd.palette.elements[newType].markup;
        element.getClassName = crowd.palette.elements[newType].getClassName;

        //get element view
        var elementView = element.findView(crowd.workspace.paper);

        //redraw the element and their tools with the new type style
        elementView.render();
        crowd.workspace.renderElementTools(elementView);

        //trigger the change name event to update the text with the name of the element
        //(because it is overwrited when replaced the attributes.attrs)
        element.trigger('change:name', element, element.prop('name'));

        element.trigger('change:syntax', element, element.prop('syntax'));
        element.trigger('change:semantic', element, element.prop('semantic'));

        crowd.inspector.loadContent();
      }
    });

    //event when the elements name change
    crowd.workspace.graph.on('change:name', function (element, newName) {
      // console.log('change:name', { element, newName });

      if (element.isElement()) {
        // element.attributes.uri = element.attributes.uri.split("#")[0] + "#" + toURI(newName);
        // $('#crowd-inspector-content--uri--' + crowd.id).val(element.attributes.uri);
        element.findView(crowd.workspace.paper).render();

        element.trigger('change:properties', element, element.prop('properties'));
      }
    });

    //event when the elements uri change
    crowd.workspace.graph.on('change:uri', function (element, newUri) {
      // console.log('change:uri', { element, newUri });

      if (element.isElement()) {
        // element.attributes.name = fromURI(newUri);
        element.prop('name', joint.util.breakText(fromURI(newUri), { width: element.attributes.size.width + 25 }));
        $('#crowd-inspector-content--name--' + crowd.id).val(fromURI(newUri));
        element.trigger('change:name', element, element.prop('name'));
        if (element.attributes.parentType == 'class') classFitToContent(element);
      }
    });

    var classFitToContent = function (element) {
      // console.log('classFitToContent', element);

      //get element view
      var elementView = element.findView(crowd.workspace.paper);

      // element.size({ width: 90, height: 90 });
      // setTimeout(function () {
      //   for (var i = 0; i < 10; i++) {
      //     var bbox = elementView.getBBox();
      //     element.size(bbox);
      //   }

      //   // var actualSize = element.size();
      //   // actualSize.width += 20;
      //   // actualSize.height += 40;

      //   // element.size(actualSize);

      //   //redraw the element and their tools with the new type style
      elementView.render();
      // crowd.workspace.renderElementTools(elementView);
      // });
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

        setTimeout(function () {
          classFitToContent(element);
        });
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

        setTimeout(function () {
          classFitToContent(element);
        });
      }
    });

    //event when the elements properties/attributes (semantic attributes) change
    crowd.workspace.graph.on('change:properties', function (element, newProperties, opt) {
      // console.log('change:properties', { element, previosAttributes: element._previousAttributes.attributes, newProperties, opt });

      if (element.isElement() && element.attributes.parentType == 'class') {
        //set visual attributes property on element
        element.prop('attributes',
          $.map(newProperties.attributes, function (attribute) {
            return joint.util.breakText(
              '- ' + (attribute.name ? toInfixCaps(fromURI(attribute.name)) : '_') + ' : ' + (attribute.datatype ? attribute.datatype : '_'),
              { width: element.attributes.size.width + 25 }
            );
          })
        );

        //set visual methods property on element
        element.prop('methods', $.map(newProperties.methods, function (method) {
          return joint.util.breakText(
            '+ ' + (method ? toInfixCaps(fromURI(method)) + '()' : '_'),
            { width: element.attributes.size.width + 25 }
          );
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

      if (element.isElement()
        && crowd.palette.elements[element.prop('type')].attributes.collapsedMarkup) {
        //replace the element markup with the collapsed markup and viceversa
        element.markup = newCollapsed
          ? crowd.palette.elements[element.prop('type')].attributes.collapsedMarkup
          : (crowd.palette.elements[element.prop('type')].attributes.uncollapsedMarkup
            ? crowd.palette.elements[element.prop('type')].attributes.uncollapsedMarkup
            : crowd.palette.elements[element.prop('type')].markup);

        //get element view
        var elementView = element.findView(crowd.workspace.paper);

        //calculate resize of the height of the element according to the amount of methods and attributes and the name rect size
        var actualSize = element.size();
        var amountAttr = element.attributes?.attributes?.length + element.attributes?.methods?.length;
        var attrSize = 10;
        actualSize.height = newCollapsed
          ? parseInt($(elementView.el.getElementsByClassName('uml-class-name-rect')).attr('height'))
          : actualSize.height + 40 + amountAttr * attrSize;

        //redraw the element and their tools with the new type style
        elementView.render();
        crowd.workspace.renderElementTools(elementView);

        //apply resize and render again
        setTimeout(function () {
          element.size(actualSize);
          elementView.render();
          crowd.workspace.renderElementTools(elementView);

          if (!newCollapsed)
            classFitToContent(element);
        });
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

        link.prop('parentType', crowd.palette.links[newType].attributes.parentType);

        //get link view
        var linkView = link.findView(crowd.workspace.paper);

        //redraw the link with the new style
        linkView.render();

        //trigger the change direction event to update the marker with the direction of the link
        //(because it is overwrited when replaced the attributes.attrs)
        //check if the newType is valid with that direction
        if (newType != 'association' && (!link.prop('direction') || link.prop('direction') == 'null'))
          link.attributes.direction = 'target';
        else
          link.attributes.direction = null;

        if (newType == 'generalization' || newType == 'implementation') {
          // link.attributes.cardinality = { source: null, target: null };
          // link.attributes.roles = { source: null, target: null };
          if (link.attributes.inheritChild) link.attributes.direction = null;
        }

        link.trigger('change:direction', link, link.prop('direction'));
        link.trigger('change:cardinality', link, link.prop('cardinality'));
        link.trigger('change:roles', link, link.prop('roles'));
        link.trigger('change:uri', link, link.prop('uri'));

        link.trigger('change:syntax', link, link.prop('syntax'));
        link.trigger('change:semantic', link, link.prop('semantic'));

        crowd.inspector.loadContent();
      }
    });

    //event when the links cardinality or roles change
    crowd.workspace.graph.on('change:cardinality change:roles change:uri change:showAssoc change:showRoles', function (link, newCardinalityRoleUri) {
      // console.log('change:cardinality change:roles change:uri change:showAssoc change:showRoles', { link, newCardinalityRoleUri });

      if (link.isLink() && newCardinalityRoleUri != null) {
        var newCardinality = link.attributes.cardinality;
        var newRoles = link.attributes.roles;
        var newUri = link.attributes.uri;
        link.labels([
          {
            attrs: {
              text: {
                text: (newCardinality.source != "null"
                  && link.attributes.type != 'generalization'
                  && link.attributes.type != 'implementation'
                  ? newCardinality.source : null),
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
                text: (newCardinality.target != "null"
                  && link.attributes.type != 'generalization'
                  && link.attributes.type != 'implementation'
                  ? newCardinality.target : null),
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
                text: (link.attributes.showRoles && newRoles.source != "null" ? fromURI(newRoles.source) : null),
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
                text: (link.attributes.showRoles && newRoles.target != "null" ? fromURI(newRoles.target) : null),
              }
            },
            position: {
              distance: 0.75,
              offset: -20
            }
          },
          ...link.attributes.type != 'generalization' && link.attributes.type != 'implementation' ? [{
            attrs: {
              text: {
                text: link.attributes.showAssoc ? fromURI(newUri) : null,
              }
            },
            position: {
              distance: 0.5,
              offset: 20
            }
          }] : [],
        ]);

        // if (newRoles.source && newRoles.source != "null") link.ports.roleSource.attributes.uri = newRoles.source;
        // if (newRoles.target && newRoles.target != "null") link.ports.roleTarget.attributes.uri = newRoles.target;
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

    //mark or unmark the element or link when the syntax property changed
    crowd.workspace.graph.on('change:syntax', function (cell, newSyntax) {
      // console.log('change:syntax', { cell, newSyntax });
      var syntaxError = newSyntax && newSyntax != '';
      var color = getCSS('color', 'crowd-syntax-error-color');
      var strokeWidth = 2;
      if (cell.isElement()) {
        if (cell.attributes.parentType == 'class') {
          color = syntaxError ? color : crowd.palette.elements[cell.attributes.type]?.attr('.uml-class-name-rect/stroke');
          strokeWidth = syntaxError ? strokeWidth : crowd.palette.elements[cell.attributes.type]?.attr('.uml-class-name-rect/stroke-width');
          cell.attr('.uml-class-name-rect/stroke', color);
          cell.attr('.uml-class-name-rect/stroke-width', strokeWidth);
          cell.attr('.uml-class-attrs-rect/stroke', color);
          cell.attr('.uml-class-attrs-rect/stroke-width', strokeWidth);
          cell.attr('.uml-class-methods-rect/stroke', color);
          cell.attr('.uml-class-methods-rect/stroke-width', strokeWidth);
        } else if (cell.attributes.parentType == 'inheritance') {
          color = syntaxError ? color : crowd.palette.elements[cell.attributes.type]?.attr('.outer/stroke');
          cell.attr('.outer/stroke', color);
        }
      } else if (cell.isLink()) {
        color = syntaxError ? color : crowd.palette.links[cell.attributes.type]?.attr('line/stroke');
        cell.attr('line/stroke', color);
      }

      if (!syntaxError)
        cell.trigger('change:semantic', cell, cell.prop('semantic'));

      crowd.inspector.loadContent();
    });

    //mark or unmark the element or link when the semantic property changed
    crowd.workspace.graph.on('change:semantic', function (cell, newSemantic) {
      // console.log('change:semantic', { cell, newSemantic });
      var unsatisfiable = newSemantic?.contents?.find(function (content) { return content.value == 'unsatisfiable' });
      var inferred = newSemantic?.contents?.find(function (content) { return content.value == 'inferred' });
      var color = unsatisfiable != null ? getCSS('color', 'crowd-unsat-color') : getCSS('color', 'crowd-inferred-color');
      var strokeWidth = 2;
      if (cell.isElement()) {
        if (cell.attributes.parentType == 'class') {
          color = unsatisfiable != null || inferred != null ? color : crowd.palette.elements[cell.attributes.type]?.attr('.uml-class-name-rect/stroke');
          strokeWidth = unsatisfiable != null || inferred != null ? strokeWidth : crowd.palette.elements[cell.attributes.type]?.attr('.uml-class-name-rect/stroke-width');
          cell.attr('.uml-class-name-rect/stroke', color);
          cell.attr('.uml-class-name-rect/stroke-width', strokeWidth);
          cell.attr('.uml-class-attrs-rect/stroke', color);
          cell.attr('.uml-class-attrs-rect/stroke-width', strokeWidth);
          cell.attr('.uml-class-methods-rect/stroke', color);
          cell.attr('.uml-class-methods-rect/stroke-width', strokeWidth);
        } else if (cell.attributes.parentType == 'inheritance') {
          color = unsatisfiable != null || inferred != null ? color : crowd.palette.elements[cell.attributes.type]?.attr('.outer/stroke');
          cell.attr('.outer/stroke', color);
        }
      } else if (cell.isLink()) {
        color = unsatisfiable != null || inferred != null ? color : crowd.palette.links[cell.attributes.type]?.attr('line/stroke');
        cell.attr('line/stroke', color);
      }

      crowd.inspector.loadContent();
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
          default: { name: 'http://crowd.fi.uncoma.edu.ar#attribute', datatype: 'string' },
          template: {
            type: 'object',
            parameters: [
              { property: 'name', type: 'text', input: 'textarea', inputRows: 2, placeholder: 'Attribute' },
              {
                property: 'datatype', type: 'select',
                values: [
                  { label: 'integer', value: 'integer' },
                  { label: 'string', value: 'string' },
                  { label: 'boolean', value: 'boolean' },
                  { label: 'decimal', value: 'decimal' },
                  { label: 'float', value: 'float' },
                  { label: 'double', value: 'double' },
                  { label: 'duration', value: 'duration' },
                  { label: 'dateTime', value: 'dateTime' },
                  { label: 'time', value: 'time' },
                  { label: 'date', value: 'date' },
                  { label: 'gYear', value: 'gYear' },
                  { label: 'gYearMonth', value: 'gYearMonth' },
                  { label: 'gYearMonthDay', value: 'gYearMonthDay' },
                  { label: 'gDay', value: 'gDay' },
                  { label: 'gMonth', value: 'gMonth' },
                  { label: 'hexBinary', value: 'hexBinary' },
                  { label: 'base64Binary', value: 'base64Binary' },
                  { label: 'anyURI', value: 'anyURI' }
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
            // { label: 'Aggregation', value: 'aggregation' },
            // { label: 'Composition', value: 'composition' },
            { label: 'Generalization', value: 'generalization' },
            // { label: 'Implementation', value: 'implementation' },
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
        // crowd.inspector.addAttribute({
        //   label: 'Direction', property: 'direction', type: 'multiple',
        //   values: [
        //     { label: 'None', value: null },
        //     { label: 'Source', value: 'source' },
        //     { label: 'Target', value: 'target' },
        //   ]
        // });
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

    //add the syntax alert message when there's a syntax error
    if (crowd.inspector.model.attributes.syntax && crowd.inspector.model.attributes.syntax != '')
      crowd.inspector.addAttribute({ property: 'syntax', type: 'alert', color: 'danger' });

    //add the semantic alert message when there's a semantic error
    if (crowd.inspector.model.attributes.semantic && crowd.inspector.model.attributes.semantic.contents?.length)
      crowd.inspector.addAttribute({ property: 'semantic', type: 'alert', color: 'warning' });
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

    //mapping of datatype to the requested format of schema
    var datatypeMap = function (datatype) {
      return 'http://www.w3.org/2001/XMLSchema#' + datatype;
    }

    //mapping of attributes to the requested format of schema
    var attributesMap = function (attributes) {
      var result = [];
      attributes.forEach(function (attribute) {
        result.push({
          name: attribute.name,
          datatype: datatypeMap(attribute.datatype)
        });
      });
      return result;
    }

    //iterates each element and add it to the correspondent collection
    crowd.workspace.graph.getCells().forEach(function (cell) {
      switch (cell.attributes.parentType) {
        case 'class': case 'association': case 'aggregation': case 'composition':
          if (cell.isElement()) {
            jsonSchema.classes.push({
              uri: cell.attributes.uri,
              name: cell.attributes.uri,
              attrs: attributesMap(cell.attributes.properties.attributes),
              methods: cell.attributes.properties.methods,
              position: cell.attributes.position,
              size: cell.attributes.size
            });
          }

          //search for links connected to the class for add them to the links collection
          var connectedLinks = $.map(crowd.workspace.graph.getConnectedLinks(cell), (link) => {
            return { cell: cell, link: link };
          });
          if (cell.ports?.roleSource != null)
            connectedLinks = [
              ...connectedLinks,
              ...$.map(crowd.workspace.graph.getConnectedLinks(cell.ports?.roleSource), (link) => {
                return { cell: cell.ports?.roleSource, link: link };
              })
            ];
          if (cell.ports?.roleTarget != null)
            connectedLinks = [
              ...connectedLinks,
              ...$.map(crowd.workspace.graph.getConnectedLinks(cell.ports?.roleTarget), (link) => {
                return { cell: cell.ports?.roleTarget, link: link };
              })
            ];

          connectedLinks.forEach(function (link) {
            var connectedClass;
            if (link.link.attributes.direction && link.link.attributes[link.link.attributes.direction].id != link.cell.id) {
              connectedClass = link.link.attributes.direction == 'source' ? link.link.getSourceCell() : link.link.getTargetCell();
            } else if (!link.link.attributes.direction && link.link.attributes.target.id != link.cell.id) {
              connectedClass = link.link.getTargetCell();
            }

            if (connectedClass &&
              (connectedClass?.attributes?.parentType == 'class'
                || connectedClass?.attributes?.parentType == 'association'
                || connectedClass?.attributes?.parentType == 'aggregation'
                || connectedClass?.attributes?.parentType == 'composition'
                || connectedClass?.attributes?.type == 'role')) {
              jsonSchema.links.push({
                ...linkTypeMap[link.link.attributes.type] != 'generalization' ? { uri: link.link.attributes.uri } : {},
                name: link.link.attributes.uri,
                ...linkTypeMap[link.link.attributes.type] == 'generalization' ? { parent: connectedClass.attributes.uri } : {},
                classes: [
                  link.cell.attributes.uri,
                  ...linkTypeMap[link.link.attributes.type] != 'generalization' ? [connectedClass.attributes.uri] : []
                ],
                type: linkTypeMap[link.link.attributes.type],
                ...linkTypeMap[link.link.attributes.type] != 'generalization' ? {
                  multiplicity: [
                    link.link.attributes.direction && link.link.attributes.direction == 'source' ? link.link.attributes.cardinality.target : link.link.attributes.cardinality.source,
                    link.link.attributes.direction && link.link.attributes.direction == 'source' ? link.link.attributes.cardinality.source : link.link.attributes.cardinality.target
                  ]
                } : {},
                ...linkTypeMap[link.link.attributes.type] != 'generalization' ? {
                  roles: [
                    link.link.attributes.direction && link.link.attributes.direction == 'source'
                      ? (link.link.attributes.roles.target ? link.link.attributes.roles.target : link.cell.attributes.uri)
                      : (link.link.attributes.roles.source ? link.link.attributes.roles.source : link.cell.attributes.uri),
                    link.link.attributes.direction && link.link.attributes.direction == 'source'
                      ? (link.link.attributes.roles.source ? link.link.attributes.roles.source : connectedClass.attributes.uri)
                      : (link.link.attributes.roles.target ? link.link.attributes.roles.target : connectedClass.attributes.uri)
                  ]
                } : {},
                ...linkTypeMap[link.link.attributes.type] != 'association' ? {
                  constraint: []
                } : {}
              });
            }
          });

          // if (cell.attributes.parentType == 'association'
          //   || cell.attributes.parentType == 'aggregation'
          //   || cell.attributes.parentType == 'composition') {
          //   //search for links in roles of an association, aggregation or composition
          //   for (let portName in cell.ports) {
          //     if (portName == "roleSource" || portName == "roleTarget") {
          //       var port = cell.ports[portName];
          //       var connectedPort;
          //       crowd.workspace.graph.getConnectedLinks(port).forEach(function (link) {
          //         if (link.attributes.direction && link.attributes[link.attributes.direction].id != port.id) {
          //           connectedPort = link.attributes.direction == 'source' ? link.getSourceCell() : link.getTargetCell();
          //         } else if (!link.attributes.direction && link.attributes.target.id != port.id) {
          //           connectedPort = link.getTargetCell();
          //         }

          //         if (connectedPort) {
          //           var roleChildUri = port.attributes.role == 'roleSource'
          //             ? cell.attributes.roles.source
          //             : cell.attributes.roles.target;
          //           var roleParentUri = connectedPort.attributes.role == "roleSource"
          //             ? connectedPort.getParentCell().attributes.roles.source
          //             : connectedPort.getParentCell().attributes.roles.target;

          //           jsonSchema.links.push({
          //             name: link.attributes.uri,
          //             parent: roleParentUri,
          //             classes: [
          //               roleChildUri,
          //             ],
          //             type: "generalization",
          //             contraints: []
          //           });
          //         }
          //       });
          //     }
          //   }
          // }
          break;
        case 'inheritance':
          //create the link for this inheritance
          var inheritanceLink = {
            name: cell.cid,
            parent: null,
            classes: [],
            constraint: [],
            type: 'generalization',
            position: cell.attributes.position,
            size: cell.attributes.size
          }
          if (cell.attributes.subtype == 'disjoint') inheritanceLink.constraint.push('disjoint');
          if (cell.attributes.covering) inheritanceLink.constraint.push('covering');

          //search for links connected to the inheritance for add classes to inheritance link
          crowd.workspace.graph.getConnectedLinks(cell).forEach(function (link) {
            if (link.attributes.type == 'generalization') {
              var connectedClass = link.attributes.source.id != cell.id
                && (link.getSourceCell().attributes.parentType == 'class'
                  || link.getSourceCell().attributes.parentType == 'association'
                  || link.getSourceCell().attributes.parentType == 'aggregation'
                  || link.getSourceCell().attributes.parentType == 'composition')
                ? link.getSourceCell()
                : (link.attributes.target.id != cell.id
                  && (link.getTargetCell().attributes.parentType == 'class'
                    || link.getTargetCell().attributes.parentType == 'association'
                    || link.getTargetCell().attributes.parentType == 'aggregation'
                    || link.getTargetCell().attributes.parentType == 'composition')
                  ? link.getTargetCell()
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
    var rolesObj = {};

    function getObj(name) {
      if (classesObj[name]) return classesObj[name];
      else if (linksObj[name]) return linksObj[name];
      else if (rolesObj[name]) return rolesObj[name];
    }

    //mapping of datatype  to the editor format
    var datatypeMap = function (datatype) {
      return datatype.split("http://www.w3.org/2001/XMLSchema#")[1] != null
        ? datatype.split("http://www.w3.org/2001/XMLSchema#")[1] : datatype;
    }

    //mapping of attributes to the editor format
    var attributesMap = function (attributes) {
      var result = [];
      attributes.forEach(function (attribute) {
        result.push({
          name: attribute.name,
          datatype: datatypeMap(attribute.datatype)
        });
      });
      return result;
    }

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
                classesObj[classe.name].prop('properties/attributes', attributesMap(value))
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
        //create links and inheritances objects with their main properties
        schema.links.forEach(function (link) {
          if (link.type != "generalization" || (link.classes.length <= 1 && link.constraint.length <= 0)) {
            linksObj[link.name] = crowd.palette.links[link.type].clone();
            crowd.workspace.graph.addCell(linksObj[link.name]);
            $.each(link, function (attribute, value) {
              switch (attribute) {
                case 'name':
                  linksObj[link.name].prop('uri', value);
                  break;
                case 'multiplicity':
                  linksObj[link.name].prop('cardinality/source', value[0]);
                  linksObj[link.name].prop('cardinality/target', value[1]);
                  break;
                case 'roles':
                  linksObj[link.name].prop('roles/source', value[0]);
                  linksObj[link.name].prop('roles/target', value[1]);
                  rolesObj[value[0]] = linksObj[link.name].ports.roleSource;
                  rolesObj[value[1]] = linksObj[link.name].ports.roleTarget;
                  break;
                case 'classes':
                  if (link.type == "generalization" && classesObj[value[0]]) {
                    linksObj[link.name].source(classesObj[value[0]]);
                  } else if (classesObj[value[0]] && classesObj[value[1]]) {
                    linksObj[link.name].source(classesObj[value[0]]);
                    linksObj[link.name].target(classesObj[value[1]]);
                    linksObj[link.name].prop('direction', null);
                  }
                  break;
                case 'parent':
                  if (classesObj[value])
                    linksObj[link.name].target(classesObj[value]);
                  break;
                default:
                  linksObj[link.name].prop(attribute, value)
                  break;
              }
            });
          } else {
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
            crowd.workspace.graph.addCell(linksObj[parentLinkName]);
            linksObj[parentLinkName].source(inheritancesObj[inheritanceName]);
            linksObj[parentLinkName].prop('uri', parentLinkName);

            link.classes.forEach(function (connectedClass, index) {
              var linkName = link.classes[index] + '-' + fromURI(inheritanceName);
              linksObj[linkName] = crowd.palette.links.generalization.clone();
              crowd.workspace.graph.addCell(linksObj[linkName]);
              linksObj[linkName].source(inheritancesObj[inheritanceName]);
              linksObj[linkName].prop('uri', linkName);
              linksObj[linkName].prop('inheritChild', true);
            });
          }
        });

        //set targets and sources of each link onces all possible linkeable objects are created
        schema.links.forEach(function (link) {
          if (link.type != "generalization" || (link.classes.length <= 1 && link.constraint.length <= 0)) {
            $.each(link, function (attribute, value) {
              switch (attribute) {
                case 'classes':
                  if (link.type == "generalization" && !classesObj[value[0]]) {
                    linksObj[link.name].source(getObj(value[0]));
                  } else if (!classesObj[value[0]] && !classesObj[value[1]]) {
                    linksObj[link.name].source(getObj(value[0]));
                    linksObj[link.name].target(getObj(value[1]));
                    linksObj[link.name].prop('direction', null);
                  }
                  break;
                case 'parent':
                  if (!classesObj[value])
                    linksObj[link.name].target(getObj(value));
                  break;
              }
            });
          } else {
            var inheritanceName = link.name;
            var parentLinkName = link.parent + '-' + fromURI(inheritanceName);
            linksObj[parentLinkName].target(getObj(link.parent));

            link.classes.forEach(function (connectedClass, index) {
              var linkName = link.classes[index] + '-' + fromURI(inheritanceName);
              linksObj[linkName].target(getObj(connectedClass));
            });

            //position inheritance circle if it has not previous position
            if (!link.position) {
              var mediumPosition = medianPoint(
                inheritancesObj[inheritanceName],
                link.classes.map(function (connectedClass) { return getObj(connectedClass) }).concat(getObj(link.parent))
              );
              inheritancesObj[inheritanceName]?.position(mediumPosition.x, mediumPosition.y);
            }
          }
        });
      }

    }

    setTimeout(function () {
      crowd.syntax.validate();
    });
  },
  positioningJSONSchema: function (schema, positionedSchema) {
    var mergedSchema = $.extend(true, {}, schema);

    mergedSchema.classes.forEach(function (classe) {
      let relative = positionedSchema.classes.find(function (r) {
        return r.uri == classe.uri || r.name == classe.name;
      });

      if (relative) {
        classe.position = relative?.position;
        classe.size = relative?.size;
      }
    });

    return mergedSchema;
  },
  initSyntaxValidator: function (crowd) {
    crowd.syntax.events = ['type', 'name', 'uri', 'attributes', 'methods', 'properties', 'direction', 'inheritChild', 'subtype', 'covering'];

    crowd.syntax.errors = {
      'class-disconnected': { value: 'class-disconnected', text: 'Class can not be disconnected of the diagram.' },
      'inheritance-disconnected': { value: 'inheritance-disconnected', text: 'Inheritance needs at least one parent class and child class connected.' },
      'inheritance-parent-exceed': { value: 'inheritance-parent-exceed', text: 'Inheritance can not have more than one parent class connected.' },
      'link-disconnected': { value: 'link-disconnected', text: 'Link needs to be connected both sides.' },
      'link-wrong-type-class': { value: 'link-disconnected', text: 'Link needs to connect two class elements.' },
      'link-wrong-type-inheritance': { value: 'link-disconnected', text: 'Link needs to connect: <ul><li>Two classes.</li><li>One class and one inheritance.</li><li>Two associations.</li></ul>' }
    };

    crowd.syntax.validateCell = function (cell) {
      var syntaxErrors = [];
      // cell.prop('syntax', null);
      if (cell.isElement()) {
        if (cell.attributes.parentType == 'class') {
          if (crowd.workspace.graph.getConnectedLinks(cell).length <= 0 && crowd.workspace.graph.getCells().length > 1)
            syntaxErrors.push(crowd.syntax.errors['class-disconnected']);
        } else if ((cell.attributes.parentType == 'inheritance')) {
          var inheritanceLinks = crowd.workspace.graph.getConnectedLinks(cell)
          if (!inheritanceLinks) {
            syntaxErrors.push(crowd.syntax.errors['inheritance-disconnected']);
          } else {
            if (
              !inheritanceLinks.some(function (link) {
                return (link.attributes.parentType == 'generalization' || link.attributes.parentType == 'implementation') && !link.attributes.inheritChild
              }) ||
              !inheritanceLinks.some(function (link) {
                return (link.attributes.parentType == 'generalization' || link.attributes.parentType == 'implementation') && link.attributes.inheritChild
              })
            ) {
              syntaxErrors.push(crowd.syntax.errors['inheritance-disconnected']);
            } else if (
              inheritanceLinks.filter(function (link) {
                return (link.attributes.parentType == 'generalization' || link.attributes.parentType == 'implementation') && !link.attributes.inheritChild
              }).length > 1
            ) {
              syntaxErrors.push(crowd.syntax.errors['inheritance-parent-exceed']);
            }
          }
        }
      } else if (cell.isLink()) {
        var linkSource = cell.getSourceCell();
        var linkTarget = cell.getTargetCell();
        if (!linkSource || !linkTarget) {
          syntaxErrors.push(crowd.syntax.errors['link-disconnected']);
        } else {
          if (cell.attributes.parentType == 'association' || cell.attributes.parentType == 'aggregation' || cell.attributes.parentType == 'composition') {
            if (linkSource.attributes.parentType != 'class' || linkTarget.attributes.parentType != 'class') {
              syntaxErrors.push(crowd.syntax.errors['link-wrong-type-class']);
            }
          } else if (cell.attributes.parentType == 'generalization' || cell.attributes.parentType == 'implementation') {
            if (!(linkSource.attributes.parentType == 'class' && linkTarget.attributes.parentType == 'class') &&
              !(linkSource.attributes.parentType == 'class' && linkTarget.attributes.parentType == 'inheritance') &&
              !(linkTarget.attributes.parentType == 'class' && linkSource.attributes.parentType == 'inheritance') &&
              !(linkTarget.attributes.parentType == 'association' && linkSource.attributes.parentType == 'association')) {
              syntaxErrors.push(crowd.syntax.errors['link-wrong-type-inheritance']);
            }
          }
        }
      }
      if (syntaxErrors.length)
        cell.prop('syntax', { title: 'Syntax Errors', contents: syntaxErrors });
      else
        cell.prop('syntax', null);
    }

    crowd.syntax.validate = function () {
      crowd.workspace.graph.getCells().forEach(function (cell) {
        cell.prop('syntax', null);
        crowd.syntax.validateCell(cell);
      });
    }
  },
  initReasoningValidator: function (crowd) {
    //todo
  },
  fromReasoning: function (crowd, schema, reasoning) {
    //use generic semantic import and mark of the editor
    //this is called after the reasoned schema is finished imported to the editor
    //once the event is triggered it was cleared
    crowd.events.onAfterFromSchema.push(function () {
      crowd.reasoning.genericMark(reasoning);
    });
    crowd.reasoning.importPositionedSchema(schema);
  }
}
