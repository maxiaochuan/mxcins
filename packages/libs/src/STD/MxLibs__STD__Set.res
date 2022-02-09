type t<'value>

@new
external make: unit => t<'value> = "Set"

@send
external add: (t<'value>, 'value) => t<'value> = "add"

@send
external delete: (t<'value>, 'value) => t<'value> = "delete"

@get
external size: t<'value> => int = "size"

@send
external forEach: (t<'value>, 'value => unit) => unit = "forEach"
