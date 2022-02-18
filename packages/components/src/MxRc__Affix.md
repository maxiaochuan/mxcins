# Affix

```jsx
import * as React from 'react'
import { Affix } from '@mxcins/components'

export default () => {
  const [target, set] = React.useState();
  console.log('Affix', Affix)
  return (
    <div ref={set} style={{ width: 200, height: 200, background: 'gray' }}>
      <Affix offsetTop={20} target={() => target}>
        <button>button</button>
      </Affix>
    </div>
  )
}
```