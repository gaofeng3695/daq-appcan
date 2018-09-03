/**
 * @author gf 2018.08.08
 * @description 通用组件
 */
/* ------指令------------------------------------------------------------------------- */
/**
 * @author gf 2018.08.10
 * @description 设定需要撑满剩余空间的div高度
 */
Vue.directive('setheight', {
  bind: function (el) {
    var otherHeight = 0;
    setTimeout(function () {
      var arr = el.parentElement.children;

      for (var i = 0; i < arr.length; i++) {
        var item = arr[i];
        if (item !== el) {
          otherHeight += item.clientHeight;
        }
      }
      // var otherHeightpx = otherHeight + 'px';
      el.style.height = 'calc(100% - ' + otherHeight + 'px)';
      el.style.overflow = 'auto';
    }, 0);
  }
});

Vue.directive('required', {
  bind: function (el, binding) {
    if (!binding.value) return;
    var html = '<span  style="line-height:1.2;color:red;">*</span>';
    $(el).find('.mint-cell-title').eq(0).append(html);
  }
});

Vue.directive('fieldicon', {
  bind: function (el, binding) {
    if (!binding.value) return;
    if (binding.value === 'date') {
      var html = '<i class="fa fa-calendar" style="color:#666;padding-left:6px;" aria-hidden="true"></i>';
      $(el).find('.mint-cell-wrapper').eq(0).append(html);
    }
  }
});


/* ------组件------------------------------------------------------------------------- */

/**
 * @author gf 2018.08.09
 * @description 上啦刷新，下拉加载,自带请求
 */
Vue.component('jas-scroll-list-box', {
  props: {
    url: {},
    params: {},
    value: {}, // v-model
  },
  data: function () {
    return {
      pageNo: 1,
      pageSize: 10,
      allLoaded: false,
    }
  },
  template: [
    '<mt-loadmore ref="loadmore" :top-method="refresh" :auto-fill="false" :bottom-method="loadBottom":bottom-all-loaded="allLoaded">',
    '  <slot></slot>',
    '</mt-loadmore>',
  ].join(''),
  created: function () {},
  mounted: function () {},
  methods: {
    refresh: function () {
      var that = this;
      this.pageNo = 1;
      this.allLoaded = false;
      this._requestMedianStake();
    },
    loadBottom: function () {
      if (this.allLoaded) {
        return;
      }
      this._requestMedianStake();
    },
    _requestMedianStake: function () {
      var that = this;
      var obj = jasTools.base.extend({
        pageNo: this.pageNo,
        pageSize: this.pageSize,
      }, this.params);
      jasTools.ajax.post(this.url, obj, function (data) {
        if (data.rows.length > 0) {
          if (that.pageNo === 1) {
            that.listData = data.rows;
            that.$emit('input', data.rows);
          } else {
            that.$emit('input', that.value.concat(data.rows));
          }
          that.pageNo++;
        } else {
          that.allLoaded = true;
          that.$toast('没有更多数据');
        }
        that.$refs.loadmore.onTopLoaded();
        that.$refs.loadmore.onBottomLoaded();
      }, function () {
        that.$refs.loadmore.onTopLoaded();
        that.$refs.loadmore.onBottomLoaded();
      });
    },
  }
});

/**
 * @author gf 2018.08.09
 * @description 页面footer，带按钮
 */
Vue.component('jas-button-footer', {
  props: {
    isReturn: {},
    buttons: {
      type: Array
    },
  },
  data: function () {
    return {}
  },
  template: [
    '<div class="jas-button-footer" v-if="isReturn || buttons">',
    '	<div class="jas-footer-item" v-if="isReturn">',
    '		<mt-button type="primary" @click.native="closePage" size="small" style="width:100%;">返回</mt-button>',
    '	</div>',
    '	<div class="jas-footer-item" v-for="item,index in buttons">',
    '		<mt-button type="primary" @click.native="clickbtn(index)" size="small" style="width:100%;">{{item}}</mt-button>',
    '	</div>',
    '</div>',
  ].join(''),
  methods: {
    clickbtn: function (index) {
      var that = this;
      this.$emit('click', index);
    },
    closePage: function () {
      window.appcan && appcan.window.close();
    }
  }
});

/**
 * @author gf 2018.08.10
 * @description 页面头部，带左右按钮
 */
Vue.component('jas-header', {
  props: {
    title: {},
    isReturn: {
      default: true
    },
    leftIcon: {},
    rightIcon: {},
  },
  data: function () {
    return {}
  },
  template: [
    '<mt-header :title="title">',
    '	 <mt-button v-if="isReturn && !leftIcon" icon="back" @click.native="closePage" slot="left"></mt-button>',
    '  <mt-button v-if="leftIcon" @click.native="clickLeftBtn" slot="left">',
    '    <i :class="leftIcon" aria-hidden="true" slot="icon"></i>',
    '  </mt-button>',
    '	 <mt-button v-if="rightIcon" @click.native="clickRightBtn" slot="right">',
    '    <i :class="rightIcon" aria-hidden="true" slot="icon"></i>',
    '  </mt-button>',
    '</mt-header>',
  ].join(''),
  methods: {
    clickLeftBtn: function () {
      this.$emit('clickleft');
    },
    clickRightBtn: function () {
      this.$emit('clickright');
    },
    closePage: function () {
      window.appcan && appcan.window.close();
    }
  }
});

/**
 * @author gf 2018.08.13
 * @description 内容组，带组标题
 */
Vue.component('jas-group', {
  props: {
    title: {},
  },
  data: function () {
    return {}
  },
  template: [
    '<div class="jas-group" style="margin: 0 0 10px;background: #fff">',
    '  <div v-if="title" class="jas-group-title" style="padding:4px 10px;">',
    '    <i style="font-size:12px;border-left:3px solid #26a2ff;padding-left: 4px;"></i>',
    '    <span >{{title}}</span>',
    '  </div>',
    '  <slot></slot>',
    '</div>',
  ].join(''),
  methods: {}
});


/**
 * @author gf 2018.08.13
 * @description 项目字段详情
 */
Vue.component('jas-detail-field', {
  props: {
    label: {},
    value: {},
  },
  data: function () {
    return {}
  },
  template: [
    '<a class="mint-cell mint-field" style="min-height: 44px;">',
    '  <div class="mint-cell-left"></div>',
    '  <div class="mint-cell-wrapper">',
    '    <div class="mint-cell-title" style="color:#333;padding:8px 0;">',
    '      <span class="mint-cell-text" style="line-height:1.2;">{{label}}</span>',
    '    </div>',
    '    <div  @click="ckickItem" class="mint-cell-value" style=" padding:4px 0 0 10px;line-height:1.4;">{{value}}</div>',
    '    <slot @click="ckickItem" ></slot>',
    '  </div>',
    '  <div class="mint-cell-right"></div>',
    '</a>',
  ].join(''),
  methods: {
    ckickItem: function () {
      this.$emit('click');
    }
  }
});


/**
 * @author gf 2018.08.13
 * @description 项目字段详情组
 */
Vue.component('jas-detail-field-group', {
  props: {
    fields: {
      type: Array
    },
    form: {
      type: Object
    },
    fieldsConfig: {
      type: Object
    },
  },
  data: function () {
    return {}
  },
  template: [
    '<div>',
    '  <template v-for="item in fields" >',
    '    <jas-detail-field :label="fieldsConfig[item].label" :value="form[item]" :key="fieldsConfig[item].label" ></jas-detail-field>',
    '  </template>',
    '</div>',
  ].join(''),
  methods: {}
});


/**
 * @author gf 2018.08.13
 * @description 项目字段详情
 */
Vue.component('jas-select-field', {
  props: {
    field: {},
    label: {},
    value: {},
    isMulti: {},
    options: {},
  },
  data: function () {
    return {
      popupVisible: false,
    }
  },
  computed: {
    _value: {
      get: function () {
        if (this.isMulti) {
          return this.value ? this.value.split(',') : [];
        } else {
          return this.value;
        }
      },
      set: function (newval) {
        if (this.isMulti) {
          var arr = newval ? newval.join(',') : '';
          this.$emit('input', arr)
          this.$emit('change', arr);
        } else {
          this.popupVisible = false;
          this.$emit('input', newval);
          this.$emit('change', newval);

        }
      }
    },
    labelvalue: function () {
      var labelvalue = '';
      var _value = this._value;
      var that = this;
      if (this.isMulti) {
        this.options.forEach(function (item) {
          _value.forEach(function (value) {
            if (item.value === value) {
              labelvalue += labelvalue ? ',' + item.label : item.label;
            }
          })
        });
      } else {
        this.options.forEach(function (item) {
          if (item.value === _value) {
            labelvalue = item.label;
          }
        });
      }
      return labelvalue;
    }
  },
  template: [
    '<div>',
    '<a class="mint-cell mint-field" style="min-height: 40px;">',
    '  <div class="mint-cell-left"></div>',
    '  <div class="mint-cell-wrapper">',
    '    <div class="mint-cell-title" style="color:#333;padding:8px 0;">',
    '      <span class="mint-cell-text" style="line-height:1.2;">{{label}}</span>',
    '    </div>',
    '    <div @click="popupVisible=!popupVisible;$emit(\'optionshowed\')" class="mint-cell-value" style=" padding:4px 0 0 10px;line-height:1.4;">',
    '      <span>{{labelvalue}}</span>',
    '      <span v-show="!labelvalue" style="color:#757575;">{{\'请选择\'+ label}}</span>',
    '    </div>',
    '    <span style="color:#888;" @click="popupVisible=!popupVisible;$emit(\'optionshowed\')">',
    '      <i class="fa fa-angle-down" aria-hidden="true"></i>',
    '    </span>',
    '  </div>',
    '  <div class="mint-cell-right"></div>',
    '</a>',

    '<mt-popup v-model="popupVisible" position="bottom">',
    '  <div style="width:100vw;">',
    '    <div style="width:100vw;height:44px;text-align:center;line-height:44px;border-bottom: 1px solid #d9d9d9">',
    '      {{\'选择\'+ label}}',
    '      <div style="float:right;font-size:12px;padding-right:10px;color:#26a2ff;" @click="clearValue">清空</div>   ',
    '    </div>',
    '    <div style="width:100vw;max-height: 40vh;overflow: auto;">',
    '      <mt-checklist v-if="isMulti" style="margin-top: -9px;" v-model="_value" :options="options">',
    '      </mt-checklist>',
    '      <mt-radio v-else style="margin-top: -9px;" v-model="_value" :options="options">',
    '      </mt-radio>',
    '    </div>',
    '  </div>',
    '</mt-popup>',
    '</div>'
  ].join(''),
  methods: {
    clearValue: function () {
      this._value = undefined;
    }
  }
});


/**
 * @author gf 2018.08.27
 * @description 项目字段详情
 */
Vue.component('jas-select-top-field', {
  props: {
    value: {},
    options: {},
    tip: {},
  },
  data: function () {
    return {
      popupVisible: false,
    }
  },
  computed: {
    _value: {
      get: function () {
        var val = this.value;
        if (this.value === '') {
          this.options.forEach(function (item) {
            if (item.value === '') {
              val = item;
            }
          });
        }
        return val;
      },
      set: function (newval) {
        if ($.isPlainObject(newval)) {
          this.$emit('input', '')
        } else {
          this.$emit('input', newval)
        }
      }
    },
    labelvalue: function () {
      var labelvalue = '';
      var _value = this._value;
      this.options.forEach(function (item) {
        if (item.value === _value || item == _value) {
          labelvalue = item.label;
        }
      });
      return labelvalue;
    }
  },
  template: [
    '<div style="width:100%;box-sizing:border-box;padding:0 10px 0 10px;">',
    '	<div @click="popupVisible=!popupVisible" style="width:100%;text-align: center;line-height:40px;height:40px;">',
    '		<span style="display:inline-block;max-width:calc(100% - 20px);word-break:keep-all;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">{{labelvalue}}</span>',
    '		<i style="line-height:40px;vertical-align: top;color:#999;" class="fa fa-caret-down" aria-hidden="true"></i>',
    '	</div>',

    '<mt-popup v-model="popupVisible" position="bottom">',
    '  <div style="width:100vw;">',
    '    <div style="width:100vw;height:44px;text-align:center;line-height:44px;border-bottom: 1px solid #d9d9d9">',
    '      {{tip||"请选择"}}',
    '    </div>',
    '    <div style="width:100vw;max-height: 40vh;overflow: auto;">',
    '      <mt-radio style="margin-top: -9px;" v-model="_value" :options="options">',
    '      </mt-radio>',
    '    </div>',
    '  </div>',
    '</mt-popup>',
    '</div>'
  ].join(''),
  methods: {

  }
});

/**
 * @author gf 2018.08.31
 * @description 表单项目组
 */
Vue.component('jas-form-items-group', {
  props: {
    fieldsGroup: {
      type: Array,
    },
    fieldsConfig: {
      type: Object,
    },
    form: {
      type: Object,
    },
  },
  data: function () {
    return {
      allFields: [],
      fatherSelectList: [],
      childSelectList: [],
    }
  },
  template: [
    '<div>',
    '  <jas-group v-for="group in fieldsGroup" :title="group.groupName">',
    '    <template v-for="field in group.fields">',
    '      <template v-if="fieldsConfig[field].type===\'select\'">',
    '        <jas-select-field :ref="field" v-model="form[field]" v-required="fieldsConfig[field].required" :label="fieldsConfig[field].name" ',
    '          @optionshowed=optionshowed(field) @change=fatherSelectChanged(false,field) :options="fieldsConfig[field].options"></jas-select-field>',
    '      </template>',
    '      <template v-else-if="fieldsConfig[field].type===\'multiSelect\'">',
    '        <jas-select-field :ref="field" v-model="form[field]" :is-multi="true" v-required="fieldsConfig[field].required" :label="fieldsConfig[field].name" ',
    '          :options="fieldsConfig[field].options"></jas-select-field>',
    '      </template>',
    '      <template v-else>',
    '        <mt-field v-model="form[field]" :type="fieldsConfig[field].type" v-required="fieldsConfig[field].required" :label="fieldsConfig[field].name" ',
    '          :placeholder="\'请输入\'+fieldsConfig[field].name" rows="4" v-fieldicon="fieldsConfig[field].type"></mt-field>',
    '      </template>',
    '    </template>',
    '  </jas-group>',
    '</div>',
  ].join(''),
  mounted: function () {
    var that = this;
    this.fieldsGroup.forEach(function (group) {
      that.allFields = that.allFields.concat(group.fields);
    });
    appcan.ready(function () {
      that.resetFieldsConfig(that.allFields, that.fieldsConfig);
    });
  },
  methods: {
    triggerFatherSelectsChange: function (fatherSelectList) {
      var that = this;
      var SelectList = fatherSelectList || that.fatherSelectList;
      setTimeout(function () {
        SelectList.forEach(function (item) {
          that.$refs[item][0].$emit('change', true)
        });
      }, 0);
    },
    resetFieldsConfig: function (fields, fieldsConfig) {
      var that = this;
      var rulesObj = {};
      var fieldArr = [];
      var fieldNameArr = [];
      fields.forEach(function (field) {
        if (!fieldsConfig.hasOwnProperty(field)) return;
        var config = fieldsConfig[field];
        /* 初始化赋值 */
        if (!config.options) {
          that.$set(config, 'options', []);
          that.$set(config, 'rules', []);
        }
        if (config.type === 'select' && config.childSelect && config.childSelect.length > 0) {
          that.childSelectList.push.apply(that.childSelectList, config.childSelect);
          that.fatherSelectList.push(field);
        }
        /* 请求阈值 */
        if (config.domainName) {
          (function (field, config) {
            that.requestDomainFromDomainTable(config.domainName, function (options) {
              config.options = options;
            });
          })(field, config)
        }
        if (config.optionUrl) {
          (function (field, config) {
            var obj = {};
            if (config.requestParams) {
              obj = jasTools.base.extend(obj, config.requestParams);
            }
            jasTools.ajax.post("/" + config.optionUrl, obj, function (data) {
              config.options = data.rows.map(function (item) {
                return {
                  label: item.value,
                  value: item.key,
                }
              });
            });
          })(field, config)
        }
      });
    },
    optionshowed: function (currentField) {
      var fieldArr = this.allFields;
      var fieldsConfig = this.fieldsConfig;

      for (var field in fieldsConfig) {
        var fieldIndex = fieldArr.indexOf(field);
        if (fieldIndex > -1 && fieldsConfig.hasOwnProperty(field)) {
          if (fieldsConfig[field].childSelect && fieldsConfig[field].childSelect.indexOf(currentField) > -1) {
            if (!this.form[field]) {

              top.Vue.prototype.$toast('请先选择' + fieldsConfig[field].name);
            }
          }
        }
      }
    },
    fatherSelectChanged: function (isInit, fatherField) {
      var that = this;
      var fieldConfig = this.fieldsConfig[fatherField];
      var form = this.form;
      var setChildOptionsAndValue = function (childField, options) { // 入参下拉选项
        that.fieldsConfig[childField].options = options;
        !isInit && (form[childField] = '');
        if (options.length === 1) { //只有一个选项就自动复制
          form[childField] = options[0].value;
        }
        that.$refs[childField][0].$emit('change', isInit);
      };

      var getAndSet = function (fatherField, fatherValue, childField, requestUrl) {
        if (fatherValue) { //进行子级的查找 后台请求
          var obj = {
            "rows": 100,
            "page": 1,
          };
          var fieldConfig = that.fieldsConfig[childField];
          if (fieldConfig.requestParams) {
            obj = jasTools.base.extend(obj, fieldConfig.requestParams);
          }

          obj[jasTools.base.switchToCamelCase(fatherField)] = fatherValue;
          jasTools.ajax.post("/" + requestUrl, obj, function (data) {
            setChildOptionsAndValue(childField, data.rows.map(function (item) {
              return {
                label: item.value,
                value: item.key,
              }
            }))
          });
        } else {
          setChildOptionsAndValue(childField, []);
        }
      };

      fieldConfig.childSelect && fieldConfig.childSelect.forEach(function (childField, index) {
        if (!fieldConfig.childUrl || fieldConfig.childUrl.length === 0) return;
        var url = fieldConfig.childUrl[index] || fieldConfig.childUrl[0];
        getAndSet(fatherField, form[fatherField], childField, url);
      });
      this.fieldChanged(fatherField)
    },
    fieldChanged: function (field) {
      // console.log(this.$refs[field + 123][0].form)
      this.$refs[field + 123][0].form.validateField(field);
    },
    requestDomainFromDomainTable: function (domainName, cb) {
      var that = this;
      var url = "/jasframework/sysdoman/getDoman.do";
      jasTools.ajax.get(url, {
        "domainName": domainName
      }, function (data) {
        var aDomain = data.map(function (item) {
          return {
            value: item.codeId,
            label: item.codeName,
          }
        });
        cb && cb(aDomain);
      });
    },
    requestDomainFromBizTable: function (url, obj, cb) {
      var that = this;
      // var url = jasTools.base.rootPath + url;
      jasTools.ajax.post(url, obj, function (data) {
        cb && cb(data.rows);
      }, function () {
        cb && cb([]);
      });
    },
  },

});