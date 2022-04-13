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

external toString: {..} => string = "%identity"
external toAny: 'before => 'any = "%identity"
external dictToJsObj: Js.Dict.t<_> => Js.t<{..}> = "%identity"

let width = {
  let width: array<(string, string)> = []
  for i in 1 to 24 {
    width
    ->Js.Array2.push((
      `${i->Js.Int.toString}/24`,
      (i->Js.Int.toFloat /. 24.0 *. 100.0)->Js.Float.toFixedWithPrecision(~digits=6) ++ "%",
    ))
    ->ignore
  }
  width->Js.Dict.fromArray
}

let colors = {
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
  "--color-warning": colors["gold"]["primary"],
  "--color-warning-hover": colors["gold"]["4"],
  "--color-warning-active": colors["gold"]["6"],
  "--color-warning-outline": colors["gold"]["1"],
  "--color-error": colors["red"]["primary"],
  "--color-error-hover": colors["red"]["4"],
  "--color-error-active": colors["red"]["6"],
  "--color-error-outline": colors["red"]["1"],
}

let assignWithDefault = (o, i) => Js.Obj.empty()->Js.Obj.assign(i)->Js.Obj.assign(o)

let find = %raw("function get(o, properties) {
  if (properties.length) {
    const k = properties.shift();
    const current = o[k];
    if (typeof current !== 'object') {
      return {}
    }
    return get(current, properties);
  }
  return o;
}")

let conf = (override: option<{..}>) => {
  let override = override->Belt.Option.getWithDefault(Js.Obj.empty())
  {
    "darkMode": override["darkMode"]->Belt.Option.getWithDefault("class"),
    "plugins": {"content": content},
    "preflight": override
    ->find(["preflight"])
    ->assignWithDefault({
      ":root": colors,
      "button:focus": {"outline": "0"},
      ":focus-visible": {"outline": "0"},
      /* ------ 2022-03-10 12:00:12 默认的 middle 会影响 anticon的样式  ------ */
      "svg": {"vertical-align": "initial"},
      /* ------ 2022-03-10 12:00:12 默认的 middle 会影响 anticon的样式  ------ */
    }),
    "theme": {
      "content": override
      ->find(["theme", "content"])
      ->assignWithDefault({
        "empty": "\"\"",
        "colon": "\":\"",
        "asterisk": "\"*\"",
      }),
      "screens": {
        "sm": "576px",
        "md": "768px",
        "lg": "992px",
        "xl": "1200px",
        "2xl": "1600px",
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
        "warning": {
          "DEFAULT": "var(--color-warning)",
          "hover": "var(--color-warning-hover)",
          "active": "var(--color-warning-active)",
          "outline": "var(--color-warning-outline)",
        },
        "error": {
          "DEFAULT": "var(--color-error)",
          "hover": "var(--color-error-hover)",
          "active": "var(--color-error-active)",
          "outline": "var(--color-error-outline)",
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
          "split": "rgba(0,0,0,.06)",
        },
      },
      "fontSize": {
        "xs": ["0.75rem", {"lineHeight": "1rem"}->toString],
        "sm": ["0.875rem", {"lineHeight": "1.375rem"}->toString],
        "base": ["1rem", {"lineHeight": "1.5rem"}->toString],
        "lg": ["1.125rem", {"lineHeight": "1.75rem"}->toString],
        "xl": ["1.25rem", {"lineHeight": "1.75rem"}->toString],
      },
      "padding": %raw("
      theme => {
        const spacing = theme('spacing');
        const padding = {
          ...spacing,
          '2-bordered': `calc(${spacing[2]} - 1px)`,
          '3-bordered': `calc(${spacing[3]} - 1px)`,
          '4-bordered': `calc(${spacing[4]} - 1px)`,
          'y6-bordered': `calc(${spacing[3]} - 0.5rem - 1px)`,
          'y8-bordered': `calc(${spacing[4]} - 0.6875rem - 1px)`,
          'y10-bordered': `calc(${spacing[5]} - 0.75rem - 1px)`,
        };
        return padding;
      }
    "),
      "width": (
        theme => {
          let w =
            Js.Obj.empty()
            ->Js.Obj.assign(theme(. "spacing"))
            ->Js.Obj.assign(width->dictToJsObj)
            ->Js.Obj.assign({
              "auto": "auto",
              "full": "100%",
              "screen": "100vw",
              "min": "min-content",
              "max": "max-content",
            })
          w
        }
      )->toAny,
      "minWidth": %raw("theme => theme('width')"),
      "minHeight": %raw("theme => theme('height')"),
      "boxShadow": {
        "none": "none",
        "input-focus": "0 0 0 2px var(--color-primary-outline)",
        "input-focus-warning": "0 0 0 2px var(--color-warning-outline)",
        "input-focus-error": "0 0 0 2px var(--color-error-outline)",
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
      "transitionTimingFunction": {
        "DEFAULT": "ease",
      },
      "transitionDuration": {
        "DEFAULT": "300ms",
      },
    },
  }
}
