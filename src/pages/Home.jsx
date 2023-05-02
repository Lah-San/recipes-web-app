import React from 'react'
// Imports
import Popular from '../components/Popular';
import { motion } from 'framer-motion';
import DynamicRecipes from './DynamicRecipes';
import Veggie from '../components/Veggie';
import Recomended from './Recomended';

function Home() {
  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
        <DynamicRecipes/>
        <Popular/>
        <Veggie/>
        <Recomended/>
    </motion.div>
  )
}

export default Home