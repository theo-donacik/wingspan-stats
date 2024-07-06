import HabitatPart from "./HabitatPart";
import { Bird, Color } from "../util/Types";
import FoodPart from "./FoodPart";
import NamePart from "./NamePart";
import PointPart from "./PointPart";
import NestPart from "./NestPart";
import EggsPart from "./EggsPart";
import WingspanPart from "./WingspanPart";
import PowerPart from "./PowerPart";

export default function CardView(props : {bird : Bird}) {
  const colorsMap: {[key in Color]: string} = {
    [Color.White]: process.env.PUBLIC_URL + "/img/cards/white.png",
    [Color.Brown]: process.env.PUBLIC_URL + "/img/cards/brown.png",
    [Color.Pink]: process.env.PUBLIC_URL + "/img/cards/pink.png",
    [Color.Teal]: process.env.PUBLIC_URL + "/img/cards/teal.png",
    [Color.Yellow]: process.env.PUBLIC_URL + "/img/cards/yellow.png"
  }
  const powerColor : Color = props.bird.powerColor

  return(
    <div className="card-container">
      <img 
        src={colorsMap[powerColor]}
        className="overlay-card"
      />
      <div className="habitat overlay">
        <HabitatPart habitats={props.bird.habitats}/>
      </div>
      <div className="food-background overlay"/>
      <div className="food overlay">
        <FoodPart food={props.bird.food}
                  slashed={props.bird.slashed} 
                  alternateCost={props.bird.alternateCost}
                  total={props.bird.totalFoodCost}
        />
      </div>
      <div className="name-background overlay"/>
      <div className="name overlay">
        <NamePart commonName={props.bird.name} scientificName={props.bird.scientificName}/>
      </div>
      <div className="point overlay">
        <PointPart points={props.bird.feathers}/>
      </div>
      <div className="nest overlay">
        <NestPart nest={props.bird.nest}/>
      </div>
      <div className="egg overlay">
        <EggsPart eggs={props.bird.eggCapacity}/>
      </div>
      <div className={"overlay wingspan" + (props.bird.ability == '---' ? "-blank" : "")}>
        <WingspanPart wingspan={props.bird.wingspan}/>
      </div>
      <div className="power overlay">
        <PowerPart powerColor={props.bird.powerColor}
                   powerText={props.bird.ability}
                   death={props.bird.death}
                   tuck={props.bird.tuck}
                   bonus={props.bird.givesBonusCard}
          />
      </div>
      <div className="trivia overlay">
        {props.bird.trivia}
      </div>
    </div>
  )
}