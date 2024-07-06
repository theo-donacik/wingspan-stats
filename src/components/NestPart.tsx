import { Nest } from "../util/Types";

export default function NestPart(props : {nest : Nest}) {
  const nestMap: {[key in Nest]: string} = {
    [Nest.Eggy]: process.env.PUBLIC_URL + "/img/icons/eggy-nest-large.png",
    [Nest.Nesty]: process.env.PUBLIC_URL + "/img/icons/nesty-nest-large.png",
    [Nest.Holey]: process.env.PUBLIC_URL + "/img/icons/holey-nest-large.png",
    [Nest.Sticky]: process.env.PUBLIC_URL + "/img/icons/sticky-nest-large.png",
    [Nest.Star]: process.env.PUBLIC_URL + "/img/icons/star-nest-large.png",
    [Nest.None]: "",
  }

  return(
    <div>
      <img className="nest-icon" src={nestMap[props.nest]}></img>
    </div>
  )
}