# Socrates PRD

## Core Purpose & Success
- **Mission Statement**: A chatbot that leads teams to discover insights and refine ideas using only the Socratic method of questioning.
- **Success Indicators**: Teams report improved clarity of thinking, uncovering of assumptions, and generation of stronger ideas through guided self-discovery.
- **Experience Qualities**: Thought-provoking, Enlightening, Elegant.

## Project Classification & Approach
- **Complexity Level**: Light Application (chat interface with conversational state management)
- **Primary User Activity**: Interacting (ongoing conversation with the chatbot)

## Thought Process for Feature Selection
- **Core Problem Analysis**: Teams often struggle to identify flawed assumptions and explore alternative perspectives in ideation sessions.
- **User Context**: Users will engage during ideation sessions, problem-solving meetings, or when they feel stuck on a problem.
- **Critical Path**: User enters their challenge/idea → Chatbot responds with Socratic questions → Ongoing dialogue leads user to deeper insights
- **Key Moments**: 
  1. The initial framing question that sets the direction
  2. Moment when the chatbot identifies and questions a key assumption
  3. User's "aha moment" when they discover a new insight through self-reflection

## Essential Features
1. **Educational Blurb**
   - What: Brief explanation of the Socratic Method and its effectiveness
   - Why: Provides context for users unfamiliar with the method and sets expectations
   - Success: Users understand the purpose and value of question-based dialogue
   
2. **Chat Interface**
   - What: Clean, minimalist conversation UI with user and Socrates messages
   - Why: Provides familiar interaction model that focuses on the dialogue
   - Success: Users can easily distinguish their messages from Socrates' questions
   
3. **Conversation History**
   - What: Persistence of the entire conversation
   - Why: Allows users to review their thought process and evolution of ideas
   - Success: Full conversation is preserved between sessions

4. **Topic Management**
   - What: Ability to start new conversations on different topics
   - Why: Teams will use the tool for multiple challenges/ideas
   - Success: Users can clearly separate different conversation threads

## Design Direction

### Visual Tone & Identity
- **Emotional Response**: Contemplative, intellectual curiosity, mental clarity
- **Design Personality**: Elegant, classical, thoughtful
- **Visual Metaphors**: Ancient Greek philosophy, marble columns, scrolls
- **Simplicity Spectrum**: Minimal interface to focus on the dialogue

### Color Strategy
- **Color Scheme Type**: Monochromatic with accent
- **Primary Color**: Deep blue (oklch(0.45 0.15 255)) representing wisdom, depth, and trust
- **Secondary Colors**: Lighter blue tints for UI elements
- **Accent Color**: Subtle gold/amber (oklch(0.8 0.15 85)) for highlights and key interactions
- **Color Psychology**: Blues promote thoughtfulness and calm reasoning; gold accents add a touch of classical wisdom
- **Color Accessibility**: All text meets WCAG AA standards with high contrast
- **Foreground/Background Pairings**:
  - Background (light blue-gray): oklch(0.98 0.02 240) with Foreground: oklch(0.25 0.04 255)
  - Card (white): oklch(1 0 0) with Card-Foreground: oklch(0.25 0.04 255)
  - Primary (deep blue): oklch(0.45 0.15 255) with Primary-Foreground: oklch(0.98 0.02 240)
  - Secondary (light blue): oklch(0.9 0.04 255) with Secondary-Foreground: oklch(0.3 0.05 255)
  - Accent (gold): oklch(0.8 0.15 85) with Accent-Foreground: oklch(0.2 0.02 80)
  - Muted (light gray): oklch(0.95 0.02 240) with Muted-Foreground: oklch(0.5 0.04 240)

### Typography System
- **Font Pairing Strategy**: Serif font for Socrates' messages to evoke classical philosophy; sans-serif for user messages and UI
- **Typographic Hierarchy**: Clear visual distinction between Socrates' questions and user responses
- **Font Personality**: Thoughtful, timeless, scholarly
- **Readability Focus**: Comfortable line length and spacing for extended dialogue
- **Typography Consistency**: Consistent font sizes and weights throughout the application
- **Which fonts**: "Playfair Display" (serif) for Socrates' messages, "Inter" (sans-serif) for user messages and UI
- **Legibility Check**: Both fonts highly legible at all planned sizes

### Visual Hierarchy & Layout
- **Attention Direction**: Chat bubbles differentiated by color and typography to distinguish roles
- **White Space Philosophy**: Generous spacing to give the conversation "room to breathe"
- **Grid System**: Simple single-column layout for the chat with fixed header and input area
- **Responsive Approach**: Full-height chat interface on desktop, scrollable on mobile
- **Content Density**: Low density to focus attention on the dialogue

### Animations
- **Purposeful Meaning**: Subtle fade-in for new messages to indicate the thoughtful pace of Socratic dialogue
- **Hierarchy of Movement**: Minimal animations focused only on message transitions
- **Contextual Appropriateness**: Gentle, contemplative animations that don't distract from the intellectual exchange

### UI Elements & Component Selection
- **Component Usage**: Chat bubbles, input field, buttons for new conversations
- **Component Customization**: Custom styled chat bubbles with distinct appearance for Socrates vs user
- **Component States**: Subtle hover effects, clear focus states for accessibility
- **Icon Selection**: Minimal icon usage - primarily for functional elements like "new conversation"
- **Component Hierarchy**: Chat interface as primary element, supporting controls secondary
- **Spacing System**: Consistent spacing using Tailwind's scale with focus on readability
- **Mobile Adaptation**: Full-width chat bubbles on smaller screens, reduced margins

### Visual Consistency Framework
- **Design System Approach**: Component-based design with reusable chat elements
- **Style Guide Elements**: Typography scale, color palette, spacing system
- **Visual Rhythm**: Consistent padding and spacing between message bubbles
- **Brand Alignment**: Classical Greek aesthetic subtly applied through color and typography

### Accessibility & Readability
- **Contrast Goal**: WCAG AA compliance for all text with high contrast between message types

## Edge Cases & Problem Scenarios
- **Potential Obstacles**: Users expecting direct answers may become frustrated
- **Edge Case Handling**: Clear onboarding explanation that Socrates only asks questions
- **Technical Constraints**: Ensure responsive design works on all device sizes

## Implementation Considerations
- **Scalability Needs**: Potential to add multiple conversation threads or team collaboration
- **Testing Focus**: User satisfaction with question quality and conversation flow
- **Critical Questions**: How to maintain contextual awareness through longer conversations?

## Reflection
- This approach is uniquely suited to internal ideation because it forces teams to think deeply and independently.
- We've assumed users will be patient with the Socratic method and won't demand direct answers.
- What would make this exceptional is the quality and intelligence of the questions, which should feel personalized and insightful.