import{d as I,o as _,c as m,a,t as w,E as x,_ as S,u as B,b as T,r as C,e as v,f as U,g as $,h as p,i as n,w as u,j as D,F as E,k as F,l as V,R as q,m as A,n as z,p as K,q as M,s as O}from"./index-a164c9b5.js";const P={class:"copy-content",title:"点击复制"},j={class:"copy-text"},G={name:"CopyContent"},H=I({...G,props:{copyText:null},setup(l){const r=l;function f(){navigator.clipboard.writeText(r.copyText).then(()=>{x({message:"复制成功: "+r.copyText,type:"success",center:!0,duration:1e3})},e=>{console.log(e)})}return(e,h)=>(_(),m("div",P,[a("span",j,w(r.copyText),1),a("i",{class:"iconfont icon-fuzhi",onClick:f})]))}});const J=S(H,[["__scopeId","data-v-14a719e5"]]),Q=l=>(M("data-v-5e98925c"),l=l(),O(),l),W={class:"login-box"},X={class:"login-content"},Y=Q(()=>a("p",{class:"login-title"},"欢迎登录",-1)),Z=V("登录"),ee={class:"login-tip"},se=V("用户名: "),te={name:q.LOGIN},oe=I({...te,setup(l){const r=B(),f=T(),e=C({userName:"liuzhao",password:"123456"}),h=C({userName:[{required:!0,message:"请输入用户名",trigger:"blur"}],password:[{required:!0,message:"请输入密码",trigger:"blur"}]}),i=v(!1),N=v(),y=v();U(()=>{k()});const k=()=>{R()},R=async()=>{const c=await $();N.value=c.data},b=async c=>{c&&await c.validate(async s=>{if(s){i.value=!0;const d={userName:e.userName,password:e.password};try{const o=await A(d);if(console.log(o,"data"),o.code===z.SUCCESS){x({message:"登录成功",type:"success"});try{await r.saveUserInfo(o.data),await r.findUserInfoByID(),f.push({path:K.DASHBOARD})}catch(g){console.log(g,111)}}else x({message:o.msg,type:"error"});i.value=!1}catch{i.value=!1}}else return!1})};return(c,s)=>{const d=p("el-input"),o=p("el-form-item"),g=p("el-button"),L=p("el-form");return _(),m("div",W,[a("div",X,[Y,n(L,{"label-position":"left",model:e,ref_key:"formRef",ref:y,rules:h},{default:u(()=>[n(o,{label:"用户名",prop:"userName","label-width":"80px"},{default:u(()=>[n(d,{modelValue:e.userName,"onUpdate:modelValue":s[0]||(s[0]=t=>e.userName=t)},null,8,["modelValue"])]),_:1}),n(o,{label:"密码",prop:"password","label-width":"80px"},{default:u(()=>[n(d,{type:"password",modelValue:e.password,"onUpdate:modelValue":s[1]||(s[1]=t=>e.password=t),onKeydown:s[2]||(s[2]=D(t=>b(y.value),["enter"]))},null,8,["modelValue"])]),_:1}),n(o,null,{default:u(()=>[n(g,{class:"loginBtn",type:"primary",onClick:s[3]||(s[3]=t=>b(y.value)),loading:i.value},{default:u(()=>[Z]),_:1},8,["loading"])]),_:1})]),_:1},8,["model","rules"]),a("div",ee,[a("ul",null,[(_(!0),m(E,null,F(N.value,t=>(_(),m("li",{class:"user-item",key:t.id},[a("span",null,[se,n(J,{"copy-text":t.userName},null,8,["copy-text"])]),a("span",null,"密码: "+w(t.password),1),a("span",null,"权限: "+w(t.roleName),1)]))),128))])])])])}}});const ne=S(oe,[["__scopeId","data-v-5e98925c"]]);export{ne as default};
