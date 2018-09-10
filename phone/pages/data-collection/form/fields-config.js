var FieldsConfig = (function () {
  var checkOption = [ //
    {
      label: '合格',
      value: '合格',
    }, {
      label: '不合格',
      value: '不合格',
    },
  ];
  var booleanOption = [ //
    {
      label: '是',
      value: 1,
    }, {
      label: '否',
      value: 0,
    },
  ];
  var checkOptionForNumber = [ //
    {
      label: '合格',
      value: 1,
    }, {
      label: '不合格',
      value: 0,
    },
  ];
  return {
    antiseptic: {
      title: '防腐管检查',
      fieldsGroup: [ //
        {
          groupName: '检查信息',
          fields: [
            'project_oid',
            'tenders_oid',
            'construct_unit',
            'pipe_code',
            'groove_check',
            'pipe_end_proring_check',
            'coating_io_face_check',
            'diameter_check',
            'coating_io_ends_check',
            'excess_weld_metal',
            'ovality',
            'checked_by',
            'checked_date',
          ],
        }, {
          groupName: '其他信息',
          fields: [
            'remarks',
          ]
        }
      ],
      fieldsConfig: {
        'project_oid': {
          name: '项目名称',
          type: 'select',
          required: true,
          optionUrl: '/daq/privilege/getProjectList.do',
          childSelect: ['tenders_oid', 'construct_unit'],
          childUrl: ['/daq/privilege/getTendersList.do', '/daq/privilege/getCurrentUnitId.do'],
        },
        'tenders_oid': {
          name: '标段名称',
          type: 'select',
          required: true,
          options: [],
        },
        'construct_unit': {
          name: '施工单位',
          type: 'select',
          required: true,
          options: []
        },
        'pipe_code': {
          name: '钢管编号',
          type: 'select',
          required: true,
          options: []
        },
        'groove_check': {
          name: '坡口检查',
          type: 'select',
          options: checkOption
        },
        'pipe_end_proring_check': {
          name: '管端保护圈',
          type: 'select',
          options: checkOption
        },
        'coating_io_face_check': {
          name: '防腐层内外表面质量',
          type: 'select',
          options: checkOption
        },
        'diameter_check': {
          name: '管径偏差+0.2mm至-0.5mm',
          type: 'select',
          options: checkOption
        },
        'coating_io_ends_check': {
          name: '防腐层端部内外涂层',
          type: 'select',
          options: checkOption
        },
        'excess_weld_metal': {
          name: '管端焊缝余高（0mm）',
          type: 'select',
          options: checkOption
        },
        'ovality': {
          name: '椭圆度<0.6%D',
          type: 'select',
          options: checkOption
        },
        'checked_by': {
          name: '检查人',
          type: 'text',
        },
        'checked_date': {
          name: '检查日期',
          type: 'date',
        },
        'remarks': {
          name: '备注',
          type: 'textarea',
        },
      }
    },
    hotBend: {
      title: '热煨弯管检查',
      fieldsGroup: [ //
        {
          groupName: '检查信息',
          fields: [
            'project_oid', //项目oid
            'tenders_oid', //标段oid
            'construct_unit', //施工单位oid
            'hot_bends_code', //弯管编号
            'weld_position', //纵焊缝位置
            'pipe_length', //直管段长度
            'ovality', //椭圆度<0.6%D
            'groove_check', //坡口检查
            'coating_io_face_check', //防腐层内外表面质量
            'coating_io_ends_check', //防腐层端部内外涂层
            'checked_by', //检查人
            'checked_date', //检查日期
          ],
        }, {
          groupName: '其他信息',
          fields: [
            'remarks',
          ]
        }
      ],
      fieldsConfig: {
        'project_oid': {
          name: '项目名称',
          type: 'select',
          required: true,
          optionUrl: '/daq/privilege/getProjectList.do',
          childSelect: ['tenders_oid', 'construct_unit'],
          childUrl: ['/daq/privilege/getTendersList.do', '/daq/privilege/getCurrentUnitId.do'],
        },
        'tenders_oid': {
          name: '标段名称',
          type: 'select',
          required: true,
        },
        'construct_unit': {
          name: '施工单位',
          type: 'select',
          required: true,
        },
        'hot_bends_code': {
          name: '弯管编号',
          type: 'select',
          required: true,
        },
        'weld_position': {
          name: '纵焊缝位置',
          type: 'select',
          options: checkOption
        },
        'pipe_length': {
          name: '直管段长度',
          type: 'select',
          options: checkOption
        },
        'ovality': {
          name: '椭圆度<0.6%D',
          type: 'select',
          options: checkOption
        },
        'groove_check': {
          name: '坡口检查',
          type: 'select',
          options: checkOption
        },
        'coating_io_face_check': {
          name: '防腐层内外表面质量',
          type: 'select',
          options: checkOption
        },
        'coating_io_ends_check': {
          name: '防腐层端部内外涂层',
          type: 'select',
          options: checkOption
        },
        'checked_by': {
          name: '检查人',
          type: 'text',
        },
        'checked_date': {
          name: '检查日期',
          type: 'date',
        },
        'remarks': {
          name: '备注',
          type: 'textarea',
        },
      }
    },
    coldBend: {
      title: '冷弯管检查',
      fieldsGroup: [ //
        {
          groupName: '检查信息',
          fields: [
            'projectOid', //项目oid
            'tendersOid', //标段oid
            'constructUnit', //施工单位oid
            'pipeColdBendingOid', //冷弯管oid
            'certificateNum', //合格证编号
            'pipeLength', //弯管长度(m)
            'pipeDiameter', //管径(mm)
            'wallThickness', //壁厚(mm）
            'productionUnit', //弯制单位
            'bendAngle', //弯制角度(°）
            'weldPosition', //纵焊缝位置
            'ovality', //椭圆度<0.6%D
            'grooveCheck', //坡口检查
            'coatingIoFaceCheck', //防腐层内外表面质量
            'coatingIoEndsCheck', //防腐层端部内外涂层
            'checkedBy', //检查人
            'checkedDate', //检查日期
          ],
        }, {
          groupName: '其他信息',
          fields: [
            'remarks',
          ]
        }
      ],
      fieldsConfig: {
        'projectOid': {
          name: '项目名称',
          type: 'select',
          required: true,
          optionUrl: '/daq/privilege/getProjectList.do',
          childSelect: ['tendersOid', 'constructUnit'],
          childUrl: ['/daq/privilege/getTendersList.do', '/daq/privilege/getCurrentUnitId.do'],
        },
        'tendersOid': {
          name: '标段名称',
          type: 'select',
          required: true,
          childSelect: ['pipeColdBendingOid'],
          childUrl: ['/daq/clodBendingPipe/getList.do'],
        },
        'constructUnit': {
          name: '施工单位',
          type: 'select',
          required: true,
        },
        'certificateNum': {
          name: '合格证编号',
          type: 'text',
          required: true,
        },
        'pipeColdBendingOid': {
          name: '冷弯管编号',
          type: 'select',
        },
        'pipeLength': {
          name: '弯管长度(m)',
          type: 'select',
          options: checkOption
        },
        'pipeDiameter': {
          name: ' 管径(mm)',
          type: 'number',
        },
        'wallThickness': {
          name: '壁厚(mm)',
          type: 'number',
        },
        'productionUnit': {
          name: '弯制单位',
          type: 'text',
        },
        'bendAngle': {
          name: '弯制角度(°)',
          type: 'number',
        },
        'weldPosition': {
          name: '纵焊缝位置',
          type: 'select',
          options: checkOption
        },
        'ovality': {
          name: '椭圆度<0.6%D',
          type: 'select',
          options: checkOption
        },
        'grooveCheck': {
          name: '坡口检查',
          type: 'select',
          options: checkOption
        },
        'coatingIoFaceCheck': {
          name: '防腐层内外表面质量',
          type: 'select',
          options: checkOption
        },
        'coatingIoEndsCheck': {
          name: '防腐层端部内外涂层',
          type: 'select',
          options: checkOption
        },
        'checkedBy': {
          name: '检查人',
          type: 'text',
        },
        'checkedDate': {
          name: '检查日期',
          type: 'date',
        },
        'remarks': {
          name: '备注',
          type: 'textarea',
        },
      }
    },
    weldRecord: {
      title: '焊口记录',
      detailUrl: '/jdbc/commonData/constructionWeld/getPage.do',
      fieldsGroup: [ //
        {
          groupName: '基础信息',
          fields: [
            // projectName
            'projectOid',
            // tendersName
            'tendersOid',
            // pipelineName
            'pipelineOid',
            // pipeSegmentOrCrossName
            'pipeSegmentOrCrossOid',
            // constructUnitName
            'constructUnit',
            // 'workUnitCode',
            'workUnitOid',
            'constructDate', //	施工日期
            'coverOid', //	盖面人员
            'padderOid', //	填充人员
            'renderOid', //	打底人员
            'supervisionUnit', //	监理单位
            'supervisionEngineer', //	监理工程师
            'collectionPerson', //	采集人员
            'collectionDate', //	采集日期
          ],
        }, {
          groupName: '位置信息',
          fields: [
            'medianStakeOid', //	桩号
            'relativeMileage', //	相对桩位置(m)
          ]
        }, {
          groupName: '焊口信息',
          fields: [
            'weldCode', //	焊口编号
            'weldType', //	焊口类型
            'weldMethod', //	焊接方式
            'frontPipeType', //	前管件类型
            'frontPipeCode', //	前管件编号
            'backPipeType', //	后管件类型
            'backPipeCode', //	后管件编号
            'weldRodBatchNum', //	焊条批号
            'weldWireBatchNum', //	焊丝批号
            'weldProduce', //	焊接工艺规程
            'surfaceCheck', //	外观质量检查
            'isGoldeJoint', //	是否金口
            'isPipeHead', //	是否连头口
          ]
        }, {
          groupName: '其他信息',
          fields: [
            'remarks',
          ]
        }
      ],
      fieldsConfig: {
        'projectOid': {
          name: '项目名称',
          type: 'select',
          required: true,
          optionUrl: '/daq/privilege/getProjectList.do',
          childSelect: ['tendersOid', 'constructUnit', 'workUnitOid', 'weldProduce'],
          childUrl: ['/daq/privilege/getTendersList.do', '/daq/privilege/getCurrentUnitId.do', '/daq/workUnit/getWorkUnitList.do', '/daq/weldProduct/getListByCondition.do'],
        },
        'tendersOid': {
          name: '标段名称',
          type: 'select',
          required: true,
          childSelect: ['supervisionUnit', 'pipelineOid'],
          childUrl: ['/daq/privilege/getSupervisionUnitByTendersOid.do', '/daq/privilege/getPipelineListByTendersOid.do'],
        },
        'constructUnit': {
          name: '施工单位',
          type: 'select',
          required: true,
        },
        'pipelineOid': {
          name: '管线名称',
          type: 'select',
          childSelect: ['pipeSegmentOrCrossOid'],
          childUrl: ['/daq/privilege/getPipeSegmentOrCrossList.do'],
          required: true,
        },
        'pipeSegmentOrCrossOid': {
          name: '线路段/穿跨越',
          type: 'select',
          childSelect: ['medianStakeOid'],
          childUrl: ['/daq/privilege/getMedianStakeList.do'],
          required: true,
        },
        'medianStakeOid': {
          name: '桩号',
          type: 'select',
        },
        'workUnitOid': {
          name: '施工机组代号',
          type: 'select', //            , //	打底人员
          childSelect: ['coverOid', 'padderOid', 'renderOid'],
          childUrl: ['/daq/workPerson/getWorkPersonList.do'],
          requestParams: {
            types: "work_unit_type_code_001,work_unit_type_code_010,work_unit_type_code_012",
          },
          required: true,
        },
        'coverOid': {
          name: '盖面人员',
          type: 'multiSelect',
        },
        'padderOid': {
          name: '填充人员',
          type: 'multiSelect',
        },
        'renderOid': {
          name: '打底人员',
          type: 'multiSelect',
        },
        'supervisionUnit': {
          name: '监理单位',
          type: 'select',
          required: true,
        },
        'weldMethod': {
          name: '焊接方式',
          type: 'select',
          domainName: 'welding_method_temp_domain',
        },
        'weldType': {
          name: '焊口类型',
          type: 'select',
          domainName: 'weld_type_domain',
        },
        'frontPipeType': {
          name: '前管件类型',
          type: 'select',
          domainName: 'pipe_type_domain',
        },
        'frontPipeCode': {
          name: '前管件编号',
          type: 'select',
        },
        'backPipeType': {
          name: '后管件类型',
          type: 'select',
          domainName: 'pipe_type_domain',
        },
        'backPipeCode': {
          name: '后管件编号',
          type: 'select',
        },
        'constructDate': {
          name: '施工日期',
          type: 'date',
          required: true,
        },
        'collectionDate': {
          name: '采集日期',
          type: 'date',
        },
        'supervisionEngineer': {
          name: '监理工程师',
          type: 'text',
        },
        'collectionPerson': {
          name: '采集人员',
          type: 'text',
        },
        'relativeMileage': {
          name: '相对桩位置',
          type: 'number',
        },
        'weldCode': {
          name: '焊口编号',
          type: 'text',
          required: true
        },
        'weldRodBatchNum': {
          name: '焊条批号',
          type: 'text',
        },
        'weldWireBatchNum': {
          name: '焊丝批号',
          type: 'text',
        },
        'weldProduce': {
          name: '焊接工艺规程',
          type: 'select',
        },
        'surfaceCheck': {
          name: '外观质量检查',
          type: 'select',
          options: checkOptionForNumber
        },
        'isGoldeJoint': {
          name: '是否金口',
          type: 'select',
          options: booleanOption
        },
        'isPipeHead': {
          name: '是否连头口',
          type: 'select',
          options: booleanOption
        },
        'remarks': {
          name: '备注',
          type: 'textarea',
        },
      }
    },
    weldRework: {
      title: '焊口返修',
      detailUrl: '/jdbc/commonData/constructionWeld/getPage.do',
      fieldsGroup: [ //
        {
          groupName: '基础信息',
          fields: [
            // projectName
            'projectOid',
            // tendersName
            'tendersOid',
            // pipelineName
            'pipelineOid',
            // pipeSegmentOrCrossName
            'pipeSegmentOrCrossOid',
            // constructUnitName
            'constructUnit',
            // 'workUnitCode',
            'workUnitOid',

            'weldDate', //	焊接日期

            'coverOid', //	盖面人员
            'padderOid', //	填充人员
            'renderOid', //	打底人员
            'supervisionUnit', //	监理单位
            'supervisionEngineer', //	监理工程师
            'collectionPerson', //	采集人员
            'collectionDate', //	采集日期
          ],
        }, {
          groupName: '返修信息',
          fields: [
            'weldOid', //返修口编号
            'reworkWeldCode', //返修后焊口编号
            'weldRodBatchNum', //	焊条批号
            'weldWireBatchNum', //	焊丝批号
            'weldProduce', //	焊接工艺规程
          ]
        }, {
          groupName: '其他信息',
          fields: [
            'remarks',
          ]
        }
      ],
      fieldsConfig: {
        'projectOid': {
          name: '项目名称',
          type: 'select',
          required: true,
          optionUrl: '/daq/privilege/getProjectList.do',
          childSelect: ['tendersOid', 'constructUnit', 'workUnitOid', 'weldProduce'],
          childUrl: ['/daq/privilege/getTendersList.do', '/daq/privilege/getCurrentUnitId.do', '/daq/workUnit/getWorkUnitList.do', '/daq/weldProduct/getListByCondition.do'],
        },
        'tendersOid': {
          name: '标段名称',
          type: 'select',
          required: true,
          childSelect: ['supervisionUnit', 'pipelineOid'],
          childUrl: ['/daq/privilege/getSupervisionUnitByTendersOid.do', '/daq/privilege/getPipelineListByTendersOid.do'],
        },
        'constructUnit': {
          name: '施工单位',
          type: 'select',
          required: true,
        },
        'pipelineOid': {
          name: '管线名称',
          type: 'select',
          childSelect: ['pipeSegmentOrCrossOid'],
          childUrl: ['/daq/privilege/getPipeSegmentOrCrossList.do'],
          required: true,
        },
        'pipeSegmentOrCrossOid': {
          name: '线路段/穿跨越',
          type: 'select',
          childSelect: ['weldOid'],
          childUrl: ['/daq/weld/getOnlyWeldList.do'],
          required: true,
        },
        'workUnitOid': {
          name: '施工机组代号',
          type: 'select', //            , //	打底人员
          childSelect: ['coverOid', 'padderOid', 'renderOid'],
          childUrl: ['/daq/workPerson/getWorkPersonList.do'],
          requestParams: {
            types: "work_unit_type_code_001,work_unit_type_code_010,work_unit_type_code_012",
          },
          required: true,
        },
        'coverOid': {
          name: '盖面人员',
          type: 'multiSelect',
        },
        'padderOid': {
          name: '填充人员',
          type: 'multiSelect',
        },
        'renderOid': {
          name: '打底人员',
          type: 'multiSelect',
        },
        'supervisionUnit': {
          name: '监理单位',
          type: 'select',
          required: true,
        },
        'weldOid': {
          name: '返修口编号',
          type: 'select',
          childText: ['reworkWeldCode'],
          childTextFormat: [function (value) {
            return value ? value + '-R' : '';
          }],
          required: true,
        },
        'reworkWeldCode': {
          name: '返修后焊口编号',
          type: 'text',
          disabled: true,
          required: true,
        },
        'collectionDate': {
          name: '采集日期',
          type: 'date',
        },
        'weldDate': {
          name: '焊接日期',
          type: 'date',
        },
        'supervisionEngineer': {
          name: '监理工程师',
          type: 'text',
        },
        'collectionPerson': {
          name: '采集人员',
          type: 'text',
        },
        'weldRodBatchNum': {
          name: '焊条批号',
          type: 'text',
        },
        'weldWireBatchNum': {
          name: '焊丝批号',
          type: 'text',
        },
        'weldProduce': {
          name: '焊接工艺规程',
          type: 'select',
        },
        'remarks': {
          name: '备注',
          type: 'textarea',
        },
      }
    },
    weldMeasure: {
      title: '焊口测量',
      detailUrl: '/jdbc/commonData/constructionWeld/getPage.do',
      fieldsGroup: [ //
        {
          groupName: '基础信息',
          fields: [
            // projectName
            'projectOid',
            // tendersName
            'tendersOid',
            // pipelineName
            'pipelineOid',
            // pipeSegmentOrCrossName
            'pipeSegmentOrCrossOid',
            'weldOid', //焊口编号
            // constructUnitName
            'constructUnit',
            // 'workUnitCode',
            'workUnitOid',

            'supervisionUnit', //	监理单位
            'supervisionEngineer', //	监理工程师

            'surveyCrew', //测量人
            'surveyDate', //测量日期


            'collectionPerson', //	采集人员
            'collectionDate', //	采集日期
          ],
        }, {
          groupName: '位置信息',
          fields: [
            'medianStakeOid', //	桩号
            'relativeMileage', //	相对桩位置(m)
            'pointx', //坐标X(m)
            'pointy', //坐标Y(m)
          ]
        }, {
          groupName: '返修信息',
          fields: [
            'surfaceeLevation', //地表高程(m)
            'pipeTopElevation', //管顶高程(m)
            'buriedDepth', //埋深(m)
          ]
        }, {
          groupName: '其他信息',
          fields: [
            'remarks',
          ]
        }
      ],
      fieldsConfig: {
        'projectOid': {
          name: '项目名称',
          type: 'select',
          required: true,
          optionUrl: '/daq/privilege/getProjectList.do',
          childSelect: ['tendersOid', 'constructUnit', 'workUnitOid', ],
          childUrl: ['/daq/privilege/getTendersList.do', '/daq/privilege/getCurrentUnitId.do', '/daq/workUnit/getWorkUnitList.do'],
        },
        'tendersOid': {
          name: '标段名称',
          type: 'select',
          required: true,
          childSelect: ['supervisionUnit', 'pipelineOid'],
          childUrl: ['/daq/privilege/getSupervisionUnitByTendersOid.do', '/daq/privilege/getPipelineListByTendersOid.do'],
        },
        'constructUnit': {
          name: '施工单位',
          type: 'select',
          required: true,
        },
        'pipelineOid': {
          name: '管线名称',
          type: 'select',
          childSelect: ['pipeSegmentOrCrossOid'],
          childUrl: ['/daq/privilege/getPipeSegmentOrCrossList.do'],
          required: true,
        },
        'pipeSegmentOrCrossOid': {
          name: '线路段/穿跨越',
          type: 'select',
          childSelect: ['weldOid', 'medianStakeOid'],
          childUrl: ['/daq/weld/getOnlyWeldList.do', '/daq/privilege/getMedianStakeList.do'],
          required: true,
        },
        'weldOid': {
          name: '焊口编号',
          type: 'select',
        },
        'workUnitOid': {
          name: '施工机组代号',
          type: 'select', //            , //	打底人员
          childSelect: ['coverOid', 'padderOid', 'renderOid'],
          childUrl: ['/daq/workPerson/getWorkPersonList.do'],
          requestParams: {
            types: "work_unit_type_code_001,work_unit_type_code_010,work_unit_type_code_012",
          },
          required: true,
        },
        'supervisionUnit': {
          name: '监理单位',
          type: 'select',
          required: true,
        },
        'supervisionEngineer': {
          name: '监理工程师',
          type: 'text',
        },
        'collectionPerson': {
          name: '采集人员',
          type: 'text',
        },
        'collectionDate': {
          name: '采集日期',
          type: 'date',
        },
        'remarks': {
          name: '备注',
          type: 'textarea',
        },
        'medianStakeOid': {
          name: '桩号',
          type: 'select',
        },
        'relativeMileage': {
          name: '相对桩位置',
          type: 'number',
        },
        'surveyCrew': {
          name: '测量人',
          type: 'text',
          required: true,
        },
        'surveyDate': {
          name: '测量日期',
          type: 'date',
          required: true,
        },
        'pointx': {
          name: '坐标X(m)',
          type: 'number',
        },
        'pointy': {
          name: '坐标Y(m)',
          type: 'number',
        },
        'surfaceeLevation': {
          name: '地表高程(m)',
          type: 'number',
        },
        'pipeTopElevation': {
          name: '管顶高程(m)',
          type: 'number',
        },
        'buriedDepth': {
          name: '埋深(m)',
          type: 'number',
        },
      }
    },
    patchRecord: {
      title: '防腐管检查',
      fieldsGroup: [ //
        {
          groupName: '基础信息',
          fields: [
            'project_oid', //项目oid
            'tenders_oid', //标段oid
            'pipeline_oid', //管线oid
            'pipe_segment_or_cross_oid', //线路段/穿跨越
            'construct_unit', //施工单位
            'supervision_unit', //监理单位
            'supervision_engineer', //监理工程师
            'collection_person', //数据采集人
            'collection_date', //采集日期
          ],
        }, {
          groupName: '检查信息',
          fields: [
            'weld_oid', //焊口编号
            'buckle_material_batch_num', //补口材料批号
            'buckle_date', //补口日期
            'buckle_anticorrosive_type', //补口防腐类型
            'buckle_anticorrosive_grade', //防腐等级
            'derusting_grade', //除锈等级
            'pipe_mouth_clean', //管口清理
            'sandblasting_and_derusting', //喷砂除绣
            'pipe_mouth_preheat', //管口预热
            'epoxy_primer', //环氧底漆
            'baking_check', //喷烤
            'overlap_check', //轴向搭接
            'appearance_check', //外观检查
            'electric_spark_leak_detection', //电火花检漏
            'buckle_conclusion', //补口结论
            'anticorrosion', //防腐工
          ],
        }, {
          groupName: '其他信息',
          fields: [
            'remarks',
          ]
        }
      ],
      fieldsConfig: {
        'project_oid': {
          name: '项目名称',
          type: 'select',
          required: true,
          optionUrl: '/daq/privilege/getProjectList.do',
          childSelect: ['tenders_oid', 'construct_unit'],
          childUrl: ['/daq/privilege/getTendersList.do', '/daq/privilege/getCurrentUnitId.do'],
        },
        'tenders_oid': {
          name: '标段名称',
          type: 'select',
          required: true,
          childSelect: ['supervision_unit', 'pipeline_oid'],
          childUrl: ['/daq/privilege/getSupervisionUnitByTendersOid.do', '/daq/privilege/getPipelineListByTendersOid.do'],
        },
        'pipeline_oid': {
          name: '管线名称',
          type: 'select',
          childSelect: ['pipe_segment_or_cross_oid'],
          childUrl: ['/daq/privilege/getPipeSegmentOrCrossList.do'],
          required: true,
        },
        'pipe_segment_or_cross_oid': {
          name: '线路段/穿跨越',
          type: 'select',
          childSelect: ['weld_oid'],
          childUrl: ['/daq/weld/getOnlyWeldList.do'],
          required: true,
        },
        'construct_unit': {
          name: '施工单位',
          type: 'select',
          required: true,
          options: []
        },
        'supervision_unit': {
          name: '监理单位',
          type: 'select',
          required: true,
        },
        'supervision_engineer': {
          name: '监理工程师',
          type: 'text',
        },
        'collection_person': {
          name: '采集人员',
          type: 'text',
        },
        'collection_date': {
          name: '采集日期',
          type: 'date',
        },
        'weld_oid': {
          name: '焊口编号',
          type: 'select',
          required: true,
        },
        'buckle_material_batch_num': {
          name: '补口材料批号',
          type: 'text',
        },
        'buckle_date': {
          name: '补口日期',
          type: 'date',
          required: true,
        },
        'buckle_anticorrosive_type': {
          name: '补口防腐类型',
          type: 'select',
          domainName: 'buckle_anticorrosive_type_domain',
        },
        'buckle_anticorrosive_grade': {
          name: '防腐等级',
          type: 'select',
          domainName: 'anticorrosive_grade_domain',
        },
        'derusting_grade': {
          name: '除锈等级',
          type: 'select',
          domainName: 'derusting_grade_domain',
        },
        'pipe_mouth_clean': {
          name: '管口清理',
          type: 'select',
          options: checkOption,
        },
        'sandblasting_and_derusting': {
          name: '喷砂除绣',
          type: 'select',
          options: checkOption,
        },
        'pipe_mouth_preheat': {
          name: '管口预热',
          type: 'select',
          options: checkOption,
        },
        'epoxy_primer': {
          name: '环氧底漆',
          type: 'select',
          options: checkOption,
        },
        'baking_check': {
          name: '喷烤',
          type: 'select',
          options: checkOption,
        },
        'overlap_check': {
          name: '轴向搭接',
          type: 'select',
          options: checkOption,
        },
        'appearance_check': {
          name: '外观检查',
          type: 'select',
          options: checkOption,
        },
        'electric_spark_leak_detection': {
          name: '电火花检漏',
          type: 'select',
          options: checkOption,
        },
        'buckle_conclusion': {
          name: '补口结论',
          type: 'select',
          options: checkOption,
        },
        'anticorrosion': {
          name: '防腐工',
          type: 'text',
        },
        'remarks': {
          name: '备注',
          type: 'textarea',
        },
      }

    },
    methods: {
      formatForms: function (fieldsGroup) {
        var form = {};
        fieldsGroup.forEach(function (group) {
          group.fields.forEach(function (field) {
            form[field] = '';
          });
        });
        return form;
      }
    }
  }
})();