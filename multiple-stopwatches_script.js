const clearAllBtn = document.getElementById('clear-all');
const allTimeBtns = document.querySelectorAll('.time-btn');
const clearSetBtns = document.querySelectorAll('.clear-set');

// Initialize all stopwatches
allTimeBtns.forEach(btn => {
	btn.currTime = 0.0;
	btn.prevTime = 0.0;
	btn.startTime = 0;
	btn.addEventListener('click', toggleSet);
});

// Clear all stopwatches globally
clearAllBtn.addEventListener('click', () => {
	allTimeBtns.forEach(clearBtnState);
});

// Clear a specific set
clearSetBtns.forEach(btn => {
	btn.addEventListener('click', (e) => {
		const setId = e.target.getAttribute('data-set');
		document.querySelectorAll(`.time-btn[data-set="${setId}"]`).forEach(clearBtnState);
	});
});

// Toggle start/stop for both stopwatches in a set
function toggleSet(e) {
	const setId = e.target.getAttribute('data-set');
	const btnsInSet = document.querySelectorAll(`.time-btn[data-set="${setId}"]`);
	
	const isGoing = e.target.classList.contains('going');

	btnsInSet.forEach(btn => {
		if (!isGoing) { // Start them
			btn.classList.add('going');
			btn.startTime = new Date();
			btn.prevTime = btn.currTime;
		} else { // Stop them
			btn.classList.remove('going');
		}
	});
}

function clearBtnState(btn) {
	btn.classList.remove('going');
	btn.textContent = '00:00:00.00';
	btn.currTime = 0.0;
	btn.startTime = 0;
	btn.prevTime = 0.0;
}

function updateStopwatches() {
	// Get array of stopwatches that are currently going
	let going = document.querySelectorAll('.time-btn.going');
	
	going.forEach(btn => { 
		let dur = (new Date() - btn.startTime) / 1000;
		let total_secs = parseFloat(Math.round((+btn.prevTime + dur) * 100) / 100).toFixed(2); //round to 2 decimal places
		let secs = parseFloat(total_secs % 60).toFixed(2);
		let total_mins = Math.floor(total_secs / 60);
		let mins = parseFloat(Math.floor(total_mins) % 60).toFixed(0);
		let hours = Math.floor(total_mins / 60);
		
		btn.currTime = total_secs; // Store total seconds so minutes aren't lost on pause
		btn.textContent = hours.toString().padStart(2, '0') + ":" + mins.toString().padStart(2, '0') + ":" + secs.toString().padStart(5, '0');
	});
}

setInterval(updateStopwatches, 10);

// Tab Switching Logic
const tabBtns = document.querySelectorAll('.tab-btn');

tabBtns.forEach(btn => {
	btn.addEventListener('click', (e) => {
		const targetId = e.target.getAttribute('data-tab');
		const container = e.target.closest('.story-container');
		
		// Remove 'active' class from all buttons and content within this specific set
		container.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
		container.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
		
		// Add 'active' class to the clicked button and the corresponding content block
		e.target.classList.add('active');
		document.getElementById(targetId).classList.add('active');
	});
});