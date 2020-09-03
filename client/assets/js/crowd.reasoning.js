var CrowdReasoning = function (config) {
  this.config = config;
}

CrowdReasoning.prototype.request = function (req) {
  var self = this;

  console.log('ReasoningAPI: requesting ' + self.config.url);

  return $.ajax({
    type: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    url: self.config.url,
    data: JSON.stringify(req.data),
    success: function (res) {
      console.log('ReasoningAPI: response to ' + self.config.url, res);
      if (req.success) req.success(res);
    },
    error: function (error) {
      console.log('ReasoningAPI: error', error);
      if (!req.hideError) self.config.error(error);
      if (req.error) req.error(error);
    }
  });
}
