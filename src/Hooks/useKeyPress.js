import { useEffect, useRef } from 'react';

function useKeyPress(targetKey, callback) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  });

  useEffect(() => {
    function handle(event) {
      if (event.code === targetKey) {
        callbackRef.current(event);
      }
    }
    window.addEventListener('keyup', handle);

    return () => window.removeEventListener('keyup', handle);
  }, [targetKey]);
}

export default useKeyPress;
