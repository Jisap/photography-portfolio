import React, { useState, useEffect, createContext } from 'react';

// create context
export const CursorContext = createContext();

const CursorProvider = ({ children }) => {

  // cursor position state
  const [cursorPos, setCursorPos] = useState({        // Estado para la posición del cursor
    x: 0,
    y: 0,
  });

  // cursor bg state
  const [cursorBG, setCursorBG] = useState('default'); // Estado para el tipo de animación del cursor

  const mobileViewportIsActive = window.innerWidth < 768;

  useEffect(() => {
    if (!mobileViewportIsActive) {  // Si no estamos en movil establecemos estado de posición del cursor.
      
      const move = (e) => {
        setCursorPos({ 
          x: e.clientX, 
          y: e.clientY
        })
      }

    window.addEventListener('mousemove', move); // A la escucha del evento mousemove, cuando se dispara se establece estado para la posición del cursor
    
    //remove event
    return () => {
      window.removeEventListener('mousemove', move); // Borramos el evento para evitar que se sume.
    }
  }else{
    setCursorBG('none') // Si estamos en movil no establecemos animación del cursor. 
  }

  });

  //cursor variants
  const cursorVariants = {          //Definen el estado de la animación organizado por nombres de

    default: {
      x: cursorPos.x - 16,
      y: cursorPos.y - 16,
      backgroundColor: '#0e1112',   // Default cambia el color en la posición del cursor
    },
    text: {                         // Text cambia
      width: '150px',               // el ancho
      height: '150px',              // el alto
      x: cursorPos.x - 72,          // en la posición del cursor
      y: cursorPos.y - 72,
      backgroundColor: '#fff',      // El color de fondo a negro
      mixBlendMode: 'difference',   // y hace el negativo de donde se aplica.
    },
    none: {
      width: 0,
      height: 0,
      backgroundColor: 'rgba(255,255,255, 1)',
    },
  };

  // mouse enter handler
  const mouseEnterHandler = () => { // En donde se aplica establece el cursor lupa y negativo
    setCursorBG('text');
  };
  // mouse leaver handler
  const mouseLeaveHandler = () => { // En donde se aplica estable el cursor  solo a circulo negro
    setCursorBG('default');
  };

  return (
    <CursorContext.Provider
      value={{ cursorVariants, cursorBG, mouseEnterHandler, mouseLeaveHandler }}  
    >
      { children }
    </CursorContext.Provider>
  );
};

export default CursorProvider;
