# WhatsApp Business API Flow Builder

A comprehensive full-stack application for managing WhatsApp Business API conversations, flows, and message templates. Build automated conversation flows, track messages, and manage templates all in one place.

## Features

- 📊 **Dashboard** - Real-time metrics and conversation overview
- 💬 **Conversations** - Manage WhatsApp conversations with contacts
- 🔄 **Flow Builder** - Create and manage automated conversation flows
- 📝 **Templates** - Manage WhatsApp message templates
- ⚙️ **Settings** - Configure WhatsApp Business API credentials
- 🔗 **Webhook Integration** - Receive incoming messages and status updates
- 🌙 **Dark Mode** - Full light/dark theme support

## Architecture

### Tech Stack

**Frontend:**
- React 18 with TypeScript
- Wouter for routing
- TanStack Query for data fetching
- Shadcn UI components
- Tailwind CSS for styling
- Lucide React icons

**Backend:**
- Express.js
- PostgreSQL database (Neon)
- Drizzle ORM
- WhatsApp Business API integration
- RESTful API design

### Database Schema

```
┌─────────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  contacts   │────<│   messages   │     │    flows     │     │  templates   │
└─────────────┘     └──────────────┘     └──────────────┘     └──────────────┘
│ id          │     │ id           │     │ id           │     │ id           │
│ phoneNumber │     │ contactId    │     │ name         │     │ name         │
│ name        │     │ direction    │     │ description  │     │ content      │
│ createdAt   │     │ content      │     │ isActive     │     │ category     │
                    │ messageType  │     │ flowData     │     │ status       │
                    │ status       │     │ createdAt    │     │ language     │
                    │ timestamp    │     │ updatedAt    │     │ createdAt    │
```

### Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend (React)                      │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │Dashboard │  │Conversa- │  │  Flows   │  │Templates │   │
│  │          │  │  tions   │  │          │  │          │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │          TanStack Query (State Management)            │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            │ HTTP/REST
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                      Backend (Express)                       │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                   API Routes                          │  │
│  │  /api/contacts  /api/messages  /api/flows            │  │
│  │  /api/templates /api/webhooks  /api/whatsapp         │  │
│  └──────────────────────────────────────────────────────┘  │
│                            │                                 │
│  ┌────────────────┐  ┌────────────────────┐               │
│  │ Storage Layer  │  │ WhatsApp Service   │               │
│  │ (Drizzle ORM)  │  │ (API Integration)  │               │
│  └────────────────┘  └────────────────────┘               │
└─────────────────────────────────────────────────────────────┘
           │                        │
           ▼                        ▼
┌──────────────────┐    ┌──────────────────────────┐
│   PostgreSQL     │    │  WhatsApp Business API   │
│    Database      │    │  (Meta Graph API)        │
└──────────────────┘    └──────────────────────────┘
```

## Setup Instructions

### Prerequisites

- Node.js 20 or higher
- PostgreSQL database (provided by Replit)
- WhatsApp Business API credentials (optional for testing)

### Environment Variables

Create a `.env` file with the following variables:

```bash
# Database (automatically provided by Replit)
DATABASE_URL=<your_database_url>

# WhatsApp Business API Configuration (optional)
WHATSAPP_API_TOKEN=<your_whatsapp_api_token>
WHATSAPP_PHONE_NUMBER_ID=<your_phone_number_id>
WHATSAPP_VERIFY_TOKEN=<your_webhook_verify_token>

# Session Secret
SESSION_SECRET=<random_secret_string>
```

### Installation

1. Install dependencies:
```bash
npm install
```

2. Push database schema:
```bash
npm run db:push
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5000`

### WhatsApp Business API Setup

1. **Get API Credentials:**
   - Sign up for Meta Business Suite
   - Create a WhatsApp Business App
   - Get your Phone Number ID and API Token

2. **Configure Webhook:**
   - Go to Settings page in the app
   - Copy the webhook URL: `https://your-domain.com/api/webhooks/whatsapp`
   - Add this URL in Meta's WhatsApp Business API dashboard
   - Use the `WHATSAPP_VERIFY_TOKEN` for verification

3. **Set Environment Variables:**
   - Add your credentials to the Settings page in the app
   - Or set them as environment variables

## API Documentation

### Contacts

- `GET /api/contacts` - Get all contacts
- `GET /api/contacts/:id` - Get contact by ID
- `POST /api/contacts` - Create new contact

### Messages

- `GET /api/messages` - Get all messages
- `GET /api/messages/contact/:contactId` - Get messages for a contact
- `POST /api/messages` - Create new message
- `PATCH /api/messages/:id/status` - Update message status

### Flows

- `GET /api/flows` - Get all flows
- `GET /api/flows/active` - Get active flows
- `GET /api/flows/:id` - Get flow by ID
- `POST /api/flows` - Create new flow
- `PATCH /api/flows/:id` - Update flow
- `DELETE /api/flows/:id` - Delete flow

### Templates

- `GET /api/templates` - Get all templates
- `GET /api/templates?status=approved` - Get templates by status
- `GET /api/templates/:id` - Get template by ID
- `POST /api/templates` - Create new template
- `PATCH /api/templates/:id` - Update template
- `DELETE /api/templates/:id` - Delete template

### WhatsApp

- `POST /api/whatsapp/send` - Send WhatsApp message
  ```json
  {
    "phoneNumber": "+1234567890",
    "message": "Hello, World!",
    "templateId": "optional_template_id"
  }
  ```

### Webhooks

- `GET /api/webhooks/whatsapp` - Webhook verification
- `POST /api/webhooks/whatsapp` - Receive WhatsApp events

### Stats

- `GET /api/stats` - Get dashboard statistics

## Usage Guide

### Sending Messages

1. Go to the Dashboard
2. Click "New Message"
3. Enter phone number (with country code)
4. Type your message
5. Click "Send Message"

### Creating Flows

1. Navigate to Flows page
2. Click "Create Flow"
3. Enter flow name and description
4. Click "Create Flow"
5. Toggle flow status to activate

### Managing Templates

1. Go to Templates page
2. Click "Create Template"
3. Fill in template details:
   - Name
   - Category (utility, marketing, authentication)
   - Content (use {{variable}} for dynamic fields)
4. Click "Create Template"

### Viewing Conversations

1. Navigate to Conversations page
2. Select a contact from the list
3. View message history
4. Send new messages directly

## Data Flow

### Incoming Messages (Webhook)

```
WhatsApp → Webhook → Create/Update Contact → Save Message → Update UI
```

### Outgoing Messages

```
UI → API → WhatsApp Service → WhatsApp API → Save Message → Update UI
```

## Development

### Project Structure

```
.
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── lib/           # Utilities and providers
│   │   └── App.tsx        # Main app component
│   └── index.html
├── server/                 # Backend Express application
│   ├── routes.ts          # API route handlers
│   ├── storage.ts         # Database storage layer
│   ├── whatsapp-service.ts # WhatsApp API integration
│   └── db.ts              # Database configuration
├── shared/                 # Shared types and schemas
│   └── schema.ts          # Database schema definitions
└── README.md
```

### Database Migrations

The project uses Drizzle ORM for database management. To push schema changes:

```bash
npm run db:push
```

To generate migrations:

```bash
npm run db:generate
```

## Features in Detail

### Dashboard
- Real-time message statistics
- Recent conversations list
- Quick action shortcuts
- Active flow count

### Conversations
- Contact list with last message preview
- Unread message indicators
- Message status indicators (sent, delivered, read, failed)
- Real-time message sending
- Contact information panel

### Flows
- Create automated conversation flows
- Toggle flow activation status
- View node count and description
- Search and filter flows

### Templates
- Create message templates with variables
- Category organization
- Status tracking (approved, pending, rejected)
- Copy template content
- Search and filter by category/status

### Settings
- WhatsApp API configuration
- Webhook URL display
- Notification preferences
- Danger zone for data management

## Security Considerations

- All API credentials are stored as environment variables
- Webhook verification token validates incoming requests
- PostgreSQL database with connection pooling
- Input validation using Zod schemas
- Secure session management

## Troubleshooting

### Messages not sending
- Verify WhatsApp API credentials in Settings
- Check that phone numbers include country code
- Review browser console and server logs

### Webhook not receiving messages
- Ensure webhook URL is correctly configured in Meta dashboard
- Verify `WHATSAPP_VERIFY_TOKEN` matches Meta configuration
- Check server logs for webhook errors

### Database connection issues
- Verify `DATABASE_URL` is set correctly
- Run `npm run db:push` to sync schema
- Check PostgreSQL service is running

## License

MIT

## Support

For issues and questions, please check the documentation or create an issue in the repository.
