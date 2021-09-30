import React from 'react';


const Innerbar = (props) => {
    return (
        <div className="innerbar" style={{width: `${props.percentRange}%`}}/>
    );
}

const ProgressBar = (props) => {
  return (
      <div className="progressbar">
          <Innerbar percentRange={props.percentRange}/>
      </div>
  );
};
  
export default ProgressBar;