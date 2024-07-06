
export default function PointPart(props : {points : number}) {
  const featherSrc = process.env.PUBLIC_URL +"/img/icons/feather.png"
  return(
    <div className="feather-container">
      <div>{props.points}</div>
      <img className="feather-icon" src={featherSrc}></img>
    </div>
  )
}