var CrowdMetamodel = function (config) {
  this.config = config;
}

CrowdMetamodel.prototype.request = function (req) {
  var self = this;

  //map kf to meta
  req.from = req.from == 'kf' ? 'meta' : req.from;
  req.to = req.to == 'kf' ? 'meta' : req.to;

  console.log('MetamodelAPI: requesting ' + self.config.url + req.from + 'to' + req.to, req.data);

  var url = self.config.url + req.from + 'to' + req.to;
  var data = JSON.stringify(req.data);
  if (req.to == 'owl') {
    url = self.config.owlUrl;
    data = JSON.stringify({ json: req.data, format: 'owl2' });
  }

  return $.ajax({
    type: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    url: url,
    data: data,
    success: function (res) {
      console.log('MetamodelAPI: response to ' + self.config.url + req.from + 'to' + req.to, res);
      if (req.success) req.success(res);
    },
    error: function (error) {
      console.log('MetamodelAPI: error', error);
      if (!req.hideError) self.config.error(error);
      if (req.error) req.error(error);
    }
  });
}
