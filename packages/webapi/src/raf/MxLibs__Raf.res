%%private(let index = ref(0))

%%private(let store = Belt.MutableMap.Int.fromArray([]))

let make = (~times=1, callback: unit => unit) => {
  index := index.contents + 1
  let id = index.contents

  let rec run = (remaining: int) => {
    if remaining === 0 {
      store->Belt.MutableMap.Int.clear->callback
    } else {
      let rafid = Webapi.requestCancellableAnimationFrame(_ => run(remaining - 1))
      store->Belt.MutableMap.Int.set(id, rafid)
    }
  }

  times->run

  id
}

let cancel = id => store->Belt.MutableMap.Int.get(id)->Belt.Option.forEach(rafid => {
  rafid->Webapi.cancelAnimationFrame
  store->Belt.MutableMap.Int.remove(id)->ignore
})

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
