import React, { useEffect, useState } from 'react';
import { Stack } from 'react-bootstrap';
import { Bird } from '../util/Types';
import ListEntry from './ListEntry';
import FilterBox from './FilterBox';


export default function BirdList(props : {birds : Bird[]}){
  const INIT_RENDER = 50
  const [numRender, setNumRender] = useState<number>(INIT_RENDER);
  const [filters, setFilters] = useState<{[id: string] : {(bird: Bird): boolean}}>({});
  
  
  useEffect(() => {
    const handleScroll = () => {
      const scrolledTo = window.scrollY + window.innerHeight;
      const isReachBottom = document.body.scrollHeight <= scrolledTo * 1.25;
      if (isReachBottom) setNumRender(numRender + INIT_RENDER)
    }
    window.addEventListener("scroll", handleScroll)
  })

  useEffect(() => {
    setNumRender(INIT_RENDER);
  }, [filters])

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

  return(
    <Stack gap={3}>
      <FilterBox filters={filters} setFilters={setFilters}/>
      {
        createBirdList().map((bird) => {
          return(<ListEntry bird={bird} key={bird.name}/>)
        })
      }
    </Stack>
  )
}