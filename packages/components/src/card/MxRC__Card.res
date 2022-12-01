module Config = MxRC__ConfigProvider.ConfigContext

module Twind = {
  open MxRC__Twind
  let make = (class, ~bordered, ~hoverable) => {
    let classes = []
    let push = classes->Js.Array2.push

    if bordered {
      "border(1 solid border-split) rounded-sm"->push->ignore
    }

    if hoverable {
      "cursor-pointer transition"->push->ignore

      "hover:(border-transparent shadow-card)"->push->ignore
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

  let makeHeadExtra = () => {
    ["flex-none flex items-center text-sm"]->atw
  }

  let makeHeadTitle = (~size) => {
    let classes = ["flex-1 font-medium"]
    let push = classes->Js.Array2.push

    switch size {
    | #default => "py-3"->push->ignore
    | #small => "py-1.5"->push->ignore
    | #large => "py-3"->push->ignore
    }

    classes->atw
  }

  let makeCover = (~bordered) => {
    let classes = []
    let push = classes->Js.Array2.push

    {"&>*": ["rounded-t-sm w-full block"]->apply}->css->push->ignore

    if bordered {
      "-mt-px -mr-px -ml-px"->push->ignore
    }

    classes->atw
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

  let makeActions = () => {
    let classes = []
    classes->atw
  }
}

@react.component @genType
let make = (
  ~className=?,
  ~style=?,
  ~headStyle=?,
  ~bodyStyle=?,
  ~size=?,
  ~title=?,
  ~extra=?,
  ~bordered=true,
  ~hoverable=false,
  ~cover=?,
  ~actions=?,
  ~children=?,
) => {
  // size
  let size = size->Config.useSizeConfig

  let className = className->Twind.make(~bordered, ~hoverable)

  let head = switch title {
  | Some(title) => {
      let title = <div className={Twind.makeHeadTitle(~size)}> {title->React.string} </div>

      let extra = switch extra {
      | Some(extra) => <div className={Twind.makeHeadExtra()}> extra </div>
      | None => React.null
      }

      <div className={Twind.makeHead(~size)} style=?headStyle>
        <div className={Twind.makeHeadContent()}>
          title
          extra
        </div>
      </div>
    }

  | _ => React.null
  }

  let cover = switch cover {
  | Some(cover) => <div className={Twind.makeCover(~bordered)}> cover </div>
  | None => React.null
  }

  let body = switch children {
  | Some(children) => <div className={Twind.makeBody(~size)} style=?bodyStyle> children </div>
  | None => React.null
  }

  let actions = switch actions {
  | Some(actions) =>
    switch actions->Js.Array2.length {
    | 0 => React.null
    | _ =>
      <ul className={Twind.makeActions()}>
        {actions->Js.Array2.map(action => <li> action </li>)->React.array}
      </ul>
    }
  | None => React.null
  }

  <div className ?style>
    head
    cover
    body
    actions
  </div>
}
