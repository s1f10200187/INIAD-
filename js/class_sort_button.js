$(function(){
    if(window.location.pathname == "/courses/2023"){
        const clsbtn = '<button id="download-slide-all" class="btn btn-success">すべてのスライドをDL</button>'
        $($(".flex")[0]).before(clsbtn);
    }
});

/**
 * ウェブページを取得し、解析されたDOMオブジェクトを返します。
 * @param {string} url - 取得するウェブページのURL。
 * @returns {Promise<Document|null>} - 解析されたDOMオブジェクトまたはエラーが発生した場合はnullを返すPromise。
 */
async function fetchPage(url) {
  try {
    // 'no-cors' モードを追加してCORSポリシーを無視
    const response = await fetch(url, { mode: 'no-cors' });
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

$(document).on("click", "#download-slide-all", function(){
    let confirm_regist = confirm("すべてのスライドDLをしますか？");
    if(confirm_regist){async function getAllLinks(url, depth = 2) {
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
         * 現在のURLからの遷移先のurl一覧を取得。
         * @returns {string[]} 条件に一致するhref属性の配列。
         */
        // function getFilteredHrefs(url) {        
        //   // ページ内の全ての<a>タグを選択
        //   const aTags = document.querySelectorAll('a');
        
        //   // 条件に一致するhref属性の値を格納するための配列
        //   const filteredHrefs = [];
        
        //   // 各<a>タグに対してループ処理
        //   aTags.forEach(aTag => {
        //     // href属性が現在のURLで始まるかどうかをチェック
        //     if (aTag.href.startsWith(currentUrl)) {
        //       // 条件に一致する場合は、配列にhref属性の値を追加
        //       filteredHrefs.push(aTag.href);
        //     }
        //   });
        
        //   // 配列を返す
        //   return filteredHrefs;
        // }
        
        // 関数を呼び出し、結果をコンソールに出力
        // console.log(getFilteredHrefs(window.location.href));


        // // iframeを動的に生成し、src属性を変更する関数
        // function openURLsInIframe(urls) {
        //   // iframeを生成
        //   const iframe = document.createElement('iframe');
        //   iframe.style.width = '100%';
        //   iframe.style.height = '500px'; // 適切なサイズに設定
        //   document.body.appendChild(iframe);

        //   // 各URLを順番に開く
        //   let currentIndex = 0;

        //   const loadNextURL = () => {
        //     if (currentIndex >= urls.length) {
        //       console.log('全てのURLが読み込まれました');
        //       return; // 全てのURLを処理したら終了
        //     }

            
        //     // 現在のURLをiframeのsrcに設定
        //     iframe.src = urls[currentIndex];
        //     console.log(`${urls[currentIndex]} を読み込み中...`);
        //     getFilteredHrefs(urls[currentIndex]\);
        //     // 次のURLへ
        //     currentIndex++;

        //     // 次のURLを読み込む前に少し待つ（例: 5秒）
        //     setTimeout(loadNextURL, 5000);
        //   };

        //   // 最初のURLを読み込む
        //   loadNextURL();
        // }

        // // 関数を呼び出し、URLを開始
        // openURLsInIframe(a_tags_href);

        // // 'ul.treeview-menu' 要素の配下にある 'li' タグ配下の 'a' タグを選択
        // const aTags = document.querySelectorAll('ul.treeview-menu li a');

        // // 条件に一致するhref属性の値を格納するための配列
        // const filteredHrefs = [];

        // // 各 'a' タグに対してループ処理
        // aTags.forEach(aTag => {
        // // href属性が '/courses' で始まるかどうかをチェック
        // if (aTag.getAttribute('href').startsWith('/courses')) {
        //     // 条件に一致する場合は、配列にhref属性の値を追加
        //     filteredHrefs.push(aTag.href);
        // }
        // });

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