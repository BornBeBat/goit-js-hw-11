const e="https://pixabay.com/api/",a={form:document.querySelector("#search-form"),galery:document.querySelector(".gallery")},t=new class{constructor(){}async getFirstPage(a){let t=await fetch(`${e}?key=41071182-18ccbddfe29083241d2882ae4&q=${a}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=1`);return await t.json()}async fetchCatByBreed(a){let t=await fetch(`${e}/images/search?breed_ids=${a}`,options);return await t.json()}},r=new class{constructor(){}createSetMarcup(e){return e.map(e=>this.createCardMarcup(e)).join("")}createCardMarcup({webformatURL:e,largeImageURL:a,tags:t,likes:r,views:s,comments:c,downloads:i}){return`<div class="photo-card">
        <a href="${a}"
          ><img
            src="${e}"
            alt="${t}"
            loading="lazy"
        /></a>
        <div class="info">
          <p class="info-item">
            <b>Likes: ${r}</b>
          </p>
          <p class="info-item">
            <b>Views: ${s}</b>
          </p>
          <p class="info-item">
            <b>Comments: ${c}</b>
          </p>
          <p class="info-item">
            <b>Downloads: ${i}</b>
          </p>
        </div>
      </div>`}};async function s(e){e.preventDefault();try{let s=await t.getFirstPage(e.target.elements.searchQuery.value);console.log(r.createSetMarcup(s.hits)),a.galery.innerHTML=r.createSetMarcup(s.hits)}catch(e){}}a.form.addEventListener("submit",s);
//# sourceMappingURL=index.670480e1.js.map
