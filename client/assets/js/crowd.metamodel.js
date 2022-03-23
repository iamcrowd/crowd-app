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
    formData.append('input', req.input);
    formData.append('ontologyUri', req.ontologyUri);
    formData.append('ontologyString', req.ontologyString);
    if (req.ontologiesFiles?.length) {
      for (var i = 0; i < req.ontologiesFiles.length; i++) {
        formData.append('ontologiesFiles', req.ontologiesFiles[i]);
      }
    }
    formData.append('reasoner', req.reasoner);
    return $.ajax({
      type: "POST",
      url: url + req.from + 'to' + req.to,
      enctype: 'multipart/form-data',
      processData: false,
      contentType: false,
      cache: false,
      data: formData,
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
  else {
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
