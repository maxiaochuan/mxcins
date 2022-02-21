open MxLibs

module AffixUtils = {
  type rect = {top: int, bottom: int, width: int, height: int}

  let getDomRect = (node: option<DOM.Element.t>) =>
    switch node {
    | Some(node) => {
        let rect = node->DOM.Element.getBoundingClientRect
        open Belt.Float
        {
          top: rect->DOM.DomRect.top->toInt,
          bottom: rect->DOM.DomRect.bottom->toInt,
          width: rect->DOM.DomRect.width->toInt,
          height: rect->DOM.DomRect.height->toInt,
        }
      }
    | None => {
        top: 0,
        bottom: DOM.window->DOM.Window.innerHeight,
        width: 0,
        height: 0,
      }
    }

  let getFixedTop = (~targetRect: rect, ~containerRect: rect, ~offsetTop: option<int>): option<
    int,
  > =>
    switch offsetTop {
    | Some(top) => targetRect.top > containerRect.top - top ? Some(top + targetRect.top) : None
    | _ => None
    }

  let getFixedBottom = (
    ~targetRect: rect,
    ~containerRect: rect,
    ~offsetBottom: option<int>,
  ): option<int> =>
    switch offsetBottom {
    | Some(bottom) =>
      targetRect.bottom < containerRect.bottom + bottom
        ? {
            let offset = DOM.window->DOM.Window.innerHeight - targetRect.bottom
            Some(bottom + offset)
          }
        : None
    | _ => None
    }
}

type fixedStyle = {
  position: string,
  top: string,
  bottom: string,
  width: string,
  height: string,
  zIndex: string,
}

type placeholderStyle = {
  width: string,
  height: string,
}

type state =
  | Fixed({fixed: fixedStyle, placeholder: placeholderStyle})
  | Unfixed

@react.component
let make = (
  ~offsetTop: option<int>=?,
  ~offsetBottom: option<int>=?,
  ~target as tar: option<unit => Js.nullable<DOM.Element.t>>=?,
  ~children: option<React.element>=?,
) => {
  let containerRef = React.useRef(Js.Nullable.null)
  let fixedRef = React.useRef(Js.Nullable.null)
  let updateRef = React.useRef(() => ())
  let (state, setState, _) = MxHooks.useGetState(_ => Unfixed)

  let initOffsetTop = switch offsetTop {
  | Some(top) => top
  | _ => 0
  }

  let target = switch tar {
  | Some(tar) => tar()->Js.Nullable.toOption
  | _ => None
  }

  React.useEffect3(() => {
    updateRef.current = Raf.throttle((_) => {
      switch containerRef.current->Js.Nullable.toOption {
      | Some(container) => {
          let targetRect = target->AffixUtils.getDomRect
          let containerRect = Some(container)->AffixUtils.getDomRect

          let fixedTop = AffixUtils.getFixedTop(
            ~targetRect,
            ~containerRect,
            ~offsetTop=Some(initOffsetTop),
          )

          let fixedBottom = AffixUtils.getFixedBottom(~targetRect, ~containerRect, ~offsetBottom)

          let next = switch (fixedTop, fixedBottom) {
          | (None, None) => Unfixed
          | (top, bottom) => {
              open Belt.Int
              Fixed({
                fixed: {
                  position: "fixed",
                  top: switch top {
                  | Some(top) => `${top->toString}px`
                  | _ => "initial"
                  },
                  bottom: switch bottom {
                  | Some(bottom) => `${bottom->toString}px`
                  | _ => "initial"
                  },
                  width: `${containerRect.width->toString}px`,
                  height: `${containerRect.height->toString}px`,
                  zIndex: "10",
                },
                placeholder: {
                  width: `${containerRect.width->toString}px`,
                  height: `${containerRect.height->toString}px`,
                },
              })
            }
          }

          setState(prev =>
            switch (prev, next) {
            | (Fixed(prev), Fixed(_)) => Fixed(prev)
            | (Unfixed, Unfixed) => Unfixed
            | (_, _) => next
            }
          )
        }
      | _ => ()
      }
    })

    updateRef.current()

    None
  }, (target, initOffsetTop, offsetBottom))

  let placeholder = switch state {
  | Fixed(state) =>
    <div
      style={ReactDOM.Style.make(
        ~position=state.fixed.position,
        ~top=state.fixed.top,
        ~bottom=state.fixed.bottom,
        ~width=state.fixed.width,
        ~height=state.fixed.height,
        ~zIndex=state.fixed.zIndex,
        (),
      )}
    />
  | _ => React.null
  }

  let child = switch children {
  | Some(children) => children
  | _ => React.null
  }

  <div ref={ReactDOM.Ref.domRef(containerRef)}>
    placeholder
    <div
      ref={ReactDOM.Ref.domRef(fixedRef)}
      style={switch state {
      | Fixed(state) =>
        ReactDOM.Style.make(
          ~position=state.fixed.position,
          ~top=state.fixed.top,
          ~bottom=state.fixed.bottom,
          ~width=state.fixed.width,
          ~height=state.fixed.height,
          ~zIndex=state.fixed.zIndex,
          (),
        )
      | _ => ReactDOM.Style.make()
      }}>
      child
    </div>
  </div>
}
