import React, { Component } from 'react';
import axios from 'axios';
class answerbox extends Component {
    constructor(props) {
        super(props)
    this.state = { 
        word: wordlist[Math.floor((Math.random() * wordlist.length))],
        definition: '',
        value: '',
        score: 0,
        partOfSpeech: '',
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
    checkAnswer() {
        if (this.state.value.toUpperCase() === this.state.word.toUpperCase()) {
            const newWord = wordlist[Math.floor(Math.random() * wordlist.length)];
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
            this.setState({
                word: newWord,
            });
            this.getDef(newWord);
            this.getPOS(newWord)
    }

    render() { 
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

var wordlist = ['poop','aardvark','cosine','banana']
 
export default answerbox;