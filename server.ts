import express from "express";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

// Load environment variables
dotenv.config();

let supabaseClient: any = null;
const CONFIG_FILE = path.join(process.cwd(), "supabase-config.json");

// Helper to get environment variables with fallback for visually truncated names in the platform
function getEnvVar(fullKey: string, truncatedKeys: string[]): string | undefined {
  if (process.env[fullKey]) {
    return process.env[fullKey];
  }
  for (const truncatedKey of truncatedKeys) {
    if (process.env[truncatedKey]) {
      console.log(`ℹ️ Environment variable "${fullKey}" resolved from truncated replica "${truncatedKey}"`);
      return process.env[truncatedKey];
    }
  }
  return undefined;
}

function getSavedConfig() {
  if (fs.existsSync(CONFIG_FILE)) {
    try {
      const content = fs.readFileSync(CONFIG_FILE, "utf-8");
      return JSON.parse(content);
    } catch (e) {
      console.error("Error reading supabase-config.json:", e);
    }
  }
  return null;
}

// Lazy initialize Supabase Client to prevent crashes on startup if keys are missing
function getSupabaseClient() {
  if (supabaseClient) return supabaseClient;

  const config = getSavedConfig();
  const url = process.env.SUPABASE_URL || config?.supabaseUrl;
  
  // Use fallbacks for truncated names: SUPABASE_SERVICE / SUPABASE_ANON_K
  const serviceRoleKey = getEnvVar("SUPABASE_SERVICE_ROLE_KEY", ["SUPABASE_SERVICE"]);
  const anonKey = getEnvVar("SUPABASE_ANON_KEY", ["SUPABASE_ANON_K"]);
  const key = serviceRoleKey || anonKey || config?.supabaseKey;

  if (!url || !key) {
    console.warn("⚠️ Supabase credentials are not fully configured in your environment variables (.env) or supabase-config.json.");
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

  app.get("/api/get-settings", (req, res) => {
    const config = getSavedConfig() || {};
    res.json(config);
  });

  app.post("/api/save-settings", (req, res) => {
    try {
      const { supabaseUrl, supabaseKey, tableName, emailColumn, redirectRegistration, redirectCheckout } = req.body;
      const config = {
        supabaseUrl: supabaseUrl?.trim() || "",
        supabaseKey: supabaseKey?.trim() || "",
        tableName: tableName?.trim() || "users",
        emailColumn: emailColumn?.trim() || "email",
        redirectRegistration: redirectRegistration?.trim() || "https://app.swaphome.com.br/",
        redirectCheckout: redirectCheckout?.trim() || "https://proteus.app.n8n.cloud/form/841c6341-af2d-4751-9053-4978c8a56e96"
      };

      fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2), "utf-8");
      
      // Reset the lazy client to force reconnection with new keys next time
      supabaseClient = null;

      res.json({ success: true, message: "Configurações persistidas com sucesso no servidor!" });
    } catch (err: any) {
      console.error("Error writing settings:", err);
      res.status(500).json({ error: "Erro ao salvar configurações no servidor.", details: err.message });
    }
  });

  app.post("/api/clear-settings", (req, res) => {
    try {
      if (fs.existsSync(CONFIG_FILE)) {
        fs.unlinkSync(CONFIG_FILE);
      }
      supabaseClient = null;
      res.json({ success: true, message: "Configurações removidas com sucesso no servidor!" });
    } catch (err: any) {
      res.status(500).json({ error: "Erro ao limpar configurações no servidor." });
    }
  });

  // Check user registration endpoint
  app.post("/api/check-user", async (req, res) => {
    const { email, customCredentials } = req.body;

    if (!email || typeof email !== "string") {
      return res.status(400).json({ error: "E-mail inválido ou ausente." });
    }

    const sanitizedEmail = email.trim().toLowerCase();
    const config = getSavedConfig();
    
    // Choose redirection targets from custom credentials, configuration file, or environment variables
    const redirectionRegistration = customCredentials?.redirectRegistration || config?.redirectRegistration || getEnvVar("REDIRECT_REGISTRATION_URL", ["REDIRECT_REGISTR"]) || "https://app.swaphome.com.br/";
    const redirectionCheckout = customCredentials?.redirectCheckout || config?.redirectCheckout || getEnvVar("REDIRECT_CHECKOUT_URL", ["REDIRECT_CHECKO"]) || "https://proteus.app.n8n.cloud/form/841c6341-af2d-4751-9053-4978c8a56e96";

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
      const tableName = customCredentials?.tableName || config?.tableName || getEnvVar("SUPABASE_TABLE_NAME", ["SUPABASE_TABLE_N"]) || "users";
      const emailColumn = customCredentials?.emailColumn || config?.emailColumn || getEnvVar("SUPABASE_EMAIL_COLUMN", ["SUPABASE_EMAIL_C"]) || "email";

      console.log(`Checking Supabase table "${tableName}" where "${emailColumn}" = "${sanitizedEmail}"`);

      const { data, error } = await supabase
        .from(tableName)
        .select(emailColumn)
        .ilike(emailColumn, `%${sanitizedEmail}%`);

      if (error) {
        console.error("Supabase query error:", error);
        throw error;
      }

      const exists = Array.isArray(data) && data.some(row => {
        const value = String(row[emailColumn] || "").trim().toLowerCase();
        return value === sanitizedEmail;
      });
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
