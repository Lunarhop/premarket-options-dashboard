// Premarket Options Trading Dashboard JavaScript

// Data from the provided JSON
const data = {
  "premarket_movers": [
    {"ticker": "AMZN", "prev_close": 183.86, "premarket_price": 205.31, "change_pct": 11.66, "volume": 2528388, "avg_volume": 9916786, "relative_volume": 0.25, "market_cap_b": 2044.1, "sector": "Technology"},
    {"ticker": "GOOGL", "prev_close": 66.33, "premarket_price": 73.94, "change_pct": 11.48, "volume": 1600942, "avg_volume": 4275709, "relative_volume": 0.37, "market_cap_b": 2357.7, "sector": "Financial"},
    {"ticker": "TSLA", "prev_close": 57.20, "premarket_price": 63.72, "change_pct": 11.40, "volume": 1866891, "avg_volume": 5521373, "relative_volume": 0.34, "market_cap_b": 644.9, "sector": "Healthcare"},
    {"ticker": "AAPL", "prev_close": 181.09, "premarket_price": 201.03, "change_pct": 11.01, "volume": 1792743, "avg_volume": 5304572, "relative_volume": 0.34, "market_cap_b": 1794.6, "sector": "Consumer"},
    {"ticker": "META", "prev_close": 72.77, "premarket_price": 80.76, "change_pct": 10.98, "volume": 3485659, "avg_volume": 4385357, "relative_volume": 0.79, "market_cap_b": 2427.1, "sector": "Technology"},
    {"ticker": "NVDA", "prev_close": 104.60, "premarket_price": 97.45, "change_pct": -6.84, "volume": 4144887, "avg_volume": 8204212, "relative_volume": 0.51, "market_cap_b": 1807.3, "sector": "Financial"},
    {"ticker": "MSFT", "prev_close": 114.19, "premarket_price": 112.00, "change_pct": -1.92, "volume": 1407371, "avg_volume": 6743066, "relative_volume": 0.21, "market_cap_b": 1839.4, "sector": "Consumer"}
  ],
  "iv_data": [
    {"ticker": "NVDA", "iv_rank": 75, "iv_percentile": 56, "iv_current": 0.685, "iv_30day_avg": 0.435, "hv_30day": 0.633, "iv_hv_ratio": 1.08},
    {"ticker": "MSFT", "iv_rank": 71, "iv_percentile": 15, "iv_current": 0.337, "iv_30day_avg": 0.342, "hv_30day": 0.605, "iv_hv_ratio": 0.56},
    {"ticker": "AAPL", "iv_rank": 45, "iv_percentile": 27, "iv_current": 0.246, "iv_30day_avg": 0.280, "hv_30day": 0.264, "iv_hv_ratio": 0.93},
    {"ticker": "TSLA", "iv_rank": 37, "iv_percentile": 58, "iv_current": 0.450, "iv_30day_avg": 0.547, "hv_30day": 0.349, "iv_hv_ratio": 1.29},
    {"ticker": "GOOGL", "iv_rank": 12, "iv_percentile": 84, "iv_current": 0.506, "iv_30day_avg": 0.338, "hv_30day": 0.295, "iv_hv_ratio": 1.71}
  ],
  "options_flow": [
    {"ticker": "TSLA", "call_volume": 45545, "put_volume": 3197, "total_volume": 48742, "put_call_ratio": 0.07, "call_oi": 99045, "put_oi": 42698, "total_oi": 141743, "unusual_activity": "Low"},
    {"ticker": "NVDA", "call_volume": 49215, "put_volume": 15688, "total_volume": 64903, "put_call_ratio": 0.32, "call_oi": 35342, "put_oi": 45157, "total_oi": 80499, "unusual_activity": "Medium"},
    {"ticker": "AAPL", "call_volume": 31309, "put_volume": 24919, "total_volume": 56228, "put_call_ratio": 0.80, "call_oi": 73734, "put_oi": 78467, "total_oi": 152201, "unusual_activity": "High"},
    {"ticker": "MSFT", "call_volume": 27671, "put_volume": 28184, "total_volume": 55855, "put_call_ratio": 1.02, "call_oi": 52107, "put_oi": 59663, "total_oi": 111770, "unusual_activity": "High"}
  ],
  "catalysts": [
    {"ticker": "AAPL", "event": "Earnings Release", "time": "07:00 EST", "impact": "High"},
    {"ticker": "NVDA", "event": "GPU Conference", "time": "09:00 EST", "impact": "Medium"},
    {"ticker": "TSLA", "event": "Production Update", "time": "08:30 EST", "impact": "High"},
    {"ticker": "MSFT", "event": "Cloud Revenue Report", "time": "07:30 EST", "impact": "Medium"},
    {"ticker": "GOOGL", "event": "Ad Revenue Guidance", "time": "08:00 EST", "impact": "High"},
    {"ticker": "SPY", "event": "CPI Release", "time": "08:30 EST", "impact": "High"},
    {"ticker": "QQQ", "event": "Fed Speech", "time": "10:00 EST", "impact": "Medium"}
  ],
  "technical_data": [
    {"ticker": "NVDA", "rsi": 67.1, "macd": 1.345, "bb_position": 0.58, "atr": 6.84, "support": 217.61, "resistance": 278.95, "trend": "Bullish"},
    {"ticker": "AAPL", "rsi": 62.0, "macd": 2.233, "bb_position": 0.86, "atr": 7.26, "support": 215.51, "resistance": 274.04, "trend": "Neutral"},
    {"ticker": "GOOGL", "rsi": 58.2, "macd": -0.748, "bb_position": 0.59, "atr": 14.73, "support": 199.47, "resistance": 276.24, "trend": "Bearish"},
    {"ticker": "TSLA", "rsi": 38.3, "macd": 0.428, "bb_position": 0.45, "atr": 14.93, "support": 187.04, "resistance": 240.72, "trend": "Bearish"},
    {"ticker": "MSFT", "rsi": 30.7, "macd": -0.168, "bb_position": 0.74, "atr": 11.37, "support": 192.32, "resistance": 261.70, "trend": "Bearish"}
  ]
};

// Global variables
let currentSortColumn = null;
let currentSortDirection = 'asc';

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    initializeDashboard();
    updateTime();
    setInterval(updateTime, 1000);
});

function initializeDashboard() {
    setupNavigation();
    populateOverview();
    populateMoversTable();
    populateVolatilityData();
    populateCatalysts();
    populateTechnicalData();
    populateOptionsData();
    setupFilters();
    setupTableSorting();
    createPutCallRatioChart();
    showAlert('Dashboard loaded successfully!', 'success');
}

// Navigation handling
function setupNavigation() {
    const navTabs = document.querySelectorAll('.nav-tab');
    const tabContents = document.querySelectorAll('.tab-content');

    navTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.dataset.tab;
            
            // Update active tab
            navTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Show target content
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === targetTab) {
                    content.classList.add('active');
                }
            });
        });
    });
}

// Time and countdown functions
function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', {
        timeZone: 'America/New_York',
        hour12: true
    });
    
    document.getElementById('current-time').textContent = timeString;
    
    // Market countdown (9:30 AM EST)
    const marketOpen = new Date();
    marketOpen.setHours(9, 30, 0, 0);
    
    if (now > marketOpen) {
        marketOpen.setDate(marketOpen.getDate() + 1);
    }
    
    const timeDiff = marketOpen - now;
    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
    
    document.getElementById('countdown-timer').textContent = 
        `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Overview section
function populateOverview() {
    // Calculate stats
    const topGainer = Math.max(...data.premarket_movers.map(m => m.change_pct));
    const topLoser = Math.min(...data.premarket_movers.map(m => m.change_pct));
    const highIVCount = data.iv_data.filter(iv => iv.iv_rank > 50).length;
    const majorCatalysts = data.catalysts.filter(c => c.impact === 'High').length;
    
    document.getElementById('top-gainer').textContent = `+${topGainer.toFixed(2)}%`;
    document.getElementById('top-loser').textContent = `${topLoser.toFixed(2)}%`;
    document.getElementById('high-iv').textContent = highIVCount;
    document.getElementById('major-catalysts').textContent = majorCatalysts;
    
    // Populate opportunities
    populateOpportunities();
}

function populateOpportunities() {
    const opportunityList = document.getElementById('opportunity-list');
    const opportunities = identifyHighProbabilitySetups();
    
    opportunityList.innerHTML = opportunities.map(opp => `
        <div class="opportunity-item">
            <div>
                <div class="opportunity-ticker">${opp.ticker}</div>
                <div class="opportunity-details">
                    <div class="opportunity-metrics">
                        <span>IV: ${opp.iv_rank}</span>
                        <span>Gap: ${opp.gap > 0 ? '+' : ''}${opp.gap.toFixed(2)}%</span>
                        <span>Vol: ${opp.relative_volume.toFixed(2)}x</span>
                    </div>
                </div>
            </div>
            <button class="btn btn-sm" onclick="addToWatchlist('${opp.ticker}')">Add to Watchlist</button>
        </div>
    `).join('');
}

// Movers table
function populateMoversTable() {
    const tbody = document.getElementById('movers-tbody');
    tbody.innerHTML = data.premarket_movers.map(mover => `
        <tr>
            <td><strong>${mover.ticker}</strong></td>
            <td>$${mover.prev_close.toFixed(2)}</td>
            <td>$${mover.premarket_price.toFixed(2)}</td>
            <td class="${mover.change_pct >= 0 ? 'positive' : 'negative'}">
                ${mover.change_pct >= 0 ? '+' : ''}${mover.change_pct.toFixed(2)}%
            </td>
            <td>${formatNumber(mover.volume)}</td>
            <td>${mover.relative_volume.toFixed(2)}x</td>
            <td>$${mover.market_cap_b.toFixed(1)}B</td>
            <td>${mover.sector}</td>
            <td>
                <button class="btn btn-sm" onclick="viewOptionsChain('${mover.ticker}')">Options Chain</button>
            </td>
        </tr>
    `).join('');
}

// Volatility data
function populateVolatilityData() {
    // Gap stocks
    const gapUpList = document.getElementById('gap-up-list');
    const gapDownList = document.getElementById('gap-down-list');
    
    const gapUp = data.premarket_movers.filter(m => m.change_pct > 2);
    const gapDown = data.premarket_movers.filter(m => m.change_pct < -2);
    
    gapUpList.innerHTML = gapUp.map(stock => `
        <div class="gap-item">
            <span class="gap-ticker">${stock.ticker}</span>
            <span class="gap-value positive">+${stock.change_pct.toFixed(2)}%</span>
        </div>
    `).join('');
    
    gapDownList.innerHTML = gapDown.map(stock => `
        <div class="gap-item">
            <span class="gap-ticker">${stock.ticker}</span>
            <span class="gap-value negative">${stock.change_pct.toFixed(2)}%</span>
        </div>
    `).join('');
    
    // IV table
    const ivTbody = document.getElementById('iv-tbody');
    ivTbody.innerHTML = data.iv_data.map(iv => `
        <tr>
            <td><strong>${iv.ticker}</strong></td>
            <td class="${getIVRankClass(iv.iv_rank)}">${iv.iv_rank}</td>
            <td>${(iv.iv_current * 100).toFixed(1)}%</td>
            <td>${(iv.iv_30day_avg * 100).toFixed(1)}%</td>
            <td>${iv.iv_hv_ratio.toFixed(2)}</td>
            <td>
                <span class="status ${getIVStatusClass(iv.iv_rank)}">
                    ${getIVStatus(iv.iv_rank)}
                </span>
            </td>
        </tr>
    `).join('');
}

// Catalysts
function populateCatalysts() {
    const catalystTimeline = document.getElementById('catalyst-timeline');
    const sortedCatalysts = data.catalysts.sort((a, b) => {
        const timeA = convertTimeToMinutes(a.time);
        const timeB = convertTimeToMinutes(b.time);
        return timeA - timeB;
    });
    
    catalystTimeline.innerHTML = sortedCatalysts.map(catalyst => `
        <div class="catalyst-item ${catalyst.impact.toLowerCase()}-impact">
            <div class="catalyst-time">${catalyst.time}</div>
            <div class="catalyst-content">
                <span class="catalyst-ticker">${catalyst.ticker}</span>
                <span class="catalyst-event">${catalyst.event}</span>
                <span class="catalyst-impact impact-${catalyst.impact.toLowerCase()}">${catalyst.impact}</span>
            </div>
        </div>
    `).join('');
    
    // Hot watchlist
    const hotWatchlist = document.getElementById('hot-watchlist');
    const hotTickers = getHotWatchlistTickers();
    
    hotWatchlist.innerHTML = hotTickers.map(ticker => `
        <div class="watchlist-item">
            <div>
                <strong>${ticker.name}</strong>
                <div style="font-size: 12px; color: #a7a9a9;">${ticker.catalysts.join(', ')}</div>
            </div>
            <button class="btn btn-sm btn-outline" onclick="addToWatchlist('${ticker.name}')">Watch</button>
        </div>
    `).join('');
}

// Technical analysis
function populateTechnicalData() {
    const technicalCards = document.getElementById('technical-cards');
    
    technicalCards.innerHTML = data.technical_data.map(tech => `
        <div class="technical-card">
            <div class="technical-header">
                <div class="technical-ticker">${tech.ticker}</div>
                <div class="technical-trend trend-${tech.trend.toLowerCase()}">${tech.trend}</div>
            </div>
            <div class="technical-metrics">
                <div class="metric-item">
                    <div class="metric-label">RSI</div>
                    <div class="metric-value">${tech.rsi.toFixed(1)}</div>
                </div>
                <div class="metric-item">
                    <div class="metric-label">MACD</div>
                    <div class="metric-value">${tech.macd.toFixed(3)}</div>
                </div>
                <div class="metric-item">
                    <div class="metric-label">BB Position</div>
                    <div class="metric-value">${(tech.bb_position * 100).toFixed(0)}%</div>
                </div>
                <div class="metric-item">
                    <div class="metric-label">ATR</div>
                    <div class="metric-value">${tech.atr.toFixed(2)}</div>
                </div>
            </div>
            <div class="price-levels">
                <div class="level-item">
                    <span class="level-label">Support:</span>
                    <span class="level-value">$${tech.support.toFixed(2)}</span>
                </div>
                <div class="level-item">
                    <span class="level-label">Resistance:</span>
                    <span class="level-value">$${tech.resistance.toFixed(2)}</span>
                </div>
            </div>
        </div>
    `).join('');
}

// Options data
function populateOptionsData() {
    const optionsTbody = document.getElementById('options-tbody');
    
    optionsTbody.innerHTML = data.options_flow.map(flow => `
        <tr>
            <td><strong>${flow.ticker}</strong></td>
            <td>${formatNumber(flow.call_volume)}</td>
            <td>${formatNumber(flow.put_volume)}</td>
            <td>${flow.put_call_ratio.toFixed(2)}</td>
            <td>${formatNumber(flow.total_oi)}</td>
            <td>
                <span class="status status--${flow.unusual_activity.toLowerCase() === 'high' ? 'error' : 
                    flow.unusual_activity.toLowerCase() === 'medium' ? 'warning' : 'info'}">
                    ${flow.unusual_activity}
                </span>
            </td>
        </tr>
    `).join('');
}

// Create Put/Call Ratio Chart
function createPutCallRatioChart() {
    const canvas = document.getElementById('pc-ratio-chart');
    const ctx = canvas.getContext('2d');
    
    // Simple bar chart for P/C ratios
    const tickers = data.options_flow.map(f => f.ticker);
    const ratios = data.options_flow.map(f => f.put_call_ratio);
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Chart settings
    const padding = 40;
    const barWidth = (canvas.width - 2 * padding) / tickers.length;
    const maxRatio = Math.max(...ratios);
    const chartHeight = canvas.height - 2 * padding;
    
    // Draw bars
    tickers.forEach((ticker, index) => {
        const barHeight = (ratios[index] / maxRatio) * chartHeight;
        const x = padding + index * barWidth;
        const y = canvas.height - padding - barHeight;
        
        // Bar color based on ratio
        ctx.fillStyle = ratios[index] > 0.8 ? '#f44336' : ratios[index] > 0.5 ? '#f7b924' : '#4caf50';
        ctx.fillRect(x + 5, y, barWidth - 10, barHeight);
        
        // Ticker label
        ctx.fillStyle = '#f5f5f5';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(ticker, x + barWidth / 2, canvas.height - 10);
        
        // Ratio value
        ctx.fillText(ratios[index].toFixed(2), x + barWidth / 2, y - 5);
    });
    
    // Y-axis labels
    ctx.fillStyle = '#a7a9a9';
    ctx.font = '10px Arial';
    ctx.textAlign = 'right';
    for (let i = 0; i <= 5; i++) {
        const value = (maxRatio / 5) * i;
        const y = canvas.height - padding - (i / 5) * chartHeight;
        ctx.fillText(value.toFixed(1), padding - 10, y);
    }
}

// Filters setup
function setupFilters() {
    // Strategy toggles
    const toggles = document.querySelectorAll('.strategy-toggles input[type="checkbox"]');
    toggles.forEach(toggle => {
        toggle.addEventListener('change', updateFilteredResults);
    });
    
    // Range sliders
    const ranges = document.querySelectorAll('.range-filter input[type="range"]');
    ranges.forEach(range => {
        range.addEventListener('input', function() {
            const valueSpan = this.parentElement.querySelector('span');
            if (this.id === 'gap-filter') {
                valueSpan.textContent = this.value + '%';
            } else {
                valueSpan.textContent = this.value;
            }
            updateFilteredResults();
        });
    });
    
    // Sector filter
    document.getElementById('sector-filter').addEventListener('change', filterMoversTable);
    document.getElementById('min-volume').addEventListener('input', filterMoversTable);
    document.getElementById('market-cap-filter').addEventListener('change', filterMoversTable);
    
    // Initial filter update
    updateFilteredResults();
}

// Table sorting
function setupTableSorting() {
    const tables = document.querySelectorAll('.data-table');
    tables.forEach(table => {
        const headers = table.querySelectorAll('th[data-sort]');
        headers.forEach(header => {
            header.addEventListener('click', () => {
                const sortKey = header.dataset.sort;
                const tableId = table.id;
                sortTable(tableId, sortKey);
            });
        });
    });
}

function sortTable(tableId, sortKey) {
    const table = document.getElementById(tableId);
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    
    // Determine sort direction
    const isCurrentColumn = currentSortColumn === sortKey;
    const direction = isCurrentColumn && currentSortDirection === 'asc' ? 'desc' : 'asc';
    
    // Update global sort state
    currentSortColumn = sortKey;
    currentSortDirection = direction;
    
    // Update header classes
    const headers = table.querySelectorAll('th[data-sort]');
    headers.forEach(h => {
        h.classList.remove('sort-asc', 'sort-desc');
        if (h.dataset.sort === sortKey) {
            h.classList.add(`sort-${direction}`);
        }
    });
    
    // Sort rows
    const sortedRows = rows.sort((a, b) => {
        const aValue = getCellValue(a, sortKey);
        const bValue = getCellValue(b, sortKey);
        
        if (typeof aValue === 'number' && typeof bValue === 'number') {
            return direction === 'asc' ? aValue - bValue : bValue - aValue;
        } else {
            return direction === 'asc' ? 
                aValue.localeCompare(bValue) : 
                bValue.localeCompare(aValue);
        }
    });
    
    // Re-append sorted rows
    sortedRows.forEach(row => tbody.appendChild(row));
}

function getCellValue(row, sortKey) {
    const cellIndex = {
        'ticker': 0,
        'prev_close': 1,
        'premarket_price': 2,
        'change_pct': 3,
        'volume': 4,
        'relative_volume': 5,
        'market_cap_b': 6,
        'sector': 7
    }[sortKey];
    
    const cellText = row.cells[cellIndex].textContent.trim();
    
    // Parse numbers
    if (sortKey === 'ticker' || sortKey === 'sector') {
        return cellText;
    } else {
        return parseFloat(cellText.replace(/[$%,BK]/g, '')) || 0;
    }
}

// Filter functions
function filterMoversTable() {
    const sectorFilter = document.getElementById('sector-filter').value;
    const minVolume = parseInt(document.getElementById('min-volume').value) || 0;
    const marketCapFilter = document.getElementById('market-cap-filter').value;
    
    const rows = document.querySelectorAll('#movers-tbody tr');
    
    rows.forEach(row => {
        const ticker = row.cells[0].textContent.trim();
        const mover = data.premarket_movers.find(m => m.ticker === ticker);
        
        let show = true;
        
        // Sector filter
        if (sectorFilter && mover.sector !== sectorFilter) {
            show = false;
        }
        
        // Volume filter
        if (mover.volume < minVolume) {
            show = false;
        }
        
        // Market cap filter
        if (marketCapFilter) {
            const marketCap = mover.market_cap_b;
            if (marketCapFilter === 'large' && marketCap < 10) show = false;
            if (marketCapFilter === 'mid' && (marketCap < 2 || marketCap > 10)) show = false;
            if (marketCapFilter === 'small' && marketCap > 2) show = false;
        }
        
        row.style.display = show ? '' : 'none';
    });
}

function updateFilteredResults() {
    const creditSpreads = document.getElementById('credit-spreads').checked;
    const debitSpreads = document.getElementById('debit-spreads').checked;
    const nakedOptions = document.getElementById('naked-options').checked;
    
    const ivRankMin = parseInt(document.getElementById('iv-rank-filter').value);
    const liquidityMin = parseInt(document.getElementById('liquidity-filter').value);
    const gapMin = parseFloat(document.getElementById('gap-filter').value);
    
    const results = identifyHighProbabilitySetups(ivRankMin, liquidityMin, gapMin);
    const filteredResults = document.getElementById('filtered-results');
    
    filteredResults.innerHTML = results.map(result => `
        <div class="setup-card">
            <div class="setup-ticker">${result.ticker}</div>
            <div class="setup-metrics">
                <div class="setup-metric">
                    <span>IV Rank:</span>
                    <span>${result.iv_rank}</span>
                </div>
                <div class="setup-metric">
                    <span>Gap:</span>
                    <span class="${result.gap >= 0 ? 'positive' : 'negative'}">
                        ${result.gap >= 0 ? '+' : ''}${result.gap.toFixed(2)}%
                    </span>
                </div>
                <div class="setup-metric">
                    <span>Rel Vol:</span>
                    <span>${result.relative_volume.toFixed(2)}x</span>
                </div>
                <div class="setup-metric">
                    <span>Liquidity:</span>
                    <span>${result.liquidity_score}</span>
                </div>
            </div>
            <div class="setup-strategies">
                ${creditSpreads ? '<span class="strategy-tag">Credit Spread</span>' : ''}
                ${debitSpreads ? '<span class="strategy-tag">Debit Spread</span>' : ''}
                ${nakedOptions ? '<span class="strategy-tag">Naked Option</span>' : ''}
            </div>
        </div>
    `).join('');
}

// Utility functions
function identifyHighProbabilitySetups(ivRankMin = 50, liquidityMin = 75, gapMin = 2) {
    const setups = [];
    
    data.premarket_movers.forEach(mover => {
        const ivData = data.iv_data.find(iv => iv.ticker === mover.ticker);
        const catalyst = data.catalysts.find(c => c.ticker === mover.ticker);
        
        if (ivData && Math.abs(mover.change_pct) >= gapMin && ivData.iv_rank >= ivRankMin) {
            setups.push({
                ticker: mover.ticker,
                gap: mover.change_pct,
                iv_rank: ivData.iv_rank,
                relative_volume: mover.relative_volume,
                liquidity_score: calculateLiquidityScore(mover.ticker),
                has_catalyst: !!catalyst
            });
        }
    });
    
    return setups.filter(s => s.liquidity_score >= liquidityMin);
}

function calculateLiquidityScore(ticker) {
    const optionsData = data.options_flow.find(o => o.ticker === ticker);
    if (!optionsData) return 50;
    
    // Simple liquidity score based on volume and open interest
    const volumeScore = Math.min(optionsData.total_volume / 1000, 50);
    const oiScore = Math.min(optionsData.total_oi / 2000, 50);
    
    return Math.round(volumeScore + oiScore);
}

function getHotWatchlistTickers() {
    const tickerCatalysts = {};
    
    data.catalysts.forEach(catalyst => {
        if (!tickerCatalysts[catalyst.ticker]) {
            tickerCatalysts[catalyst.ticker] = [];
        }
        tickerCatalysts[catalyst.ticker].push(catalyst.event);
    });
    
    return Object.entries(tickerCatalysts)
        .filter(([ticker, catalysts]) => catalysts.length > 1 || 
            data.catalysts.find(c => c.ticker === ticker && c.impact === 'High'))
        .map(([ticker, catalysts]) => ({
            name: ticker,
            catalysts: catalysts
        }));
}

function getIVRankClass(ivRank) {
    if (ivRank > 70) return 'negative';
    if (ivRank > 50) return 'warning';
    return 'positive';
}

function getIVStatusClass(ivRank) {
    if (ivRank > 70) return 'status--error';
    if (ivRank > 50) return 'status--warning';
    return 'status--success';
}

function getIVStatus(ivRank) {
    if (ivRank > 70) return 'High';
    if (ivRank > 50) return 'Medium';
    return 'Low';
}

function convertTimeToMinutes(timeString) {
    const [time, meridian] = timeString.split(' ');
    const [hours, minutes] = time.split(':').map(Number);
    let totalMinutes = hours * 60 + minutes;
    
    if (meridian === 'PM' && hours !== 12) {
        totalMinutes += 12 * 60;
    } else if (meridian === 'AM' && hours === 12) {
        totalMinutes -= 12 * 60;
    }
    
    return totalMinutes;
}

function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

// Interactive functions
function viewOptionsChain(ticker) {
    showAlert(`Opening options chain for ${ticker}`, 'info');
    // In a real application, this would open the options chain
}

function addToWatchlist(ticker) {
    showAlert(`${ticker} added to watchlist`, 'success');
    // In a real application, this would add to user's watchlist
}

function showAlert(message, type = 'info') {
    const alertContainer = document.getElementById('alert-container');
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    
    alertContainer.appendChild(alert);
    
    // Remove alert after 3 seconds
    setTimeout(() => {
        alert.remove();
    }, 3000);
}