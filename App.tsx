import { useState, useEffect, useRef } from 'react';
import {
  Ruler, LayoutGrid, Sparkles, Calendar, Users, Clock,
  Phone, Mail,
  X, ChevronLeft, ChevronRight, ZoomIn, MessageCircle
} from 'lucide-react';

import img1 from './assets/img1.png';
import img2 from './assets/img2.png';
import img3 from './assets/img3.png';
import img4 from './assets/img4.png';

// ===== SVG ICONS =====
function SvgInstagram({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.01" fill="currentColor" strokeWidth="3" />
    </svg>
  );
}

function SvgFacebook({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

// ===== TYPES =====
interface PortfolioItem {
  id: number;
  src: string;
  category: string;
  label: string;
}

// ===== DATA =====
const portfolioItems: PortfolioItem[] = [
  { id: 1,  src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80', category: 'cozinha',  label: 'Cozinha Moderna' },
  { id: 2,  src: 'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=800&q=80', category: 'cozinha',  label: 'Cozinha Clássica' },
  { id: 3,  src: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&q=80', category: 'cozinha',  label: 'Cozinha Minimalista' },
  { id: 4,  src: 'https://images.unsplash.com/photo-1616137466211-f939a420be84?w=800&q=80', category: 'sala',    label: 'Painel de TV' },
  { id: 5,  src: img3, category: 'sala',    label: 'Estante Luxo Planejada' },
  { id: 6,  src: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80', category: 'quarto',   label: 'Suite Planejada' },
  { id: 7,  src: img2, category: 'quarto',   label: 'Guarda Roupa Alto Padrão' },
  { id: 8,  src: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80', category: 'banheiro', label: 'Gabinete Sob Medida' },
  { id: 9,  src: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80', category: 'banheiro', label: 'Banheiro Planejado' },
  { id: 10, src: img1, category: 'closet',   label: 'Closet Alto Padrão' },
  { id: 11, src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', category: 'closet',   label: 'Walk-in Closet' },
  { id: 12, src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80', category: 'comercial', label: 'Escritório Planejado' },
  { id: 13, src: img4, category: 'cozinha',  label: 'Cozinha Premium com Ilha' },
  { id: 14, src: 'https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=800&q=80', category: 'quarto',   label: 'Guarda-Roupa Luxo' },
  { id: 15, src: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80', category: 'sala',    label: 'Living Planejado' },
  { id: 16, src: 'https://images.unsplash.com/photo-1620626011788-1428f7871b83?w=800&q=80', category: 'banheiro', label: 'Cuba Dupla' },
  { id: 17, src: 'https://images.unsplash.com/photo-1595521624992-48a59aef95e3?w=800&q=80', category: 'closet',   label: 'Closet Iluminado' },
  { id: 18, src: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80', category: 'comercial', label: 'Mobiliário Corporativo' },
];

const environments = [
  { label: 'COZINHAS',  title: 'Cozinhas',  src: img4 },
  { label: 'BANHEIROS', title: 'Banheiros', src: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80' },
  { label: 'QUARTOS',   title: 'Quartos',   src: img2 },
  { label: 'COMERCIAL', title: 'Comercial', src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80' },
  { label: 'CLOSETS',   title: 'Closets',   src: img1 },
  { label: 'SALAS',     title: 'Salas',     src: img3 },
];

const filters = ['todos', 'cozinha', 'sala', 'quarto', 'banheiro', 'closet', 'comercial'];

// ===== HOOKS =====
function useScrollReveal(loaded: boolean) {
  useEffect(() => {
    if (!loaded) return;
    const elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -50px 0px' }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [loaded]);
}

function useParallax(loaded: boolean) {
  useEffect(() => {
    if (!loaded) return;
    const heroEl = document.querySelector('.hero-bg') as HTMLElement;
    const parallaxEls = document.querySelectorAll('.parallax-bg') as NodeListOf<HTMLElement>;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (heroEl) {
        heroEl.style.transform = `translateY(${scrollY * 0.4}px)`;
      }
      parallaxEls.forEach((el) => {
        const rect = el.parentElement!.getBoundingClientRect();
        const offset = rect.top + scrollY;
        const relativeY = (scrollY - offset) * 0.25;
        el.style.transform = `translateY(${relativeY}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loaded]);
}

function useCounter(target: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const interval = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(interval);
  }, [started, target, duration]);

  return { count, ref };
}

// ===== COMPONENTS =====

// Loading Screen
function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setHidden(true);
      setTimeout(onDone, 600);
    }, 2200);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div className={`loading-screen ${hidden ? 'hidden' : ''}`}>
      <div className="loading-logo">
        Cozinha & Cia
        <span>Móveis Planejados</span>
      </div>
      <div className="loading-bar" />
    </div>
  );
}

// Header
function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItems = [
    { label: 'HOME', href: '#home' },
    { label: 'QUEM SOMOS', href: '#quem-somos' },
    { label: 'SERVIÇOS', href: '#ambientes' },
    { label: 'PORTFÓLIO', href: '#portfolio' },
    { label: 'CONTATO', href: '#contato' },
  ];

  const handleNav = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
        <div className="header-inner">
          <a href="#home" className="logo" onClick={(e) => { e.preventDefault(); handleNav('#home'); }}>
            <span className="logo-main">Cozinha & Cia</span>
            <span className="logo-sub">Móveis Planejados</span>
          </a>
          <nav>
            <ul className="nav-menu">
              {navItems.map((item) => (
                <li key={item.label}>
                  <a href={item.href} onClick={(e) => { e.preventDefault(); handleNav(item.href); }}>
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#contato" className="btn-orcamento" onClick={(e) => { e.preventDefault(); handleNav('#contato'); }}>
                  SOLICITE SEU ORÇAMENTO
                </a>
              </li>
            </ul>
          </nav>
          <button
            className={`hamburger ${mobileOpen ? 'open' : ''}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`}>
        {navItems.map((item) => (
          <a key={item.label} href={item.href} onClick={(e) => { e.preventDefault(); handleNav(item.href); }}>
            {item.label}
          </a>
        ))}
        <a
          href="#contato"
          className="btn-gold"
          style={{ marginTop: '1rem' }}
          onClick={(e) => { e.preventDefault(); handleNav('#contato'); }}
        >
          SOLICITE SEU ORÇAMENTO
        </a>
      </div>
    </>
  );
}

// Trust Ribbon
function TrustRibbon() {
  const items = [
    '19 Anos de Experiência',
    '+11.987 Clientes Satisfeitos',
    'Projetos Exclusivos',
    'Materiais Premium',
    'Garantia Total',
    'Entrega no Prazo',
    'Equipe Especializada',
    'Tecnologia de Ponta',
  ];
  // Duplicate for seamless loop
  const doubled = [...items, ...items];
  return (
    <div className="trust-ribbon" style={{ position: 'relative', zIndex: 3 }}>
      <div className="trust-ribbon-track">
        {doubled.map((item, idx) => (
          <span key={idx} className="trust-ribbon-item">
            {item}
            <span className="trust-ribbon-dot" />
          </span>
        ))}
      </div>
    </div>
  );
}

// Hero Section
function HeroSection() {
  return (
    <section id="home" className="hero-section">
      <div className="hero-bg" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1920&q=85')" }} />
      <div className="hero-overlay" />
      <div className="hero-content">
        <p className="hero-eyebrow">Cozinha & Cia — Excelência em Cada Detalhe</p>
        <h1 className="hero-title">
          Móveis Planejados
          <span className="hero-title-accent">Alto Padrão</span>
        </h1>
        <p className="hero-tagline">
          Transformamos seus sonhos em ambientes exclusivos há mais de 19 anos
        </p>
        <div className="hero-buttons">
          <a
            href="#portfolio"
            className="btn-gold"
            onClick={(e) => { e.preventDefault(); document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' }); }}
          >
            CONHEÇA NOSSOS PROJETOS
          </a>
          <a
            href="#contato"
            className="btn-outline-white"
            onClick={(e) => { e.preventDefault(); document.querySelector('#contato')?.scrollIntoView({ behavior: 'smooth' }); }}
          >
            FALE CONOSCO
          </a>
        </div>
      </div>
      <div className="hero-scroll" onClick={() => document.querySelector('#quem-somos')?.scrollIntoView({ behavior: 'smooth' })}>
        <span style={{ fontSize: '0.6rem', letterSpacing: '0.3em', color: 'rgba(255,255,255,0.4)' }}>SCROLL</span>
        <div className="hero-scroll-arrow" />
      </div>
    </section>
  );
}

// About Section
function AboutSection() {
  return (
    <section id="quem-somos" className="about-section">
      <div className="about-inner">
        <div className="about-image-collage reveal-left">
          <img
            src="https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=800&q=80"
            alt="Marcenaria premium 1"
            className="about-image-1"
            loading="lazy"
          />
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"
            alt="Marcenaria premium 2"
            className="about-image-2"
            loading="lazy"
          />
          <div className="about-image-accent" />
          <div className="about-image-badge">
            <span className="years">19</span>
            <span className="years-label">Anos de<br />Experiência</span>
          </div>
        </div>
        <div className="about-text reveal-right">
          <span className="section-label">QUEM SOMOS</span>
          <h2 className="section-title">Cozinha & Cia<br />Móveis Planejados</h2>
          <div className="gold-divider" />
          <p>
            Cozinha & Cia chegou ao mercado com o objetivo de buscar total satisfação,
            respeito e harmonia com seus clientes. Estamos no ramo moveleiro há mais de
            19 anos, tratando nossos clientes com grande excelência e seriedade.
          </p>
          <p>
            Atuando com uma combinação de sofisticação, qualidade e comprometimento que
            identificam e potencializam nosso produto e o crescimento da nossa marca
            no mercado.
          </p>
          <a
            href="#contato"
            className="btn-outline-gold"
            style={{ marginTop: '1.5rem', display: 'inline-block' }}
            onClick={(e) => { e.preventDefault(); document.querySelector('#contato')?.scrollIntoView({ behavior: 'smooth' }); }}
          >
            ENTRE EM CONTATO
          </a>
        </div>
      </div>
    </section>
  );
}

// Parallax / Diferenciais Section
function ParallaxSection() {
  return (
    <section className="parallax-section">
      <div
        className="parallax-bg"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80')" }}
      />
      <div className="parallax-overlay" />
      <div className="parallax-content">
        <span className="section-label reveal" style={{ textAlign: 'center', display: 'block' }}>NOSSA ESSÊNCIA</span>
        <h2 className="section-title light reveal" style={{ textAlign: 'center', marginBottom: '1rem' }}>
          Cozinha & Cia — Móveis Planejados
        </h2>
        <div className="gold-divider center reveal" />
        <p className="reveal" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
          Empresa consolidada no mercado há mais de 19 anos
        </p>
        <p className="reveal">
          Uma estrutura completa para produzir móveis planejados de alta qualidade.
          Nossa equipe de profissionais trabalha com o foco do cliente, que vai além
          de atender expectativas. Tudo o que é projetado é fielmente executado.
        </p>
        <p className="reveal">
          A produção de cada item é feita de forma minuciosa, utilizando o melhor
          das tecnologias. Em cada projeto entregamos um pouco da nossa essência
          e garantimos a qualidade do nosso trabalho.
        </p>
        <div className="reveal">
          <a
            href="#contato"
            className="btn-gold"
            onClick={(e) => { e.preventDefault(); document.querySelector('#contato')?.scrollIntoView({ behavior: 'smooth' }); }}
          >
            FALE CONOSCO
          </a>
        </div>
      </div>
    </section>
  );
}

// Differentials Section
function DifferentialsSection() {
  const cards = [
    {
      icon: <Ruler size={30} />,
      title: 'MELHOR APROVEITAMENTO DOS ESPAÇOS DE SEUS AMBIENTES',
    },
    {
      icon: <LayoutGrid size={30} />,
      title: 'ORGANIZAÇÃO PERFEITA DEIXANDO TUDO NO SEU DEVIDO LUGAR',
    },
    {
      icon: <Sparkles size={30} />,
      title: 'TER AMBIENTES MAIS FUNCIONAIS COM UM DESIGN INCRÍVEL',
    },
  ];

  return (
    <section className="differentials-section">
      <div className="section-center reveal" style={{ marginBottom: '1rem' }}>
        <span className="section-label" style={{ textAlign: 'center', display: 'block' }}>POR QUE PLANEJAR</span>
        <h2 className="section-title" style={{ textAlign: 'center' }}>
          Razões Para Projetar<br />Seu Ambiente
        </h2>
        <div className="gold-divider center" />
      </div>
      <div className="differentials-grid">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className={`diff-card reveal reveal-delay-${idx + 1}`}
          >
            <div className="diff-icon">{card.icon}</div>
            <h3>{card.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}

// Environments Section
function EnvironmentsSection() {
  return (
    <section id="ambientes" className="environments-section">
      <div className="environments-header reveal">
        <span className="section-label" style={{ display: 'block', textAlign: 'center' }}>NOSSOS PROJETOS</span>
        <h2 className="section-title light" style={{ textAlign: 'center' }}>Ambientes</h2>
        <div className="gold-divider center" />
        <p>
          Conheça nossa linha de planejados exclusivos com o mais fino acabamento e design
        </p>
      </div>
      <div className="environments-grid">
        {environments.map((env, idx) => (
          <div
            key={idx}
            className={`env-card reveal reveal-delay-${(idx % 3) + 1}`}
            onClick={() => document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <img src={env.src} alt={env.title} loading="lazy" />
            <div className="env-overlay">
              <span className="env-label">{env.label}</span>
              <h3 className="env-title">{env.title}</h3>
            </div>
            <div className="env-arrow">
              <ChevronRight size={18} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// Portfolio Section
function PortfolioSection() {
  const [activeFilter, setActiveFilter] = useState('todos');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState(0);

  const filtered = activeFilter === 'todos'
    ? portfolioItems
    : portfolioItems.filter((item) => item.category === activeFilter);

  const openLightbox = (idx: number) => {
    setLightboxIdx(idx);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = '';
  };

  const prevImage = () => setLightboxIdx((i) => (i === 0 ? filtered.length - 1 : i - 1));
  const nextImage = () => setLightboxIdx((i) => (i === filtered.length - 1 ? 0 : i + 1));

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxOpen, filtered.length]);

  return (
    <section id="portfolio" className="portfolio-section">
      <div className="portfolio-header reveal">
        <span className="section-label" style={{ display: 'block', textAlign: 'center' }}>GALERIA</span>
        <h2 className="section-title" style={{ textAlign: 'center' }}>Nosso Portfólio</h2>
        <div className="gold-divider center" />
      </div>

      <div className="portfolio-filters reveal">
        {filters.map((f) => (
          <button
            key={f}
            className={`filter-btn ${activeFilter === f ? 'active' : ''}`}
            onClick={() => setActiveFilter(f)}
          >
            {f.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="portfolio-grid">
        {filtered.map((item, idx) => (
          <div
            key={item.id}
            className={`portfolio-item reveal reveal-delay-${(idx % 4) + 1}`}
            onClick={() => openLightbox(idx)}
          >
            <img src={item.src} alt={item.label} loading="lazy" />
            <div className="portfolio-hover">
              <div className="portfolio-hover-icon"><ZoomIn size={28} /></div>
              <span className="portfolio-hover-label">{item.label}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="portfolio-footer-text reveal">
        <p>
          Cozinha & Cia está há mais de 19 anos desenvolvendo e executando projetos com personalidade.
        </p>
        <p>
          Nosso trabalho é realizado com a alta competência de uma equipe comprometida, especializada
          e que está sempre atualizada com as novas tendências.
        </p>
      </div>

      {/* Lightbox */}
      <div className={`lightbox ${lightboxOpen ? 'open' : ''}`} onClick={closeLightbox}>
        <button className="lightbox-close" onClick={closeLightbox}><X size={24} /></button>
        <button
          className="lightbox-nav lightbox-prev"
          onClick={(e) => { e.stopPropagation(); prevImage(); }}
        >
          <ChevronLeft size={24} />
        </button>
        {filtered[lightboxIdx] && (
          <img
            src={filtered[lightboxIdx].src.replace('w=800', 'w=1400')}
            alt={filtered[lightboxIdx].label}
            onClick={(e) => e.stopPropagation()}
          />
        )}
        <button
          className="lightbox-nav lightbox-next"
          onClick={(e) => { e.stopPropagation(); nextImage(); }}
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </section>
  );
}

// Stats Counter
function StatCounter({ target, prefix = '', suffix = '' }: { target: number; prefix?: string; suffix?: string }) {
  const { count, ref } = useCounter(target, 2200);
  return (
    <div ref={ref} className="stat-number">
      {prefix}{count.toLocaleString('pt-BR')}{suffix}
    </div>
  );
}

// Stats Section
function StatsSection() {
  return (
    <section className="stats-section">
      <div
        className="parallax-bg"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=1920&q=80')" }}
      />
      <div className="parallax-overlay" />
      <div style={{ position: 'relative', zIndex: 2 }}>
        <div className="section-center reveal" style={{ margin: '0 auto 1rem' }}>
          <span className="section-label" style={{ display: 'block', textAlign: 'center' }}>NOSSOS NÚMEROS</span>
          <h2 className="section-title light" style={{ textAlign: 'center' }}>Resultados que Falam</h2>
          <div className="gold-divider center" />
        </div>
        <div className="stats-grid">
          <div className="stat-item reveal reveal-delay-1">
            <div className="stat-icon"><Calendar size={36} /></div>
            <StatCounter target={19} prefix="+" />
            <p className="stat-label">ANOS DE MERCADO</p>
          </div>
          <div className="stat-item reveal reveal-delay-2">
            <div className="stat-icon"><Users size={36} /></div>
            <StatCounter target={11987} prefix="+" />
            <p className="stat-label">CLIENTES SATISFEITOS</p>
          </div>
          <div className="stat-item reveal reveal-delay-3">
            <div className="stat-icon"><Clock size={36} /></div>
            <StatCounter target={4656} prefix="+" />
            <p className="stat-label">HORAS DE QUALIFICAÇÃO</p>
          </div>
        </div>
        <p className="stats-subtitle reveal" style={{ marginTop: '4rem' }}>
          SOLUÇÕES MODERNAS E COMPLETAS PARA AMBIENTES RESIDENCIAIS E COMERCIAIS
        </p>
      </div>
    </section>
  );
}

// CTA Section
function CTASection() {
  return (
    <section className="cta-section">
      <div style={{ position: 'relative', zIndex: 2 }}>
        <span className="section-label reveal" style={{ display: 'block', textAlign: 'center' }}>PRONTO PARA COMEÇAR?</span>
        <h2 className="section-title light reveal" style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 1.5rem' }}>
          Realize o Ambiente dos Seus Sonhos
        </h2>
        <div className="gold-divider center reveal" />
        <p className="reveal">
          Contamos com uma equipe altamente qualificada de consultores prontos para elaborar
          os melhores projetos e soluções para seu ambiente.
        </p>
        <div className="reveal">
          <a
            href="#contato"
            className="btn-gold-large"
            onClick={(e) => { e.preventDefault(); document.querySelector('#contato')?.scrollIntoView({ behavior: 'smooth' }); }}
          >
            SOLICITE SEU ORÇAMENTO GRÁTIS
          </a>
        </div>
      </div>
    </section>
  );
}

// Contact Section
function ContactSection() {
  const [formData, setFormData] = useState({
    nome: '', email: '', telefone: '', ambiente: '', mensagem: ''
  });
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { nome, ambiente, mensagem } = formData;
    const text = encodeURIComponent(
      `Olá! Sou ${nome}.\nAmbiente: ${ambiente}\n${mensagem}`
    );
    window.open(`https://wa.me/5561920180490?text=${text}`, '_blank');
    setSent(true);
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <section id="contato" className="contact-section">
      <div style={{ textAlign: 'center', marginBottom: '4rem' }} className="reveal">
        <span className="section-label" style={{ display: 'block', textAlign: 'center' }}>FALE CONOSCO</span>
        <h2 className="section-title" style={{ textAlign: 'center' }}>Entre em Contato</h2>
        <div className="gold-divider center" />
      </div>
      <div className="contact-inner">
        {/* Form */}
        <div className="contact-form reveal-left">
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--charcoal)', marginBottom: '2rem' }}>
            Solicite seu Orçamento
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="nome">Nome *</label>
                <input id="nome" name="nome" type="text" placeholder="Seu nome completo" required value={formData.nome} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="email">E-mail *</label>
                <input id="email" name="email" type="email" placeholder="seu@email.com" required value={formData.email} onChange={handleChange} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="telefone">Telefone *</label>
                <input id="telefone" name="telefone" type="tel" placeholder="(61) 99999-9999" required value={formData.telefone} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="ambiente">Tipo de Ambiente *</label>
                <select id="ambiente" name="ambiente" required value={formData.ambiente} onChange={handleChange}>
                  <option value="">Selecione...</option>
                  <option value="Cozinha">Cozinha</option>
                  <option value="Quarto">Quarto</option>
                  <option value="Sala">Sala</option>
                  <option value="Banheiro">Banheiro</option>
                  <option value="Closet">Closet</option>
                  <option value="Comercial">Comercial</option>
                  <option value="Outro">Outro</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="mensagem">Mensagem</label>
              <textarea id="mensagem" name="mensagem" placeholder="Descreva seu projeto ou tire suas dúvidas..." value={formData.mensagem} onChange={handleChange} />
            </div>
            <button type="submit" className="btn-gold" style={{ width: '100%', fontSize: '0.8rem' }}>
              {sent ? '✓ MENSAGEM ENVIADA!' : 'ENVIAR MENSAGEM'}
            </button>
          </form>
        </div>

        {/* Info */}
        <div className="contact-info reveal-right">
          <div>
            <h3>CONTATO</h3>
            <div className="contact-item">
              <Phone size={16} className="contact-item-icon" style={{ color: 'var(--gold)' }} />
              <span>(61) 9201-8049</span>
            </div>
            <div className="contact-item">
              <Mail size={16} className="contact-item-icon" style={{ color: 'var(--gold)' }} />
              <span>contato.cozinhaecia.go@gmail.com</span>
            </div>
          </div>

          <div className="contact-divider" />

          <div>
            <h3>ORÇAMENTO VIA WHATSAPP</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--gray-mid)', marginBottom: '1rem' }}>
              Atendimento rápido e personalizado
            </p>
            <a
              href="https://wa.me/5561920180490"
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-btn"
            >
              <MessageCircle size={20} />
              (61) 9201-8049
            </a>
            <a
              href="https://wa.me/5561924138600"
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-btn"
              style={{ marginTop: '0.8rem', background: '#1da851' }}
            >
              <MessageCircle size={20} />
              (61) 9241-3860
            </a>
            <a
              href="https://wa.me/5561959224240"
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-btn"
              style={{ marginTop: '0.8rem', background: '#1da851' }}
            >
              <MessageCircle size={20} />
              (61) 9592-2424
            </a>
          </div>

          <div className="contact-divider" />

          <div>
            <h3>REDES SOCIAIS</h3>
            <div className="social-links">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="Instagram"
              >
                <SvgInstagram size={20} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="Facebook"
              >
                <SvgFacebook size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Instagram Section
function InstagramSection() {
  const images = [
    'https://images.unsplash.com/photo-1556912998-c57ccfab4622?w=500&q=80',
    'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=500&q=80',
    'https://images.unsplash.com/photo-1505693314120-0d443867891c?w=500&q=80',
    'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=500&q=80',
    'https://images.unsplash.com/photo-1611269154421-4b711e74a836?w=500&q=80',
  ];

  return (
    <section className="instagram-section reveal">
      <div className="instagram-header">
        <h2 className="section-title" style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '0.5rem' }}>Siga nosso Instagram</h2>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="instagram-handle">@cozinhaecia.moveis</a>
      </div>
      <div className="instagram-grid">
        {images.map((src, idx) => (
          <a key={idx} href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="instagram-item">
            <img src={src} alt={`Instagram ${idx + 1}`} loading="lazy" />
            <div className="instagram-overlay">
              <SvgInstagram size={30} />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

// Footer
function Footer() {
  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'Quem Somos', href: '#quem-somos' },
    { label: 'Serviços', href: '#ambientes' },
    { label: 'Portfólio', href: '#portfolio' },
    { label: 'Contato', href: '#contato' },
  ];

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-logo">Cozinha & Cia</div>
        <div className="footer-logo-sub">Móveis Planejados</div>
        <nav className="footer-nav">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => { e.preventDefault(); document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' }); }}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="footer-social">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <SvgInstagram size={18} />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <SvgFacebook size={18} />
          </a>
        </div>
        <div className="footer-divider" />
        <div className="footer-credits">
          <p>© 2024 Cozinha & Cia Móveis Planejados. Todos os direitos reservados.</p>
          <p style={{ marginTop: '0.4rem' }}>
            Desenvolvido por{' '}
            <a href="tel:+5561981515064">R3M Soluções Digitais — (61) 98151-5064</a>
          </p>
        </div>
      </div>
    </footer>
  );
}

// WhatsApp Float Button
function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/5561920180490"
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      aria-label="WhatsApp"
      title="Fale conosco no WhatsApp"
    >
      <MessageCircle size={26} fill="white" />
    </a>
  );
}

// ===== SCROLL PROGRESS BAR =====
function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return <div className="scroll-progress" style={{ width: `${progress}%` }} />;
}

// ===== MAIN APP =====
export default function App() {
  const [loaded, setLoaded] = useState(false);
  useScrollReveal(loaded);
  useParallax(loaded);

  return (
    <div style={{ overflowX: 'hidden', width: '100%', position: 'relative' }}>
      <LoadingScreen onDone={() => setLoaded(true)} />
      {loaded && (
        <div style={{ opacity: 1, transition: 'opacity 0.5s ease', overflowX: 'hidden', width: '100%' }}>
          <ScrollProgress />
          <Header />
          <main style={{ overflowX: 'hidden', width: '100%' }}>
            <HeroSection />
            <TrustRibbon />
            <AboutSection />
            <ParallaxSection />
            <DifferentialsSection />
            <EnvironmentsSection />
            <PortfolioSection />
            <StatsSection />
            <CTASection />
            <ContactSection />
            <InstagramSection />
          </main>
          <Footer />
          <WhatsAppFloat />
        </div>
      )}
    </div>
  );
}
