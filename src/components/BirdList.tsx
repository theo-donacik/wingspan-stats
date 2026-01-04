import { useEffect, useState } from 'react';
import { Stack } from 'react-bootstrap';
import { Bird } from '../util/Types';
import ListEntry from './ListEntry';
import FilterBox from './FilterBox';


export default function BirdList(props : {birds : Bird[]}){
  const INIT_RENDER = 50
  const [numRender, setNumRender] = useState<number>(INIT_RENDER);
  const [filters, setFilters] = useState<{[id: string] : {(bird: Bird): boolean}}>({});
  const [birdList, setBirdList] = useState<Bird[]>([]);
  const [renderedCount, setRenderedCount] = useState<number>(0);
  
  
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

    let toRender = []
    for (let i = 0; i < props.birds.length; i+=1){
      let bird = props.birds[i]
      if(Object.values(filters).every(filter => filter(bird))){
        toRender.push(bird)
      }
    }
    setRenderedCount(toRender.length)
    setBirdList(toRender.slice(0, numRender))
  }, [filters, props.birds, numRender])

  return(
    <Stack gap={3}>
      <FilterBox filters={filters} setFilters={setFilters} count={renderedCount} total={props.birds.length}/>
      {
        birdList.map((bird) => {
          return(<ListEntry bird={bird} key={bird.name}/>)
        })
      }
    </Stack>
  )
}