open MxRC__React
open MxRC__Utils
open MxWebapi__Dom

type top = [#top | #topLeft | #topRight]
type bottom = [#bottom | #bottomLeft | #bottomRight]
type left = [#left | #leftTop | #leftBottom]
type right = [#right | #rightTop | #rightBottom]

type placement = [top | bottom | left | right]

module Twind = {
  open MxRC__Twind
  let makeContent = (~placement, ~visible) => {
    let classes = ["block pointer-events-none"]
    let push = str => classes->Js.Array2.push(str)->ignore
    switch placement {
    | #...top => "pb-3"->push
    | #...bottom => "pt-3"->push
    | #...left => "pr-3"->push
    | #...right => "pl-3"->push
    | _ => ()
    }

    if !visible {
      "hidden"->push
    }

    classes->atw
  }
  let makeTextContent = () => {
    let classes = ["bg(black opacity-75) text-white px-2 py-1"]
    classes->atw
  }

  let arrowWidth = 6.0 *. Js.Math.sqrt(2.0)
  let arrowRotateWidth = Js.Math.sqrt(arrowWidth *. arrowWidth *. 2.0)

  let makeArrow = (~placement) => {
    let classes = ["absolute w-[22px] h-[22px] overflow-hidden pointer-events-none"]
    let push = classes->Js.Array2.push

    switch placement {
    | #...top => " -translate-y-2/4 bottom-[-21px]"->push->ignore
    | #...bottom => "-translate-y-2/4 top-[1px] rotate-180"->push->ignore
    | #...left => "-rotate-90 right-[-10px]"->push->ignore
    | #...right => "rotate-90 left-[-10px]"->push->ignore
    | _ => ()
    }
    switch placement {
    | #top => "left-1/2 -translate-x-2/4"->push->ignore
    | #topRight => "right-0"->push->ignore
    | #bottom => "left-1/2 -translate-x-2/4"->push->ignore
    | #bottomRight => "right-0"->push->ignore
    | #left => "top-1/2 -translate-y-2/4"->push->ignore
    | #leftBottom => "bottom-0"->push->ignore
    | #right => "top-1/2 -translate-y-2/4"->push->ignore
    | #rightBottom => "bottom-0"->push->ignore
    | _ => ()
    }
    classes->atw
  }

  let makeArrowContent = () => {
    let classes = [
      "block absolute inset-0 m-auto rotate-45 pointer-events-none before::(block absolute content-empty)",
    ]
    let push = classes->Js.Array2.push

    css({
      "width": arrowWidth->Js.Float.toString ++ "px",
      "height": arrowWidth->Js.Float.toString ++ "px",
      "--tw-translate-y": "-" ++ arrowWidth->Js.Float.toString ++ "px",
      "--tw-translate-x": "0",
      "&::before": {
        "top": "-" ++ arrowWidth->Js.Float.toString ++ "px",
        "left": "-" ++ arrowWidth->Js.Float.toString ++ "px",
        "width": (arrowWidth *. 3.0)->Js.Float.toString ++ "px",
        "height": (arrowWidth *. 3.0)->Js.Float.toString ++ "px",
        "background": "linear-gradient(to left,rgba(0, 0, 0, 0.75) 50%,rgba(0, 0, 0, 0.75) 50%) no-repeat -10px -10px",
      },
    })
    ->push
    ->ignore

    classes->atw
  }
}

module ToolipContent = {
  @react.component @genType
  let make = (
    ~id,
    ~content,
    ~visible,
    ~placement: placement,
    ~target: Js.Nullable.t<Dom.element>,
  ) => {
    let divRef = React.useRef(Js.Nullable.null)

    let points = switch placement {
    | #top => (#bc, #tc)
    | #topLeft => (#bl, #tl)
    | #topRight => (#br, #tr)
    | #bottom => (#tc, #bc)
    | #bottomLeft => (#tl, #bl)
    | #bottomRight => (#tr, #br)
    | #left => (#cr, #cl)
    | #leftTop => (#tr, #tl)
    | #leftBottom => (#br, #bl)
    | #right => (#cl, #cr)
    | #rightTop => (#tl, #tr)
    | #rightBottom => (#bl, #br)
    }

    React.useEffect1(() => {
      switch (divRef.current->Js.Nullable.toOption, target->Js.Nullable.toOption) {
      | (Some(source), Some(target)) => source->DomMover.align(target, ~points, ())->ignore
      | (_, _) => ()
      }

      None
    }, [target])

    <div id>
      <div
        ref={divRef->ReactDOM.Ref.domRef}
        style={ReactDOM.Style.make(~position="absolute", ())}
        className={Twind.makeContent(~placement, ~visible)}>
        <div className={Twind.makeArrow(~placement)}>
          <span className={Twind.makeArrowContent()} />
        </div>
        <div className={Twind.makeTextContent()}> {React.string(content)} </div>
      </div>
    </div>
  }
}

@react.component @genType
let make = (~title="", ~placement: placement=#top, ~children: React.element) => {
  let idRef = React.useRef(nanoid())
  let (target, set) = React.useState(_ => Js.Nullable.null)
  let (visible, setVisible) = React.useState(_ => false)
  let isRendered = React.useRef(false)
  isRendered.current = isRendered.current === true ? true : visible
  let getContainer = MxRC__ConfigProvider.ConfigContext.getPartalRoot

  let partal = isRendered.current
    ? <Partal getContainer>
        <ToolipContent
          visible
          placement
          id=idRef.current
          target
          content=title
        />
      </Partal>
    : React.null

  let onMouseEnter = React.useCallback0(_ => {
    setVisible(_ => true)
  })

  let onMouseLeave = React.useCallback0(_ => {
    setVisible(_ => false)
  })

  let children = React.cloneElement(
    children,
    {
      "ref": set,
      "onMouseEnter": onMouseEnter,
      "onMouseLeave": onMouseLeave,
    },
  )

  <> partal children </>
}