# Twitter News Bot  

This is a Node.js Twitter bot that summarizes daily news from various sources like BBC, TechCrunch, Times of India, and Bombay Times. It generates concise tweets using Google Generative AI and posts them on Twitter daily at 6 AM UTC. The bot is hosted on Render and uses an external cron job to keep the server running every 15 minutes.  

---

## Features  
- Fetches news articles from trusted sources using NewsAPI.  
- Summarizes news articles into concise tweets (within 120 characters) using Google Generative AI.  
- Posts tweets daily at 6 AM UTC using the Twitter API.  
- Hosted on Render with an external cron job to maintain uptime.  

---

## Technologies Used  
- Node.js  
- Google Generative AI (`@google/generative-ai`)  
- Twitter API (`twitter-api-v2`)  
- NewsAPI  
- Node-cron for scheduling tweets  
- Render for hosting  

---

## Prerequisites  
Make sure you have the following:  
- Node.js installed on your machine  
- NewsAPI Key  
- Google Generative AI API Key  
- Twitter Developer Account with necessary API keys  

---

## Installation  

1. Clone the repository:  
```bash
git clone https://github.com/your-username/twitter-news-bot.git
cd twitter-news-bot
```

2. Install dependencies:  
```bash
npm install
```

3. Create a `.env` file in the root directory and add the following:  
```
GOOGLE_AI_API_KEY=your_google_ai_api_key
NEWS_API=your_news_api_key
ClientID=your_twitter_client_id
ClientSecret=your_twitter_client_secret
AppKey=your_twitter_app_key
AppSecret=your_twitter_app_secret
AccessToken=your_twitter_access_token
AccessSecret=your_twitter_access_secret
```

---

## Usage  
1. Run the bot locally:  
```bash
node index.js
```

2. The bot is scheduled to:  
   - Fetch news from the last 24 hours.  
   - Summarize the news using Google Generative AI.  
   - Post the summary on Twitter at 6 AM UTC daily.  

---

## Deployment  
This bot is hosted on Render. To deploy:  
- Link your GitHub repository to Render.  
- Set up environment variables in the Render dashboard.  
- Use an external cron job to ping the server every 15 minutes to keep it active.  

---

## Scheduling and Automation  
- The bot uses `node-cron` to schedule tweets.  
- Scheduled to post at 6 AM UTC daily:  
```js
cron.schedule('0 6 * * *', () => { 
  postTweet(postwit);
});
```

---

## Acknowledgments  
- [Google Generative AI](https://developers.generative-ai.google/) for content generation.  
- [NewsAPI](https://newsapi.org/) for fetching news articles.  
- [Twitter API](https://developer.twitter.com/en/docs) for posting tweets.  

---

## License  
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.  

---

## Author  
- **Your Name** - [Your GitHub Profile](https://github.com/your-username)  

---

## Contributing  
Pull requests are welcome. For significant changes, please open an issue first to discuss what you would like to change.  

---

Feel free to customize the placeholders (like `your-username`, `your_google_ai_api_key`, etc.) with your specific details. If you need any modifications, let me know!
