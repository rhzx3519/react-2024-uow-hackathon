import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import Grid from '@mui/material/Grid';
import { Box, Container } from '@mui/material';
import PropTypes from 'prop-types';
import Fade from 'react-reveal';
import Header from './Header';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';

const styles = {
  introContainer: {
    display: 'flex',
  },
  introTextContainer: {
    margin: 10,
    flexDirection: 'column',
    whiteSpace: 'pre-wrap',
    textAlign: 'left',
    fontSize: '1.2em',
    fontWeight: 500,
  },
  introImageContainer: {
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
};

function About(props) {
  const { header } = props;
  const [data, setData] = useState(null);

  const parseIntro = (text) => (
    <ReactMarkdown
      children={text}
    />
  );

  useEffect(() => {
    fetch(endpoints.about, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  return (
    <>
      <Header title={header} />
      <div className="section-content-container">
        <Container maxWidth="lg">
          {data
            ? (
              <Fade>
                <Box sx={{ flexGrow: 1 }}>
                  <Grid container spacing={2}>
                    <Grid xs={12} md={6}>
                      <div style={styles.introTextContainer}>
                        {parseIntro(data.about)}
                      </div>
                    </Grid>
                    <Grid xs={12} md={6}>
                      <div style={styles.introImageContainer}>
                        <img style={{ maxWidth: '100%' }} src={data?.imageSource} alt="profile" />
                      </div>
                    </Grid>
                  </Grid>
                </Box>
              </Fade>
            )
            : <FallbackSpinner />}
        </Container>
      </div>
    </>
  );
}

About.propTypes = {
  header: PropTypes.string.isRequired,
};

export default About;
