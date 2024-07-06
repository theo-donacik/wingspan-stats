import { useState } from "react"
import { Color } from "../util/Types";
import { Button, Col } from "react-bootstrap";

export default function ColorFilter(props : {
  name : Color,
  color : string, 
  handler : {(
    filter : (color : Color) => boolean, 
    selected : boolean,
    setSelected : (arg : boolean) => void) : void
  }}) {
    const [selected, setSelected] = useState(false);

    const filter = (c : Color) => c === props.name

    const handleClick = () => {
      props.handler(filter, selected, setSelected)
    }

    return (
      <Col md={1} xs={2}>
        <Button variant="custom" onClick={handleClick}>
          <h2 style={{color: selected ? props.color : "gray", textShadow: "2px 1px 2px black"}}>
            {props.name}
          </h2>
        </Button>
      </Col>
    )
  }