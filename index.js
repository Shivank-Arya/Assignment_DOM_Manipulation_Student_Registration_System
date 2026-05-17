/**
 * 1. DOM ELEMENTS SELECTION
 * We capture the Form to listen for submits, the Table Body to inject rows,
 * and the Container to manage the scrollbar logic.
 */
const studentForm = document.getElementById('studentForm');
const studentTable = document.querySelector('#studentTable tbody');
const emptyState = document.getElementById('emptyState');
const tableContainer = document.querySelector('.overflow-x-auto');

/**
 * 2. VALIDATION LOGIC
 * This is the 'gatekeeper' function. It ensures that only clean, 
 * formatted data enters our LocalStorage and UI.
 */
function validateInputs(data) {
    const nameRegex = /^[A-Za-z\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // 1. Check for empty fields
    if (!data.name || !data.id || !data.email || !data.contact || !data.address) {
        alert("All fields are required. You cannot add an empty row.");
        return false;
    }

    // 2. Validate Name (Characters only)
    if (!nameRegex.test(data.name)) {
        alert("Student Name should only contain characters.");
        return false;
    }

    // 3. Validate Student ID (Numbers only)
    // We use /^\d+$/ to ensure the string contains ONLY digits
    if (!/^\d+$/.test(data.id)) {
        alert("Student ID must contain only numbers.");
        return false;
    }

    /**
     * 4. VALIDATE CONTACT NUMBER (Strict 10 Digits)
     * We use a Regex /^\d{10}$/ which means:
     * ^ : Start of string
     * \d : Digit
     * {10} : Exactly 10 times
     * $ : End of string
     */
    if (!/^\d{10}$/.test(data.contact)) {
        alert("Contact Number must be exactly 10 digits (numbers only).");
        return false;
    }

    // 5. Validate Email
    if (!emailRegex.test(data.email)) {
        alert("Please enter a valid email address.");
        return false;
    }

    return true;
}

/**
 * 3. DYNAMIC SCROLLBAR LOGIC
 * This manages the 'View' experience. Instead of making the page infinitely long,
 * we containerize the table once it becomes crowded.
 */
function updateScrollbar() {
    const students = JSON.parse(localStorage.getItem('students') || '[]');
    
    /**
     * Logic: If more than 5 students, limit height to 400px and enable 'auto' overflow.
     * This forces a scrollbar to appear inside the table container.
     */
    if (students.length > 5) {
        tableContainer.style.maxHeight = "400px";
        tableContainer.style.overflowY = "auto";
    } else {
        // Reset height if students are deleted and count drops to 5 or less.
        tableContainer.style.maxHeight = "none";
    }
}

/**
 * 4. EVENT LISTENERS & FORM SUBMISSION
 */
studentForm.addEventListener('submit', function (e) {
    // Stop the browser from its default behavior of reloading the page on submit.
    e.preventDefault(); 

    // Create a data object from form values.
    // .trim() is crucial—it removes accidental leading/trailing spaces.
    const studentData = {
        uniqueId: Date.now().toString(), 
        name: document.getElementById('name').value.trim(),
        id: document.getElementById('studentID').value.trim(),
        class: document.getElementById('studentClass').value,
        rollNo: document.getElementById('rollNo').value,
        email: document.getElementById('email').value.trim(),
        contact: document.getElementById('contact').value.trim(),
        address: document.getElementById('address').value.trim()
    };

    // Execution flow: Validate -> Save -> Reset -> Refresh UI
    if (validateInputs(studentData)) {
        saveToLocalStorage(studentData);
        studentForm.reset();
        refreshTable(); 
    }
});

/**
 * 5. DATA PERSISTENCE & UI REFRESHING
 */
function refreshTable() {
    // Clear the visual table completely before rebuilding it from the data source.
    studentTable.innerHTML = ""; 
    const students = JSON.parse(localStorage.getItem('students') || '[]');

    if (students.length === 0) {
        emptyState.classList.remove('hidden');
    } else {
        emptyState.classList.add('hidden');
        // Iteration: For every student object in the array, run the 'add' function.
        students.forEach(student => addStudentToTable(student));
    }
    
    // Always check for scrollbar needs after updating the list.
    updateScrollbar();
}

function addStudentToTable(student) {
    const row = document.createElement('tr');
    row.className = "hover:bg-slate-50 transition border-b border-slate-100";

    // Injecting HTML with Template Literals allows us to use ${variable} syntax.
    row.innerHTML = `
        <td class="px-6 py-4 font-medium text-indigo-600">${student.id}</td>
        <td class="px-6 py-4 font-semibold text-slate-800">${student.name}</td>
        <td class="px-6 py-4">Grade ${student.class}</td>
        <td class="px-6 py-4 text-center">
            <span class="bg-slate-100 px-2 py-1 rounded text-xs font-mono">${student.rollNo}</span>
        </td>
        <td class="px-6 py-4 text-sm">${student.email}</td>
        <td class="px-6 py-4 text-sm">${student.contact}</td>
        <td class="px-6 py-4 text-sm max-w-xs truncate">${student.address}</td>
        <td class="px-6 py-4 text-right space-x-2">
            <button onclick="editRecord('${student.uniqueId}')" class="text-indigo-600 hover:text-indigo-900 font-medium">Edit</button>
            <button onclick="deleteRecord('${student.uniqueId}', true)" class="text-red-600 hover:text-red-900 font-medium">Delete</button>
        </td>
    `;
    studentTable.appendChild(row);
}

function saveToLocalStorage(student) {
    const students = JSON.parse(localStorage.getItem('students') || '[]');
    students.push(student);
    // LocalStorage only stores strings, so we must stringify the array.
    localStorage.setItem('students', JSON.stringify(students));
}

/**
 * 6. GLOBAL ACTIONS (WINDOW SCOPE)
 * We attach these to 'window' so the HTML buttons created in addStudentToTable
 * can find these functions regardless of the script's loading state.
 */

window.deleteRecord = function(uniqueId, askConfirm = true) {
    // Logical Toggle: askConfirm is false when called by the 'Edit' function.
    let proceed = askConfirm ? confirm("Are you sure you want to delete this record?") : true;
    
    if (proceed) {
        let students = JSON.parse(localStorage.getItem('students') || '[]');
        // Filter: Keep every student EXCEPT the one we want to delete.
        students = students.filter(s => s.uniqueId !== uniqueId);
        localStorage.setItem('students', JSON.stringify(students));
        refreshTable();
    }
};

window.editRecord = function(uniqueId) {
    let students = JSON.parse(localStorage.getItem('students') || '[]');
    const student = students.find(s => s.uniqueId === uniqueId);

    if (student) {
        // UI Logic: Populate the form inputs with the existing student data.
        document.getElementById('name').value = student.name;
        document.getElementById('studentID').value = student.id;
        document.getElementById('studentClass').value = student.class;
        document.getElementById('rollNo').value = student.rollNo;
        document.getElementById('email').value = student.email;
        document.getElementById('contact').value = student.contact;
        document.getElementById('address').value = student.address;

        // Functional Logic: We remove the old record from storage immediately.
        // If the user submits the form, it saves as a 'new' record.
        // If they refresh without submitting, the old record is gone (acting as a cancel).
        window.deleteRecord(uniqueId, false);

        // UX Logic: Scroll to top smoothly so the user sees the filled-in form.
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
};

// INITIALIZATION: Populate the table when the page loads.
refreshTable();