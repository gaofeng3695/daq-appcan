(function () {
  var checkOptionMap = {
    0: '不合格',
    1: '合格'
  };
  var booleanOptionMap = {
    0: '否',
    1: '是'
  };
  window.domain = {
    // coating_io_ends_check: checkOptionMap,
    // coating_io_face_check: checkOptionMap,
    // diameter_check: checkOptionMap,
    // excess_weld_metal: checkOptionMap,
    // groove_check: checkOptionMap,
    // ovality: checkOptionMap,
    // pipe_end_proring_check: checkOptionMap,
    // weld_position: checkOptionMap,
    // pipe_length: checkOptionMap,
    // surfaceCheck: checkOptionMap,
    isGoldeJoint: booleanOptionMap,
    isPipeHead: booleanOptionMap,
    // evaluationResult: checkOptionMap,
    detectionDispose: {
      1: "返修",
      2: "割口"
    },
    // conclusion: checkOptionMap,
    isWaterInjection: booleanOptionMap,
    isAirbleed: booleanOptionMap,
    isTemporary: booleanOptionMap,
    tabletsCondition: {
      0: "符合设计要求",
      1: "不符合设计要求"
    },
    isElectronicMark: booleanOptionMap,
    // acceptanceResults: checkOptionMap,
    isThroughPipeline: booleanOptionMap,
    // inspectionFindings: checkOptionMap,
    conclusion: {
      1: "合格",
      0: "不合格"
    },
    inspectionFindings: {
      1: "合格",
      0: "不合格"
    },
    approveStatus: {
      "-1": "驳回",
      "0": "未上报",
      "1": "审核中",
      "2": "通过"
    },
    approve_status: {
      "-1": "驳回 ",
      "0": "未上报",
      "1": "审核中",
      "2": "通过"
    }
  }
})();



// var o = {};
// for (k in a) {
//   if (a[k].options && a[k].options[0] && (a[k].options[0].label == '合格')) {

//     o[k] = {
//       1: '合格',
//       0: '不合格',
//     }
//   }
// }