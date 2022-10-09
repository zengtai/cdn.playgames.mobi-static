// import {
//   topGames as topGamesData,
//   featuredGames as featuredGamesData,
//   getGames,
// } from "./data.js";
import { gameData } from "./data.js";
import { topGames as topGamesData } from "./data/top-games.js";
import { categories as categoryData } from "./data/categories.js";
import { getIcon } from "./icons.js";

/* 参数设置 */
const IMAGE_PATH = `https://cdn.iwantalipstick.com/gameicon2/`;
const IMAGE_FORMAT = `webp`;
const ADSENSE_ID = `ca-pub-9062459637265650`;
const ADS_SLOT_ID = {
  HOME: `4970224950`,
  CATEGORY: `3151491220`,
  DETAIL: `7264381652`,
};
const DEV_MODE = true; // 广告测试模式

export const FEATURED_GAMES = ["TrafficRun", "CrazyMoto", "FireTheGun"];

/* */
// let options = {
//   root: null, // 根节点
//   rootMargin: "0px",
//   threshold: 1.0,
// };

// let observer = new IntersectionObserver(callback, options);

// let target = document.querySelectorAll(`.game-list`);

// let callback = (entries, observer) => {
//   entries.forEach((entry) => {
//     // Each entry describes an intersection change for one observed target element:
//     // entry.boundingClientRect
//     // entry.intersectionRatio
//     // entry.intersectionRect
//     // entry.isIntersecting
//     // entry.rootBounds
//     // entry.target
//     // entry.time
//   });
// };

// observer.observer(target);
/* */

let pathname = window.location.pathname;
let query = window.location.search;

console.log(`pathname: `, pathname);
console.log(`query: `, query);

const App = document.querySelector(`#app`);

const Nav = `<nav class="site-navbar"><div class="container"><ul class="navbar-list"><li><a href="./index.html"><span class="icon" /><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg></span><span>Home</span></a></li><li><a href="./category-list.html"><span class="icon" /><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg></span><span>Category</span></a></li><li><a href="./recent.html"><span class="icon" /><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></span><span>Recent</span></a></li><li><a href="./about.html"><span class="icon" /><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></span><span>About</span></a></li></ul></div></nav>`;

const Footer = `<footer class="site-footer"><div class="container"><p>Copyright © 2022 PlayGames.mobi<br>All Rights Reserved</p></div></footer>`;

function GetIconUrl(gid) {
  return IMAGE_PATH + IMAGE_FORMAT + `/` + gid + `.` + IMAGE_FORMAT;
}

function GameList(items) {
  return `
    <ul class="game-list">
      ${items
        .map(
          (item) => `
        <li>
          <div>
            <a href="./game.html?gid=${item.gid}&f=home">
              <img
                alt=${item.title}
                src=${GetIconUrl(item.gid)}
                width="200"
                height="200"
                decoding="async"
                class="game-icon"
              />
            </a>
          </div>
        </li>
        `
        )
        .join(``)}
    </ul>
    `;
}
/* Banner */
function Banner({
  slot,
  repsonsive = true,
  format = `auto`,
  client = ADSENSE_ID,
  dev = DEV_MODE,
  style,
}) {
  let defaultStyle = `width:320px;`;
  return `
    <div class="banner"><div class="title"><span class="scale-90 inline-block ">Advertisement</span></div><ins class="adsbygoogle flex justify-center bg-black/5 mx-auto" style=${
      style ? style : defaultStyle
    } data-ad-client=${client} ${dev ? "data-adtest='on'" : ""} ${
    slot && "data-ad-slot=" + slot
  } data-ad-format=${format} data-full-width-responsive=${repsonsive}></ins></div>
  `;
}

/* Layout */
function Layout(children, page) {
  return `
    <div class="wrapper ${page}">${Nav}<main class="main"><div class="container">${children}</div></main>${Footer}<div>
  `;
}

/* 首页内容。可以单独生成首页数据以减少加载体积。 */
if (pathname.endsWith(`/index.html`) || pathname.endsWith(`/`)) {
  // const topGames = [...topGamesData.sort(() => Math.random() * 0.5 - 1)];
  const topGames = [
    ...topGamesData.filter((i) => !FEATURED_GAMES.includes(i.gid)),
  ].sort(() => Math.random() - 0.5);
  const featuredGames = topGamesData.filter((i) =>
    FEATURED_GAMES.includes(i.gid)
  );

  console.log(
    `topGames: `,
    JSON.stringify(topGames.map((i) => i.gid).join(`,`))
  );
  console.log(`featuredGames: `, JSON.stringify(featuredGames));

  let content = `${Banner({
    slot: ADS_SLOT_ID.HOME,
    repsonsive: false,
  })}<h2 class="section-title"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-lime-500 " viewBox="0 0 20 20" fill="currentColor"><path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z"></path></svg><span>Recommended</span></h2>${GameList(
    featuredGames
  )}<h2 class="section-title"><svg xmlns="http://www.w3.org/2000/svg" class="text-red-500 h-6 w-6" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clip-rule="evenodd"></path></svg><span>Popular</span></h2>${GameList(
    topGames.slice(0, 9)
  )}<div class="my-4">${Banner({
    slot: ADS_SLOT_ID.HOME,
    repsonsive: false,
  })}</div>${GameList(topGames.slice(9, 18))}`;

  // App.innerHTML = `
  // <div class="wrapper home">${Nav}<main class="main"><div class="container">${content}</div></main>${Footer}</div>
  // `;
  App.innerHTML = Layout(content, `home`);
}

/* 分类首页 */
if (pathname.endsWith(`/category-list.html`)) {
  const categories = categoryData.sort((a, b) => a.slug > b.slug);

  let content = `
  <h1 class="page-title"><span>Category</span></h1>
  <ul class="category-list">
    ${categories
      .map((item, index) => {
        let games = gameData.filter((game) => game.category.name === item.name);
        let length = games.length;

        return `
          <li>
            <a class="item-link" href="./category.html?name=${item.name}">
              <div class="name">
                ${getIcon({ name: item.name })}
                <span>${item.name}</span>
              </div>
              <div class="count">
               ${length ? "<ul></ul>" : length}
              </div>
            </a>
          </li>`;
      })
      .join(``)}
  <ul>
  `;

  App.innerHTML = Layout(content, `categories`);
}

/* 处理广告执行push */
let banner = document.querySelectorAll(`.banner`);

banner.forEach((i) => {
  let script = document.createElement(`script`);
  script.textContent = `(adsbygoogle = window.adsbygoogle || []).push({}); console.log("Ad pushed")`;
  // console.log(`script`, script);
  i.appendChild(script);
});
