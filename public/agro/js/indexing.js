// AGRO GUI - Indexing Module
// Handles index operations and repo dropdown population

(function () {
    'use strict';

    const { api, $, state } = window.CoreUtils || {};

    if (!api || !$ || !state) {
        console.error('[indexing.js] CoreUtils not loaded!');
        return;
    }

    /**
     * Populate index repo dropdown with available repos
     */
    function populateIndexRepoDropdown() {
        const select = $('#index-repo-select');
        if (!select) return;

        const config = state.config;
        if (!config || !config.repos) {
            console.warn('[indexing] No config or repos available');
            return;
        }

        // Clear existing options
        select.innerHTML = '';

        // Add repos
        config.repos.forEach((repo) => {
            const opt = document.createElement('option');
            opt.value = repo.name;
            opt.textContent = repo.name;
            select.appendChild(opt);
        });

        // Set default selection
        if (config.env && config.env.REPO) {
            select.value = config.env.REPO;
        } else if (config.default_repo) {
            select.value = config.default_repo;
        } else if (config.repos.length > 0) {
            select.value = config.repos[0].name;
        }

        console.log('[indexing] Populated repo dropdown with', config.repos.length, 'repos');
    }

    /**
     * Refresh index overview stats
     */
    async function refreshIndexStats() {
        const grid = $('#index-overview-grid');
        if (!grid) return;

        try {
            const response = await fetch(api('/api/index/stats'));
            const stats = await response.json();

            // Calculate totals from repos array
            let totalChunks = 0;
            let reposCount = 0;
            let lastIndexed = 'Never';

            if (stats.repos && Array.isArray(stats.repos)) {
                stats.repos.forEach(repo => {
                    if (repo.chunk_count > 0) {
                        totalChunks += repo.chunk_count;
                        reposCount++;
                    }
                });
            }

            // Get total storage
            const totalStorage = stats.total_storage || 0;
            const sizeGB = (totalStorage / (1024 * 1024 * 1024)).toFixed(2);

            // Get last indexed timestamp from current repo
            if (stats.repos && stats.repos.length > 0) {
                const currentRepo = stats.repos.find(r => r.name === stats.current_repo) || stats.repos[0];
                if (currentRepo && currentRepo.last_indexed) {
                    lastIndexed = new Date(currentRepo.last_indexed).toLocaleString();
                }
            }

            // Build stats cards
            let html = '';

            // Total chunks
            html += `
                <div style="background: var(--card-bg, var(--bg-elev2)); border: 1px solid var(--line, var(--line)); border-radius: 6px; padding: 16px;">
                    <div style="color: var(--fg-muted, var(--fg-muted)); font-size: 11px; text-transform: uppercase; margin-bottom: 8px;">Total Chunks</div>
                    <div style="color: var(--ok, var(--accent)); font-size: 24px; font-weight: 700; font-family: 'SF Mono', monospace;">
                        ${totalChunks.toLocaleString()}
                    </div>
                </div>
            `;

            // Total size
            html += `
                <div style="background: var(--card-bg, var(--bg-elev2)); border: 1px solid var(--line, var(--line)); border-radius: 6px; padding: 16px;">
                    <div style="color: var(--fg-muted, var(--fg-muted)); font-size: 11px; text-transform: uppercase; margin-bottom: 8px;">Index Size</div>
                    <div style="color: var(--link, var(--link)); font-size: 24px; font-weight: 700; font-family: 'SF Mono', monospace;">
                        ${sizeGB} GB
                    </div>
                </div>
            `;

            // Repositories indexed
            html += `
                <div style="background: var(--card-bg, var(--bg-elev2)); border: 1px solid var(--line, var(--line)); border-radius: 6px; padding: 16px;">
                    <div style="color: var(--fg-muted, var(--fg-muted)); font-size: 11px; text-transform: uppercase; margin-bottom: 8px;">Repositories</div>
                    <div style="color: var(--warn, var(--warn)); font-size: 24px; font-weight: 700; font-family: 'SF Mono', monospace;">
                        ${reposCount}
                    </div>
                </div>
            `;

            // Last indexed
            html += `
                <div style="background: var(--card-bg, var(--bg-elev2)); border: 1px solid var(--line, var(--line)); border-radius: 6px; padding: 16px;">
                    <div style="color: var(--fg-muted, var(--fg-muted)); font-size: 11px; text-transform: uppercase; margin-bottom: 8px;">Last Indexed</div>
                    <div style="color: var(--link); font-size: 14px; font-weight: 600;">
                        ${lastIndexed}
                    </div>
                </div>
            `;

            grid.innerHTML = html;
        } catch (e) {
            console.error('[indexing] Failed to load stats:', e);
            grid.innerHTML = '<div style="color: var(--err); padding: 16px;">Failed to load index stats</div>';
        }
    }

    /**
     * Start indexing
     */
    async function startIndexing() {
        const repoSelect = $('#index-repo-select');
        const btnStart = $('#btn-index-start');
        const btnDashStart = $('#dash-index-start');
        
        const repo = repoSelect ? repoSelect.value : null;
        
        if (!repo) {
            if (window.showStatus) {
                window.showStatus('Please select a repository to index', 'error');
            } else {
                alert('Please select a repository to index');
            }
            return;
        }

        // Disable buttons
        if (btnStart) btnStart.disabled = true;
        if (btnDashStart) btnDashStart.disabled = true;

        try {
            const response = await fetch(api('/api/index/start'), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ repo })
            });
            
            const data = await response.json();
            
            if (data.success || data.pid) {
                if (window.showStatus) {
                    window.showStatus(`Indexing started for ${repo}`, 'success');
                } else {
                    alert(`Indexing started for ${repo}!`);
                }
                // Start polling for status
                pollIndexStatus();
            } else {
                throw new Error(data.error || 'Failed to start indexing');
            }
        } catch (e) {
            if (window.showStatus) {
                window.showStatus(`Failed to start indexing: ${e.message}`, 'error');
            } else {
                alert(`Error: ${e.message}`);
            }
        } finally {
            // Re-enable buttons
            if (btnStart) btnStart.disabled = false;
            if (btnDashStart) btnDashStart.disabled = false;
        }
    }

    /**
     * Stop indexing
     */
    async function stopIndexing() {
        const btnStop = $('#btn-index-stop');
        if (btnStop) btnStop.disabled = true;

        try {
            const response = await fetch(api('/api/index/stop'), {
                method: 'POST'
            });
            
            const data = await response.json();
            
            if (data.success) {
                if (window.showStatus) {
                    window.showStatus('Indexing stopped', 'success');
                } else {
                    alert('Indexing stopped');
                }
            } else {
                throw new Error(data.error || 'Failed to stop indexing');
            }
        } catch (e) {
            if (window.showStatus) {
                window.showStatus(`Failed to stop indexing: ${e.message}`, 'error');
            } else {
                alert(`Error: ${e.message}`);
            }
        } finally {
            if (btnStop) btnStop.disabled = false;
        }
    }

    /**
     * Poll for index status
     */
    let _indexStatusTimer = null;
    async function pollIndexStatus() {
        // Clear existing timer
        if (_indexStatusTimer) clearTimeout(_indexStatusTimer);
        
        try {
            const response = await fetch(api('/api/index/status'));
            const data = await response.json();
            
            // Update UI with status
            const statusDiv = $('#index-status-display');
            if (statusDiv && data.running) {
                let progress = '';
                if (data.current_repo) {
                    progress = `Indexing: ${data.current_repo}`;
                    if (data.progress) {
                        progress += ` (${data.progress}%)`;
                    }
                }
                statusDiv.innerHTML = `<div style="color: var(--accent); padding: 8px;">${progress}</div>`;
                
                // Continue polling if still running
                _indexStatusTimer = setTimeout(pollIndexStatus, 2000);
            } else {
                if (statusDiv) {
                    statusDiv.innerHTML = '<div style="color: var(--fg-muted); padding: 8px;">Idle</div>';
                }
                // Refresh stats after indexing completes
                refreshIndexStats();
            }
        } catch (e) {
            console.error('[indexing] Failed to poll status:', e);
        }
    }

    /**
     * Initialize indexing UI
     */
    function initIndexing() {
        // Populate repo dropdown when config loads
        if (window.Config) {
            const originalLoadConfig = window.Config.loadConfig;
            window.Config.loadConfig = async function() {
                await originalLoadConfig.call(window.Config);
                populateIndexRepoDropdown();
            };
        }

        // Try to populate immediately if config already loaded
        if (state.config) {
            populateIndexRepoDropdown();
        }

        // Fallback: fetch config directly if dropdown is still empty after a delay
        setTimeout(() => {
            const select = $('#index-repo-select');
            if (select && select.options.length === 0) {
                fetch(api('/api/config'))
                    .then(r => r.json())
                    .then(config => {
                        if (config.repos && config.repos.length > 0) {
                            config.repos.forEach(repo => {
                                const opt = document.createElement('option');
                                opt.value = repo.name;
                                opt.textContent = repo.name;
                                select.appendChild(opt);
                            });
                            // Set default
                            if (config.env && config.env.REPO) {
                                select.value = config.env.REPO;
                            } else if (config.default_repo) {
                                select.value = config.default_repo;
                            }
                            console.log('[indexing] Populated dropdown via fallback with', config.repos.length, 'repos');
                        }
                    })
                    .catch(e => console.error('[indexing] Failed to fetch config:', e));
            }
        }, 500);

        // Bind buttons
        const refreshBtn = $('#btn-refresh-index-stats');
        const startBtn = $('#btn-index-start');
        const stopBtn = $('#btn-index-stop');
        const dashStartBtn = $('#dash-index-start');
        
        if (refreshBtn) refreshBtn.addEventListener('click', refreshIndexStats);
        if (startBtn) startBtn.addEventListener('click', startIndexing);
        if (stopBtn) stopBtn.addEventListener('click', stopIndexing);
        if (dashStartBtn) dashStartBtn.addEventListener('click', startIndexing);

        // Initial stats load
        refreshIndexStats();
        
        // Check if indexing is already running
        pollIndexStatus();

        console.log('[indexing] Initialized');
    }

    // Export to window
    window.Indexing = {
        initIndexing,
        populateIndexRepoDropdown,
        refreshIndexStats,
        startIndexing,
        stopIndexing,
        pollIndexStatus
    };

    // Auto-initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initIndexing);
    } else {
        initIndexing();
    }

    console.log('[indexing.js] Module loaded');
})();

