export default function EggsPart(props : {eggs : number}) {
  const eggImg = process.env.PUBLIC_URL + "/img/icons/egg-small.png"
  let key = 0
  return(
    <div>
      {
        [...Array(props.eggs)].map(() => {
          key += 1
          return(<img alt="" className="egg-icon" src={eggImg} key={key}/>)
        })
      }
      {
        props.eggs % 2 === 0 ? <></> 
                            : <img alt="" className="egg-icon"/>
      }
    </div>
  )
}