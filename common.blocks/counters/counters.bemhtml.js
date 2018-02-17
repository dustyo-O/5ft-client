block('counters').content()(function() {
    return [{
        tag: 'script',
        content: { html: `
        document.write("<a href='//www.liveinternet.ru/click' "+
"target=_blank><img src='//counter.yadro.ru/hit?t26.6;r"+
escape(document.referrer)+((typeof(screen)=="undefined")?"":
";s"+screen.width+"*"+screen.height+"*"+(screen.colorDepth?
screen.colorDepth:screen.pixelDepth))+";u"+escape(document.URL)+
";h"+escape(document.title.substring(0,150))+";"+Math.random()+
"' alt='' title='LiveInternet: показано число посетителей за"+
" сегодня' "+
"border='0' width='88' height='15'><\/a>")
        ` }
    }, {
        tag: 'script',
        content: { html: `
(function (d, w, c) { (w[c] = w[c] || []).push(function() { try { w.yaCounter47734408 = new Ya.Metrika({ id:47734408, clickmap:true, trackLinks:true, accurateTrackBounce:true }); } catch(e) { } }); var n = d.getElementsByTagName("script")[0], s = d.createElement("script"), f = function () { n.parentNode.insertBefore(s, n); }; s.type = "text/javascript"; s.async = true; s.src = "https://mc.yandex.ru/metrika/watch.js"; if (w.opera == "[object Opera]") { d.addEventListener("DOMContentLoaded", f, false); } else { f(); } })(document, window, "yandex_metrika_callbacks");
        ` }
    }, {
        tag: 'noscript',
        content: {
            html: `
<div><img src="https://mc.yandex.ru/watch/47734408" style="position:absolute; left:-9999px;" alt="" /></div>
            ` }
    }]
});
