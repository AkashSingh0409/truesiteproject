const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Sample website database
const websites = {
    "google.com": {
        name: "Google",
        description: "Google is a multinational technology company specializing in Internet-related services and products.",
        founded: "September 4, 1998",
        founders: "Larry Page and Sergey Brin",
        headquarters: "Mountain View, California, United States",
        safety: "safe",
        history: "Google was founded in 1998 by Larry Page and Sergey Brin while they were Ph.D. students at Stanford University. The company's mission is to organize the world's information and make it universally accessible and useful.",
        features: [
            "Search Engine",
            "Gmail",
            "Google Maps",
            "Google Drive",
            "YouTube",
            "Android OS",
            "Chrome Browser",
            "Google Cloud"
        ],
        technologies: ["BigQuery", "TensorFlow", "Kubernetes", "Flutter", "Angular"],
        marketShare: "92.47% of global search engine market",
        employees: "156,500+ (2023)",
        revenue: "$282.8 billion (2023)",
        notableAchievements: [
            "Revolutionized internet search with PageRank algorithm",
            "Created Android, the world's most popular mobile OS",
            "Developed self-driving car technology",
            "Pioneered cloud computing services"
        ]
    },
    "facebook.com": {
        name: "Facebook",
        description: "Facebook is a social media and social networking service owned by Meta Platforms.",
        founded: "February 4, 2004",
        founders: "Mark Zuckerberg, Eduardo Saverin, Andrew McCollum, Dustin Moskovitz, and Chris Hughes",
        headquarters: "Menlo Park, California, United States",
        safety: "safe",
        history: "Facebook was launched in 2004 by Mark Zuckerberg and his college roommates. Originally called 'TheFacebook', it started as a social network for Harvard students before expanding to other universities and eventually the general public.",
        features: [
            "News Feed",
            "Messenger",
            "Groups",
            "Events",
            "Marketplace",
            "Stories",
            "Live Video",
            "Watch"
        ],
        technologies: ["React", "GraphQL", "Hack", "HHVM", "React Native"],
        marketShare: "2.91 billion monthly active users (2023)",
        employees: "77,000+ (2023)",
        revenue: "$134.9 billion (2023)",
        notableAchievements: [
            "Revolutionized social networking",
            "Acquired Instagram and WhatsApp",
            "Pioneered social media advertising",
            "Developed Oculus VR technology"
        ]
    },
    "twitter.com": {
        name: "Twitter",
        description: "Twitter (X) is a social networking service where users post and interact with messages known as tweets.",
        founded: "March 21, 2006",
        founders: "Jack Dorsey, Noah Glass, Biz Stone, and Evan Williams",
        headquarters: "San Francisco, California, United States",
        safety: "safe",
        history: "Twitter was created in 2006 by Jack Dorsey, Noah Glass, Biz Stone, and Evan Williams. The platform was initially developed as a side project within Odeo, a podcasting company.",
        features: [
            "Tweets",
            "Retweets",
            "Likes",
            "Follows",
            "Trends",
            "Lists",
            "Spaces",
            "Bookmarks"
        ],
        technologies: ["Ruby on Rails", "Scala", "Java", "JavaScript", "Python"],
        marketShare: "556 million monthly active users (2023)",
        employees: "1,500+ (2023)",
        revenue: "$4.4 billion (2023)",
        notableAchievements: [
            "Revolutionized real-time information sharing",
            "Created the hashtag phenomenon",
            "Influenced global political discourse",
            "Pioneered microblogging"
        ]
    }
};

app.get('/api/site-info', (req, res) => {
    try {
        const url = req.query.url;
        if (!url) {
            return res.status(400).json({ error: 'URL is required' });
        }

        // Extract domain from URL
        const domain = url.replace(/^https?:\/\//, '').split('/')[0].toLowerCase();
        
        // Check if we have data for this domain
        const siteData = websites[domain];
        
        if (siteData) {
            // Add technical information
            const techInfo = {
                server: "Apache",
                ip: "142.250.185.78",
                technologies: ["React", "Node.js"],
                performance: "0.8s"
            };
            
            res.json({
                ...siteData,
                ...techInfo
            });
        } else {
            // Generate generic info for unknown sites
            res.json({
                name: domain.split('.')[0].charAt(0).toUpperCase() + domain.split('.')[0].slice(1),
                description: `${domain} is a website. No detailed information is available in our database.`,
                safety: Math.random() > 0.7 ? "warning" : "safe",
                server: "Unknown",
                ip: "0.0.0.0",
                technologies: ["Unknown"],
                performance: "Unknown"
            });
        }
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

