"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, ArrowUpRight } from "lucide-react";

interface Project {
  title: string;
  details: string;
  url?: string;
}

const projects: Project[] = [
  {
    title: "AI Act Assistant — Full-Stack SaaS Platform",
    details: `
I engineered an enterprise-ready SaaS platform to demystify the complex EU AI Act, transforming a dense legal document into an accessible, interactive knowledge base. This full-stack application provides users with instant, AI-powered answers through an intuitive chat interface.

The platform supports the complete commercial user lifecycle: secure sign-up via Clerk, an automated 14-day trial, and a seamless transition to a paid subscription managed by Stripe, including a self-service customer portal for subscription management. The core of the system is an advanced Retrieval-Augmented Generation (RAG) pipeline, which guarantees that all AI-generated responses are factually grounded in the official legal text, eliminating the risk of hallucination.

Built on a cost-effective hybrid architecture, the decoupled frontend (Next.js) and backend (FastAPI) are containerized with Docker. Secure, real-time communication for payment and user registration events is handled via webhooks protected by a Cloudflare Tunnel, ensuring a robust and reliable system from development to production.

Tech Stack: Next.js (React), FastAPI (Python), PostgreSQL, Docker, OpenAI, ChromaDB, Sentence Transformers, Stripe, Clerk, Cloudflare.
    `,
    url: "", // Add your GitHub URL here if you have one
  },
  {
    title: "self-hosted-business-hub",
    details: `
A fully self-hosted system I developed to eliminate dependency on third-party form services. When a user submits a form on the website, an n8n workflow, secured by a Cloudflare Tunnel, instantly processes the data. The data is archived in a PostgreSQL database, mirrored to Google Sheets for analysis, and I receive an instant notification confirming the outcome of the transaction.

Tech Stack: Docker, n8n, PostgreSQL, Cloudflare.
    `,
    url: "https://github.com/ridvanyigit/self-hosted-business-hub/blob/main/README.md#-t%C3%BCrk%C3%A7e-versiyon",
  },
  {
    title: "Intelligent Web Summarization Tool",
    details: `
Developed a lightweight AI tool that automatically scrapes and summarizes website content using GPT-4o-mini. The system collects raw text via BeautifulSoup, processes it through the OpenAI API, and delivers clean, concise summaries. As an alternative, a fully local, free version was built using Ollama and the Llama 3.2 model for offline environments.

Technologies: Python, BeautifulSoup4, OpenAI API, Ollama, Llama 3.2
    `,
  },
  {
    title: "Multi-Modal Airline Customer Assistant",
    details: `
Built an AI customer assistant capable of understanding and responding through both text and voice. Integrated Whisper for speech recognition and DALL·E-3 for generating illustrative responses, enabling rich, multi-modal user interactions. This project demonstrated real-time processing and deployment of audio and visual models.

Technologies: OpenAI Whisper, DALL·E-3, ffmpeg, pygame, simpleaudio
    `,
  },
  {
    title: "Tokenization & Model Optimization Framework",
    details: `
Conducted a deep comparative study of open-source LLMs (Llama, Phi-3, Qwen2), focusing on tokenizer behavior and quantization performance. Deployed optimized 4-bit quantized models to reduce memory consumption and accelerate inference without sacrificing output quality.

Technologies: Hugging Face Transformers, Accelerate, Bitsandbytes, Diffusers, Datasets
    `,
  },
  {
    title: "Retrieval-Augmented Generation (RAG) Systems",
    details: `
Designed and implemented RAG pipelines using both manual and LangChain-based approaches. Constructed semantic vector databases with Chroma and FAISS, optimized retrievers (k=25), and built interactive retrieval workflows for accurate and context-aware responses.

Technologies: LangChain, OpenAI Embeddings, ChromaDB, FAISS, Plotly
    `,
  },
  {
    title: "Price Prediction Platform with Fine-Tuned Llama Models",
    details: `
Developed a machine learning pipeline to predict product prices from text descriptions using both classical ML and LLM approaches. Trained a Q-LoRA fine-tuned Llama 3.1 model on 400k Amazon review samples, outperforming GPT-4o and Claude baselines. Integrated feature engineering and evaluation workflows with scikit-learn.

Technologies: scikit-learn, Transformers, PEFT, Bitsandbytes, W&B
    `,
  },
  {
    title: "Autonomous Multi-Agent Deal Discovery Framework",
    details: `
Built a production-grade, multi-agent system that continuously scans RSS feeds, evaluates product prices via a hybrid EnsembleAgent, and sends push notifications for promising deals. Deployed fine-tuned models and RAG pipelines on Modal GPU infrastructure to achieve scalable, serverless performance.

Technologies: OpenAI Agents SDK, Modal, ChromaDB, scikit-learn, RSS, Linear Regression
    `,
  },
  {
    title: "Serverless RAG Chatbot with AWS Integration",
    details: `
Developed a full-stack RAG chatbot with a Next.js frontend and a Python AWS Lambda backend. Integrated CloudFront, S3, and IAM for secure hosting. Deployed Bedrock and OpenAI models behind a serverless REST API for scalable and cost-efficient operation.

Technologies: Next.js, Tailwind CSS, AWS Lambda, AWS Bedrock, Serverless REST APIs
    `,
  },
  {
    title: "Automated Data Workflows with n8n and Docker",
    details: `
Engineered robust data pipelines using n8n and Docker. Automated daily Notion → Google Drive CSV backups, financial data ingestion into Google Sheets and PostgreSQL, and scheduled Metabase reports — creating a reliable, low-maintenance data infrastructure.

Technologies: n8n, Docker, PostgreSQL, Notion API, Google Drive API, Metabase
    `,
  },
  {
    title: "Deep Research App — Modular Multi-Agent Architecture",
    details: `
Transformed a Jupyter notebook prototype into a fully modular research assistant web application. Refactored agent logic into dedicated Python modules (planner, search, writer, email), implemented async generators for real-time progress streaming, and built a Gradio interface for user interaction.

Technologies: Python asyncio, Gradio, OpenAI API, BeautifulSoup4
    `,
  },
  {
    title: "Engineering Team",
    details: `
Simulated a real software development lifecycle using CrewAI with four specialized agents — Engineering Lead (GPT-4o), Backend (Claude 3 Sonnet), Frontend (Claude 3 Sonnet), and Testing (DeepSeek). Sequentially generated design docs, backend logic, frontend UI, and test suites, resulting in a fully functional application.

Technologies: CrewAI, OpenAI + Anthropic APIs, Gradio, Python unittest
    `,
  },
  {
    title: "The Sidekick — Personal Assistant",
    details: `
Developed a versatile personal assistant using LangGraph, integrating a wide toolset including Google Serper search, Playwright browser automation, file system operations, Wikipedia queries, Python REPL execution, and push notifications. Implemented evaluator–worker feedback loops for iterative task refinement.

Technologies: LangGraph, Playwright, Google Serper, Wikipedia API, OpenAI API, Pushover
    `,
  },
  {
    title: "Autonomous Trading Floor Simulation",
    details: `
Engineered a multi-agent financial trading simulation inspired by legendary investors (Buffett, Soros, Dalio, Cathie Wood). Deployed multiple traders concurrently via asyncio, each with distinct strategies. Built a Gradio dashboard to visualize portfolio performance, logs, and real-time decisions.

Technologies: OpenAI Agents SDK, MCP, Polygon.io, Pushover, Gradio, asyncio
    `,
  },
  {
    title: "Autonomous Financial Trader Agents",
    details: `
Developed a hierarchical trader–researcher agent ecosystem with persistent memory and RAG capabilities. Integrated five MCP servers (accounts, market, push, brave search, memory) to enable tool-based reasoning and autonomous trading cycles combining research, decision-making, and execution.

Technologies: OpenAI Agents SDK, MCP, mcp-memory-libsql, Brave API, asyncio
    `,
  },
];

export default function ProjectsSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const toggle = (index: number) => setOpenIndex(openIndex === index ? null : index);

  return (
    <section id="projects" className="max-w-4xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold mb-8 text-center">Projects</h2>
      <div className="space-y-4">
        {projects.map((project, index) => (
          <div
            key={index}
            className="border rounded-lg p-4 bg-card hover:bg-accent/10 transition"
          >
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggle(index)}
            >
              <h3 className="font-semibold text-lg">{project.title}</h3>
              
              {openIndex === index ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </div>
            {openIndex === index && (
              <div className="mt-2 text-sm text-muted-foreground">
                <p className="whitespace-pre-line">{project.details}</p>
                
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1 font-semibold text-indigo-500 hover:underline"
                  >
                    View on GitHub for more details
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}