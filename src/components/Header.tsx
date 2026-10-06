import React, { useState, useEffect, useRef } from "react";
import styles from "./Header.module.css";

// Type definitions
interface DropdownItem {
  name: string;
  href: string;
  desc: string;
}

interface DropdownColumn {
  title: string;
  items: DropdownItem[];
}

interface BaseDropdown {
  label: string;
}

interface MegaDropdown extends BaseDropdown {
  mega: true;
  columns: DropdownColumn[];
}

interface SimpleDropdown extends BaseDropdown {
  items: DropdownItem[];
}

type Dropdown = MegaDropdown | SimpleDropdown;

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
    setOpenMobileDropdown(null);
    setSearchOpen(false);
  };

  const toggleMobileDropdown = (dropdown: string) => {
    setOpenMobileDropdown(openMobileDropdown === dropdown ? null : dropdown);
  };

  const dropdowns: Record<string, Dropdown> = {
    learn: {
      label: "Learn",
      mega: true,
      columns: [
        {
          title: "Getting Started",
          items: [
            { name: "What is Forex?", href: "/Learn/GettingStarted/WhatisForex", desc: "Understand the largest financial market" },
            { name: "How to Trade", href: "/Learn/GettingStarted/HowtoTrade", desc: "Step-by-step trading guide" },
            { name: "Trading Terminology", href: "/Learn/GettingStarted/TradingTerminology", desc: "Essential terms every trader needs" },
          ],
        },
        {
          title: "Platform & Tools",
          items: [
            { name: "MetaTrader 4/5", href: "/Learn/PlatformTools/MetaTrader", desc: "Master the industry standard" },
            { name: "TradingView Guide", href: "/Learn/PlatformTools/TradingViewGuide", desc: "Chart like a pro" },
            { name: "Automated Trading", href: "/Learn/PlatformTools/AutomatedTrading", desc: "EAs and bots explained" },
          ],
        },
        {
          title: "Strategies",
          items: [
            { name: "Scalping", href: "/Learn/Strategies/Scalping", desc: "Fast-paced short-term trades" },
            { name: "Swing Trading", href: "/Learn/Strategies/SwingTrading", desc: "Capture medium-term moves" },
            { name: "Position Trading", href: "/Learn/Strategies/PositionTrading", desc: "Long-term fundamental approach" },
          ],
        },
      ],
    },
    technicalAnalysis: {
      label: "Technical Analysis",
      items: [
        { name: "ICT Concepts", href: "/TechnicalAnalysis/ICTConcepts", desc: "Inner Circle Trader methodology" },
        { name: "Price Action", href: "/TechnicalAnalysis/PriceAction", desc: "Naked chart trading" },
        { name: "Smart Money Concepts", href: "/TechnicalAnalysis/SmartMoneyConcepts", desc: "Follow the institutional flow" },
        { name: "Supply & Demand", href: "/TechnicalAnalysis/SupplyDemand", desc: "Key reversal zones" },
        { name: "Indicators", href: "/TechnicalAnalysis/Indicators", desc: "RSI, MACD, Bollinger Bands" },
        { name: "Chart Patterns", href: "/TechnicalAnalysis/ChartPatterns", desc: "Head & shoulders, triangles" },
      ],
    },
    toolsResources: {
      label: "Tools",
      items: [
        { name: "Prop Firms", href: "/Tools/PropFirms", desc: "Compare top funding programs" },
        { name: "Forex News", href: "/Tools/ForexNews", desc: "Live economic calendar & analysis" },
        { name: "Brokers", href: "/Tools/Brokers", desc: "Find the best broker for you" },
        { name: "Trading Calculator", href: "/Tools/TradingCalculator", desc: "Pip, margin, risk calculator" },
        { name: "Economic Calendar", href: "/Tools/EconomicCalendar", desc: "Never miss a high-impact event" },
        { name: "Market Heatmap", href: "/Tools/MarketHeatmap", desc: "Visual currency strength" },
      ],
    },
    resources: {
      label: "Resources",
      items: [
        { name: "Psychology", href: "/Resources/Psychology", desc: "Master your trading mindset" },
        { name: "Leaked Books", href: "/Resources/LeakedBooks", desc: "Rare trading resources" },
        { name: "Leaked Videos", href: "/Resources/LeakedVideos", desc: "Exclusive trading content" },
      ],
    },
    basics: {
      label: "Basics",
      items: [
        { name: "CFD Products", href: "/Basics/CFDProducts", desc: "What are CFDs and how they work" },
        { name: "Corporate Actions", href: "/Basics/CorporateActions", desc: "Dividends, splits, buybacks" },
        { name: "Forex Glossary", href: "/Basics/ForexGlossary", desc: "A-Z of trading terms" },
        { name: "Trading Psychology", href: "/Basics/TradingPsychology", desc: "Master your emotions" },
        { name: "Risk Management", href: "/Basics/RiskManagement", desc: "Protect your capital" },
        { name: "Money Management", href: "/Basics/MoneyManagement", desc: "Position sizing & leverage" },
      ],
    },
  };

  const isMegaDropdown = (dropdown: Dropdown): dropdown is MegaDropdown => {
    return (dropdown as MegaDropdown).mega === true;
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <a href="/">NFX</a>
        </div>

        <nav className={styles.desktopNav}>
          <a href="/" className={styles.navLink}>Home</a>

          {/* Learn Mega Dropdown */}
          <div className={`${styles.dropdown} ${styles.megaDropdown}`}>
            <button className={styles.dropbtn}>Learn</button>
            <div className={styles.megaContent}>
              {(dropdowns.learn as MegaDropdown).columns.map((col, idx) => (
                <div key={idx} className={styles.megaColumn}>
                  <h4>{col.title}</h4>
                  <ul>
                    {col.items.map((item) => (
                      <li key={item.name}>
                        <a href={item.href}>
                          <strong>{item.name}</strong>
                          <span>{item.desc}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Analysis Dropdown */}
          <div className={styles.dropdown}>
            <button className={styles.dropbtn}>Technical Analysis</button>
            <div className={styles.dropdownContent}>
              {(dropdowns.technicalAnalysis as SimpleDropdown).items.map((item) => (
                <a key={item.name} href={item.href}>
                  <strong>{item.name}</strong>
                  <span className={styles.itemDesc}>{item.desc}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Tools Dropdown */}
          <div className={styles.dropdown}>
            <button className={styles.dropbtn}>Tools</button>
            <div className={styles.dropdownContent}>
              {(dropdowns.toolsResources as SimpleDropdown).items.map((item) => (
                <a key={item.name} href={item.href}>
                  <strong>{item.name}</strong>
                  <span className={styles.itemDesc}>{item.desc}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Resources Dropdown */}
          <div className={styles.dropdown}>
            <button className={styles.dropbtn}>Resources</button>
            <div className={styles.dropdownContent}>
              {(dropdowns.resources as SimpleDropdown).items.map((item) => (
                <a key={item.name} href={item.href}>
                  <strong>{item.name}</strong>
                  <span className={styles.itemDesc}>{item.desc}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Basics Dropdown */}
          <div className={styles.dropdown}>
            <button className={styles.dropbtn}>Basics</button>
            <div className={styles.dropdownContent}>
              {(dropdowns.basics as SimpleDropdown).items.map((item) => (
                <a key={item.name} href={item.href}>
                  <strong>{item.name}</strong>
                  <span className={styles.itemDesc}>{item.desc}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Search Button */}
          <button
            className={styles.searchBtn}
            onClick={() => setSearchOpen(!searchOpen)}
            aria-label="Search"
          >
            Search
          </button>

          <div className={styles.userArea}>
            <a href="/login" className={styles.loginLink}>Log in</a>
            <a href="/register" className={styles.registerBtn}>Sign up</a>
          </div>

          <a href="/open-account" className={`${styles.navLink} ${styles.ctaButton}`}>
            Open Account
          </a>
        </nav>

        {/* Mobile Hamburger */}
        <button
          className={`${styles.hamburger} ${isMenuOpen ? styles.open : ""}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Mobile Menu Overlay */}
        <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.open : ""}`}>
          <nav className={styles.mobileNav}>
            <a href="/" onClick={handleLinkClick}>Home</a>

            {Object.entries(dropdowns).map(([key, dropdown]) => (
              <div key={key} className={styles.mobileDropdown}>
                <button
                  className={styles.mobileDropbtn}
                  onClick={() => toggleMobileDropdown(key)}
                >
                  {dropdown.label}
                  <span className={styles.arrow}>
                    {openMobileDropdown === key ? "−" : "+"}
                  </span>
                </button>
                <div className={`${styles.mobileDropdownContent} ${openMobileDropdown === key ? styles.open : ""}`}>
                  {isMegaDropdown(dropdown)
                    ? dropdown.columns.flatMap(col => col.items).map((item) => (
                        <a key={item.name} href={item.href} onClick={handleLinkClick}>
                          <strong>{item.name}</strong>
                          <span>{item.desc}</span>
                        </a>
                      ))
                    : dropdown.items.map((item) => (
                        <a key={item.name} href={item.href} onClick={handleLinkClick}>
                          <strong>{item.name}</strong>
                          <span>{item.desc}</span>
                        </a>
                      ))}
                </div>
              </div>
            ))}

            <div className={styles.mobileUserArea}>
              <a href="/login" onClick={handleLinkClick}>Log in</a>
              <a href="/register" onClick={handleLinkClick} className={styles.mobileRegister}>Sign up</a>
            </div>

            <a href="/open-account" onClick={handleLinkClick} className={styles.mobileCta}>
              Open Account
            </a>
          </nav>
        </div>
      </div>

      {searchOpen && (
        <div className={styles.searchOverlay}>
          <div className={styles.searchContainer}>
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search for lessons, tools, brokers..."
              className={styles.searchInput}
            />
            <button onClick={() => setSearchOpen(false)} className={styles.closeSearch}>✕</button>
          </div>
          <div className={styles.searchResults}>
            <p>Try "ICT", "Risk management", "Prop firms"</p>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;