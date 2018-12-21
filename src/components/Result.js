import React from 'react';
import PropTypes from 'prop-types';

  function Result(props) {
    return (
      <div className="result">
            You have <strong>{props.quizResult}</strong> correct answers of {props.quizLength}!
      </div>
    );
  }

  Result.propTypes = {
      quizResult: PropTypes.number,
      quizLength: PropTypes.number
  };

  export default Result;
