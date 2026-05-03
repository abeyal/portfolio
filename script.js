document.addEventListener('DOMContentLoaded', function() {
    fetchRepos();
});

async function fetchRepos() {
    try {
        const response = await fetch('https://api.github.com/users/abeyal/repos');
        const repos = await response.json();
        
        const reposList = document.getElementById('repos-list');
        
        if (repos.length === 0) {
            reposList.innerHTML = '<p>אין פרויקטים ציבוריים כרגע.</p>';
            return;
        }
        
        repos.forEach(repo => {
            const repoCard = document.createElement('div');
            repoCard.className = 'repo-card';
            
            repoCard.innerHTML = `
                <h3><a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>
                <p>${repo.description || 'אין תיאור'}</p>
                <p>שפת התכנות: ${repo.language || 'לא צוין'}</p>
                <p>כוכבים: ${repo.stargazers_count}</p>
            `;
            
            reposList.appendChild(repoCard);
        });
    } catch (error) {
        console.error('שגיאה בטעינת הפרויקטים:', error);
        document.getElementById('repos-list').innerHTML = '<p>שגיאה בטעינת הפרויקטים.</p>';
    }
}