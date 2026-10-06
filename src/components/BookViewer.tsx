// src/components/BookViewer.tsx
import React, { useState, useEffect } from 'react';
import styles from './BookViewer.module.css';

interface BookViewerProps {
  file: string;
  title: string;
  author: string;
  onClose: () => void;
}

const BookViewer: React.FC<BookViewerProps> = ({ file, title, author, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const handleIframeError = () => {
    setError('Failed to load the book. Please try again later.');
    setIsLoading(false);
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <div className={styles.modalTitle}>
            <h3>{title}</h3>
            <p>by {author}</p>
          </div>
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>
        <div className={styles.modalBody}>
          {isLoading && (
            <div className={styles.loadingContainer}>
              <div className={styles.spinner}></div>
              <p>Loading book content...</p>
            </div>
          )}
          {error && (
            <div className={styles.errorContainer}>
              <p>{error}</p>
            </div>
          )}
          <iframe
            src={`/books/${encodeURIComponent(file)}`}
            className={styles.bookFrame}
            onLoad={handleIframeLoad}
            onError={handleIframeError}
            title={title}
          />
        </div>
      </div>
    </div>
  );
};

export default BookViewer;