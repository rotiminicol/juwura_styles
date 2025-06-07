import { type Variants } from 'framer-motion';

export const fadeInUp: Variants = {
  initial: {
    opacity: 0,
    y: 60,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

export const fadeIn: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.6,
    },
  },
};

export const slideInRight: Variants = {
  initial: {
    x: '100%',
  },
  animate: {
    x: 0,
    transition: {
      duration: 0.3,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
  exit: {
    x: '100%',
    transition: {
      duration: 0.3,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

export const slideInLeft: Variants = {
  initial: {
    x: '-100%',
  },
  animate: {
    x: 0,
    transition: {
      duration: 0.3,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
  exit: {
    x: '-100%',
    transition: {
      duration: 0.3,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

export const scaleIn: Variants = {
  initial: {
    scale: 0.9,
    opacity: 0,
  },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
  exit: {
    scale: 0.9,
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
};

export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const floatAnimation: Variants = {
  initial: {
    y: 0,
  },
  animate: {
    y: [-20, 0, -20],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

export const buttonPress: Variants = {
  initial: {
    scale: 1,
  },
  whileHover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
    },
  },
  whileTap: {
    scale: 0.95,
    transition: {
      duration: 0.1,
    },
  },
};

export const cardHover: Variants = {
  initial: {
    y: 0,
    scale: 1,
  },
  whileHover: {
    y: -10,
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};
