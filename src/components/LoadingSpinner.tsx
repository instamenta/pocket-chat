'use client';
const LoadingSpinner = () => {
  return (
    <div className="loading-dots">
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
      <style>{`
        .loading-dots {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .dot {
          width: 8px;
          height: 8px;
          margin: 0 4px;
          background-color: white;
          border-radius: 50%;
          animation: dotFlashing 1s infinite linear alternate;
          animation-delay: 0s;
        }
        .dot:nth-child(2) {
          animation-delay: 0.2s;
        }
        .dot:nth-child(3) {
          animation-delay: 0.4s;
        }
        @keyframes dotFlashing {
          0% {
            background-color: white;
          }
          50%,
          100% {
            background-color: transparent;
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;
