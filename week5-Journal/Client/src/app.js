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
//       'http://localhost:8080/reviews',
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
//     const response = await fetch('http://localhost:8080/reviews');
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

const BASE_URL = 'http://localhost:8080';
// const BASE_URL = 'https://week5-project-09nc.onrender.com';
const fetchReviews = async () => {
  const response = await fetch(`${BASE_URL}/reviews`);
  const data = await response.json();
  commentContainer.innerHTML = '';
  console.log(data);
  data
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .forEach((review) => console.log(createReview(review)));
};

fetchReviews();

const postReviews = async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const formEntries = Object.fromEntries(formData);

  console.log(formEntries);

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
    } else {
      console.log("couldn't fetch reviews");
    }
  } catch (error) {
    console.log('Error:', error);
    console.log('Error:', error);
  }
};

form.addEventListener('submit', postReviews);

function createReview(review) {
  const reviewDiv = document.createElement('div');
  reviewDiv.className = 'review';
  reviewDiv.dataset.id = review.id;

  const username = createParagraph('username', review.username);

  const description = createParagraph(
    'review-description',
    review.review_description
  );

  const image = createImage('review-image', review.image_url);

  const formattedDate = new Intl.DateTimeFormat('en-GB').format(
    new Date(review.created_at)
  );

  const reviewDate = createParagraph('date', formattedDate);

  reviewDiv.appendChild(username);
  reviewDiv.appendChild(description);
  reviewDiv.appendChild(image);
  reviewDiv.appendChild(reviewDate);
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
  image.src = url;
  return image;
}
