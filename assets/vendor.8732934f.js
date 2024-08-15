const W={},Ge=(e,t)=>e===t,k=Symbol("solid-proxy"),z={equals:Ge};let Ce=De;const C={},$=1,G=2,Te={owned:null,cleanups:null,context:null,owner:null};var d=null;let R=null,h=null,D=null,y=null,S=null,ae=0;function j(e,t){const n=h,r=d,s=e.length===0?Te:{owned:null,cleanups:null,context:null,owner:t||r};d=s,h=null;try{return pe(()=>e(()=>ge(s)),!0)}finally{h=n,d=r}}function fe(e,t){t=t?Object.assign({},z,t):z;const n={value:e,observers:null,observerSlots:null,pending:C,comparator:t.equals||void 0},r=s=>(typeof s=="function"&&(s=s(n.pending!==C?n.pending:n.value)),ce(n,s));return[Ie.bind(n),r]}function re(e,t,n){const r=he(e,t,!1,$);U(r)}function en(e,t,n){Ce=Ye;const r=he(e,t,!1,$);r.user=!0,S?S.push(r):queueMicrotask(()=>U(r))}function O(e,t,n){n=n?Object.assign({},z,n):z;const r=he(e,t,!0,0);return r.pending=C,r.observers=null,r.observerSlots=null,r.comparator=n.equals||void 0,U(r),Ie.bind(r)}function Le(e){if(D)return e();let t;const n=D=[];try{t=e()}finally{D=null}return pe(()=>{for(let r=0;r<n.length;r+=1){const s=n[r];if(s.pending!==C){const i=s.pending;s.pending=C,ce(s,i)}}},!1),t}function L(e){let t,n=h;return h=null,t=e(),h=n,t}function Ne(e){return d===null||(d.cleanups===null?d.cleanups=[e]:d.cleanups.push(e)),e}function qe(){return h}function He(e){const t=O(e);return O(()=>se(t()))}function Ie(){const e=R;if(this.sources&&(this.state||e)){const t=y;y=null,this.state===$||e?U(this):H(this),y=t}if(h){const t=this.observers?this.observers.length:0;h.sources?(h.sources.push(this),h.sourceSlots.push(t)):(h.sources=[this],h.sourceSlots=[t]),this.observers?(this.observers.push(h),this.observerSlots.push(h.sources.length-1)):(this.observers=[h],this.observerSlots=[h.sources.length-1])}return this.value}function ce(e,t,n){if(e.comparator&&e.comparator(e.value,t))return t;if(D)return e.pending===C&&D.push(e),e.pending=t,t;let r=!1;return e.value=t,e.observers&&e.observers.length&&pe(()=>{for(let s=0;s<e.observers.length;s+=1){const i=e.observers[s];r&&R.disposed.has(i),(r&&!i.tState||!r&&!i.state)&&(i.pure?y.push(i):S.push(i),i.observers&&Be(i)),r||(i.state=$)}if(y.length>1e6)throw y=[],new Error},!1),t}function U(e){if(!e.fn)return;ge(e);const t=d,n=h,r=ae;h=d=e,Ve(e,e.value,r),h=n,d=t}function Ve(e,t,n){let r;try{r=e.fn(t)}catch(s){Fe(s)}(!e.updatedAt||e.updatedAt<=n)&&(e.observers&&e.observers.length?ce(e,r):e.value=r,e.updatedAt=n)}function he(e,t,n,r=$,s){const i={fn:e,state:r,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:d,context:null,pure:n};return d===null||d!==Te&&(d.owned?d.owned.push(i):d.owned=[i]),i}function B(e){const t=R;if(e.state===0||t)return;if(e.state===G||t)return H(e);if(e.suspense&&L(e.suspense.inFallback))return e.suspense.effects.push(e);const n=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<ae);)(e.state||t)&&n.push(e);for(let r=n.length-1;r>=0;r--)if(e=n[r],e.state===$||t)U(e);else if(e.state===G||t){const s=y;y=null,H(e,n[0]),y=s}}function pe(e,t){if(y)return e();let n=!1;t||(y=[]),S?n=!0:S=[],ae++;try{return e()}catch(r){Fe(r)}finally{Qe(n)}}function Qe(e){y&&(De(y),y=null),!e&&(S.length?Le(()=>{Ce(S),S=null}):S=null)}function De(e){for(let t=0;t<e.length;t++)B(e[t])}function Ye(e){let t,n=0;for(t=0;t<e.length;t++){const s=e[t];s.user?e[n++]=s:B(s)}const r=e.length;for(t=0;t<n;t++)B(e[t]);for(t=r;t<e.length;t++)B(e[t])}function H(e,t){const n=R;e.state=0;for(let r=0;r<e.sources.length;r+=1){const s=e.sources[r];s.sources&&(s.state===$||n?s!==t&&B(s):(s.state===G||n)&&H(s,t))}}function Be(e){const t=R;for(let n=0;n<e.observers.length;n+=1){const r=e.observers[n];(!r.state||t)&&(r.state=G,r.pure?y.push(r):S.push(r),r.observers&&Be(r))}}function ge(e){let t;if(e.sources)for(;e.sources.length;){const n=e.sources.pop(),r=e.sourceSlots.pop(),s=n.observers;if(s&&s.length){const i=s.pop(),u=n.observerSlots.pop();r<s.length&&(i.sourceSlots[u]=r,s[r]=i,n.observerSlots[r]=u)}}if(e.owned){for(t=0;t<e.owned.length;t++)ge(e.owned[t]);e.owned=null}if(e.cleanups){for(t=0;t<e.cleanups.length;t++)e.cleanups[t]();e.cleanups=null}e.state=0,e.context=null}function Fe(e){throw e}function se(e){if(typeof e=="function"&&!e.length)return se(e());if(Array.isArray(e)){const t=[];for(let n=0;n<e.length;n++){const r=se(e[n]);Array.isArray(r)?t.push.apply(t,r):t.push(r)}return t}return e}const ie=Symbol("fallback");function V(e){for(let t=0;t<e.length;t++)e[t]()}function Je(e,t,n={}){let r=[],s=[],i=[],u=0,o=t.length>1?[]:null;return Ne(()=>V(i)),()=>{let l=e()||[],f,a;return L(()=>{let g=l.length,m,x,q,M,X,A,b,_,E;if(g===0)u!==0&&(V(i),i=[],r=[],s=[],u=0,o&&(o=[])),n.fallback&&(r=[ie],s[0]=j(ze=>(i[0]=ze,n.fallback())),u=1);else if(u===0){for(s=new Array(g),a=0;a<g;a++)r[a]=l[a],s[a]=j(p);u=g}else{for(q=new Array(g),M=new Array(g),o&&(X=new Array(g)),A=0,b=Math.min(u,g);A<b&&r[A]===l[A];A++);for(b=u-1,_=g-1;b>=A&&_>=A&&r[b]===l[_];b--,_--)q[_]=s[b],M[_]=i[b],o&&(X[_]=o[b]);for(m=new Map,x=new Array(_+1),a=_;a>=A;a--)E=l[a],f=m.get(E),x[a]=f===void 0?-1:f,m.set(E,a);for(f=A;f<=b;f++)E=r[f],a=m.get(E),a!==void 0&&a!==-1?(q[a]=s[f],M[a]=i[f],o&&(X[a]=o[f]),a=x[a],m.set(E,a)):i[f]();for(a=A;a<g;a++)a in q?(s[a]=q[a],i[a]=M[a],o&&(o[a]=X[a],o[a](a))):s[a]=j(p);s=s.slice(0,u=g),r=l.slice(0)}return s});function p(g){if(i[a]=g,o){const[m,x]=fe(a);return o[a]=x,t(l[a],m)}return t(l[a])}}}function Ze(e,t,n={}){let r=[],s=[],i=[],u=[],o=0,l;return Ne(()=>V(i)),()=>{const f=e()||[];return L(()=>{if(f.length===0)return o!==0&&(V(i),i=[],r=[],s=[],o=0,u=[]),n.fallback&&(r=[ie],s[0]=j(p=>(i[0]=p,n.fallback())),o=1),s;for(r[0]===ie&&(i[0](),i=[],r=[],s=[],o=0),l=0;l<f.length;l++)l<r.length&&r[l]!==f[l]?u[l](()=>f[l]):l>=r.length&&(s[l]=j(a));for(;l<r.length;l++)i[l]();return o=u.length=i.length=f.length,r=f.slice(0),s=s.slice(0,o)});function a(p){i[l]=p;const[g,m]=fe(f[l]);return u[l]=m,t(g,l)}}}function tn(e,t){return L(()=>e(t))}function K(){return!0}const et={get(e,t,n){return t===k?n:e.get(t)},has(e,t){return e.has(t)},set:K,deleteProperty:K,getOwnPropertyDescriptor(e,t){return{configurable:!0,enumerable:!0,get(){return e.get(t)},set:K,deleteProperty:K}},ownKeys(e){return e.keys()}};function te(e){return typeof e=="function"?e():e}function nn(...e){return new Proxy({get(t){for(let n=e.length-1;n>=0;n--){const r=te(e[n])[t];if(r!==void 0)return r}},has(t){for(let n=e.length-1;n>=0;n--)if(t in te(e[n]))return!0;return!1},keys(){const t=[];for(let n=0;n<e.length;n++)t.push(...Object.keys(te(e[n])));return[...new Set(t)]}},et)}function rn(e){const t="fallback"in e&&{fallback:()=>e.fallback};return O(Je(()=>e.each,e.children,t||void 0))}function sn(e){const t="fallback"in e&&{fallback:()=>e.fallback};return O(Ze(()=>e.each,e.children,t||void 0))}function un(e){let t=!1;const n=O(()=>e.when,void 0,{equals:(r,s)=>t?r===s:!r==!s});return O(()=>{const r=n();if(r){const s=e.children;return(t=typeof s=="function"&&s.length>0)?L(()=>s(r)):s}return e.fallback})}function on(e){let t=!1;const n=He(()=>e.children),r=O(()=>{let s=n();Array.isArray(s)||(s=[s]);for(let i=0;i<s.length;i++){const u=s[i].when;if(u)return[i,u,s[i]]}return[-1]},void 0,{equals:(s,i)=>s[0]===i[0]&&(t?s[1]===i[1]:!s[1]==!i[1])&&s[2]===i[2]});return O(()=>{const[s,i,u]=r();if(s<0)return e.fallback;const o=u.children;return(t=typeof o=="function"&&o.length>0)?L(()=>o(i)):o})}function ln(e){return e}function an(e,t){return O(e,void 0,t?void 0:{equals:t})}function tt(e,t,n){let r=n.length,s=t.length,i=r,u=0,o=0,l=t[s-1].nextSibling,f=null;for(;u<s||o<i;){if(t[u]===n[o]){u++,o++;continue}for(;t[s-1]===n[i-1];)s--,i--;if(s===u){const a=i<r?o?n[o-1].nextSibling:n[i-o]:l;for(;o<i;)e.insertBefore(n[o++],a)}else if(i===o)for(;u<s;)(!f||!f.has(t[u]))&&t[u].remove(),u++;else if(t[u]===n[i-1]&&n[o]===t[s-1]){const a=t[--s].nextSibling;e.insertBefore(n[o++],t[u++].nextSibling),e.insertBefore(n[--i],a),t[s]=n[i]}else{if(!f){f=new Map;let p=o;for(;p<i;)f.set(n[p],p++)}const a=f.get(t[u]);if(a!=null)if(o<a&&a<i){let p=u,g=1,m;for(;++p<s&&p<i&&!((m=f.get(t[p]))==null||m!==a+g);)g++;if(g>a-o){const x=t[u];for(;o<a;)e.insertBefore(n[o++],x)}else e.replaceChild(n[o++],t[u++])}else u++;else t[u++].remove()}}}const ve="_$DX_DELEGATE";function fn(e,t,n){let r;return j(s=>{r=s,t===document?e():nt(t,e(),t.firstChild?null:void 0,n)}),()=>{r(),t.textContent=""}}function cn(e,t,n){const r=document.createElement("template");r.innerHTML=e;let s=r.content.firstChild;return n&&(s=s.firstChild),s}function hn(e,t=window.document){const n=t[ve]||(t[ve]=new Set);for(let r=0,s=e.length;r<s;r++){const i=e[r];n.has(i)||(n.add(i),t.addEventListener(i,rt))}}function pn(e,t,n){n==null?e.removeAttribute(t):e.setAttribute(t,n)}function gn(e,t,n,r){r?Array.isArray(n)?(e[`$$${t}`]=n[0],e[`$$${t}Data`]=n[1]):e[`$$${t}`]=n:Array.isArray(n)?e.addEventListener(t,s=>n[0](n[1],s)):e.addEventListener(t,n)}function dn(e,t,n={}){const r=e.style;if(t==null||typeof t=="string")return r.cssText=t;typeof n=="string"&&(n={});let s,i;for(i in n)t[i]==null&&r.removeProperty(i),delete n[i];for(i in t)s=t[i],s!==n[i]&&(r.setProperty(i,s),n[i]=s);return n}function nt(e,t,n,r){if(n!==void 0&&!r&&(r=[]),typeof t!="function")return Q(e,t,r,n);re(s=>Q(e,t(),s,n),r)}function rt(e){const t=`$$${e.type}`;let n=e.composedPath&&e.composedPath()[0]||e.target;for(e.target!==n&&Object.defineProperty(e,"target",{configurable:!0,value:n}),Object.defineProperty(e,"currentTarget",{configurable:!0,get(){return n||document}});n!==null;){const r=n[t];if(r&&!n.disabled){const s=n[`${t}Data`];if(s!==void 0?r(s,e):r(e),e.cancelBubble)return}n=n.host&&n.host!==n&&n.host instanceof Node?n.host:n.parentNode}}function Q(e,t,n,r,s){for(W.context&&!n&&(n=[...e.childNodes]);typeof n=="function";)n=n();if(t===n)return n;const i=typeof t,u=r!==void 0;if(e=u&&n[0]&&n[0].parentNode||e,i==="string"||i==="number")if(i==="number"&&(t=t.toString()),u){let o=n[0];o&&o.nodeType===3?o.data=t:o=document.createTextNode(t),n=P(e,n,r,o)}else n!==""&&typeof n=="string"?n=e.firstChild.data=t:n=e.textContent=t;else if(t==null||i==="boolean"){if(W.context)return n;n=P(e,n,r)}else{if(i==="function")return re(()=>{let o=t();for(;typeof o=="function";)o=o();n=Q(e,o,n,r)}),()=>n;if(Array.isArray(t)){const o=[];if(ue(o,t,s))return re(()=>n=Q(e,o,n,r,!0)),()=>n;if(W.context){for(let l=0;l<o.length;l++)if(o[l].parentNode)return n=o}if(o.length===0){if(n=P(e,n,r),u)return n}else Array.isArray(n)?n.length===0?me(e,o,r):tt(e,n,o):(n&&P(e),me(e,o));n=o}else if(t instanceof Node){if(W.context&&t.parentNode)return n=u?[t]:t;if(Array.isArray(n)){if(u)return n=P(e,n,r,t);P(e,n,null,t)}else n==null||n===""||!e.firstChild?e.appendChild(t):e.replaceChild(t,e.firstChild);n=t}}return n}function ue(e,t,n){let r=!1;for(let s=0,i=t.length;s<i;s++){let u=t[s],o;if(u instanceof Node)e.push(u);else if(!(u==null||u===!0||u===!1))if(Array.isArray(u))r=ue(e,u)||r;else if((o=typeof u)=="string")e.push(document.createTextNode(u));else if(o==="function")if(n){for(;typeof u=="function";)u=u();r=ue(e,Array.isArray(u)?u:[u])||r}else e.push(u),r=!0;else e.push(document.createTextNode(u.toString()))}return r}function me(e,t,n){for(let r=0,s=t.length;r<s;r++)e.insertBefore(t[r],n)}function P(e,t,n,r){if(n===void 0)return e.textContent="";const s=r||document.createTextNode("");if(t.length){let i=!1;for(let u=t.length-1;u>=0;u--){const o=t[u];if(s!==o){const l=o.parentNode===e;!i&&!u?l?e.replaceChild(s,o):e.insertBefore(s,n):l&&o.remove()}else i=!0}}else e.insertBefore(s,n);return[s]}function c(e){return e!=null&&typeof e=="object"&&e["@@functional/placeholder"]===!0}function v(e){return function t(n){return arguments.length===0||c(n)?t:e.apply(this,arguments)}}function w(e){return function t(n,r){switch(arguments.length){case 0:return t;case 1:return c(n)?t:v(function(s){return e(n,s)});default:return c(n)&&c(r)?t:c(n)?v(function(s){return e(s,r)}):c(r)?v(function(s){return e(n,s)}):e(n,r)}}}function st(e,t){e=e||[],t=t||[];var n,r=e.length,s=t.length,i=[];for(n=0;n<r;)i[i.length]=e[n],n+=1;for(n=0;n<s;)i[i.length]=t[n],n+=1;return i}function Re(e,t){switch(e){case 0:return function(){return t.apply(this,arguments)};case 1:return function(n){return t.apply(this,arguments)};case 2:return function(n,r){return t.apply(this,arguments)};case 3:return function(n,r,s){return t.apply(this,arguments)};case 4:return function(n,r,s,i){return t.apply(this,arguments)};case 5:return function(n,r,s,i,u){return t.apply(this,arguments)};case 6:return function(n,r,s,i,u,o){return t.apply(this,arguments)};case 7:return function(n,r,s,i,u,o,l){return t.apply(this,arguments)};case 8:return function(n,r,s,i,u,o,l,f){return t.apply(this,arguments)};case 9:return function(n,r,s,i,u,o,l,f,a){return t.apply(this,arguments)};case 10:return function(n,r,s,i,u,o,l,f,a,p){return t.apply(this,arguments)};default:throw new Error("First argument to _arity must be a non-negative integer no greater than ten")}}function N(e){return function t(n,r,s){switch(arguments.length){case 0:return t;case 1:return c(n)?t:w(function(i,u){return e(n,i,u)});case 2:return c(n)&&c(r)?t:c(n)?w(function(i,u){return e(i,r,u)}):c(r)?w(function(i,u){return e(n,i,u)}):v(function(i){return e(n,r,i)});default:return c(n)&&c(r)&&c(s)?t:c(n)&&c(r)?w(function(i,u){return e(i,u,s)}):c(n)&&c(s)?w(function(i,u){return e(i,r,u)}):c(r)&&c(s)?w(function(i,u){return e(n,i,u)}):c(n)?v(function(i){return e(i,r,s)}):c(r)?v(function(i){return e(n,i,s)}):c(s)?v(function(i){return e(n,r,i)}):e(n,r,s)}}}var it=N(function(t,n,r){var s=r.length;if(t>=s||t<-s)return r;var i=(s+t)%s,u=st(r);return u[i]=n(r[i]),u}),ut=it,de=Array.isArray||function(t){return t!=null&&t.length>=0&&Object.prototype.toString.call(t)==="[object Array]"};function ot(e){return e!=null&&typeof e["@@transducer/step"]=="function"}function Ue(e,t,n){return function(){if(arguments.length===0)return n();var r=arguments[arguments.length-1];if(!de(r)){for(var s=0;s<e.length;){if(typeof r[e[s]]=="function")return r[e[s]].apply(r,Array.prototype.slice.call(arguments,0,-1));s+=1}if(ot(r)){var i=t.apply(null,Array.prototype.slice.call(arguments,0,-1));return i(r)}}return n.apply(this,arguments)}}function lt(e){return e&&e["@@transducer/reduced"]?e:{"@@transducer/value":e,"@@transducer/reduced":!0}}var oe={init:function(){return this.xf["@@transducer/init"]()},result:function(e){return this.xf["@@transducer/result"](e)}};function at(e){return Object.prototype.toString.call(e)==="[object String]"}var ft=v(function(t){return de(t)?!0:!t||typeof t!="object"||at(t)?!1:t.length===0?!0:t.length>0?t.hasOwnProperty(0)&&t.hasOwnProperty(t.length-1):!1}),ct=ft,ht=function(){function e(t){this.f=t}return e.prototype["@@transducer/init"]=function(){throw new Error("init not implemented on XWrap")},e.prototype["@@transducer/result"]=function(t){return t},e.prototype["@@transducer/step"]=function(t,n){return this.f(t,n)},e}();function pt(e){return new ht(e)}var gt=w(function(t,n){return Re(t.length,function(){return t.apply(n,arguments)})}),dt=gt;function yt(e,t,n){for(var r=0,s=n.length;r<s;){if(t=e["@@transducer/step"](t,n[r]),t&&t["@@transducer/reduced"]){t=t["@@transducer/value"];break}r+=1}return e["@@transducer/result"](t)}function Ae(e,t,n){for(var r=n.next();!r.done;){if(t=e["@@transducer/step"](t,r.value),t&&t["@@transducer/reduced"]){t=t["@@transducer/value"];break}r=n.next()}return e["@@transducer/result"](t)}function be(e,t,n,r){return e["@@transducer/result"](n[r](dt(e["@@transducer/step"],e),t))}var Se=typeof Symbol<"u"?Symbol.iterator:"@@iterator";function wt(e,t,n){if(typeof e=="function"&&(e=pt(e)),ct(n))return yt(e,t,n);if(typeof n["fantasy-land/reduce"]=="function")return be(e,t,n,"fantasy-land/reduce");if(n[Se]!=null)return Ae(e,t,n[Se]());if(typeof n.next=="function")return Ae(e,t,n);if(typeof n.reduce=="function")return be(e,t,n,"reduce");throw new TypeError("reduce: list must be array or iterable")}function Y(e,t){return Object.prototype.hasOwnProperty.call(t,e)}var _e=Object.prototype.toString,vt=function(){return _e.call(arguments)==="[object Arguments]"?function(t){return _e.call(t)==="[object Arguments]"}:function(t){return Y("callee",t)}}(),mt=vt,At=!{toString:null}.propertyIsEnumerable("toString"),Oe=["constructor","valueOf","isPrototypeOf","toString","propertyIsEnumerable","hasOwnProperty","toLocaleString"],xe=function(){return arguments.propertyIsEnumerable("length")}(),bt=function(t,n){for(var r=0;r<t.length;){if(t[r]===n)return!0;r+=1}return!1},St=v(typeof Object.keys=="function"&&!xe?function(t){return Object(t)!==t?[]:Object.keys(t)}:function(t){if(Object(t)!==t)return[];var n,r,s=[],i=xe&&mt(t);for(n in t)Y(n,t)&&(!i||n!=="length")&&(s[s.length]=n);if(At)for(r=Oe.length-1;r>=0;)n=Oe[r],Y(n,t)&&!bt(s,n)&&(s[s.length]=n),r-=1;return s}),ke=St,_t=N(wt),Ot=_t,xt=v(function(t){return function(){return t}}),kt=xt,$t=v(function(t){return t===null?"Null":t===void 0?"Undefined":Object.prototype.toString.call(t).slice(8,-1)}),$e=$t;function Et(e,t){return function(){return t.call(this,e.apply(this,arguments))}}function Me(e,t){return function(){var n=arguments.length;if(n===0)return t();var r=arguments[n-1];return de(r)||typeof r[e]!="function"?t.apply(this,arguments):r[e].apply(r,Array.prototype.slice.call(arguments,0,n-1))}}var Pt=N(Me("slice",function(t,n,r){return Array.prototype.slice.call(r,t,n)})),Xe=Pt,jt=v(Me("tail",Xe(1,1/0))),Ct=jt;function yn(){if(arguments.length===0)throw new Error("pipe requires at least one argument");return Re(arguments[0].length,Ot(Et,arguments[0],Ct(arguments)))}function Ee(e){for(var t=[],n;!(n=e.next()).done;)t.push(n.value);return t}function Pe(e,t,n){for(var r=0,s=n.length;r<s;){if(e(t,n[r]))return!0;r+=1}return!1}function Tt(e){var t=String(e).match(/^function (\w*)/);return t==null?"":t[1]}function Lt(e,t){return e===t?e!==0||1/e===1/t:e!==e&&t!==t}var ne=typeof Object.is=="function"?Object.is:Lt;function je(e,t,n,r){var s=Ee(e),i=Ee(t);function u(o,l){return ye(o,l,n.slice(),r.slice())}return!Pe(function(o,l){return!Pe(u,l,o)},i,s)}function ye(e,t,n,r){if(ne(e,t))return!0;var s=$e(e);if(s!==$e(t))return!1;if(typeof e["fantasy-land/equals"]=="function"||typeof t["fantasy-land/equals"]=="function")return typeof e["fantasy-land/equals"]=="function"&&e["fantasy-land/equals"](t)&&typeof t["fantasy-land/equals"]=="function"&&t["fantasy-land/equals"](e);if(typeof e.equals=="function"||typeof t.equals=="function")return typeof e.equals=="function"&&e.equals(t)&&typeof t.equals=="function"&&t.equals(e);switch(s){case"Arguments":case"Array":case"Object":if(typeof e.constructor=="function"&&Tt(e.constructor)==="Promise")return e===t;break;case"Boolean":case"Number":case"String":if(!(typeof e==typeof t&&ne(e.valueOf(),t.valueOf())))return!1;break;case"Date":if(!ne(e.valueOf(),t.valueOf()))return!1;break;case"Error":return e.name===t.name&&e.message===t.message;case"RegExp":if(!(e.source===t.source&&e.global===t.global&&e.ignoreCase===t.ignoreCase&&e.multiline===t.multiline&&e.sticky===t.sticky&&e.unicode===t.unicode))return!1;break}for(var i=n.length-1;i>=0;){if(n[i]===e)return r[i]===t;i-=1}switch(s){case"Map":return e.size!==t.size?!1:je(e.entries(),t.entries(),n.concat([e]),r.concat([t]));case"Set":return e.size!==t.size?!1:je(e.values(),t.values(),n.concat([e]),r.concat([t]));case"Arguments":case"Array":case"Object":case"Boolean":case"Number":case"String":case"Date":case"Error":case"RegExp":case"Int8Array":case"Uint8Array":case"Uint8ClampedArray":case"Int16Array":case"Uint16Array":case"Int32Array":case"Uint32Array":case"Float32Array":case"Float64Array":case"ArrayBuffer":break;default:return!1}var u=ke(e);if(u.length!==ke(t).length)return!1;var o=n.concat([e]),l=r.concat([t]);for(i=u.length-1;i>=0;){var f=u[i];if(!(Y(f,t)&&ye(t[f],e[f],o,l)))return!1;i-=1}return!0}var Nt=w(function(t,n){return ye(t,n,[],[])}),wn=Nt,qt=N(function(t,n,r){var s=Array.prototype.slice.call(r,0);return s.splice(t,n),s}),vn=qt,It=function(){function e(t,n){this.xf=n,this.n=t,this.i=0}return e.prototype["@@transducer/init"]=oe.init,e.prototype["@@transducer/result"]=oe.result,e.prototype["@@transducer/step"]=function(t,n){this.i+=1;var r=this.n===0?t:this.xf["@@transducer/step"](t,n);return this.n>=0&&this.i>=this.n?lt(r):r},e}(),Dt=w(function(t,n){return new It(t,n)}),Bt=Dt,Ft=w(Ue(["take"],Bt,function(t,n){return Xe(0,t<0?1/0:t,n)})),Rt=Ft;function Ut(e,t){return Rt(e<t.length?t.length-e:0,t)}var Mt=function(){function e(t,n){this.xf=n,this.pos=0,this.full=!1,this.acc=new Array(t)}return e.prototype["@@transducer/init"]=oe.init,e.prototype["@@transducer/result"]=function(t){return this.acc=null,this.xf["@@transducer/result"](t)},e.prototype["@@transducer/step"]=function(t,n){return this.full&&(t=this.xf["@@transducer/step"](t,this.acc[this.pos])),this.store(n),t},e.prototype.store=function(t){this.acc[this.pos]=t,this.pos+=1,this.pos===this.acc.length&&(this.pos=0,this.full=!0)},e}(),Xt=w(function(t,n){return new Mt(t,n)}),Wt=Xt,Kt=w(Ue([],Wt,Ut)),mn=Kt,zt=N(function(t,n,r){return ut(t,kt(n),r)}),An=zt,Gt=N(function(e,t,n){var r=n.length,s=n.slice(),i=e<0?r+e:e,u=t<0?r+t:t,o=s.splice(i,1);return i<0||i>=n.length||u<0||u>=n.length?n:[].concat(s.slice(0,u)).concat(o).concat(s.slice(u,n.length))}),bn=Gt,Ht=w(function(t,n){for(var r={},s={},i=0,u=t.length;i<u;)s[t[i]]=1,i+=1;for(var o in n)s.hasOwnProperty(o)||(r[o]=n[o]);return r}),Sn=Ht;const we=Symbol("store-raw"),J=Symbol("store-node"),Vt=Symbol("store-name");function We(e,t){let n=e[k];if(!n){Object.defineProperty(e,k,{value:n=new Proxy(e,Jt)});const r=Object.keys(e),s=Object.getOwnPropertyDescriptors(e);for(let i=0,u=r.length;i<u;i++){const o=r[i];if(s[o].get){const l=s[o].get.bind(n);Object.defineProperty(e,o,{get:l})}}}return n}function T(e){return e!=null&&typeof e=="object"&&(e[k]||!e.__proto__||e.__proto__===Object.prototype||Array.isArray(e))}function F(e,t=new Set){let n,r,s,i;if(n=e!=null&&e[we])return n;if(!T(e)||t.has(e))return e;if(Array.isArray(e)){Object.isFrozen(e)?e=e.slice(0):t.add(e);for(let u=0,o=e.length;u<o;u++)s=e[u],(r=F(s,t))!==s&&(e[u]=r)}else{Object.isFrozen(e)?e=Object.assign({},e):t.add(e);const u=Object.keys(e),o=Object.getOwnPropertyDescriptors(e);for(let l=0,f=u.length;l<f;l++)i=u[l],!o[i].get&&(s=e[i],(r=F(s,t))!==s&&(e[i]=r))}return e}function Z(e){let t=e[J];return t||Object.defineProperty(e,J,{value:t={}}),t}function Qt(e,t){const n=Reflect.getOwnPropertyDescriptor(e,t);return!n||n.get||!n.configurable||t===k||t===J||t===Vt||(delete n.value,delete n.writable,n.get=()=>e[k][t]),n}function Yt(e){if(qe()){const t=Z(e);(t._||(t._=le()))()}return Reflect.ownKeys(e)}function le(){const[e,t]=fe(void 0,{equals:!1,internal:!0});return e.$=t,e}const Jt={get(e,t,n){if(t===we)return e;if(t===k)return n;const r=e[t];if(t===J||t==="__proto__")return r;const s=T(r);if(qe()&&(typeof r!="function"||e.hasOwnProperty(t))){let i,u;s&&(i=Z(r))&&(u=i._||(i._=le()),u()),i=Z(e),u=i[t]||(i[t]=le()),u()}return s?We(r):r},set(){return!0},deleteProperty(){return!0},ownKeys:Yt,getOwnPropertyDescriptor:Qt};function ee(e,t,n){if(e[t]===n)return;const r=Array.isArray(e),s=e.length,i=n===void 0,u=r||i===t in e;i?delete e[t]:e[t]=n;let o=Z(e),l;(l=o[t])&&l.$(),r&&e.length!==s&&(l=o.length)&&l.$(),u&&(l=o._)&&l.$()}function Zt(e,t){const n=Object.keys(t);for(let r=0;r<n.length;r+=1){const s=n[r];ee(e,s,t[s])}}function I(e,t,n=[]){let r,s=e;if(t.length>1){r=t.shift();const u=typeof r,o=Array.isArray(e);if(Array.isArray(r)){for(let l=0;l<r.length;l++)I(e,[r[l]].concat(t),n);return}else if(o&&u==="function"){for(let l=0;l<e.length;l++)r(e[l],l)&&I(e,[l].concat(t),n);return}else if(o&&u==="object"){const{from:l=0,to:f=e.length-1,by:a=1}=r;for(let p=l;p<=f;p+=a)I(e,[p].concat(t),n);return}else if(t.length>1){I(e[r],t,[r].concat(n));return}s=e[r],n=[r].concat(n)}let i=t[0];typeof i=="function"&&(i=i(s,n),i===s)||r===void 0&&i==null||(i=F(i),r===void 0||T(s)&&T(i)&&!Array.isArray(i)?Zt(s,i):ee(e,r,i))}function _n(e,t){const n=F(e||{}),r=We(n);function s(...i){Le(()=>I(n,i))}return[r,s]}const Ke={get(e,t){if(t===we)return e;const n=e[t];return T(n)?new Proxy(n,Ke):n},set(e,t,n){return ee(e,t,F(n)),!0},deleteProperty(e,t){return ee(e,t,void 0),!0}};function On(e){return t=>(T(t)&&e(new Proxy(t,Ke)),t)}export{rn as F,sn as I,ln as M,on as S,re as a,en as b,O as c,hn as d,fe as e,tn as f,gn as g,un as h,nt as i,Rt as j,On as k,Sn as l,an as m,bn as n,Ne as o,yn as p,nn as q,vn as r,pn as s,cn as t,An as u,dn as v,mn as w,_n as x,wn as y,fn as z};
