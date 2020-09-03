var CrowdMetamodel = function (config) {
  this.config = config;
}

CrowdMetamodel.prototype.request = function (req) {
  var self = this;

  //map kf to meta
  req.from = req.from == 'kf' ? 'meta' : req.from;
  req.to = req.to == 'kf' ? 'meta' : req.to;

  console.log('MetamodelAPI: requesting ' + self.config.url + req.from + 'to' + req.to, req.data);

  return $.ajax({
    type: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    url: self.config.url + req.from + 'to' + req.to,
    data: JSON.stringify(req.data),
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
