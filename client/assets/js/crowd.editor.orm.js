var CrowdEditorOrm = {
  name: 'orm',
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

    //function to initialize orm shapes in joint
    crowd.palette.initORMShapes = function () {
      //define configuration parameters for shapes
      const original_width_entities = 90;
      const original_height_entities = 40;
      const original_size_label_entities = 14;
      const original_strokeWidth_entities = 2;
      const original_strokeFill_entities = '#0000AD';
      const original_rx_entities = 5;
      const original_ry_entities = 5;
      const original_fill_entities = '#FFFFFF';
      const original_dasharray_entities = '6 3';

      const original_strokeWidth_constraint = 2;
      const original_rx_constraint = 15;
      const original_ry_constraint = 15;
      const original_cx_constraint = 0;
      const original_cy_constraint = 0;
      const original_fill_constraint = '#FFFFFF';
      const original_strokeFill_constraint = '#A000A0';

      const original_width_role = 90;
      const original_height_role = 40;
      const original_fill_role = '#FFFFFF';
      const original_strokeFill_role = '#333333';

      //define orm entity shape in joint
      joint.dia.Element.define('orm.Entity',
        {
          size: {
            width: original_width_entities,
            height: original_height_entities
          },
          attrs: {
            body: {
              refWidth: '100%',
              refHeight: '100%',
              strokeWidth: original_strokeWidth_entities,
              rx: original_rx_entities,
              ry: original_ry_entities,
              stroke: original_strokeFill_entities,
              fill: original_fill_entities
            },
            label: {
              text: 'Entity',
              'font-family': 'Arial',
              textVerticalAnchor: 'middle',
              textAnchor: 'middle',
              refX: '50%',
              refY: '50%',
              fontSize: original_size_label_entities,
              fill: '#333333'
            }
          },
        },
        {
          markup: [
            {
              tagName: 'rect',
              selector: 'body',
            },
            {
              tagName: 'text',
              selector: 'label'
            }
          ]
        }
      );

      //define orm entity ref mode shape in joint
      joint.dia.Element.define('orm.EntityReferenceMode',
        {
          size: {
            width: original_width_entities,
            height: original_height_entities
          },
          attrs: {
            body: {
              refWidth: '100%',
              refHeight: '100%',
              strokeWidth: original_strokeWidth_entities,
              rx: original_rx_entities, ry: original_ry_entities,
              stroke: original_strokeFill_entities,
              fill: original_fill_entities
            },
            label: {
              text: 'Entity',
              'font-family': 'Arial',
              textVerticalAnchor: 'middle',
              textAnchor: 'middle',
              refX: '50%',
              refY: '30%',
              fontSize: original_size_label_entities,
              fill: '#333333'
            },
            refMode: {
              text: '(ref. mode)',
              'font-family': 'Arial',
              textVerticalAnchor: 'middle',
              textAnchor: 'middle',
              'font-weight': 'bold',
              refX: '50%',
              refY: '70%',
              fontSize: original_size_label_entities,
              fill: '#333333'
            }
          }
        },
        {
          markup: [
            {
              tagName: 'rect',
              selector: 'body',
            },
            {
              tagName: 'text',
              selector: 'label'
            },
            {
              tagName: 'text',
              selector: 'refMode'
            }
          ]
        }
      );

      //define orm value shape in joint
      joint.dia.Element.define('orm.Value',
        {
          size: {
            width: original_width_entities,
            height: original_height_entities
          },
          attrs: {
            body: {
              refWidth: '100%',
              refHeight: '100%',
              strokeWidth: original_strokeWidth_entities,
              'stroke-dasharray': original_dasharray_entities,
              rx: original_rx_entities, ry: original_ry_entities,
              stroke: original_strokeFill_entities,
              fill: original_fill_entities
            },
            label: {
              text: 'Value',
              'font-family': 'Arial',
              textVerticalAnchor: 'middle',
              textAnchor: 'middle',
              refX: '50%',
              refY: '50%',
              fontSize: original_size_label_entities,
              fill: '#333333'
            }
          }
        },
        {
          markup: [
            {
              tagName: 'rect',
              selector: 'body',
            },
            {
              tagName: 'text',
              selector: 'label'
            }
          ]
        }
      );

      //define orm role unary shape in joint
      joint.dia.Element.define('orm.RoleUnary',
        {
          size: {
            width: original_width_role,
            height: original_height_role,
          },
          attrs: {
            root: { magnet: false },
            rel: {
              magnet: 'passive',
              port: 'left',
              y: 5,
              x: 25,
              width: 40,
              height: 25,
              strokeWidth: 2,
              stroke: original_strokeFill_role,
              // rx: original_rx_role,
              // ry: original_ry_role,
              fill: original_fill_role
            },
            unique: {
              x1: 30,
              y1: 0,
              x2: 60,
              y2: 0,
              strokeWidth: 3,
              stroke: '#8A0868',
              'stroke-linecap': 'round'
            },
            label: {
              text: 'role name',
              textVerticalAnchor: 'middle',
              textAnchor: 'middle',
              x: 45,
              y: 45,
              fill: original_strokeFill_role,
              fontSize: 14,
              'font-family': 'Arial'
            },
            labelBackground: {
              ref: 'label',
              refX: 0,
              refY: 0,
              refHeight: '100%',
              refWidth: '100%',
              fill: '#ffffff'
            },
            leftRead: {
              display: 'none',
              ref: 'label',
              refX: '-13px',
              refY: '20%',
            }
          },
        },
        {
          markup: [
            {
              tagName: 'g',
              class: 'rotatable',
              children: [
                {
                  tagName: 'g',
                  class: 'scalable',
                  children: [
                    {
                      tagName: 'rect',
                      selector: 'rel'
                    },
                    {
                      tagName: 'line',
                      selector: 'unique'
                    },
                    {
                      tagName: 'rect',
                      selector: 'labelBackground',
                    },
                    {
                      tagName: 'text',
                      selector: 'label'
                    },
                    {
                      tagName: 'path',
                      selector: 'leftRead',
                      attributes: {
                        'd': 'M0 5 L8 0 L8 10 Z',
                        'fill': original_strokeFill_role,
                        'stroke': original_strokeFill_role,
                        'stroke-width': 1,
                        'pointer-events': 'none'
                      }
                    }
                  ]
                },
              ]
            },
          ]
        }
      );

      //define orm role binary shape in joint
      joint.dia.Element.define('orm.RoleBinary',
        {
          size: {
            width: original_width_role,
            height: original_height_role,
          },
          attrs: {
            root: { magnet: false },
            relLeft: {
              magnet: 'passive',
              port: 'left',
              y: 5,
              x: 5,
              width: 40,
              height: 25,
              strokeWidth: 2,
              stroke: original_strokeFill_role,
              // rx: original_rx_role,
              // ry: original_ry_role,
              fill: original_fill_role
            },
            relRight: {
              magnet: 'passive',
              port: 'right',
              y: 5,
              x: 45,
              width: 40,
              height: 25,
              strokeWidth: 2,
              stroke: original_strokeFill_role,
              // rx: original_rx_role,
              // ry: original_ry_role,
              fill: original_fill_role
            },
            relCenter: {
              magnet: 'passive',
              port: 'center',
              y: 5,
              x: 44,
              width: 2,
              height: 25,
              strokeWidth: 2,
              stroke: original_strokeFill_role,
              // rx: original_rx_role,
              // ry: original_ry_role,
              fill: original_fill_role
            },
            uniqueLeft: {
              x1: 10,
              y1: 0,
              x2: 40,
              y2: 0,
              strokeWidth: 3,
              stroke: '#8A0868',
              'stroke-linecap': 'round'
            },
            uniqueRight: {
              display: 'none',
              x1: 50,
              y1: 0,
              x2: 80,
              y2: 0,
              strokeWidth: 3,
              stroke: '#8A0868',
              'stroke-linecap': 'round'
            },
            uniqueFull: {
              display: 'none',
              x1: 10,
              y1: 0,
              x2: 80,
              y2: 0,
              strokeWidth: 3,
              stroke: '#8A0868',
              'stroke-linecap': 'round'
            },
            label: {
              text: 'role name',
              textVerticalAnchor: 'middle',
              textAnchor: 'middle',
              x: 45,
              y: 45,
              fill: original_strokeFill_role,
              fontSize: 14,
              'font-family': 'Arial'
            },
            labelBackground: {
              ref: 'label',
              refX: 0,
              refY: 0,
              refHeight: '100%',
              refWidth: '100%',
              fill: '#ffffff'
            },
            leftRead: {
              display: 'none',
              ref: 'label',
              refX: '-13px',
              refY: '20%',
              fill: original_strokeFill_role
            }
          },
        },
        {
          markup: [
            {
              tagName: 'g',
              class: 'rotatable',
              children: [
                {
                  tagName: 'g',
                  class: 'scalable',
                  children: [
                    {
                      tagName: 'rect',
                      selector: 'relLeft'
                    },
                    {
                      tagName: 'rect',
                      selector: 'relRight'
                    },
                    {
                      tagName: 'rect',
                      selector: 'relCenter'
                    },
                    {
                      tagName: 'line',
                      selector: 'uniqueLeft'
                    },
                    {
                      tagName: 'line',
                      selector: 'uniqueRight'
                    },
                    {
                      tagName: 'line',
                      selector: 'uniqueFull'
                    },
                    {
                      tagName: 'rect',
                      selector: 'labelBackground',
                    },
                    {
                      tagName: 'text',
                      selector: 'label'
                    },
                    {
                      tagName: 'path',
                      selector: 'leftRead',
                      attributes: {
                        'd': 'M0 5 L8 0 L8 10 Z',
                        'fill': original_strokeFill_role,
                        'stroke': original_strokeFill_role,
                        'stroke-width': 1,
                        'pointer-events': 'none'
                      }
                    }
                  ]
                },
              ]
            },
          ]
        }
      );

      //define orm union constraint shape in joint
      joint.dia.Element.define('orm.Union',
        {
          size: {
            width: 30,
            height: 30
          },
          attrs: {
            ellipse: {
              transform: 'translate(15, 15)'
            },
            '.external_ellipse': {
              cx: original_cx_constraint,
              cy: original_cy_constraint,
              stroke: original_strokeFill_constraint,
              ry: original_rx_constraint,
              rx: original_ry_constraint,
              'fill-opacity': 'null',
              'stroke-opacity': 'null',
              'stroke-width': original_strokeWidth_constraint,
              fill: original_fill_constraint
            },
            '.internal_ellipse': {
              cx: original_cx_constraint,
              cy: original_cy_constraint,
              stroke: original_strokeFill_constraint,
              ry: original_rx_constraint / 2,
              rx: original_ry_constraint / 2,
              'fill-opacity': 'null',
              'stroke-opacity': 'null',
              'stroke-width': original_strokeWidth_constraint,
              fill: original_strokeFill_constraint
            },
          }
        },
        {
          markup: '<g class="rotatable"><g class="scalable"><ellipse class="external_ellipse"/><ellipse class="internal_ellipse"/></g><text/></g>'
        }
      );

      //define orm exclusive constraint shape in joint
      joint.dia.Element.define('orm.Exclusive',
        {
          size: {
            width: 30,
            height: 30
          },
          attrs: {
            ellipse: {
              transform: 'translate(15, 15)'
            },
            '.external_ellipse': {
              cx: original_cx_constraint,
              cy: original_cy_constraint,
              stroke: original_strokeFill_constraint,
              ry: original_rx_constraint,
              rx: original_ry_constraint,
              'fill-opacity': 'null',
              'stroke-opacity': 'null',
              'stroke-width': original_strokeWidth_constraint,
              fill: original_fill_constraint
            },
            '.line1': {
              'stroke-linecap': 'null',
              'stroke-linejoin': 'null',
              x2: 24.98111,
              y2: 24.92465,
              y1: 4.71622,
              x1: 4.85748,
              'fill-opacity': 'null',
              'stroke-opacity': 'null',
              'stroke-width': original_strokeWidth_constraint,
              stroke: original_strokeFill_constraint
            },
            '.line2': {
              'stroke-linecap': 'null',
              'stroke-linejoin': 'null',
              x2: 4.85748,
              y2: 24.92465,
              y1: 4.71622,
              x1: 24.98111,
              'fill-opacity': 'null',
              'stroke-opacity': 'null',
              'stroke-width': original_strokeWidth_constraint,
              stroke: original_strokeFill_constraint
            }
          }
        },
        {
          markup: '<g class="rotatable"><g class="scalable"><ellipse class="external_ellipse"/><line class="line1"/><line class="line2"/></g><text/></g>'
        }
      );

      //define orm exclusive exhaustive constraint shape in joint
      joint.dia.Element.define('orm.ExclusiveExhaustive',
        {
          size: {
            width: 30,
            height: 30
          },
          attrs: {
            ellipse: {
              transform: 'translate(15, 15)'
            },
            '.external_ellipse': {
              cx: original_cx_constraint,
              cy: original_cy_constraint,
              stroke: original_strokeFill_constraint,
              ry: original_rx_constraint,
              rx: original_ry_constraint,
              'fill-opacity': 'null',
              'stroke-opacity': 'null',
              'stroke-width': original_strokeWidth_constraint,
              fill: original_fill_constraint
            },
            '.internal_ellipse': {
              cx: original_cx_constraint,
              cy: original_cy_constraint,
              stroke: original_strokeFill_constraint,
              ry: original_rx_constraint / 2,
              rx: original_ry_constraint / 2,
              'fill-opacity': 'null',
              'stroke-opacity': 'null',
              'stroke-width': original_strokeWidth_constraint,
              fill: original_strokeFill_constraint
            },
            '.line1': {
              'stroke-linecap': 'null',
              'stroke-linejoin': 'null',
              x2: 24.98111,
              y2: 24.92465,
              y1: 4.71622,
              x1: 4.85748,
              'fill-opacity': 'null',
              'stroke-opacity': 'null',
              'stroke-width': original_strokeWidth_constraint,
              stroke: original_strokeFill_constraint
            },
            '.line2': {
              'stroke-linecap': 'null',
              'stroke-linejoin': 'null',
              x2: 4.85748,
              y2: 24.92465,
              y1: 4.71622,
              x1: 24.98111,
              'fill-opacity': 'null',
              'stroke-opacity': 'null',
              'stroke-width': original_strokeWidth_constraint,
              stroke: original_strokeFill_constraint
            }
          }
        },
        {
          markup: '<g class="rotatable"><g class="scalable"><ellipse class="external_ellipse"/><ellipse class="internal_ellipse"/><line class="line1"/><line class="line2"/></g><text/></g>'
        }
      );

      //define orm subset constraint shape in joint
      joint.dia.Element.define('orm.Subset',
        {
          size: {
            width: 30,
            height: 30
          },
          attrs: {
            ellipse: {
              transform: 'translate(15, 15)'
            },
            '.external_ellipse': {
              cx: original_cx_constraint,
              cy: original_cy_constraint,
              stroke: original_strokeFill_constraint,
              ry: original_rx_constraint,
              rx: original_ry_constraint,
              'fill-opacity': 'null',
              'stroke-opacity': 'null',
              'stroke-width': original_strokeWidth_constraint,
              fill: original_fill_constraint
            },
            '.simb': {
              text: 'U',
              'font-family': 'Arial',
              fill: original_strokeFill_constraint,
              stroke: original_strokeFill_constraint,
              'stroke-width': 0,
              x: 5,
              y: -10,
              fontSize: 24,
              'text-anchor': 'start',
              transform: 'rotate(90 -1.8749999999999998,-2.5000000000000004)'
            },
            '.line2': {
              'stroke-linecap': 'null',
              'stroke-linejoin': 'null',
              x2: 8,
              y2: 23,
              y1: 23,
              x1: 23,
              'fill-opacity': 'null',
              'stroke-opacity': 'null',
              'stroke-width': original_strokeWidth_constraint,
              stroke: original_strokeFill_constraint
            }
          }
        },
        {
          markup: '<g class="rotatable"><g class="scalable"><ellipse class="external_ellipse"/><text class="simb"/><line class="line2"/></g><text/></g>'
        }
      );

      //define orm equality constraint shape in joint
      joint.dia.Element.define('orm.Equality',
        {
          size: {
            width: 30,
            height: 30
          },
          attrs: {
            ellipse: {
              transform: 'translate(15, 15)'
            },
            '.external_ellipse': {
              cx: original_cx_constraint,
              cy: original_cy_constraint,
              stroke: original_strokeFill_constraint,
              ry: original_rx_constraint,
              rx: original_ry_constraint,
              'fill-opacity': 'null',
              'stroke-opacity': 'null',
              'stroke-width': original_strokeWidth_constraint,
              fill: original_fill_constraint
            },
            '.line1': {
              'stroke-linecap': 'null',
              'stroke-linejoin': 'null',
              x2: 7,
              y2: 19,
              y1: 19,
              x1: 23,
              'fill-opacity': 'null',
              'stroke-opacity': 'null',
              'stroke-width': original_strokeWidth_constraint,
              stroke: original_strokeFill_constraint
            },
            '.line2': {
              'stroke-linecap': 'null',
              'stroke-linejoin': 'null',
              x2: 7,
              y2: 12,
              y1: 12,
              x1: 23,
              'fill-opacity': 'null',
              'stroke-opacity': 'null',
              'stroke-width': original_strokeWidth_constraint,
              stroke: original_strokeFill_constraint
            }
          }
        },
        {
          markup: '<g class="rotatable"><g class="scalable"><ellipse class="external_ellipse"/><line class="line1"/><line class="line2"/></g><text/></g>'
        }
      );
    }

    crowd.palette.initORMShapes();

    //add joint orm entity to palette elements
    crowd.palette.elements.entity = new joint.shapes.orm.Entity({
      parentType: 'entity',
      type: 'entity',
      name: 'Entity',
      uri: 'http://crowd.fi.uncoma.edu.ar#entity'
    });

    //add joint orm entity ref mode to palette elements
    crowd.palette.elements.entityReferenceMode = new joint.shapes.orm.EntityReferenceMode({
      parentType: 'entity',
      type: 'entityReferenceMode',
      name: 'Entity',
      uri: 'http://crowd.fi.uncoma.edu.ar#entity',
      refUri: ''
    });

    //add joint orm value to palette elements
    crowd.palette.elements.value = new joint.shapes.orm.Value({
      parentType: 'entity',
      type: 'value',
      name: 'Value',
      uri: 'http://crowd.fi.uncoma.edu.ar#value'
    });

    //add joint orm role unary to palette elements
    crowd.palette.elements.roleUnary = new joint.shapes.orm.RoleUnary({
      parentType: 'role',
      type: 'roleUnary',
      name: 'Role',
      read: 'right',
      uri: 'http://crowd.fi.uncoma.edu.ar#role'
    });

    //add joint orm role binary to palette elements
    crowd.palette.elements.roleBinary = new joint.shapes.orm.RoleBinary({
      parentType: 'role',
      type: 'roleBinary',
      name: 'Role',
      read: 'right',
      cardinality: {
        left: 'one',
        right: 'many'
      },
      uri: 'http://crowd.fi.uncoma.edu.ar#role'
    });

    //add joint orm union constraint to palette elements
    crowd.palette.elements.union = new joint.shapes.orm.Union({
      parentType: 'constraint',
      type: 'union'
    });

    //add joint orm exclusive constraint to palette elements
    crowd.palette.elements.exclusive = new joint.shapes.orm.Exclusive({
      parentType: 'constraint',
      type: 'exclusive'
    });

    //add joint orm exclusive exhaustive constraint to palette elements
    crowd.palette.elements.exclusiveExhaustive = new joint.shapes.orm.ExclusiveExhaustive({
      parentType: 'constraint',
      type: 'exclusiveExhaustive'
    });

    //add joint orm subset constraint to palette elements
    crowd.palette.elements.subset = new joint.shapes.orm.Subset({
      parentType: 'constraint',
      type: 'subset'
    });

    //add joint orm equality constraint to palette elements
    crowd.palette.elements.equality = new joint.shapes.orm.Equality({
      parentType: 'constraint',
      type: 'equality'
    });

    //add joint orm connector to palette links
    crowd.palette.links.connector = new joint.shapes.standard.Link({
      parentType: 'connector',
      type: 'connector',
      direction: null,
      mandatory: true,
      attrs: {
        line: {
          stroke: 'black',
          strokeWidth: 2,
          sourceMarker: {},
          targetMarker: {
            stroke: '#A000A0',
            fill: '#A000A0',
            d: 'M 16 0 a 8 8 0 1 0 0 1'
          }
        }
      }
    });

    //add joint orm inheritance connector to palette links
    crowd.palette.links.inheritanceConnector = new joint.shapes.standard.Link({
      parentType: 'connector',
      type: 'inheritanceConnector',
      direction: 'target',
      mandatory: false,
      attrs: {
        line: {
          stroke: '#A000A0',
          strokeWidth: 3,
          sourceMarker: {},
          targetMarker: {
            stroke: '#A000A0',
            fill: '#A000A0',
            d: 'M 20 10 0 0 20 -10 Z'
          }
        }
      }
    });

    //add joint orm constraint connector to palette links
    crowd.palette.links.constraintConnector = new joint.shapes.standard.Link({
      parentType: 'connector',
      type: 'constraintConnector',
      direction: 'target',
      mandatory: false,
      attrs: {
        line: {
          stroke: '#A000A0',
          'stroke-dasharray': '6 4',
          strokeWidth: 2,
          sourceMarker: {},
          targetMarker: {
            stroke: '#A000A0',
            fill: '#A000A0',
            d: 'M 20 10 0 0 20 -10 Z'
          }
        }
      }
    });
  },
  initElementsToolsViews: function (crowd) {
    //link tool for generic link connection
    var linkTool = function (config) {
      config = config ? config : {};
      return crowd.workspace.tools.elements.linkTool({
        link: {
          type: config.type ? config.type : 'connector',
          port: config.port ? config.port : null,
          manget: config.manget ? config.manget : null,
          props: {
            mandatory: config.mandatory ? config.mandatory : false,
            direction: config.direction ? config.direction : null
          }
        },
        x: config.position?.x ? config.position?.x : '100%',
        y: config.position?.y ? config.position?.y : null,
        offset: {
          x: config.offset?.x ? config.offset?.x : 25,
          y: config.offset?.y ? config.offset?.y : -15
        },
        markup: crowd.workspace.tools.elements.markup({
          icon: config.icon ? config.icon : 'call_made',
          tooltip: {
            title: config.title ? config.title : 'Click and drag to connect the object',
            placement: config.placement ? config.placement : "right"
          }
        })
      });
    }

    //link tool with the inheritance link type
    var linkInheritanceTool = function (config) {
      config = config ? config : {};
      return crowd.workspace.tools.elements.linkTool({
        link: {
          type: 'inheritanceConnector',
          port: config.port ? config.port : null,
          manget: config.manget ? config.manget : null,
          props: {
            direction: config.direction ? config.direction : 'target',
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
            title: 'Click and drag to connect the object with a <b class="crowd-bold-color">inheritance</b> connector',
            placement: 'top'
          }
        })
      });
    };

    //create tools view for entities
    crowd.workspace.tools.elements.elementsToolsView['entity'] = new joint.dia.ToolsView({
      name: 'entity-tools',
      tools: crowd.workspace.tools.elements.basicTools.concat([
        linkTool(),
        linkInheritanceTool()
      ])
    });

    //create tools view for entities ref mode
    crowd.workspace.tools.elements.elementsToolsView['entityReferenceMode'] = new joint.dia.ToolsView({
      name: 'entity-ref-mode-tools',
      tools: crowd.workspace.tools.elements.basicTools.concat([
        linkTool(),
        linkInheritanceTool()
      ])
    });

    //create tools view for values
    crowd.workspace.tools.elements.elementsToolsView['value'] = new joint.dia.ToolsView({
      name: 'value-tools',
      tools: crowd.workspace.tools.elements.basicTools.concat([
        linkTool(),
        linkInheritanceTool()
      ])
    });

    //create tools view for role unary
    crowd.workspace.tools.elements.elementsToolsView['roleUnary'] = new joint.dia.ToolsView({
      name: 'role-unary-tools',
      tools: crowd.workspace.tools.elements.basicTools.concat([
        linkTool({
          port: 'left',
          magnet: 'rel'
        })
      ])
    });

    //create tools view for role binary
    crowd.workspace.tools.elements.elementsToolsView['roleBinary'] = new joint.dia.ToolsView({
      name: 'role-binary-tools',
      tools: crowd.workspace.tools.elements.basicTools.concat([
        linkTool({
          port: 'left',
          magnet: 'relLeft',
          position: { x: '0%', y: '50%' },
          offset: { x: -25, y: 10 },
          icon: 'arrow_backward',
          placement: 'left',
          title: 'Click and drag to connect the object with a connector from <b class="crowd-bold-color">left</b>'
        }),
        linkTool({
          port: 'right',
          magnet: 'relRight',
          position: { x: '100%', y: '50%' },
          offset: { x: 25, y: 10 },
          icon: 'arrow_forward',
          placement: 'right',
          title: 'Click and drag to connect the object with a connector from <b class="crowd-bold-color">right</b>'
        }),
      ])
    });

    //create tools view for constraint union
    crowd.workspace.tools.elements.elementsToolsView['union'] = new joint.dia.ToolsView({
      name: 'union-tools',
      tools: crowd.workspace.tools.elements.basicTools.concat([
        linkTool({
          type: 'constraintConnector',
          title: 'Click and drag to connect the object with a <b class="crowd-bold-color">constraint</b> connector'
        })
      ])
    });

    //create tools view for constraint exclusive
    crowd.workspace.tools.elements.elementsToolsView['exclusive'] = new joint.dia.ToolsView({
      name: 'exclusive-tools',
      tools: crowd.workspace.tools.elements.basicTools.concat([
        linkTool({
          type: 'constraintConnector',
          title: 'Click and drag to connect the object with a <b class="crowd-bold-color">constraint</b> connector'
        })
      ])
    });

    //create tools view for constraint exclusive exhaustive
    crowd.workspace.tools.elements.elementsToolsView['exclusiveExhaustive'] = new joint.dia.ToolsView({
      name: 'exclusive-exhaustive-tools',
      tools: crowd.workspace.tools.elements.basicTools.concat([
        linkTool({
          type: 'constraintConnector',
          title: 'Click and drag to connect the object with a <b class="crowd-bold-color">constraint</b> connector'
        })
      ])
    });

    //create tools view for constraint subset
    crowd.workspace.tools.elements.elementsToolsView['subset'] = new joint.dia.ToolsView({
      name: 'subset-tools',
      tools: crowd.workspace.tools.elements.basicTools.concat([
        linkTool({
          type: 'constraintConnector',
          title: 'Click and drag to connect the object with a <b class="crowd-bold-color">constraint</b> connector'
        }),
        // linkTool({
        //   type: 'constraintConnector', icon: 'maximize', position: { x: '75%', y: null }, offset: { x: 12, y: -15 },
        //   placement: 'top', title: 'Click and drag to connect the object with a <b class="crowd-bold-color">constraint</b> connector'
        // }),
        linkTool({
          type: 'constraintConnector',
          direction: 'target',
          icon: 'arrow_forward',
          position: { x: '100%', y: '50%' },
          offset: { x: 25, y: 10 },
          title: 'Click and drag to connect the object with a <b class="crowd-bold-color">constraint</b> connector directioned'
        })
      ])
    });

    //create tools view for constraint equality
    crowd.workspace.tools.elements.elementsToolsView['equality'] = new joint.dia.ToolsView({
      name: 'equality-tools',
      tools: crowd.workspace.tools.elements.basicTools.concat([
        linkTool({
          type: 'constraintConnector',
          title: 'Click and drag to connect the object with a <b class="crowd-bold-color">constraint</b> connector'
        })
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
        if (element.prop('uri')) element.trigger('change:uri', element, element.prop('uri'));
        if (element.prop('refUri')) element.trigger('change:refUri', element, element.prop('refUri'));

        crowd.inspector.loadContent();
      }
    });

    //event when the elements name change
    crowd.workspace.graph.on('change:name', function (element, newName) {
      // console.log('change:name', { element, newName });

      if (element.isElement()) {
        element.trigger('change:uri', element, element.prop('uri'));
        element.trigger('change:refUri', element, element.prop('refUri'));
      }
    });

    //event when the elements uri change
    crowd.workspace.graph.on('change:uri', function (element, newUri) {
      // console.log('change:uri', { element, newUri });

      if (element.isElement() && element.attributes.parentType != "inheritance") {
        element.attr('label/text', joint.util.breakText(fromURI(newUri), { width: element.attributes.size.width }));
        // element.attr('text/text', fromURI(newUri));
        // element.attributes.name = fromURI(newUri);
        // $('#crowd-inspector-content--name--' + crowd.id).val(element.attributes.name);
      }
    });

    //event when the elements uri change
    crowd.workspace.graph.on('change:refUri', function (element, newRefUri) {
      // console.log('change:uri', { element, newRefUri });

      if (element.isElement() && element.attributes.parentType != "inheritance") {
        var refUriText = fromURI(newRefUri);
        element.attr('refMode/text', joint.util.breakText("(" + (refUriText ? refUriText : 'ref. mode') + ")", { width: element.attributes.size.width }));
        // element.attr('text/text', fromURI(newRefUri));
        // element.attributes.name = fromURI(newRefUri);
        // $('#crowd-inspector-content--name--' + crowd.id).val(element.attributes.name);
      }
    });

    //event when the role read change
    crowd.workspace.graph.on('change:read', function (element, newRead) {
      // console.log('change:read', { element, newRead });

      if (element.isElement() && element.attributes.parentType == "role") {
        element.attr('leftRead/display', newRead == 'left' ? 'unset' : 'none');
      }
    });

    //event when the role cardinality change
    crowd.workspace.graph.on('change:cardinality', function (element, newCardinality) {
      // console.log('change:cardinality', { element, newCardinality });

      if (element.isElement() && element.attributes.parentType == "role" && newCardinality) {
        if (newCardinality.left == 'many' && newCardinality.right == 'many') {
          element.attr('uniqueLeft/display', 'none');
          element.attr('uniqueRight/display', 'none');
          element.attr('uniqueFull/display', 'unset');
        } else {
          element.attr('uniqueLeft/display', newCardinality.left == 'one' ? 'unset' : 'none');
          element.attr('uniqueRight/display', newCardinality.right == 'one' ? 'unset' : 'none');
          element.attr('uniqueFull/display', 'none');
        }
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
        if (newType != 'connector' && newType != 'constraintConnector' && (!link.prop('direction') || link.prop('direction') == 'null'))
          link.attributes.direction = 'target';
        else if (newType == 'connector')
          link.attributes.direction = null;
        link.trigger('change:direction', link, link.prop('direction'));

        if (newType == 'inheritanceConnector' || newType == 'constraintConnector') {
          link.attributes.mandatory = false;
        }
        link.trigger('change:mandatory', link, link.prop('mandatory'));

        crowd.inspector.loadContent();
      }
    });

    //event when the link inherit child change
    crowd.workspace.graph.on('change:mandatory', function (link, newMandatory) {
      // console.log('change:mandatory', { link, newMandatory });

      if (link.isLink()) {
        var linkSourceType = link.getSourceElement()?.attributes?.parentType;
        // var linkTargetType = link.getTargetElement()?.attributes?.parentType;

        if (link.attributes.type == 'connector') {
          if (linkSourceType == 'entity') {
            link.attributes.attrs.line.sourceMarker = $.extend(true, {}, crowd.palette.links[link.attributes.type].attributes.attrs.line.targetMarker);
            link.attributes.attrs.line.targetMarker = {};
          } else {
            link.attributes.attrs.line.targetMarker = $.extend(true, {}, crowd.palette.links[link.attributes.type].attributes.attrs.line.targetMarker);
            link.attributes.attrs.line.sourceMarker = {};
          }

          link.attr('line/sourceMarker/display', newMandatory ? 'unset' : 'none');
          link.attr('line/targetMarker/display', newMandatory ? 'unset' : 'none');

          //get link view
          var linkView = link.findView(crowd.workspace.paper);

          //redraw the link with the new style
          linkView.render();
        }

        crowd.inspector.loadContent();
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

        //get link view
        var linkView = link.findView(crowd.workspace.paper);

        //redraw the link with the new style
        linkView.render();
      }
    });

    //event when the links source or target change
    crowd.workspace.graph.on('change:source change:target', function (link, newSourceTarget) {
      // console.log('change:source change:target', { link, newSourceTarget });

      if (link.isLink()) {
        link.trigger('change:mandatory', link, link.prop('mandatory'));
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
      case 'entityReferenceMode':
      case 'value':
      case 'roleUnary':
      case 'roleBinary':
        crowd.inspector.addAttribute({ label: 'URI', property: 'uri', type: 'text', input: 'textarea' });
        break;
    }

    //add ref uri to entity ref mode
    switch (crowd.inspector.model.attributes.type) {
      case 'entityReferenceMode':
        crowd.inspector.addAttribute({ label: 'Reference URI', property: 'refUri', type: 'text', input: 'textarea', placeholder: 'http://crowd.fi.uncoma.edu.ar#ref-entity' });
        break;
    }

    //add type attribute for entities
    switch (crowd.inspector.model.attributes.type) {
      case 'entity':
      case 'entityReferenceMode':
      case 'value':
        // crowd.inspector.addAttribute({ label: 'Ref Mode?', property: 'type', type: 'boolean', map: { true: 'entityReferenceMode', false: 'entity' } });
        crowd.inspector.addAttribute({
          label: 'Type', property: 'type', type: 'multiple',
          values: [
            { label: 'Normal', value: 'entity' },
            { label: 'Reference Mode', value: 'entityReferenceMode' },
            { label: 'Value', value: 'value' },
          ]
        });
        break;
    }

    //add read attribute for roles
    switch (crowd.inspector.model.attributes.parentType) {
      case 'role':
        crowd.inspector.addAttribute({ label: 'Read to left?', property: 'read', type: 'boolean', map: { true: 'left', false: 'right' } });
    }

    //add cardinality attribute for role binary
    switch (crowd.inspector.model.attributes.type) {
      case 'roleBinary':
        crowd.inspector.addAttribute({
          label: 'Cardinality', property: 'cardinality', type: 'object',
          parameters: [
            {
              label: 'Left', property: 'left', type: 'multiple',
              values: [
                { label: 'One', value: 'one' },
                { label: 'Many', value: 'many' },
              ]
            },
            {
              label: 'Right', property: 'right', type: 'multiple',
              values: [
                { label: 'One', value: 'one' },
                { label: 'Many', value: 'many' },
              ]
            },
          ]
        });
        break;
    }

    //add type attribute for constraints
    switch (crowd.inspector.model.attributes.type) {
      case 'union':
      case 'exclusive':
      case 'exclusiveExhaustive':
      case 'subset':
      case 'equality':
        crowd.inspector.addAttribute({
          label: 'Type', property: 'type', type: 'multiple',
          values: [
            { label: 'Union', value: 'union' },
            { label: 'Exclusive', value: 'exclusive' },
            { label: 'Exclusive Exhaustive', value: 'exclusiveExhaustive' },
            { label: 'Subset', value: 'subset' },
            { label: 'Equality', value: 'equality' },
          ]
        });
        break;
    }

    //add type and direction attribute for connectors
    switch (crowd.inspector.model.attributes.parentType) {
      case 'connector':
        crowd.inspector.addAttribute({
          label: 'Type', property: 'type', type: 'multiple',
          values: [
            { label: 'Normal', value: 'connector' },
            { label: 'Inheritance', value: 'inheritanceConnector' },
            { label: 'Constraint', value: 'constraintConnector' },
          ]
        });
        break;
    }

    //add mandatory attribute for normal connectors
    switch (crowd.inspector.model.attributes.type) {
      case 'connector':
        crowd.inspector.addAttribute({ label: 'Mandatory?', property: 'mandatory', type: 'boolean', map: { true: true, false: false } });
        break;
    }

    //add direction attribute for inheritance connectors
    switch (crowd.inspector.model.attributes.type) {
      case 'inheritanceConnector':
        crowd.inspector.addAttribute({
          label: 'Direction', property: 'direction', type: 'multiple',
          values: [
            { label: 'Source', value: 'source' },
            { label: 'Target', value: 'target' },
          ]
        });
        break;
    }

    //add direction attribute for constraint connectors
    switch (crowd.inspector.model.attributes.type) {
      case 'constraintConnector':
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

    //add the syntax alert message when there's a syntax error
    if (crowd.inspector.model.attributes.syntax && crowd.inspector.model.attributes.syntax != '')
      crowd.inspector.addAttribute({ property: 'syntax', type: 'alert', color: 'danger' });

    //add the semantic alert message when there's a semantic error
    if (crowd.inspector.model.attributes.semantic && crowd.inspector.model.attributes.semantic.contents?.length)
      crowd.inspector.addAttribute({ property: 'semantic', type: 'alert', color: 'warning' });
  },
  toJSONSchema: function (crowd) {
    //todo
  },
  fromJSONSchema: function (crowd, schema) {
    //todo
  },
  initSyntaxValidator: function (crowd) {
    //todo
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
