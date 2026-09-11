import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes
  app.post("/api/contact", async (req, res) => {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    try {
      console.log("Contact request received:", { name, email, subject });
      const key = process.env.RESEND_API_KEY?.trim();
      if (!key) {
        console.error("RESEND_API_KEY is missing");
        return res.status(500).json({ 
          error: "Email service is not configured. Please add RESEND_API_KEY to the environment variables in the Settings menu." 
        });
      }

      const resend = new Resend(key);
      
      // Format message with line breaks for HTML
      const formattedMessage = message.replace(/\n/g, '<br/>');

      console.log("Attempting to send email via Resend...");
      
      // Use a Promise with a timeout to prevent hanging
      const sendEmailPromise = resend.emails.send({
        from: "Yamkela Macwili — Portfolio <onboarding@resend.dev>",
        to: ["yamkela22y@gmail.com"],
        subject: `New message from ${name} — ${subject}`,
        replyTo: email,
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <style>
                body {
                  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
                  background-color: #09090b;
                  margin: 0;
                  padding: 40px 20px;
                  color: #f4f4f5;
                }
                .container {
                  max-width: 600px;
                  margin: 0 auto;
                  background-color: #18181b;
                  border-radius: 24px;
                  border: 1px solid #27272a;
                  overflow: hidden;
                }
                .header {
                  padding: 32px;
                  border-bottom: 1px solid #27272a;
                  background: linear-gradient(to bottom right, #18181b, #09090b);
                }
                .header h1 {
                  margin: 0;
                  font-size: 24px;
                  font-weight: 600;
                  color: #ffffff;
                  letter-spacing: -0.025em;
                }
                .header p {
                  margin: 8px 0 0;
                  font-size: 14px;
                  color: #a1a1aa;
                }
                .content {
                  padding: 32px;
                }
                .section {
                  margin-bottom: 28px;
                }
                .label {
                  display: block;
                  font-size: 11px;
                  font-weight: 600;
                  text-transform: uppercase;
                  letter-spacing: 0.1em;
                  color: #10b981;
                  margin-bottom: 8px;
                }
                .value {
                  font-size: 16px;
                  line-height: 1.6;
                  color: #f4f4f5;
                }
                .message-box {
                  background-color: #09090b;
                  padding: 20px;
                  border-radius: 12px;
                  border: 1px solid #27272a;
                  color: #d4d4d8;
                }
                .footer {
                  padding: 32px;
                  background-color: #18181b;
                  text-align: center;
                  border-top: 1px solid #27272a;
                }
                .button {
                  display: inline-block;
                  padding: 14px 32px;
                  background-color: #10b981;
                  color: #ffffff !important;
                  text-decoration: none;
                  border-radius: 9999px;
                  font-weight: 600;
                  font-size: 14px;
                  transition: background-color 0.2s;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>New Contact Message</h1>
                  <p>A new inquiry from your portfolio website.</p>
                </div>
                <div class="content">
                  <div class="section">
                    <span class="label">From</span>
                    <div class="value" style="font-weight: 500;">${name}</div>
                  </div>
                  <div class="section">
                    <span class="label">Email Address</span>
                    <div class="value">${email}</div>
                  </div>
                  <div class="section">
                    <span class="label">Subject</span>
                    <div class="value">${subject}</div>
                  </div>
                  <div class="section">
                    <span class="label">Message</span>
                    <div class="message-box value">
                      ${formattedMessage}
                    </div>
                  </div>
                </div>
                <div class="footer">
                  <a href="mailto:${email}" class="button">Reply to Message</a>
                </div>
              </div>
            </body>
          </html>
        `,
      });

      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error("Request timed out after 10 seconds")), 10000)
      );

      const { data, error } = await Promise.race([sendEmailPromise, timeoutPromise]) as any;

      if (error) {
        console.error("Resend Error:", error);
        return res.status(500).json({ error: "Failed to send email" });
      }

      res.status(200).json({ success: true, data });
    } catch (err) {
      console.error("Server Error:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
