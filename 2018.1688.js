// 需要配合 fiddler 使用
// fiddler 脚本

// if((oSession.uriContains('www.8100d.com') || oSession.uriContains('vrbetapi.com/v/Bet/1')) && oSession.oResponse.headers.ExistsAndContains("Content-Type","text/html"))) { 
// oSession.utilDecodeResponse(); 
// var oBody = System.Text.Encoding.UTF8.GetString(oSession.responseBodyBytes);
// oBody = oBody.replace("<head>", '<head><meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">');
// // 使用正则进行替换
// oBody = oBody.replace("</body>", '<script crossorigin="anonymous" integrity="sha384-LVoNJ6yst/aLxKvxwp6s2GAabqPczfWh6xzm38S/YtjUyZ+3aTKOnD/OJVGYLZDl" src="https://lib.baomitu.com/jquery/3.5.0/jquery.min.js"></script><script src="http://localhost/auto.js?key=5f037599d0b895d705b7b34d"></script></body>');
// //设置新的响应内容
// oSession.utilSetResponseBody(oBody);
// }

var analy = function(el) {
    var objs = {};

    var title = document.querySelector('#mod-detail-title>h1').innerText;
    var imgprops = document.querySelectorAll("#dt-tab li img:not([data-lazy-src])");
    var description = document.querySelector('#de-description-detail').innerHTML;

    var imgs = new Array();
    imgprops.forEach(element => {
        imgs.push(element.getAttribute('src').replace("60x60", "460x460"));
    });


    objs.url = location.href;
    objs.title = title;
    objs.imgs = imgs;
    objs.description = description.replace(/\n\t/g, "");

    objs.sku = {
        skuProps: iDetailData.sku.skuProps,
        skuMap: iDetailData.sku.skuMap
    };

    var objstr = JSON.stringify(objs);

    var input = document.createElement('input');
    input.setAttribute('readonly', 'readonly');
    input.setAttribute('value', objstr);
    document.body.appendChild(input);
    input.setSelectionRange(0, objstr.length);
    input.select();


    if (document.execCommand('Copy')) {
        document.execCommand('Copy');
        el.innerHTML = '<span style="color: AQUAMARINE; font-size: 13px;">点击解析(解析成功)</span>';
        layer.msg('解析成功', { icon: 1 });
    } else {
        el.innerHTML = '<span style="color: MINTCREAM; font-size: 13px;">点击解析(解析失败)</span>';
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

    var contentWrap = document.querySelector(".content-wrap");
    var docheight = 0,
        cury = 0;
    var interval = setInterval(function() {
        docheight = contentWrap.scrollHeight;
        cury += 200;
        window.scrollTo(0, cury);
        if (cury >= docheight) {
            window.scrollTo(0, 150);
            clearInterval(interval);
            
            setTimeout(function() {
                // copybtn.click();
                analy(copybtn);
            }, 1500)
        }
    }, 20);
};
