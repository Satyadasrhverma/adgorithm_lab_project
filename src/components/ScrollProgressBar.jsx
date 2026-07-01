import { useScroll, motion } from 'framer-motion'

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()
  return (
    <motion.div
      className="scroll-progress-bar"
      style={{ scaleX: scrollYProgress }}
    />
  )
}
