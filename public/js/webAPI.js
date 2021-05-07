let offset = 0

document.getElementById('seeMore').addEventListener('click', seeMore)


function seeMore(){
  offset += 4
  fetchNews(offset)
}

async function fetchNews(offset) {
  try {
        const res = await fetch('https://onlyfriendss.herokuapp.com/api/getNews')
    const {articles} = await res.json();
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
  } catch (error) {
    console.log(error)
  }

  }
  
  fetchNews(offset)

  // <p class="card-text">${data.articles[i].description}</p> 