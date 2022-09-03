const loadNewsCategories = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const response = await fetch(url);
    const data = await response.json();
    displayNewsCategories(data.data.news_category);
}

const displayNewsCategories = (categories) => {
    // console.log(data);
    const newsCategories = document.getElementById('news-categories');
    categories.forEach(category => {
        const categoryLi = document.createElement('li');
        // categoryLi.classList.add('anchor');
        categoryLi.innerHTML = `
        <a onclick = "newsDetails(${category.category_id})">${category.category_name}</a>
        `
        newsCategories.appendChild(categoryLi);
    })

}

const newsDetails = (newsDetails) => {
    // console.log(newsDetails);
}

loadNewsCategories();