const searchButton = document.getElementById('search-button')
const searchBar = document.getElementById('searchBar')
const newsContainer = document.querySelector('.news-container')
const apiKey = ''

async function fetchNews(keyword) {
    let url = `https://newsapi.org/v2/everything?q=${keyword}&apiKey=${apiKey}`;

   


    try {
        const response = await fetch(url)
        const data = await response.json()
        const newData = data.articles.filter(article => {
            return (
                article.content && !article.content.includes("[Removed]")
            )
        })
        newsContainer.innerHTML = '';
        if ( newData.length > 0) {
            const newsLength = document.createElement('p');
            newsLength.textContent = `Found ${data.articles.length} news articles`
            newsContainer.appendChild(newsLength);

            const resultLength = document.createElement('p');
             resultLength.textContent = `Showing ${newData.length} results`
            newsContainer.appendChild(resultLength);
            

            newData.forEach(news => {
                const newsItem = document.createElement('div')
                newsItem.classList.add('news-item')

                const newsTitle = document.createElement('h2')
                newsTitle.textContent = news.title

                const newsSummary = document.createElement('p')
                newsSummary.textContent = news.description || "No description available."

                newsItem.appendChild(newsTitle)
                newsItem.appendChild(newsSummary)

                if(news.urlToImage){
                    const newsImage = document.createElement('img')
                    newsImage.src = news.urlToImage
                    newsItem.appendChild(newsImage)
                }else{
                    const newsImage = document.createElement('img')
                    newsImage.src = 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg'
                    newsItem.appendChild(newsImage)
                }

                newsContainer.appendChild(newsItem)
            });

        }
        else {
            const newMessage = document.createElement('p')
            newMessage.textContent = "No news found";
            newsContainer.appendChild(newMessage);
        }
    } catch (error) {
        console.log(error)
    }
}

searchButton.addEventListener('click', () => {
    const keyword = searchBar.value.trim();
    if (keyword) {
        fetchNews(keyword)
        searchBar.value = ''
    } else {
        alert('Please enter a location')
    }
})

searchBar.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        searchButton.click();
    }
});
