$(document).ready(function() {
    // 从session中取背景进行设置
    change_bg_by_session();
    // 页脚展示动态字体
    foorter_motion_font();
    // 跳转到最顶部
    back_to_top();
});


// 页脚动态字体
function foorter_motion_font() {
    var binft = function (r) {
        function t() {
            return b[Math.floor(Math.random() * b.length)]
        }
        function e() {
            return String.fromCharCode(94 * Math.random() + 33)
        }
        function n(r) {
            for (var n = document.createDocumentFragment(), i = 0; r > i; i++) {
                var l = document.createElement("span");
                l.textContent = e(), l.style.color = t(), n.appendChild(l)
            }
            return n
        }
        function i() {
            var t = o[c.skillI];
            c.step ? c.step-- : (c.step = g, c.prefixP < l.length ? (c.prefixP >= 0 && (c.text += l[c.prefixP]), c.prefixP++) : "forward" === c.direction ? c.skillP < t.length ? (c.text += t[c.skillP], c.skillP++) : c.delay ? c.delay-- : (c.direction = "backward", c.delay = a) : c.skillP > 0 ? (c.text = c.text.slice(0, -1), c.skillP--) : (c.skillI = (c.skillI + 1) % o.length, c.direction = "forward")), r.textContent = c.text, r.appendChild(n(c.prefixP < l.length ? Math.min(s, s + c.prefixP) : Math.min(s, t.length - c.skillP))), setTimeout(i, d)
        }
        var l = "",
            o = ["许多年前，你有一双清澈的双眼", "奔跑起来，像是一道春天的闪电", "想看遍这世界，去最遥远的远方", "感觉有双翅膀，能飞越高山和海洋", "许多年前，我曾是个朴素的少年", "爱上一个人，就不怕付出自己一生", "相信爱会永恒，相信每个陌生人", "当我和世界初相见，当我曾经是少年"].map(function (r) {
                return r + ""
            }),
            a = 2,
            g = 1,
            s = 5,
            d = 75,
            b = ["rgb(110,64,170)", "rgb(150,61,179)", "rgb(191,60,175)", "rgb(228,65,157)", "rgb(254,75,131)", "rgb(255,94,99)", "rgb(255,120,71)", "rgb(251,150,51)", "rgb(226,183,47)", "rgb(198,214,60)", "rgb(175,240,91)", "rgb(127,246,88)", "rgb(82,246,103)", "rgb(48,239,130)", "rgb(29,223,163)", "rgb(26,199,194)", "rgb(35,171,216)", "rgb(54,140,225)", "rgb(76,110,219)", "rgb(96,84,200)"],
            c = {
                text: "",
                prefixP: -s,
                skillI: 0,
                skillP: 0,
                direction: "forward",
                delay: a,
                step: g
            };
        i()
    };
    binft(document.getElementById('binft'));
}

// 验证码刷新
$('img.captcha').click(function() {
    $.getJSON(
        '/captcha/refresh/',
        function(json) {
        // This should update your captcha image src and captcha hidden input
        console.log(json); $("img.captcha").attr("src",json.image_url);
        $("#id_captcha_0").val(json.key);
    });
    return false;
});


// 返回顶部
function back_to_top(){
    //当滚动条的位置处于距顶部100像素以下时，跳转链接出现，否则消失
    $(window).scroll(function(){
        if ($(window).scrollTop()>100){
            $("#back-to-top").fadeIn(1000);
        }
        else
        {
            $("#back-to-top").fadeOut(1000);
        }
    });

    //当点击跳转链接后，回到页面顶部位置
    $("#back-to-top").click(function(){
        let html = $('html');
        if(html.scrollTop()){
            html.animate({ scrollTop: 0 }, 800);//动画效果
            return false;
        }
        $('body').animate({ scrollTop: 0 }, 800);
        return false;
    });
}


// 利用session来实现切换页面时背景不变的效果
function change_bg_by_session () {
    if (sessionStorage.getItem('bg') === null) {
        // console.log("nothing")
    } else if (sessionStorage.getItem('bg') === '1') {
        let c = sessionStorage.getItem('color');
        change_color(c);
    } else if (sessionStorage.getItem('bg') === '2') {
        let img = sessionStorage.getItem('img');
        change_bg(img);
    } else if(sessionStorage.getItem('bg') === '3'){
        change_bg_net();
    }
}


/* ---------------背景相关----------------- */
// 将背景设置为网格
function change_bg_net () {
    let body = $("body");
    let bg_net = "linear-gradient(90deg, rgba(180, 180, 180, 0.15) 10%, rgba(0, 0, 0, 0) 10%), linear-gradient(rgba(180, 180, 180, 0.15) 10%, rgba(0, 0, 0, 0) 10%)";
    body.css("background", "white");
    body.css("background-image", bg_net);
    body.css("background-size", "9px 9px");
    // 写入session
    $(sessionStorage.setItem('bg', '3'));
}

// 改变背景颜色
function change_color(color) {
    /*alert(color);*/
    let body = $("body");
    body.css("background", color);
    // 写入session
    $(sessionStorage.setItem('bg', '1'));
    $(sessionStorage.setItem('color', color));
}

// 改变背景图片
function change_bg() {
    let img = '/static/img/bg_02.jpg';
    let body = $("body");
    body.css("background", "url("+img+")");
    body.css("background-position", "center");
    body.css("background-attachment", "fixed");
    $(sessionStorage.setItem('bg', '2'));
    $(sessionStorage.setItem('img', img));
}
// 清除背景
function clear_bg(){
    let body = $("body");
    body.css("background", "");
    // 此处不要直接清除session，因为以后可能会影响其他应用的session
    $(sessionStorage.setItem('bg', 'null'));
}


