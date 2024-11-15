import React, { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import Videocard from './Videocard'
import { getAllVideosAPI, saveVideoAPI, updateCategoryAPI } from '../services/allAPI'

const View = ({ addResponseFromHome, deleteResponseFromCategory, setDeleteResponseFromView }) => {
  const [allVideos, setAllVideos] = useState([])
  const [deleteVideoResponseFromVideocard, setDeleteVideoResponseFromVideocard] = useState([])

  useEffect(() => {
    getAllVideos()
  }, [addResponseFromHome, deleteVideoResponseFromVideocard, deleteResponseFromCategory])
  console.log(allVideos);

  const getAllVideos = async () => {
    try {
      const result = await getAllVideosAPI()
      console.log(result);
      if (result.status >= 200 && result.status < 300) {
        setAllVideos(result.data)
      }
    } catch (err) {
      console.log(err);

    }
  }

  const dragOverView = (e) => {
    e.preventDefault()
  }


  const categoryVideodropOverView = async (e) => {
    console.log("inside categoryVideodropOverView");
    const { video, categoryDetails } = JSON.parse(e.dataTransfer.getData("dragData"))
    console.log(video, categoryDetails);
    const updatedCategoryVideoList = categoryDetails?.allVideos?.filter(item => item.id != video?.id)
    const updatedCategory = { ...categoryDetails, allVideos: updatedCategoryVideoList }
    console.log(updatedCategory);
    // updating the category by delete video from category using api
    const result = await updateCategoryAPI(updatedCategory)
    // use state lifting to communicate data from view to category
    setDeleteResponseFromView(result)
    // use api to upload video
    await saveVideoAPI(video)
    // call getAllVideos function
    getAllVideos()
  }


  return (
    <>
      <Row droppable="true" onDragOver={dragOverView} onDrop={e => categoryVideodropOverView(e)}>
        {
          allVideos?.length > 0 ?
            allVideos?.map(video => (
              <Col key={video?.id} className='mb-2' sm={12} md={6} lg={4}>
                <Videocard setDeleteVideoResponseFromVideocard={setDeleteVideoResponseFromVideocard} displayData={video} />
              </Col>
            ))
            :
            <div className="fw-bolder text-danger fs-5">No videos are uploaded yet.</div>
        }
      </Row>
    </>
  )
}

export default View