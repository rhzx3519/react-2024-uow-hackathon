import React, { useContext } from 'react';
import {
  Button, Card, Badge, Col,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { ThemeContext } from 'styled-components';
import ReactMarkdown from 'react-markdown';

const styles = {
  badgeStyle: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    margin: 5,
  },
  cardStyle: {
    borderRadius: 10,
  },
  cardTitleStyle: {
    fontSize: 15,
    fontWeight: 700,
  },
  cardTextStyle: {
    textAlign: 'left',
  },
  linkStyle: {
    textDecoration: 'none',
    padding: 10,
  },
  buttonStyle: {
    margin: 5,
  },
};

const ProjectCard = (props) => {
  const theme = useContext(ThemeContext);
  const parseBodyText = (text) => <ReactMarkdown children={text} />;

  const { project } = props;

  return (
    <Col>
      <Card
        style={{
          ...styles.cardStyle,
          backgroundColor: theme.cardBackground,
          borderColor: theme.cardBorderColor,
        }}
        text={theme.bsSecondaryVariant}
      >
        <Card.Img variant="top" src={project?.image? project?.image : 'images/projects/not-available.png'} />
        <Card.Body>
          <Card.Title style={styles.cardTitleStyle}>{project.name}</Card.Title>
          <Card.Text style={styles.cardTextStyle}>
            {project.special}
          </Card.Text>
        </Card.Body>
        <Card.Footer style={{ backgroundColor: theme.cardFooterBackground }}>
        <Badge
            key={project.provider}
            pill
            bg={theme.bsSecondaryVariant}
            text={theme.bsPrimaryVariant}
            style={styles.badgeStyle}
          >
            {project.price}
          </Badge>
          <Badge
            key={project.provider}
            pill
            bg={theme.bsSecondaryVariant}
            text={theme.bsPrimaryVariant}
            style={styles.badgeStyle}
          >
            {project.provider}
          </Badge>
          <Badge
            key={project.unit}
            pill
            bg={theme.bsSecondaryVariant}
            text={theme.bsPrimaryVariant}
            style={styles.badgeStyle}
          >
            {project.unit}
          </Badge>
        </Card.Footer>
      </Card>
    </Col>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.shape({
    name: PropTypes.string.isRequired,
    bodyText: PropTypes.string.isRequired,
    image: PropTypes.string,
    links: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
    })),
    tags: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default ProjectCard;
