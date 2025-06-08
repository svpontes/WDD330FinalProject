# WDD330FinalProject
Final project for WDD330 web development course

1. Initial Planning
Objective:
Create and publish a functional web application that demonstrates mastery of HTML, CSS, and pure JavaScript.

Initial Structure:
Create a folder with a name without spaces and in lowercase.

Use meaningful file names without spaces.

2. Technologies and General Rules
Stack:
Pure HTML, CSS and JavaScript

No JS frameworks or libraries (e.g. React, jQuery — not allowed)

You can use CSS libraries or frameworks (e.g. Bootstrap yes, Tailwind yes)

3. Mandatory Features
Functionality:
The project must be a complete web application with:

Static content (plain HTML)

Dynamically generated content (with JavaScript)

APIs:
Use at least 2 third-party external APIs

Style and interactions:
CSS animations

Mandatory responsiveness

4. Structure and Best Practices
HTML:
<!doctype html> at the top

<html lang="en-US">

<meta charset="utf-8">

<meta name="viewport" content="width=device-width, initial-scale=1">

<meta name="description"> and <meta name="author">

Title and h1 consistent with the content

Mandatory semantic elements (<main>, <section>, <article>, etc.)

No broken links (use W3C Link Checker)

CSS:
Validation in W3C CSS Validator

Unique IDs if used

Preference for class, not id

Can use CSS frameworks (Bootstrap, etc.)

JavaScript:
No errors or unused functions

No console.log() in the final version

Organization with ES Modules and/or classes

Commented and clean code

Validate with ESLint

5. Accessibility and Responsive Design
Accessibility:
All images with relevant alt

No errors in accessibility tests (e.g. WAVE)

Color contrast according to AA standard

Correct use of heading hierarchy (h1 to h6)

Readable typography aligned with design principles

Responsiveness:
No horizontal scrolling or unnecessary white space

Texts and buttons with appropriate size on mobile

Test on different screen sizes

6. Performance and Page Size
Final page weight: maximum 500KB

Optimized images, without aspect ratio distortion

Test performance with DevTools > Network

7. Quality and Final Review
Spelling and grammar reviewed

No errors in the console

Test all links and features

Clean and commented code

Final tip:
Deploy to GitHub Pages or Netlify, and send the link along with the project files.

If you want, I can help you organize the project plan based on an idea you have (e.g. weather forecast website, recipe app, movie portal, etc.). Just let me know!

You said:
how to validate with ESLint

ChatGPT said:
To validate your JavaScript code with ESLint, follow this simple step-by-step guide. Validation helps keep your code clean, standardized, and free of common errors. You can use ESLint locally in your code editor (like VS Code) or via terminal.

1. Install ESLint (once in the project)
You need to have Node.js installed first. If you don't have it yet, download it here.

Open the terminal in your project directory and run:

bash
Copy
Edit
npm init -y
npm install eslint --save-dev
2. Configure ESLint
Create a configuration file:

bash
Copy
Edit
npx eslint --init
ESLint will ask you some questions. Here is an example of responses:

pgsql
Copy
Edit
? How would you like to use ESLint?
✔ To check syntax, find problems, and enforce code style

? What type of modules does your project use?
✔ JavaScript modules (import/export)

? Which framework does your project use?
✔ None of these

? Does your project use TypeScript?
✔ No

? Where does your code run?
✔ Browser

? How would you like to define a style for your project?
✔ Use the popular style guide

? Which style guide do you want to follow?
✔ Airbnb (or Standard)

? What format do you want your config file to be in?
✔ JSON

? Would you like to install them now with npm?
✔ Yes
This will create a .eslintrc.json file in your project.

3. Run ESLint on your code
You can check the JS files with the command:

bash
Copy
Edit
npx eslint filename.js
Or to check all JS files in the project:

bash
Copy
Edit
npx eslint .
4. Integrate with VS Code (optional, but recommended)
Install the "ESLint" extension in VS Code.

Once installed:

Open your project.

Press Ctrl+Shift+P → “ESLint: Enable”.

Now VS Code will automatically highlight errors and can even fix some with:

bash
Copy
Edit
npx eslint . --fix
1. Install ESLint (once per project)
You must have Node.js installed.

Open your terminal in the root of your project and run:

bash
Copy
Edit
npm init -y
npm install eslint --save-dev
2. Configure ESLint
Set up ESLint with:

bash
Copy
Edit
npx eslint --init
You will be prompted to answer a few questions. Here's an example of how to answer:

pgsql
Copy
Edit
? How would you like to use ESLint? 
✔ To check syntax, find problems, and enforce code style

? What type of modules does your project use?
✔ JavaScript modules (import/export)

? Which framework does your project use?
✔ None of these

? Does your project use TypeScript? 
✔ No

? Where does your code run?
✔ Browser

? How would you like to define a style for your project?
✔ Use a popular style guide

? Which style guide do you want to follow?
✔ Airbnb (or Standard)

? What format do you want your config file to be in?
✔ JSON

? Would you like to install them now with npm?
✔ Yes
This will generate a .eslintrc.json file in your project.

3. Run ESLint on your code
To check a specific JavaScript file:

bash
Copy
Edit
npx eslint your-file.js
To check all JS files in your project:

bash
Copy
Edit
npx eslint .
4. Integrate ESLint with VS Code (optional but recommended)
Install the "ESLint" extension in VS Code.

Then:

Open your project.

Press Ctrl+Shift+P → select ESLint: Enable.

Now, VS Code will underline issues in your JavaScript files and offer quick fixes.
You can also auto-fix problems by running:

bash
Copy
Edit
npx eslint . --fix**

WDD 330 Final Web Application Proposal_____________________________________________________________________
Travel Planner
Overview
Travel Planner is a web application that allows users to plan their trips more efficiently and enjoyably. Users will be able to select a destination and receive customized suggestions for flights, hotels, tourist attractions, and local activities. Using the TripAdvisor API and Amadeus Travel API, the app aims to streamline the travel planning process, saving time and offering high-quality recommendations based on user preferences.
This application brings together essential travel services in one place, enabling users to visualize their trip.

Target Audience
Planning a trip can be overwhelming due to the number of factors involved, from flights to accommodations and daily itineraries. This app is intended to support travelers looking for inspiration, information, and integration of trip logistics.
Primary Users:
•	Solo travelers, families, or friends planning vacations or business trips.
Secondary Users:
•	Travel enthusiasts looking for new destinations or curated travel packages.

Major Functions
•	Destination Selection:
Users enter a city/country and travel dates to start planning.
•	Flight and Hotel Search:
Using the Amadeus API, the app suggests flight and hotel options based on destination and budget.
•	Attractions and Activities Suggestions:
The TripAdvisor API will provide top-rated attractions, tours, and activities.
•	Trip Itinerary Builder:
Users can drag and drop attractions or events into a customizable daily itinerary.
•	Budget Estimator:
Calculates an estimated trip cost including flights, accommodation, and selected activities.
•	Save and Share Trips:
Users can save their plans and share them via social media or download a PDF.
•	Responsive Design:
Fully functional and aesthetic on both mobile and desktop platforms.
•	CSS Animations:
Smooth transitions and hover effects for cards, buttons, and section reveals.

Wireframes
(Include your wireframes here for both mobile and desktop views.)
•	Home Page: Destination search bar, access to trips.
•	Search Results Page: Display of flights, hotels, and top attractions.
•	Itinerary Page: Drag-and-drop interface for planning each day.

External Data
•	TripAdvisor API:
o	User reviews, photos, and ratings of tourist attractions.
o	Details about tours and local activities.
•	Amadeus Travel API:
o	Real-time data for flights, hotels, car rentals, and travel activities.

Data Storage
•	localStorage:
o	Temporary storage of current trip selections for non-logged-in users.

Module List
•	Home Page Module:
o	Search bar, featured destinations, and recent trips.
•	Search Module:
o	Connects to Amadeus API to fetch flights/hotels.
•	Attractions Module:
o	Uses TripAdvisor API to display points of interest and reviews.
•	Itinerary Module:
o	Interface for building a day-by-day plan.
•	Budget Estimator Module:
o	Totals costs based on user selections.
•	Responsive Layout Module:
o	Ensures usability across various screen sizes.
•	CSS Animation Module:
o	Transitions and interactive elements to enhance UX.

Graphic Identity
Colors:
•	Primary: #3498db (Bright Blue)
•	Secondary: #f39c12 (Sunset Orange)
•	Neutral: #ffffff (White), #2c3e50 (Dark Navy)
Typography:
•	Heading: "Montserrat" (Sans-serif)
•	Body: "Open Sans" (Sans-serif)
Icon Design:
•	A paper airplane flying over a world map

Timeline (Weeks 5–7)
Week 5:
•	Finalize wireframes and color palette
•	Create homepage structure with animations
•	Test API connections and return sample data
Week 6:
•	Develop search and itinerary modules
•	Integrate TripAdvisor and Amadeus API calls
•	Ensure mobile-first responsive layout
Week 7:
•	Finalize profile and save/share features
•	Perform testing, accessibility checks, and debugging
•	Polish UI animations and interactions

Project Planning
Trello Board:
* Under construction and setup


Wireframe Pages 
1. Home Page
Goal: Let the user search for a destination and access saved trips.
Key Elements:
•	Logo & Navigation (Home, My Trips, Login)
•	Main Search Bar: "Where do you want to go?"
•	Date Picker (optional)
•	Call to Action: “Start Planning”
•	Featured Destinations (e.g., cards for Paris, Tokyo, Rio)
•	Footer (Contact, Social, About)

2. Search Results Page
Goal: Show flight, hotel, and attraction results for the selected destination.
Key Elements:
•	Filters (price, date, hotel rating)
•	Tabs or Sections: Flights | Hotels | Attractions
•	Cards for each result:
o	Image, Title, Rating, Price
o	“Add to Itinerary” button

3. Itinerary Builder Page
Goal: Let users organize trip day-by-day.
Key Elements:
•	Calendar or Day Tabs (Day 1, Day 2…)
•	Drag-and-drop list of saved items
•	Edit or Remove item
•	Total Estimated Cost section
