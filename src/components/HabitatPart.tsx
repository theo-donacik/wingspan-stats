import { Habitat } from "../util/Types";

export default function HabitatPart(props : {habitats: Habitat[]}) {
  const habitatMap: {[key in Habitat]: string} = {
    [Habitat.Wetland]: process.env.PUBLIC_URL +"/img/icons/wetland-large.png",
    [Habitat.Grassland]: process.env.PUBLIC_URL +"/img/icons/grassland-large.png",
    [Habitat.Forest]: process.env.PUBLIC_URL +"/img/icons/forest-large.png",
  }
  
  if(props.habitats.length < 3){
    return(
      <div>
        {
          props.habitats.slice().reverse().map((src : Habitat) => {
            return(<img className="habitat-icon" src={habitatMap[src]} key={src}/>)
          })
        }
      </div>
    )
  }
  else {
    return(
      <div>
        <div>
          <img className="habitat-icon three top" src={habitatMap[Habitat.Grassland]}></img>
        </div>
        <div>
          <img className="habitat-icon three" src={habitatMap[Habitat.Wetland]}></img>
          <img className="habitat-icon three" src={habitatMap[Habitat.Forest]}></img>
        </div>
      </div>
      
    )
  }
}