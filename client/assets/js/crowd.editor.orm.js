var CrowdEditorOrm = {
  name: 'orm',
  initPalette: function (crowd) {
    //colors for palette elements
    crowd.palette.colors = {
      entityFill: getCSS('color', 'crowd-orm-entity-fill-color'),
      entityStroke: getCSS('color', 'crowd-orm-entity-stroke-color'),
      constraintFill: getCSS('color', 'crowd-orm-constraint-fill-color'),
      constraintStroke: getCSS('color', 'crowd-orm-constraint-stroke-color'),
      roleFill: getCSS('color', 'crowd-orm-role-fill-color'),
      roleStroke: getCSS('color', 'crowd-orm-role-stroke-color'),
    }

    //function to initialize orm shapes in joint
    crowd.palette.initORMShapes = function () {
      //define configuration parameters for shapes
      const original_width_entities = 90;
      const original_height_entities = 40;
      const original_size_label_entities = 14;
      const original_strokeWidth_entities = 2;
      const original_rx_entities = 5;
      const original_ry_entities = 5;
      const original_dasharray_entities = '6 3';
      const original_fill_entities = crowd.palette.colors.entityFill;
      const original_strokeFill_entities = crowd.palette.colors.entityStroke;

      const original_strokeWidth_constraint = 2;
      const original_rx_constraint = 15;
      const original_ry_constraint = 15;
      const original_cx_constraint = 0;
      const original_cy_constraint = 0;
      const original_fill_constraint = crowd.palette.colors.constraintFill;
      const original_strokeFill_constraint = crowd.palette.colors.constraintStroke;

      const original_width_role = 90;
      const original_height_role = 40;
      const original_fill_role = crowd.palette.colors.roleFill;
      const original_strokeFill_role = crowd.palette.colors.roleStroke;

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
            relLeft: {
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
              text: 'Fact Type',
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
                      selector: 'relLeft'
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
              y: 15,
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
              y: 15,
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
              y: 15,
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
              // display: 'none',
              x1: 10,
              y1: 10,
              x2: 40,
              y2: 10,
              strokeWidth: 3,
              stroke: '#8A0868',
              'stroke-linecap': 'round'
            },
            uniqueRight: {
              // display: 'none',
              x1: 50,
              y1: 10,
              x2: 80,
              y2: 10,
              strokeWidth: 3,
              stroke: '#8A0868',
              'stroke-linecap': 'round'
            },
            uniqueFull: {
              display: 'none',
              x1: 10,
              y1: 10,
              x2: 80,
              y2: 10,
              strokeWidth: 3,
              stroke: '#8A0868',
              'stroke-linecap': 'round'
            },
            label: {
              text: 'Fact Type',
              textVerticalAnchor: 'middle',
              textAnchor: 'middle',
              x: 45,
              y: 55,
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
            },
            frequencyLeftLine: {
              display: 'none',
              x1: 25,
              y1: 15,
              x2: 10,
              y2: 0,
              opacity: '0.8',
              strokeWidth: 1,
              stroke: '#8A0868',
              'stroke-dasharray': '4 4'
            },
            frequencyRightLine: {
              display: 'none',
              x1: 65,
              y1: 15,
              x2: 80,
              y2: 0,
              opacity: '0.8',
              strokeWidth: 1,
              stroke: '#8A0868',
              'stroke-dasharray': '4 4'
            },
            frequencyLeftLabel: {
              display: 'none',
              text: '0..1',
              textVerticalAnchor: 'bottom',
              textAnchor: 'middle',
              x: 10,
              y: 0,
              fill: '#8A0868',
              fontSize: 14,
              'font-family': 'Arial'
            },
            frequencyRightLabel: {
              display: 'none',
              text: '0..1',
              textVerticalAnchor: 'bottom',
              textAnchor: 'middle',
              x: 80,
              y: 0,
              fill: '#8A0868',
              fontSize: 14,
              'font-family': 'Arial'
            },
            frequencyLeftLabelBackground: {
              display: 'none',
              ref: 'frequencyLeftLabel',
              refX: 0,
              refY: 0,
              refHeight: '100%',
              refWidth: '100%',
              fill: '#ffffff'
            },
            frequencyRightLabelBackground: {
              display: 'none',
              ref: 'frequencyRightLabel',
              refX: 0,
              refY: 0,
              refHeight: '100%',
              refWidth: '100%',
              fill: '#ffffff'
            },
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
                    },
                    {
                      tagName: 'line',
                      selector: 'frequencyLeftLine'
                    },
                    {
                      tagName: 'line',
                      selector: 'frequencyRightLine'
                    },
                    {
                      tagName: 'rect',
                      selector: 'frequencyLeftLabelBackground',
                    },
                    {
                      tagName: 'rect',
                      selector: 'frequencyRightLabelBackground',
                    },
                    {
                      tagName: 'text',
                      selector: 'frequencyLeftLabel'
                    },
                    {
                      tagName: 'text',
                      selector: 'frequencyRightLabel'
                    },
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
      label: 'Entity Type',
      name: 'Entity',
      uri: 'http://crowd.fi.uncoma.edu.ar#entity'
    });

    //add joint orm entity ref mode to palette elements
    crowd.palette.elements.entityReferenceMode = new joint.shapes.orm.EntityReferenceMode({
      parentType: 'entity',
      type: 'entityReferenceMode',
      label: 'Entity Type',
      name: 'Entity',
      uri: 'http://crowd.fi.uncoma.edu.ar#entity',
      refUri: ''
    });

    //add joint orm value to palette elements
    crowd.palette.elements.value = new joint.shapes.orm.Value({
      parentType: 'entity',
      type: 'value',
      label: 'Value',
      name: 'Value',
      datatype: 'Integer',
      uri: 'http://crowd.fi.uncoma.edu.ar#value'
    });

    //add joint orm role unary to palette elements
    // crowd.palette.elements.roleUnary = new joint.shapes.orm.RoleUnary({
    //   parentType: 'role',
    //   type: 'roleUnary',
    //   label: 'Fact Type',
    //   name: 'Role',
    //   read: 'right',
    //   uri: 'http://crowd.fi.uncoma.edu.ar#fact-type'
    // });

    //add joint orm role binary to palette elements
    crowd.palette.elements.roleBinary = new joint.shapes.orm.RoleBinary({
      parentType: 'role',
      type: 'roleBinary',
      label: 'Fact Type',
      name: 'Role',
      read: 'right',
      cardinality: {
        left: '0..1',
        right: '0..1'
      },
      roles: {
        left: 'http://crowd.fi.uncoma.edu.ar#role-a',
        right: 'http://crowd.fi.uncoma.edu.ar#role-b'
      },
      uri: 'http://crowd.fi.uncoma.edu.ar#fact-type',
      enumerate: ['roles/left', 'roles/right']
    });

    //add joint orm union constraint to palette elements
    crowd.palette.elements.union = new joint.shapes.orm.Union({
      parentType: 'constraint',
      type: 'union',
      label: 'Exhaustive'
    });

    //add joint orm exclusive constraint to palette elements
    crowd.palette.elements.exclusive = new joint.shapes.orm.Exclusive({
      parentType: 'constraint',
      type: 'exclusive',
      label: 'Exclusive'
    });

    //add joint orm exclusive exhaustive constraint to palette elements
    crowd.palette.elements.exclusiveExhaustive = new joint.shapes.orm.ExclusiveExhaustive({
      parentType: 'constraint',
      type: 'exclusiveExhaustive',
      label: 'Exclusive Exhaustive'
    });

    //add joint orm subset constraint to palette elements
    crowd.palette.elements.subset = new joint.shapes.orm.Subset({
      parentType: 'constraint',
      type: 'subset'
    });

    //add joint orm equality constraint to palette elements
    // crowd.palette.elements.equality = new joint.shapes.orm.Equality({
    //   parentType: 'constraint',
    //   type: 'equality'
    // });

    //add joint orm connector to palette links
    crowd.palette.links.connector = new joint.shapes.standard.Link({
      parentType: 'connector',
      type: 'connector',
      label: 'Connector',
      direction: null,
      mandatory: false,
      attrs: {
        line: {
          stroke: 'black',
          strokeWidth: 2,
          sourceMarker: {
            display: 'none',
            stroke: '#A000A0',
            fill: '#A000A0',
            d: 'M 16 0 a 8 8 0 1 0 0 1'
          },
          targetMarker: {
            display: 'none',
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
      label: 'Subtype Connector',
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
      label: 'Constraint Connector',
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
            // mandatory: config.mandatory ? config.mandatory : false,
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
            title: 'Click and drag to connect the object with a <b class="crowd-bold-color">subtype</b> connector',
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
          magnet: 'relLeft'
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
    //initialize specific functions for orm checks
    crowd.orm = {};
    crowd.orm.uniqOne = function (card) {
      return card == '0..1' || card == '1..1';
    };
    crowd.orm.uniqMany = function (card) {
      return card == '1..*' || card == '0..*';//|| (card.includes('0..') && card.split('0..')[1] != 1);
    };
    crowd.orm.convertFrequency = function (card) {
      return card.includes('0..') && card.split('0..')[1] != 1
        ? '<=' + card.split('0..')[1]
        : (card.includes('..*') && card.split('..*')[0] != 0
          ? '>=' + card.split('..*')[0]
          : card);
    };

    //event when the elements type change (types are: entity, weakEntity, attribute, etc)
    crowd.workspace.graph.on('change:type', function (element, newType) {
      // console.log('change:type', { element, newType });

      if (element.isElement()) {
        //replace element attributes and markup with the palette default component of the newtype
        element.attributes.attrs = $.extend(true, {}, crowd.palette.elements[newType].attributes.attrs);
        element.markup = crowd.palette.elements[newType].markup;
        element.attributes.label = crowd.palette.elements[newType].attributes.label;

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
        //change uniqueness lines
        if (!crowd.orm.uniqOne(newCardinality.left) && !crowd.orm.uniqOne(newCardinality.right)) {
          element.attr('uniqueLeft/display', 'none');
          element.attr('uniqueRight/display', 'none');
          element.attr('uniqueFull/display', 'unset');
        } else {
          element.attr('uniqueLeft/display', crowd.orm.uniqOne(newCardinality.left) ? 'unset' : 'none');
          element.attr('uniqueRight/display', crowd.orm.uniqOne(newCardinality.right) ? 'unset' : 'none');
          element.attr('uniqueFull/display', 'none');
        }

        //change frequencies visibility and values
        var hasFreqLeft = !crowd.orm.uniqOne(newCardinality.left) && !crowd.orm.uniqMany(newCardinality.left);
        element.attr('frequencyLeftLabel/text', crowd.orm.convertFrequency(newCardinality.left));
        element.attr('frequencyLeftLabel/display', hasFreqLeft ? 'unset' : 'none');
        element.attr('frequencyLeftLabelBackground/display', hasFreqLeft ? 'unset' : 'none');
        element.attr('frequencyLeftLine/display', hasFreqLeft ? 'unset' : 'none');

        var hasFreqRight = !crowd.orm.uniqOne(newCardinality.right) && !crowd.orm.uniqMany(newCardinality.right);
        element.attr('frequencyRightLabel/text', crowd.orm.convertFrequency(newCardinality.right));
        element.attr('frequencyRightLabel/display', hasFreqRight ? 'unset' : 'none');
        element.attr('frequencyRightLabelBackground/display', hasFreqRight ? 'unset' : 'none');
        element.attr('frequencyRightLine/display', hasFreqRight ? 'unset' : 'none');

        //change mandatory of link connected by the cardinality input
        // if (!hasFreqLeft || !hasFreqRight) {
        crowd.workspace.graph.getConnectedLinks(element).forEach(function (link) {
          if (link.attributes.type == 'connector') {
            if ((link.attributes.source?.id == element.id && link.attributes.source?.port == 'left') ||
              (link.attributes.target?.id == element.id && link.attributes.target?.port == 'left')) {
              // if (!hasFreqLeft)
              link.prop('mandatory', newCardinality.left.split('..')[0] != '0');
            }

            if ((link.attributes.source?.id == element.id && link.attributes.source?.port == 'right') ||
              (link.attributes.target?.id == element.id && link.attributes.target?.port == 'right')) {
              // if (!hasFreqRight)
              link.prop('mandatory', newCardinality.right.split('..')[0] != '0');
            }
          }
        });
        // }
      }
    });

    //event when the links type change (types are: association, aggregation, composition, etc)
    crowd.workspace.graph.on('change:type', function (link, newType) {
      // console.log('change:type', { link, newType });

      if (link.isLink()) {
        //replace link attributes and markup with the palette default component of the newtype
        link.attributes.attrs = $.extend(true, {}, crowd.palette.links[newType].attributes.attrs);
        link.markup = crowd.palette.links[newType].markup;
        link.attributes.label = crowd.palette.links[newType].attributes.label;

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
            // link.attributes.attrs.line.sourceMarker = $.extend(true, {}, crowd.palette.links[link.attributes.type].attributes.attrs.line.targetMarker);
            // link.attributes.attrs.line.targetMarker = {};
            link.attributes.attrs.line.sourceMarker.display = newMandatory ? 'unset' : 'none'
            link.attributes.attrs.line.targetMarker.display = 'none';
          } else {
            // link.attributes.attrs.line.targetMarker = $.extend(true, {}, crowd.palette.links[link.attributes.type].attributes.attrs.line.targetMarker);
            // link.attributes.attrs.line.sourceMarker = {};
            link.attributes.attrs.line.sourceMarker.display = 'none'
            link.attributes.attrs.line.targetMarker.display = newMandatory ? 'unset' : 'none';
          }

          // link.attr('line/sourceMarker/display', newMandatory ? 'unset' : 'none');
          // link.attr('line/targetMarker/display', newMandatory ? 'unset' : 'none');

          //get link view
          var linkView = link.findView(crowd.workspace.paper);

          //redraw the link with the new style
          linkView.render();

          //change source role binary cardinality by the mandatory value
          var sourceElem = link.getSourceElement()
          if (sourceElem?.attributes?.type == 'roleBinary') {
            let newCard = sourceElem.prop('cardinality/' + link.attributes.source.port);
            let hasFreq = !crowd.orm.uniqOne(newCard) && !crowd.orm.uniqMany(newCard);
            // if (!hasFreq) {
            newCard = (newMandatory ? (hasFreq && newCard.split('..')[0] != '0' ? newCard.split('..')[0] : '1') : '0') + '..' + newCard.split('..')[1];
            sourceElem.prop('cardinality/' + link.attributes.source.port, newCard);
            // }
          }

          //change target role binary cardinality by the mandatory value
          var targetElem = link.getTargetElement()
          if (targetElem?.attributes?.type == 'roleBinary') {
            let newCard = targetElem.prop('cardinality/' + link.attributes.target.port);
            let hasFreq = !crowd.orm.uniqOne(newCard) && !crowd.orm.uniqMany(newCard);
            // if (!hasFreq) {
            newCard = (newMandatory ? (hasFreq && newCard.split('..')[0] != '0' ? newCard.split('..')[0] : '1') : '0') + '..' + newCard.split('..')[1];
            targetElem.prop('cardinality/' + link.attributes.target.port, newCard);
            // }
          }
        }

        // crowd.inspector.loadContent();
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
        var sourceElem = link.getSourceElement();
        if (sourceElem) sourceElem.trigger('change:cardinality', sourceElem, sourceElem.prop('cardinality'));

        var targetElem = link.getTargetElement();
        if (targetElem) targetElem.trigger('change:cardinality', targetElem, targetElem.prop('cardinality'));

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
        var colorMarkups = ['body/stroke'];
        if (cell.attributes.type == 'roleUnary') colorMarkups = ['relLeft/stroke'];
        else if (cell.attributes.type == 'roleBinary') colorMarkups = ['relLeft/stroke', 'relCenter/stroke', 'relRight/stroke'];
        colorMarkups.forEach(function (colorMarkup) {
          color = unsatisfiable != null || inferred != null ? color : crowd.palette.elements[cell.attributes.type]?.attr(colorMarkup);
          cell.attr(colorMarkup, color);
        });
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

    //add datatype attribute for values
    switch (crowd.inspector.model.attributes.type) {
      case 'value':
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

    //add read attribute for roles
    switch (crowd.inspector.model.attributes.parentType) {
      case 'role':
        crowd.inspector.addAttribute({ label: 'Read to left?', property: 'read', type: 'boolean', map: { true: 'left', false: 'right' } });
    }

    //add cardinality and roles attributes for role binary
    switch (crowd.inspector.model.attributes.type) {
      case 'roleBinary':
        // crowd.inspector.addAttribute({
        //   label: 'Frequency', property: 'cardinality', type: 'object',
        //   parameters: [
        //     {
        //       label: 'Left', property: 'left', type: 'multiple',
        //       values: [
        //         { label: 'One', value: 'one' },
        //         { label: 'Many', value: 'many' },
        //       ]
        //     },
        //     {
        //       label: 'Right', property: 'right', type: 'multiple',
        //       values: [
        //         { label: 'One', value: 'one' },
        //         { label: 'Many', value: 'many' },
        //       ]
        //     },
        //   ]
        // });
        crowd.inspector.addAttribute({
          label: 'Frequency', property: 'cardinality', type: 'object',
          parameters: [
            { label: 'Left', property: 'left', type: 'text', placeholder: 'Left Cardinality' },
            { label: 'Right', property: 'right', type: 'text', placeholder: 'Right Cardinality' }
          ]
        });
        crowd.inspector.addAttribute({
          label: 'Roles', property: 'roles', type: 'object',
          parameters: [
            { label: 'Left', property: 'left', type: 'text', input: 'textarea', inputRows: 2, placeholder: 'Left' },
            { label: 'Right', property: 'right', type: 'text', input: 'textarea', inputRows: 2, placeholder: 'Right' }
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
            { label: 'Exhaustive', value: 'union' },
            { label: 'Exclusive', value: 'exclusive' },
            { label: 'Exclusive Exhaustive', value: 'exclusiveExhaustive' },
            { label: 'Subset', value: 'subset' },
            // { label: 'Equality', value: 'equality' },
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
            { label: 'Subtype', value: 'inheritanceConnector' },
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
    //define basic structure of orm json according to schema
    var jsonSchema = {
      entities: [],
      relationships: [],
      attributes: [], //not used
      inheritances: [], //not used
      connectors: []
    };

    //mapping of cardinalities to the requested format of schema
    var cardinalityMap = {
      'one': '0..1',
      'many': '0..*'
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

    //mapping of role types to the requested format of schema
    var roleTypeMap = {
      'roleUnary': 'unaryFactType',
      'roleBinary': 'binaryFactType'
    }

    //mapping of constraints types to the requested format of schema
    var constraintTypeMap = {
      'union': 'union',
      'exclusive': 'exclusive',
      'exclusiveExhaustive': 'exclusive',
      'subset': 'subset',
      'equality': 'equality'
    }

    //mapping of constraints types to the requested format of schema in inheritances
    var constraintTypeInheritanceMap = {
      'union': ['union'],
      'exclusive': ['exclusive'],
      'exclusiveExhaustive': ['exclusive', 'union'],
      'subset': [],
      'equality': ['equality']
    }

    var entityTypeMap = {
      'entity': 'entity',
      'entityReferenceMode': 'entityRefMode',
      'value': 'value'
    }

    var rolePortMap = {
      'left': 'http://crowd.fi.uncoma.edu.ar#left',
      'right': 'http://crowd.fi.uncoma.edu.ar#right',
      'center': 'http://crowd.fi.uncoma.edu.ar#center'
    }

    //iterates each element and add it to the correspondent collection
    crowd.workspace.graph.getElements().forEach(function (element) {
      switch (element.attributes.parentType) {
        case 'entity':
          jsonSchema.entities.push({
            id: element.cid,
            uri: element.attributes.uri,
            name: element.attributes.uri,
            ref: element.attributes.refUri,
            type: entityTypeMap[element.attributes.type],
            ...element.attributes.type == 'value' ? { datatype: datatypeMap[element.attributes.datatype] } : {},
            position: element.attributes.position,
            size: element.attributes.size,
          });

          crowd.workspace.graph.getConnectedLinks(element).forEach(function (link) {
            if (link.attributes.type == 'inheritanceConnector' &&
              link.getSourceElement().attributes.parentType == 'entity' &&
              link.getTargetElement().attributes.parentType == 'entity') {
              var parentEntity;
              var childEntity;
              if (link.attributes.direction == 'source' && link.attributes.source.id == element.attributes.id) {
                parentEntity = link.getSourceElement();
                childEntity = link.getTargetElement();
              } else if (link.attributes.direction == 'target' && link.attributes.target.id == element.attributes.id) {
                parentEntity = link.getTargetElement();
                childEntity = link.getSourceElement();
              }

              if (parentEntity && childEntity) {
                var connectedConstraints = [];
                crowd.workspace.graph.getConnectedLinks(link).forEach(function (inheritanceLink) {
                  if (inheritanceLink.attributes.type == 'constraintConnector') {
                    var connectedConstraint;
                    if (inheritanceLink.attributes.source.id != link.id && inheritanceLink.getSourceElement().attributes.parentType == 'constraint') {
                      connectedConstraint = inheritanceLink.getSourceElement();
                    } else if (inheritanceLink.attributes.target.id != link.id && inheritanceLink.getTargetElement().attributes.parentType == 'constraint') {
                      connectedConstraint = inheritanceLink.getTargetElement();
                    }

                    if (connectedConstraint)
                      // connectedConstraints = connectedConstraints.concat(constraintTypeInheritanceMap[connectedConstraint.attributes.type]);
                      connectedConstraints.push(connectedConstraint);

                    // var sameConstraintEntities = [];
                    // crowd.workspace.graph.getConnectedLinks(connectedConstraint).forEach(function (connectedConstraintLink) {
                    //   var connectedConstraintInheritance;
                    //   if (connectedConstraintLink.attributes.source.id != connectedConstraint.id && connectedConstraintLink.getSourceElement().attributes.parentType == 'constraint') {
                    //     connectedConstraintInheritance = connectedConstraintLink.getSourceElement();
                    //   } else if (connectedConstraintLink.attributes.target.id != connectedConstraint.id && connectedConstraintLink.getTargetElement().attributes.parentType == 'constraint') {
                    //     connectedConstraintInheritance = connectedConstraintLink.getTargetElement();
                    //   }

                    //   var connectedConstraintInheritanceEntity;
                    //   if (connectedConstraintInheritance.attributes.source.id != parentEntity.id) {
                    //     connectedConstraintInheritanceEntity = connectedConstraintInheritance.getSourceElement();
                    //   } else if (connectedConstraintInheritance.attributes.target.id != parentEntity.id) {
                    //     connectedConstraintInheritanceEntity = connectedConstraintInheritance.getTargetElement();
                    //   }

                    //   if (!sameConstraintEntities.find(function (e) { return e.id == connectedConstraintInheritanceEntity.id }))
                    //     sameConstraintEntities = sameConstraintEntities.concat([connectedConstraintInheritanceEntity]);
                    // });
                  }
                });

                // console.log(parentEntity.attributes.uri, childEntity.attributes.uri, connectedConstraints);

                //in case that have constraints
                if (connectedConstraints.length) {
                  connectedConstraints.forEach(function (constraint) {
                    var existentInheritance = jsonSchema.connectors.find(function (connector) {
                      return connector.type == 'subtyping' && connector.parent == parentEntity.attributes.uri && connector.subtypingContraint.includes(constraint.id);
                    });

                    if (!existentInheritance) {
                      var inheritance = {
                        name: link.cid,
                        parent: parentEntity.attributes.uri,
                        entities: [childEntity.attributes.uri],
                        type: 'subtyping',
                        subtypingContraint: [constraint.id],
                        position: element.attributes.position,
                        size: element.attributes.size,
                      }

                      jsonSchema.connectors.push(inheritance);
                    } else {
                      existentInheritance.entities.push(childEntity.attributes.uri);
                    }
                  });
                } else { //case that's only inheritance
                  var existentInheritance = jsonSchema.connectors.find(function (connector) {
                    return connector.type == 'subtyping' && connector.parent == parentEntity.attributes.uri && connector.subtypingContraint.length <= 0;
                  });

                  if (!existentInheritance) {
                    var inheritance = {
                      name: link.cid,
                      parent: parentEntity.attributes.uri,
                      entities: [childEntity.attributes.uri],
                      type: 'subtyping',
                      subtypingContraint: [],
                      position: element.attributes.position,
                      size: element.attributes.size,
                    }

                    jsonSchema.connectors.push(inheritance);
                  } else {
                    existentInheritance.entities.push(childEntity.attributes.uri);
                  }
                }
              }
            }
          });
          break;
        case 'role':
          var role = {
            uri: element.attributes.uri,
            name: element.attributes.uri,
            inverseReading: element.attributes.read == 'left',
            entities: [],
            uniquenessConstraints: [],
            mandatory: [],
            roles: [],
            type: roleTypeMap[element.attributes.type],
            position: element.attributes.position,
            size: element.attributes.size,
          }

          crowd.workspace.graph.getConnectedLinks(element).forEach(function (link) {
            if (link.attributes.type == 'connector') {
              var connectedEntity;
              var port;
              if (link.attributes.source.id != element.id && link.getSourceElement().attributes.parentType == 'entity') {
                connectedEntity = link.getSourceElement();
                port = link.attributes.target.port;
              } else if (link.attributes.target.id != element.id && link.getTargetElement().attributes.parentType == 'entity') {
                connectedEntity = link.getTargetElement();
                port = link.attributes.source.port;
              }

              if (connectedEntity && port) {
                if (element.attributes.type == 'roleUnary') {
                  role.entities.push(connectedEntity.attributes.uri);
                  if (link.attributes.mandatory) role.mandatory.push(connectedEntity.attributes.uri);
                  role.uniquenessConstraints.push(cardinalityMap['one']);
                } else if (element.attributes.type == 'roleBinary') {
                  if (port == 'left') {
                    role.entities.unshift(connectedEntity.attributes.uri);
                    if (link.attributes.mandatory) role.mandatory.unshift(connectedEntity.attributes.uri);
                    role.uniquenessConstraints.unshift(element.attributes.cardinality[port]);
                    role.roles.unshift(element.attributes.roles[port]);
                  } else if (port == 'right') {
                    role.entities.push(connectedEntity.attributes.uri);
                    if (link.attributes.mandatory) role.mandatory.push(connectedEntity.attributes.uri);
                    role.uniquenessConstraints.push(element.attributes.cardinality[port]);
                    role.roles.push(element.attributes.roles[port]);
                  }
                }
              }
            }
          });

          jsonSchema.relationships.push(role);
          break;
        case 'constraint':
          var constraint = {
            id: element.cid,
            name: element.cid,
            parent: '',
            ...element.attributes.type == 'subset' ? { factParent: [] } : {},
            factTypes: [],
            ...element.attributes.type == 'subset' ? { factParentPosition: [] } : {},
            factPosition: [],
            type: 'roleConstraint',
            roleConstraint: constraintTypeMap[element.attributes.type],
            position: element.attributes.position,
            size: element.attributes.size,
          }

          crowd.workspace.graph.getConnectedLinks(element).forEach(function (link) {
            if (link.attributes.type == 'constraintConnector') {
              var connectedRole;
              var port;
              if (link.attributes.source.id != element.id && link.getSourceElement().attributes.parentType == 'role') {
                connectedRole = link.getSourceElement();
                port = link.attributes.source.port;
              } else if (link.attributes.target.id != element.id && link.getTargetElement().attributes.parentType == 'role') {
                connectedRole = link.getTargetElement();
                port = link.attributes.target.port;
              }

              if (connectedRole && port) {
                if (element.attributes.type == 'subset' && link.attributes.direction != null) {
                  constraint.factParent.push(connectedRole.attributes.uri);
                  constraint.factParentPosition.push(rolePortMap[port]);
                } else {
                  constraint.factTypes.push(connectedRole.attributes.uri);
                  constraint.factPosition.push(rolePortMap[port]);
                }
              }
            }
          });

          if (constraint.factTypes.length) jsonSchema.connectors.push(constraint);
          break;
      }
    });

    //after adding inheritance connectors
    //proccess them to join them if is needed
    jsonSchema.connectors.forEach(function (connector, cIndex) {
      if (connector.type == 'subtyping') {
        jsonSchema.connectors.forEach(function (otherConnector, ocIndex) {
          // console.log(connector.entities, otherConnector.entities, arraysEqual(connector.entities, otherConnector.entities));
          if (cIndex != ocIndex
            && otherConnector.type == 'subtyping'
            && connector.parent == otherConnector.parent
            && arraysEqual(connector.entities, otherConnector.entities)) {
            connector.subtypingContraint = connector.subtypingContraint.concat(otherConnector.subtypingContraint);
            jsonSchema.connectors.splice(ocIndex, 1);
          }
        });
      }
    });
    //replace their constraints ids by their types
    jsonSchema.connectors.forEach(function (connector) {
      if (connector.type == 'subtyping') {
        var typedConstraints = [];
        connector.subtypingContraint.forEach(function (constraintId) {
          typedConstraints = [...new Set([...typedConstraints, ...constraintTypeInheritanceMap[crowd.workspace.graph.getCell(constraintId).attributes.type]])];
        });
        connector.subtypingContraint = typedConstraints;
      }
    });

    return jsonSchema;
  },
  fromJSONSchema: function (crowd, schema) {
    console.log('loadORM', schema);

    var entitiesObj = {};
    var rolesObj = {};
    var constraintsObj = {};
    var linksObj = {};

    //mapping of cardinalities to the editor format
    var cardinalityMap = function (cardinality) {
      // return cardinality?.indexOf('*') != -1 ? 'many' : 'one';
      return cardinality;
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

    var constraintTypeInheritanceMap = function (constraints) {
      var constraintsResult = [...constraints];
      if (constraints.find(e => e == 'exclusive') && constraints.find(e => e == 'union')) {
        constraintsResult.push('exclusiveExhaustive');
        constraintsResult = constraintsResult.filter(e => e != 'exclusive' && e != 'union');
      }
      constraintsResult = constraintsResult.filter(e => e != 'subset');

      return constraintsResult;
    }

    var entityTypeMap = {
      'entity': 'entity',
      'entityRefMode': 'entityReferenceMode',
      'value': 'value'
    }

    var rolePortMap = function (port) {
      if (port.includes('left')) return 'left';
      if (port.includes('right')) return 'right';
      if (port.includes('center')) return 'center';
    }

    if (schema) {
      //add each entity and their properties
      if (schema.entities) {
        schema.entities.forEach(function (entity) {
          entitiesObj[entity.name] = crowd.palette.elements[entityTypeMap[entity.type]].clone();
          crowd.workspace.graph.addCell(entitiesObj[entity.name]);
          $.each(entity, function (attribute, value) {
            switch (attribute) {
              case 'name':
                entitiesObj[entity.name].prop('uri', value);
                break;
              case 'datatype':
                entitiesObj[entity.name].prop('datatype', datatypeMap[value]);
                break;
              case 'position': case 'size':
                entitiesObj[entity.name].prop(attribute, value)
                break;
            }
          });
        });
      }

      //add each role and their properties
      if (schema.relationships) {
        schema.relationships.forEach(function (relationship) {
          var isBinary = relationship.entities.length > 1;
          rolesObj[relationship.name] = crowd.palette.elements[isBinary ? 'roleBinary' : 'roleUnary'].clone();
          crowd.workspace.graph.addCell(rolesObj[relationship.name]);

          relationship.entities.forEach(function (entity, index) {
            linksObj[relationship.name + '#' + entity] = crowd.palette.links.connector.clone();
            linksObj[relationship.name + '#' + entity].source({
              id: rolesObj[relationship.name].id, port: index == 0 ? 'left' : 'right', magnet: index == 0 ? 'relLeft' : 'relRight'
            });
            linksObj[relationship.name + '#' + entity].target(entitiesObj[entity]);
            crowd.workspace.graph.addCell(linksObj[relationship.name + '#' + entity]);
            linksObj[relationship.name + '#' + entity].prop('mandatory', relationship.mandatory.includes(entity));
            linksObj[relationship.name + '#' + entity].toBack();
          });

          $.each(relationship, function (attribute, value) {
            switch (attribute) {
              case 'name':
                rolesObj[relationship.name].prop('uri', value);
                break;
              case 'inverseReading':
                rolesObj[relationship.name].prop('read', value ? 'left' : 'right');
                break;
              case 'uniquenessConstraints':
                if (isBinary) {
                  rolesObj[relationship.name].prop('cardinality/left', cardinalityMap(value[0]));
                  rolesObj[relationship.name].prop('cardinality/right', cardinalityMap(value[1]));
                }
                break;
              case 'roles':
                if (isBinary) {
                  rolesObj[relationship.name].prop('roles/left', value[0]);
                  rolesObj[relationship.name].prop('roles/right', value[1]);
                }
                break;
              case 'position': case 'size':
                rolesObj[relationship.name].prop(attribute, value)
                break;
            }
          });
        });
      }

      //add inheritances and constraints and their properties
      if (schema.connectors) {
        schema.connectors.forEach(function (connector) {
          if (connector.type == 'subtyping') {
            connector.entities.forEach(function (entity) {
              if (!linksObj[connector.parent + "#" + entity]) {
                linksObj[connector.parent + "#" + entity] = crowd.palette.links.inheritanceConnector.clone();
                linksObj[connector.parent + "#" + entity].source(entitiesObj[entity]);
                linksObj[connector.parent + "#" + entity].target(entitiesObj[connector.parent]);
                crowd.workspace.graph.addCell(linksObj[connector.parent + "#" + entity]);
                // linksObj[connector.name + "#" + entity].prop('direction', 'target');
                linksObj[connector.parent + "#" + entity].toBack();
              }
            });
            constraintTypeInheritanceMap(connector.subtypingContraint).forEach(function (constraint) {
              // console.log('inherConstraint', constraint);
              constraintsObj[connector.name + "#" + constraint] = crowd.palette.elements[constraint].clone();
              crowd.workspace.graph.addCell(constraintsObj[connector.name + "#" + constraint]);
              connector.entities.forEach(function (entity) {
                linksObj[connector.name + "#" + entity + "#" + constraint] = crowd.palette.links.constraintConnector.clone();
                linksObj[connector.name + "#" + entity + "#" + constraint].source(constraintsObj[connector.name + "#" + constraint]);
                linksObj[connector.name + "#" + entity + "#" + constraint].target(linksObj[connector.parent + "#" + entity]);
                crowd.workspace.graph.addCell(linksObj[connector.name + "#" + entity + "#" + constraint]);
                linksObj[connector.name + "#" + entity + "#" + constraint].prop('direction', null);
                linksObj[connector.name + "#" + entity + "#" + constraint].toBack();
              });

              //position inheritance constraint circle
              let mediumPosition = medianPoint(
                constraintsObj[connector.name + "#" + constraint],
                connector.entities.map(function (entity) {
                  return linksObj[connector.parent + "#" + entity]
                })
              );
              constraintsObj[connector.name + "#" + constraint]?.position(mediumPosition.x, mediumPosition.y);
            });
          } else if (connector.type == 'roleConstraint') {
            constraintsObj[connector.name] = crowd.palette.elements[connector.roleConstraint].clone();
            crowd.workspace.graph.addCell(constraintsObj[connector.name]);
            $.each(connector, function (attribute, value) {
              switch (attribute) {
                case 'position': case 'size':
                  constraintsObj[connector.name].prop(attribute, value)
                  break;
              }
            });

            connector.factTypes.forEach(function (factType, index) {
              linksObj[connector.name + "#" + factType] = crowd.palette.links.constraintConnector.clone();
              linksObj[connector.name + "#" + factType].source(constraintsObj[connector.name]);
              linksObj[connector.name + "#" + factType].target({
                id: rolesObj[factType].id, port: rolePortMap(connector.factPosition[index]), magnet: 'rel' + capitalize(rolePortMap(connector.factPosition[index]))
              });
              crowd.workspace.graph.addCell(linksObj[connector.name + "#" + factType]);
              linksObj[connector.name + "#" + factType].prop('direction', null);
              linksObj[connector.name + "#" + factType].toBack();
            });

            connector.factParent?.forEach(function (factParent, index) {
              linksObj[connector.name + "#" + factParent] = crowd.palette.links.constraintConnector.clone();
              linksObj[connector.name + "#" + factParent].source(constraintsObj[connector.name]);
              linksObj[connector.name + "#" + factParent].target({
                id: rolesObj[factParent].id, port: rolePortMap(connector.factParentPosition[index]), magnet: 'rel' + capitalize(rolePortMap(connector.factParentPosition[index]))
              });
              crowd.workspace.graph.addCell(linksObj[connector.name + "#" + factParent]);
              linksObj[connector.name + "#" + factParent].prop('direction', 'target');
              linksObj[connector.name + "#" + factParent].toBack();
            });

            //position constraint circle if it has not previous position
            if (!connector.position) {
              let mediumPosition = medianPoint(
                constraintsObj[connector.name],
                connector.factTypes.map(function (factType) {
                  return rolesObj[factType]
                }).concat(rolesObj[connector.factParent])
              );
              constraintsObj[connector.name]?.position(mediumPosition.x, mediumPosition.y);
            }
          }
        });
      }
    }
  },
  positioningJSONSchema: function (schema, positionedSchema) {
    var mergedSchema = $.extend(true, {}, schema);

    mergedSchema.entities.forEach(function (entity) {
      let relative = positionedSchema.entities.find(function (r) {
        return r.uri == entity.uri || r.name == entity.name;
      });

      if (relative) {
        entity.position = relative?.position;
        entity.size = relative?.size;
      }
    });

    mergedSchema.relationships.forEach(function (relationship) {
      let relative = positionedSchema.relationships.find(function (r) {
        return r.uri == relationship.uri || r.name == relationship.name;
      });

      if (relative) {
        relationship.position = relative?.position;
        relationship.size = relative?.size;
      }
    });

    mergedSchema.attributes.forEach(function (attribute) {
      let relative = positionedSchema.attributes.find(function (r) {
        return r.uri == attribute.uri || r.name == attribute.name;
      });

      if (relative) {
        attribute.position = relative?.position;
        attribute.size = relative?.size;
      }
    });

    mergedSchema.connectors.forEach(function (connector) {
      let relative = positionedSchema.connectors.find(function (r) {
        return r.name == connector.name;// && connector.type != 'subtyping';
      });

      if (relative) {
        connector.position = relative?.position;
        connector.size = relative?.size;
      }
    });

    return mergedSchema;
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
