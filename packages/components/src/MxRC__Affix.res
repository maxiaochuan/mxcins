open MxLibs

type element = DOM.Element.t

module AffixUtils = {
  type rect = {top: int, bottom: int, width: int, height: int}

  let getDomRect = node => {
    open DOM.Element
    open DOM.DomRect
    open Belt.Float
    let rect = node->getBoundingClientRect
    {
      top: rect->top->toInt,
      bottom: rect->bottom->toInt,
      width: rect->width->toInt,
      height: rect->height->toInt,
    }
  }

  let getWinRect = () => {
    open DOM.Window
    {
      top: 0,
      bottom: DOM.window->innerHeight,
      width: 0,
      height: 0,
    }
  }

  let getTargetRect = (node: option<element>) =>
    switch node {
    | None => ()->getWinRect
    | Some(node) => node->getDomRect
    }

  let getFixedTop = (
    ~targetRect as target: rect,
    ~containerRect as container: rect,
    ~offsetTop as top: option<int>,
  ): option<int> =>
    switch top {
    | Some(top) => target.top > container.top - top ? Some(top + target.top) : None
    | _ => None
    }

  let getFixedBottom = (
    ~targetRect as target: rect,
    ~containerRect as container: rect,
    ~offsetBottom as bottom: option<int>,
  ): option<int> =>
    switch bottom {
    | Some(bottom) =>
      target.bottom < container.bottom + bottom
        ? {
            let offset = DOM.window->DOM.Window.innerHeight - target.bottom
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

let events = ["resize", "scroll", "touchstart", "touchmove", "touchend", "pageshow", "load"]

@react.component
let make = (
  ~offsetTop=0,
  ~offsetBottom: option<int>=?,
  ~target as tar: option<unit => Js.Nullable.t<element>>=?,
  ~children: option<React.element>=?,
) => {
  let containerRef = React.useRef(Js.Nullable.null)
  let fixedRef = React.useRef(Js.Nullable.null)

  let updateRef = React.useRef(() => ())

  let (state, setState, _) = MxHooks.useGetState(_ => Unfixed)

  let isUseingDefaultTarget = switch tar {
  | Some(_) => false
  | _ => true
  }

  let target = switch tar {
  | None => None
  | Some(fn) => ()->fn->Js.toOption
  }

  React.useEffect4(() => {
    updateRef.current = Raf.throttle(_ => {
      let container = containerRef.current->Js.toOption
      switch container {
      | None => ()
      | Some(container) =>
        switch (isUseingDefaultTarget, target) {
        | (false, None) => ()
        | (_, target) => {
            let targetRect = target->AffixUtils.getTargetRect
            let containerRect = container->AffixUtils.getDomRect
            let fixedTop = AffixUtils.getFixedTop(
              ~targetRect,
              ~containerRect,
              ~offsetTop=Some(offsetTop),
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
                    // top first
                    bottom: switch (top, bottom) {
                    | (None, Some(bottom)) => `${bottom->toString}px`
                    | (_, _) => "initial"
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
        }
      }
    })
    updateRef.current()

    None
  }, (isUseingDefaultTarget, target, offsetTop, offsetBottom))

  React.useEffect2(() => {
    let handler = Raf.throttle(_ => {
      ()->updateRef.current
    }, ~times=10)

    let bind = () => {
      switch (isUseingDefaultTarget, target) {
      | (true, _) => {
          open Js.Array2
          events->forEach(name => {
            open DOM.Window
            DOM.window->addEventListener(name, handler)
          })
        }
      | (false, Some(target)) => {
          open Js.Array2
          events->forEach(name => {
            open DOM.Element
            target->addEventListener(name, handler)
          })
        }
      | (_, _) => ()
      }
    }

    let unbind = () => {
      switch (isUseingDefaultTarget, target) {
      | (true, _) => {
          open Js.Array2
          events->forEach(name => {
            open DOM.Window
            DOM.window->removeEventListener(name, handler)
          })
        }
      | (false, Some(target)) => {
          open Js.Array2
          events->forEach(name => {
            open DOM.Element
            target->removeEventListener(name, handler)
          })
        }
      | _ => ()
      }
    }

    ()->bind

    unbind->Some
  }, (isUseingDefaultTarget, target))

  let placeholder = switch state {
  | Fixed(state) =>
    <div
      style={ReactDOM.Style.make(
        ~width=state.placeholder.width,
        ~height=state.placeholder.height,
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
      {child}
    </div>
  </div>
}
