#!/bin/bash

# Create news directory if it doesn't exist
mkdir -p ~/ai-pulse/news

# Fetch the news using the NewsAPI directly
API_KEY="fda8a0a3765d4e6d8678c9699b48023e"
FROM_DATE=$(date -v-24H +%Y-%m-%d)
echo "Fetching news from $FROM_DATE"
RESPONSE=$(curl -s "https://newsapi.org/v2/everything?q=artificial%20intelligence%20OR%20machine%20learning%20OR%20AI&from=$FROM_DATE&sortBy=relevancy&language=en&apiKey=$API_KEY")

# Create HTML file with news
cat > ~/ai-pulse/news/digest.html << EOL
<!DOCTYPE html>
<html>
<head>
    <title>AI News Digest</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, sans-serif;
            max-width: 800px;
            margin: 40px auto;
            padding: 20px;
            background: #f5f5f7;
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
        }
        .article {
            background: white;
            padding: 20px;
            margin-bottom: 20px;
            border-radius: 10px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .article h2 {
            margin-top: 0;
            color: #1d1d1f;
        }
        .article a {
            color: #0066cc;
            text-decoration: none;
        }
        .article a:hover {
            text-decoration: underline;
        }
        .meta {
            color: #666;
            font-size: 0.9em;
            margin-top: 10px;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>AI News Digest</h1>
        <p>Top AI stories for $(date '+%B %d, %Y')</p>
    </div>
EOL

# Add articles to HTML
echo $RESPONSE | jq -r '.articles[0:3] | .[] | "<div class=\"article\"><h2>\(.title)</h2><p>\(.description)</p><div class=\"meta\"><a href=\"\(.url)\" target=\"_blank\">Read more</a> • \(.source.name)</div></div>"' >> ~/ai-pulse/news/digest.html

# Close HTML file
echo "</body></html>" >> ~/ai-pulse/news/digest.html

# Open in default browser
echo "Opening news digest..."
open ~/ai-pulse/news/digest.html 