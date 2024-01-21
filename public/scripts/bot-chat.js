ANSWER_ENDPOINT = "/student/submit-answer"
QUESTION_ENDPOINT = "/student/next-question"
END_ENDPOINT = "/student/end-session"

const questionElement = '<div class="d-flex justify-content-between align-items-start"><p></p><button class="btn image-btn" onclick="toggleChat()">' +
    '<img src = "/images/question.png" alt = "Button Image" /></button></div><textarea class="form-control"></textarea><button class="btn btn-primary send-btn" onclick="submit()">Submit</button><p></p>'

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
        elem.className = "question-div"
        const container = document.getElementsByClassName('container')[0]
        container.insertBefore(elem, container.children[container.children.length - 2])

        elem.children[0].children[0].innerText = q

    }
    catch (e) {
        console.log(e)
    }

}

function back() {
    window.location.href = "/student/classes";
}