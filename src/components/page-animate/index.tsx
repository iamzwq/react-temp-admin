import type { PropsWithChildren } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function PageAnimate({ children }: PropsWithChildren) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        transition={{ duration: 0.4 }}
        className="h-full flex flex-col"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
