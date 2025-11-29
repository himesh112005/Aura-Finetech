const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export const generateContent = async (prompt: string) => {
  if (!API_KEY) {
    return "Error: API Key is missing in .env file.";
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    const data = await response.json();
    
    if (data.error) {
      console.error("Gemini API Error:", data.error);
      return "I'm having trouble connecting to the AI service right now.";
    }

    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
      return data.candidates[0].content.parts[0].text;
    }
    
    return "No response generated.";
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "Sorry, something went wrong. Please check your connection.";
  }
};
