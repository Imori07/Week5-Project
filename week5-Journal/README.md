### Project name: YCY

[Front End Link](https://week5-project-1-393h.onrender.com/)  
 [Back End Link](https://week5-project-09nc.onrender.com/reviews)

Team Members:

- Yurii (HTML, CSS, Project lead)
- Yuvraj (Front End, Back End)
- Craig (Front End, Back End)

#### Project description:

This is a website that a user can create a review of a place or even something else if they want. They are able to enter their name, a description of what they want to write, enter a image URL and then give a 1-5 star rating into a form, press submit and then that review will appear on screen.

#### Problem domain:

#### User stories:

- User is able to enter their name.
- User is able to enter a description of something.
- User is able to enter a a image URL if they like.
- User is able to rate between 1 and 5 stars

#### Wireframes(large and small screens)

![large screen](<Screenshot 2025-01-16 134422.png>)
![mobile screen](<Screenshot 2025-01-16 134645.png>)

#### Lighthouse report:

![Lighthouse report](<Screenshot 2025-01-16 141459.png>)

#### Reflections:

As a team we managed to finish all requirements and goals to make sure the original user stories was complete. I think as a group we are all happy with the outcome of our site.

Stretch Goals

- User is able to delete their review.
- Add basic error handling to the form.
- Make the stars stand out more by add an outline or shadow.
- Make the site more accessible.

We was able to complete the first 2 stretch goals, deleting the review was pretty simple, we set up the endpoint in our `server.js` file so that a delete request could be made. Then when the delete button is clicked by the user it sends the request to the server, which in turn deletes the review with that specific id from supabase, then we fetch the reviews again in the same function, so that the latest version of the reviews show on screen.  
The code we used to get the id of the review was like this

```const commentDiv = this.closest('div');
  const id = commentDiv.dataset.id;
```

We had to do it this way because the id was not avaible outside of the other functions due to scoping issues, so the way around that was to add a `dataset` attibute to the html when creating the review in the original `fetchReviews` function. We also have an alert appear so that the user can either say yes or no to confirm deletion of the review.

We added basic form validation so that the user can not enter the form without entering their name and we also had a little check to make sure that the user enters a review of more than 15 characters, otherwise an alert would appear and tell them
