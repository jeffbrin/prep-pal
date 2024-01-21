BOT_ENDPOINT = "/query_bot"
$.post(BOT_ENDPOINT, {
    msg: "Hey There!",
    function(result) { alert(result) }
})