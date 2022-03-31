import React from "react"
import "../css/style.css"
import "../css/quiz.css"

export default function QuizQuestions(props) {

    const questionAnswers = formAnswers(props.allAnswers);

    for(let i =0; i < questionAnswers.length; i++){
        const answerValue = questionAnswers[i].props.value
        if(answerValue === props.correctAnswer){
          
    
        }
    }

   

    // Generates answer buttons for the quiz
    function formAnswers(answers){
        const answerArr =  answers.map(answer =>{
           const answerValue = props.findAndReplace(answer);
           const styles = {
               opacity: "1",
                backgroundColor: answerValue === props.currentAnswer ? "#D6DBF5" : "#F5F7FB"
           }
           const bgGreen = {
            backgroundColor: "#94D7A2"
           }
            const newAnswerBtn = <button 
                                    key={answer}
                                    className="answer"
                                    value={answerValue}
                                    style={(answerValue === props.correctAnswer && props.rightAnswerBg) ? bgGreen : styles}
                                    onClick={(event) => props.getSelectedAnswers(event, props.question)}>
                                    {answerValue}
                                 </button>;
           
            return newAnswerBtn;
        });
        return answerArr;
    }

    
    // returns quiz question with answers b 
    return (
        <div>
            <div className="question-info">
                    <h3 className="question">{props.findAndReplace(props.question)}
                    </h3>
                    <div className="all-answers">
                        {questionAnswers}
                    </div>

            </div>
           
        
           
        </div>
    );
}