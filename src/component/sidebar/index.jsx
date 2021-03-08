import React from 'react'
import {Container, Row, Col, Input, Button, ListGroup, ListGroupItem} from 'reactstrap'

function SideBar(props){
    return <Container className="jumbotron">
        <Row>
            <Col md={8}>
                <Input 
                    type="search"
                    id="search"
                    name="search"
                    placeholder="Search"
                />
            </Col>
            <Col md={4}>
                <Button outline color="warning" onClick={()=>props.toggle()} >
                    New
                </Button>
            </Col>
        </Row>
        <Row>
            <h3 className="my-2">List of Polls</h3> <hr/>
            <ListGroup>
            {
                props.polls.map(p => {
                    return <ListGroupItem 
                        key={p.id}
                    >
                    <Button outline block color="info" onClick={e => props.listClick(p.id)} >
                        {p.title}
                    </Button>
                    </ListGroupItem>
                })
            }
            </ListGroup>
        </Row>
    </Container>
}

export default SideBar;