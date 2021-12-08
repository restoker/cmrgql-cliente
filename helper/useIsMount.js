import { useEffect, useRef } from "react";


export const useIsMount = () => {
    const isMountRef = useRef(true);
    useEffect(() => {
      isMountRef.current = false;
    }, []);
    return isMountRef.current;
  };

//   Leer: 
/** 
 * Esta funcion evita que un useffect se ejecute la primera vez del renderizado del
 * componente
 * Utilizacion: 
 * ##### importamos la funcion 
 * import { useIsMount } from './useIsMount';
 * ##### luego, ejecutamos la funcion dentro del componente:
 * const MyComponent = () => {
  const isMount = useIsMount(); // <--- ejecutamos la funcion

  useEffect(() => {
    if (isMount) {   // <--- el resultado de ejecutar la funcion dentro del effect que queremos evitar que al montar el componente la primera vez, este se ejecute      
      console.log('Primer Render');
    } else {
      console.log('Subsequent Render');
    }
  });

  return isMount ? <p>First Render</p> : <p>Subsequent Render</p>;
};
 * 

referencia: https://stackoverflow.com/questions/53179075/with-useeffect-how-can-i-skip-applying-an-effect-upon-the-initial-render
*/