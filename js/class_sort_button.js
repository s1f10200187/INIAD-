
$(function(){
    if(window.location.pathname == "/courses/2023"){
        /**
         * HTML button element representing the "Download All Slides" button.
         * @type {string}
         */
        const clsbtn = '<button id="download-slide-all" class="btn btn-success">すべてのスライドをDL</button>'
        $($(".flex")[0]).before(clsbtn);
    }
});

$(document).on("click", "#download-slide-all", function(){
    let confirm_regist = confirm("すべてのスライドDLをしますか？");
    if(confirm_regist){
      async function getAllLinks(url, depth = 2) {
  if (depth === 0) {
    return [];
  }

  const visitedUrls = new Set();
  const linksToVisit = [url];
  const origin = new URL(url).origin; // 現在のページのオリジンを取得

  const uniqueLinks = new Set();

  while (linksToVisit.length > 0) {
    const currentUrl = linksToVisit.pop();
    if (visitedUrls.has(currentUrl)) {
      continue;
    }

    visitedUrls.add(currentUrl);

    const pageDom = await fetchPage(currentUrl);
    if (!pageDom) {
      continue;
    }

    const aTags = pageDom.querySelectorAll('a');
    for (const aTag of aTags) {
      const href = aTag.getAttribute('href');
      const fullUrl = new URL(href, origin).href; // 絶対URLを取得

      if (new URL(fullUrl).origin === origin) { // 同じオリジンのみをチェック
        uniqueLinks.add(fullUrl);

        if (depth > 1 && !visitedUrls.has(fullUrl)) {
          linksToVisit.push(fullUrl);
        }
      }
    }
  }

  return [...uniqueLinks];
}



        /**
         * ウェブページを取得し、解析されたDOMオブジェクトを返します。
         * @param {string} url - 取得するウェブページのURL。
         * @returns {Promise<Document|null>} - 解析されたDOMオブジェクトまたはエラーが発生した場合はnullを返すPromise。
         */
        async function fetchPage(url) {
          try {
            const response = await fetch(url);
            if (!response.ok) {
              throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
            }
            const text = await response.text();
            return new DOMParser().parseFromString(text, 'text/html');
          } catch (error) {
            console.error(error);
            return null;
          }
        }
      
      /**
       * 指定されたURLから指定された深さまでのすべてのリンクを取得します。
       * @param {string} url - クロールを開始するURL。
       * @param {number} [depth=2] - クロールする最大の深さ。
       * @returns {Promise<string[]>} - ユニークなリンクの配列を解決するPromise。
       */
      async function getAllLinks(url, depth = 2) {
          if (depth === 0) {
          return [];
          }
      
          const visitedUrls = new Set();
          const linksToVisit = [url];
          const allLinks = [];
      
          while (linksToVisit.length > 0) {
          const currentUrl = linksToVisit.pop();
          if (visitedUrls.has(currentUrl)) {
          continue;
          }
      
          visitedUrls.add(currentUrl);
          const doc = await fetchPage(currentUrl);
          if (!doc) {
          continue;
          }
      
          const links = Array.from(doc.querySelectorAll('a[href]')).map(a => new URL(a.href, currentUrl).href);
          allLinks.push(...links);
      
          for (const link of links) {
          if (!visitedUrls.has(link) && new URL(link).origin === new URL(url).origin) {
              linksToVisit.push(link);
          }
          }
          }
      
          return Array.from(new Set(allLinks));
      }
      
      (async () => {
          const startUrl = window.location.href;
          const links = await getAllLinks(startUrl, 2);
          console.log(links);
      })();
      

    }
});