/* ============ LOADER ============ */
window.addEventListener('load', ()=>{
  const l = document.getElementById('loader');
  if(l) setTimeout(()=>l.classList.add('hidden'),400);
});

/* ============ NAVBAR SCROLL + ACTIVE LINK ============ */
const navbar = document.getElementById('navbar');
const topBtn = document.getElementById('top-btn');
window.addEventListener('scroll', ()=>{
  if(navbar) navbar.classList.toggle('scrolled', window.scrollY > 40);
  if(topBtn) topBtn.classList.toggle('show', window.scrollY > 500);
});
if(topBtn) topBtn.addEventListener('click', ()=>window.scrollTo({top:0,behavior:'smooth'}));

const currentPage = document.body.getAttribute('data-page');
document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a=>{
  if(a.getAttribute('data-nav') === currentPage) a.classList.add('active');
});

/* ============ MOBILE MENU ============ */
const burger = document.getElementById('burgerBtn');
const mobileMenu = document.getElementById('mobileMenu');
const overlay = document.getElementById('overlay');
const menuClose = document.getElementById('menuClose');
function openMenu(){mobileMenu.classList.add('open');overlay.classList.add('show');}
function closeMenu(){mobileMenu.classList.remove('open');overlay.classList.remove('show');}
if(burger){
  burger.addEventListener('click', openMenu);
  menuClose.addEventListener('click', closeMenu);
  overlay.addEventListener('click', closeMenu);
  mobileMenu.querySelectorAll('a').forEach(a=>a.addEventListener('click', closeMenu));
}

/* ============ DARK MODE (persists across pages via localStorage-free session) ============ */
const themeToggle = document.getElementById('themeToggle');
if(themeToggle){
  themeToggle.addEventListener('click', ()=>{
    const isDark = document.body.getAttribute('data-theme') === 'dark';
    document.body.setAttribute('data-theme', isDark ? 'light' : 'dark');
    themeToggle.innerHTML = isDark ? '<i class="fa-solid fa-moon"></i>' : '<i class="fa-solid fa-sun"></i>';
  });
}

/* ============ ANIMATED COUNTERS ============ */
const statsBar = document.querySelector('.stats-bar, .mini-stats');
if(statsBar){
  const stats = statsBar.querySelectorAll('h3[data-count]');
  let counted = false;
  function animateCounters(){
    if(counted) return; counted = true;
    stats.forEach(el=>{
      const target = +el.getAttribute('data-count');
      let cur = 0;
      const step = Math.max(1, Math.ceil(target/60));
      const timer = setInterval(()=>{
        cur += step;
        if(cur >= target){cur = target; clearInterval(timer);}
        el.childNodes[0].nodeValue = cur;
      },25);
    });
  }
  const statsObserver = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting) animateCounters(); });
  },{threshold:0.4});
  statsObserver.observe(statsBar);
}

/* ============ SCROLL REVEAL ============ */
const revealObserver = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('visible'); } });
},{threshold:0.15});
document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));

/* ============ DATA: SERVICES ============ */
const services = [
  {icon:'fa-palette', title:'Graphic Designing', desc:'Creative visuals that communicate your brand with clarity and impact.', cat:'Design'},
  {icon:'fa-shapes', title:'Logo & Brand Identity', desc:'Distinct logos and identity systems built to be instantly recognizable.', cat:'Design'},
  {icon:'fa-id-card', title:'Business Cards & Flyers', desc:'Print-ready collateral that keeps your brand consistent offline too.', cat:'Design'},
  {icon:'fa-file-lines', title:'Resume / CV Design', desc:'Professional, recruiter-friendly resume design for individuals.', cat:'Design'},
  {icon:'fa-code', title:'Website Design & Development', desc:'Fast, modern, responsive websites engineered to convert visitors.', cat:'Web'},
  {icon:'fa-window-restore', title:'Custom Web Applications', desc:'Tailor-built web apps and dashboards for unique business needs.', cat:'Web'},
  {icon:'fa-bolt-lightning', title:'Landing Pages', desc:'High-converting single pages built for campaigns and launches.', cat:'Web'},
  {icon:'fa-cart-shopping', title:'E-commerce Website', desc:'Full-featured online stores with secure checkout and inventory.', cat:'Web'},
  {icon:'fa-bag-shopping', title:'Shopify Store Setup', desc:'Complete Shopify store build, theming, and product setup.', cat:'Web'},
  {icon:'fa-wordpress', title:'WordPress Website', desc:'Flexible, easy-to-manage WordPress builds for any business type.', cat:'Web'},
  {icon:'fa-store', title:'WooCommerce', desc:'WooCommerce stores configured for growth and reliability.', cat:'Web'},
  {icon:'fa-magnifying-glass-chart', title:'SEO Optimization', desc:'Rank higher and get found by the customers searching for you.', cat:'Marketing'},
  {icon:'fa-google', title:'Google Ads', desc:'Search and display campaigns tuned for cost-efficient conversions.', cat:'Marketing'},
  {icon:'fa-facebook', title:'Facebook Ads', desc:'Targeted ad campaigns that turn budget into measurable growth.', cat:'Marketing'},
  {icon:'fa-instagram', title:'Instagram Ads', desc:'Scroll-stopping ad creative built for Instagram audiences.', cat:'Marketing'},
  {icon:'fa-hashtag', title:'Social Media Management', desc:'Consistent posting, ad creatives, and community growth handled for you.', cat:'Marketing'},
  {icon:'fa-youtube', title:'YouTube Thumbnail Design', desc:'High-CTR thumbnails designed to boost your video views.', cat:'Media'},
  {icon:'fa-clapperboard', title:'Video Editing', desc:'Polished video edits for ads, brand films, and content.', cat:'Media'},
  {icon:'fa-film', title:'Reels Editing', desc:'Fast-paced, trend-aware edits built for Instagram Reels.', cat:'Media'},
  {icon:'fa-video', title:'Shorts Editing', desc:'Short-form video edits optimized for YouTube Shorts.', cat:'Media'},
  {icon:'fa-pen-nib', title:'Content Writing', desc:'Clear, on-brand copywriting for web, blogs, and marketing.', cat:'AI & Automation'},
  {icon:'fa-wand-magic-sparkles', title:'AI Content Creation', desc:'AI-assisted content production that reads naturally and converts.', cat:'AI & Automation'},
  {icon:'fa-robot', title:'AI Chatbot Development', desc:'Custom chatbots that handle support and sales around the clock.', cat:'AI & Automation'},
  {icon:'fa-gears', title:'Business Automation', desc:'Automated workflows that save your team hours every week.', cat:'AI & Automation'},
  {icon:'fa-user-tie', title:'Virtual Assistant Services', desc:'Reliable remote support for day-to-day business operations.', cat:'AI & Automation'},
];

const servicesGrid = document.getElementById('servicesGrid');
if(servicesGrid){
  const limit = servicesGrid.getAttribute('data-limit');
  const list = limit ? services.slice(0, +limit) : services;
  servicesGrid.innerHTML = list.map(s=>`
    <div class="service-card">
      <div class="service-icon"><i class="fa-solid ${s.icon}"></i></div>
      <h4>${s.title}</h4>
      <p>${s.desc}</p>
      <a href="contact.html" class="learn-more">Contact Us <i class="fa-solid fa-arrow-right"></i></a>
    </div>`).join('');
  const svObserver = new IntersectionObserver((entries)=>{
    entries.forEach((e,i)=>{ if(e.isIntersecting){ setTimeout(()=>e.target.classList.add('visible'), i%3*90); svObserver.unobserve(e.target);} });
  },{threshold:0.12});
  document.querySelectorAll('.service-card').forEach(el=>svObserver.observe(el));
}

/* services page: grouped by category */
const servicesByCategory = document.getElementById('servicesByCategory');
if(servicesByCategory){
  const cats = [...new Set(services.map(s=>s.cat))];
  const catIcons = {'Design':'fa-palette','Web':'fa-code','Marketing':'fa-bullhorn','Media':'fa-film','AI & Automation':'fa-robot'};
  servicesByCategory.innerHTML = cats.map(cat=>`
    <div class="service-category">
      <div class="cat-head">
        <div class="cat-icon"><i class="fa-solid ${catIcons[cat]||'fa-star'}"></i></div>
        <h3>${cat}</h3>
      </div>
      <div class="services-grid">
        ${services.filter(s=>s.cat===cat).map(s=>`
          <div class="service-card visible">
            <div class="service-icon"><i class="fa-solid ${s.icon}"></i></div>
            <h4>${s.title}</h4>
            <p>${s.desc}</p>
            <a href="contact.html" class="learn-more">Contact Us <i class="fa-solid fa-arrow-right"></i></a>
          </div>`).join('')}
      </div>
    </div>`).join('');
}

/* ============ DATA: WHY CHOOSE US ============ */
const whyItems = [
  {icon:'fa-user-tie', label:'Professional Team'},
  {icon:'fa-tags', label:'Affordable Pricing'},
  {icon:'fa-bolt', label:'Fast Delivery'},
  {icon:'fa-gem', label:'Premium Quality'},
  {icon:'fa-lightbulb', label:'Creative Solutions'},
  {icon:'fa-rotate', label:'Unlimited Revisions'},
  {icon:'fa-headset', label:'24/7 Support'},
  {icon:'fa-thumbs-up', label:'100% Satisfaction'},
  {icon:'fa-lock', label:'Secure Payments'},
  {icon:'fa-magnifying-glass', label:'SEO Friendly'},
];
const whyGrid = document.getElementById('whyGrid');
if(whyGrid){
  whyGrid.innerHTML = whyItems.map(w=>`<div class="why-item"><i class="fa-solid ${w.icon}"></i><h4>${w.label}</h4></div>`).join('');
}

/* ============ DATA: PORTFOLIO ============ */
const categories = ['All','Website Design','Logo Design','Brand Identity','Social Media','Video Editing','Marketing','AI Projects'];
const projects = [
  {cat:'Website Design', title:'Fintech SaaS Platform', color:'#0F172A,#1E3A8A'},
  {cat:'Logo Design', title:'Aurora Coffee Co.', color:'#1E3A8A,#06B6D4'},
  {cat:'Brand Identity', title:'Nimbus Wellness', color:'#0F172A,#06B6D4'},
  {cat:'Social Media', title:'Urban Fitness Campaign', color:'#06B6D4,#1E3A8A'},
  {cat:'Video Editing', title:'Product Launch Reel', color:'#0F172A,#334155'},
  {cat:'Marketing', title:'E-commerce Ad Funnel', color:'#1E3A8A,#0F172A'},
  {cat:'AI Projects', title:'Support Chatbot Suite', color:'#06B6D4,#0F172A'},
  {cat:'Website Design', title:'Real Estate Marketplace', color:'#1E3A8A,#06B6D4'},
  {cat:'AI Projects', title:'Workflow Automation Tool', color:'#0F172A,#1E3A8A'},
  {cat:'Logo Design', title:'Verdant Foods Rebrand', color:'#06B6D4,#334155'},
  {cat:'Website Design', title:'Creative Studio Portfolio', color:'#1E3A8A,#111C36'},
  {cat:'Marketing', title:'Local Business Growth Push', color:'#0F172A,#06B6D4'},
];
const filterBar = document.getElementById('filterBar');
const portfolioGrid = document.getElementById('portfolioGrid');
if(portfolioGrid){
  const limit = portfolioGrid.getAttribute('data-limit');
  const list = limit ? projects.slice(0, +limit) : projects;
  portfolioGrid.innerHTML = list.map(p=>`
    <div class="p-item" data-cat="${p.cat}" style="background:linear-gradient(135deg,${p.color});">
      <div class="p-fill"><div><span>${p.cat}</span><h4>${p.title}</h4></div></div>
    </div>`).join('');
}
if(filterBar){
  filterBar.innerHTML = categories.map((c,i)=>`<button class="filter-btn ${i===0?'active':''}" data-filter="${c}">${c}</button>`).join('');
  filterBar.addEventListener('click', (e)=>{
    const btn = e.target.closest('.filter-btn'); if(!btn) return;
    filterBar.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    document.querySelectorAll('.p-item').forEach(item=>{
      item.classList.toggle('hide', f!=='All' && item.dataset.cat !== f);
    });
  });
}

/* ============ DATA: PRICING ============ */
const plans = [
  {name:'Starter', price:'34,999', popular:false, features:['1 Custom Landing Page','Basic SEO Setup','Logo Design (1 concept)','2 Revisions','Email Support']},
  {name:'Professional', price:'89,999', popular:true, features:['5-Page Business Website','Full SEO Optimization','Brand Identity Kit','Social Media Setup','5 Revisions','Priority Support']},
  {name:'Enterprise', price:'224,999', popular:false, features:['Full Website / Web App','Advanced SEO & Ads Setup','Complete Branding Suite','AI Chatbot Integration','Unlimited Revisions','24/7 Dedicated Support']},
];
const pricingGrid = document.getElementById('pricingGrid');
if(pricingGrid){
  pricingGrid.innerHTML = plans.map(p=>`
    <div class="price-card ${p.popular?'popular':''}">
      ${p.popular?'<div class="popular-badge">Most Popular</div>':''}
      <h4>${p.name}</h4>
      <div class="price-amt">Rs ${p.price}<span>/ project</span></div>
      <ul>${p.features.map(f=>`<li><i class="fa-solid fa-circle-check"></i>${f}</li>`).join('')}</ul>
      <a href="contact.html" class="btn ${p.popular?'btn-primary':'btn-outline'}" style="${p.popular?'':'color:inherit;'}width:100%;">Contact Us</a>
    </div>`).join('');
}

/* ============ DATA: TESTIMONIALS ============ */
const testimonials = [
  {name:'Ahmed Raza', role:'Founder, Raza Traders, Lahore', text:'Virelix Solutions transformed our online presence completely. Communication was excellent from day one.'},
  {name:'Ayesha Khan', role:'CEO, Khan Boutique, Karachi', text:'Highly recommended team — fast delivery and premium quality on every single revision.'},
  {name:'Bilal Hussain', role:'Marketing Lead, Prime Fitness, Islamabad', text:'Professional, creative, and genuinely invested in our results. Our ad performance doubled.'},
  {name:'Fatima Sheikh', role:'Founder, Sheikh Realty, Faisalabad', text:'The website they built for us looks like something from a top-tier agency. Worth every rupee.'},
  {name:'Usman Tariq', role:'COO, TechNest Solutions, Rawalpindi', text:'Their AI chatbot cut our support workload significantly. Excellent ongoing support too.'},
  {name:'Sana Malik', role:'Owner, Malik Interiors, Multan', text:'From branding to our new website, everything was handled professionally and delivered on time.'},
  {name:'Hamza Farooq', role:'Director, Farooq Exports, Sialkot', text:'Their digital marketing team helped us reach customers across Pakistan and abroad.'},
  {name:'Zainab Abbas', role:'Founder, Abbas Bakers, Peshawar', text:'Great communication throughout and a beautiful, easy-to-use website for our bakery.'},
];
function initials(n){return n.split(' ').map(w=>w[0]).join('');}
const tTrack = document.getElementById('tTrack');
if(tTrack){
  const tHtml = testimonials.map(t=>`
    <div class="t-card">
      <div class="t-stars">★★★★★</div>
      <p>"${t.text}"</p>
      <div class="t-person">
        <div class="t-avatar">${initials(t.name)}</div>
        <div><h5>${t.name}</h5><span>${t.role}</span></div>
      </div>
    </div>`).join('');
  tTrack.innerHTML = tHtml + tHtml;
}

/* ============ DATA: FAQ ============ */
const faqs = [
  {q:'How long does a website take?', a:'Most business websites take 2–4 weeks depending on scope, while larger web applications can take 6–10 weeks. We agree on a timeline before starting.'},
  {q:'Do you redesign websites?', a:'Yes. We audit your existing site, keep what works, and modernize the design, performance, and structure.'},
  {q:'Do you provide hosting?', a:'We can set up and manage hosting for you, or work with your existing hosting provider — whichever you prefer.'},
  {q:'Do you provide support after delivery?', a:'Yes, every project includes a post-launch support window, with extended support plans available.'},
  {q:'Can I request revisions?', a:'Absolutely. Every plan includes revision rounds, and our Enterprise plan includes unlimited revisions.'},
  {q:'What is your payment structure?', a:'Typically 50% upfront and 50% on completion. Larger projects can be split into milestone payments.'},
  {q:'Do you work with international clients?', a:'Yes, we work with clients worldwide and coordinate across time zones via email, WhatsApp, and video calls.'},
  {q:'Can you help with ongoing marketing, not just one-off projects?', a:'Yes, we offer monthly retainers for SEO, ads, and social media management alongside one-off project work.'},
];
const faqWrap = document.getElementById('faqWrap');
if(faqWrap){
  const limit = faqWrap.getAttribute('data-limit');
  const list = limit ? faqs.slice(0, +limit) : faqs;
  faqWrap.innerHTML = list.map(f=>`
    <div class="faq-item">
      <div class="faq-q">${f.q}<i class="fa-solid fa-plus"></i></div>
      <div class="faq-a"><p>${f.a}</p></div>
    </div>`).join('');
  document.querySelectorAll('.faq-item').forEach(item=>{
    item.querySelector('.faq-q').addEventListener('click', ()=>{
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i=>{i.classList.remove('open'); i.querySelector('.faq-a').style.maxHeight=null;});
      if(!isOpen){ item.classList.add('open'); const a = item.querySelector('.faq-a'); a.style.maxHeight = a.scrollHeight+'px'; }
    });
  });
}

/* ============ CONTACT FORM ============ */
const contactForm = document.getElementById('contactForm');
if(contactForm){
  contactForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    const original = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-check"></i> Message Sent!';
    e.target.reset();
    setTimeout(()=>btn.innerHTML = original, 2500);
  });
}

/* ============ NEWSLETTER FORM ============ */
const newsletterForm = document.getElementById('newsletterForm');
if(newsletterForm){
  newsletterForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const btn = e.target.querySelector('button');
    const original = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-check"></i>';
    e.target.reset();
    setTimeout(()=>btn.innerHTML = original, 2200);
  });
}
