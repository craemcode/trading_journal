import { useEffect } from "react";

export default function ImageLightBox({ src, alt, onClose }) {
  useEffect(() => {
    function handleEsc(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-6 text-white text-3xl font-bold"
      >
        ✕
      </button>

      {/* Image */}
      <img
        src={src}
        alt={alt}
        className="max-h-[90vh] max-w-[90vw] rounded-lg"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}