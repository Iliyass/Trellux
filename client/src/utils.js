const nativeClosest = (elm, className) => {
  let parentNode = elm

  if(parentNode === document || ! parentNode) return null

  if(parentNode.className.split(' ').indexOf(className) > -1) return parentNode

  return nativeClosest(parentNode.parentNode, className)

}


export const closest = (elm, className, clone = false) => {
  const node = nativeClosest(elm, className)

  if(node && clone){
    return node.cloneNode(true)
  }
  return node
}
