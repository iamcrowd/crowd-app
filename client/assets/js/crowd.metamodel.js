var CrowdMetamodel = function (config) {
  this.config = config;
}

CrowdMetamodel.prototype.request = function (req) {
  var self = this;

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
      req.success(res);
    },
    error: function (error) {
      console.log('MetamodelAPI: error', error);
      self.config.error(error);
      req.error(error);
    }
  });
}
