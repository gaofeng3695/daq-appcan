/**
 * 数据同步方法
 * @param {String} type 要操作的属性名称
 * @param {String} baseData 要插入的源数据
 * @param {Function} cb 插入成功后的回掉函数
 */
function insertData(type, baseData, cb) {
    if (!baseData) return;
    var dbOperation = new DataBaseOperation();
    var index = 0;
    var addItem = function (baseData, index) {
        var startIndex = 500 * index;
        var data500 = baseData.slice(startIndex, startIndex + 500);
        if (data500.length > 0) {
            var Sqls = [];
            var localDatetime = jasTools.base.formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss');
            var userId = JSON.parse(localStorage.getItem("user")).oid;
            // alert(JSON.stringify(data500,4,4))
            data500.forEach(function (item, index) {
                switch (type) {
                    case ("project"):
                        Sqls[index] = "insert into DaqProject (oid,name,userId,lastUpdateTime) values ('" + item.key + "','" + item.value + "','" + userId + "','" + localDatetime + "')";
                        break;
                    case ("tender"):
                        Sqls[index] = "insert into DaqTenders (oid,name,userId,projectOid) values ('" + item.key + "','" + item.value + "','" + userId + "','" + item.project_oid + "')";
                        break;
                    case ("pipeline"):
                        Sqls[index] = "insert into DaqPipeline (oid,name,userId,tendersOid) values ('" + item.key + "','" + item.value + "','" + userId + "','" + item.tenders_oid + "')";
                        break;
                    case ("pipeSegmentOrCross"):
                        Sqls[index] = "insert into DaqPipeSegmentOrCross (oid,name,userId,pipelineOid) values ('" + item.key + "','" + item.value + "','" + userId + "','" + item.pipeline_oid + "')";
                        break;
                    case ("supervisionUnit"):
                        Sqls[index] = "insert into DaqSupervisionUnit (oid,name,userId,tendersOid) values ('" + item.key + "','" + item.value + "','" + userId + "','" + item.tenders_oid + "')";
                        break;
                    case ("materialPipe"):
                        Sqls[index] = "insert into DaqMaterialPipe (oid,pipeCode,userId,backIsUse,frontIsUse,isColdBend,lastUpdateTime,projectOid) values ('" + item.key + "','" + item.value + "','" + userId + "'," + item.frontIsUse + "," + item.backIsUse + "," + item.isColdBend + ",'" + localDatetime + "','" + item.projectOid + "')";
                        break;
                    case ("coldBending"):
                        Sqls[index] = "insert into DaqClodBendingPipe (oid,clodBendingPipeCode,userId,backIsUse,frontIsUse,tendersOid,approveStatus,projectOid,pipeSegmentOrCrossOid) values ('" + item.key + "','" + item.value + "','" + userId + "'," + item.frontIsUse + "," + item.backIsUse + ",'" + item.tendersOid + "'," + item.approveStatus + ",'" + item.projectOid + "','" + item.pipeSegmentOrCrossOid + "')";
                        break;
                    case ("materialHotBends"):
                        Sqls[index] = "insert into DaqMaterialHotBends (oid,hotBendsCode,userId,backIsUse,frontIsUse,projectOid) values ('" + item.key + "','" + item.value + "','" + userId + "'," + item.frontIsUse + "," + item.backIsUse + ",'" + item.projectOid + "')";
                        break;
                    case ("materialTee"):
                        Sqls[index] = "insert into DaqMaterialTee (oid,teeCode,userId,isUse,projectOid) values ('" + item.key + "','" + item.value + "','" + userId + "'," + item.isUse + ",'" + item.projectOid + "')";
                        break;
                    case ("materialJnsulatedJoint"):
                        Sqls[index] = "insert into DaqMaterialJnsulatedJoint (oid,manufacturerCode,userId,isUse,projectOid) values ('" + item.key + "','" + item.value + "','" + userId + "'," + item.isUse + ",'" + item.projectOid + "')";
                        break;
                    case ("materialReducer"):
                        Sqls[index] = "insert into DaqMaterialReducer (oid,reducerCode,userId,isUse,projectOid) values ('" + item.key + "','" + item.value + "','" + userId + "'," + item.isUse + ",'" + item.projectOid + "')";
                        break;
                    case ("materialClosure"):
                        Sqls[index] = "insert into DaqMaterialClosure (oid,closureCode,userId,isUse,projectOid) values ('" + item.key + "','" + item.value + "','" + userId + "'," + item.isUse + ",'" + item.projectOid + "')";
                        break;
                    case ("materialValve"):
                        Sqls[index] = "insert into DaqMaterialValve (oid,valveName,userId,isUse,projectOid) values ('" + item.key + "','" + item.value + "','" + userId + "'," + item.isUse + ",'" + item.projectOid + "')";
                        break;


                    case ("workUnit"):
                        Sqls[index] = "insert into DaqWorkUnit (oid,workUnitName,userId,projectOid,workUnitType,lastUpdateTime) values ('" + item.key + "','" + item.value + "','" + userId + "','" + item.project_oid + "','" + item.work_unit_type + "','" + localDatetime + "')";
                        break;
                    case ("weldProduct"):
                        Sqls[index] = "insert into DaqWeldProduceSpecification (oid,weldProduceCode,userId,projectOid) values ('" + item.key + "','" + item.value + "','" + userId + "','" + item.project_oid + "')";
                        break;
                    case ("workPersonnel"):
                        //oid text,personnelName text,workUnitOid text,personnelType text,userId text)",//机组人员表
                        Sqls[index] = "insert into DaqWorkPersonnel (oid,personnelName,userId,workUnitOid,personnelType) values ('" + item.key + "','" + item.value + "','" + userId + "','" + item.work_unit_oid + "','" + item.personnel_type + "')";
                        break;


                    case ("priUser"):
                        //userId text,userName text,loginName text,pwd text,unitId text,unitName text)
                        Sqls[index] = "insert into priUser (userId,userName,loginName,pwd,unitId,unitName,lastUpdateTime) values ('" + item.oid + "','" + item.user_name + "','" + item.login_name + "','" + item.password + "','" + item.unit_id + "','" + item.unit_name + "','" + localDatetime + "')";
                        break;


                    case ("sysDomain"):
                        Sqls[index] = "insert into DaqSysDomain (codeId,codeName,domainName,lastUpdateTime) values ('" + item.code_id + "','" + item.code_name + "','" + item.domain_name + "','" + localDatetime + "')";
                        break;

                    default:
                        Sqls[index] = "";
                        break;
                }
            });
            // alert(JSON.stringify(Sqls,4,4))
            dbOperation.dbTrans(Sqls, function (err) {
                index++;
                addItem(baseData, index);
            });
        } else {
            cb && cb();
        }
    };
    addItem(baseData, index);
}


/**
 * 数据查询方法
 * @param {String} querySql 查询的sql语句
 * @param {Function} callback 查询的回调函数
 */
function getData(querySql, callback) {
    var resultData = {
        "status": 1,
        "code": 200,
        "msg": "ok",
        "rows": []
    };
    var dbOperation = new DataBaseOperation();
    dbOperation.dbSelect(querySql, function (err, data) {
        if (err == 0) {
            resultData.rows = JSON.parse(data);
            callback(resultData);
        } else {
            resultData.status = -1;
            resultData.code = 406;
            resultData.msg = "查询失败";
            callback(resultData);
        };
    });
}


/**
 * 操作单条数据（增删改）
 * @param {String} type 操作类型
 * @param {Object} sql 需要执行的sql
 * @param {Object} callback 执行完成后的回调函数
 */
function singleOperate(type, sqls, callback) {
    var resultData = {
        "status": 1,
        "code": 200,
        "msg": ""
    };
    if (type == "insert") {
        resultData.msg = "保存成功";
    } else if (type == "update") {
        resultData.msg = "更新成功";
    } else {
        resultData.msg = "删除成功";
    };
    // alert(JSON.stringify(sqls,4,4))
    var dbOperation = new DataBaseOperation();
    dbOperation.dbTrans(sqls, function (err, data) {
        if (err == 0) {
            callback(resultData)
        } else {
            resultData.status = -1;
            resultData.code = 406;
            resultData.msg = "请勿重复操作";
            callback(resultData)
        }
    });
}


/**
 * 线路物资检查查询方法
 * @param {Array} sqls 查询的sql
 * @param {Function} 执行完成的回调函数
 */
function doubleQuery(querySql, callback) {
    var resultData = {
        "status": 1,
        "code": 200,
        "msg": "查询成功",
        "rows": []
    };
    var dbOperation = new DataBaseOperation();
    dbOperation.dbSelect(querySql, function (err, data) {
        var dataObj = JSON.parse(data);
        if (err == 0) {
            if (dataObj.length > 0) {
                var totle = dataObj.length;
                var nDone = 0;
                dataObj.forEach(function (item, index) {
                    if (item.postData != "" && item.postData != null) {
                        var postData = JSON.parse(item.postData);
                        var sql = "select * from DaqSysAttachment where businessId='" + postData.oid + "'";
                        postData.attachment = [];
                        dbOperation.dbSelect(sql, function (err, result) {
                            postData.attachment = JSON.parse(result);
                            resultData.rows.push(postData);
                            nDone++;
                            (nDone == totle) && callback(resultData);
                        })
                    } else {
                        nDone++;
                        (nDone == totle) && callback(resultData);
                    }
                })
            } else {
                callback(resultData);
            };
        } else {
            resultData.status = -1;
            resultData.code = 406;
            resultData.msg = "查询失败";
            callback(resultData);
        };
    });
}


function getCount(sql, callback) {
    var result = [];
    var dbOperation = new DataBaseOperation();
    dbOperation.dbSelect(sql, function (err, data) {
        if (err == 0) {
            result = JSON.parse(data);
            callback(result);
        } else {
            callback(result.push({}))
        }
    });
}



















var localServer = (function (jasTools, DataBaseOperation) {
    var obj = {
        //----------------------------------------------------------基础数据------------------------------------------------------------------
        project: { // 项目--------------------------------------------------------------------
            add: function (projectData, cb) {
                insertData("project", projectData, cb);
            },
            get: function (obj, callback) {
                var userId = JSON.parse(localStorage.getItem("user")).oid;
                var querySql = "select oid as key,name as value from DaqProject where userId='" + userId + "'";
                getData(querySql, callback);
            },
            getCount: function (callback) {
                var userId = JSON.parse(localStorage.getItem("user")).oid;
                var querySql = "select count(*) as total,lastUpdateTime from DaqProject where userId='" + userId + "'";
                getCount(querySql, callback);
            },
        },
        tender: { // 标段-------------------------------------------------------------------------------
            add: function (tenderData, cb) {
                insertData("tender", tenderData, cb);
            },
            get: function (obj, callback) {
                var userId = JSON.parse(localStorage.getItem("user")).oid;
                var querySql = "select oid as key,name as value from DaqTenders where projectOid='" + obj.projectOid + "' and userId='" + userId + "'";
                getData(querySql, callback);
            },
            getCount: function (callback) {
                var userId = JSON.parse(localStorage.getItem("user")).oid;
                var querySql = "select count(*) as total from DaqTenders where userId='" + userId + "'";
                getCount(querySql, callback);
            },
        },
        pipeline: { // 管线---------------------------------------------------------------------
            add: function (pipelineData, cb) {
                insertData("pipeline", pipelineData, cb);
            },
            get: function (obj, callback) {
                var userId = JSON.parse(localStorage.getItem("user")).oid;
                var querySql = "select oid as key,name as value from DaqPipeline where tendersOid='" + obj.tendersOid + "' and userId='" + userId + "'";
                getData(querySql, callback);
            },
            getCount: function (callback) {
                var userId = JSON.parse(localStorage.getItem("user")).oid;
                var querySql = "select count(*) as total from DaqPipeline where userId='" + userId + "'";
                getCount(querySql, callback);
            },
        },
        pipeSegmentOrCross: { // 线路段/穿跨越------------------------------------------------------------
            add: function (pipeSegmentOrCrossData, cb) {
                insertData("pipeSegmentOrCross", pipeSegmentOrCrossData, cb);
            },
            get: function (obj, callback) {
                var userId = JSON.parse(localStorage.getItem("user")).oid;
                var querySql = "select oid as key,name as value from DaqPipeSegmentOrCross where pipelineOid='" + obj.pipelineOid + "' and userId='" + userId + "'";
                getData(querySql, callback);
            },
            getCount: function (callback) {
                var userId = JSON.parse(localStorage.getItem("user")).oid;
                var querySql = "select count(*) as total from DaqPipeSegmentOrCross where userId='" + userId + "'";
                getCount(querySql, callback);
            },
        },
        supervisionUnit: { // 监理单位---------------------------------------------------------------
            add: function (supervisionUnitData, cb) {
                insertData("supervisionUnit", supervisionUnitData, cb);
            },
            get: function (obj, callback) {
                var userId = JSON.parse(localStorage.getItem("user")).oid;
                var querySql = "select oid as key,name as value from DaqSupervisionUnit where tendersOid='" + obj.tendersOid + "' and userId='" + userId + "'";
                getData(querySql, callback);
            },
            getCount: function (callback) {
                var userId = JSON.parse(localStorage.getItem("user")).oid;
                var querySql = "select count(*) as total from DaqSupervisionUnit where userId='" + userId + "'";
                getCount(querySql, callback);
            },
        },




        //----------------------------------------------------------线路物资-----------------------------------------------
        materialPipe: { // 钢管表----------------------------------------------------------------------------
            add: function (materialPipeData, cb) {
                insertData("materialPipe", materialPipeData, cb);
            },
            get: function (obj, callback) {
                var userId = JSON.parse(localStorage.getItem("user")).oid;
                var querySql = "";
                if (obj.getNotUse) {
                    querySql = "select oid as key,pipeCode as value from DaqMaterialPipe where userId='" + userId + "' and isColdBend=0 and isUse=0";
                } else {
                    querySql = "select oid as key,pipeCode as value from DaqMaterialPipe where userId='" + userId + "'";
                }
                getData(querySql, callback);
            },
            getCount: function (callback) {
                var userId = JSON.parse(localStorage.getItem("user")).oid;
                var querySql = "select count(*) as total,lastUpdateTime from DaqMaterialPipe where userId='" + userId + "'";
                getCount(querySql, callback);
            },
            isColdBending: function(obj,callback){
                var result = {
                    "status": 1,
                    "code": 200,
                    "msg": "ok",
                    "isColdBend":false
                }
                var sql = "select isColdBend from DaqMaterialPipe where pipeCode='"+obj.pipeCode+"'";
                // alert(sql)
                getData(sql,function(data){
                    // alert(JSON.stringify(data,4,4))
                    if (null != data.rows[0]) {
                        var isColdBend = data.rows[0].isColdBend;
                        if (isColdBend == "1") {
                            result.isColdBend = true;
                            callback(result);
                        } else{
                            callback(result);
                        };
                    } else{
                        result.status = -1;
                        result.code = 400;
                        result.msg = "err";
                        callback(result);
                    };
                })
            }
        },
        coldBending: { // 冷弯管----------------------------------------------------------------------------
            add: function (coldBendingData, cb) {
                insertData("coldBending", coldBendingData, cb);
            },
            get: function (obj, callback) {
                var userId = JSON.parse(localStorage.getItem("user")).oid;
                var querySql = "";
                if (obj.pipeSegmentOrCrossOid == null || obj.pipeSegmentOrCrossOid == "") {
                    querySql = "select oid as key,clodBendingPipeCode as value from DaqClodBendingPipe where tendersOid='" + obj.tendersOid + "' and userId='" + userId + "'";
                } else {
                    querySql = "select oid as key,clodBendingPipeCode as value from DaqClodBendingPipe where isUse=0 and approveStatus=2 " +
                        " and pipeSegmentOrCrossOid='" + obj.pipeSegmentOrCrossOid + "' and userId='" + userId + "'";
                };
                getData(querySql, callback);
            },
            getCount: function (callback) {
                var userId = JSON.parse(localStorage.getItem("user")).oid;
                var querySql = "select count(*) as total from DaqClodBendingPipe where userId='" + userId + "'";
                getCount(querySql, callback);
            },
        },
        materialHotBends: { // 热煨弯管---------------------------------------------------------------
            add: function (materialHotBendsData, cb) {
                insertData("materialHotBends", materialHotBendsData, cb);
            },
            get: function (obj, callback) {
                var userId = JSON.parse(localStorage.getItem("user")).oid;
                if (obj.getNotUse) {
                    querySql = "select oid as key,hotBendsCode as value from DaqMaterialHotBends where userId='" + userId + "' and isUse=0 ";
                } else {
                    querySql = "select oid as key,hotBendsCode as value from DaqMaterialHotBends where userId='" + userId + "'";
                }
                getData(querySql, callback);
            },
            getCount: function (callback) {
                var userId = JSON.parse(localStorage.getItem("user")).oid;
                var querySql = "select count(*) as total from DaqMaterialHotBends where userId='" + userId + "'";
                getCount(querySql, callback);
            },
        },
        materialTee: { // 三通---------------------------------------------------------------
            add: function (materialTeeData, cb) {
                insertData("materialTee", materialTeeData, cb);
            },
            get: function (obj, callback) {
                var userId = JSON.parse(localStorage.getItem("user")).oid;
                var querySql = "select oid as key,teeCode as value from DaqMaterialTee where userId='" + userId + "' and isUse = 0";
                getData(querySql, callback);
            },
            getCount: function (callback) {
                var userId = JSON.parse(localStorage.getItem("user")).oid;
                var querySql = "select count(*) as total from DaqMaterialTee where userId='" + userId + "'";
                getCount(querySql, callback);
            },
        },
        materialJnsulatedJoint: { // 绝缘接头---------------------------------------------------------------
            add: function (materialJnsulatedJointData, cb) {
                insertData("materialJnsulatedJoint", materialJnsulatedJointData, cb);
            },
            get: function (obj, callback) {
                var userId = JSON.parse(localStorage.getItem("user")).oid;
                var querySql = "select oid as key,manufacturerCode as value from DaqMaterialJnsulatedJoint where userId='" + userId + "' and isUse = 0";
                getData(querySql, callback);
            },
            getCount: function (callback) {
                var userId = JSON.parse(localStorage.getItem("user")).oid;
                var querySql = "select count(*) as total from DaqMaterialJnsulatedJoint where userId='" + userId + "'";
                getCount(querySql, callback);
            },
        },
        materialReducer: { // 大小头---------------------------------------------------------------
            add: function (materialReducerData, cb) {
                insertData("materialReducer", materialReducerData, cb);
            },
            get: function (obj, callback) {
                var userId = JSON.parse(localStorage.getItem("user")).oid;
                var querySql = "select oid as key,reducerCode as value from DaqMaterialReducer where isUse = 0 and userId='" + userId + "'";
                getData(querySql, callback);
            },
            getCount: function (callback) {
                var userId = JSON.parse(localStorage.getItem("user")).oid;
                var querySql = "select count(*) as total from DaqMaterialReducer where userId='" + userId + "'";
                getCount(querySql, callback);
            },
        },
        materialClosure: { // 封堵物---------------------------------------------------------------
            add: function (materialClosureData, cb) {
                insertData("materialClosure", materialClosureData, cb);
            },
            get: function (obj, callback) {
                var userId = JSON.parse(localStorage.getItem("user")).oid;
                var querySql = "select oid as key,closureCode as value from DaqMaterialClosure where isUse = 0 and userId='" + userId + "'";
                getData(querySql, callback);
            },
            getCount: function (callback) {
                var userId = JSON.parse(localStorage.getItem("user")).oid;
                var querySql = "select count(*) as total from DaqMaterialClosure where userId='" + userId + "'";
                getCount(querySql, callback);
            },
        },
        materialValve: { // 阀门---------------------------------------------------------------
            add: function (materialValveData, cb) {
                insertData("materialValve", materialValveData, cb);
            },
            get: function (obj, callback) {
                var userId = JSON.parse(localStorage.getItem("user")).oid;
                var querySql = "select oid as key,valveName as value from DaqMaterialValve where isUse = 0 and userId='" + userId + "'";
                getData(querySql, callback);
            },
            getCount: function (callback) {
                var userId = JSON.parse(localStorage.getItem("user")).oid;
                var querySql = "select count(*) as total from DaqMaterialValve where userId='" + userId + "'";
                getCount(querySql, callback);
            },
        },



        //----------------------------------------------------------施工机组和人员-----------------------------------------------
        workUnit: { // 施工机组---------------------------------------------------------------
            add: function (workUnitData, cb) {
                insertData("workUnit", workUnitData, cb);
            },
            get: function (obj, callback) {
                var userId = JSON.parse(localStorage.getItem("user")).oid;
                var types = "";
                if (obj.types == null || obj.types == "") {
                    return
                };
                var typeArr = obj.types.split(",");
                typeArr.forEach(function (item, index) {
                    if (index == typeArr.length - 1) {
                        types += "'" + item + "'";
                    } else {
                        types += "'" + item + "',";
                    }
                })
                var querySql = "select oid as key,workUnitName as value from DaqWorkUnit where userId='" + userId + "' and projectOid='" + obj.projectOid + "' and workUnitType in (" + types + ")";
                getData(querySql, callback);
            },
            getCount: function (callback) {
                var userId = JSON.parse(localStorage.getItem("user")).oid;
                var querySql = "select count(*) as total,lastUpdateTime from DaqWorkUnit where userId='" + userId + "'";
                getCount(querySql, callback);
            },
        },
        weldProduct: { // 焊接工艺规程---------------------------------------------------------------
            add: function (weldProductData, cb) {
                insertData("weldProduct", weldProductData, cb);
            },
            get: function (obj, callback) {
                var userId = JSON.parse(localStorage.getItem("user")).oid;
                //DaqWeldProduceSpecification(id INTEGER PRIMARY KEY AUTOINCREMENT,oid text,weldProduceCode text,projectOid text,userId text)
                var querySql = "select oid as key,weldProduceCode as value from DaqWeldProduceSpecification where userId='" + userId + "'";
                if ("" != obj.projectOid && null != obj.projectOid) {
                    querySql += " and projectOid='" + obj.projectOid + "'";
                };
                getData(querySql, callback);
            },
            getCount: function (callback) {
                var userId = JSON.parse(localStorage.getItem("user")).oid;
                var querySql = "select count(*) as total from DaqWeldProduceSpecification where userId='" + userId + "'";
                getCount(querySql, callback);
            },
        },
        workPersonnel: { // 机组人员---------------------------------------------------------------
            add: function (workPersonData, cb) {
                insertData("workPersonnel", workPersonData, cb);
            },
            get: function (obj, callback) {
                var userId = JSON.parse(localStorage.getItem("user")).oid;
                // DaqWorkPersonnel(id INTEGER PRIMARY KEY AUTOINCREMENT,oid text,personnelName text,workUnitOid text,personnelType text,userId text)",
                var querySql = "select oid as key,personnelName as value from DaqWorkPersonnel where userId='" + userId + "' and workUnitOid='" + obj.workUnitOid + "'";
                var types = "";
                if (obj.types != null && obj.types != "") {
                    var typeArr = obj.types.split(",");
                    typeArr.forEach(function (item, index) {
                        if (index == typeArr.length - 1) {
                            types += "'" + item + "'";
                        } else {
                            types += "'" + item + "',";
                        }
                    })
                    querySql += " and personnelType in (" + types + ")";
                };
                getData(querySql, callback);
            },
            getCount: function (callback) {
                var userId = JSON.parse(localStorage.getItem("user")).oid;
                var querySql = "select count(*) as total from DaqWorkPersonnel where userId='" + userId + "'";
                getCount(querySql, callback);
            },
        },



        //----------------------------------------------------------施工单位用户-----------------------------------------------
        priUser: { // 施工单位用户---------------------------------------------------------------
            add: function (priUserData, cb) {
                insertData("priUser", priUserData, cb);
            },
            get: function (obj, callback) {
                var userName = JSON.parse(localStorage.getItem("user")).userName;
                //priUser(id INTEGER PRIMARY KEY AUTOINCREMENT,userId text,userName text,loginName text,pwd text,unitId text,unitName text)
                var querySql = "select * from priUser where userName='" + userName + "'";
                getData(querySql, callback);
            },
            getCount: function (callback) {
                var userId = JSON.parse(localStorage.getItem("user")).oid;
                var querySql = "select count(*) as total,lastUpdateTime from priUser where userId='" + userId + "'";
                getCount(querySql, callback);
            },
        },



        //----------------------------------------------------------域值信息-----------------------------------------------
        sysDomain: { // 域值信息---------------------------------------------------------------
            add: function (sysDomainData, cb) {
                insertData("sysDomain", sysDomainData, cb);
            },
            get: function (obj, callback) {
                var querySql = "select codeId as key,codeName as value from DaqSysDomain where domainName='" + obj.domainName + "'";
                getData(querySql, callback);
            },
            getCount: function (callback) {
                var userId = JSON.parse(localStorage.getItem("user")).oid;
                var querySql = "select count(*) as total,lastUpdateTime from DaqSysDomain";
                getCount(querySql, callback);
            },
        },



        //----------------------------------------------------------线路物资检查-----------------------------------------------
        checkCoatingPipe: { // 防腐管检查---------------------------------------------------------------
            save: function (obj, callback) {
                var sqls = [];
                var userId = JSON.parse(localStorage.getItem("user")).oid;
                // obj.userId = userId;
                // alert(JSON.stringify(obj, 4, 4))
                sqls[0] = "insert into DaqCheckCoatingPipe (oid,pipeOid,projectOid,tendersOid,postData,state,userId) values " +
                    "('" + obj.oid + "','" + obj.pipe_oid + "','" + obj.project_oid + "','" + obj.tenders_oid + "','" + JSON.stringify(obj) + "',1,'" + userId + "')";
                var attachments = obj.attachment;
                if (attachments.length - 1 >= 0) {
                    attachments.forEach(function (item, index) {
                        sqls[index + 1] = "insert into DaqSysAttachment (oid,fileName,businessId,src,state) values ('" + item.oid + "','" + item.fileName + "','" + obj.oid + "','" + item.src + "',1)";
                    })
                };
                singleOperate("insert", sqls, callback);
            },
            update: function (obj, callback) {
                var sqls = [];
                var userId = JSON.parse(localStorage.getItem("user")).oid;
                obj.userId = userId;
                sqls[0] = "update DaqCheckCoatingPipe set pipeOid='" + obj.pipe_oid + "',projectOid='" + obj.project_oid + "'," +
                    "tendersOid='" + obj.tenders_oid + "',postData='" + JSON.stringify(obj) + "' where oid='" + obj.oid + "'";
                sqls[1] = "delete from DaqSysAttachment where businessId='" + obj.oid + "'";
                var attachments = obj.attachment;
                if (attachments.length - 1 >= 0) {
                    attachments.forEach(function (item, index) {
                        sqls[index + 2] = "insert into DaqSysAttachment (oid,fileName,businessId,src,state) values ('" + item.oid + "','" + item.fileName + "','" + obj.oid + "','" + item.src + "',1)";
                    })
                };
                singleOperate("update", sqls, callback)
            },
            deleteBatch: function (obj, callback) {
                var sqls = [];
                sqls[0] = "delete from DaqCheckCoatingPipe where oid in (" + obj.ids + ")";
                sqls[1] = "delete from DaqSysAttachment where businessId in (" + obj.ids + ")";
                singleOperate("delete", sqls, callback)
            },
            delete: function (obj, callback) {
                var sqls = [];
                sqls[0] = "delete from DaqCheckCoatingPipe where oid='" + obj.oid + "'";
                sqls[1] = "delete from DaqSysAttachment where businessId='" + obj.oid + "'";
                singleOperate("delete", sqls, callback)
            },
            query: function (obj, callback) {
                var querySql = "";
                var userId = JSON.parse(localStorage.getItem("user")).oid;
                if (obj.oid != null && obj.oid != "") {
                    querySql = "select * from DaqCheckCoatingPipe where oid='" + obj.oid + "'";
                } else {
                    querySql = "select * from DaqCheckCoatingPipe where state=1 and userId='" + userId + "' and projectOid='" + obj.projectOid + "'";
                }
                doubleQuery(querySql, callback)
            },
        },
        checkPipeColdBending: { // 冷弯管检查---------------------------------------------------------------
            save: function (obj, callback) {
                var sqls = [];
                var userId = JSON.parse(localStorage.getItem("user")).oid;
                obj.userId = userId;
                sqls[0] = "insert into DaqCheckPipeColdBending (oid,pipeColdBendingOid,projectOid,tendersOid,postData,state,userId) values " +
                    "('" + obj.oid + "','" + obj.pipeColdBendingOid + "','" + obj.projectOid + "','" + obj.tendersOid + "','" + JSON.stringify(obj) + "',1,'" + userId + "')";
                var attachments = obj.attachment;
                if (attachments.length - 1 >= 0) {
                    attachments.forEach(function (item, index) {
                        sqls[index + 1] = "insert into DaqSysAttachment (oid,fileName,businessId,src,state) values ('" + item.oid + "','" + item.fileName + "','" + obj.oid + "','" + item.src + "',1)";
                    })
                };
                singleOperate("insert", sqls, callback);
            },
            update: function (obj, callback) {
                var sqls = [];
                var userId = JSON.parse(localStorage.getItem("user")).oid;
                obj.userId = userId;
                sqls[0] = "update DaqCheckPipeColdBending set pipeColdBendingOid='" + obj.pipeColdBendingOid + "',projectOid='" + obj.projectOid + "'," +
                    "tendersOid='" + obj.tendersOid + "',postData='" + JSON.stringify(obj) + "' where oid='" + obj.oid + "'";
                sqls[1] = "delete from DaqSysAttachment where businessId='" + obj.oid + "'";
                var attachments = obj.attachment;
                if (attachments.length - 1 >= 0) {
                    attachments.forEach(function (item, index) {
                        sqls[index + 2] = "insert into DaqSysAttachment (oid,fileName,businessId,src,state) values ('" + item.oid + "','" + item.fileName + "','" + obj.oid + "','" + item.src + "',1)";
                    })
                };
                singleOperate("update", sqls, callback)
            },
            deleteBatch: function (obj, callback) {
                var sqls = [];
                sqls[0] = "delete from DaqCheckPipeColdBending where oid in (" + obj.ids + ")";
                sqls[1] = "delete from DaqSysAttachment where businessId in (" + obj.ids + ")";
                singleOperate("delete", sqls, callback)
            },
            delete: function (obj, callback) {
                var sqls = [];
                sqls[0] = "delete from DaqCheckPipeColdBending where oid='" + obj.oid + "'";
                sqls[1] = "delete from DaqSysAttachment where businessId='" + obj.oid + "'";
                singleOperate("delete", sqls, callback)
            },
            query: function (obj, callback) {
                var userId = JSON.parse(localStorage.getItem("user")).oid;
                var querySql = "";
                if (obj.oid != null && obj.oid != "") {
                    querySql = "select * from DaqCheckPipeColdBending where oid='" + obj.oid + "'";
                } else {
                    querySql = "select * from DaqCheckPipeColdBending where  state=1 and userId='" + userId + "' and projectOid='" + obj.projectOid + "'";
                };
                doubleQuery(querySql, callback)
            },
        },
        checkHotBends: { // 热煨弯管检查---------------------------------------------------------------
            save: function (obj, callback) {
                var sqls = [];
                var userId = JSON.parse(localStorage.getItem("user")).oid;
                obj.userId = userId;
                sqls[0] = "insert into DaqCheckHotBends (oid,hotBendOid,projectOid,tendersOid,postData,state,userId) values " +
                    "('" + obj.oid + "','" + obj.hot_bends_oid + "','" + obj.project_oid + "','" + obj.tenders_oid + "','" + JSON.stringify(obj) + "',1,'" + userId + "')";
                var attachments = obj.attachment;
                if (attachments.length - 1 >= 0) {
                    attachments.forEach(function (item, index) {
                        sqls[index + 1] = "insert into DaqSysAttachment (oid,fileName,businessId,src,state) values ('" + item.oid + "','" + item.fileName + "','" + obj.oid + "','" + item.src + "',1)";
                    })
                };
                singleOperate("insert", sqls, callback);
            },
            update: function (obj, callback) {
                var sqls = [];
                var userId = JSON.parse(localStorage.getItem("user")).oid;
                obj.userId = userId;
                sqls[0] = "update DaqCheckHotBends set hotBendOid='" + obj.hot_bends_oid + "',projectOid='" + obj.project_oid + "'," +
                    "tendersOid='" + obj.tenders_oid + "',postData='" + JSON.stringify(obj) + "' where oid='" + obj.oid + "'";
                sqls[1] = "delete from DaqSysAttachment where businessId='" + obj.oid + "'";
                var attachments = obj.attachment;
                if (attachments.length - 1 >= 0) {
                    attachments.forEach(function (item, index) {
                        sqls[index + 2] = "insert into DaqSysAttachment (oid,fileName,businessId,src,state) values ('" + item.oid + "','" + item.fileName + "','" + obj.oid + "','" + item.src + "',1)";
                    })
                };
                singleOperate("update", sqls, callback)
            },
            delete: function (obj, callback) {
                var sqls = [];
                sqls[0] = "delete from DaqCheckHotBends where oid='" + obj.oid + "'";
                sqls[1] = "delete from DaqSysAttachment where businessId='" + obj.oid + "'";
                singleOperate("delete", sqls, callback)
            },
            deleteBatch: function (obj, callback) {
                var sqls = [];
                sqls[0] = "delete from DaqCheckHotBends where oid in (" + obj.ids + ")";
                sqls[1] = "delete from DaqSysAttachment where businessId in (" + obj.ids + ")";
                singleOperate("delete", sqls, callback)
            },
            query: function (obj, callback) {
                var userId = JSON.parse(localStorage.getItem("user")).oid;
                var querySql = "";
                if (obj.oid != null && obj.oid != "") {
                    querySql = "select * from DaqCheckHotBends where oid='" + obj.oid + "'";
                } else {
                    querySql = "select * from DaqCheckHotBends where  state=1 and userId='" + userId + "' and projectOid='" + obj.projectOid + "'";
                }
                doubleQuery(querySql, callback)
            },
        },




        // -------------------------------------------------施工单位--------------------------------------------------------------
        constructUnit: { // 施工单位--------------------------------------------------------------------
            get: function (obj, callback) {
                var userBo = JSON.parse(localStorage.getItem("user"));
                var unitId = userBo.unitId;
                var arr = userBo.unitName.split('-->')
                var unitName = arr[arr.length - 1];
                var rows = [{
                    key: unitId,
                    value: unitName,
                }];
                var resultData = {
                    "status": 1,
                    "code": 200,
                    "msg": "ok",
                    "rows": []
                };
                resultData.rows = rows;
                callback(resultData);
            },
        },



        //-------------------------------------------------------------获取离线的采集待上传统计-------------------------------------------------------------------------------
        getOfflineUpload: {
            getOffline: function (obj, callback) {
                var dbOperation = new DataBaseOperation();
                var resultData = {
                    "status": 1,
                    "code": 200,
                    "msg": "ok",
                    "rows": []
                };
                var userId = JSON.parse(localStorage.getItem("user")).oid;
                var sqls = [];
                var index = 0;
                sqls[0] = "select count(*) as coating_pipe from DaqCheckCoatingPipe where userId='" + userId + "' and projectOid='" + obj.projectOid + "'";
                sqls[1] = "select count(*) as hot_bends from DaqCheckHotBends where userId='" + userId + "' and projectOid='" + obj.projectOid + "'";
                sqls[2] = "select count(*) as pipe_cold_bending from DaqCheckPipeColdBending where userId='" + userId + "' and projectOid='" + obj.projectOid + "'";
                sqls[3] = "select count(*) as anticorrosion_check from DaqWeldAnticorrosionCheck where userId='" + userId + "' and projectOid='" + obj.projectOid + "'";
                sqls.forEach(function (item, index) {
                    dbOperation.dbSelect(item, function (err, data) {
                        resultData.rows.push(JSON.parse(data)[0]);
                        if (index === sqls.length - 1) {
                            callback(resultData)
                        };
                    });
                })


            }
        },

        login: {
            loginByLocal: function (obj, callback) {
                var dbOperation = new DataBaseOperation();
                var resultData = {
                    "status": "1",
                    "code": 200,
                    "msg": "ok",
                    "rows": []
                };
                var loginName = obj.loginName;
                var pwd = obj.pwd;
                var sql = "select * from priUser t where loginName= '" + loginName + "' and pwd='" + pwd + "'";
                dbOperation.dbSelect(sql, function (err, data) {
                    if (JSON.parse(data)[0]) {
                        var obj = JSON.parse(data)[0];
                        obj.oid = obj.userId;
                        resultData.rows.push(obj);
                    } else {
                        resultData.status = "-1";
                        resultData.code = "400";
                        resultData.msg = "用户名或者密码错误";
                    }
                    callback(resultData)
                });
            },
            queryDefaultProject: function (callback) { //查找是否有默认企业 ;如果没有查找有几个项目 如果一个就设为默认
                var dbOperation = new DataBaseOperation();
                var that=this;
                var resultData = {
                    "status": 1,
                    "code": 200,
                    "msg": "ok",
                    "rows": []
                };
                var userId = JSON.parse(localStorage.getItem("user")).oid;
                sql = "select * from userAndProjectRelation where userId='" + userId + "'";
                dbOperation.dbSelect(sql, function (err, data) {
                    if (JSON.parse(data)[0]) {
                        resultData.rows.push(JSON.parse(data)[0]);
                         callback(resultData);
                    }else{
                     callback(resultData);
                    }
                });
            },
            setDefaultProject: function (obj, callback) {
                var dbOperation = new DataBaseOperation();
                var resultData = {
                    "status": "1",
                    "code": 200,
                    "msg": "ok",
                    "rows": []
                };
                var user = JSON.parse(localStorage.getItem("user"));
                sql = "insert into userAndProjectRelation (projectOid,projectName,userId,userName) values ('" + obj.projectOid + "','" + obj.projectName + "','" + user.oid + "','" + user.userName + "')";
                dbOperation.dbExec(sql, function (err) {
                    if (err == 0) {
                        callback(resultData)
                    } else {
                        resultData.status = "-1";
                        resultData.msg = "失败";
                        resultData.code = "400";
                        callback(resultData)
                    }

                });
            },
            updateDefaultProject: function (obj, callback) {

                var dbOperation = new DataBaseOperation();
                var resultData = {
                    "status": "1",
                    "code": 200,
                    "msg": "ok",
                    "rows": []
                };
                var user = JSON.parse(localStorage.getItem("user"));
                var sql = "update userAndProjectRelation set projectOid = '" + obj.projectOid + "', projectName ='" + obj.projectName + "' where userId='" + user.oid + "'";

                dbOperation.dbExec(sql, function (err) {
                    if (err == 0) {
                        callback(resultData)
                    } else {
                        resultData.status = "-1";
                        resultData.msg = "失败";
                        resultData.code = "400";
                        callback(resultData)
                    }
                });
            }
        },


        // ------------------------------------------防腐补口---------------------------------------------------------
        anticorrosionCheck: {

            save: function (obj, callback) {
                var sqls = [];
                var userId = JSON.parse(localStorage.getItem("user")).oid;
                obj.userId = userId;
                sqls[0] = "insert into DaqWeldAnticorrosionCheck (oid,weldOid,projectOid,tendersOid,pipelineOid,pipeSegmentOrCrossOid,postData,state,userId) values " +
                    "('" + obj.oid + "','" + obj.weld_oid + "','" + obj.project_oid + "','" + obj.tenders_oid + "','" + obj.pipeline_oid + "','" + obj.pipeSegmentOrCross_oid + "','" + JSON.stringify(obj) + "',1,'" + userId + "')";
                var attachments = obj.attachment;
                if (attachments.length - 1 >= 0) {
                    attachments.forEach(function (item, index) {
                        sqls[index + 1] = "insert into DaqSysAttachment (oid,fileName,businessId,src,state) values ('" + item.oid + "','" + item.fileName + "','" + obj.oid + "','" + item.src + "',1)";
                    })
                };
                singleOperate("insert", sqls, callback)
                // singleOperate("insert", sqls, function (data) {
                //     changeWelOidIsUseState(obj, 1, function (data) {
                //         alert("成功" + data);
                //         if (data == 1) {
                //             callback(resultData);
                //         }

                //     });
                // });
            },
            update: function (obj, callback) {
                var sqls = [];
                var userId = JSON.parse(localStorage.getItem("user")).oid;
                obj.userId = userId;
                sqls[0] = "update DaqWeldAnticorrosionCheck set weldOid='" + obj.weld_oid + "',projectOid='" + obj.project_oid + "',tendersOid='" + obj.tenders_oid + "'" +
                    ",pipelineOid='" + obj.pipeline_oid + "',pipeSegmentOrCrossOid='" + obj.pipeSegmentOrCross_oid + "',postData='" + JSON.stringify(obj) + "' where oid='" + obj.oid + "'";
                sqls[1] = "delete from DaqSysAttachment where businessId='" + obj.oid + "'";
                var attachments = obj.attachment;
                if (attachments.length - 1 >= 0) {
                    attachments.forEach(function (item, index) {
                        sqls[index + 2] = "insert into DaqSysAttachment (oid,fileName,businessId,src,state) values ('" + item.oid + "','" + item.fileName + "','" + obj.oid + "','" + item.src + "',1)";
                    })
                };
                singleOperate("update", sqls, callback)
                // singleOperate("update", sqls, function (data) {
                //     changeWelOidIsUseState(obj.history, 0, function () {
                //         changeWelOidIsUseState(obj, 1, function () {
                //             callback(data);
                //         });
                //     });
                // });
            },
            delete: function (obj, callback) {
                var sqls = [];
                sqls[0] = "delete from DaqWeldAnticorrosionCheck where oid='" + obj.oid + "'";
                sqls[1] = "delete from DaqSysAttachment where businessId='" + obj.oid + "'";
                singleOperate("delete", sqls, callback)
                // if (obj.object) {
                //     alert("删除操作");
                //     singleOperate("delete", sqls, function (data) {
                //         changeWelOidIsUseState(obj.object, 0, function () {
                //             callback(data);
                //         });
                //     });
                // } else {
                //     singleOperate("delete", sqls, callback);
                // }

            },
            deleteBatch: function (obj, callback) {
                var sqls = [];
                sqls[0] = "delete from DaqWeldAnticorrosionCheck where oid in (" + obj.ids + ")";
                sqls[1] = "delete from DaqSysAttachment where businessId in (" + obj.ids + ")";
                singleOperate("delete", sqls, callback)
                // singleOperate("delete", sqls, function (data) {
                //     var i = 0;
                //     obj.objectList.forEach(function (item, index) {
                //         changeWelOidIsUseState(item, 0, function () {
                //             if (i == obj.objectList.length) {
                //                 callback(data);
                //             }
                //             i++;
                //         })
                //     });
                //     // changeWelOidIsUseState(obj.objectList, 0, function () {
                //     //     callback(data);
                //     // });
                // });
            },
            query: function (obj, callback) {
                var userId = JSON.parse(localStorage.getItem("user")).oid;
                var querySql = "";
                if (obj.oid != null && obj.oid != "") {
                    querySql = "select * from DaqWeldAnticorrosionCheck where oid='" + obj.oid + "'";
                } else {
                    querySql = "select * from DaqWeldAnticorrosionCheck where  state=1 and userId='" + userId + "' and projectOid='" + obj.projectOid + "'";
                }
                doubleQuery(querySql, function (data) {
                    appcan.logs(data);
                    callback(data);
                })
            },

        },
        // ------------------------------------------焊口记录---------------------------------------------------------
        constructWeld: {
            pipeFittingInfo: [{
                "frontPipeType": "pipe_type_code_001",
                "frontPipeOid": "d5084180-a600-402a-8264-d412c2c1ea04",
                "backPipeType": "pipe_type_code_0081",
                "backPipeOid": "dc0a22d7-1965-45a2-9868-fbf7b66ba211",
            }],
            // pipeFittingInfo:[
            // {
            // "frontPipeType":"pipe_type_code_001",
            // "frontPipeOid":"4269f71d-9069-408f-8bd0-f7092d43716c",
            // "backPipeType":"pipe_type_code_0081",
            // "backPipeOid":"00ececcb-0a1d-40f5-b33d-61349631eb82",
            // }
            // ],
            save: function (obj, callback) {
                var sqls = [];
                var userId = JSON.parse(localStorage.getItem("user")).oid;
                obj.userId = userId;
                try {
                    uexArcGisRuntime.addConstructionWeld(JSON.stringify(obj), function (err, info) {
                        if (err == 1) {
                            var attachments = obj.attachment;
                            if (attachments.length - 1 >= 0) {
                                attachments.forEach(function (item, index) {
                                    sqls[index] = "insert into DaqSysAttachment (oid,fileName,businessId,src,state) values ('" + item.oid + "','" + item.fileName + "','" + obj.oid + "','" + item.src + "',1)";
                                })
                            };
                            singleOperate("insert", sqls, function (data) {
                                changeIsUseState(obj, 1, 1, function () {
                                    callback(data)
                                });
                            });
                        }else{
                            var result = {
                                "status": -1,   
                                "code": 406,
                                "msg": "error"
                            }
                            callback(result);
                        }
                    });
                } catch (e) {
                    alert(e);
                }
            },
            update: function (obj, callback) {
                var that = this
                var sqls = [];
                var userId = JSON.parse(localStorage.getItem("user")).oid;
                obj.userId = userId;
                try {
                    uexArcGisRuntime.updateConstructionWeld(JSON.stringify(obj), function (err, info) {
                        if (err == 1) {
                            var attachments = obj.attachment;
                            sqls[0] = "delete from DaqSysAttachment where businessId='" + obj.oid + "'";
                            if (attachments.length - 1 >= 0) {
                                attachments.forEach(function (item, index) {
                                    sqls[index + 1] = "insert into DaqSysAttachment (oid,fileName,businessId,src,state) values ('" + item.oid + "','" + item.fileName + "','" + obj.oid + "','" + item.src + "',1)";
                                })
                            };
                            singleOperate("update", sqls, function (data) {
                                changeIsUseState(that.pipeFittingInfo[0], 0, 0, function () {
                                    changeIsUseState(obj, 1, 1, function () {
                                        callback(data);
                                    });
                                });
                            })
                        };
                    });
                } catch (e) {
                    alert(e);
                }
            },
            delete: function (obj, callback) {
                var that = this
                var sqls = [];
                var deleteType = obj.deleteType || 1;
                try {
                    uexArcGisRuntime.deleteConstructionWeld(obj.oid, deleteType, function (err, info) {
                        if (err == 1) {
                            sqls[0] = "delete from DaqSysAttachment where businessId='" + obj.oid + "'";
                            singleOperate("delete", sqls, function (data) {
                                changeIsUseState(that.pipeFittingInfo[0], 0, 0, function () {
                                    callback(data);
                                });
                            })
                        };
                    });
                } catch (e) {
                    alert(e);
                }
            },
            deleteBatch: function (obj, callback) {
                var that = this
                var sqls = [];
                var ids = obj.ids.split(',');
                ids.forEach(function (oid, index) {
                    try {
                        oid = oid.substring(1, oid.length - 1);
                        uexArcGisRuntime.deleteConstructionWeld(oid, 0, function (err, info) {
                            if (err == 1) {
                                sqls[0] = "delete from DaqSysAttachment where businessId='" + obj.oid + "'";
                                singleOperate("delete", sqls, function (data) {
                                    changeIsUseState(that.pipeFittingInfo[index], 0, 0, function () {
                                        if (index == ids.length - 1) {
                                            callback(data);
                                        };
                                    });
                                })
                            };
                        });
                    } catch (e) {
                        alert(e);
                    }
                })
            },
            query: function (obj, callback) {
                var that = this;
                var resultData = {
                    "status": 1,
                    "code": 200,
                    "msg": "ok",
                    "rows": []
                };
                var userId = JSON.parse(localStorage.getItem("user")).oid;
                if (obj.oid != null && obj.oid != "") {
                    var param = {};
                    param.oid = obj.oid;
                    try {
                        uexArcGisRuntime.queryConstructionWeld(JSON.stringify(param), function (err, info) {
                            if (err == 1) {
                                var weldInfo = JSON.parse(info.data);
                                that.pipeFittingInfo[0].frontPipeOid = weldInfo[0].frontPipeOid;
                                that.pipeFittingInfo[0].frontPipeType = weldInfo[0].frontPipeType;
                                that.pipeFittingInfo[0].backPipeOid = weldInfo[0].backPipeOid;
                                that.pipeFittingInfo[0].backPipeType = weldInfo[0].backPipeType;
                                resultData.rows = weldInfo;
                                callback(resultData);
                            };
                        });
                    } catch (e) {
                        alert(e);
                    }
                } else {
                    obj.userId = userId;
                    try {
                        uexArcGisRuntime.queryConstructionWeld(JSON.stringify(obj), function (err, info) {
                            if (err == 1) {
                                if (info.data != "" && info.data != null) {
                                    var weldsInfo = JSON.parse(info.data);
                                    weldsInfo.forEach(function (weldInfo, index) {
                                        var pipeFitting = [];
                                        pipeFitting.frontPipeOid = weldInfo.frontPipeOid;
                                        pipeFitting.frontPipeType = weldInfo.frontPipeType;
                                        pipeFitting.backPipeOid = weldInfo.backPipeOid;
                                        pipeFitting.backPipeType = weldInfo.backPipeType;
                                        that.pipeFittingInfo.push(pipeFitting);
                                        resultData.rows.push(weldInfo);
                                        if (index == weldsInfo.length - 1) {
                                            callback(resultData);
                                        };
                                    })
                                } else {
                                    callback(resultData);
                                }
                            } else {
                                resultData.status = -1;
                                resultData.code = 406;
                                resultData.msg = "查询失败";
                                callback(resultData);
                            }
                        });
                    } catch (e) {
                        alert(e);
                    }
                }
            },
        },

        /**
         * ---------------------------------------------------------------------------------------------------------------------------------
         */


        // -------------------------------------------------------焊口测量--------------------------------------------------------------------------
        weldMeasured: {
            result: {
                "status": -1,
                "code": 406,
                "msg": "error"
            },
            save: function (obj, callback) {
                var that = this;
                var sqls = [];
                var userId = JSON.parse(localStorage.getItem("user")).oid;
                obj.userId = userId;
                try {
                    uexArcGisRuntime.addWeldMeasured(JSON.stringify(obj), function (err, info) {
                        if (err == 1) {
                            var attachments = obj.attachment;
                            if (attachments.length - 1 >= 0) {
                                attachments.forEach(function (item, index) {
                                    sqls[index] = "insert into DaqSysAttachment (oid,fileName,businessId,src,state) values ('" + item.oid + "','" + item.fileName + "','" + obj.oid + "','" + item.src + "',1)";
                                })
                            };
                            singleOperate("insert", sqls, function (data) {
                                callback(data);
                            });
                        } else {
                            callback(that.result);
                        }
                    });
                } catch (e) {
                    alert(e);
                }
            },
            update: function (obj, callback) {
                var that = this;
                var sqls = [];
                var userId = JSON.parse(localStorage.getItem("user")).oid;
                obj.userId = userId;
                try {
                    uexArcGisRuntime.updateWeldMeasured(JSON.stringify(obj), function (err, info) {
                        if (err == 1) {
                            var attachments = obj.attachment;
                            sqls[0] = "delete from DaqSysAttachment where businessId='" + obj.oid + "'";
                            if (attachments.length - 1 >= 0) {
                                attachments.forEach(function (item, index) {
                                    sqls[index + 1] = "insert into DaqSysAttachment (oid,fileName,businessId,src,state) values ('" + item.oid + "','" + item.fileName + "','" + obj.oid + "','" + item.src + "',1)";
                                })
                            };
                            singleOperate("update", sqls, function (data) {
                                callback(data);
                            })
                        } else {
                            callback(that.result);
                        }
                    });
                } catch (e) {
                    alert(e);
                }
            },
            delete: function (obj, callback) {
                var that = this;
                var sqls = [];
                var deleteType = obj.deleteType || 1;

                try {
                    uexArcGisRuntime.deleteWeldMeasured(obj.oid, deleteType, function (err, info) {
                        if (err == 1) {
                            sqls[0] = "delete from DaqSysAttachment where businessId='" + obj.oid + "'";
                            singleOperate("delete", sqls, function (data) {
                                callback(data);
                            })
                        } else {
                            callback(that.result);
                        }
                    });
                } catch (e) {
                    alert(e);
                }
            },
            deleteBatch: function (obj, callback) {
                var that = this;
                var sqls = [];
                var ids = obj.ids.split(',');
                ids.forEach(function (oid, index) {
                    try {
                        oid = oid.substring(1, oid.length - 1);
                        uexArcGisRuntime.deleteWeldMeasured(oid, 0, function (err, info) {
                            if (err == 1) {
                                sqls[0] = "delete from DaqSysAttachment where businessId='" + oid + "'";
                                singleOperate("delete", sqls, function (data) {
                                    if (index == ids.length - 1) {
                                        callback(data);
                                    };
                                })
                            } else {
                                callback(that.result);
                            }
                        });
                    } catch (e) {
                        alert(e);
                    }
                })
            },
            query: function (obj, callback) {
                var resultData = {
                    "status": 1,
                    "code": 200,
                    "msg": "ok",
                    "rows": []
                };
                var userId = JSON.parse(localStorage.getItem("user")).oid;
                if (obj.oid != null && obj.oid != "") {
                    var param = {};
                    param.oid = obj.oid;
                    try {
                        uexArcGisRuntime.queryWeldMeasured(JSON.stringify(param), function (err, info) {
                            if (err == 1) {
                                if (info.data != "" && info.data != null) {
                                    var weldInfo = JSON.parse(info.data);
                                    resultData.rows = weldInfo;
                                    callback(resultData);
                                } else {
                                    callback(resultData);
                                };
                            } else {
                                resultData.status = -1;
                                resultData.code = 406;
                                resultData.msg = "查询失败";
                                callback(resultData);
                            };
                        });
                    } catch (e) {
                        alert(e);
                    }
                } else {
                    obj.userId = userId;
                    try {
                        uexArcGisRuntime.queryWeldMeasured(JSON.stringify(obj), function (err, info) {
                            if (err == 1) {
                                if (info.data != "" && info.data != null) {
                                    var weldsInfo = JSON.parse(info.data);
                                    weldsInfo.forEach(function (weldInfo, index) {
                                        resultData.rows.push(weldInfo);
                                        if (index == weldsInfo.length - 1) {
                                            callback(resultData);
                                        };
                                    })
                                } else {
                                    callback(resultData);
                                }
                            } else {
                                resultData.status = -1;
                                resultData.code = 406;
                                resultData.msg = "查询失败";
                                callback(resultData);
                            }
                        });
                    } catch (e) {
                        alert(e);
                    }
                }
            },
        },


        // --------------------------------------------------------焊口返修-------------------------------------------------------------------------------------
        reworkWeld: {
            result: {
                "status": -1,
                "code": 406,
                "msg": "error"
            },
            weldOids: [{
                "weldOid":""
            }],
            save: function (obj, callback) {
                var that = this;
                var sqls = [];
                var userId = JSON.parse(localStorage.getItem("user")).oid;
                var weldOid = obj.weldOid;
                obj.userId = userId;
                try {
                    uexArcGisRuntime.addReworkWeld(JSON.stringify(obj), function (err, info) {
                        if (err == 1) {
                            var attachments = obj.attachment;
                            if (attachments.length - 1 >= 0) {
                                attachments.forEach(function (item, index) {
                                    sqls[index] = "insert into DaqSysAttachment (oid,fileName,businessId,src,state) values ('" + item.oid + "','" + item.fileName + "','" + obj.oid + "','" + item.src + "',1)";
                                })
                            };
                            singleOperate("insert", sqls, function (data) {
                                uexArcGisRuntime.changeReworkStatus(weldOid,1,function(err,info){
                                    if (err == 1) {
                                        callback(data);
                                    } else{
                                        callback(data);
                                    };
                                });
                            });
                        } else {
                            callback(that.result);
                        }
                    });
                } catch (e) {
                    alert(e);
                }
            },
            update: function (obj, callback) {
                var that = this;
                var sqls = [];
                var userId = JSON.parse(localStorage.getItem("user")).oid;
                obj.userId = userId;
                try {
                    uexArcGisRuntime.updateReworkWeld(JSON.stringify(obj), function (err, info) {
                        if (err == 1) {
                            var attachments = obj.attachment;
                            sqls[0] = "delete from DaqSysAttachment where businessId='" + obj.oid + "'";
                            if (attachments.length - 1 >= 0) {
                                attachments.forEach(function (item, index) {
                                    sqls[index + 1] = "insert into DaqSysAttachment (oid,fileName,businessId,src,state) values ('" + item.oid + "','" + item.fileName + "','" + obj.oid + "','" + item.src + "',1)";
                                })
                            };
                            singleOperate("update", sqls, function (data) {
                                //先将原焊口is_rework改为0
                                uexArcGisRuntime.changeReworkStatus(that.weldOids[0].weldOid,0,function(err,info){
                                    if (err == 1) {
                                        //再将新选中的焊口is_rework改为1
                                        uexArcGisRuntime.changeReworkStatus(obj.weldOid,1,function(err,info){
                                            if (err == 1) {
                                                callback(data);
                                            } else{
                                                callback(data);
                                            };
                                        });
                                    } else{
                                        callback(data);
                                    };
                                });
                            })
                        } else {
                            callback(that.result);
                        }
                    });
                } catch (e) {
                    alert(e);
                }
            },
            delete: function (obj, callback) {
                var that = this;
                var sqls = [];
                var deleteType = obj.deleteType || 1;
                try {
                    uexArcGisRuntime.deleteReworkWeld(obj.oid, deleteType, function (err, info) {
                        if (err == 1) {
                            sqls[0] = "delete from DaqSysAttachment where businessId='" + obj.oid + "'";
                            singleOperate("delete", sqls, function (data) {
                                uexArcGisRuntime.changeReworkStatus(that.weldOids[0].weldOid,0,function(err,info){
                                    if (err == 1) {
                                        callback(data);
                                    } else{
                                        callback(data);
                                    };
                                });
                            })
                        } else {
                            callback(that.result);
                        }
                    });
                } catch (e) {
                    alert(e);
                }
            },
            deleteBatch: function (obj, callback) {
                var that = this;
                var sqls = [];
                var ids = obj.ids.split(',');
                ids.forEach(function (oid, index) {
                    try {
                        oid = oid.substring(1, oid.length - 1);
                        uexArcGisRuntime.deleteReworkWeld(oid, 0, function (err, info) {
                            if (err == 1) {
                                sqls[0] = "delete from DaqSysAttachment where businessId='" + oid + "'";
                                singleOperate("delete", sqls, function (data) {
                                    //将对应选中的weldOid的is_rework改为0
                                    uexArcGisRuntime.changeReworkStatus(that.weldOids[index].weldOid,0,function(err,info){
                                        if (err == 1) {
                                            if (index == ids.length - 1) {
                                                callback(data);
                                            };
                                        } else{
                                            callback(data);
                                        };
                                    });
                                    
                                })
                            } else {
                                callback(that.result);
                            }
                        });
                    } catch (e) {
                        alert(e);
                    }
                })
            },
            query: function (obj, callback) {
                var resultData = {
                    "status": 1,
                    "code": 200,
                    "msg": "ok",
                    "rows": []
                };
                var that = this;
                var userId = JSON.parse(localStorage.getItem("user")).oid;
                if (obj.oid != null && obj.oid != "") {
                    var param = {};
                    param.oid = obj.oid;
                    try {
                        uexArcGisRuntime.queryReworkWeld(JSON.stringify(param), function (err, info) {
                            if (err == 1) {
                                if (info.data != "" && info.data != null) {
                                    var weldInfo = JSON.parse(info.data);
                                    that.weldOids[0].weldOid = weldInfo[0].weldOid;
                                    resultData.rows = weldInfo;
                                    callback(resultData);
                                } else {
                                    callback(resultData);
                                };
                            } else {
                                resultData.status = -1;
                                resultData.code = 406;
                                resultData.msg = "查询失败";
                                callback(resultData);
                            };
                        });
                    } catch (e) {
                        alert(e);
                    }
                } else {
                    obj.userId = userId;
                    try {
                        uexArcGisRuntime.queryReworkWeld(JSON.stringify(obj), function (err, info) {
                            if (err == 1) {
                                if (info.data != "" && info.data != null) {
                                    var weldsInfo = JSON.parse(info.data);
                                    weldsInfo.forEach(function (weldInfo, index) {
                                        var weldOidObj = [];
                                        weldOidObj.weldOid = weldInfo.weldOid;
                                        that.weldOids.push(weldOidObj);
                                        resultData.rows.push(weldInfo);
                                        if (index == weldsInfo.length - 1) {
                                            callback(resultData);

                                        };
                                    })
                                } else {
                                    callback(resultData);
                                }
                            } else {
                                resultData.status = -1;
                                resultData.code = 406;
                                resultData.msg = "查询失败";
                                callback(resultData);
                            }
                        });
                    } catch (e) {
                        alert(e);
                    }
                }
            },
        },

        queryPipeFittingList: {
            get: function (obj, callback) {
                var that = this;
                var resultData = {
                    "status": 1,
                    "code": 200,
                    "msg": "查询成功",
                    "rows": []
                };
                var projectOid = localStorage.getItem("defaultProject");
                // var pipeSegmentOrCrossOid = obj.pipeSegmentOrCrossOid;
                var pipeTypeCode = obj.frontPipeType || obj.backPipeType;
                var userId = JSON.parse(localStorage.getItem("user")).oid;
                var sql = "";
                switch (pipeTypeCode) {
                    case "pipe_type_code_001":
                        //前直钢管
                        sql = "select oid as key,pipeCode as value from DaqMaterialPipe  where frontIsUse=0 and isColdBend=0 and projectOid='" + projectOid + "'";
                        break;
                    case "pipe_type_code_0011":
                        //后直钢管
                        sql = "select oid as key,pipeCode as value from DaqMaterialPipe  where backIsUse=0 and isColdBend=0 and projectOid='" + projectOid + "'";
                        break;
                    case "pipe_type_code_002":
                        //前热煨弯管
                        sql = "select oid as key,hotBendsCode as value from DaqMaterialHotBends  where frontIsUse=0 and projectOid='" + projectOid + "'";
                        break;
                    case "pipe_type_code_0021":
                        //后热煨弯管
                        sql = "select oid as key,hotBendsCode as value from DaqMaterialHotBends  where backIsUse=0 and projectOid='" + projectOid + "'";
                        break;
                    case "pipe_type_code_003":
                        //三通
                        sql = "select oid as key,teeCode as value from DaqMaterialTee  where projectOid='" + projectOid + "'";
                        break;
                    case "pipe_type_code_004":
                        //阀门
                        sql = "select oid as key,valveName from DaqMaterialValve  where projectOid='" + projectOid + "'";
                        break;
                    case "pipe_type_code_005":
                        //绝缘接头
                        sql = "select oid as key,manufacturerCode as value from DaqMaterialJnsulatedJoint   where  projectOid='" + projectOid + "'";
                        break;
                    case "pipe_type_code_006":
                        //大小头
                        sql = "select oid as key,reducerCode as value from DaqMaterialReducer   where projectOid='" + projectOid + "'";
                        break;
                    case "pipe_type_code_007":
                        //封堵物
                        sql = "select oid as key,closureCode as value from DaqMaterialClosure  where  projectOid='" + projectOid + "'";
                        break;
                    case "pipe_type_code_008":
                        //前冷弯管
                        sql = "select oid as key,clodBendingPipeCode as value from DaqClodBendingPipe   where frontIsUse=0 and projectOid='" + projectOid + "' and approveStatus=2";
                        break;
                    case "pipe_type_code_0081":
                        //后冷弯管
                        sql = "select oid as key,clodBendingPipeCode as value from DaqClodBendingPipe   where backIsUse=0 and projectOid='" + projectOid + "' and approveStatus=2";
                        break;
                }

                if (sql == "") {
                    resultData.status = -1;
                    resultData.code = 406;
                    resultData.msg = "查询失败";
                    callback(resultData);
                    return;
                } else {
                    sql += " and userId='" + userId + "'";
                }
                var dbOperation = new DataBaseOperation();
                dbOperation.dbSelect(sql, function (err, data) {
                    if (err == 0) {
                        resultData.rows = JSON.parse(data);
                        callback(resultData);
                    } else {
                        resultData.status = -1;
                        resultData.code = 406;
                        resultData.msg = "查询失败";
                        callback(resultData);
                    };
                });
            }
        },
        medianStake: {
            get: function (obj, callback) {
                var resultData = {
                    "status": 1,
                    "code": 200,
                    "msg": "查询成功",
                    "rows": []
                };
                var userId = JSON.parse(localStorage.getItem("user")).oid;
                obj.userId = userId;
                try {
                    uexArcGisRuntime.getMedianStakeList(JSON.stringify(obj), function (err, info) {
                        if (err == 1) {
                            if (info.data.length > 0) {
                                resultData.rows = info.data;
                                callback(resultData)
                            } else {
                                callback(resultData)
                            }
                        } else {
                            resultData.status = -1;
                            resultData.code = 406;
                            resultData.msg = "error";
                            callback(resultData)
                        }
                    });
                } catch (e) {
                    alert(e);
                }
            },
            getCount: function (callback) {
                try {
                    uexArcGisRuntime.getMedianStakeSynInfo(function (err, info) {
                        if (err == 1) {
                            callback(info.data)
                        } else {
                            var result = {
                                count: -1
                            }
                            callback(result)
                        }
                    });
                } catch (e) {
                    alert(e);
                }
            },
            sync: function (callback) {
                try {
                    uexArcGisRuntime.synMedianStakeData(function (err, info) {
                        if (err == 1) {
                            callback(info.data)
                        } else {
                            var result = {
                                count: -1
                            }
                            callback(result)
                        }
                    });
                } catch (e) {
                    alert(e);
                }
            },
        },
        constructionWeld: {
            get: function (obj, callback) {
                var resultData = {
                    "status": 1,
                    "code": 200,
                    "msg": "查询成功",
                    "rows": []
                };
                var userId = JSON.parse(localStorage.getItem("user")).oid;
                obj.userId = userId;
                obj.type = 1;
                try {
                    uexArcGisRuntime.getWeldList(JSON.stringify(obj), function (err, info) {
                        if (err == 1) {
                            if (info.data.length > 0) {
                                resultData.rows = info.data;
                                callback(resultData)
                            } else {
                                callback(resultData)
                            }
                        } else {
                            resultData.status = -1;
                            resultData.code = 406;
                            resultData.msg = "error";
                            callback(resultData)
                        }
                    });
                } catch (e) {
                    alert(e);
                }
            },
            getCount: function (callback) {
                try {
                    uexArcGisRuntime.getConstructionWeldSynInfo(function (err, info) {
                        if (err == 1) {
                            callback(info.data)
                        } else {
                            var result = {
                                count: -1
                            }
                            callback(result)
                        }
                    });
                } catch (e) {
                    alert(e);
                }
            },
            sync: function (callback) {
                try {
                    uexArcGisRuntime.synConstructionWeldData(function (err, info) {
                        if (err == 1) {
                            callback(info.data)
                        } else {
                            var result = {
                                count: -1
                            }
                            callback(result)
                        }
                    });
                } catch (e) {
                    alert(e);
                }
            }

        },
        weldAndRework: {
            get: function (obj, callback) {
                var resultData = {
                    "status": 1,
                    "code": 200,
                    "msg": "查询成功",
                    "rows": []
                };
                var userId = JSON.parse(localStorage.getItem("user")).oid;
                obj.userId = userId;
                obj.type = 2;
                try {
                    uexArcGisRuntime.getWeldList(JSON.stringify(obj), function (err, info) {
                        if (err == 1) {
                            if (info.data.length > 0) {
                                resultData.rows = info.data;
                                callback(resultData)
                            } else {
                                callback(resultData)
                            }
                        } else {
                            resultData.status = -1;
                            resultData.code = 406;
                            resultData.msg = "error";
                            callback(resultData)
                        }
                    });
                } catch (e) {
                    alert(e);
                }
            },
            getCount: function (callback) {
                try {
                    uexArcGisRuntime.getReworkWeldSynInfo(function (err, info) {
                        if (err == 1) {
                            callback(info.data)
                        } else {
                            var result = {
                                count: -1
                            }
                            callback(result)
                        }
                    });
                } catch (e) {
                    alert(e);
                }
            },
            sync: function (callback) {
                try {
                    uexArcGisRuntime.synReworkWeldData(function (err, info) {
                        if (err == 1) {
                            callback(info.data)
                        } else {
                            var result = {
                                count: -1
                            }
                            callback(result)
                        }
                    });
                } catch (e) {
                    alert(e);
                }
            }
        },
        userFaceInfo: {
            getUserFaceCount: function (obj, callback) {
                var querySql = "select count(*) as total from DaqUserFaceInfo where login_name='"+obj.loginName+"'";
                getData(querySql,callback); 
            },
        }
    };
    return obj;
})(jasTools, DataBaseOperation);




// -------------------------------------------前后管件状态修改---------------------------------------------------------
/**
 * 修改前后管件状态
 * @param {String} type 操作类型，afterSave，beforeUpdate，afterUpdate，beforeDelete
 * @param {Object} obj  传参，不同操作类型不一致
 *                          afterSave：obj是postData
 *                          beforeUpdate：obj是在query后封装的索引为0的前后管件的类型和oid
 *                          afterUpdate：obj是修改后的postData
 *                          beforeDelete：obj是在query后封装的的前后管件的类型和oid数组
 * @param {Function} callback 回调函数
 */
// function changeMaterialState(type,obj,callback){
// switch(type){
// case "afterSave":
// //保存后，obj是postData
// changeIsUseState(obj,1,1,callback);
// break;
// case "beforeUpdate":
// //修改前，obj是在query后封装的索引为0的前后管件的类型和oid
// changeIsUseState(obj,0,0,callback);
// break;
// case "afterUpdate":
// //修改后，obj是修改后的postData
// changeIsUseState(obj,1,1,callback);
// break;
// case "beforeDelete":
// //删除前，obj是在query后封装的的前后管件的类型和oid数组
// obj.forEach(function(item,index){
// changeIsUseState(item,0,0,callback);
// })
// break;
// default:
// callback({"msg":"ok"})
// break;
// }
// }


/**
 * 修改焊口前后管件状态
 * @param {Object} obj 焊口对象
 * @param {Integer} frontIsUse 前管件使用
 * @param {Integer} backIsUse  后管件使用
 */
function changeIsUseState(obj, frontIsUse, backIsUse, callback) {
    var sqls = [];
    switch (obj.frontPipeType) {
        case "pipe_type_code_001": //直钢管-->前
            sqls[0] = "update DaqMaterialPipe set frontIsUse=" + frontIsUse + " where oid='" + obj.frontPipeOid + "'";
            break;
        case "pipe_type_code_008": //冷弯管-->前
            sqls[0] = "update DaqClodBendingPipe set frontIsUse=" + frontIsUse + " where oid='" + obj.frontPipeOid + "'";
            break;
        case "pipe_type_code_002": //热煨弯管-->前
            sqls[0] = "update DaqMaterialHotBends set frontIsUse=" + frontIsUse + " where oid='" + obj.frontPipeOid + "'";
            break;
        default:
            sqls[0] = ""
            break;
    }
    switch (obj.backPipeType) {
        case "pipe_type_code_0011": //直钢管-->后
            sqls[1] = "update DaqMaterialPipe set backIsUse=" + backIsUse + " where oid='" + obj.backPipeOid + "'";
            break;
        case "pipe_type_code_0081": //冷弯管-->后
            sqls[1] = "update DaqClodBendingPipe set backIsUse=" + backIsUse + " where oid='" + obj.backPipeOid + "'";
            break;
        case "pipe_type_code_0021": //热煨弯管-->后
            sqls[1] = "update DaqMaterialHotBends set backIsUse=" + backIsUse + " where oid='" + obj.backPipeOid + "'";
            break;
        default:
            sqls[1] = ""
            break;
    }
    singleOperate("update", sqls, callback);
}



/**
 * 修改补口记录中 焊口使用状态
 * @param {Object} obj 补口对象
 */
function changeWelOidIsUseState(obj, status, callback) {
    var param = {
        oid: obj.weld_oid,
        status: status
    };
    try {
        uexArcGisRuntime.changeAnticorrosionCheckStatus(JSON.stringify(param), function (err, info) {
            callback(err);
        });
    } catch (e) {
        alert(e);
    }
}