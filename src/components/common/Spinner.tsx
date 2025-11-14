import React from "react";
import { motion } from "framer-motion";

interface SpinnerProps {
  size?: number;
  color?: string;
}

const Spinner: React.FC<SpinnerProps> = ({
  size = 24,
  color = "text-harubang-blue",
}) => {
  return (
    <motion.div
      style={{
        width: size,
        height: size,
        borderTop: `2px solid`,
        borderRight: `2px solid`,
        borderRadius: "50%",
      }}
      className={`animate-spin ${color} border-current border-solid`}
      animate={{ rotate: 360 }}
      transition={{
        repeat: Infinity,
        ease: "linear",
        duration: 1,
      }}
    />
  );
};

export default Spinner;
