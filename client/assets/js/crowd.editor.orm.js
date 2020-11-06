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

      const original_width_role = 28;
      const original_height_role = 17;
      const original_rx_role = 3;
      const original_ry_role = 3;
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
      type: 'connector',
      inherit: false,
      attrs: {
        line: {
          stroke: 'black',
          strokeWidth: 2,
          sourceMarker: {},
          targetMarker: {
            d: ''
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
          type: 'connector',
          props: {
            inherit: config.inherit ? config.inherit : false
          }
        }
      });
    }

    //create tools view for entities
    crowd.workspace.tools.elements.elementsToolsView['entity'] = new joint.dia.ToolsView({
      name: 'entity-tools',
      tools: crowd.workspace.tools.elements.basicTools.concat([
        linkTool()
      ])
    });

    //create tools view for entities ref mode
    crowd.workspace.tools.elements.elementsToolsView['entityReferenceMode'] = new joint.dia.ToolsView({
      name: 'entity-ref-mode-tools',
      tools: crowd.workspace.tools.elements.basicTools.concat([
        linkTool()
      ])
    });

    //create tools view for values
    crowd.workspace.tools.elements.elementsToolsView['value'] = new joint.dia.ToolsView({
      name: 'value-tools',
      tools: crowd.workspace.tools.elements.basicTools.concat([
        linkTool()
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

    //event when the elements (specificly inheritance) subtype change
    crowd.workspace.graph.on('change:subtype', function (element, newSubtype) {
      // console.log('change:subtype', { element, newSubtype });

      if (element.isElement() && element.prop('type') == 'inheritance') {
        var subtypesText = { overlaped: 'o', disjoint: 'd', union: 'U' };
        element.attr('text/text', subtypesText[newSubtype]);
      }
    });

    //event when the link inherit change
    crowd.workspace.graph.on('change:inherit', function (link, newInherit) {
      // console.log('change:inherit', { link, newInherit });

      if (link.isLink()) {
        if (newInherit) {
          link.trigger('change:inheritChild', link, link.prop('inheritChild'));
        } else {
          link.trigger('change:cardinality', link, link.prop('cardinality'));
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
          link.labels([{
            attrs: {
              text: {
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
      case 'entityReferenceMode':
      case 'value':
        if (crowd.inspector.model.attributes.type != 'connector' || !crowd.inspector.model.attributes.inherit)
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

    //add type attribute for connectors
    switch (crowd.inspector.model.attributes.type) {
      case 'connector':
        crowd.inspector.addAttribute({ label: 'Is for Inheritance?', property: 'inherit', type: 'boolean', map: { true: true, false: false } });
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
