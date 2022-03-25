type applyreturned = unit => unit

@module("twind")
external setup: {..} => unit = "setup"
@module("twind")
external tw: 'a => string = "tw"
@module("twind")
external apply: array<string> => applyreturned = "apply"
@module("twind/css")
external css: {..} => string = "css"
@module("twind/css")
external rawCss: string => string = "css"
@module("@twind/content")
external content: string = "content"
@module("@ant-design/colors")
external colors: {..} = "presetPalettes"

let atw = (~class: option<string>=?, classes: array<string>) =>
  switch class {
  | Some(c) => [classes->apply->tw, c]->Js.Array2.joinWith(" ")
  | _ => classes->apply->tw
  }

let background = {
  open MxRC__Colord
  HSV.make(~h=0, ~s=0.0, ~v=0.96, ())->hsv2rgb->RGB.toS
}

external asString: {..} => string = "%identity"

let conf = {
  "darkMode": "class",
  "plugins": {"content": content},
  "preflight": {
    ":root": {
      "--color-primary": colors["blue"]["primary"],
      "--color-primary-hover": colors["blue"]["4"],
      "--color-primary-active": colors["blue"]["6"],
      "--color-primary-outline": colors["blue"]["1"],
      "--color-danger": colors["red"]["primary"],
      "--color-danger-hover": colors["red"]["4"],
      "--color-danger-active": colors["red"]["6"],
      "--color-link": colors["blue"]["primary"],
      "--color-link-hover": colors["blue"]["4"],
      "--color-link-active": colors["blue"]["6"],
    },
    "button:focus": {"outline": "0"},
    ":focus-visible": {"outline": "0"},
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
      "transparent": "transparent",
      "white": "#fff",
      "black": "#000",
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
      "link": {
        "DEFAULT": "var(--color-link)",
        "hover": "var(--color-link-hover)",
        "active": "var(--color-link-active)",
      },
      "text": {
        "DEFAULT": "rgba(0, 0, 0, .85)",
        "secondary": "rgba(0, 0, 0, .45)",
        "disabled": "rgba(0, 0, 0, 0.25)",
      },
      "background": {
        "DEFAULT": background,
        "disabled": background,
      },
      "border": {
        "DEFAULT": {
          open MxRC__Colord
          HSV.make(~h=0, ~s=0.0, ~v=0.85, ())->hsv2rgb->RGB.toS
        },
      },
    },
    "fontSize": {
      "xs": ["0.75rem", {"lineHeight": "1rem"}->asString],
      "sm": ["0.875rem", {"lineHeight": "1.375rem"}->asString],
      "base": ["1rem", {"lineHeight": "1.5rem"}->asString],
      "lg": ["1.125rem", {"lineHeight": "1.75rem"}->asString],
      "xl": ["1.25rem", {"lineHeight": "1.75rem"}->asString],
    },
    "padding": %raw("
      theme => {
        const spacing = theme('spacing');
        return {
          ...spacing,
          '2-bordered': `calc(${spacing[2]} - 1px)`,
          '3-bordered': `calc(${spacing[3]} - 1px)`,
          '4-bordered': `calc(${spacing[4]} - 1px)`,
        };
      }
    "),
    "minWidth": %raw("theme => theme('width')"),
    // boxShadow: {
    //   sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    //   DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    //   md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    //   lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    //   xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    //   '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    //   inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    //   none: 'none',
    // },
    "boxShadow": {
      "input-focus": "0 0 0 2px var(--color-primary-outline)",
    },
    "zIndex": {
      "auto": "auto",
      "0": "0",
      "1": "1",
      "10": "10",
      "20": "20",
      "30": "30",
      "40": "40",
      "50": "50",
    },
  },
}
