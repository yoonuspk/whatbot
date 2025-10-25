import { db } from "./db";
import { contacts, messages, flows, templates } from "@shared/schema";
import type {
  Contact,
  InsertContact,
  Message,
  InsertMessage,
  Flow,
  InsertFlow,
  Template,
  InsertTemplate,
} from "@shared/schema";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  getContact(id: string): Promise<Contact | undefined>;
  getContactByPhone(phoneNumber: string): Promise<Contact | undefined>;
  getAllContacts(): Promise<Contact[]>;
  createContact(contact: InsertContact): Promise<Contact>;
  updateContact(id: string, contact: Partial<InsertContact>): Promise<Contact | undefined>;

  getMessage(id: string): Promise<Message | undefined>;
  getMessagesByContact(contactId: string): Promise<Message[]>;
  getAllMessages(): Promise<Message[]>;
  createMessage(message: InsertMessage): Promise<Message>;
  updateMessageStatus(id: string, status: string): Promise<Message | undefined>;

  getFlow(id: string): Promise<Flow | undefined>;
  getAllFlows(): Promise<Flow[]>;
  getActiveFlows(): Promise<Flow[]>;
  createFlow(flow: InsertFlow): Promise<Flow>;
  updateFlow(id: string, flow: Partial<InsertFlow>): Promise<Flow | undefined>;
  deleteFlow(id: string): Promise<void>;

  getTemplate(id: string): Promise<Template | undefined>;
  getAllTemplates(): Promise<Template[]>;
  getTemplatesByStatus(status: string): Promise<Template[]>;
  createTemplate(template: InsertTemplate): Promise<Template>;
  updateTemplate(id: string, template: Partial<InsertTemplate>): Promise<Template | undefined>;
  deleteTemplate(id: string): Promise<void>;
}

export class DbStorage implements IStorage {
  async getContact(id: string): Promise<Contact | undefined> {
    const result = await db.select().from(contacts).where(eq(contacts.id, id)).limit(1);
    return result[0];
  }

  async getContactByPhone(phoneNumber: string): Promise<Contact | undefined> {
    const result = await db.select().from(contacts).where(eq(contacts.phoneNumber, phoneNumber)).limit(1);
    return result[0];
  }

  async getAllContacts(): Promise<Contact[]> {
    return await db.select().from(contacts).orderBy(desc(contacts.createdAt));
  }

  async createContact(contact: InsertContact): Promise<Contact> {
    const result = await db.insert(contacts).values(contact).returning();
    return result[0];
  }

  async updateContact(id: string, contact: Partial<InsertContact>): Promise<Contact | undefined> {
    const result = await db.update(contacts).set(contact).where(eq(contacts.id, id)).returning();
    return result[0];
  }

  async getMessage(id: string): Promise<Message | undefined> {
    const result = await db.select().from(messages).where(eq(messages.id, id)).limit(1);
    return result[0];
  }

  async getMessagesByContact(contactId: string): Promise<Message[]> {
    return await db.select().from(messages).where(eq(messages.contactId, contactId)).orderBy(messages.timestamp);
  }

  async getAllMessages(): Promise<Message[]> {
    return await db.select().from(messages).orderBy(desc(messages.timestamp));
  }

  async createMessage(message: InsertMessage): Promise<Message> {
    const result = await db.insert(messages).values(message).returning();
    return result[0];
  }

  async updateMessageStatus(id: string, status: string): Promise<Message | undefined> {
    const result = await db.update(messages).set({ status }).where(eq(messages.id, id)).returning();
    return result[0];
  }

  async getFlow(id: string): Promise<Flow | undefined> {
    const result = await db.select().from(flows).where(eq(flows.id, id)).limit(1);
    return result[0];
  }

  async getAllFlows(): Promise<Flow[]> {
    return await db.select().from(flows).orderBy(desc(flows.createdAt));
  }

  async getActiveFlows(): Promise<Flow[]> {
    return await db.select().from(flows).where(eq(flows.isActive, 1)).orderBy(desc(flows.createdAt));
  }

  async createFlow(flow: InsertFlow): Promise<Flow> {
    const result = await db.insert(flows).values(flow).returning();
    return result[0];
  }

  async updateFlow(id: string, flow: Partial<InsertFlow>): Promise<Flow | undefined> {
    const updatedFlow = { ...flow, updatedAt: new Date() };
    const result = await db.update(flows).set(updatedFlow).where(eq(flows.id, id)).returning();
    return result[0];
  }

  async deleteFlow(id: string): Promise<void> {
    await db.delete(flows).where(eq(flows.id, id));
  }

  async getTemplate(id: string): Promise<Template | undefined> {
    const result = await db.select().from(templates).where(eq(templates.id, id)).limit(1);
    return result[0];
  }

  async getAllTemplates(): Promise<Template[]> {
    return await db.select().from(templates).orderBy(desc(templates.createdAt));
  }

  async getTemplatesByStatus(status: string): Promise<Template[]> {
    return await db.select().from(templates).where(eq(templates.status, status)).orderBy(desc(templates.createdAt));
  }

  async createTemplate(template: InsertTemplate): Promise<Template> {
    const result = await db.insert(templates).values(template).returning();
    return result[0];
  }

  async updateTemplate(id: string, template: Partial<InsertTemplate>): Promise<Template | undefined> {
    const result = await db.update(templates).set(template).where(eq(templates.id, id)).returning();
    return result[0];
  }

  async deleteTemplate(id: string): Promise<void> {
    await db.delete(templates).where(eq(templates.id, id));
  }
}

export const storage = new DbStorage();
