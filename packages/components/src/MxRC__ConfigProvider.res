open MxLibs

module ConfigContext = {
  type size = [#default | #small | #large]
  type context = {size: size}

  let ctx = React.createContext({size: #default})

  module Provider = {
    let provider = React.Context.provider(ctx)
    @react.component
    let make = (~value: context, ~children) => {
      React.createElement(provider, {"value": value, "children": children})
    }
  }
}

let init = () =>
  MxRC__Libs__Twind.setup({
    "theme": {
      "colors": {
        "initial": "initial",
        "inherit": "inherit",
        "text": {
          "DEFAULT": "rgba(0, 0, 0, .85)",
        },
        "primary": {
          "DEFAULT": "var(--color-primary)",
          "hover": "var(--color-primary-hover)",
          "active": "var(--color-primary-active)",
        },
        "danger": {
          "DEFAULT": "var(--color-danger)",
          "hover": "var(--color-danger-hover)",
          "active": "var(--color-danger-active)",
        },
      },
      "transitionTimingFunction": {
        "DEFAULT": "cubic-bezier(.645,.045,.355,1)",
      },
      "fontSize": {
        "base": %raw("['14px', { 'lineHeight': '22px' }]"),
        // xs: ['0.75rem', { lineHeight: '1rem' }],
        // sm: ['0.875rem', { lineHeight: '1.25rem' }],
        // base: ['1rem', { lineHeight: '1.5rem' }],
        // lg: ['1.125rem', { lineHeight: '1.75rem' }],
        // xl: ['1.25rem', { lineHeight: '1.75rem' }],
        // '2xl': ['1.5rem', { lineHeight: '2rem' }],
        // '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        // '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        // '5xl': ['3rem', { lineHeight: '1' }],
        // '6xl': ['3.75rem', { lineHeight: '1' }],
        // '7xl': ['4.5rem', { lineHeight: '1' }],
        // '8xl': ['6rem', { lineHeight: '1' }],
        // '9xl': ['8rem', { lineHeight: '1' }],
      },
      "extend": {
        "colors": MxRC__Libs__Twind.colors,
      },
    },
  })

init()

type some = {
  base: string,
  hover: string,
  active: string,
}

type colors = {primary: some, danger: some}

%%private(let b = MxRC__Libs__Twind.colors["blue"])
%%private(let r = MxRC__Libs__Twind.colors["red"])

let colors = {
  primary: {
    base: b["500"],
    hover: b["400"],
    active: b["600"],
  },
  danger: {
    base: r["500"],
    hover: r["400"],
    active: r["600"],
  },
}

let style = `
:root {
  --color-primary: ${colors.primary.base};
  --color-primary-hover: ${colors.primary.hover};
  --color-primary-active: ${colors.primary.active};
  --color-danger: ${colors.danger.base};
  --color-danger-hover: ${colors.danger.hover};
  --color-danger-active: ${colors.danger.active};
}
button:focus {
  outline: 0;
}
`

@react.component
let make = (~size: ConfigContext.size=#default, ~children=React.null) => {
  React.useLayoutEffect(() => {
    open DOM
    open Document
    open Element
    let ele = document->createElement("style")
    ele->setInnerHTML(style)
    let head = document->querySelector("head")
    switch head {
    | Some(head) => head->appendChild(~child=ele)
    | _ => ()
    }
    None
  })

  let value = React.useMemo1(() => {
    let ctx: ConfigContext.context = {size: size}
    ctx
  }, [size])

  <> <ConfigContext.Provider value={value}> children </ConfigContext.Provider> </>
}
