import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
    };
    
    const handleMouseOver = (e) => {
      if (e.target.closest("button, a, [role='button'], .cursor-pointer")) {
        setIsHovering(true);
      }
    };
    
    const handleMouseOut = (e) => {
      if (e.target.closest("button, a, [role='button'], .cursor-pointer")) {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);
    
    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, [cursorX, cursorY]);

  // Hide on mobile/touch
  if (typeof window !== "undefined" && "ontouchstart" in window) return null;

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          animate={{
            width: isHovering ? 48 : 12,
            height: isHovering ? 48 : 12,
            backgroundColor: isHovering ? "transparent" : "#b87333",
            border: isHovering ? "2px solid #b87333" : "none",
          }}
          transition={{ duration: 0.2 }}
          className="rounded-full"
        />
      </motion.div>
      
      {/* Trailing ring */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9998]"
        style={{
          x: useSpring(cursorX, { damping: 30, stiffness: 200 }),
          y: useSpring(cursorY, { damping: 30, stiffness: 200 }),
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          animate={{
            width: isHovering ? 64 : 32,
            height: isHovering ? 64 : 32,
            opacity: isVisible ? 0.3 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="rounded-full border border-[#b87333]"
        />
      </motion.div>
      
      {/* Hide default cursor */}
      <style>{`
        * { cursor: none !important; }
        @media (hover: none) {
          * { cursor: auto !important; }
        }
      `}</style>
    </>
  );
}