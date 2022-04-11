open MxRC__React
open MxRC__Utils
open MxRC__ConfigProvider.ConfigContext
open MxWebapi__Dom

type top = [#top | #topLeft | #topRight]
type bottom = [#bottom | #bottomLeft | #bottomRight]
type left = [#left | #leftTop | #leftBottom]
type right = [#right | #rightTop | #rightBottom]

type placement = [top | bottom | left | right]

module Twind = {
  open MxRC__Twind
  let makeContent = () => {
    let classes = ["block pb-3 z-50"]
    classes->atw
  }
  let makeTextContent = () => {
    let classes = ["bg(black opacity-75) text-white px-2 py-1.5"]
    classes->atw
  }

  let makeArrow = (~placement) => {
    let classes = ["absolute w-5 h-5 -translate-y-2/4"]
    let push = classes->Js.Array2.push

    switch placement {
    | #...top => "-bottom-2.5"->push->ignore
    | _ => ()
    }
    classes->atw
  }

  let makeArrowContent = () => {
    let classes = [
      "
      block absolute inset-0 content-empty w-3 h-3 m-auto rotate-45
      before::(block absolute -top-3, -bottom-4 content-empty)
    ",
    ]
    let push = classes->Js.Array2.push
    css({
      "background": "inear-gradient(to left,rgba(0, 0, 0, 0.75) 50%,rgba(0, 0, 0, 0.75) 50%) no-repeat -10px -10px;",
    })
    ->push
    ->ignore

    classes->atw
  }
}

module ToolipContent = {
  @react.component @genType
  let make = (~id, ~content, ~placement, ~target: Js.Nullable.t<Dom.element>) => {
    let divRef = React.useRef(Js.Nullable.null)

    let points = switch placement {
    | #top => (#bc, #tc)
    | #topLeft => (#bl, #tl)
    | #topRight => (#br, #tr)
    | _ => (#cc, #cc)
    }

    React.useEffect1(() => {
      switch (divRef.current->Js.Nullable.toOption, target->Js.Nullable.toOption) {
      | (Some(source), Some(target)) => {
          "render"->Js.log3(source, target)
          source->DomMover.align(target, ~points, ())->ignore
        }
      | (_, _) => ()
      }

      None
    }, [target])

    <div id>
      <div
        ref={divRef->ReactDOM.Ref.domRef}
        style={ReactDOM.Style.make(~position="absolute", ())}
        className={Twind.makeContent()}>
        <div className={Twind.makeArrow(~placement)}>
          <span className={Twind.makeArrowContent()} />
        </div>
      </div>
    </div>
  }
}

// <div className={Twind.makeTextContent()}>{React.string(content)}</div>

@react.component @genType
let make = (~title=?, ~placement=#top, ~children: React.element) => {
  let idRef = React.useRef(nanoid())
  let (target, setTarget) = React.useState(_ => Js.Nullable.null)
  let getContainer = getPartalRoot

  let partal =
    <Partal getContainer>
      <ToolipContent
        placement id={idRef.current} target content={title->Belt.Option.getWithDefault("")}
      />
    </Partal>

  let children = React.cloneElement(children, {"ref": setTarget})

  <> partal children </>
}
