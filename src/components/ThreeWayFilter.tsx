import { useEffect, useState } from "react"
import { Col } from "react-bootstrap"
import { ButtonState } from "../util/Types"

export default function ThreeWayFilter(props : {filter : string, img : string, handler : {(state : ButtonState) : void}}) {
  const [state, setState] = useState(ButtonState.Off)
  const [imgClass, setImgClass] = useState("three-way-btn")
  const [overlayClass, setOverlayClass] = useState(false)

  useEffect(() => {
    setImgClass("three-way-btn " + (state === ButtonState.Off 
      ? "" : state === ButtonState.Inclusive 
      ? "active" 
      : "excluded"))
    setOverlayClass(state === ButtonState.Exclusive)
  }, [state])

  const nextState = (state : ButtonState) => {
    switch (state) {
      case ButtonState.Off:
        return ButtonState.Inclusive
      case ButtonState.Inclusive:
        return ButtonState.Exclusive
      case ButtonState.Exclusive:
        return ButtonState.Off
    }
  }
  const onClick = () => {
    setState(nextState)
    props.handler(state)
  }

  return(
      <Col md={1} xs={2} id={props.filter} 
          onClick={() => onClick()}>
        <div className="slash">
          <div>
            <img alt="" className={imgClass} src={props.img}/>
          </div>
          <div className="slash-text">
            {overlayClass? "X" : ""}
          </div>
        </div>
      </Col>
  )
}