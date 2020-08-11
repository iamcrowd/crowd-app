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
      derivedAttribute: getCSS('color', 'crowd-derived-attribute-color')
    }

    //add joint eer entity to palette elements
    crowd.palette.elements.entity = new joint.shapes.erd.Entity({
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
          fill: crowd.palette.colors.entity,
          stroke: crowd.palette.colors.entity
        },
        '.inner': {
          fill: crowd.palette.colors.entity,
          stroke: crowd.palette.colors.entity
        }
      },
      size: {
        width: 80,
        height: 40
      }
    });

    //add joint eer weak entity to palette elements
    crowd.palette.elements.weakEntity = new joint.shapes.erd.Entity({
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
          stroke: crowd.palette.colors.weakEntity,
        },
        '.inner': {
          fill: crowd.palette.colors.weakEntity,
          stroke: crowd.palette.colors.weakEntity,
          display: 'auto'
        }
      },
      size: {
        width: 80,
        height: 40
      }
    });

    //add joint eer relationship to palette elements
    crowd.palette.elements.relationship = new joint.shapes.erd.Relationship({
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
          fill: crowd.palette.colors.relationship,
          stroke: crowd.palette.colors.relationship
        },
        '.inner': {
          fill: crowd.palette.colors.relationship,
          stroke: crowd.palette.colors.relationship
        }
      },
      size: {
        width: 80,
        height: 60
      }
    });

    //add joint eer weak relationship to palette elements
    crowd.palette.elements.weakRelationship = new joint.shapes.erd.Relationship({
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
          stroke: crowd.palette.colors.weakRelationship
        },
        '.inner': {
          fill: crowd.palette.colors.weakRelationship,
          stroke: crowd.palette.colors.weakRelationship,
          display: 'auto'
        }
      },
      size: {
        width: 80,
        height: 60
      }
    });

    //add joint eer key attribute to palette elements
    crowd.palette.elements.keyAttribute = new joint.shapes.erd.Attribute({
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
          fill: crowd.palette.colors.keyAttribute,
          stroke: crowd.palette.colors.keyAttribute
        }
      },
      size: {
        width: 60,
        height: 40
      }
    });

    //add joint eer weak key attribute to palette elements
    crowd.palette.elements.weakKeyAttribute = new joint.shapes.erd.Attribute({
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
          fill: crowd.palette.colors.weakKeyAttribute,
          stroke: crowd.palette.colors.weakKeyAttribute,
        }
      },
      size: {
        width: 60,
        height: 40
      }
    });

    //add joint eer attribute to palette elements
    crowd.palette.elements.attribute = new joint.shapes.erd.Attribute({
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
          fill: crowd.palette.colors.attribute,
          stroke: crowd.palette.colors.attribute
        }
      },
      size: {
        width: 60,
        height: 40
      }
    });

    //add joint eer multivalued attribute to palette elements
    crowd.palette.elements.multivaluedAttribute = new joint.shapes.erd.Attribute({
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
          stroke: crowd.palette.colors.multivaluedAttribute
        },
        '.inner': {
          fill: crowd.palette.colors.multivaluedAttribute,
          stroke: crowd.palette.colors.multivaluedAttribute,
          display: 'auto'
        }
      },
      size: {
        width: 60,
        height: 40
      }
    });

    //add joint eer inheritance to palette elements
    crowd.palette.elements.inheritance = new joint.shapes.erd.Attribute({
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
          fill: crowd.palette.colors.inheritance,
          stroke: crowd.palette.colors.inheritance
        }
      },
      size: {
        width: 40,
        height: 40
      }
    });

    //add joint eer derived attribute to palette elements
    crowd.palette.elements.derivedAttribute = new joint.shapes.erd.Attribute({
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
          stroke: crowd.palette.colors.derivedAttribute,
          'stroke-dasharray': '3'
        },
        '.inner': {
          fill: crowd.palette.colors.derivedAttribute,
          stroke: crowd.palette.colors.derivedAttribute,
          display: 'auto'
        }
      },
      size: {
        width: 60,
        height: 40
      }
    });

    //add joint eer connector to palette links
    crowd.palette.links.connector = new joint.shapes.standard.Link({
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
            d: ''
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
    crowd.palette.links.total = new joint.shapes.standard.DoubleLink({
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
            text: null
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
        x: '100%', y: '50%', offset: { x: 25, y: 10 },
        markup: crowd.workspace.tools.elements.markup({
          icon: 'share',
          background: crowd.palette.colors.entity,
          tooltip: {
            title: 'Click and drag to make a <b class="crowd-entity-color">entity</b> and connect with it',
            placement: "right"
          }
        }),
        link: {
          type: config.total ? 'total' : 'connector',
          props: {
            cardinality: config.cardinality
          }
        }
      });
    };

    //link tool for weak entities
    var linkWeakEntityTool = function (config) {
      config = config ? config : {};
      return crowd.workspace.tools.elements.linkElementTool({
        elementType: crowd.palette.elements.weakEntity,
        x: '0%', y: '50%', offset: { x: -25, y: 10 },
        markup: crowd.workspace.tools.elements.markup({
          icon: 'share',
          background: crowd.palette.colors.weakEntity,
          tooltip: {
            title: 'Click and drag to make a <b class="crowd-weak-entity-color">weak entity</b> and connect with it',
            placement: "left"
          }
        }),
        link: {
          type: config.total ? 'total' : 'connector',
          props: {
            cardinality: config.cardinality
          }
        }
      });
    };

    //link tool for relationships
    var linkRelationshipTool = function (config) {
      config = config ? config : {};
      return crowd.workspace.tools.elements.linkElementTool({
        elementType: crowd.palette.elements.relationship,
        x: '100%', y: '50%', offset: { x: 25, y: 10 },
        markup: crowd.workspace.tools.elements.markup({
          icon: 'share',
          background: crowd.palette.colors.relationship,
          tooltip: {
            title: 'Click and drag to make a <b class="crowd-relationship-color">relationship</b> and connect with it',
            placement: "right"
          }
        }),
        link: {
          type: config.total ? 'total' : 'connector',
          props: {
            cardinality: config.cardinality
          }
        }
      });
    };

    //link tool for weak relationships
    var linkWeakRelationshipTool = function (config) {
      config = config ? config : {};
      return crowd.workspace.tools.elements.linkElementTool({
        elementType: crowd.palette.elements.weakRelationship,
        x: '0%', y: '50%', offset: { x: -25, y: 10 },
        markup: crowd.workspace.tools.elements.markup({
          icon: 'share',
          background: crowd.palette.colors.weakRelationship,
          tooltip: {
            title: 'Click and drag to make a <b class="crowd-weak-relationship-color">weak relationship</b> and connect with it',
            placement: "left"
          }
        }),
        link: {
          type: config.total ? 'total' : 'connector',
          props: {
            cardinality: config.cardinality
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
        background: crowd.palette.colors.attribute,
        tooltip: {
          title: 'Click and drag to make an <b class="crowd-attribute-color">attribute</b> and connect with it',
          placement: "top"
        }
      }),
      link: {
        type: 'connector'
      }
    });

    //link tool for multivalued attributes
    var linkMultivaluedAttributeTool = crowd.workspace.tools.elements.linkElementTool({
      elementType: crowd.palette.elements.multivaluedAttribute,
      x: '50%', y: '100%', offset: { x: -25, y: 35 },
      markup: crowd.workspace.tools.elements.markup({
        icon: 'share',
        background: crowd.palette.colors.multivaluedAttribute,
        tooltip: {
          title: 'Click and drag to make a <b class="crowd-multivalued-attribute-color">multivalued attribute</b> and connect with it',
          placement: "bottom"
        }
      }),
      link: {
        type: 'connector'
      }
    });

    //link tool for key attributes
    var linkKeyAttributeTool = crowd.workspace.tools.elements.linkElementTool({
      elementType: crowd.palette.elements.keyAttribute,
      x: '50%', offset: { x: 25, y: -15 },
      markup: crowd.workspace.tools.elements.markup({
        icon: 'share',
        background: crowd.palette.colors.keyAttribute,
        tooltip: {
          title: 'Click and drag to make a <b class="crowd-key-attribute-color">key attribute</b> and connect with it',
          placement: "top"
        }
      }),
      link: {
        type: 'connector'
      }
    });

    //link tool for weak key attributes
    var linkWeakKeyAttributeTool = crowd.workspace.tools.elements.linkElementTool({
      elementType: crowd.palette.elements.weakKeyAttribute,
      x: '50%', offset: { x: 25, y: -15 },
      markup: crowd.workspace.tools.elements.markup({
        icon: 'share',
        background: crowd.palette.colors.weakKeyAttribute,
        tooltip: {
          title: 'Click and drag to make a <b class="crowd-weak-key-attribute-color">weak key attribute</b> and connect with it',
          placement: "top"
        }
      }),
      link: {
        type: 'connector'
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
          background: crowd.palette.colors.inheritance,
          tooltip: {
            title: 'Click and drag to make a <b class="crowd-inheritance-color">inheritance</b> and connect with it',
            placement: "bottom"
          }
        }),
        link: {
          type: config.total ? 'total' : 'connector',
        }
      });
    }

    //add the link tool with the eer connector link type to the basic tools of crowd editor
    crowd.workspace.tools.elements.basicTools.push(crowd.workspace.tools.elements.linkTool({
      link: {
        type: 'connector'
      }
    }));

    //create tools view for entities
    crowd.workspace.tools.elements.elementsToolsView['entity'] = new joint.dia.ToolsView({
      name: 'entity-tools',
      tools: crowd.workspace.tools.elements.basicTools.concat([
        linkAttributeTool,
        linkKeyAttributeTool,
        linkRelationshipTool({ cardinality: '1' }),
        linkWeakRelationshipTool({ total: false, cardinality: '1' }),
        linkMultivaluedAttributeTool,
        linkInheritanceTool()
      ])
    });

    //create tools view for weak entities
    crowd.workspace.tools.elements.elementsToolsView['weakEntity'] = new joint.dia.ToolsView({
      name: 'weak-entity-tools',
      tools: crowd.workspace.tools.elements.basicTools.concat([
        linkAttributeTool,
        linkWeakKeyAttributeTool,
        linkRelationshipTool({ cardinality: '1' }),
        linkWeakRelationshipTool({ total: true, cardinality: 'N' }),
        linkMultivaluedAttributeTool,
        linkInheritanceTool()
      ])
    });

    //create tools view for relationship
    crowd.workspace.tools.elements.elementsToolsView['relationship'] = new joint.dia.ToolsView({
      name: 'relationship-tools',
      tools: crowd.workspace.tools.elements.basicTools.concat([
        linkAttributeTool,
        linkKeyAttributeTool,
        linkEntityTool({ cardinality: '1' }),
        linkWeakEntityTool({ total: false, cardinality: '1' })
      ])
    });

    //create tools view for weak relationship
    crowd.workspace.tools.elements.elementsToolsView['weakRelationship'] = new joint.dia.ToolsView({
      name: 'weak-relationship-tools',
      tools: crowd.workspace.tools.elements.basicTools.concat([
        linkAttributeTool,
        linkWeakKeyAttributeTool,
        linkEntityTool({ cardinality: '1' }),
        linkWeakEntityTool({ total: true, cardinality: 'N' })
      ])
    });

    //create tools view for attribute
    crowd.workspace.tools.elements.elementsToolsView['attribute'] = new joint.dia.ToolsView({
      name: 'attribute-tools',
      tools: crowd.workspace.tools.elements.basicTools.concat([
        linkAttributeTool
      ])
    });

    //create tools view for inheritance
    crowd.workspace.tools.elements.elementsToolsView['inheritance'] = new joint.dia.ToolsView({
      name: 'inheritance-tools',
      tools: crowd.workspace.tools.elements.basicTools.concat([
        linkEntityTool({ cardinality: 'U' }),
        linkWeakEntityTool({ cardinality: 'U' })
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
      }
    });

    //event when the elements name change
    crowd.workspace.graph.on('change:name', function (element, newName) {
      console.log('change:name', { element, newName });

      if (element.isElement()) {
        element.attr('text/text', newName);
        element.attributes.uri = element.attributes.uri.split("#")[0] + "#" + newName;
        $('#crowd-inspector-content--uri--' + crowd.id).val(element.attributes.uri);
      }
    });

    //event when the elements uri change
    crowd.workspace.graph.on('change:uri', function (element, newUri) {
      console.log('change:uri', { element, newUri });

      if (element.isElement() && element.attributes.parentType != "inheritance") {
        var newName = newUri.split('#');
        newName.shift();
        newName = newName.join('#');
        element.attr('text/text', newName);
        element.attributes.name = newName;
        $('#crowd-inspector-content--name--' + crowd.id).val(newName);
      }
    });

    //event when the elements (specificly inheritance) subtype change
    crowd.workspace.graph.on('change:subtype', function (element, newSubtype) {
      console.log('change:subtype', { element, newSubtype });

      if (element.isElement() && element.prop('type') == 'inheritance') {
        var subtypesText = { overlaped: 'o', disjoint: 'd', union: 'U' };
        element.attr('text/text', subtypesText[newSubtype]);
      }
    });

    //event when the links cardinality change
    crowd.workspace.graph.on('change:cardinality', function (link, newCardinality) {
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

    //event when the link total change
    crowd.workspace.graph.on('change:total', function (link, newTotal) {
      console.log('change:total', { link, newTotal });

      if (link.isLink()) {
        //replace link attributes and markup with the palette default component of the corresponding style
        link.attributes.attrs = newTotal
          ? $.extend(true, {}, crowd.palette.links.total.attributes.attrs)
          : $.extend(true, {}, crowd.palette.links.connector.attributes.attrs);
        link.markup = newTotal
          ? crowd.palette.links.total.markup
          : crowd.palette.links.connector.markup;

        //get link view
        var linkView = link.findView(crowd.workspace.paper);

        //redraw the link with the new style
        linkView.render();
      }
    });
  },
  initInspector: function (crowd) {
    //add uri attribute to content for all types
    crowd.inspector.addAttribute({ label: 'URI', property: 'uri', type: 'text', input: 'textarea' });

    //add name attribute to content if it is of the correct type
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
        crowd.inspector.addAttribute({ label: 'Name', property: 'name', type: 'text', input: 'textarea' });
        break;
    }

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
            { label: 'varchar', value: 'varchar' },
            { label: 'char', value: 'char' },
            { label: 'int', value: 'int' },
            { label: 'bit', value: 'bit' }
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
            { label: 'Union', value: 'union' },
          ]
        });
        break;
    }

    //add the cardinality and total attribute for connector
    switch (crowd.inspector.model.attributes.type) {
      case 'connector':
        crowd.inspector.addAttribute({
          label: 'Cardinality', property: 'cardinality', type: 'multiple',
          values: [
            { label: 'None', value: null },
            { label: '1', value: '1' },
            { label: 'N', value: 'N' },
            { label: 'U (inherit child)', value: 'U' },
          ]
        });
        crowd.inspector.addAttribute({ label: 'Is Total?', property: 'total', type: 'boolean', map: { true: true, false: false } });
        break;
    }
  }
}
