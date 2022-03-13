import * as React from 'react';
import { SingleResizeObserver } from '@mxcins/webapi';

export default () => {
  const divRef = React.useRef(null);

  React.useEffect(() => {
    let listener: SingleResizeObserver.ResizeListenerType = args => {
        console.log('resize', args)
        console.log('resize', args.target === divRef.current)
      }
    if (divRef.current) {
      SingleResizeObserver.observe(divRef.current, listener)
    }

    () => {
      if (divRef.current) {
        SingleResizeObserver.unobserve(divRef.current, listener)
      }
    }
  }, []);

  return (
    <>
      LIBS
      <div ref={divRef}>div</div>
    </>
  );
};
