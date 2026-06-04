import express from "express";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

// Load environment variables
dotenv.config();

let supabaseClient: any = null;

// Lazy initialize Supabase Client to prevent crashes on startup if keys are missing
function getSupabaseClient() {
  if (supabaseClient) return supabaseClient;

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

  if (!url || !key) {
    console.warn("⚠️ Supabase credentials are not fully configured in your environment variables (.env).");
    return null;
  }

  try {
    supabaseClient = createClient(url, key);
    return supabaseClient;
  } catch (error) {
    console.error("❌ Failed to initialize Supabase Client:", error);
    return null;
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware
  app.use(express.json());

  // API Endpoints
  app.get("/api/health", (req, res) => {
    res.json({ 
      status: "ok", 
      timestamp: new Date().toISOString(),
      supabaseConfigured: !!getSupabaseClient()
    });
  });

  // Check user registration endpoint
  app.post("/api/check-user", async (req, res) => {
    const { email, customCredentials } = req.body;

    if (!email || typeof email !== "string") {
      return res.status(400).json({ error: "E-mail inválido ou ausente." });
    }

    const sanitizedEmail = email.trim().toLowerCase();
    
    // Choose redirection targets from custom credentials or environment variables
    const redirectionRegistration = customCredentials?.redirectRegistration || process.env.REDIRECT_REGISTRATION_URL || "https://app.swaphome.com.br/";
    const redirectionCheckout = customCredentials?.redirectCheckout || process.env.REDIRECT_CHECKOUT_URL || "https://app.swaphome.com.br/checkout";

    let supabase: any = null;
    let isCustom = false;

    if (customCredentials?.url && customCredentials?.key) {
      try {
        console.log("Using custom dynamic Supabase configuration provided by the user.");
        supabase = createClient(customCredentials.url, customCredentials.key);
        isCustom = true;
      } catch (error) {
        console.error("❌ Failed to initialize custom Supabase Client:", error);
        return res.status(400).json({ error: "As credenciais do Supabase informadas são inválidas ou mal-formadas." });
      }
    } else {
      supabase = getSupabaseClient();
    }

    // If Supabase is not configured, fallback to simulation mode to keep preview functional
    if (!supabase) {
      console.log(`[Simulation] Checking email: ${sanitizedEmail}`);
      // Simple logic for the demo/simulation:
      // If the email contains "ja-cadastrado" or starts with "admin", "teste", or matches common mock accounts, mark as existing.
      const exists = sanitizedEmail.includes("ja-cadastrado") || sanitizedEmail.includes("admin") || sanitizedEmail === "test@example.com";
      const redirectUrl = exists ? redirectionCheckout : redirectionRegistration;

      return res.json({
        exists,
        redirectUrl,
        configured: false,
        message: "Supabase não configurado. Simulação executada com sucesso.",
        simulation: true
      });
    }

    try {
      const tableName = customCredentials?.tableName || process.env.SUPABASE_TABLE_NAME || "users";
      const emailColumn = customCredentials?.emailColumn || process.env.SUPABASE_EMAIL_COLUMN || "email";

      console.log(`Checking Supabase table "${tableName}" where "${emailColumn}" = "${sanitizedEmail}"`);

      const { data, error } = await supabase
        .from(tableName)
        .select(emailColumn)
        .eq(emailColumn, sanitizedEmail);

      if (error) {
        console.error("Supabase query error:", error);
        throw error;
      }

      const exists = Array.isArray(data) && data.length > 0;
      const redirectUrl = exists ? redirectionCheckout : redirectionRegistration;

      return res.json({
        exists,
        redirectUrl,
        configured: true,
        isCustom,
        message: exists ? "Usuário encontrado no banco de dados." : "Usuário não encontrado."
      });
    } catch (err: any) {
      console.error("Error executing database query:", err);
      // Fallback redirection to registration in case of error, or return an error message
      return res.status(500).json({ 
        error: "Erro ao consultar o banco de dados.",
        details: err?.message || err,
        fallbackUrl: redirectionRegistration
      });
    }
  });

  // Robustly determine if we are in production by checking if the compiled "dist" folder exists.
  const distPath = path.join(process.cwd(), "dist");
  const isProduction = process.env.NODE_ENV === "production" || fs.existsSync(distPath);

  if (!isProduction) {
    console.log("🛠️ Starting server in DEVELOPMENT mode with Vite dev middleware...");
    const { createServer } = await import("vite");
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("🚀 Starting server in PRODUCTION mode. Serving static assets from /dist...");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((error) => {
  console.error("❌ Failed to start server:", error);
});
