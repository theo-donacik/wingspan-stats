import { Color } from "../util/Types";

export default function PowerPart(props : {powerColor : Color, powerText : string, death : boolean, tuck : boolean, bonus : boolean}) {
  const powerMap: {[key in Color]: string} = {
    [Color.White]: "WHEN PLAYED",
    [Color.Brown]: "WHEN ACTIVATED",
    [Color.Pink]: "ONCE BETWEEN TURNS",
    [Color.Teal]: "ROUND END",
    [Color.Yellow]: "GAME END"
  }

  const symbol = process.env.PUBLIC_URL 
               + (props.death ? "/img/icons/death.png" 
               :  props.tuck ? "/img/icons/tuck.png" 
               :  props.bonus ? "/img/icons/bonus.png"
               :  "")
  let key = 0
  return (
    <div className="power-container">
      {
        (props.death || props.tuck || props.bonus) && <img className="power-icon" src={symbol}/>
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