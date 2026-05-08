// Basic JavaScript for the personal website
console.log('Welcome to My Personal Website!');

function loadHomeContent() {
  loadContent('home.html');
  document.querySelectorAll('.menu-link').forEach(link => {
    link.classList.remove('active');
  });
}

// 콘텐츠 로드 함수
function loadContent(file) {
  fetch(file)
    .then(res => {
      if (!res.ok) throw new Error('Failed to fetch content');
      return res.text();
    })
    .then(html => {
      const contentArea = document.getElementById('content-area');
      contentArea.innerHTML = html;

      // Scripts inserted via innerHTML do not run automatically.
      // Recreate script tags so inline scripts in loaded content execute.
      contentArea.querySelectorAll('script').forEach(oldScript => {
        const newScript = document.createElement('script');
        Array.from(oldScript.attributes).forEach(attr => {
          newScript.setAttribute(attr.name, attr.value);
        });
        newScript.textContent = oldScript.textContent;
        oldScript.replaceWith(newScript);
      });
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
  const homeLogo = document.getElementById('home-logo');

  menuLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();

      const file = link.dataset.file;
      loadContent(file);
      setActiveMenu(link);
    });
  });

  if (homeLogo) {
    const openHome = () => loadHomeContent();
    homeLogo.addEventListener('click', openHome);
    homeLogo.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openHome();
      }
    });
  }

  loadHomeContent();
});
