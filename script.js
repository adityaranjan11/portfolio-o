document.addEventListener('DOMContentLoaded', () => {
    const username = 'adityaranjan11'; // Replace with your GitHub username
    const apiUrl = `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`; // Fetches up to 100 repos, sorted by recent updates
    const projectList = document.getElementById('project-list');

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                projectList.innerHTML = '<p>Error loading projects. Check your username or API limits.</p>';
                return;
            }

            data.forEach(repo => {
                // Check if repo is "deployed" (has a homepage or topic "deployed")
                const isDeployed = repo.homepage || (repo.topics && repo.topics.includes('deployed'));
                const cardClass = isDeployed ? 'project-card deployed' : 'project-card';

                const projectCard = document.createElement('div');
                projectCard.className = cardClass;
                projectCard.innerHTML = `
    <h3>${repo.name}</h3>
    <p>${repo.description || 'No description available.'}</p>
    <p><strong>Language:</strong> ${repo.language || 'N/A'}</p>
    <p><a href="${repo.html_url}" target="_blank"><i class="fab fa-github"></i> View on GitHub</a></p>
    ${isDeployed ? `<p><a href="${repo.homepage}" target="_blank"><i class="fas fa-external-link-alt"></i> Live Demo</a></p>` : ''}
`;
                projectList.appendChild(projectCard);
            });
        })
        .catch(error => {
            console.error('Error fetching repos:', error);
            projectList.innerHTML = '<p>Failed to load projects.</p>';
        });
});