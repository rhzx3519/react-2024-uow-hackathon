import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Button } from 'react-bootstrap';
import { ThemeContext } from 'styled-components';
import { Box } from '@mui/material';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import PropTypes from 'prop-types';
import Fade from 'react-reveal/Fade';
import Header from './Header';
import ProjectCard from './projects/ProjectCard';
import FallbackSpinner from './FallbackSpinner';
import ChatBox from './projects/ChatBox';


const styles = {
  containerStyle: {
    marginBottom: 25,
  },
  showMoreStyle: {
    margin: 25,
  },
  chatboxStyle: {
    position: 'fixed',
    opacity: 0.8,
    width: '80%',
    height: '80%',
    left: '10%',
    top: 60,
    bottom: 0,
  }
};

const Projects = (props) => {
  const theme = useContext(ThemeContext);
  const { header } = props;
  const [ data, setData ] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const [ showChatBox, setShowChatBox ] = useState(false);


  useEffect(() => {
    if (showChatBox) {
      document.documentElement.style.overflowY = 'hidden'
    } else {
      document.documentElement.style.overflowY = 'scroll'
    }
  }, [showChatBox]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/v1/goods`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  const numberOfItems = showMore && data ? data.length : 6;
  return (
    <>
      <Header title={header} />
      {data
        ? (
          <div className="section-content-container">
            <Container style={styles.containerStyle}>
              <Row xs={1} sm={1} md={2} lg={3} className="g-4">
                {data.goods?.slice(0, numberOfItems).map((project) => (
                  <Fade key={project.name}>
                    <ProjectCard project={project} />
                  </Fade>
                ))}
              </Row>

              {!showMore
                && (
                <Button
                  style={styles.showMoreStyle}
                  variant={theme.bsSecondaryVariant}
                  onClick={() => setShowMore(true)}
                >
                  show more
                </Button>
                )}
            </Container>
          </div>
        ) : <FallbackSpinner /> }
        
      {showChatBox 
        ? (
          <Container>
            <div style={styles.chatboxStyle}>
              <ChatBox />
            </div>
          </Container>
        ) : (
          <div></div>
        )
      }

      <Box sx={{ 
        '& > :not(style)': { 
          m: 1, 
          position: 'fixed',
          bottom: 16,
          right: 16,
        } 
        }}>
        <Fab color="primary" aria-label="add">
          <AddIcon onClick={(e) => {
            setShowChatBox(!showChatBox)
          }}/>
        </Fab>
      </Box>
    </>
  );
};

Projects.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Projects;
