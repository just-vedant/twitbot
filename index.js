require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { TwitterApi } = require('twitter-api-v2')
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);
const cron = require('node-cron');
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const keep_alive = require('./keep_alive')
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(process.env.NEWS_API);

const today = new Date();
var postwit;
// Get yesterday's date by subtracting 1 day from today
const yesterday = new Date(today);
yesterday.setDate(today.getDate() - 2);
today.setDate(today.getDate() - 1);

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const from = formatDate(yesterday);
const to = formatDate(today);

let articles = [];
// To query sources
// All options are optional
newsapi.v2.everything({
  domains: 'bbc.co.uk, techcrunch.com,timesofindia.indiatimes.com,bombaytimes.com',
  language: 'en',
  from:from,
  to:to,
  pageSize:8,
  page:2
}).then(response => {
  articles = response.articles;
  imageurl = articles.map(articles => articles.url)
  const prompt = `I'm making a twitter bot to give a summary of todays news in detail, I have provided the Articles along with the content of the article. Format it for a Twitter post.The Artices are as follows ${articles.map(article => `${article.title} - ${article.description} - ${article.content}`).join(' , ')}. Make sure the tweet is within 120 characters as beyond this the tweet cannot be posted.Do not give any options extra I need the response to be less than the specified characters.Provide the tweet directly as it is directly going to be used.`;

  generateContent(prompt).then(post => {
    postwit = post
    console.log(post);
  }).catch(error => {
    console.error("Error generating content:", error);
  });
});




async function generateContent(prompt) {
  try {
      const result = await model.generateContent(prompt);
      return result.response.text();
  } catch (error) {
      console.error("Error generating content:", error);
  }
}



const client = new TwitterApi({
  clientId: process.env.ClientID,
  clientSecret: process.env.ClientSecret,
  appKey:process.env.AppKey,
  appSecret:process.env.AppSecret,
  accessToken: process.env.AccessToken,
  accessSecret: process.env.AccessSecret,
});

async function postTweet(text) {
  try {
      const tweet = await client.v2.tweet(text);
      console.log('Tweet posted successfully:', tweet);
  } catch (error) {
      console.error('Error posting tweet:', error);
  }
}

cron.schedule('0 6 * * *', () => { // 6 AM daily UTC
   
  postTweet(postwit);// Your existing tweet logic
});
