## Project Setup and Installation

### Running All Setup Commands

To set up the entire project, including installing dependencies and running database migrations and seeds, use the following command:

```bash
npm run setup
```


This command will:

1. **Install Dependencies in the Root Directory**:
   - Runs `npm install` to install dependencies specified in the root `package.json`.

2. **Install Dependencies in the Backend Directory**:
   - Changes to the `backend` directory and runs `npm install` to install backend-specific dependencies.

3. **Install Dependencies in the Client Directory**:
   - Changes to the `client` directory and runs `npm install` to install client-specific dependencies.

4. **Run Database Migrations and Seeds**:
   - Runs `npx knex migrate:latest` to apply any new database migrations.
   - Runs `npx knex seed:run` to seed the database with initial data.

### Installing Individually

If you prefer to run each step individually, you can use the following commands:

1. **Install Root Dependencies**:
   ```bash
   npm install
   ```

2. **Install Backend Dependencies**:
   ```bash
   cd backend
   npm install
   cd ..
   ```

3. **Install Client Dependencies**:
   ```bash
   cd client
   npm install
   cd ..
   ```

4. **Run Migrations and Seeds in the Backend**:
   ```bash
   cd backend
   npx knex migrate:latest
   npx knex seed:run
   cd ..
   ```

5. **Run Application**:
   ```bash
   npm run dev
    
   ```
---
 