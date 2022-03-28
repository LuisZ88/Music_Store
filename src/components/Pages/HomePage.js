import { useState } from 'react';
import {Col,Image, Carousel, Container} from 'react-bootstrap'
const HomePage =()=>{

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
      };
      const [index, setIndex] = useState(0);
return(
<Container className='m-auto' style={{ maxWidth: "100vh" }}>

  <Carousel activeIndex={index} onSelect={handleSelect}>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src="https://res.cloudinary.com/pruebasmern/image/upload/v1648489589/Music%20Shop/ezdk9nuux3pt7wcbw49w.jpg"
        alt="First slide"
      />
      <Carousel.Caption className='text-dark'>
        <h3>SBM1BF
</h3>
        <p>Las bajos eléctricos SX tienen fama de ser los mejores valorados e imbatibles por su precio.</p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src="https://res.cloudinary.com/pruebasmern/image/upload/v1648489007/Music%20Shop/dks4cljfn8g9nqaikksn.png"
        alt="Second slide"
      />

      <Carousel.Caption>
        <h3>Second slide label</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src="https://res.cloudinary.com/pruebasmern/image/upload/v1648489805/Music%20Shop/kuvu5iyqkteegtuufhud.jpg"
        alt="Third slide"
      />

      <Carousel.Caption>
        <h3>Third slide label</h3>
        <p>
          Praesent commodo cursus magna, vel scelerisque nisl consectetur.
        </p>
      </Carousel.Caption>
    </Carousel.Item>
  </Carousel>

</Container>)}





export default HomePage;