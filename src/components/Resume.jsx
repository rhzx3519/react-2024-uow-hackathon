import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
import Fade from 'react-reveal';
import { Container } from '@mui/material';
import Header from './Header';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';

function Resume(props) {
  // const theme = useContext(ThemeContext);
  const { header } = props;
  const [content, setContent] = useState('');

  useEffect(() => {
    fetch(endpoints.resume, {
      method: 'GET',
    })
      .then((res) => res.text())
      .then((text) => setContent(text))
      .catch((err) => err);
  }, []);

  return (
    <>
      <Header title={header} />
      <Container maxWidth="lg">
        {content
          ? (
            <Fade>
              <ReactMarkdown children={content} />
            </Fade>
          )
          : <FallbackSpinner />}
      </Container>
    </>
  );
}

Resume.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Resume;
