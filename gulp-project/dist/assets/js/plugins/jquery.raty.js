define(function(require,exports,module){!function($){var t={init:function(e){return this.each(function(){var o=this,a=$(o).empty();o.opt=$.extend(!0,{},$.fn.raty.defaults,e),a.data("settings",o.opt),o.opt.number=t.between(o.opt.number,0,20),"/"!=o.opt.path.substring(o.opt.path.length-1,o.opt.path.length)&&(o.opt.path+="/"),"function"==typeof o.opt.score&&(o.opt.score=o.opt.score.call(o)),o.opt.score&&(o.opt.score=t.between(o.opt.score,0,o.opt.number));for(var n=1;n<=o.opt.number;n++)$("<img />",{src:o.opt.path+(!o.opt.score||o.opt.score<n?o.opt.starOff:o.opt.starOn),alt:n,title:n<=o.opt.hints.length&&null!==o.opt.hints[n-1]?o.opt.hints[n-1]:n}).appendTo(o),o.opt.space&&a.append(n<o.opt.number?"&#160;":"");o.stars=a.children('img:not(".raty-cancel")'),o.score=$("<input />",{type:"hidden",name:o.opt.scoreName}).appendTo(o),o.opt.score&&o.opt.score>0&&(o.score.val(o.opt.score),t.roundStar.call(o,o.opt.score)),o.opt.iconRange&&t.fill.call(o,o.opt.score),t.setTarget.call(o,o.opt.score,o.opt.targetKeep);var r=o.opt.space?4:0,i=o.opt.width||o.opt.number*o.opt.size+o.opt.number*r;o.opt.cancel&&(o.cancel=$("<img />",{src:o.opt.path+o.opt.cancelOff,alt:"x",title:o.opt.cancelHint,class:"raty-cancel"}),"left"==o.opt.cancelPlace?a.prepend("&#160;").prepend(o.cancel):a.append("&#160;").append(o.cancel),i+=o.opt.size+r),o.opt.readOnly?(t.fixHint.call(o),o.cancel&&o.cancel.hide()):(a.css("cursor","pointer"),t.bindAction.call(o)),a.css("width",i)})},between:function(t,e,o){return Math.min(Math.max(parseFloat(t),e),o)},bindAction:function(){var e=this,o=$(e);o.mouseleave(function(){var o=e.score.val()||void 0;t.initialize.call(e,o),t.setTarget.call(e,o,e.opt.targetKeep),e.opt.mouseover&&e.opt.mouseover.call(e,o)});var a=e.opt.half?"mousemove":"mouseover";e.opt.cancel&&e.cancel.mouseenter(function(){$(this).attr("src",e.opt.path+e.opt.cancelOn),e.stars.attr("src",e.opt.path+e.opt.starOff),t.setTarget.call(e,null,!0),e.opt.mouseover&&e.opt.mouseover.call(e,null)}).mouseleave(function(){$(this).attr("src",e.opt.path+e.opt.cancelOff),e.opt.mouseover&&e.opt.mouseover.call(e,e.score.val()||null)}).click(function(t){e.score.removeAttr("value"),e.opt.click&&e.opt.click.call(e,null,t)}),e.stars.bind(a,function(a){var n=parseInt(this.alt,10);if(e.opt.half){var r=parseFloat((a.pageX-$(this).offset().left)/e.opt.size),i=r>.5?1:.5;n=parseFloat(this.alt)-1+i,t.fill.call(e,n),e.opt.precision&&(n=n-i+r),t.showHalf.call(e,n)}else t.fill.call(e,n);o.data("score",n),t.setTarget.call(e,n,!0),e.opt.mouseover&&e.opt.mouseover.call(e,n,a)}).click(function(t){e.score.val(e.opt.half||e.opt.precision?o.data("score"):this.alt),e.opt.click&&e.opt.click.call(e,e.score.val(),t)})},cancel:function(e){return $(this).each(function(){var o=this;if(!0===$(o).data("readonly"))return this;e?t.click.call(o,null):t.score.call(o,null),o.score.removeAttr("value")})},click:function(e){return $(this).each(function(){if(!0===$(this).data("readonly"))return this;t.initialize.call(this,e),this.opt.click?this.opt.click.call(this,e):t.error.call(this,'you must add the "click: function(score, evt) { }" callback.'),t.setTarget.call(this,e,!0)})},error:function(t){$(this).html(t),$.error(t)},fill:function(t){for(var e,o,a,n=this,r=n.stars.length,i=0,s=1;s<=r;s++)e=n.stars.eq(s-1),n.opt.iconRange&&n.opt.iconRange.length>i?(o=n.opt.iconRange[i],a=n.opt.single?s==t?o.on||n.opt.starOn:o.off||n.opt.starOff:s<=t?o.on||n.opt.starOn:o.off||n.opt.starOff,s<=o.range&&e.attr("src",n.opt.path+a),s==o.range&&i++):(a=n.opt.single?s==t?n.opt.starOn:n.opt.starOff:s<=t?n.opt.starOn:n.opt.starOff,e.attr("src",n.opt.path+a))},fixHint:function(){var t=$(this),e=parseInt(this.score.val(),10),o=this.opt.noRatedMsg;!isNaN(e)&&e>0&&(o=e<=this.opt.hints.length&&null!==this.opt.hints[e-1]?this.opt.hints[e-1]:e),t.data("readonly",!0).css("cursor","default").attr("title",o),this.score.attr("readonly","readonly"),this.stars.attr("title",o)},getScore:function(){var t,e=[];return $(this).each(function(){t=this.score.val(),e.push(t?parseFloat(t):void 0)}),e.length>1?e:e[0]},readOnly:function(e){return this.each(function(){var o=$(this);if(o.data("readonly")===e)return this;this.cancel&&(e?this.cancel.hide():this.cancel.show()),e?(o.unbind(),o.children("img").unbind(),t.fixHint.call(this)):(t.bindAction.call(this),t.unfixHint.call(this)),o.data("readonly",e)})},reload:function(){return t.set.call(this,{})},roundStar:function(t){var e=(t-Math.floor(t)).toFixed(2);if(e>this.opt.round.down){var o=this.opt.starOn;e<this.opt.round.up&&this.opt.halfShow?o=this.opt.starHalf:e<this.opt.round.full&&(o=this.opt.starOff),this.stars.eq(Math.ceil(t)-1).attr("src",this.opt.path+o)}},score:function(){return arguments.length?t.setScore.apply(this,arguments):t.getScore.call(this)},set:function(t){return this.each(function(){var e=$(this),o=e.data("settings"),a=e.clone().removeAttr("style").insertBefore(e);e.remove(),a.raty($.extend(o,t))}),$(this.selector)},setScore:function(e){return $(this).each(function(){if(!0===$(this).data("readonly"))return this;t.initialize.call(this,e),t.setTarget.call(this,e,!0)})},setTarget:function(e,o){if(this.opt.target){var a=$(this.opt.target);0==a.length&&t.error.call(this,"target selector invalid or missing!");var n=e;n=o&&void 0!==n?"hint"==this.opt.targetType?null===n&&this.opt.cancel?this.opt.cancelHint:this.opt.hints[Math.ceil(n-1)]:this.opt.precision?parseFloat(n).toFixed(1):parseInt(n,10):this.opt.targetText,this.opt.targetFormat.indexOf("{score}")<0&&t.error.call(this,'template "{score}" missing!'),null!==e&&(n=this.opt.targetFormat.toString().replace("{score}",n)),a.is(":input")?a.val(n):a.html(n)}},showHalf:function(t){var e=(t-Math.floor(t)).toFixed(1);e>0&&e<.6&&this.stars.eq(Math.ceil(t)-1).attr("src",this.opt.path+this.opt.starHalf)},initialize:function(e){e=e?t.between(e,0,this.opt.number):0,t.fill.call(this,e),e>0&&(this.opt.halfShow&&t.roundStar.call(this,e),this.score.val(e))},unfixHint:function(){for(var t=0;t<this.opt.number;t++)this.stars.eq(t).attr("title",t<this.opt.hints.length&&null!==this.opt.hints[t]?this.opt.hints[t]:t);$(this).data("readonly",!1).css("cursor","pointer").removeAttr("title"),this.score.attr("readonly","readonly")}};$.fn.raty=function(e){return t[e]?t[e].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof e&&e?void $.error("Method "+e+" does not exist!"):t.init.apply(this,arguments)},$.fn.raty.defaults={cancel:!1,cancelHint:"cancel this rating!",cancelOff:"cancel-off.png",cancelOn:"cancel-on.png",cancelPlace:"left",click:void 0,half:!1,halfShow:!0,hints:["10","20","30","40","50","60","70","80","90","100"],iconRange:void 0,mouseover:void 0,noRatedMsg:"not rated yet",number:10,path:"img/",precision:!1,round:{down:.25,full:.6,up:.76},readOnly:!1,score:void 0,scoreName:"score",single:!1,size:16,space:!0,starHalf:"star-half.png",starOff:"star-off.png",starOn:"star-on.png",target:void 0,targetFormat:"{score}",targetKeep:!1,targetText:"",targetType:"hint",width:void 0}}(jQuery)});