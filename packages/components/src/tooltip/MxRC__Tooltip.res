open MxRC__React
open MxRC__Utils
open MxRC__ConfigProvider.ConfigContext
open MxWebapi__Dom

module ToolipContent = {
  @react.component @genType
  let make = (~id, ~content, ~target: Js.Nullable.t<Dom.element>) => {
    let divRef = React.useRef(Js.Nullable.null)

    React.useEffect1(() => {
      switch (divRef.current->Js.Nullable.toOption, target->Js.Nullable.toOption) {
      | (Some(source), Some(target)) => {
          "render"->Js.log3(source, target)
          source->DomMover.align(target, ~points=(#cc, #cc), ())->ignore
        }
      | (_, _) => ()
      }

      None
    }, [target])

    <div id>
      <div ref={divRef->ReactDOM.Ref.domRef} style={ReactDOM.Style.make(~position="absolute", ())}>
        {React.string(content)}
      </div>
    </div>
  }
}

@react.component @genType
let make = (~title=?, ~children: React.element) => {
  let idRef = React.useRef(nanoid())
  let (target, setTarget) = React.useState(_ => Js.Nullable.null)
  let getContainer = getPartalContainer

  let partal =
    <Partal getContainer>
      <ToolipContent id={idRef.current} target content={title->Belt.Option.getWithDefault("")} />
    </Partal>

  let children = React.cloneElement(children, {"ref": setTarget})

  <> partal children </>
}
