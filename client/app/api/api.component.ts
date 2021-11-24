import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { environment } from '../../environments/environment';
import { DarkmodeService } from '../services/darkmode.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CodemirrorComponent } from '@ctrl/ngx-codemirror';
import * as CodeMirror from 'codemirror';

declare var iziToast;

declare var CrowdMetamodel;
declare var CrowdReasoning;
declare var infixCapsReplace;
declare var capitalizeOnlyFirstLetter;

@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.scss']
})
export class ApiComponent implements OnInit {

  constructor(
    private router: Router,
    public darkmodeService: DarkmodeService
  ) {
    this.JSON = JSON;
  }

  public JSON: any;
  public selectedAPI: string = 'metamodel';
  public selectedTab: number = 0;

  public validDrag: any;
  public invalidDrag: any;
  public dragFiles: any;

  public examples = {
    uml: {
      "classes": [
        {
          "uri": "http://crowd.fi.uncoma.edu.ar#persona",
          "name": "http://crowd.fi.uncoma.edu.ar#persona",
          "attrs": [],
          "methods": [],
          "position": {
            "x": 300,
            "y": 130
          },
          "size": {
            "width": 90,
            "height": 40
          }
        },
        {
          "uri": "http://crowd.fi.uncoma.edu.ar#empresa",
          "name": "http://crowd.fi.uncoma.edu.ar#empresa",
          "attrs": [],
          "methods": [],
          "position": {
            "x": 660,
            "y": 340
          },
          "size": {
            "width": 90,
            "height": 40
          }
        },
        {
          "uri": "http://crowd.fi.uncoma.edu.ar#empleado",
          "name": "http://crowd.fi.uncoma.edu.ar#empleado",
          "attrs": [],
          "methods": [],
          "position": {
            "x": 390,
            "y": 340
          },
          "size": {
            "width": 90,
            "height": 40
          }
        },
        {
          "uri": "http://crowd.fi.uncoma.edu.ar#independiente",
          "name": "http://crowd.fi.uncoma.edu.ar#independiente",
          "attrs": [],
          "methods": [],
          "position": {
            "x": 200,
            "y": 340
          },
          "size": {
            "width": 90,
            "height": 40
          }
        }
      ],
      "links": [
        {
          "uri": "http://crowd.fi.uncoma.edu.ar#trabaja",
          "name": "http://crowd.fi.uncoma.edu.ar#trabaja",
          "classes": [
            "http://crowd.fi.uncoma.edu.ar#empleado",
            "http://crowd.fi.uncoma.edu.ar#empresa"
          ],
          "type": "association",
          "multiplicity": [
            "0..*",
            "0..*"
          ],
          "roles": [
            "http://crowd.fi.uncoma.edu.ar#role-a-1",
            "http://crowd.fi.uncoma.edu.ar#role-b-1"
          ]
        },
        {
          "name": "c195",
          "parent": "http://crowd.fi.uncoma.edu.ar#persona",
          "classes": [
            "http://crowd.fi.uncoma.edu.ar#empleado",
            "http://crowd.fi.uncoma.edu.ar#independiente"
          ],
          "constraint": [],
          "type": "generalization",
          "position": {
            "x": 330,
            "y": 260
          },
          "size": {
            "width": 30,
            "height": 30
          }
        }
      ]
    },
    eer: {
      "relationships": [],
      "entities": [
        {
          "name": "http://crowd.fi.uncoma.edu.ar#persona"
        },
        {
          "name": "http://crowd.fi.uncoma.edu.ar#empresa"
        },
        {
          "name": "http://crowd.fi.uncoma.edu.ar#empleado"
        },
        {
          "name": "http://crowd.fi.uncoma.edu.ar#independiente"
        }
      ],
      "attributes": [],
      "links": [
        {
          "entities": [
            "http://crowd.fi.uncoma.edu.ar#empleado",
            "http://crowd.fi.uncoma.edu.ar#empresa"
          ],
          "roles": [
            "http://crowd.fi.uncoma.edu.ar#role-a-1",
            "http://crowd.fi.uncoma.edu.ar#role-b-1"
          ],
          "name": "http://crowd.fi.uncoma.edu.ar#trabaja",
          "type": "relationship",
          "cardinality": [
            "0..*",
            "0..*"
          ]
        },
        {
          "parent": "http://crowd.fi.uncoma.edu.ar#persona",
          "entities": [
            "http://crowd.fi.uncoma.edu.ar#empleado"
          ],
          "name": "c195_Z133",
          "constraint": [],
          "type": "isa"
        },
        {
          "parent": "http://crowd.fi.uncoma.edu.ar#persona",
          "entities": [
            "http://crowd.fi.uncoma.edu.ar#independiente"
          ],
          "name": "c195_se1U",
          "constraint": [],
          "type": "isa"
        }
      ]
    },
    orm: {
      "relationships": [
        {
          "uniquenessConstraints": [
            "0..*",
            "0..*"
          ],
          "entities": [
            "http://crowd.fi.uncoma.edu.ar#empleado",
            "http://crowd.fi.uncoma.edu.ar#empresa"
          ],
          "roles": [
            "http://crowd.fi.uncoma.edu.ar#role-a-1",
            "http://crowd.fi.uncoma.edu.ar#role-b-1"
          ],
          "name": "http://crowd.fi.uncoma.edu.ar#trabaja",
          "type": "binaryFactType",
          "mandatory": []
        }
      ],
      "inheritances": [],
      "connectors": [
        {
          "parent": "http://crowd.fi.uncoma.edu.ar#persona",
          "entities": [
            "http://crowd.fi.uncoma.edu.ar#empleado"
          ],
          "subtypingContraint": [],
          "name": "c195_Z133",
          "type": "subtyping"
        },
        {
          "parent": "http://crowd.fi.uncoma.edu.ar#persona",
          "entities": [
            "http://crowd.fi.uncoma.edu.ar#independiente"
          ],
          "subtypingContraint": [],
          "name": "c195_se1U",
          "type": "subtyping"
        }
      ],
      "entities": [
        {
          "name": "http://crowd.fi.uncoma.edu.ar#persona",
          "type": "entity"
        },
        {
          "name": "http://crowd.fi.uncoma.edu.ar#empresa",
          "type": "entity"
        },
        {
          "name": "http://crowd.fi.uncoma.edu.ar#empleado",
          "type": "entity"
        },
        {
          "name": "http://crowd.fi.uncoma.edu.ar#independiente",
          "type": "entity"
        }
      ],
      "attributes": []
    },
    kf: {
      "Entity type": {
        "Value property": {
          "Value type": []
        },
        "Data type": [],
        "Object type": [
          "http://crowd.fi.uncoma.edu.ar#persona",
          "http://crowd.fi.uncoma.edu.ar#empresa",
          "http://crowd.fi.uncoma.edu.ar#empleado",
          "http://crowd.fi.uncoma.edu.ar#independiente"
        ]
      },
      "Role": [
        {
          "object type cardinality": [
            "card1"
          ],
          "rolename": "http://crowd.fi.uncoma.edu.ar#role-a-1",
          "entity type": "http://crowd.fi.uncoma.edu.ar#empleado",
          "relationship": "http://crowd.fi.uncoma.edu.ar#trabaja"
        },
        {
          "object type cardinality": [
            "card2"
          ],
          "rolename": "http://crowd.fi.uncoma.edu.ar#role-b-1",
          "entity type": "http://crowd.fi.uncoma.edu.ar#empresa",
          "relationship": "http://crowd.fi.uncoma.edu.ar#trabaja"
        }
      ],
      "Constraints": {
        "Cardinality constraints": {
          "Attibutive property cardinality": [],
          "Object type cardinality": [
            {
              "name": "card1",
              "maximum": "*",
              "minimum": "0"
            },
            {
              "name": "card2",
              "maximum": "*",
              "minimum": "0"
            }
          ]
        },
        "Disjointness constraints": {
          "Disjoint object type": [],
          "Disjoint role": []
        },
        "Completeness constraints": [],
        "Mandatory constraints": {
          "Mandatory": []
        }
      },
      "Relationship": {
        "Attributive property": {
          "Attributive property": [],
          "Attribute": {
            "Attribute": [],
            "Mapped to": []
          }
        },
        "Subsumption": [
          {
            "entity child": "http://crowd.fi.uncoma.edu.ar#empleado",
            "name": "c195_Z133",
            "entity parent": "http://crowd.fi.uncoma.edu.ar#persona"
          },
          {
            "entity child": "http://crowd.fi.uncoma.edu.ar#independiente",
            "name": "c195_se1U",
            "entity parent": "http://crowd.fi.uncoma.edu.ar#persona"
          }
        ],
        "Relationship": [
          {
            "entities": [
              "http://crowd.fi.uncoma.edu.ar#empleado",
              "http://crowd.fi.uncoma.edu.ar#empresa"
            ],
            "name": "http://crowd.fi.uncoma.edu.ar#trabaja"
          }
        ]
      }
    },
    kfReasoning: {
      "Entity type": {
        "Value property": {
          "Value type": []
        },
        "Data type": [],
        "Object type": [
          "http://crowd.fi.uncoma.edu.ar#persona",
          "http://crowd.fi.uncoma.edu.ar#empresa",
          "http://crowd.fi.uncoma.edu.ar#empleado",
          "http://crowd.fi.uncoma.edu.ar#independiente",
          "http://crowd.fi.uncoma.edu.ar#Juridica",
          "http://crowd.fi.uncoma.edu.ar#Monotributista"
        ]
      },
      "Role": [
        {
          "object type cardinality": [
            "card1"
          ],
          "rolename": "http://crowd.fi.uncoma.edu.ar#role-a-1",
          "entity type": "http://crowd.fi.uncoma.edu.ar#empleado",
          "relationship": "http://crowd.fi.uncoma.edu.ar#trabaja"
        },
        {
          "object type cardinality": [
            "card2"
          ],
          "rolename": "http://crowd.fi.uncoma.edu.ar#role-b-1",
          "entity type": "http://crowd.fi.uncoma.edu.ar#empresa",
          "relationship": "http://crowd.fi.uncoma.edu.ar#trabaja"
        }
      ],
      "Constraints": {
        "Cardinality constraints": {
          "Attibutive property cardinality": [],
          "Object type cardinality": [
            {
              "name": "card1",
              "maximum": "*",
              "minimum": "0"
            },
            {
              "name": "card2",
              "maximum": "*",
              "minimum": "0"
            }
          ]
        },
        "Disjointness constraints": {
          "Disjoint object type": [
            {
              "entities": [
                "http://crowd.fi.uncoma.edu.ar#empleado",
                "http://crowd.fi.uncoma.edu.ar#independiente"
              ],
              "name": "dc4"
            }
          ],
          "Disjoint role": []
        },
        "Completeness constraints": [
          {
            "entities": [
              "http://crowd.fi.uncoma.edu.ar#Juridica"
            ],
            "name": "cc3"
          }
        ],
        "Mandatory constraints": {
          "Mandatory": []
        }
      },
      "Relationship": {
        "Attributive property": {
          "Attributive property": [],
          "Attribute": {
            "Attribute": [],
            "Mapped to": []
          }
        },
        "Subsumption": [
          {
            "entity child": "http://crowd.fi.uncoma.edu.ar#empleado",
            "name": "http://crowd.fi.uncoma.edu.ar#generalization-4_ZTTN_Kkd5_V5Sv_vFT2_IlpG",
            "entity parent": "http://crowd.fi.uncoma.edu.ar#independiente"
          },
          {
            "entity child": "http://crowd.fi.uncoma.edu.ar#Monotributista",
            "name": "http://crowd.fi.uncoma.edu.ar#generalization-5_AgsH_2hwQ_3URb",
            "entity parent": "http://crowd.fi.uncoma.edu.ar#persona"
          },
          {
            "entity child": "http://crowd.fi.uncoma.edu.ar#Juridica",
            "completeness constraints": "cc3",
            "name": "c1466_btEn",
            "entity parent": "http://crowd.fi.uncoma.edu.ar#persona"
          },
          {
            "entity child": "http://crowd.fi.uncoma.edu.ar#empleado",
            "disjointness constraints": "dc4",
            "name": "c1510_lpCW",
            "entity parent": "http://crowd.fi.uncoma.edu.ar#persona"
          },
          {
            "entity child": "http://crowd.fi.uncoma.edu.ar#independiente",
            "disjointness constraints": "dc4",
            "name": "c1510_Wkrw",
            "entity parent": "http://crowd.fi.uncoma.edu.ar#persona"
          }
        ],
        "Relationship": [
          {
            "entities": [
              "http://crowd.fi.uncoma.edu.ar#empleado",
              "http://crowd.fi.uncoma.edu.ar#empresa"
            ],
            "name": "http://crowd.fi.uncoma.edu.ar#trabaja"
          }
        ]
      }
    },
    owl: "<rdf:RDF\n    xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\"\n    xmlns:owl=\"http://www.w3.org/2002/07/owl#\"\n    xmlns=\"http://crowd.fi.uncoma.edu.ar/kb1#\"\n    xmlns:rdfs=\"http://www.w3.org/2000/01/rdf-schema#\"\n    xmlns:xsd=\"http://www.w3.org/2001/XMLSchema#\">\n  <owl:Ontology rdf:about=\"http://crowd.fi.uncoma.edu.ar/kb1#\"/>\n  <owl:Class rdf:about=\"http://crowd.fi.uncoma.edu.ar#empleado\">\n    <rdfs:subClassOf>\n      <owl:Class rdf:about=\"http://crowd.fi.uncoma.edu.ar#persona\"/>\n    </rdfs:subClassOf>\n  </owl:Class>\n  <owl:Class rdf:about=\"http://crowd.fi.uncoma.edu.ar#empresa\"/>\n  <owl:Class rdf:about=\"http://crowd.fi.uncoma.edu.ar#independiente\">\n    <rdfs:subClassOf rdf:resource=\"http://crowd.fi.uncoma.edu.ar#persona\"/>\n  </owl:Class>\n  <owl:Class rdf:about=\"http://crowd.fi.uncoma.edu.ar#trabaja\">\n    <rdfs:subClassOf>\n      <owl:Restriction>\n        <owl:someValuesFrom rdf:resource=\"http://crowd.fi.uncoma.edu.ar#empresa\"/>\n        <owl:onProperty>\n          <owl:ObjectProperty rdf:about=\"http://crowd.fi.uncoma.edu.ar#role-b-1\"/>\n        </owl:onProperty>\n      </owl:Restriction>\n    </rdfs:subClassOf>\n    <rdfs:subClassOf>\n      <owl:Restriction>\n        <owl:someValuesFrom rdf:resource=\"http://crowd.fi.uncoma.edu.ar#empleado\"/>\n        <owl:onProperty>\n          <owl:ObjectProperty rdf:about=\"http://crowd.fi.uncoma.edu.ar#role-a-1\"/>\n        </owl:onProperty>\n      </owl:Restriction>\n    </rdfs:subClassOf>\n  </owl:Class>\n</rdf:RDF>\n",
    uris: [
      { emoji: "🍕", url: "https://protege.stanford.edu/ontologies/pizza/pizza.owl" },
      { emoji: "🧑‍🤝‍🧑", url: "http://owl.man.ac.uk/2006/07/sssw/people.owl" },
      { emoji: "📷", url: "http://protege.stanford.edu/ontologies/camera.owl" },
      { emoji: "🐨", url: "http://protege.stanford.edu/ontologies/koala.owl" },
      { emoji: "🧳", url: "http://protege.stanford.edu/ontologies/travel.owl" },
      { emoji: "🍷", url: "http://www.w3.org/TR/owl-guide/wine.rdf" },
      { emoji: "🌎", url: "http://www.opengis.net/ont/geosparql#" },
      { emoji: "🌀", url: "http://vocab.deri.ie/void.rdf" },
      { emoji: "🐟", url: "http://www.w3.org/ns/ssn/" },
      { emoji: "🐠", url: "http://www.w3.org/ns/sosa/" },
      { emoji: "📖", url: "http://purl.org/spar/fabio.xml" },
      { emoji: "⏱️", url: "http://www.w3.org/2006/time#" },
      { emoji: "👥", url: "http://xmlns.com/foaf/0.1/" }
    ]
  }

  public services = {
    metamodel: new CrowdMetamodel({
      url: environment.metamodelUrl,
      verbalizationUrl: environment.metamodelVerbalizationUrl,
      owlUrl: environment.metamodelOwlUrl,
      error: (error) => {
        iziToast.error({
          title: 'Error',
          message: 'There was an error when trying to call Metamodel API<br>' +
            (error.responseJSON != null
              ? error.responseJSON.error + "<br>" + error.responseJSON.message
              : error.responseText),
        });
      }
    }),
    reasoning: new CrowdReasoning({
      url: environment.reasoningUrl,
      error: (error) => {
        iziToast.error({
          title: 'Error',
          message: 'There was an error when trying to call Reasoning API<br>' +
            (error.responseJSON != null
              ? error.responseJSON.error + "<br>" + error.responseJSON.message
              : error.responseText),
        });
      }
    })
  }

  //list of api's to be displayed
  public apis = {
    metamodel: {
      service: this.services.metamodel,
      name: 'Metamodel',
      icon: 'random',
      description: 'This API is used to translate diagrams via KF metamodel.',
      data: { json: null, output: null },
      endpoints: [
        {
          name: 'UML to KF',
          method: 'umltometa',
          description: 'Translate an UML to KF metamodel.',
          type: 'POST',
          response: { name: 'javascript', json: true },
          example: this.examples.uml,
          serialize: ['data'],
          openIn: ['uml', 'uml'],
          parameters: {
            from: 'uml',
            to: 'kf'
          }
        },
        {
          name: 'EER to KF',
          description: 'Translate an EER to KF metamodel.',
          type: 'POST',
          method: 'eertometa',
          response: { name: 'javascript', json: true },
          example: this.examples.eer,
          serialize: ['data'],
          openIn: ['eer', 'eer'],
          parameters: {
            from: 'eer',
            to: 'kf'
          }
        },
        {
          name: 'ORM2 to KF',
          description: 'Translate an ORM2 to KF metamodel.',
          type: 'POST',
          method: 'ormtometa',
          response: { name: 'javascript', json: true },
          example: this.examples.orm,
          serialize: ['data'],
          openIn: ['orm', 'orm'],
          parameters: {
            from: 'orm2',
            to: 'kf'
          }
        },
        {
          name: 'KF to UML',
          description: 'Translate an KF metamodel to UML.',
          type: 'POST',
          method: 'metatouml',
          response: { name: 'javascript', json: true },
          example: this.examples.kf,
          serialize: ['data'],
          openIn: ['uml', 'uml'],
          parameters: {
            from: 'kf',
            to: 'uml'
          }
        },
        {
          name: 'KF to EER',
          description: 'Translate an KF metamodel to EER.',
          type: 'POST',
          method: 'metatoeer',
          response: { name: 'javascript', json: true },
          example: this.examples.kf,
          serialize: ['data'],
          openIn: ['eer', 'eer'],
          parameters: {
            from: 'kf',
            to: 'eer'
          }
        },
        {
          name: 'KF to ORM2',
          description: 'Translate an KF metamodel to ORM2.',
          type: 'POST',
          method: 'metatorm',
          response: { name: 'javascript', json: true },
          example: this.examples.kf,
          serialize: ['data'],
          openIn: ['orm', 'orm'],
          parameters: {
            from: 'kf',
            to: 'orm2'
          }
        },
        {
          name: 'KF to OWL',
          description: 'Translate an KF metamodel to OWL.',
          url: environment.metamodelOwlUrl,
          type: 'POST',
          response: 'xml',
          example: this.examples.kf,
          serialize: ['data'],
          openIn: ['uml', null],
          parameters: {
            from: 'kf',
            to: 'owl',
            format: 'owl2-alcqi',
            syntax: 'rdfxml'
          }
        }
      ]
    },
    reasoning: {
      service: this.services.reasoning,
      name: 'Reasoning',
      icon: 'lightbulb-o',
      description: 'This API is used to use reasoning over KF.',
      endpoints: [
        {
          name: 'Reasoning',
          description: 'Reasoning on a KF metamodel.',
          type: 'POST',
          response: { name: 'javascript', json: true },
          example: this.examples.kfReasoning,
          serialize: ['kf'],
          openIn: ['uml', 'uml'],
          openInOutput: 'KF',
          parameters: {
            from: 'kf',
            to: 'kf',
            reasoner: 'Racer',
            strategy: 'alcqi',
            cards: false,
            outputTab: 'KF',
            raw: false
          }
        }
      ]
    },
    test: {
      service: this.services.metamodel,
      name: 'Test',
      icon: 'flask',
      description: 'This are the APIs in alpha testing.',
      data: { json: null, output: null },
      endpoints: [
        {
          name: 'OWL to KF',
          description: 'Translate an OWL to KF metamodel.',
          url: environment.metamodelVerbalizationUrl,
          method: 'owltometa',
          type: 'POST',
          response: { name: 'javascript', json: true },
          example: this.examples.owl,
          trim: ['ontologyString'],
          bypass: ['ontologiesFiles'],
          openIn: [null, 'uml'],
          openInOutput: 'kf',
          parameters: {
            from: 'owl',
            to: 'kf',
            reasoning: true,
            input: 'string',
            ontologyUri: '',
            ontologyString: '',
            ontologiesFiles: [],
            outputTab: 'kf',
            raw: false
          }
        }
      ]
    }
  };

  public tabs = [];

  ngOnInit(): void {
    this.newTab();
  }

  setAPI(api: string): void {
    this.selectedAPI = api;
  }

  setTab(tab: number): void {
    console.log("Tab selected: " + tab);
    this.selectedTab = tab;
  }

  setEndpoint(endpoint: number): void {
    this.tabs[this.selectedTab].api = this.selectedAPI;
    this.tabs[this.selectedTab].endpoint = endpoint;
    this.tabs[this.selectedTab].output = null;
    this.tabs[this.selectedTab].showOutput = false;
    this.tabs[this.selectedTab].showMetrics = false;
    this.tabs[this.selectedTab].parameters = JSON.parse(JSON.stringify(this.apis[this.selectedAPI].endpoints[endpoint].parameters));
    this.tabs[this.selectedTab].parameters.data = '';
    this.tabs[this.selectedTab].parameters.json = '';
  }

  newTab(api?: string, endpoint?: number): void {
    if (api && endpoint) {
      this.tabs.push({
        api: api,
        endpoint: endpoint
      });
    } else {
      this.tabs.push({
        api: null,
        endpoint: 0
      });
    }
    this.setTab(this.tabs.length - 1);
  }

  removeTab(tab: number): void {
    this.tabs.splice(tab, 1);
    if (this.tabs.length == 0) {
      this.newTab();
      this.selectedTab = 0;
    } else {
      if ((tab == this.selectedTab && tab > 0) || tab < this.selectedTab) {
        this.selectedTab--;
      }
    }
  }

  toggleOutput(tab: number): void {
    this.tabs[tab].showOutput = !this.tabs[tab].showOutput;
  }

  toggleMetrics(tab: number): void {
    this.tabs[tab].showMetrics = !this.tabs[tab].showMetrics;
  }

  send(tab: number): void {
    let serializedParameters = JSON.parse(JSON.stringify(this.tabs[tab].parameters));
    try {
      this.apis[this.tabs[tab].api].endpoints[this.tabs[tab].endpoint].serialize?.forEach(parameter => {
        serializedParameters[parameter] = JSON.parse(serializedParameters[parameter]);
      });

      this.apis[this.tabs[tab].api].endpoints[this.tabs[tab].endpoint].trim?.forEach(parameter => {
        serializedParameters[parameter] = serializedParameters[parameter].replaceAll('\n', '').trim();
      });

      this.apis[this.tabs[tab].api].endpoints[this.tabs[tab].endpoint].bypass?.forEach(parameter => {
        serializedParameters[parameter] = this.tabs[tab].parameters[parameter];
      });

      this.tabs[tab].loadingOutput = true;

      this.apis[this.tabs[tab].api].service.request({
        success: (response) => {
          this.tabs[tab].output = response;
          this.tabs[tab].showOutput = true;
          if (response.metrics) {
            this.tabs[tab].showMetrics = true;
          }
          this.tabs[tab].loadingOutput = false;
        },
        error: (error) => {
          this.tabs[tab].loadingOutput = false;
        },
        ...serializedParameters
      });
    } catch (e) {
      iziToast.error({
        title: 'Error',
        message: 'There was an error when trying to parse the parameters.<br>' + e,
      });
    }
  }

  viewJSON(tab: number): void {
  }

  loadExample(tab: number, parameter: string, serialize: boolean = true, value?: string): void {
    console.log(tab, parameter, serialize);
    this.tabs[tab].parameters[parameter] = serialize
      ? JSON.stringify(this.apis[this.tabs[tab].api].endpoints[this.tabs[tab].endpoint].example, null, '\t')
      : (value
        ? value
        : this.apis[this.tabs[tab].api].endpoints[this.tabs[tab].endpoint].example);
  }

  openInEditor(editorModel: string, model: string, tab: number, value: string, serialize: boolean = true, output: boolean = false): void {
    localStorage.setItem('crowd-temporal-diagram',
      JSON.stringify({
        model: model, diagram: (serialize
          ? (output && this.apis[this.tabs[tab].api].endpoints[this.tabs[tab].endpoint].openInOutput
            ? JSON.parse(value)[this.apis[this.tabs[tab].api].endpoints[this.tabs[tab].endpoint].openInOutput]
            : JSON.parse(value))
          : (output && this.apis[this.tabs[tab].api].endpoints[this.tabs[tab].endpoint].openInOutput
            ? value[this.apis[this.tabs[tab].api].endpoints[this.tabs[tab].endpoint].openInOutput]
            : value))
      }));
    // this.router.navigateByUrl('/editor/' + editorModel);
    const url = this.router.serializeUrl(
      this.router.createUrlTree(['/editor/' + editorModel])
    );
    window.open(url, '_blank');
  }

  fromInfix(string: string): string {
    return capitalizeOnlyFirstLetter(infixCapsReplace(string));
  }
}