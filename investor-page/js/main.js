/* ============================================
   LEBEC INVESTOR PAGE - MAIN JS
   ============================================ */

// Configuration
const CONFIG = {
  password: 'lebec2026', // Change this to your desired password
  animationDuration: 0.8,
  animationStagger: 0.1
};

// ============================================
// PASSWORD GATE
// ============================================

function initPasswordGate() {
  const gate = document.getElementById('password-gate');
  const mainContent = document.getElementById('main-content');
  const form = document.getElementById('password-form');
  const input = document.getElementById('password-input');
  const error = document.getElementById('password-error');

  // Check if already authenticated (session storage)
  if (sessionStorage.getItem('lebec_auth') === 'true') {
    gate.classList.add('hidden');
    mainContent.classList.remove('hidden');
    initPage();
    return;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (input.value === CONFIG.password) {
      sessionStorage.setItem('lebec_auth', 'true');

      // Fade out gate
      gsap.to(gate, {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          gate.classList.add('hidden');
          mainContent.classList.remove('hidden');
          initPage();
        }
      });
    } else {
      error.textContent = 'Invalid access code. Please try again.';
      input.value = '';
      gsap.fromTo(input,
        { x: -10 },
        { x: 10, duration: 0.1, repeat: 3, yoyo: true }
      );
    }
  });
}

// ============================================
// PAGE INITIALIZATION
// ============================================

function initPage() {
  initScrollAnimations();
  initCounters();
  initGapChart();
  initTeamCarousel();
  initSourceTooltips();
}

// ============================================
// SCROLL ANIMATIONS (GSAP)
// ============================================

function initScrollAnimations() {
  gsap.registerPlugin(ScrollTrigger);

  // Fade up animations for all elements with .fade-up class
  const fadeElements = document.querySelectorAll('.fade-up');

  fadeElements.forEach((element) => {
    gsap.fromTo(element,
      {
        opacity: 0,
        y: 40
      },
      {
        opacity: 1,
        y: 0,
        duration: CONFIG.animationDuration,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  // Parallax effect on hero
  gsap.to('.hero::before', {
    yPercent: 30,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    }
  });

  // Pillar cards stagger animation
  const pillars = document.querySelectorAll('.pillar');
  if (pillars.length) {
    gsap.fromTo(pillars,
      {
        opacity: 0,
        y: 60,
        scale: 0.95
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.pillars',
          start: 'top 75%'
        }
      }
    );
  }

  // Client logos stagger
  const clientLogos = document.querySelectorAll('.client-logo');
  if (clientLogos.length) {
    gsap.fromTo(clientLogos,
      {
        opacity: 0,
        scale: 0.8
      },
      {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        stagger: 0.08,
        ease: 'back.out(1.5)',
        scrollTrigger: {
          trigger: '.client-logos',
          start: 'top 80%'
        }
      }
    );
  }

  // Ask card special animation
  const askCard = document.querySelector('.ask-card');
  if (askCard) {
    gsap.fromTo(askCard,
      {
        opacity: 0,
        y: 60,
        scale: 0.9
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: askCard,
          start: 'top 75%'
        }
      }
    );
  }
}

// ============================================
// ANIMATED COUNTERS
// ============================================

function initCounters() {
  const counters = document.querySelectorAll('.counter, .stat-number[data-target]');

  counters.forEach(counter => {
    const target = parseFloat(counter.dataset.target);
    const isDecimal = target % 1 !== 0;

    gsap.fromTo(counter,
      { innerText: 0 },
      {
        innerText: target,
        duration: 2,
        ease: 'power2.out',
        snap: isDecimal ? { innerText: 0.1 } : { innerText: 1 },
        scrollTrigger: {
          trigger: counter,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        onUpdate: function() {
          const value = parseFloat(counter.innerText);
          counter.innerText = isDecimal ? value.toFixed(1) : Math.round(value);
        }
      }
    );
  });
}

// ============================================
// WAFFLE CHART
// ============================================

function initGapChart() {
  const grid = document.getElementById('waffle-grid');
  if (!grid) return;

  grid.innerHTML = '';

  // 100 cells, each = $50B
  // Philanthropy: 6 cells ($0.3T)
  // Traditional: 24 cells ($1.2T)
  // Gap: 70 cells ($3.5T)
  const cells = [];
  for (let i = 0; i < 6; i++) cells.push('philanthropy');
  for (let i = 0; i < 24; i++) cells.push('traditional');
  for (let i = 0; i < 70; i++) cells.push('gap');

  // Create all cells first (without color classes)
  cells.forEach((type) => {
    const cell = document.createElement('div');
    cell.className = 'waffle-cell';
    cell.dataset.type = type;
    grid.appendChild(cell);
  });

  // Animate cells on scroll
  ScrollTrigger.create({
    trigger: grid,
    start: 'top 75%',
    onEnter: () => {
      const cellElements = grid.querySelectorAll('.waffle-cell');
      cellElements.forEach((cell, i) => {
        gsap.to(cell, {
          delay: i * 0.05,
          duration: 0.5,
          onStart: () => cell.classList.add(cell.dataset.type)
        });
      });
    }
  });
}

// ============================================
// TEAM CAROUSEL
// ============================================

// Team bio data
const teamBios = {
  0: {
    name: "Alix Lebec",
    role: "Founder & CEO",
    photo: "images/Alix.png",
    bio: `<p>Alix Lebec brings 20+ years of experience in innovative finance, philanthropy, and entrepreneurship. As a founding executive at WaterEquity—alongside Gary White, Matt Damon, and a global leadership team—she built a highly successful global asset manager investing in solutions to the water crisis in emerging markets. Her leadership at Water.org and WaterEquity mobilized $260M in investment and philanthropic capital.</p>
    <p>In 2020, Alix founded LEBEC, a women-led platform harnessing innovative finance and technology to unlock $5B in AUM over the next decade for a resilient, healthy global economy and planet. Through its three integrated pillars, LEBEC advises and co-creates blended capital strategies, business models, and narratives with clients (asset owners and social entrepreneurs); builds and invests in diversified, private market fund portfolios (led by LEBEC Capital Partners) to scale climate solutions; and powers narrative change initiatives. At LEBEC, Alix sets the vision, and oversees the team, strategy, business and operational blueprint, and capital mobilization efforts.</p>
    <p>Previously, Alix held leadership roles developing education, communications, and community development programs at The World Bank in Paris and Southeast Asia and the Clinton Global Initiative.</p>
    <p>A Worthy100 Awardee (Worth Magazine and L'Oréal Group), she serves as a Limited Partner at Polymath Ventures and global judge for Reckitt's social entrepreneur accelerator (a Fortune 500 company), and is a member of 100 Women in Finance. Alix has been featured in Forbes, Inc. Magazine, and the Financial Times. She holds a Master's degree from the London School of Economics with Merit and a B.A. in International Business from the American University of Paris with Honors, where she also received the Distinguished Alumni Award in 2025.</p>`
  },
  1: {
    name: "Julia Wilkinson",
    role: "Managing Partner & Chief Investment Officer",
    photo: "images/Julia.png",
    bio: `<p>Julia Wilkinson is a seasoned investment professional with 20 years of global experience in finance, portfolio construction, and investment strategy. Born in Mexico City and having worked extensively across Latin America, she brings deep cross-cultural expertise and a sharp global lens to every mandate.</p>
    <p>Julia has built a distinguished career deploying capital toward groundbreaking solutions, powering successful startups, and leading investment strategies across sectors and asset classes. Her expertise spans due diligence, fund and portfolio structuring, financial modeling, and values-aligned financial strategy. She has traded across equities, debt, currencies, and derivatives in public and private markets, and allocated capital to investment-grade bonds, hedge funds, private credit, real estate, and private equity. She also spent two years in venture capital and has made direct angel investments in four early-stage companies.</p>
    <p>At LEBEC, Julia oversees the development of innovative finance strategies, frameworks, and metrics; financial modeling; due diligence; and impact reporting. At LEBEC Capital Partners, Julia sets and oversees the investment strategy, construction of and investments in private market fund portfolios, due diligence, the team, day-to-day business operations, and reporting. Julia also develops blended capital strategies and vehicles advancing solutions with partners: Integral Assets and ImpactAssets.</p>
    <p>Earlier in her career, Julia sharpened her financial acumen at Goldman Sachs, where she was part of a team managing $1.5B in assets for ultra-high-net-worth and institutional clients through multi-manager global portfolios. She has also advised leading asset managers, including Manulife, Sonen Capital, MacFarlane Partners, ThirdWay, Women's World Banking, and Endurance 28.</p>
    <p>Julia holds a Master's degree from Columbia University and a Bachelor's from the University of Pennsylvania. She is trilingual in English, Portuguese, and Spanish and serves as a mentor with Endeavor Global.</p>`
  },
  2: {
    name: "Rafia Qureshi",
    role: "Managing Director, EMEA & Asia",
    photo: "images/Rafia.png",
    bio: `<p>Rafia Qureshi is a seasoned leader in philanthropy and innovative finance, with a proven 20 year track record of driving systemic change across key stakeholders: corporate, foundation, financial institutions, and non-profits. Her expertise spans the full investment lifecycle—from structuring catalytic capital strategies to managing multi-million-dollar social impact portfolios. She has worked with development finance institutions, foundations, and social enterprises to align capital with impact. As CEO of The Womanity Foundation, she repositioned the organization as a leader in gender-lens investing, integrating venture philanthropy and social investment into its funding model.</p>
    <p>Rafia spent a majority of her career at JPMorgan Chase. There, she jointly oversaw $250M annually in social investments through the investment bank's Foundation across Europe, Middle East, and Africa (EMEA). She expanded the firm's corporate social investment portfolio across 12 emerging markets, and spun out a social enterprise in South Africa with an investment of $150M USD. She then deepened her investment expertise at Gatsby Charitable Foundation, where she evaluated investments such as the $25M African Agricultural Capital Fund. Her early experience in Venture Capital (VC) at DN Capital (an early stage VC firm with AUM in excess of $1B) and Dow Jones Venture One grounded her journey in investment analysis, fundraising, and investor relations. Rafia was a key member of DN Capital's investor relations team, supporting the firm to raise its second fund valued in excess of €40M.</p>
    <p>At LEBEC and LEBEC Capital Partners, Rafia leads on strategy in EMEA and Asia, client relationships, investor engagement and relations, and capital mobilization efforts. This includes overseeing performance communication and market positioning. Fluent in multiple languages and holding degrees from the London School of Economics and Boston University, Rafia brings a global perspective and deep expertise in designing scalable, high-impact investment solutions.</p>`
  },
  3: {
    name: "Hannah Kovich",
    role: "Managing Director & Senior Investment Analyst",
    photo: "images/Hannah.png",
    bio: `<p>Hannah Kovich brings 15+ years of expertise in innovative finance, market research, and investment and impact analysis—specializing in catalytic philanthropy and innovative investment structures. At LEBEC, Hannah has co-led the development of innovative finance strategies for different asset owners, managers, and social entrepreneurs including the Sustainable Ocean Alliance, SunCulture, The Miami Foundation, Manulife Investment Management, and MacFarlane Partners, including creating a portfolio approach to impact for Fortune 500 Company Reckitt.</p>
    <p>As Managing Director and Senior Investment Analyst at LEBEC Capital Partners, Hannah conducts market research, due diligence, and financial analysis to identify high-potential funds and investments transforming key sectors. She also contributes to investment thesis development, portfolio construction, and risk assessments.</p>
    <p>Prior to LEBEC, Hannah was also on the founding team at WaterEquity—supporting the development of blended capital structures, market research across different asset classes, investor relations management, reporting, and fund operations. Previously at Water.org, she managed a $60M+ portfolio of global funders, including the IKEA Foundation, leading teams through grant development and impact reporting. At Harvesters (The Community Food Network), she developed collaborative approaches to program management and analysis. Hannah holds a B.A. in Political Science from Kansas State University and is passionate about bringing resources to families in need globally.</p>`
  }
};

function initTeamCarousel() {
  const cards = document.querySelectorAll('.team-card');
  const modal = document.getElementById('bio-modal');
  const modalClose = document.getElementById('bio-modal-close');
  const modalPhoto = document.getElementById('bio-modal-photo');
  const modalName = document.getElementById('bio-modal-name');
  const modalRole = document.getElementById('bio-modal-role');
  const modalBody = document.getElementById('bio-modal-body');

  // Open modal on card click
  cards.forEach((card) => {
    card.addEventListener('click', (e) => {
      // Don't open modal if clicking LinkedIn link
      if (e.target.closest('.team-linkedin')) return;

      const index = card.getAttribute('data-index');
      const bio = teamBios[index];

      if (bio) {
        modalPhoto.src = bio.photo;
        modalPhoto.alt = bio.name;
        modalName.textContent = bio.name;
        modalRole.textContent = bio.role;
        modalBody.innerHTML = bio.bio;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // Close modal
  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  modalClose.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

// ============================================
// SMOOTH SCROLL
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      gsap.to(window, {
        duration: 1,
        scrollTo: target,
        ease: 'power2.inOut'
      });
    }
  });
});

// ============================================
// SOURCE TOOLTIPS (Temporary Debug Feature)
// ============================================

function initSourceTooltips() {
  const sourceButtons = document.querySelectorAll('.source-btn');

  sourceButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const sourceId = btn.dataset.source;
      const tooltip = document.getElementById(`source-${sourceId}`);

      // Close all other tooltips
      document.querySelectorAll('.source-tooltip').forEach(t => {
        if (t !== tooltip) t.classList.remove('active');
      });

      // Toggle this tooltip
      tooltip.classList.toggle('active');
    });
  });

  // Close tooltips when clicking elsewhere
  document.addEventListener('click', () => {
    document.querySelectorAll('.source-tooltip').forEach(t => {
      t.classList.remove('active');
    });
  });
}

// ============================================
// INITIALIZE
// ============================================

document.addEventListener('DOMContentLoaded', initPasswordGate);

