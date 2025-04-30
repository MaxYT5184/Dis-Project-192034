const correctPassword = "DevSMY";
const backupPin = "Dev";

function authenticate() {
    const enteredPassword = document.getElementById("password").value;
    if (enteredPassword === correctPassword || enteredPassword === backupPin) {
        document.getElementById("builder").style.display = "block";
    } else {
        alert("Incorrect password or PIN!");
    }
}

function pinServer() {
    const serverSelect = document.getElementById("server-select");
    const selectedServerId = serverSelect.value;
    const webhookURL = document.getElementById("webhook-url").value.trim();

    if (!webhookURL) {
        alert("Enter a webhook URL before pinning!");
        return;
    }

    localStorage.setItem("pinnedServer", selectedServerId);
    localStorage.setItem("pinnedWebhook", webhookURL);
    alert(`Pinned ${serverSelect.options[serverSelect.selectedIndex].text}`);
}

document.addEventListener("DOMContentLoaded", () => {
    const savedServer = localStorage.getItem("pinnedServer");
    const savedWebhook = localStorage.getItem("pinnedWebhook");

    if (savedServer) document.getElementById("server-select").value = savedServer;
    if (savedWebhook) document.getElementById("webhook-url").value = savedWebhook;
});

document.getElementById("send-webhook").addEventListener("click", () => {
    const webhookURL = document.getElementById("webhook-url").value.trim();
    const messageContent = document.getElementById("message-content").value.trim();

    if (!webhookURL || !messageContent) {
        alert("Webhook URL and message cannot be empty!");
        return;
    }

    fetch(webhookURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: messageContent })
    })
    .then(response => {
        if(response.ok) alert("Message sent successfully!");
        else alert("Error sending message.");
    });
});

document.getElementById("add-embed").addEventListener("click", () => {
    const title = document.getElementById("embed-title").value;
    const description = document.getElementById("embed-description").value;
    const color = document.getElementById("embed-color").value.replace("#", "");

    document.getElementById("preview").innerHTML = `<p><strong>Embed Preview:</strong> ${title} - ${description}</p>`;
});

document.getElementById("schedule-webhook").addEventListener("click", () => {
    const webhookURL = document.getElementById("webhook-url").value.trim();
    const messageContent = document.getElementById("message-content").value.trim();
    const scheduleTime = new Date(document.getElementById("schedule-time").value).getTime();

    if (!webhookURL || !messageContent || isNaN(scheduleTime)) {
        alert("Enter valid webhook, message, and schedule time!");
        return;
    }

    setTimeout(() => {
        fetch(webhookURL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ content: messageContent })
        })
        .then(response => response.ok ? alert("Scheduled Message Sent!") : alert("Error Sending!"));
    }, scheduleTime - Date.now());

    alert("Message scheduled!");
});
