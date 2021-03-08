import React, {useState, useEffect} from 'react'
import { Modal, ModalBody, ModalHeader, Form, FormGroup, Label, Input, Button } from 'reactstrap'

import shortid from 'shortid'

const defaultOptions = [
  {id: shortid.generate(), value: '', vote: 0},
  {id: shortid.generate(), value: '', vote: 0},
]

function ModalForm(props){
    
    const[title, setTitle] = useState('')
    const[description, setDescription] = useState('')
    const[options, setOptions] = useState([...defaultOptions])
    const[errors, setErrors] = useState({})
    
    //editPoll part
    
    useEffect(()=>{
      if(props.editMode){
        setTitle( props.selectedPoll.title )
        setDescription( props.selectedPoll.description )
        setOptions( props.selectedPoll.options )
      }else{
        setTitle( '' )
        setDescription( '' )
        setOptions( [...defaultOptions] )
      }
    },[props.editMode])
    
    
    function handleChangeOptions(e, index){
      
      const option = {id: options[index].id, value: e.target.value, vote: options[index].vote}
      
      const _options = options.map((p, i)=>{
        //console.log(i)
        if(i===index) return option
        return p
      })
      
      setOptions(_options)
      //console.log(options[index].value)
    }

    function addOptions(){
      setOptions( options.concat({ id: shortid.generate(), value: '', vote: 0 }) ); /* .concat actually creates again */
    }

    function validate(){
      //console.log(options)
      const _errors = {}
      if(title==='') _errors.title='Title is required'
      if(description==='') _errors.description='Description is required'
      
      options.forEach(p => {
        if(p.value==='') _errors.options = 'Any field cannot be empty'
      })
      setErrors( _errors )
      return Object.keys(_errors).length===0
    }

    function handleSubmit(e){
        e.preventDefault()
        //console.log(errors)
        if(!validate()) return;

        const newPoll = {}
        newPoll.title = title
        newPoll.description = description
        newPoll.options = options
        newPoll.id = props.editMode===true ? props.selectedPoll.id : shortid.generate()
        newPoll.created = new Date()
        newPoll.totalVote = props.editMode===true ? props.selectedPoll.totalVote : 0
        
        if(props.editMode)
        {
          const _polls = props.polls.filter(p => p.id !== props.selectedPoll.id).concat(newPoll)
          props.setPolls(_polls)
        } else {
          const _polls = [...props.polls, newPoll]
          props.setPolls(_polls)
        }
        e.target.reset()

        setTitle('')
        setDescription('')
        setOptions([...defaultOptions])
        setErrors({})
    }

    return (
    <Modal isOpen={props.modal} toggle={()=>props.toggle()} unmountOnClose={true}>
        <ModalHeader>
          <h2>{props.editMode ? 'Edit Existing Poll' : 'Add New Poll'}</h2>
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={e=>handleSubmit(e)}>
            <Label htmlFor="title">Title</Label>
            <FormGroup>
              <Input 
                type="text"
                name="title"
                title="title"
                placeholder="Poll Title Here"
                value={title}
                onChange={e=>setTitle(e.target.value)}
              />
              { errors.title && <div className="alert alert-danger">{errors.title}</div> }
            </FormGroup>
            
            <Label htmlFor="description">Description</Label>
            <FormGroup>
              <Input 
                type="textarea"
                name="description"
                title="description"
                placeholder="Poll Description Here"
                value={description}
                onChange={e=>setDescription(e.target.value)}
              />
              { errors.description && <div className="alert alert-danger">{errors.description}</div> }
            </FormGroup>

            <Label htmlFor="options">Options</Label>
            <span><Button className="mx-1 mb-1" color="warning" onClick={()=>addOptions()} >Add Option</Button></span>
            <FormGroup>
              {
              options.map((opt, index) => {
                return <Input
                    key={opt.id}
                    type="text"
                    title="options"
                    name="options"
                    placeholder="Option"
                    onChange={e => handleChangeOptions(e, index)}
                    value={opt.value}
                />
              })
              }
              { errors.options && <div className="alert alert-danger">{errors.options}</div> }
            </FormGroup>
            <FormGroup>
                <Button color="primary" type="submit">
                    Submit
                </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    )
}

export default ModalForm;