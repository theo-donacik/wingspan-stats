export default function NamePart(props : {commonName : string, scientificName : string}){
  return(
    <div>
      <div className="common name">
        {props.commonName}
      </div>
      <div className="scientific name">
        {props.scientificName}
      </div>
    </div>
  )
}