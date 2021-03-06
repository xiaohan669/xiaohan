
function getData() {
    ajax({
        method : 'get',
        url : './data.json',
        isAsync : true,
        data : "",
        success : function (data) {
            console.log(data);
            renderDom(data);
        }
    })
}


var oLi = document.getElementsByClassName('col');
function renderDom(data) {
    // 如果一行一行插入的话  那么数据索引值为0  4  8  12....应给插入到索引值为0 的列去。
    data.forEach(function (item, index) {
        var itemDom = createPic(item);
        // oLi[index % 4].appendChild(itemDom);
        var index = getMinLi().minIndex;
        oLi[index].appendChild(itemDom);
    });
}

// 图片渲染宽度
var imgWidth = oLi[0].offsetWidth - 20 - 20;
// 创建图片结构的 
function createPic(data) {
    var oItem = document.createElement('div');
    oItem.className = "item";
    var oImg = new Image();
    oImg.src = data.img;
    // 预留img的高度
    // 照片本身的宽高比为  data.width / data.height
    // 渲染到页面当中图片的宽度为 ： oLi[0].offsetWidth - 20 - 20
    // 求渲染图片的高度：
    // data.width        imgWidth
    // ------------ = ---------------
    // data.height       height

    oImg.height = imgWidth * data.height / data.width;
    var oP = document.createElement('p');
    oP.innerText = data.desc;
    oItem.appendChild(oImg);
    oItem.appendChild(oP);
    return oItem;
}

// 查找最短列
function getMinLi() {
    var oLi = document.getElementsByClassName('col');
    var minIndex = 0;
    var minHeight = oLi[minIndex].offsetHeight;
    for(var i = 0; i < oLi.length; i++) {
        if(oLi[i].offsetHeight < minHeight) {
            minHeight= oLi[i].offsetHeight;
            minIndex = i;
        }
    }
    return {
        minHeight : minHeight,
        minIndex : minIndex
    }

}
getData()

var timer = null;
window.onscroll = function () {
    var scrollYoffset = window.pageYOffset;
    var innerHeight = window.innerHeight;
    var minHeight = getMinLi().minHeight;
    clearTimeout(timer);
    // 判断页面中是否出现空白  如果出现空白则获取下一组数据
    if (scrollYoffset + innerHeight > minHeight) {
        // 防抖处理
        timer = setTimeout(function () {
            getData();

        },500);
    }
}

 // 懒加载 ： 用到的时候去加载
 // 预加载 ： 先把所有资源全部拿到然后用到的时候直接拿过来