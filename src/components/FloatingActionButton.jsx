export default function FloatingActionButton({ showBackToTop, onScrollToTop }) {
  return (
    <button 
      className={`fab-back-to-top ${showBackToTop ? 'visible' : ''}`}
      onClick={onScrollToTop}
      aria-label="Scroll to top"
    >
      <svg 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <polyline points="18 15 12 9 6 15"></polyline>
      </svg>
    </button>
  );
}
