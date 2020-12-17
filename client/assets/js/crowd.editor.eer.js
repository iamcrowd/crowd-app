var CrowdEditorEer = {
  name: 'eer',
  initPalette: function (crowd) {
    //colors for palette elements
    crowd.palette.colors = {
      entity: getCSS('color', 'crowd-entity-color'),
      weakEntity: getCSS('color', 'crowd-weak-entity-color'),
      relationship: getCSS('color', 'crowd-relationship-color'),
      weakRelationship: getCSS('color', 'crowd-weak-relationship-color'),
      attribute: getCSS('color', 'crowd-attribute-color'),
      multivaluedAttribute: getCSS('color', 'crowd-multivalued-attribute-color'),
      keyAttribute: getCSS('color', 'crowd-key-attribute-color'),
      weakKeyAttribute: getCSS('color', 'crowd-weak-key-attribute-color'),
      inheritance: getCSS('color', 'crowd-inheritance-color'),
      derivedAttribute: getCSS('color', 'crowd-derived-attribute-color'),
      entityStroke: getCSS('color', 'crowd-entity-stroke-color'),
      relationshipStroke: getCSS('color', 'crowd-relationship-stroke-color'),
      attributeStroke: getCSS('color', 'crowd-attribute-stroke-color'),
      keyAttributeStroke: getCSS('color', 'crowd-key-attribute-stroke-color'),
      inheritanceStroke: getCSS('color', 'crowd-inheritance-stroke-color'),
    }

    //add joint eer entity to palette elements
    crowd.palette.elements.entity = new joint.shapes.erd.Entity({
      parentType: 'entity',
      type: 'entity',
      name: 'Entity',
      uri: 'http://crowd.fi.uncoma.edu.ar#entity',
      attrs: {
        text: {
          fill: '#000000',
          class: 'crowd-element-text'
        },
        '.outer': {
          fill: crowd.palette.colors.entity,
          stroke: crowd.palette.colors.entityStroke
        },
        '.inner': {
          fill: crowd.palette.colors.entity,
          stroke: crowd.palette.colors.entity
        }
      },
      size: {
        width: 90,
        height: 40
      }
    });

    //add joint eer weak entity to palette elements
    crowd.palette.elements.weakEntity = new joint.shapes.erd.Entity({
      parentType: 'entity',
      type: 'weakEntity',
      name: 'Weak\nEntity',
      uri: 'http://crowd.fi.uncoma.edu.ar#weak-entity',
      attrs: {
        text: {
          text: 'Weak\nEntity',
          fill: '#000000',
          class: 'crowd-element-text'
        },
        '.outer': {
          fill: 'none',
          stroke: crowd.palette.colors.entityStroke,
        },
        '.inner': {
          fill: crowd.palette.colors.weakEntity,
          stroke: crowd.palette.colors.entityStroke,
          display: 'auto'
        }
      },
      size: {
        width: 90,
        height: 40
      }
    });

    //add joint eer relationship to palette elements
    crowd.palette.elements.relationship = new joint.shapes.erd.Relationship({
      parentType: 'relationship',
      type: 'relationship',
      name: 'Relationship',
      uri: 'http://crowd.fi.uncoma.edu.ar#relationship',
      attrs: {
        text: {
          fill: '#000000',
          class: 'crowd-element-text s'
        },
        '.outer': {
          fill: crowd.palette.colors.relationship,
          stroke: crowd.palette.colors.relationshipStroke
        },
        '.inner': {
          fill: crowd.palette.colors.relationship,
          stroke: crowd.palette.colors.relationship
        }
      },
      size: {
        width: 90,
        height: 60
      }
    });

    //add joint eer weak relationship to palette elements
    crowd.palette.elements.weakRelationship = new joint.shapes.erd.Relationship({
      parentType: 'relationship',
      type: 'weakRelationship',
      name: 'Weak\nRelationship',
      uri: 'http://crowd.fi.uncoma.edu.ar#weak-relationship',
      attrs: {
        text: {
          text: 'Weak\nRelationship',
          fill: '#000000',
          class: 'crowd-element-text s'
        },
        '.outer': {
          fill: 'none',
          stroke: crowd.palette.colors.relationshipStroke
        },
        '.inner': {
          fill: crowd.palette.colors.weakRelationship,
          stroke: crowd.palette.colors.relationshipStroke,
          display: 'auto'
        }
      },
      size: {
        width: 90,
        height: 60
      }
    });

    //add joint eer key attribute to palette elements
    crowd.palette.elements.keyAttribute = new joint.shapes.erd.Attribute({
      parentType: 'attribute',
      type: 'keyAttribute',
      name: 'Key\nAttribute',
      uri: 'http://crowd.fi.uncoma.edu.ar#key-attribute',
      datatype: 'Integer',
      attrs: {
        text: {
          fill: '#000000',
          text: 'Key\nAttribute',
          class: 'crowd-element-text xs key-attribute'
        },
        '.outer': {
          fill: crowd.palette.colors.keyAttribute,
          stroke: crowd.palette.colors.keyAttributeStroke
        }
      },
      size: {
        width: 70,
        height: 40
      }
    });

    //add joint eer weak key attribute to palette elements
    crowd.palette.elements.weakKeyAttribute = new joint.shapes.erd.Attribute({
      parentType: 'attribute',
      type: 'weakKeyAttribute',
      name: 'Weak Key\nAttribute',
      uri: 'http://crowd.fi.uncoma.edu.ar#weak-key-attribute',
      datatype: 'Integer',
      attrs: {
        text: {
          fill: '#000000',
          text: 'Weak Key\nAttribute',
          class: 'crowd-element-text xs weak-key-attribute'
        },
        '.outer': {
          fill: crowd.palette.colors.weakKeyAttribute,
          stroke: crowd.palette.colors.keyAttributeStroke,
        }
      },
      size: {
        width: 70,
        height: 40
      }
    });

    //add joint eer attribute to palette elements
    crowd.palette.elements.attribute = new joint.shapes.erd.Attribute({
      parentType: 'attribute',
      type: 'attribute',
      name: 'Attribute',
      uri: 'http://crowd.fi.uncoma.edu.ar#attribute',
      datatype: 'Integer',
      attrs: {
        text: {
          fill: '#000000',
          text: 'Attribute',
          class: 'crowd-element-text xs'
        },
        '.outer': {
          fill: crowd.palette.colors.attribute,
          stroke: crowd.palette.colors.attributeStroke
        }
      },
      size: {
        width: 70,
        height: 40
      }
    });

    //add joint eer multivalued attribute to palette elements
    crowd.palette.elements.multivaluedAttribute = new joint.shapes.erd.Attribute({
      parentType: 'attribute',
      type: 'multivaluedAttribute',
      name: 'Multivalued\nAttribute',
      uri: 'http://crowd.fi.uncoma.edu.ar#multivalued-attribute',
      datatype: 'Integer',
      attrs: {
        text: {
          fill: '#000000',
          text: 'Multivalued\nAttribute',
          class: 'crowd-element-text xs'
        },
        '.outer': {
          fill: 'none',
          stroke: crowd.palette.colors.attributeStroke
        },
        '.inner': {
          fill: crowd.palette.colors.multivaluedAttribute,
          stroke: crowd.palette.colors.attributeStroke,
          display: 'auto'
        }
      },
      size: {
        width: 70,
        height: 40
      }
    });

    //add joint eer inheritance to palette elements
    crowd.palette.elements.inheritance = new joint.shapes.erd.Attribute({
      parentType: 'inheritance',
      type: 'inheritance',
      subtype: 'overlaped',
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

    //add joint eer derived attribute to palette elements
    crowd.palette.elements.derivedAttribute = new joint.shapes.erd.Attribute({
      parentType: 'attribute',
      type: 'derivedAttribute',
      name: 'Derived\nAttribute',
      uri: 'http://crowd.fi.uncoma.edu.ar#derived-attribute',
      datatype: 'Integer',
      attrs: {
        text: {
          fill: '#000000',
          text: 'Derived\nAttribute',
          class: 'crowd-element-text xs'
        },
        '.outer': {
          fill: 'none',
          stroke: crowd.palette.colors.attributeStroke,
          'stroke-dasharray': '3'
        },
        '.inner': {
          fill: crowd.palette.colors.derivedAttribute,
          stroke: crowd.palette.colors.attributeStroke,
          display: 'auto'
        }
      },
      size: {
        width: 70,
        height: 40
      }
    });

    //add joint eer connector to palette links
    crowd.palette.links.connector = new joint.shapes.standard.Link({
      type: 'connector',
      cardinality: '0..1',
      total: false,
      inherit: false,
      inheritChild: false,
      uri: 'http://crowd.fi.uncoma.edu.ar#role',
      attrs: {
        line: {
          stroke: 'black',
          strokeWidth: 2,
          sourceMarker: {},
          targetMarker: {
            stroke: 'black',
            fill: 'black',
            d: ''
          }
        }
      },
      labels: [{
        attrs: {
          text: {
            text: '0..1'
          },
          rect: {
            fill: getCSS('background-color', 'crowd-workspace')
          }
        }
      }]
    });

    //add joint eer total connector to palette links
    crowd.palette.links.total = new joint.shapes.standard.DoubleLink({
      type: 'connector',
      cardinality: '0..1',
      total: true,
      inherit: false,
      inheritChild: false,
      uri: 'http://crowd.fi.uncoma.edu.ar#role',
      attrs: {
        line: {
          stroke: getCSS('background-color', 'crowd-workspace'),
          sourceMarker: {},
          targetMarker: {
            stroke: 'black',
            fill: 'black',
            d: ''
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
            text: '0..1'
          },
          rect: {
            fill: getCSS('background-color', 'crowd-workspace')
          }
        }
      }]
    });
  },
  initElementsToolsViews: function (crowd) {
    //link tool for entities
    var linkEntityTool = function (config) {
      config = config ? config : {};
      return crowd.workspace.tools.elements.linkElementTool({
        elementType: crowd.palette.elements.entity,
        x: config.position?.x ? config.position?.x : '100%',
        y: config.position?.y ? config.position?.y : '50%',
        offset: {
          x: config.offset?.x ? config.offset?.x : 25,
          y: config.offset?.y ? config.offset?.y : 10
        },
        markup: crowd.workspace.tools.elements.markup({
          icon: 'share',
          // background: crowd.palette.colors.entity,
          tooltip: {
            title: 'Click and drag to make a <b class="crowd-bold-color">entity</b> and connect with it',
            placement: "right"
          }
        }),
        link: {
          type: config.total ? 'total' : 'connector',
          props: {
            cardinality: config.cardinality ? config.cardinality : '0..1',
            inherit: config.inherit ? config.inherit : false,
            inheritChild: config.inheritChild ? config.inheritChild : false
          }
        }
      });
    };

    //link tool for weak entities
    var linkWeakEntityTool = function (config) {
      config = config ? config : {};
      return crowd.workspace.tools.elements.linkElementTool({
        elementType: crowd.palette.elements.weakEntity,
        x: config.position?.x ? config.position?.x : '0%',
        y: config.position?.y ? config.position?.y : '50%',
        offset: {
          x: config.offset?.x ? config.offset?.x : -25,
          y: config.offset?.y ? config.offset?.y : 10
        },
        markup: crowd.workspace.tools.elements.markup({
          icon: 'share',
          // background: crowd.palette.colors.weakEntity,
          tooltip: {
            title: 'Click and drag to make a <b class="crowd-bold-color">weak entity</b> and connect with it',
            placement: "left"
          }
        }),
        link: {
          type: config.total ? 'total' : 'connector',
          props: {
            cardinality: config.cardinality ? config.cardinality : '0..1',
            inherit: config.inherit ? config.inherit : false,
            inheritChild: config.inheritChild ? config.inheritChild : false
          }
        }
      });
    };

    //link tool for relationships
    var linkRelationshipTool = function (config) {
      config = config ? config : {};
      return crowd.workspace.tools.elements.linkElementTool({
        elementType: crowd.palette.elements.relationship,
        x: config.position?.x ? config.position?.x : '100%',
        y: config.position?.y ? config.position?.y : '50%',
        offset: {
          x: config.offset?.x ? config.offset?.x : 25,
          y: config.offset?.y ? config.offset?.y : 10
        },
        markup: crowd.workspace.tools.elements.markup({
          icon: 'share',
          // background: crowd.palette.colors.relationship,
          tooltip: {
            title: 'Click and drag to make a <b class="crowd-bold-color">relationship</b> and connect with it',
            placement: "right"
          }
        }),
        link: {
          type: config.total ? 'total' : 'connector',
          props: {
            cardinality: config.cardinality ? config.cardinality : '0..1',
            inherit: config.inherit ? config.inherit : false,
            inheritChild: config.inheritChild ? config.inheritChild : false
          }
        }
      });
    };

    //link tool for weak relationships
    var linkWeakRelationshipTool = function (config) {
      config = config ? config : {};
      return crowd.workspace.tools.elements.linkElementTool({
        elementType: crowd.palette.elements.weakRelationship,
        x: config.position?.x ? config.position?.x : '0%',
        y: config.position?.y ? config.position?.y : '50%',
        offset: {
          x: config.offset?.x ? config.offset?.x : -25,
          y: config.offset?.y ? config.offset?.y : 10
        },
        markup: crowd.workspace.tools.elements.markup({
          icon: 'share',
          // background: crowd.palette.colors.weakRelationship,
          tooltip: {
            title: 'Click and drag to make a <b class="crowd-bold-color">weak relationship</b> and connect with it',
            placement: "left"
          }
        }),
        link: {
          type: config.total ? 'total' : 'connector',
          props: {
            cardinality: config.cardinality ? config.cardinality : '0..1',
            inherit: config.inherit ? config.inherit : false,
            inheritChild: config.inheritChild ? config.inheritChild : false
          }
        }
      })
    };

    //link tool for attributes
    var linkAttributeTool = crowd.workspace.tools.elements.linkElementTool({
      elementType: crowd.palette.elements.attribute,
      x: '50%', offset: { x: -25, y: -15 },
      markup: crowd.workspace.tools.elements.markup({
        icon: 'share',
        // background: crowd.palette.colors.attribute,
        tooltip: {
          title: 'Click and drag to make an <b class="crowd-bold-color">attribute</b> and connect with it',
          placement: "top"
        }
      }),
      link: {
        type: 'connector',
        props: {
          cardinality: '0..1'
        }
      }
    });

    //link tool for multivalued attributes
    var linkMultivaluedAttributeTool = crowd.workspace.tools.elements.linkElementTool({
      elementType: crowd.palette.elements.multivaluedAttribute,
      x: '50%', y: '100%', offset: { x: -25, y: 35 },
      markup: crowd.workspace.tools.elements.markup({
        icon: 'share',
        // background: crowd.palette.colors.multivaluedAttribute,
        tooltip: {
          title: 'Click and drag to make a <b class="crowd-bold-color">multivalued attribute</b> and connect with it',
          placement: "bottom"
        }
      }),
      link: {
        type: 'connector',
        props: {
          cardinality: '0..1'
        }
      }
    });

    //link tool for key attributes
    var linkKeyAttributeTool = crowd.workspace.tools.elements.linkElementTool({
      elementType: crowd.palette.elements.keyAttribute,
      x: '50%', offset: { x: 25, y: -15 },
      markup: crowd.workspace.tools.elements.markup({
        icon: 'share',
        // background: crowd.palette.colors.keyAttribute,
        tooltip: {
          title: 'Click and drag to make a <b class="crowd-bold-color">key attribute</b> and connect with it',
          placement: "top"
        }
      }),
      link: {
        type: 'connector',
        props: {
          cardinality: '0..1'
        }
      }
    });

    //link tool for weak key attributes
    var linkWeakKeyAttributeTool = crowd.workspace.tools.elements.linkElementTool({
      elementType: crowd.palette.elements.weakKeyAttribute,
      x: '50%', offset: { x: 25, y: -15 },
      markup: crowd.workspace.tools.elements.markup({
        icon: 'share',
        // background: crowd.palette.colors.weakKeyAttribute,
        tooltip: {
          title: 'Click and drag to make a <b class="crowd-bold-color">weak key attribute</b> and connect with it',
          placement: "top"
        }
      }),
      link: {
        type: 'connector',
        props: {
          cardinality: '0..1'
        }
      }
    });

    //link tool for inheritance
    var linkInheritanceTool = function (config) {
      config = config ? config : {};
      return crowd.workspace.tools.elements.linkElementTool({
        elementType: crowd.palette.elements.inheritance,
        x: '50%', y: '100%', offset: { x: 25, y: 35 },
        markup: crowd.workspace.tools.elements.markup({
          icon: 'share',
          // background: crowd.palette.colors.inheritance,
          tooltip: {
            title: 'Click and drag to make a <b class="crowd-bold-color">inheritance</b> and connect with it',
            placement: "bottom"
          }
        }),
        link: {
          type: config.total ? 'total' : 'connector',
          props: {
            cardinality: '0..1',
            inherit: config.inherit ? config.inherit : true,
            inheritChild: config.inheritChild ? config.inheritChild : false
          }
        }
      });
    }

    //link tool for generic link connection
    var linkTool = function (config) {
      config = config ? config : {};
      return crowd.workspace.tools.elements.linkTool({
        link: {
          type: 'connector',
          props: {
            cardinality: config.cardinality ? config.cardinality : '0..1',
            inherit: config.inherit ? config.inherit : false,
            inheritChild: config.inheritChild ? config.inheritChild : false
          }
        }
      });
    }

    //create tools view for entities
    crowd.workspace.tools.elements.elementsToolsView['entity'] = new joint.dia.ToolsView({
      name: 'entity-tools',
      tools: crowd.workspace.tools.elements.basicTools.concat([
        linkTool(),
        linkAttributeTool,
        linkKeyAttributeTool,
        linkRelationshipTool(),
        linkWeakRelationshipTool({ cardinality: '0..1' }),
        linkMultivaluedAttributeTool,
        linkInheritanceTool()
      ])
    });

    //create tools view for weak entities
    crowd.workspace.tools.elements.elementsToolsView['weakEntity'] = new joint.dia.ToolsView({
      name: 'weak-entity-tools',
      tools: crowd.workspace.tools.elements.basicTools.concat([
        linkTool(),
        linkAttributeTool,
        linkWeakKeyAttributeTool,
        linkRelationshipTool(),
        linkWeakRelationshipTool({ total: true }),
        linkMultivaluedAttributeTool,
        linkInheritanceTool()
      ])
    });

    //create tools view for relationship
    crowd.workspace.tools.elements.elementsToolsView['relationship'] = new joint.dia.ToolsView({
      name: 'relationship-tools',
      tools: crowd.workspace.tools.elements.basicTools.concat([
        linkTool(),
        linkAttributeTool,
        linkKeyAttributeTool,
        linkEntityTool(),
        linkWeakEntityTool(),
        linkInheritanceTool()
      ])
    });

    //create tools view for weak relationship
    crowd.workspace.tools.elements.elementsToolsView['weakRelationship'] = new joint.dia.ToolsView({
      name: 'weak-relationship-tools',
      tools: crowd.workspace.tools.elements.basicTools.concat([
        linkTool(),
        linkAttributeTool,
        linkWeakKeyAttributeTool,
        linkEntityTool({ cardinality: '0..1' }),
        linkWeakEntityTool({ total: true, cardinality: '0..*' }),
        linkInheritanceTool()
      ])
    });

    //create tools view for attribute
    crowd.workspace.tools.elements.elementsToolsView['attribute'] = new joint.dia.ToolsView({
      name: 'attribute-tools',
      tools: crowd.workspace.tools.elements.basicTools.concat([
        linkTool({ cardinality: '0..1' }),
        linkAttributeTool
      ])
    });

    //create tools view for key attribute
    crowd.workspace.tools.elements.elementsToolsView['keyAttribute'] = new joint.dia.ToolsView({
      name: 'key-attribute-tools',
      tools: crowd.workspace.tools.elements.basicTools.concat([
        linkTool({ cardinality: '0..1' })
      ])
    });

    //create tools view for weak key attribute
    crowd.workspace.tools.elements.elementsToolsView['weakKeyAttribute'] = new joint.dia.ToolsView({
      name: 'weak-key-attribute-tools',
      tools: crowd.workspace.tools.elements.basicTools.concat([
        linkTool({ cardinality: '0..1' })
      ])
    });

    //create tools view for multivalued attribute
    crowd.workspace.tools.elements.elementsToolsView['multivaluedAttribute'] = new joint.dia.ToolsView({
      name: 'multivalued-attribute-tools',
      tools: crowd.workspace.tools.elements.basicTools.concat([
        linkTool({ cardinality: '0..1' })
      ])
    });

    //create tools view for derived attribute
    crowd.workspace.tools.elements.elementsToolsView['derivedAttribute'] = new joint.dia.ToolsView({
      name: 'derived-attribute-tools',
      tools: crowd.workspace.tools.elements.basicTools.concat([
        linkTool({ cardinality: '0..1' })
      ])
    });

    //create tools view for inheritance
    crowd.workspace.tools.elements.elementsToolsView['inheritance'] = new joint.dia.ToolsView({
      name: 'inheritance-tools',
      tools: crowd.workspace.tools.elements.basicTools.concat([
        linkTool({ inherit: true, inheritChild: true }),
        linkEntityTool({ inherit: true, inheritChild: true, position: { y: '25%' }, offset: { y: -1 } }),
        linkWeakEntityTool({ inherit: true, inheritChild: true, position: { y: '25%' }, offset: { y: -1 } }),
        linkRelationshipTool({ inherit: true, inheritChild: true, position: { y: '75%' }, offset: { y: 20 } }),
        linkWeakRelationshipTool({ inherit: true, inheritChild: true, position: { y: '75%' }, offset: { y: 20 } })
      ])
    });
  },
  initLinksToolsViews: function (crowd) {
    //no extra links tools
  },
  initChangeAttributesEvents: function (crowd) {
    //event when the elements type change (types are: entity, weakEntity, attribute, etc)
    crowd.workspace.graph.on('change:type', function (element, newType) {
      // console.log('change:type', { element, newType });

      if (element.isElement()) {
        //replace element attributes and markup with the palette default component of the newtype
        element.attributes.attrs = $.extend(true, {}, crowd.palette.elements[newType].attributes.attrs);
        element.markup = crowd.palette.elements[newType].markup;

        //get element view
        var elementView = element.findView(crowd.workspace.paper);

        //redraw the element and their tools with the new type style
        elementView.render();
        crowd.workspace.renderElementTools(elementView);

        //trigger the change name event to update the text with the name of the element
        //(because it is overwrited when replaced the attributes.attrs)
        element.trigger('change:name', element, element.prop('name'));

        crowd.inspector.loadContent();
      }
    });

    //event when the elements name change
    crowd.workspace.graph.on('change:name', function (element, newName) {
      // console.log('change:name', { element, newName });

      if (element.isElement()) {
        element.attr('text/text', joint.util.breakText(newName, { width: element.attributes.size.width }));
        // element.attr('text/text', newName);
        element.attributes.uri = element.attributes.uri.split("#")[0] + "#" + toURI(newName);
        $('#crowd-inspector-content--uri--' + crowd.id).val(element.attributes.uri);
      }
    });

    //event when the elements uri change
    crowd.workspace.graph.on('change:uri', function (element, newUri) {
      // console.log('change:uri', { element, newUri });

      if (element.isElement() && element.attributes.parentType != "inheritance") {
        element.attr('text/text', joint.util.breakText(fromURI(newUri), { width: element.attributes.size.width }));
        // element.attr('text/text', fromURI(newUri));
        element.attributes.name = fromURI(newUri);
        $('#crowd-inspector-content--name--' + crowd.id).val(element.attributes.name);
      }
    });

    //event when the elements (specificly inheritance) subtype change
    crowd.workspace.graph.on('change:subtype', function (element, newSubtype) {
      // console.log('change:subtype', { element, newSubtype });

      if (element.isElement() && element.prop('type') == 'inheritance') {
        var subtypesText = { overlaped: 'o', disjoint: 'd', union: 'U' };
        element.attr('text/text', subtypesText[newSubtype]);
      }
    });

    //event when the links cardinality or uri change
    crowd.workspace.graph.on('change:cardinality change:uri', function (link, newCardinalityUri) {
      // console.log('change:cardinality', { link, newCardinality });

      if (link.isLink()) {
        var newCardinality = link.attributes.cardinality;
        var newUri = link.attributes.uri;

        var isConnectedAttribute =
          link.getSourceElement()?.attributes?.parentType == 'attribute' ||
          link.getTargetElement()?.attributes?.parentType == 'attribute'

        if (!link.attributes.inherit) {
          // if (newCardinality == "null" || newCardinality == null) {
          //   link.prop('cardinality', '0..1');
          // }

          link.labels([
            {
              attrs: {
                text: {
                  text: (!isConnectedAttribute || newCardinality != '0..1' ? newCardinality : null),
                  class: ''
                },
                rect: {
                  fill: getCSS('background-color', 'crowd-workspace')
                }
              },
              position: {
                angle: null,
                args: {
                  keepGradient: false
                }
              }
            },
            {
              attrs: {
                text: {
                  text: fromURI(newUri),
                }
              },
              position: {
                distance: 0.25,
                offset: -20
              }
            }
          ]);

          if (newCardinality.charAt(0) != '0') {
            link.prop('total', true);
          } else {
            link.prop('total', false);
          }
        }
      }
    });

    //event when the link total change
    crowd.workspace.graph.on('change:total', function (link, newTotal) {
      // console.log('change:total', { link, newTotal });

      if (link.isLink()) {
        //replace link attributes and markup with the palette default component of the corresponding style
        link.attributes.attrs = newTotal
          ? $.extend(true, {}, crowd.palette.links.total.attributes.attrs)
          : $.extend(true, {}, crowd.palette.links.connector.attributes.attrs);
        link.markup = newTotal
          ? crowd.palette.links.total.markup
          : crowd.palette.links.connector.markup;

        //change color if is for inheritance or not
        link.attr((link.attributes.total ? 'outline' : 'line') + '/stroke', link.attributes.inherit ? crowd.palette.colors.inheritanceStroke : '#000000');
        link.attr('line/targetMarker/stroke', link.attributes.inherit ? crowd.palette.colors.inheritanceStroke : '#000000');
        link.attr('line/targetMarker/fill', link.attributes.inherit ? crowd.palette.colors.inheritanceStroke : '#000000');

        //get link view
        var linkView = link.findView(crowd.workspace.paper);

        //redraw the link with the new style
        linkView.render();

        if (newTotal)
          link.prop('inheritChild', false);
        // crowd.inspector.loadContent();
      }
    });

    //event when the link inherit change
    crowd.workspace.graph.on('change:inherit', function (link, newInherit) {
      // console.log('change:inherit', { link, newInherit });

      if (link.isLink()) {
        if (newInherit) {
          link.trigger('change:inheritChild', link, link.prop('inheritChild'));
          link.attr((link.attributes.total ? 'outline' : 'line') + '/stroke', crowd.palette.colors.inheritanceStroke);
          link.attr('line/targetMarker/stroke', crowd.palette.colors.inheritanceStroke);
          link.attr('line/targetMarker/fill', crowd.palette.colors.inheritanceStroke);
        } else {
          link.trigger('change:cardinality', link, link.prop('cardinality'));
          link.attr((link.attributes.total ? 'outline' : 'line') + '/stroke', '#000000');
          link.attr('line/targetMarker/stroke', '#000000');
          link.attr('line/targetMarker/fill', '#000000');
        }
        crowd.inspector.loadContent();
      }
    });

    //event when the link inherit child change
    crowd.workspace.graph.on('change:inheritChild', function (link, newInheritChild) {
      // console.log('change:inheritChild', { link, newInheritChild });

      if (link.isLink()) {
        var linkSourceType = link.getSourceElement()?.attributes?.parentType;
        var linkTargetType = link.getTargetElement()?.attributes?.parentType;

        if (link.attributes.inherit) {
          link.attr((link.attributes.total ? 'outline' : 'line') + '/stroke', crowd.palette.colors.inheritanceStroke);
          link.attr('line/targetMarker/stroke', crowd.palette.colors.inheritanceStroke);
          link.attr('line/targetMarker/fill', crowd.palette.colors.inheritanceStroke);
          link.labels([{
            attrs: {
              text: {
                fill: crowd.palette.colors.inheritanceStroke,
                text: newInheritChild ? 'U' : null,
                class: newInheritChild ? 'crowd-link-text inherit' : ''
              },
              rect: {
                fill: newInheritChild ? "none" : getCSS('background-color', 'crowd-workspace')
              }
            },
            position: {
              angle: newInheritChild ? (linkSourceType == 'inheritance' || (linkSourceType == null && linkTargetType != 'inheritance') ? -90 : 90) : null,
              args: {
                keepGradient: newInheritChild
              }
            }
          }]);
          if (newInheritChild)
            link.prop('total', false);
        }

        crowd.inspector.loadContent();
      }
    });

    //event when the links source or target change
    crowd.workspace.graph.on('change:source change:target', function (link, newSourceTarget) {
      // console.log('change:source change:target', { link, newSourceTarget });

      if (link.isLink()) {
        link.trigger('change:cardinality', link, link.prop('cardinality'));
        link.trigger('change:inheritChild', link, link.prop('inheritChild'));
      }
    });

    //mark or unmark the element or link when the syntax property changed
    crowd.workspace.graph.on('change:syntax', function (cell, newSyntax) {
      // console.log('change:syntax', { cell, newSyntax });
      var syntaxError = newSyntax && newSyntax != '';
      var color = 'red';
      if (cell.isElement()) {
        color = syntaxError ? color : crowd.palette.elements[cell.attributes.type]?.attr('.outer/stroke');
        cell.attr('.outer/stroke', color);
      } else if (cell.isLink()) {
        if (!cell?.attributes?.total) {
          color = syntaxError ? color : crowd.palette.links[cell.attributes.type]?.attr('line/stroke');
          cell.attr('line/stroke', color);
        } else {
          color = syntaxError ? color : crowd.palette.links.total.attr('outline/stroke');
          cell.attr('outline/stroke', color);
        }
      }

      if (!syntaxError)
        cell.trigger('change:semantic', cell, cell.prop('semantic'));
    });

    //mark or unmark the element or link when the semantic property changed
    crowd.workspace.graph.on('change:semantic', function (cell, newSemantic) {
      // console.log('change:semantic', { cell, newSemantic });
      var unsatisfiable = newSemantic?.contents?.find(function (content) { return content.value == 'unsatisfiable' });
      var inferred = newSemantic?.contents?.find(function (content) { return content.value == 'inferred' });
      var color = unsatisfiable != null ? getCSS('color', 'crowd-unsat-color') : getCSS('color', 'crowd-inferred-color');
      if (cell.isElement()) {
        color = unsatisfiable != null || inferred != null ? color : crowd.palette.elements[cell.attributes.type]?.attr('.outer/stroke');
        cell.attr('.outer/stroke', color);
      } else if (cell.isLink()) {
        if (!cell?.attributes?.total) {
          color = unsatisfiable != null || inferred != null ? color : crowd.palette.links[cell.attributes.type]?.attr('line/stroke');
          cell.attr('line/stroke', color);
        } else {
          color = unsatisfiable != null || inferred != null ? color : crowd.palette.links.total.attr('outline/stroke');
          cell.attr('outline/stroke', color);
        }
      }
      crowd.inspector.loadContent();
    });
  },
  initInspector: function (crowd) {
    //add uri attribute to content for all types
    switch (crowd.inspector.model.attributes.type) {
      case 'entity':
      case 'weakEntity':
      case 'relationship':
      case 'weakRelationship':
      case 'attribute':
      case 'multivaluedAttribute':
      case 'keyAttribute':
      case 'weakKeyAttribute':
      case 'derivedAttribute':
      case 'connector':
        if (crowd.inspector.model.attributes.type != 'connector' || !crowd.inspector.model.attributes.inherit)
          crowd.inspector.addAttribute({ label: 'URI', property: 'uri', type: 'text', input: 'textarea' });
        break;
    }

    //add name attribute to content if it is of the correct type
    // switch (crowd.inspector.model.attributes.type) {
    //   case 'entity':
    //   case 'weakEntity':
    //   case 'relationship':
    //   case 'weakRelationship':
    //   case 'attribute':
    //   case 'multivaluedAttribute':
    //   case 'keyAttribute':
    //   case 'weakKeyAttribute':
    //   case 'derivedAttribute':
    //     crowd.inspector.addAttribute({ label: 'Name', property: 'name', type: 'text', input: 'textarea' });
    //     break;
    // }

    //add is weak attribute for entity and weak entity
    switch (crowd.inspector.model.attributes.type) {
      case 'entity':
      case 'weakEntity':
        crowd.inspector.addAttribute({ label: 'Is Weak?', property: 'type', type: 'boolean', map: { true: 'weakEntity', false: 'entity' } });
        break;
    }

    //add is weak attribute for relationship and weak relationship
    switch (crowd.inspector.model.attributes.type) {
      case 'relationship':
      case 'weakRelationship':
        crowd.inspector.addAttribute({ label: 'Is Weak?', property: 'type', type: 'boolean', map: { true: 'weakRelationship', false: 'relationship' } });
        break;
    }

    //add the type and datatype attributes for all attributes types
    switch (crowd.inspector.model.attributes.type) {
      case 'attribute':
      case 'multivaluedAttribute':
      case 'keyAttribute':
      case 'weakKeyAttribute':
      case 'derivedAttribute':
        crowd.inspector.addAttribute({
          label: 'Type', property: 'type', type: 'multiple',
          values: [
            { label: 'Normal', value: 'attribute' },
            { label: 'Key', value: 'keyAttribute' },
            { label: 'Weak Key', value: 'weakKeyAttribute' },
            { label: 'Multivalued', value: 'multivaluedAttribute' },
            { label: 'Derived', value: 'derivedAttribute' }
          ]
        });
        crowd.inspector.addAttribute({
          label: 'Datatype', property: 'datatype', type: 'multiple',
          values: [
            { label: 'Integer', value: 'Integer' },
            { label: 'String', value: 'String' },
            { label: 'Boolean', value: 'Boolean' },
          ]
        });
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
            // { label: 'Union', value: 'union' },
          ]
        });
        break;
    }

    //add the cardinality and total attribute for connector
    switch (crowd.inspector.model.attributes.type) {
      case 'connector':
        crowd.inspector.addAttribute({ label: 'Is for Inheritance?', property: 'inherit', type: 'boolean', map: { true: true, false: false } });
        if (!crowd.inspector.model.attributes.inherit) {
          // crowd.inspector.addAttribute({
          //   label: 'Cardinality', property: 'cardinality', type: 'multiple',
          //   values: [
          //     // { label: 'None', value: null },
          //     { label: '1', value: '1' },
          //     { label: '0..1', value: '0..1' },
          //     // { label: 'U (inherit child)', value: 'U' },
          //   ]
          // });
          crowd.inspector.addAttribute({
            label: 'Cardinality', property: 'cardinality', type: 'text', placeholder: 'example: 0..1'
          });
        } else {
          crowd.inspector.addAttribute({ label: 'Is Child Connector?', property: 'inheritChild', type: 'boolean', map: { true: true, false: false } });
          crowd.inspector.addAttribute({ label: 'Is Total?', property: 'total', type: 'boolean', map: { true: true, false: false } });
        }
        // if (!crowd.inspector.model.attributes.inherit || !crowd.inspector.model.attributes.inheritChild) {
        // }
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
    //define basic structure of eer json according to schema
    var jsonSchema = {
      entities: [],
      attributes: [],
      relationships: [],
      links: []
    };

    var attributeTypeMap = {
      'attribute': 'normal',
      'keyAttribute': 'key',
      'weakKeyAttribute': 'normal',
      'multivaluedAttribute': 'normal',
      'derivedAttribute': 'normal',
    }

    //mapping of datatypes to the requested format of schema
    var datatypeMap = {
      'String': 'http://www.w3.org/2001/XMLSchema#string',
      'Integer': 'http://www.w3.org/2001/XMLSchema#integer',
      'Boolean': 'http://www.w3.org/2001/XMLSchema#boolean',
      // 'String': 'String',
      // 'Integer': 'Integer',
      // 'Boolean': 'Boolean',
    }

    //mapping of cardinalities to the requested format of schema
    var cardinalityMap = function (cardinality, total) {
      // var result;
      // switch (cardinality) {
      //   case '1':
      //     result = (total ? '1' : '0') + '..1';
      //     break;
      //   case 'N':
      //     result = (total ? '1' : '0') + '..*';
      //     break;
      // }
      // return result;
      return cardinality;
    }

    //mapping of inheritances to the requested format of schema
    var inheritanceSubtypeMap = {
      'disjoint': 'exclusive',
      'overlaped': 'overlapping',
      // 'union': 'union'
    }

    //iterates each element and add it to the correspondent collection
    crowd.workspace.graph.getElements().forEach(function (element) {
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
            type: attributeTypeMap[element.attributes.type],
            datatype: datatypeMap[element.attributes.datatype],
            position: element.attributes.position,
            size: element.attributes.size,
          });
          //create the link for this attribute
          var attributeLink = {
            id: element.cid,
            // uri: element.attributes.uri,
            // name: element.attributes.uri,
            entity: null,
            attribute: element.attributes.uri,
            type: 'attribute'
          }
          //search for links connected to the attribute for add entity to attribute link
          crowd.workspace.graph.getConnectedLinks(element).forEach(function (link) {
            var connectedEntity = link.attributes.source.id != element.id
              ? link.getSourceElement()
              : (link.attributes.target.id != element.id
                ? link.getTargetElement()
                : null);
            if (connectedEntity) {
              if (connectedEntity.attributes.parentType == 'entity')
                attributeLink.entity = connectedEntity.attributes.uri;
              else if (connectedEntity.attributes.parentType == 'relationship')
                attributeLink.relationship = connectedEntity.attributes.uri;
              attributeLink.uri = link.attributes.uri;
              attributeLink.name = link.attributes.uri;
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
            size: element.attributes.size
          });
          //create the link for this relationship
          var relationshipLink = {
            id: element.cid,
            uri: element.attributes.uri,
            name: element.attributes.uri,
            isWeak: element.attributes.type == 'weakRelationship',
            entities: [],
            cardinality: [],
            roles: [],
            type: 'relationship',
            position: element.attributes.position,
            size: element.attributes.size
          }
          //search for links connected to the relationship for add entities to relationship link
          crowd.workspace.graph.getConnectedLinks(element).forEach(function (link) {
            var connectedEntity = link.attributes.source.id != element.id && link.getSourceElement().attributes.parentType == 'entity'
              ? link.getSourceElement()
              : (link.attributes.target.id != element.id && link.getTargetElement().attributes.parentType == 'entity'
                ? link.getTargetElement()
                : null);
            if (connectedEntity) {
              relationshipLink.entities.push(connectedEntity.attributes.uri);
              relationshipLink.roles.push(link.attributes.uri);
              relationshipLink.cardinality.push(cardinalityMap(link.attributes.cardinality, link.attributes.total));
            }
          });
          jsonSchema.links.push(relationshipLink);
          break;
        case 'inheritance':
          //create the link for this inheritance
          var inheritanceLink = {
            name: element.cid,
            parent: null,
            entities: [],
            constraint: [
              inheritanceSubtypeMap[element.attributes.subtype]
            ],
            type: 'isa',
            position: element.attributes.position,
            size: element.attributes.size
          }
          //search for links connected to the inheritance for add entities to inheritance link
          crowd.workspace.graph.getConnectedLinks(element).forEach(function (link) {
            if (link.attributes.inherit) {
              var connectedEntity = link.attributes.source.id != element.id
                && (link.getSourceElement().attributes.parentType == 'entity' || link.getSourceElement().attributes.parentType == 'relationship')
                ? link.getSourceElement()
                : (link.attributes.target.id != element.id
                  && (link.getTargetElement().attributes.parentType == 'entity' || link.getTargetElement().attributes.parentType == 'relationship')
                  ? link.getTargetElement()
                  : null);
              if (connectedEntity) {
                if (!link.attributes.inheritChild) {
                  inheritanceLink.parent = connectedEntity.attributes.uri;
                  if (link.attributes.total) {
                    inheritanceLink.constraint.push('union');
                  }
                }
                else {
                  inheritanceLink.entities.push(connectedEntity.attributes.uri);
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
    console.log('loadEER', schema);

    var entitiesObj = {};
    var relationshipsObj = {};
    var attributesObj = {};
    var inheritancesObj = {};
    var linksObj = {};

    var attributeTypeMap = {
      'normal': 'attribute',
      'key': 'keyAttribute',
    }

    //mapping of datatypes to the editor format
    var datatypeMap = {
      'String': 'String',
      'Integer': 'Integer',
      'Boolean': 'Boolean',
      'http://www.w3.org/2001/XMLSchema#string': 'String',
      'http://www.w3.org/2001/XMLSchema#integer': 'Integer',
      'http://www.w3.org/2001/XMLSchema#boolean': 'Boolean',
    }

    //mapping of cardinalities to the editor format
    var cardinalityMap = function (cardinality) {
      // return cardinality?.indexOf('*') != -1 ? 'N' : '1';
      return cardinality;
    }

    var totalMap = function (cardinality) {
      return cardinality?.charAt(0) == '1';
    }

    //mapping of inheritances to the editor format
    var inheritanceSubtypeMap = {
      'exclusive': 'disjoint',
      'overlapping': 'overlaped',
      // 'union': 'union'
    }

    if (schema) {
      //add each entity and their properties
      if (schema.entities) {
        schema.entities.forEach(function (entity) {
          entitiesObj[entity.name] = crowd.palette.elements[entity.isWeak ? 'weakEntity' : 'entity'].clone();
          crowd.workspace.graph.addCell(entitiesObj[entity.name]);
          $.each(entity, function (attribute, value) {
            switch (attribute) {
              case 'name':
                entitiesObj[entity.name].prop('uri', value);
                break;
              case 'position': case 'size':
                entitiesObj[entity.name].prop(attribute, value)
                break;
            }
          });
        });
      }

      //add each attribute and their properties
      if (schema.attributes) {
        schema.attributes.forEach(function (attribute) {
          attributesObj[attribute.name] = crowd.palette.elements[attributeTypeMap[attribute.type]].clone();
          crowd.workspace.graph.addCell(attributesObj[attribute.name]);
          $.each(attribute, function (attr, value) {
            switch (attr) {
              case 'name':
                attributesObj[attribute.name].prop('uri', value);
                break;
              case 'datatype':
                attributesObj[attribute.name].prop(attr, datatypeMap[value]);
                break;
              case 'position': case 'size':
                attributesObj[attribute.name].prop(attr, value)
                break;
            }
          });
        });
      }

      //add each link and their properties
      if (schema.links) {
        schema.links.forEach(function (link) {
          switch (link.type) {
            case 'relationship':
              relationshipsObj[link.name] = crowd.palette.elements[link.isWeak ? 'weakRelationship' : 'relationship'].clone();
              crowd.workspace.graph.addCell(relationshipsObj[link.name]);
              $.each(link, function (attribute, value) {
                switch (attribute) {
                  case 'name':
                    relationshipsObj[link.name].prop('uri', value);
                    break;
                  case 'position': case 'size':
                    relationshipsObj[link.name].prop(attribute, value)
                    break;
                }
              });
              link.entities.forEach(function (connectedEntity, index) {
                linksObj[link.roles[index]] = crowd.palette.links[totalMap(link?.cardinality[index]) ? 'total' : 'connector'].clone();
                linksObj[link.roles[index]].source(relationshipsObj[link.name]);
                linksObj[link.roles[index]].target(entitiesObj[link.entities[index]]);
                crowd.workspace.graph.addCell(linksObj[link.roles[index]]);
                linksObj[link.roles[index]].prop('uri', link.roles[index]);
                linksObj[link.roles[index]].prop('cardinality', cardinalityMap(link?.cardinality[index]));
              });
              break;
          }
        });

        schema.links.forEach(function (link) {
          switch (link.type) {
            case 'isa':
              var inheritanceName = link.name.split('_')[0];
              if (!inheritancesObj[inheritanceName]) {
                inheritancesObj[inheritanceName] = crowd.palette.elements.inheritance.clone();
                crowd.workspace.graph.addCell(inheritancesObj[inheritanceName]);
                $.each(link, function (attribute, value) {
                  switch (attribute) {
                    case 'constraint':
                      value.forEach(function (constraint) {
                        if (constraint == 'exclusive') inheritancesObj[inheritanceName].prop('subtype', 'disjoint');
                      });
                      break;
                    case 'name':
                      inheritancesObj[inheritanceName].prop('uri', value)
                      break;
                    case 'position': case 'size': case 'uri':
                      inheritancesObj[inheritanceName].prop(attribute, value)
                      break;
                  }
                });
              }

              var parentLinkName = link.parent + '-' + fromURI(inheritanceName);
              linksObj[parentLinkName] = crowd.palette.links[link.constraint?.find((value) => value == 'union') != null ? 'total' : 'connector'].clone();
              linksObj[parentLinkName].source(inheritancesObj[inheritanceName]);
              linksObj[parentLinkName].target(entitiesObj[link.parent] ? entitiesObj[link.parent] : relationshipsObj[link.parent]);
              crowd.workspace.graph.addCell(linksObj[parentLinkName]);
              linksObj[parentLinkName].prop('uri', parentLinkName);
              linksObj[parentLinkName].prop('inherit', true);
              linksObj[parentLinkName].prop('total', link.constraint?.find((value) => value == 'union') != null);

              link.entities.forEach(function (connectedEntity, index) {
                console.log(connectedEntity);
                var linkName = link.entities[index] + '-' + fromURI(inheritanceName);
                linksObj[linkName] = crowd.palette.links.connector.clone();
                linksObj[linkName].source(inheritancesObj[inheritanceName]);
                linksObj[linkName].target(entitiesObj[connectedEntity] ? entitiesObj[connectedEntity] : relationshipsObj[connectedEntity]);
                crowd.workspace.graph.addCell(linksObj[linkName]);
                linksObj[linkName].prop('uri', linkName);
                linksObj[linkName].prop('inherit', true);
                linksObj[linkName].prop('inheritChild', true);
              });
              break;
          }
        });

        schema.links.forEach(function (link) {
          switch (link.type) {
            case 'attribute':
              linksObj[link.uri] = crowd.palette.links.connector.clone();
              linksObj[link.uri].source(attributesObj[link.attribute]);
              linksObj[link.uri].target(link.entity ? entitiesObj[link.entity] : relationshipsObj[link.relationship]);
              crowd.workspace.graph.addCell(linksObj[link.uri]);
              linksObj[link.uri].prop('cardinality', '1');
              break;
          }
        });
      }
    }
  },
  initSyntaxValidator: function (crowd) {
    //define for each element type with wich another element type can connect and with wich link type and specific attributes of it
    // crowd.syntax.canConnect = {
    //   entity: {
    //     relationship: { connector: { inherit: false } },
    //     weakRelationship: { connector: { inherit: false, cardinality: '1', total: false } },
    //     keyAttribute: { connector: { inherit: false, total: false } },
    //     attribute: { connector: { inherit: false, total: false } },
    //     multivaluedAttribute: { connector: { inherit: false, total: false } },
    //     derivedAttribute: { connector: { inherit: false, total: false } },
    //     inheritance: { connector: { inherit: true } },
    //   },
    //   weakEntity: {
    //     relationship: { connector: { inherit: false } },
    //     weakRelationship: { connector: { inherit: false, cardinality: '0..*', total: true } },
    //     weakKeyAttribute: { connector: { inherit: false, total: false } },
    //     attribute: { connector: { inherit: false, total: false } },
    //     multivaluedAttribute: { connector: { inherit: false, total: false } },
    //     derivedAttribute: { connector: { inherit: false, total: false } },
    //     inheritance: { connector: { inherit: true } },
    //   },
    //   relationship: {
    //     entity: { connector: { inherit: false } },
    //     weakEntity: { connector: { inherit: false } },
    //     keyAttribute: { connector: { inherit: false, total: false } },
    //     attribute: { connector: { inherit: false, total: false } },
    //     //multivaluedAttribute: { connector: { inherit: false, total: false } },
    //     derivedAttribute: { connector: { inherit: false, total: false } },
    //     inheritance: { connector: { inherit: true } },
    //   },
    //   weakRelationship: {
    //     entity: { connector: { inherit: false, cardinality: '1', total: false } },
    //     weakEntity: { connector: { inherit: false, cardinality: '0..*', total: true } },
    //     weakKeyAttribute: { connector: { inherit: false, total: false } },
    //     attribute: { connector: { inherit: false, total: false } },
    //     //multivaluedAttribute: { connector: { inherit: false, total: false } },
    //     derivedAttribute: { connector: { inherit: false, total: false } },
    //     inheritance: { connector: { inherit: true } },
    //   },
    //   keyAttribute: {
    //     entity: { connector: { inherit: false, total: false } },
    //     relationship: { connector: { inherit: false, total: false } },
    //   },
    //   weakKeyAttribute: {
    //     weakEntity: { connector: { inherit: false, total: false } },
    //     weakRelationship: { connector: { inherit: false, total: false } },
    //   },
    //   attribute: {
    //     entity: { connector: { inherit: false, total: false } },
    //     weakEntity: { connector: { inherit: false, total: false } },
    //     relationship: { connector: { inherit: false, total: false } },
    //     weakRelationship: { connector: { inherit: false, total: false } },
    //     attribute: { connector: { inherit: false, total: false } },
    //   },
    //   multivaluedAttribute: {
    //     entity: { connector: { inherit: false, total: false } },
    //     weakEntity: { connector: { inherit: false, total: false } },
    //   },
    //   derivedAttribute: {
    //     entity: { connector: { inherit: false, total: false } },
    //     weakEntity: { connector: { inherit: false, total: false } },
    //     relationship: { connector: { inherit: false, total: false } },
    //     weakRelationship: { connector: { inherit: false, total: false } },
    //   },
    //   inheritance: {
    //     entity: { connector: { inherit: true } },
    //     weakEntity: { connector: { inherit: true } },
    //     relationship: { connector: { inherit: true } },
    //     weakRelationship: { connector: { inherit: true } },
    //   },
    // };

    //do the syntax validation of an entity
    // crowd.syntax.validate.canConnect = function (options) {
    //   try {
    //     var error = new Error();
    //     if (options?.elementA?.attributes?.type && options?.elementB?.attributes?.type && options?.link?.attributes?.type) {
    //       var check = crowd.syntax.canConnect[options.elementA.attributes.type][options.elementB.attributes.type];
    //       if (check) {
    //         check = check[options.link.attributes.type];
    //         if (check) {
    //           $.each(check, function (key, value) {
    //             if (options.link.attributes[key] != value) {
    //               error.name = 'link'
    //               error.message = 'Invalid link'
    //               throw error;
    //             }
    //           });

    //           //case there's no exception reset syntax errors values
    //           options?.elementA?.prop('syntax', null);
    //           options?.elementB?.prop('syntax', null);
    //           options?.link?.prop('syntax', null);
    //         } else {
    //           error.name = 'connection-link'
    //           error.message = 'Invalid connection link type';
    //           throw error;
    //         }
    //       } else {
    //         error.name = 'connection-element'
    //         error.message = 'Invalid connection element type';
    //         throw error;
    //       }
    //     } else {
    //       error.name = 'disconnected'
    //       error.message = 'Disconnected elements';
    //       throw error;
    //     }
    //   } catch (error) {
    //     console.log(error.name, error.message);
    //     error.message = '<b>Syntax Error</b><br>' + error.message;
    //     switch (error.name) {
    //       case 'link': case 'connection-link':
    //         if (options?.link?.attributes) options.link.prop('syntax', error.message);
    //         break;
    //       case 'connection-element':
    //         if (options?.elementA?.attributes) options.elementA.prop('syntax', error.message + ' (' + options?.elementB?.attributes?.type + ')');
    //         if (options?.elementB?.attributes) options.elementB.prop('syntax', error.message + ' (' + options?.elementA?.attributes?.type + ')');
    //         if (options?.link?.attributes) options.link.prop('syntax', error.message + ' (' + options?.elementA?.attributes?.type + '-' + options?.elementB?.attributes?.type + ')');
    //         break;
    //       case 'disconnected':
    //         if (options?.elementA?.attributes) options.elementA.prop('syntax', error.message);
    //         if (options?.elementB?.attributes) options.elementB.prop('syntax', error.message);
    //         if (options?.link?.attributes) options.link.prop('syntax', error.message);
    //         break;
    //     }
    //   } finally {
    //     crowd.inspector.loadContent();
    //   }
    // };

    //do the syntax validation of an entity
    // crowd.syntax.validate.entity = function (options) {

    // };

    //event when add or remove cell (element or link) into the diagram
    // crowd.workspace.graph.on('add remove', function (cell) {

    // });

    //event when the links source or target change
    // crowd.workspace.graph.on('change add remove', function (link, newSourceTarget) {
    //   // console.log('change:source change:target', { link, previosAttributes: link._previousAttributes, newSourceTarget });

    //   if (link.isLink()) {
    //     crowd.syntax.validate.canConnect({
    //       elementA: link.getSourceElement(),
    //       elementB: link.getTargetElement(),
    //       link: link
    //     });
    //   }
    // });
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
