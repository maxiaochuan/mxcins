type applyreturned = unit => unit

@module("twind")
external setup: {..} => unit = "setup"
@module("twind")
external tw: 'a => string = "tw"
@module("twind")
external apply: array<string> => applyreturned = "apply"
@module("twind/css")
external css: {..} => string = "css"
@module("twind/css")
external rawCss: string => string = "css"
@val @module("@twind/content")
external content: 'a = "content"

%%raw("import * as c from 'twind/colors'")
let colors: {..} = %raw("c")
