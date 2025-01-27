// document.addEventListener('DOMContentLoaded', function () {
//   const form = document.getElementById('review_form');
//   console.log(form);
//   const reviewEntries = document.getElementById('review-entries');

//   // Handle form submission
//   form.addEventListener('submit', async (event) => {
//     event.preventDefault(); // Prevent the default form submission

//     const name = document.getElementById('name').value;
//     const review_description =
//       document.getElementById('review_description').value;
//     const image_url = document.getElementById('image_url').value;
//     const rating = document.getElementById('rating').value;

//     const formData = { name, review_description, image_url, rating };

//     // Send POST request to server to save data to the database
//     const response = await fetch(
//       //! FILL WITH SERVER LINK IN WHEN POSTING TO RENDER``,
//       'https://week5-project-09nc.onrender.com',
//       {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       }
//     );

//     const data = await response.json();

//     // Some error handling
//     if (response.ok) {
//       // If the request was successful, clear the form and reload the reviews
//       form.reset();
//       loadReviewEntries(); // Reload the entries after successful submission
//     } else {
//       alert('Failed to add review. Please try again.');
//     }
//   });

//   // Function to load reviews
//   async function loadReviewEntries() {
//     const response = await fetch('https://week5-project-09nc.onrender.com');
//     //! FILL WITH SERVER LINK IN WHEN POSTING TO RENDER``
//     const data = await response.json();

//     reviewEntries.innerHTML = ''; // Clear existing entries

//     // Loop through entries and display them
//     data.forEach((entry) => {
//       const entryElement = document.createElement('div');
//       entryElement.classList.add('review-entry');
//       entryElement.innerHTML = `
//           <div class="review-card">
//             <h3>${entry.name}</h3>
//             <p><strong>Rating:</strong> ${entry.rating}/5</p>
//             <p>${entry.review_description}</p>
//             ${
//               //fancy if/else statement (tenary operation)
//               entry.image_url
//                 ? `<img src="${entry.image_url}" alt="Review Image" class="review-image">`
//                 : ''
//             }
//             <p class="timestamp">Posted on: ${new Date(
//               entry.created_at
//             ).toLocaleString()}</p>
//           </div>
//         `;
//       reviewEntries.appendChild(entryElement);
//     });
//   }

//   // Load reviews when the page is loaded
//   loadReviewEntries();
// });

// // const fetchReviews = async () => {
// //   const response = await fetch('http://localhost:8080/reviews');
// //   const data = await response.json();
// //   console.log(data);
// // };

// // fetchReviews();

// // const postReviews = async () => {
// //   const formData = {
// //     name: 'Bob',
// //     review_description: 'Woopppss',
// //     image_url: 'www.something.com',
// //     rating: 4,
// //   };

// //   const response = await fetch('http://localhost:8080/reviews', {
// //     method: 'POST',
// //     headers: {
// //       'Content-Type': 'application/json',
// //     },
// //     body: JSON.stringify(formData),
// //   });

// //   const data = await response.json();
// //   console.log(data);
// // };

// // postReviews();

const form = document.getElementById('review_form');
const commentContainer = document.getElementById('comment-container');

const BASE_URL = 'https://week5-project-09nc.onrender.com';

const fetchReviews = async () => {
  const response = await fetch(`${BASE_URL}/reviews`);
  const data = await response.json();
  commentContainer.innerHTML = '';
  data
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .forEach((review) => createReview(review));
};

fetchReviews();

const postReviews = async (e) => {
  e.preventDefault();
  const reviewDescription = document.querySelector('#review_description').value;

  if (reviewDescription.length < 15) {
    alert('Must be more than 15 characters long');
    return;
  }

  const formData = new FormData(form);
  const formEntries = Object.fromEntries(formData);

  const response = await fetch(`${BASE_URL}/reviews`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formEntries),
  });

  try {
    if (response.ok) {
      await fetchReviews();
      form.reset();
    } else {
      console.log("couldn't fetch reviews");
    }
  } catch (error) {
    console.log('Error:', error);
  }
};

form.addEventListener('submit', postReviews);

async function handleDeleteReview() {
  const deleteConfirmation = confirm(
    'Are you sure you want to delete this review?'
  );

  if (!deleteConfirmation) {
    return;
  }

  const commentDiv = this.closest('div');
  const id = commentDiv.dataset.id;
  try {
    const response = await fetch(`${BASE_URL}/reviews`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });

    if (response.ok) {
      await fetchReviews();
    }
  } catch (error) {
    console.error('Error during delete request:', error);
  }
}

function createReview(review) {
  const reviewDiv = document.createElement('div');
  reviewDiv.className = 'review';
  reviewDiv.dataset.id = review.id;

  const username = createParagraph('username', review.name);

  const description = createParagraph(
    'review-description',
    review.review_description
  );

  const image = createImage('review-image', review.image_url);

  const formattedDate = new Intl.DateTimeFormat('en-GB').format(
    new Date(review.created_at)
  );

  const reviewDate = createParagraph('date', formattedDate);

  const rating = createParagraph('rating', `${'⭐'.repeat(review.rating)}`);

  const deleteButton = createButton(
    'fa-solid fa-xmark delete-btn',
    'delete review'
  );

  deleteButton.addEventListener('click', handleDeleteReview);

  reviewDiv.appendChild(username);
  reviewDiv.appendChild(image);
  reviewDiv.appendChild(description);
  reviewDiv.appendChild(reviewDate);
  reviewDiv.appendChild(rating);

  reviewDiv.appendChild(deleteButton);

  commentContainer.appendChild(reviewDiv);

  return reviewDiv;
}

function createParagraph(className, text) {
  const p = document.createElement('p');
  p.className = className;
  p.textContent = text;
  return p;
}

function createImage(className, url) {
  const image = document.createElement('img');
  image.className = className;
  image.src =
    url ||
    'https://cdn.discordapp.com/avatars/318351745711472641/d9ef7d1f0b38d087f5e2e31c77a43394.webp?size=160';
  return image;
}

function createButton(className, text) {
  const button = document.createElement('i');
  button.className = className;
  button.title = text;
  return button;
}
