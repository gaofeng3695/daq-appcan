var fieldConfigs = [{
    "name": "防腐管检查",
    "fields": [{
      "groupName": "防腐管检查信息",
      "fileds": [{
          "name": "项目名称",
          "field": "project_name"
        },
        {
          "name": "标段名称",
          "field": "tenders_name"
        },
        {
          "name": "钢管编号",
          "field": "pipe_code"
        },
        {
          "name": "施工单位",
          "field": "construct_unit_name"
        },
        {
          "name": "坡口检查",
          "field": "groove_check"
        },
        {
          "name": "管端保护圈",
          "field": "pipe_end_proring_check"
        },
        {
          "name": "防腐层内外表面质量",
          "field": "coating_io_face_check"
        },
        {
          "name": "管径偏差+0.2mm至-0.5mm",
          "field": "diameter_check"
        },
        {
          "name": "管端焊缝余高(0mm)",
          "field": "coating_io_ends_check"
        }, {
          "name": "防腐层端部内外涂层",
          "field": "excess_weld_metal"
        }, {
          "name": "椭圆度<0.6%D",
          "field": "ovality"
        }, {
          "name": "检查人",
          "field": "checked_by"
        }, {
          "name": "检查日期",
          "field": "checked_date"
        }
      ]
    }, {
      "groupName": "其他",
      "fileds": [{
        "name": "备注",
        "field": "remarks"
      }]
    }]
  },
  {
    "name": "热煨弯管检查",
    "fields": [{
      "groupName": "热煨弯管检查信息",
      "fileds": [{
          "name": "项目名称",
          "field": "project_name"
        },
        {
          "name": "标段名称",
          "field": "tenders_name"
        },
        {
          "name": "弯管编号",
          "field": "hot_bends_code"
        },
        {
          "name": "施工单位",
          "field": "construct_unit_name"
        },
        {
          "name": "纵焊缝位置",
          "field": "weld_position"
        },
        {
          "name": "直管段长度",
          "field": "pipe_length"
        },
        {
          "name": "椭圆度<0.6%D",
          "field": "ovality"
        },
        {
          "name": "坡口检查",
          "field": "groove_check"
        },
        {
          "name": "防腐层内外表面质量",
          "field": "coating_io_face_check"
        }, {
          "name": "防腐层端部内外涂层",
          "field": "coating_io_ends_check"
        }, {
          "name": "检查人",
          "field": "checked_by"
        }, {
          "name": "检查日期",
          "field": "checked_date"
        }
      ]
    }, {
      "groupName": "其他",
      "fileds": [{
        "name": "备注",
        "field": "remarks"
      }]
    }]
  }, {
    "name": "冷弯管检查",
    "fields": [{
      "groupName": "冷弯管检查信息",
      "fileds": [{
          "name": "项目名称",
          "field": "projectName"
        },
        {
          "name": "标段名称",
          "field": "tendersName"
        },
        {
          "name": "冷弯管编号",
          "field": "pipeColdBendingCode"
        },
        {
          "name": "施工单位",
          "field": "constructUnitName"
        },
        {
          "name": "合格编号",
          "field": "certificateNum"
        },
        {
          "name": "弯制单位",
          "field": "productionUnit"
        },
        {
          "name": "弯管长度(m)",
          "field": "pipeLength"
        },
        {
          "name": "弯制角度(°）",
          "field": "bendAngle"
        }, {
          "name": "管径(mm)",
          "field": "pipeDiameter"
        },
        {
          "name": "壁厚(mm)",
          "field": "wallThickness"
        },
        {
          "name": "纵焊缝位置",
          "field": "weldPosition"
        },
        {
          "name": "椭圆度<0.6%D",
          "field": "ovality"
        },
        {
          "name": "坡口检查",
          "field": "grooveCheck"
        },
        {
          "name": "防腐层内外表面质量",
          "field": "coatingIoFaceCheck"
        }, {
          "name": "防腐层端部内外涂层",
          "field": "coatingIoEndsCheck"
        }, {
          "name": "检查人",
          "field": "checked_by"
        }, {
          "name": "检查日期",
          "field": "checked_date"
        }
      ]
    }, {
      "groupName": "其他",
      "fileds": [{
        "name": "备注",
        "field": "remarks"
      }]
    }]
  }, {
    "name": "焊口记录",
    "fields": [{
      "groupName": "基础数据",
      "fileds": [{
          "name": "项目名称",
          "field": "projectName"
        }, {
          "name": "标段名称",
          "field": "tendersName"
        }, {
          "name": "管线名称",
          "field": "pipelineName"
        }, {
          "name": "线路段名称",
          "field": "pipeSegmentOrCrossName"
        }, {
          "name": "施工单位",
          "field": "constructUnitName"
        }, {
          "name": "施工机组代号",
          "field": "workUnitCode"
        }, {
          "name": "施工日期",
          "field": "constructDate"
        }, {
          "name": "盖面人员",
          "field": "coverName"
        }, {
          "name": "填充人员",
          "field": "padderName"
        }, {
          "name": "打底人员",
          "field": "renderName"
        },
        {
          "name": "监理单位",
          "field": "supervisionUnitName"
        }, {
          "name": "监理工程师",
          "field": "supervisionEngineer"
        }, {
          "name": "采集人员",
          "field": "collectionPerson"
        }, {
          "name": "采集日期",
          "field": "collectionDate"
        }, {
          "name": "审核状态",
          "field": "approveStatus"
        }
      ]
    }, {
      "groupName": "位置数据",
      "fileds": [{
        "name": "桩号",
        "field": "medianStakeCode"
      }, {
        "name": "相对桩位置",
        "field": "relativeMileage"
      }]
    }, {
      "groupName": "焊口数据",
      "fileds": [{
          "name": "焊口编号",
          "field": "weldCode"
        }, {
          "name": "焊口类型",
          "field": "weldTypeName"
        }, {
          "name": "焊接方式",
          "field": "weldMethodName"
        }, {
          "name": "前管件类型",
          "field": "frontPipeTypeName"
        }, {
          "name": "前管件编号",
          "field": "frontPipeCode"
        }, {
          "name": "后管件类型",
          "field": "backPipeTypeName"
        }, {
          "name": "后管件编号",
          "field": "backPipeCode"
        },
        {
          "name": "焊条批号",
          "field": "weldRodBatchNum"
        }, {
          "name": "焊丝批号",
          "field": "weldWireBatchNum"
        }, {
          "name": "焊接工艺规格",
          "field": "weldProduceCode"
        }, {
          "name": "外观质量检查",
          "field": "surfaceCheckName"
        },
        {
          "name": "是否金口",
          "field": "isGoldeJointName"
        }, {
          "name": "是否连头口",
          "field": "isPipeHeadName"
        }
      ]
    }]
  }, {
    "name": "焊口返修",
    "fields": [{
      "groupName": "基础数据",
      "fileds": [{
          "name": "项目名称",
          "field": "projectName"
        }, {
          "name": "标段名称",
          "field": "tendersName"
        }, {
          "name": "管线名称",
          "field": "pipelineName"
        }, {
          "name": "线路段名称",
          "field": "pipeSegmentOrCrossName"
        },
        {
          "name": "施工单位",
          "field": "constructUnitName"
        }, {
          "name": "施工机组代号",
          "field": "workUnitName"
        }, {
          "name": "焊接日期",
          "field": "weldDate"
        }, {
          "name": "打底人员",
          "field": "padderName"
        }, {
          "name": "盖面人员",
          "field": "renderName"
        }, {
          "name": "填充人员",
          "field": "coverName"
        }, {
          "name": "监理单位",
          "field": "supervisionUnitName"
        }, {
          "name": "监理工程师",
          "field": "supervisionEngineer"
        }, {
          "name": "采集人员",
          "field": "collectionPerson"
        }, {
          "name": "采集日期",
          "field": "collectionDate"
        }, {
          "name": "审核状态",
          "field": "approveStatus"
        }
      ]
    }, {
      "groupName": "返修数据",
      "fileds": [{
        "name": "返修口编号",
        "field": "weldCode"
      }, {
        "name": "返修后焊口编号",
        "field": "reworkWeldCode"
      }, {
        "name": "焊条批号",
        "field": "weldRodBatchNum"
      }, {
        "name": "焊丝批号",
        "field": "weldWireBatchNum"
      }, {
        "name": "焊接工艺规程",
        "field": "weldProduceCode"
      }]
    }]
  }, {
    "name": "焊口测量",
    "fields": [{
      "groupName": "基础数据",
      "fileds": [{
          "name": "项目名称",
          "field": "projectName"
        }, {
          "name": "标段名称",
          "field": "tendersName"
        }, {
          "name": "管线名称",
          "field": "pipelineName"
        }, {
          "name": "线路段名称",
          "field": "pipeSegmentOrCrossName"
        }, {
          "name": "焊口编号",
          "field": "weldCode"
        }, {
          "name": "施工单位",
          "field": "constructUnitName"
        }, {
          "name": "施工机组代号",
          "field": "workUnitName"
        },
        {
          "name": "监理单位",
          "field": "supervisionUnitName"
        }, {
          "name": "监理工程师",
          "field": "supervisionEngineer"
        }, {
          "name": "测量人",
          "field": "surveyCrew"
        }, {
          "name": "测量日期",
          "field": "surveyDate"
        }, {
          "name": "采集人员",
          "field": "collectionPerson"
        }, {
          "name": "采集日期",
          "field": "collectionDate"
        }, {
          "name": "审核状态",
          "field": "approveStatus"
        }
      ]
    }, {
      "groupName": "位置数据",
      "fileds": [{
        "name": "桩号",
        "field": "medianStakeCode"
      }, {
        "name": "相对桩位置",
        "field": "relativeMileage"
      }, {
        "name": "坐标X",
        "field": "pointx"
      }, {
        "name": "坐标Y",
        "field": "pointy"
      }]
    }, {
      "groupName": "中线成果数据",
      "fileds": [{
        "name": "地表高程",
        "field": "surfaceeLevation"
      }, {
        "name": "管顶高程",
        "field": "pipeTopElevation"
      }, {
        "name": "埋深",
        "field": "buriedDepth"
      }]
    }]
  }, {
    "name": "补口记录",
    "fields": [{
      "groupName": "基本信息",
      "fileds": [{
          "name": "项目名称",
          "field": "project_name"
        }, {
          "name": "标段名称",
          "field": "tenders_name"
        }, {
          "name": "管线名称",
          "field": "pipeline_name"
        }, {
          "name": "线路段/穿跨越",
          "field": "pipe_segment_or_cross_name"
        }, {
          "name": "施工单位",
          "field": "construct_unit_name"
        },
        {
          "name": "监理单位",
          "field": "supervision_unit_name"
        }, {
          "name": "监理工程师",
          "field": "supervision_engineer"
        }, {
          "name": "采集人员",
          "field": "collection_person"
        }, {
          "name": "采集日期",
          "field": "collection_date"
        }, {
          "name": "审核状态",
          "field": "approve_status_name"
        }
      ]
    }, {
      "groupName": "防腐补口检查信息",
      "fileds": [{
          "name": "焊口编号",
          "field": "weld_code"
        },
        {
          "name": "补口材料批号",
          "field": "buckle_material_batch_num"
        }, {
          "name": "补口日期",
          "field": "buckle_date"
        }, {
          "name": "补口防腐类型",
          "field": "buckle_anticorrosive_type_name"
        }, {
          "name": "防腐等级",
          "field": "buckle_anticorrosive_grade_name"
        }, {
          "name": "除锈等级",
          "field": "derusting_grade_name"
        }, {
          "name": "管口清理",
          "field": "pipe_mouth_clean_name"
        }, {
          "name": "喷砂除锈",
          "field": "sandblasting_and_derusting_name"
        }, {
          "name": "管口预热",
          "field": "pipe_mouth_preheat_name"
        }, {
          "name": "环氧底漆",
          "field": "epoxy_primer_name"
        }, {
          "name": "喷拷",
          "field": "baking_check_name"
        }, {
          "name": "轴向搭接",
          "field": "overlap_check_name"
        }, {
          "name": "外观检查",
          "field": "appearance_check_name"
        }, {
          "name": "电火花捡漏",
          "field": "electric_spark_leak_detection_name"
        }, {
          "name": "补口结论",
          "field": "buckle_conclusion_name"
        }, {
          "name": "防腐工",
          "field": "anticorrosion"
        }
      ]
    }]
  },
]