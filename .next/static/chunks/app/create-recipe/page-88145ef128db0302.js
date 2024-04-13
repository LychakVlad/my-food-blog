(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[779],{2175:function(e,t,r){Promise.resolve().then(r.bind(r,8015))},8015:function(e,t,r){"use strict";r.r(t);var s=r(7437);r(2265);var i=r(4033),a=r(2645),l=r(2749),n=r(1865),o=r(2173);t.default=()=>{let e=(0,i.useRouter)(),{data:t}=(0,l.useSession)(),r=(0,n.cI)({defaultValues:{title:"",description:"",ingredients:["e.g. 2 cups flour, sifted","e.g. 1 cup sugar","e.g. 2 tablespoons butter, softened"],steps:["e.g. Preheat oven to 350 degrees F…","e.g. Combine all dry ingredients in a large bowl…","e.g. Pour into greased trays and bake for 15-20 minutes…"],servings:"8",yield:"e.g. 1 9-inch cake",prepTime:"5",cookTime:"5",calories:"100",protein:"5",carbs:"20",fats:"7",photo:"",tag:""}}),c=async e=>{try{let t=await fetch("/api/image-process?imageUrl=".concat(e)),r=await t.json();return r.base64}catch(e){console.log("Failed to fetch processed image",e)}};async function d(e){try{let t=await c("/api/s3-bucket/".concat(e));return t}catch(e){console.log("Failed to load base64 image",e)}}async function u(e){let t=new FormData;t.append("image",e);try{let e=await o.Z.post("api/s3-bucket",t,{headers:{"content-type":"multipart/form-data"}});return e.data}catch(e){console.log("Failed to post image",e)}}let p=async r=>{try{var s;let i=null,a=null;r.photo&&r.photo[0]&&(i=await u(r.photo[0]),a=await d(i.imagePath));let l=await fetch("/api/recipe/new",{method:"POST",body:JSON.stringify({description:r.description,userId:null==t?void 0:null===(s=t.user)||void 0===s?void 0:s.id,ingredients:r.ingredients,steps:r.steps,tag:r.tag,title:r.title,photo:{imageLink:i.fileKey,base64:a},servings:{servings:r.servings,yield:r.yield},timeToDo:{prepTime:r.prepTime,cookTime:r.cookTime},nutrition:{cal:r.calories,protein:r.protein,carbs:r.carbs,fats:r.fats}})});l.ok&&e.push("/")}catch(e){console.log("Failed to create recipe",e)}};return(0,s.jsx)(a.Z,{type:"Create",onSubmit:p,form:r})}},2645:function(e,t,r){"use strict";r.d(t,{Z:function(){return h}});var s=r(7437),i=r(1396),a=r.n(i);r(2265);var l=r(4782),n=r(9479),o=r(1865),c=r(6691),d=r.n(c),u={src:"/_next/static/media/close.37385623.svg",height:24,width:24,blurWidth:0,blurHeight:0},p=e=>{let{data:t,register:r,name:i,control:a}=e,{fields:l,append:c,remove:p}=(0,o.Dq)({name:i,control:a,rules:{minLength:1}});return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)("h2",{className:"font-satoshi font-semibold text-base text-gray-700",children:t.label}),(0,s.jsx)("p",{className:" opacity-50",children:t.description}),(0,s.jsxs)("div",{className:"flex  flex-col",children:[l.map((e,t)=>(0,s.jsx)("div",{children:(0,s.jsxs)("section",{className:"flex items-center mt-5",children:[(0,s.jsx)(n.Z,{register:r,placeholder:"Add one more",name:"".concat(i,".").concat(t),className:"form_input w-full",type:"text",required:!0}),1!==l.length&&(0,s.jsx)("button",{type:"button",onClick:()=>p(t),className:"h-full px-4",children:(0,s.jsx)(d(),{src:u,width:36,height:36,className:"rounded-full",alt:"close-icon"})})]},e.id)},e.id)),(0,s.jsxs)("button",{type:"button",className:"outline_btn mt-8",onClick:()=>c("Add ".concat(i.slice(0,-1))),children:["Add ",i.slice(0,-1)]})]})]})},m=r(3131),h=(0,l.Z)(e=>{let{type:t,onSubmit:r,form:i}=e,{register:l,handleSubmit:o,control:c,formState:{errors:d,isSubmitting:u}}=i;return(0,s.jsxs)("section",{className:"w-full max-w-fill flex-start flex-col",children:[(0,s.jsx)("h1",{className:"head_text text-left",children:(0,s.jsxs)("span",{className:"blue_gradient",children:[" ",t," Post"]})}),(0,s.jsxs)("p",{className:"desc text-left max-w-md","data-testid":"form-title",children:[t," and share your best recipes"]}),(0,s.jsxs)("form",{onSubmit:o(r),className:"mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism",children:["Create"===t&&(0,s.jsx)(n.Z,{register:l,errors:null==d?void 0:d.photo,label:"Photo (optional)",type:"file",name:"photo",accept:"image/*",required:!1}),(0,s.jsx)(n.Z,{name:"title",register:l,errors:null==d?void 0:d.title,label:"Recipe Title",placeholder:"Enter the title",type:"text",required:!0,cytest:"title-input"}),(0,s.jsx)(m.Z,{placeholder:"Description...",label:"Description",register:l,name:"description",required:!0,errors:null==d?void 0:d.description,cytest:"description-input"}),(0,s.jsx)(p,{data:{label:"Ingredients",description:"Enter one ingredient per line. Include the quantity (i.e. cups, tablespoons) and any special preparation (i.e. sifted, softened, chopped). Use optional headers to organize the different parts of the recipe (i.e. Cake, Frosting, Dressing).",addButton:"Add ingredient"},register:l,control:c,name:"ingredients"}),(0,s.jsx)(p,{data:{label:"Directions",description:"Explain how to make your recipe, including oven temperatures, baking or cooking times, and pan sizes, etc. Use optional headers to organize the different parts of the recipe (i.e. Prep, Bake, Decorate).",addButton:"Add step",subTitle:"Step"},register:l,control:c,name:"steps"}),(0,s.jsx)(n.Z,{label:"Tag",desc:"(dinner, lunch, breakfast)",placeholder:"tag",name:"tag",type:"text",register:l,errors:null==d?void 0:d.tag,required:!0,cytest:"tag-input"}),(0,s.jsxs)("div",{className:"flex gap-10",children:[(0,s.jsx)(n.Z,{label:"Servings",placeholder:"10",type:"number",name:"servings",register:l,errors:null==d?void 0:d.servings,required:!0}),(0,s.jsx)(n.Z,{label:"Yield",placeholder:"Small bowls",type:"text",name:"yield",register:l,errors:null==d?void 0:d.yield,required:!0})]}),(0,s.jsxs)("div",{className:"flex gap-10",children:[(0,s.jsx)(n.Z,{label:"Time to prep (minutes)",placeholder:"120",type:"number",name:"prepTime",register:l,errors:null==d?void 0:d.prepTime,required:!0}),(0,s.jsx)(n.Z,{label:"Time to cook (minutes)",placeholder:"60",type:"number",name:"cookTime",register:l,errors:null==d?void 0:d.cookTime,required:!0})]}),(0,s.jsxs)("div",{className:"sm:flex sm:gap-10",children:[(0,s.jsx)(n.Z,{label:"Calories",name:"calories",placeholder:"200",type:"number",register:l,errors:null==d?void 0:d.calories,required:!0}),(0,s.jsx)(n.Z,{label:"Carbs",placeholder:"30",type:"number",name:"carbs",register:l,errors:null==d?void 0:d.carbs,required:!0}),(0,s.jsx)(n.Z,{label:"Protein",name:"protein",placeholder:"30",type:"number",register:l,errors:null==d?void 0:d.protein,required:!0}),(0,s.jsx)(n.Z,{name:"fats",register:l,errors:null==d?void 0:d.fats,label:"Fats",placeholder:"10",type:"number",required:!0})]}),(0,s.jsxs)("div",{className:"flex-end mx-3 mb-5 gap-4",children:[(0,s.jsx)(a(),{href:"/",className:"text-gray-500 text-sm",children:"Cancel"}),(0,s.jsx)("button",{type:"submit",disabled:u,className:"submit_btn","data-cy":"submit-form-btn",children:u?"".concat(t," is in process..."):t})]})]})]})})},4782:function(e,t,r){"use strict";var s=r(7437),i=r(2749),a=r(4033),l=r(2265);t.Z=function(e){return function(t){let{data:r}=(0,i.useSession)(),n=(0,a.useRouter)();return((0,l.useEffect)(()=>{r||n.push("/")},[]),r)?(0,s.jsx)(e,{...t}):null}}},9479:function(e,t,r){"use strict";var s=r(7437);r(2265),t.Z=e=>{let{placeholder:t,label:r,type:i,desc:a,className:l,errors:n,name:o,register:c,autoComplete:d,required:u,accept:p,id:m,cytest:h}=e;return(0,s.jsxs)("div",{className:"w-full",children:[r&&(0,s.jsxs)("label",{htmlFor:o,className:"block text-sm font-medium leading-6 text-gray-900 mb-2",children:[r,(0,s.jsxs)("span",{className:"font-normal",children:[" ",a]})]}),(0,s.jsxs)("div",{className:"w-full",children:[(0,s.jsx)("input",{...c(o,{required:!!u&&"".concat(o," is required")}),id:m,type:i,accept:p,autoComplete:d,placeholder:t,"data-cy":h,className:"form_input w-full  ".concat(l," ").concat(n&&"border-red-500"," ")}),n&&(0,s.jsx)("p",{className:"text-red-500 mt-2",children:"".concat(r," field is required")})]})]})}},3131:function(e,t,r){"use strict";var s=r(7437);r(2265),t.Z=e=>{let{label:t,placeholder:r,register:i,name:a,required:l,errors:n,cytest:o}=e;return(0,s.jsxs)("label",{children:[(0,s.jsx)("span",{className:"font-satoshi font-semibold text-base text-gray-700",children:t&&t}),(0,s.jsx)("textarea",{placeholder:r,...i(a,{required:!!l&&"".concat(a," is required")}),className:"form_textarea ".concat(n&&"border-red-500"," "),"data-cy":o}),n&&(0,s.jsx)("p",{className:"text-red-500 mt-2",children:"".concat(t," field is required")})]})}}},function(e){e.O(0,[661,685,599,747,971,596,744],function(){return e(e.s=2175)}),_N_E=e.O()}]);