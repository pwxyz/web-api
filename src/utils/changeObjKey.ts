

const  changeObjKey = (parent:object , oldKey: string, newKey: string) => {
  parent[newKey] = parent[oldKey]
  delete parent[oldKey]
  return parent
}

export default changeObjKey