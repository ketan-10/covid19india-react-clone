import{r as _,h as E,R as e,l as h,o as p,T as f,G as g,y as u,I as y}from"./vendor.78975fe4.js";import{u as b,C as N}from"./index.esm.77d1ef6e.js";const k={twitter:e.createElement(f,{size:16}),github:e.createElement(g,{size:16}),linkedin:e.createElement(u,{size:16}),instagram:e.createElement(y,{size:16})};function n({volunteer:a,style:r}){var c;const[t,s]=e.useState(!1);return e.createElement(h.div,{className:"volunteers__container__item",style:r},e.createElement("div",{className:"volunteers__container__item__image"},!t&&e.createElement(N,{backgroundColor:"#888",foregroundColor:"#888",backgroundOpacity:.2,foregroundOpacity:.4},e.createElement("rect",{x:"0",y:"0",rx:"5",ry:"5",width:"75",height:"75"})),e.createElement("img",{src:`https://volunteers.covid19india.org/images/${(c=a==null?void 0:a.image)!=null?c:"placeholder.jpg"}`,alt:"img",onLoad:()=>s(!0),style:{display:t?"block":"none"}})),e.createElement("div",{className:"volunteers__container__item__details"},e.createElement("h2",{className:"volunteer__name"},a==null?void 0:a.name),e.createElement("p",null,a==null?void 0:a.bio),e.createElement("div",{className:"volunteers__container__item__details__socials"},Object.entries(k).map(([o,d])=>{var l,m;const i=o;return(l=a==null?void 0:a.socials)!=null&&l[i]?e.createElement("a",{key:o,href:(m=a==null?void 0:a.socials)==null?void 0:m[i],target:"_blank",rel:"noopener noreferrer",className:p("icon",i)},d):null}))))}const C=()=>{const{data:a}=b("https://volunteers.covid19india.org/data.json",t=>fetch(t).then(s=>s.json()),{revalidateOnMount:!0,suspense:!0}),r=E(a,{keys:t=>{var s;return(s=t==null?void 0:t.name)!=null?s:""},sort:(t,s)=>Math.random()>.5?1:-1,from:{opacity:0,scale:.8},enter:{opacity:1,scale:1},leave:{opacity:0,scale:0},config:{mass:1,tension:100,friction:15}});return e.createElement("div",{className:"volunteers"},e.createElement("p",{className:"fadeInUpAnimation"},"We would like to thank the hundreds of volunteers who, for the last 18 months, extended their time and effort towards collating and publishing COVID-19 data for India."),e.createElement("div",{className:"volunteers__container"},r((t,s)=>s&&e.createElement(n,{volunteer:s,key:s.name,style:t})),a&&e.createElement("div",{className:"volunteers__container__item last"},e.createElement(n,null),e.createElement(n,null),e.createElement(n,{volunteer:{bio:"and many more..."}}))))};var x=_.exports.memo(C);export{x as default};