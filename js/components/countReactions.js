export default function countReactions(obj){
    let x = 0
    obj.reactions.forEach((elem)=>{
      x += elem.count
  
    })
    return x
  }
  