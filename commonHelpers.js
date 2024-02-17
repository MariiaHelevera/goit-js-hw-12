import{S as f,a as w,i as c}from"./assets/vendor-5401a4b0.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))d(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const p of r.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&d(p)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function d(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();const x=document.querySelector(".search-form"),g=document.getElementById("gallery"),n=document.querySelector(".loader"),a=document.querySelector(".load-more-btn"),y=new f(".gallery-link");let l=1;const u=15;let m=0,i={key:"42334155-d8ef6d202703fa7fdc7903459",image_type:"photo",orientation:"horizontal",safesearch:!0,q:"",page:l,per_page:u};x.addEventListener("submit",async function(t){t.preventDefault(),n.style.display="block";const o=t.target.elements.input.value;i.q=o,i.page=1,l=1,a.style.display="none";try{const e=await h();m=e.totalHits,F(e)}catch(e){console.log(e)}t.target.reset()});async function h(){const t=new URLSearchParams(i);try{return(await w.get(`https://pixabay.com/api/?${t}`)).data}catch(o){throw new Error(o.response.status)}}a.addEventListener("click",async function(){n.style.display="block",i.page+=1;try{const t=await h();t.hits.length>0?(n.style.display="block",L(t),b(),l+=1,i.page=l):(a.style.display="none",c.show({message:"We're sorry, but there are no more results to display.",messageColor:"#FFFFFF",backgroundColor:"#EF4040",position:"topRight",messageSize:"16px",messageLineHeight:"24px",maxWidth:"432px"}))}catch(t){c.error({title:"Error",message:"An error occurred while fetching images. Please try again later.",position:"topRight",timeout:5e3}),console.error(t)}finally{n.style.display="none"}});function F(t){if(t.hits.length===0)c.show({message:"Sorry, there are no images matching your search query. Please try again!",messageColor:"#FFFFFF",backgroundColor:"#EF4040",position:"topRight",messageSize:"16px",messageLineHeight:"24px",maxWidth:"432px"}),g.innerHTML="",a.style.display="none";else{const o=t.hits.map(e=>`<a class="gallery-link" href="${e.largeImageURL}">
        <img class="gallery-image"
        src="${e.webformatURL}"
        alt="${e.tags}"
         </a>
         <div class="image-info">
          <p ><strong>Likes:</strong> <span class="text">${e.likes}</span></p>
          <p ><strong>Views:</strong> <span class="text">${e.views}</span></p>
          <p ><strong>Comments:</strong> <span class="text">${e.comments}</span></p>
          <p ><strong>Downloads:</strong> <span class="text">${e.downloads}</span></p>
          </div>`).join("");g.innerHTML=o,m<=l*u?(a.style.display="none",c.show({message:"We're sorry, but you've reached the end of search results.",messageColor:"#FFFFFF",backgroundColor:"#EF4040",position:"topRight",messageSize:"16px",messageLineHeight:"24px",maxWidth:"432px"})):a.style.display="block"}y.refresh(),n.style.display="none"}function L(t){const o=t.hits.map(e=>`<a class="gallery-link" href="${e.largeImageURL}">
        <img class="gallery-image"
        src="${e.webformatURL}"
        alt="${e.tags}"
         </a>
         <div class="image-info">
          <p ><strong>Likes:</strong> <span class="text">${e.likes}</span></p>
          <p ><strong>Views:</strong> <span class="text">${e.views}</span></p>
          <p ><strong>Comments:</strong> <span class="text">${e.comments}</span></p>
          <p ><strong>Downloads:</strong> <span class="text">${e.downloads}</span></p>
          </div>`).join("");g.innerHTML+=o,y.refresh(),n.style.display="none"}function b(){const t=document.querySelector(".gallery-link").getBoundingClientRect().height;window.scrollBy({top:t*3,behavior:"smooth"})}
//# sourceMappingURL=commonHelpers.js.map
