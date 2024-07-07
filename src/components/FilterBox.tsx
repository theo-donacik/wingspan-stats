import { Accordion, Button, Card, Col, Container, Form, InputGroup, Row, useAccordionButton } from 'react-bootstrap';
import { Bird, ButtonState, Color, Food, Habitat, Nest, Symbol } from "../util/Types"
import ThreeWayFilter from './ThreeWayFilter';
import TwoWayFilter from './TwoWayFilter';
import SliderFilter from './SliderFilter';
import WingspanFilter from './WingspanFilter';
import ColorFilter from './ColorFilter';
import SymbolFilter from './SymbolFilter';
import { useState } from 'react';
import { FunnelFill } from 'react-bootstrap-icons';

export default function FilterBox(props : {
  filters : {[id: string]: (bird: Bird) => boolean},
  setFilters : React.Dispatch<React.SetStateAction<{[id: string]: (bird: Bird) => boolean}>>
}) {
  const [wingspanSelector, setWingspanSelector] = useState<(arg: boolean) => void>((bool : boolean) => () => {})
  const [colorSelector, setColorSelector] = useState<(arg: boolean) => void>((bool : boolean) => () => {})
  const [symbolSelector, setSymbolSelector] = useState<(arg: boolean) => void>((bool : boolean) => () => {})

  const ThreeWayFilterMap: {[value: string]: [string, {(bird: Bird): boolean}]} = {
    "worm-filter" : ["/img/icons/worm.png", (bird) => bird.food[Food.Worm] != 0],
    "wheat-filter" : ["/img/icons/wheat.png", (bird) => bird.food[Food.Wheat] != 0],
    "fish-filter" : ["/img/icons/fish.png", (bird) => bird.food[Food.Fish] != 0],
    "rat-filter" : ["/img/icons/rat.png", (bird) => bird.food[Food.Rat] != 0],
    "cherry-filter" : ["/img/icons/cherry.png", (bird) => bird.food[Food.Cherry] != 0],
    "nectar-filter" : ["/img/icons/nectar.png", (bird) => bird.food[Food.Nectar] != 0],
    "any-filter" : ["/img/icons/any-food.png", (bird) => bird.food[Food.Any] != 0],
    "none-filter" : ["/img/icons/no-food.png", (bird) => Object.values(Food).every((val : Food) => bird.food[val] == 0)],
    "slashed-filter" : ["/img/icons/slash.png", (bird) => bird.slashed],
    "wetland-filter" : ["/img/icons/wetland-large.png", (bird) => bird.habitats.includes(Habitat.Wetland)],
    "grassland-filter" : ["/img/icons/grassland-large.png", (bird) => bird.habitats.includes(Habitat.Grassland)],
    "forest-filter" : ["/img/icons/forest-large.png", (bird) => bird.habitats.includes(Habitat.Forest)],
  }

  const TwoWayFilterMap: {[value: string]: [string, {(bird: Bird): boolean}]} = {
    "sticky-filter" : ["/img/icons/sticky-nest-large.png", (bird) => bird.nest != Nest.Sticky],
    "holey-filter" : ["/img/icons/holey-nest-large.png", (bird) => bird.nest != Nest.Holey],
    "eggy-filter" : ["/img/icons/eggy-nest-large.png", (bird) => bird.nest != Nest.Eggy],
    "nesty-filter" : ["/img/icons/nesty-nest-large.png", (bird) => bird.nest != Nest.Nesty],
    "star-filter" : ["/img/icons/star-nest-large.png", (bird) => bird.nest != Nest.Star],
    "none-filter" : ["/img/icons/none.png", (bird) => bird.nest != Nest.None],
  }

  const SliderFilterMap: {[value: string]: [string, {(bird: Bird, upper : number, lower : number): boolean}, number, number]} = {
    "feather-filter" : ["/img/icons/feather.png", (bird, upper, lower) => bird.feathers <= upper && bird.feathers >= lower, 0, 9],
    "egg-filter" : ["/img/icons/egg.png", (bird, upper, lower) => bird.eggCapacity <= upper && bird.eggCapacity >= lower, 0, 6]
  }

  const WingspanFilters : [number, string][] = [
    [30, "<="],
    [40, "<"],
    [50, "<"],
    [65, ">"],
    [75, "<"],
    [100, "<"],
    [100, ">="]
  ]

  const ColorFilters : Record<keyof typeof Color, string> = {
    Brown : '#CF7936',
    Pink : "#FEB0B5",
    Yellow : "#FDD038",
    Teal : "#A0DCC9",
    White : "#F1F3F0",
  }

  const SymbolFilters : Record<keyof typeof Symbol, string> = {
    Death : "/img/icons/death.png",
    Tuck : "/img/icons/tuck.png",
    Bonus : "/img/icons/bonus.png",
    None : ""
  }

  const deleteFromFilters = (key : string) => {
    props.setFilters(({[key]: toDelete, ...rest}) => rest);
  }

  const addToFilters = (key : string, filter : {(bird: Bird): boolean}) => {
    const updatedFilters = {...props.filters}
    updatedFilters[key] = filter
    props.setFilters(updatedFilters)
  }

  const toggleFilter = (id : string, filter : {(bird: Bird): boolean}) => {
    id in props.filters ? deleteFromFilters(id) : addToFilters(id, filter)
  }
  
  const handleSearch = (e : React.ChangeEvent<HTMLInputElement>) => {
    addToFilters("text-filter", (bird : Bird) => bird.name.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "").includes(e.target.value.toLowerCase()))
  }

  const handleThreeWay = (filter : string, state : ButtonState) => {
    var filterFun = ThreeWayFilterMap[filter][1]
    switch (state) {
      case ButtonState.Off:
        toggleFilter(filter, filterFun)
        return
      case ButtonState.Inclusive:
        addToFilters(filter, (bird) => !filterFun(bird))
        return
      case ButtonState.Exclusive:
        toggleFilter(filter, filterFun)
        return
    }
  }

  const handleTwoWay = (filter : string, state : Boolean) => {
    var filterFun = TwoWayFilterMap[filter][1]
    toggleFilter(filter, filterFun)
  }

  const handleSlider = (filter : string, upper : number, lower : number) => {
    var filterFun = (bird: Bird) => SliderFilterMap[filter][1](bird, upper, lower)
    addToFilters(filter, filterFun)
  }

  const handleToggle = (
    filter : (bird : Bird) => boolean,
    currentState : boolean,
    selector : (arg: boolean) => void,
    componentSelector : (arg : boolean) => void,
    setComponentSelector : React.Dispatch<React.SetStateAction<(arg: boolean) => void>>,
    filterName : string
  ) => {
    if(currentState) {
      selector(false)
      setComponentSelector(() => () => null)
      deleteFromFilters(filterName)
    } else {
      componentSelector(false)
      setComponentSelector(() => selector)
      selector(true)
      addToFilters(filterName, filter)
    }
  }

  function CustomToggle(props: { eventKey : string}) {
    const onClick = useAccordionButton(props.eventKey, () => null);
    return (
      <InputGroup.Text onClick={onClick} className='dropdown-btn'>
        <FunnelFill/>
      </InputGroup.Text>
    )
  }
  
  return (
    <Accordion>
      <InputGroup className='search mb-3'>
        <Form.Control style={{fontSize: '40px'}}
                      onChange={(e : React.ChangeEvent<HTMLInputElement>) => handleSearch(e)}/>
        <CustomToggle eventKey='0'/>
      </InputGroup>
      <Accordion.Collapse eventKey="0">
        <Container fluid className="d-grid gap-4">
          <Row sm={6} md={12}>
            {
              Object.keys(ThreeWayFilterMap).map((filter : string) => {
                return (
                  <ThreeWayFilter
                    filter={filter} 
                    img={process.env.PUBLIC_URL + ThreeWayFilterMap[filter][0]}
                    handler={(state : ButtonState) => handleThreeWay(filter, state)}
                    key={filter}
                  />
                )
              })
            }
          </Row>
          <Row>
            {
              Object.keys(TwoWayFilterMap).map((filter : string) => {
                return (
                  <TwoWayFilter
                    filter={filter} 
                    img={process.env.PUBLIC_URL + TwoWayFilterMap[filter][0]}
                    handler={(state : Boolean) => handleTwoWay(filter, state)}
                    key={filter}
                  />
                )
              })
            }
          </Row>
          <Row>
            {
              WingspanFilters.map((filter)  => {
                return (
                  <WingspanFilter
                    num={filter[0]}
                    symbol={filter[1]}
                    handler={(filter, selected, setSelected) => handleToggle(
                      (bird : Bird) => filter(Number(bird.wingspan.replace(/\D/g, ''))),
                      selected,
                      setSelected,
                      wingspanSelector,
                      setWingspanSelector,
                      "wingspan-filter"
                    )}
                  />
                )
              })
            }
          </Row>
          <Row>
            {
              Object.keys(Color).map((name) => {
                return (
                  <ColorFilter 
                    name={name as Color}
                    color={ColorFilters[name as Color]}
                    handler={(filter, selected, setSelected) => handleToggle(
                      (bird : Bird) => filter(bird.powerColor),
                      selected,
                      setSelected,
                      colorSelector,
                      setColorSelector,
                      "color-filter"
                    )}
                  />
                )
              })
            }
          </Row>
          <Row>
            {
                Object.keys(Symbol).map((symbol) => {
                  return (
                    symbol !== Symbol.None &&
                    <SymbolFilter 
                      symbol={symbol as Symbol}
                      img={process.env.PUBLIC_URL + SymbolFilters[symbol as Symbol]}
                      handler={(filter, selected, setSelected) => handleToggle(
                        (bird : Bird) => filter(bird.symbol),
                        selected,
                        setSelected,
                        symbolSelector,
                        setSymbolSelector,
                        "symbol-filter"
                      )}
                    />
                  )
                })
              }
          </Row>
          <Row>
            {
              Object.keys(SliderFilterMap).map((filter : string) => {
                return (
                  <SliderFilter
                    filter={filter} 
                    img={process.env.PUBLIC_URL + SliderFilterMap[filter][0]}
                    handler={(upper : number, lower : number) => handleSlider(filter, upper, lower)}
                    min={SliderFilterMap[filter][2]}
                    max={SliderFilterMap[filter][3]}
                    key={filter}
                  />
                )
              })
            }
          </Row>
        </Container>
      </Accordion.Collapse>
    </Accordion>
  )
}