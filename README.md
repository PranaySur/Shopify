# Shopify
- Shopify is a state-of-the-art and scalable e-commerce website developed using React and Firebase, dedicated to providing an unmatched shopping experience for both customers and administrators. Our platform boasts distinct interfaces tailored for users and admins, equipped with a wide range of features to optimize every aspect of the shopping process.
- Our user-centric approach prioritizes a seamless interface, crafted using React's component-based architecture, ensuring a responsive and user-friendly experience across various devices and screen sizes. Whether customers are browsing on a desktop, tablet, or smartphone, Shopify guarantees a consistent and delightful shopping journey.
- Effortless cart management and favorites empower users to add products, review selections, and proceed to a hassle-free checkout process. The integrated favorites feature allows customers to curate wishlists and save favorite items for future purchases, enhancing overall satisfaction.
- Discovering the perfect product is made easy with our advanced search functionality and efficient product filtering. Users can quickly find items using various filters, such as price range, category, brand, and more, promoting a seamless shopping experience.
- For administrators, Shopify offers a dedicated admin interface, granting store owners powerful tools to efficiently manage products, orders, and inventory. This streamlines the backend processes, ensuring a smooth and effective administrative experience.
- Powered by Firebase, our backend is designed for scalability, reliability, and real-time data updates. Firebase's robust and cloud-based infrastructure enables Shopify to handle any level of traffic while ensuring a secure and seamless experience for both users and administrators.

## Prerequisites
Before you start working on the project, make sure you have the following tools, libraries, and knowledge in place:

1. Required Technologies:
    - HTML, CSS, and JavaScript (ES6+)
    - React.js - Make sure you are familiar with React's fundamentals specially Context API.
    - Firebase - Understand Firebase services such as Authentication, Firestore, Realtime Database, and Firebase Storage.
    - Node.js and NPM - Ensure you have Node.js installed for managing dependencies and running scripts.

2. Development Environment Setup:
    Follow the steps below to set up your development environment:
    - Install Node.js: Download and install Node.js from the official website (https://nodejs.org) if you haven't already.
    - Create a React App: Use Create React App to set up a new React project with the following command:
        - `npx create-react-app shopify`
        - `cd shopify`

3. Learning Resources:
    If you're new to React or Firebase, these resources will help you get started:
    - React.js Official Documentation: (https://reactjs.org/docs/getting-started.html)
    - Firebase Documentation: (https://firebase.google.com/docs)

4. Coding Standards and Best Practices:
    Adhere to the following coding standards and best practices while working on the project:
    - Organize project files and components logically.
    - Use functional components over class components and adopt React Hooks where appropriate.
    - Follow the ESLint rules provided by Create React App to maintain code consistency.
    - Opt for reusable and maintainable code practices.

5. Version Control with Git:
    - Use Git for version control and collaborate effectively with the team by setting up a Git repository for your project.
    - Create branches for features or bug fixes and submit pull requests for review. Use descriptive commit messages and follow Git best practices.

## External Packages Used

In the development of our scalable e-commerce website, we have utilized several external packages and libraries to enhance functionality, improve user experience, and streamline the development process. These packages were carefully selected to complement our technology stack and ensure the seamless operation of the platform. Below is a list of the key external packages we integrated into our project:

1. **bootstrap (^5.3.0):** We integrated Bootstrap, a widely-used CSS framework, to achieve a consistent and visually appealing design throughout the website. Bootstrap's responsive grid system and pre-styled components help in creating a user-friendly interface across various devices.

2. **firebase (^10.0.0):** Firebase serves as the backbone of our website's backend, providing real-time database services, user authentication, and hosting capabilities. Its powerful cloud-based infrastructure ensures a seamless and secure user experience.

3. **remixicon (^3.4.0):** Remixicon offers an extensive collection of icons that enrich the visual elements of our website, providing a consistent and recognizable iconography.

4. **framer-motion (^10.12.20):** Framer Motion is employed to add smooth and eye-catching animations, enhancing the overall user interface and interaction.

5. **react-router-dom (^6.14.1):** With React Router, we manage navigation and routing within the website, allowing users to move between pages efficiently and maintaining a smooth user flow.

6. **reactstrap (^9.2.0):** We utilize Reactstrap to integrate Bootstrap components seamlessly into our React application, simplifying the UI development process.

7. **sass (^1.63.6):** Sass (Syntactically Awesome Style Sheets) enhances our CSS development by providing features like variables, nesting, and modularization, making the stylesheets more maintainable.

8. **uuid (^9.0.0):** UUID generates universally unique identifiers, helping us manage unique keys for various components and entities in the application.

9. **react-toastify (^9.1.1):** React Toastify allows us to display user notifications and alerts in a visually appealing and non-intrusive manner.

## Installation

1. Clone the repository:
   
    `git clone https://github.com/PranaySur/Shopify.git`
   
    `cd shopify`

2. Install dependencies:
   
    `npm install`

3. Set up Firebase:
   
   - Create a new Firebase project at https://console.firebase.google.com.
   - Enable Authentication, Firestore, and Storage services in your Firebase project dashboard.
   - Obtain your Firebase configuration (API keys, Firebase project ID, etc.).

4. Configure Firebase in your app:
   
   - Paste the Firebase configuration details into the `firebase.js` file.

## Deployment
1. Before proceeding with the deployment, ensure that you have a Firebase account and a Firebase project set up for this application.
   
2. The Firebase CLI (Command Line Interface) installed globally. If you don't have it, you can install it using the following command:
   
    `npm install -g firebase-tools`

3. Install the Firebase CLI by running the following command:
   
    `npm install -g firebase-tools`

4. Navigate to the project directory and run the following command to initialize Firebase:
   
    `firebase init`
   
    Follow the prompts and select the appropriate options. Ensure you select the existing Firebase project you want to associate with this directory.

5. Next, apply hosting targets to enable separate deployments for the admin and user interfaces:

   `firebase target:apply hosting admin reactshopifyadmin`
   
    `firebase target:apply hosting user reactshopify`

7. Now, deploy the user interface using the following command:
   
    `firebase deploy --only hosting:user`
   
    After a successful deployment, the user interface will be accessible at: [Link](https://reactshopify.web.app)

8. Finally, deploy the admin interface using the following command:
   
    `firebase deploy --only hosting:admin`
   
    Once the admin interface is deployed, you can access it at: [Link](https://reactshopifyadmin.web.app)
