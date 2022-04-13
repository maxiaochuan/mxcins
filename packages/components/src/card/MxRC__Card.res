module Config = MxRC__ConfigProvider.ConfigContext

module Twind = {
  open MxRC__Twind
  let make = (class, ~bordered) => {
    let classes = []
    let push = classes->Js.Array2.push

    if bordered {
      "border(1 solid border-split) rounded-sm"->push->ignore
    }

    classes->atw(~class?)
  }

  let makeHead = (~size) => {
    let classes = ["border(b-1 solid border-split) rounded-sm"]
    let push = classes->Js.Array2.push

    switch size {
    | #default => "px-5 text-base"->push->ignore
    | #small => "px-3 text-sm"->push->ignore
    | #large => "px-5 text-base"->push->ignore
    }

    classes->atw
  }

  let makeHeadContent = () => {
    ["flex items-center"]->atw
  }

  let makeTitle = (~size) => {
    let classes = ["flex-1 font-medium"]
    let push = classes->Js.Array2.push

    switch size {
    | #default => "py-3"->push->ignore
    | #small => "py-1"->push->ignore
    | #large => "py-3"->push->ignore
    }

    classes->atw
  }

  let makeExtra = () => {
    []->atw
  }

  let makeBody = (~size) => {
    let classes = []
    let push = classes->Js.Array2.push

    switch size {
    | #default => "p-5"->push->ignore
    | #small => "p-3"->push->ignore
    | #large => "p-5"->push->ignore
    }

    classes->atw
  }
}

@react.component @genType
let make = (
  ~className=?,
  ~style=?,
  ~bodyStyle=?,
  ~size=?,
  ~title=?,
  ~bordered=true,
  ~children=?,
) => {
  // size
  let size = size->Config.useSizeConfig

  let children = children->Belt.Option.getWithDefault(React.null)

  let className = className->Twind.make(~bordered)

  let head = switch title {
  | Some(title) => <div className={Twind.makeHead(~size)}>
      <div className={Twind.makeHeadContent()}>
        <div className={Twind.makeTitle(~size)}> {title->React.string} </div>
      </div>
    </div>
  | _ => React.null
  }

  <div className ?style>
    head <div className={Twind.makeBody(~size)} style=?bodyStyle> children </div>
  </div>
}
