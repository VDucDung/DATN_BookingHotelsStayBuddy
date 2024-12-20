import React from "react";

interface LoadingProps {
  size?: string;
  thickness?: string;
  color?: string;
  speed?: string;
  className?: string;
}

const Loading: React.FC<LoadingProps> = ({
  size = "30px",
  thickness = "3px",
  color = "text-blue-500",
  speed = ".75s",
  className = "",
}) => {
  return (
    <div
      className={`flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <div
        className={`rounded-full ${color}`}
        style={{
          width: size,
          height: size,
          background: `
            radial-gradient(farthest-side, currentColor 94%, transparent) top/${thickness} ${thickness} no-repeat,
            conic-gradient(transparent 30%, currentColor)`,
          mask: `
            radial-gradient(farthest-side, transparent calc(100% - ${thickness}), #000 0)`,
          WebkitMask: `
            radial-gradient(farthest-side, transparent calc(100% - ${thickness}), #000 0)`,
          animation: `spin ${speed} infinite linear`,
        }}
      />
      <style>
        {`
          @keyframes spin {
            0% {
              transform: rotate(0);
            }
            100% {
              transform: rotate(1turn);
            }
          }
        `}
      </style>
    </div>
  );
};

export default Loading;
