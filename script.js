const savedServer = localStorage.getItem("pinnedServer");
const savedWebhook = localStorage.getItem("pinnedWebhook");
const correctPassword = "DevSMY";

function authenticate() {
    const enteredPassword = document.getElementById("password").value;
    if (enteredPassword === correctPassword) {
        document.getElementById("builder").style.display = "block";
    } else {
        alert("Incorrect password!");
    }
}

function pinServer() {
    const serverSelect = document.getElementById("server-select");
    const selectedServerId = serverSelect.value;
    
    // Save pinned server
    localStorage.setItem("pinnedServer", selectedServerId);
    alert(`Pinned ${serverSelect.options[serverSelect.selectedIndex].text} as default.`);
}

// Auto-load pinned webhook on page load
document.addEventListener("DOMContentLoaded", () => {
    if (savedServer) {
        document.getElementById("server-select").value = savedServer;
    }
    if (savedWebhook) {
        document.getElementById("webhook-url").value = savedWebhook;
    }
});

document.getElementById("send-webhook").addEventListener("click", () => {
    const webhookURL = document.getElementById("webhook-url").value.trim();
    const messageContent = document.getElementById("message-content").value.trim();
    
    if (!webhookURL || !messageContent) {
        alert("Webhook URL and message cannot be empty!");
        return;
    }

    const payload = { content: messageContent };

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
    document.getElementById("preview").innerHTML = "<p><strong>Embed Added:</strong> Customize in JSON</p>";
});
