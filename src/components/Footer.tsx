import React from "react";
import styles from "./Footer.module.css";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const handleNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email');
    console.log('Newsletter subscription:', email);
    // Add your newsletter subscription logic here
    alert('Thank you for subscribing!');
    e.currentTarget.reset();
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Main Footer Columns */}
        <div className={styles.columns}>
          {/* Brand Column */}
          <div className={styles.column}>
            <div className={styles.logo}>NFX</div>
            <p className={styles.description}>
              Your trusted partner in forex trading. Expert insights, reliable services, and education for traders worldwide.
            </p>
            <div className={styles.socialLinks}>
              <a href="#" aria-label="Twitter" className={styles.socialIcon} suppressHydrationWarning>
                <span>𝕏</span>
              </a>
              <a href="#" aria-label="LinkedIn" className={styles.socialIcon} suppressHydrationWarning>
                <span>in</span>
              </a>
              <a href="#" aria-label="Instagram" className={styles.socialIcon} suppressHydrationWarning>
                <span>IG</span>
              </a>
              <a href="#" aria-label="Telegram" className={styles.socialIcon} suppressHydrationWarning>
                <span>TG</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className={styles.column}>
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="/services">Services</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>

          {/* Trading Resources */}
          <div className={styles.column}>
            <h4>Trading Resources</h4>
            <ul>
              <li><a href="/learn">Learn Forex</a></li>
              <li><a href="/technical-analysis">Technical Analysis</a></li>
              <li><a href="/tools">Trading Tools</a></li>
              <li><a href="/basics">Trading Basics</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div className={styles.column}>
            <h4>Legal</h4>
            <ul>
              <li><a href="/privacy">Privacy Policy</a></li>
              <li><a href="/terms">Terms of Service</a></li>
              <li><a href="/risk">Risk Disclosure</a></li>
              <li><a href="/compliance">Compliance</a></li>
            </ul>
          </div>

          {/* Contact / Newsletter */}
          <div className={styles.column}>
            <h4>Stay Updated</h4>
            <p className={styles.newsletterText}>Get market insights and updates delivered to your inbox.</p>
            <form className={styles.newsletterForm} onSubmit={handleNewsletterSubmit}>
              <input 
                type="email" 
                name="email"
                placeholder="Your email address" 
                required 
              />
              <button type="submit">Subscribe</button>
            </form>
            <div className={styles.contactInfo}>
              <p>📧 support@nfx.com</p>
              <p>📞 +1 (555) 123-4567</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <p suppressHydrationWarning>&copy; {currentYear} NFX Forex. All rights reserved.</p>
          <p className={styles.regulatory}>Regulated & Trusted Forex Service</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;