import { useState, useRef, useEffect } from "react";
import { useKV } from "@github/spark/hooks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash, Plus } from "@phosphor-icons/react";

type Message = {
  id: string;
  content: string;
  sender: "user" | "socrates";
  timestamp: number;
};

type Conversation = {
  id: string;
  title: string;
  messages: Message[];
  createdAt: number;
};

function App() {
  const [conversations, setConversations] = useKV<Conversation[]>("socrates-conversations", []);
  const [activeConversationId, setActiveConversationId] = useKV<string | null>("socrates-active-conversation", null);
  const [inputValue, setInputValue] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Get the active conversation or create a new one if none exists
  const activeConversation = conversations.find(c => c.id === activeConversationId) || 
    (conversations.length > 0 ? conversations[0] : null);
  
  // Create a new conversation
  const createNewConversation = () => {
    const newId = crypto.randomUUID();
    const newConversation: Conversation = {
      id: newId,
      title: "New Discussion",
      messages: [{
        id: crypto.randomUUID(),
        content: "What is the main challenge or opportunity you're exploring?",
        sender: "socrates",
        timestamp: Date.now()
      }],
      createdAt: Date.now()
    };
    
    setConversations(current => [newConversation, ...current]);
    setActiveConversationId(newId);
  };
  
  // If there are no conversations, create one when the app loads
  useEffect(() => {
    if (conversations.length === 0) {
      createNewConversation();
    } else if (!activeConversationId || !conversations.find(c => c.id === activeConversationId)) {
      setActiveConversationId(conversations[0].id);
    }
  }, [conversations, activeConversationId]);
  
  // Scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeConversation?.messages]);
  
  // Delete a conversation
  const deleteConversation = (id: string) => {
    setConversations(current => current.filter(c => c.id !== id));
    if (activeConversationId === id && conversations.length > 1) {
      const remainingConversations = conversations.filter(c => c.id !== id);
      setActiveConversationId(remainingConversations[0].id);
    }
  };
  
  // Update conversation title based on first user message
  const updateConversationTitle = (conversationId: string, title: string) => {
    setConversations(current => 
      current.map(c => c.id === conversationId ? {...c, title: title.substring(0, 30)} : c)
    );
  };
  
  // Generate a Socratic response
  const generateSocraticResponse = async (userMessage: string, conversationHistory: Message[]) => {
    setIsThinking(true);
    
    try {
      // Create a prompt based on the conversation history
      const historyContext = conversationHistory
        .map(msg => `${msg.sender.toUpperCase()}: ${msg.content}`)
        .join("\n");
      
      const prompt = spark.llmPrompt`
      You are Socrates, a wise, curious, and relentless questioner. Your purpose is to lead users to discover insights through questioning.
      Rules:
      - NEVER answer questions directly or offer your own opinions, solutions, or conclusions.
      - ONLY ask clear, targeted, open-ended questions that encourage deeper reflection.
      - Draw out contradictions, inconsistencies, or unexplored alternatives in the user's reasoning.
      - Focus on guiding the user to clarity, not agreement.
      - Be concise but intellectually sharp.
      - Your tone should be thoughtful, probing, but always respectful and constructive.
      - Ask only ONE or TWO questions per response.
      - Keep your responses fairly brief - under 100 words.

      Here is the conversation history:
      ${historyContext}

      USER: ${userMessage}

      Generate ONLY Socrates' next response. Start directly with your question.
      `;
      
      const response = await spark.llm(prompt);
      return response.trim();
      
    } catch (error) {
      console.error("Error generating response:", error);
      return "What led you to that conclusion? (An error occurred, but I'll continue our dialogue.)";
    } finally {
      setIsThinking(false);
    }
  };
  
  // Handle sending a message
  const handleSendMessage = async () => {
    if (!inputValue.trim() || !activeConversation) return;
    
    const userMessageContent = inputValue.trim();
    setInputValue("");
    
    // Add user message to conversation
    const userMessage: Message = {
      id: crypto.randomUUID(),
      content: userMessageContent,
      sender: "user",
      timestamp: Date.now()
    };
    
    // Update conversation with user message
    const updatedConversation = {
      ...activeConversation,
      messages: [...activeConversation.messages, userMessage]
    };
    
    setConversations(current => 
      current.map(c => c.id === activeConversation.id ? updatedConversation : c)
    );
    
    // If this is the first user message, update the conversation title
    if (activeConversation.messages.length === 1) {
      updateConversationTitle(activeConversation.id, userMessageContent);
    }
    
    // Generate and add Socrates' response
    const socratesResponse = await generateSocraticResponse(
      userMessageContent, 
      updatedConversation.messages
    );
    
    const socratesMessage: Message = {
      id: crypto.randomUUID(),
      content: socratesResponse,
      sender: "socrates",
      timestamp: Date.now()
    };
    
    setConversations(current => 
      current.map(c => c.id === activeConversation.id ? {
        ...c,
        messages: [...updatedConversation.messages, socratesMessage]
      } : c)
    );
  };
  
  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-border p-4">
        <div className="flex items-center">
          <h1 className="text-2xl font-playfair font-semibold text-primary">Socrates</h1>
          <span className="ml-2 text-sm text-muted-foreground">No answers. Only questions.</span>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="flex items-center gap-1" 
          onClick={createNewConversation}
        >
          <Plus size={16} weight="bold" />
          <span>New Discussion</span>
        </Button>
      </header>
      
      {/* Socratic Method explanation */}
      <div className="bg-secondary/20 p-4 border-b border-border">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm text-foreground/90 font-inter">
            The <span className="font-medium">Socratic Method</span> is a form of cooperative dialogue where questions are used to stimulate critical thinking 
            and draw out ideas. Rather than providing answers, it helps people discover insights by examining their own beliefs and reasoning. 
            This method is remarkably effective because knowledge earned through self-discovery creates deeper understanding 
            and stronger ownership of ideas than knowledge simply delivered through instruction.
          </p>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 border-r border-border p-2 overflow-y-auto hidden md:block">
          <div className="flex flex-col gap-1">
            {conversations.map(conversation => (
              <div 
                key={conversation.id}
                className={`flex items-center justify-between rounded-md p-2 cursor-pointer hover:bg-secondary/20 group ${activeConversation?.id === conversation.id ? 'bg-secondary/20' : ''}`}
                onClick={() => setActiveConversationId(conversation.id)}
              >
                <div className="truncate flex-1 text-sm">{conversation.title}</div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="opacity-0 group-hover:opacity-100 h-6 w-6" 
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteConversation(conversation.id);
                  }}
                >
                  <Trash size={14} />
                </Button>
              </div>
            ))}
          </div>
        </div>
        
        {/* Chat area */}
        <div className="flex-1 flex flex-col">
          {activeConversation ? (
            <>
              {/* Messages */}
              <div className="flex-1 p-4 overflow-y-auto">
                <div className="max-w-3xl mx-auto space-y-6">
                  {activeConversation.messages.map((message) => (
                    <div 
                      key={message.id} 
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`max-w-[85%] rounded-xl p-4 ${
                          message.sender === 'user' 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-card border border-border shadow-sm'
                        }`}
                      >
                        <p className={`${
                          message.sender === 'socrates' 
                            ? 'font-playfair' 
                            : 'font-inter'
                        }`}>
                          {message.content}
                        </p>
                      </div>
                    </div>
                  ))}
                  {isThinking && (
                    <div className="flex justify-start">
                      <div className="max-w-[85%] rounded-xl p-4 bg-card border border-border shadow-sm">
                        <p className="font-playfair text-muted-foreground">Thinking...</p>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </div>
              
              {/* Input area */}
              <div className="border-t border-border p-4">
                <div className="max-w-3xl mx-auto flex gap-2">
                  <Input
                    placeholder="Share your thoughts or ideas..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    className="flex-1"
                    disabled={isThinking}
                  />
                  <Button 
                    onClick={handleSendMessage} 
                    disabled={!inputValue.trim() || isThinking}
                  >
                    Send
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <h2 className="text-xl font-medium mb-2">No conversation selected</h2>
                <Button onClick={createNewConversation}>Start a new discussion</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;