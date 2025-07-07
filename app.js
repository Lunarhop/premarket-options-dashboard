// Market Dashboard Application
class MarketDashboard {
    constructor() {
        this.currentPeriod = '1D';
        this.currentSector = 'all';
        this.data = this.getMarketData();
        this.init();
    }

    // Market data from the provided JSON
    getMarketData() {
        return {
            "timestamp": "2025-06-18",
            "last_updated": "2025-06-18T21:30:00Z",
            "indices": [
                {
                    "symbol": "SPX",
                    "name": "S&P 500", 
                    "price": 6003.91,
                    "change": 21.19,
                    "change_percent": 0.35,
                    "high": 6018.25,
                    "low": 5980.68,
                    "volume": "3.2B"
                },
                {
                    "symbol": "DJI",
                    "name": "Dow Jones",
                    "price": 42343.04,
                    "change": 127.24,
                    "change_percent": 0.30,
                    "high": 42510.07,
                    "low": 42195.38,
                    "volume": "467M"
                },
                {
                    "symbol": "IXIC",
                    "name": "NASDAQ",
                    "price": 19616.11,
                    "change": 95.02,
                    "change_percent": 0.49,
                    "high": 19660.77,
                    "low": 19489.56,
                    "volume": "4.1B"
                }
            ],
            "top_gainers": [
                {"symbol": "INTC", "name": "Intel Corp", "price": 21.53, "change_percent": 3.51},
                {"symbol": "TSLA", "name": "Tesla Inc", "price": 327.02, "change_percent": 3.27},
                {"symbol": "ADI", "name": "Analog Devices", "price": 232.03, "change_percent": 1.91},
                {"symbol": "REGN", "name": "Regeneron Pharmaceuticals", "price": 517.85, "change_percent": 1.77},
                {"symbol": "CHTR", "name": "Charter Communications", "price": 379.49, "change_percent": 1.56}
            ],
            "top_losers": [
                {"symbol": "V", "name": "Visa Inc", "price": 349.82, "change_percent": -2.26},
                {"symbol": "DOW", "name": "Dow Inc", "price": 28.94, "change_percent": -1.70},
                {"symbol": "DIS", "name": "Walt Disney Co", "price": 117.29, "change_percent": -0.75},
                {"symbol": "JNJ", "name": "Johnson & Johnson", "price": 151.28, "change_percent": -0.72},
                {"symbol": "MCD", "name": "McDonald's Corp", "price": 290.59, "change_percent": -0.60}
            ],
            "currencies": [
                {
                    "pair": "EUR/USD",
                    "rate": 1.1508,
                    "change": -0.0060,
                    "change_percent": -0.52,
                    "high": 1.1589,
                    "low": 1.1474
                },
                {
                    "pair": "BTC/USD",
                    "rate": 104725,
                    "change": -1469,
                    "change_percent": -1.38,
                    "high": 106210,
                    "low": 103597
                }
            ],
            "commodities": [
                {
                    "symbol": "GOLD",
                    "name": "Gold",
                    "price": 3394.70,
                    "unit": "USD/oz",
                    "change": -13.40,
                    "change_percent": -0.39,
                    "high": 3405.20,
                    "low": 3386.30
                },
                {
                    "symbol": "SILVER", 
                    "name": "Silver",
                    "price": 36.74,
                    "unit": "USD/oz",
                    "change": -0.17,
                    "change_percent": -0.46,
                    "high": 36.82,
                    "low": 36.69
                },
                {
                    "symbol": "COPPER",
                    "name": "Copper",
                    "price": 4.849,
                    "unit": "USD/lb",
                    "change": -0.0040,
                    "change_percent": -0.08,
                    "high": 4.8685,
                    "low": 4.8475
                }
            ],
            "sectors": [
                {"name": "Technology", "ytd_return": 5.09, "monthly_return": 9.97, "weight": 31.6},
                {"name": "Communication Services", "ytd_return": 7.07, "monthly_return": 7.3, "weight": 9.6},
                {"name": "Industrials", "ytd_return": 8.2, "monthly_return": 8.84, "weight": 8.7},
                {"name": "Energy", "ytd_return": 3.47, "monthly_return": -13.0, "weight": 3.0},
                {"name": "Utilities", "ytd_return": 6.2, "monthly_return": 0.4, "weight": 2.5},
                {"name": "Financials", "ytd_return": 3.9, "monthly_return": 0.1, "weight": 14.3},
                {"name": "Consumer Discretionary", "ytd_return": -6.3, "monthly_return": -3.7, "weight": 10.6},
                {"name": "Health Care", "ytd_return": -4.7, "monthly_return": -9.1, "weight": 9.6},
                {"name": "Consumer Staples", "ytd_return": 3.15, "monthly_return": 3.1, "weight": 5.9},
                {"name": "Materials", "ytd_return": -2.3, "monthly_return": -7.5, "weight": 1.9},
                {"name": "Real Estate", "ytd_return": 15.9, "monthly_return": -5.5, "weight": 2.1}
            ],
            "news": [
                {
                    "headline": "Fed Holds Rates Steady, Forecasts Two Cuts This Year",
                    "summary": "Federal Reserve maintains current interest rates amid Middle East tensions, but signals potential for two rate cuts by year end.",
                    "timestamp": "2025-06-18T16:00:00Z",
                    "source": "MarketWatch"
                },
                {
                    "headline": "Middle East Tensions Drive Market Volatility",
                    "summary": "Escalating Israel-Iran tensions push gold and oil prices higher while weighing on equity markets.",
                    "timestamp": "2025-06-18T14:30:00Z",
                    "source": "Barron's"
                },
                {
                    "headline": "Technology Sector Leads Market Recovery", 
                    "summary": "Tech stocks rebound with 5.09% gains as AI spending continues to drive investor optimism.",
                    "timestamp": "2025-06-18T13:15:00Z",
                    "source": "Reuters"
                },
                {
                    "headline": "Energy Sector Emerges as New Market Leader",
                    "summary": "Energy stocks climb 3.47% as sector rotation begins amid commodity price strength.",
                    "timestamp": "2025-06-18T12:00:00Z",
                    "source": "Bloomberg"
                }
            ],
            "investment_insights": {
                "market_outlook": {
                    "overall_sentiment": "Cautiously Optimistic",
                    "key_drivers": [
                        "Fed maintaining accommodative stance with potential rate cuts",
                        "Technology sector showing resilience despite valuations", 
                        "Geopolitical tensions creating volatility opportunities",
                        "Sector rotation from growth to value continuing"
                    ],
                    "risk_factors": [
                        "Middle East tensions affecting energy and safe-haven assets",
                        "Inflation persistence despite cooling trends",
                        "Trade policy uncertainties with tariff implications",
                        "Corporate earnings pressure in some sectors"
                    ]
                },
                "actionable_recommendations": [
                    {
                        "strategy": "Sector Rotation Play",
                        "description": "Consider rotating from overvalued tech positions into undervalued energy and utilities",
                        "risk_level": "Medium",
                        "time_horizon": "3-6 months"
                    },
                    {
                        "strategy": "Safe Haven Diversification",
                        "description": "Increase gold allocation as hedge against geopolitical risks",
                        "risk_level": "Low",
                        "time_horizon": "6-12 months"
                    },
                    {
                        "strategy": "Currency Hedging",
                        "description": "Consider EUR/USD volatility trades given ECB policy divergence",
                        "risk_level": "High",
                        "time_horizon": "1-3 months"
                    },
                    {
                        "strategy": "Quality Growth Focus",
                        "description": "Focus on large-cap tech stocks with strong fundamentals and AI exposure",
                        "risk_level": "Medium-High",
                        "time_horizon": "12+ months"
                    }
                ]
            }
        };
    }

    init() {
        this.updateTime();
        this.updateLastUpdated();
        this.setupEventListeners();
        this.renderMarketOverview();
        this.renderGainersLosers();
        this.renderCurrencies();
        this.renderCommodities();
        this.renderSectors();
        this.renderNews();
        this.renderInvestmentInsights();
        
        // Update time every second
        setInterval(() => this.updateTime(), 1000);
    }

    updateTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        document.getElementById('currentTime').textContent = timeString;
    }

    updateLastUpdated() {
        const lastUpdated = new Date(this.data.last_updated);
        const timeString = lastUpdated.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        document.getElementById('lastUpdated').textContent = timeString;
    }

    setupEventListeners() {
        // Time period filters
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.currentPeriod = e.target.dataset.period;
                this.updateDisplayForPeriod();
            });
        });

        // Sector filter
        document.getElementById('sectorFilter').addEventListener('change', (e) => {
            this.currentSector = e.target.value;
            this.updateDisplayForSector();
        });
    }

    updateDisplayForPeriod() {
        // In a real app, this would fetch different data based on the period
        // For now, we'll just add a visual indication that the filter is working
        const marketCards = document.querySelectorAll('.market-card');
        marketCards.forEach(card => {
            card.style.opacity = '0.7';
            setTimeout(() => {
                card.style.opacity = '1';
            }, 200);
        });
    }

    updateDisplayForSector() {
        // Filter and render sectors based on selection
        const sectorsToShow = this.currentSector === 'all' 
            ? this.data.sectors 
            : this.data.sectors.filter(sector => sector.name === this.currentSector);
        
        this.renderSectorsData(sectorsToShow);
    }

    formatNumber(num, decimals = 2) {
        if (num >= 1000000000) {
            return (num / 1000000000).toFixed(1) + 'B';
        } else if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toFixed(decimals);
    }

    formatChange(change, changePercent) {
        const sign = change > 0 ? '+' : '';
        const arrow = change > 0 ? '▲' : '▼';
        const className = change > 0 ? 'positive' : 'negative';
        
        return {
            sign,
            arrow,
            className,
            changeText: `${sign}${change.toFixed(2)}`,
            percentText: `${sign}${changePercent.toFixed(2)}%`
        };
    }

    renderMarketOverview() {
        const container = document.getElementById('marketCards');
        container.innerHTML = this.data.indices.map(index => {
            const change = this.formatChange(index.change, index.change_percent);
            
            return `
                <div class="market-card" data-symbol="${index.symbol}">
                    <div class="market-card__header">
                        <span class="market-card__symbol">${index.symbol}</span>
                        <span class="trend-arrow ${change.className}">${change.arrow}</span>
                    </div>
                    <div class="market-card__name">${index.name}</div>
                    <div class="market-card__price">${this.formatNumber(index.price)}</div>
                    <div class="market-card__change">
                        <span class="change-value ${change.className}">${change.changeText}</span>
                        <span class="change-percent ${change.className}">${change.percentText}</span>
                    </div>
                    <div class="market-card__details">
                        <div>
                            <div>High</div>
                            <div>${this.formatNumber(index.high)}</div>
                        </div>
                        <div>
                            <div>Low</div>
                            <div>${this.formatNumber(index.low)}</div>
                        </div>
                        <div>
                            <div>Volume</div>
                            <div>${index.volume}</div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    renderGainersLosers() {
        // Render top gainers
        const gainersContainer = document.getElementById('topGainers');
        gainersContainer.innerHTML = this.data.top_gainers.map(stock => {
            const change = this.formatChange(0, stock.change_percent);
            
            return `
                <div class="stock-row">
                    <div class="stock-symbol">${stock.symbol}</div>
                    <div class="stock-name">${stock.name}</div>
                    <div class="stock-price">$${stock.price.toFixed(2)}</div>
                    <div class="stock-change ${change.className}">${change.percentText}</div>
                </div>
            `;
        }).join('');

        // Render top losers
        const losersContainer = document.getElementById('topLosers');
        losersContainer.innerHTML = this.data.top_losers.map(stock => {
            const change = this.formatChange(0, stock.change_percent);
            
            return `
                <div class="stock-row">
                    <div class="stock-symbol">${stock.symbol}</div>
                    <div class="stock-name">${stock.name}</div>
                    <div class="stock-price">$${stock.price.toFixed(2)}</div>
                    <div class="stock-change ${change.className}">${change.percentText}</div>
                </div>
            `;
        }).join('');
    }

    renderCurrencies() {
        const container = document.getElementById('currencyCards');
        container.innerHTML = this.data.currencies.map(currency => {
            const change = this.formatChange(currency.change, currency.change_percent);
            
            return `
                <div class="asset-card">
                    <div class="asset-card__header">
                        <div class="asset-name">${currency.pair}</div>
                        <div class="trend-arrow ${change.className}">${change.arrow}</div>
                    </div>
                    <div class="asset-price">${currency.rate.toLocaleString()}</div>
                    <div class="asset-change">
                        <span class="${change.className}">${change.changeText}</span>
                        <span class="${change.className}">(${change.percentText})</span>
                    </div>
                    <div class="asset-range">
                        <small>H: ${currency.high.toLocaleString()} L: ${currency.low.toLocaleString()}</small>
                    </div>
                </div>
            `;
        }).join('');
    }

    renderCommodities() {
        const container = document.getElementById('commodityCards');
        container.innerHTML = this.data.commodities.map(commodity => {
            const change = this.formatChange(commodity.change, commodity.change_percent);
            
            return `
                <div class="asset-card">
                    <div class="asset-card__header">
                        <div class="asset-name">${commodity.name}</div>
                        <div class="trend-arrow ${change.className}">${change.arrow}</div>
                    </div>
                    <div class="asset-price">$${commodity.price.toFixed(2)} <small>${commodity.unit}</small></div>
                    <div class="asset-change">
                        <span class="${change.className}">${change.changeText}</span>
                        <span class="${change.className}">(${change.percentText})</span>
                    </div>
                    <div class="asset-range">
                        <small>H: $${commodity.high.toFixed(2)} L: $${commodity.low.toFixed(2)}</small>
                    </div>
                </div>
            `;
        }).join('');
    }

    renderSectors() {
        this.renderSectorsData(this.data.sectors);
    }

    renderSectorsData(sectors) {
        const container = document.getElementById('sectorTable');
        const highlightClass = this.currentSector !== 'all' ? 'style="background: rgba(50, 184, 198, 0.15);"' : '';
        
        container.innerHTML = `
            <div class="sector-row" style="background: rgba(50, 184, 198, 0.1); font-weight: 600;">
                <div class="sector-name">Sector</div>
                <div class="sector-return">YTD Return</div>
                <div class="sector-return">Monthly Return</div>
                <div class="sector-return">Weight (%)</div>
            </div>
            ${sectors.map(sector => {
                const ytdClass = sector.ytd_return > 0 ? 'positive' : 'negative';
                const monthlyClass = sector.monthly_return > 0 ? 'positive' : 'negative';
                
                return `
                    <div class="sector-row" ${highlightClass}>
                        <div class="sector-name">${sector.name}</div>
                        <div class="sector-return ${ytdClass}">${sector.ytd_return.toFixed(2)}%</div>
                        <div class="sector-return ${monthlyClass}">${sector.monthly_return.toFixed(2)}%</div>
                        <div class="sector-return">${sector.weight.toFixed(1)}%</div>
                    </div>
                `;
            }).join('')}
        `;
    }

    renderNews() {
        const container = document.getElementById('newsFeed');
        container.innerHTML = this.data.news.map(item => {
            const timestamp = new Date(item.timestamp);
            const timeString = timestamp.toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
            
            return `
                <div class="news-item">
                    <div class="news-headline">${item.headline}</div>
                    <div class="news-summary">${item.summary}</div>
                    <div class="news-meta">
                        <span class="news-source">${item.source}</span>
                        <span class="news-timestamp">${timeString}</span>
                    </div>
                </div>
            `;
        }).join('');
    }

    renderInvestmentInsights() {
        const insights = this.data.investment_insights;
        
        // Render market outlook
        const outlookContainer = document.getElementById('marketOutlook');
        outlookContainer.innerHTML = `
            <div class="outlook-sentiment">${insights.market_outlook.overall_sentiment}</div>
            <h4 style="color: #10b981; margin-bottom: 12px;">Key Drivers</h4>
            <ul class="outlook-list">
                ${insights.market_outlook.key_drivers.map(driver => 
                    `<li>${driver}</li>`
                ).join('')}
            </ul>
            <h4 style="color: #ef4444; margin-bottom: 12px; margin-top: 20px;">Risk Factors</h4>
            <ul class="outlook-list">
                ${insights.market_outlook.risk_factors.map(risk => 
                    `<li>${risk}</li>`
                ).join('')}
            </ul>
        `;

        // Render recommendations
        const recommendationsContainer = document.getElementById('recommendations');
        recommendationsContainer.innerHTML = insights.actionable_recommendations.map(rec => {
            const riskClass = rec.risk_level.toLowerCase().replace(/[\s-]/g, '');
            
            return `
                <div class="recommendation-card">
                    <div class="recommendation-title">${rec.strategy}</div>
                    <div class="recommendation-description">${rec.description}</div>
                    <div class="recommendation-meta">
                        <span class="risk-level risk-${riskClass}">${rec.risk_level} Risk</span>
                        <span class="time-horizon">${rec.time_horizon}</span>
                    </div>
                </div>
            `;
        }).join('');
    }
}

// Initialize the dashboard when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new MarketDashboard();
});