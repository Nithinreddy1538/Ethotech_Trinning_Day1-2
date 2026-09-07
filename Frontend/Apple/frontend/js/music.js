document.addEventListener('DOMContentLoaded', () => {
    // Common elements
    // Note: Some elements like logoutBtn and usernameDisplay are now handled in auth.js
    const audioPlayer = document.getElementById('audio-player');
    const nowPlayingInfo = document.getElementById('now-playing-info');
    const logoutBtn = document.getElementById('logout-btn');
    const usernameDisplay = document.getElementById('username-display');

    // Dashboard specific elements
    const recentlyPlayedGrid = document.getElementById('recently-played-grid');
    const featuredPlaylistsGrid = document.getElementById('featured-playlists-grid');
    const newReleasesGrid = document.getElementById('new-releases-grid');
    const dashboardSearchInput = document.querySelector('.top-header .search-bar input');
    const dashboardSearchButton = document.querySelector('.top-header .search-bar button');
    
    // Music Library specific elements
    const songsListDiv = document.getElementById('songs-list');
    const loadingMessage = document.getElementById('loading-message');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');

    // My Favorites specific elements
    const favoriteSongsListDiv = document.getElementById('favorite-songs-list');
    const loadingFavoritesMessage = document.getElementById('loading-favorites-message');

    // Listening History specific elements
    const historySongsListDiv = document.getElementById('history-songs-list');
    const loadingHistoryMessage = document.getElementById('loading-history-message');

    // Playlists specific elements
    const createPlaylistForm = document.getElementById('create-playlist-form');
    const playlistsListDiv = document.getElementById('playlists-list');
    const loadingPlaylistsMessage = document.getElementById('loading-playlists');
    const noPlaylistsMessage = document.getElementById('no-playlists-message');
    const playlistDetailsModal = document.getElementById('playlist-details-modal');
    const modalCloseButton = playlistDetailsModal ? playlistDetailsModal.querySelector('.close-button') : null;
    const modalPlaylistName = document.getElementById('modal-playlist-name');
    const modalPlaylistDescription = document.getElementById('modal-playlist-description');
    const modalPlaylistSongs = document.getElementById('modal-playlist-songs');
    const noSongsInPlaylistMessage = document.getElementById('no-songs-in-playlist');

    // Upload Song specific elements
    const uploadSongForm = document.getElementById('upload-song-form');
    const uploadErrorMessage = document.getElementById('upload-error-message');

    // Admin Analytics specific elements
    const analyticsContent = document.getElementById('analytics-content');

    // Function to get access token from local storage
    const getAccessToken = () => localStorage.getItem('accessToken');

    // Set active navigation link
    const setActiveNavLink = () => {
        const navLinks = document.querySelectorAll('.main-nav .nav-link');
        navLinks.forEach(link => {
            // Use startsWith to handle cases like /my_playlists.html also matching /
            if (window.location.pathname.endsWith(link.getAttribute('href'))) {
                link.classList.add('active');
            }
        });
    };

    const getUserRole = () => localStorage.getItem('userRole');

    // Show a single "Admin Panel" doorway in the regular user sidebar for
    // staff accounts, instead of mixing admin links into the everyday nav.
    // The admin pages themselves (admin_dashboard, upload_music,
    // admin_analytics) ship their own separate sidebar entirely.
    const addAdminLinks = () => {
        const slot = document.getElementById('admin-badge-slot');
        const onAdminPage = ['admin_dashboard.html', 'upload_music.html', 'admin_analytics.html']
            .some(p => window.location.pathname.includes(p));
        if (slot && getUserRole() === 'ADMIN' && !onAdminPage) {
            slot.innerHTML = `<a href="admin_dashboard.html" class="admin-access-badge"><span class="badge-icon">&#9881;</span> Admin Panel</a>`;
        }
    };

    // Mobile hamburger menu: toggles the sidebar in/out on small screens
    const initMobileNav = () => {
        const toggleBtn = document.getElementById('menu-toggle');
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('sidebar-overlay');
        if (!toggleBtn || !sidebar || !overlay) return;

        const closeMenu = () => {
            sidebar.classList.remove('open');
            overlay.classList.remove('open');
        };

        toggleBtn.addEventListener('click', () => {
            sidebar.classList.toggle('open');
            overlay.classList.toggle('open');
        });
        overlay.addEventListener('click', closeMenu);
        sidebar.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', closeMenu);
        });
    };

    // --- Core UI Functions ---
    addAdminLinks();
    setActiveNavLink();
    initMobileNav();

    // --- API Interaction Functions ---

    // Function to record a song play in listening history
    const recordListeningHistory = async (songId) => {
        try {
            await fetch(`${API_BASE_URL}/user/history/history/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getAccessToken()}`
                },
                body: JSON.stringify({ song_id: songId })
            });
        } catch (error) {
            console.error('Error recording listening history:', error);
        }
    };

    // Function to add/remove a song from favorites
    const toggleFavorite = async (songId, isFavorited) => {
        try {
            let response;
            if (isFavorited) {
                response = await fetch(`${API_BASE_URL}/user/favorites/favorites/remove-by-song/`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getAccessToken()}` },
                    body: JSON.stringify({ song_id: songId })
                });
            } else {
                response = await fetch(`${API_BASE_URL}/user/favorites/favorites/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${getAccessToken()}`
                    },
                    body: JSON.stringify({ song_id: songId })
                });
            }

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || `Failed to ${isFavorited ? 'unfavorite' : 'favorite'} song.`);
            }

            console.log(`Song successfully ${isFavorited ? 'unfavorited' : 'favorited'}.`);
        } catch (error) {
            console.error('Error toggling favorite:', error);
        }
    };

    // Function to fetch user's favorites to determine if a song is favorited
    const fetchUserFavoriteSongIds = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/user/favorites/favorites/`, {
                headers: { 'Authorization': `Bearer ${getAccessToken()}` }
            });
            if (!response.ok) throw new Error('Failed to fetch favorites');
            const data = await response.json();
            return data.results.map(fav => fav.song.id);
        } catch (error) {
            console.error('Error fetching user favorites:', error);
            return [];
        }
    };

    // --- Dashboard Specific Functions ---

    const createMusicCard = (item) => {
        const card = document.createElement('div');
        card.classList.add('music-card');
        card.innerHTML = `
            <img src="${item.cover_image}" alt="${item.title}" class="cover-image">
            <h3>${item.title}</h3>
            <p>${item.artist_name}</p>
            <button class="play-button" data-song-id="${item.id}" data-audio-url="${item.audio_file}" data-title="${item.title}" data-artist="${item.artist_name}">Play</button>
        `;
        return card;
    };

    const populateCardGrid = (gridElement, items) => {
        if (!gridElement) return;
        gridElement.innerHTML = ''; // Clear loading cards
        if (items.length === 0) {
            gridElement.innerHTML = '<p class="info-message">No items to display.</p>';
            return;
        }
        items.forEach(item => {
            const card = createMusicCard(item);
            gridElement.appendChild(card);
        });
    };

    const fetchRecentlyPlayed = async () => {
        if (!recentlyPlayedGrid) return;
        try {
            const response = await fetch(`${API_BASE_URL}/user/history/history/?limit=4`, {
                headers: { 'Authorization': `Bearer ${getAccessToken()}` }
            });
            if (!response.ok) throw new Error('Failed to fetch history');
            const data = await response.json();
            const songs = data.results.map(item => ({
                ...item.song,
                artist_name: item.song.artist.name
            }));
            populateCardGrid(recentlyPlayedGrid, songs);
        } catch (error) {
            console.error('Error fetching recently played:', error);
            recentlyPlayedGrid.innerHTML = '<p class="info-message">Could not load recently played.</p>';
        }
    };

    const fetchFeaturedPlaylists = async () => {
        // This is a placeholder. In a real app, you'd have an endpoint for "featured" playlists.
        // Here, we'll just fetch the user's own playlists as an example.
        if (!featuredPlaylistsGrid) return;
        try {
            const response = await fetch(`${API_BASE_URL}/user/playlists/playlists/?limit=3`, {
                headers: { 'Authorization': `Bearer ${getAccessToken()}` }
            });
            if (!response.ok) throw new Error('Failed to fetch playlists');
            const data = await response.json();
            // We adapt the playlist data to look like a "music card"
            const playlistsAsCards = data.results.map(p => ({
                id: p.id,
                title: p.name,
                // Use a default cover if playlists don't have images
                cover_image: p.cover_image || 'https://via.placeholder.com/150?text=Playlist',
                artist_name: p.description || 'User playlist',
                // We can't play a playlist directly, so this button would navigate or open the modal
                is_playlist: true
            }));
            // Custom rendering for playlist cards on dashboard
            featuredPlaylistsGrid.innerHTML = '';
            if (playlistsAsCards.length === 0) {
                featuredPlaylistsGrid.innerHTML = '<p class="info-message">No playlists to feature.</p>';
                return;
            }
            playlistsAsCards.forEach(item => {
                const card = document.createElement('div');
                card.classList.add('music-card');
                card.innerHTML = `
                    <img src="${item.cover_image}" alt="${item.title}" class="cover-image">
                    <h3>${item.title}</h3>
                    <p>${item.artist_name}</p>
                    <button class="view-playlist-button" data-playlist-id="${item.id}">View</button>
                `;
                featuredPlaylistsGrid.appendChild(card);
            });

        } catch (error) {
            console.error('Error fetching featured playlists:', error);
            featuredPlaylistsGrid.innerHTML = '<p class="info-message">Could not load playlists.</p>';
        }
    };

    const fetchNewReleases = async () => {
        // This fetches the 5 most recently added songs
        if (!newReleasesGrid) return;
        const songs = await getSongs('?ordering=-created_at&limit=5');
        populateCardGrid(newReleasesGrid, songs);
    };

    // Helper to create a song card HTML element (reused for Music Library, Favorites, History)
    const createSongCard = (song, isFavoritedInitially = false) => {
        const songCard = document.createElement('div');
        songCard.classList.add('song-card');
        songCard.innerHTML = `
            <img src="${song.cover_image}" alt="${song.title}" class="song-cover">
            <h3>${song.title}</h3>
            <p>${song.artist_name}</p>
            <div class="song-card-actions">
                <button class="action-btn favorite-btn ${isFavoritedInitially ? 'favorited' : ''}" data-song-id="${song.id}" title="Favorite">♥</button>
                <button class="action-btn add-to-playlist-btn" data-song-id="${song.id}" title="Add to Playlist">+</button>
            </div>
            <button class="play-button-main"
                    data-song-id="${song.id}"
                    data-audio-url="${song.audio_file}"
                    data-title="${song.title}"
                    data-artist="${song.artist_name}"
                    title="Play">
                ▶
            </button>
        `;
        return songCard;
    };

    // --- Admin Analytics Functions ---

    const fetchAdminAnalytics = async () => {
        if (!analyticsContent) return;

        try {
            const response = await fetch(`${API_BASE_URL}/dashboard/analytics/`, {
                headers: { 'Authorization': `Bearer ${getAccessToken()}` }
            });

            if (response.status === 403) {
                analyticsContent.innerHTML = `<p class="error-message" style="display:block; text-align:center;">You do not have permission to view this page.</p>`;
                return;
            }
            if (!response.ok) throw new Error('Failed to fetch analytics');

            const data = await response.json();
            analyticsContent.innerHTML = `
                <div class="analytics-grid">
                    <div class="stat-card">
                        <h3>Total Users</h3>
                        <p class="stat-number">${data.total_users}</p>
                    </div>
                    <div class="stat-card">
                        <h3>Total Songs</h3>
                        <p class="stat-number">${data.total_songs}</p>
                    </div>
                </div>
                <div class="chart-container">
                    <h2 class="section-title">Top 5 Most Played Songs</h2>
                    <canvas id="topSongsChart"></canvas>
                </div>
            `;

            // Render the chart
            const ctx = document.getElementById('topSongsChart').getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: data.top_songs.map(s => `${s.song__title} - ${s.song__artist__name}`),
                    datasets: [{
                        label: 'Play Count',
                        data: data.top_songs.map(s => s.play_count),
                        backgroundColor: 'rgba(29, 185, 84, 0.6)',
                        borderColor: 'rgba(29, 185, 84, 1)',
                        borderWidth: 1
                    }]
                },
                options: { scales: { y: { beginAtZero: true } } }
            });

        } catch (error) {
            analyticsContent.innerHTML = `<p class="error-message" style="display:block; text-align:center;">${error.message}</p>`;
        }
    };

    // Function to fetch user's playlists
    const fetchUserPlaylists = async () => {
        if (!playlistsListDiv) return; // Only run if on my_playlists.html

        loadingPlaylistsMessage.style.display = 'block';
        playlistsListDiv.innerHTML = ''; // Clear previous playlists
        noPlaylistsMessage.style.display = 'none';

        try {
            const response = await fetch(`${API_BASE_URL}/user/playlists/playlists/`, {
                headers: { 'Authorization': `Bearer ${getAccessToken()}` }
            });
            if (!response.ok) throw new Error('Failed to fetch playlists');
            const data = await response.json();
            const playlists = data.results;

            loadingPlaylistsMessage.style.display = 'none';

            if (!playlists || playlists.length === 0) {
                noPlaylistsMessage.style.display = 'block';
                return [];
            }

            playlists.forEach(playlist => {
                const playlistCard = document.createElement('div');
                playlistCard.classList.add('playlist-card');
                playlistCard.innerHTML = `
                    <h3>${playlist.name}</h3>
                    <p>${playlist.description || 'No description'}</p>
                    <button class="view-playlist-button" data-playlist-id="${playlist.id}">View Details</button>
                    <button class="delete-playlist-button" data-playlist-id="${playlist.id}">Delete</button>
                `;
                playlistsListDiv.appendChild(playlistCard);
            });
            return playlists;
        } catch (error) {
            console.error('Error fetching playlists:', error);
            loadingPlaylistsMessage.textContent = 'Failed to load playlists. Please try again later.';
            return [];
        }
    };

    // Function to create a new playlist
    const createNewPlaylist = async (name, description = '') => {
        try {
            const response = await fetch(`${API_BASE_URL}/user/playlists/playlists/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getAccessToken()}`
                },
                body: JSON.stringify({ name, description })
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.name ? errorData.name.join(', ') : 'Failed to create playlist');
            }
            alert('Playlist created successfully!');
            fetchUserPlaylists(); // Refresh the playlist list
        } catch (error) {
            console.error('Error creating playlist:', error);
            alert(error.message);
        }
    };

    // Function to delete a playlist
    const deletePlaylist = async (playlistId) => {
        if (!confirm('Are you sure you want to delete this playlist?')) return;
        try {
            const response = await fetch(`${API_BASE_URL}/user/playlists/playlists/${playlistId}/`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${getAccessToken()}` }
            });
            if (!response.ok) throw new Error('Failed to delete playlist');
            alert('Playlist deleted successfully!');
            fetchUserPlaylists(); // Refresh the playlist list
        } catch (error) {
            console.error('Error deleting playlist:', error);
            alert(error.message);
        }
    };

    // Function to add a song to a specific playlist
    const addSongToPlaylist = async (playlistId, songId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/user/playlists/playlists/${playlistId}/add-song/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getAccessToken()}`
                },
                body: JSON.stringify({ song_id: songId })
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Failed to add song to playlist');
            }
            alert('Song added to playlist successfully!');
            // Optionally, refresh the playlist details if the modal is open
            if (playlistDetailsModal && playlistDetailsModal.style.display === 'block') {
                const currentPlaylistId = playlistDetailsModal.dataset.playlistId;
                if (currentPlaylistId == playlistId) {
                    displayPlaylistDetails(playlistId);
                }
            }
        } catch (error) {
            console.error('Error adding song to playlist:', error);
            alert(error.message);
        }
    };

    // Function to remove a song from a playlist
    const removeSongFromPlaylist = async (playlistId, songId) => {
        if (!confirm('Are you sure you want to remove this song from the playlist?')) return;
        try {
            const response = await fetch(`${API_BASE_URL}/user/playlists/playlists/${playlistId}/remove-song/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getAccessToken()}`
                },
                body: JSON.stringify({ song_id: songId })
            });
            if (!response.ok) throw new Error('Failed to remove song from playlist');
            alert('Song removed from playlist successfully!');
            displayPlaylistDetails(playlistId); // Refresh the modal content
        } catch (error) {
            console.error('Error removing song from playlist:', error);
            alert(error.message);
        }
    };

    // Fetch and display songs
    const getSongs = async (queryString = '') => {
        try {
            const response = await fetch(`${API_BASE_URL}/music/songs/${queryString}`, {
                headers: { 'Authorization': `Bearer ${getAccessToken()}` }
            });
            if (!response.ok) throw new Error('Failed to fetch songs');
            const data = await response.json();
            return data.results; // The serializer now provides artist_name and full image URL
        } catch (error) {
            console.error('Error getting songs:', error);
            return [];
        }
    };

    // Function to display playlist details in a modal
    const displayPlaylistDetails = async (playlistId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/user/playlists/playlists/${playlistId}/`, {
                headers: { 'Authorization': `Bearer ${getAccessToken()}` }
            });
            if (!response.ok) throw new Error('Failed to fetch playlist details');
            const playlist = await response.json();

            modalPlaylistName.textContent = playlist.name;
            modalPlaylistDescription.textContent = playlist.description || 'No description provided.';
            modalPlaylistSongs.innerHTML = ''; // Clear previous songs
            playlistDetailsModal.dataset.playlistId = playlist.id; // Store current playlist ID

            if (playlist.items && playlist.items.length > 0) {
                noSongsInPlaylistMessage.style.display = 'none';
                playlist.items.sort((a, b) => a.order - b.order); // Sort by order
                playlist.items.forEach(item => {
                    const song = item.song;
                    const li = document.createElement('li');
                    li.innerHTML = `
                        <span>${song.title} - ${song.artist.name}</span>
                        <button class="play-button" data-song-id="${song.id}" data-audio-url="${song.audio_file}" data-title="${song.title}" data-artist="${song.artist.name}">Play</button>
                        <button class="remove-song-from-playlist-button" data-playlist-id="${playlist.id}" data-song-id="${song.id}">Remove</button>
                    `;
                    modalPlaylistSongs.appendChild(li);
                });

                // Add event listeners for play buttons in modal
                modalPlaylistSongs.querySelectorAll('.play-button').forEach(button => {
                    button.addEventListener('click', (e) => {
                        const songId = e.target.dataset.songId;
                        audioPlayer.src = e.target.dataset.audioUrl;
                        nowPlayingInfo.textContent = `Now Playing: ${e.target.dataset.title} - ${e.target.dataset.artist}`;
                        audioPlayer.play();
                        recordListeningHistory(songId);
                    });
                });

                // Add event listeners for remove song buttons in modal
                modalPlaylistSongs.querySelectorAll('.remove-song-from-playlist-button').forEach(button => {
                    button.addEventListener('click', (e) => {
                        const playlistId = e.target.dataset.playlistId;
                        const songId = e.target.dataset.songId;
                        removeSongFromPlaylist(playlistId, songId);
                    });
                });
            } else {
                noSongsInPlaylistMessage.style.display = 'block';
            }

            playlistDetailsModal.style.display = 'block'; // Show the modal
        } catch (error) {
            console.error('Error displaying playlist details:', error);
            alert('Failed to load playlist details.');
        }
    };

    // --- Music Library Specific Functions ---

    const fetchAndDisplaySongs = async (query = '') => {
        if (!songsListDiv) return;

        loadingMessage.style.display = 'block';
        songsListDiv.innerHTML = ''; // Clear previous songs

        // Fetch favorite songs first to mark them in the UI
        const favoriteSongIds = await fetchUserFavoriteSongIds();
        const songs = await getSongs(query ? `?search=${query}` : '');

        loadingMessage.style.display = 'none';

        if (songs.length === 0) {
            songsListDiv.innerHTML = '<p class="info-message">No songs found.</p>';
            return;
        }

        songs.forEach(song => {
            const isFavorited = favoriteSongIds.includes(song.id);
            const songCard = createSongCard(song, isFavorited);
            songsListDiv.appendChild(songCard);
        });
    };

    // --- My Favorites Specific Functions ---

    const fetchAndDisplayFavorites = async () => {
        if (!favoriteSongsListDiv) return;

        loadingFavoritesMessage.style.display = 'block';
        favoriteSongsListDiv.innerHTML = '';

        try {
            const response = await fetch(`${API_BASE_URL}/user/favorites/favorites/`, {
                headers: { 'Authorization': `Bearer ${getAccessToken()}` }
            });
            if (!response.ok) throw new Error('Failed to fetch favorite songs');
            const data = await response.json();
            const favoriteSongs = data.results.map(fav => ({
                ...fav.song,
                is_favorited: true // Mark as favorited
            }));

            loadingFavoritesMessage.style.display = 'none';

            if (favoriteSongs.length === 0) {
                favoriteSongsListDiv.innerHTML = '<p class="info-message">You have no favorite songs yet.</p>';
                return;
            }

            favoriteSongs.forEach(song => {
                const songCard = createSongCard(song, true); // All songs here are favorited
                favoriteSongsListDiv.appendChild(songCard);
            });
        } catch (error) {
            console.error('Error fetching favorite songs:', error);
            loadingFavoritesMessage.textContent = 'Failed to load favorite songs. Please try again later.';
        }
    };

    // --- Listening History Specific Functions ---

    const fetchAndDisplayListeningHistory = async () => {
        if (!historySongsListDiv) return;

        loadingHistoryMessage.style.display = 'block';
        historySongsListDiv.innerHTML = '';

        try {
            const response = await fetch(`${API_BASE_URL}/user/history/history/`, {
                headers: { 'Authorization': `Bearer ${getAccessToken()}` }
            });
            if (!response.ok) throw new Error('Failed to fetch listening history');
            const data = await response.json();
            const historyItems = data.results;

            loadingHistoryMessage.style.display = 'none';

            if (historyItems.length === 0) {
                historySongsListDiv.innerHTML = '<p class="info-message">You have no listening history yet.</p>';
                return;
            }

            // Fetch favorite songs to correctly mark them in history view
            const favoriteSongIds = await fetchUserFavoriteSongIds();

            historyItems.forEach(item => {
                const song = item.song;
                const isFavorited = favoriteSongIds.includes(song.id);
                const songCard = createSongCard(song, isFavorited);
                historySongsListDiv.appendChild(songCard);
            });
        } catch (error) {
            console.error('Error fetching listening history:', error);
            loadingHistoryMessage.textContent = 'Failed to load listening history. Please try again later.';
        }
    };

    // --- Upload Song Page Functions ---

    const populateSelectWithOptions = (selectElement, items, placeholder, valueField = 'id', nameField = 'name') => {
        if (!selectElement) return;
        selectElement.innerHTML = `<option value="">${placeholder}</option>`;
        items.forEach(item => {
            const option = document.createElement('option');
            option.value = item[valueField];
            option.textContent = item[nameField];
            selectElement.appendChild(option);
        });
    };

    const initializeUploadForm = async () => {
        if (!uploadSongForm) return;

        // Use the new role check function
        if (getUserRole() !== 'ADMIN') {
            document.querySelector('.content-area').innerHTML = '<div style="text-align: center;"><h1>Access Denied</h1><p>You do not have permission to view this page.</p></div>';
            return;
        }

        try {
            // Fetch artists, albums, and categories
            const [artists, albums, categories] = await Promise.all([
                fetch(`${API_BASE_URL}/music/artists/`).then(res => res.json()),
                fetch(`${API_BASE_URL}/music/albums/`).then(res => res.json()),
                fetch(`${API_BASE_URL}/music/categories/`).then(res => res.json())
            ]);

            populateSelectWithOptions(document.getElementById('artist'), artists.results, 'Select an artist');
            populateSelectWithOptions(document.getElementById('album'), albums.results, 'Select an album (optional)', 'id', 'title');
            populateSelectWithOptions(document.getElementById('category'), categories.results, 'Select a category (optional)');

        } catch (error) {
            console.error("Failed to load data for upload form", error);
            uploadErrorMessage.textContent = 'Could not load artists/albums. Please refresh.';
            uploadErrorMessage.style.display = 'block';
        }

        uploadSongForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitButton = uploadSongForm.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.textContent = 'Uploading...';
            uploadErrorMessage.style.display = 'none';

            const formData = new FormData(uploadSongForm);

            // The backend expects 'album' and 'category' to be null if not provided, not empty strings.
            if (!formData.get('album')) formData.delete('album');
            if (!formData.get('category')) formData.delete('category');

            try {
                const response = await fetch(`${API_BASE_URL}/music/songs/`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${getAccessToken()}`,
                        // 'Content-Type' is not set; the browser sets it for FormData with the correct boundary
                    },
                    body: formData
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw errorData;
                }

                alert('Song uploaded successfully!');
                window.location.href = 'music_library.html';

            } catch (error) {
                uploadErrorMessage.textContent = `Upload failed: ${JSON.stringify(error)}`;
                uploadErrorMessage.style.display = 'block';
            } finally {
                submitButton.disabled = false;
                submitButton.textContent = 'Upload Song';
            }
        });
    };

    // --- Page Initializers and Event Listeners ---

    // Global event listener for play buttons, view playlist buttons, etc.
    document.body.addEventListener('click', (e) => {
        // Updated to handle both play button types
        if (e.target.classList.contains('play-button') || e.target.classList.contains('play-button-main')) {
            const button = e.target;
            const songId = button.dataset.songId;
            audioPlayer.src = button.dataset.audioUrl;
            nowPlayingInfo.textContent = `Now Playing: ${button.dataset.title} - ${button.dataset.artist}`;
            audioPlayer.play();
            if (songId) {
                recordListeningHistory(songId);
            }
        }
        if (e.target.classList.contains('view-playlist-button')) {
            const playlistId = e.target.dataset.playlistId;
            displayPlaylistDetails(playlistId);
        }
        if (e.target.classList.contains('favorite-btn')) {
            const button = e.target;
            const songId = button.dataset.songId;
            const isFavorited = button.classList.contains('favorited');
            toggleFavorite(songId, isFavorited);
            button.classList.toggle('favorited'); // Optimistically update UI
        }
        if (e.target.classList.contains('add-to-playlist-btn')) {
            const songId = e.target.dataset.songId;
            // This is a simplified version. A better UX would be a custom modal.
            const playlistId = prompt("Enter the ID of the playlist to add this song to:");
            if (playlistId) {
                addSongToPlaylist(playlistId, songId);
            }
        }
    });

    // Initial fetch of songs when on the music library page
    if (window.location.pathname.includes('music_library.html')) {
        fetchAndDisplaySongs();
        searchButton.addEventListener('click', () => fetchAndDisplaySongs(searchInput.value));
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                fetchAndDisplaySongs(searchInput.value);
            }
        });
    }

    // Event delegation for playlist cards (view and delete)
    if (playlistsListDiv) {
        playlistsListDiv.addEventListener('click', (e) => {
            if (e.target.classList.contains('delete-playlist-button')) {
                const playlistId = e.target.dataset.playlistId;
                deletePlaylist(playlistId);
            }
        });
    }

    // Close modal functionality
    if (modalCloseButton) {
        modalCloseButton.addEventListener('click', () => {
            playlistDetailsModal.style.display = 'none';
        });
    }
    window.addEventListener('click', (event) => {
        if (event.target == playlistDetailsModal) {
            playlistDetailsModal.style.display = 'none';
        }
    });

    // Logic for My Playlists page
    if (window.location.pathname.includes('my_playlists.html')) {
        fetchUserPlaylists();
        if (createPlaylistForm) {
            createPlaylistForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const nameInput = document.getElementById('new-playlist-name');
                const descriptionInput = document.getElementById('new-playlist-description');
                await createNewPlaylist(nameInput.value, descriptionInput.value);
                nameInput.value = '';
                descriptionInput.value = '';
            });
        }
    }

    // Logic for Dashboard page
    if (window.location.pathname.includes('dashboard.html')) {
        fetchRecentlyPlayed();
        fetchFeaturedPlaylists();
        fetchNewReleases();
        dashboardSearchButton?.addEventListener('click', () => window.location.href = `music_library.html?search=${dashboardSearchInput.value}`);
        dashboardSearchInput?.addEventListener('keypress', (e) => { if (e.key === 'Enter') window.location.href = `music_library.html?search=${dashboardSearchInput.value}` });
    }

    // Logic for My Favorites page
    if (window.location.pathname.includes('my_favorites.html')) {
        fetchAndDisplayFavorites();
    }

    // Logic for Listening History page
    if (window.location.pathname.includes('my_history.html')) {
        fetchAndDisplayListeningHistory();
    }

    // Logic for Admin Analytics page
    if (window.location.pathname.includes('admin_analytics.html')) {
        fetchAdminAnalytics();
    }

    // Logic for Upload Music page
    if (window.location.pathname.includes('upload_music.html')) {
        initializeUploadForm();
    }
});