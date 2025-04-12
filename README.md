# Chatbot-AI

## Project Overview
Chatbot-AI is a web-based chatbot application that allows users to interact with a chatbot about the content of a specified webpage. The application fetches the text content from the provided URL and enables users to ask questions related to that content.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features
- Fetches and summarizes webpage content.
- Allows users to ask questions about the fetched content.
- Utilizes session management to maintain conversation context.

## Technologies Used
- Node.js
- Express.js
- Axios
- Cheerio
- EJS (Embedded JavaScript templating)
- Tailwind CSS

## Installation
To set up the project locally, follow these steps:

1. Clone the repository:
   ```
   git clone https://github.com/CodingMayank/Chatbot-AI.git
   ```

2. Navigate to the project directory:
   ```
   cd Chatbot-AI
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Create a `.env` file based on the `.env.example` file and add your OpenRouter API key:
   ```
   OPENROUTER_API_KEY=your_api_key_here
   ```

5. Start the application:
   ```
   npm start
   ```

6. Open your browser and go to `http://localhost:3000`.

## Project Structure
- `public/`: Contains static assets such as stylesheets and images.
- `routes/chatbot.js`: Defines the routes for handling chatbot interactions.
- `utils/fetchContent.js`: Contains the function to fetch and parse webpage content.
- `views/`: Contains EJS templates for rendering the user interface.
  - `chat.ejs`: Template for the chat interface.
  - `index.ejs`: Template for the homepage where users can input a URL.
- `app.js`: The main entry point of the application, setting up middleware and routes.
- `package.json`: Contains project metadata and dependencies.
- `.env.example`: Example environment configuration file.

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.