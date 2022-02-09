open MxLibs
open DOM

type size = {
  width: int,
  height: int,
  offsetWidth: int,
  offsetHeight: int,
}

type onResize = (~target: Element.t, ~size: size) => unit

@react.component
let useObserveResize = (
  ~target: option<Element.t>=?,
  ~onResize: option<onResize>,
  ~disabled: option<bool>=?,
) => {
  let sizeRef = React.useRef({width: -1, height: -1, offsetWidth: -1, offsetHeight: -1})
  let onResizeRef = React.useRef(onResize)

  let onObserverResizeCallback = React.useCallback(entry => {
    open SingleResizeObserver
    let target = entry->ResizeObserverEntry.target
    let rect = target->Element.getBoundingClientRect
    let width = rect->DomRect.width
    let height = rect->DomRect.height
    let offsetWidth = target->Element.offsetWidth
    let offsetHeight = target->Element.offsetHeight
    /**
     * Resize observer trigger when content size changed.
     * In most case we just care about element size,
     * let's use `boundary` instead of `contentRect` here to avoid shaking.
     */
    open Js.Math
    let fixedWidth = width->floor_int
    let fixedHeight = height->floor_int

    if (
      sizeRef.current.width !== fixedWidth ||
      sizeRef.current.height !== fixedHeight ||
      sizeRef.current.offsetWidth !== offsetWidth ||
      sizeRef.current.offsetHeight !== offsetHeight
    ) {
      let size = {
        width: fixedWidth,
        height: fixedHeight,
        offsetWidth: offsetWidth,
        offsetHeight: offsetHeight,
      }
      sizeRef.current = size

      switch onResizeRef.current {
      | Some(onResizeCallback) => {
          open Promise
          resolve()
          ->then(() => {
            onResizeCallback(~target, ~size)
            resolve()
          })
          ->ignore
        }
      | _ => ()
      }
    }
  })

  React.useEffect2(() => {
    open SingleResizeObserver
    switch (target, disabled) {
    | (Some(target), None) => target->observe(onObserverResizeCallback)
    | (Some(target), Some(false)) => target->observe(onObserverResizeCallback)
    | (_, __) => ()
    }

    Some(
      () => {
        switch target {
        | Some(target) => target->unobserve(onObserverResizeCallback)
        | _ => ()
        }
      },
    )
  }, (target, disabled))
}
