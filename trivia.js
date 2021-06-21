// let score = [];
let score = 0;
let player ="";
let triviaForm = document.getElementById("trivia");
let amountInput = document.getElementById("amount");
let categoryselect = document.getElementById("category");
let difficultyselect = document.getElementById("difficulty");
let typeselect = document.getElementById("type");

let showtimeForm = document.getElementById("showtime");

let startGame = document.getElementById("start");

let scoreDivContainer = document.getElementById("score-container");

// let scoreLocalStorage = JSON.parse(localStorage.getItem("score"));

// if (scoreLocalStorage === null) {
//     scoreLocalStorage = [];
// }

    
let questionsApi = 0;
let questionIndex = 0;



// const scoreStorage = () => {
//     if(typeof Storage !== "undefined") {
//       localStorage.setItem("score",JSON.stringify(score));
      
//   } else {
//     alert("Tu navegador no es compatible con local storage");
//   }
//   };




let getApiData = (event) => {    
    event.preventDefault();

    let urlApi = `https://opentdb.com/api.php?amount=${amountInput.value}&category=${categoryselect.value}&difficulty=${difficultyselect.value}&type=${typeselect.value}`;

    fetch(urlApi)
    .then(response => {
        return response.json();
    })
    .then(data => {
        questionsApi = data.results;        
        letsGo();
    });    
}




const letsGo = () => {

    console.log(questionsApi);
    
    triviaForm.setAttribute("class","hidden");
    showtimeForm.removeAttribute("class","hidden");
    

    for(let i=0; i < questionsApi.length; i++){       

        //Preguntas
        let questions = questionsApi[i].question;
        // console.log(questions);

        //Contenedores del juego
        let divGame = document.createElement("div");
        divGame.setAttribute("class","div-game");
        showtimeForm.appendChild(divGame);

        //titulos de las preguntas
        let titleQGame = document.createElement("h3");
        titleQGame.setAttribute("class","questions-game");
        divGame.appendChild(titleQGame);
        titleQGame.innerText = `${questions}`;

        //botones para respuestas
        let typeGame = questionsApi[0].type;

        //Multiples        

        if(typeGame === "multiple"){

            console.log()
            //Contenedores de los botones respuesta
            let incorrectAnswersDivM = questionsApi[0].incorrect_answers;            
            let divAnsM = document.createElement("div");
            divAnsM.setAttribute("class","div-ans-m");
            divGame.appendChild(divAnsM);            

            //Boton Respuesta correcta
            let buttCorrAnsM = document.createElement("button");
            buttCorrAnsM.setAttribute("class","butt-corr-ans-m");
            divAnsM.appendChild(buttCorrAnsM);
            let correctAnswersText = questionsApi[i].correct_answer;
            buttCorrAnsM.innerText = `${correctAnswersText}`;
            buttCorrAnsM.addEventListener("click", () => incrementScoreCorrect ());
            buttCorrAnsM.addEventListener("click", () => newStylesBCAM ());

            const newStylesBCAM = () => {                
                buttCorrAnsM.style.backgroundColor = "#34c147"
            }
            

            //Botones Respuestas incorrectas
            for(let j=0; j < incorrectAnswersDivM.length; j++){
                let buttIncAnsM = document.createElement("button");
                buttIncAnsM.setAttribute("class","butt-inc-ans-m");
                divAnsM.appendChild(buttIncAnsM);
                let incorrectAnswersText = questionsApi[i].incorrect_answers[j];
                buttIncAnsM.innerText = `${incorrectAnswersText}`;
                buttIncAnsM.addEventListener("click", () => newStylesBIAM ());

                const newStylesBIAM = () => {
                    buttIncAnsM.style.backgroundColor = "#34c147"   
                }
                
                //Ocultando botones de mas
                // console.log(buttIncAnsM.innerText);
                if(buttIncAnsM.innerText === "undefined"){
                buttIncAnsM.setAttribute("class","hidden");
                // console.log("necesito elmininarte")
                }
                
            }

          

            let correctAnsMul = questionsApi[i].correct_answer; 

            const incrementScoreCorrect = () => {            
                
                if(buttCorrAnsM.innerText === correctAnsMul){
                    
                    // console.log("incremento con True") 
                    score += 1;   
                    console.log(score);
                    // let score = JSON.parse(localStorage.getItem("score"));
                    // scoreStorage();
                    playerScore.innerText = `${score}`;                    
                        
                }                                           
            
        }
            
            

        } if (typeGame === "boolean") {

            
            //Contenedores de los botones respuesta            
            let divAnsB = document.createElement("div");
            divAnsB.setAttribute("class","div-ans-b");
            divGame.appendChild(divAnsB);

            //Botones Respuesta incorrecta
            let incorrectAnswersDivB = questionsApi[i].incorrect_answers;
            for(let j=0; j < incorrectAnswersDivB.length; j++){
                let buttIncAnsB = document.createElement("button");
                buttIncAnsB.setAttribute("class","butt-inc-ans-b");
                divAnsB.appendChild(buttIncAnsB);
                let incorrectAnswersText = questionsApi[i].incorrect_answers[j];
                buttIncAnsB.innerText = `${incorrectAnswersText}`; 
                buttIncAnsB.addEventListener("click", () => newStylesBIAB ());
                
                const newStylesBIAB = () => {
                    buttIncAnsB.style.backgroundColor = "#34c147"   
                }
            }            

            //boton respuesta correcta
            let buttTrueB = document.createElement("button");
            buttTrueB.setAttribute("class","butt-corr-ans-b");
            divAnsB.appendChild(buttTrueB);
            let correctAnswersText = questionsApi[i].correct_answer;
            buttTrueB.innerText = `${correctAnswersText}`;
            buttTrueB.addEventListener("click", () => incrementScoreTrue ());
            buttTrueB.addEventListener("click", () => newStylesBTB ());
            
            const newStylesBTB = () => {
                buttTrueB.style.backgroundColor = "#34c147"  
            }
            

            let correctAnsBoo = questionsApi[i].correct_answer;       
            
            


            const incrementScoreTrue = () => {  
                
                    if(buttTrueB.innerText === correctAnsBoo){                        
                        // console.log("incremento con True") 
                        score += 1;   
                        console.log(score);
                        // let score = JSON.parse(localStorage.getItem("score"));
                        // scoreStorage();
                        playerScore.innerText = `${score}`;                        
                            
                    }                                               
                
            }            
            
        }
        
    }
    
    //Boton Resultados
    let buttonResults = document.createElement("button");
    buttonResults.setAttribute("class","button-results");
    showtimeForm.appendChild(buttonResults);
    buttonResults.innerText = "Resultados" 
    buttonResults.addEventListener("click", () => hiddenAll ())
    console.log(score);

    //Resultados
    let playerScore = document.getElementById("player-score");
    playerScore.innerText = `${score}`;

    //Jugador
    let playerInfo = document.getElementById("name").value;
    let playerGame = document.getElementById("player");
    playerGame.innerText = `${playerInfo} your `;

    //Boton Regreso al juego
    let playAgain = document.getElementById("play-again");
    playAgain.addEventListener("click", () => returnGame ());    

}

const hiddenAll = () => {
    showtimeForm.setAttribute("class","hidden");
    scoreDivContainer.removeAttribute("class","hidden");
    
}

const returnGame = () => {    
    location.reload();    
}









triviaForm.addEventListener("submit",getApiData);



