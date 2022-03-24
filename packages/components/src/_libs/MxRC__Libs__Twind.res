type applyreturned = unit => unit

// @module("./__twind.js") @val
// external conf: {..} = "conf"

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

let background = {
  open MxRC__Colord
  HSV.make(~h=0, ~s=0.0, ~v=0.96, ())->hsv2rgb->RGB.toS
}

"colors"->Js.log2(colors)

// "disabled"->Js.log2(disabled)
external asString: {..} => string = "%identity"

let conf = {
  "darkMode": "class",
  "plugins": {"content": content},
  "preflight": {
    ":root": {
      "--color-primary": colors["blue"]["primary"],
      "--color-primary-hover": colors["blue"]["4"],
      "--color-primary-active": colors["blue"]["6"],
      "--color-danger": colors["red"]["primary"],
      "--color-danger-hover": colors["red"]["4"],
      "--color-danger-active": colors["red"]["6"],
      "--color-link": colors["blue"]["primary"],
      "--color-link-hover": colors["blue"]["4"],
      "--color-link-active": colors["blue"]["6"],
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
        "disabled": "rgba(0, 0, 0, 0.25)",
      },
      "background": {
        // "DEFAULT": background,
        "disabled": background,
      },
      "border": {
        "DEFAULT": {
          open MxRC__Colord
          HSV.make(~h=0, ~s=0.0, ~v=0.85, ~a=0.5, ())->hsv2rgb->RGB.toS
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
        console.log('spacing', spacing);
        return {
          ...spacing,
          '4-bordered': `calc(${spacing[4]} - 1px)`,
        };
      }
    "),
    "minWidth": %raw("theme => theme('width')"),
  },
}
