/**
 * ARYAN VERMA - PORTFOLIO INTERACTIVITY SCRIPT
 * Handles mobile drawer, project filtering, screenshot modal lightbox,
 * email copy toast, scroll observers, and contact form.
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. STICKY NAVBAR & ACTIVE SCROLL SPY
  // ==========================================
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link:not(.mobile-link)');

  const handleScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Scroll Spy for navigation highlighting
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // ==========================================
  // 2. MOBILE NAVIGATION DRAWER
  // ==========================================
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  const toggleMobileMenu = () => {
    const isOpen = mobileDrawer.classList.contains('open');
    if (isOpen) {
      mobileDrawer.classList.remove('open');
      mobileToggle.setAttribute('aria-expanded', 'false');
      mobileDrawer.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    } else {
      mobileDrawer.classList.add('open');
      mobileToggle.setAttribute('aria-expanded', 'true');
      mobileDrawer.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  };

  if (mobileToggle) {
    mobileToggle.addEventListener('click', toggleMobileMenu);
  }

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileDrawer.classList.remove('open');
      mobileToggle.setAttribute('aria-expanded', 'false');
      mobileDrawer.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    });
  });

  // ==========================================
  // 3. PROJECT FILTERING
  // ==========================================
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterVal === 'all' || category === filterVal) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.opacity = '1';
          }, 50);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ==========================================
  // 4. IN-CARD THUMBNAIL SWITCHER
  // ==========================================
  const thumbnailBars = document.querySelectorAll('.project-thumbnails-bar');

  thumbnailBars.forEach(bar => {
    const card = bar.closest('.project-card');
    const mainImg = card.querySelector('.project-main-image');
    const mediaWrapper = card.querySelector('.project-media-wrapper');
    const thumbs = bar.querySelectorAll('.thumb-preview');

    thumbs.forEach(thumb => {
      thumb.addEventListener('click', (e) => {
        e.stopPropagation();
        thumbs.forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');

        const newSrc = thumb.getAttribute('src');
        const newIndex = thumb.getAttribute('data-index');

        mainImg.src = newSrc;
        mediaWrapper.setAttribute('data-index', newIndex);
      });
    });
  });

  // ==========================================
  // 5. FULL-SCREEN LIGHTBOX MODAL
  // ==========================================
  const galleries = {
    gym: [
      {
        src: 'assets/images/projects/gym/gym-pose-detect.png',
        caption: 'AI Gym Coach — Live pose estimation tracking joint angles and rep depth'
      },
      {
        src: 'assets/images/projects/gym/gym-metrics.png',
        caption: 'AI Gym Coach — Real-time squat metrics (knee 176°, back 171°) & workout history'
      },
      {
        src: 'assets/images/projects/gym/gym-plan.png',
        caption: 'AI Gym Coach — Exercise configuration and reps/sets workout planner'
      },
      {
        src: 'assets/images/projects/gym/gym-login.png',
        caption: 'AI Gym Coach — User session authentication and welcome portal'
      }
    ],
    snapclass: [
      {
        src: 'assets/images/projects/snapclass/snap-face.png',
        caption: 'SnapClass — Group photo facial recognition attendance reports & confirmation modal'
      },
      {
        src: 'assets/images/projects/snapclass/snap-voice.png',
        caption: 'SnapClass — Acoustic voice biometrics verification portal'
      },
      {
        src: 'assets/images/projects/snapclass/snap-dashboard.png',
        caption: 'SnapClass — Faculty management console and class enrollment records'
      },
      {
        src: 'assets/images/projects/snapclass/snap-landing.png',
        caption: 'SnapClass — High-level role selector for students and faculty'
      },
      {
        src: 'assets/images/projects/snapclass/snap-enroll.png',
        caption: 'SnapClass — Student QR code self-enrollment and face embedding flow'
      }
    ],
    creditwise: [
      {
        src: 'assets/images/projects/creditwise/creditwise-overview.png',
        caption: 'CreditWise — Intelligence dashboard (4,269 records, 62.2% approval rate, 94.7% accuracy)'
      },
      {
        src: 'assets/images/projects/creditwise/creditwise-simulator.png',
        caption: 'CreditWise — Applicant scenario simulator calculating real-time lending eligibility'
      },
      {
        src: 'assets/images/projects/creditwise/creditwise-insights.png',
        caption: 'CreditWise — Holdout confusion matrix, 95.7% precision, and Gaussian Naive Bayes metrics'
      }
    ],
    smartcart: [
      {
        src: 'assets/images/projects/smartcart/smartcart-dashboard.png',
        caption: 'SmartCart — Customer segmentation dashboard (2,236 shoppers, PCA projection & 4 clusters)'
      }
    ]
  };

  const lightbox = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-main-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxCounter = document.getElementById('lightbox-counter');
  const lightboxClose = document.getElementById('lightbox-close-btn');
  const lightboxPrev = document.getElementById('lightbox-prev-btn');
  const lightboxNext = document.getElementById('lightbox-next-btn');

  let currentGalleryKey = null;
  let currentImageIdx = 0;

  const updateLightboxView = () => {
    if (!currentGalleryKey || !galleries[currentGalleryKey]) return;
    const items = galleries[currentGalleryKey];
    const item = items[currentImageIdx];

    lightboxImg.src = item.src;
    lightboxImg.alt = item.caption;
    lightboxCaption.textContent = item.caption;
    lightboxCounter.textContent = `${currentImageIdx + 1} / ${items.length}`;

    // Hide navigation if only 1 image
    if (items.length <= 1) {
      lightboxPrev.style.display = 'none';
      lightboxNext.style.display = 'none';
    } else {
      lightboxPrev.style.display = 'flex';
      lightboxNext.style.display = 'flex';
    }
  };

  const openLightbox = (galleryKey, startIndex = 0) => {
    if (!galleries[galleryKey]) return;
    currentGalleryKey = galleryKey;
    currentImageIdx = parseInt(startIndex, 10) || 0;
    updateLightboxView();
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  };

  const nextImage = () => {
    if (!currentGalleryKey) return;
    const total = galleries[currentGalleryKey].length;
    currentImageIdx = (currentImageIdx + 1) % total;
    updateLightboxView();
  };

  const prevImage = () => {
    if (!currentGalleryKey) return;
    const total = galleries[currentGalleryKey].length;
    currentImageIdx = (currentImageIdx - 1 + total) % total;
    updateLightboxView();
  };

  // Attach click listener to all project media wrappers
  document.querySelectorAll('.project-media-wrapper').forEach(wrapper => {
    wrapper.addEventListener('click', () => {
      const galleryKey = wrapper.getAttribute('data-gallery');
      const index = wrapper.getAttribute('data-index') || 0;
      openLightbox(galleryKey, index);
    });
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxNext) lightboxNext.addEventListener('click', (e) => { e.stopPropagation(); nextImage(); });
  if (lightboxPrev) lightboxPrev.addEventListener('click', (e) => { e.stopPropagation(); prevImage(); });

  // Close when clicking outside dialog
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
  }

  // Keyboard navigation
  window.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
  });

  // ==========================================
  // 6. COPY-TO-CLIPBOARD EMAIL & TOAST NOTIFICATION
  // ==========================================
  const toast = document.getElementById('toast-msg');
  const toastText = document.getElementById('toast-text');
  let toastTimer = null;

  const showToast = (message) => {
    if (!toast) return;
    toastText.textContent = message;
    toast.classList.add('show');

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  };

  document.querySelectorAll('.email-copy-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = btn.getAttribute('data-email') || 'aryan.verma.work.01@gmail.com';
      
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email)
          .then(() => {
            showToast(`Copied to clipboard: ${email}`);
          })
          .catch(() => {
            prompt('Copy this email:', email);
          });
      } else {
        prompt('Copy this email:', email);
      }
    });
  });

  // ==========================================
  // 7. ANIMATED METRICS COUNTER
  // ==========================================
  const counterItems = document.querySelectorAll('.counter-value');
  let animated = false;

  const animateCounters = () => {
    counterItems.forEach(item => {
      const targetStr = item.getAttribute('data-count');
      const isPercent = targetStr.includes('.');
      const target = parseFloat(targetStr);
      let count = 0;
      const duration = 1400; // ms
      const stepTime = 20;
      const totalSteps = duration / stepTime;
      const increment = target / totalSteps;

      const timer = setInterval(() => {
        count += increment;
        if (count >= target) {
          count = target;
          clearInterval(timer);
          if (isPercent) {
            item.textContent = `${count.toFixed(1)}%`;
          } else if (target === 2027) {
            item.textContent = '2027';
          } else {
            item.textContent = `${Math.round(count)}+`;
          }
        } else {
          if (isPercent) {
            item.textContent = `${count.toFixed(1)}%`;
          } else {
            item.textContent = `${Math.round(count)}+`;
          }
        }
      }, stepTime);
    });
  };

  const counterBanner = document.querySelector('.metrics-counter-banner');
  if (counterBanner && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animated) {
          animated = true;
          animateCounters();
        }
      });
    }, { threshold: 0.3 });

    observer.observe(counterBanner);
  }

  // ==========================================
  // 8. INTERACTIVE CONTACT FORM
  // ==========================================
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status-msg');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email').value.trim();
      const subject = document.getElementById('contact-subject').value.trim() || 'Portfolio Inquiry';
      const message = document.getElementById('contact-message').value.trim();

      if (!name || !email || !message) {
        alert('Please fill out all required fields.');
        return;
      }

      // Display immediate success simulation
      formStatus.textContent = `Thank you, ${name}! Your inquiry has been noted. Aryan will reach out to ${email} promptly.`;
      formStatus.className = 'form-status success';
      showToast('Message inquiry submitted successfully!');

      // Also compose mailto link for direct sending convenience
      const mailtoUrl = `mailto:aryan.verma.work.01@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Hi Aryan,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
      
      // Delay reset and offer mailto client trigger
      setTimeout(() => {
        contactForm.reset();
        window.location.href = mailtoUrl;
      }, 1200);
    });
  }

  // ==========================================
  // 9. BACK TO TOP BUTTON
  // ==========================================
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

});
