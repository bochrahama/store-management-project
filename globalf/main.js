ript · JS
Copy

/* =====================
   SCROLL REVEAL
===================== */
const revealEls = document.querySelectorAll('.feature-item');
 
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 120);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
 
revealEls.forEach(el => observer.observe(el));
 
/* =====================
   NAVBAR SCROLL TINT
===================== */
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.style.background = 'rgba(34, 40, 30, 0.97)';
    navbar.style.boxShadow = '0 2px 24px rgba(0,0,0,0.18)';
  } else {
    navbar.style.background = '#343b2e';
    navbar.style.boxShadow = 'none';
  }
});
 
/* =====================
   HAMBURGER MENU (mobile)
===================== */
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const btnOrder = document.querySelector('.btn-order');
 
hamburger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navLinks.style.display = isOpen ? 'flex' : '';
  btnOrder.style.display = isOpen ? 'block' : '';
});
 
// Mobile nav styles injected via JS for open state
const mobileStyle = document.createElement('style');
mobileStyle.textContent = `
  @media (max-width: 768px) {
    .nav-links.open {
      display: flex !important;
      flex-direction: column;
      position: absolute;
      top: 68px; left: 0; right: 0;
      background: #343b2e;
      padding: 1.2rem 5vw 1.5rem;
      gap: 1.2rem;
      box-shadow: 0 8px 24px rgba(0,0,0,0.2);
    }
    .btn-order {
      display: block !important;
      position: absolute;
      top: 80px;
      right: 5vw;
    }
  }
`;
document.head.appendChild(mobileStyle);
 
/* =====================
   SMOOTH BUTTON RIPPLE
===================== */
document.querySelectorAll('button, .btn-outline').forEach(btn => {
  btn.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    ripple.style.cssText = `
      position:absolute;width:6px;height:6px;
      background:rgba(255,255,255,0.35);border-radius:50%;
      transform:translate(-50%,-50%) scale(0);
      animation:ripple 0.5s linear;pointer-events:none;
    `;
    const rect = btn.getBoundingClientRect();
    ripple.style.left = (e.clientX - rect.left) + 'px';
    ripple.style.top  = (e.clientY - rect.top)  + 'px';
    btn.style.position = 'relative';
    btn.style.overflow = 'hidden';
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});
 
const rippleAnim = document.createElement('style');
rippleAnim.textContent = `@keyframes ripple { to { transform:translate(-50%,-50%) scale(28); opacity:0; } }`;
document.head.appendChild(rippleAnim);
 
/* =====================
   MENU CARD PARALLAX TILT
===================== */
document.querySelectorAll('.menu-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    card.style.transform = `perspective(600px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) scale(1.02)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.5s ease';
  });
  card.addEventListener('mouseenter', () => {
    card.style.transition = 'transform 0.1s ease';
  });
});