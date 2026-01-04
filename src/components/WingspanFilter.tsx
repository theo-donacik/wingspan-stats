import { useState } from "react"
import { Button, Col } from "react-bootstrap"

export default function WingspanFilter(props : {
  num : number, 
  symbol : string, 
   handler : {(
    filter : (num : number) => boolean,
    selected : boolean,
    setSelected : (arg : boolean) => void) : void
  }}) {
  const [selected, setSelected] = useState(false)

  const onClick = () => {
    let func
    if(props.symbol === '<') {
      func = (x : number) => {return x < props.num}
    }
    else if(props.symbol === '≤') {
      func = (x : number) => {return x <= props.num}
    }
    else if(props.symbol === '>') {
      func = (x : number) => {return x > props.num}
    }
    else if (props.symbol === '≥'){
      func = (x : number) => {return x >= props.num}
    }
    else {
      func = (x : number) => {setSelected(false); return true}
    }
    props.handler(func, selected, setSelected)
  }

  return(
    <Col md={1} xs={2}>
      <Button variant='custom' className="wingspan-btn" onClick={() => onClick()}>
        <h2 className={"wingspan-btn-text " + (selected ? "selected" : "")}>{props.symbol === "clear" ? props.symbol : props.symbol + props.num}</h2>
      </Button>
    </Col>
  )
}