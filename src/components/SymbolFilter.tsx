import { useEffect, useState } from "react";
import { Symbol } from "../util/Types";
import { Col } from "react-bootstrap";

export default function SymbolFilter(props : {
  symbol : Symbol,
  img : string, 
  handler : {(
    filter : (symbol : Symbol) => boolean, 
    selected : boolean,
    setSelected : (arg : boolean) => void) : void
  }}) {
    const [selected, setSelected] = useState(false);
    const [imgClass, setImgClass] = useState("two-way-btn")

    const filter = (symbol : Symbol) => symbol === props.symbol

    useEffect(() => {
      setImgClass("two-way-btn " + (selected ? "active" : "inactive"))
    }, [selected])

    const handleClick = () => {
      props.handler(filter, selected, setSelected)
    }

    return (
      <Col md={1} xs={2} onClick={handleClick}>
        <img className={imgClass} src={props.img} />
      </Col>
    )
  }