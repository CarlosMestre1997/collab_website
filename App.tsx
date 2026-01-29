import React, { useState, useCallback, useMemo } from "react";
import { ImageCarousel, ImageCarouselCanvas } from "./carousel-3d";
import { RadialSlider } from "./radial-slider-component";
import { AsciiRenderer } from "./ascii-renderer/ascii-renderer";
import "./styles.css";

const rootUrl =
  "https://zmdrwswxugswzmcokvff.supabase.co/storage/v1/object/public/uicapsule/carousel-3d";

// Carousel sections with titles and content
const sections = [
  {
    id: 1,
    src: `${rootUrl}/1.webp`,
    title: "Ethereal Dreams",
    subtitle: "Digital Art Collection",
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.`,
  },
  {
    id: 2,
    src: `${rootUrl}/2.webp`,
    title: "Urban Horizons",
    subtitle: "Architecture & Design",
    content: `Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.

Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.

Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?`,
  },
  {
    id: 3,
    src: `${rootUrl}/3.webp`,
    title: "Nature's Canvas",
    subtitle: "Landscape Photography",
    content: `Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?

At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.

Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.`,
  },
  {
    id: 4,
    src: `${rootUrl}/4.webp`,
    title: "Abstract Visions",
    subtitle: "Modern Art Series",
    content: `Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus.

Omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.

Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.`,
  },
  {
    id: 5,
    src: `${rootUrl}/5.webp`,
    title: "Digital Frontier",
    subtitle: "Technology & Innovation",
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.

Sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.`,
  },
  {
    id: 6,
    src: `${rootUrl}/6.webp`,
    title: "Cosmic Wonders",
    subtitle: "Space Exploration",
    content: `Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur.

Aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.

Consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.`,
  },
  {
    id: 7,
    src: `${rootUrl}/7.webp`,
    title: "Ocean Depths",
    subtitle: "Marine Discovery",
    content: `Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis autem vel eum iure reprehenderit.

Qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur. At vero eos et accusamus.

Et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati.`,
  },
  {
    id: 8,
    src: `${rootUrl}/8.webp`,
    title: "Creative Minds",
    subtitle: "Artistic Expression",
    content: `Cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.

Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus. Omnis voluptas assumenda est.

Omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.`,
  },
];

// Full page component for expanded section
const FullPage = ({
  section,
  onClose,
}: {
  section: (typeof sections)[0];
  onClose: () => void;
}) => {
  const [sliderValue, setSliderValue] = useState(0);
  const [showAsciiModal, setShowAsciiModal] = useState(false);

  // Memoize filter string with radical effects
  const filterStyle = useMemo(() => {
    const normalized = sliderValue / 100;
    const effects = [
      `hue-rotate(${normalized * 360}deg)`,
      `saturate(${1 + normalized * 3})`,
      `brightness(${1 + normalized * 0.8})`,
      `contrast(${1 + normalized * 1.5})`,
      normalized > 0.7 ? `invert(${(normalized - 0.7) * 3})` : ''
    ].filter(Boolean).join(' ');
    
    return {
      filter: effects,
      transition: 'filter 0.05s ease-out'
    };
  }, [sliderValue]);

  return (
    <div className="full-page">
      <button className="close-button" onClick={onClose}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
      <div className="full-page-content">
        <div className="full-page-image-container">
          <img 
            src={section.src} 
            alt={section.title} 
            className="full-page-image"
            style={filterStyle}
          />
          <div className="radial-slider-container">
            <div className="radial-slider-pointer" />
            <RadialSlider 
              value={sliderValue} 
              onChange={setSliderValue}
              maxValue={100}
            />
            <div className="radial-slider-gradient" />
          </div>
        </div>
        <div className="full-page-text">
          <span className="full-page-subtitle">{section.subtitle}</span>
          <h1 className="full-page-title">{section.title}</h1>
          <div className="full-page-description">
            {section.content.split("\n\n").map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
          <button className="cta-button" onClick={() => setShowAsciiModal(true)}>
            Explore More
          </button>
        </div>
      </div>
      
      {/* ASCII Modal */}
      {showAsciiModal && (
        <div className="ascii-modal-overlay">
          <div className="ascii-modal-content">
            <button className="ascii-modal-close" onClick={() => setShowAsciiModal(false)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <AsciiRenderer />
          </div>
        </div>
      )}
    </div>
  );
};

// Title overlay component for carousel items
const TitleOverlay = ({
  currentIndex,
  onSelect,
}: {
  currentIndex: number;
  onSelect: (index: number) => void;
}) => {
  const section = sections[currentIndex];

  return (
    <div className="title-overlay" onClick={() => onSelect(currentIndex)}>
      <div className="title-content">
        <span className="section-subtitle">{section.subtitle}</span>
        <h2 className="section-title">{section.title}</h2>
        <span className="click-hint">Click to explore</span>
      </div>
    </div>
  );
};

// Navigation dots
const NavDots = ({
  total,
  current,
}: {
  total: number;
  current: number;
}) => {
  return (
    <div className="nav-dots">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`nav-dot ${i === current ? "active" : ""}`}
        />
      ))}
    </div>
  );
};

const App = () => {
  const [selectedSection, setSelectedSection] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeModal, setActiveModal] = useState<'collections' | 'about' | 'contact' | null>(null);

  const handleSectionSelect = useCallback((index: number) => {
    setSelectedSection(index);
  }, []);

  const handleClose = useCallback(() => {
    setSelectedSection(null);
  }, []);

  const handleIndexChange = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const openModal = (modal: 'collections' | 'about' | 'contact') => {
    setActiveModal(modal);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  return (
    <div className="app">
      {/* Carousel Homepage */}
      <div
        className={`carousel-container ${selectedSection !== null ? "hidden" : ""}`}
      >
        <header className="header">
          <div className="logo">GALLERY</div>
          <nav className="nav">
            <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); }}>Home</a>
            <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); openModal('collections'); }}>Collections</a>
            <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); openModal('about'); }}>About</a>
            <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); openModal('contact'); }}>Contact</a>
          </nav>
        </header>

        <div className="carousel-wrapper">
          <ImageCarouselCanvas backgroundColor="#1a1a1a">
            <ImageCarousel
              images={sections.map((s) => s.src)}
              autorotate={true}
              autorotateSpeed={0.015}
              enableSnapping={true}
              friction={0.94}
              wheelSensitivity={0.0005}
              bendAmount={0.12}
              cornerRadius={0.12}
              onIndexChange={handleIndexChange}
            />
          </ImageCarouselCanvas>
        </div>

        <TitleOverlay
          currentIndex={currentIndex}
          onSelect={handleSectionSelect}
        />

        <NavDots total={sections.length} current={currentIndex} />

        <footer className="footer">
          <p>Scroll or drag to navigate • Click on title to explore</p>
        </footer>
      </div>

      {/* Full Page View */}
      {selectedSection !== null && (
        <FullPage
          section={sections[selectedSection]}
          onClose={handleClose}
        />
      )}

      {/* Info Modals */}
      {activeModal === 'collections' && (
        <div className="info-modal-overlay">
          <div className="info-modal">
            <button className="info-modal-close" onClick={closeModal}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <div className="info-modal-content">
              <h2 className="info-modal-title">Our Collections</h2>
              <div className="info-modal-grid">
                <div className="info-card">
                  <div className="info-card-number">01</div>
                  <h3>Digital Art</h3>
                  <p>Curated selection of contemporary digital artwork from emerging and established artists worldwide.</p>
                </div>
                <div className="info-card">
                  <div className="info-card-number">02</div>
                  <h3>Photography</h3>
                  <p>Stunning visual narratives capturing moments, emotions, and stories through the lens.</p>
                </div>
                <div className="info-card">
                  <div className="info-card-number">03</div>
                  <h3>Abstract Works</h3>
                  <p>Experimental pieces pushing the boundaries of form, color, and perception.</p>
                </div>
                <div className="info-card">
                  <div className="info-card-number">04</div>
                  <h3>3D Renders</h3>
                  <p>Cutting-edge three-dimensional creations blending art with technology.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeModal === 'about' && (
        <div className="info-modal-overlay">
          <div className="info-modal">
            <button className="info-modal-close" onClick={closeModal}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <div className="info-modal-content">
              <h2 className="info-modal-title">About Us</h2>
              <div className="info-modal-text">
                <p className="info-lead">We are a digital gallery dedicated to showcasing innovative visual experiences at the intersection of art and technology.</p>
                <div className="info-stats">
                  <div className="info-stat">
                    <div className="info-stat-value">500+</div>
                    <div className="info-stat-label">Artworks</div>
                  </div>
                  <div className="info-stat">
                    <div className="info-stat-value">120+</div>
                    <div className="info-stat-label">Artists</div>
                  </div>
                  <div className="info-stat">
                    <div className="info-stat-value">25+</div>
                    <div className="info-stat-label">Countries</div>
                  </div>
                </div>
                <p>Founded in 2024, our platform bridges the gap between traditional art appreciation and modern digital experiences. We believe in making art accessible, interactive, and engaging for everyone.</p>
                <p>Our mission is to empower artists, inspire audiences, and push the boundaries of what's possible in digital exhibition spaces.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeModal === 'contact' && (
        <div className="info-modal-overlay">
          <div className="info-modal">
            <button className="info-modal-close" onClick={closeModal}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <div className="info-modal-content">
              <h2 className="info-modal-title">Get in Touch</h2>
              <div className="info-modal-text">
                <p className="info-lead">We'd love to hear from you. Whether you're an artist, collector, or art enthusiast.</p>
                <div className="contact-methods">
                  <div className="contact-method">
                    <div className="contact-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                    </div>
                    <div>
                      <h4>Email</h4>
                      <p>hello@gallery.com</p>
                    </div>
                  </div>
                  <div className="contact-method">
                    <div className="contact-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                    </div>
                    <div>
                      <h4>Phone</h4>
                      <p>+1 (555) 123-4567</p>
                    </div>
                  </div>
                  <div className="contact-method">
                    <div className="contact-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                    </div>
                    <div>
                      <h4>Location</h4>
                      <p>123 Art District, Creative Quarter</p>
                    </div>
                  </div>
                </div>
                <div className="social-links">
                  <a href="#" className="social-link">Instagram</a>
                  <a href="#" className="social-link">Twitter</a>
                  <a href="#" className="social-link">Behance</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
