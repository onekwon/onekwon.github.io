// Basic JavaScript for the personal website
console.log('Welcome to My Personal Website!');
// 콘텐츠 로드 함수
function loadContent(file) {
  fetch(file)
    .then(res => res.text())
    .then(html => {
      document.getElementById('content-area').innerHTML = html;
    })
    .catch(() => {
      document.getElementById('content-area').innerHTML =
        '<p>콘텐츠를 불러오지 못했습니다.</p>';
    });
}

// 메뉴 active 처리
function setActiveMenu(clickedLink) {
  document.querySelectorAll('.menu-link').forEach(link => {
    link.classList.remove('active');
  });
  clickedLink.classList.add('active');
}

// 이벤트 바인딩
document.addEventListener('DOMContentLoaded', () => {
  const menuLinks = document.querySelectorAll('.menu-link');

  menuLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();

      const file = link.dataset.file;
      loadContent(file);
      setActiveMenu(link);
    });
  });

  // ✅ 최초 로딩 시 기본 메뉴
  if (menuLinks.length > 0) {
    menuLinks[0].classList.add('active');
    loadContent(menuLinks[0].dataset.file);
  }
});
