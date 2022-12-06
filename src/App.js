import React, { useContext } from 'react';
// import components
import Header from './components/Header';
import AnimRoutes from './components/AnimRoutes';
// import router
import { BrowserRouter as Router } from 'react-router-dom';
// import motion
import { motion } from 'framer-motion';
// import cursor context
import { CursorContext } from './context/CursorContext';

const App = () => {

 const { cursorVariants, cursorBG } = useContext(CursorContext);

  return (
  <>
    <Router>
      <Header />
      <AnimRoutes />
    </Router>
     {/* cursor */}
      <motion.div
        variants={ cursorVariants } // Recibe el estado de las animaciones
        animate={ cursorBG }        // Recibe el estado de la animación que se aplica
        className='w-[32px] h-[32px] bg-primary fixed top-0 left-0 pointer-events-none z-50 rounded-full'
      ></motion.div>
  </>
  )
};

export default App;
