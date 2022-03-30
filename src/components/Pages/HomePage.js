
import {Container, Image,} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
const HomePage =()=>{
const navigate =useNavigate()
const goTo =()=>{
  navigate('/search')
}
   
return(

  <><Container className='d-none d-md-flex justify-content-center'>
  <Image className='' fluid style={{ maxHeight: "80vh", objectFit: "contain" }} src='https://res.cloudinary.com/pruebasmern/image/upload/v1648540503/Music%20Shop/Front_page_nemctc.png' onClick={goTo}/>
  </Container>
  <Container style={{ maxHeight: "80vh" }}className='d-flex justify-content-center d-md-none'>
  <Image className='' fluid style={{ maxHeight: "80vh", objectFit: "contain" }} src='https://res.cloudinary.com/pruebasmern/image/upload/v1648573081/Black_Guitar_Illustration_Phone_Wallpaper_iwl8mw.png' onClick={goTo}/>
  </Container></>)}






export default HomePage;