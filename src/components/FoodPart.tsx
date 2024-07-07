import { useEffect, useState } from "react";
import { Food, FoodSet } from "../util/Types";

export default function FoodPart(props : {food: FoodSet, slashed: boolean, alternateCost: boolean, total: number}) {
  const [toRender, setToRender] = useState<string[]>([]);

  const foodMap: {[key in Food]: string} = {
    [Food.Worm]: process.env.PUBLIC_URL + "/img/icons/worm.png",
    [Food.Wheat]: process.env.PUBLIC_URL + "/img/icons/wheat.png",
    [Food.Cherry]: process.env.PUBLIC_URL + "/img/icons/cherry.png",
    [Food.Fish]: process.env.PUBLIC_URL + "/img/icons/fish.png",
    [Food.Rat]: process.env.PUBLIC_URL + "/img/icons/rat.png",
    [Food.Nectar]: process.env.PUBLIC_URL + "/img/icons/nectar.png",
    [Food.Any]: process.env.PUBLIC_URL + "/img/icons/any-food.png",
  }

  const delineator = process.env.PUBLIC_URL + "/img/icons/" + (props.slashed ?  "slash.png" : "plus.png")
  const star = process.env.PUBLIC_URL + "/img/icons/star.png"
  const none = process.env.PUBLIC_URL + "/img/icons/no-food.png"


  useEffect(() => {
    var delineators = props.total - 1
    var foodList : string[] = Object.keys(Food).filter((item) => {
      return isNaN(Number(item));
    });
  
    var render : string[] = props.alternateCost ? [star] : []
  
    foodList.forEach((f : string) => {
      for(let i = 0; i < props.food[f as Food]; i++) {
        render.push(foodMap[f as Food])
        if (delineators > 0 || props.slashed) {
          render.push(delineator)
          delineators--
        }
      }
    });
  
    // Remove extra slash as it will be added to the end
    if(props.slashed) render.pop()
  
    if(render.length == 0) render.push(none)
    setToRender(render)
  }, [])
  let key = 0
  
  return(
    <div style={{whiteSpace: "nowrap", display: "inline"}}>
      {
        toRender.map((src : string) => {
          var className = "food-icon"; 
          if(src == delineator){
            className="delin-icon"
          }
          if(src == star) {
            className = "delin-icon star-icon"
          }
          key += 1
          return(<img className={className + " food"} src={src} key={src+key}/>)
        })
      }
    </div>
  )
}
