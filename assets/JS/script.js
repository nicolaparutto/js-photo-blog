/*
Testando l'Api fornita, chiamata tramite Thunder Client ho ottenuto questo risultato:
[
  {
    "albumId": 1,
    "id": 1,
    "title": "accusamus beatae ad facilis cum similique qui sunt",
    "url": "https://via.placeholder.com/600/92c952",
    "thumbnailUrl": "https://via.placeholder.com/150/92c952"
  },
  {
    "albumId": 1,
    "id": 2,
    "title": "reprehenderit est deserunt velit ipsam",
    "url": "https://via.placeholder.com/600/771796",
    "thumbnailUrl": "https://via.placeholder.com/150/771796"
  },
  {
    "albumId": 1,
    "id": 3,
    "title": "officia porro iure quia iusto qui ipsa ut modi",
    "url": "https://via.placeholder.com/600/24f355",
    "thumbnailUrl": "https://via.placeholder.com/150/24f355"
  },
  {
    "albumId": 1,
    "id": 4,
    "title": "culpa odio esse rerum omnis laboriosam voluptate repudiandae",
    "url": "https://via.placeholder.com/600/d32776",
    "thumbnailUrl": "https://via.placeholder.com/150/d32776"
  },
  {
    "albumId": 1,
    "id": 5,
    "title": "natus nisi omnis corporis facere molestiae rerum in",
    "url": "https://via.placeholder.com/600/f66b97",
    "thumbnailUrl": "https://via.placeholder.com/150/f66b97"
  },
  {
    "albumId": 1,
    "id": 6,
    "title": "accusamus ea aliquid et amet sequi nemo",
    "url": "https://via.placeholder.com/600/56a8c2",
    "thumbnailUrl": "https://via.placeholder.com/150/56a8c2"
  }
]

Il risultato ottenuto è un array di 6 oggetti, ogni oggetto possiede 5 proprietà.
In base alle richieste della consegna dell'esercizio, avrò bisogno della proprietà "title", che mi fornirà il testo da inserire nelle card, e del "url" che mi fornirà l'immagine.
*/

//dati utili:
const cardContainer = document.getElementById('cards-container');
const overlayContainer = document.getElementById('overlay-box-container');

//efettuiamo la chiamata AJAX all'Api:
axios.get('https://jsonplaceholder.typicode.com/photos?_limit=6')
.then(res =>{
   //salvo in una costante 'data' che è la propiretà che contiene l'array di oggetti:
   const objectsArray = res.data;

   //ciclo l'array:
   objectsArray.forEach(element =>{
      //ad ogni ciclo destrutturo l'oggetto e prendo soltanto le proprietà che mi interessano:
      const {title, url} = element;
      //ad ogni ciclo richiamo la funzione che stampa in pagina:
      printCard(title, url);
   });

   // gestione dell overlay-box:
   const cardImage = document.querySelectorAll('.card-image');
   
   for(let i = 0; i < cardImage.length; i++){
      cardImage[i].addEventListener('click', (event) =>{
         overlayContainer.classList.remove('d-none');
         overlayContainer.innerHTML = `
         <div class="overlay-box">
            <button id="close-btn" class="btn">Chiudi</button>
            <img src="${event.target.src}" alt="">
         </div>
         `;
         const closeBtn = document.getElementById('close-btn');
         closeBtn.addEventListener('click', ()=>{
            overlayContainer.classList.add('d-none');
         });
      });
   }
});

//funzione che stampa in pagina la struttura html della card:
function printCard(title, url){
   cardContainer.innerHTML += `
      <div class="col">
         <div class="card">
            <div class="pin-png">
               <img src="assets/img/pin.svg" alt="">
            </div>
            <div class="c-img">
               <img class="card-image" src="${url}" alt="">
            </div>
            <div class="c-text">
               <p>${title}</p>
            </div>
         </div>
      </div>
   `
}  