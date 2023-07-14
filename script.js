let open_response;
let chat = [
  { role: "user", content: "Hi" },
  { role: "assistant", content: "Hi, how i can help you today" },
];
async function chatUserAdd(feeling, question) {
  chat.push({
    role: "user",
    content:
      "My happiness from 0-10 is: " + feeling + ". My input is: " + question,
  });
}
async function chatAssistantAdd(rea) {
  chat.push({ role: "assistant", content: rea });
}
async function openai_test() {
  let url = "https://api.openai.com/v1/chat/completions";
  let part1 = "sk";
  let part2 = "-RAtWR9nJwrgLF6Ml4nwq";
  let part3 = "T3BlbkFJT5tJv54MBU4s9EEIghTq";

  let APIkey = part1 + part2 + part3;
  let data = {
    model: "gpt-3.5-turbo",
    messages: chat,
  };

  try {
    const Response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${APIkey}`,
      },
      body: JSON.stringify(data),
    });
    if (Response.ok) {
      const responeData = await Response.json();
      const massages = responeData.choices[0].message.content;
      chatAssistantAdd(massages);
      const speech = new SpeechSynthesisUtterance(massages);
      speechSynthesis.speak(speech);
      return massage;
    }
  } catch (error) {
    console.log("oopss an error:" + error);
  }
}
