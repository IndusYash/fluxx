import {
  findKnowledgeAnswer,
  classifyQuery,
  OFF_TOPIC_RESPONSE,
} from '../src/components/chatbot/knowledge';

const testCases = [
  // Conversational
  { q: 'hi', expectedCat: 'GREETING' },
  { q: 'hello there', expectedCat: 'GREETING' },
  { q: 'thanks a lot', expectedCat: 'CLOSING' },
  { q: 'bye', expectedCat: 'CLOSING' },
  { q: 'who are you', expectedCat: 'IDENTITY' },
  { q: 'what can you do?', expectedCat: 'IDENTITY' },

  // FLUX On-topic
  { q: 'Tell me about FLUX', expectedCat: 'FLUX_TOPIC' },
  { q: 'What is the motto of FLUX?', expectedCat: 'FLUX_TOPIC' },
  { q: 'What are the upcoming events?', expectedCat: 'FLUX_TOPIC' },
  { q: 'Tell me about ByteBrawl', expectedCat: 'FLUX_TOPIC' },
  { q: 'What is the Ideathon flagship?', expectedCat: 'FLUX_TOPIC' },
  { q: 'How can I join the club?', expectedCat: 'FLUX_TOPIC' },
  { q: 'Who is the vice chancellor?', expectedCat: 'FLUX_TOPIC' },
  { q: 'Tell me about the faculty mentors', expectedCat: 'FLUX_TOPIC' },
  { q: 'What are the student wings?', expectedCat: 'FLUX_TOPIC' },
  { q: 'What is the She Leads initiative?', expectedCat: 'FLUX_TOPIC' },
  { q: 'Where is the FLUX office located?', expectedCat: 'FLUX_TOPIC' },
  { q: 'What is the official contact email?', expectedCat: 'FLUX_TOPIC' },
  { q: 'Tell me about CSED department and FLUX', expectedCat: 'FLUX_TOPIC' },
  { q: 'Can 1st year students join?', expectedCat: 'FLUX_TOPIC' },
  { q: 'What projects has FLUX worked on?', expectedCat: 'FLUX_TOPIC' },

  // Off-topic (MUST be rejected)
  { q: 'What is the capital of France?', expectedCat: 'OFF_TOPIC' },
  { q: 'Who is the President of the United States?', expectedCat: 'OFF_TOPIC' },
  { q: 'Who is Narendra Modi?', expectedCat: 'OFF_TOPIC' },
  { q: 'Write a python script to solve two sum', expectedCat: 'OFF_TOPIC' },
  { q: 'Can you help me write React code for a nav bar?', expectedCat: 'OFF_TOPIC' },
  { q: 'Tell me a funny joke', expectedCat: 'OFF_TOPIC' },
  { q: 'What is the weather in Mumbai?', expectedCat: 'OFF_TOPIC' },
  { q: 'How do I cook pasta?', expectedCat: 'OFF_TOPIC' },
  { q: 'What are upcoming events in Bollywood?', expectedCat: 'OFF_TOPIC' },
  { q: 'How can I join Google?', expectedCat: 'OFF_TOPIC' },
  { q: 'Who won the cricket match yesterday?', expectedCat: 'OFF_TOPIC' },
  { q: 'Solve this equation: 3x + 12 = 0', expectedCat: 'OFF_TOPIC' },
  { q: 'What is photosynthesis?', expectedCat: 'OFF_TOPIC' },
  { q: 'Can you do my physics homework?', expectedCat: 'OFF_TOPIC' },
  { q: 'How do I get into IIT Bombay?', expectedCat: 'OFF_TOPIC' },
  { q: 'Recommend a good horror movie', expectedCat: 'OFF_TOPIC' },
  { q: 'What is the distance between Earth and Mars?', expectedCat: 'OFF_TOPIC' },
];

let failed = 0;
console.log('--- RUNNING CLASSIFICATION AND RESPONSE TESTS ---');
for (const tc of testCases) {
  const cat = classifyQuery(tc.q);
  const ans = findKnowledgeAnswer(tc.q);

  if (cat !== tc.expectedCat) {
    console.error(`FAIL CATEGORY: "${tc.q}" -> got "${cat}", expected "${tc.expectedCat}"`);
    failed++;
    continue;
  }

  if (tc.expectedCat === 'OFF_TOPIC') {
    if (ans !== OFF_TOPIC_RESPONSE) {
      console.error(`FAIL OFF_TOPIC ANSWER: did not return OFF_TOPIC_RESPONSE for: "${tc.q}"`);
      failed++;
      continue;
    }
  } else if (tc.expectedCat === 'FLUX_TOPIC') {
    if (ans === OFF_TOPIC_RESPONSE) {
      console.error(`FAIL FLUX_TOPIC FALSE NEGATIVE: falsely rejected: "${tc.q}"`);
      failed++;
      continue;
    }
  }

  console.log(`[PASS] [${cat.padEnd(10)}] ${tc.q}`);
}

console.log('--------------------------------------------------');
console.log(`Total: ${testCases.length} | Passed: ${testCases.length - failed} | Failed: ${failed}`);
if (failed > 0) {
  process.exit(1);
} else {
  console.log('ALL GUARDRAIL TESTS PASSED PERFECTLY!');
}

