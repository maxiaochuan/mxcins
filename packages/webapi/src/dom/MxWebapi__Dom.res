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

  let getPointPos = (rect, conf) =>
    switch conf {
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
    let (sourcePointConf, targetPointConf) = points

    let (sourcePointPosX, sourcePointPosY) = source->getDomRect->getPointPos(sourcePointConf)
    let (targetPointPosX, targetPointPosY) = target->getDomRect->getPointPos(targetPointConf)

    let (movedX, movedY) = (targetPointPosX -. sourcePointPosX, targetPointPosY -. sourcePointPosY)

    open Webapi.Dom
    open CssStyleDeclaration
    open Belt.Float
    open Belt.Option
    let sourceComputedStyle = window->Window.getComputedStyle(source)
    let sourceCurrentTop = sourceComputedStyle->top->fromString->getWithDefault(0.0)
    let sourceCurrentLeft = sourceComputedStyle->left->fromString->getWithDefault(0.0)

    // move to top & left
    let sourceToTop = (sourceCurrentTop +. movedY +. offsetY->getWithDefault(0.0))->toString ++ "px"
    let sourceToLeft =
      (sourceCurrentLeft +. movedX +. offsetX->getWithDefault(0.0))->toString ++ "px"

    open HtmlElement
    let sourceStyle = source->ofElement->getUnsafe->style
    sourceStyle->setProperty("top", sourceToTop, "")
    sourceStyle->setProperty("left", sourceToLeft, "")
  }
}
