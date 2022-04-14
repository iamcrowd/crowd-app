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
    formData.append('reasoner', req.reasoner);
    formData.append('filtering', req.filtering);
    if (req.input == 'files' && req.ontologiesFiles?.length > 1 && req.apiComponent && req.tab != null) {
      req.apiComponent.tabs[req.tab].multiTotalFiles = req.ontologiesFiles.length;
      req.apiComponent.tabs[req.tab].showOutput = true;

      req.apiComponent.tabs[req.tab].multiTimeInterval = setInterval(function () {
        req.apiComponent.tabs[req.tab].multiTotalTime += 1000;
        if (req.apiComponent.tabs[req.tab].multiActualTime >= 1000) req.apiComponent.tabs[req.tab].multiActualTime -= 1000;
      }, 1000);
      req.apiComponent.tabs[req.tab].multiTotalTime = 0;

      //call recursively each file of the req.ontologiesFiles array
      function requestFile(index) {
        formData.set('ontologiesFiles', req.ontologiesFiles[index]);
        req.apiComponent.tabs[req.tab].multiActual = req.ontologiesFiles[index].name;
        req.apiComponent.tabs[req.tab].multiActualTime = req.timeout;

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
            console.log('MetamodelAPI: response to ' + url + req.from + 'to' + req.to, 'File: ' + req.ontologiesFiles[index].name, res);
            if (req.apiComponent.tabs[req.tab].multiSucceded)
              req.apiComponent.tabs[req.tab].multiSucceded[req.ontologiesFiles[index].name] = res;
          },
          error: function (error) {
            console.log('MetamodelAPI: error', 'File: ' + req.ontologiesFiles[index].name, error);
            if (req.apiComponent.tabs[req.tab].multiFailed)
              req.apiComponent.tabs[req.tab].multiFailed[req.ontologiesFiles[index].name] = { message: error.responseJSON?.message, stackTrace: error.responseJSON?.stackTrace };
          },
          complete: function () {
            if (index < req.ontologiesFiles.length - 1) {
              requestFile(index + 1);
            } else {
              if (req.apiComponent.tabs[req.tab].multiSucceded && req.apiComponent.tabs[req.tab].multiFailed) {
                clearInterval(req.apiComponent.tabs[req.tab].multiTimeInterval);
                var res = { success: req.apiComponent.tabs[req.tab].multiSucceded, failed: req.apiComponent.tabs[req.tab].multiFailed };
                req.apiComponent.tabs[req.tab].multiActual = null;
                req.success(res);
              }
            }
          }
        });
      }

      //start recursive call
      requestFile(0);
    } else {
      if (req.ontologiesFiles?.length)
        formData.append('ontologiesFiles', req.ontologiesFiles[0]);

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
