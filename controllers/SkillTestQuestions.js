
const webDevQuestions = [
    {
        question: "Which of the following is used to define the structure of a webpage?",
        options: ["HTML", "CSS", "JavaScript", "PHP"],
        correctAnswer: "HTML"
    },
    {
        question: "What does CSS stand for?",
        options: [" Creative Style Sheets",
                  "Cascading Style Sheets",
              "Colorful Style Sheets"],
        correctAnswer: "Cascading Style Sheets"
    },{
        question: "Which HTML tag is used to define an unordered list?",
        options:["<ul>",
             "<ol>",
             "<li>",
             "<ulist>"],
        correctAnswer:"<ul>"
    }
];

const appDevQuestions = [
    {
        question: "Which programming language is commonly used for Android app development?",
        options: ["Swift", "Java", "Python", "Objective-C"],
        correctAnswer: "Java"
    },
    {
        question: "What is the main purpose of an activity in Android development?",    
options:[" To interact with databases","To handle background tasks","To manage the application's lifecycle","To define the user interface layout"],
correctAnswer:"To manage the application's lifecycle"
    },
{
    question: "Which of the following is NOT a component of the Model-View-Controller (MVC) pattern?"  ,  
options:["Presenter","Controller","View","Model"],
correctAnswer:"Presenter"
}
   
];

const dataAnalystQuestions = [
    {
        question: "Which of the following is used for exploratory data analysis (EDA)?",
        options: ["Linear Regression", "Descriptive Statistics", "K-Means Clustering", "Principal Component Analysis (PCA)"],
        correctAnswer: "Descriptive Statistics"
    },
    {
        question:"What is the purpose of data preprocessing in data analysis?",     
options:["To train machine learning models"," To select the most relevant features for analysis","To clean and transform raw data into a usable format","To reduce the dimensionality of the data"],
correctAnswer:"To clean and transform raw data into a usable format"
    },
        {
            question:"Which of the following is a measure of central tendency?",     
    options:["Range","Mean","Standard Deviation","Variance"],
    correctAnswer:"Mean"
        }
    
    
];

const mlQuestions = [
    {
        question: "What is the difference between supervised and unsupervised learning?",
        options: ["Supervised learning requires labeled data, while unsupervised learning does not.", "Supervised learning does not require a model, while unsupervised learning does.", "Supervised learning is faster than unsupervised learning.", "There is no difference between supervised and unsupervised learning."],
        correctAnswer: "Supervised learning requires labeled data, while unsupervised learning does not."
    },
    {
        question:"What is the bias-variance tradeoff in machine learning?",     
        options:["Balancing feature selection and feature engineering","Balancing overfitting and underfitting","Balancing precision and recall","Balancing model complexity and model performance"],
        correctAnswer:"Balancing overfitting and underfitting"
    },
    {
        question:"How is the performance of a classification model typically evaluated?",     
       options:["R-squared","Accuracy, Precision, Recall, F1-score","Mean Absolute Error (MAE)","Mean Squared Error (MSE)"],
     correctAnswer:"Accuracy, Precision, Recall, F1-score"
    }
    
];




     const test=Tests.create({
            WebDev: webDevQuestions,
            AppDev: appDevQuestions,
            DataAnalyst: dataAnalystQuestions,
            ML: mlQuestions
        })
        .then(() => {
            console.log("Multiple-choice questions inserted successfully!");
        })
        .catch((error) => {
            console.error("Error inserting questions:", error);
        });

    
        