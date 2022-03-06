type applyreturned = unit => unit

@module("twind")
external setup: {..} => unit = "setup"
@module("twind")
external tw: 'a => string = "tw"
@module("twind")
external apply: array<string> => applyreturned = "apply"

%%raw("import * as c from 'twind/colors'")
let colors: {..} = %raw("c")
