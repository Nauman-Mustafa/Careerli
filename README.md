# Careerli App Documentation

## Table of Contents

1. [Introduction](#introduction)
2. [Setup and Installation](#setup-and-installation)
3. [Frontend](#frontend)
4. [Backend](#backend)
5. [ChatGPT Integration](#chatgpt-integration)
6. [Usage and Examples](#usage-and-examples)
7. [Contributing](#contributing)
8. [License](#license)

---

## Introduction

Welcome to the Careeli App, a modern web application built using the MERN stack (MongoDB, Express.js, React.js, Node.js) with an added touch of NestJS for robust backend architecture. This guide aims to provide a comprehensive overview of setting up and running the Careeli App, designed for clarity and ease of understanding for developers of all levels.
Careerli is an application designed to assist users in creating professional resumes and cover letters, leveraging template-based generation and integrating with OpenAI's ChatGPT for content creation.

### Key Features

- Resume and cover letter generation
- Variety of templates
- AI-powered content suggestions

---

### Tech Stack / Tools

![ChatGPT](https://img.shields.io/badge/chatGPT-74aa9c?style=for-the-badge&logo=openai&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![Yarn](https://img.shields.io/badge/yarn-%232C8EBB.svg?style=for-the-badge&logo=yarn&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

## Tech Stack Details

- Backend
  - Framework: Nest.js ([Nest.js Documentation](https://docs.nestjs.com/))
  - Database: MongoDB ([MongoDB Basics](https://www.mongodb.com/basics))
  - File Storage: AWS S3 ([S3 Documentation](https://docs.aws.amazon.com/s3/index.html))
- Frontend
  - Framework/Library: React ([React Documentation](https://reactjs.org/docs/getting-started.html))
  - Build Tool: Vite ([Vite Guide](https://vitejs.dev/guide/))
  - Styling: Bootstrap, React-bootstrap ([Bootstrap Docs](https://getbootstrap.com/docs/5.1/getting-started/introduction/))
  - State Management: Redux-toolkit ([Redux Toolkit Documentation](https://redux-toolkit.js.org/introduction/getting-started))
  - Animations: GSAP ([GSAP Docs](https://greensock.com/docs/))
- Payment: Stripe ([Stripe Documentation](https://stripe.com/docs))

## Setup and Installation

### Prerequisites:

---

Before diving into running the application, ensure you have the following installed:

- Node.js
- Yarn package manager (yarn) or Node package Manager(NPM)
- MongoDB (local installation or access to an online MongoDB service)
- Python (for ChatGPT integration)

### File Structure

---

The Careeli App is organized into two primary folders:

1. **Backend**: Contains all server-side code.
2. **Frontend**: Houses the client-side code.

This clear separation aids in easy navigation and management of the application's two main components.

### Setting up the Environment

---

1. **MongoDB Server**:

   - Start your MongoDB server. This can be a local instance or an online service.
   - Configure the connection URI in the environment variables file located in the Backend folder.

2. **Environment Variables**:
   - Set up necessary environment variables in the Backend's `.env` file.

### Required .env Secrets to Run the code

---

The following environment variables are required to run the application also be sure of the types some are passed as strings and others are not:

- PORT=8005
- MONGO_URI=
- FRONTEND_BASE_URL=http://localhost:8000
- BASE_URL=http://localhost:8005
- GOOGLE_CLIENT_ID=
- GOOGLE_SECRET=
- FACEBOOK_APP_SECRET=

### Stripe

- STRIPE_PUB_KEY=""
- STRIPE_SEC_KEY=""
- STRIPE_WEBHOOK_SECRET_KEY=""

Note: All stripe secrets are strings and all the others are not. For a detail guide on how to get these secret keys you can visit <a href="https://docs.google.com/document/d/1dMd_bos7HhzJJJAwq5R40UfltJFHJ2HKE4j-0HCZIsY/edit#heading=h.69fpsh95au0p">this link</a>.

### Frontend Installation:

```bash
cd path/to/Frontend
npm install # or yarn install
```

### Backend Installation:

```bash
cd path/to/Backend
npm install # or yarn install
```

### ChatGPT Integration Setup:

```bash
# Ensure Python is installed
# Setup virtual environment and install dependencies
```

---

## Frontend

### Overview

The frontend of Careerli is built using React and Vite. It provides a user-friendly interface for interacting with the app's features.

### Key Components

- `index.html`: Entry point for the frontend.
- `src`: Contains React components and logic.
- `public`: Public assets and resources.

### Environment Variables

- Frontend:
  - `.env.dev` provided.
- Backend:
  - MongoDB: Setup guide ([Free MongoDB Cluster](https://medium.com/@zzpzaf.se/mongodb-atlas-free-shared-database-cluster-891435bec3a9))
  - AWS Credentials:[ AWS Credential Setup](https://docs.aws.amazon.com/general/latest/gr/aws-sec-cred-types.html)
  - S3 Bucket Creation:[ Creating an S3 Bucket](https://docs.aws.amazon.com/AmazonS3/latest/userguide/creating-bucket.html)

### OAuth2 Setup

- Google Auth:[ Setting up Google OAuth2](https://developers.google.com/identity/protocols/oauth2)
- Facebook Auth:[ Setting up Facebook OAuth](https://developers.facebook.com/docs/facebook-login)

### Stripe Setup

- [Setting up a Stripe Account](https://stripe.com/docs/setup)

### Running the Frontend

```bash
cd path/to/Frontend
npm run dev # or yarn dev
```

---

## Backend

### Overview

The backend handles data processing, API integration, and business logic. It's built using Node.js and Express.

### Key Components

- `Backend`: Main directory for backend code.

## Env Variables

- Backend

  - OPEN_AI_API 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
  - MONGO_URI
    - Article to help you get access to a free database
    - [Free Database Resource](https://medium.com/@zzpzaf.se/mongodb-atlas-free-shared-database-cluster-891435bec3a9)
  - AWS Credentials
  - ![iam](https://github.com/Careerli/careerli/assets/50230297/31d4d601-f921-447c-aafc-56fe4bb1bbe9)
  - ![users](https://github.com/Careerli/careerli/assets/50230297/1ab46c4a-911e-4d49-b37b-11d7e042889d)

  - Select the user
  - Select the Security Credentials Tab in that user
  - Scroll Down to Access Keys
  - Create a new acces key
  - That will give you
    - AWS_ACCESS_KEY_ID
    - AWS_SECRET_KEY_ID
  - AWS S3
  - Search S3 like we searched IAM in the AWS console
  - Click on Create a bucket
  - [User guide Creating Bucket](https://docs.aws.amazon.com/AmazonS3/latest/userguide/creating-bucket.html)
  - The above article will guide you to create the bucket
    - For now, uncheck block all public access
    - For testing bucket
  - Create an access point so we can access that bucket
  - The name of the bucket will be
    - AWS_S3_BUCKET
  - `https://careerli-prod.s3.amazonaws.com/`
  - You will find this above link hardcoded in the code
  - Use the link with your bucket name
  - [https://careerli-test.s3.amazonaws.com](https://careerli-test.s3.amazonaws.com/images.jpeg)/ like this everywhere

## To Use OAuth2 with Google and facebook

> To use OAuth2 with Google and Facebook, you need to obtain the `GOOGLE_CLIENT_ID`, `GOOGLE_SECRET`, `FACEBOOK_APP_ID`, and `FACEBOOK_APP_SECRET` by registering your application on their respective developer platforms. Here's how you can do it:

### For Google

- Google Developer Console:
  - Go to the[ Google Developer Console](https://console.developers.google.com/).
  - Sign in with your Google account.
- Create a Project:
  - Click on "Select a project" at the top of the page.
  - Click on "New Project", enter a name for your project, and create it.
- Enable APIs:
  - Once the project is created, go to the "Dashboard" and click on "ENABLE APIS AND SERVICES".
  - Search for "Google+ API" or the specific Google services you need (like "Google Calendar API", "Google Drive API", etc.) and enable them.
- Create Credentials:
  - Go to the "Credentials" page from the sidebar.
  - Click "Create Credentials" and select "OAuth client ID".
  - Set up the consent screen if prompted.
  - Choose the application type (usually "Web application") and provide the necessary information like the authorized JavaScript origins and redirect URIs.
  - Get Client ID and Secret:
  - Once you create the credentials, you'll be given a client ID and client secret. These are your `GOOGLE_CLIENT_ID` and `GOOGLE_SECRET`.

### For Facebook

- Facebook for Developers:
  - Go to[ Facebook for Developers](https://developers.facebook.com/).
  - Sign in with your Facebook account.
- Create an App:
  - Click on "My Apps" and then "Create App".
  - Choose an app type (for most use cases, “Consumer” will be appropriate).
  - Fill in the required details to create your app.
- Add Facebook Login:
  - Once your app is created, look for “Facebook Login” under products or in the “Add a Product” section.
  - Set up Facebook Login, and make sure to add your OAuth redirect URIs.
- Get App ID and Secret:
  - Once set up, you can get your App ID and App Secret from the settings page of your Facebook app. These are your `FACEBOOK_APP_ID` and `FACEBOOK_APP_SECRET`.

### For Stripe

> To get a Stripe account for handling online payments, follow these steps:

- Visit the Stripe Website
  Go to the Stripe Website: Start by visiting[ Stripe's website](https://stripe.com/).
- Sign Up:
  - Click on the "Sign up" button usually found in the top right corner of the Stripe homepage.
  - You'll need to provide your email address, create a password, and possibly enter your country of residence.
- Verify Email:
  - After signing up, Stripe will send a verification email to the address you provided.
  - Open the email and click on the verification link to activate your Stripe account.
- Set Up Your Account:
  - Once your email is verified, you'll be directed to the Stripe dashboard.
  - Complete your account setup by providing necessary details such as your business information, bank details (where Stripe will deposit your funds), and your website or app information if applicable.
  - Stripe will ask for information about your business, including its type (individual, company, etc.), address, and the products or services you sell. This information is important for compliance and to keep your account in good standing.
- Activate Your Account
  - To start processing live transactions, you need to activate your account.
  - Look for an “Activate your account” button or link in the dashboard.
  - You will need to provide additional details such as your Social Security Number (for individuals or sole proprietors in the U.S.) or
    Employer Identification Number (for companies), and details about the nature of your business.
- API Integration (Optional):
  - If you are integrating Stripe into a website or app, you'll need to use Stripe’s API.
  - In the Stripe Dashboard, you can access your API keys. There are two types of keys: Publishable keys and Secret keys.
  - Use these keys in your website or app’s backend to integrate Stripe’s payment processing features.
- Familiarize Yourself with the Dashboard
  Learn the Dashboard: - Spend some time getting familiar with the Stripe Dashboard. It’s where you’ll manage payments, view reports, handle refunds, and more.
- Additional Information

  - Compliance and Security: Ensure that your implementation of Stripe is compliant with relevant laws and regulations, including PCI DSS if you're handling credit card information.
  - Test Environment: Stripe provides a sandbox environment for testing. Make sure to test your payment process thoroughly before going live.
  - Documentation: Utilize[ Stripe’s extensive documentation](https://stripe.com/docs) for guidance on setup and API integration.

- Code structure
  The code structure is pretty straightforward and easy to understand there aren’t anything ambiguous that need to

- Project up and running:
  - [Video Presentation of Runing app](https://drive.google.com/file/d/1NIO01mxPOOsiAoV-e_BsdUJ6N8ZEmvMN/view?usp=sharing)

Issue:
I will need the link to that lambda function or the code of lambda function to deploy it on AWS. Without that none of the content generation in functional.

## AWS SETUP

In your lambda function go to configurations and add the environment variables

- Add Environment Variables

  > ![env variable](https://github.com/Careerli/careerli/assets/50230297/eecd8b88-1f7a-48fb-a8e8-07f1967feefa)

- Enable function URLS

  > ![enable func url](https://github.com/Careerli/careerli/assets/50230297/5202f2fc-0a05-4c7b-907a-db06c774524b)

- Upload the code Zip with the option in the top right

  > ![upload zip code](https://github.com/Careerli/careerli/assets/50230297/6e55776c-98a7-466f-824c-50422ba482bc)

- Creating Layer
  > ![create layer](https://github.com/Careerli/careerli/assets/50230297/1408f62c-1568-4b50-b335-f3f5138f8d73)

To create a Lambda layer for Python 3.10 with access to the ``openai` package, follow these steps:

- Create a Virtual Environment:

  - First, create a virtual environment matching your Lambda's Python runtime (Python 3.8 in your case).
    - python3.10-m venv lambda-layer
    - source lambda-layer/bin/activate

- Install the OpenAI Package:

  - Install the openai package inside this virtual environment.
    `pip install openai`

- Prepare the Layer Directory Structure:

  - AWS Lambda expects Python packages to be in a folder named python.
    `mkdir -p layer/python`
    `cp -r lambda-layer/lib/python3.8/site-packages/* layer/python/`

- Create the ZIP File:

  - Zip the contents of the layer directory.
    `cd layer`
    `zip -r ../openai-layer.zip .`
    And you will have the layer ready

- Upload the Layer to AWS Lambda:
  - Go to the AWS Lambda console and create a new layer.
  - Upload the openai-layer.zip file.
    > ![upload layer](https://github.com/Careerli/careerli/assets/50230297/73de8c94-9b2f-4043-a4b6-9783c7fe1c5b)
  - Set the compatible runtime to the runtime of lambda
- Attach the Layer to Your Lambda Function:
  > Attach this new layer to your Lambda function.
- After completing these steps, your Lambda function should have access to the openai package. Remember to deactivate your virtual environment (deactivate) after you're done.

LAMBDA_FUNCTION_URL

https://us-east-1.console.aws.amazon.com/lambda/home?region=us-east-1#/functions/content_generation?tab=code

### Running the Backend

```bash
cd path/to/Backend
npm start # or yarn start
```

---

## Accessing the Application

Once both servers are running, access the Careeli App through your web browser:

- Frontend is typically accessible at `http://localhost:8000`
- Backend API endpoints can be accessed at `http://localhost:8005`

## ChatGPT Integration

### Overview

Handles OpenAI's ChatGPT integration for content generation in the Careerli app.

### Key Components

- `lambda_function.py`: AWS Lambda function for API handling.
- `utils.py`: Utility functions.
- `resume_tools.py`: Functions specific to resume generation.

### Deployment and Invocation of Lambda Function

**Deploying the Lambda Function:**

1. **Prepare the Deployment Package:**

   - Ensure all dependencies required by `lambda_function.py` are included in the package. This can be done by creating a virtual environment, installing the dependencies, and packaging them with the Lambda function script.

2. **Create a New Lambda Function:**

   - Go to the AWS Lambda console and create a new function.
   - Choose the 'Author from scratch' option.
   - Enter a function name and select the Python runtime that matches your local Python version.

3. **Upload the Deployment Package:**

   - In the function's 'Code source' section, upload the zip file containing `lambda_function.py` and its dependencies.

4. **Set the Handler:**

   - Specify the handler for your Lambda function. If your main file and method are named `lambda_function.py` and `lambda_handler`, respectively, set the handler to `lambda_function.lambda_handler`.

5. **Configure Execution Role:**

   - Assign or create an execution role that gives your Lambda function permissions to access AWS services.

6. **Save and Deploy:**
   - Save your configurations and deploy the Lambda function.

**Invoking the Lambda Function:**

The Lambda function can be invoked in several ways, depending on how the Careerli app is set up:

1. **API Gateway:**

   - You can configure an API Gateway to trigger the Lambda function via HTTP requests. This is useful if the Careerli app interacts with the Lambda function through web requests.

2. **SDK or AWS CLI:**

   - The function can be invoked directly using AWS SDKs in your application code or via the AWS Command Line Interface (CLI).

3. **Test Events:**
   - In the AWS Lambda console, you can configure test events to manually invoke the Lambda function for testing purposes.

The invocation method will depend on how the Careerli app's frontend or backend is configured to communicate with the Lambda function. The above steps provide a general guide on deploying and invoking the function for content generation purposes.

---

### Usage

Detail on how to deploy and invoke the Lambda function.

---

## Usage and Examples

Instructions on using the app to generate resumes and cover letters.

---

## Contributing to the Careerli Codebase

We welcome contributions to the Careerli app! Here's a step-by-step guide with code snippets to help you get started.

### Getting Started

1. **Familiarize Yourself with the Project:**
   - Take some time to understand the app's functionality, architecture, and existing codebase.

### Making Contributions

1. **Fork the Repository:**

   - Go to the main repository on GitHub and click the "Fork" button.

2. **Clone Your Fork:**

   - Clone your forked repository to create a local workspace.

   ```bash
   git clone https://github.com/your-username/careerli-app.git
   cd careerli-app
   ```

3. **Create a New Branch:**

   - For each new feature or fix, create a new branch.

   ```bash
   git checkout -b feature/your-new-feature
   ```

4. **Develop Your Feature or Fix:**

   - Write your code. Here's an example of a simple addition.

   ```javascript
   // Example: Adding a new utility function
   function newUtilityFunction() {
     // Code for the function
   }
   ```

5. **Commit Your Changes:**

   - Stage your changes and commit them with a clear message.

   ```bash
   git add .
   git commit -m "Add new utility function"
   ```

6. **Push to Your Fork and Create a Pull Request:**
   - Push your changes to your fork and then create a pull request.
   ```bash
   git push origin feature/your-new-feature
   ```
   - Go to your fork on GitHub and click "New pull request".

### Code Review Process

- **Peer Review:**
  - Be responsive to feedback and make necessary revisions.

### Best Practices

- **Follow Code Style Guidelines:** Maintain the existing coding style for consistency.
- **Document Your Code:** Use comments to explain complex parts of your code.
- **Stay Up-to-date:** Regularly sync your fork with the main repository.

### Questions and Discussions

- Feel free to ask questions or start discussions by opening issues in the repository.

---

This section now includes practical code snippets that illustrate basic Git operations and coding practices, making it more accessible for beginners. It's important to note that these examples are generic and should be adapted to the specific requirements and workflows of the Careerli app project.

---

## License

Information about the software license.

---

## Conclusion

This documentation provides a structured overview of the Careerli app. To fully complete the sections, particularly for the backend and ChatGPT integration, a deeper analysis of the code is required, which involves reviewing individual files and code snippets to extract specific setup instructions, dependencies, and usage details. With these instructions, you should be able to set up and run the Careeli App smoothly. This documentation aims to be clear and easy to follow, even for beginners. If you encounter any issues or have questions, feel free to reach out for support.

## Learning Resources

- Nest.js:[ Nest.js Fundamentals](https://nestjs.com/learn/basics)
- React:[ React Tutorial](https://reactjs.org/tutorial/tutorial.html)
- MongoDB:[ MongoDB University](https://university.mongodb.com/)
- AWS S3:[ AWS S3 Getting Started](https://aws.amazon.com/s3/getting-started/)
- Stripe:[ Stripe API Tutorials](https://stripe.com/docs/development/tutorials-and-guides)
