import { useEffect, useState } from "react";
import { Expansion, SubExpansion } from "../util/Types";
import { Col } from "react-bootstrap";

export default function ExpansionFilter(props : {
  filterName: string
  expansion : Expansion | SubExpansion,
  img : string, 
  handler : {(filter : string, state : Boolean) : void
}}) {
    const [selected, setSelected] = useState(true);
    const [imgClass, setImgClass] = useState("two-way-btn")

    useEffect(() => {
      setImgClass("two-way-btn " + (selected ? "active" : "inactive"))
    }, [selected])

    const handleClick = () => {
      setSelected(!selected)
      props.handler(props.filterName, !selected)
    }

    return (
      <Col md={1} xs={1} onClick={handleClick}>
        <img alt="" className={imgClass} src={props.img} />
      </Col>
    )
}