var O=Object.defineProperty,V=Object.defineProperties;var M=Object.getOwnPropertyDescriptors;var g=Object.getOwnPropertySymbols;var P=Object.prototype.hasOwnProperty,F=Object.prototype.propertyIsEnumerable;var E=(n,a,t)=>a in n?O(n,a,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[a]=t,r=(n,a)=>{for(var t in a||(a={}))P.call(a,t)&&E(n,t,a[t]);if(g)for(var t of g(a))F.call(a,t)&&E(n,t,a[t]);return n},h=(n,a)=>V(n,M(a));import{i as T,B as U,a as j,b as Q,r as l,u as $,c as H,d as z,e as W,f as K,g as A,h as x,R as e,j as N,L as m,H as G,k as J,U as X,l as Y,S as L,M as y,m as Z,n as ee,o as ae,p as ie,q as te}from"./vendor.de4d9e5b.js";const se=function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const u of i)if(u.type==="childList")for(const o of u.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const u={};return i.integrity&&(u.integrity=i.integrity),i.referrerpolicy&&(u.referrerPolicy=i.referrerpolicy),i.crossorigin==="use-credentials"?u.credentials="include":i.crossorigin==="anonymous"?u.credentials="omit":u.credentials="same-origin",u}function s(i){if(i.ep)return;i.ep=!0;const u=t(i);fetch(i.href,u)}};se();const ue="modulepreload",k={},ne="/covid19india-react-clone/",oe=function(a,t){return!t||t.length===0?a():Promise.all(t.map(s=>{if(s=`${ne}${s}`,s in k)return;k[s]=!0;const i=s.endsWith(".css"),u=i?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${s}"]${u}`))return;const o=document.createElement("link");if(o.rel=i?"stylesheet":ue,i||(o.as="script",o.crossOrigin=""),o.href=s,document.head.appendChild(o),i)return new Promise((p,c)=>{o.addEventListener("load",p),o.addEventListener("error",c)})})).then(()=>a())},B="/covid19india-react-clone/";T.use(U).use(j).use(Q).init({debug:!1,keySeparator:!1,returnEmptyString:!1,load:"languageOnly",backend:{loadPath:`${B}api/locales/locale_{{lng}}.json`},fallbackLng:"english",interpolation:{escapeValue:!1}});const C={english:"English",hindi:"\u0939\u093F\u0902\u0926\u0940",bengali:"\u09AC\u09BE\u0982\u09B2\u09BE",gujarati:"\u0A97\u0AC1\u0A9C\u0AB0\u0ABE\u0AA4\u0AC0",kannada:"\u0C95\u0CA8\u0CCD\u0CA8\u0CA1",malayalam:"\u0D2E\u0D32\u0D2F\u0D3E\u0D33\u0D02",marathi:"\u092E\u0930\u093E\u0920\u0940",odiya:"\u0B13\u0B21\u0B3F\u0B06",punjabi:"\u0A2A\u0A70\u0A1C\u0A3E\u0A2C\u0A40",tamil:"\u0BA4\u0BAE\u0BBF\u0BB4\u0BCD",telugu:"\u0C24\u0C46\u0C32\u0C41\u0C17\u0C41"},re={zIndex:-1,left:"6rem"},S={left:"-9rem"},w={height:"0vh"},le={height:"100vh"},me=({pages:n,setShowLanguageSwitcher:a})=>{const[t,s]=l.exports.useState(!1);$(t);const i=H(),u=z();W(()=>{s(!1)});const o=l.exports.useCallback(v=>{s(!t)},[s,t]),p=l.exports.useCallback(v=>{a(b=>!b)},[a]),c=K(!1),{t:f,i18n:q}=A(),I=Object.keys(C).includes(q.language)?q.language:q.options.fallbackLng[0],D=x(t,h(r({},u.width<768?{from:w,enter:le,leave:w}:{from:S,enter:re,leave:S}),{config:{mass:1,tension:210,friction:26}}));return x(!0,{from:{opacity:0},enter:{opacity:1},leave:{opacity:0}})(v=>e.createElement(N.div,{className:"navbar",style:v},e.createElement("div",{className:"navbar-container"},e.createElement("div",{className:"navbar__left",onClick:p},C[I]),e.createElement("div",{className:"navbar__middle"},e.createElement(m,{to:"/"},"Covid19",e.createElement("span",{className:"space"}," "),e.createElement("span",{className:"blue"},"India"))),e.createElement("div",r({className:"navbar__right"},u.width<769&&{onClick:o}),u.width<769?e.createElement("span",null,f(t?"Close":"Menu")):e.createElement("div",{className:"nav-icons",onMouseEnter:s.bind(null,!0)},e.createElement(m,{to:"/"},e.createElement(G,r({},d(i.pathname,"/")))),e.createElement(m,{to:"/blog"},e.createElement(J,r({},d(i.pathname,"/blog")))),e.createElement(m,{to:"/volunteers"},e.createElement(X,r({},d(i.pathname,"/volunteers")))),e.createElement(m,{to:"/about"},e.createElement(Y,r({},d(i.pathname,"/about")))),e.createElement("a",{onClick:c.toggle},c.value?e.createElement(L,{color:"#ffc107"}):e.createElement(y,null))))),D((b,R)=>R&&e.createElement(N.div,{style:b,className:"nav-animated-menu"},e.createElement(ce,{pages:n,setIsOpen:s,windowSize:u,darkMode:c,pathName:i.pathname})))))},ce=({pages:n,setIsOpen:a,windowSize:t,pathName:s,darkMode:i})=>{const{t:u}=A();return e.createElement("div",r({className:"navbar__menu"},t.width>=769&&{onMouseLeave:a.bind(null,!1)}),n.filter(o=>o.showInNavbar).map(o=>e.createElement(m,{key:o.displayName,to:o.pageLink,onClick:()=>a(!1)},e.createElement("span",{className:s===o.pageLink?"selected":""},u(o.displayName)))),t.width<769&&e.createElement("a",{onClick:i.toggle},i.value?e.createElement(L,{color:"#ffc107"}):e.createElement(y,null)),e.createElement("span",{className:"expand-bottom"},u("A crowdsourced initiative.")))},d=(n,a)=>({style:{stroke:n===a?"#4c75f2":""}});function _(n,a=5,t=1e3){return new Promise((s,i)=>{n().then(s).catch(u=>{setTimeout(()=>{if(a===1){i(u);return}_(n,a-1,t).then(s,i)},t)})})}const de=l.exports.lazy(()=>_(()=>oe(()=>import("./LanguageSwitcher.3c3ee11a.js"),["assets/LanguageSwitcher.3c3ee11a.js","assets/vendor.de4d9e5b.js"]))),pe=()=>{const[n,a]=l.exports.useState(!1),t=[{pageLink:"/",view:e.createElement(qe,null),displayName:"Home",showInNavbar:!0},{pageLink:"/blog",view:e.createElement(e.Fragment,null,"Blog"),displayName:"Blog",showInNavbar:!0},{pageLink:"/volunteers",view:e.createElement(e.Fragment,null,"Volunteers"),displayName:"Volunteers",showInNavbar:!0},{pageLink:"/about",view:e.createElement(e.Fragment,null,"About"),displayName:"About",showInNavbar:!0},{pageLink:"/state/:stateCode",view:e.createElement(e.Fragment,null,"State"),displayName:"State",showInNavbar:!1}];return e.createElement("div",{className:"app"},e.createElement(Z,{basename:B},e.createElement(l.exports.Suspense,{fallback:e.createElement("div",null)},e.createElement(de,{showLanguageSwitcher:n,setShowLanguageSwitcher:a})),e.createElement(me,{pages:t,setShowLanguageSwitcher:a}),e.createElement("div",{className:"page"},e.createElement(ee,null,t.map(s=>e.createElement(ae,{exact:!0,path:s.pageLink,key:s.pageLink},s.view)),e.createElement(ie,{to:"/"})))))},qe=()=>e.createElement("div",null,e.createElement("p",null,"Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum deserunt, eligendi veritatis maiores dolorem aut culpa veniam modi animi delectus dolor officia ex quisquam explicabo ipsam fugiat. Quas amet, corporis sed consequuntur reprehenderit iusto! Neque sed earum magnam repudiandae iure laboriosam maxime quos totam nemo quae accusantium dolore et quia, labore quasi, omnis nostrum iste voluptate ducimus maiores sequi recusandae impedit aliquid consequatur. Praesentium quidem doloremque expedita necessitatibus? Sit voluptates in quae vitae minima, quod consectetur adipisci impedit facilis error asperiores? Rem mollitia ipsam non in quisquam est perferendis temporibus tenetur minus eveniet rerum, sed saepe blanditiis placeat provident atque adipisci quos, sint aliquid quia, exercitationem tempora! Incidunt nobis esse accusamus repellat animi debitis saepe veritatis, autem quos atque corporis itaque fuga unde quae at iure voluptatem consequatur velit! Laborum numquam eaque sunt ullam odit, assumenda veritatis recusandae quos? Ut doloribus ratione sint porro debitis sit nihil accusantium dolor vero inventore consequuntur consectetur placeat eum repudiandae odit provident velit maxime possimus aspernatur, eveniet, similique cupiditate quas deserunt distinctio. Nobis, quam veniam unde eaque quia maiores explicabo eveniet perferendis placeat vel iste sed quo! Similique deserunt, reiciendis vitae autem totam est! Eos ab totam fuga esse ratione repellat maxime, ipsam qui!"),e.createElement("p",null,"Ab voluptatem cumque excepturi id. Blanditiis sed repellat, cum adipisci explicabo ratione, fugiat non eum, ipsum hic tempore. Eum facilis ab repudiandae eius dolores, fuga totam deleniti, aspernatur suscipit voluptatibus, fugit temporibus obcaecati. Quae error optio inventore iure animi voluptas illo vitae quod molestiae nobis consequatur, repellat quos assumenda. Inventore quaerat voluptates animi eos ipsa accusamus facere tenetur quis aspernatur minus dolor commodi, quae provident reiciendis quo! Velit quasi magnam voluptatibus veniam tempore consectetur, sequi ex non dolorum labore libero corrupti inventore laborum quibusdam error praesentium maxime, omnis deserunt. Exercitationem impedit dolor suscipit quod commodi veritatis illo temporibus quia nulla officiis quas ullam deserunt alias fuga ducimus dolore natus omnis, delectus, animi eum fugit necessitatibus. Ut perferendis incidunt molestias nisi, reiciendis, deserunt fuga quia asperiores odio consequatur nesciunt amet dolor repellat maiores laboriosam ducimus architecto adipisci! Saepe molestias cumque vero eius magni consectetur, sint minus impedit neque ipsam ullam amet labore nam velit distinctio, ea exercitationem. Est, odit adipisci tempora sed atque aliquid debitis magni! Quam voluptates temporibus animi neque blanditiis! Commodi cumque, quos fugiat similique dicta, est ipsa quisquam consequatur sint eligendi quia. Quia voluptatem impedit quibusdam repudiandae tempore, sed in saepe esse dolorum at minima! Vero, assumenda placeat."),e.createElement("p",null,"Autem voluptate, error et aspernatur explicabo voluptas optio enim accusantium possimus necessitatibus, sint magnam sunt. Illum ducimus blanditiis, beatae rem earum, consectetur sed cumque consequuntur officia soluta fugit sit maiores quo corporis animi cum nobis nulla eveniet, pariatur assumenda. Laborum doloremque sed inventore alias deleniti laboriosam odit ut facilis temporibus ullam, cum quas facere beatae pariatur ipsa nesciunt maiores velit et tempora eum magnam dolorem voluptate! Dolor cumque a ipsam eveniet illo perferendis architecto asperiores sapiente placeat maiores consequatur reiciendis facilis aspernatur repellat, quis alias ipsa. Soluta illo eos est voluptas. Error dolores quae consectetur quidem. Sint illo libero amet dolores sapiente eveniet autem, sed optio excepturi aliquid delectus facere cum alias ut expedita hic obcaecati reiciendis ducimus repellat soluta asperiores, animi dolore voluptatum! Repudiandae, optio voluptas accusantium, ad ullam, suscipit fugiat cupiditate ipsa architecto dolores officia non quasi pariatur sequi qui dicta blanditiis. Obcaecati at sunt culpa tempore cum et autem nostrum voluptates optio amet aliquam consequatur natus debitis quam velit, pariatur, id iste alias, asperiores maiores nisi. Eaque quos vitae, deleniti numquam quas atque? Dolorem modi magnam enim porro unde ipsa, esse delectus saepe odio ab perferendis. Necessitatibus sequi animi nihil minus nesciunt eligendi autem velit? Autem, repudiandae."),e.createElement("p",null,"Temporibus veritatis debitis corrupti repellat. Veritatis inventore, aperiam ipsam iusto ullam perferendis tempora provident quia at, corporis magnam sunt incidunt pariatur deleniti officia, commodi nam tempore. At quam asperiores quis vitae distinctio architecto nostrum vel reiciendis eius! Aliquid ducimus dignissimos sapiente veniam veritatis eos cumque labore optio quidem temporibus deserunt, id perspiciatis odio dolorem fugit illo reprehenderit, in accusantium, repudiandae repellat dolor? Sed impedit numquam dolorum quo. Facere, ipsum minima numquam quam obcaecati cupiditate doloremque dolor praesentium enim. Blanditiis eum praesentium magnam autem minus doloribus, architecto omnis esse accusantium labore ipsum, ex deleniti consequuntur error. Explicabo aliquam unde accusantium id, qui ipsa tempore consequatur obcaecati, veniam eius iusto minus, at laboriosam perspiciatis repellendus totam ipsam voluptatem nemo. Quae autem ut magni itaque at, quam ipsa amet nisi. Quos vel nisi accusantium blanditiis aspernatur perspiciatis sit illo, earum porro nam assumenda mollitia modi dolor praesentium ratione ut necessitatibus ad cum, officiis dolore consequuntur eaque? Voluptas expedita est aliquam explicabo quaerat et fugit nemo, repellat quasi quibusdam maxime libero laudantium autem officia officiis fugiat accusantium quod consequuntur minima id architecto? Accusantium ea dolorum iste voluptatibus, sequi labore ipsam dicta? Aliquid laborum facere dolorum quasi molestias, accusantium sit corporis veritatis iure numquam amet."),e.createElement("p",null,"Ea alias illum doloremque, ullam perferendis deserunt totam aperiam laboriosam itaque? Suscipit nisi culpa obcaecati quae fugit vitae exercitationem, deleniti voluptatibus esse reiciendis blanditiis magni voluptate velit. Natus laborum distinctio est cum accusamus sit, repellendus doloremque qui odit consectetur blanditiis quaerat explicabo debitis dignissimos dolores laboriosam laudantium cupiditate eligendi neque doloribus consequuntur ullam officiis quam? Tenetur impedit incidunt vel recusandae est illo accusantium eum, natus sint dolor fuga molestias asperiores, earum debitis amet consectetur. Inventore cumque recusandae porro tenetur rem in. Repellendus facere officiis beatae at maxime laudantium nam quasi omnis harum laborum nesciunt totam corporis perspiciatis molestias reiciendis dicta blanditiis, explicabo quisquam placeat molestiae possimus officia? Dolore consectetur numquam alias quasi repudiandae molestias voluptatum perferendis, harum nulla modi deleniti, assumenda tempore. Omnis ex aut laudantium, aperiam iste quas consequatur minima cupiditate incidunt vel corrupti natus sed ab ipsa provident neque odit vero. Possimus, error mollitia sed sint animi dolorum cumque libero totam delectus porro accusantium iure cupiditate! Beatae, culpa placeat nam unde accusamus expedita iste repudiandae sapiente dolor accusantium similique itaque possimus delectus mollitia aliquid neque fugiat, vitae alias qui ut et inventore doloribus eos. Deleniti, nisi aut placeat reiciendis quos nam rerum fugiat a beatae sapiente. Incidunt, dignissimos."));te.render(e.createElement(l.exports.Suspense,{fallback:e.createElement("div",null)},e.createElement(e.StrictMode,null,e.createElement(pe,null))),document.getElementById("root"));export{C as l};
