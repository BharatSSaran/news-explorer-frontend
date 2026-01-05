import React from "react";
import SkeletonLoader from "../SkeletonLoader/SkeletonLoader";
import "./Preloader.css";

function Preloader({ type = "skeleton", displayedCount = 3 }) {
  if (type === "skeleton") {
    return (
      <>
        <SkeletonLoader type="search" />
        <SkeletonLoader type="card" count={displayedCount} />
      </>
    );
  }

  // Fallback to classic spinner
  return (
    <div className="preloader">
      <div className="circle-preloader"></div>
      <p className="preloader__text">Searching for news...</p>
    </div>
  );
}

export default Preloader;
