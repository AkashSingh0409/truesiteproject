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
        safety: "safe"
    },
    "facebook.com": {
        name: "Facebook",
        description: "Facebook is a social media and social networking service owned by Meta Platforms.",
        founded: "February 4, 2004",
        founders: "Mark Zuckerberg, Eduardo Saverin, Andrew McCollum, Dustin Moskovitz, and Chris Hughes",
        headquarters: "Menlo Park, California, United States",
        safety: "safe"
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

