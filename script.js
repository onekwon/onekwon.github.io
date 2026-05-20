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

// 메뉴 토글 함수
function toggleMenu() {
  const menuToggle = document.getElementById('menu-toggle');
  const sidebar = document.getElementById('sidebar');
  const mainNav = document.getElementById('main-nav');
  const menuBackdrop = document.getElementById('menu-backdrop');
  
  const isOpen = menuToggle.classList.toggle('active');
  sidebar.classList.toggle('active', isOpen);
  mainNav.classList.toggle('active', isOpen);
  if (menuBackdrop) {
    menuBackdrop.classList.toggle('active', isOpen);
  }
  document.body.classList.toggle('menu-open', isOpen);
}

// 메뉴 닫기 함수
function closeMenu() {
  const menuToggle = document.getElementById('menu-toggle');
  const sidebar = document.getElementById('sidebar');
  const mainNav = document.getElementById('main-nav');
  const menuBackdrop = document.getElementById('menu-backdrop');
  
  menuToggle.classList.remove('active');
  sidebar.classList.remove('active');
  mainNav.classList.remove('active');
  if (menuBackdrop) {
    menuBackdrop.classList.remove('active');
  }
  document.body.classList.remove('menu-open');
}

// 이벤트 바인딩
document.addEventListener('DOMContentLoaded', () => {
  const menuLinks = document.querySelectorAll('.menu-link');
  const homeLogo = document.getElementById('home-logo');
  const menuToggle = document.getElementById('menu-toggle');
  const sidebar = document.getElementById('sidebar');
  const mainNav = document.getElementById('main-nav');
  const menuBackdrop = document.getElementById('menu-backdrop');

  // 메뉴 토글 버튼 클릭 이벤트
  if (menuToggle) {
    menuToggle.addEventListener('click', toggleMenu);
  }

  if (menuBackdrop) {
    menuBackdrop.addEventListener('click', closeMenu);
  }

  // 메뉴 링크 클릭 시 메뉴 닫기
  menuLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();

      const file = link.dataset.file;
      loadContent(file);
      setActiveMenu(link);
      closeMenu();
    });
  });

  // 메뉴 외 영역 클릭 시 메뉴 닫기
  document.addEventListener('click', e => {
    if (!e.target.closest('.top-nav') && !e.target.closest('.sidebar')) {
      closeMenu();
    }
  });

  if (homeLogo) {
    const openHome = () => {
      loadHomeContent();
      closeMenu();
    };
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
