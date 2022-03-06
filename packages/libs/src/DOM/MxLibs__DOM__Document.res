type t = Dom.document

@val external document: t = "document"

@send external createElement: (t, string) => Dom.element = "createElement"

@send @return(nullable) external querySelector: (t, string) => option<Dom.element> = "querySelector"
