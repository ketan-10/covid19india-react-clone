import{R as e,g as p,r as l,s as f,h as d,l as u,A as v}from"./vendor.29f2c83a.js";import{l as c}from"./index.0405c5bd.js";const x=({showLanguageSwitcher:s,setShowLanguageSwitcher:o})=>{const{t:m,i18n:r}=p(),i=l.exports.useRef(null);return f(i,n=>{var a;((a=n.target)==null?void 0:a.className)!=="navbar__left"&&o(!1)}),l.exports.useEffect(()=>{s&&(document.documentElement.scrollTo({top:0,behavior:"smooth"}),document.body.scrollTo({top:0,behavior:"smooth"}))},[s]),d(s,{from:{opacity:0,marginTop:"0px",marginBottom:"0px"},enter:{opacity:1,marginTop:"100px",marginBottom:"400px"},leave:{opacity:0,marginTop:"0px",marginBottom:"0px"},config:{mass:1,tension:100,friction:15}})((n,a)=>a&&e.createElement(u.div,{className:"ls-container",style:n},e.createElement("p",null,m("We speak the following languages")),e.createElement("div",{className:"ls-list",ref:i},Object.keys(c).map(t=>e.createElement("div",{key:t,className:`ls-languages ${r.language===t?"ls-active ":""}`,onClick:()=>{r.changeLanguage(t),o(!1)}},c[t]))),e.createElement("div",{className:"ls-arrow",onClick:()=>o(!1)},e.createElement(v,{size:"17"}))))};var k=e.memo(x);export{k as default};
