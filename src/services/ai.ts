const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export interface AIInsight {
  title: string;
  message: string;
  type: 'alert' | 'opportunity' | 'tip' | 'warning';
}

// Mock data for fallback
const mockInsights: AIInsight[] = [
  { title: "Demo Mode", message: "Add valid API Key to .env to see real AI insights.", type: "warning" },
  { title: "Spending Alert", message: "Dining out expenses are 20% higher this week.", type: "alert" },
  { title: "Savings Opportunity", message: "Switching utility providers could save Rs 3,000/mo.", type: "opportunity" }
];

export const getGeminiInsights = async (financialContext: any): Promise<AIInsight[]> => {
  if (!API_KEY || API_KEY.includes('your_gemini_api_key')) {
    console.warn("Gemini API Key is missing or invalid.");
    return mockInsights;
  }

  try {
    const prompt = `
      You are AURA, a financial AI coach. Analyze this context: ${JSON.stringify(financialContext)}.
      Generate 3 short, actionable insights in a STRICT JSON array format.
      Example: [{"title": "Save More", "message": "Cut coffee costs.", "type": "tip"}]
      IMPORTANT: Output ONLY the JSON array. Do not use markdown code blocks.
    `;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    );

    if (!response.ok) throw new Error(`API Error: ${response.statusText}`);

    const data = await response.json();
    let textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || "[]";
    
    // Robust parsing: Extract JSON array from potential markdown text
    const jsonMatch = textResponse.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      textResponse = jsonMatch[0];
    }

    return JSON.parse(textResponse);
  } catch (error) {
    console.error("AI Insight Error:", error);
    return mockInsights;
  }
};

export const chatWithGemini = async (message: string): Promise<string> => {
  if (!API_KEY || API_KEY.includes('your_gemini_api_key')) {
    return "I cannot connect to the brain. Please check your VITE_GEMINI_API_KEY in the .env file.";
  }

  try {
    const prompt = `
      You are AURA, an advanced AI Insight Bot specialized in financial analysis and market intelligence.
      
      Your core capabilities are:
      1. Price Analysis: Analyze pricing trends and identify value.
      2. Comparison: Compare similar products, services, or stocks to find the best option (use bullet points).
      3. Market Data: Break down complex market concepts and trends into clear insights.
      4. Recommendations: Provide data-driven financial advice.

      Context: The user is asking for insights. Use your internal knowledge base to provide the best possible estimates, historical context, and general principles. If specific real-time data is unavailable, provide the most recent reliable context and general trends.
      
      Keep answers concise, professional, and actionable.
      
      User: ${message}
    `;
    
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    );

    if (!response.ok) throw new Error("Network response was not ok");

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm having trouble thinking right now.";
  } catch (error) {
    console.error("Chat Error:", error);
    return "Sorry, I'm having trouble connecting to the server.";
  }
};

export const getIncomeForecast = async (timeframe: string, stream: string): Promise<any> => {
  // Mock data for fallback
  const mockForecast = {
    forecastAmount: timeframe === '30d' ? 4250 : 12800,
    volatilePeriod: timeframe === '30d' ? "Oct 24 - Nov 5" : "Nov 15 - Dec 10",
    primaryDriver: stream === 'all' ? "Seasonal Slowdown" : "Client Project Delay",
    factors: [
      { icon: "📅", title: "Holiday Demand", desc: "Increased activity expected around Thanksgiving." },
      { icon: "🌧️", title: "Weather Patterns", desc: "Rainy forecasts may increase delivery demand." },
      { icon: "🏙️", title: "Local Events", desc: "Tech Summit in Nov will boost gig work." }
    ],
    recommendations: [
      { type: "green-glow", icon: "📍", title: "Focus on Delivery Gigs", desc: "Bad weather forecast for Oct 28-31 will likely boost demand." },
      { type: "yellow-glow", icon: "⚠️", title: "Save an Extra Rs 150", desc: "Prepare for the expected income dip in early November." },
      { type: "red-glow", icon: "🛑", title: "Alert: Low Demand Period", desc: "Consider taking time off or working on other projects Nov 6-12." }
    ]
  };

  if (!API_KEY || API_KEY.includes('your_gemini_api_key')) {
    return mockForecast;
  }

  try {
    const prompt = `
      Act as a financial AI. Predict income for a freelancer for the timeframe: "${timeframe}" considering stream: "${stream}".
      Return a STRICT JSON object with these keys:
      - forecastAmount (number)
      - volatilePeriod (string, e.g. "Date - Date")
      - primaryDriver (string, short reason)
      - factors (array of 3 objects with keys: icon (emoji), title, desc)
      - recommendations (array of 3 objects with keys: type (string: "green-glow"|"yellow-glow"|"red-glow"), icon (emoji), title, desc)
      Do not include markdown formatting.
    `;
    
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    );
    
    if (!response.ok) throw new Error("API Error");
    const data = await response.json();
    let text = data.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) text = jsonMatch[0];
    
    return JSON.parse(text);
  } catch (e) {
    console.error("Income Forecast Error:", e);
    return mockForecast;
  }
};

export const getGoalStrategy = async (goals: any[]): Promise<any> => {
  // Mock data
  const mockStrategy = {
    title: 'Accelerate "Emergency Fund"',
    message: 'Based on your spending habits, if you cut "Dining Out" by 15%, you could reach this goal <strong>2 months early</strong>.',
    milestone: {
      title: 'Reach Rs 7,000 in Emergency Fund',
      desc: 'You are only Rs 500 away! Projected to hit this by next Friday.'
    }
  };

  if (!API_KEY || API_KEY.includes('your_gemini_api_key')) {
    return mockStrategy;
  }

  try {
    const prompt = `
      Analyze these financial goals: ${JSON.stringify(goals)}.
      Suggest one specific strategy to accelerate the highest priority or closest-to-completion goal.
      Return a STRICT JSON object with:
      - title (string)
      - message (string, keep it short, use <strong> for emphasis)
      - milestone (object with title and desc)
      Do not use markdown code blocks.
    `;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    );

    if (!response.ok) throw new Error("API Error");
    const data = await response.json();
    let text = data.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) text = jsonMatch[0];

    return JSON.parse(text);
  } catch (e) {
    console.error("Goal Strategy Error:", e);
    return mockStrategy;
  }
};

export const getOpportunities = async (query: string): Promise<any[]> => {
  // Mock data
  const mockOpportunities = [
    {
      id: '1',
      title: "Weekend Event Photographer",
      category: "Creative",
      tags: ["Photography", "Weekend"],
      projectedIncome: "Rs 15,000",
      effort: "Medium",
      skills: "Photography, Photo Editing",
      roadmap: ["Build Your Portfolio", "Set Your Pricing", "Market on Social Media"],
      insight: "Our AI notes a 30% increase in demand for event photographers in your area this season."
    },
    {
      id: '2',
      title: "Furniture Assembly Pro",
      category: "Labor",
      tags: ["Physical", "Flexible"],
      projectedIncome: "Rs 10,000",
      effort: "Low",
      skills: "Basic Tools, Assembly",
      roadmap: ["Register on TaskRabbit", "Get Basic Tools", "Complete First Task"],
      insight: "High demand on weekends. Quick way to start earning."
    },
    {
      id: '3',
      title: "Invest in Tata Motors",
      category: "Investment",
      tags: ["Stock", "Long-term"],
      projectedIncome: "+12% Annual",
      effort: "Passive",
      skills: "Capital, Patience",
      roadmap: ["Open Demat Account", "Analyze Fundamentals", "Buy on Dip"],
      insight: "EV market share expansion suggests strong future growth potential."
    }
  ];

  if (!API_KEY || API_KEY.includes('your_gemini_api_key')) {
    return mockOpportunities.filter(o => o.title.toLowerCase().includes(query.toLowerCase()) || query === '');
  }

  try {
    const prompt = `
      Suggest 3 financial opportunities (side hustles or specific stock investments) for a user.
      Search query: "${query}".
      Include at least one stock recommendation if relevant or if query is empty.
      Return a STRICT JSON array of objects with keys:
      - id (string)
      - title (string)
      - category (string)
      - tags (array of strings)
      - projectedIncome (string, e.g. "Rs 5000")
      - effort (string: Low/Medium/High)
      - skills (string)
      - roadmap (array of 3 strings)
      - insight (string)
      Do not use markdown.
    `;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    );

    if (!response.ok) throw new Error("API Error");
    const data = await response.json();
    let text = data.candidates?.[0]?.content?.parts?.[0]?.text || "[]";
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (jsonMatch) text = jsonMatch[0];

    return JSON.parse(text);
  } catch (e) {
    console.error("Opportunities Error:", e);
    return mockOpportunities;
  }
};

export const getSpendingPredictions = async (timeframe: string): Promise<any> => {
  // Mock data
  const mockPrediction = {
    total: timeframe === '30d' ? "Rs 24,500" : "Rs 72,000",
    variance: timeframe === '30d' ? "+5% vs Avg" : "+2% vs Avg",
    risk: "Low",
    confidence: "94%",
    largeExpenses: [
      { date: "12 Nov", title: "Car Insurance", type: "Recurring Annual", amount: "~Rs 6,500" },
      { date: "18 Nov", title: "Holiday Shopping", type: "Pattern Detected", amount: "~Rs 3,000" }
    ],
    forecast: "Based on your social calendar and seasonal trends, expect a spending spike around mid-November."
  };

  if (!API_KEY || API_KEY.includes('your_gemini_api_key')) {
    return mockPrediction;
  }

  try {
    const prompt = `
      Predict future spending for a user for the next "${timeframe}".
      Return a STRICT JSON object with:
      - total (string, e.g. "Rs 25,000")
      - variance (string, e.g. "+5% vs Avg")
      - risk (string: Low/Medium/High)
      - confidence (string, e.g. "90%")
      - largeExpenses (array of objects with date, title, type, amount)
      - forecast (string, short AI insight)
      Do not use markdown.
    `;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    );

    if (!response.ok) throw new Error("API Error");
    const data = await response.json();
    let text = data.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) text = jsonMatch[0];

    return JSON.parse(text);
  } catch (e) {
    console.error("Prediction Error:", e);
    return mockPrediction;
  }
};
