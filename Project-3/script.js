const calculateformel = document.getElementById("calculateform");
const maxMarks = 400;

const calculatemarks = (event) => {
    event.preventDefault();
    const formdata = new FormData(calculateformel);
    const data = {};

    formdata.forEach((value, key) => {
        data[key] = +value;
    });

    console.log({ data });

    const totalmarks = data.maths + data.english + data.hindi + data.science;
    console.log(totalmarks);

    const percentage = (totalmarks / maxMarks) * 100;

    let resultel = document.querySelector(".result");
    if (!resultel) {
        resultel = document.createElement("p");
        resultel.className = "result";
        calculateformel.after(resultel);
    }
    resultel.innerText = `You have got ${totalmarks} marks out of ${maxMarks} and your percentage is ${percentage.toFixed(2)}%`;
};

calculateformel.addEventListener("submit", calculatemarks);
