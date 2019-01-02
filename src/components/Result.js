import React from 'react';
import PropTypes from 'prop-types';

  function Result(props) {
    return (
      <div className="result">
            Du har <strong>{props.quizResult}</strong> korrekta svar av {props.quizLength}!
      </div>
    );
  }

  Result.propTypes = {
      quizResult: PropTypes.number,
      quizLength: PropTypes.number
  };

  export default Result;
