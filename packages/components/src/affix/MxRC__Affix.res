module AffixUtils = {
  type rect = {top: int, bottom: int, width: int, height: int}

  let getDomRect = node => {
    open MxLibs.Dom.Element
    open MxLibs.Dom.DomRect
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
    open MxLibs.Dom.Window
    open! MxLibs.Dom
    {
      top: 0,
      bottom: window->innerHeight,
      width: window->innerWidth,
      height: window->innerHeight,
    }
  }

  type offset =
    | OffsetTop(option<int>)
    | OffsetBottom(option<int>)

  let getFixed = (~targetRect as target, ~containerRect as container, ~offset) => {
    switch offset {
    | OffsetTop(top) =>
      switch top {
      | Some(top) => target.top > container.top - top ? Some(top + target.top) : None
      | _ => None
      }
    | OffsetBottom(bottom) =>
      switch bottom {
      | Some(bottom) =>
        target.bottom < container.bottom + bottom
          ? {
              open MxLibs.Dom.Window
              open! MxLibs.Dom
              let offset = window->innerHeight - target.bottom
              Some(bottom + offset)
            }
          : None
      | _ => None
      }
    }
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

type targetType =
  | Default
  | Element
  | Null

type element = Dom.element

@react.component @genType
let make = (
  ~offsetTop=0,
  ~offsetBottom: option<int>=?,
  ~target as tar: option<unit => Js.Nullable.t<Dom.element>>=?,
  ~children: option<React.element>=?,
) => {
  let containerRef = React.useRef(Js.Nullable.null)
  let fixedRef = React.useRef(Js.Nullable.null)
  let targetRef = React.useRef(None)

  let (state, setState, _) = MxHooks.useGetState(_ => Unfixed)
  let updateRef = React.useRef(() => ())

  let targetType = switch tar {
  | Some(tar) =>
    switch ()->tar->Js.toOption {
    | Some(target) => {
        targetRef.current = target->Some
        Element
      }
    | None => Null
    }
  | None => Default
  }

  React.useEffect4(() => {
    updateRef.current = MxLibs.Raf.throttle(_ => {
      let container = containerRef.current->Js.toOption
      switch container {
      | None => ()
      | Some(container) => {
          let targetRect = switch (targetType, targetRef.current) {
          | (Default, _) => ()->AffixUtils.getWinRect->Some
          | (Element, Some(target)) => target->AffixUtils.getDomRect->Some
          | (_, _) => None
          }
          switch targetRect {
          | Some(targetRect) => {
              let containerRect = container->AffixUtils.getDomRect
              let fixedTop = AffixUtils.getFixed(
                ~targetRect,
                ~containerRect,
                ~offset=OffsetTop(Some(offsetTop)),
              )
              let fixedBottom = AffixUtils.getFixed(
                ~targetRect,
                ~containerRect,
                ~offset=OffsetBottom(offsetBottom),
              )

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
          | _ => ()
          }
        }
      }
    })
    updateRef.current()

    None
  }, (targetType, targetRef.current, offsetTop, offsetBottom))

  React.useEffect2(() => {
    let handler = MxLibs.Raf.throttle(_ => {
      ()->updateRef.current
    })

    let node = switch (targetType, targetRef.current) {
    | (Default, _) => {
        open MxLibs.Dom.Window
        open! MxLibs.Dom
        window->asEventTarget->Some
      }
    | (Element, Some(target)) => {
        open MxLibs.Dom.Element
        target->asEventTarget->Some
      }
    | (_, _) => None
    }

    let bind = () => {
      switch node {
      | Some(node) => {
          open Js.Array2
          open MxLibs.Dom.EventTarget
          events->forEach(name => node->addEventListener(name, handler))
        }
      | _ => ()
      }
    }

    let unbind = () => {
      switch node {
      | Some(node) => {
          open Js.Array2
          open MxLibs.Dom.EventTarget
          events->forEach(name => node->removeEventListener(name, handler))
        }
      | _ => ()
      }
    }

    ()->bind

    unbind->Some
  }, (targetType, targetRef.current))

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
