import React from 'react';

const Banner = ({ appName, token }) => {
  return (
    <div className="banner">
      <div className="container">
        <h1 className="logo-font">
          {appName}
        </h1>
        <p>Join in an innovative environment</p>
      </div>
    </div>
  );
};

export default Banner;
