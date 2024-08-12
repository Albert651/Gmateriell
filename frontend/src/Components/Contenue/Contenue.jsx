import React, { useState } from 'react';
import { Typewriter } from 'react-simple-typewriter';
import { motion } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap';
import './Contenue.css';
import boy from '../img/img2.jpg';
import ordi from '../img/images.jfif';
import ordi2 from '../img/img3.jpg';

function Contenue() {
  const [currentImage, setCurrentImage] = useState(boy);

  const handleMouseEnter = () => {
    setCurrentImage(ordi);
  };

  const handleMouseLeave = () => {
    setCurrentImage(boy);
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">
          <div className="card bg-dark text-light" style={{ height: "65vh" }}>
            <div className="card-body">
              <motion.h1
                className="card-title mat-3"
                initial={{ x: -1000 }}
                animate={{ x: [0, 500, 0] }}
                transition={{ duration: 3, delay: 0.1 }}
                whileHover={{ scale: 0.4, opacity: 0.1 }}
              >
                Gestion matériel informatique
              </motion.h1>
              <h4 className="card-text mt-8 py-4 text-warning">
                <motion.p
                animate={{ x: 0}}
                transition={{ duration: 3, delay: 0.1 }}
                whileHover={{ scale: 0.3, opacity: 0.1 }}>
                <Typewriter
                  words={["L'application joue un rôle essentiel dans la gestion du matériel informatique au sein de l'entreprise, ou dans d'autres emplacements"]}
                  loop={1}
                  cursor
                  cursorStyle=''
                  typeSpeed={90}
                  deleteSpeed={60}
                  delaySpeed={-1000}
                />
                </motion.p>
              </h4>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card2 card bg-transparent text-light" style={{ height: "65vh" }}>
            <div className="card-body">
              <Carousel>
                <Carousel.Item>
                  <img
                    className="d-block w-100 h-auto"
                    src={currentImage}
                    alt="First slide"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100 h-auto"
                    src={ordi2}
                    alt="Second slide"
                  />
                </Carousel.Item>
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contenue;

