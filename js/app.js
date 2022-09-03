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
                        <span class="px-2">${detail.author.name}</span>
                    </div>

                    <div class="flex items-center">
                        <i class="fa-regular fa-eye"></i>
                        <span class="px-2">${detail.total_view}M</span>
                    </div>

                    <div class="flex items-center">
                    <i class="fa-solid fa-arrow-right text-4xl"></i>
                    </div>
                </div>
                
                
                

            </div>
        </div>
        `
        newsDetails.appendChild(detailDiv);
    })

}

loadNewsCategories();