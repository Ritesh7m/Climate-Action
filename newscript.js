
window.addEventListener('beforeunload', () => {
    sessionStorage.setItem('scrollPosition', window.scrollY);
    sessionStorage.setItem('mode', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
});

window.addEventListener('load', () => {
    const scrollPosition = sessionStorage.getItem('scrollPosition');
    const mode = sessionStorage.getItem('mode');

    if (scrollPosition) {
        window.scrollTo(0, parseInt(scrollPosition));
    }

    if (mode === 'dark') {
        document.body.classList.add('dark-mode');
        document.getElementById('sun-icon').style.display = 'none';
        document.getElementById('moon-icon').style.display = 'inline';
    } else {
        document.body.classList.remove('dark-mode');
        document.getElementById('sun-icon').style.display = 'inline';
        document.getElementById('moon-icon').style.display = 'none';
    }

    // Hide preloader when everything is loaded
    $('.js-preloader').delay(500).fadeOut(500);
});




document.addEventListener('DOMContentLoaded', () => {
    const API_KEY = 'f9f2bb8865404bf4b7d7f29af4e8eb30'; // NewsAPI key
    const NEWS_URL = `https://newsapi.org/v2/everything?q=reforestation+climate+change&sortBy=publishedAt&apiKey=${API_KEY}`;
    const ELECTION_URL = `https://newsapi.org/v2/everything?q=climate+change&sortBy=publishedAt&apiKey=${API_KEY}`;
    const displayedArticles = new Set();
    let electionHeadlines = [];

    // Fetch news articles related to climate change and display them
    const fetchNews = async () => {
        try {
            const response = await fetch(NEWS_URL);
            const data = await response.json();
            displayNews(data.articles);
        } catch (error) {
            console.error('Error fetching news:', error);
        }
    };

    // Fetch election-related headlines and initialize the headline display
    const fetchElectionHeadlines = async () => {
        try {
            const response = await fetch(ELECTION_URL);
            const data = await response.json();
            electionHeadlines = data.articles
                .filter(article => article.title.toLowerCase().includes('climate change'))
                .map(article => ({ title: article.title, url: article.url })); // Extract headlines and URLs
            displayInitialHeadline();
        } catch (error) {
            console.error('Error fetching election headlines:', error);
        }
    };

    // Display the news articles on the page
    const displayNews = (articles) => {
        const storiesGrid = document.getElementById('stories-grid');

        articles.forEach(article => {
            const uniqueArticleIdentifier = `${article.title}-${article.source.name}`;
            if (!article.urlToImage || displayedArticles.has(uniqueArticleIdentifier)) {
                return; // Skip if no image or article already displayed
            }

            const storyElement = document.createElement('a');
            storyElement.classList.add('story');
            storyElement.href = article.url;
            storyElement.target = '_blank';

            const imageUrl = article.urlToImage || 'https://via.placeholder.com/150';
            const description = article.description || 'No description available';

            storyElement.innerHTML = `
                <img src="${imageUrl}" alt="${article.title}">
                <h3>${article.title}</h3>
                <p>${description}</p>
                <p><strong>${article.source.name}</strong></p>
                <p>${new Date(article.publishedAt).toLocaleDateString()}</p>
            `;

            storiesGrid.appendChild(storyElement);
            displayedArticles.add(uniqueArticleIdentifier);
        });
    };

    // Display the initial headline immediately on page load
    const displayInitialHeadline = () => {
        const headlineBtn = document.querySelector('.headline-imp');
        if (electionHeadlines.length > 0) {
            headlineBtn.textContent = electionHeadlines[0].title; // Display the first headline immediately
            headlineBtn.dataset.url = electionHeadlines[0].url; // Set the link to the article
            shuffleHeadlines(); // Start shuffling the headlines
        }
    };

    // Shuffle headlines every 6 seconds
    const shuffleHeadlines = () => {
        const headlineBtn = document.querySelector('.headline-imp');
        let index = 0;

        setInterval(() => {
            index = (index + 1) % electionHeadlines.length;
            headlineBtn.textContent = electionHeadlines[index].title;
            headlineBtn.dataset.url = electionHeadlines[index].url;
        }, 6000); // Every 6 seconds
    };

    // Set up event listeners and fetch data
    const donateButton = document.querySelector('.donate-btn');
    donateButton.addEventListener('click', () => {
        alert('Thank you for considering a donation!');
    });

    const modeButton = document.getElementById('mode-btn');
    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');

    modeButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        if (document.body.classList.contains('dark-mode')) {
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'inline';
        } else {
            sunIcon.style.display = 'inline';
            moonIcon.style.display = 'none';
        }
    });

    const returnToTopButton = document.getElementById('return-to-top');
    returnToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    const headlineBtn = document.querySelector('.headline-imp');
    headlineBtn.addEventListener('click', () => {
        const url = headlineBtn.dataset.url;
        if (url) {
            window.open(url, '_blank');
        }
    });

    // Initial data fetch
    fetchNews();
    fetchElectionHeadlines();

    // Refresh news every 12 hours
    setInterval(fetchNews, 12 * 60 * 60 * 1000);
    // Refresh news every 2 minutes
    // setInterval(fetchNews, 1 * 60 * 1000);
    // Refresh news every 10 seconds
    // setInterval(fetchNews, 10 * 1000);
}); 


//<!----------------------------------------------------------------------------------------------------------------------->
