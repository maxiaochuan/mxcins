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

type some = {
  base: string,
  hover: string,
  active: string,
}

type colors = {primary: some, link: some, danger: some}

%%private(let b = MxRC__Libs__Twind.colors["blue"])
%%private(let r = MxRC__Libs__Twind.colors["red"])

let colors = {
  primary: {
    base: b["500"],
    hover: b["400"],
    active: b["600"],
  },
  link: {
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

open Belt.Option

let init = (~primary: option<string>=?, ()) =>
  MxRC__Libs__Twind.setup({
    "plugins": {
      "content": MxRC__Libs__Twind.content,
    },
    "preflight": {
      ":root": {
        "--color-primary": primary->getWithDefault(colors.primary.base),
        "--color-primary-hover": colors.primary.hover,
        "--color-primary-active": colors.primary.active,
        "--color-link": colors.link.base,
        "--color-link-hover": colors.link.hover,
        "--color-link-active": colors.link.active,
        "--color-danger": colors.danger.base,
        "--color-danger-hover": colors.danger.hover,
        "--color-danger-active": colors.danger.active,
      },
      "button:focus": {"outline": "0"},
      /* ------ 2022-03-10 12:00:12 默认的 middle 会影响 anticon的样式  ------ */
      "svg": {"vertical-align": "initial"},
      /* ------ 2022-03-10 12:00:12 默认的 middle 会影响 anticon的样式  ------ */
    },
    "theme": {
      "content": {
        "empty": "\"\"",
      },
      "colors": {
        "initial": "initial",
        "inherit": "inherit",
        "transparent": "transparent",
        "text": {
          "DEFAULT": "rgba(0, 0, 0, .85)",
        },
        "link": {
          "DEFAULT": "var(--color-link)",
          "hover": "var(--color-link-hover)",
          "active": "var(--color-link-active)",
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
      "transitionProperty": {
        "width": "width",
        "opacity": "opacity",
      },
      "transitionTimingFunction": {
        "DEFAULT": "cubic-bezier(.645,.045,.355,1)",
      },
      "transitionDuration": {
        "DEFAULT": "300ms",
        "200": "200ms",
      },
      "fontSize": {
        "sm": %raw("['12px', { 'lineHeight': '20px' }]"),
        "base": %raw("['14px', { 'lineHeight': '22px' }]"),
        "lg": %raw("['16px', { 'lineHeight': '24px' }]"),
        "xl": %raw("['18px', { 'lineHeight': '26px' }]"),
        "2xl": %raw("['20px', { 'lineHeight': '28px' }]"),
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
      "minWidth": {
        "6": "1.5rem",
        "8": "2rem",
        "10": "2.5rem",
      },
      "maxWidth": {
        "6": "1.5rem",
        "8": "2rem",
        "10": "2.5rem",
      },
      "extend": {
        "colors": MxRC__Libs__Twind.colors,
      },
    },
  })

init()

open ConfigContext

@react.component @genType
let make = (~size=#default, ~children=React.null) => {
  let value = React.useMemo1(() => {size: size}, [size])

  <> <Provider value> children </Provider> </>
}
