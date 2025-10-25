# Design Guidelines: WhatsApp Business API Flow Builder

## Design Approach

**Selected Approach:** Design System - Linear/Notion-inspired productivity interface

**Justification:** This is a utility-focused business application requiring efficiency, clarity, and professional aesthetics. Users need to quickly build flows, monitor conversations, and manage templates - prioritizing function over visual flair while maintaining modern, clean aesthetics.

**Design Philosophy:** Professional command center with emphasis on data hierarchy, workflow efficiency, and spatial organization. Think Linear's precision meets Notion's flexibility.

---

## Typography System

**Primary Font:** Inter (Google Fonts)
- Display/Headers: 600 weight, 28-48px
- Section Titles: 600 weight, 20-24px  
- Body Text: 400 weight, 14-16px
- Labels/Meta: 500 weight, 12-14px
- Code/Monospace: 'JetBrains Mono' for API keys, webhook URLs, JSON

**Hierarchy Rules:**
- Page headers: Bold, large, clear visual anchor
- Card titles: Medium weight, slightly elevated from body
- Data labels: Uppercase, tracked spacing (letter-spacing: 0.05em)
- Conversation messages: Natural reading size (16px)

---

## Layout System

**Spacing Primitives:** Tailwind units of 2, 4, 6, and 8
- Tight spacing: p-2, gap-2 (component internals)
- Standard spacing: p-4, gap-4 (cards, forms)
- Section spacing: p-6, gap-6 (major sections)
- Page spacing: p-8, gap-8 (page containers)

**Grid Structure:**
- Dashboard: 12-column grid for metrics/stats (grid-cols-2 lg:grid-cols-4)
- Flow Builder: Canvas-based layout with draggable nodes
- Message List: Single column with max-w-4xl for readability
- Admin Panel: Sidebar (240px fixed) + main content area

**Container Strategy:**
- Full-width app shell with fixed sidebar navigation
- Content areas: max-w-7xl with px-6 lg:px-8
- Forms/modals: max-w-2xl centered
- Flow canvas: Full viewport minus chrome

---

## Component Library

### Navigation
**Primary Sidebar (Fixed Left, 240px)**
- Logo/brand at top
- Icon + label navigation items
- Active state: Subtle background highlight
- Grouped sections: Conversations, Flows, Templates, Settings
- User profile at bottom with status indicator

### Dashboard Components
**Metric Cards (4-column grid on desktop)**
- Large number display (32px, 600 weight)
- Label below (14px, uppercase)
- Trend indicator (icon + percentage)
- Minimal borders, elevated with subtle shadow

**Conversation List**
- Avatar (40px circle) + contact name + last message preview
- Timestamp in top-right
- Unread badge (number, small pill shape)
- Status indicators: delivered, read, failed
- Hover state: Subtle background shift

**Message Bubbles**
- Incoming: Aligned left, light background
- Outgoing: Aligned right, distinct background
- Rounded corners (12px)
- Timestamp below (small, muted)
- Template messages: Icon indicator

### Flow Builder Canvas
**Node Components**
- Trigger node: Starting point (rounded rectangle)
- Message node: Contains template preview
- Condition node: Diamond shape for branching logic
- Action node: API calls, database updates
- Connection lines: Bezier curves with directional arrows

**Toolbar**
- Fixed top bar with: Add Node, Save, Preview, Deploy buttons
- Zoom controls (bottom-right floating)
- Minimap for large flows (bottom-left corner)

### Forms & Inputs
**Input Fields**
- Clear labels above inputs
- Border on all sides with focus ring
- Error states: Red border + error text below
- Helper text: Muted, 12px below input
- Textarea for message content: Monospace font

**Template Builder**
- Variable picker ({{variable}} format)
- Preview pane showing formatted message
- Media upload area with drag-and-drop zone

### Data Display
**Tables (for contact/message history)**
- Sticky header row
- Alternating row backgrounds (very subtle)
- Row hover state
- Action buttons in rightmost column
- Pagination at bottom

**Status Badges**
- Small pill shapes
- Distinct states: Pending, Sent, Delivered, Read, Failed
- Icon + text combination

### Modals & Overlays
**Modal Structure**
- Centered overlay with backdrop (backdrop-blur-sm)
- Max width: 600px for forms, 800px for flow preview
- Header with title + close button
- Footer with action buttons (aligned right)
- Scrollable content area if needed

---

## Page-Specific Layouts

### Dashboard Home
- 4-column metrics grid at top
- Recent conversations (left 2/3) + Quick actions sidebar (right 1/3)
- Activity feed below

### Flow Builder
- Full-screen canvas with minimal chrome
- Left sidebar: Node library (collapsible)
- Top toolbar: Flow controls
- Properties panel (right sidebar, appears on node selection)

### Message Templates
- List view with cards (2-column grid)
- Each card: Template name, preview, status, actions
- "Create Template" prominent button
- Filter/search bar at top

### Conversation View
- Three-panel layout:
  - Left: Conversation list (300px)
  - Center: Message thread (flexible width)
  - Right: Contact info panel (280px, collapsible)

### Settings/Admin
- Traditional settings layout with left tab navigation
- Content area with forms and configuration panels

---

## Interactions & Micro-animations

**Minimal Animation Strategy:**
- Button press: Scale down slightly (scale-95)
- Modal entry: Fade + slight scale up (duration-200)
- Loading states: Subtle pulse on skeleton screens
- Drag-and-drop: Smooth cursor-grab with drop shadow
- NO scroll animations, NO parallax, NO complex transitions

---

## Visual Hierarchy Principles

1. **Command Clarity:** Primary actions always prominent (solid buttons)
2. **Information Density:** Comfortable spacing prevents overwhelming users
3. **Status Visibility:** Always show message delivery states clearly
4. **Progressive Disclosure:** Hide advanced options in dropdowns/panels
5. **Consistency:** Same patterns for similar actions across all views

---

## Accessibility Standards

- All interactive elements: min-height of 44px
- Focus indicators on all keyboard-navigable elements
- ARIA labels for icon-only buttons
- Form inputs with proper labels (not just placeholders)
- Sufficient contrast ratios (WCAG AA minimum)
- Error messages announced to screen readers

---

## Images

**No hero images** for this application. This is a functional business tool, not a marketing site.

**Icons:** Use Heroicons (CDN link) - outlined style for navigation, solid for actions

**Avatars:** Contact profile pictures (40px circles, fallback to initials)

**Placeholder imagery:** Only in empty states with friendly illustrations guiding users to take action