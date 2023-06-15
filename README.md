# GPT-3 Todo List
This is a Todo List application that uses GPT-3 to generate action steps for each Todo item. 
The application contains a frontend developed with React and a backend server developed with Express.

## Features
**Add Todo Items:** Users can input tasks they need to complete.

**Delete Todo Items:** Users can delete tasks when they are completed or no longer needed.

**Generate Action Steps:** Each task has an associated "Generate Action Steps" button which, when clicked, 
communicates with the backend server and uses the GPT-3 model to generate action steps for that task. The results are then displayed on the frontend.

## Tech Stack
**Frontend**: React

**Backend:** Express

**API:** OpenAI GPT-3

### Note
API key is stored in a .env file, which is included in the .gitignore
