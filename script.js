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

const notificationSound = new Audio('notification.mp3'); 

function playNotificationSound() {
    notificationSound.currentTime = 0; 
    notificationSound.play().catch(error => {
        console.warn("Could not play sound (browser autoplay policy):", error);
    });
}

// --- START: Task 7 Logic (Notification Toast) ---
function showToast(message, type = 'success') {
    const $toastContainer = $('#toast-container');
    if (!$toastContainer.length) return;

    const $toast = $('<div></div>')
        .addClass('toast ' + type)
        .text(message);

    $toastContainer.append($toast);

    setTimeout(() => {
        $toast.addClass('show');
    }, 100);

    setTimeout(() => {
        $toast.removeClass('show');
    }, 3000);

    setTimeout(() => {
        $toast.remove();
    }, 3500); 
}
// --- END: Task 7 Logic ---


function validateRegistrationForm(event) {
    const $form = $('.register-box form');
    if (!$form.length) return true;

    $form.find('.error-message').remove();
    $form.find('.input-error').removeClass('input-error');

    const fullName = $('#fullname').val().trim();
    const email = $('#email').val().trim();
    const password = $('#password').val();
    const confirmPassword = $('#confirm-password').val();
    let isValid = true;

    function displayError($inputElement, message) {
        $inputElement.after(`<div class="error-message">${message}</div>`);
        $inputElement.addClass('input-error');
        isValid = false;
    }

    if (fullName === '') displayError($('#fullname'), 'Full name is required.');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === '') displayError($('#email'), 'Email is required.');
    else if (!emailPattern.test(email)) displayError($('#email'), 'Invalid email format.');
    if (password === '') displayError($('#password'), 'Password is required.');
    else if (password.length < 6) displayError($('#password'), 'Password must be at least 6 characters.');
    if (confirmPassword === '') displayError($('#confirm-password'), 'Confirm password is required.');
    else if (password !== confirmPassword) displayError($('#confirm-password'), 'Passwords do not match.');
    
    if (!isValid) {
        event.preventDefault(); 
        $('#register-btn').addClass('shake-animation'); 
        setTimeout(() => { $('#register-btn').removeClass('shake-animation'); }, 500); 
        return;
    }

    event.preventDefault(); 
    const $button = $('#register-btn');
    
    $button.find('.button-text').text('Please wait...');
    $button.find('.spinner-border').show();
    $button.prop('disabled', true); 
    
    setTimeout(() => {
        showToast('Registration successful!'); 
        $button.find('.button-text').text('Register');
        $button.find('.spinner-border').hide();
        $button.prop('disabled', false);
        $form.get(0).reset(); 
    }, 2000); 
}

function animateCounter($element) {
    const target = parseInt($element.data('target'));
    const suffix = $element.data('suffix');
    const duration = 1500; 
    const $this = $element;

    $this.stop(true, true); 

    $({ countNum: 0 }).animate({ countNum: target }, {
        duration: duration,
        easing: 'swing',
        step: function() {
            $this.text(Math.floor(this.countNum) + suffix);
        },
        complete: function() {
            $this.text(target + suffix);
        }
    });
}

function resetCounter($element) {
    $element.stop(true, true);
    const initialText = '0' + $element.data('suffix');
    $element.text(initialText);
}


function setupAccordion() {
    const $accordionHeaders = $('.accordion-header'); 
    
    $accordionHeaders.on('click', function() {
        const $header = $(this);
        const $content = $header.next('.accordion-content');
        const isContentVisible = $header.hasClass('active');

        $('.accordion-header').not($header).removeClass('active');
        $('.accordion-content').not($content).css('maxHeight', '0px')
            .find('.count-up').each(function() {
                resetCounter($(this));
            });

        if (isContentVisible) {
            $content.css('maxHeight', '0px');
            $header.removeClass('active');
            $content.find('.count-up').each(function() {
                resetCounter($(this));
            });
            
        } else {
            $content.css('maxHeight', $content.prop('scrollHeight') + 'px');
            $header.addClass('active');
            $content.find('.count-up').each(function() {
                resetCounter($(this)); 
                animateCounter($(this));
            });
        }
    });
}

function setupPopup() {
    const openButton = document.querySelector('.hero-buttons .btn-filled'); 
    const closeButton = document.getElementById('popup-close');
    const popupOverlay = document.getElementById('popup-overlay');
    const popupContent = document.querySelector('.popup-content');

    if (openButton) {
        openButton.addEventListener('click', (e) => {
            e.preventDefault();
            
            playNotificationSound(); 
            
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

function setupThemeToggle() {
    const toggleButton = document.getElementById('theme-toggle-btn');
    const body = document.body;

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

function displayTimeBasedGreeting() {
    const greetingElement = document.getElementById('time-based-greeting');
    if (!greetingElement) return;

    const hour = new Date().getHours();
    let greeting;

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

function submitDataAsync(data, callback) {
    console.log('Simulating data submission:', data);
    
    setTimeout(() => {
        const success = true; 
        callback(success); 
    }, 1000); 
}

function setupContactFormSubmission() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (event) => {
        event.preventDefault(); 

        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };

        submitDataAsync(formData, (isSuccess) => {
            if (isSuccess) {
                form.reset(); 
                showToast('Message sent successfully!');
            } else {
                showToast('Submission failed. Please try again.', 'error');
            }
        });
    });
}

function renderCityCarousel() {
    const carouselInner = document.querySelector('.city-carousel');
    if (!carouselInner) return;

    carouselInner.innerHTML = '';
    
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

function setupCityGallery() {
    const mainCarouselWrapper = document.querySelector('.city-carousel-inner');
    const mainCarousel = document.querySelector('.city-carousel');
    if (!mainCarousel) return;

    const thumbnailsContainer = document.createElement('div');
    thumbnailsContainer.classList.add('city-thumbnails');
    mainCarouselWrapper.appendChild(thumbnailsContainer);
    
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
            
            citySlides.forEach(slide => slide.classList.remove('active'));
            citySlides[index].classList.add('active');

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

function setupFlightClassFilter() {
    $('#class-filter-input').on('keyup', function() {
        const filterText = $(this).val().toLowerCase();
        
        $('.flight-classes-grid .class-card-item').each(function() {
            const cardText = $(this).text().toLowerCase();
            
            if (cardText.includes(filterText)) {
                $(this).show(); 
            } else {
                $(this).hide(); 
            }
        });
    });
}

function setupCityAutocomplete() {
    const $input = $('#departure-city');
    const $suggestions = $('#city-suggestions');
    const cityNames = cityData.map(city => city.name);

    $input.on('keyup', function() {
        const searchText = $(this).val().toLowerCase();
        
        if (searchText.length === 0) {
            $suggestions.empty().hide();
            return;
        }

        const filteredCities = cityNames.filter(name => 
            name.toLowerCase().startsWith(searchText)
        );
        
        $suggestions.empty();
        
        if (filteredCities.length > 0) {
            filteredCities.forEach(cityName => {
                const $item = $('<div>')
                    .addClass('suggestion-item')
                    .text(cityName)
                    .on('click', function() {
                        $input.val(cityName);
                        $suggestions.empty().hide();
                    });
                $suggestions.append($item);
            });
            $suggestions.show();
        } else {
            $suggestions.hide();
        }
    });

    $(document).on('click', function(e) {
        if (!$(e.target).closest('.input-autocomplete-wrapper').length) {
            $suggestions.hide();
        }
    });
}

function setupSearchHighlighting() {
    const $contentArea = $('.about-details, .about-intro, .partners-section'); 
    const originalContent = {};

    $contentArea.each(function(index) {
        originalContent[index] = $(this).html();
    });
    
    function clearHighlighting() {
        $contentArea.each(function(index) {
            $(this).html(originalContent[index]);
        });
    }

    $('#clear-highlight-btn').on('click', clearHighlighting);

    $('#highlight-btn').on('click', function() {
        const keyword = $('#highlight-keyword-input').val().trim();
        clearHighlighting(); 

        if (keyword === '') {
            return;
        }
        
        const escapedKeyword = keyword.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        const regex = new RegExp(`(${escapedKeyword})`, 'gi');
        const replacement = '<span class="highlight">$1</span>';

        $contentArea.each(function() {
            let textContent = $(this).html();
            textContent = textContent.replace(regex, replacement);
            $(this).html(textContent);
        });
    });
}

function setupScrollProgressBar() {
    $(window).on('scroll', function() {
        const docHeight = $(document).height();
        const winHeight = $(window).height();
        const scrollTop = $(window).scrollTop();
        const scrollable = docHeight - winHeight;
        
        if (scrollable > 0) {
            const progress = (scrollTop / scrollable) * 100;
            $('#scroll-progress-bar').css('width', progress + '%');
        } else {
             $('#scroll-progress-bar').css('width', '100%');
        }
    });
}

// --- START: Task 8 Logic (Copy to Clipboard) ---
function setupCopyToClipboard() {
    $('.btn-copy').on('click', function() {
        const $button = $(this);
        const textToCopy = $button.siblings('.text-to-copy').text().trim();

        if (navigator.clipboard) {
            navigator.clipboard.writeText(textToCopy).then(() => {
                $button.addClass('copied');
                $button.find('.tooltip-text').text('Copied!');
                
                setTimeout(() => {
                    $button.removeClass('copied');
                    $button.find('.tooltip-text').text('Copy to clipboard');
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy text: ', err);
                showToast('Failed to copy', 'error');
            });
        }
    });
}
// --- END: Task 8 Logic ---

// --- START: Task 9 Logic (Lazy Loading) ---
function checkLazyImages() {
    const $window = $(window);
    const windowHeight = $window.height();
    const scrollTop = $window.scrollTop();
    const fold = scrollTop + windowHeight;

    $('.lazy-load').each(function() {
        const $image = $(this);
        if ($image.offset().top < fold) {
            const dataSrc = $image.attr('data-src');
            if (dataSrc) {
                $image.attr('src', dataSrc).on('load', function() {
                    $(this).removeClass('lazy-load');
                });
            }
        }
    });
}

function setupLazyLoading() {
    $(window).on('scroll resize', checkLazyImages);
    checkLazyImages(); 
}
// --- END: Task 9 Logic ---


$(document).ready(function() {
    console.log("jQuery is ready!"); 

    $('.register-box form').on('submit', validateRegistrationForm); 
    
    setupAccordion(); 
    setupPopup();
    setupThemeToggle();
    displayTimeBasedGreeting();
    setupContactFormSubmission();
    
    if (document.querySelector('.city-carousel')) { 
        renderCityCarousel();
        setupCityGallery();
    }

    updateDateTime();
    setInterval(updateDateTime, 1000); 
    
    setupFlightClassFilter(); 
    setupCityAutocomplete(); 
    setupSearchHighlighting(); 
    setupScrollProgressBar(); 

    // --- Add calls for Tasks 8 and 9 ---
    setupCopyToClipboard();
    setupLazyLoading();
});
