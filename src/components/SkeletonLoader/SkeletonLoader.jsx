import React from "react";
import "./SkeletonLoader.css";

function SkeletonLoader({ type = "card", count = 3 }) {
  if (type === "card") {
    return (
      <div className="skeleton-container">
        {Array.from({ length: count }, (_, index) => (
          <div key={index} className="skeleton-card">
            <div className="skeleton-image"></div>
            <div className="skeleton-content">
              <div className="skeleton-date"></div>
              <div className="skeleton-title"></div>
              <div className="skeleton-title skeleton-title--short"></div>
              <div className="skeleton-description"></div>
              <div className="skeleton-description skeleton-description--short"></div>
              <div className="skeleton-source"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === "search") {
    return (
      <div className="skeleton-search">
        <div className="skeleton-search-title"></div>
        <div className="skeleton-search-count"></div>
      </div>
    );
  }

  if (type === "button") {
    return <div className="skeleton-button"></div>;
  }

  return null;
}

export default SkeletonLoader;
