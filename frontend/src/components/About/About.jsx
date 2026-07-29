import React, { useEffect, useRef } from 'react';
import './About.css';

const About = () => {
  const visualRef = useRef(null);

  useEffect(() => {
    // 1. SVG ANIMATION (global network)
    const NS = "http://www.w3.org/2000/svg";
    const container = visualRef.current;
    if (!container) return;

    // Clear any existing content for React strict mode / re-renders
    container.innerHTML = '';

    const W = 800, H = 630;
    const svg = document.createElementNS(NS,'svg');
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    svg.setAttribute('preserveAspectRatio','xMidYMid slice');

    function el(tag, attrs){
      const e = document.createElementNS(NS, tag);
      for (const k in attrs) e.setAttribute(k, attrs[k]);
      return e;
    }

    const defs = el('defs',{});
    defs.innerHTML = `
      <radialGradient id="glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#8fc0ff" stop-opacity="0.9"/>
        <stop offset="100%" stop-color="#8fc0ff" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#04060c" stop-opacity="0"/>
        <stop offset="100%" stop-color="#04060c" stop-opacity="0.9"/>
      </linearGradient>
      <linearGradient id="skylineGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#0f1a30"/>
        <stop offset="100%" stop-color="#060a14"/>
      </linearGradient>
    `;
    svg.appendChild(defs);

    const dotsGroup = el('g', {opacity:'0.85'});
    const clusters = [
      {cx:150, cy:190, rx:130, ry:70},
      {cx:330, cy:150, rx:90,  ry:60},
      {cx:430, cy:230, rx:150, ry:90},
      {cx:620, cy:170, rx:140, ry:80},
      {cx:250, cy:290, rx:110, ry:60},
      {cx:560, cy:300, rx:130, ry:70},
    ];
    let seed = 42;
    function rand(){ seed = (seed*9301+49297) % 233280; return seed/233280; }

    clusters.forEach(c=>{
      for(let i=0;i<60;i++){
        const a = rand()*Math.PI*2;
        const r = Math.pow(rand(),0.5);
        const x = c.cx + Math.cos(a)*c.rx*r;
        const y = c.cy + Math.sin(a)*c.ry*r;
        const dot = el('circle', { cx:x, cy:y, r:1.6, fill:'#5f80b8' });
        const dur = (5 + rand()*4).toFixed(2)+'s';
        const delay = (rand()*6).toFixed(2)+'s';
        dot.innerHTML = `<animate attributeName="opacity" values="0.25;0.9;0.25" dur="${dur}" begin="${delay}" repeatCount="indefinite"/>`;
        dotsGroup.appendChild(dot);
      }
    });
    svg.appendChild(dotsGroup);

    const hubs = [
      {x:150,y:190},{x:430,y:230},{x:620,y:170},{x:560,y:300},{x:250,y:290},{x:330,y:150}
    ];
    const hubGroup = el('g',{});
    hubs.forEach((h,i)=>{
      const halo = el('circle',{cx:h.x, cy:h.y, r:14, fill:'url(#glow)'});
      const dur = (7+i*0.6).toFixed(2)+'s';
      halo.innerHTML = `<animate attributeName="r" values="8;16;8" dur="${dur}" repeatCount="indefinite"/><animate attributeName="opacity" values="0.5;1;0.5" dur="${dur}" repeatCount="indefinite"/>`;
      hubGroup.appendChild(halo);
      const core = el('circle',{cx:h.x, cy:h.y, r:2.6, fill:'#cfe3ff'});
      hubGroup.appendChild(core);
    });
    svg.appendChild(hubGroup);

    const arcGroup = el('g', {fill:'none'});
    const pairs = [[0,2],[2,3],[3,4],[1,5],[5,0],[1,2]];
    pairs.forEach((p,i)=>{
      const a = hubs[p[0]], b = hubs[p[1]];
      const mx = (a.x+b.x)/2, my = Math.min(a.y,b.y) - 60 - rand()*20;
      const pathD = `M${a.x},${a.y} Q${mx},${my} ${b.x},${b.y}`;
      const path = el('path', {d:pathD, stroke:'rgba(140,180,255,0.28)', 'stroke-width':1});
      arcGroup.appendChild(path);
      const dur = (9 + i*1.4).toFixed(2)+'s';
      const dot = el('circle', {r:2.4, fill:'#a9caff'});
      const anim = el('animateMotion', {dur:dur, repeatCount:'indefinite', path:pathD, rotate:'auto'});
      const animOpacity = el('animate', {attributeName:'opacity', values:'0;1;1;0', dur:dur, repeatCount:'indefinite'});
      dot.appendChild(anim);
      dot.appendChild(animOpacity);
      arcGroup.appendChild(dot);
    });
    svg.appendChild(arcGroup);

    svg.appendChild(el('rect',{x:0,y:H*0.55,width:W,height:H*0.45,fill:'url(#fade)'}));

    const skylineY = H*0.78;
    const skyGroup = el('g', {});
    const buildings = [
      {x:0,   w:70,  h:120}, {x:65,  w:40, h:170}, {x:100, w:55, h:95},
      {x:150, w:34,  h:150}, {x:180, w:70, h:210}, {x:245, w:44, h:130},
      {x:284, w:60,  h:180}, {x:340, w:38, h:105}, {x:372, w:64, h:230},
      {x:430, w:46,  h:140}, {x:472, w:70, h:190}, {x:538, w:36, h:100},
      {x:570, w:58,  h:165}, {x:624, w:44, h:210}, {x:664, w:66, h:130},
      {x:726, w:40,  h:175}, {x:762, w:38, h:110},
    ];
    buildings.forEach(b=>{
      skyGroup.appendChild(el('rect',{
        x:b.x, y: skylineY - b.h, width:b.w, height:b.h + 40,
        fill:'url(#skylineGrad)', opacity:'0.95'
      }));
    });
    svg.appendChild(skyGroup);

    const lightGroup = el('g',{});
    buildings.forEach((b)=>{
      const rows = Math.floor(b.h/22), cols = Math.max(2, Math.floor(b.w/14));
      for(let r=0;r<rows;r++){
        for(let c=0;c<cols;c++){
          if(rand() > 0.72){
            const lx = b.x + 6 + c*(b.w-12)/cols;
            const ly = skylineY - b.h + 10 + r*20;
            const light = el('rect',{x:lx, y:ly, width:3, height:5, fill:'#ffcf8a', opacity:'0.55'});
            const dur = (4+rand()*5).toFixed(2)+'s';
            const delay = (rand()*6).toFixed(2)+'s';
            light.innerHTML = `<animate attributeName="opacity" values="0.15;0.7;0.15" dur="${dur}" begin="${delay}" repeatCount="indefinite"/>`;
            lightGroup.appendChild(light);
          }
        }
      }
    });
    svg.appendChild(lightGroup);

    const figGroup = el('g', {});
    const figures = [
      {x:120, s:1.0}, {x:210, s:0.92}, {x:300, s:1.05},
      {x:470, s:0.95}, {x:560, s:1.02}, {x:660, s:0.9},
    ];
    figures.forEach((f,i)=>{
      const base = skylineY + 34;
      const g = el('g', {transform:`translate(${f.x}, ${base}) scale(${f.s})`});
      const dur = (6 + i*0.7).toFixed(2)+'s';
      const animate = el('animateTransform',{
        attributeName:'transform', type:'translate', additive:'sum',
        values:'0,0; 0,-2.5; 0,0', dur:dur, repeatCount:'indefinite'
      });
      const body = el('path', {
        d:'M0,-58 c7,0 12,6 12,13 c0,6 -3,10 -6,12 c9,3 15,11 15,22 l0,28 l-42,0 l0,-28 c0,-11 6,-19 15,-22 c-3,-2 -6,-6 -6,-12 c0,-7 5,-13 12,-13 z',
        fill:'#050810', opacity:'0.92'
      });
      g.appendChild(animate);
      g.appendChild(body);
      figGroup.appendChild(g);
    });
    svg.appendChild(figGroup);

    container.appendChild(svg);
  }, []);

  const companies = [
    "Google", "Microsoft", "Amazon", "Apple", "Meta", "Tesla",
    "Netflix", "Adobe", "Salesforce", "IBM", "Oracle", "SAP",
    "Intel", "Cisco", "Dell", "HP", "Accenture", "Deloitte"
  ];

  const team = [
    { name: "Aarav Shah",   role: "Founder & CEO",       img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=500&q=80" },
    { name: "Kabir Mehta",  role: "Lead Developer",      img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80" },
    { name: "Riya Nair",    role: "Creative Director",   img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=500&q=80" },
    { name: "Devika Rao",   role: "UI/UX Designer",      img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=500&q=80" },
    { name: "Arjun Verma",  role: "Product Manager",     img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=500&q=80" },
    { name: "Sara Iyer",    role: "Marketing Head",      img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=500&q=80" },
  ];

  // Split the team into columns for the vertical auto-scrolling gallery.
  // Each column repeats/offsets through the team list so every column has
  // enough cards to scroll continuously, and no two columns line up the
  // same face at the same height.
  const COLUMN_COUNT = 5;
  const CARDS_PER_COLUMN = 5;
  const teamColumns = Array.from({ length: COLUMN_COUNT }, (_, colIndex) =>
    Array.from({ length: CARDS_PER_COLUMN }, (_, cardIndex) =>
      team[(colIndex * 2 + cardIndex) % team.length]
    )
  );

  return (
    <div id="about">
      <section className="about-hero">
        <div className="about-wrap">
          <div className="about-hero-grid">

            <div>
              <span className="about-eyebrow">ABOUT ZARVION TECHNOLOGIES</span>
              <h1 className="about-h1">Empowering Careers.<br/>Connecting <span className="about-accent">Futures.</span></h1>
              <p className="about-lede">At Zarvion Technologies, we bridge the gap between exceptional talent and world-class opportunities. We help professionals upgrade their skills, build strong profiles, and land their dream roles in top companies across the globe.</p>

              <div className="about-feature-row">
                <div className="about-feature">
                  <div className="about-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="7" r="4"/><path d="M2 21v-2a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v2"/><path d="M17 3.13a4 4 0 0 1 0 7.75M22 21v-2a4 4 0 0 0-3-3.87"/></svg></div>
                  <h4>Expert Guidance</h4>
                  <p>Industry experts with proven experience</p>
                </div>
                <div className="about-feature">
                  <div className="about-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1"/></svg></div>
                  <h4>Personalized Support</h4>
                  <p>Tailored solutions for every career stage</p>
                </div>
                <div className="about-feature">
                  <div className="about-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18z"/></svg></div>
                  <h4>Global Opportunities</h4>
                  <p>Connecting talent with global employers</p>
                </div>
              </div>

              <div className="about-hero-actions">
                <a className="about-btn-primary" href="#">Know More About Us
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                </a>
                <a className="about-btn-ghost" href="#">
                  <span className="about-play-dot"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></span>
                  Watch Our Story
                </a>
              </div>
            </div>

            {/* ===== ANIMATED GLOBAL-NETWORK PANEL ===== */}
            <div className="about-hero-visual" ref={visualRef} aria-hidden="true"></div>

          </div>
        </div>
      </section>

      {/* ===== OUR TEAM ===== */}
      <section className="about-team-section">
        <div className="about-wrap">
          <div className="about-team-head">
            <span className="about-eyebrow">OUR TEAM</span>
            <div className="about-team-titlerow">
              <h2 className="about-team-h2">The people behind <span className="about-accent">Zarvion.</span></h2>
              <span className="about-team-num">04</span>
            </div>
          </div>
        </div>

        <div className="about-team-columns">
          {teamColumns.map((col, colIndex) => (
            <div
              className={`about-team-col ${colIndex % 2 === 0 ? 'is-up' : 'is-down'}`}
              key={colIndex}
            >
              <div
                className="about-team-col-track"
                style={{ animationDuration: `${26 + colIndex * 4}s` }}
              >
                {[...col, ...col].map((member, i) => (
                  <div className="about-team-cell" key={i}>
                    <img src={member.img} alt={member.name} loading="lazy" />
                    <div className="about-team-cell-info">
                      <h5>{member.name}</h5>
                      <span>{member.role}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== COMPANY LOGO CAROUSEL ===== */}
      <div className="about-carousel-section">
        <div className="about-carousel-title">Trusted by <span>industry leaders</span> worldwide</div>
        <div className="about-carousel-wrapper">
          <div className="about-carousel-track">
            {companies.map((name, i) => (
              <div className="about-carousel-item" key={`set1-${i}`}>
                <span className="about-logo-text">
                  <span style={{color: 'var(--blue-glow)'}}>{name.charAt(0)}</span>{name.slice(1)}
                </span>
              </div>
            ))}
            {companies.map((name, i) => (
              <div className="about-carousel-item" key={`set2-${i}`}>
                <span className="about-logo-text">
                  <span style={{color: 'var(--blue-glow)'}}>{name.charAt(0)}</span>{name.slice(1)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;