import React, { Component } from "react";
import Card from "./components/Card";
import Wrapper from "./components/Wrapper";
import Score from "./components/Score";
import colors from "./cards.json";
import "./App.css";

class App extends Component {
  
  state = {
    colors,
    clickedColorIds: [],
    score: 0,
    goal: 8,
    status: ""
  };

  
  shuffleScoreCard = id => {
    let clickedColorIds = this.state.clickedColorIds;

    if(clickedColorIds.includes(id)){
      this.setState({ clickedColorIds: [], score: 0, status:  "Game Over! You lost. Click to play again!" });
      return;
    }else{
      clickedColorIds.push(id)

      if(clickedColorIds.length === 8){
        this.setState({score: 8, status: "You Won! ", clickedColorIds: []});
        console.log('You Win');
        return;
      }

      this.setState({ colors, clickedColorIds, score: clickedColorIds.length, status: " " });

      for (let i = colors.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [colors[i], colors[j]] = [colors[j], colors[i]];
      }
    }
  }

  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Color clicker!</h1>
          <p className="App-intro">
            Try not to click the same color twice!
          </p>
        </header>
        <Score total={this.state.score}
               goal={8}
               status={this.state.status}
               />
        <Wrapper>
          {this.state.colors.map(color => (
            <Card
              shuffleScoreCard={this.shuffleScoreCard}
              id={color.id}
              key={color.id}
              image={color.image}
            />
          ))}
        </Wrapper>
        <footer>
          
        </footer>
    </div>
    );
  }
}

export default App;
