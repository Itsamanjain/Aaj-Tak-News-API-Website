const API_KEY = "bbf7600b3a174e3bb77def1ae63b735b";
const url = "https://newsapi.org/v2/everything?q=";


window.addEventListener("load", () => fetchNews("India"));


async function fetchNews (query){
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    console.log(data);
    binddata(data.articles);

}

function binddata(articles){
    const cardsContainer = document.getElementById('card-container');
    const newsCardTemplate = document.getElementById('template-news-card');

    cardsContainer.innerHTML = "";

    articles.forEach((article) => {
        if(!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        filldataincard(cardClone,article);
        cardsContainer.appendChild(cardClone);
    });
}


function filldataincard(cardClone,article) {
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-desc');

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date (article.publishedAt).toLocaleString('en-US',{
        timeZone:'Asia/Jakarta'
    });

    newsSource.innerHTML = `${article.source.name} - ${date}`;

    cardClone.firstElementChild.addEventListener('click',() => {
            window.open(article.url,"_blank");
    })




}


let curSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav.classList.add('active');

}


const searchbutton = document.getElementById('search-button');
const searchtext = document.getElementById('searchtext');

searchbutton.addEventListener("click",() => {
    const query = searchtext.value;
    if(!query) return;
    fetchNews(query);
});
