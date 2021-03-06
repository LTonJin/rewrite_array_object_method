
/**
 * 重写数组常用方法
 * forEach
 * map
 * filter
 * every
 * some
 * reduce
 * 因为需要深拷贝我们先实现一下deepClone
 * 注意点：声明我使用var，因为我们是实现兼容才重写的这些方法
 */

// 实现一个深拷贝
function deepClone(o) {
  if (typeof o !== "object" || o === null) return o;

  var _tar = Object.prototype.toString.call(o) === '[object Array]' ? [] : {};
  for (var k in o) {
    if (o.hasOwnProperty(k)) {
      var el = o[k];
      _tar[k] = deepClone(el);
    }
  }
  return _tar;
}

/**
 * forEach有两个参数，第一个是个回调，第二个可选参数是回调的this指向
 * 回调有三个参数，第一个是item，第二个是index，第三个是当前数组
 */

Array.prototype.myForEach = function (cb, obj = window) {
  var _arr = this;

  for (var i = 0; i < _arr.length; i++) {
    cb.apply(obj,[ _arr[i], i, _arr]);
  }
};

/**
 * map参数同forEach
 * map会返回一个新数组（映射）
 */
Array.prototype.myMap = function (cb, obj = window) {
  var _arr = this;
  var _tar = [];

  for (var i = 0; i < _arr.length; i++) {
    _tar[i] = deepClone(cb.apply(obj, [_arr[i], i, _arr]));
  }
  return _tar;
}

/**
 * filter参数同forEach
 * filter会返回一个新数组，数组里的item符合筛选条件（过滤）
 */

Array.prototype.myFilter = function (cb, obj = window) {
  var _arr = this;
  var _tar = [];
  var index = 0;

  for (var i = 0; i < _arr.length; i++) {
    if (cb.apply(obj, [_arr[i], i, _arr])) {
      _tar[index] = deepClone(_arr[i]);
      index++;
    }
  }
  return _tar;
}

/**
 * every参数同forEach
 * every返回一个布尔值，表示数组里的每一项是否都满足给定的条件（&&）
 */

  Array.prototype.myEvery = function (cb, obj = window) {
    var _arr = this;
    var flag = true;

    for (let i = 0; i < _arr.length; i++) {
      if(!cb.apply(obj, [_arr[i], i, _arr])) 
        flag = false;
    }
    return flag;
  } 

 /**
 * some参数同forEach
 * some返回一个布尔值，表示数组里是否有一项满足给定的条件（||）
 */

  Array.prototype.mySome = function (cb, obj = window) {
    var _arr = this;
    var flag = false;

    for (let i = 0; i < _arr.length; i++) {
      if(cb.apply(obj, [_arr[i], i, _arr])) 
        flag = true;
    }
    return flag;
  }  

  /**
   * reduce参数第一个为回调，第二个为回调函数的第一个参数默认值（可选，默认为数组第一项）
   * reduce将结果汇总为单个值返回（汇总）
   */

  Array.prototype.myReduce = function (cb, total) {
    var _arr = this;
    var _total = total || _arr[0];

    for (let i = 0; i < _arr.length; i++) {
        _total = cb(_total, deepClone(_arr[i]), i, _arr);
      
    }
    return _total;
  }


/**================================================================ */
/**
 * 重写Object的静态方法
 * create
 * assign
 * freeze
 * entries
 * fromEntries
 * seal
 */

/**
 * create方法返回一个新对象
 * 接收两个个参数
 * 新对象的__proto__属性指向第一个参数
 * 第二个参数可选，为属性的配置项
 */

  Object.myCreate = function (proto, propertiesObject) {
    // Object.prototype = proto;
    var _tar = new Object();
    _tar.__proto__ = proto;
    for (const k in propertiesObject) {
      if (propertiesObject.hasOwnProperty(k)) {
        const el = propertiesObject[k];
        Object.defineProperty(_tar, k, el)
        
      }
    }
    return _tar;
  };

  /**
   * assign返回一个目标对象
   * 接受一个目标参数和n个源对象
   */

  Object.myAssign = function (target, ...sources) {
    sources.forEach(source => {
      var descriptors = Object.keys(source).reduce((descriptor, key) => {
         descriptor[key] = Object.getOwnPropertyDescriptor(source, key);
         return descriptor;
      }, {});
      Object.defineProperties(target, descriptors);
    });
    return target;
  }

  /**
   * freeze，特点可读性，不可写，不可扩展，不可删除
   */

  Object.myFreeze = function (o) {
    for (const k in o) {
      if (o.hasOwnProperty(k)) {
        Object.defineProperty(o, k, {
          writable: false,
          configurable: false,

        })
        Object.preventExtensions(o);
        
      }
    }
    return o;
  }
  

  /**
   * freeze返回对象本身
   * 接受参数为object，如果是基本类型则返回数据本身（ES5之前会报错）
   * 因为freeze为浅冻结，我们自己实现一个深冻结
   */

  Object.deepFreeze = function (o) {
    Object.getOwnPropertyNames(o).forEach(key => {
      if(typeof o[key] === 'object' && o[key] !== null)
        Object.deepFreeze(o[key]);
    })
    return Object.freeze(o);
  }

  /**
   * entries是方法是将对象转为健值对数组
   */
  
  Object.myEntries = function (o) {
    var _pool = [];
    if (Object.prototype.toString.call(o) === '[object Object]') {
      for (const k in o) {
        if (o.hasOwnProperty(k)) {
          var _arr = [k, o[k]];
          _pool.push(_arr);
          
        }
      }
    }
    return _pool;
  }

  /**
   * fromEntries是将健值对数组转为对象
   */

  Object.myFromEntries = function (arr) {
    var _o = {};
    for (const [k, v] of arr) {
      _o[k] = v
    }
    return _o;
  }


  /**
   * seal是密封对象和freeze的区别是可修改
   */

  Object.mySeal = function (o) {
    for (const k in o) {
      if (o.hasOwnProperty(k)) {
        Object.defineProperty(o, k, {
          writable: true,
          configurable: false,
        });
        Object.preventExtensions(o);
        
      }
    }
    return o;
  }

  /**
   * seal是浅密封，我们自己实现一个深密封
   */

  Object.deepSeal = function (o) {
    Object.getOwnPropertyNames(o).forEach(k => {
      if(typeof o[k] === 'object')
        Object.deepSeal(o[k]);
    })
    return Object.mySeal(o);
  }