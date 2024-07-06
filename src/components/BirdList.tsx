import React, { ChangeEvent, UIEventHandler, useEffect, useState } from 'react';
import { Button, Card, Col, Container, Form, Row, Stack } from 'react-bootstrap';
import { Bird, ButtonState, Color, Food, Habitat, Nest } from '../util/Types';
import ListEntry from './ListEntry';
import ThreeWayFilter from './ThreeWayFilter';
import TwoWayFilter from './TwoWayFilter';
import SliderFilter from './SliderFilter';
import WingspanFilter from './WingspanFilter';
import ColorFilter from './ColorFilter';

export default function BirdList(props : {birds : Bird[]}){
  const INIT_RENDER = 50
  const [filters, setFilters] = useState<{[id: string] : {(bird: Bird): boolean}}>({});
  const [numRender, setNumRender] = useState<number>(INIT_RENDER)
  const [wingspanSelector, setWingspanSelector] = useState<(arg: boolean) => void>((bool : boolean) => () => {})
  const [colorSelector, setColorSelector] = useState<(arg: boolean) => void>((bool : boolean) => () => {})
  
  useEffect(() => {
    const handleScroll = () => {
      const scrolledTo = window.scrollY + window.innerHeight;
      const isReachBottom = document.body.scrollHeight <= scrolledTo * 1.25;
      if (isReachBottom) setNumRender(numRender + INIT_RENDER)
    }
    window.addEventListener("scroll", handleScroll)
  })

  // TODO filters:
  // Symbol (bonus card, death, tucking)
  // Power Color
  // Expantion
  // beak direction

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

  function lt(num : number) {return (x : number) => {return x < num}} 
  function leq(num : number) {return (x : number) => {return x <= num}}
  function gt(num : number) {return (x : number) => {return x > num}} 
  function geq(num : number) {return (x : number) => {return x >= num}} 

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

  const deleteFromFilters = (key : string) => {
    setFilters(({[key]: toDelete, ...rest}) => rest);
  }

  const addToFilters = (key : string, filter : {(bird: Bird): boolean}) => {
    const updatedFilters = {...filters}
    updatedFilters[key] = filter
    setFilters(updatedFilters)
  }

  const toggleFilter = (id : string, filter : {(bird: Bird): boolean}) => {
    setNumRender(INIT_RENDER)
    id in filters ? deleteFromFilters(id) : addToFilters(id, filter)
  }
  
  const handleSearch = (e : React.ChangeEvent<HTMLInputElement>) => {
    setNumRender(INIT_RENDER)
    addToFilters("text-filter", (bird : Bird) => bird.name.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "").includes(e.target.value.toLowerCase()))
  }

  const createBirdList = () : Bird[] => {
    let toRender = []
    for (let i = 0; toRender.length < numRender && i < props.birds.length; i+=1){
      let bird = props.birds[i]
      if(Object.values(filters).every(filter => filter(bird))){
        toRender.push(bird)
      }
    }
    return toRender
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

  const handleWingspan = (
    filter : (num : number) => boolean,
    selected : boolean,
    setSelected : (arg: boolean) => void
  ) => {
    if(selected) {
      setSelected(false)
      setWingspanSelector(() => () => null)
      deleteFromFilters("wingspan-filter")
    } else {
      wingspanSelector(false)
      setWingspanSelector(() => setSelected)
      setSelected(true)
      addToFilters("wingspan-filter", (bird : Bird) => filter(Number(bird.wingspan.replace(/\D/g, ''))))
    }
  }

  const handleColor = (
    filter : (name : Color) => boolean,
    selected : boolean,
    setSelected : (arg: boolean) => void
  ) => {
    if(selected) {
      setSelected(false)
      setColorSelector(() => () => null)
      deleteFromFilters("color-filter")
    } else {
      colorSelector(false)
      setColorSelector(() => setSelected)
      setSelected(true)
      addToFilters("color-filter", (bird : Bird) => filter(bird.powerColor))
    }
  }

  return(
    <Stack gap={3}>
      <Container fluid className="d-grid gap-4">
        <Row>
          <Form.Group className='search'>
            <Form.Control style={{fontSize: '40px'}}
                          onChange={(e : React.ChangeEvent<HTMLInputElement>) => handleSearch(e)}/>
          </Form.Group>
        </Row>
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
                  handler={handleWingspan}
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
                  handler={handleColor}
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
      {
        createBirdList().map((bird) => {
          return(<ListEntry bird={bird} key={bird.name}/>)
        })
      }
    </Stack>
  )
}