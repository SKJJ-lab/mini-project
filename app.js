function addSchedule() {

    let subject = document.getElementById("subject").value;
    let day = document.getElementById("day").value;
    let startTime = document.getElementById("startTime").value;
    let duration = document.getElementById("duration").value;
    let task = document.getElementById("task").value;

    if (subject === "" || day === "" || startTime === "" || task === "") {
        alert("Please fill in all fields.");
        return;
    }

    let endTime24 = calculateEndTime(startTime, duration);

    let formattedStart = formatTimeFromString(startTime);
    let formattedEnd = formatTimeFromString(endTime24);

    let table = document.getElementById("timetable")
                    .getElementsByTagName("tbody")[0];

    let newRow = table.insertRow();

    newRow.innerHTML = `
        <td>${day}</td>
        <td>${subject}</td>
        <td>${formattedStart} - ${formattedEnd}</td>
        <td>${task}</td>
        <td><button class="delete-btn" onclick="deleteRow(this)">Delete</button></td>
    `;

    if (parseInt(duration) >= 90) {
        newRow.style.backgroundColor = "#ffe6e6";
    }

    clearFields();
}

function calculateEndTime(startTime, duration) {
    let [hours, minutes] = startTime.split(":").map(Number);

    minutes += parseInt(duration);

    hours += Math.floor(minutes / 60);
    minutes = minutes % 60;

    if (hours >= 24) {
        hours = hours % 24;
    }

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

function formatTimeFromString(timeString) {
    let [hours, minutes] = timeString.split(":").map(Number);

    let period = hours >= 12 ? "PM" : "AM";
    let formattedHour = hours % 12;

    if (formattedHour === 0) {
        formattedHour = 12;
    }

    return `${formattedHour}:${String(minutes).padStart(2, '0')} ${period}`;
}

function deleteRow(button) {
    let row = button.parentElement.parentElement;
    row.remove();
}

function clearFields() {
    document.getElementById("subject").value = "";
    document.getElementById("day").value = "";
    document.getElementById("startTime").value = "";
    document.getElementById("task").value = "";
}
