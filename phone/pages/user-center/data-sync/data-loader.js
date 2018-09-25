var dataLoader = (function (jasTools, DataBaseOperation, localServer) {
  var obj = {
    // 基础数据-------------
    basic: {
      request: function (cb) {
        jasTools.ajax.post('/daq/privilege/getOfflineData.do', {}, function (data) {
          cb && cb(data.data);
        });
      },
      deleteTable: function (cb) {
        var userId = JSON.parse(localStorage.getItem("user")).oid;
        var deleteSqls = [
            "delete from DaqProject where userId='"+userId+"'",
            "delete from DaqTenders where userId='"+userId+"'",
            "delete from DaqPipeline where userId='"+userId+"'",
            "delete from DaqPipeSegmentOrCross where userId='"+userId+"'",
            "delete from DaqSupervisionUnit where userId='"+userId+"'"
        ];
        var dbOperation = new DataBaseOperation();
        dbOperation.dbTrans(deleteSqls, function (err) {
          cb && cb();
        });
      },
      insertData: function (odata, cb) {
        var total = Object.keys(odata).length-1;
        var index = 0;
        var callback = function () {
          index++;
          if (index === total) {
            cb && cb();
          }
        };
        localServer.project.add(odata.projectData, callback);
        localServer.tender.add(odata.tendersData, callback);
        localServer.pipeline.add(odata.pipelineData, callback);
        localServer.pipeSegmentOrCross.add(odata.pipeSegmentOrCrossData, callback);
        localServer.supervisionUnit.add(odata.supervisionUnitData, callback);
      },
      getCount: function (cb){
        var total = 5;
        var index = 0;
        var result = {
            "status":1,
            "code":200,
            "msg":"查询成功",
            "rows":[],
            "total":0,
            "lastModifyTime":""
        }
        var callback = function (data) {
          index++;
          if (index === total) {
            cb && cb(data);
          }
        };
        localServer.project.getCount(function(data){
            if (data.length > 0) {
                result.lastUpdateTime = data[0].lastUpdateTime;
                result.total += parseInt(data[0].total);
                var obj = {'project': parseInt(data[0].total)};
                result.rows.push(obj);
                callback(result);
            } else{
                var obj = {'project': 0};
                result.rows.push(obj);
                callback(result);
            };
        });
        localServer.tender.getCount(function(data){
             if (data.length > 0) {
                result.total += parseInt(data[0].total);
                var obj = {'tenders': parseInt(data[0].total)};
                result.rows.push(obj);
                callback(result);
            } else{
                var obj = {'tenders': 0};
                result.rows.push(obj);
                callback(result);
            };
        });
        localServer.pipeline.getCount(function(data){
            if (data.length > 0) {
                result.total += parseInt(data[0].total);
                var obj = {'pipeline': parseInt(data[0].total)};
                result.rows.push(obj);
                callback(result);
            } else{
                var obj = {'pipeline': 0};
                result.rows.push(obj);
                callback(result);
            };
        });
        localServer.pipeSegmentOrCross.getCount(function(data){
            if (data.length > 0) {
                result.total += parseInt(data[0].total);
                var obj = {'pipeSegmentOrCross': parseInt(data[0].total)};
                result.rows.push(obj);
                callback(result);
            } else{
                var obj = {'pipeSegmentOrCross': 0};
                result.rows.push(obj);
                callback(result);
            };
        });
        localServer.supervisionUnit.getCount(function(data){
            if (data.length > 0) {
                result.total += parseInt(data[0].total);
                var obj = {'supervisionUnit': parseInt(data[0].total)};
                result.rows.push(obj);
                callback(result);
            } else{
                var obj = {'supervisionUnit': 0};
                result.rows.push(obj);
                callback(result);
            };
        });
          
      }
    },


    
    // 线路物资-------------
    material: {
      request: function (cb) {
        jasTools.ajax.post('/daq/materialPipe/getOfflineMaterialData.do', {}, function (data) {
          cb && cb(data.data);
        });
      },
      deleteTable: function (cb) {
        var userId = JSON.parse(localStorage.getItem("user")).oid;
        var deleteSqls = [
            "delete from DaqMaterialPipe where userId='"+userId+"'",
            "delete from DaqClodBendingPipe where userId='"+userId+"'",
            "delete from DaqMaterialHotBends where userId='"+userId+"'",
            "delete from DaqMaterialTee where userId='"+userId+"'",
            "delete from DaqMaterialJnsulatedJoint where userId='"+userId+"'",
            "delete from DaqMaterialReducer where userId='"+userId+"'",
            "delete from DaqMaterialClosure where userId='"+userId+"'",
            "delete from DaqMaterialValve where userId='"+userId+"'"
        ];
        var dbOperation = new DataBaseOperation();
        dbOperation.dbTrans(deleteSqls, function (err) {
          cb && cb();
        });
      },
      insertData: function (odata, cb) {
          // alert(JSON.stringify(odata,4,4))
        var total = Object.keys(odata).length;
        var index = 0;
        var callback = function () {
          index++;
          if (index === total) {
            cb && cb();
          }
        };
        localServer.materialPipe.add(odata.materialPipeData, callback);
        localServer.coldBending.add(odata.coldBendingData, callback);
        localServer.materialHotBends.add(odata.materialHotBendsData, callback);
        localServer.materialTee.add(odata.materialTeeData, callback);
        localServer.materialJnsulatedJoint.add(odata.materialJnsulatedJointData, callback);
        localServer.materialReducer.add(odata.materialReducerData, callback);
        localServer.materialClosure.add(odata.materialClosureData, callback);
        localServer.materialValve.add(odata.materialValveData, callback);
      },
      getCount: function (cb){
        var total = 8;
        var index = 0;
        var result = {
            "status":1,
            "code":200,
            "msg":"查询成功",
            "rows":[],
            "total":0,
            "lastUpdateTime":""
        }
        var callback = function (data) {
          index++;
          if (index === total) {
            cb && cb(data);
          }
        };
        localServer.materialPipe.getCount(function(data){
            if (data.length > 0) {
                result.lastUpdateTime = data[0].lastUpdateTime;
                result.total += parseInt(data[0].total);
                var obj = {'materialPipe': parseInt(data[0].total)};
                result.rows.push(obj);
                callback(result);
            } else{
                var obj = {'materialPipe': 0};
                result.rows.push(obj);
                callback(result);
            };
        });
        localServer.coldBending.getCount(function(data){
            if (data.length > 0) {
                result.total += parseInt(data[0].total);
                var obj = {'coldBending': parseInt(data[0].total)};
                result.rows.push(obj);
                callback(result);
            } else{
                var obj = {'coldBending': 0};
                result.rows.push(obj);
                callback(result);
            };
        });
        localServer.materialHotBends.getCount(function(data){
            if (data.length > 0) {
                result.total += parseInt(data[0].total);
                var obj = {'materialHotBends': parseInt(data[0].total)};
                result.rows.push(obj);
                callback(result);
            } else{
                var obj = {'materialHotBends': 0};
                result.rows.push(obj);
                callback(result);
            };
        });
        localServer.materialTee.getCount(function(data){
            if (data.length > 0) {
                result.total += parseInt(data[0].total);
                var obj = {'materialTee': parseInt(data[0].total)};
                result.rows.push(obj);
                callback(result);
            } else{
                var obj = {'materialTee': 0};
                result.rows.push(obj);
                callback(result);
            };
        });
        localServer.materialJnsulatedJoint.getCount(function(data){
            if (data.length > 0) {
                result.total += parseInt(data[0].total);
                var obj = {'materialJnsulatedJoint': parseInt(data[0].total)};
                result.rows.push(obj);
                callback(result);
            } else{
                var obj = {'materialJnsulatedJoint': 0};
                result.rows.push(obj);
                callback(result);
            };
        });
        localServer.materialReducer.getCount(function(data){
            if (data.length > 0) {
                result.total += parseInt(data[0].total);
                var obj = {'materialReducer': parseInt(data[0].total)};
                result.rows.push(obj);
                callback(result);
            } else{
                var obj = {'materialReducer': 0};
                result.rows.push(obj);
                callback(result);
            };
        });
        localServer.materialClosure.getCount(function(data){
            if (data.length > 0) {
                result.total += parseInt(data[0].total);
                var obj = {'materialClosure': parseInt(data[0].total)};
                result.rows.push(obj);
                callback(result);
            } else{
                var obj = {'materialClosure': 0};
                result.rows.push(obj);
                callback(result);
            };
        });
        localServer.materialValve.getCount(function(data){
            if (data.length > 0) {
                result.total += parseInt(data[0].total);
                var obj = {'materialValve': parseInt(data[0].total)};
                result.rows.push(obj);
                callback(result);
            } else{
                var obj = {'materialValve': 0};
                result.rows.push(obj);
                callback(result);
            };
        });
      }
    },
    
    
    
    // 施工机组和人员-------------
    workPersonAndUnit: {
      request: function (cb) {
        jasTools.ajax.post('/daq/workUnit/getOfflineWorkUnitData.do', {}, function (data) {
          cb && cb(data.data);
        });
      },
      deleteTable: function (cb) {
        var userId = JSON.parse(localStorage.getItem("user")).oid;
        var deleteSqls = [
            "delete from DaqWorkUnit where userId='"+userId+"'",
            "delete from DaqWeldProduceSpecification where userId='"+userId+"'",
            "delete from DaqWorkPersonnel where userId='"+userId+"'"
        ];
        var dbOperation = new DataBaseOperation();
        dbOperation.dbTrans(deleteSqls, function (err) {
          cb && cb();
        });
      },
      insertData: function (odata, cb) {
        var total = Object.keys(odata).length;
        var index = 0;
        var callback = function () {
          index++;
          if (index === total) {
            cb && cb();
          }
        };
        localServer.workUnit.add(odata.workUnitData, callback);
        localServer.weldProduct.add(odata.weldProductData, callback);
        localServer.workPersonnel.add(odata.workPersonData, callback);
      },
      getCount: function (cb){
        var total = 3;
        var index = 0;
        var result = {
            "status":1,
            "code":200,
            "msg":"查询成功",
            "rows":[],
            "total":0,
            "lastModifyTime":""
        }
        var callback = function (data) {
          index++;
          if (index === total) {
            cb && cb(data);
          }
        };
        localServer.workUnit.getCount(function(data){
            if (data.length > 0) {
                result.lastUpdateTime = data[0].lastUpdateTime;
                result.total += parseInt(data[0].total);
                var obj = {'workUnit': parseInt(data[0].total)};
                result.rows.push(obj);
                callback(result);
            } else{
                var obj = {'workUnit': 0};
                result.rows.push(obj);
                callback(result);
            };
        });
        localServer.weldProduct.getCount(function(data){
             if (data.length > 0) {
                result.total += parseInt(data[0].total);
                var obj = {'weldProduct': parseInt(data[0].total)};
                result.rows.push(obj);
                callback(result);
            } else{
                var obj = {'weldProduct': 0};
                result.rows.push(obj);
                callback(result);
            };
        });
        localServer.workPersonnel.getCount(function(data){
            if (data.length > 0) {
                result.total += parseInt(data[0].total);
                var obj = {'workPersonnel': parseInt(data[0].total)};
                result.rows.push(obj);
                callback(result);
            } else{
                var obj = {'workPersonnel': 0};
                result.rows.push(obj);
                callback(result);
            };
        });
          
      }
    },
    
    
    // 离线用户数据-------------
    offlineUser: {
      request: function (cb) {
        jasTools.ajax.post('/daq/privilege/getConstructUnitAllUser.do', {}, function (data) {
          cb && cb(data);
        });
      },
      deleteTable: function (cb) {
        var deleteSqls = [
            "delete from priUser"
        ];
        var dbOperation = new DataBaseOperation();
        dbOperation.dbTrans(deleteSqls, function (err) {
          cb && cb();
        });
      },
      insertData: function (odata, cb) {
        var total = 1;
        var index = 0;
        var callback = function () {
          index++;
          if (index === total) {
            cb && cb();
          }
        };
        localServer.priUser.add(odata.rows, callback);
      },
      getCount: function (cb){
        var total = 1;
        var index = 0;
        var result = {
            "status":1,
            "code":200,
            "msg":"查询成功",
            "rows":[],
            "total":0,
            "lastModifyTime":""
        }
        var callback = function (data) {
          index++;
          if (index === total) {
            cb && cb(data);
          }
        };
        localServer.priUser.getCount(function(data){
            if (data.length > 0) {
                result.lastUpdateTime = data[0].lastUpdateTime;
                result.total += parseInt(data[0].total);
                var obj = {'priUser': parseInt(data[0].total)};
                result.rows.push(obj);
                callback(result);
            } else{
                var obj = {'priUser': 0};
                result.rows.push(obj);
                callback(result);
            };
        });
          
      }
    },
    
    
    // 域值信息-------------
    sysDomain: {
      request: function (cb) {
        jasTools.ajax.post('/daq/sysDomain/getOfflineSysdomainData.do', {}, function (data) {
          cb && cb(data);
        });
      },
      deleteTable: function (cb) {
        var deleteSqls = [
            "delete from DaqSysDomain"
        ];
        var dbOperation = new DataBaseOperation();
        dbOperation.dbTrans(deleteSqls, function (err) {
          cb && cb();
        });
      },
      insertData: function (odata, cb) {
        var total = 1;
        var index = 0;
        var callback = function () {
          index++;
          if (index === total) {
            cb && cb();
          }
        };
        localServer.sysDomain.add(odata.rows, callback);
      },
      getCount: function (cb){
        var total = 1;
        var index = 0;
        var result = {
            "status":1,
            "code":200,
            "msg":"查询成功",
            "rows":[],
            "total":0,
            "lastModifyTime":""
        }
        var callback = function (data) {
          index++;
          if (index === total) {
            cb && cb(data);
          }
        };
        localServer.sysDomain.getCount(function(data){
            if (data.length > 0) {
                result.lastUpdateTime = data[0].lastUpdateTime;
                result.total += parseInt(data[0].total);
                var obj = {'sysDomain': parseInt(data[0].total)};
                result.rows.push(obj);
                callback(result);
            } else{
                var obj = {'sysDomain': 0};
                result.rows.push(obj);
                callback(result);
            };
        });
          
      }
    },
  };
  return obj;
})(jasTools, DataBaseOperation, localServer);