import React from "react"
import StartPage from "./components/StartPage"
import QuizQuestion from "./components/QuizQuestions"
import "./css/quiz.css"


export default function App() {
    let quizInfo;
    let rightAnswers = [];
    const [dis, setDis] = React.useState([]);

    const [displayQuiz, setDisplayQuiz] = React.useState(false);
    const [quiz, setQuiz] = React.useState([]);
    const [selectAnswers, setSelectAnswers] = React.useState({});
    const [newQuiz, setNewQuiz] = React.useState(false);
    const [answerCorrect, setAnswerCorrect] = React.useState(false);
    const [totalCorrect, setTotalCorrect] = React.useState(0);
    const [playAgain, setPlayAgain] = React.useState(false);


  


    React.useEffect(() => {

        // Randomly shuffles the answer buttons in the array
        function shuffleAnswers(answersArray){
            for(let i = answersArray.length-1; i > 0; i--){
                const j = Math.floor(Math.random() * (i+1));
                const temp = answersArray[i];
                answersArray[i] = answersArray[j]
                answersArray[j] = temp;
            }
            return answersArray;
        }
      
        fetch("https://opentdb.com/api.php?amount=5")
            .then(res => res.json())
            .then(data => {

                setQuiz(() => {
                    return(
                    data.results.map(result =>{
                        setSelectAnswers(prevAnswers => {
                            return{
                                ...prevAnswers,
                                [result.question]: ""
                            }
                        })

                        setDis(prev => {
                            return [...prev, result.correct_answer];
                        })
                        const answers = shuffleAnswers([result.correct_answer, ...result.incorrect_answers])
                        return {
                            question: result.question,
                            correctAnswer: result.correct_answer,
                            allAnswers : answers
                        }
                    }))
                })
        }) 
       
    }, [playAgain]);

   
    if(quiz && displayQuiz){
        quizInfo = quiz.map(questionInfo =>{
            rightAnswers.push(findAndReplace(questionInfo.correctAnswer));

            return <QuizQuestion
                        key={questionInfo.question}
                        question={questionInfo.question}
                        correctAnswer={questionInfo.correctAnswer}
                        allAnswers={questionInfo.allAnswers}
                        findAndReplace={findAndReplace}
                        getSelectedAnswers={getSelectedAnswers}
                        currentAnswer={selectAnswers[questionInfo.question].value}
                        rightAnswerBg={answerCorrect}
                    />

        })
    }

    
    // hides start page and displays the quiz
    function startQuiz () {
        setDisplayQuiz(prevDisplay => !prevDisplay);
    }


    // replaces html entities with their english character
    function findAndReplace(match){
        const htmlEntities = {
            "&#039;":"'",
            "&quot;" : '"',
            "&amp;": "&",
            "&Ouml;": "Ö",
            "&ndash;": "-",
            "&deg;" : "°"
        }
        return match.replace(/&#039;|&quot;|&amp;|&Ouml|&ndash;|&deg;/g, target => htmlEntities[target]);
    }

    // updates the user's selected answer for a question
    function getSelectedAnswers(event, question){
     
        setSelectAnswers(prevSelected => {
           
            return {
                ...prevSelected,
                [question]: event.target
            };
        })
    }

    

    
    function displayScore() {
        for (const key in selectAnswers ){
            if(!selectAnswers[key]){
                alert("Please answer all questions")
                return;
            }
        }
        let i = 0;
        setAnswerCorrect(prev => !prev)

        for (const key in selectAnswers ){

            if(selectAnswers[key].value !== rightAnswers[i] && selectAnswers[key]){
                selectAnswers[key].style.backgroundColor = "#F8BCBC";
                selectAnswers[key].style.opacity = ".5";

            }
            else if(selectAnswers[key].value === rightAnswers[i] ){
                setTotalCorrect(prevTotalCorrect => prevTotalCorrect += 1);
                
            }
            i = (i < 4) ? i += 1 : 0;
        }
        document.getElementById("total-score").style.display = "block";
        setNewQuiz(prevQuiz => !prevQuiz);

    }

    function restartQuiz() { 
        rightAnswers = [];
        setNewQuiz(false);
        setAnswerCorrect(false);
        setTotalCorrect(0);
        setPlayAgain(play => !play);
        document.getElementById("total-score").style.display = "none";
    }


    return (
        <div>
            <div className="yellow-blob"></div>
            <div className="baby-blue-blob"></div>

            {displayQuiz &&
             <div className="quiz-container"> 
                <h1 className="welcome-title">Trivia Quiz</h1>
                {quizInfo} 
                <div className="restart-container">
                    <p id="total-score" className="total-score">You've answered {totalCorrect}/5 correct</p>
                    <button  onClick={newQuiz ? restartQuiz : displayScore}  className="btn-restart">
                    {!newQuiz ? "Check answers" : "Play Again"}
                    </button>
                </div>
             </div>}
            
            {!displayQuiz && <StartPage startQuiz={startQuiz}/>}
        </div>
        
    );
}