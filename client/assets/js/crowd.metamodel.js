var CrowdMetamodel = function (config) {
  this.config = config;
}

CrowdMetamodel.prototype.request = function (req) {
  var self = this;

  //for change the url to call differents endpoints
  var url = self.config.url;
  switch (req.to) {
    case 'verbalization':
      url = self.config.verbalizationUrl;
      break;
    case 'owl':
      url = self.config.owlUrl;
      break;
  }

  //map kf to meta
  req.from = req.from == 'kf' ? 'meta' : req.from;
  req.to = req.to == 'kf' ? 'meta' : req.to;

  //map orm2 to orm
  req.from = req.from == 'orm2' ? 'orm' : req.from;
  req.to = req.to == 'orm2' ? 'orm' : req.to;

  //map verbalization parameters
  req.to = req.to == 'verbalization' ? req.verbalization + req.language : req.to;

  if (!req.format) req.format = 'owl2-alcqi';
  if (!req.syntax) req.syntax = 'rdfxml';
  if (!req.verbalization) req.verbalization = 'cnl';
  if (!req.language) req.language = 'en';

  console.log('MetamodelAPI: requesting ' + url + req.from + 'to' + req.to, req.data);

  if (req.to == 'owl') {
    return $.ajax({
      type: "POST",
      url: url,
      data: {
        json: JSON.stringify(req.data),
        format: req.format,
        syntax: req.syntax
      },
      success: function (res) {
        console.log('MetamodelAPI: response to ' + url + req.from + 'to' + req.to, res);
        if (req.success) req.success(res);
      },
      error: function (error) {
        console.log('MetamodelAPI: error', error);
        if (!req.hideError) self.config.error(error);
        if (req.error) req.error(error);
      }
    });
  } else if (req.from == 'owl') {
    var formData = new FormData();
    //define general parameters
    formData.append('input', req.input);
    formData.append('reasoner', req.reasoner);
    formData.append('filtering', req.filtering);

    //define set of ontologies by input type
    var ontologies = [];
    switch (req.input) {
      case 'string':
        ontologies = [req.ontologyString];
        break;
      case 'uri':
        ontologies = req.ontologiesUris;
        break;
      case 'file':
        ontologies = req.ontologiesFiles;
        break;
    }

    function getOntologyName(ontology, index) {
      if (req.input == 'string') {
        return "ontology" + index;
      } else if (req.input == 'uri') {
        return ontology.prefix ? ontology.prefix : ontology.url;
      } else if (req.input == 'file') {
        return ontology.name;
      }
    }

    function getOntologyValue(ontology) {
      if (req.input == 'string' || req.input == 'file') {
        return ontology;
      } else if (req.input == 'uri') {
        return ontology.url;
      }
    }

    //determine if request is for single or multiples ontologies
    var isMulti = ontologies.length > 1;

    //set feedback parameters for saw progress at the client
    if (isMulti) {
      req.apiComponent.tabs[req.tab].multiTotalFiles = ontologies.length;
      req.apiComponent.tabs[req.tab].showOutput = true;

      req.apiComponent.tabs[req.tab].multiTimeInterval = setInterval(function () {
        req.apiComponent.tabs[req.tab].multiTotalTime += 1000;
        if (req.apiComponent.tabs[req.tab].multiActualTime >= 1000) req.apiComponent.tabs[req.tab].multiActualTime -= 1000;
      }, 1000);
      req.apiComponent.tabs[req.tab].multiTotalTime = 0;
    }

    //it make a request for each ontology (recursivelly) or for a single one
    function request(index) {
      //set the actual ontology to be sended
      formData.set('ontologies', getOntologyValue(ontologies[index]));

      //if it's multiple, set feedback parameters for actual processed ontology and timeout
      if (isMulti) {
        req.apiComponent.tabs[req.tab].multiActual = getOntologyName(ontologies[index], index);
        req.apiComponent.tabs[req.tab].multiActualTime = req.timeout;
      }

      $.ajax({
        type: "POST",
        url: url + req.from + 'to' + req.to,
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        cache: false,
        data: formData,
        timeout: req.timeout ? req.timeout : 60000, //default timeout is 60s
        success: function (res) {
          console.log('MetamodelAPI: response to ' + url + req.from + 'to' + req.to, 'Ontology: ' + getOntologyName(ontologies[index], index), res);
          //when is multiple, add response to succeded array
          //if single, return response using "success" callback
          if (isMulti) {
            if (req.apiComponent.tabs[req.tab].multiSucceded)
              req.apiComponent.tabs[req.tab].multiSucceded[getOntologyName(ontologies[index], index)] = res;
          } else {
            if (req.success) req.success(res);
          }
        },
        error: function (error) {
          console.log('MetamodelAPI: error', 'Ontology: ' + getOntologyName(ontologies[index], index), error);
          //when is multiple, add error to failed array
          //if single, return error using "error" callback and showing error message (if it is enabled)
          if (isMulti) {
            if (req.apiComponent.tabs[req.tab].multiFailed)
              req.apiComponent.tabs[req.tab].multiFailed[getOntologyName(ontologies[index], index)] =
                { message: error.responseJSON?.message, stackTrace: error.responseJSON?.stackTrace };
          } else {
            if (!req.hideError) self.config.error(error);
            if (req.error) req.error(error);
          }
        },
        complete: function () {
          //this is only for multiple,
          //when is the last ontology, it clears intervals and return response on the "success" callback with all succeded and failed ontologies
          //if it's not the last ontology, it makes a recursivelly request for the next ontology
          if (isMulti) {
            if (index < ontologies.length - 1) {
              request(index + 1);
            } else {
              if (req.apiComponent.tabs[req.tab].multiSucceded && req.apiComponent.tabs[req.tab].multiFailed) {
                clearInterval(req.apiComponent.tabs[req.tab].multiTimeInterval);
                var res = { success: req.apiComponent.tabs[req.tab].multiSucceded, failed: req.apiComponent.tabs[req.tab].multiFailed };
                req.apiComponent.tabs[req.tab].multiActual = null;
                req.success(res);
              }
            }
          }
        }
      });
    }

    //start request (it can be single or recursivelly multiple)
    request(0);
  } else {
    return $.ajax({
      type: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      url: url + req.from + 'to' + req.to,
      data: JSON.stringify(req.data),
      success: function (res) {
        console.log('MetamodelAPI: response to ' + url + req.from + 'to' + req.to, res);
        if (req.success) req.success(res);
      },
      error: function (error) {
        console.log('MetamodelAPI: error', error);
        if (!req.hideError) self.config.error(error);
        if (req.error) req.error(error);
      }
    });
  }
}
