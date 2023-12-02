import React from "react";

interface Props {
  currentLevel: number;
  criticalLevel: number;
}

function Bucket({ currentLevel, criticalLevel }: Props) {
  let isCritical = currentLevel < criticalLevel;
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
