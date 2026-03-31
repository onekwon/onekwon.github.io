// Basic JavaScript for the personal website
console.log('Welcome to My Personal Website!');
// 콘텐츠 파일을 불러오는 함수
function loadContent(file) {
  fetch(file)
    .then(response => response.text())
    .then(html => {
      document.getElementById('content-area').innerHTML = html;
    })
    .catch(error => {
      console.error(error);
      document.getElementById('content-area').innerHTML =
        '<p>콘텐츠를 불러오지 못했습니다.</p>';
    });
}

// 페이지 최초 로딩 시 기본 콘텐츠
document.addEventListener('DOMContentLoaded', () => {
  loadContent('content1.html');
});
``
