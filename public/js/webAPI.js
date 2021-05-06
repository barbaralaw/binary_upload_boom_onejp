let offset = 0
async function fetchNews(offset) {
    const res = await fetch('http://localhost:8000/api/getNews')
    const {articles} = await res.json();
    console.log(articles);
    [...document.getElementsByClassName("news")].forEach((post, i) => {
      post.innerHTML = ` 
        <a target="_blank" href="${articles[i+offset].url}">
                <img class="card-img" src='${articles[i+offset].urlToImage}'>
                <div class="card-img-overlay">
                  <h3 class="card-title">${articles[i+offset].title}</h3>
 
              </div>
        </a>
      `;
    });
  }
  
  fetchNews(offset)

  // <p class="card-text">${data.articles[i].description}</p> 