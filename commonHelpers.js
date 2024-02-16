import{a as f,i as d,S as u}from"./assets/vendor-5401a4b0.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))e(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const p of r.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&e(p)}).observe(document,{childList:!0,subtree:!0});function n(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function e(s){if(s.ep)return;s.ep=!0;const r=n(s);fetch(s.href,r)}})();const w=document.querySelector(".search-form"),g=document.getElementById("gallery"),c=document.querySelector(".loader"),i=document.querySelector(".load-more-btn");let a=1;const y=15;let m=0,l={key:"42334155-d8ef6d202703fa7fdc7903459",image_type:"photo",orientation:"horizontal",safesearch:!0,q:"",page:a,per_page:y};w.addEventListener("submit",async function(t){t.preventDefault(),c.style.display="block";const o=t.target.elements.input.value;l.q=o,l.page=1,a=1;try{const n=await h();m=n.totalHits,x(n)}catch(n){console.log(n)}t.target.reset()});async function h(){const t=new URLSearchParams(l);try{return(await f.get(`https://pixabay.com/api/?${t}`)).data}catch(o){throw new Error(o.response.status)}}i.addEventListener("click",async function(){c.style.display="block",l.page+=1;try{const t=await h();L(t),b()}catch(t){console.log(t)}});function x(t){if(t.hits.length===0)d.show({message:"Sorry, there are no images matching your search query. Please try again!",messageColor:"#FFFFFF",backgroundColor:"#EF4040",position:"topRight",messageSize:"16px",messageLineHeight:"24px",maxWidth:"432px"}),g.innerHTML="",i.style.display="none";else{const n=t.hits.map(e=>`<a class="gallery-link" href="${e.largeImageURL}">
        <img class="gallery-image"
        src="${e.webformatURL}"
        alt="${e.tags}"
         </a>
         <div class="image-info">
          <p ><strong>Likes:</strong> <span class="text">${e.likes}</span></p>
          <p ><strong>Views:</strong> <span class="text">${e.views}</span></p>
          <p ><strong>Comments:</strong> <span class="text">${e.comments}</span></p>
          <p ><strong>Downloads:</strong> <span class="text">${e.downloads}</span></p>
          </div>`).join("");g.innerHTML=n,m<=a*y?(i.style.display="none",d.show({message:"We're sorry, but you've reached the end of search results.",messageColor:"#FFFFFF",backgroundColor:"#EF4040",position:"topRight",messageSize:"16px",messageLineHeight:"24px",maxWidth:"432px"})):i.style.display="block"}new u(".gallery-link").refresh(),c.style.display="none",a+=1,l.page=a}function L(t){const o=t.hits.map(e=>`<a class="gallery-link" href="${e.largeImageURL}">
        <img class="gallery-image"
        src="${e.webformatURL}"
        alt="${e.tags}"
         </a>
         <div class="image-info">
          <p ><strong>Likes:</strong> <span class="text">${e.likes}</span></p>
          <p ><strong>Views:</strong> <span class="text">${e.views}</span></p>
          <p ><strong>Comments:</strong> <span class="text">${e.comments}</span></p>
          <p ><strong>Downloads:</strong> <span class="text">${e.downloads}</span></p>
          </div>`).join("");g.innerHTML+=o,new u(".gallery-link").refresh(),c.style.display="none"}function b(){const t=document.querySelector(".gallery-link").getBoundingClientRect().height;window.scrollBy({top:t*3,behavior:"smooth"})}
//# sourceMappingURL=commonHelpers.js.map
