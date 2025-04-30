document.getElementById("send-webhook").addEventListener("click", () => {
    const webhookURL = document.getElementById("webhook-url").value;
    const messageContent = document.getElementById("message-content").value;

    const payload = {
        content: messageContent
    };

    fetch(webhookURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    })
    .then(response => {
        if(response.ok) {
            alert("Message sent successfully!");
        } else {
            alert("Error sending message.");
        }
    });
});

document.getElementById("add-embed").addEventListener("click", () => {
    const previewDiv = document.getElementById("preview");
    previewDiv.innerHTML = "<p><strong>Embed Added:</strong> Customize in JSON</p>";
});
