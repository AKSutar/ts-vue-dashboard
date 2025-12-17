# TV DASHBOARD (Vue 3 + TypeScript)
A responsive TV show dashboard using the TVMaze API:
- Groups shows by genre (horizontal scrolling rows).
- Sorts each genre by rating (descending).
- Search by show name.
- Detail page per show.

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about the recommended Project Setup and IDE Support in the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).

## Prerequisites
- **Node.js:** v20.19.0 or higher  
- **NPM:** 10.9.3

### Installation
1. Clone the repository:
git clone https://github.com/AKSutar/ts-vue-dashboard.git

2. Navigate to the project folder:
cd ts-vue-dashboard

3. Install dependencies:
npm install 

4. Running the Application
npm run dev

5. Starts the application in development mode.
Open http://localhost:5173/ in your browser.


### Running Tests
npm run test 


### Project Structure
/src
/components - Reusable UI components
/pages - Application pages or views
/api - API calls
/router - Provides routing.
/tests - Unit testing files
/types - Interfaces
/utils - Helper functions 


### TypeScript Configuration
The project includes multiple TypeScript configuration files for different purposes:
- `tsconfig.json` → Base configuration for the project.  
- `tsconfig.app.json` → Configuration for frontend/application code.  
- `tsconfig.node.json` → Configuration for Node.js/server code.  
This separation ensures proper compilation settings for each environment.


### Key Principles
- **Modularity:** Components and services are independent and reusable.  
- **Scalability:** Easy to extend with new features.  
- **Maintainability:** Clear folder structure and naming conventions.  
- **Performance:** Optimized for fast load times and minimal API calls.

### Browser support
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

