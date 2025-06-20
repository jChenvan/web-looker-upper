# Web Looker Upper

**Web Looker Upper** is a web-scraping interface that searches the internet using provided keywords and data columns. It enables users to review, approve, and manage entries into a local database. Users can choose to discover new sources or search within a maintained set of current sources.

## Features

- Keyword-driven web scraping interface  
- Dual search mode: discover new sources or query existing ones  
- Review and approval pipeline for storing entries  
- URL management: add sources from search results to the monitored list  
- Data persistence via a local JSON file (to be replaced with a real database)  

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher recommended)

### Installation

```bash
git clone <repo-url>
cd <repo-directory>
npm install
```

### Run the App

```bash
npm run start
```

### Roadmap / TODO

- Replace dummy data with live AI-generated insights
- Migrate from JSON file storage to a full database (e.g., SQLite, PostgreSQL)
- Track the last search timestamp for each query or source
- Improve the user interface and user experience
- Expand system intelligence and relevance scoring
- Way to update keywords
- Additional enhancements and edge case handling
