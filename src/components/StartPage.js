import "../css/style.css"
import "../css/startPage.css"
export default function MainPage(props){

    
    return(
        <div id="start-game" className="start-page">
            <h1 className="start-page-title">Quizzical</h1>
            <p className="start-page-description">Test your knowledge by answering random questions!</p>
            <button onClick={props.startQuiz} className="btn-start">
                    Start Quiz
            </button>

           


        </div>
    );
}