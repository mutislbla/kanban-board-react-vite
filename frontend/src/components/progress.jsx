import React from "react";
export default function CircularProgress({ value, totalValue }) {
  if (totalValue == 0) {
    totalValue = 1;
  }
  const current = Math.ceil((value / totalValue) * 100);

  const radius = 40;
  const stroke = 5;
  const normRadius = radius - stroke * 2;
  const circumference = normRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (current / 100) * circumference;

  return (
    <div className="relative rounded-xl flex items-center relative justify-center px-4">
      <svg
        height={radius * 2}
        width={radius * 2}
        strokeLinecap="round"
        strokeWidth={stroke}
      >
        <circle
          className="stroke-primary-100 fill-transparent"
          transform={`rotate(-90 ${radius} ${radius})`}
          r={normRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          className="stroke-primary-600 fill-transparent"
          strokeDasharray={circumference + " " + circumference}
          style={{ strokeDashoffset }}
          transform={`rotate(-90 ${radius} ${radius})`}
          r={normRadius}
          cx={radius}
          cy={radius}
        />
      </svg>
      <span className="absolute text-xl text-gray-700 handwriting">
        {current}%
      </span>
    </div>
  );
}
