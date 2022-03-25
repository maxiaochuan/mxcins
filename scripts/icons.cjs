const fs = require('fs');
const path = require('path');
const icons = require('@ant-design/icons');

const cwd = process.cwd();

const exclude = ['IconProvider'];

const keys = Object.keys(icons).filter(k => /^[A-Z]/.test(k) && !exclude.includes(k))

const make = name => `
module ${name} = {
  @module("@ant-design/icons") @react.component
  external make: (
    ~className:string=?,
    ~style: ReactDOM.style=?,
    ~onMouseUp: ReactEvent.Mouse.t => unit=?,
    ~onMouseDown: ReactEvent.Mouse.t => unit=?,
    ~onClick: ReactEvent.Mouse.t => unit=?,
  ) => React.element = "${name}"
}
`

const output = keys.map(k => make(k)).join("");
fs.writeFileSync(path.join(cwd, 'packages/components/src/_libs/MxRC__Libs__Antd.res'), output, 'utf-8');