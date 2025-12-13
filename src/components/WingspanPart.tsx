export default function WingspanPart(props : {wingspan : string}){
  const wingspanSrc = process.env.PUBLIC_URL + "/img/icons/wingspan.png"
  return(
    <div className="wingspan-container">
      <div>{props.wingspan}</div>
      <img alt="" className="wingspan-icon" src={wingspanSrc}/>
    </div>
  )
}