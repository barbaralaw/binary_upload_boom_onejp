
async function fetchNews() {
    const url = `https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=1e688c995111458cb0568a7d68c512b4`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    let i = 5;
    [...document.getElementsByClassName("news")].forEach((post, i) => {
      post.innerHTML = ` 
        <a href="${data.articles[i].url}">
            <h3>${data.articles[i].title}</h3>
            <p>${data.articles[i].description}</p>        
            <img class='newsImg' src='${data.articles[i].urlToImage}'>
        </a>
      `;
    });
  }
  
  fetchNews()