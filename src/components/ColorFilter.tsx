import { useState } from "react"
import { Color } from "../util/Types";
import { Button, Col } from "react-bootstrap";

export default function ColorFilter(props : {
  name : Color,
  color : string, 
  handler : {(filter : string, state : Boolean) : void
}}) {
    const [selected, setSelected] = useState(true);

    const handleClick = () => {
      setSelected(!selected)
      props.handler(props.name as string, selected)
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