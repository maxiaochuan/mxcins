import * as React from 'react';
import { SingleResizeObserver, SingleBreakpointPublisher } from '@mxcins/webapi';

export default () => {
  const divRef = React.useRef(null);

  React.useEffect(() => {
    let listener: SingleResizeObserver.ResizeListenerType = args => {
        // console.log('resize', args)
        // console.log('resize', args.target === divRef.current)
      }
    if (divRef.current) {
      SingleResizeObserver.observe(divRef.current, listener)
    }

    let id = SingleBreakpointPublisher.subscribe(args => {
      console.log('args', args)
    })

    return () => {
      if (divRef.current) {
        SingleResizeObserver.unobserve(divRef.current, listener)
      }

      SingleBreakpointPublisher.unsubscribe(id)
    }
  }, []);

  return (
    <>
      LIBS
      <div ref={divRef}>div</div>
    </>
  );
};
