import { Accordion, Col, Container, Form, InputGroup, Row, useAccordionButton } from 'react-bootstrap';
import { BeakDir, Bird, ButtonState, Color, Expansion, Food, Habitat, Nest, SubExpansion, Symbol } from "../util/Types"
import ThreeWayFilter from './ThreeWayFilter';
import TwoWayFilter from './TwoWayFilter';
import SliderFilter from './SliderFilter';
import WingspanFilter from './WingspanFilter';
import ColorFilter from './ColorFilter';
import SymbolFilter from './SymbolFilter';
import { useState } from 'react';
import { FunnelFill } from 'react-bootstrap-icons';
import ExpansionFilter from './ExpansionFilter';

export default function FilterBox(props : {
  filters : {[id: string]: (bird: Bird) => boolean},
  setFilters : React.Dispatch<React.SetStateAction<{[id: string]: (bird: Bird) => boolean}>>
}) {
  const [wingspanSelector, setWingspanSelector] = useState<(arg: boolean) => void>((bool : boolean) => () => {})
  const [symbolSelector, setSymbolSelector] = useState<(arg: boolean) => void>((bool : boolean) => () => {})
  const [expansionSelector, setExpansionSelector] = useState<(arg: boolean) => void>((bool : boolean) => () => {})
  const [fanArtBeakDir, setFanArtBeakDir] = useState<boolean>(false)

  const FanArtBeakDirIcon = process.env.PUBLIC_URL + "/img/icons/fan-art.svg"

  const ThreeWayFilterMap: {[value: string]: [string, {(bird: Bird): boolean}]} = {
    "worm-filter" : ["/img/icons/worm.png", (bird) => bird.food[Food.Worm] !== 0],
    "wheat-filter" : ["/img/icons/wheat.png", (bird) => bird.food[Food.Wheat] !== 0],
    "fish-filter" : ["/img/icons/fish.png", (bird) => bird.food[Food.Fish] !== 0],
    "rat-filter" : ["/img/icons/rat.png", (bird) => bird.food[Food.Rat] !== 0],
    "cherry-filter" : ["/img/icons/cherry.png", (bird) => bird.food[Food.Cherry] !== 0],
    "nectar-filter" : ["/img/icons/nectar.png", (bird) => bird.food[Food.Nectar] !== 0],
    "any-filter" : ["/img/icons/any-food.png", (bird) => bird.food[Food.Any] !== 0],
    "none-filter" : ["/img/icons/no-food.png", (bird) => Object.values(Food).every((val : Food) => bird.food[val] === 0)],
    "slashed-filter" : ["/img/icons/slash.png", (bird) => bird.slashed],
    "wetland-filter" : ["/img/icons/wetland-large.png", (bird) => bird.habitats.includes(Habitat.Wetland)],
    "grassland-filter" : ["/img/icons/grassland-large.png", (bird) => bird.habitats.includes(Habitat.Grassland)],
    "forest-filter" : ["/img/icons/forest-large.png", (bird) => bird.habitats.includes(Habitat.Forest)],
  }

  const TwoWayFilterMap: {[value: string]: [string, {(bird: Bird): boolean}]} = {
    "sticky-filter" : ["/img/icons/sticky-nest-large.png", (bird) => bird.nest !== Nest.Sticky],
    "holey-filter" : ["/img/icons/holey-nest-large.png", (bird) => bird.nest !== Nest.Holey],
    "eggy-filter" : ["/img/icons/eggy-nest-large.png", (bird) => bird.nest !== Nest.Eggy],
    "nesty-filter" : ["/img/icons/nesty-nest-large.png", (bird) => bird.nest !== Nest.Nesty],
    "star-filter" : ["/img/icons/star-nest-large.png", (bird) => bird.nest !== Nest.Star],
    "none-filter" : ["/img/icons/none.png", (bird) => bird.nest !== Nest.None],
  }

  function checkArt(bird: Bird, direction: BeakDir): boolean {
    return bird.artCard ? bird.artCardBeakDirection !== direction : checkBase(bird, direction)
  }

  function checkBase(bird: Bird, direction: BeakDir): boolean {
    return bird.beakDirection !== direction
  }

  const BeakDirFilterMap: {[value: string]: [string, {(art: boolean): (bird: Bird) => boolean }]} = {
    "left-filter" : ["/img/icons/beak-left.png", (art) => (art ? (b : Bird) => checkArt(b, BeakDir.Left) : (b : Bird) => checkBase(b, BeakDir.Left))],
    "right-filter" : ["/img/icons/beak-right.png", (art) => (art ? (b : Bird) => checkArt(b, BeakDir.Right) : (b : Bird) => checkBase(b, BeakDir.Right))],
    "both-filter" : ["/img/icons/slash.png", (art) => (art ? (b : Bird) => checkArt(b, BeakDir.Both) : (b : Bird) => checkBase(b, BeakDir.Both))],
    "neither-filter" : ["/img/icons/no-food.png", (art) => (art ? (b : Bird) => checkArt(b, BeakDir.Neither) : (b : Bird) => checkBase(b, BeakDir.Neither))],
  }

  const SliderFilterMap: {[value: string]: [string, {(bird: Bird, upper : number, lower : number): boolean}, number, number]} = {
    "feather-filter" : ["/img/icons/feather.png", (bird, upper, lower) => bird.feathers <= upper && bird.feathers >= lower, 0, 9],
    "egg-filter" : ["/img/icons/egg.png", (bird, upper, lower) => bird.eggCapacity <= upper && bird.eggCapacity >= lower, 0, 6]
  }

  const WingspanFilters : [number, string][] = [
    [30, "≤"],
    [40, "<"],
    [50, "<"],
    [65, ">"],
    [75, "<"],
    [100, "<"],
    [100, "≥"]
  ]

  const ColorFilterMap: {[value: string]: [string, {(bird: Bird): boolean}]} = {
    "Brown" : ["#CF7936", (bird) => bird.powerColor !== Color.Brown],
    "Pink" : ["#FEB0B5", (bird) => bird.powerColor !== Color.Pink],
    "Yellow" : ["#FDD038", (bird) => bird.powerColor !== Color.Yellow],
    "Teal" : ["#A0DCC9", (bird) => bird.powerColor !== Color.Teal],
    "White" : ["#F1F3F0", (bird) => bird.powerColor !== Color.White],
  }

  const ExpansionMap: Record<string, string> = {
    [Expansion.NorthAmerica.valueOf()] : "/img/expansion-indicators/base.svg",
    [Expansion.Asia.valueOf()] : "/img/expansion-indicators/asia.svg",
    [Expansion.European.valueOf()] : "/img/expansion-indicators/european.svg",
    [Expansion.Oceania.valueOf()] : "/img/expansion-indicators/oceania.svg",
    [Expansion.FanDesigned.valueOf()] : "/img/expansion-indicators/promo.svg",
  }

  const SubExpansionMap: Record<string, string> = {
    [SubExpansion.Asian.valueOf()] : "/img/expansion-indicators/promoAsia.svg",
    [SubExpansion.British.valueOf()] : "/img/expansion-indicators/promoUK.png",
    [SubExpansion.Canada.valueOf()] : "/img/expansion-indicators/promoCA.svg",
    [SubExpansion.Europe.valueOf()] : "/img/expansion-indicators/promoEurope.svg",
    [SubExpansion.NewZealand.valueOf()] : "/img/expansion-indicators/promoNZ.svg",
    [SubExpansion.USA.valueOf()] : "/img/expansion-indicators/promoUS.svg",
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

  const handleBeakFilter = (filter : string) => {
    var filterFun = BeakDirFilterMap[filter][1](fanArtBeakDir)
    toggleFilter(filter, filterFun)
  }

  const toggleFanArt = () => {
    setFanArtBeakDir(!fanArtBeakDir)

    var dictKeys: string[] = Object.keys(BeakDirFilterMap)
    const updatedFilters = {...props.filters}

    for(var key in dictKeys) {
      let filterKey = dictKeys[key]
      if(filterKey in props.filters) {
        updatedFilters[filterKey] = BeakDirFilterMap[filterKey][1](!fanArtBeakDir)
      }
    }
    props.setFilters(updatedFilters)
  }

  const handleColor = (filter : string, state : Boolean) => {
    var filterFun = ColorFilterMap[filter][1]
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
                    key={filter[0] + filter[1]}
                  />
                )
              })
            }
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
                      key={symbol}
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
                    color={ColorFilterMap[name as Color][0]}
                    handler={handleColor}
                    key={name}
                  />
                )
              })
            }
          </Row>
          <Row>
            {
              Object.keys(BeakDirFilterMap).map((filter : string) => {
                return (
                  <TwoWayFilter
                    filter={filter} 
                    img={process.env.PUBLIC_URL + BeakDirFilterMap[filter][0]}
                    handler={(state : Boolean) => handleBeakFilter(filter)}
                    key={filter}
                  />
                )
              })
            }
            <Col md={1} xs={2} id={"fanart"} onClick={toggleFanArt}>
              <img alt="" className={"two-way-btn " + (fanArtBeakDir ? "active" : "inactive")} src={FanArtBeakDirIcon} key={0}/>
            </Col>
          </Row>
          <Row>
            {
              Object.values(Expansion).map((expansion) => {
                return (
                  <ExpansionFilter 
                    expansion={expansion as Expansion}
                    img={process.env.PUBLIC_URL + ExpansionMap[expansion]}
                    handler={(filter, selected, setSelected) => handleToggle(
                      (bird : Bird) => filter(bird.expansion),
                      selected,
                      setSelected,
                      expansionSelector,
                      setExpansionSelector,
                      "expansion-filter"
                    )}
                    key={expansion}
                  />
                )
              })
            }
                        {
              Object.values(SubExpansion).map((expansion) => {
                return (
                   expansion !== SubExpansion.Base.valueOf() 
                && expansion !== SubExpansion.DuetSwift.valueOf()
                && expansion !== SubExpansion.Swift.valueOf()
                && 
                  <ExpansionFilter 
                    expansion={expansion as SubExpansion}
                    img={process.env.PUBLIC_URL + SubExpansionMap[expansion]}
                    handler={(filter, selected, setSelected) => handleToggle(
                      (bird : Bird) => filter(bird.subExpansion),
                      selected,
                      setSelected,
                      expansionSelector,
                      setExpansionSelector,
                      "expansion-filter"
                    )}
                    key={expansion}
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
                    handler={handleSlider}
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