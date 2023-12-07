import React, { useEffect } from "react";

interface Props {
  currentLevel: number;
  threshold: number;
}

function Bucket({ currentLevel, threshold }: Props) {
  let isCritical = currentLevel < threshold;
  let bucketClass = isCritical ? "bucket bucket-warning" : "bucket";
  let bucketWaterStyle = {
    background: `linear-gradient(to top, lightblue ${currentLevel}%, rgba(0,0,0,0) ${currentLevel}%)`,
  };

  return (
    <>
      <div className={bucketClass} style={bucketWaterStyle}>
        <div className="bucket-text">{currentLevel}%</div>
      </div>
    </>
  );
}

export default Bucket;
