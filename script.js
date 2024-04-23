
console.log('Hello World');

function generateQuiz(questions, quizContainer, resultsContainer, submitButton, questionType)
{
    function showQuestions(questions, quizContainer){
        // we'll need a place to store the output and the answer choices
        var output = [];
        var answers;
    
        // for each question...
        for(var i=0; i<questions.length; i++){
            
            if (questions[i].typeOfQuestion.localeCompare(questionType) == 0)
            {
                console.log("1");
                // first reset the list of answers
                answers = [];
        
                // for each available answer to this question...
                for(letter in questions[i].answers){
        
                    // ...add an html radio button
                    answers.push(
                        '<label>'
                            + '<input type="radio" name="question'+i+'" value="'+letter+'">'
                            + letter + ': '
                            + questions[i].answers[letter] + '<br>'
                        + '</label>'
                    );
                }
        
                // add this question and its answers to the output
                output.push(
                    '<div class="question">' + questions[i].question + '</div>'
                    + '<div class="answers">' + answers.join('') + '</div>'
                );
            }
        }
    
        // finally combine our output list into one string of html and put it on the page
        quizContainer.innerHTML = output.join('');
    }
   
    function showResults(questions, quizContainer, resultsContainer)
    {
        // gather answer containers from our quiz

        var answerContainers = quizContainer.querySelectorAll('.answers');

        // keep track of user's answers
        var userAnswer = '';
        var numCorrect = 0;
        var numAnswers = 0;
        var questionIndex = -1;
        
        // for each question...
        for(var i=0; i<questions.length; i++){
           
            if (questions[i].typeOfQuestion.localeCompare(questionType) == 0)
            {
                questionIndex++;
                // find selected answer
                userAnswer = (answerContainers[questionIndex].querySelector('input[name=question'+i+']:checked')||{}).value;
                numAnswers++;
                // if answer is correct
                if(userAnswer===questions[i].correctAnswer){

                    // add to the number of correct answers
                    numCorrect++;
                    // color the answers green
                    answerContainers[questionIndex].style.color = 'lightgreen';
                }
                // if answer is wrong or blank
                else{
                    // color the answers red
                    answerContainers[questionIndex].style.color = 'red';
                }
            }  
        
        }   
        // show number of correct answers out of total
        resultsContainer.innerHTML = numCorrect + ' out of ' + numAnswers;
        if (numCorrect==numAnswers)
        {
            if (questionType.localeCompare("ActionTraining") == 0)
            {
                sessionStorage.setItem('ActionTraining', 'Complete');
            }
        }
        sessionStorage.setItem('total',Number(numCorrect)+Number(sessionStorage.getItem('total')));
        //document.getElementById("PointTotal").innerHTML = sessionStorage.getItem('total')+'-->Total';
    }
    showQuestions(questions, quizContainer);

    submitButton.onclick = function()
    {
        showResults(questions, quizContainer, resultsContainer);
    }
}


var MyQuestions = [
	{
        typeOfQuestion: "ActionTraining",
		question: "What is 10/2?",
		answers: {
			a: '3',
			b: '5',
			c: '115'
		},
		correctAnswer: 'b'
	},	{
        typeOfQuestion: "ActionTraining",
		question: "What is 10/2?",
		answers: {
			a: '3',
			b: '5',
			c: '115'
		},
		correctAnswer: 'b'
	},
    {
        typeOfQuestion: "ActionTraining",
		question: "What is 10/2?",
		answers: {
			a: '3',
			b: '5',
			c: '115'
		},
		correctAnswer: 'b'
	},
    {
        typeOfQuestion: "ConsequencesSiteTraining",
		question: "Which of the following are consequences of cyber attacks?",
		answers: {
			a: 'Identity theft',
			b: 'Ransomware Attacks',
			c: 'Data breaches',
            d: 'all of the above'
		},
		correctAnswer: 'd'
	},
	{
        typeOfQuestion: "ConsequencesSiteTraining",
		question: "What are some consequences of phishing emails?",
		answers: {
			a: 'downloaded malware',
			b: 'personal infomration hidden behind paywall',
			c: 'web system compromised',
            d: 'all of the above',
		},
		correctAnswer: 'c'
	},
    {
        typeOfQuestion: "ConsequencesSiteTraining",
		question: "What are data breaches?",
		answers: {
			a: 'hackers send a fake email to you',
			b: 'hackers gain access into a company to gain personal information',
			c: 'hackers eating lunch with students'
		},
		correctAnswer: 'b'
	},
    {
        typeOfQuestion: "IntroductionTraining",
		question: "What institution has the highest cyberattack success  rate?",
		answers: {
			a: 'Colleges',
			b: 'Businesses',
			c: 'Healthcare',
            d: 'Finances'
		},
		correctAnswer: 'a'
	},
    {
        typeOfQuestion: "IntroductionTraining",
		question: "Which of the following does not make a college more suseptable to cyber attacks?",
		answers: {
			a: 'Wide sprawing networks',
			b: 'Use of 3rd body contractors',
			c: 'Small IT budgets',
            d: 'Bad food'
		},
		correctAnswer: 'd'
	},{
        typeOfQuestion: "IntroductionTraining",
		question: "Which of the following can be points of a cyber attack?",
		answers: {
			a: 'phones',
			b: 'laptops',
			c: 'TVs',
            d: 'All of the above'
		},
		correctAnswer: 'd'
	},
    {
        typeOfQuestion: "CyberThreatsTraining",
		question: "How could a cyber attack happen to you?",
		answers: {
			a: 'Phishing emails',
			b: 'weak passwords',
			c: 'accidentally downloading malware',
            d: 'All of the above'
		},
		correctAnswer: 'd'
	},
    {
        typeOfQuestion: "CyberThreatsTraining",
		question: "How many types of insider threats are there?",
		answers: {
			a: '3',
			b: '5',
			c: '10',
            d: '20'
		},
		correctAnswer: 'b'
	},
    {
        typeOfQuestion: "CyberThreatsTraining",
		question:  "Which of the following is a strong password",
		answers: {
			a: '2345',
			b: 'password',
			c: 'coolmathgames',
            d: 'G3oiwnv(e()$'
		},
		correctAnswer: 'd'
	}
    
];

var startQuizButton=document.getElementById('startQuiz');
var quizContainer=document.getElementById('quiz');
var submitButton=document.getElementById('submit');
var resultsContainer=document.getElementById('results');




//document.getElementById("PointTotal").innerHTML = sessionStorage.getItem('total')+'-->Total';
document.getElementById("submit").style.display="none";

startQuizButton.onclick = function()
{
    let path = window.location.pathname;
    let page = path.split("/").pop();
    page = page.split('.', 1)[0]
    generateQuiz(MyQuestions, quizContainer, resultsContainer, submitButton, page);
    document.getElementById("submit").style.display="block";
    
}