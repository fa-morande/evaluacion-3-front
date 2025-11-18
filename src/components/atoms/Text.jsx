// src/components/atoms/Text.jsx
import React from "react";

function Text({ children, variant = "p", className }) {
  const Tag = variant; // h1, h2, p, span...
  return <Tag className={className}>{children}</Tag>;
}

export default Text;
