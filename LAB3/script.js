function detectDevice() {
    const deviceTypeElement = document.getElementById("deviceType");
    const featureList = document.getElementById("featureList");

    if (window.innerWidth < 768) {
        deviceTypeElement.textContent = "You are using a mobile device.";
        featureList.innerHTML = `
            <div class="bg-white p-4 border rounded">Mobile Feature 1</div>
            <div class="bg-white p-4 border rounded">Mobile Feature 2</div>
        `;
    } else if (window.innerWidth < 1024) {
        deviceTypeElement.textContent = "You are using a tablet.";
        featureList.innerHTML = `
            <div class="bg-white p-4 border rounded">Tablet Feature 1</div>
            <div class="bg-white p-4 border rounded">Tablet Feature 2</div>
            <div class="bg-white p-4 border rounded">Tablet Feature 3</div>
        `;
    } else {
        deviceTypeElement.textContent = "You are using a desktop.";
        featureList.innerHTML = `
            <div class="bg-white p-4 border rounded">Desktop Feature 1</div>
            <div class="bg-white p-4 border rounded">Desktop Feature 2</div>
            <div class="bg-white p-4 border rounded">Desktop Feature 3</div>
            <div class="bg-white p-4 border rounded">Desktop Feature 4</div>
        `;
    }
}

window.onload = detectDevice;
window.onresize = detectDevice;
