import { INews } from 'src/news/news.service';

export function renderNewsAll(news: INews[]) {
  let newsListhtml = '';
  for (const newsItem of news) {
    newsListhtml += renderNewsBlock(newsItem);
  }
  return `<h1>Список новостей</h1>
  ${newsListhtml}`;
}

export function renderNewsBlock(news: INews) {
  return `
    <div class="card" style="width: 18rem;">
    ${
      news.cover &&
      `<img class="card-img-top" src="${news.cover}" alt="Card image cap">`
    }
      <div class="card-body">
        <h5 class="card-title">${news.title}</h5>
        <h6 class="card-subtitle mb-2 text-muted">${news.autor}</h6>
        <p class="card-text">${news.description}</p>
      </div>
    </div>
    `;
}
