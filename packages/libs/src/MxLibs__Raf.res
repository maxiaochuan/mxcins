@val external raf: (int => unit) => int = "requestAnimationFrame"
@val external caf: int => unit = "cancelAnimationFrame"

%%private(let index = ref(0))

%%private(let cache = Belt.MutableMap.Int.fromArray([]))

%%private(let cleanup = id => cache->Belt.MutableMap.Int.remove(id))

let make = (~times=1, callback: unit => unit) => {
  index := index.contents + 1
  let id = index.contents

  let rec run = (remaining: int) => {
    if remaining === 0 {
      id->cleanup->ignore
      ()->callback
    } else {
      let rafid = raf(_ => run(remaining - 1))
      cache->Belt.MutableMap.Int.set(id, rafid)
    }
  }

  times->run

  id
}

let cancel = (id: int): unit => {
  switch cache->Belt.MutableMap.Int.get(id) {
  | Some(rafid) => {
      caf(rafid)
      cache->Belt.MutableMap.Int.remove(id)->ignore
    }
  | _ => ()
  }
}

let throttle = (~times=1, callback: 'a => unit) => {
  let valid = ref(true)
  let run = (param: 'a) => {
    if valid.contents {
      valid.contents = false
      make(() => {
        param->callback
        valid.contents = true
      }, ~times)->ignore
    }
  }

  run
}

let debounce = (~times=1, callback: 'a => unit) => {
  let id: ref<option<int>> = ref(None)
  let run = (a1: 'param) => {
    switch id.contents {
    | Some(id) => id->cancel
    | _ => ()
    }

    id.contents = make(() => {
        a1->callback
      }, ~times)->Some
  }

  run
}
