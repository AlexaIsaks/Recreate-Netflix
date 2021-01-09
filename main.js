//FAQ Section Dropdown Answers
//When the question is clicked the the answer will reveal or hide

let questions = [...document.querySelectorAll(".faq__question-container")];
let icons = [...document.querySelectorAll(".faq__icon")];
let answers = [...document.querySelectorAll(".faq__answer")];

//Assign click to each question ("faq__question-container" area)
questions.forEach(question => {
    question.addEventListener("click", faqToggle);
});

//Determine which question was clicked. 
function faqToggle(e) {
    let field = e.target;
    let faqId;
    let ansElement;
    let iconElement;

    //Which area of ".faq__question-container" was clicked: Heading, icon, path tag, question container.
    //Retrieve the data-id
    if (field.classList.contains("faq__heading")) {
        faqId = field.parentElement.dataset.id;
        iconElement = field.nextElementSibling;
    } else if (field.classList.contains("faq__icon")) {
        faqId = field.parentElement.dataset.id;
        iconElement = field;
    } else if (field.tagName === "path") {
        faqId = field.parentElement.parentElement.dataset.id;
        iconElement = field.parentElement;
    } else {
        faqId = field.dataset.id;
        iconElement = field.children[1];
    }

    //Use faqId to find answer
    ansElement = answers.find(answer => {
        return answer.dataset.id === faqId;
    });

    //Is answer of clicked question hidden or revealed?
    if (ansElement.classList.contains("is-closed")) {
        revealAnswer(ansElement, iconElement, faqId);

    } else {
        hideAnswer(ansElement, iconElement);
    }
}

//Reveals answer, icon changes to "cross"
function revealAnswer(ansElement, iconElement, faqId) {

    ansElement.classList.remove("is-closed");
    ansElement.classList.add("is-open");
    iconElement.classList.remove("add-icon");
    iconElement.classList.add("cross-icon");

    //Check if another answer is revealed already upon clicking different question, close that answer
    //and change its icon to "addition"
    answers.forEach(answer => {
        if (answer.dataset.id !== faqId && answer.classList.contains("is-open")) {
            answer.classList.remove("is-open");
            answer.classList.add("is-closed");
        }
    });

    icons.forEach(icon => {
        if (icon.parentElement.dataset.id !== faqId && icon.classList.contains("cross-icon")) {
            icon.classList.remove("cross-icon");
            icon.classList.add("add-icon");
        }
    });

}

//Hides answer, icon changes to "addition"
function hideAnswer(ansElement, iconElement) {
    ansElement.classList.remove("is-open");
    ansElement.classList.add("is-closed");
    iconElement.classList.remove("cross-icon");
    iconElement.classList.add("add-icon");
}