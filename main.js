function startQuiz(){
    $("section").on("click", ".main-button", function(){
        generateView("quiz");
        $(".question-number").html(`${questionCount}`);
        $(".score").html(`${questionCount}`);
    })
}

function submitAnswer(){
    $("section").on("click", ".answer-buttons", function(){
        event.preventDefault();
        questionCount++;
        if (questionCount > 5){
            generateView("finalFeedback");
            $(".question-number").html(`${questionCount}`);
            $(".score").html(`${scoreCount} of 5`);
        } else {
            generateView("feedback");
            $(".question-number").html(`${questionCount}`);
            $(".score").html(`${scoreCount} of 5`);
            }
    })
}

function nextQuestion(){
    $("section").on("click", ".navigation-button", function(){
        if (questionCount > 4 && $(event.target).text() !== "See Results"){
            generateView("finalQuiz");
            $(".question-number").html(`${questionCount}`);
            $(".score").html(`${scoreCount} of 5`);
        } else if ($(event.target).text() === "See Results") {
            generateView("results")
        } else {
            generateView("quiz");
            $(".question-number").html(`${questionCount}`);
            $(".score").html(`${scoreCount} of 5`);
        }
    })
}

function questionCountLimiter (){
    if (questionCount > 5){
        return 5
    } else {
        return questionCount
    }
}

function generateView(view){
    let views = {
        homeView: `<h1>The Ultimate Disney Quiz</h1>
            <main>Do you live and breath Disney? Do you your friends tease you for your love of Disney. Then you're in the right place. 
            Try this really hard quiz to see if you really are the Ultimate Disney Fan. 
            </main>
            <button class="main-button">
            Play Now
            </button>`,
        quizView: `<section class="information-bar">
            <h2 id="question-1">Question <span class="question-number">Missing Question Number</span></h2>
            <h3 id="question-counter"><span class="question-number">Missing Score</span> of 5</h3>
            </section><section class="question">
            ${STORE.questions[Math.max(0, questionCountLimiter() - 1)].question} 
            </section>
            <form class="answers">
            <button class="answer-buttons">${STORE.questions[Math.max(0, questionCountLimiter() - 1)].answers.answer1}</button>
            <button class="answer-buttons">${STORE.questions[Math.max(0, questionCountLimiter() - 1)].answers.answer2}</button>
            <button class="answer-buttons">${STORE.questions[Math.max(0, questionCountLimiter() - 1)].answers.answer3}</button>
            <button class="answer-buttons">${STORE.questions[Math.max(0, questionCountLimiter() - 1)].answers.answer4}</button>
            </form>
            <section class="current-score">${scoreCount}/5 Correct</section>`,
        finalQuiz: `<section class="information-bar">
            <h2 id="question-1">Question <span class="question-number">Missing Question Number</span></h2>
            <h3 id="question-counter"><span class="question-number">Missing Score</span> of 5</h3>
            </section><section class="question">
            ${STORE.questions[4].question} 
            </section>
            <form class="answers">
            <button class="answer-buttons">${STORE.questions[4].answers.answer1}</button>
            <button class="answer-buttons">${STORE.questions[4].answers.answer2}</button>
            <button class="answer-buttons">${STORE.questions[4].answers.answer3}</button>
            <button class="answer-buttons">${STORE.questions[4].answers.answer4}</button>
            </form>
            <section class="current-score">${scoreCount}/5 Correct</section>`,
        feedbackView: `<h1 class="feedback-title">You got it right!</h1>
            <img class="feedback-image" src="${STORE.questions[Math.max(0, questionCountLimiter() - 2)].photo}">
            <p class="answer-description">
            ${STORE.questions[Math.max(0, questionCountLimiter() - 2)].answerDescription}
            </p>
            <section class="bottom-nav">
                <div id="nav-div"><p id="current-score">Current Score:&nbsp;</p><p class="score"></p></div>
                <div><button class="navigation-button">Next Question</button></div>
            </section>`,
        finalFeedback: `<h1 class="feedback-title">You got it right!</h1>
            <img class="feedback-image" src="${STORE.questions[Math.max(0, questionCountLimiter() - 1)].photo}">
            <p class="answer-description">
            ${STORE.questions[4].answerDescription}
            </p>
            <section class="bottom-nav">
                <div id="nav-div"><p id="current-score">Current Score:&nbsp;</p><p class="score"></p></div>
                <div><button class="navigation-button">See Results</button></div>
            </section>`,
        resultView: `<h1>You're a Disney Legend!</h1>
            <img src="/Images/robert-downey-jr.jpg">
            <p class="score final">${scoreCount}/5 Correct</p>
            <p id="final-comment">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                incididunt ut labore et dolore magna aliqua. 
            </p>
            <section class="bottom-nav final">
                <div><button class="restart">Restart Quiz</button></div>
            </section>`
    }
    if (questionCount <= 0 && view !== "quiz"){
        renderView(views.homeView);
        $(".information-bar").hide();
    }
    if (view === "quiz" && questionCount === 0){
        questionCount++;
        renderView(views.quizView);
        $(".information-bar").show();
    }
    if (view === "quiz" && questionCount > 1 && questionCount < 6){
        renderView(views.quizView);
        $(".information-bar").show();
    }
    if (view === "finalQuiz"){
        renderView(views.finalQuiz);
        $(".information-bar").show();
    }
    if (view === "feedback" && questionCount <= 6 && $(event.target).text() === STORE.questions[Math.max(0, questionCount - 2)].correctAnswer){
        renderView(views.feedbackView);
        scoreCount++;
        $(".information-bar").hide();
        $(".feedback-image").addClass("correct");
    }
    if (view === "feedback" && questionCount <= 6 && $(event.target).text() !== STORE.questions[Math.max(0, questionCount - 2)].correctAnswer){
        renderView(views.feedbackView);
        $(".feedback-title").html("Oops, wrong answer.");
        $(".information-bar").hide();
        $(".feedback-image").addClass("wrong")
    }
    if (view === "finalFeedback" && $(event.target).text() === STORE.questions[4].correctAnswer){
        renderView(views.finalFeedback);
        scoreCount++;
        $(".information-bar").hide();
        $(".feedback-image").addClass("correct")
    }
    if (view === "finalFeedback" && $(event.target).text() !== STORE.questions[4].correctAnswer){
        renderView(views.finalFeedback);
        $(".feedback-title").html("Oops, wrong answer.");
        $(".information-bar").hide();
        $(".feedback-image").addClass("wrong")
    }
    if (view === "results" && scoreCount === 5){
        renderView(views.resultView);
        $(".information-bar").hide();
        $("#final-comment").text(`You're an Ultimate Disney Fan! Know one knows more about Disney than you. Go you!`)
        $("img").attr("alt", "Image of Robert Downey Jr in the role of Iron Man.")
    }
    if (view === "results" && scoreCount < 5 && scoreCount > 2){
        renderView(views.resultView);
        $(".information-bar").hide();
        $("h1").text("You're a Disney Imagineer!")
        $("#final-comment").text(`You're a Disney Imagineer! You know more about Disney than most of your friends
        and are well on your way to becoming an Ultimate Disney Fan.`)
        $("img").attr("src", "/Images/Joe-Rohde.jpeg")
        $("img").attr("alt", "Image of Disney Imagineer Joe Rohde.")
    }
    if (view === "results" && scoreCount >= 0 && scoreCount < 3){
        renderView(views.resultView);
        $(".information-bar").hide();
        $("h1").text("You're a Disney Cast Member!")
        $("#final-comment").text(`You're a Disney Cast Member. You love Disney but are a novice when it comes to 
        facts. You're well on your way to becoming an Ultimate Disney Fan.`)
        $("img").attr("src", "/Images/cast-member.jpg")
        $("img").attr("alt", "Image of two Disneyland Cast Members.")
    }
}

function renderView(view){
    $(".current-view").html(view).addClass("center-column");
}

function restartGame(){
    $("section").on("click", "button.restart", function(){
        if($(event.target).text() === "Restart Quiz"){
            scoreCount = 0;
            questionCount = 0;
            generateView("quiz");
            $(".question-number").html(`${questionCount}`);
            $(".score").html(`${questionCount}`);
        }
    })
}

let STORE = {
    questions: [
        {
            question: `Who is the youngest Disney princess?`,
            answers: {
                answer1:`Snow White`,
                answer2:`Moana`,
                answer3:`Tiana`,
                answer4:`Cinderella`,
            },
            photo: `/Images/snow-white-and-the-seven-dwarfs-original3.jpg`,
            answerDescription:`Snow White is the youngest Disney princess at an age of 14.`,
            correctAnswer: `Snow White`,
        },
        {
            question: `In 1929, Mickey spoke his first words. What were they?`,
            answers: {
                answer1:`“Bananas!"`,
                answer2:`“Cheeseburger!"`,
                answer3:`"Hot Dog!"`,
                answer4:`“Pretzels!"`,
            },
            photo: `/Images/mickey.jpeg`,
            answerDescription:`Mickey's first spoken words were, "Hot dog! Hot dog!", the voice being provided by someone else other than Disney.`,
            correctAnswer: `"Hot Dog!"`,
        },
        {
            question: `Mickey Mouse Club debuted on ABC TV in what year?`,
            answers: {
                answer1:`1965`,
                answer2:`1955`,
                answer3:`1945`,
                answer4:`1935`,
            },
            photo: `/Images/mickey-mouse-club.jpg`,
            answerDescription:`The original, and still beloved to this day! Mickey Mouse Club debuted on ABC on October 3, 1955, as an hour-long show—every weekday afternoon!`,
            correctAnswer: `1955`,
        },
        {
            question: `In Pinocchio, he and his father are consumed by a massive blue whale. What was its name?`,
            answers: {
                answer1:`Michael`,
                answer2:`Peabo`,
                answer3:`Goliath`,
                answer4:`Monstro`,
            },
            photo: `/Images/Monstro.jpg`,
            answerDescription:`Monstro is an enormous whale, and the fourth and final antagonist of the film.`,
            correctAnswer: `Monstro`,
        },
        {
            question: `How many daughters does King Triton have in The Little Mermaid?`,
            answers: {
                answer1:`7`,
                answer2:`9`,
                answer3:`5`,
                answer4:`2`,
            },
            photo: `/Images/tritons-daughters.jpg`,
            answerDescription:`King Triton has 7 daughters named Attina, Alana, Adella, Aquata, Arista, Andrina, and of course, Ariel.`,
            correctAnswer: `7`,
        },
    ],
}

let scoreCount = 0;
let questionCount = 0;


function runFunctions(){
    startQuiz();
    renderView();
    questionCountLimiter();
    generateView(questionCount);
    startQuiz();
    submitAnswer();
    nextQuestion();
    restartGame();
}

console.log($(STORE.questions[Math.max(0, questionCountLimiter() - 1)].answers.photo))

runFunctions();