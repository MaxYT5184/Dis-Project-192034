const savedServer = localStorage.getItem("pinnedServer");
const savedWebhook = localStorage.getItem("pinnedWebhook");
const correctPassword = "DevSMY";

// Authenticate User
function authenticate() {
    const enteredPassword = document.getElementById("password").value;
    if (enteredPassword === correctPassword) {
        document.getElementById("builder").style.display = "block";
    } else {
        alert("Incorrect password!");
    }
}

// Pin Selected Server & Save Webhook URL
function pinServer() {
    const serverSelect = document.getElementById("server-select");
    const selectedServerId = serverSelect.value;
    const webhookURL = document.getElementById("webhook-url").value.trim();

    if (!webhookURL) {
        alert("Please enter a webhook URL before pinning!");
        return;
    }

    // Save pinned server and webhook URL
    localStorage.setItem("pinnedServer", selectedServerId);
    localStorage.setItem("pinnedWebhook", webhookURL);
    alert(`Pinned ${serverSelect.options[serverSelect.selectedIndex].text} with webhook.`);
}

// Auto-load pinned server & webhook on page load
document.addEventListener("DOMContentLoaded", () => {
    if (savedServer) {
        document.getElementById("server-select").value = savedServer;
    }
    if (savedWebhook) {
        document.getElementById("webhook-url").value = savedWebhook;
    }
});

// Send Webhook Message
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
