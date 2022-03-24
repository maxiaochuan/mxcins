module HSV = {
  type t = {h: int, s: float, v: float, a: float}
  /**
   * h: 0-360
   * s: 0-1
   * v: 0-1
   * a: 0-1
   */
  let make = (~h: int, ~s: float, ~v: float, ~a: option<float>=?, ()) => {
    let _h = ref(h)
    while _h.contents > 360 {
      _h := _h.contents - 360
    }

    while _h.contents < 0 {
      _h := _h.contents + 360
    }

    let _s = ref(s)
    while _s.contents > 1.0 {
      _s := 1.0
    }
    // 边界修正 0.06 @ant-design/ant-design-colors
    while _s.contents < 0.0 {
      _s := 0.0
    }

    let _v = ref(v)
    while _v.contents > 1.0 {
      _v := 1.0
    }
    while _v.contents < 0.0 {
      _v := 0.0
    }

    {h: _h.contents, s: _s.contents, v: v, a: a->Belt.Option.getWithDefault(1.0)}
  }
}

module RGB = {
  type t = {r: int, g: int, b: int, a: float}
  let make = (~r: int, ~g: int, ~b: int, ~a: option<float>) => {
    {r: r, g: g, b: b, a: a->Belt.Option.getWithDefault(1.0)}
  }

  let toS = c => {
    let name = c.a === 1.0 ? "rgb" : "rgba"
    let r = c.r->Belt.Int.toString
    let g = c.g->Belt.Int.toString
    let b = c.b->Belt.Int.toString
    let a = c.a === 1.0 ? "" : "," ++ c.a->Js.Float.toFixedWithPrecision(~digits=2)
    name ++ "(" ++ r ++ "," ++ g ++ "," ++ b ++ a ++ ")"
  }

  let toHEX = c => {
    let r = c.r->Js.Int.toStringWithRadix(~radix=16)
    let g = c.g->Js.Int.toStringWithRadix(~radix=16)
    let b = c.b->Js.Int.toStringWithRadix(~radix=16)
    let a = (c.a *. 255.0)->Belt.Float.toInt->Js.Int.toStringWithRadix(~radix=16)

    let r = r->Js.String2.length === 1 ? `0${r}` : r
    let g = g->Js.String2.length === 1 ? `0${g}` : g
    let b = b->Js.String2.length === 1 ? `0${b}` : b
    let a = a->Js.String2.length === 1 ? `0${a}` : a

    "#" ++ r ++ b ++ g ++ (a === "ff" ? "" : a)
  }
}

// https://en.wikipedia.org/wiki/HSL_and_HSV#HSV_to_RGB
let hsv2rgb = (hsv: HSV.t) => {
  let h = hsv.h->Belt.Int.toFloat
  let s = hsv.s
  let v = hsv.v

  let c = v *. s
  let hi = h /. 60.0
  let x = c *. (1 - (mod(hi->Belt.Float.toInt, 2) - 1))->Belt.Int.toFloat
  let (r1, g1, b1) = switch hi->Belt.Float.toInt {
  | 0 => (c, x, 0.0)
  | 1 => (x, c, 0.0)
  | 2 => (0.0, c, x)
  | 3 => (0.0, x, c)
  | 4 => (x, 0.0, c)
  | 5 => (c, 0.0, x)
  | _ => (0.0, 0.0, 0.0)
  }

  let m = v -. c

  // 2022-03-24 17:15:43 floor to round
  RGB.make(
    ~r=((r1 +. m) *. 255.0)->Js.Math.round->Belt.Float.toInt,
    ~g=((g1 +. m) *. 255.0)->Js.Math.round->Belt.Float.toInt,
    ~b=((b1 +. m) *. 255.0)->Js.Math.round->Belt.Float.toInt,
    ~a=hsv.a->Some,
  )
}
