document.getElementById("send-webhook").addEventListener("click", () => {
    const serverSelect = document.getElementById("server-select");
    const selectedServerId = serverSelect.value;
    const webhookURL = document.getElementById("webhook-url").value.trim();
    const messageContent = document.getElementById("message-content").value.trim();

    if (!webhookURL || !messageContent) {
        alert("Webhook URL and message cannot be empty!");
        return;
    }

    const payload = {
        content: messageContent,
        server_id: selectedServerId 
    };

    fetch(webhookURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    })
    .then(response => {
        if(response.ok) {
            alert(`Message sent successfully to ${serverSelect.options[serverSelect.selectedIndex].text}!`);
        } else {
            alert("Error sending message.");
        }
    });
});

document.getElementById("add-embed").addEventListener("click", () => {
    const previewDiv = document.getElementById("preview");
    previewDiv.innerHTML = "<p><strong>Embed Added:</strong> Customize in JSON</p>";
});

function formatText(type) {
    let textarea = document.getElementById("message-content");
    let selectionStart = textarea.selectionStart;
    let selectionEnd = textarea.selectionEnd;
    let selectedText = textarea.value.substring(selectionStart, selectionEnd);

    if (!selectedText) {
        alert("Select text to format!");
        return;
    }

    let formattedText;
    switch (type) {
        case "bold":
            formattedText = `**${selectedText}**`;
            break;
        case "italic":
            formattedText = `*${selectedText}*`;
            break;
        case "underline":
            formattedText = `__${selectedText}__`;
            break;
    }

    textarea.setRangeText(formattedText, selectionStart, selectionEnd, "end");
}
