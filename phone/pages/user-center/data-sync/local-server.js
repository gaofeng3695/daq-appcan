var localServer = (function (jasTools, DataBaseOperation) {
  var obj = {
    project: { // 表名
      add: function (aData, cb) {
        var dbOperation = new DataBaseOperation();
        var index = 0;
        var addItem = function (aData, index) {
          var startIndex = 500 * index;
          var data500 = aData.slice(startIndex, startIndex + 500);
          if (data500.length > 0) {
            var Sqls = [];
            dbOperation.dbTrans(Sqls, function (err) {
              index++;
              addItem(aData, index);
            });
          } else {
            cb && cb();
          }
        };
        addItem(aData, index);
      },
      get: function () {

      },
    },
    tender: { // 表名
      add: function () {

      },
      get: function () {

      },

    },
  };
  return obj;
})(jasTools, DataBaseOperation);