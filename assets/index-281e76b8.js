import{c as m,a as g}from"./index.esm-02db0d52.js";import{d as n,x as h,f as v,P as x,h as b,o as r,c as d,i as l,w as E,F as w,l as i,q as y,s as C,a as o,_ as W}from"./index-f2385b80.js";const _=t=>(y("data-v-4edc07cb"),t=t(),C(),t),k=_(()=>o("p",null,[i(" 具体配置 "),o("a",{href:"https://www.wangeditor.com/",target:"block"}," 官方文档")],-1)),B=_(()=>o("div",{class:"WangEidtor-box"},[o("div",{id:"toolbar-container"}),o("div",{id:"WangEidtor",style:{height:"600px"}})],-1)),I=i("提交"),S={name:"WangEidtor"},N=n({...S,setup(t){const a={},c={excludeKeys:["fullScreen"]},e=h();v(()=>{u()}),x(()=>{e.value&&(e.value.destroy(),e.value=null)});const u=()=>{a.placeholder="请输入内容",e.value=m({selector:"#WangEidtor",config:a,mode:"default"}),g({editor:e.value,selector:"#toolbar-container",config:c,mode:"default"})},p=()=>{var s;console.log((s=e.value)==null?void 0:s.getHtml())};return(s,F)=>{const f=b("el-button");return r(),d(w,null,[k,B,l(f,{type:"primary",class:"WangEidtor-btn",onClick:p},{default:E(()=>[I]),_:1})],64)}}});const T=W(N,[["__scopeId","data-v-4edc07cb"]]),V={class:"richtext-box"},$={name:"RichText"},H=n({...$,setup(t){return(a,c)=>(r(),d("div",V,[l(T)]))}});export{H as default};
