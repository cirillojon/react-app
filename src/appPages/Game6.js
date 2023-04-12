import React from 'react';

class UnityGame extends React.Component {
  render() {
    //const gamePath = './Game1-build/game.html'
    const gamePath = '/appPages/Game1-build/game.html';

    
    return (
      <div>
        <iframe src={gamePath} title="Unity Game" width="600" height="800"></iframe>
      </div>
    );
  }
}

export default UnityGame;
