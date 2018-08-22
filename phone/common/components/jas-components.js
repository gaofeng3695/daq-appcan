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
    '    <div class="mint-cell-title" style="color:#333;padding:4px 0;">',
    '      <span class="mint-cell-text" style="line-height:1.2;">{{label}}</span>',
    '    </div>',
    '    <div  @click="ckickItem" class="mint-cell-value" style=" padding:4px 0;line-height:1.4;">{{value}}</div>',
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
        } else {
          this.$emit('input', newval)
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
    '    <div class="mint-cell-title" style="color:#333;padding:4px 0;">',
    '      <span class="mint-cell-text" style="line-height:1.2;">{{label}}</span>',
    '    </div>',
    '    <div @click="popupVisible=!popupVisible" class="mint-cell-value" style=" padding:4px 0;line-height:1.4;">',
    '      <span>{{labelvalue}}</span>',
    '      <span v-show="!labelvalue" style="color:#757575;">{{\'请选择\'+ label}}</span>',
    '    </div>',
    '    <span style="color:#888;" @click="popupVisible=!popupVisible">',
    '      <i class="fa fa-chevron-down" aria-hidden="true"></i>',
    '    </span>',
    '  </div>',
    '  <div class="mint-cell-right"></div>',
    '</a>',

    '<mt-popup v-model="popupVisible" position="bottom">',
    '  <div style="width:100vw;">',
    '    <div style="width:100vw;height:44px;text-align:center;line-height:44px;border-bottom: 1px solid #d9d9d9">',
    '      选择项目人员',
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

  }
});