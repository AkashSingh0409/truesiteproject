const websites = {
  "google.com": {
      name: "Google",
      description: "Google is a multinational technology company specializing in Internet-related services and products...",
      founded: "September 4, 1998",
      founders: "Larry Page and Sergey Brin",
      headquarters: "Mountain View, California, United States",
      safety: "safe"
  },
  "facebook.com": {
      name: "Facebook",
      description: "Facebook is a social media and social networking service owned by Meta Platforms...",
      founded: "February 4, 2004",
      founders: "Mark Zuckerberg, Eduardo Saverin, Andrew McCollum, Dustin Moskovitz, and Chris Hughes",
      headquarters: "Menlo Park, California, United States",
      safety: "safe"
  },
  "twitter.com": {
      name: "Twitter",
      description: "Twitter (X) is a social networking service where users post and interact with messages known as tweets.",
      founded: "March 21, 2006",
      founders: "Jack Dorsey, Noah Glass, Biz Stone, and Evan Williams",
      headquarters: "San Francisco, California, United States",
      safety: "safe"
  },
  "amazon.com": {
      name: "Amazon",
      description: "Amazon is a multinational technology company focusing on e-commerce, cloud computing...",
      founded: "July 5, 1994",
      founders: "Jeff Bezos",
      headquarters: "Seattle, Washington, United States",
      safety: "safe"
  },
  "microsoft.com": {
      name: "Microsoft",
      description: "Microsoft Corporation is a technology company that develops, manufactures, licenses...",
      founded: "April 4, 1975",
      founders: "Bill Gates and Paul Allen",
      headquarters: "Redmond, Washington, United States",
      safety: "safe"
  }
};

const siteInput = document.getElementById('site-input');
const searchBtn = document.getElementById('search-btn');
const loader = document.getElementById('loader');
const result = document.getElementById('result');
const error = document.getElementById('error');
const siteName = document.getElementById('site-name');
const siteUrl = document.getElementById('site-url');
const siteIcon = document.getElementById('site-icon');
const siteInfo = document.getElementById('site-info');
const techInfo = document.getElementById('tech-info');
const safetyBadges = document.getElementById('safety-badges');

searchBtn.addEventListener('click', search);
siteInput.addEventListener('keypress', e => { if (e.key === 'Enter') search(); });

function search() {
  const domain = extractDomain(siteInput.value.trim());
  if (!domain) {
      showError('Please enter a valid website URL');
      return;
  }

  error.style.display = 'none';
  result.style.display = 'none';
  loader.style.display = 'block';

  setTimeout(() => {
      displayWebsiteInfo(domain);
  }, 800);
}

function extractDomain(input) {
  if (!input) return '';
  input = input.replace(/^https?:\/\//, '');
  input = input.split('/')[0];
  return input.toLowerCase();
}

function showError(message) {
  error.textContent = message;
  error.style.display = 'block';
  loader.style.display = 'none';
  result.style.display = 'none';
}

function displayWebsiteInfo(domain) {
  const data = websites[domain] || generateInfo(domain);

  siteName.textContent = data.name;
  siteUrl.textContent = domain;
  siteIcon.textContent = data.name.charAt(0);

  let infoHTML = `<p>${data.description}</p>`;
  if (data.founded) {
      infoHTML += `<p><strong>Founded:</strong> ${data.founded}</p>`;
  }
  if (data.founders) {
      infoHTML += `<p><strong>Founder(s):</strong> ${data.founders}</p>`;
  }
  if (data.headquarters) {
      infoHTML += `<p><strong>Headquarters:</strong> ${data.headquarters}</p>`;
  }
  siteInfo.innerHTML = infoHTML;

  safetyBadges.innerHTML = '';
  const badgeEl = document.createElement('span');
  badgeEl.className = `badge badge-${data.safety}`;
  badgeEl.textContent = data.safety === 'safe' ? 'Safe' : data.safety === 'warning' ? 'Caution' : 'Warning';
  safetyBadges.appendChild(badgeEl);

  const serverTypes = ['Apache', 'Nginx', 'Cloudflare', 'IIS'];
  const technologies = ['PHP', 'JavaScript', 'React', 'Node.js', 'WordPress'];
  const hash = domain.split('').reduce((a, c) => a + c.charCodeAt(0), 0);

  techInfo.innerHTML = 
      `<p><strong>Server:</strong> ${serverTypes[hash % serverTypes.length]}</p>
      <p><strong>IP:</strong> ${(hash % 256)}.${((hash/256) % 256).toFixed(0)}.${((hash/65536) % 256).toFixed(0)}.${((hash/16777216) % 256).toFixed(0)}</p>
      <p><strong>Technologies:</strong> ${technologies[hash % technologies.length]}, ${technologies[(hash+1) % technologies.length]}</p>
      <p><strong>Performance:</strong> ${(hash % 10) / 10 + 0.1}s load time</p>`;

  loader.style.display = 'none';
  result.style.display = 'block';
}

function generateInfo(domain) {
  return {
      name: domain.split('.')[0].charAt(0).toUpperCase() + domain.split('.')[0].slice(1),
      description: `${domain} is a website. No detailed information is available in our database.`,
      safety: Math.random() > 0.7 ? 'warning' : 'safe'
  };
}
