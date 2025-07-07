// Premarket Options Intelligence Dashboard - Main Application
class PremarketDashboard {
    constructor() {
        this.isLoading = false;
        this.autoRefreshEnabled = true;
        this.refreshInterval = 30;
        this.autoRefreshTimer = null;
        this.lastSyncTime = null;
        this.retryAttempts = 3;
        this.currentRetryCount = 0;
        
        // Sample data from the provided JSON
        this.sampleData = {
            "premarket_movers": {
                "gainers": [
                    {
                        "symbol": "AAPL",
                        "price": 195.50,
                        "change": 4.25,
                        "change_percent": 2.22,
                        "volume": 125000,
                        "avg_volume": 45000,
                        "relative_volume": 2.78,
                        "market_cap": "3.1T",
                        "sector": "Technology",
                        "optionable": true,
                        "options_chain_link": "/options/AAPL"
                    },
                    {
                        "symbol": "TSLA",
                        "price": 245.80,
                        "change": 8.90,
                        "change_percent": 3.76,
                        "volume": 89000,
                        "avg_volume": 52000,
                        "relative_volume": 1.71,
                        "market_cap": "780.5B",
                        "sector": "Consumer Discretionary",
                        "optionable": true,
                        "options_chain_link": "/options/TSLA"
                    },
                    {
                        "symbol": "NVDA",
                        "price": 875.30,
                        "change": 23.45,
                        "change_percent": 2.75,
                        "volume": 78000,
                        "avg_volume": 35000,
                        "relative_volume": 2.23,
                        "market_cap": "2.1T",
                        "sector": "Technology",
                        "optionable": true,
                        "options_chain_link": "/options/NVDA"
                    }
                ],
                "losers": [
                    {
                        "symbol": "META",
                        "price": 485.20,
                        "change": -12.40,
                        "change_percent": -2.49,
                        "volume": 67000,
                        "avg_volume": 41000,
                        "relative_volume": 1.63,
                        "market_cap": "1.2T",
                        "sector": "Communication Services",
                        "optionable": true,
                        "options_chain_link": "/options/META"
                    },
                    {
                        "symbol": "AMZN",
                        "price": 142.80,
                        "change": -4.15,
                        "change_percent": -2.83,
                        "volume": 54000,
                        "avg_volume": 38000,
                        "relative_volume": 1.42,
                        "market_cap": "1.5T",
                        "sector": "Consumer Discretionary",
                        "optionable": true,
                        "options_chain_link": "/options/AMZN"
                    }
                ]
            },
            "gap_volatility": {
                "gap_up": [
                    {
                        "symbol": "NVDA",
                        "gap_percent": 3.45,
                        "iv_rank": 68,
                        "iv_crush_potential": "Medium",
                        "liquidity_score": 95,
                        "bid_ask_spread": 0.15,
                        "open_interest": 125000
                    },
                    {
                        "symbol": "AMD",
                        "gap_percent": 2.8,
                        "iv_rank": 72,
                        "iv_crush_potential": "Low",
                        "liquidity_score": 82,
                        "bid_ask_spread": 0.08,
                        "open_interest": 89000
                    }
                ],
                "gap_down": [
                    {
                        "symbol": "AMZN",
                        "gap_percent": -2.8,
                        "iv_rank": 72,
                        "iv_crush_potential": "High",
                        "liquidity_score": 88,
                        "bid_ask_spread": 0.25,
                        "open_interest": 89000
                    }
                ]
            },
            "catalysts": {
                "earnings_today": ["AAPL", "GOOGL", "MSFT"],
                "earnings_tomorrow": ["AMZN", "TSLA"],
                "news_events": [
                    {
                        "symbol": "AAPL",
                        "headline": "Apple Reports Q4 Earnings Beat",
                        "impact": "Positive",
                        "timestamp": "2025-06-20T06:30:00Z"
                    },
                    {
                        "symbol": "TSLA",
                        "headline": "Tesla Announces New Gigafactory",
                        "impact": "Positive", 
                        "timestamp": "2025-06-20T05:45:00Z"
                    }
                ],
                "macro_events": [
                    {
                        "event": "CPI Release",
                        "time": "08:30 EST",
                        "impact": "High",
                        "expected": "2.4%"
                    },
                    {
                        "event": "Fed Chair Speech",
                        "time": "14:00 EST", 
                        "impact": "Medium",
                        "expected": "Hawkish"
                    }
                ]
            },
            "technical_data": {
                "AAPL": {
                    "rsi": 65.4,
                    "macd": "Bullish",
                    "bollinger": "Above Upper",
                    "atr": 3.25,
                    "support": 190.00,
                    "resistance": 200.00
                },
                "TSLA": {
                    "rsi": 58.2,
                    "macd": "Neutral",
                    "bollinger": "Middle Band",
                    "atr": 12.45,
                    "support": 235.00,
                    "resistance": 255.00
                }
            },
            "options_flow": {
                "unusual_activity": [
                    {
                        "symbol": "AAPL",
                        "type": "Call",
                        "strike": 200,
                        "expiry": "2025-07-18",
                        "volume": 15000,
                        "oi_change": 5000,
                        "premium": "Unusual High"
                    }
                ],
                "put_call_ratio": 0.85,
                "dark_pool_activity": "Above Average"
            }
        };

        this.errorPatterns = [
            { type: 'rate_limit', probability: 0.1, message: 'API rate limit exceeded. Retrying automatically.' },
            { type: 'network_timeout', probability: 0.05, message: 'Connection timeout. Retrying automatically.' },
            { type: 'server_error', probability: 0.03, message: 'Data provider temporarily unavailable.' },
            { type: 'auth_error', probability: 0.02, message: 'Authentication error. Please check settings.' }
        ];

        // Initialize the dashboard
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupTabs();
        this.setupSettings();
        this.loadInitialData();
        this.startMarketCountdown();
        this.startAutoRefresh();
        
        // Show initial status
        this.updateConnectionStatus('connected');
        this.updateLastSyncTime('Never');
    }

    setupEventListeners() {
        // Main sync button
        const syncButton = document.getElementById('syncButton');
        syncButton.addEventListener('click', () => this.performSync());

        // Settings toggle
        const settingsToggle = document.getElementById('settingsToggle');
        const settingsPanel = document.getElementById('settingsPanel');
        settingsToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            settingsPanel.classList.toggle('hidden');
        });

        // Close settings when clicking outside
        document.addEventListener('click', (e) => {
            if (!settingsPanel.contains(e.target) && !settingsToggle.contains(e.target)) {
                settingsPanel.classList.add('hidden');
            }
        });

        // Auto-refresh toggle
        const autoRefreshToggle = document.getElementById('autoRefreshToggle');
        autoRefreshToggle.addEventListener('change', (e) => {
            this.autoRefreshEnabled = e.target.checked;
            if (this.autoRefreshEnabled) {
                this.startAutoRefresh();
            } else {
                this.stopAutoRefresh();
            }
        });

        // Refresh interval change
        const refreshInterval = document.getElementById('refreshInterval');
        refreshInterval.addEventListener('change', (e) => {
            this.refreshInterval = parseInt(e.target.value);
            if (this.autoRefreshEnabled) {
                this.startAutoRefresh();
            }
        });

        // Module-specific refresh buttons
        document.querySelectorAll('.module-refresh').forEach(button => {
            button.addEventListener('click', (e) => {
                const module = e.target.closest('[data-module]')?.dataset.module || 
                             e.target.dataset.module;
                if (module) {
                    this.refreshModule(module);
                }
            });
        });

        // Technical symbol selector
        const technicalSymbolSelect = document.getElementById('technicalSymbolSelect');
        technicalSymbolSelect.addEventListener('change', (e) => {
            this.updateTechnicalData(e.target.value);
        });
    }

    setupTabs() {
        document.querySelectorAll('.tab-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const tabName = e.target.dataset.tab;
                const module = e.target.closest('.dashboard__module');
                
                // Update active tab button
                module.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');
                
                // Update active tab content
                module.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
                module.querySelector(`#${tabName}Tab`).classList.add('active');
            });
        });
    }

    setupSettings() {
        // Initialize settings from localStorage if available
        const savedSettings = this.loadSettings();
        if (savedSettings) {
            this.autoRefreshEnabled = savedSettings.autoRefresh;
            this.refreshInterval = savedSettings.refreshInterval;
            
            document.getElementById('autoRefreshToggle').checked = this.autoRefreshEnabled;
            document.getElementById('refreshInterval').value = this.refreshInterval;
        }
    }

    loadSettings() {
        try {
            // Since we can't use localStorage, return default settings
            return {
                autoRefresh: true,
                refreshInterval: 30
            };
        } catch (error) {
            console.warn('Could not load settings:', error);
            return null;
        }
    }

    async performSync() {
        if (this.isLoading) return;
        
        this.isLoading = true;
        this.currentRetryCount = 0;
        
        // Update sync button state
        this.updateSyncButton('syncing');
        this.updateConnectionStatus('syncing');
        
        try {
            await this.syncAllModules();
            this.updateSyncButton('success');
            this.updateConnectionStatus('connected');
            this.updateLastSyncTime(new Date());
            this.showToast('success', 'Sync Complete', 'All modules updated successfully');
            
            // Reset to normal state after success indication
            setTimeout(() => {
                if (!this.isLoading) {
                    this.updateSyncButton('idle');
                }
            }, 2000);
            
        } catch (error) {
            console.error('Sync failed:', error);
            this.updateSyncButton('error');
            this.updateConnectionStatus('error');
            this.showToast('error', 'Sync Failed', error.message || 'Failed to update data');
            
            // Reset to normal state after error indication
            setTimeout(() => {
                if (!this.isLoading) {
                    this.updateSyncButton('idle');
                    this.updateConnectionStatus('connected');
                }
            }, 3000);
        } finally {
            this.isLoading = false;
        }
    }

    async syncAllModules() {
        const modules = [
            'premarket_movers',
            'gap_volatility_scanner', 
            'catalyst_tracker',
            'technical_snapshot',
            'options_heatmap',
            'custom_filters'
        ];

        // Show loading states for all modules
        modules.forEach(module => this.showLoadingState(module, true));

        try {
            const syncPromises = modules.map(module => this.refreshModule(module));
            await Promise.all(syncPromises);
        } finally {
            // Hide loading states for all modules
            modules.forEach(module => this.showLoadingState(module, false));
        }
    }

    async refreshModule(moduleName) {
        const button = document.querySelector(`[data-module="${moduleName}"] .module-refresh`);
        if (button) {
            button.classList.add('refreshing');
        }

        try {
            // Show loading state for this specific module
            this.showLoadingState(moduleName, true);
            
            // Simulate network delay
            await this.delay(Math.random() * 1000 + 500);
            
            // Simulate random errors
            await this.simulateAPICall(moduleName);
            
            // Generate fresh data with variations
            this.generateFreshData();
            
            // Load module data
            await this.loadModuleData(moduleName);
            
        } catch (error) {
            console.error(`Failed to refresh ${moduleName}:`, error);
            this.showToast('warning', 'Module Update Failed', `${moduleName.replace('_', ' ')} could not be updated: ${error.message}`);
            throw error;
        } finally {
            this.showLoadingState(moduleName, false);
            if (button) {
                button.classList.remove('refreshing');
            }
        }
    }

    generateFreshData() {
        // Generate slight variations in the data to simulate real updates
        this.sampleData.premarket_movers.gainers.forEach(stock => {
            const variation = (Math.random() - 0.5) * 0.5; // +/- 0.25
            stock.price += variation;
            stock.change += variation;
            stock.change_percent = (stock.change / (stock.price - stock.change)) * 100;
            stock.volume += Math.floor((Math.random() - 0.5) * 10000);
        });

        this.sampleData.premarket_movers.losers.forEach(stock => {
            const variation = (Math.random() - 0.5) * 0.5;
            stock.price += variation;
            stock.change += variation;
            stock.change_percent = (stock.change / (stock.price - stock.change)) * 100;
            stock.volume += Math.floor((Math.random() - 0.5) * 10000);
        });

        // Update other data sections similarly
        this.sampleData.options_flow.put_call_ratio += (Math.random() - 0.5) * 0.1;
        this.sampleData.options_flow.put_call_ratio = Math.max(0.1, Math.min(2.0, this.sampleData.options_flow.put_call_ratio));
    }

    async simulateAPICall(moduleName) {
        // Randomly simulate different types of errors
        const shouldError = Math.random() < 0.12; // 12% chance of error
        
        if (shouldError) {
            const errorType = this.errorPatterns[Math.floor(Math.random() * this.errorPatterns.length)];
            
            if (this.currentRetryCount < this.retryAttempts) {
                this.currentRetryCount++;
                this.showToast('warning', 'Retrying...', `${errorType.message} (Attempt ${this.currentRetryCount}/${this.retryAttempts})`);
                
                // Exponential backoff
                await this.delay(Math.pow(2, this.currentRetryCount) * 500);
                
                // Recursive retry
                return this.simulateAPICall(moduleName);
            } else {
                throw new Error(errorType.message);
            }
        }
        
        // Success case
        this.currentRetryCount = 0;
    }

    async loadModuleData(moduleName) {
        switch (moduleName) {
            case 'premarket_movers':
                await this.loadPremarketMovers();
                break;
            case 'gap_volatility_scanner':
                await this.loadGapVolatilityData();
                break;
            case 'catalyst_tracker':
                await this.loadCatalystData();
                break;
            case 'technical_snapshot':
                await this.loadTechnicalData();
                break;
            case 'options_heatmap':
                await this.loadOptionsData();
                break;
            case 'custom_filters':
                await this.loadCustomFiltersData();
                break;
        }
    }

    async loadInitialData() {
        // Load all modules with sample data
        await Promise.all([
            this.loadPremarketMovers(),
            this.loadGapVolatilityData(),
            this.loadCatalystData(),
            this.loadTechnicalData(),
            this.loadOptionsData(),
            this.loadCustomFiltersData()
        ]);
    }

    async loadPremarketMovers() {
        await this.delay(200);
        
        // Load gainers
        const gainersBody = document.getElementById('gainersTableBody');
        gainersBody.innerHTML = this.sampleData.premarket_movers.gainers.map(stock => `
            <tr>
                <td><a href="#" class="symbol-link">${stock.symbol}</a></td>
                <td class="price-positive">$${stock.price.toFixed(2)}</td>
                <td class="price-positive">+$${stock.change.toFixed(2)}</td>
                <td class="price-positive">+${stock.change_percent.toFixed(2)}%</td>
                <td>${this.formatVolume(stock.volume)}</td>
                <td>${stock.relative_volume.toFixed(2)}x</td>
                <td><a href="${stock.options_chain_link}" class="symbol-link" target="_blank">Chain</a></td>
            </tr>
        `).join('');

        // Load losers
        const losersBody = document.getElementById('losersTableBody');
        losersBody.innerHTML = this.sampleData.premarket_movers.losers.map(stock => `
            <tr>
                <td><a href="#" class="symbol-link">${stock.symbol}</a></td>
                <td class="price-negative">$${stock.price.toFixed(2)}</td>
                <td class="price-negative">$${stock.change.toFixed(2)}</td>
                <td class="price-negative">${stock.change_percent.toFixed(2)}%</td>
                <td>${this.formatVolume(stock.volume)}</td>
                <td>${stock.relative_volume.toFixed(2)}x</td>
                <td><a href="${stock.options_chain_link}" class="symbol-link" target="_blank">Chain</a></td>
            </tr>
        `).join('');
    }

    async loadGapVolatilityData() {
        await this.delay(200);
        
        // Load gap up stocks
        const gapUpBody = document.getElementById('gapUpTableBody');
        gapUpBody.innerHTML = this.sampleData.gap_volatility.gap_up.map(stock => `
            <tr>
                <td><a href="#" class="symbol-link">${stock.symbol}</a></td>
                <td class="price-positive">+${stock.gap_percent.toFixed(2)}%</td>
                <td><span class="${this.getIVRankClass(stock.iv_rank)}">${stock.iv_rank}</span></td>
                <td>${stock.iv_crush_potential}</td>
                <td>${stock.liquidity_score}</td>
                <td>$${stock.bid_ask_spread.toFixed(2)}</td>
            </tr>
        `).join('');

        // Load gap down stocks
        const gapDownBody = document.getElementById('gapDownTableBody');
        gapDownBody.innerHTML = this.sampleData.gap_volatility.gap_down.map(stock => `
            <tr>
                <td><a href="#" class="symbol-link">${stock.symbol}</a></td>
                <td class="price-negative">${stock.gap_percent.toFixed(2)}%</td>
                <td><span class="${this.getIVRankClass(stock.iv_rank)}">${stock.iv_rank}</span></td>
                <td>${stock.iv_crush_potential}</td>
                <td>${stock.liquidity_score}</td>
                <td>$${stock.bid_ask_spread.toFixed(2)}</td>
            </tr>
        `).join('');
    }

    async loadCatalystData() {
        await this.delay(150);
        
        // Today's earnings
        const todayEarnings = document.getElementById('todayEarnings');
        todayEarnings.innerHTML = this.sampleData.catalysts.earnings_today.map(ticker => 
            `<span class="earnings-ticker">${ticker}</span>`
        ).join('');

        // Tomorrow's earnings
        const tomorrowEarnings = document.getElementById('tomorrowEarnings');
        tomorrowEarnings.innerHTML = this.sampleData.catalysts.earnings_tomorrow.map(ticker => 
            `<span class="earnings-ticker">${ticker}</span>`
        ).join('');

        // Latest news
        const latestNews = document.getElementById('latestNews');
        latestNews.innerHTML = this.sampleData.catalysts.news_events.map(news => `
            <div class="news-item">
                <div class="news-headline">${news.headline}</div>
                <div class="news-meta">${news.symbol} • ${this.formatTime(news.timestamp)}</div>
            </div>
        `).join('');

        // Macro events
        const macroEvents = document.getElementById('macroEvents');
        macroEvents.innerHTML = this.sampleData.catalysts.macro_events.map(event => `
            <div class="macro-event">
                <div>
                    <div class="event-name">${event.event}</div>
                    <div class="event-time">${event.time}</div>
                </div>
                <span class="event-impact ${event.impact.toLowerCase()}">${event.impact}</span>
            </div>
        `).join('');
    }

    async loadTechnicalData() {
        await this.delay(300);
        
        const selectedSymbol = document.getElementById('technicalSymbolSelect').value;
        this.updateTechnicalData(selectedSymbol);
    }

    updateTechnicalData(symbol) {
        const data = this.sampleData.technical_data[symbol];
        if (!data) return;

        // Add slight variations to make updates visible
        const rsiVariation = (Math.random() - 0.5) * 5;
        const atrVariation = (Math.random() - 0.5) * 0.5;
        const supportVariation = (Math.random() - 0.5) * 2;
        const resistanceVariation = (Math.random() - 0.5) * 2;

        document.getElementById('rsiValue').textContent = Math.max(0, Math.min(100, data.rsi + rsiVariation)).toFixed(1);
        document.getElementById('macdValue').textContent = data.macd;
        document.getElementById('bollingerValue').textContent = data.bollinger;
        document.getElementById('atrValue').textContent = Math.max(0, data.atr + atrVariation).toFixed(2);
        document.getElementById('supportValue').textContent = `$${Math.max(0, data.support + supportVariation).toFixed(2)}`;
        document.getElementById('resistanceValue').textContent = `$${Math.max(0, data.resistance + resistanceVariation).toFixed(2)}`;

        // Draw simple chart
        this.drawMiniChart(symbol);
    }

    drawMiniChart(symbol) {
        const chartContainer = document.getElementById('technicalChart');
        
        // Create a simple SVG-based chart
        const timestamp = new Date().toLocaleTimeString();
        chartContainer.innerHTML = `
            <svg width="100%" height="100%" viewBox="0 0 300 160" style="background: var(--color-background);">
                <defs>
                    <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style="stop-color:var(--color-primary);stop-opacity:0.3" />
                        <stop offset="100%" style="stop-color:var(--color-primary);stop-opacity:0.1" />
                    </linearGradient>
                </defs>
                
                <!-- Chart line -->
                <polyline 
                    fill="none" 
                    stroke="var(--color-primary)" 
                    stroke-width="2" 
                    points="20,120 60,80 100,100 140,60 180,90 220,40 260,70 280,50"
                />
                
                <!-- Chart area fill -->
                <polygon 
                    fill="url(#chartGradient)" 
                    points="20,120 60,80 100,100 140,60 180,90 220,40 260,70 280,50 280,140 20,140"
                />
                
                <!-- Chart title -->
                <text x="150" y="25" text-anchor="middle" fill="var(--color-text)" font-size="14" font-weight="500">
                    ${symbol} Price Action
                </text>
                
                <!-- Update timestamp -->
                <text x="150" y="155" text-anchor="middle" fill="var(--color-text-secondary)" font-size="10">
                    Updated: ${timestamp}
                </text>
            </svg>
        `;
    }

    async loadOptionsData() {
        await this.delay(250);
        
        // Update metrics with variations
        document.getElementById('putCallRatio').textContent = this.sampleData.options_flow.put_call_ratio.toFixed(2);
        document.getElementById('darkPoolActivity').textContent = this.sampleData.options_flow.dark_pool_activity;

        // Load unusual options activity
        const unusualBody = document.getElementById('unusualOptionsTableBody');
        unusualBody.innerHTML = this.sampleData.options_flow.unusual_activity.map(option => `
            <tr>
                <td><a href="#" class="symbol-link">${option.symbol}</a></td>
                <td>${option.type}</td>
                <td>$${option.strike}</td>
                <td>${option.expiry}</td>
                <td>${this.formatVolume(option.volume)}</td>
                <td class="price-positive">+${this.formatVolume(option.oi_change)}</td>
            </tr>
        `).join('');
    }

    async loadCustomFiltersData() {
        await this.delay(100);
        // Custom filters data is mostly static UI elements
        // Market countdown is handled separately
    }

    startMarketCountdown() {
        const updateCountdown = () => {
            const now = new Date();
            const marketOpen = new Date();
            marketOpen.setHours(9, 30, 0, 0); // 9:30 AM market open
            
            // If it's past market open, set for next day
            if (now >= marketOpen) {
                marketOpen.setDate(marketOpen.getDate() + 1);
            }
            
            const diff = marketOpen - now;
            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            
            const countdownElement = document.querySelector('.countdown-value');
            if (countdownElement) {
                countdownElement.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            }
        };
        
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    startAutoRefresh() {
        this.stopAutoRefresh();
        
        if (this.autoRefreshEnabled) {
            this.autoRefreshTimer = setInterval(() => {
                if (!this.isLoading) {
                    this.performSync();
                }
            }, this.refreshInterval * 1000);
        }
    }

    stopAutoRefresh() {
        if (this.autoRefreshTimer) {
            clearInterval(this.autoRefreshTimer);
            this.autoRefreshTimer = null;
        }
    }

    showLoadingState(moduleName, show) {
        const loadingSelectors = {
            'premarket_movers': ['#gainersLoading', '#losersLoading'],
            'gap_volatility_scanner': ['#gapUpLoading', '#gapDownLoading'],
            'catalyst_tracker': ['#earningsTodayLoading', '#earningsTomorrowLoading', '#newsLoading', '#macroEventsLoading'],
            'technical_snapshot': ['#chartLoading', '#indicatorsLoading'],
            'options_heatmap': ['#optionsHeatmapLoading'],
            'custom_filters': ['#marketTimingLoading']
        };

        const selectors = loadingSelectors[moduleName] || [];
        selectors.forEach(selector => {
            const element = document.querySelector(selector);
            if (element) {
                if (show) {
                    element.classList.add('active');
                } else {
                    element.classList.remove('active');
                }
            }
        });
    }

    updateSyncButton(state) {
        const button = document.getElementById('syncButton');
        const icon = button.querySelector('.sync-icon');
        const text = button.querySelector('.sync-text');
        const spinner = button.querySelector('.sync-spinner');

        // Reset classes
        button.classList.remove('syncing', 'success', 'error');
        
        switch (state) {
            case 'syncing':
                button.classList.add('syncing');
                button.disabled = true;
                text.textContent = 'SYNCING...';
                icon.classList.add('hidden');
                spinner.classList.remove('hidden');
                break;
            case 'success':
                button.classList.add('success');
                button.disabled = false;
                text.textContent = 'SUCCESS';
                icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
                icon.classList.remove('hidden');
                spinner.classList.add('hidden');
                break;
            case 'error':
                button.classList.add('error');
                button.disabled = false;
                text.textContent = 'RETRY';
                icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;
                icon.classList.remove('hidden');
                spinner.classList.add('hidden');
                break;
            default: // idle
                button.disabled = false;
                text.textContent = 'SYNC NOW';
                icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38"/></svg>`;
                icon.classList.remove('hidden');
                spinner.classList.add('hidden');
                break;
        }
    }

    updateConnectionStatus(status) {
        const statusElement = document.getElementById('connectionStatus');
        const indicator = statusElement.querySelector('.connection-status__indicator');
        const text = statusElement.querySelector('.connection-status__text');

        indicator.classList.remove('warning', 'error');
        
        switch (status) {
            case 'connected':
                text.textContent = 'Connected';
                break;
            case 'syncing':
                indicator.classList.add('warning');
                text.textContent = 'Syncing...';
                break;
            case 'error':
                indicator.classList.add('error');
                text.textContent = 'Connection Error';
                break;
        }
    }

    updateLastSyncTime(time) {
        const element = document.getElementById('lastSyncTime');
        if (time === 'Never') {
            element.textContent = 'Last sync: Never';
        } else {
            const timeString = time.toLocaleTimeString('en-US', { 
                hour12: false, 
                hour: '2-digit', 
                minute: '2-digit', 
                second: '2-digit' 
            });
            element.textContent = `Last sync: ${timeString}`;
        }
        this.lastSyncTime = time;
    }

    showToast(type, title, message, duration = 5000) {
        const container = document.getElementById('toastContainer');
        const toast = document.createElement('div');
        toast.className = `toast toast--${type}`;
        
        // Different icons for different toast types
        const icons = {
            success: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00C851" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`,
            error: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`,
            warning: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFC107" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="m12 17 .01 0"/></svg>`,
            info: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"/><path d="m12 8 .01 0"/></svg>`
        };
        
        toast.innerHTML = `
            <div class="toast__icon">${icons[type] || icons.info}</div>
            <div class="toast__content">
                <div class="toast__title">${title}</div>
                <div class="toast__message">${message}</div>
            </div>
            <button class="toast__close">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
        `;

        // Add close functionality
        const closeButton = toast.querySelector('.toast__close');
        closeButton.addEventListener('click', () => this.removeToast(toast));

        container.appendChild(toast);

        // Auto-remove after duration
        setTimeout(() => {
            this.removeToast(toast);
        }, duration);
    }

    removeToast(toast) {
        toast.classList.add('toast--exit');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }

    // Utility methods
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    formatVolume(volume) {
        if (volume >= 1000000) {
            return (volume / 1000000).toFixed(1) + 'M';
        } else if (volume >= 1000) {
            return (volume / 1000).toFixed(1) + 'K';
        }
        return volume.toString();
    }

    formatTime(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
        });
    }

    getIVRankClass(rank) {
        if (rank >= 70) return 'iv-rank-high';
        if (rank >= 40) return 'iv-rank-medium';
        return 'iv-rank-low';
    }
}

// Initialize the dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.dashboard = new PremarketDashboard();
});

// Handle page visibility changes for auto-refresh
document.addEventListener('visibilitychange', () => {
    if (window.dashboard) {
        if (document.hidden) {
            window.dashboard.stopAutoRefresh();
        } else {
            window.dashboard.startAutoRefresh();
        }
    }
});