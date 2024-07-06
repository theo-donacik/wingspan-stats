import React, { CSSProperties, useEffect, useState } from 'react';
import { Accordion, Card, Col, Container, Row, useAccordionButton } from 'react-bootstrap';
import { Bird } from '../util/Types';
import HabitatPart from './HabitatPart';
import CardView from './CardView';
import FoodPart from './FoodPart';
import WingspanPart from './WingspanPart';
import NestPart from './NestPart';
import EggsPart from './EggsPart';
import PointPart from './PointPart';

export default function ListEntry(props : {bird : Bird, hidden? : boolean}){
  return(
    <Accordion style={props.hidden ? {display:'none'} : {}}>
      <Accordion.Item eventKey={props.bird.name}>
        <Accordion.Header>
          <Container className='list-header' fluid>
            <Row md="auto" className='list-entry-row'>
              <Col className='list-entry-habitat' xs={4} lg={2}> 
                <HabitatPart habitats={props.bird.habitats}></HabitatPart>
              </Col>
              <Col xs={6} lg={2}>
                {props.bird.name}
              </Col>
              <Col xs={2} lg={1}>
                <PointPart points={props.bird.feathers}/>
              </Col>
              <Col xs={4} lg={2}> 
                <FoodPart food={props.bird.food} 
                          slashed={props.bird.slashed}
                          alternateCost={props.bird.alternateCost}
                          total={props.bird.totalFoodCost}
                  />
              </Col>
              <Col className='list-entry-wingspan' xs={2} lg={1}>
                <WingspanPart wingspan={props.bird.wingspan}/>
              </Col>
              <Col xs={2} lg={1}>
                <NestPart nest={props.bird.nest}/>
              </Col>
              <Col xs={4} lg={2}>
                <EggsPart eggs={props.bird.eggCapacity}/>
              </Col>
            </Row>
          </Container>
        </Accordion.Header>
        <Accordion.Body style={{backgroundColor:"#AAE4DE"}}>
          <CardView bird={props.bird}></CardView>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  )
}