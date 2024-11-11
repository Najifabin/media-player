import React, { useState } from 'react'
import { Card, Modal } from 'react-bootstrap'
import { removeVideoAPI, saveHistoryAPI } from '../services/allAPI';


const Videocard = ({ displayData ,setDeleteVideoResponseFromVideocard,insideCategory}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleShow = async () => {
    // display modal
    setShow(true);
  // save history in json
  const { caption, youTubeLink } = displayData
  const sysDateTime = new Date()
  console.log(sysDateTime.toLocaleString('en-Us', { timeZoneName: 'short' }));
  const timeStamp = sysDateTime.toLocaleString('en-Us', { timeZoneName: 'short' })
  // create historyDetails object (key and value name same)
  const historyDetails = { caption, youTubeLink, timeStamp }
  try {
    await saveHistoryAPI(historyDetails)
  }
  catch (err) {
    console.log(err);
  }
  }
  const deleteVideo = async(id)=>{
    try{
        const result = await removeVideoAPI(id)
        setDeleteVideoResponseFromVideocard(result)
    }catch(err){
      console.log(err);
      
    }
  }
  const videoCardDragStarted =(e,dragVideodetails)=>{
    console.log("inside videoCardDragStarted with videoId"+ dragVideodetails?.id);
    // share data using event drag start
    e.dataTransfer.setData("videoDetails",JSON.stringify(dragVideodetails))

  }



return (
  <>
    <Card draggable={true} onDragStart={e=>videoCardDragStarted(e,displayData)} style={{ height: '250px' }}>
      <Card.Img onClick={handleShow} variant="top" height={'200px'} src={displayData?.imgUrl} />
      <Card.Body>
        <Card.Text className='d-flex justify-content-between'>
          <p style={{ color: 'white' }}>{displayData?.caption}</p>
          {
          !insideCategory && <button onClick={()=>deleteVideo(displayData?.id)} className='btn'><i className='fa-solid fa-trash text-danger'></i></button>
          }
        </Card.Text>
      </Card.Body>
    </Card>

    <Modal size='lg' centered show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Caption</Modal.Title>
      </Modal.Header>
      <Modal.Body><iframe width="100%" height="397" src={`${displayData?.youTubeLink}?autoplay=1`} title="Caption" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
      </Modal.Body>
    </Modal>

  </>
)
}

export default Videocard