ANSWER_ENDPOINT = "/student/submit-answer"
QUESTION_ENDPOINT = "/student/next-question"
END_ENDPOINT = "/student/end-session"

const questionElement = '<div class="question-div"><p></p><input type="text"><button onclick="submit()">submit</button></div>'

async function submitAnswer(answer) {
    const response = await $.post(ANSWER_ENDPOINT, {
        msg: answer,
    })
    alert(response)
    promptQuestion()
}

/**
 * Called on the submit button. Calls submitAnswer with the text from the input.
 */
function submit() {
    const questionDivs = $(".question-div")
    const latestQuestionDiv = questionDivs[questionDivs.length - 1]
    const input = latestQuestionDiv.children[1];
    const button = latestQuestionDiv.children[2];

    submitAnswer(input.value);

    // Shut off the current button and input
    input.disabled = true
    button.disabled = true

}

async function promptQuestion() {
    try {
        const q = await $.post(QUESTION_ENDPOINT)

        if (q == "{}") {
            await $.post(END_ENDPOINT)
            window.location.href = "/student/classes"
        }

        const elem = document.createElement('div')
        elem.innerHTML = questionElement
        console.log(elem)
        const body = $("body")[0]
        console.log(body)
        body.appendChild(elem)

        elem.children[0].children[0].innerText = q
    }
    catch (e) {
        console.log(e)
    }
}