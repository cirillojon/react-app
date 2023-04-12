import React from 'react';

class UnityGame extends React.Component {
  render() {
    const gamePath = './Game1-build/index.html'; 

    return (
      <div>
        <iframe src={gamePath} width="600" height="800"></iframe>
      </div>
    );
  }
}

export default UnityGame;
