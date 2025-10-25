import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { whatsappService } from "./whatsapp-service";
import { insertContactSchema, insertMessageSchema, insertFlowSchema, insertTemplateSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contacts API
  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getAllContacts();
      res.json(contacts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch contacts" });
    }
  });

  app.get("/api/contacts/:id", async (req, res) => {
    try {
      const contact = await storage.getContact(req.params.id);
      if (!contact) {
        return res.status(404).json({ error: "Contact not found" });
      }
      res.json(contact);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch contact" });
    }
  });

  app.post("/api/contacts", async (req, res) => {
    try {
      const data = insertContactSchema.parse(req.body);
      const existing = await storage.getContactByPhone(data.phoneNumber);
      if (existing) {
        return res.json(existing);
      }
      const contact = await storage.createContact(data);
      res.status(201).json(contact);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to create contact" });
    }
  });

  // Messages API
  app.get("/api/messages", async (req, res) => {
    try {
      const messages = await storage.getAllMessages();
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch messages" });
    }
  });

  app.get("/api/messages/contact/:contactId", async (req, res) => {
    try {
      const messages = await storage.getMessagesByContact(req.params.contactId);
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch messages" });
    }
  });

  app.post("/api/messages", async (req, res) => {
    try {
      const data = insertMessageSchema.parse(req.body);
      const message = await storage.createMessage(data);
      res.status(201).json(message);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to create message" });
    }
  });

  app.patch("/api/messages/:id/status", async (req, res) => {
    try {
      const { status } = req.body;
      if (!status) {
        return res.status(400).json({ error: "Status is required" });
      }
      const message = await storage.updateMessageStatus(req.params.id, status);
      if (!message) {
        return res.status(404).json({ error: "Message not found" });
      }
      res.json(message);
    } catch (error) {
      res.status(500).json({ error: "Failed to update message status" });
    }
  });

  // Flows API
  app.get("/api/flows", async (req, res) => {
    try {
      const flows = await storage.getAllFlows();
      res.json(flows);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch flows" });
    }
  });

  app.get("/api/flows/active", async (req, res) => {
    try {
      const flows = await storage.getActiveFlows();
      res.json(flows);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch active flows" });
    }
  });

  app.get("/api/flows/:id", async (req, res) => {
    try {
      const flow = await storage.getFlow(req.params.id);
      if (!flow) {
        return res.status(404).json({ error: "Flow not found" });
      }
      res.json(flow);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch flow" });
    }
  });

  app.post("/api/flows", async (req, res) => {
    try {
      const data = insertFlowSchema.parse(req.body);
      const flow = await storage.createFlow(data);
      res.status(201).json(flow);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to create flow" });
    }
  });

  app.patch("/api/flows/:id", async (req, res) => {
    try {
      const flow = await storage.updateFlow(req.params.id, req.body);
      if (!flow) {
        return res.status(404).json({ error: "Flow not found" });
      }
      res.json(flow);
    } catch (error) {
      res.status(500).json({ error: "Failed to update flow" });
    }
  });

  app.delete("/api/flows/:id", async (req, res) => {
    try {
      await storage.deleteFlow(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete flow" });
    }
  });

  // Templates API
  app.get("/api/templates", async (req, res) => {
    try {
      const { status } = req.query;
      if (status && typeof status === "string") {
        const templates = await storage.getTemplatesByStatus(status);
        return res.json(templates);
      }
      const templates = await storage.getAllTemplates();
      res.json(templates);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch templates" });
    }
  });

  app.get("/api/templates/:id", async (req, res) => {
    try {
      const template = await storage.getTemplate(req.params.id);
      if (!template) {
        return res.status(404).json({ error: "Template not found" });
      }
      res.json(template);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch template" });
    }
  });

  app.post("/api/templates", async (req, res) => {
    try {
      const data = insertTemplateSchema.parse(req.body);
      const template = await storage.createTemplate(data);
      res.status(201).json(template);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to create template" });
    }
  });

  app.patch("/api/templates/:id", async (req, res) => {
    try {
      const template = await storage.updateTemplate(req.params.id, req.body);
      if (!template) {
        return res.status(404).json({ error: "Template not found" });
      }
      res.json(template);
    } catch (error) {
      res.status(500).json({ error: "Failed to update template" });
    }
  });

  app.delete("/api/templates/:id", async (req, res) => {
    try {
      await storage.deleteTemplate(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete template" });
    }
  });

  // WhatsApp webhook endpoint
  app.get("/api/webhooks/whatsapp", (req, res) => {
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN || "your_verify_token";

    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      console.log("Webhook verified");
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  });

  app.post("/api/webhooks/whatsapp", async (req, res) => {
    try {
      const body = req.body;

      if (body.object === "whatsapp_business_account") {
        for (const entry of body.entry) {
          for (const change of entry.changes) {
            if (change.field === "messages") {
              const value = change.value;

              if (value.messages) {
                for (const message of value.messages) {
                  const phoneNumber = message.from;
                  const messageText = message.text?.body || "";
                  const messageType = message.type;

                  let contact = await storage.getContactByPhone(phoneNumber);
                  if (!contact) {
                    contact = await storage.createContact({
                      phoneNumber,
                      name: value.contacts?.[0]?.profile?.name || null,
                    });
                  }

                  await storage.createMessage({
                    contactId: contact.id,
                    direction: "inbound",
                    content: messageText,
                    messageType,
                    status: "received",
                    whatsappMessageId: message.id,
                  });
                }
              }

              if (value.statuses) {
                for (const status of value.statuses) {
                  const messages = await storage.getAllMessages();
                  const message = messages.find(
                    (m) => m.whatsappMessageId === status.id
                  );
                  if (message) {
                    await storage.updateMessageStatus(message.id, status.status);
                  }
                }
              }
            }
          }
        }
      }

      res.sendStatus(200);
    } catch (error) {
      console.error("Webhook error:", error);
      res.sendStatus(500);
    }
  });

  // Send WhatsApp message
  app.post("/api/whatsapp/send", async (req, res) => {
    try {
      const { phoneNumber, message, templateId } = req.body;

      if (!phoneNumber || !message) {
        return res.status(400).json({ error: "Phone number and message are required" });
      }

      let contact = await storage.getContactByPhone(phoneNumber);
      if (!contact) {
        contact = await storage.createContact({
          phoneNumber,
          name: null,
        });
      }

      let whatsappResponse;
      try {
        whatsappResponse = await whatsappService.sendTextMessage(phoneNumber, message);
      } catch (error) {
        console.warn("WhatsApp API call failed, saving message anyway:", error);
      }

      const newMessage = await storage.createMessage({
        contactId: contact.id,
        direction: "outbound",
        content: message,
        messageType: templateId ? "template" : "text",
        status: "sent",
        whatsappMessageId: whatsappResponse?.messages?.[0]?.id || null,
      });

      res.status(201).json(newMessage);
    } catch (error) {
      console.error("Send message error:", error);
      res.status(500).json({ error: "Failed to send message" });
    }
  });

  // Dashboard stats
  app.get("/api/stats", async (req, res) => {
    try {
      const messages = await storage.getAllMessages();
      const flows = await storage.getAllFlows();
      
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const totalMessages = messages.length;
      const sentToday = messages.filter(
        (m) => m.direction === "outbound" && new Date(m.timestamp) >= today
      ).length;
      const delivered = messages.filter((m) => 
        m.status === "delivered" || m.status === "read"
      ).length;
      const activeFlows = flows.filter((f) => f.isActive === 1).length;

      res.json({
        totalMessages,
        sentToday,
        delivered,
        activeFlows,
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch stats" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
