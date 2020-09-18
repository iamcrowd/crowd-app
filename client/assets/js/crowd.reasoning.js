var CrowdReasoning = function (config) {
  this.config = config;
}

CrowdReasoning.prototype.request = function (req) {
  var self = this;

  console.log('ReasoningAPI: requesting ' + self.config.url);

  return $.ajax({
    type: "POST",
    url: self.config.url,
    data: {
      json: JSON.stringify(req.kf),
      reasoner: req.reasoner
    },
    success: function (res) {
      res = JSON.parse(res);
      console.log('ReasoningAPI: response to ' + self.config.url, res);
      if (req.success) req.success(res);
    },
    error: function (error) {
      error = JSON.parse(error);
      console.log('ReasoningAPI: error', error);
      if (!req.hideError) self.config.error(error);
      if (req.error) req.error(error);
    }
  });
}
