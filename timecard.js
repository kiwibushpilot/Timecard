const hourlyWage = 19.82;
const startDate = new Date('2024-08-19'); // Start date of the fortnight (19/08/2024)

// Load saved data from localStorage on page load
document.addEventListener('DOMContentLoaded', () => {
    loadData();
    calculateHours();
    displayDates();
});

function timeToDecimal(time) {
    const [hours, minutes] = time.split(':').map(Number);
    return hours + minutes / 60;
}

function calculateHours() {
    let totalHours = 0;

    for (let week = 1; week <= 2; week++) {
        for (let day = 1; day <= 5; day++) {
            const startTime = document.getElementById(`start-${week}-${day}`).value;
            const finishTime = document.getElementById(`finish-${week}-${day}`).value;

            if (startTime && finishTime) {
                const start = timeToDecimal(startTime);
                const finish = timeToDecimal(finishTime);
                const hoursWorked = finish - start;

                if (hoursWorked > 0) {
                    totalHours += hoursWorked;
                    document.getElementById(`hours-${week}-${day}`).innerText = hoursWorked.toFixed(2);
                } else {
                    document.getElementById(`hours-${week}-${day}`).innerText = "0";
                }
            }
        }
    }

    const takeHomePay = totalHours * hourlyWage;

    document.getElementById('total-hours').innerText = totalHours.toFixed(2);
    document.getElementById('take-home-pay').innerText = takeHomePay.toFixed(2);
}

// Save data to localStorage
function saveData() {
    for (let week = 1; week <= 2; week++) {
        for (let day = 1; day <= 5; day++) {
            const startTime = document.getElementById(`start-${week}-${day}`).value;
            const finishTime = document.getElementById(`finish-${week}-${day}`).value;

            localStorage.setItem(`start-${week}-${day}`, startTime);
            localStorage.setItem(`finish-${week}-${day}`, finishTime);
        }
    }
}

// Load data from localStorage
function loadData() {
    for (let week = 1; week <= 2; week++) {
        for (let day = 1; day <= 5; day++) {
            const startTime = localStorage.getItem(`start-${week}-${day}`);
            const finishTime = localStorage.getItem(`finish-${week}-${day}`);

            if (startTime) document.getElementById(`start-${week}-${day}`).value = startTime;
            if (finishTime) document.getElementById(`finish-${week}-${day}`).value = finishTime;
        }
    }
}

// Display dates for each weekday
function displayDates() {
    const dateOptions = { year: 'numeric', month: '2-digit', day: '2-digit' }; // Date format options

    for (let week = 1; week <= 2; week++) {
        for (let day = 1; day <= 5; day++) {
            const currentDate = new Date(startDate);
            currentDate.setDate(startDate.getDate() + (week - 1) * 7 + (day - 1));
            document.getElementById(`date-${week}-${day}`).innerText = currentDate.toLocaleDateString('en-GB', dateOptions);
        }
    }
}
