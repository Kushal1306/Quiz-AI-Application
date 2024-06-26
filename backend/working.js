working=()=>{
    const topic=req.query.text|| "India";
    console.log("Topic:", topic);
    const prompt2 = `You are a helpful AI assistant tasked with creating multiple-choice questions. Please generate 5 questions about ${topic} following these instructions:
  
  1. Start your response with a valid JSON opening: 
  2. For each question, provide:
     - The question text
     - Four answer options labeled a, b, c, and d
     - The correct answer letter
     - A brief explanation for the correct answer
  3. Format each question as a JSON object within the questions array
  4. End your response with a valid JSON closing:
  
  Remember to separate each question object with a comma, and do not include a comma after the last question. Ensure your entire response is valid JSON.
  `;
    const prompt = `You are a helpful AI assistant tasked with creating multiple-choice questions. Please generate 5 questions about ${topic}  following these instructions:
  
  1. Start your response with a valid JSON opening: 
  2. For each question, provide:
     - The question text
     - Four answer options labeled a, b, c, and d
     - The correct answer letter
     - A brief explanation for the correct answer
  3. Format each question as a JSON object within the questions array
  4. End your response with a valid JSON closing:
  
  Remember to separate each question object with a comma, and do not include a comma after the last question. Ensure your entire response is valid JSON.
  `;
  
    console.log("Prompt:", prompt);
  
    try {
      const response = await axios.post(
        "https://api.together.xyz/v1/completions",
        {
          model: "mistralai/Mixtral-8x7B-v0.1",
          prompt: prompt,
          max_tokens: 1500,
          stop:"]"
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.TOGETHER_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("the response is",response);
      console.log("the response data",response.data);
      // const responseData = response.data; // Extracting data from the Axios response
      // res.json(responseData); // Sending the response data back to the client
      let responseData = response.data.choices[0].text.trim();
      responseData +=']'
  
      console.log("the data is",responseData);
      const jsonStart = responseData.indexOf('[');
      const jsonEnd = responseData.lastIndexOf(']') + 1;
  
      if (jsonStart === -1 || jsonEnd === -1) {
        throw new Error("Invalid JSON response");
      }
  
      const jsonResponse = responseData.substring(jsonStart, jsonEnd);
  
      // Parse the JSON response to ensure it is valid
      const parsedData = JSON.parse(jsonResponse);
  
      res.json(parsedData); //
    } catch (error) {
      console.error("Error generating questions:", error.message);
      res.status(500).send("Error generating questions");
    }


}
