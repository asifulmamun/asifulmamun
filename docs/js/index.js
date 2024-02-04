$(window).on("load",function(){gsap.to("#loader",1,{y:"-100%"}),gsap.to("#loader",1,{opacity:0}),gsap.to("#loader",0,{display:"none",delay:1}),gsap.to("#header",0,{display:"block",delay:1}),gsap.to("#navigation-content",0,{display:"none"}),gsap.to("#navigation-content",0,{display:"flex",delay:1})}),$(function(){$(".color-panel").on("click",function(t){t.preventDefault(),$(".color-changer").toggleClass("color-changer-active")}),$(".colors a").on("click",function(t){t.preventDefault();var o=$(this).attr("title");console.log(o),$("head").append('<link rel="stylesheet" href="css/'+o+'.css">')})}),$(function(){$(".menubar").on("click",function(){gsap.to("#navigation-content",.6,{y:0})}),$(".navigation-close").on("click",function(){gsap.to("#navigation-content",.6,{y:"-100%"})})}),$(function(){var t=function(t,o,n){this.toRotate=o,this.el=t,this.loopNum=0,this.period=parseInt(n,10)||2e3,this.txt="",this.tick(),this.isDeleting=!1};t.prototype.tick=function(){var t=this.loopNum%this.toRotate.length,o=this.toRotate[t];this.isDeleting?this.txt=o.substring(0,this.txt.length-1):this.txt=o.substring(0,this.txt.length+1),this.el.innerHTML='<span class="wrap">'+this.txt+"</span>";var n=this,e=200-100*Math.random();this.isDeleting&&(e/=2),this.isDeleting||this.txt!==o?this.isDeleting&&""===this.txt&&(this.isDeleting=!1,this.loopNum++,e=100):(e=this.period,this.isDeleting=!0),setTimeout(function(){n.tick()},e)},window.onload=function(){for(var o=document.getElementsByClassName("txt-rotate"),n=0;n<o.length;n++){var e=o[n].getAttribute("data-rotate"),a=o[n].getAttribute("data-period");e&&new t(o[n],JSON.parse(e),a)}var i=document.createElement("style");i.type="text/css",i.innerHTML=".txt-rotate > .wrap { border-right: 0em solid #666 ; }",document.body.appendChild(i)}}),$(function(){$("#about-link").on("click",function(){gsap.to("#navigation-content",0,{display:"none",delay:.7}),gsap.to("#navigation-content",0,{y:"-100%",delay:.7}),gsap.to("#header",0,{display:"none"}),gsap.to("#blog",0,{display:"none"}),gsap.to("#portfolio",0,{display:"none"}),gsap.to("#breaker",0,{display:"block"}),gsap.to("#breaker-two",0,{display:"block",delay:.1}),gsap.to("#contact",0,{display:"none"}),gsap.to("#breaker",0,{display:"none",delay:2}),gsap.to("#breaker-two",0,{display:"none",delay:2}),gsap.to("#about",0,{display:"block",delay:.7}),gsap.to("#navigation-content",0,{display:"flex",delay:2})}),$("#contact-link").on("click",function(){gsap.to("#navigation-content",0,{display:"none",delay:.7}),gsap.to("#navigation-content",0,{y:"-100%",delay:.7}),gsap.to("#header",0,{display:"none"}),gsap.to("#about",0,{display:"none"}),gsap.to("#blog",0,{display:"none"}),gsap.to("#portfolio",0,{display:"none"}),gsap.to("#breaker",0,{display:"block"}),gsap.to("#breaker-two",0,{display:"block",delay:.1}),gsap.to("#breaker",0,{display:"none",delay:2}),gsap.to("#breaker-two",0,{display:"none",delay:2}),gsap.to("#contact",0,{display:"block",delay:.7}),gsap.to("#navigation-content",0,{display:"flex",delay:2})}),$("#portfolio-link").on("click",function(){gsap.to("#navigation-content",0,{display:"none",delay:.7}),gsap.to("#navigation-content",0,{y:"-100%",delay:.7}),gsap.to("#header",0,{display:"none"}),gsap.to("#about",0,{display:"none"}),gsap.to("#contact",0,{display:"none"}),gsap.to("#blog",0,{display:"none"}),gsap.to("#breaker",0,{display:"block"}),gsap.to("#breaker-two",0,{display:"block",delay:.1}),gsap.to("#breaker",0,{display:"none",delay:2}),gsap.to("#breaker-two",0,{display:"none",delay:2}),gsap.to("#portfolio",0,{display:"block",delay:.7}),gsap.to("#navigation-content",0,{display:"flex",delay:2})}),$("#blog-link").on("click",function(){gsap.to("#navigation-content",0,{display:"none",delay:.7}),gsap.to("#navigation-content",0,{y:"-100%",delay:.7}),gsap.to("#header",0,{display:"none"}),gsap.to("#about",0,{display:"none"}),gsap.to("#portfolio",0,{display:"none"}),gsap.to("#contact",0,{display:"none"}),gsap.to("#breaker",0,{display:"block"}),gsap.to("#breaker-two",0,{display:"block",delay:.1}),gsap.to("#breaker",0,{display:"none",delay:2}),gsap.to("#breaker-two",0,{display:"none",delay:2}),gsap.to("#blog",0,{display:"block",delay:.7}),gsap.to("#navigation-content",0,{display:"flex",delay:2})}),$("#home-link").on("click",function(){gsap.to("#navigation-content",0,{display:"none",delay:.7}),gsap.to("#navigation-content",0,{y:"-100%",delay:.7}),gsap.to("#header",0,{display:"none"}),gsap.to("#about",0,{display:"none"}),gsap.to("#portfolio",0,{display:"none"}),gsap.to("#contact",0,{display:"none"}),gsap.to("#blog",0,{display:"none"}),gsap.to("#breaker",0,{display:"block"}),gsap.to("#breaker-two",0,{display:"block",delay:.1}),gsap.to("#breaker",0,{display:"none",delay:2}),gsap.to("#breaker-two",0,{display:"none",delay:2}),gsap.to("#header",0,{display:"block",delay:.7}),gsap.to("#navigation-content",0,{display:"flex",delay:2})})}),$(function(){document.querySelector("body");var t=$(".cursor");function o(o){gsap.to(t,{scale:1.4,opacity:1})}function n(o){gsap.to(t,{scale:1,opacity:.6})}$(window).on("mousemove",function o(n){gsap.to(t,{x:n.clientX,y:n.clientY,stagger:.002})}),$(".menubar").hover(o,n),$("a").hover(o,n),$(".navigation-close").hover(o,n)});