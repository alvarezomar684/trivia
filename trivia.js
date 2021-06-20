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

//     console.log(questionsApi[0].incorrect_answers[0]);
// console.log(questionsApi[1].incorrect_answers[1]);
// console.log(questionsApi[2].incorrect_answers[2]);
    console.log(questionsApi);
    
    triviaForm.setAttribute("class","hidden");
    showtimeForm.removeAttribute("class","hidden");
    

    for(let i=0; i < questionsApi.length; i++){
        // console.log(i);
        
        // console.log(questionsApi[0].type);
        // console.log(typeof(questionsApi[0].type));
        // console.log(questionsApi[i].type);       
        

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

        // if(typeGame === "0"){
        //     console.log("tutrifruti")
        // }

        if(typeGame === "multiple"){

            console.log()
            //Contenedores de los botones respuesta
            let incorrectAnswersDivM = questionsApi[0].incorrect_answers;
            // console.log(incorrectAnswersDiv);
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
            

            //Botones Respuestas incorrectas
            for(let j=0; j < incorrectAnswersDivM.length; j++){
                let buttIncAnsM = document.createElement("button");
                buttIncAnsM.setAttribute("class","butt-inc-ans-m");
                divAnsM.appendChild(buttIncAnsM);
                let incorrectAnswersText = questionsApi[i].incorrect_answers[j];
                buttIncAnsM.innerText = `${incorrectAnswersText}`; 
                
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

            //GENERAR DE FORMA AUTOMATICA LOS BOTONES Y SU TEXTO PARA RESOLVER PROBLEMA DE COMBINACION MULT Y BOOL
            //Contenedores de los botones respuesta
            // console.log("truefalse")            
            
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
                
                
            }



            //Botones Respuesta correcta

            // let correctAnswersDivB = questionsApi[i].correct_answer;

            // for(let k=0; k < correctAnswersDivB.length; k++){
            //     let buttCorAnsB = document.createElement("button");
            //     buttCorAnsB.setAttribute("class","butt-cor-ans-b");
            //     divAnsB.appendChild(buttCorAnsB);
            //     let correctAnswersText = questionsApi[i].correct_answer[k];
            //     buttCorAnsB.innerText = `${correctAnswersText}`;                
                
                
            // }

            //boton respuesta correcta
            let buttTrueB = document.createElement("button");
            buttTrueB.setAttribute("class","butt-corr-ans-b");
            divAnsB.appendChild(buttTrueB);
            let correctAnswersText = questionsApi[i].correct_answer;
            buttTrueB.innerText = `${correctAnswersText}`;
            buttTrueB.addEventListener("click", () => incrementScoreTrue ()); 




            
            // //Boton Respuesta True
            // let buttTrueB = document.createElement("button");
            // buttTrueB.setAttribute("class","butt-true-b");
            // divAnsB.appendChild(buttTrueB);            
            // buttTrueB.innerText = `True`;  
            // buttTrueB.addEventListener("click", () => incrementScoreTrue ());         

            // //Boton Respuesta False
            // let buttFalseB = document.createElement("button");
            // buttFalseB.setAttribute("class","butt-false-b");
            // divAnsB.appendChild(buttFalseB);            
            // buttFalseB.innerText = `False`;
            // buttFalseB.addEventListener("click", () => incrementScoreFalse ());

            let correctAnsBoo = questionsApi[i].correct_answer;   

            // console.log(buttTrueB.innerText);
            // console.log(buttFalseB.innerText);
            console.log(correctAnsBoo);
            // console.log(typeof(correctAnsBoo));

            // console.log(typeof(buttTrueB.innerText));
            // console.log(typeof(buttFalseB.innerText));


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

            // const incrementScoreFalse = () => {
                  
                
            //         if(buttFalseB.innerText === correctAnsBoo){
                                       
            //             // console.log("incremento con false")
            //             score += 1;   
            //             console.log(score);
            //             // scoreStorage();
            //             playerScore.innerText = `${score}`;
                            
            //         }
                                               
                        
            // }



         

            
            
        }

        

       
                 
            
            
        
        

        //True False

        //boolean //string
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

console.log(score);




triviaForm.addEventListener("submit",getApiData);



