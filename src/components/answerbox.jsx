import React, { Component } from 'react';
import axios from 'axios';
class answerbox extends Component {
    constructor(props) {
        super(props)
    this.state = { 
        word: '',
        definition: '',
        value: '',
        score: 0,
        partOfSpeech: '',
        question: 1
     }
    this.handleChange = this.handleChange.bind(this);
    }
    
    getDef(newWord) {
        var url = 'https://zitapp.herokuapp.com/definition';
        axios.get(url, {
            params: {
                 word: newWord
        }
        
})
        .then((def) => {
            console.log(def.data);
            this.setState({
              definition: def.data,
            }) 
        });
        
    }
    getPOS(newWord) {
        var url = 'https://zitapp.herokuapp.com/partOfSpeech';
        axios.get(url, {
            params: {
                 word: newWord
        }
        
})
        .then((pos) => {
            console.log(pos.data);
            this.setState({
              partOfSpeech: pos.data,
            }) 
        });
    }


     handleChange(event) {
        this.setState({value: event.target.value});
     }

    startGame() {
        const newWord = wordlist[Math.floor(Math.random() * wordlist.length)];
        var index = wordlist.indexOf(newWord)
        if (index > -1) {
            wordlist.splice(index, 1);
         }
        console.log(wordlist)
        this.setState({
            word: newWord,
        });
        this.getDef(newWord);
        this.getPOS(newWord)
        this.setState(prevState => ({
            question: prevState.question + 1,
          }));
    }
    checkAnswer() {
        if (this.state.value.toUpperCase() === this.state.word.toUpperCase()) {
            const newWord = wordlist[Math.floor(Math.random() * wordlist.length)];
            var index = wordlist.indexOf(newWord)
            if (index > -1) {
                wordlist.splice(index, 1);
         }
            this.setState({
                word: newWord,
            });
            this.getDef(newWord);
            this.getPOS(newWord)
        
            this.setState(prevState => ({
                score: prevState.score + 1,
              }));
        } else {
            this.setState(prevState => ({
                score: prevState.score - 1,
              }));
            
        }

    }
    skipQuestion() {
            const newWord = wordlist[Math.floor(Math.random() * wordlist.length)];
            var index = wordlist.indexOf(newWord)
             if (index > -1) {
                 wordlist.splice(index, 1);
         }
            console.log(wordlist)
            this.setState({
                word: newWord,
            });
            this.getDef(newWord);
            this.getPOS(newWord)
    }

    render() { 
        if (this.state.question === 1) {
            return(
                <p>
                    Welcome To Zit! <br></br> I will give you a words part of speech, first letter, and definiton.<br></br> See if you can guess the correct word
                    <br></br>
                    <button className="btn btn-primary"
					onClick={this.startGame.bind(this)}>PLAY!</button>
                </p>
            )
        }
        return ( 
            <div>
            <p>
                {this.state.partOfSpeech} beginning with the letter {this.state.word.charAt(0)}
                <br></br> {this.state.definition}
            </p>
            
                    
					<div className="form-group">
		        	<input className="form-control" type="text" id="answer" value={this.state.value} onChange={this.handleChange}
					placeholder="Your Answer"/>

					<button className="btn btn-primary"
					onClick={this.checkAnswer.bind(this)}>Submit</button>

                    <button className="btn btn-primary"
                    onClick={this.skipQuestion.bind(this)}>Pass</button>
					</div>
                    Your Score: {this.state.score}
            
            </div>
        
            
         );
         
    }
    
}

var wordlist = ['poop','aardvark','cosine','banana','baseball','cat','box','helmet','sandwich','remote','raisin','donut','lamp','sofa','pillow','college','football','television','axe','rock','bank','diamond','leather','lizzard','captain','table','foot','school','park','moustache','candle','fire','plant','marathon','duck','glasses','whisker','grape','flute','trumpet','slope','grandfather','medicine','money','bag','airport','dream','relationship','exit','break']
 
export default answerbox;