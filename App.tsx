import React, { useState, useCallback, useMemo } from "react";
import { ImageCarousel, ImageCarouselCanvas } from "./carousel-3d";
import { RadialSlider } from "./radial-slider-component";
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

  // Memoize filter string for better performance
  const filterStyle = useMemo(() => ({
    filter: `contrast(${0.5 + (sliderValue / 100) * 2.5}) saturate(${0.8 + (sliderValue / 100) * 0.8})`,
    transition: 'filter 0.05s ease-out'
  }), [sliderValue]);

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
          <button className="cta-button">Explore More</button>
        </div>
      </div>
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

  const handleSectionSelect = useCallback((index: number) => {
    setSelectedSection(index);
  }, []);

  const handleClose = useCallback(() => {
    setSelectedSection(null);
  }, []);

  const handleIndexChange = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  return (
    <div className="app">
      {/* Carousel Homepage */}
      <div
        className={`carousel-container ${selectedSection !== null ? "hidden" : ""}`}
      >
        <header className="header">
          <div className="logo">GALLERY</div>
          <nav className="nav">
            <a href="#" className="nav-link">Home</a>
            <a href="#" className="nav-link">Collections</a>
            <a href="#" className="nav-link">About</a>
            <a href="#" className="nav-link">Contact</a>
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
    </div>
  );
};

export default App;
