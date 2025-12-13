import { useEffect, useState } from "react"
import { Row } from "react-bootstrap"
import MultiRangeSlider, { ChangeResult } from "multi-range-slider-react";
import { ArrowClockwise } from "react-bootstrap-icons";

export default function SliderFilter(props : {filter : string, 
                                              img : string, 
                                              min : number, 
                                              max : number, 
                                              handler : {(upper : number, lower : number) : void}}) {
  const [min, setMin] = useState(props.min)
  const [max, setMax] = useState(props.max)

  useEffect(() => {
    props.handler(max, min)
  }, [max, min, props])

  const handler = (e : ChangeResult) => {
    setMin(e.minValue)
    setMax(e.maxValue)
  }

  return(
    <Row id={props.filter}>
      <div style={{display: "flex"}}>
        <img alt="" className="slider-icon" src={props.img}/>
        <MultiRangeSlider
          style={{width: "100%", border: "none", boxShadow: "none"}}
          min={props.min}
          max={props.max}
          minValue={min}
          maxValue={max}
          barInnerColor="blue"
          step={1}
          ruler={false}
          labels={Array.from({length: props.max + 1}, (x, i) => i.toString())}
          subSteps
          canMinMaxValueSame
          onChange={handler}
        />
        <div style={{width: "40px", alignContent: "center", justifyContent: "center", paddingBottom: "15px"}} onClick={() => {setMax(props.max); setMin(props.min)}}>
          <ArrowClockwise/>
        </div>
      </div>
    </Row>
  )
}