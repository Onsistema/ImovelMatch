import React, { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface AnimatedModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const AnimatedModal: React.FC<AnimatedModalProps> = ({ isOpen, onClose, children }) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="modal-portal"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { duration: 0.3 } },
            exit: { opacity: 0, transition: { duration: 0.25, delay: 0.05 } }
          }}
          style={{ perspective: "1000px" }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto"
        >
          {/* Backdrop Overlay with premium blur-fade */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            onClick={onClose}
            className="fixed inset-0 bg-[#060a12]/85 backdrop-blur-md cursor-pointer"
          />

          <motion.div
            key="modal-content"
            initial={{ opacity: 0, scale: 0.85, rotateX: -15, rotateY: 10, z: -120, y: 40 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              rotateX: 0, 
              rotateY: 0, 
              z: 0,
              y: 0,
              transition: {
                type: "spring",
                damping: 18,
                stiffness: 220,
                mass: 0.9,
                restDelta: 0.001
              }
            }}
            exit={{ 
              opacity: 0, 
              scale: 0.9, 
              rotateX: 12, 
              rotateY: -8, 
              z: -80,
              y: 25,
              transition: {
                duration: 0.22,
                ease: [0.32, 0, 0.67, 0]
              }
            }}
            style={{ 
              perspective: "1000px",
              transformStyle: "preserve-3d"
            }}
            className="relative w-full max-w-lg z-10"
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnimatedModal;
