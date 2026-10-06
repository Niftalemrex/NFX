// src/components/Card.tsx
import React from "react";

interface CardProps {
  href: string;
  title: string;
  date: string;
  className?: string;
}

const Card: React.FC<CardProps> = ({ href, title, date, className }) => {
  return (
    <a href={href} className={className}>
      <h3>{title}</h3>
      <p>{date}</p>
    </a>
  );
};

export default Card;