import React,{useState} from 'react'
import { Modal,Button,FloatingLabel,Form } from 'react-bootstrap'
import {saveVideoAPI} from '../services/allAPI'

const Add = ({setAddResponseFromHome}) => {
  const [invalidYouTubeLink,setInvalidYouTubeLink] = useState(false)
  const [videoDetails,setVideoDetails] = useState({caption:"",imgUrl:"",youTubeLink:""})
  console.log(videoDetails);
  
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const extractingEmbedLinkFromTouTubeLInk = (userInputYouTubeLink)=>{
    if(userInputYouTubeLink.includes('https://www.youtube.com/watch?v=')){
      const videoId = userInputYouTubeLink.split('v=')[1].slice(0,11)
      setInvalidYouTubeLink(false)
      setVideoDetails({...videoDetails,youTubeLink:`https://www.youtube.com/embed/${videoId}`})

    }else{
      setInvalidYouTubeLink(true)
      setVideoDetails({...videoDetails,youTubeLink:""})
    }
  }
  const handleUpload = async ()=>{
    // destructuring
    const {caption,imgUrl,youTubeLink} = videoDetails
    if(caption && imgUrl && youTubeLink){
      // store details permanetly
      try{
        const result = await saveVideoAPI(videoDetails)
        console.log(result);
        if(result.status>=200 && result.status<300){
          alert("Video uploaded successfully!!!")
          handleClose()
          // pass result to view component
          setAddResponseFromHome(result)
        }else{
          console.log(result);
          
        }  
      }catch(err){
        console.log(err);
        
      }
    }
    else{
      alert("Please fill the form!!!")
    }

  }
  return (
    <>
      <div className="d-flex align-items-center">
        <h5>Upload New Video</h5>
        <button onClick={handleShow} className='btn btn-warning ms-3 rounded-circle fw-bolder fs-5'>+</button>
      </div>

      <Modal show={show} onHide={handleClose} backdrop="static"keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Uploading Video Details!!!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="border rounded p-3">
            <FloatingLabel controlId='floatingCaption' label='Video Caption'>
              <Form.Control onChange={e=>setVideoDetails({...videoDetails,caption:e.target.value})} type='text'placeholder='Video Caption'/>
            </FloatingLabel>
            <FloatingLabel className='mt-2' controlId='floatingUrl' label='Video Image Url'>
              <Form.Control onChange={e=>setVideoDetails({...videoDetails,imgUrl:e.target.value})} type='text'placeholder='Video Image Url'/>
            </FloatingLabel>
            <FloatingLabel className='mt-2' controlId='floatingCaption' label='Video Youtube Link'>
              <Form.Control onChange={e=>extractingEmbedLinkFromTouTubeLInk(e.target.value)} type='text'placeholder='Video Youtube Link'/>
            </FloatingLabel>
            {
              invalidYouTubeLink &&
              <div className="text-danger fw-bolder mt-2">Invalid youtube link...Please try with other!!!</div>
            }
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleUpload} className='btn btn-info' variant="primary">Add</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Add