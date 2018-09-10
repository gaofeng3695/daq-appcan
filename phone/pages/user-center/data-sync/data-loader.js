var dataLoader = (function (jasTools, DataBaseOperation, localServer) {
  var obj = {
    basic: {
      request: function (cb) {
        jasTools.ajax.post('url', {}, function (data) {
          cb && cb(data.data);
        });
      },
      deleteTable: function (cb) {
        var deleteSqls = [];
        var dbOperation = new DataBaseOperation();
        dbOperation.dbTrans(deleteSqls, function (err) {
          cb && cb();
        });
      },
      insertData: function (odata, cb) {
        var total = 2;
        var index = 0;
        var callback = function () {
          index++;
          if (index === total) {
            cb && cb();
          }
        };
        localServer.project.add(odata.projectData, callback);
        localServer.tender.add(odata.tendersData, callback);
      }
    }
  };
  return obj;
})(jasTools, DataBaseOperation, localServer);