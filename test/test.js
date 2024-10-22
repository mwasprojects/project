document.addEventListener("DOMContentLoaded", function () {
    const categories = document.querySelectorAll('.categories-filter li');

    categories.forEach(category => {
        // Add hover event to show small text
        category.addEventListener('mouseenter', () => {
            const smallText = category.querySelector('small');
            if (smallText) {
                smallText.style.opacity = '1';
                smallText.style.transform = 'translate(-50%, 0)';
            }
        });

        // Hide small text on mouse leave
        category.addEventListener('mouseleave', () => {
            const smallText = category.querySelector('small');
            if (smallText) {
                smallText.style.opacity = '0';
                smallText.style.transform = 'translate(-50%, 10px)';
            }
        });
    });

    // Function to adjust layout for small screens
    function adjustLayout() {
        const isSmallScreen = window.innerWidth <= 768;
        categories.forEach(category => {
            const text = category.querySelector('p');
            if (isSmallScreen) {
                text.style.fontSize = '10px';
                text.style.display = 'none'; // Hide text
                const icon = document.createElement('div');
                icon.className = 'file-type-icon'; // Adjust with your icons
                category.appendChild(icon);
            } else {
                text.style.display = 'block'; // Show text
                const existingIcon = category.querySelector('.file-type-icon');
                if (existingIcon) {
                    existingIcon.remove(); // Remove icon if it exists
                }
            }
        });
    }

    // Initial layout adjustment
    adjustLayout();

    // Adjust layout on resize
    window.addEventListener('resize', adjustLayout);
});
document.getElementById('searchButton').addEventListener('click', function() {
    const searchInput = document.getElementById('searchInput').value;
    alert(`Searching for: ${searchInput}`);
});

// Additional JavaScript functionality can be added here

// Get modal element
const modal = document.getElementById("enrollmentModal");

// Get open modal button
const enrollBtn = document.getElementById("enrollBtn");

// Get close button
const closeBtn = document.getElementsByClassName("close")[0];

// Listen for open click
enrollBtn.addEventListener("click", function() {
    modal.style.display = "block";
});

// Listen for close click
closeBtn.addEventListener("click", function() {
    modal.style.display = "none";
});

// Listen for outside click to close modal
window.addEventListener("click", function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

// Handle form submission
document.getElementById("enrollmentForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the form from submitting

    // Get selected subjects
    const selectedSubjects = Array.from(document.querySelectorAll('input[name="subjects"]:checked'))
                                  .map(checkbox => checkbox.value);

    if (selectedSubjects.length > 0) {
        alert(`You have enrolled in the following subjects: ${selectedSubjects.join(', ')}`);
        modal.style.display = "none"; // Close the modal
    } else {
        alert("Please select at least one subject to enroll.");
    }
});

