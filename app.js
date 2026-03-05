// --- Login Tabs Switching ---
const studentTab = document.getElementById('student-tab');
const adminTab = document.getElementById('admin-tab');
const studentLoginForm = document.getElementById('student-login-form');
const adminLoginForm = document.getElementById('admin-login-form');

if (studentTab && adminTab && studentLoginForm && adminLoginForm) {
    studentTab.addEventListener('click', () => {
        studentTab.classList.add('active');
        adminTab.classList.remove('active');
        studentLoginForm.classList.remove('hidden');
        adminLoginForm.classList.add('hidden');
    });
    adminTab.addEventListener('click', () => {
        adminTab.classList.add('active');
        studentTab.classList.remove('active');
        adminLoginForm.classList.remove('hidden');
        studentLoginForm.classList.add('hidden');
    });
}

// --- Student Login Logic ---
if (studentLoginForm) {
    studentLoginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        // Simulate student login
        showSection('user-dashboard');
        localStorage.setItem('current_user_id', 1); // Mock user ID
    });
}

// --- Admin Login Logic ---
if (adminLoginForm) {
    adminLoginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        // Simulate admin login
        showSection('admin-dashboard');
        loadComplaints();
    });
}
const API_URL = ""; // Change this after deploying backend

// --- Section Toggling ---
function showSection(id) {
    document.querySelectorAll('section').forEach(s => s.classList.add('hidden'));
    document.getElementById(id).classList.remove('hidden');
}

// --- Login Logic ---
// (Old login form removed, replaced by separate admin/student forms)

// --- Submit Complaint ---
document.getElementById('complaint-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const complaintData = {
        user_id: localStorage.getItem('current_user_id'),
        title: document.getElementById('title').value,
        description: document.getElementById('description').value
    };

    // Simulate API call for demo
    let res = { ok: true };
    // Uncomment below for real API
    // const res = await fetch(`${API_URL}/complaints`, {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(complaintData)
    // });

    if (res.ok) {
        // Show animated success message
        const successMsg = document.getElementById('complaint-success');
        successMsg.classList.remove('hidden');
        setTimeout(() => {
            successMsg.classList.add('hidden');
        }, 2000);
        document.getElementById('complaint-form').reset();
    }
});

// --- Admin: Load Complaints ---
async function loadComplaints() {
    // Simulate data for demo
    const data = [
        { id: 1, user_id: 1, title: 'Sample Complaint', status: 'Pending' },
        { id: 2, user_id: 2, title: 'Another Issue', status: 'Resolved' }
    ];
    // Uncomment below for real API
    // const res = await fetch(`${API_URL}/admin/complaints`);
    // const data = await res.json();
    const body = document.getElementById('complaints-body');
    body.innerHTML = '';

    data.forEach(c => {
        body.innerHTML += `
            <tr>
                <td>${c.id}</td>
                <td>${c.user_id}</td>
                <td>${c.title}</td>
                <td><strong>${c.status}</strong></td>
                <td>
                    <button onclick="updateStatus(${c.id}, 'Resolved')" style="padding:5px; font-size:12px;">Resolve</button>
                </td>
            </tr>
        `;
    });
}

// Optional: Smooth scroll for nav links
document.querySelectorAll('.main-header nav a').forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const section = document.querySelector(href);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

function logout() {
    showSection('login-section');
    localStorage.clear();
}