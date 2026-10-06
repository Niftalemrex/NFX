import React, { useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, useInView } from "framer-motion";
import styles from "./Hero.module.css";

interface HeroProps {
  title?: string;
  subtitle?: string;
  badge?: string;
  ctaText?: string;
  ctaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  showScrollIndicator?: boolean;
  aboutId?: string;
  servicesId?: string;
  contactId?: string;
}

const Hero: React.FC<HeroProps> = ({
  title = "NFX – Your Forex Market Partner",
  subtitle = "Expert insights, reliable trading services, and educational resources for traders worldwide.",
  badge = "",
  ctaText = "Start trading",
  ctaLink = "#",
  secondaryCtaText = "Learn more",
  secondaryCtaLink = "#",
  showScrollIndicator = true,
  aboutId = "about",
  servicesId = "services",
  contactId = "contact",
}) => {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { damping: 20, stiffness: 300 });
  const smoothY = useSpring(mouseY, { damping: 20, stiffness: 300 });
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-5, 5]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const handleScrollTo = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      const header = document.querySelector('header');
      const headerHeight = header ? header.offsetHeight : 85;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <section ref={containerRef} className={styles.hero}>
      <div className={styles.gradientBg} />
      <div className={styles.shapes}>
        <div className={`${styles.shape} ${styles.shape1}`} />
        <div className={`${styles.shape} ${styles.shape2}`} />
        <div className={`${styles.shape} ${styles.shape3}`} />
      </div>

      <motion.div
        className={styles.content}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.1, 1] }}
      >
        {badge && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <span className={styles.badge}>{badge}</span>
          </motion.div>
        )}

        <motion.h1 className={styles.title}>{title}</motion.h1>

        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {subtitle}
        </motion.p>

        <motion.div
          className={styles.buttons}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <a href={ctaLink} className={`${styles.button} ${styles.primary}`}>
            {ctaText}
            <span className={styles.arrow} suppressHydrationWarning>→</span>
          </a>
          <a href={secondaryCtaLink} className={`${styles.button} ${styles.secondary}`}>
            {secondaryCtaText}
          </a>
        </motion.div>

        {/* Navigation Anchors - About, Services, Contact */}
        <motion.div
          className={styles.anchors}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <button 
            onClick={() => handleScrollTo(aboutId)} 
            className={styles.anchorLink}
          >
            <span className={styles.anchorDot}></span>
            About
          </button>
          <button 
            onClick={() => handleScrollTo(servicesId)} 
            className={styles.anchorLink}
          >
            <span className={styles.anchorDot}></span>
            Services
          </button>
          <button 
            onClick={() => handleScrollTo(contactId)} 
            className={styles.anchorLink}
          >
            <span className={styles.anchorDot}></span>
            Contact
          </button>
        </motion.div>
      </motion.div>

      {showScrollIndicator && (
        <motion.div
          className={styles.scrollIndicator}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className={styles.scrollWheel} />
        </motion.div>
      )}
    </section>
  );
};

export default Hero;