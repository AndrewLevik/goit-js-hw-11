const e=document.querySelector("form"),t=document.querySelector(".list"),n=document.querySelector(".more");let s=0,o="";function i(e,o){(function(e,t){const n=new URLSearchParams({apikey:"9cTjAjlRB53wyhAFk5VzXcBu5GiPU6fK",page:e,keyword:t,size:40});return fetch(`https://app.ticketmaster.com/discovery/v2/events.json?${n}`).then((e=>{if(!e.ok)throw new Error(e.status);return e.json()})).catch((e=>console.log(e)))})(e,o).then((e=>{var i;console.log(e.page.totalElements),0===e.page.totalElements&&(n.classList.add("invisible"),alert(`There are no events by keyword ${o}`));const r=null==e||null===(i=e._embedded)||void 0===i?void 0:i.events;if(r&&function(e){const n=e.map((({name:e,images:t})=>`<li>\n    <img src='${t[0].url}' alt='${e}' width='200'>\n    <p>${e}</p>\n    </li>`)).join("");t.insertAdjacentHTML("beforeend",n)}(r),s===e.page.totalPages-1)return n.classList.add("invisible"),void alert("Finish");s+=1,e.page.totalPages>1&&n.classList.remove("invisible")}))}e.addEventListener("submit",(e=>{e.preventDefault();const n=e.target.elements.query.value;o=n,s=0,t.innerHTML="",n&&i(s,n)})),n.addEventListener("click",(()=>{i(s,o)}));
//# sourceMappingURL=index.8b178131.js.map
