// ==UserScript==
// @name        2018.1688.js
// @namespace   1688AUTO  Scripts
// @include     *://detail.1688.com/*
// @grant       none
// @version     1.0
// @author      -
// @description 2022/5/23 18:58:01
// ==/UserScript==

var analy = function(el) {
    var objs = {};

    var title = document.querySelector('.title-text').innerText;
    var imgprops = document.querySelectorAll("img.detail-gallery-img");
    var description = document.querySelector('.content-detail').innerHTML;

    var imgs = new Array();
    imgprops.forEach(element => {
        imgs.push(element.getAttribute('src'));
                  // .replace("60x60", "460x460"));
    });


    objs.url = location.href;
    objs.title = title;
    objs.imgs = imgs;
    objs.description = description.replace(/\n\t/g, "");

    // objs.sku = {
    //     skuProps: iDetailData.sku.skuProps,
    //     skuMap: iDetailData.sku.skuMap
    // };

  let data = window.__INIT_DATA.data;
      let  good = window.__INIT_DATA.globalData;

  objs.sku = good.skuModel;

    var objstr = JSON.stringify(objs);

    var input = document.createElement('input');
    input.setAttribute('readonly', 'readonly');
    input.setAttribute('value', objstr);
    document.body.appendChild(input);
    input.setSelectionRange(0, objstr.length);
    input.select();


    if (document.execCommand('Copy')) {
        document.execCommand('Copy');
        el.innerHTML = '<span style="color: #1abc9c; font-size: 13px;">点击解析(解析成功)</span>';
        layer.msg('解析成功', { icon: 1 });
    } else {
        el.innerHTML = '<span style="color: #ff6b81; font-size: 13px;">点击解析(解析失败)</span>';
        layer.msg('解析失败', { icon: 2 });
    }
    document.body.removeChild(input);

}


window.onload = function() {
	document.body.click();
    var action_panel = document.getElementsByClassName('order-button-children');

    var copybtn = document.createElement('a');
    copybtn.setAttribute('class', 'do-purchase');
    copybtn.setAttribute('style', 'margin-top: 10px');
    copybtn.innerHTML = '<span>点击解析</span>'
    copybtn.onclick = function() {
        analy(copybtn);
    }

    action_panel[0].appendChild(copybtn);

   var contentWrap = document.body;
            var docheight = 0,
                cury = 0;
            var interval = setInterval(function () {
                docheight = contentWrap.scrollHeight;
                cury += 200;
                window.scrollTo(0, cury);
                if (cury >= docheight) {
                    window.scrollTo(0, 150);
                    clearInterval(interval);
                    // document.querySelector('.cat-modal').style.display = "block";
                }
            }, 50);
};
