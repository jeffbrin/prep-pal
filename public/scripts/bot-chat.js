ANSWER_ENDPOINT = "/student/submit-answer"
QUESTION_ENDPOINT = "/student/next-question"
END_ENDPOINT = "/student/end-session"

const questionElement = '<div class="question-div"><p></p><input type="text"><button onclick="submit()">submit</button><p></p></div>'

async function submitAnswer(answer, div) {
    const response = await $.post(ANSWER_ENDPOINT, {
        msg: answer,
    })
    try {
        const result = JSON.parse(response)
        div.children[div.children.length - 1].innerText = result['explanation']
    } catch (e) {
        div.children[div.children.length - 1].innerText = response
    }
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

    submitAnswer(input.value, latestQuestionDiv);

    // Shut off the current button and input
    input.disabled = true
    button.disabled = true

}

async function promptQuestion() {
    try {
        const q = await $.post(QUESTION_ENDPOINT)

        if (q == "{}") {
            await $.post(END_ENDPOINT)
            const elem = document.createElement('div')
            elem.innerHTML = '<button id="return-btn" onclick="back()">Return</button>'
            $("body")[0].appendChild(elem)
            return;
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

function back() {
    window.location.href = "/student/classes";
}