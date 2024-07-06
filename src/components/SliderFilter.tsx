import { useEffect, useState } from "react"
import { Col, Row } from "react-bootstrap"
import { ButtonState } from "../util/Types"
import MultiRangeSlider, { ChangeResult } from "multi-range-slider-react";

export default function SliderFilter(props : {filter : string, 
                                              img : string, 
                                              min : number, 
                                              max : number, 
                                              handler : {(upper : number, lower : number) : void}}) {
  const [upper, setUpper] = useState(props.max)
  const [lower, setLower] = useState(props.min)

  useEffect(() => {
    props.handler(upper, lower)
  }, [upper, lower])

  const handler = (e : ChangeResult) => {
    console.log(e)
    setUpper(e.maxValue)
    setLower(e.minValue)
  }

  return(
    <Row id={props.filter}>
      <div style={{display: "flex"}}>
        <img className="slider-icon" src={props.img}/>
        <MultiRangeSlider
          style={{width: "100%", border: "none", boxShadow: "none"}}
          min={props.min}
          max={props.max}
          minValue={props.min}
          maxValue={props.max}
          barInnerColor="blue"
          step={1}
          ruler={false}
          subSteps
          canMinMaxValueSame
          onChange={handler}
        />
      </div>
    </Row>
  )
}