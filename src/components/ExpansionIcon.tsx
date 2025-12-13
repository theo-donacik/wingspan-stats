import { Expansion, SubExpansion } from "../util/Types"

export default function ExpansionIcon(props : {expansion : Expansion, subExpansion : SubExpansion}){
  const expansionMap: {[key in Expansion]: string} = {
    [Expansion.NorthAmerica]: "",
    [Expansion.European]: process.env.PUBLIC_URL + "/img/expansion-indicators/european.svg",
    [Expansion.Oceania]: process.env.PUBLIC_URL + "/img/expansion-indicators/oceania.svg",
    [Expansion.Asia]: process.env.PUBLIC_URL + "/img/expansion-indicators/asia.svg",
    [Expansion.FanDesigned]: process.env.PUBLIC_URL + "/img/expansion-indicators/promo.svg",
  }

  const subExpansionMap: {[key in SubExpansion]: string} = {
    [SubExpansion.Base]: "",
    [SubExpansion.DuetSwift]: "",
    [SubExpansion.Swift]: "",
    [SubExpansion.Asian]: process.env.PUBLIC_URL + "/img/expansion-indicators/promoAsia.svg",
    [SubExpansion.British]: process.env.PUBLIC_URL + "/img/expansion-indicators/promoUK.png",
    [SubExpansion.Canada]: process.env.PUBLIC_URL + "/img/expansion-indicators/promoCA.svg",
    [SubExpansion.Europe]: process.env.PUBLIC_URL + "/img/expansion-indicators/promoEurope.svg",
    [SubExpansion.NewZealand]: process.env.PUBLIC_URL + "/img/expansion-indicators/promoNZ.svg",
    [SubExpansion.USA]: process.env.PUBLIC_URL + "/img/expansion-indicators/promoUS.svg",
  }

  if(subExpansionMap[props.subExpansion]) {
    return(
      <div className="expansion-container">
        <img alt="" className="left expansion-icon" src={subExpansionMap[props.subExpansion]}/>
        <img alt="" className="right expansion-icon" src={expansionMap[props.expansion]}/>
      </div>
    )
  }
  else {
    return(
      <div className="expansion-container">
        {expansionMap[props.expansion] !== "" && <img alt="" className="expansion-icon" src={expansionMap[props.expansion]}/>}
      </div>
    )
  }

}