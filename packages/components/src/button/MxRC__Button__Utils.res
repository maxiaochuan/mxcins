let isTwoCNChar = str => %re("/^[\u4e00-\u9fa5]{2}$/")->Js.Re.test_(str)
