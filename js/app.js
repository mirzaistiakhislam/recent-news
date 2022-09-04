const loadNewsCategories = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        displayNewsCategories(data.data.news_category);
    }
    catch (error) {
        console.log("Error: " + error);
        console.log("Error Message: " + error.message);
    }

}

const displayNewsCategories = (categories) => {

    // console.log(data);
    const newsCategories = document.getElementById('news-categories');
    categories.forEach(category => {
        const categoryLi = document.createElement('div');


        categoryLi.classList.add('sm:w-24', 'bg-slate-700', 'rounded-lg');
        categoryLi.innerHTML = `

       

       <a class="text-sm md:text-sm cursor-pointer" onclick = "newsDetails('${category.category_id}');">${category.category_name}</a>
        
        `
        newsCategories.appendChild(categoryLi);

    })
}

const newsDetails = async (id) => {
    spinner(true);
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        displayNewsDetails(data.data);
    }

    catch (error) {
        console.log("Error: " + error);
        console.log("Error Message: " + error.message);
    }

}

const displayNewsDetails = (details) => {

    console.log(details);
    const newsDetails = document.getElementById('news-details');
    newsDetails.innerHTML = ``;

    const notFound = document.getElementById('not-found');
    if (details.length === 0) {
        notFound.classList.remove('hidden');
        notFound.innerHTML = `
            <h1>Empty Category</h1>
        `
    }
    else {
        // notFound.classList.add('hidden');
        notFound.classList.remove('hidden');
        notFound.innerHTML = `
            <h1>${details.length} items found for this category</h1>
        `

    }

    const dataSort = details.sort((first, second) => {
        return first.total_view - second.total_view;
    });

    const reverseDataSort = dataSort.reverse();


    details.forEach(detail => {

        console.log(detail);
        const detailDiv = document.createElement('div');
        // detailDiv.classList.add('card', 'card-side', 'bg-base-100', 'shadow-xl');
        detailDiv.innerHTML = `       
        <div class="card lg:card-side bg-base-100 shadow-xl my-4 bg-gray-800 ">    
            <figure><img src="${detail.thumbnail_url}" alt="Movie"></figure>
            <div class="card-body">
                <h2 class="card-title">${detail.title}</h2>
                <p>${detail.details.slice(0, 200)}...</p>
                
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
    spinner(false);
}

const loadDetails = async id => {

    const url = `https://openapi.programming-hero.com/api/news/${id}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        displayLoadDetails(data.data);
    }

    catch (error) {
        console.log("Error: " + error);
        console.log("Error Message: " + error.message);
    }

}

const displayLoadDetails = data => {
    // console.log(data[0].details);
    const fullNews = document.getElementById('full-news');
    fullNews.innerText = data[0].details;
    const authorDetails = document.getElementById('author-details');
    authorDetails.innerHTML = `
            <div class="flex justify-between ">
                <div class="flex items-center">
                    <img class="w-12 rounded-full" src="${data[0].author.img}"/>
                    <span class="px-2">${data[0].author.name ? data[0].author.name : 'Not Found'}</span>
                </div>

                <div class="flex items-center">
                    <i class="fa-regular fa-eye"></i>
                    <span class="px-2">${data[0].total_view ? data[0].total_view : 'Not Found'}</span>
                </div>

            </div>
    `;
}

const spinner = isLoader => {
    const loaderSection = document.getElementById('loader');
    if (isLoader) {
        loaderSection.classList.remove('hidden');
    }
    else {
        loaderSection.classList.add('hidden');
    }
}

loadNewsCategories();