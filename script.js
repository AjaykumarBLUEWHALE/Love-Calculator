
        // Add these variables at the top of your script (with the other variable declarations)
let previousNames = {
    name1: '',
    name2: ''
};
let hasCalculated = false;

// Modify the calculateLove function to include the check
function calculateLove() {
    const name1 = name1Input.value.trim();
    const name2 = name2Input.value.trim();
    const dob1 = document.getElementById('dob1').value;
    const dob2 = document.getElementById('dob2').value;
    
    if (!name1 || !name2 || !dob1 || !dob2) {
        alert('Please fill in both names and birth dates');
        return;
    }
    
    // Check if the names are the same as previous calculation
    if (hasCalculated && name1 === previousNames.name1 && name2 === previousNames.name2) {
        alert('You have already used this app. The result of your love will not change.');
        return;
    }
    
    // Store current names
    previousNames = {
        name1: name1,
        name2: name2
    };
    hasCalculated = true;
    
    // Rest of your existing calculation logic...
    const combinedLength = (name1 + name2).length;
    
    // Calculate age difference in months
    const date1 = new Date(dob1);
    const date2 = new Date(dob2);
    const monthDiff = Math.abs((date2.getFullYear() - date1.getFullYear()) * 12 + 
                              (date2.getMonth() - date1.getMonth()));
    
    // Age compatibility factor (0.8 to 1.2)
    const ageFactor = 1 + (Math.sin(monthDiff / 12) * 0.2);
    
    // Some random but fun calculations - adjusted to make high scores rarer
    let score = Math.floor(
        ((Math.random() * 30 + 45) + // Lower base score (45-75)
        (combinedLength % 20) * 2) * // Reduced name length factor
        (1.3 - (Math.abs(name1.length - name2.length) / 8)) * // Adjusted length difference factor
        ageFactor * 0.9 // Slightly reduced age factor
    );
    
    // Clamp between 0-100
    score = Math.max(0, Math.min(100, score));
    
    // Display with animation
    showResult(score);
}

// Add this to reset the state when page is reloaded
window.addEventListener('load', function() {
    previousNames = {
        name1: '',
        name2: ''
    };
    hasCalculated = false;
});
        document.addEventListener('DOMContentLoaded', function() {
            // Check for saved theme preference or use preferred color scheme
            if (localStorage.getItem('color-theme') === 'dark' || 
                (!localStorage.getItem('color-theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }

            const darkModeToggle = document.getElementById('dark-mode-toggle');
            darkModeToggle.addEventListener('click', function() {
                document.documentElement.classList.toggle('dark');
                localStorage.setItem('color-theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
                
                // Update icon
                const icon = darkModeToggle.querySelector('i');
                if (document.documentElement.classList.contains('dark')) {
                    icon.classList.remove('fa-moon');
                    icon.classList.add('fa-sun');
                    document.body.style.background = 'linear-gradient(to bottom, #1a0000, #000)';
                } else {
                    icon.classList.remove('fa-sun');
                    icon.classList.add('fa-moon');
                    document.body.style.background = 'linear-gradient(to bottom, #fecaca, #fff)';
                }
            });

            // Love Calculator Elements
            const calculateBtn = document.getElementById('calculate-btn');
            const name1Input = document.getElementById('name1');
            const name2Input = document.getElementById('name2');
            const resultsDiv = document.getElementById('results');
            const percentageDisplay = document.getElementById('percentage');
            const progressBar = document.getElementById('progress-bar');
            const loveMessage = document.getElementById('love-message');

            // Love messages
            const messages = [
                "Great match! You're perfect for each other! ❤️",
                "Good match! There's potential for something special 💖",
                "Could work if you both want it to! 💕",
                "Might need some work, but love conquers all 💘",
                "Try to find more in common... 💔",
            ];

            // Calculate love logic
            function calculateLove() {
                const name1 = name1Input.value.trim();
                const name2 = name2Input.value.trim();
                const dob1 = document.getElementById('dob1').value;
                const dob2 = document.getElementById('dob2').value;
                
                if (!name1 || !name2 || !dob1 || !dob2) {
                    alert('Please fill in both names and birth dates');
                    return;
                }
                
                // Combined name length calculation
                const combinedLength = (name1 + name2).length;
                
                // Calculate age difference in months
                const date1 = new Date(dob1);
                const date2 = new Date(dob2);
                const monthDiff = Math.abs((date2.getFullYear() - date1.getFullYear()) * 12 + 
                                          (date2.getMonth() - date1.getMonth()));
                
                // Age compatibility factor (0.8 to 1.2)
                const ageFactor = 1 + (Math.sin(monthDiff / 12) * 0.2);
                
                // Some random but fun calculations - adjusted to make high scores rarer
                let score = Math.floor(
                    ((Math.random() * 30 + 45) + // Lower base score (45-75)
                    (combinedLength % 20) * 2) * // Reduced name length factor
                    (1.3 - (Math.abs(name1.length - name2.length) / 8)) * // Adjusted length difference factor
                    ageFactor * 0.9 // Slightly reduced age factor
                );
                
                // Clamp between 0-100
                score = Math.max(0, Math.min(100, score));
                
                // Display with animation
                showResult(score);
            }

            // Show animated result
            function showResult(score) {
                // 3D flip animation
                const resultContainer = document.getElementById('result-container');
                resultsDiv.classList.remove('hidden');
                resultContainer.style.transform = 'rotateX(90deg)';
                setTimeout(() => {
                    resultContainer.style.transform = 'rotateX(0)';
                }, 100);
                
                // Animate percentage counter
                let current = 0;
                const increment = score > current ? 1 : -1;
                const timer = setInterval(() => {
                    current += increment;
                    percentageDisplay.textContent = current + '%';
                    progressBar.style.width = current + '%';
                    
                    const heart = document.querySelector('#percentage');
                    if (current % 20 === 0) {
                        heart.classList.add('animate-[heartBeat_1s_ease]');
                        setTimeout(() => { 
                            heart.classList.remove('animate-[heartBeat_1s_ease]');
                        }, 1000);
                    }
                    
                    if (current === score) {
                        clearInterval(timer);
                        
                        // Set message based on score
                        let messageIndex;
                        if (score >= 90) messageIndex = 0;
                        else if (score >= 70) messageIndex = 1;
                        else if (score >= 50) messageIndex = 2;
                        else if (score >= 30) messageIndex = 3;
                        else messageIndex = 4;
                        
                        loveMessage.textContent = messages[messageIndex];
                    }
                }, 30);
            }

            // Event listeners
            calculateBtn.addEventListener('click', function() {
                calculateLove();
                document.getElementById('results').scrollIntoView({ behavior: 'smooth' });
            });

            // Review functionality
            const addReviewBtn = document.getElementById('add-review-btn');
            const reviewModal = document.getElementById('review-modal');
            const cancelReview = document.getElementById('cancel-review');
            const reviewForm = document.getElementById('review-form');
            const stars = document.querySelectorAll('.rating-stars i');
            const ratingInput = document.getElementById('rating-value');

            // Star rating functionality
            stars.forEach(star => {
                star.addEventListener('click', function() {
                    const clickedRating = parseInt(this.getAttribute('data-rating'));
                    ratingInput.value = clickedRating;
                    
                    // Update all stars
                    stars.forEach(s => {
                        const starRating = parseInt(s.getAttribute('data-rating'));
                        s.classList.toggle('text-amber-400', starRating <= clickedRating);
                        s.classList.toggle('text-gray-300', starRating > clickedRating);
                    });
                });
            });

            // Show/hide modal
            addReviewBtn.addEventListener('click', () => {
                reviewModal.classList.remove('hidden');
            });

            cancelReview.addEventListener('click', () => {
                reviewModal.classList.add('hidden');
                reviewForm.reset();
                stars.forEach(s => {
                    s.classList.remove('text-amber-400');
                    s.classList.add('text-gray-300');
                });
                ratingInput.value = '0';
            });

            // Form submission
            reviewForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const name = document.getElementById('reviewer-name').value;
                const rating = parseInt(ratingInput.value);
                const text = document.getElementById('review-text').value;

                if (rating === 0) {
                    alert('Please select a rating');
                    return;
                }

                // Normally you would send this to a server here
                addReviewLocally(name, rating, text);

                // Close modal and reset
                reviewModal.classList.add('hidden');
                reviewForm.reset();
                stars.forEach(s => {
                    s.classList.remove('text-amber-400');
                    s.classList.add('text-gray-300');
                });
                ratingInput.value = '0';
            });

            // Sorting functionality
            const sortDropdownBtn = document.getElementById('sort-dropdown-btn');
            const sortDropdownMenu = document.getElementById('sort-dropdown-menu');
            const sortOptions = document.querySelectorAll('.sort-option');

            // Track current sort state
            let currentSort = 'newest';

            // Toggle dropdown menu
            sortDropdownBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                sortDropdownMenu.classList.toggle('hidden');
            });

            // Close dropdown when clicking outside
            document.addEventListener('click', () => {
                sortDropdownMenu.classList.add('hidden');
            });

            // Sort reviews when an option is selected
            sortOptions.forEach(option => {
                option.addEventListener('click', (e) => {
                    e.preventDefault();
                    currentSort = option.dataset.sort;
                    
                    // Update dropdown button text
                    sortDropdownBtn.textContent = `Sort By: ${option.textContent}`;
                    
                    // Sort reviews
                    sortReviews();
                    
                    // Close dropdown
                    sortDropdownMenu.classList.add('hidden');
                });
            });

            // Function to sort reviews
            function sortReviews() {
                const reviewsContainer = document.querySelector('.grid.md\\:grid-cols-3');
                if (!reviewsContainer) return;
                
                const reviews = Array.from(reviewsContainer.children);
                
                reviews.sort((a, b) => {
                    switch(currentSort) {
                        case 'newest':
                            return reviewsContainer.children[0] === a ? -1 : 1; // Keep insertion order
                        case 'oldest':
                            return reviewsContainer.children[0] === a ? 1 : -1;
                        case 'highest':
                            const ratingA = parseInt(a.querySelector('.flex.text-amber-400').children.length);
                            const ratingB = parseInt(b.querySelector('.flex.text-amber-400').children.length);
                            return ratingB - ratingA;
                        case 'lowest':
                            const ratingALow = parseInt(a.querySelector('.flex.text-amber-400').children.length);
                            const ratingBLow = parseInt(b.querySelector('.flex.text-amber-400').children.length);
                            return ratingALow - ratingBLow;
                        default:
                            return 0;
                    }
                });
                
                // Re-append sorted reviews
                reviews.forEach(review => reviewsContainer.appendChild(review));
            }

            // Function to add review to the page (simulating server response)
            function addReviewLocally(name, rating, text) {
                // This would normally be done via AJAX to a server
                const reviewsContainer = document.querySelector('.grid.md\\:grid-cols-3');
                
                if (!reviewsContainer) return;
                
                const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();
                
                const newReview = document.createElement('div');
                newReview.className = 'bg-white p-6 rounded-xl shadow-md';
                newReview.innerHTML = `
                    <div class="flex items-center mb-4">
                        <div class="flex text-amber-400 text-xl">
                            ${'<i class="fas fa-star"></i>'.repeat(rating)}
                            ${'<i class="fas fa-star"></i>'.repeat(5 - rating)}
                        </div>
                    </div>
                    <p class="text-gray-600 italic mb-4">"${text}"</p>
                    <div class="flex items-center">
                        <div class="w-10 h-10 rounded-full bg-gradient-to-r from-rose-400 to-pink-500 flex items-center justify-center text-white font-bold mr-3">${initials}</div>
                        <div>
                            <h4 class="font-semibold text-rose-800">${name}</h4>
                            <p class="text-xs text-gray-400">Verified User</p>
                        </div>
                    </div>
                `;
                
                // Add to the beginning so new reviews appear first
                reviewsContainer.prepend(newReview);
            }
            
            // FAQ toggling functionality
            const faqQuestions = document.querySelectorAll('.faq-question');
            faqQuestions.forEach(question => {
                question.addEventListener('click', () => {
                    const answer = question.nextElementSibling;
                    const chevron = question.querySelector('i');
                    
                    answer.classList.toggle('hidden');
                    chevron.classList.toggle('rotate-180');
                    
                    // Close other open FAQs
                    faqQuestions.forEach(q => {
                        if (q !== question) {
                            q.nextElementSibling.classList.add('hidden');
                            q.querySelector('i').classList.remove('rotate-180');
                        }
                    });
                });
            });

            // Allow pressing Enter in either input to calculate
            [name1Input, document.getElementById('dob1'), name2Input, document.getElementById('dob2')].forEach(input => {
                input.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        calculateBtn.click();
                    }
                });
            });
        });
