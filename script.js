// TASK 4: Data Structure (Objects and Array) for City Gallery
const cityData = [
    { name: 'Astana', image: 'image/Astana.jpeg' },
    { name: 'Almaty', image: 'image/Almaty.jpeg' },
    { name: 'Shymkent', image: 'image/Shymkent.jpg' },
    { name: 'Kokshetau', image: 'image/Kokshetau.jpeg' },
    { name: 'Oral', image: 'image/Oral.jpeg' },
    { name: 'Kyzylorda', image: 'image/Kyzylorda.jpeg' },
    { name: 'Oskemen', image: 'image/Oskemen.jpeg' },
    { name: 'Semey', image: 'image/Semey.jpeg' },
    { name: 'Karganda', image: 'image/Karganda.jpeg' },
]; 

// TASK 6: Sound Effects Setup (You must have 'notification.mp3' file)
const notificationSound = new Audio('notification.mp3'); 

function playNotificationSound() {
    notificationSound.currentTime = 0; 
    notificationSound.play().catch(error => {
        console.warn("Could not play sound (browser autoplay policy):", error);
    });
}


// TASK 7: Modified Validation for Animation
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
        const registerButton = document.getElementById('register-btn');
        if (registerButton) {
            registerButton.classList.add('shake-animation'); // TASK 7: Add Animation
            
            // Remove the class after the animation ends to allow it to be re-triggered
            setTimeout(() => {
                registerButton.classList.remove('shake-animation');
            }, 500); 
        }
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


// TASK 6: Modified Popup for Sound Effects
function setupPopup() {
    const openButton = document.querySelector('.hero-buttons .btn-filled'); 
    const closeButton = document.getElementById('popup-close');
    const popupOverlay = document.getElementById('popup-overlay');
    const popupContent = document.querySelector('.popup-content');

    if (openButton) {
        openButton.addEventListener('click', (e) => {
            e.preventDefault();
            
            playNotificationSound(); // TASK 6: Play sound on button click
            
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

// TASK 1: Day/Night Theme Toggle
function setupThemeToggle() {
    const toggleButton = document.getElementById('theme-toggle-btn');
    const body = document.body;

    // Check for saved theme preference in local storage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
        if (toggleButton) {
             toggleButton.textContent = 'Day Mode';
        }
    } else {
         if (toggleButton) {
             toggleButton.textContent = 'Night Mode';
        }
    }

    if (toggleButton) {
        toggleButton.addEventListener('click', () => {
            if (body.classList.contains('dark-theme')) {
                body.classList.remove('dark-theme');
                localStorage.setItem('theme', 'light');
                toggleButton.textContent = 'Night Mode';
            } else {
                body.classList.add('dark-theme');
                localStorage.setItem('theme', 'dark');
                toggleButton.textContent = 'Day Mode';
            }
        });
    }
}

// TASK 4: Display Time-based Greeting using Switch Statement
function displayTimeBasedGreeting() {
    const greetingElement = document.getElementById('time-based-greeting');
    if (!greetingElement) return;

    const hour = new Date().getHours();
    let greeting;

    // TASK 4: Use a switch statement to determine the greeting
    switch (true) {
        case (hour >= 5 && hour < 12):
            greeting = 'Good Morning! Have a Great Flight!';
            break;
        case (hour >= 12 && hour < 18):
            greeting = 'Good Afternoon! Where Are You Flying Today?';
            break;
        case (hour >= 18 && hour < 22):
            greeting = 'Good Evening! Ready for Your Next Journey?';
            break;
        default:
            greeting = 'Welcome! The Night Sky Awaits Your Travel.';
    }

    greetingElement.textContent = greeting;
}

// TASK 3: Higher-Order Function (Simulated fetch with a callback)
function submitDataAsync(data, callback) {
    console.log('Simulating data submission:', data);
    
    // Simulate a network delay (e.g., from fetch)
    setTimeout(() => {
        // Assume submission is always successful for the assignment
        const success = true; 
        callback(success); // Execute callback function
    }, 1000); // 1 second delay
}

// TASK 3: Asynchronous Form Submission with Callback
function setupContactFormSubmission() {
    const form = document.getElementById('contact-form');
    const successMessage = document.getElementById('contact-success-message');
    if (!form) return;

    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission

        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };

        // Simulate asynchronous submission using the HOF
        submitDataAsync(formData, (isSuccess) => {
            if (isSuccess) {
                form.reset(); 
                successMessage.style.display = 'block'; // Show success message
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 5000);
            } else {
                alert('Submission failed. Please try again.');
            }
        });
    });
}

// TASK 4: Dynamic content generation using Arrays/Loops/HOF (Used for setupCityGallery below)
function renderCityCarousel() {
    const carouselInner = document.querySelector('.city-carousel');
    if (!carouselInner) return;

    carouselInner.innerHTML = '';
    
    // TASK 4: Use forEach (Higher-Order Function) to iterate and generate content
    cityData.forEach((city, index) => {
        const slide = document.createElement('div');
        slide.classList.add('city-slide');
        if (index === 0) {
            slide.classList.add('active'); 
        }

        const cityImage = document.createElement('img');
        cityImage.src = city.image;
        cityImage.alt = `${city.name} skyline`;
        
        slide.appendChild(cityImage);
        carouselInner.appendChild(slide);
    });
}

// TASK 2: Image Gallery/Carousel functionality (Manipulating attributes and classes)
function setupCityGallery() {
    const mainCarouselWrapper = document.querySelector('.city-carousel-inner');
    const mainCarousel = document.querySelector('.city-carousel');
    if (!mainCarousel) return;

    // Create a new container for the thumbnails
    const thumbnailsContainer = document.createElement('div');
    thumbnailsContainer.classList.add('city-thumbnails');
    mainCarouselWrapper.appendChild(thumbnailsContainer);
    
    // TASK 4: Use map (Higher-Order Function) to create thumbnail HTML
    const thumbnailsHTML = cityData.map((city, index) => `
        <img 
            src="${city.image}" 
            alt="${city.name}" 
            data-city-index="${index}" 
            class="thumbnail-img ${index === 0 ? 'active-thumbnail' : ''}"
        >
    `).join('');
    
    thumbnailsContainer.innerHTML = thumbnailsHTML;
    
    const thumbnailImages = document.querySelectorAll('.thumbnail-img');
    const citySlides = document.querySelectorAll('.city-slide');

    thumbnailImages.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', (event) => {
            
            // TASK 2: Manipulate attribute/display (changing the visible slide by class)
            citySlides.forEach(slide => slide.classList.remove('active'));
            citySlides[index].classList.add('active');

            // Update active thumbnail style
            thumbnailImages.forEach(img => img.classList.remove('active-thumbnail'));
            event.target.classList.add('active-thumbnail');
        });
    });
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
    // General setups
    const registerForm = document.querySelector('.register-box form');
    if (registerForm) {
        registerForm.addEventListener('submit', validateRegistrationForm);
    }
    setupAccordion();
    setupPopup();
    setupBackgroundColorChanger(); // Retained old function for completeness

    // TASK 1: Theme Toggle
    setupThemeToggle();

    // TASK 4: Time-based Greeting
    displayTimeBasedGreeting();

    // TASK 3: Asynchronous Contact Form Submission
    setupContactFormSubmission();
    
    // TASK 2 & 4: City Gallery/Carousel (only runs on services.html)
    if (document.querySelector('.city-carousel')) { 
        renderCityCarousel();
        setupCityGallery();
    }

    updateDateTime();
    setInterval(updateDateTime, 1000); 
});