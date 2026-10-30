// 主题切换
const themeToggle = document.querySelector('.theme-toggle');
const html = document.documentElement;

// 读取保存的主题
const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
});

// 滚动淡入动画
const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// 观察所有需要动画的 section
const sections = document.querySelectorAll('.works, .about, .credits');
sections.forEach(section => {
  section.classList.add('reveal-ready');
  observer.observe(section);
});

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
        block: 'start'
      });
    }
  });
});

// 视频卡片点击 → 内嵌 B 站播放器
const modal = document.querySelector('.player-modal');
const modalTitle = modal.querySelector('.player-title');
const modalFrame = modal.querySelector('.player-frame');
const modalClose = modal.querySelector('.player-close');

let lastFocused = null;

function openPlayer(card) {
  const bvid = card.dataset.bvid;
  const title = card.dataset.title || card.querySelector('.video-title').textContent;
  lastFocused = document.activeElement;

  modalTitle.textContent = title;
  modalFrame.innerHTML =
    '<iframe src="https://player.bilibili.com/player.html?bvid=' + encodeURIComponent(bvid) +
    '&autoplay=1&danmaku=1&high_quality=1" title="' + title.replace(/"/g, '&quot;') +
    '" allowfullscreen="true" scrolling="no" frameborder="0"></iframe>';
  modal.hidden = false;
  document.body.classList.add('player-open');
  modalClose.focus();
}

function closePlayer() {
  modal.hidden = true;
  modalFrame.innerHTML = '';
  document.body.classList.remove('player-open');
  if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
}

document.querySelectorAll('.video-card .video-thumbnail').forEach(btn => {
  btn.addEventListener('click', () => openPlayer(btn.closest('.video-card')));
});

modalClose.addEventListener('click', closePlayer);
modal.querySelector('[data-close]').addEventListener('click', closePlayer);
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !modal.hidden) closePlayer();
});
