# InternDiary
 
 ## A SOCIAL PLATFORM FOR STUDENTS AND ALUMNI  USING MERN STACK.
 It is a web app using React js as frontend with Google Authentication and jwt authentication and MongoDB as backend.
 It has a login feature with email verification, and only Alumni can post an intern
 opportunity and perform CRUD operations. Students can apply for these, and the list of
 students who applied (with their details and resumes) will be shown on Alumni's dashboard.
 Users can upload profile pictures, resumes, and other details and edit them.
 `It has a feature of voice-controlled navigation and scrolling.`

## Setup Instructions

### Prerequisites
- Node.js and npm installed
- MongoDB installed locally OR MongoDB Atlas account (cloud)
- Google OAuth Client ID (for Google authentication)

### Step 1: Install Dependencies

#### Frontend Setup
```bash
cd frontend
npm install
```

#### Backend Setup
```bash
cd backend
npm install
```

### Step 2: Configure Environment Variables

#### Backend Configuration
Create a `.env` file in the `backend` directory with the following:
```env
mongoURI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

**Examples:**
- For local MongoDB: `mongoURI=mongodb://localhost:27017/interndiary`
- For MongoDB Atlas: `mongoURI=mongodb+srv://username:password@cluster.mongodb.net/interndiary`
- JWT_SECRET: Use a strong random string (e.g., generate with `openssl rand -base64 32`)

#### Frontend Configuration
Create a `.env` file in the `frontend` directory with the following:
```env
REACT_APP_client_Id=your_google_oauth_client_id
```

**Detailed Steps to Get Google OAuth Client ID:**

1. **Go to Google Cloud Console**
   - Visit: https://console.cloud.google.com/
   - Sign in with your Google account

2. **Create a New Project** (or select existing)
   - Click the project dropdown at the top of the page
   - Click "New Project"
   - Enter project name (e.g., "InternDiary")
   - Click "Create"
   - Wait for project creation, then select it from the dropdown

3. **Configure OAuth Consent Screen**
   - In the left sidebar, go to "APIs & Services" → "OAuth consent screen"
   - Choose "External" (unless you have a Google Workspace account)
   - Click "Create"
   - Fill in the required fields:
     - **App name**: InternDiary (or your app name)
     - **User support email**: Your email address
     - **Developer contact information**: Your email address
   - Click "Save and Continue"
   - On "Scopes" page, click "Save and Continue" (default scopes are fine)
   - On "Test users" page, click "Save and Continue" (you can add test users later)
   - Review and click "Back to Dashboard"

4. **Create OAuth Credentials**
   - Go to "APIs & Services" → "Credentials"
   - Click "+ CREATE CREDENTIALS" at the top
   - Select "OAuth client ID"

5. **Configure OAuth Client**
   - **Application type**: Select "Web application"
   - **Name**: Enter a name (e.g., "InternDiary Web Client")
   - **Authorized JavaScript origins**: Click "ADD URI" and add:
     - `http://localhost:3000` (for development)
     - `http://localhost:3001` (if you use a different port)
   - **Authorized redirect URIs**: Click "ADD URI" and add:
     - `http://localhost:3000` (for development)
     - You can add production URLs later when deploying
   - Click "CREATE"

6. **Copy Your Client ID**
   - A popup will appear showing your **Client ID** and **Client Secret**
   - **Copy the Client ID** (you'll need this for your `.env` file)
   - ⚠️ **Important**: Save the Client Secret securely if you need it later (though this app only needs the Client ID)
   - Click "OK"

7. **Add Client ID to Your Project**
   - Open `frontend/.env` file (create it if it doesn't exist)
   - Add: `REACT_APP_client_Id=your_copied_client_id_here`
   - Replace `your_copied_client_id_here` with the actual Client ID you copied
   - Save the file

8. **Restart Your Development Server**
   - Stop your React app (Ctrl+C)
   - Restart with `npm start`
   - The Google login button should now appear and work!

**Note**: If you're deploying to production, you'll need to:
- Add your production domain to "Authorized JavaScript origins"
- Add your production callback URL to "Authorized redirect URIs"
- Update the `.env` file with the same Client ID (or use environment variables in your hosting platform)

### Step 3: Run the Application

#### Start Backend Server
```bash
cd backend
npm start
```
The backend will run on `http://localhost:5000`

#### Start Frontend Client (in a new terminal)
```bash
cd frontend
npm start
```
The frontend will run on `http://localhost:3000` and open automatically in your browser.

### Troubleshooting

**If you encounter dependency conflicts:**
- The `react-alert` package has been removed as it's incompatible with React 18. The project uses `react-custom-alert` instead.
- If issues persist, try: `npm install --legacy-peer-deps`

**If MongoDB connection fails:**
- Ensure MongoDB is running locally, OR
- Check your MongoDB Atlas connection string is correct
- Verify network access in MongoDB Atlas if using cloud
## Voice Navigation commands:-

1.  `go to home` OR `navigate to home` => go to home/index page
2.  `go to login` OR `navigate to login` => go to login page
3.  `go to signup` OR `navigate to signup` => go to the signup page
4. `go to dashboard` OR `navigate to dashboard` => go to your dashboard if logged in.
## Scrolling commands:-
5.  `Scroll down` OR `move down` => for scrolling down
6. `Scroll up` OR `move up` => for scrolling up.
## stop Recognition commands:-
7. `stop recognition` OR `stop listening` => to stop voice controlling / Recognition
8. `stop voice controlling` OR `stop voice control` OR `stop voice recognition` => to stop voice controlling / Recognition
