import { useEffect, useState } from "react";
import { Expansion, SubExpansion } from "../util/Types";
import { Col } from "react-bootstrap";

export default function ExpansionFilter(props : {
  expansion : Expansion | SubExpansion,
  img : string, 
  handler : {(
    filter : (expansion : Expansion | SubExpansion) => boolean, 
    selected : boolean,
    setSelected : (arg : boolean) => void) : void
  }}) {
    const [selected, setSelected] = useState(false);
    const [imgClass, setImgClass] = useState("two-way-btn")

    const filter = (expansion : Expansion | SubExpansion) => {
      return expansion === props.expansion
    }

    useEffect(() => {
      setImgClass("two-way-btn " + (selected ? "active" : "inactive"))
    }, [selected])

    const handleClick = () => {
      props.handler(filter, selected, setSelected)
    }

    return (
      <Col md={1} xs={1} onClick={handleClick}>
        <img alt="" className={imgClass} src={props.img} />
      </Col>
    )
}