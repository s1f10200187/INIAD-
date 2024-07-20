
/**
 * すべてのスライドをDLボタンを2023年のトップ画面に追加
 * @type {string}
 */
$(function(){
    if(window.location.pathname == "/courses/2023"){
        const clsbtn = '<button id="download-slide-all" class="btn btn-success">すべてのスライドをDL</button>'
        $($(".flex")[0]).before(clsbtn);
    }
});

// URLを再帰的に取得し、リストに追加する関数
async function getUrlsRecursively(url, depth, maxDepth, urlList = []) {
  // 再帰の深さが最大深さを超えるか、URLが既にリストに含まれている場合は終了
  if (depth > maxDepth || urlList.includes(url)) {
    return;
  }

  // 現在のURLをリストに追加
  urlList.push(url);

  try {
    // URLの内容をフェッチ
    const response = await fetch(url);
    const html = await response.text();
    // フェッチしたHTMLをパース
    const doc = new DOMParser().parseFromString(html, 'text/html');
    // ページ内の全てのリンクを取得
    const links = doc.querySelectorAll('a[href]');

    // 各リンクについて再帰的にURLを取得
    for (const link of links) {
      // リンクの絶対URLを取得
      const href = new URL(link.href, url).href;
      // 同一オリジンのリンクのみを対象とする
      if (href.startsWith(window.location.origin)) {
        await getUrlsRecursively(href, depth + 1, maxDepth, urlList);
      }
    }
  } catch (error) {
    // エラーが発生した場合はコンソールに出力
    console.error(`Error fetching ${url}:`, error);
  }
}

// 最も深いURLのインデックスを取得する関数
function getDeepestUrlIndex(urlList) {
  let maxDepth = -1; // 最大深さを初期化
  let deepestIndex = -1; // 最も深いURLのインデックスを初期化

  // URLリストをループして深さを計算
  urlList.forEach((url, index) => {
    // URL内のスラッシュの数をカウントして深さを計算
    const depth = (url.match(/\//g) || []).length;
    // 現在の最大深さより深い場合は更新
    if (depth > maxDepth) {
      maxDepth = depth;
      deepestIndex = index;
    }
  });

  return deepestIndex; // 最も深いURLのインデックスを返す
}

//ボタンが押下されたとき、すべてのスライドをDLする
$(document).on("click", "#download-slide-all", async function(){
    let confirm_regist = confirm("すべてのスライドDLをしますか？");
    if(confirm_regist){
      const currentUrl = window.location.href; // 現在のURLを取得
      const maxDepth = 3; // 最大深さを設定
      const urlList = []; // URLリストを初期化
    
      // 再帰的にURLを取得
      await getUrlsRecursively(currentUrl, 0, maxDepth, urlList);
    
      // 取得したURL一覧をコンソールに出力
      console.log('取得したURL一覧:', urlList);
    
      // 最も深いURLのインデックスを取得
      const deepestIndex = getDeepestUrlIndex(urlList);
      const deepestUrl = urlList[deepestIndex]; // 最も深いURLを取得
    
      // 最も深いURLのインデックスとURLをコンソールに出力
      console.log('最も深いURLのインデックス:', deepestIndex);
      console.log('最も深いURL:', deepestUrl);
    
      // 最も深いURLの内容を取得
      try {
        const response = await fetch(deepestUrl);
        const content = await response.text();
        // 最も深いURLの内容をコンソールに出力
        console.log('最も深いURLの内容:', content);
      } catch (error) {
        // エラーが発生した場合はコンソールに出力
        console.error('最も深いURLの取得に失敗しました:', error);
      }

    }
});