import { Color, Symbol } from "../util/Types";

export default function PowerPart(props : {powerColor : Color, powerText : string, symbol : Symbol}) {
  const powerMap: {[key in Color]: string} = {
    [Color.White]: "WHEN PLAYED",
    [Color.Brown]: "WHEN ACTIVATED",
    [Color.Pink]: "ONCE BETWEEN TURNS",
    [Color.Teal]: "ROUND END",
    [Color.Yellow]: "GAME END"
  }

  const symbol = process.env.PUBLIC_URL 
               + (props.symbol === Symbol.Death ? "/img/icons/death.png" 
               :  props.symbol === Symbol.Tuck ? "/img/icons/tuck.png" 
               :  props.symbol === Symbol.Bonus ? "/img/icons/bonus.png"
               :  "")
  let key = 0
  return (
    <div className="power-container">
      {
        (props.symbol !== Symbol.None) && <img className="power-icon" src={symbol}/>
      }
      {
        props.powerText != '---' && 
        <div>
          <span>{powerMap[props.powerColor]}: </span>
          {
            props.powerText.split(" ").map((word) => {
              key += 1
              // Add subst later when delineators are added
              return(<span className="power-body" key={word + key}>{word + " "}</span>)
            })
          }
      </div>
      }
      
    </div>
    
  )

}