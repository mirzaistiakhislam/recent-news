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
        <a onclick = "newsDetails('${category.category_id}')">${category.category_name}</a>
        `
        newsCategories.appendChild(categoryLi);
    })

}

const newsDetails = async id => {
    // console.log(newsDetails);
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
    const response = await fetch(url);
    const data = await response.json();
    displayNewsDetails(data.data);
}

const displayNewsDetails = (details) => {
    console.log(details);
    const newsDetails = document.getElementById('news-details');
    newsDetails.innerHTML = ``;

    details.forEach(detail => {

        console.log(detail);
        const detailDiv = document.createElement('div');
        // detailDiv.classList.add('card', 'card-side', 'bg-base-100', 'shadow-xl');
        detailDiv.innerHTML = `       
        <div class="card lg:card-side bg-base-100 shadow-xl">    
            <figure><img src="${detail.thumbnail_url}" alt="Movie"></figure>
            <div class="card-body">
                <h2 class="card-title">${detail.title}</h2>
                <p>${detail.details.slice(0, 400)}...</p>
                
                <div class="flex justify-between">
                    <div class="flex items-center">
                        <img class="w-12 rounded-full" src="${detail.author.img}"/>
                        <span class="px-2">${detail.author.name ? detail.author.name : 'Not Found'}</span>
                    </div>

                    <div class="flex items-center">
                        <i class="fa-regular fa-eye"></i>
                        <span class="px-2">${detail.total_view ? detail.total_view : 'Not Found'}</span>
                    </div>

                    <div class="flex items-center">
                    <label onclick="loadDetails('${detail._id}')" for="my-modal-6" class="btn modal-button"><i class="fa-solid fa-arrow-right text-4xl"></i></label> 
                                        
                    </div>
                </div>
                
                
            </div>
        </div>
        `
        newsDetails.appendChild(detailDiv);
    })

}

const loadDetails = async id => {
    // console.log(id);
    const url = `https://openapi.programming-hero.com/api/news/${id}`;
    const response = await fetch(url);
    const data = await response.json();
    displayLoadDetails(data.data);
}

const displayLoadDetails = data => {
    // console.log(data[0].details);
    const fullNews = document.getElementById('full-news');
    fullNews.innerText = data[0].details;
    const authorDetails = document.getElementById('author-details');
    authorDetails.innerHTML = `
            <div class="flex justify-between">
                <div class="flex items-center">
                    <img class="w-12 rounded-full" src="${data[0].author.img}"/>
                    <span class="px-2">${data[0].author.name ? data[0].author.name : 'Not Found'}</span>
                </div>

                <div class="flex items-center">
                    <i class="fa-regular fa-eye"></i>
                    <span class="px-2">${data[0].total_view ? data[0].total_view : 'Not Found'}</span>
                </div>

        </div>
    `
}

loadNewsCategories();