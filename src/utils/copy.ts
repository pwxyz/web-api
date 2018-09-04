

const copy = arg => {
  // console.log(arg)

  return JSON.parse(JSON.stringify(arg))
}

export default copy