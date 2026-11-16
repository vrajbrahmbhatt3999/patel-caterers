/**
 * Patel Caterers — In-Design Interactive & Autonomous Scripts
 * Inspired by Anika Luxury Catering & Event WordPress Theme
 */

document.addEventListener('DOMContentLoaded', () => {

  // =========================================================================
  // 1. SCROLL-DRIVEN REVEAL ANIMATIONS (IntersectionObserver)
  // =========================================================================
  const revealElements = document.querySelectorAll('[data-reveal]');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));


  // =========================================================================
  // 2. NUMBER COUNTER ANIMATION (5.2K+ Events)
  // =========================================================================
  const counterElement = document.getElementById('stat-counter-events');
  if (counterElement) {
    let counted = false;
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !counted) {
          counted = true;
          let count = 0;
          const target = 5.2;
          const duration = 2000;
          const stepTime = 25;
          const steps = duration / stepTime;
          const increment = target / steps;

          const timer = setInterval(() => {
            count += increment;
            if (count >= target) {
              counterElement.innerHTML = `5.2<span class="text-gold">+</span>`;
              clearInterval(timer);
            } else {
              counterElement.innerHTML = `${count.toFixed(1)}<span class="text-gold">+</span>`;
            }
          }, stepTime);
        }
      });
    }, { threshold: 0.5 });

    counterObserver.observe(counterElement);
  }


  // =========================================================================
  // 3. STICKY NAVIGATION SHRINK & BACK TO TOP BUTTON
  // =========================================================================
  const navbar = document.getElementById('main-nav');
  const backToTopBtn = document.getElementById('back-to-top');

  // ---- Throttle scroll to one execution per animation frame ----
  let scrollTicking = false;

  window.addEventListener('scroll', () => {
    if (!scrollTicking) {
      window.requestAnimationFrame(() => {
        const scrollPos = window.scrollY;

        if (scrollPos > 60) {
          navbar.classList.add('glass-panel-dark', 'py-3', 'shadow-xl');
          navbar.classList.remove('py-6');
        } else {
          navbar.classList.remove('glass-panel-dark', 'shadow-xl');
          navbar.classList.add('py-6');
          navbar.classList.remove('py-3');
        }

        if (backToTopBtn) {
          if (scrollPos > 400) {
            backToTopBtn.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
            backToTopBtn.classList.add('opacity-100', 'translate-y-0');
          } else {
            backToTopBtn.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
            backToTopBtn.classList.remove('opacity-100', 'translate-y-0');
          }
        }

        scrollTicking = false;
      });
      scrollTicking = true;
    }
  }, { passive: true });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }


  // =========================================================================
  // 4. MOBILE MENU DRAWER TOGGLE
  // =========================================================================
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenuDrawer = document.getElementById('mobile-menu-drawer');
  const closeMobileMenuBtn = document.getElementById('close-mobile-menu');
  const mobileMenuBackdrop = document.getElementById('mobile-menu-backdrop');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function openMobileMenu() {
    if (mobileMenuDrawer) mobileMenuDrawer.classList.remove('translate-x-full');
    if (mobileMenuBackdrop) {
      mobileMenuBackdrop.classList.remove('opacity-0', 'pointer-events-none');
      mobileMenuBackdrop.classList.add('opacity-100', 'pointer-events-auto');
    }
    document.body.classList.add('overflow-hidden');
  }

  function closeMobileMenu() {
    if (mobileMenuDrawer) mobileMenuDrawer.classList.add('translate-x-full');
    if (mobileMenuBackdrop) {
      mobileMenuBackdrop.classList.add('opacity-0', 'pointer-events-none');
      mobileMenuBackdrop.classList.remove('opacity-100', 'pointer-events-auto');
    }
    document.body.classList.remove('overflow-hidden');
  }

  if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openMobileMenu);
  if (closeMobileMenuBtn) closeMobileMenuBtn.addEventListener('click', closeMobileMenu);
  if (mobileMenuBackdrop) mobileMenuBackdrop.addEventListener('click', closeMobileMenu);
  mobileNavLinks.forEach(link => link.addEventListener('click', closeMobileMenu));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenuDrawer && !mobileMenuDrawer.classList.contains('translate-x-full')) {
      closeMobileMenu();
    }
  });


  // =========================================================================
  // 5. IN-DESIGN AUTONOMOUS SERVICES CAROUSEL (Auto-cycles every 5 seconds)
  // =========================================================================
  const serviceSlides = [
    {
      id: 'weddings',
      title: 'ROYAL WEDDINGS',
      subtitle: 'Grand Banquets & Multi-Course Celebrations',
      desc: 'From sacred traditions to extravagant reception banquets, our culinary team orchestrates seamless royal dining with bespoke decor pairings and personalized silverware.',
      image: 'assets/images/web/service_wedding.jpg',
      badge: 'DESTINATION & ROYAL'
    },
    {
      id: 'corporate',
      title: 'CORPORATE GALAS',
      subtitle: 'Executive Conferences & Product Launches',
      desc: 'Flawless culinary timing, discreet white-glove service, and world-class gourmet catering designed for high-profile summits, dinners, and annual celebrations.',
      image: 'assets/images/web/service_corporate.jpg',
      badge: 'BUSINESS ELITE'
    },
    {
      id: 'social',
      title: 'SOCIAL & FESTIVE',
      subtitle: 'Milestone Birthdays & Anniversary Galas',
      desc: 'Creating intimate warmth and celebratory flair with live theatrical counters, bespoke mocktails, and decadent dessert installations for cherished family gatherings.',
      image: 'assets/images/web/service_social.jpg',
      badge: 'EXCLUSIVE MOMENTS'
    },
    {
      id: 'parties',
      title: 'LIVE STATIONS & RECEPTIONS',
      subtitle: 'Theatrical Live Counters & Chic Evenings',
      desc: 'Ambient carriage counters, passed artisanal hors d’oeuvres, infused botanical mocktails, and live cooking stations tailored for vibrant modern celebrations.',
      image: 'assets/images/web/service_live.jpg',
      badge: 'THEATRICAL LIVE'
    }
  ];

  // Preload service images for instantaneous slide switching without flicker
  serviceSlides.forEach(slide => {
    const img = new Image();
    img.src = slide.image;
  });

  let currentServiceIndex = 0;
  const serviceCardTitle = document.getElementById('service-card-title');
  const serviceCardSubtitle = document.getElementById('service-card-subtitle');
  const serviceCardDesc = document.getElementById('service-card-desc');
  const serviceCardBadge = document.getElementById('service-card-badge');
  const serviceBgImage = document.getElementById('service-bg-image');
  const serviceCardCircleImg = document.getElementById('service-circle-img');
  const servicePrevBtn = document.getElementById('service-prev-btn');
  const serviceNextBtn = document.getElementById('service-next-btn');
  const serviceDots = document.querySelectorAll('.service-dot');
  const serviceCardContainer = document.querySelector('.glass-panel-card');

  function updateServiceSlide(index) {
    if (!serviceCardTitle) return;
    const slide = serviceSlides[index];
    const cardContent = document.getElementById('service-card-inner');

    if (cardContent) {
      cardContent.style.opacity = '0';
      cardContent.style.transform = 'scale(0.96)';
    }

    setTimeout(() => {
      serviceCardTitle.textContent = slide.title;
      if (serviceCardSubtitle) serviceCardSubtitle.textContent = slide.subtitle;
      serviceCardDesc.textContent = slide.desc;
      if (serviceCardBadge) serviceCardBadge.textContent = slide.badge;
      if (serviceBgImage) serviceBgImage.src = slide.image;
      if (serviceCardCircleImg) serviceCardCircleImg.src = slide.image;

      serviceDots.forEach((dot, dIdx) => {
        if (dIdx === index) {
          dot.classList.add('bg-amber-400', 'w-8');
          dot.classList.remove('bg-white/40', 'w-2.5');
        } else {
          dot.classList.remove('bg-amber-400', 'w-8');
          dot.classList.add('bg-white/40', 'w-2.5');
        }
      });

      if (cardContent) {
        cardContent.style.opacity = '1';
        cardContent.style.transform = 'scale(1)';
      }
    }, 220);
  }

  function nextServiceSlide() {
    currentServiceIndex = (currentServiceIndex + 1) % serviceSlides.length;
    updateServiceSlide(currentServiceIndex);
  }

  // Autonomous auto-advance every 5.5s
  let serviceAutoTimer = setInterval(nextServiceSlide, 5500);

  if (serviceCardContainer) {
    serviceCardContainer.addEventListener('mouseenter', () => clearInterval(serviceAutoTimer));
    serviceCardContainer.addEventListener('mouseleave', () => {
      clearInterval(serviceAutoTimer);
      serviceAutoTimer = setInterval(nextServiceSlide, 5500);
    });
  }

  if (servicePrevBtn) {
    servicePrevBtn.addEventListener('click', () => {
      clearInterval(serviceAutoTimer);
      currentServiceIndex = (currentServiceIndex - 1 + serviceSlides.length) % serviceSlides.length;
      updateServiceSlide(currentServiceIndex);
      serviceAutoTimer = setInterval(nextServiceSlide, 5500);
    });
  }

  if (serviceNextBtn) {
    serviceNextBtn.addEventListener('click', () => {
      clearInterval(serviceAutoTimer);
      nextServiceSlide();
      serviceAutoTimer = setInterval(nextServiceSlide, 5500);
    });
  }

  serviceDots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      clearInterval(serviceAutoTimer);
      currentServiceIndex = idx;
      updateServiceSlide(currentServiceIndex);
      serviceAutoTimer = setInterval(nextServiceSlide, 5500);
    });
  });

  // ---- Page Visibility API: pause timers when tab is hidden to save CPU ----
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      clearInterval(serviceAutoTimer);
      clearInterval(testAutoTimer);
    } else {
      serviceAutoTimer = setInterval(nextServiceSlide, 5500);
      testAutoTimer = setInterval(nextTestimonial, 6500);
    }
  });


  // =========================================================================
  // 6. IN-DESIGN AUTONOMOUS TESTIMONIAL SLIDER (Auto-cycles every 6.5 seconds)
  // =========================================================================
  const testSlides = document.querySelectorAll('.testimonial-slide');
  const testPrev = document.getElementById('test-prev');
  const testNext = document.getElementById('test-next');
  let currentTestIndex = 0;

  function showTestimonial(idx) {
    testSlides.forEach((slide, i) => {
      if (i === idx) {
        slide.classList.remove('hidden', 'opacity-0');
        slide.classList.add('block', 'opacity-100');
      } else {
        slide.classList.add('hidden', 'opacity-0');
        slide.classList.remove('block', 'opacity-100');
      }
    });
  }

  function nextTestimonial() {
    if (testSlides.length === 0) return;
    currentTestIndex = (currentTestIndex + 1) % testSlides.length;
    showTestimonial(currentTestIndex);
  }

  let testAutoTimer = setInterval(nextTestimonial, 6500);

  const testContainer = document.querySelector('#reviews .luxury-card');
  if (testContainer) {
    testContainer.addEventListener('mouseenter', () => clearInterval(testAutoTimer));
    testContainer.addEventListener('mouseleave', () => {
      clearInterval(testAutoTimer);
      testAutoTimer = setInterval(nextTestimonial, 6500);
    });
  }

  if (testPrev && testSlides.length > 0) {
    testPrev.addEventListener('click', () => {
      clearInterval(testAutoTimer);
      currentTestIndex = (currentTestIndex - 1 + testSlides.length) % testSlides.length;
      showTestimonial(currentTestIndex);
      testAutoTimer = setInterval(nextTestimonial, 6500);
    });
  }

  if (testNext && testSlides.length > 0) {
    testNext.addEventListener('click', () => {
      clearInterval(testAutoTimer);
      nextTestimonial();
      testAutoTimer = setInterval(nextTestimonial, 6500);
    });
  }


  // =========================================================================
  // 7. MENU FILTER TABS WITH FLUID TRANSITIONS
  // =========================================================================
  const menuFilterTabs = document.querySelectorAll('.menu-filter-tab');
  const menuDishCards = document.querySelectorAll('.menu-dish-card');

  menuFilterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      menuFilterTabs.forEach(t => {
        t.classList.remove('bg-amber-600', 'text-white', 'border-amber-600', 'shadow-md');
        t.classList.add('bg-transparent', 'text-stone-800', 'border-stone-300');
      });
      tab.classList.add('bg-amber-600', 'text-white', 'border-amber-600', 'shadow-md');
      tab.classList.remove('bg-transparent', 'text-stone-800', 'border-stone-300');

      const filterCategory = tab.dataset.filter;

      menuDishCards.forEach(card => {
        const cardCategory = card.dataset.category;
        if (filterCategory === 'all' || cardCategory === filterCategory) {
          card.classList.remove('hidden');
          setTimeout(() => {
            card.classList.remove('opacity-0', 'scale-95');
            card.classList.add('opacity-100', 'scale-100');
          }, 30);
        } else {
          card.classList.add('opacity-0', 'scale-95');
          setTimeout(() => card.classList.add('hidden'), 200);
        }
      });
    });
  });


  // =========================================================================
  // 8. DISH QUICK-VIEW MODAL
  // =========================================================================
  const dishModal = document.getElementById('dish-quickview-modal');
  const dishModalClose = document.getElementById('close-dish-modal');
  const dishModalTitle = document.getElementById('dish-modal-title');
  const dishModalImage = document.getElementById('dish-modal-image');
  const dishModalDesc = document.getElementById('dish-modal-desc');
  const dishModalIngredients = document.getElementById('dish-modal-ingredients');
  const dishModalDietary = document.getElementById('dish-modal-dietary');
  const dishModalServings = document.getElementById('dish-modal-servings');
  const dishDetailTriggers = document.querySelectorAll('.view-dish-trigger');

  const dishDetailsData = {
    'wedding': {
      title: 'Royal Gujarati & Rajasthani Shahi Platter',
      image: 'assets/images/web/menu_royal_platter.jpg',
      desc: 'Authentic royal culinary craftsmanship featuring handcrafted Khandvi, steamed Dhokla, artisanal crisp tikkis, slow-simmered regional gravies, and aromatic spice blends.',
      ingredients: 'Pure Besan, Fresh Green Herbs, Mustard Tempering, Saffron, Fresh Cottage Cheese, Homemade Chutneys',
      dietary: '100% Pure Vegetarian / Jain Available',
      servings: 'Plated or Grand Buffet Service (Minimum 100 Guests)'
    },
    'modern': {
      title: 'Live Parmesan Wheel Aglio E Olio',
      image: 'assets/images/web/menu_parmesan_pasta.jpg',
      desc: 'Theatrical live pasta station tossed directly inside a carved Italian Parmesan cheese wheel with extra virgin olive oil, garlic slivers, chili flakes, and garden-fresh sweet peppers.',
      ingredients: 'Imported Parmesan Reggiano Wheel, Artisan Spaghetti, Extra Virgin Olive Oil, Garlic, Chili Flakes, Fresh Herbs',
      dietary: 'Continental Live Station / Custom Condiments',
      servings: 'Interactive Live Pasta Station Setup'
    },
    'corporate': {
      title: 'Volcano Chaat & Theatrical Street Creations',
      image: 'assets/images/web/menu_volcano_chaat.jpg',
      desc: 'An interactive live presentation of crunchy savory delicacies nestled in fresh market greens, paired with spiced yogurts, tamarind glaze, and crisp garnishes.',
      ingredients: 'Crisp Puris, Earthen Spiced Potatoes, Pomegranate Seeds, Sweet Date Chutney, Mint Jaljeera Infusion',
      dietary: 'Pure Vegetarian / Jain Options Available',
      servings: 'Live Station Setup for 50 to 5,000+ Guests'
    },
    'social': {
      title: 'Lakhnavi Rasmalai with Royal Paan Infusion',
      image: 'assets/images/web/menu_rasmalai_dessert.jpg',
      desc: 'Delicate saffron-soaked chenna dumplings immersed in thickened pistachio milk, served atop fresh aromatic betel leaves with edible silver vark.',
      ingredients: 'Fresh Chenna, Saffron Rabdi, Roasted Pistachios, Green Cardamom, Betel Leaf, Pure Silver Vark',
      dietary: 'Traditional Royal Mithai / 100% Vegetarian',
      servings: 'Grand Royal Dessert Counter Installation'
    }
  };

  dishDetailTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const dishKey = btn.dataset.dishKey || 'wedding';
      const data = dishDetailsData[dishKey] || dishDetailsData['wedding'];

      if (dishModalTitle) dishModalTitle.textContent = data.title;
      if (dishModalImage) dishModalImage.src = data.image;
      if (dishModalDesc) dishModalDesc.textContent = data.desc;
      if (dishModalIngredients) dishModalIngredients.textContent = data.ingredients;
      if (dishModalDietary) dishModalDietary.textContent = data.dietary;
      if (dishModalServings) dishModalServings.textContent = data.servings;

      dishModal.classList.add('active');
      document.body.classList.add('overflow-hidden');
    });
  });

  function closeDishModal() {
    if (dishModal) {
      dishModal.classList.remove('active');
      document.body.classList.remove('overflow-hidden');
    }
  }

  if (dishModalClose) dishModalClose.addEventListener('click', closeDishModal);
  if (dishModal) {
    dishModal.addEventListener('click', (e) => {
      if (e.target === dishModal) closeDishModal();
    });
  }


  // =========================================================================
  // 9. CINEMATIC VIDEO MODAL (Lazy-loaded iframe & Clean Stop)
  // =========================================================================
  const playVideoBtn = document.getElementById('play-video-btn');
  const videoModal = document.getElementById('video-modal');
  const closeVideoModal = document.getElementById('close-video-modal');
  const videoModalIframe = document.getElementById('video-modal-iframe');

  function openVideoModal() {
    if (videoModalIframe && videoModalIframe.dataset.src) {
      videoModalIframe.src = videoModalIframe.dataset.src;
    }
    if (videoModal) {
      videoModal.classList.add('active');
      document.body.classList.add('overflow-hidden');
    }
  }

  function handleCloseVideoModal() {
    if (videoModal) {
      videoModal.classList.remove('active');
      document.body.classList.remove('overflow-hidden');
      if (videoModalIframe) {
        // Reset src to stop audio/video immediately and release memory
        videoModalIframe.src = 'about:blank';
      }
    }
  }

  if (playVideoBtn) playVideoBtn.addEventListener('click', openVideoModal);
  if (closeVideoModal) closeVideoModal.addEventListener('click', handleCloseVideoModal);
  if (videoModal) {
    videoModal.addEventListener('click', (e) => {
      if (e.target === videoModal) handleCloseVideoModal();
    });
  }

  // =========================================================================
  // 10. FORM SUBMISSION WITH TACTILE TOAST ALERT
  // =========================================================================
  const quoteForm = document.getElementById('catering-quote-form');
  const toastSuccess = document.getElementById('toast-success');

  if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();

      if (toastSuccess) {
        toastSuccess.classList.remove('translate-y-20', 'opacity-0');
        toastSuccess.classList.add('translate-y-0', 'opacity-100');

        setTimeout(() => {
          toastSuccess.classList.add('translate-y-20', 'opacity-0');
          toastSuccess.classList.remove('translate-y-0', 'opacity-100');
        }, 5000);
      }
      quoteForm.reset();
    });
  }

  // =========================================================================
  // 11. HERO BACKGROUND VIDEO — Ultra HD Smooth Multi-Scene Showcase
  // =========================================================================
  const heroBgVideo = document.getElementById('hero-bg-video');
  const heroVideoTabs = document.querySelectorAll('.hero-video-tab');

  if (heroBgVideo) {
    heroBgVideo.muted = true;
    heroBgVideo.defaultMuted = true;
    heroBgVideo.setAttribute('playsinline', '');
    heroBgVideo.setAttribute('webkit-playsinline', '');

    const makeVisible = () => {
      heroBgVideo.style.opacity = '1';
    };

    heroBgVideo.style.transition = 'opacity 0.4s ease-out';

    const safePlay = () => {
      const p = heroBgVideo.play();
      if (p !== undefined) {
        p.then(makeVisible).catch(() => {
          const resumeOnInteraction = () => {
            heroBgVideo.play().then(makeVisible).catch(() => {});
            ['pointerdown', 'touchstart', 'scroll', 'keydown'].forEach(evt => {
              window.removeEventListener(evt, resumeOnInteraction);
            });
          };
          ['pointerdown', 'touchstart', 'scroll', 'keydown'].forEach(evt => {
            window.addEventListener(evt, resumeOnInteraction, { once: true, passive: true });
          });
        });
      }
    };

    // Cache of Blob URLs so switching between scenes is 100% instantaneous
    const videoBlobs = {};
    const preloadBlob = (src) => {
      if (videoBlobs[src]) return Promise.resolve(videoBlobs[src]);
      return fetch(src)
        .then(res => (res.ok ? res.blob() : null))
        .then(blob => {
          if (blob) {
            videoBlobs[src] = URL.createObjectURL(blob);
            return videoBlobs[src];
          }
          return src;
        })
        .catch(() => src);
    };

    // Preload default scene into memory blob immediately
    const defaultSrc = 'assets/videos/luxury_wedding_banquet.mp4';
    preloadBlob(defaultSrc).then(blobUrl => {
      if (heroBgVideo.currentSrc && heroBgVideo.currentSrc.includes('luxury_wedding_banquet')) {
        const currTime = heroBgVideo.currentTime;
        heroBgVideo.src = blobUrl;
        heroBgVideo.currentTime = currTime;
        safePlay();
      }
    });

    // Start default playback right away
    safePlay();
    if (heroBgVideo.readyState >= 2) makeVisible();
    heroBgVideo.addEventListener('playing', makeVisible);
    heroBgVideo.addEventListener('canplay', () => {
      makeVisible();
      safePlay();
    });

    // Switch video scene function
    let currentTabIndex = 0;
    const switchVideoScene = (tabIndex) => {
      if (!heroVideoTabs || !heroVideoTabs[tabIndex]) return;
      currentTabIndex = tabIndex;
      const targetTab = heroVideoTabs[tabIndex];
      const videoSrc = targetTab.dataset.videoSrc;
      const poster = targetTab.dataset.poster;

      // Update active tab styling
      heroVideoTabs.forEach((tab, idx) => {
        if (idx === tabIndex) {
          tab.classList.add('active', 'border-gold', 'bg-gold', 'text-espresso', 'shadow-lg');
          tab.classList.remove('border-white/30', 'bg-black/80', 'text-white/90');
        } else {
          tab.classList.remove('active', 'border-gold', 'bg-gold', 'text-espresso', 'shadow-lg');
          tab.classList.add('border-white/30', 'bg-black/80', 'text-white/90');
        }
      });

      // Quick smooth crossfade
      heroBgVideo.style.opacity = '0.3';
      setTimeout(() => {
        if (poster) heroBgVideo.poster = poster;
        const playUrl = videoBlobs[videoSrc] || videoSrc;
        heroBgVideo.src = playUrl;
        heroBgVideo.currentTime = 0;
        safePlay();
        if (!videoBlobs[videoSrc]) {
          preloadBlob(videoSrc);
        }
      }, 250);
    };

    // Attach click listeners to tabs
    heroVideoTabs.forEach((tab, idx) => {
      tab.addEventListener('click', () => switchVideoScene(idx));
    });

    // Auto-advance to the next scene when current video ends
    heroBgVideo.addEventListener('ended', () => {
      const nextIndex = (currentTabIndex + 1) % heroVideoTabs.length;
      switchVideoScene(nextIndex);
    });

    // Watchdog: detect if video ever hangs/stalls mid-play and immediately kickstart it
    let lastTime = -1;
    let freezeTicks = 0;
    setInterval(() => {
      if (!heroBgVideo.paused) {
        if (lastTime >= 0 && Math.abs(heroBgVideo.currentTime - lastTime) < 0.05) {
          freezeTicks++;
          if (freezeTicks >= 3) {
            heroBgVideo.currentTime += 0.08;
            heroBgVideo.play().catch(() => {});
            freezeTicks = 0;
          }
        } else {
          freezeTicks = 0;
          lastTime = heroBgVideo.currentTime;
        }
      }
    }, 300);
  }

}); // end DOMContentLoaded
