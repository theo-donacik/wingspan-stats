import { Color, Symbol } from "../util/Types";

export default function PowerPart(props : {powerColor : Color, powerText : string, symbol : Symbol}) {
  const powerMap: {[key in Color]: string} = {
    [Color.White]: "WHEN PLAYED",
    [Color.Brown]: "WHEN ACTIVATED",
    [Color.Pink]: "ONCE BETWEEN TURNS",
    [Color.Teal]: "ROUND END",
    [Color.Yellow]: "GAME END"
  }

  const foods = ["wheat", "worm", "worms", "cherry", "cherries", "fish", "rat", "rats", "nectar", "die", "food die", "food dice", "food"]
  const eggs = ["egg", "eggs"]
  const nests = ["sticky", "nesty", "holey", "eggy", "star", "sticky nest", "nesty nest", "holey nest", "eggy nest", "star nest"]

  const iconMap: {[value: string]: string} = {
    "card": process.env.PUBLIC_URL + "/img/icons/card.png",
    "cards": process.env.PUBLIC_URL + "/img/icons/card.png",

    "worm": process.env.PUBLIC_URL + "/img/icons/worm.png",
    "worms": process.env.PUBLIC_URL + "/img/icons/worm.png",
    "wheat": process.env.PUBLIC_URL + "/img/icons/wheat.png",
    "cherry": process.env.PUBLIC_URL + "/img/icons/cherry.png",
    "cherries": process.env.PUBLIC_URL + "/img/icons/cherry.png",
    "fish": process.env.PUBLIC_URL + "/img/icons/fish.png",
    "rat": process.env.PUBLIC_URL + "/img/icons/rat.png",
    "rats": process.env.PUBLIC_URL + "/img/icons/rat.png",
    "nectar": process.env.PUBLIC_URL + "/img/icons/nectar.png",
    "food": process.env.PUBLIC_URL + "/img/icons/any-food.png",
    "die": process.env.PUBLIC_URL + "/img/icons/food-die.png",
    "food die": process.env.PUBLIC_URL + "/img/icons/food-die.png",
    "food dice": process.env.PUBLIC_URL + "/img/icons/food-die.png",

    "egg": process.env.PUBLIC_URL + "/img/icons/egg.png",
    "eggs": process.env.PUBLIC_URL + "/img/icons/egg.png",

    "sticky": process.env.PUBLIC_URL + "/img/icons/sticky-nest-large.png",
    "nesty": process.env.PUBLIC_URL + "/img/icons/nesty-nest-large.png",
    "holey": process.env.PUBLIC_URL + "/img/icons/holey-nest-large.png",
    "eggy": process.env.PUBLIC_URL + "/img/icons/eggy-nest-large.png",
    "star": process.env.PUBLIC_URL + "/img/icons/star-nest-large.png",
    "sticky nest": process.env.PUBLIC_URL + "/img/icons/sticky-nest-large.png",
    "nesty nest": process.env.PUBLIC_URL + "/img/icons/nesty-nest-large.png",
    "holey nest": process.env.PUBLIC_URL + "/img/icons/holey-nest-large.png",
    "eggy nest": process.env.PUBLIC_URL + "/img/icons/eggy-nest-large.png",
    "star nest": process.env.PUBLIC_URL + "/img/icons/star-nest-large.png",

    "predator": process.env.PUBLIC_URL + "/img/icons/death.png",
    "flocking": process.env.PUBLIC_URL + "/img/icons/tuck.png",
    "bonus card": process.env.PUBLIC_URL + "/img/icons/bonus.png",

    "water row": process.env.PUBLIC_URL + "/img/icons/wetland-small.png",
    "forest row": process.env.PUBLIC_URL + "/img/icons/forest-small.png",
    "grass row": process.env.PUBLIC_URL + "/img/icons/grassland-small.png",
  }

  const symbol = process.env.PUBLIC_URL 
               + (props.symbol === Symbol.Death ? "/img/icons/death.png" 
               :  props.symbol === Symbol.Tuck ? "/img/icons/tuck.png" 
               :  props.symbol === Symbol.Bonus ? "/img/icons/bonus.png"
               :  "")

  //eslint-disable-next-line
  const splitDescription = props.powerText.split(/[\[\]]/);

  let key = 0
  return (
    <div className="power-container">
      {
        (props.symbol !== Symbol.None) && <img alt="" className="power-icon" src={symbol}/>
      }
      {
        props.powerText !== '---' && 
        <div>
          <span>{powerMap[props.powerColor]}: </span>
          {
            splitDescription.map((part) => {
              key += 1

              if(iconMap[part]) {
                var className = "power-text-icon"
                if(foods.includes(part)) {
                  className = "food-power-text-icon"
                }
                else if(eggs.includes(part)) {
                  className = "egg-power-text-icon"
                }
                else if(nests.includes(part)) {
                  className = "nest-power-text-icon"
                }
                return(<img alt="" className={className} src={iconMap[part]}/>)
              }
              else {
                // Trim whitespace before and after symbol, whitespace comes from css padding for finer control 
                return(<span className="power-body" key={part + key}>{part.trimStart().trimEnd()}</span>)
              }
            })
          }
      </div>
      }
      
    </div>
    
  )

}