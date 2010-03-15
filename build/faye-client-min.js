if(!this.Faye)Faye={};Faye.extend=function(a,b,c){if(!b)return a;for(var d in b){if(!b.hasOwnProperty(d))continue;if(a.hasOwnProperty(d)&&c===false)continue;if(a[d]!==b[d])a[d]=b[d]}return a};Faye.extend(Faye,{VERSION:'0.3.1',BAYEUX_VERSION:'1.0',ID_LENGTH:128,JSONP_CALLBACK:'jsonpcallback',CONNECTION_TYPES:["long-polling","callback-polling"],ENV:this,random:function(a){a=a||this.ID_LENGTH;if(a>32){var b=Math.ceil(a/32),c='';while(b--)c+=this.random(32);return c}var d=Math.pow(2,a);return Math.floor(Math.random()*d).toString(16)},Grammar:{LOWALPHA:/^[a-z]$/,UPALPHA:/^[A-Z]$/,ALPHA:/^([a-z]|[A-Z])$/,DIGIT:/^[0-9]$/,ALPHANUM:/^(([a-z]|[A-Z])|[0-9])$/,MARK:/^(\-|\_|\!|\~|\(|\)|\$|\@)$/,STRING:/^(((([a-z]|[A-Z])|[0-9])|(\-|\_|\!|\~|\(|\)|\$|\@)| |\/|\*|\.))*$/,TOKEN:/^(((([a-z]|[A-Z])|[0-9])|(\-|\_|\!|\~|\(|\)|\$|\@)))+$/,INTEGER:/^([0-9])+$/,CHANNEL_SEGMENT:/^(((([a-z]|[A-Z])|[0-9])|(\-|\_|\!|\~|\(|\)|\$|\@)))+$/,CHANNEL_SEGMENTS:/^(((([a-z]|[A-Z])|[0-9])|(\-|\_|\!|\~|\(|\)|\$|\@)))+(\/(((([a-z]|[A-Z])|[0-9])|(\-|\_|\!|\~|\(|\)|\$|\@)))+)*$/,CHANNEL_NAME:/^\/(((([a-z]|[A-Z])|[0-9])|(\-|\_|\!|\~|\(|\)|\$|\@)))+(\/(((([a-z]|[A-Z])|[0-9])|(\-|\_|\!|\~|\(|\)|\$|\@)))+)*$/,WILD_CARD:/^\*{1,2}$/,CHANNEL_PATTERN:/^(\/(((([a-z]|[A-Z])|[0-9])|(\-|\_|\!|\~|\(|\)|\$|\@)))+)*\/\*{1,2}$/,VERSION_ELEMENT:/^(([a-z]|[A-Z])|[0-9])(((([a-z]|[A-Z])|[0-9])|\-|\_))*$/,VERSION:/^([0-9])+(\.(([a-z]|[A-Z])|[0-9])(((([a-z]|[A-Z])|[0-9])|\-|\_))*)*$/,CLIENT_ID:/^((([a-z]|[A-Z])|[0-9]))+$/,ID:/^((([a-z]|[A-Z])|[0-9]))+$/,ERROR_MESSAGE:/^(((([a-z]|[A-Z])|[0-9])|(\-|\_|\!|\~|\(|\)|\$|\@)| |\/|\*|\.))*$/,ERROR_ARGS:/^(((([a-z]|[A-Z])|[0-9])|(\-|\_|\!|\~|\(|\)|\$|\@)| |\/|\*|\.))*(,(((([a-z]|[A-Z])|[0-9])|(\-|\_|\!|\~|\(|\)|\$|\@)| |\/|\*|\.))*)*$/,ERROR_CODE:/^[0-9][0-9][0-9]$/,ERROR:/^([0-9][0-9][0-9]:(((([a-z]|[A-Z])|[0-9])|(\-|\_|\!|\~|\(|\)|\$|\@)| |\/|\*|\.))*(,(((([a-z]|[A-Z])|[0-9])|(\-|\_|\!|\~|\(|\)|\$|\@)| |\/|\*|\.))*)*:(((([a-z]|[A-Z])|[0-9])|(\-|\_|\!|\~|\(|\)|\$|\@)| |\/|\*|\.))*|[0-9][0-9][0-9]::(((([a-z]|[A-Z])|[0-9])|(\-|\_|\!|\~|\(|\)|\$|\@)| |\/|\*|\.))*)$/},commonElement:function(a,b){for(var c=0,d=a.length;c<d;c++){if(this.indexOf(b,a[c])!==-1)return a[c]}return null},indexOf:function(a,b){for(var c=0,d=a.length;c<d;c++){if(a[c]===b)return c}return-1},each:function(a,b,c){if(a instanceof Array){for(var d=0,f=a.length;d<f;d++){if(a[d]!==undefined)b.call(c||null,a[d],d)}}else{for(var g in a){if(a.hasOwnProperty(g))b.call(c||null,g,a[g])}}},filter:function(a,b,c){var d=[];this.each(a,function(){if(b.apply(c,arguments))d.push(arguments[0])});return d},size:function(a){var b=0;this.each(a,function(){b+=1});return b},enumEqual:function(c,d){if(d instanceof Array){if(!(c instanceof Array))return false;var f=c.length;if(f!==d.length)return false;while(f--){if(c[f]!==d[f])return false}return true}else{if(!(c instanceof Object))return false;if(this.size(d)!==this.size(c))return false;var g=true;this.each(c,function(a,b){g=g&&(d[a]===b)});return g}}});Faye.Class=function(a,b){if(typeof a!=='function'){b=a;a=Object}var c=function(){if(!this.initialize)return this;return this.initialize.apply(this,arguments)||this};var d=function(){};d.prototype=a.prototype;c.prototype=new d();Faye.extend(c.prototype,b);return c};Faye.Deferrable={callback:function(a,b){if(this._t==='succeeded')return a.apply(b,this._m);this._9=this._9||[];this._9.push([a,b])},setDeferredStatus:function(){var b=Array.prototype.slice.call(arguments),c=b.shift();this._t=c;this._m=b;if(c!=='succeeded')return;if(!this._9)return;Faye.each(this._9,function(a){a[0].apply(a[1],this._m)},this);this._9=[]}};Faye.Observable={on:function(a,b,c){this._1=this._1||{};var d=this._1[a]=this._1[a]||[];d.push([b,c])},stopObserving:function(a,b,c){if(!this._1||!this._1[a])return;if(!b){delete this._1[a];return}var d=this._1[a],f=d.length;while(f--){if(b&&d[f][0]!==b)continue;if(c&&d[f][1]!==c)continue;d.splice(f,1)}},fire:function(){var b=Array.prototype.slice.call(arguments),c=b.shift();if(!this._1||!this._1[c])return;Faye.each(this._1[c],function(a){a[0].apply(a[1],b.slice())})}};Faye.Channel=Faye.Class({initialize:function(a){this.__id=this.name=a},push:function(a){this.fire('message',a)}});Faye.extend(Faye.Channel.prototype,Faye.Observable);Faye.extend(Faye.Channel,{HANDSHAKE:'/meta/handshake',CONNECT:'/meta/connect',SUBSCRIBE:'/meta/subscribe',UNSUBSCRIBE:'/meta/unsubscribe',DISCONNECT:'/meta/disconnect',META:'meta',SERVICE:'service',isValid:function(a){return Faye.Grammar.CHANNEL_NAME.test(a)||Faye.Grammar.CHANNEL_PATTERN.test(a)},parse:function(a){if(!this.isValid(a))return null;return a.split('/').slice(1)},isMeta:function(a){var b=this.parse(a);return b?(b[0]===this.META):null},isService:function(a){var b=this.parse(a);return b?(b[0]===this.SERVICE):null},isSubscribable:function(a){if(!this.isValid(a))return null;return!this.isMeta(a)&&!this.isService(a)},Tree:Faye.Class({initialize:function(a){this._2=a;this._5={}},eachChild:function(c,d){Faye.each(this._5,function(a,b){c.call(d,a,b)})},each:function(c,d,f){this.eachChild(function(a,b){a=c.concat(a);b.each(a,d,f)});if(this._2!==undefined)d.call(f,c,this._2)},getKeys:function(){var c=[];this.each([],function(a,b){c.push('/'+a.join('/'))});return c},map:function(c,d){var f=[];this.each([],function(a,b){f.push(c.call(d,a,b))});return f},get:function(a){var b=this.traverse(a);return b?b._2:null},set:function(a,b){var c=this.traverse(a,true);if(c)c._2=b},traverse:function(a,b){if(typeof a==='string')a=Faye.Channel.parse(a);if(a===null)return null;if(a.length===0)return this;var c=this._5[a[0]];if(!c&&!b)return null;if(!c)c=this._5[a[0]]=new Faye.Channel.Tree();return c.traverse(a.slice(1),b)},findOrCreate:function(a){var b=this.get(a);if(b)return b;b=new Faye.Channel(a);this.set(a,b);return b},glob:function(f){if(typeof f==='string')f=Faye.Channel.parse(f);if(f===null)return[];if(f.length===0)return(this._2===undefined)?[]:[this._2];var g=[];if(Faye.enumEqual(f,['*'])){Faye.each(this._5,function(a,b){if(b._2!==undefined)g.push(b._2)});return g}if(Faye.enumEqual(f,['**'])){g=this.map(function(a,b){return b});if(this._2!==undefined)g.pop();return g}Faye.each(this._5,function(b,c){if(b!==f[0]&&b!=='*')return;var d=c.glob(f.slice(1));Faye.each(d,function(a){g.push(a)})});if(this._5['**'])g.push(this._5['**']._2);return g}})});Faye.Namespace=Faye.Class({initialize:function(){this._n={}},generate:function(){var a=Faye.random();while(this._n.hasOwnProperty(a))a=Faye.random();return this._n[a]=a}});Faye.Transport=Faye.extend(Faye.Class({initialize:function(a,b){this._g=a;this._6=b},send:function(c,d,f){if(!(c instanceof Array)&&!c.id)c.id=this._g._o.generate();this.request(c,function(b){if(!d)return;Faye.each([].concat(b),function(a){if(a.id===c.id)d.call(f,a);if(a.advice)this._g.handleAdvice(a.advice);if(a.data&&a.channel)this._g.sendToSubscribers(a)},this)},this)}}),{get:function(c,d){var f=c._6;if(d===undefined)d=this.supportedConnectionTypes();var g=null;Faye.each(this._h,function(a,b){if(Faye.indexOf(d,a)<0)return;if(g)return;if(b.isUsable(f))g=b});if(!g)throw'Could not find a usable connection type for '+f;return new g(c,f)},register:function(a,b){this._h[a]=b;b.prototype.connectionType=a},_h:{},supportedConnectionTypes:function(){var c=[],d;Faye.each(this._h,function(a,b){c.push(a)});return c}});Faye.Client=Faye.Class({UNCONNECTED:1,CONNECTING:2,CONNECTED:3,DISCONNECTED:4,HANDSHAKE:'handshake',RETRY:'retry',NONE:'none',CONNECTION_TIMEOUT:60.0,DEFAULT_ENDPOINT:'/bayeux',MAX_DELAY:0.1,INTERVAL:1000.0,initialize:function(a){this._6=a||this.DEFAULT_ENDPOINT;this._4=Faye.Transport.get(this);this._0=this.UNCONNECTED;this._o=new Faye.Namespace();this._i=[];this._a=new Faye.Channel.Tree();this._p=[];this._7={reconnect:this.RETRY,interval:this.INTERVAL};if(!Faye.Event)return;Faye.Event.on(Faye.ENV,'beforeunload',this.disconnect,this)},handshake:function(b,c){if(this._7.reconnect===this.NONE)return;if(this._0!==this.UNCONNECTED)return;this._0=this.CONNECTING;var d=this;this._4.send({channel:Faye.Channel.HANDSHAKE,version:Faye.BAYEUX_VERSION,supportedConnectionTypes:Faye.Transport.supportedConnectionTypes()},function(a){if(!a.successful){setTimeout(function(){d.handshake(b,c)},this._7.interval);return this._0=this.UNCONNECTED}this._0=this.CONNECTED;this._8=a.clientId;this._4=Faye.Transport.get(this,a.supportedConnectionTypes);if(b)b.call(c)},this)},connect:function(b,c){if(this._7.reconnect===this.NONE)return;if(this._0===this.DISCONNECTED)return;if(this._7.reconnect===this.HANDSHAKE||this._0===this.UNCONNECTED)return this.handshake(function(){this.connect(b,c)},this);if(this._0===this.CONNECTING)return this.callback(b,c);if(this._0!==this.CONNECTED)return;this.setDeferredStatus('succeeded');this.setDeferredStatus('deferred');if(b)b.call(c);if(this._b)return;this._b=this._o.generate();var d=this,f=false;this._4.send({channel:Faye.Channel.CONNECT,clientId:this._8,connectionType:this._4.connectionType,id:this._b},function(a){if(f)return;f=true;delete this._b;setTimeout(function(){d.connect()},this._7.interval)},this);setTimeout(function(){if(f)return;f=true;delete d._b;delete d._8;d._0=d.UNCONNECTED;d._u()},1000*this.CONNECTION_TIMEOUT)},disconnect:function(){if(this._0!==this.CONNECTED)return;this._0=this.DISCONNECTED;this._4.send({channel:Faye.Channel.DISCONNECT,clientId:this._8});this._a=new Faye.Channel.Tree()},subscribe:function(c,d,f){this.connect(function(){c=[].concat(c);this._j(c);this._4.send({channel:Faye.Channel.SUBSCRIBE,clientId:this._8,subscription:c},function(b){if(!b.successful||!d)return;c=[].concat(b.subscription);Faye.each(c,function(a){this._a.set(a,[d,f])},this)},this)},this)},unsubscribe:function(c,d,f){this.connect(function(){c=[].concat(c);this._j(c);this._4.send({channel:Faye.Channel.UNSUBSCRIBE,clientId:this._8,subscription:c},function(b){if(!b.successful)return;c=[].concat(b.subscription);Faye.each(c,function(a){this._a.set(a,null)},this)},this)},this)},publish:function(b,c){this.connect(function(){this._j([b]);this._v({channel:b,data:c,clientId:this._8});if(this._q)return;var a=this;this._q=setTimeout(function(){delete a._q;a._w()},this.MAX_DELAY*1000)},this)},handleAdvice:function(a){Faye.extend(this._7,a);if(this._7.reconnect===this.HANDSHAKE)this._8=null},sendToSubscribers:function(b){var c=this._a.glob(b.channel);Faye.each(c,function(a){if(!a)return;a[0].call(a[1],b.data)})},_u:function(){this.subscribe(this._a.getKeys())},_v:function(a){this._i.push(a)},_w:function(){this._4.send(this._i);this._i=[]},_j:function(b){Faye.each(b,function(a){if(!Faye.Channel.isValid(a))throw'"'+a+'" is not a valid channel name';if(!Faye.Channel.isSubscribable(a))throw'Clients may not subscribe to channel "'+a+'"';})}});Faye.extend(Faye.Client.prototype,Faye.Deferrable);Faye.Event={_c:[],on:function(a,b,c,d){var f=function(){c.call(d)};if(a.addEventListener)a.addEventListener(b,f,false);else a.attachEvent('on'+b,f);this._c.push({_d:a,_k:b,_x:c,_e:d,_r:f})},detach:function(a,b,c,d){var f=this._c.length,g;while(f--){g=this._c[f];if((a&&a!==g._d)||(b&&b!==g._k)||(c&&c!==g._x)||(d&&d!==g._e))continue;if(g._d.removeEventListener)g._d.removeEventListener(g._k,g._r,false);else g._d.detachEvent('on'+g._k,g._r);this._c.splice(f,1);g=null}}};Faye.Event.on(Faye.ENV,'unload',Faye.Event.detach,Faye.Event);Faye.URI=Faye.extend(Faye.Class({queryString:function(){var c=[],d;Faye.each(this.params,function(a,b){c.push(encodeURIComponent(a)+'='+encodeURIComponent(b))});return c.join('&')},isLocal:function(){var a=Faye.URI.parse(Faye.ENV.location.href);var b=(a.hostname!==this.hostname)||(a.port!==this.port)||(a.protocol!==this.protocol);return!b},toURL:function(){return this.protocol+this.hostname+':'+this.port+this.pathname+'?'+this.queryString()}}),{parse:function(d,f){if(typeof d!=='string')return d;var g=new this();var k=function(b,c){d=d.replace(c,function(a){if(a)g[b]=a;return''})};k('protocol',/^https?\:\/+/);k('hostname',/^[^\/\:]+/);k('port',/^:[0-9]+/);Faye.extend(g,{protocol:'http://',hostname:Faye.ENV.location.hostname,port:Faye.ENV.location.port},false);if(!g.port)g.port=(g.protocol==='https://')?'443':'80';g.port=g.port.replace(/\D/g,'');var i=d.split('?'),h=i.shift(),l=i.join('?'),n=l?l.split('&'):[],o=n.length,j={};while(o--){i=n[o].split('=');j[decodeURIComponent(i[0]||'')]=decodeURIComponent(i[1]||'')}Faye.extend(j,f);g.pathname=h;g.params=j;return g}});Faye.XHR={request:function(a,b,c,d,f){var g=new this.Request(a,b,c,d,f);g.send();return g},getXhrObject:function(){return Faye.ENV.ActiveXObject?new ActiveXObject("Microsoft.XMLHTTP"):new XMLHttpRequest()},Request:Faye.Class({initialize:function(a,b,c,d,f){this._f=a.toUpperCase();this._6=Faye.URI.parse(b,c);this._p=(typeof d==='function')?{success:d}:d;this._e=f||null;this._3=null},send:function(){if(this._l)return;var a=this._6.pathname,b=this._6.queryString();if(this._f==='GET')a+='?'+b;var c=this._f==='POST'?b:'';this._l=true;this._3=Faye.XHR.getXhrObject();this._3.open(this._f,a,true);if(this._f==='POST')this._3.setRequestHeader('Content-Type','application/x-www-form-urlencoded');var d=this,f=function(){if(d._3.readyState!==4)return;if(g){clearInterval(g);g=null}Faye.Event.detach(Faye.ENV,'beforeunload',d.abort,d);d._l=false;d._y();d=null};var g=setInterval(f,10);Faye.Event.on(Faye.ENV,'beforeunload',this.abort,this);this._3.send(c)},abort:function(){this._3.abort()},_y:function(){var a=this._p;if(!a)return;return this.success()?a.success&&a.success.call(this._e,this):a.failure&&a.failure.call(this._e,this)},waiting:function(){return!!this._l},complete:function(){return this._3&&!this.waiting()},success:function(){if(!this.complete())return false;var a=this._3.status;return(a>=200&&a<300)||a===304||a===1223},failure:function(){if(!this.complete())return false;return!this.success()},text:function(){if(!this.complete())return null;return this._3.responseText},status:function(){if(!this.complete())return null;return this._3.status}})};if(!this.JSON){JSON={}}(function(){function l(a){return a<10?'0'+a:a}if(typeof Date.prototype.toJSON!=='function'){Date.prototype.toJSON=function(a){return this.getUTCFullYear()+'-'+l(this.getUTCMonth()+1)+'-'+l(this.getUTCDate())+'T'+l(this.getUTCHours())+':'+l(this.getUTCMinutes())+':'+l(this.getUTCSeconds())+'Z'};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(a){return this.valueOf()}}var n=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,o=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,j,p,s={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'},m;function r(c){o.lastIndex=0;return o.test(c)?'"'+c.replace(o,function(a){var b=s[a];return typeof b==='string'?b:'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+c+'"'}function q(a,b){var c,d,f,g,k=j,i,h=b[a];if(h&&typeof h==='object'&&typeof h.toJSON==='function'){h=h.toJSON(a)}if(typeof m==='function'){h=m.call(b,a,h)}switch(typeof h){case'string':return r(h);case'number':return isFinite(h)?String(h):'null';case'boolean':case'null':return String(h);case'object':if(!h){return'null'}j+=p;i=[];if(Object.prototype.toString.apply(h)==='[object Array]'){g=h.length;for(c=0;c<g;c+=1){i[c]=q(c,h)||'null'}f=i.length===0?'[]':j?'[\n'+j+i.join(',\n'+j)+'\n'+k+']':'['+i.join(',')+']';j=k;return f}if(m&&typeof m==='object'){g=m.length;for(c=0;c<g;c+=1){d=m[c];if(typeof d==='string'){f=q(d,h);if(f){i.push(r(d)+(j?': ':':')+f)}}}}else{for(d in h){if(Object.hasOwnProperty.call(h,d)){f=q(d,h);if(f){i.push(r(d)+(j?': ':':')+f)}}}}f=i.length===0?'{}':j?'{\n'+j+i.join(',\n'+j)+'\n'+k+'}':'{'+i.join(',')+'}';j=k;return f}}if(typeof JSON.stringify!=='function'){JSON.stringify=function(a,b,c){var d;j='';p='';if(typeof c==='number'){for(d=0;d<c;d+=1){p+=' '}}else if(typeof c==='string'){p=c}m=b;if(b&&typeof b!=='function'&&(typeof b!=='object'||typeof b.length!=='number')){throw new Error('JSON.stringify');}return q('',{'':a})}}if(typeof JSON.parse!=='function'){JSON.parse=function(g,k){var i;function h(a,b){var c,d,f=a[b];if(f&&typeof f==='object'){for(c in f){if(Object.hasOwnProperty.call(f,c)){d=h(f,c);if(d!==undefined){f[c]=d}else{delete f[c]}}}}return k.call(a,b,f)}n.lastIndex=0;if(n.test(g)){g=g.replace(n,function(a){return'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4)})}if(/^[\],:{}\s]*$/.test(g.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,''))){i=eval('('+g+')');return typeof k==='function'?h({'':i},''):i}throw new SyntaxError('JSON.parse');}}}());Faye.Transport.toJSON=function(a,b){return(this[a]instanceof Array)?this[a]:b};Faye.XHRTransport=Faye.Class(Faye.Transport,{request:function(b,c,d){var f={message:JSON.stringify(b,Faye.Transport.toJSON)};Faye.XHR.request('post',this._6,f,function(a){if(c)c.call(d,JSON.parse(a.text()))})}});Faye.XHRTransport.isUsable=function(a){return Faye.URI.parse(a).isLocal()};Faye.Transport.register('long-polling',Faye.XHRTransport);Faye.JSONPTransport=Faye.extend(Faye.Class(Faye.Transport,{request:function(b,c,d){var f={message:JSON.stringify(b,Faye.Transport.toJSON)},g=document.getElementsByTagName('head')[0],k=document.createElement('script'),i=Faye.JSONPTransport.getCallbackName(),h=Faye.URI.parse(this._6,f);Faye.ENV[i]=function(a){Faye.ENV[i]=undefined;try{delete Faye.ENV[i]}catch(e){}g.removeChild(k);if(c)c.call(d,a)};h.params.jsonp=i;k.type='text/javascript';k.src=h.toURL();g.appendChild(k)}}),{_s:0,getCallbackName:function(){this._s+=1;return'__jsonp'+this._s+'__'}});Faye.JSONPTransport.isUsable=function(a){return true};Faye.Transport.register('callback-polling',Faye.JSONPTransport);