module DomMover = {
  // t c b, l c r
  type point = [#tl | #tc | #tr | #cl | #cc | #cr | #bl | #bc | #br]

  type rect = {top: float, bottom: float, left: float, right: float, width: float, height: float}

  let getDomRect = (node: Dom.element) => {
    open Webapi.Dom.Element
    let rect = node->getBoundingClientRect
    open Webapi.Dom.DomRect

    {
      top: rect->top,
      bottom: rect->bottom,
      left: rect->left,
      right: rect->right,
      width: rect->width,
      height: rect->height,
    }
  }

  let getPointPos = (point, rect) =>
    switch point {
    | #tl => (rect.left, rect.top)
    | #tc => (rect.left +. rect.width /. 2.0, rect.top)
    | #tr => (rect.right, rect.top)
    | #cl => (rect.left, rect.top +. rect.height /. 2.0)
    | #cc => (rect.left +. rect.width /. 2.0, rect.top +. rect.height /. 2.0)
    | #cr => (rect.right, rect.top +. rect.height /. 2.0)
    | #bl => (rect.left, rect.bottom)
    | #bc => (rect.left +. rect.width /. 2.0, rect.bottom)
    | #br => (rect.right, rect.bottom)
    }

  @genType
  let align = (
    source: Dom.element,
    target: Dom.element,
    ~points: (point, point),
    ~offsetX=?,
    ~offsetY=?,
    (),
  ) => {
    let sourceRect = source->getDomRect
    let targetRect = target->getDomRect
    let (sourcePoint, targetPoint) = points
    let (sourcePointPosX, sourcePointPosY) = sourcePoint->getPointPos(sourceRect)
    let (targetPointPosX, targetPointPosY) = targetPoint->getPointPos(targetRect)
    let (movedX, movedY) = (targetPointPosX -. sourcePointPosX, targetPointPosY -. sourcePointPosY)
    // current source top & left
    open Webapi.Dom
    let getComputedStyle = window->Window.getComputedStyle
    let sourceComputedtyle = source->getComputedStyle
    let sourceCurrentTop =
      sourceComputedtyle
      ->CssStyleDeclaration.top
      ->Belt.Float.fromString
      ->Belt.Option.getWithDefault(0.0)
    let sourceCurrentLeft =
      sourceComputedtyle
      ->CssStyleDeclaration.left
      ->Belt.Float.fromString
      ->Belt.Option.getWithDefault(0.0)

    // move to top & left
    let sourceToTop =
      (sourceCurrentTop +. movedY +. offsetY->Belt.Option.getWithDefault(0.0))
        ->Belt.Float.toString ++ "px"
    let sourceToLeft =
      (sourceCurrentLeft +. movedX +. offsetX->Belt.Option.getWithDefault(0.0))
        ->Belt.Float.toString ++ "px"

    let sourceStyle = source->HtmlElement.ofElement->Belt.Option.getUnsafe->HtmlElement.style
    sourceStyle->CssStyleDeclaration.setProperty("top", sourceToTop, "")
    sourceStyle->CssStyleDeclaration.setProperty("left", sourceToLeft, "")
  }
}
