import React from 'react';
import PropTypes from 'prop-types';

 function QuestionCount(props) {
   return (
     <div className="questionCount">
       Fråga <span>{props.counter}</span> av <span>{props.total}</span>
     </div>
   );
 }

 QuestionCount.propTypes = {
   counter: PropTypes.number,
   total: PropTypes.number
 };

 export default QuestionCount;
