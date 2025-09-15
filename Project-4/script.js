const questionel = document.getElementById("question");
const questioneform = document.getElementById("questionform");
const scoreel = document.getElementById("score");
let storedanswer;
let score1 = localStorage.getItem("score1");
const randnumber = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

console.log(`randnumber`, randnumber(20, 25));

const generatequestion = () => {
  const randnumber1 = randnumber(1, 10);
  const randnumber2 = randnumber(1, 10);
  const questiontype = randnumber(1, 4);


  let firstnumber;
  let secondnumber;

  if(randnumber1>randnumber2 && questiontype>2){
    firstnumber = randnumber1;
    secondnumber = randnumber2;
  }
  else{
firstnumber = randnumber2;
secondnumber = randnumber1;
}

  let question;
  let answer;

  switch (questiontype) {
    case 1:
      question = `Q. What is ${firstnumber} multiply by ${secondnumber}`;
      answer = firstnumber * secondnumber;
      break;
    case 2:
      question = `Q. What is ${firstnumber} Add  to ${secondnumber}`;
      answer = firstnumber + secondnumber;
      break;
    case 3:
      question = `Q. What is ${firstnumber} Substract from ${secondnumber}`;
      answer = firstnumber - secondnumber;
      break;
    case 4:
      question = `Q. What is ${firstnumber} Divided by ${secondnumber}`;
      answer = firstnumber / secondnumber;
      break;
    default:
      question = `Q. What is ${firstnumber} Add to ${secondnumber}`;
      answer = firstnumber + secondnumber;
      break;
  }
  // const question =`Q. What is ${randnumber1} multiply by ${randnumber2}`;
  // const answer = randnumber1 * randnumber2;
  return { question , answer };
};

console.log(generatequestion());

const showquestion = () => {
  const { question, answer } = generatequestion();
  questionel.innerText = question;
  scoreel.innerText = score1;
  storedanswer = answer;
};

showquestion();

const checkanswer = (event) => {
  event.preventDefault();
  const formData = new FormData(questioneform);
  const useranswer = parseInt(formData.get("answer")); // can also use + operator
  if (useranswer === storedanswer) {
    score1 ++ ;
    Toastify({
        text: `Your are Right and your score is ${score1}`,
        gravity: "bottom",
        position: "center",
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
      }).showToast();
  } else {
    score1 -= 1;
    Toastify({
        text: `Your are wrong and your score is ${score1}`,
        gravity: "bottom",
        position: "center",
        style: {
          background: "linear-gradient(to right, #e33217, #ff001e)",
        },
      }).showToast();
  }

  scoreel.innerText = score1;
  localStorage.setItem("score1",score1);
  event.target.reset();
  showquestion();
  console.log("answer", useranswer);
};
