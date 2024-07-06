import { useEffect, useState } from "react"
import { Col } from "react-bootstrap"
import { ButtonState } from "../util/Types"

export default function TwoWayFilter(props : {filter : string, img : string, handler : {(state : Boolean) : void}}) {
  const [state, setState] = useState(false)
  const [imgClass, setImgClass] = useState("two-way-btn")

  const onClick = () => {
    setState(!state)
    props.handler(state)
    setImgClass("two-way-btn " + (state ? "active" : "inactive"))
  }

  return(
    <Col md={1} xs={2} id={props.filter} 
        onClick={() => onClick()}>
        <img className={imgClass} src={props.img}/>
    </Col>
  )
}