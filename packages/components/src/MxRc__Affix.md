# Affix

```jsx
import * as React from 'react'
import { Affix } from '@mxcins/components'

      // <Affix offsetTop={20} target={() => target}>
      //   <button>button top</button>
      // </Affix>

export default () => {
  const [target, set] = React.useState(null);
  const [height, setHeight] = React.useState(180);

  return (
    <div style={{ display: 'flex' }}>
      <div ref={set} style={{ width: 200, height: 200, background: 'gray', overflow: 'scroll' }}>
        <div style={{ height, background: 'red' }} />
        <Affix offsetBottom={20} target={() => target}>
          <button>button bottom</button>
        </Affix>
        <div style={{ height: 2000 }} />
      </div>
      <div>
        <button onClick={() => setHeight(prev => prev + 10)}>plus 10</button>
        <button onClick={() => setHeight(prev => prev - 10)}>substruct 10</button>
      </div>
    </div>
  )
}
```