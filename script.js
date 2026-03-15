/* ============================================
   Nivantro India — JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ========== NAVBAR SCROLL EFFECT ==========
  const navbar = document.getElementById('navbar');
  if (navbar) {
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      if (currentScroll > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
      lastScroll = currentScroll;
    }, { passive: true });
  }

  // ========== HAMBURGER MENU ==========
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      hamburger.classList.toggle('active');
      // Animate hamburger
      const spans = hamburger.querySelectorAll('span');
      if (navLinks.classList.contains('open')) {
        spans[0].style.transform = 'translateY(7.5px) rotate(45deg)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'translateY(-7.5px) rotate(-45deg)';
      } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      }
    });
    // Close on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.classList.remove('active');
        const spans = hamburger.querySelectorAll('span');
        spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
      });
    });
  }

  // ========== SCROLL ANIMATIONS ==========
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Stagger animation for sibling elements
        const siblings = entry.target.parentElement.querySelectorAll('.animate-on-scroll');
        const siblingIndex = Array.from(siblings).indexOf(entry.target);
        const delay = siblingIndex * 100;

        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);

        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });

  // ========== JOURNEY TABS (How It Works) ==========
  const journeyTabs = document.querySelectorAll('#journeyTabs .feature-tab');
  if (journeyTabs.length > 0) {
    journeyTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // Update active tab
        journeyTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        // Show corresponding panel
        const journey = tab.getAttribute('data-journey');
        document.querySelectorAll('.journey-panel').forEach(panel => {
          panel.style.display = 'none';
        });

        const targetPanel = document.getElementById('journey-' + journey);
        if (targetPanel) {
          targetPanel.style.display = 'block';
          // Re-trigger animations
          targetPanel.querySelectorAll('.animate-on-scroll').forEach(el => {
            el.classList.remove('visible');
            setTimeout(() => {
              observer.observe(el);
            }, 50);
          });
        }
      });
    });
  }

  // ========== FEATURE TABS (Features Page) ==========
  const featureTabs = document.querySelectorAll('#featureTabs .feature-tab');
  if (featureTabs.length > 0) {
    featureTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        featureTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const filter = tab.getAttribute('data-filter');
        const blocks = document.querySelectorAll('.feature-detail-block');

        blocks.forEach(block => {
          if (filter === 'all' || block.getAttribute('data-category') === filter) {
            block.style.display = 'block';
            block.style.animation = 'fadeInUp 0.5s ease forwards';
          } else {
            block.style.display = 'none';
          }
        });
      });
    });
  }

  // ========== ANIMATED COUNTERS ==========
  const counters = document.querySelectorAll('[data-target]');
  if (counters.length > 0) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = parseInt(entry.target.getAttribute('data-target'));
          animateCounter(entry.target, 0, target, 2000);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(c => counterObserver.observe(c));
  }

  function animateCounter(element, start, end, duration) {
    const startTime = performance.now();
    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const current = Math.round(start + (end - start) * eased);
      element.textContent = current;
      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }
    requestAnimationFrame(update);
  }

  // ========== TRUST SCORE ANIMATION ==========
  const trustDimFills = document.querySelectorAll('.trust-dim-fill');
  if (trustDimFills.length > 0) {
    const trustObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const fills = entry.target.querySelectorAll('.trust-dim-fill');
          fills.forEach((fill, i) => {
            const width = fill.style.width;
            fill.style.width = '0%';
            setTimeout(() => {
              fill.style.width = width;
            }, i * 200);
          });
          trustObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    const trustDimContainer = document.querySelector('.trust-dimensions');
    if (trustDimContainer) trustObserver.observe(trustDimContainer);
  }

  // ========== SCORE BARS ANIMATION ==========
  const scoreBars = document.querySelectorAll('.score-bar-fill');
  scoreBars.forEach(bar => {
    const targetWidth = bar.style.width;
    bar.style.width = '0%';
    const barObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            bar.style.width = targetWidth;
          }, 500);
          barObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    barObserver.observe(bar);
  });

  // ========== CONTACT FORM ==========
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      const originalText = btn.innerHTML;
      btn.innerHTML = `<span style="display:flex;align-items:center;gap:0.5rem;">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 12l3 3 5-5"/></svg>
        Message Sent!
      </span>`;
      btn.style.background = 'linear-gradient(135deg, var(--success), #16A34A)';
      
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = '';
        contactForm.reset();
      }, 3000);
    });
  }

  // ========== SMOOTH SCROLL FOR ANCHOR LINKS ==========
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ========== PARALLAX SUBTLE EFFECT ON HERO ==========
  const hero = document.querySelector('.hero');
  if (hero) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      if (scrolled < window.innerHeight) {
        const heroCards = hero.querySelectorAll('.hero-card');
        heroCards.forEach((card, i) => {
          const speed = 0.02 + (i * 0.01);
          card.style.transform = `translateY(${scrolled * speed}px)`;
        });
      }
    }, { passive: true });
  }

  // ========== ACTIVE NAV HIGHLIGHTING ==========
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    } else if (!href.startsWith('#')) {
      link.classList.remove('active');
    }
  });

  // ========== ROLE SELECTION MODAL ==========
  const roleModal = document.getElementById('roleModal');
  const closeRoleModal = document.getElementById('closeRoleModal');
  const openRoleModalBtns = document.querySelectorAll('.js-open-role-modal');

  if (roleModal && closeRoleModal) {
    // Open modal
    openRoleModalBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        roleModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
      });
    });

    // Close modal via button
    closeRoleModal.addEventListener('click', () => {
      roleModal.classList.remove('active');
      document.body.style.overflow = '';
    });

    // Close modal on click outside
    roleModal.addEventListener('click', (e) => {
      if (e.target === roleModal) {
        roleModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
    
    // Close modal on ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && roleModal.classList.contains('active')) {
        roleModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

});
