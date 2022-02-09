type t<'key, 'value>

@new
external make: unit => t<'key, 'value> = "Map"

@send
external get: (t<'key, 'value>, 'key) => option<'value> = "get"

@send
external set: (t<'key, 'value>, 'key, 'value) => t<'key, 'value> = "set"

@send
external has: (t<'key, 'value>, 'key) => bool = "has"
