"use strict";(self.webpackChunkrayos_admin_react=self.webpackChunkrayos_admin_react||[]).push([[0],{9515:function(e,n,t){var i=t(1413),r=t(6934),o=t(9891),l=(t(2791),t(184)),a=(0,r.ZP)((function(e){return(0,l.jsx)(o.Z,(0,i.Z)({focusVisibleClassName:".Mui-focusVisible"},e))}))((function(e){e.theme;return{width:44,height:26,padding:5,"& .MuiSwitch-switchBase":{margin:1,padding:6,transform:"translateX(0px)","&.Mui-checked":{color:"#fff",transform:"translateX(18px)"},"&.Mui-checked + .MuiSwitch-track":{}},"& .MuiSwitch-thumb":{width:12,height:12},"& .MuiSwitch-track":{borderRadius:16}}}));n.Z=a},5612:function(e,n,t){var i=t(4942),r=t(1413),o=t(885),l=t(2791);n.Z=function(e){var n,t,a,u,s=l.useState({limit:(null===e||void 0===e||null===(n=e.defaultParams)||void 0===n?void 0:n.limit)||10,page:(null===e||void 0===e||null===(t=e.defaultParams)||void 0===t?void 0:t.page)||1,search:(null===e||void 0===e||null===(a=e.defaultParams)||void 0===a?void 0:a.search)||"",filters:(null===e||void 0===e||null===(u=e.defaultParams)||void 0===u?void 0:u.filter)||{}}),c=(0,o.Z)(s,2),d=c[0],v=c[1];return{params:d,search:null===d||void 0===d?void 0:d.search,setSearch:function(e){return v((0,r.Z)((0,r.Z)({},d),{},{search:e}))},page:((null===d||void 0===d?void 0:d.page)||1)-1,setPage:function(e){return v((0,r.Z)((0,r.Z)({},d),{},{page:e+1}))},limit:null===d||void 0===d?void 0:d.limit,setLimit:function(e){return v((0,r.Z)((0,r.Z)({},d),{},{limit:e}))},watch:function(e){var n;return(null===d||void 0===d||null===(n=d.filters)||void 0===n?void 0:n[e])||void 0},setFilterField:function(e,n){return v((0,r.Z)((0,r.Z)({},d),{},{filters:(0,r.Z)((0,r.Z)({},null===d||void 0===d?void 0:d.filters),{},(0,i.Z)({},e,n))}))},getQueryParams:function(){return JSON.parse(JSON.stringify((0,r.Z)((0,r.Z)({},d),{},{filters:void 0},d.filters)))}}}},7569:function(e,n,t){var i=t(4165),r=t(5861),o=t(1413),l=t(885),a=t(703),u=t(1889),s=t(4834),c=t(4415),d=t(3786),v=t(3767),h=t(3239),f=t(8178),m=t(3044),p=t(748),x=t(890),Z=t(2791),g=t(1087),w=t(8152),j=t(7400),P=t(2426),b=t.n(P),y=t(8090),k=t(9515),S=t(7589),C=t(5239),A=t(5612),F=t(184),G=function(e){var n,t,o=e.revItem,l=e.showUser,u=e.showProd,s=e.showAll,c=Z.useContext(S.Z),d=(0,w.S)().mutateAsync,h=function(){var e=(0,r.Z)((0,i.Z)().mark((function e(n){var t;return(0,i.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,C.E)((function(){return d(n)}));case 2:(t=e.sent).status?c.createSnack(t.msg):c.createSnack(t.msg,"error");case 4:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}();return(0,F.jsx)(a.Z,{elevation:0,sx:{p:1,pb:.5,mb:1,"&:last-child":{mb:0},border:"1px solid #ddd"},children:(0,F.jsxs)(v.Z,{direction:"row",alignItems:"center",justifyContent:"space-between",columnGap:4,children:[(l||s)&&(0,F.jsx)(v.Z,{direction:"column",alignItems:"center",rowGap:.5,maxWidth:"62px",component:g.rU,to:"/customer/".concat(null===o||void 0===o||null===(n=o.author)||void 0===n?void 0:n._id),sx:{textDecoration:"none",color:"unset"},children:(0,F.jsx)(m.Z,{sx:{width:45,height:45},variant:"rounded",src:(0,j.FG)(null===o||void 0===o?void 0:o.author.image),alt:null===o||void 0===o?void 0:o.author.fullName})}),(u||s)&&(0,F.jsx)(v.Z,{direction:"column",alignItems:"center",rowGap:.5,maxWidth:"200px",component:g.rU,to:"/prod/".concat(null===o||void 0===o||null===(t=o.product)||void 0===t?void 0:t._id),sx:{textDecoration:"none",color:"unset"},children:(0,F.jsx)(m.Z,{sx:{borderRadius:1,height:"45px",width:"45px",background:"transparent",color:"primary.dark",mr:1},src:(0,j.FG)(null===o||void 0===o?void 0:o.product.image),alt:null===o||void 0===o?void 0:o.product.titleEn})}),(0,F.jsxs)(v.Z,{direction:"column",rowGap:.5,flex:1,children:[(0,F.jsx)(p.Z,{name:"half-rating-read",value:null===o||void 0===o?void 0:o.rating,precision:.1,size:"small",readOnly:!0}),(0,F.jsx)(x.Z,{children:null===o||void 0===o?void 0:o.message}),(0,F.jsx)(x.Z,{variant:"caption",children:b()(null===o||void 0===o?void 0:o.createdAt).format("lll")})]}),(0,F.jsx)(k.Z,{checked:null===o||void 0===o?void 0:o.isActive,color:"success",onClick:function(){h(null===o||void 0===o?void 0:o._id)}})]})})};n.Z=function(e){var n,t,i=e.author,r=e.product,m=(0,A.Z)(),p=m.limit,x=m.setLimit,g=m.page,j=m.setPage,P=m.search,b=m.setSearch,k=m.watch,S=m.setFilterField,C=m.getQueryParams;Z.useEffect((function(){(i||r)&&(i&&S("author",i),r&&S("product",r))}),[]);var M=(0,w.R)(C()),I=M.data,R=M.isLoading,_=M.isError,E=Z.useState([]),Q=(0,l.Z)(E,2),U=Q[0],W=Q[1];return Z.useEffect((function(){var e;_||W((null===I||void 0===I||null===(e=I.data)||void 0===e?void 0:e.data)||[])}),[R,I]),(0,F.jsxs)(F.Fragment,{children:[(0,F.jsx)(a.Z,{elevation:0,sx:{p:2,border:"1px solid #ccc",my:2},children:(0,F.jsxs)(u.ZP,{container:!0,rowGap:1,columnGap:1,alignItems:"center",justifyContent:"space-between",children:[(0,F.jsx)(u.ZP,{item:!0,xs:12,sm:8.7,children:(0,F.jsx)(s.ZP,{placeholder:"Search User",sx:y.Z,value:P,onChange:function(e){return b(e.target.value)},fullWidth:!0})}),(0,F.jsx)(u.ZP,{item:!0,xs:12,sm:3,children:(0,F.jsxs)(c.Z,{sx:(0,o.Z)({},y.Z),value:k("isActive")||"null",onChange:function(e){S("isActive","null"===e.target.value?void 0:e.target.value)},fullWidth:!0,children:[(0,F.jsx)(d.Z,{value:"null",selected:!0,children:"All"}),(0,F.jsx)(d.Z,{value:"true",children:"Active"}),(0,F.jsx)(d.Z,{value:"false",children:"Blocked"}),"/"]})})]})}),R&&(0,F.jsx)(v.Z,{alignItems:"center",py:2,pb:4,children:(0,F.jsx)(h.Z,{})}),null===U||void 0===U||null===(n=U.map)||void 0===n?void 0:n.call(U,(function(e,n){return(0,F.jsx)(Z.Fragment,{children:(0,F.jsx)(G,{revItem:e,showProd:!!i,showUser:!!r,showAll:!i&&!r})},n)})),(0,F.jsx)(v.Z,{direction:"row",justifyContent:"flex-end",children:(0,F.jsx)(f.Z,{component:"div",count:(null===I||void 0===I||null===(t=I.data)||void 0===t?void 0:t.total)||0,page:g,onPageChange:function(e,n){return j(n)},rowsPerPage:p,onRowsPerPageChange:function(e){return x(e.target.value)}})})]})}},0:function(e,n,t){t.r(n);var i=t(266),r=t(890),o=(t(2426),t(2791),t(7589),t(4972),t(8152),t(7400),t(8090),t(7569)),l=t(184);n.default=function(){return(0,l.jsx)(l.Fragment,{children:(0,l.jsxs)(i.Z,{sx:{py:2},children:[(0,l.jsx)(r.Z,{variant:"h6",sx:{mb:1,fontWeight:"bold"},children:"All Review"}),(0,l.jsx)(o.Z,{})]})})}},8152:function(e,n,t){t.d(n,{R:function(){return o},S:function(){return a}});var i=t(1933),r=t(7400),o=function(e){return(0,i.useQuery)(["get-all-review",e],(function(){return function(e){return r.ZP.get("review",{params:e})}(e)}),{})},l=function(e){return r.ZP.put("review/".concat(e))},a=function(){var e=(0,i.useQueryClient)();return(0,i.useMutation)(l,{onSuccess:function(){e.invalidateQueries("get-all-review")}})}},8090:function(e,n){n.Z={bgcolor:"#f3f3f3",borderRadius:"4px",px:"10px",height:"52px",outline:"none","&, & *":{border:"transparent !important",outline:"none !important"}}}}]);
//# sourceMappingURL=0.3b23f009.chunk.js.map