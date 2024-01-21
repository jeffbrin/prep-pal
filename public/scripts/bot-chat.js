BOT_ENDPOINT = "/student/query_bot"
$.post(BOT_ENDPOINT, {
    msg: "Who are you? What is your purpose?",
}).then(response => {
    alert(response)
})