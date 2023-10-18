import React from 'react'
import '../scss/games.scss'
import {motion} from 'framer-motion';
const Games = () => {
  return (
    <div className="games">
       <motion.h2 initial={{x:-200}} viewport={{once:true}} whileInView={{x:0}} transition={{duration:0.7 , type:"Spring" , bounce:0.4}}>Fun Time Games</motion.h2>
    </div>
  )
}

export default Games