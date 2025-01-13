document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("review-form");
  const reviewEntries = document.getElementById("review-entries");

  // Handle form submission
  form.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent the default form submission

    const name = document.getElementById("name").value;
    const review_description =
      document.getElementById("review_description").value;
    const image_url = document.getElementById("image_url").value;
    const rating = document.getElementById("rating").value;

    const formData = { name, review_description, image_url, rating };

    // Send POST request to server to save data to the database
    const response = await fetch(
      //! FILL WITH SERVER LINK IN WHEN POSTING TO RENDER``,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    const data = await response.json();

    // Some error handling
    if (response.ok) {
      // If the request was successful, clear the form and reload the reviews
      form.reset();
      loadReviewEntries(); // Reload the entries after successful submission
    } else {
      alert("Failed to add review. Please try again.");
    }
  });

  // Function to load reviews
  async function loadReviewEntries() {
    const response = await fetch();
    //! FILL WITH SERVER LINK IN WHEN POSTING TO RENDER``
    const data = await response.json();

    reviewEntries.innerHTML = ""; // Clear existing entries

    // Loop through entries and display them
    data.forEach((entry) => {
      const entryElement = document.createElement("div");
      entryElement.classList.add("review-entry");
      entryElement.innerHTML = `
          <div class="review-card">
            <h3>${entry.name}</h3>
            <p><strong>Rating:</strong> ${entry.rating}/5</p>
            <p>${entry.review_description}</p>
            ${
              //fancy if/else statement (tenary operation)
              entry.image_url
                ? `<img src="${entry.image_url}" alt="Review Image" class="review-image">`
                : ""
            }
            <p class="timestamp">Posted on: ${new Date(
              entry.created_at
            ).toLocaleString()}</p>
          </div>
        `;
      reviewEntries.appendChild(entryElement);
    });
  }

  // Load reviews when the page is loaded
  loadReviewEntries();
});
