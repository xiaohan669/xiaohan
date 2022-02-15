   // ajax : async javascript and xml (json) "{}"
   //       异步的javaScript 和 xml (json) 
   //       同步 ： 一行一行的执行 (按顺序执行) 
   //       异步 ： 同时进行
   //       用途 ： 数据交互
   //        接口
   // 问问题：
   // 问的问题内容  =====》 请求参数
   //  问谁        =====》 接口
   // 通过什么方式进行提问题    =====> 请求方式
   // 通过哪种语言进行表达的    =====》 请求头
   // 收到数据之后做哪些处理    =====> 成功的回调函数

  /**
   * @params {Object}   options
   *         method     请求方式
   *         url        请求地址
   *         isAsync    是否异步
   *         data       请求参数（ 发送的数据）
   *         success   拿到数据之后的回调函数
   */
  function ajax(options) {
     // var xhr = new XMLHttpRequest();
     var xhr = null;
     var url = options.url;
     var data = options.data;
     var dataStr = "";
     var success = options.success || function () {};
     var isAsync = options.isAsync;
     if(window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
     } else if (window.ActiveXObject) {
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
     } else {
        return alert('当前浏览器不支持的XMLHttpRequest')
     }

      //判断 传递过来的数据是否是对象类型的  如果是对象类型的转换成字符串  key=value&key1=value1
     if(typeof data === 'object') {
        for (var prop in data) {
           if(data.hasOwnProperty(prop)) {
              dataStr += prop + '=' + data[prop] + '&';
           }
        }
     } else {
        dataStr = data.toString();
     }
   //   console.log(xhr.readyState)
     //监听readyState属性的变化  readystate属性是用来例句当前数据交互的过程状态的
     // ready State的值为 0 - 4
     // 0 代表还没有进行数据交互
     // 1 代表还没有建立连接 (open方法还没有执行) 
     // 2 代表连接已经建立  (open方法已经执行)
     // 3 代表数据传递完成 (send方法执行完成)
     // 4 代表对方给力响应
     xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
       //   xhr.status   状态码
       if(xhr.status === 200) {
          success(JSON.parse(xhr.responseText))
       }

      }
   }
     // 将请求方式全部转换成大写
     var method = options.method.toUpperCase();
     // 判断请求方式为GET类型  GET类型的特点 ： 数据拼接在地址当中
     if(method === 'GET') {
         // 建立连接
      xhr.open(method, url + '?' + dataStr, isAsync);
         // 发送数据
      xhr.send();
     } else {
        //请求方式为非GET请求的  那么需要单独传递请求参数 （数据）   就需要告诉对方你的数据编码方式 （通过请求头设置）
        xhr.open(method, url, isAsync);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(dataStr);
     }
 
  }