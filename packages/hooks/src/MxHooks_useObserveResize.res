type size = {
  width: int,
  height: int,
  offsetWidth: int,
  offsetHeight: int,
}

type onResize = (~target: Dom.element, ~size: size) => unit

let useObserveResize = (
  ~target: Js.Nullable.t<Dom.element>,
  ~onResize: option<onResize>,
  ~disabled: option<bool>,
) => {
  let sizeRef = React.useRef({width: -1, height: -1, offsetWidth: -1, offsetHeight: -1})
  let onResizeRef = React.useRef(onResize)

  let onObserverResizeCallback = React.useCallback(entry => {
    let target = entry->Webapi.ResizeObserver.ResizeObserverEntry.target
    let rect = target->Webapi.Dom.Element.getBoundingClientRect
    let width = rect->Webapi.Dom.DomRect.width
    let height = rect->Webapi.Dom.DomRect.height
    let offsetWidth =
      target
      ->Webapi.Dom.Element.asHtmlElement
      ->Belt.Option.map(ele => ele->Webapi.Dom.HtmlElement.offsetWidth)
      ->Belt.Option.getWithDefault(0)
    let offsetHeight =
      target
      ->Webapi.Dom.Element.asHtmlElement
      ->Belt.Option.map(ele => ele->Webapi.Dom.HtmlElement.offsetHeight)
      ->Belt.Option.getWithDefault(0)

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
    open MxWebapi.SingleResizeObserver
    switch (target->Js.Nullable.toOption, disabled->Belt.Option.getWithDefault(false)) {
    | (Some(target), false) => target->observe(onObserverResizeCallback)
    | (_, _) => ()
    }

    Some(
      () => {
        switch target->Js.Nullable.toOption {
        | Some(target) => target->unobserve(onObserverResizeCallback)
        | _ => ()
        }
      },
    )
  }, (target, disabled))
}
