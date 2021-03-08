import React, { useState } from 'react'
import {Container, ListGroup, ListGroupItem, Row, Col, Input, Button, Form, FormGroup, FormFeedback} from 'reactstrap'

function MainPage(props){

    const[selectedOption, setSelectedOption] = useState('')
    const[name, setName] = useState('')
    const[errors, setErrors] = useState({})
    
    function validate(){
        const _errors = {}
        if(name==='') _errors.name = 'Please provide your name'
        if(selectedOption==='') _errors.selectedOption = 'You must select one option'
        setErrors(_errors)
        if(Object.keys(_errors).length===0) return true;
        return false;
    }

    function formSubmit(e){
        e.preventDefault();
        if(!validate()) return;
        props.giveVote(selectedOption)
        e.target.reset()
        setName('')
        setSelectedOption('')
    }

    return (
        <Container className="my-3">
        {
            Object.keys(props.selectedPoll).length===0 &&
                <div>There is no poll selected to display currently...</div>
        }
        {
            Object.keys(props.selectedPoll).length>0 && 
                <div>
                  <h3>{props.selectedPoll.title}</h3>
                  <p>{props.selectedPoll.description}</p>
                  <Form onSubmit={e=> formSubmit(e)}>
                    <label htmlFor="options"><h4>Options</h4></label>
                    <span>
                        <Button className="mx-2" outline color="secondary" onClick={e=>props.editPoll()} >Edit Poll</Button>
                        <Button className="mx-2" outline color="danger" onClick={e=>props.deletePoll()} >Delete Poll!</Button>
                    </span>
                    <ListGroup>
                    <FormGroup>
                    {
                        props.selectedPoll.options.map(opt => {
                            return <ListGroupItem key={opt.id}>
                                <Row>
                                    <Col className="ml-2" xs={1} md={1}>
                                        <Input 
                                            type="radio"
                                            name= "options"
                                            checked={selectedOption===opt.value?true:false}
                                            value={opt.value}
                                            onChange={e => setSelectedOption(opt.value)}
                                        />
                                    </Col>
                                    <Col xs={10} md={4} lg={5}>
                                        {opt.value}
                                    </Col>
                                    
                                    <Col xs={5} sm={5} md={2}>
                                        <p className="alert alert-success">{opt.vote}</p>
                                    </Col>
                                    <Col xs={6} sm={6} md={4} lg={3}>
                                        <p className="alert alert-danger">{ props.selectedPoll.totalVote===0? 0.00 : (100*opt.vote/props.selectedPoll.totalVote).toFixed(2)}%</p>
                                    </Col>
                                </Row>
                            </ListGroupItem>
                        })
                    }
                    { errors.selectedOption && <div className="alert alert-danger">{errors.selectedOption}</div> }
                    </FormGroup>
                    </ListGroup>
                    <FormGroup>
                        <Input
                            className="my-2"
                            type="text"
                            placeholder="your name please"
                            name="name"
                            title="name"
                            value={name}
                            onChange={e => setName( e.target.value )}
                            invalid={name===''?true:false}
                            valid={name!==''?true:false}
                        />
                        { errors.name && <FormFeedback>{errors.name}</FormFeedback> }
                    </FormGroup>
                    <Button className="md-4" type="submit" color="primary">
                        Submit
                    </Button>
                  </Form>
                </div>
        }
        </Container>
    )}

export default MainPage;