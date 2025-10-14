<table width="100%" align="center">
  <tr>
    <td align="center">
      <h1 style="margin: 0;">Rıdvan Yiğit - AI Engineer Portfolio</h1>
      <p style="margin: 0;">A modern, serverless-powered portfolio showcasing projects in Agentic AI, RAG, and cloud deployments.</p>
    </td>
  </tr>
</table>

<p align="center">
  <a href="#-key-features"><strong>Features</strong></a> ·
  <a href="#-tech-stack"><strong>Tech Stack</strong></strong></a> ·
  <a href="#-architecture-overview"><strong>Architecture</strong></a> ·
  <a href="#-getting-started"><strong>Setup</strong></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-15-black.svg?style=for-the-badge&logo=nextdotjs" alt="Next.js">
  <img src="https://img.shields.io/badge/React-19-blue.svg?style=for-the-badge&logo=react" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-5-blue.svg?style=for-the-badge&logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-38B2AC.svg?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/Deployed_on-Vercel-black.svg?style=for-the-badge&logo=vercel" alt="Vercel">
</p>

This repository contains the source code for my personal portfolio website, **[ridvanyigit.com](https://www.ridvanyigit.com)**. It's built with Next.js and features a fully integrated, RAG-powered AI chatbot with a serverless AWS backend.

<br>

---

### 🚀 Key Features

- **Modern Frontend**: Built with Next.js 15 App Router, React 19, and styled with Tailwind CSS & shadcn/ui.
- **Interactive AI Chatbot**: A floating chatbot that connects to a serverless backend, providing information about my skills and projects.
- **Persistent Memory**: The chatbot remembers conversation history for each user via a session-based memory system on AWS S3.
- **Serverless API Endpoints**: Uses Next.js API Routes on Vercel to proxy requests and handle integrations securely.
- **Contact Form Integration**: A contact form that saves submissions to Google Sheets and sends real-time push notifications via Pushover.
- **Fully Responsive & Themed**: Features a fluid design that works on all devices, complete with a dark/light mode toggle.
- **Smooth Animations**: Engaging user experience with animations powered by Framer Motion..

---

### 🛠️ Tech Stack

The project is architected with a decoupled frontend and backend, leveraging best-in-class technologies for scalability and performance.

| Frontend (Vercel)                               | Backend & Integrations (AWS)                        |
| ----------------------------------------------- | --------------------------------------------------- |
| **Framework**: Next.js 15                       | **Chatbot Runtime**: AWS Lambda (Python 3.12)       |
| **Library**: React 19                           | **API Framework**: FastAPI                          |
| **Language**: TypeScript                        | **AI Model**: OpenAI GPT-4o-mini                    |
| **Styling**: Tailwind CSS 4, shadcn/ui          | **Data Storage**: AWS S3 (for chat memory)          |
| **Animations**: Framer Motion                   | **Notifications**: Pushover API                     |
| **Deployment**: Vercel                          | **Data Logging**: Google Sheets API                 |

---

### 🏗️ Architecture Overview

This project utilizes a hybrid architecture, combining a Vercel-hosted frontend with a Python-based serverless backend on AWS.

1.  **User Interaction**: The user visits [ridvanyigit.com](https://www.ridvanyigit.com) and interacts with the React components rendered by Next.js.
2.  **Chat Request**: When a user sends a message in the chatbot, the Next.js frontend sends a `POST` request to its own backend at `/api/chat`.
3.  **Vercel API Proxy**: The `/api/chat` endpoint on Vercel acts as a secure proxy. It receives the request and forwards it to the AWS Lambda function URL. This hides the backend endpoint and credentials from the public.
4.  **AWS Lambda Execution**: The Python FastAPI app on AWS Lambda receives the request.
    -   It loads the conversation history from the S3 bucket using the `session_id`.
    -   It constructs a detailed RAG prompt containing my personal info, skills, and conversation history.
    -   It queries the OpenAI API (`gpt-4o-mini`) to generate a response.
    -   It saves the new conversation turn back to the S3 bucket.
5.  **Response Flow**: The response travels back from AWS -> Vercel -> Next.js Frontend, where it is displayed to the user.

```mermaid
sequenceDiagram
    participant User
    participant Next.js Frontend (Vercel)
    participant Vercel API (/api/chat)
    participant AWS Lambda (Python/FastAPI)
    participant OpenAI API
    participant AWS S3

    User->>Next.js Frontend (Vercel): Sends chat message
    Next.js Frontend (Vercel)->>Vercel API (/api/chat): POST request with message & session_id
    Vercel API (/api/chat)->>AWS Lambda (Python/FastAPI): Proxies the request
    AWS Lambda (Python/FastAPI)->>AWS S3: Load conversation history
    AWS Lambda (Python/FastAPI)->>OpenAI API: Send RAG prompt
    OpenAI API-->>AWS Lambda (Python/FastAPI): Generate AI response
    AWS Lambda (Python/FastAPI)->>AWS S3: Save new conversation
    AWS Lambda (Python/FastAPI)-->>Vercel API (/api/chat): Return response & session_id
    Vercel API (/api/chat)-->>Next.js Frontend (Vercel): Return JSON response
    Next.js Frontend (Vercel)-->>User: Display AI message in UI
```

---

### 🏁 Getting Started

Follow these steps to set up and run the project locally.

#### Prerequisites

- Node.js (v18 or later)
- `npm` or `yarn`

#### 1. Clone the Repository

```bash
git clone https://github.com/ridvanyigit/ai-portfolio.git
cd ai-portfolio
```

#### 2. Install Dependencies

```bash
npm install
```

#### 3. Set Up Environment Variables

Create a new file named `.env.local` in the root of the project by copying the example file.

```bash
cp .env.example .env.local
```

Now, open `.env.local` and fill in the required values:

```env
# URL for the local development server
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Pushover API credentials for the contact form notifications
PUSHOVER_API_TOKEN=your_pushover_app_token_here
PUSHOVER_USER_KEY=your_pushover_user_key_here
```

#### 4. Run the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

### 📜 Available Scripts

-   `npm run dev`: Starts the development server.
-   `npm run build`: Builds the application for production.
-   `npm run start`: Starts the production server.
-   `npm run lint`: Runs the ESLint linter.

---

### **Project Refinements & Challenges Solved**

During the integration of the AWS-powered chatbot, several key technical challenges were identified and resolved to ensure production-grade stability and functionality.

#### 1. Restoring Chatbot Statefulness (Memory)

*   **The Problem:** The chatbot embedded in the portfolio site appeared stateless. It could not remember previous messages in a conversation (e.g., the user's name), even though the backend was designed to handle session-based memory.
*   **The Diagnosis:** The Vercel Next.js frontend was not persisting the `session_id` returned by the AWS backend. Each new message sent from the portfolio's UI was initiating a brand-new, empty conversation on the backend.
*   **The Solution:**
    1.  State management was implemented in the `FloatingChatbot.tsx` React component. It now captures the `session_id` from the initial backend response.
    2.  This captured `session_id` is now included in the body of every subsequent `fetch` request to the `/api/chat` endpoint.
    3.  The `/api/chat` route on Vercel was updated to correctly proxy this `session_id` to the AWS Lambda function, ensuring the backend could retrieve the correct conversation history from S3.

#### 2. Fixing Serverless-to-Serverless API Calls for Notifications

*   **The Problem:** Contact form submissions were correctly saved to Google Sheets, but the Pushover notification system, designed to alert the site owner, was failing silently.
*   **The Diagnosis:** The `/api/contact` serverless function was attempting to call the `/api/notify` endpoint using a hardcoded `localhost` address. This fails in a deployed serverless environment where `localhost` is meaningless.
*   **The Solution:** The API call inside `app/api/contact/route.ts` was refactored. It now dynamically constructs the absolute URL by reading the `host` and `protocol` from the incoming request headers. This ensures that the function always calls its own public-facing API endpoint, making it environment-agnostic.

#### 3. Enhancing User Interface (UI) Accessibility

*   **The Problem:** The floating chatbot icon was nearly invisible when the website was in "light mode," as its background color blended in with the page's background.
*   **The Solution:** The button styling in `FloatingChatbot.tsx` was modified to use a static, high-contrast background color (a shade of indigo). This guarantees the icon is prominent and easily accessible for all users, regardless of the selected theme (light or dark).


---

*Feel free to fork this repository or reach out if you have any questions!*
