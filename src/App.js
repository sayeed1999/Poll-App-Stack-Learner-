import './App.css';
import React, {useEffect, useState} from 'react'
import { Container, Row, Col } from 'reactstrap'

import POLLS from './data/index'
import SideBar from './component/sidebar/index';
import MainPage from './component/mainpage/index';
import ModalForm from './component/form/index'


function App(){  

  const[polls, setPolls] = useState([])
  const[selectedPoll, setSelectedPoll] = useState({})
  const[editMode, setEditMode] = useState(false)
  
  const[modal, setModal] = useState(false)
  
  function toggle(){
    if(modal && editMode){
      setEditMode(false)
    }
    setModal(!modal)
  }


  useEffect(() => {
    setPolls( POLLS )
  }, [])

  function listClick(pollId){
    const poll = polls.find(p => p.id===pollId)
    setSelectedPoll( poll ) //can you see
    //it is holding actual reference to the polls,
    //if const poll is changed, it automatically changes inside polls!!
  }

  function giveVote(selectedOption){
    
    selectedPoll.options.forEach(opt => {
      if(opt.value===selectedOption){
        opt.vote++;
      }
    })
    selectedPoll.totalVote++;
    setSelectedPoll( selectedPoll )
  }

  //CRUD Options

  function deletePoll(){
    const pollToDelete = selectedPoll
    setSelectedPoll( {} )
    const _polls = polls.filter(p => p.id !== pollToDelete.id)
    setPolls( _polls )
  }

  //edit poll incomplete
  function editPoll(){
    setEditMode(true)
    toggle()
  }

  return (
    <Container className="my-5">
      <Row>
        <Col sm={5} md={4}>
          <SideBar
            polls={polls}
            selectedPoll={selectedPoll}
            listClick={listClick}
            toggle={toggle}
          />
        </Col>
        <Col sm={7} md={8}>
          <MainPage 
            selectedPoll={selectedPoll}
            giveVote={giveVote}
            deletePoll={deletePoll}
            editPoll={editPoll}
          />
        </Col>
      </Row>

      <ModalForm
        modal={modal}
        toggle={toggle}
        polls={polls}
        setPolls={setPolls}
        editMode={editMode}
        selectedPoll={selectedPoll}
        listClick={listClick}
      />

    </Container>
  )
}

export default App;