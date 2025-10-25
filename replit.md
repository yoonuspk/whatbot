# WhatsApp Business API Flow Builder - Project Documentation

## Project Overview

This is a full-stack WhatsApp Business API management application that allows users to:
- Manage WhatsApp conversations with contacts
- Create and manage automated conversation flows
- Manage WhatsApp message templates
- Send messages through WhatsApp Business API
- Track message delivery status
- View analytics and dashboard metrics

## Recent Changes

### 2025-01-XX - Initial Implementation
- Created complete database schema for contacts, messages, flows, and templates
- Implemented full storage layer with CRUD operations
- Built comprehensive REST API with all endpoints
- Created WhatsApp Business API integration service
- Implemented all frontend pages with real data integration
- Added dark mode support
- Created documentation and setup instructions

## User Preferences

- Professional, clean UI design following Linear/Notion aesthetics
- Focus on functionality and data clarity
- Minimal animations, maximum usability
- Comprehensive WhatsApp Business API integration

## Project Architecture

### Technology Stack

**Frontend:**
- React 18 with TypeScript
- Wouter for routing
- TanStack Query for state management and data fetching
- Shadcn UI component library
- Tailwind CSS for styling
- Dark mode support

**Backend:**
- Express.js REST API
- PostgreSQL database (Neon)
- Drizzle ORM for database operations
- WhatsApp Business API integration via Graph API
- Webhook handling for incoming messages

### Database Schema

Four main tables:

1. **contacts** - Store contact information
   - id (uuid primary key)
   - phoneNumber (unique)
   - name (optional)
   - createdAt

2. **messages** - Store all messages (inbound and outbound)
   - id (uuid primary key)
   - contactId (foreign key to contacts)
   - direction ('inbound' or 'outbound')
   - content (message text)
   - messageType ('text', 'template', etc.)
   - status ('sent', 'delivered', 'read', 'failed')
   - whatsappMessageId (from WhatsApp API)
   - timestamp

3. **flows** - Store conversation flows
   - id (uuid primary key)
   - name
   - description (optional)
   - isActive (0 or 1)
   - flowData (JSON with nodes and edges)
   - createdAt, updatedAt

4. **templates** - Store message templates
   - id (uuid primary key)
   - name
   - content (with {{variable}} placeholders)
   - category ('marketing', 'utility', 'authentication')
   - language (default 'en')
   - status ('approved', 'pending', 'rejected')
   - whatsappTemplateId (from WhatsApp API)
   - createdAt

### API Endpoints

**Contacts:**
- GET /api/contacts - List all contacts
- GET /api/contacts/:id - Get contact by ID
- POST /api/contacts - Create contact

**Messages:**
- GET /api/messages - List all messages
- GET /api/messages/contact/:contactId - Get messages for contact
- POST /api/messages - Create message
- PATCH /api/messages/:id/status - Update message status

**Flows:**
- GET /api/flows - List all flows
- GET /api/flows/active - List active flows
- GET /api/flows/:id - Get flow by ID
- POST /api/flows - Create flow
- PATCH /api/flows/:id - Update flow
- DELETE /api/flows/:id - Delete flow

**Templates:**
- GET /api/templates - List all templates
- GET /api/templates?status=approved - Filter by status
- GET /api/templates/:id - Get template by ID
- POST /api/templates - Create template
- PATCH /api/templates/:id - Update template
- DELETE /api/templates/:id - Delete template

**WhatsApp:**
- POST /api/whatsapp/send - Send message via WhatsApp
- GET /api/webhooks/whatsapp - Webhook verification
- POST /api/webhooks/whatsapp - Receive WhatsApp events

**Stats:**
- GET /api/stats - Get dashboard statistics

### File Structure

```
client/
  src/
    components/         # Reusable UI components
      ui/              # Shadcn components
      app-sidebar.tsx  # Navigation sidebar
      metric-card.tsx  # Dashboard metrics
      conversation-list-item.tsx
      message-bubble.tsx
      flow-card.tsx
      template-card.tsx
      status-badge.tsx
      theme-toggle.tsx
    pages/             # Page components
      dashboard.tsx
      conversations.tsx
      flows.tsx
      templates.tsx
      settings.tsx
    lib/
      theme-provider.tsx
      queryClient.ts

server/
  routes.ts           # API route handlers
  storage.ts          # Database storage layer
  whatsapp-service.ts # WhatsApp API integration
  db.ts              # Database connection

shared/
  schema.ts          # Drizzle schemas and types
```

## Environment Variables

Required environment variables:

```bash
# Database (auto-configured by Replit)
DATABASE_URL

# WhatsApp Business API (optional for testing)
WHATSAPP_API_TOKEN          # WhatsApp Business API access token
WHATSAPP_PHONE_NUMBER_ID    # Phone number ID from Meta
WHATSAPP_VERIFY_TOKEN       # Webhook verification token

# Session
SESSION_SECRET
```

## Key Features Implemented

### Dashboard
- Real-time statistics (total messages, sent today, delivered, active flows)
- Recent conversations with unread indicators
- Quick actions for common tasks
- Send message dialog

### Conversations
- Contact list with search
- Message thread view
- Real-time message sending
- Message status indicators
- Contact information panel

### Flows
- Create/edit/delete flows
- Activate/deactivate flows
- Flow metadata (name, description, node count)
- Search and filter

### Templates
- Create/edit/delete templates
- Template categories and status
- Variable placeholders support
- Copy to clipboard
- Filter by category and status

### Settings
- WhatsApp API configuration
- Webhook URL display
- Notification preferences
- Data management options

## WhatsApp Integration

The application integrates with WhatsApp Business API (Meta Graph API) for:

1. **Sending Messages:**
   - Text messages via `sendTextMessage()`
   - Template messages via `sendTemplateMessage()`
   - Automatic message tracking in database

2. **Receiving Messages:**
   - Webhook endpoint for incoming messages
   - Auto-create contacts from new senders
   - Store messages with metadata

3. **Status Updates:**
   - Delivery status via webhooks
   - Read receipts
   - Failure notifications

## Development Notes

- Uses in-memory storage by default, can be switched to PostgreSQL
- All mutations invalidate relevant query cache
- Dark mode persists in localStorage
- Forms use react-hook-form with Zod validation
- Error handling with toast notifications

## Testing Considerations

The application can be tested without WhatsApp API credentials:
- Messages will be saved to database
- API calls will log warnings but not fail
- All UI functionality works independently

## Future Enhancements

Potential features for future development:
- Visual flow builder with drag-and-drop nodes
- Rich media support (images, documents, videos)
- Bulk messaging capabilities
- Analytics dashboard with charts
- Contact list management and import
- Flow execution engine
- Webhook retry logic
- Message queue for reliability
- Multi-user support with authentication
- Role-based access control
