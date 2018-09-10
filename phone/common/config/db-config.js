init_sql = ["create table if not exists DaqProject (id INTEGER PRIMARY KEY AUTOINCREMENT,oid text,name text,userId text)",//项目表
            "create table if not exists DaqTenders (id INTEGER PRIMARY KEY AUTOINCREMENT,oid text,name text,porjectOid text,userId text)",//标段表
            "create table if not exists DaqPipeline (id INTEGER PRIMARY KEY AUTOINCREMENT,oid text,name text,tendersOid text,userId text)",//管线表
            "create table if not exists DaqPipeSegmentOrCross (id INTEGER PRIMARY KEY AUTOINCREMENT,oid text,name text,pipelineOid text,userId text)",//线路段和穿跨越列表
            "create table if not exists DaqSupervisionUnit (id INTEGER PRIMARY KEY AUTOINCREMENT,oid text,name text,tendersOid text,userId text)",//监理单位
            //"create table if not exists DaqMedianStake (id INTEGER PRIMARY KEY AUTOINCREMENT,oid text,stakeCode text,pipeSegmentOrCrossOid text,userId text)",//中线桩列表
            "create table if not exists DaqMaterialPipe (id INTEGER PRIMARY KEY AUTOINCREMENT,oid text,pipeCode text,userId text,isUes integer,isColdBend integer)",//钢管表
            "create table if not exists DaqClodBendingPipe (id INTEGER PRIMARY KEY AUTOINCREMENT,oid text,clodBendingPipeCode text,userId text,tendersOid text,isUes integer)",//冷弯管表
            "create table if not exists DaqMaterialHotBends (id INTEGER PRIMARY KEY AUTOINCREMENT,oid text,hotBendsCode text,userId text,isUes integer)",//热煨弯管表
            "create table if not exists DaqMaterialTee (id INTEGER PRIMARY KEY AUTOINCREMENT,oid text,teeCode text,userId text,isUes integer)",//三通表
            "create table if not exists DaqMaterialJnsulatedJoint (id INTEGER PRIMARY KEY AUTOINCREMENT,oid text,manufacturerCode text,userId text,isUes integer)",//绝缘接头
            "create table if not exists DaqMaterialReducer (id INTEGER PRIMARY KEY AUTOINCREMENT,oid text,reducerCode text,userId text,isUes integer)",//大小头
            "create table if not exists DaqMaterialClosure (id INTEGER PRIMARY KEY AUTOINCREMENT,oid text,closureCode text,userId text,isUes integer)",//封堵物
            "create view if not exists vDaqMaterial as select oid,pipeCode as code from DaqMaterialPipe union all select oid,clodBendingPipeCode as code from DaqClodBendingPipe union all select oid,hotBendsCode as code from DaqMaterialHotBends union all select oid,teeCode as code from DaqMaterialTee union all select oid,manufacturerCode as code from DaqMaterialJnsulatedJoint union all select oid,reducerCode as code from DaqMaterialReducer union all select oid,closureCode as code from DaqMaterialClosure",//线路物质视图
            "create table if not exists IpConfig (id INTEGER PRIMARY KEY AUTOINCREMENT,protocol text,ip text,port text)",//ip设置表
            "create table if not exists login_info(id INTEGER PRIMARY KEY AUTOINCREMENT,registNum text,pwd text,lastLoginDate text)"//用户登录信息表
];
