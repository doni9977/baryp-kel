
function validateRegistrationForm(event) {
    const form = document.querySelector('.register-box form');
    if (!form) return true;

    const fullName = document.getElementById('fullname').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    let isValid = true;

    function displayError(inputElement, message) {
        let errorDiv = inputElement.nextElementSibling;
        if (!errorDiv || !errorDiv.classList.contains('error-message')) {
            errorDiv = document.createElement('div');
            errorDiv.classList.add('error-message');
            inputElement.parentNode.insertBefore(errorDiv, inputElement.nextSibling);
        }
        errorDiv.textContent = message;
        inputElement.classList.add('input-error');
        isValid = false;
    }

    function clearErrors() {
        document.querySelectorAll('.error-message').forEach(el => el.remove());
        document.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));
        isValid = true;
    }

    clearErrors();

    if (fullName === '') {
        displayError(document.getElementById('fullname'), 'Full name is required.');
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === '') {
        displayError(document.getElementById('email'), 'Email is required.');
    } else if (!emailPattern.test(email)) {
        displayError(document.getElementById('email'), 'Invalid email format.');
    }

    if (password === '') {
        displayError(document.getElementById('password'), 'Password is required.');
    } else if (password.length < 6) {
        displayError(document.getElementById('password'), 'Password must be at least 6 characters.');
    }

    if (confirmPassword === '') {
        displayError(document.getElementById('confirm-password'), 'Confirm password is required.');
    } else if (password !== confirmPassword) {
        displayError(document.getElementById('confirm-password'), 'Passwords do not match.');
    }

    if (!isValid) {
        event.preventDefault(); 
    } else {
        alert('Registration successful!'); 
    }
}


function setupAccordion() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const isContentVisible = content.style.maxHeight && content.style.maxHeight !== '0px';

            document.querySelectorAll('.accordion-content').forEach(c => {
                c.style.maxHeight = '0px';
                c.previousElementSibling.classList.remove('active');
            });

            if (!isContentVisible) {
                content.style.maxHeight = content.scrollHeight + 'px';
                header.classList.add('active');
            }
        });
    });
}


function setupPopup() {
    const openButton = document.querySelector('.btn-filled'); 
    const closeButton = document.getElementById('popup-close');
    const popupOverlay = document.getElementById('popup-overlay');
    const popupContent = document.querySelector('.popup-content');

    if (openButton) {
        openButton.addEventListener('click', (e) => {
            e.preventDefault();
            if (popupOverlay) {
                popupOverlay.style.display = 'flex';
                setTimeout(() => popupContent.classList.add('show'), 10); 
            }
        });
    }

    if (closeButton) {
        closeButton.addEventListener('click', () => {
             if (popupOverlay) {
                popupContent.classList.remove('show');
                setTimeout(() => popupOverlay.style.display = 'none', 300); 
             }
        });
    }

    if (popupOverlay) {
        popupOverlay.addEventListener('click', (e) => {
            if (e.target === popupOverlay) {
                popupContent.classList.remove('show');
                setTimeout(() => popupOverlay.style.display = 'none', 300); 
            }
        });
    }
}


function setupBackgroundColorChanger() {
    const button = document.getElementById('change-bg-btn');
    const targetElement = document.getElementById('main-services-content'); 
    
    const colors = ['#f9f9f9', '#e0f7fa', '#fff3e0', '#fce4ec', '#e8f5e9']; 

    let colorIndex = 0;

    function changeColor() {
        if (!targetElement) return;

        colorIndex = (colorIndex + 1) % colors.length;
        targetElement.style.backgroundColor = colors[colorIndex]; 
    }

    if (button) {
        button.addEventListener('click', changeColor);
    }
}


function updateDateTime() {
    const dateTimeElement = document.getElementById('current-date-time');

    if (dateTimeElement) {
        const now = new Date();
        
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false 
        };
        
        const formattedDateTime = now.toLocaleDateString('en-US', options);

        dateTimeElement.textContent = ` | Current Time: ${formattedDateTime}`;
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.querySelector('.register-box form');
    if (registerForm) {
        registerForm.addEventListener('submit', validateRegistrationForm);
    }

    setupAccordion();
    setupPopup();
    setupBackgroundColorChanger();

    updateDateTime();
    setInterval(updateDateTime, 1000); 
});