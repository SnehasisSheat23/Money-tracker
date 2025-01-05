import { motion } from 'framer-motion';

export function LoadingAnimation() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex justify-center items-center min-h-[200px]"
    >
      <div className="flex space-x-4">
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className="text-2xl font-bold text-blue-600"
            animate={{
              y: [-12, 0, -12],
              opacity: [0.6, 1, 0.6],
              scale: [1, 1.3, 1],
              rotate: [0, 10, 0]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: index * 0.3,
              ease: "easeInOut"
            }}
          >
            $
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
