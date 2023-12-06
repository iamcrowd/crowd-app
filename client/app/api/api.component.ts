import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { DarkmodeService } from '../services/darkmode.service';
import { Router } from '@angular/router';
import { NgbAccordion } from '@ng-bootstrap/ng-bootstrap';
import { FileSaverService } from 'ngx-filesaver';
import * as moment from 'moment';
import * as XLSX from 'xlsx';
import * as JSZip from 'jszip';

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
    public darkmodeService: DarkmodeService,
    private fileSaverService: FileSaverService,
    private http: HttpClient
  ) {
    this.JSON = JSON;
    this.Object = Object;
  }

  @ViewChild('metricsAccordion') metricsAccordion: NgbAccordion;
  @ViewChild('listAccordion') listAccordion: NgbAccordion;

  public JSON: any;
  public Object: any;
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
    kfRepairing: {
      "Entity type": {
        "Value property": {
          "Value type": []
        },
        "Data type": [],
        "Object type": [
          "http://crowd.fi.uncoma.edu.ar#A3",
          "http://crowd.fi.uncoma.edu.ar#A2",
          "http://crowd.fi.uncoma.edu.ar#A4",
          "http://crowd.fi.uncoma.edu.ar#A1",
          "http://crowd.fi.uncoma.edu.ar#A6",
          "http://crowd.fi.uncoma.edu.ar#A7",
          "http://crowd.fi.uncoma.edu.ar#A5",
          "http://crowd.fi.uncoma.edu.ar#A"
        ]
      },
      "Role": [],
      "Constraints": {
        "Cardinality constraints": {
          "Attibutive property cardinality": [],
          "Object type cardinality": []
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
            "entity child": "http://crowd.fi.uncoma.edu.ar#A3",
            "name": "Subsumption(http://crowd.fi.uncoma.edu.ar#A6,http://crowd.fi.uncoma.edu.ar#A3)_8DY4_qxYE",
            "entity parent": "http://crowd.fi.uncoma.edu.ar#A6"
          },
          {
            "entity child": "http://crowd.fi.uncoma.edu.ar#A3",
            "name": "Subsumption(http://crowd.fi.uncoma.edu.ar#A7,http://crowd.fi.uncoma.edu.ar#A3)_S4xT_9duZ",
            "entity parent": "http://crowd.fi.uncoma.edu.ar#A7"
          },
          {
            "entity child": "http://crowd.fi.uncoma.edu.ar#A3",
            "name": "Subsumption(http://crowd.fi.uncoma.edu.ar#A4,http://crowd.fi.uncoma.edu.ar#A3)_oL97_noY1",
            "entity parent": "http://crowd.fi.uncoma.edu.ar#A4"
          },
          {
            "entity child": "http://crowd.fi.uncoma.edu.ar#A3",
            "name": "Subsumption(http://crowd.fi.uncoma.edu.ar#A5,http://crowd.fi.uncoma.edu.ar#A3)_cRaw_ELkk",
            "entity parent": "http://crowd.fi.uncoma.edu.ar#A5"
          },
          {
            "entity child": "http://crowd.fi.uncoma.edu.ar#A2",
            "name": "Subsumption(http://crowd.fi.uncoma.edu.ar#A4,http://crowd.fi.uncoma.edu.ar#A2)_BGLa_qsPB",
            "entity parent": "http://crowd.fi.uncoma.edu.ar#A4"
          },
          {
            "entity child": "http://crowd.fi.uncoma.edu.ar#A2",
            "name": "Subsumption(http://crowd.fi.uncoma.edu.ar#A,http://crowd.fi.uncoma.edu.ar#A2)_4h72_BOcZ",
            "entity parent": "http://crowd.fi.uncoma.edu.ar#A"
          },
          {
            "entity child": "http://crowd.fi.uncoma.edu.ar#A1",
            "name": "Subsumption(http://crowd.fi.uncoma.edu.ar#A3,http://crowd.fi.uncoma.edu.ar#A1)_Xex4_iQD2",
            "entity parent": "http://crowd.fi.uncoma.edu.ar#A3"
          },
          {
            "entity child": "http://crowd.fi.uncoma.edu.ar#A1",
            "name": "Subsumption(http://crowd.fi.uncoma.edu.ar#A6,http://crowd.fi.uncoma.edu.ar#A1)_Wpza_xcS8",
            "entity parent": "http://crowd.fi.uncoma.edu.ar#A6"
          },
          {
            "entity child": "http://crowd.fi.uncoma.edu.ar#A1",
            "name": "Subsumption(http://crowd.fi.uncoma.edu.ar#A7,http://crowd.fi.uncoma.edu.ar#A1)_dCqg_xjZd",
            "entity parent": "http://crowd.fi.uncoma.edu.ar#A7"
          },
          {
            "entity child": "http://crowd.fi.uncoma.edu.ar#A6",
            "name": "Subsumption(http://crowd.fi.uncoma.edu.ar#A1,http://crowd.fi.uncoma.edu.ar#A6)_asaH_7SO7",
            "entity parent": "http://crowd.fi.uncoma.edu.ar#A1"
          },
          {
            "entity child": "http://crowd.fi.uncoma.edu.ar#A6",
            "name": "Subsumption(http://crowd.fi.uncoma.edu.ar#A3,http://crowd.fi.uncoma.edu.ar#A6)_CsRb_3UHE",
            "entity parent": "http://crowd.fi.uncoma.edu.ar#A3"
          },
          {
            "entity child": "http://crowd.fi.uncoma.edu.ar#A6",
            "name": "Subsumption(http://crowd.fi.uncoma.edu.ar#A7,http://crowd.fi.uncoma.edu.ar#A6)_SM1S_64iu",
            "entity parent": "http://crowd.fi.uncoma.edu.ar#A7"
          },
          {
            "entity child": "http://crowd.fi.uncoma.edu.ar#A7",
            "name": "Subsumption(http://crowd.fi.uncoma.edu.ar#A1,http://crowd.fi.uncoma.edu.ar#A7)_iyiX_LBNY",
            "entity parent": "http://crowd.fi.uncoma.edu.ar#A1"
          },
          {
            "entity child": "http://crowd.fi.uncoma.edu.ar#A7",
            "name": "Subsumption(http://crowd.fi.uncoma.edu.ar#A3,http://crowd.fi.uncoma.edu.ar#A7)_9aji_AqPH",
            "entity parent": "http://crowd.fi.uncoma.edu.ar#A3"
          },
          {
            "entity child": "http://crowd.fi.uncoma.edu.ar#A7",
            "name": "Subsumption(http://crowd.fi.uncoma.edu.ar#A6,http://crowd.fi.uncoma.edu.ar#A7)_j6q5_sTb2",
            "entity parent": "http://crowd.fi.uncoma.edu.ar#A6"
          },
        ],
        "Relationship": []
      }
    },
    kfRepairingSimple: {
      "Entity type": {
        "Value property": {
          "Value type": []
        },
        "Data type": [],
        "Object type": [
          "http://crowd.fi.uncoma.edu.ar#entity-1",
          "http://crowd.fi.uncoma.edu.ar#entity-2",
          "http://crowd.fi.uncoma.edu.ar#entity-3"
        ]
      },
      "Role": [],
      "Constraints": {
        "Cardinality constraints": {
          "Attibutive property cardinality": [],
          "Object type cardinality": []
        },
        "Disjointness constraints": {
          "Disjoint object type": [
            {
              "entities": [
                "http://crowd.fi.uncoma.edu.ar#entity-3",
                "http://crowd.fi.uncoma.edu.ar#entity-2"
              ],
              "name": "dc1"
            }
          ],
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
            "entity child": "http://crowd.fi.uncoma.edu.ar#entity-1",
            "name": "c3316_2eLT_2eBw_FDI1",
            "entity parent": "http://crowd.fi.uncoma.edu.ar#entity-3"
          },
          {
            "entity child": "http://crowd.fi.uncoma.edu.ar#entity-3",
            "disjointness constraints": "dc1",
            "name": "c432_ueQZ",
            "entity parent": "http://crowd.fi.uncoma.edu.ar#entity-1"
          },
          {
            "entity child": "http://crowd.fi.uncoma.edu.ar#entity-2",
            "disjointness constraints": "dc1",
            "name": "c432_Bgpw",
            "entity parent": "http://crowd.fi.uncoma.edu.ar#entity-1"
          }
        ],
        "Relationship": []
      }
    },
    owl: "<rdf:RDF\n    xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\"\n    xmlns:owl=\"http://www.w3.org/2002/07/owl#\"\n    xmlns=\"http://crowd.fi.uncoma.edu.ar/kb1#\"\n    xmlns:rdfs=\"http://www.w3.org/2000/01/rdf-schema#\"\n    xmlns:xsd=\"http://www.w3.org/2001/XMLSchema#\">\n  <owl:Ontology rdf:about=\"http://crowd.fi.uncoma.edu.ar/kb1#\"/>\n  <owl:Class rdf:about=\"http://crowd.fi.uncoma.edu.ar#empleado\">\n    <rdfs:subClassOf>\n      <owl:Class rdf:about=\"http://crowd.fi.uncoma.edu.ar#persona\"/>\n    </rdfs:subClassOf>\n  </owl:Class>\n  <owl:Class rdf:about=\"http://crowd.fi.uncoma.edu.ar#empresa\"/>\n  <owl:Class rdf:about=\"http://crowd.fi.uncoma.edu.ar#independiente\">\n    <rdfs:subClassOf rdf:resource=\"http://crowd.fi.uncoma.edu.ar#persona\"/>\n  </owl:Class>\n  <owl:Class rdf:about=\"http://crowd.fi.uncoma.edu.ar#trabaja\">\n    <rdfs:subClassOf>\n      <owl:Restriction>\n        <owl:someValuesFrom rdf:resource=\"http://crowd.fi.uncoma.edu.ar#empresa\"/>\n        <owl:onProperty>\n          <owl:ObjectProperty rdf:about=\"http://crowd.fi.uncoma.edu.ar#role-b-1\"/>\n        </owl:onProperty>\n      </owl:Restriction>\n    </rdfs:subClassOf>\n    <rdfs:subClassOf>\n      <owl:Restriction>\n        <owl:someValuesFrom rdf:resource=\"http://crowd.fi.uncoma.edu.ar#empleado\"/>\n        <owl:onProperty>\n          <owl:ObjectProperty rdf:about=\"http://crowd.fi.uncoma.edu.ar#role-a-1\"/>\n        </owl:onProperty>\n      </owl:Restriction>\n    </rdfs:subClassOf>\n  </owl:Class>\n</rdf:RDF>\n",
    uris: [
      { emoji: "🍕", uri: "https://protege.stanford.edu/ontologies/pizza/pizza.owl", prefix: 'pizza' },
      { emoji: "🧑‍🤝‍🧑", uri: "http://owl.man.ac.uk/2006/07/sssw/people.owl", prefix: 'people' },
      { emoji: "📷", uri: "http://protege.stanford.edu/ontologies/camera.owl", prefix: 'camera' },
      { emoji: "🐨", uri: "http://protege.stanford.edu/ontologies/koala.owl", prefix: 'koala' },
      { emoji: "🧳", uri: "http://protege.stanford.edu/ontologies/travel.owl", prefix: 'travel' },
      { emoji: "🍷", uri: "http://www.w3.org/TR/owl-guide/wine.rdf", prefix: 'wine' },
      { emoji: "🌎", uri: "http://www.opengis.net/ont/geosparql#", prefix: 'geosparql' },
      { emoji: "🌀", uri: "http://vocab.deri.ie/void.rdf", prefix: 'void' },
      { emoji: "🐟", uri: "http://www.w3.org/ns/ssn/", prefix: 'ssn' },
      { emoji: "🐠", uri: "http://www.w3.org/ns/sosa/", prefix: 'sosa' },
      { emoji: "📖", uri: "http://purl.org/spar/fabio.xml", prefix: 'fabio' },
      { emoji: "⏱️", uri: "http://www.w3.org/2006/time#", prefix: 'time' },
      { emoji: "👥", uri: "http://xmlns.com/foaf/0.1/", prefix: 'foaf' }
    ]
  }

  public services = {
    metamodel: new CrowdMetamodel({
      url: environment.metamodelUrl,
      verbalizationUrl: environment.metamodelVerbalizationUrl,
      owlUrl: environment.metamodelOwlUrl,
      error: (error) => {
        iziToast.error({
          title: 'Error' + (error.responseJSON != null ? ' (' + error.responseJSON.error + ')' : ''),
          message: '<i>There was an error when trying to call Metamodel API.</i><br><br><b>' +
            (error.responseJSON != null
              ? error.responseJSON.message
              : (error.responseText != null
                ? error.responseText
                : error.statusText)) + '</b>',
          buttons: [
            ['<button class="btn" title="Download full stack trace"><i class="fa fa-fw fa-download"></i></button>', (instance, toast) => {
              if (error.responseJSON?.stackTrace)
                this.downloadFile('exception', 'txt', error.responseJSON.stackTrace);
            }, false],
          ]
        });
      }
    }),
    reasoning: new CrowdReasoning({
      url: environment.reasoningUrl,
      error: (error) => {
        iziToast.error({
          title: 'Error' + (error.responseJSON != null ? ' (' + error.responseJSON.error + ')' : ''),
          message: '<i>There was an error when trying to call Reasoning API.</i><b><br><br>' +
            (error.responseJSON != null
              ? error.responseJSON.message
              : (error.responseText != null
                ? error.responseText
                : error.statusText)) + '</b>',
          buttons: [
            ['<button class="btn" title="Download full stack trace"><i class="fa fa-fw fa-download"></i></button>', (instance, toast) => {
              if (error.responseJSON?.stackTrace)
                this.downloadFile('exception', 'txt', error.responseJSON.stackTrace);
            }, false],
          ]
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
          example: this.examples.uml,
          serialize: ['data'],
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
          example: this.examples.eer,
          serialize: ['data'],
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
          example: this.examples.orm,
          serialize: ['data'],
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
          example: this.examples.kf,
          serialize: ['data'],
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
          example: this.examples.kf,
          serialize: ['data'],
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
          example: this.examples.kf,
          serialize: ['data'],
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
          example: this.examples.kf,
          serialize: ['data'],
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
          example: this.examples.kfReasoning,
          serialize: ['kf'],
          parameters: {
            from: 'kf',
            to: 'kf',
            reasoner: 'Racer',
            strategy: 'alcqi',
            cards: false
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
          example: this.examples.owl,
          trim: ['ontologyString'],
          bypass: ['ontologiesFiles', 'ontologiesUris'],
          parameters: {
            from: 'owl',
            to: 'kf',
            reasoner: 'pellet',
            input: 'string',
            filtering: true,
            timeout: 60000,
            ontologyString: '',
            ontologiesUris: [{ uri: '', prefix: '' }],
            ontologiesFiles: []
          }
        },
        {
          name: 'KF Repair',
          method: 'metarepair',
          description: 'Use Ontology Repair Debugging Technics, specifically MUPS sets, but using KF metamodel.',
          url: environment.metamodelVerbalizationUrl,
          type: 'POST',
          example: this.examples.kfRepairingSimple,
          exampleParameters: { entity: "http://crowd.fi.uncoma.edu.ar#entity-2" }, //for kfReparingSimple
          // exampleParameters: { entity: "http://crowd.fi.uncoma.edu.ar#A1" }, //for kfReparing
          serialize: ['meta'],
          parameters: {
            repair: true,
            from: 'kf',
            to: 'kf',
            meta: '',
            entity: '',
            reasoner: 'pellet',
            timeout: 60000,
            maxExplanations: 5,
            precompute: false,
            filtering: true,
          }
        },
      ]
    }
  };

  public tabs = [];

  @HostListener('window:beforeunload', ['$event'])
  doSomething($event) {
    if (this.hasChanges()) {
      $event.returnValue = 'Are you sure you want to leave page? You may lost actual proccess';
    }
  }

  ngOnInit(): void {
    this.newTab();
  }

  hasChanges(): boolean {
    return this.tabs[this.selectedTab].multiActual != null;
  }

  setEndpoint(endpoint: number): void {
    this.tabs[this.selectedTab].api = this.selectedAPI;
    this.tabs[this.selectedTab].endpoint = endpoint;
    this.tabs[this.selectedTab].output = null;
    this.tabs[this.selectedTab].showOutput = false;
    this.tabs[this.selectedTab].maximizeOutput = false;
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
    this.selectedTab = this.tabs.length - 1;
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

      this.tabs[tab].multiTotalFiles = null;
      this.tabs[tab].multiSucceded = {};
      this.tabs[tab].multiFailed = {};
      this.tabs[tab].multiActual = null;
      this.tabs[tab].multiActualTime = 0;
      this.tabs[tab].multiTotalTime = 0;

      this.tabs[tab].output = null;
      this.tabs[tab].showMetrics = false;

      this.apis[this.tabs[tab].api].service.request({
        success: (response) => {
          this.tabs[tab].output = response;
          this.tabs[tab].showOutput = true;
          this.tabs[tab].parameters.outputTab = this.apis[this.tabs[tab].api].endpoints[this.tabs[tab].endpoint].parameters.outputTab;
          this.calculateMetrics(tab);
          if (response.metrics) {
            this.tabs[tab].showMetrics = true;
          }
          this.tabs[tab].loadingOutput = false;
        },
        error: (error) => {
          this.tabs[tab].loadingOutput = false;
        },
        apiComponent: this,
        tab: tab,
        ...serializedParameters
      });
    } catch (e) {
      this.tabs[tab].loadingOutput = false;

      console.log(e);

      iziToast.error({
        title: 'Error',
        message: '<i>There was an error when trying to parse the parameters.</i><br><br><b>' + e + '</b>',
      });
    }
  }

  calculateMetrics(tab: number): void {
    if (this.tabs[tab].output.success != null) {
      this.tabs[tab].parameters.outputTab = 'success';
      this.tabs[tab].output.metrics = {};
      Object.entries(this.tabs[tab].output.success).forEach(([fileKey, file]) => {
        Object.entries(file['metrics']).forEach(([metricGroupKey, metricGroup]) => {
          if (this.tabs[tab].output.metrics[metricGroupKey] == null)
            this.tabs[tab].output.metrics[metricGroupKey] = {};
          Object.entries(metricGroup).forEach(([metricKey, metric]) => {
            if (this.tabs[tab].output.metrics[metricGroupKey][metricKey] != null) {
              this.tabs[tab].output.metrics[metricGroupKey][metricKey].total += metric;
              this.tabs[tab].output.metrics[metricGroupKey][metricKey].avg += metric;
              this.tabs[tab].output.metrics[metricGroupKey][metricKey].min = Math.min(this.tabs[tab].output.metrics[metricGroupKey][metricKey].min, metric as number);
              this.tabs[tab].output.metrics[metricGroupKey][metricKey].max = Math.max(this.tabs[tab].output.metrics[metricGroupKey][metricKey].max, metric as number);
            } else {
              this.tabs[tab].output.metrics[metricGroupKey][metricKey] = { total: metric, avg: metric, min: metric, max: metric };
            }
          });
        });
      });
      //calculate average for each metric
      Object.entries(this.tabs[tab].output.metrics).forEach(([metricGroupKey, metricGroup]) => {
        Object.entries(metricGroup).forEach(([metricKey, metric]) => {
          this.tabs[tab].output.metrics[metricGroupKey][metricKey].avg /= Object.entries(this.tabs[tab].output.success).length;
        });
      });
    }
    setTimeout(() => {
      this.metricsAccordion?.expandAll();
      this.listAccordion?.expandAll();
    });
  }

  roundMetric(metric: number, decimals: number = 3): number {
    return metric % 1 != 0 ? Number(metric.toFixed(decimals)) : metric;
  }

  openInEditor(editorModel: string, sourceModel: string, diagram: string, serialize: boolean): void {
    try {
      editorModel = editorModel == 'kf' ? 'uml' : editorModel;
      localStorage.setItem('crowd-temporal-diagram', JSON.stringify({
        model: sourceModel,
        diagram: serialize ? JSON.parse(diagram) : diagram
      }));
      const url = this.router.serializeUrl(this.router.createUrlTree(['/editor/' + editorModel]));
      window.open(url, '_blank');
    } catch (e) {
      iziToast.error({
        title: 'Error',
        message: '<i>There was an error when trying to open the diagram in the editor.</i><br><br><b>' + e + '</b>',
      });
    }
  }

  getCategories(items: any): any {
    let categories = [];
    Object.keys(items).forEach(key => {
      //if the items are objects, use the key as the category
      if (typeof items[key] == 'object') {
        if (!categories.includes(key)) categories.push(key);
      } else {
        let category = this.getCategory(items[key].toString());
        if (!categories.includes(category)) categories.push(category);
      }
    });
    categories.sort();
    return categories;
  }

  getCategory(item: string): string {
    return item.substring(0, item.indexOf('('));
  }

  getItemsByCategory(items: any, category: string): any {
    let itemsByCategory = [];
    //if items in the category are objects, use their values as the items
    if (typeof items[category] == 'object') {
      Object.values(items[category]).forEach(item => {
        itemsByCategory.push(item);
      });
    } else {
      Object.values(items).forEach(item => {
        if (this.getCategory(item.toString()) == category) itemsByCategory.push(item);
      });
    }
    itemsByCategory.sort();
    return itemsByCategory;
  }

  isItemObject(item: any) {
    return typeof item == 'object';
  }

  setExampleParameters(tab: any, exampleParameters: any) {
    if (!exampleParameters) return;
    Object.keys(exampleParameters).forEach(key => {
      tab.parameters[key] = exampleParameters[key];
    });
  }

  fromInfix(string: string): string {
    return capitalizeOnlyFirstLetter(infixCapsReplace(string));
  }

  adding(obj1: any, obj2: any): any {
    return { ...obj1, ...obj2 };
  }

  getMultiProcessed(tab: number): number {
    return Object.keys(this.tabs[tab].multiSucceded).length + Object.keys(this.tabs[tab].multiFailed).length;
  }

  getMultiProgress(tab: number): number {
    return this.getMultiProcessed(tab) * 100 / this.tabs[tab].multiTotalFiles;
  }

  downloadSuccessUris(tab: number): void {
    this.tabs[tab].downloadingSucessUris = true;

    let successUris = this.tabs[tab].parameters.ontologiesUris.filter((uri) => {
      return this.tabs[tab].output.success[uri.prefix ? uri.prefix : uri.uri] != null;
    });

    this.downloadFile('success.uris', 'json', successUris, true);

    delete this.tabs[tab].downloadingSucessUris;
  }

  downloadFailedUris(tab: number): void {
    this.tabs[tab].downloadingFailedUris = true;

    let failedUris = this.tabs[tab].parameters.ontologiesUris.filter((uri) => {
      return this.tabs[tab].output.failed[uri.prefix ? uri.prefix : uri.uri] != null;
    });

    this.downloadFile('failed.uris', 'json', failedUris, true);

    delete this.tabs[tab].downloadingFailedUris;
  }

  downloadFile(name: string, type: string, content: string, serialize: boolean = false): void {
    this.fileSaverService.save(
      new Blob([serialize ? JSON.stringify(content, null, '\t') : content], { type: this.fileSaverService.genType(type) }),
      name + '.' + type
    );
  }

  downloadFiles(name: string, content: any, tab: number): void {
    this.tabs[tab].downloadingFiles = true;

    let zip: JSZip = new JSZip();

    Object.entries(content.success).forEach(([fileName, fileContent]) => {
      zip.file((fileName.indexOf('\/') > -1 ? fileName.replace(/\//g, '-') : fileName) + '.json', JSON.stringify(fileContent['kf'], null, '\t'));
    });

    zip.generateAsync({ type: "blob" }).then((zipContent) => {
      this.fileSaverService.save(zipContent, name + '.zip');
    }).finally(() => {
      delete this.tabs[tab].downloadingFiles;
    });
  }

  exportExcel(name: string, content: any, tab: number): void {
    this.tabs[tab].exportingExcel = true;

    let filesMetrics = [];
    Object.keys(content.success).forEach(fileKey => {
      let fileMetrics = { ontology: fileKey };
      Object.keys(content.success[fileKey].metrics).forEach(metricGroupKey => {
        Object.keys(content.success[fileKey].metrics[metricGroupKey]).forEach(metricKey => {
          fileMetrics[metricGroupKey + ': ' + metricKey] = content.success[fileKey].metrics[metricGroupKey][metricKey];
        });
      });
      filesMetrics.push(fileMetrics);
    });

    let total = { ontology: 'Total' };
    let avg = { ontology: 'Average' };
    let min = { ontology: 'Mininum' };
    let max = { ontology: 'Maximum' };
    Object.keys(content.metrics).forEach(metricGroupKey => {
      Object.keys(content.metrics[metricGroupKey]).forEach(metricKey => {
        total[metricGroupKey + ': ' + metricKey] = content.metrics[metricGroupKey][metricKey].total;
        avg[metricGroupKey + ': ' + metricKey] = content.metrics[metricGroupKey][metricKey].avg;
        min[metricGroupKey + ': ' + metricKey] = content.metrics[metricGroupKey][metricKey].min;
        max[metricGroupKey + ': ' + metricKey] = content.metrics[metricGroupKey][metricKey].max;
      });
    });
    filesMetrics.push(total);
    filesMetrics.push(avg);
    filesMetrics.push(min);
    filesMetrics.push(max);

    /* generate worksheet and workbook */
    const worksheet = XLSX.utils.json_to_sheet(filesMetrics);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Metrics");

    /* create an XLSX file and try to save file .xlsx */
    XLSX.writeFile(workbook, name + ".xlsx");

    delete this.tabs[tab].exportingExcel;
  }

  formatTime(milisecs: number): string {
    let format = milisecs < 1000 * 60 * 60 ? 'mm:ss' : 'HH:mm:ss';
    let formated = moment.utc(milisecs).format(format);

    return formated == 'Invalid date' ? '-' : formated;
  }

  loadOutput(tab: number): void {
    var reader: FileReader = new FileReader();

    reader.onloadend = (e) => {
      this.tabs[tab].output = JSON.parse(reader.result.toString());

      setTimeout(() => {
        this.tabs[tab].showOutput = true;
        this.tabs[tab].showMetrics = true;
        this.tabs[tab].outputFile = null;
        this.metricsAccordion?.expandAll();
        this.listAccordion?.expandAll();
      });
    }

    reader.readAsText(this.tabs[tab].outputFile);
  }

  loadInputUris(tab: number): void {
    var reader: FileReader = new FileReader();

    reader.onloadend = (e) => {
      this.tabs[tab].parameters.ontologiesUris = JSON.parse(reader.result.toString());

      setTimeout(() => {
        this.tabs[tab].inputFile = null;
      });
    }

    reader.readAsText(this.tabs[tab].inputFile);
  }

  loadLOVExample() {
    const headerDict = {
      'Access-Control-Allow-Origin': '*'
    }

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    this.http.get('https://lov.linkeddata.es/dataset/lov/api/v2/vocabulary/list', requestOptions).subscribe(
      (data: any) => {
        console.log(data);
      },
      (error: any) => {
        console.log(error);
        iziToast.error({
          title: 'Error',
          message: '<i>There was an error when trying to get LOV ontologies.</i><br><br><b>' + error.message + '</b>',
        });
      });
  }
}
