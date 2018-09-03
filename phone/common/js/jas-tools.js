/**
 * @author gf 2018.08.08
 * @description 通用方法
 *
 */

(function () {
	/**
	 * @description 添加页面报错的监听
	 */
	var addErrorListener = function () {
		window.onerror = function (errorMessage, scriptURI, lineNumber) {
			if (scriptURI.indexOf('appcan.js') > -1 || !scriptURI) return; // 过滤appcan点击的bug
			alert(JSON.stringify({
				message: errorMessage,
				script: scriptURI,
				line: lineNumber
			}, 4, 4));
		}
	};
	addErrorListener();
})();


(function (window) {

	/**
	 * @description 基础操作库
	 *
	 */
	var tools = (function () {
		/**
		 * @description 创建uuid
		 */
		var createuuid = function () {
			var s = [];
			var hexDigits = "0123456789abcdef";
			for (var i = 0; i < 36; i++) {
				s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
			}
			s[14] = "4";
			s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
			s[8] = s[13] = s[18] = s[23] = "-";
			var uuid = s.join("");
			return uuid;
		};


		/**
		 * @description 继承对象
		 * @param target  要被继承的对象
		 */
		var extend = function (target) {
			for (var i = 1, j = arguments.length; i < j; i++) {
				var source = arguments[i] || {};
				for (var prop in source) {
					if (source.hasOwnProperty(prop)) {
						var value = source[prop];
						if (value !== undefined) {
							target[prop] = value;
						}
					}
				}
			}
			return target;
		};


		/**
		 * @description   获取url的
		 * @param target  要被继承的对象
		 */
		var getParamsInUrl = function (url) {
			var obj = null;
			if (url) {
				var arr = url.split('?');
				if (arr.length > 1) {
					var str = arr[1];
					var arr2 = str.split('&');
					arr2.forEach(function (item) {
						var _arr = item.split('=');
						if (_arr.length > 1) {
							obj = obj ? obj : {};
							obj[_arr[0]] = _arr[1];
						}
					})
				}
			} else {
				var str = uexWindow.getUrlQuery();
				if (!str) return {};
				var arr2 = str.split('&');
				arr2.forEach(function (item) {
					var _arr = item.split('=');
					if (_arr.length > 1) {
						obj = obj ? obj : {};
						obj[_arr[0]] = _arr[1];
					}
				})
			}
			return obj || {};
		};


		/**
		 * @description  	向url上添加 key:value
		 * @param url  locoation.href
		 * @param obj  键值对
		 */
		var setParamsToUrl = function (url, obj) {
			if (!obj || typeof obj !== 'object') {
				return url
			}
			for (var prop in obj) {
				if (obj.hasOwnProperty(prop)) {
					var value = obj[prop];
					if (value !== undefined) {
						var str_connenct = url.indexOf('?') === -1 ? '?' : '&';
						url += str_connenct + prop + '=' + value;
					}
				}
			}
			return url;
		};


		/**
		 * @description 某一dom节点上的事件，一段时间内只执行一次
		 * @param btnDom  dom节点
		 * @param ms  毫秒数
		 * @param cb  执行的函数
		 */

		var getIdArrFromTree = function (treeData, nodeId, config) {

			var pidArr = [nodeId];
			var getPId = function (dataArr, id, pid) {
				for (var i = 0; i < dataArr.length; i++) {
					var item = dataArr[i];
					if (item.id === id) {
						return pid;
					} else {
						if (item.children && item.children.length > 0) {
							var result = getPId(item.children, id, item.id);
							if (result) return result;
						}
					}
				}
			};
			var getPPId = function (dataArr, id) {
				var pid = getPId(dataArr, id, '');
				if (pid) {
					pidArr.push(pid);
					getPPId(dataArr, pid);
				} else {
					return pidArr;
				}
			};

			getPPId(treeData, nodeId);
			return pidArr.reverse();
		};

		//字符串下划线转为驼峰
		var switchToCamelCase = function (string) {
			// Support: IE9-11+
			return string.replace(/_([a-z])/g, function (all, letter) {
				return letter.toUpperCase();
			});
		}

		var eventBus = function (eventObj, fn) {
			function EvnentBus(eventObj, fn) {
				this.nameList = [];
				this.fnList = [];
				this.fn = fn;
				this.init(eventObj, fn);
			}
			EvnentBus.prototype = {
				constructor: EvnentBus,
				init: function (eventObj, fn) {
					for (var key in eventObj) {
						if (eventObj.hasOwnProperty(key)) {
							this.nameList.push(key);
							this.fnList.push(eventObj[key]);
						}
					}
					this.go(0);
				},
				go: function (index) {
					if (index > this.fnList.length - 1) {
						this.fn && this.fn();
					} else {
						this.index = index;
						this.currentFnName = this.nameList[this.index];
						this.fnList[index] && this.fnList[index].call();
					}
				},
				next: function () {
					this.index++;
					this.go(this.index);
				}
			};
			return new EvnentBus(eventObj, fn);
		};


		return {
			createuuid: createuuid,
			extend: extend,
			getParamsInUrl: getParamsInUrl,
			setParamsToUrl: setParamsToUrl,
			getIdArrFromTree: getIdArrFromTree,
			switchToCamelCase: switchToCamelCase,
			eventBus: eventBus,
		};
	})();

	//
	var ajax = (function (appcan) {
		var protocolConfig = appcan.locStorage.getVal('serverProtocol') || 'http://'; //协议
		var host = appcan.locStorage.getVal('serverIP') || '192.168.100.43'; //主机
		var portConfig = appcan.locStorage.getVal('serverPort') || ''; //端口号

		var serverURL = protocolConfig + host + (portConfig ? ':' : '') + portConfig + '/';
		var routeURL = 'DAQProject';
		var completeURL = serverURL + routeURL;

		var ajax = function (sType, sUrl, oData, fnSuccess, fnFail) {
			if (!sType) {
				alert('请传入类型！');
				return;
			}
			if (!sUrl) {
				alert('请传入url！');
				return;
			}

			appcan.ajax({
				type: sType,
				url: completeURL + sUrl + (sUrl.indexOf("?") !== -1 ? '&' : '?') + 'token=' + localStorage.getItem("token"),
				data: oData,
				headers: {
					"Content-type": "application/json;charset=utf-8",
					"Accept": "*/*"
				}, //设置请求头
				contentType: "application/json;charset=utf-8", //请求时发送的数据格式
				dataType: 'json', //期望服务器返回的数据格式
				timeout: 30000, //超时时间
				cache: false, //不缓存get返回的数据
				beforeSend: function () {

					//baseOperation.londingToast('数据请求中，请稍后...', 999999);
				},
				success: function (oData, status, requestCode, response, xhr) {
					//baseOperation.closeToast();
					if (oData.success == 1 || oData.status == 1) {
						return fnSuccess && fnSuccess(oData, status, requestCode, response, xhr);
					} else {
						//baseOperation.alertToast('网络繁忙，请稍后再试');
						Vue && Vue.prototype.$indicator.close();
						Vue && Vue.prototype.$toast(oData.msg || '网络繁忙，请稍后再试');
						return fnFail && fnFail(oData);
					}
				},
				error: function (xhr, erroType, error, msg) {
					Vue && Vue.prototype.$indicator.close();
					Vue && Vue.prototype.$toast('网络连接失败，请检查您的网络');
					//baseOperation.alertToast('网络连接失败，请检查您的网络', 3333);
					return fnFail && fnFail(xhr);
				}
			});
		};
		return {
			serverURL: serverURL,
			get: function (sUrl, oData, fnSuccess, fnFail) {
				try {
					ajax.call(this, 'GET', sUrl, oData, fnSuccess, fnFail);
				} catch (e) {
					Vue && Vue.prototype.$indicator.close();
					Vue && Vue.prototype.$toast('系统故障，网络已中断');

					return fnFail && fnFail(e);
				}
			},
			post: function (sUrl, oData, fnSuccess, fnFail) {
				try {
					ajax.call(this, 'POST', sUrl, oData, fnSuccess, fnFail);
				} catch (e) {
					Vue && Vue.prototype.$indicator.close();
					Vue && Vue.prototype.$toast('系统故障，网络已中断');

					return fnFail && fnFail(e);
				}
			},
			uploadFile: function (sUrl, sPath, fnSuccess, fnFail, fnProgress, isHideTip) { //sPath :文件路径,
				//此处有一个坑，多个文件上传成功后，会出现调用error的情况
				appcan.ajax({
					type: 'POST',
					url: completeURL + sUrl + (sUrl.indexOf("?") !== -1 ? '&' : '?') + 'token=' + appcan.locStorage.getVal("token"),
					data: {
						file: {
							path: sPath
						}
					},
					contentType: false, //请求时发送的数据格式
					dataType: 'json', //期望服务器返回的数据格式
					timeout: 30000, //超时时间
					beforeSend: function () {
						//baseOperation.londingToast('数据请求中，请稍后...', 999999);
					},
					success: function (oData, status, requestCode, response, xhr) {
						//baseOperation.closeToast();
						if (oData.success === 1) {
							return fnSuccess && fnSuccess(oData, status, requestCode, response, xhr);
						} else {
							//(!isHideTip) && baseOperation.alertToast('网络繁忙，请稍后再试');
							return fnFail && fnFail();
						}
					},
					progress: function (progress, xhr) {
						//baseOperation.londingToast(progress,999999);
					},
					error: function (xhr, erroType, error, msg) {
						(!isHideTip) && baseOperation.closeToast();
						//(!isHideTip) && baseOperation.alertToast('网络连接失败，请检查您的网络', 3333);
						return fnFail && fnFail();
					}
				});
			},

			uploadFiles: function (sBizId, oFiles, fnSuccess, fnFail, isHideTip) {
				var that = this;
				var nFileQtty = 0;
				var nFileQtty_success = 0;
				var nFileQtty_fail = 0;
				var fnResult_done = false;

				var fnResult = function () {
					if (nFileQtty_success + nFileQtty_fail < nFileQtty || fnResult_done) {
						return; //未全部上传成功，返回
					}
					if (nFileQtty_success > 0) {
						fnResult_done = true;
						return fnSuccess && fnSuccess(); //有一个附件上传成功，就算成功
					}
					return fnFail && fnFail(); //否则，算作失败
				};

				for (var item in oFiles) { //循环，异步上传附件，是否上传成功，会在回调中计算
					if (oFiles.hasOwnProperty(item)) {
						var bizType = item;
						var aFiles = oFiles[item];
						var sUrl = "cloudlink-core-file/attachment/save?businessId=" + sBizId + "&bizType=" + bizType;
						aFiles.forEach(function (src, index) {
							nFileQtty++;
							that.uploadFile(sUrl, src, function () {
								nFileQtty_success++;
								//alert('nFileQtty_success'+nFileQtty_success)
								fnResult();
							}, function () { //有时候上传成功后也会走失败，这是坑，加了fnResult_done做判断，已解决
								//alert('nFileQtty_fail'+nFileQtty_fail)
								nFileQtty_fail++;
								fnResult();
							}, true);
						});
					}
				}
				if (nFileQtty === 0) { //如果没有附件，直接运行成功回调
					return fnSuccess && fnSuccess();
				}
			},
			deleteFilesByBizId: function (sBizId, fnSuccess) {

				var partURL = "cloudlink-core-file/attachment/delBizAndFileByBizIdsAndBizAttrs";
				var queryObj = {
					"bizTypes": ["pic", "signature"],
					"bizIds": [sBizId]
				};
				jasRequest.post(partURL, queryObj, function (oData) {
					return fnSuccess && fnSuccess();
				});
			}
		};
	})(appcan);

	var database = (function () {
		var dbName = "ZYXXWSDB_001"; //数据库名称
		var isDBCreted = false;
		var initDB = function (fn) {
			if (isDBCreted) {
				fn && fn();
			} else {
				appcan.database.create(dbName, function (err, data, db, dataType, optId) {
					alert('创建数据库data:' + data);
					if (!isDBCreted) {
						uexDataBaseMgr.open(dbName);
					}
					isDBCreted = true;
					fn && fn();
				});
			}
			//初始化数据库
		};
		// //数据库查询的方法
		// var dbSelect = function (sql, callback) {
		// 	initDB(function () {
		// 		appcan.database.select(dbName, sql, function (err, data, dataType, optId) {
		// 			var result = "";
		// 			if (!err) {
		// 				result = JSON.parse(data);
		// 			}
		// 			if (appcan.isFunction(callback)) {
		// 				callback(err, result);
		// 			}
		// 			//uexDataBaseMgr.close(dbName);

		// 		});
		// 	});
		// };
		// //数据库创建Table的方法
		// var dbCreateTable = function (sql, callback) {
		// 	initDB(function (db) {
		// 		// db.exec(sql, function (err, data, dataType, optId) {
		// 		// 	callback(err, data);
		// 		// });
		// 		appcan.database.exec(dbName, sql, function (err, data, dataType, optId) {
		// 			alert('创建表data:' + data)
		// 			if (appcan.isFunction(callback)) {
		// 				callback(err, data);
		// 			}
		// 			//uexDataBaseMgr.close(dbName);

		// 		});

		// 	});
		// };
		// //数据库执行的方法（insert、update、delete）
		// var dbExec = function (sql, callback) {
		// 	initDB(function () {
		// 		appcan.database.exec(dbName, sql, function (err, data, dataType, optId) {
		// 			if (appcan.isFunction(callback)) {
		// 				callback(err, data);
		// 			}
		// 		});
		// 		//uexDataBaseMgr.close(dbName);

		// 	});
		// }

		//数据库创建Table的方法
		var dbCreateTable = function (sql, callback) {
			db = uexDataBaseMgr.open(dbName);
			uexDataBaseMgr.sql(db, sql, function (err) {
				alert('创建表err:' + err)
				if (err) {
					alert('createTable failed')
				}
				if (appcan.isFunction(callback)) {
					callback();
				}
			});
		};
		//数据库查询的方法
		var dbSelect = function (sql, callback) {


			initDB(function () {
				appcan.database.select(dbName, sql, function (err, data, dataType, optId) {
					var result = "";
					if (!err) {
						result = JSON.parse(data);
					}
					if (appcan.isFunction(callback)) {
						callback(err, result);
					}
					//uexDataBaseMgr.close(dbName);

				});
			});
		};

		//数据库执行的方法（insert、update、delete）
		var dbExec = function (sql, callback) {
			initDB(function () {
				appcan.database.exec(dbName, sql, function (err, data, dataType, optId) {
					if (appcan.isFunction(callback)) {
						callback(err, data);
					}
				});
				//uexDataBaseMgr.close(dbName);

			});
		}

		return {
			createTable: dbCreateTable,
			select: dbSelect,
			exec: dbExec,
		};
	})();



	window.jasTools = {
		base: tools,
		ajax: ajax,
		db: database
	};
})(window);