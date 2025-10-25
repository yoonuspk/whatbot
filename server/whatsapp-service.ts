import axios from "axios";

interface WhatsAppConfig {
  apiToken: string;
  phoneNumberId: string;
  apiVersion: string;
}

export class WhatsAppService {
  private config: WhatsAppConfig;
  private baseUrl: string;

  constructor(config?: Partial<WhatsAppConfig>) {
    this.config = {
      apiToken: config?.apiToken || process.env.WHATSAPP_API_TOKEN || "",
      phoneNumberId: config?.phoneNumberId || process.env.WHATSAPP_PHONE_NUMBER_ID || "",
      apiVersion: config?.apiVersion || "v21.0",
    };
    this.baseUrl = `https://graph.facebook.com/${this.config.apiVersion}`;
  }

  async sendTextMessage(to: string, message: string): Promise<any> {
    if (!this.config.apiToken || !this.config.phoneNumberId) {
      console.warn("WhatsApp API credentials not configured. Message would be sent to:", to);
      return { success: false, error: "API credentials not configured" };
    }

    try {
      const response = await axios.post(
        `${this.baseUrl}/${this.config.phoneNumberId}/messages`,
        {
          messaging_product: "whatsapp",
          recipient_type: "individual",
          to: to.replace(/\+/g, ""),
          type: "text",
          text: { body: message },
        },
        {
          headers: {
            Authorization: `Bearer ${this.config.apiToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("WhatsApp API error:", error);
      throw error;
    }
  }

  async sendTemplateMessage(
    to: string,
    templateName: string,
    languageCode: string = "en",
    components?: any[]
  ): Promise<any> {
    if (!this.config.apiToken || !this.config.phoneNumberId) {
      console.warn("WhatsApp API credentials not configured. Template would be sent to:", to);
      return { success: false, error: "API credentials not configured" };
    }

    try {
      const response = await axios.post(
        `${this.baseUrl}/${this.config.phoneNumberId}/messages`,
        {
          messaging_product: "whatsapp",
          recipient_type: "individual",
          to: to.replace(/\+/g, ""),
          type: "template",
          template: {
            name: templateName,
            language: { code: languageCode },
            components: components || [],
          },
        },
        {
          headers: {
            Authorization: `Bearer ${this.config.apiToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("WhatsApp template error:", error);
      throw error;
    }
  }

  async markMessageAsRead(messageId: string): Promise<any> {
    if (!this.config.apiToken || !this.config.phoneNumberId) {
      return { success: false, error: "API credentials not configured" };
    }

    try {
      const response = await axios.post(
        `${this.baseUrl}/${this.config.phoneNumberId}/messages`,
        {
          messaging_product: "whatsapp",
          status: "read",
          message_id: messageId,
        },
        {
          headers: {
            Authorization: `Bearer ${this.config.apiToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("WhatsApp mark read error:", error);
      throw error;
    }
  }
}

export const whatsappService = new WhatsAppService();
