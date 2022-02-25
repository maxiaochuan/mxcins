# Affix

```jsx
/**
 * title: 基础使用
 */
import * as React from 'react'
import { Affix } from '@mxcins/components'

export default () => {
  return (
    <div style={{ display: 'flex' }}>
      <Affix offsetTop={50}>
        <button>button offset top 50</button>
      </Affix>
    </div>
  )
}
```

<!-- ```jsx
import * as React from 'react'
import { Affix } from '@mxcins/components'

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
``` -->

```jsx
import * as React from 'react'

export default () => {
  return (
    <div style={{ display: 'flex', height: 500 }} />
  )
}
```