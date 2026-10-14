/**
 * Bhookhad — Mobile-First Application Engine
 * Asli Menus, Real Coupons, Crystal Clear Posters & Deal Arbitrage Math
 */

const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);
const esc = (x) => String(x ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// Popular Indian Food Capitals
const METRO_CITIES = [
  { name: 'Delhi', lat: 28.6315, lng: 77.2167 },
  { name: 'Mumbai', lat: 19.0760, lng: 72.8777 },
  { name: 'Bengaluru', lat: 12.9716, lng: 77.5946 },
  { name: 'Hyderabad', lat: 17.3850, lng: 78.4867 },
  { name: 'Pune', lat: 18.5204, lng: 73.8567 },
  { name: 'Kolkata', lat: 22.5726, lng: 88.3639 },
  { name: 'Patna', lat: 25.6039, lng: 85.1360 },
  { name: 'Chennai', lat: 13.0827, lng: 80.2707 },
  { name: 'Lucknow', lat: 26.8467, lng: 80.9462 },
  { name: 'Jaipur', lat: 26.9124, lng: 75.7873 }
];

// Curated Top Indian Foodie Hubs & Localities for Instant Local Autocomplete
const POPULAR_HUBS = [
  // Delhi-NCR
  { name: 'Connaught Place, New Delhi', short: 'Connaught Place', sub: 'Central Delhi, Delhi', lat: 28.6304, lng: 77.2177, badge: 'HOT' },
  { name: 'Hauz Khas Village, New Delhi', short: 'Hauz Khas', sub: 'South Delhi, Delhi', lat: 28.5494, lng: 77.2001, badge: 'FOOD HUB' },
  { name: 'Karol Bagh, New Delhi', short: 'Karol Bagh', sub: 'Central Delhi, Delhi', lat: 28.6514, lng: 77.1907, badge: 'FOOD HUB' },
  { name: 'Chandni Chowk, Old Delhi', short: 'Chandni Chowk', sub: 'North Delhi, Delhi', lat: 28.6506, lng: 77.2303, badge: 'LEGEND' },
  { name: 'Saket, New Delhi', short: 'Saket', sub: 'South Delhi, Delhi', lat: 28.5244, lng: 77.2066, badge: 'MALLS' },
  { name: 'Cyber City, Gurugram', short: 'Cyber Hub, Gurugram', sub: 'Gurgaon, Haryana', lat: 28.4950, lng: 77.0895, badge: 'HOT' },
  { name: 'Sector 18, Noida', short: 'Sector 18, Noida', sub: 'Gautam Buddha Nagar, UP', lat: 28.5708, lng: 77.3261, badge: 'HOT' },
  { name: 'Indirapuram, Ghaziabad', short: 'Indirapuram', sub: 'Ghaziabad, UP', lat: 28.6415, lng: 77.3714, badge: 'AREA' },
  { name: 'Dwarka Sector 12, New Delhi', short: 'Dwarka', sub: 'South West Delhi, Delhi', lat: 28.5921, lng: 77.0460, badge: 'AREA' },

  // Mumbai-MMR
  { name: 'Bandra West, Mumbai', short: 'Bandra West', sub: 'Mumbai Western Suburbs, Maharashtra', lat: 19.0596, lng: 72.8295, badge: 'HOT' },
  { name: 'Andheri West, Mumbai', short: 'Andheri West', sub: 'Mumbai Western Suburbs, Maharashtra', lat: 19.1363, lng: 72.8277, badge: 'FOOD HUB' },
  { name: 'Powai, Mumbai', short: 'Powai (Hiranandani)', sub: 'Central Mumbai, Maharashtra', lat: 19.1176, lng: 72.9060, badge: 'HOT' },
  { name: 'Lower Parel, Mumbai', short: 'Lower Parel', sub: 'South Mumbai, Maharashtra', lat: 18.9953, lng: 72.8302, badge: 'HOT' },
  { name: 'Juhu, Mumbai', short: 'Juhu', sub: 'Mumbai Western Suburbs, Maharashtra', lat: 19.1075, lng: 72.8263, badge: 'BEACH' },
  { name: 'Colaba, Mumbai', short: 'Colaba', sub: 'South Mumbai, Maharashtra', lat: 18.9067, lng: 72.8147, badge: 'LEGEND' },
  { name: 'Thane West, Thane', short: 'Thane West', sub: 'Thane, Maharashtra', lat: 19.2183, lng: 72.9781, badge: 'AREA' },
  { name: 'Vashi, Navi Mumbai', short: 'Vashi', sub: 'Navi Mumbai, Maharashtra', lat: 19.0771, lng: 72.9986, badge: 'AREA' },

  // Bengaluru
  { name: 'Koramangala, Bengaluru', short: 'Koramangala', sub: 'Bengaluru Urban, Karnataka', lat: 12.9352, lng: 77.6245, badge: 'HOT' },
  { name: 'Indiranagar, Bengaluru', short: 'Indiranagar', sub: 'Bengaluru Urban, Karnataka', lat: 12.9784, lng: 77.6408, badge: 'HOT' },
  { name: 'HSR Layout, Bengaluru', short: 'HSR Layout', sub: 'Bengaluru Urban, Karnataka', lat: 12.9121, lng: 77.6446, badge: 'HOT' },
  { name: 'Whitefield, Bengaluru', short: 'Whitefield', sub: 'Bengaluru Urban, Karnataka', lat: 12.9698, lng: 77.7500, badge: 'TECH' },
  { name: 'Church Street / MG Road, Bengaluru', short: 'Church Street / MG Road', sub: 'Central Bengaluru, Karnataka', lat: 12.9756, lng: 77.6066, badge: 'FOOD HUB' },
  { name: 'Jayanagar, Bengaluru', short: 'Jayanagar', sub: 'South Bengaluru, Karnataka', lat: 12.9308, lng: 77.5838, badge: 'AREA' },

  // Hyderabad
  { name: 'Jubilee Hills, Hyderabad', short: 'Jubilee Hills', sub: 'Hyderabad, Telangana', lat: 17.4319, lng: 78.4073, badge: 'HOT' },
  { name: 'Banjara Hills, Hyderabad', short: 'Banjara Hills', sub: 'Hyderabad, Telangana', lat: 17.4156, lng: 78.4350, badge: 'HOT' },
  { name: 'Gachibowli, Hyderabad', short: 'Gachibowli', sub: 'Hyderabad, Telangana', lat: 17.4401, lng: 78.3489, badge: 'TECH' },
  { name: 'Madhapur / Hitec City, Hyderabad', short: 'Madhapur (Hitec City)', sub: 'Hyderabad, Telangana', lat: 17.4483, lng: 78.3828, badge: 'TECH' },
  { name: 'Charminar, Old City', short: 'Charminar (Biryani Hub)', sub: 'Hyderabad, Telangana', lat: 17.3616, lng: 78.4747, badge: 'LEGEND' },

  // Pune
  { name: 'Koregaon Park, Pune', short: 'Koregaon Park', sub: 'Pune, Maharashtra', lat: 18.5362, lng: 73.8940, badge: 'HOT' },
  { name: 'Viman Nagar, Pune', short: 'Viman Nagar', sub: 'Pune, Maharashtra', lat: 18.5679, lng: 73.9143, badge: 'HOT' },
  { name: 'Kothrud, Pune', short: 'Kothrud', sub: 'Pune, Maharashtra', lat: 18.5074, lng: 73.8077, badge: 'AREA' },
  { name: 'Baner, Pune', short: 'Baner', sub: 'Pune, Maharashtra', lat: 18.5590, lng: 73.7868, badge: 'HOT' },
  { name: 'Hinjewadi, Pune', short: 'Hinjewadi IT Park', sub: 'Pune, Maharashtra', lat: 18.5913, lng: 73.7389, badge: 'TECH' },

  // Kolkata
  { name: 'Park Street, Kolkata', short: 'Park Street', sub: 'Central Kolkata, West Bengal', lat: 22.5516, lng: 88.3524, badge: 'LEGEND' },
  { name: 'Salt Lake Sector V, Kolkata', short: 'Salt Lake (Sector V)', sub: 'Kolkata, West Bengal', lat: 22.5735, lng: 88.4331, badge: 'TECH' },
  { name: 'New Town, Kolkata', short: 'New Town', sub: 'North 24 Parganas, West Bengal', lat: 22.5850, lng: 88.4735, badge: 'AREA' },

  // Chennai
  { name: 'T. Nagar, Chennai', short: 'T. Nagar', sub: 'Chennai, Tamil Nadu', lat: 13.0418, lng: 80.2341, badge: 'HOT' },
  { name: 'Nungambakkam, Chennai', short: 'Nungambakkam', sub: 'Central Chennai, Tamil Nadu', lat: 13.0569, lng: 80.2425, badge: 'FOOD HUB' },
  { name: 'Adyar / Besant Nagar, Chennai', short: 'Adyar & Besant Nagar', sub: 'South Chennai, Tamil Nadu', lat: 13.0012, lng: 80.2565, badge: 'BEACH' },

  // Other Top Indian Cities
  { name: 'Hazratganj, Lucknow', short: 'Hazratganj', sub: 'Lucknow, Uttar Pradesh', lat: 26.8530, lng: 80.9472, badge: 'LEGEND' },
  { name: 'Gomti Nagar, Lucknow', short: 'Gomti Nagar', sub: 'Lucknow, Uttar Pradesh', lat: 26.8500, lng: 81.0000, badge: 'HOT' },
  { name: 'C-Scheme, Jaipur', short: 'C-Scheme', sub: 'Jaipur, Rajasthan', lat: 26.9100, lng: 75.8050, badge: 'HOT' },
  { name: 'Sector 17, Chandigarh', short: 'Sector 17', sub: 'Chandigarh, Punjab', lat: 30.7398, lng: 76.7827, badge: 'HOT' },
  { name: 'Vijay Nagar, Indore', short: 'Vijay Nagar', sub: 'Indore, Madhya Pradesh', lat: 22.7533, lng: 75.8937, badge: 'FOOD HUB' },
  { name: 'Chhappan Dukan, Indore', short: 'Chhappan Dukan', sub: 'Indore, Madhya Pradesh', lat: 22.7244, lng: 75.8839, badge: 'STREET' },
  { name: 'SG Highway, Ahmedabad', short: 'SG Highway', sub: 'Ahmedabad, Gujarat', lat: 23.0600, lng: 72.5300, badge: 'HOT' },
  { name: 'Boring Road, Patna', short: 'Boring Road', sub: 'Patna, Bihar', lat: 25.6180, lng: 85.1180, badge: 'AREA' },
  { name: 'Fraser Road, Patna', short: 'Fraser Road', sub: 'Patna, Bihar', lat: 25.6120, lng: 85.1370, badge: 'HOT' },
  { name: 'MG Road, Kochi', short: 'MG Road, Kochi', sub: 'Ernakulam, Kerala', lat: 9.9674, lng: 76.2825, badge: 'HOT' }
];

// App Reactive State
const state = {
  rows: new Map(),           // id -> restaurant object
  location: null,            // { lat, lng, label }
  ctx: null,                 // active scan context
  query: '',                 // deep menu search query
  mode: 'items',             // 'items' | 'restaurants'
  sort: 'best',              // 'best' | 'budget' | 'highest_pct' | 'rating' | 'delivery' | 'lowest_item'
  filters: new Set(),        // active filter keys
  cuisine: '',               // active cuisine filter
  amount: 500,               // basket order simulation amount
  visible: 18,               // pagination limit
  compareList: new Set(),    // selected restaurants for comparison (max 2)
  cart: [],                  // smart cart items: [{ id, name, price, restId, restName }]
  soundEnabled: true,        // audio toggle
  radarBlips: []             // radar targets [{ angle, dist, id, alpha }]
};

// Filter Definitions
const FILTER_DEFS = [
  ['offers', '⚡ Offers Only', (r) => !!r.offer],
  ['coupons', '🎟️ Coupon Codes', (r) => hasCouponCode(r)],
  ['p50', '🔥 50%+ Off', (r) => (valueDeal(r)?.rate || r.offer?.discount_pct || 0) >= 50],
  ['addons', '🍟 Add-on Hacks (<₹49)', (r) => (r.menu?.items || []).some((i) => (i.addons || []).some((a) => a.price > 0 && a.price <= 49))],
  ['veg', '🟢 Pure Veg', (r) => r.veg],
  ['rated', '★ 4.2+ Star', (r) => r.rating_num >= 4.2],
  ['fast', '🚀 Under 25 Min', (r) => r.delivery_mins > 0 && r.delivery_mins <= 25]
];

// ============================================================================
// Web Audio FX Synthesizer
// ============================================================================
let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) audioCtx = new AudioContextClass();
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function playSound(type) {
  if (!state.soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    if (type === 'blip') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(1600, now + 0.08);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.linearRampToValueAtTime(0, now + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.08);
    } else if (type === 'copy') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, now);
      osc.frequency.setValueAtTime(659.25, now + 0.06);
      osc.frequency.setValueAtTime(783.99, now + 0.12);
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.linearRampToValueAtTime(0, now + 0.22);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.22);
    } else if (type === 'cart') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.1);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.linearRampToValueAtTime(0, now + 0.1);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.1);
    }
  } catch (_) {}
}

// ============================================================================
// Interactive Bottom Radar Canvas (Placed at bottom as requested)
// ============================================================================
let radarAngle = 0;

function initRadarCanvas() {
  const canvas = $('#radarCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = canvas.width;
  const h = canvas.height;
  const cx = w / 2;
  const cy = h / 2;
  const radius = cx - 8;

  function drawRadar() {
    ctx.clearRect(0, 0, w, h);

    // Grid circles
    ctx.strokeStyle = 'rgba(0, 230, 118, 0.25)';
    ctx.lineWidth = 1;
    [0.25, 0.5, 0.75, 1].forEach((f) => {
      ctx.beginPath();
      ctx.arc(cx, cy, radius * f, 0, Math.PI * 2);
      ctx.stroke();
    });

    // Crosshairs
    ctx.strokeStyle = 'rgba(0, 230, 118, 0.2)';
    ctx.beginPath();
    ctx.moveTo(cx, 8);
    ctx.lineTo(cx, h - 8);
    ctx.moveTo(8, cy);
    ctx.lineTo(w - 8, cy);
    ctx.stroke();

    // Beam sweep
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(radarAngle);

    const sweepGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, radius);
    sweepGrad.addColorStop(0, 'rgba(0, 230, 118, 0.45)');
    sweepGrad.addColorStop(1, 'rgba(0, 230, 118, 0.0)');

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, radius, -0.4, 0);
    ctx.closePath();
    ctx.fillStyle = sweepGrad;
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(radius, 0);
    ctx.strokeStyle = 'rgba(0, 230, 118, 0.95)';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();

    // Render Blips
    state.radarBlips.forEach((b) => {
      const bx = cx + Math.cos(b.angle) * (b.dist * radius);
      const by = cy + Math.sin(b.angle) * (b.dist * radius);

      const diff = Math.abs(normalizeAngle(radarAngle - b.angle));
      if (diff < 0.2) {
        b.alpha = 1.0;
      } else {
        b.alpha = Math.max(0.25, b.alpha - 0.008);
      }

      ctx.beginPath();
      ctx.arc(bx, by, 4, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 230, 118, ${b.alpha})`;
      ctx.shadowColor = '#00e676';
      ctx.shadowBlur = b.alpha > 0.6 ? 12 : 3;
      ctx.fill();
      ctx.shadowBlur = 0;
    });

    radarAngle += 0.035;
    if (radarAngle > Math.PI * 2) radarAngle = 0;

    requestAnimationFrame(drawRadar);
  }

  requestAnimationFrame(drawRadar);
}

function normalizeAngle(a) {
  while (a > Math.PI) a -= Math.PI * 2;
  while (a < -Math.PI) a += Math.PI * 2;
  return a;
}

function addRadarBlip(id) {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = (hash << 5) - hash + id.charCodeAt(i);
  const angle = Math.abs(hash % 360) * (Math.PI / 180);
  const dist = 0.2 + (Math.abs(hash * 3) % 75) / 100;

  if (!state.radarBlips.some((b) => b.id === id)) {
    state.radarBlips.push({ id, angle, dist, alpha: 0.8 });
  }
}

// ============================================================================
// Initialization & DOM Events
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
  initRadarCanvas();
  renderCityPills();
  initLocationDrawerEvents();
  initSearchAndFilterControls();
  initCravingsCarousel();
  initCartDrawer();
  initBattleVersus();
  initMenuDialog();
  initMobileBottomNav();
  initPwa();

  $('#btnAudioToggle').onclick = () => {
    state.soundEnabled = !state.soundEnabled;
    $('#audioIcon').textContent = state.soundEnabled ? '🔊' : '🔇';
    showToast(state.soundEnabled ? 'Audio FX Enabled' : 'Audio FX Muted');
  };

  // Restore cached location or default to Delhi
  try {
    const cached = JSON.parse(localStorage.getItem('craveradar_loc') || 'null');
    if (cached?.lat && cached?.lng) {
      updateLocationDisplay(cached.label || 'Delhi');
      startBhookhadScan(cached.lat, cached.lng, cached.label || 'Delhi');
    } else {
      updateLocationDisplay('Delhi');
      startBhookhadScan(28.6315, 77.2167, 'Delhi');
    }
  } catch (_) {
    updateLocationDisplay('Delhi');
    startBhookhadScan(28.6315, 77.2167, 'Delhi');
  }
});

function updateLocationDisplay(label) {
  $('#headerLocationText').textContent = label;
  $('#heroLocationLabel').textContent = label;
  $('#locationInput').value = label;
  const clearBtn = $('#btnClearLocInput');
  if (clearBtn) clearBtn.hidden = !label;
}

function renderCityPills() {
  const container = $('#metroChips');
  container.innerHTML = '';
  METRO_CITIES.forEach((c) => {
    const btn = document.createElement('button');
    btn.className = 'city-pill';
    btn.textContent = c.name;
    btn.onclick = () => {
      closeLocationDrawer();
      updateLocationDisplay(c.name);
      startBhookhadScan(c.lat, c.lng, c.name);
    };
    container.appendChild(btn);
  });
}

function showToast(text) {
  const hub = $('#toastHub');
  const toast = document.createElement('div');
  toast.className = 'toast-item';
  toast.textContent = text;
  hub.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(12px)';
    toast.style.transition = 'all 0.3s';
    setTimeout(() => toast.remove(), 300);
  }, 2800);
}

// ============================================================================
// Location Drawer (Bottom Sheet & Autocomplete)
// ============================================================================
let suggestTimer, suggestToken = 0, suggestions = [];
let highlightedSuggestIndex = -1;

function openLocationDrawer() {
  $('#locationDrawer').classList.add('open');
  $('#locationBackdrop').classList.add('open');
  const input = $('#locationInput');
  const clearBtn = $('#btnClearLocInput');
  if (clearBtn) clearBtn.hidden = !input.value.trim();
  input.focus();
  input.select();
  showTrendingHubs();
}

function closeLocationDrawer() {
  $('#locationDrawer').classList.remove('open');
  $('#locationBackdrop').classList.remove('open');
  $('#suggestionsBox').classList.remove('active');
  highlightedSuggestIndex = -1;
}

function getInstantHubMatches(query) {
  if (!query) return [];
  const qClean = norm(query);
  if (!qClean) return [];

  const matched = [];
  const seen = new Set();

  // Match from METRO_CITIES first
  for (const m of METRO_CITIES) {
    if (norm(m.name).includes(qClean)) {
      seen.add(m.name.toLowerCase());
      matched.push({
        name: `${m.name}, India`,
        short: m.name,
        sub: 'Major Metro Area',
        lat: m.lat,
        lng: m.lng,
        badge: 'METRO'
      });
    }
  }

  // Match from POPULAR_HUBS
  for (const h of POPULAR_HUBS) {
    if (seen.has(h.short.toLowerCase())) continue;
    if (norm(h.name + ' ' + h.short + ' ' + h.sub).includes(qClean)) {
      matched.push(h);
    }
  }

  return matched;
}

function showTrendingHubs() {
  suggestions = POPULAR_HUBS.slice(0, 6);
  highlightedSuggestIndex = -1;
  const box = $('#suggestionsBox');

  box.innerHTML = `
    <div class="suggest-section-title">🔥 POPULAR FOODIE LOCALITIES</div>
    ${suggestions.map((s, idx) => `
      <button class="suggest-btn" data-idx="${idx}">
        <div class="suggest-left">
          <span class="suggest-pin">📍</span>
          <div class="suggest-text-col">
            <span class="suggest-title">${esc(s.short)}</span>
            <span class="suggest-sub">${esc(s.sub)}</span>
          </div>
        </div>
        <div class="suggest-meta">
          <span class="suggest-badge">${esc(s.badge || 'HOT')}</span>
          <span class="suggest-arrow">↗</span>
        </div>
      </button>
    `).join('')}
  `;
  box.classList.add('active');
  attachSuggestionClicks();
}

function renderSuggestions(query = '', isLoading = false) {
  const box = $('#suggestionsBox');
  highlightedSuggestIndex = -1;

  if (!suggestions.length && !isLoading) {
    box.innerHTML = `
      <div class="suggest-empty">
        <span>🔍</span>
        <div>"${esc(query)}" ke liye koi location nahi mili.</div>
        <small style="color:var(--text-dim); display:block; margin-top:4px;">Doosra area ya city ka naam likhein (e.g. Bandra, Connaught Place, Koramangala).</small>
      </div>
    `;
    box.classList.add('active');
    return;
  }

  let html = `<div class="suggest-section-title">SUGGESTIONS FOR "${esc(query.toUpperCase())}"</div>`;

  html += suggestions.slice(0, 8).map((s, idx) => `
    <button class="suggest-btn" data-idx="${idx}">
      <div class="suggest-left">
        <span class="suggest-pin">📍</span>
        <div class="suggest-text-col">
          <span class="suggest-title">${esc(s.short || s.name)}</span>
          <span class="suggest-sub">${esc(s.sub || s.name)}</span>
        </div>
      </div>
      <div class="suggest-meta">
        ${s.badge ? `<span class="suggest-badge">${esc(s.badge)}</span>` : ''}
        <span class="suggest-arrow">↗</span>
      </div>
    </button>
  `).join('');

  if (isLoading) {
    html += `
      <div class="suggest-loading">
        <div class="suggest-spinner"></div>
        <span>Swiggy live locations dhoondh rahe hain...</span>
      </div>
    `;
  }

  box.innerHTML = html;
  box.classList.add('active');
  attachSuggestionClicks();
}

function attachSuggestionClicks() {
  const box = $('#suggestionsBox');
  box.querySelectorAll('.suggest-btn').forEach((b) => {
    b.onclick = () => selectSuggestion(+b.dataset.idx);
  });
}

function updateHighlight(btns) {
  btns.forEach((b, idx) => {
    b.classList.toggle('selected', idx === highlightedSuggestIndex);
    if (idx === highlightedSuggestIndex) {
      b.scrollIntoView({ block: 'nearest' });
    }
  });
}

async function selectSuggestion(idx) {
  const s = suggestions[idx];
  if (!s) return;

  const label = s.short || s.name;
  closeLocationDrawer();
  updateLocationDisplay(label);

  // If local match already has coordinates
  if (s.lat && (s.lng || s.lon)) {
    showToast(`📍 Deliver to ${label}`);
    startBhookhadScan(s.lat, s.lng || s.lon, label);
    return;
  }

  // If place_id from Swiggy
  if (s.place_id) {
    showToast(`📍 ${label} set ho raha hai...`);
    try {
      const res = await fetch(`/api/geocode?place_id=${encodeURIComponent(s.place_id)}`);
      const d = await res.json();
      const lat = d.lat;
      const lng = d.lon ?? d.lng;
      if (lat && lng) {
        startBhookhadScan(lat, lng, s.short || d.short || label);
      } else {
        showToast('Location coordinates nahi mile, please doosra area chunein');
      }
    } catch (_) {
      showToast('Location fetch error aaya');
    }
  }
}

function initLocationDrawerEvents() {
  $('#btnHeaderLocation').onclick = openLocationDrawer;
  $('#btnHeroLoc').onclick = openLocationDrawer;
  $('#btnCloseLocation').onclick = closeLocationDrawer;
  $('#locationBackdrop').onclick = closeLocationDrawer;

  const input = $('#locationInput');
  const box = $('#suggestionsBox');
  const clearBtn = $('#btnClearLocInput');

  if (clearBtn) {
    clearBtn.onclick = () => {
      input.value = '';
      clearBtn.hidden = true;
      input.focus();
      showTrendingHubs();
    };
  }

  input.addEventListener('focus', () => {
    const q = input.value.trim();
    if (!q) {
      showTrendingHubs();
    } else {
      triggerSearch(q);
    }
  });

  input.addEventListener('input', () => {
    const q = input.value.trim();
    if (clearBtn) clearBtn.hidden = !q;

    if (!q) {
      showTrendingHubs();
      return;
    }

    triggerSearch(q);
  });

  function triggerSearch(q) {
    clearTimeout(suggestTimer);
    const token = ++suggestToken;

    // 1. Instant local matches (0ms response)
    const localMatches = getInstantHubMatches(q);
    suggestions = [...localMatches];

    if (localMatches.length > 0) {
      renderSuggestions(q, true);
    } else {
      renderSuggestions(q, true);
    }

    // 2. Swiggy Live Autocomplete with debounce
    suggestTimer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/geocode?q=${encodeURIComponent(q)}`);
        const data = await res.json();
        if (token !== suggestToken) return;

        const swiggyResults = data.results || [];
        const seenNames = new Set(localMatches.map((m) => (m.short || m.name).toLowerCase()));
        const combined = [...localMatches];

        for (const sw of swiggyResults) {
          const swName = (sw.short || sw.name || '').toLowerCase();
          if (!seenNames.has(swName)) {
            seenNames.add(swName);
            combined.push({
              place_id: sw.place_id,
              name: sw.name,
              short: sw.short || sw.name.split(',')[0],
              sub: sw.sub || sw.name,
              badge: 'AREA'
            });
          }
        }

        suggestions = combined;
        renderSuggestions(q, false);
      } catch (_) {
        if (token === suggestToken) {
          renderSuggestions(q, false);
        }
      }
    }, 200);
  }

  input.addEventListener('keydown', (e) => {
    const btns = box.querySelectorAll('.suggest-btn');
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!btns.length) return;
      highlightedSuggestIndex = (highlightedSuggestIndex + 1) % btns.length;
      updateHighlight(btns);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!btns.length) return;
      highlightedSuggestIndex = (highlightedSuggestIndex - 1 + btns.length) % btns.length;
      updateHighlight(btns);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (highlightedSuggestIndex >= 0 && highlightedSuggestIndex < suggestions.length) {
        selectSuggestion(highlightedSuggestIndex);
      } else {
        const q = input.value.trim();
        const city = METRO_CITIES.find((c) => c.name.toLowerCase() === q.toLowerCase());
        if (city) {
          closeLocationDrawer();
          updateLocationDisplay(city.name);
          startBhookhadScan(city.lat, city.lng, city.name);
        } else if (suggestions.length > 0) {
          selectSuggestion(0);
        }
      }
    } else if (e.key === 'Escape') {
      closeLocationDrawer();
    }
  });

  // GPS Device Lock
  $('#btnDetect').onclick = () => {
    const btn = $('#btnDetect');
    btn.disabled = true;
    $('#locationFeedback').textContent = 'GPS coordinates dhoondh rahe hain...';

    if (!navigator.geolocation) {
      $('#locationFeedback').textContent = 'Device geolocation support nahi karta.';
      btn.disabled = false;
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude: lat, longitude: lng } = pos.coords;
        let placeLabel = 'Current Location';
        try {
          const revRes = await fetch(`/api/reverse?lat=${lat}&lng=${lng}`);
          const revData = await revRes.json();
          if (revData?.label) placeLabel = revData.label;
        } catch (_) {}

        btn.disabled = false;
        closeLocationDrawer();
        updateLocationDisplay(placeLabel);
        startBhookhadScan(lat, lng, placeLabel);
      },
      (err) => {
        btn.disabled = false;
        $('#locationFeedback').textContent = err.code === 1 ? 'Location permission denied.' : 'GPS timeout ho gaya.';
      },
      { timeout: 12000, enableHighAccuracy: true }
    );
  };
}

// ============================================================================
// Multi-Ring Area Scan & Background Concurrency Queue
// ============================================================================
async function startBhookhadScan(lat, lng, label) {
  state.ctx?.controller?.abort();

  const ctx = {
    lat: +lat,
    lng: +lng,
    label,
    queue: [],
    queued: new Set(),
    active: 0,
    rings: new Set(),
    scanning: true,
    controller: new AbortController()
  };

  state.ctx = ctx;
  state.location = { lat: +lat, lng: +lng, label };
  state.rows.clear();
  state.radarBlips = [];
  state.visible = 18;
  state.compareList.clear();
  updateBattleDock();

  try {
    localStorage.setItem('craveradar_loc', JSON.stringify(state.location));
  } catch (_) {}

  $('#cardsGrid').innerHTML = '<div class="card-loading-shimmer"></div>'.repeat(3);
  $('#beaconStatus').style.background = 'var(--swiggy-orange)';
  $('#statCoverage').textContent = `${label} me restaurants dhoondh rahe hain...`;

  for (let ring = 0; ring < 3; ring++) {
    if (ctx !== state.ctx) return;
    const ok = await scanRingArea(ring, ctx);
    if (!ok && !state.rows.size) break;
  }

  finishBhookhadScan(ctx);
}

async function scanRingArea(ring, ctx) {
  if (ctx !== state.ctx) return false;
  $('#btnWider').disabled = true;

  try {
    const res = await fetch(`/api/offers?lat=${ctx.lat}&lng=${ctx.lng}&ring=${ring}`, {
      signal: ctx.controller.signal
    });
    if (ctx !== state.ctx) return false;
    const data = await res.json();

    if (data.ok && Array.isArray(data.offers)) {
      for (const inc of data.offers) {
        const exist = state.rows.get(inc.id);
        if (!exist) {
          state.rows.set(inc.id, inc);
          addRadarBlip(inc.id);
        } else if (inc.score > exist.score) {
          Object.assign(exist, inc, { menu: exist.menu, menuError: exist.menuError });
        }
      }
      ctx.rings.add(ring);
      $('#hudVenues').textContent = `${state.rows.size} TARGETS`;
      enqueueMenus(ctx);
      renderRestaurantCards();
      return true;
    }
    return false;
  } catch (err) {
    return false;
  }
}

function finishBhookhadScan(ctx) {
  if (ctx !== state.ctx) return;
  ctx.scanning = false;
  $('#beaconStatus').style.background = 'var(--accent-green)';
  $('#btnWider').disabled = ctx.rings.has(3);
  updateCounterStats();
  renderRestaurantCards();
}

$('#btnWider').onclick = async () => {
  if (!state.ctx || state.ctx.scanning) return;
  await scanRingArea(3, state.ctx);
  finishBhookhadScan(state.ctx);
};

$('#btnRefresh').onclick = () => {
  if (state.location) {
    startBhookhadScan(state.location.lat, state.location.lng, state.location.label);
  }
};

// Concurrency Micro-Queue
function enqueueMenus(ctx) {
  const sorted = [...state.rows.values()].sort((a, b) => b.score - a.score);
  for (const r of sorted) {
    if (!ctx.queued.has(r.id)) {
      ctx.queued.add(r.id);
      ctx.queue.push(r.id);
    }
  }
  pumpQueue(ctx);
}

function pumpQueue(ctx) {
  if (ctx !== state.ctx) return;

  while (ctx.active < 3 && ctx.queue.length > 0) {
    const id = ctx.queue.shift();
    ctx.active++;
    loadMenu(id, ctx).finally(() => {
      ctx.active--;
      if (ctx === state.ctx) {
        updateCounterStats();
        debouncedRender();
        pumpQueue(ctx);
      }
    });
  }
  updateCounterStats();
}

async function loadMenu(id, ctx) {
  const row = state.rows.get(id);
  if (!row) return;
  row.menuLoading = true;
  row.menuError = null;

  try {
    const res = await fetch(`/api/menu?id=${encodeURIComponent(id)}&lat=${ctx.lat}&lng=${ctx.lng}`, {
      signal: ctx.controller.signal
    });
    if (ctx !== state.ctx) return;
    const data = await res.json();
    if (data.ok) {
      row.menu = data;
      row.rating = data.restaurant?.rating || row.rating;
      row.rating_num = data.restaurant?.rating_num || row.rating_num;
      row.rating_count = data.restaurant?.rating_count || row.rating_count;
    }
  } catch (err) {
    if (ctx === state.ctx && err.name !== 'AbortError') {
      row.menuError = err.message;
    }
  } finally {
    if (ctx === state.ctx) row.menuLoading = false;
  }
}

function updateCounterStats() {
  const total = state.rows.size;
  const loaded = [...state.rows.values()].filter((r) => r.menu).length;
  const withCodes = [...state.rows.values()].filter((r) => hasCouponCode(r)).length;

  $('#statCount').textContent = `${total} Restaurants Found`;
  $('#statCoverage').textContent = `${loaded}/${total} Menus Checked · ${withCodes} Verified Coupons`;
}

let renderTimer;
function debouncedRender() {
  clearTimeout(renderTimer);
  renderTimer = setTimeout(renderRestaurantCards, 160);
}

// ============================================================================
// Deal Math & In-Memory Deep Search
// ============================================================================
function hasCouponCode(row) {
  return (row.menu?.coupons || []).some((c) => c.code && !c.payment_offer);
}

function dealMath(c) {
  if (!c || c.payment_offer) return null;

  let optimalSpend = 0;
  if (c.kind === 'percent' && c.discount_pct > 0) {
    optimalSpend = Math.max(
      c.min_order || 0,
      c.max_off ? Math.ceil((c.max_off * 100) / c.discount_pct) : (c.min_order || state.amount)
    );
  } else if (c.kind === 'flatoff' && c.flat_off > 0) {
    optimalSpend = Math.max(c.min_order || state.amount, c.flat_off);
  } else {
    return null;
  }

  const saving = calcSavings(c, optimalSpend);
  if (!(optimalSpend > 0 && saving > 0)) return null;

  return {
    coupon: c,
    optimalSpend,
    saving,
    rate: (saving / optimalSpend) * 100
  };
}

function valueDeal(row) {
  const coupons = row.menu?.coupons || [];
  return coupons
    .map(dealMath)
    .filter(Boolean)
    .sort((a, b) => b.rate - a.rate || a.optimalSpend - b.optimalSpend || b.saving - a.saving)[0];
}

function calcSavings(coupon, amount) {
  if (coupon.payment_offer || coupon.min_order > amount) return 0;
  if (coupon.kind === 'percent') return Math.min((amount * coupon.discount_pct) / 100, coupon.max_off || Infinity);
  if (coupon.kind === 'flatoff') return Math.min(amount, coupon.flat_off);
  return 0;
}

function bestForBudget(row, budget) {
  const coupons = (row.menu?.coupons || []).filter((c) => !c.payment_offer);
  return coupons
    .map((c) => ({ coupon: c, saving: calcSavings(c, budget) }))
    .sort((a, b) => b.saving - a.saving)[0];
}

function norm(str) {
  return String(str || '').toLowerCase().replace(/[^a-z0-9\u0900-\u097f]/g, '');
}

function matchMenuItems(row, query = state.query) {
  if (!query) return [];
  const key = norm(query);
  const items = row.menu?.items || [];
  const matches = [];

  for (const item of items) {
    if (norm(item.name + ' ' + item.description).includes(key)) {
      matches.push(item);
    }
    for (const addon of item.addons || []) {
      if (norm(addon.name).includes(key)) {
        matches.push({
          ...addon,
          id: `${item.id}:${addon.id}`,
          addon: true,
          parent_name: item.name,
          category: `Add-on to ${item.name}`
        });
      }
    }
  }
  return matches;
}

// ============================================================================
// Render Restaurant Cards Grid (Crystal-Clear Posters)
// ============================================================================
function renderRestaurantCards() {
  renderFilterPills();

  let rows = [...state.rows.values()];

  for (const [id, , fn] of FILTER_DEFS) {
    if (state.filters.has(id)) rows = rows.filter(fn);
  }

  if (state.cuisine) {
    rows = rows.filter((r) => r.cuisine_list?.includes(state.cuisine));
  }

  if (state.query) {
    rows = rows.filter((r) => {
      if (state.mode === 'items') {
        return matchMenuItems(r, state.query).length > 0;
      }
      return norm(r.name + ' ' + r.area).includes(norm(state.query));
    });
  }

  const sorters = {
    best: (a, b) => {
      const vA = valueDeal(a), vB = valueDeal(b);
      return (vB?.rate || 0) - (vA?.rate || 0) || (vA?.optimalSpend || Infinity) - (vB?.optimalSpend || Infinity) || b.rating_num - a.rating_num;
    },
    budget: (a, b) => (bestForBudget(b, state.amount)?.saving || 0) - (bestForBudget(a, state.amount)?.saving || 0),
    highest_pct: (a, b) => (b.offer?.discount_pct || 0) - (a.offer?.discount_pct || 0),
    rating: (a, b) => b.rating_num - a.rating_num,
    delivery: (a, b) => (a.delivery_mins || 999) - (b.delivery_mins || 999),
    lowest_item: (a, b) => {
      const minA = Math.min(...matchMenuItems(a).map((x) => x.price || Infinity));
      const minB = Math.min(...matchMenuItems(b).map((x) => x.price || Infinity));
      return minA - minB;
    }
  };

  rows.sort(sorters[state.sort] || sorters.best);

  const grid = $('#cardsGrid');
  if (!rows.length) {
    grid.innerHTML = `
      <div style="grid-column: 1/-1; text-align:center; padding: 60px 20px; background: var(--bg-card); border-radius: var(--radius-md); border: 1px dashed var(--border-subtle);">
        <h3 style="font-size:20px; margin-bottom:8px; font-family:var(--font-heading);">Koi Restaurant Nahi Mila</h3>
        <p style="color:var(--text-muted); font-size:14px;">Doosri dish search karke dekhein ya filters clear karein.</p>
      </div>
    `;
    $('#btnLoadMore').hidden = true;
    return;
  }

  grid.innerHTML = rows.slice(0, state.visible).map(createCardHtml).join('');
  $('#btnLoadMore').hidden = rows.length <= state.visible;

  attachCardEvents();
}

function createCardHtml(row) {
  const deal = valueDeal(row);
  const coupon = deal?.coupon;
  const budgetBest = bestForBudget(row, state.amount);
  const dishMatches = state.query && state.mode === 'items' ? matchMenuItems(row, state.query) : [];
  const isCompared = state.compareList.has(row.id);

  let badgeMain = 'Offers Available';
  let badgeSub = 'Menu Checked';
  if (coupon) {
    badgeMain = coupon.kind === 'percent' ? `${coupon.discount_pct}% OFF` : `₹${coupon.flat_off} OFF`;
    badgeSub = coupon.max_off ? `Up to ₹${coupon.max_off}` : coupon.min_order ? `Above ₹${coupon.min_order}` : 'Restaurant Deal';
  } else if (row.offer?.text) {
    badgeMain = row.offer.text;
    badgeSub = row.offer.sub || 'Deal';
  }

  // Fallback food banner if no image
  const posterUrl = row.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=660&auto=format&fit=crop&q=80';

  return `
    <article class="bhookhad-card" data-id="${row.id}">
      
      <!-- Crystal Clear Poster -->
      <div class="card-poster-frame" data-action="open-menu" data-id="${row.id}">
        <img class="poster-img" src="${esc(posterUrl)}" alt="${esc(row.name)}" loading="lazy">
        
        <!-- Top Floating Badges -->
        <div class="poster-top-bar">
          ${row.veg ? `<span class="veg-tag-pill">● PURE VEG</span>` : `<span></span>`}
          <div style="display:flex; gap:6px;">
            ${row.open === false ? `<span class="closed-tag-pill">CLOSED</span>` : ''}
            <button class="btn-vs-pill ${isCompared ? 'selected' : ''}" data-action="toggle-compare" data-id="${row.id}">
              ${isCompared ? '✓ Added' : '+ VS'}
            </button>
          </div>
        </div>

        <!-- Floating Deal Badge on Poster -->
        <div class="poster-bottom-badge">
          <span class="deal-lead-text">${esc(badgeMain)}</span>
          <span class="deal-sub-text">${esc(badgeSub)}</span>
        </div>
      </div>

      <!-- Card Details -->
      <div class="card-body-details">
        <h3 class="rest-title" title="${esc(row.name)}">${esc(row.name)}</h3>

        <div class="rest-meta-row">
          <span class="star-tag">★ ${esc(row.rating || '4.0')}</span>
          <span>⏱ ${esc(row.delivery_time || row.delivery_mins + ' mins')}</span>
          <span>📍 ${esc(row.distance || '')}</span>
          <span>• ${esc(row.area)}</span>
        </div>

        <p class="rest-cuisines-text">${esc(row.cuisines)}</p>

        <!-- Best Deal & Coupon Box -->
        ${coupon ? `
          <div class="coupon-deal-panel has-code">
            <div class="deal-header-line">
              <span class="deal-kicker-lbl">⚡ BEST COUPON DEAL</span>
              ${coupon.code ? `
                <button class="copy-coupon-btn" data-action="copy-code" data-code="${esc(coupon.code)}" title="Click to copy coupon code">
                  <span class="code-txt">${esc(coupon.code)}</span>
                  <span class="copy-ico">⧉</span>
                </button>
              ` : `
                <span class="copy-coupon-btn auto-tag">AUTO APPLIED</span>
              `}
            </div>
            <div class="coupon-headline-title">${esc(coupon.title)}</div>
            <div class="coupon-terms-note">${esc(coupon.terms || 'Verified Swiggy voucher')}</div>
            <div class="deal-math-summary">
              <span>Save <strong>₹${Math.round(deal.saving)}</strong> on ₹${deal.optimalSpend}</span>
              <span class="roi-pill-badge">${deal.rate.toFixed(1)}% Bachat</span>
            </div>
          </div>
        ` : row.menu ? `
          <div class="coupon-deal-panel">
            <span class="deal-kicker-lbl">VERIFIED MENU</span>
            <div class="coupon-terms-note">No code needed. Direct automatic checkout discounts apply.</div>
          </div>
        ` : row.menuError ? `
          <div class="coupon-deal-panel is-error">
            <div class="coupon-terms-note error-txt">Menu fetch failed. <a href="#" data-action="retry-menu" data-id="${row.id}">Retry Now</a></div>
          </div>
        ` : `
          <div class="coupon-deal-panel is-loading">
            <div class="coupon-terms-note">◌ Scanning menu items & hidden coupons...</div>
          </div>
        `}

        <!-- Budget Matcher Output -->
        ${budgetBest?.saving > 0 ? `
          <div class="card-budget-saving-note">
            <span>At ₹${state.amount} budget:</span>
            <strong>Save ~₹${Math.round(budgetBest.saving)} (${budgetBest.coupon.code || 'Auto'})</strong>
          </div>
        ` : ''}

        <!-- In-Card Matched Dishes Preview -->
        ${dishMatches.length > 0 ? `
          <div class="in-card-dish-box">
            <div class="dish-box-title">🔍 ${dishMatches.length} Matching Items in Menu</div>
            ${dishMatches.slice(0, 3).map((d) => `
              <div class="matched-dish-entry">
                <span class="entry-name">${esc(d.name)}${d.addon ? ' (Add-on)' : ''}</span>
                <span class="entry-price">₹${d.price}</span>
              </div>
            `).join('')}
          </div>
        ` : ''}

        <!-- Actions -->
        <div class="card-bottom-actions">
          <button class="btn-open-menu-view" data-action="open-menu" data-id="${row.id}">
            Menu & Deals Dekho 🍽️
          </button>
          <a class="btn-swiggy-link" href="${esc(row.menu_url)}" target="_blank" rel="noopener noreferrer">
            Swiggy ↗
          </a>
        </div>

      </div>
    </article>
  `;
}

function attachCardEvents() {
  $$('[data-action="open-menu"]').forEach((b) => {
    b.onclick = () => openMenuModal(b.dataset.id);
  });

  $$('[data-action="copy-code"]').forEach((b) => {
    b.onclick = (e) => {
      e.stopPropagation();
      navigator.clipboard.writeText(b.dataset.code);
      playSound('copy');
      showToast(`Coupon code ${b.dataset.code} copied!`);
    };
  });

  $$('[data-action="toggle-compare"]').forEach((b) => {
    b.onclick = (e) => {
      e.stopPropagation();
      toggleBattleTarget(b.dataset.id);
    };
  });

  $$('[data-action="retry-menu"]').forEach((b) => {
    b.onclick = (e) => {
      e.preventDefault();
      const r = state.rows.get(b.dataset.id);
      if (r && state.ctx) {
        state.ctx.queue.unshift(r.id);
        pumpQueue(state.ctx);
      }
    };
  });
}

function renderFilterPills() {
  const rows = [...state.rows.values()];

  $('#quickFilters').innerHTML = FILTER_DEFS.map(([id, label, fn]) => {
    const active = state.filters.has(id);
    const count = rows.filter(fn).length;
    return `
      <button class="desi-chip ${active ? 'active' : ''}" data-filter="${id}">
        <span>${label}</span>
        <small>${count}</small>
      </button>
    `;
  }).join('');

  $$('#quickFilters .desi-chip').forEach((b) => {
    b.onclick = () => {
      const f = b.dataset.filter;
      state.filters.has(f) ? state.filters.delete(f) : state.filters.add(f);
      state.visible = 18;
      renderRestaurantCards();
    };
  });

  const counts = {};
  for (const r of rows) {
    for (const c of r.cuisine_list || []) {
      counts[c] = (counts[c] || 0) + 1;
    }
  }
  const topCuisines = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 10);

  $('#cuisineFilters').innerHTML = `
    <button class="desi-chip ${!state.cuisine ? 'active' : ''}" data-cuisine="">
      All Cuisines
    </button>
  ` + topCuisines.map(([c, n]) => `
    <button class="desi-chip ${state.cuisine === c ? 'active' : ''}" data-cuisine="${esc(c)}">
      ${esc(c)} <small>${n}</small>
    </button>
  `).join('');

  $$('#cuisineFilters .desi-chip').forEach((b) => {
    b.onclick = () => {
      state.cuisine = b.dataset.cuisine;
      state.visible = 18;
      renderRestaurantCards();
    };
  });
}

function initSearchAndFilterControls() {
  let searchTimer;
  const searchInput = $('#searchInput');
  const clearBtn = $('#searchClear');

  searchInput.addEventListener('input', () => {
    clearTimeout(searchTimer);
    const val = searchInput.value.trim();
    clearBtn.hidden = !val;

    searchTimer = setTimeout(() => {
      state.query = val;
      state.visible = 18;
      renderRestaurantCards();
    }, 200);
  });

  clearBtn.onclick = () => {
    searchInput.value = '';
    clearBtn.hidden = true;
    state.query = '';
    renderRestaurantCards();
  };

  $('#sortSelect').onchange = (e) => {
    state.sort = e.target.value;
    renderRestaurantCards();
  };

  $('#basketAmount').onchange = (e) => {
    const val = Math.max(50, Math.min(50000, +e.target.value || 500));
    state.amount = val;
    e.target.value = val;
    renderRestaurantCards();
  };

  $('#modeItems').onclick = () => {
    state.mode = 'items';
    $('#modeItems').classList.add('active');
    $('#modeRestaurants').classList.remove('active');
    searchInput.placeholder = 'Menu ke andar dhoondho: Biryani, Red Bull, Cold Coffee...';
    renderRestaurantCards();
  };

  $('#modeRestaurants').onclick = () => {
    state.mode = 'restaurants';
    $('#modeRestaurants').classList.add('active');
    $('#modeItems').classList.remove('active');
    searchInput.placeholder = 'Restaurant ya area ka naam search karo...';
    renderRestaurantCards();
  };

  $('#btnLoadMore').onclick = () => {
    state.visible += 18;
    renderRestaurantCards();
  };
}

function initCravingsCarousel() {
  $$('.craving-bubble').forEach((b) => {
    b.onclick = () => {
      $$('.craving-bubble').forEach((btn) => btn.classList.remove('active'));
      b.classList.add('active');
      const q = b.dataset.query;
      $('#searchInput').value = q;
      $('#searchClear').hidden = !q;
      state.query = q;
      state.mode = 'items';
      $('#modeItems').classList.add('active');
      $('#modeRestaurants').classList.remove('active');
      state.visible = 18;
      renderRestaurantCards();
      $('#cardsGrid').scrollIntoView({ behavior: 'smooth' });
    };
  });
}

// ============================================================================
// Smart Cart Drawer with Threshold Nudge
// ============================================================================
function initCartDrawer() {
  $('#btnOpenCart').onclick = openCartDrawer;
  $('#btnCloseCart').onclick = closeCartDrawer;
  $('#cartBackdrop').onclick = closeCartDrawer;

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCartDrawer();
      closeLocationDrawer();
    }
  });

  $('#btnClearCart').onclick = () => {
    state.cart = [];
    updateCartCount();
    renderCartDrawer();
  };
}

function openCartDrawer() {
  $('#cartDrawer').classList.add('open');
  $('#cartBackdrop').classList.add('open');
  renderCartDrawer();
}

function closeCartDrawer() {
  $('#cartDrawer').classList.remove('open');
  $('#cartBackdrop').classList.remove('open');
}

function addToCart(dish, row) {
  state.cart.push({
    id: dish.id,
    name: dish.name,
    price: dish.price,
    restId: row.id,
    restName: row.name
  });
  playSound('cart');
  showToast(`Added ${dish.name} (₹${dish.price}) to cart!`);
  updateCartCount();
  openCartDrawer();
}

function updateCartCount() {
  const c = state.cart.length;
  $('#cartCount').textContent = c;
  $('#mobCartCount').textContent = c;
}

function renderCartDrawer() {
  const list = $('#cartItemsList');
  if (!state.cart.length) {
    list.innerHTML = `
      <div class="empty-cart-state">
        <p>Aapka cart abhi khali hai.</p>
        <small>Kisi bhi restaurant ke menu me <strong>"+ Add"</strong> dabao aur dekho live discount kaise milta hai!</small>
      </div>
    `;
    $('#couponNudgeCard').hidden = true;
    $('#cartSubtotal').textContent = '₹0';
    $('#cartSavings').textContent = '-₹0';
    $('#cartNet').textContent = '₹0';
    return;
  }

  const subtotal = state.cart.reduce((sum, item) => sum + item.price, 0);

  list.innerHTML = state.cart.map((item, idx) => `
    <div class="cart-dish-row">
      <div class="cart-dish-info">
        <h4>${esc(item.name)}</h4>
        <small>${esc(item.restName)}</small>
      </div>
      <div class="cart-dish-actions">
        <span style="font-weight:800; color:var(--accent-green);">₹${item.price}</span>
        <button class="btn-qty-sm" onclick="removeCartItem(${idx})">✕</button>
      </div>
    </div>
  `).join('');

  const restIds = [...new Set(state.cart.map((i) => i.restId))];
  const relevantRows = restIds.map((id) => state.rows.get(id)).filter(Boolean);

  let bestCoupon = null;
  let maxSavings = 0;
  let closestThreshold = null;
  let minGap = Infinity;

  for (const r of relevantRows) {
    for (const c of r.menu?.coupons || []) {
      if (c.payment_offer) continue;
      const sav = calcSavings(c, subtotal);
      if (sav > maxSavings) {
        maxSavings = sav;
        bestCoupon = c;
      }
      if (c.min_order > subtotal) {
        const gap = c.min_order - subtotal;
        if (gap < minGap && gap <= 150) {
          minGap = gap;
          closestThreshold = { coupon: c, gap, pot: calcSavings(c, c.min_order) };
        }
      }
    }
  }

  const nudgeCard = $('#couponNudgeCard');
  if (closestThreshold && closestThreshold.pot > closestThreshold.gap) {
    const netDrop = closestThreshold.pot - closestThreshold.gap;
    nudgeCard.hidden = false;
    $('#nudgeText').innerHTML = `
      Sirf <strong>₹${closestThreshold.gap}</strong> aur add karo taaki coupon <strong>${esc(closestThreshold.coupon.code || closestThreshold.coupon.title)}</strong> unlock ho! 
      Aapka net bill <strong>₹${Math.round(netDrop)} Sasta</strong> ho jayega!
    `;
  } else if (bestCoupon) {
    nudgeCard.hidden = false;
    $('#nudgeText').innerHTML = `
      Best coupon unlocked: <strong>${esc(bestCoupon.code || bestCoupon.title)}</strong> saving <strong>₹${Math.round(maxSavings)}</strong>!
    `;
  } else {
    nudgeCard.hidden = true;
  }

  const net = Math.max(0, subtotal - maxSavings);
  $('#cartSubtotal').textContent = `₹${subtotal}`;
  $('#cartSavings').textContent = `-₹${Math.round(maxSavings)}`;
  $('#cartNet').textContent = `₹${Math.round(net)}`;
}

window.removeCartItem = (idx) => {
  state.cart.splice(idx, 1);
  updateCartCount();
  renderCartDrawer();
};

// ============================================================================
// Side-by-Side Versus Battle Dock
// ============================================================================
function initBattleVersus() {
  $('#btnClearCompare').onclick = () => {
    state.compareList.clear();
    updateBattleDock();
    renderRestaurantCards();
  };

  $('#btnLaunchCompare').onclick = launchBattleModal;
  $('#btnCloseCompareDialog').onclick = () => $('#compareDialog').close();
}

function toggleBattleTarget(id) {
  if (state.compareList.has(id)) {
    state.compareList.delete(id);
  } else {
    if (state.compareList.size >= 2) {
      showToast('Maximum 2 restaurants compare kar sakte hain.');
      return;
    }
    state.compareList.add(id);
  }
  updateBattleDock();
  renderRestaurantCards();
}

function updateBattleDock() {
  const dock = $('#compareDock');
  const count = state.compareList.size;
  $('#compareCount').textContent = count;

  if (count === 0) {
    dock.hidden = true;
    return;
  }

  dock.hidden = false;
  const items = [...state.compareList].map((id) => state.rows.get(id)).filter(Boolean);

  $('#dockSlots').innerHTML = `
    <div class="battle-slot ${items[0] ? 'filled' : ''}">
      <span>${items[0] ? esc(items[0].name) : 'Restaurant 1'}</span>
      ${items[0] ? `<button onclick="toggleBattleTarget('${items[0].id}')" style="background:transparent;border:0;color:var(--accent-red);cursor:pointer;">✕</button>` : ''}
    </div>
    <div class="battle-slot ${items[1] ? 'filled' : ''}">
      <span>${items[1] ? esc(items[1].name) : 'Restaurant 2'}</span>
      ${items[1] ? `<button onclick="toggleBattleTarget('${items[1].id}')" style="background:transparent;border:0;color:var(--accent-red);cursor:pointer;">✕</button>` : ''}
    </div>
  `;

  $('#btnLaunchCompare').disabled = count !== 2;
}

function launchBattleModal() {
  const [idA, idB] = [...state.compareList];
  const rA = state.rows.get(idA);
  const rB = state.rows.get(idB);
  if (!rA || !rB) return;

  const dealA = valueDeal(rA);
  const dealB = valueDeal(rB);
  const budgetA = bestForBudget(rA, state.amount);
  const budgetB = bestForBudget(rB, state.amount);

  $('#compareDialogContent').innerHTML = `
    <div class="battle-matchup-grid">
      <div class="battle-col">
        <h3 style="font-size:22px; font-family:var(--font-heading);">${esc(rA.name)}</h3>
        <p style="color:var(--text-dim); font-size:12px; margin-bottom:16px;">${esc(rA.area)}</p>

        <div style="display:flex; flex-direction:column; gap:10px;">
          <div style="background:rgba(255,255,255,0.03); padding:10px; border-radius:8px;">
            <small style="color:var(--text-dim);">Delivery Time</small>
            <div style="font-weight:700; color:var(--accent-cyan);">${esc(rA.delivery_time || rA.delivery_mins + ' mins')}</div>
          </div>
          <div style="background:rgba(255,255,255,0.03); padding:10px; border-radius:8px;">
            <small style="color:var(--text-dim);">Rating</small>
            <div style="font-weight:700; color:var(--accent-green);">★ ${esc(rA.rating)} (${esc(rA.rating_count || '')})</div>
          </div>
          <div style="background:rgba(252,128,25,0.1); border:1px solid rgba(252,128,25,0.3); padding:12px; border-radius:8px;">
            <small style="color:var(--swiggy-orange); font-weight:700;">Top Verified Deal</small>
            <div style="font-size:16px; font-weight:800; margin:4px 0;">${dealA ? dealA.rate.toFixed(1) + '% Real Bachat' : 'No promo code'}</div>
            <div style="font-size:12px; color:var(--text-muted);">${dealA ? 'Save ₹' + Math.round(dealA.saving) + ' (' + (dealA.coupon.code || 'Auto') + ')' : ''}</div>
          </div>
          <div style="background:rgba(255,255,255,0.03); padding:10px; border-radius:8px;">
            <small style="color:var(--text-dim);">At ₹${state.amount} budget:</small>
            <div style="font-weight:800; font-size:15px; color:var(--swiggy-orange);">₹${Math.round(budgetA?.saving || 0)} Saved</div>
          </div>
        </div>
        <div style="margin-top:20px;">
          <a class="btn-load-more" href="${esc(rA.menu_url)}" target="_blank" style="text-align:center; display:block;">Swiggy Par Order Karein ↗</a>
        </div>
      </div>

      <div class="battle-col">
        <h3 style="font-size:22px; font-family:var(--font-heading);">${esc(rB.name)}</h3>
        <p style="color:var(--text-dim); font-size:12px; margin-bottom:16px;">${esc(rB.area)}</p>

        <div style="display:flex; flex-direction:column; gap:10px;">
          <div style="background:rgba(255,255,255,0.03); padding:10px; border-radius:8px;">
            <small style="color:var(--text-dim);">Delivery Time</small>
            <div style="font-weight:700; color:var(--accent-cyan);">${esc(rB.delivery_time || rB.delivery_mins + ' mins')}</div>
          </div>
          <div style="background:rgba(255,255,255,0.03); padding:10px; border-radius:8px;">
            <small style="color:var(--text-dim);">Rating</small>
            <div style="font-weight:700; color:var(--accent-green);">★ ${esc(rB.rating)} (${esc(rB.rating_count || '')})</div>
          </div>
          <div style="background:rgba(252,128,25,0.1); border:1px solid rgba(252,128,25,0.3); padding:12px; border-radius:8px;">
            <small style="color:var(--swiggy-orange); font-weight:700;">Top Verified Deal</small>
            <div style="font-size:16px; font-weight:800; margin:4px 0;">${dealB ? dealB.rate.toFixed(1) + '% Real Bachat' : 'No promo code'}</div>
            <div style="font-size:12px; color:var(--text-muted);">${dealB ? 'Save ₹' + Math.round(dealB.saving) + ' (' + (dealB.coupon.code || 'Auto') + ')' : ''}</div>
          </div>
          <div style="background:rgba(255,255,255,0.03); padding:10px; border-radius:8px;">
            <small style="color:var(--text-dim);">At ₹${state.amount} budget:</small>
            <div style="font-weight:800; font-size:15px; color:var(--swiggy-orange);">₹${Math.round(budgetB?.saving || 0)} Saved</div>
          </div>
        </div>
        <div style="margin-top:20px;">
          <a class="btn-load-more" href="${esc(rB.menu_url)}" target="_blank" style="text-align:center; display:block;">Swiggy Par Order Karein ↗</a>
        </div>
      </div>
    </div>
  `;

  $('#compareDialog').showModal();
}

// ============================================================================
// Deep Menu Dialog
// ============================================================================
function initMenuDialog() {
  $('#btnCloseDialog').onclick = () => $('#menuDialog').close();
  $('#menuDialog').addEventListener('click', (e) => {
    if (e.target === $('#menuDialog')) $('#menuDialog').close();
  });
}

async function openMenuModal(id) {
  const row = state.rows.get(id);
  if (!row) return;

  const dialog = $('#menuDialog');
  $('#dialogTitle').textContent = `Opening ${row.name}...`;
  $('#dialogContent').innerHTML = `
    <div style="text-align:center; padding: 40px;">
      <p style="color:var(--text-muted);">Menu & coupons fetch ho rahe hain...</p>
    </div>
  `;
  dialog.showModal();

  if (!row.menu && state.ctx) {
    await loadMenu(id, state.ctx);
  }

  renderMenuModalContent(row);
}

function renderMenuModalContent(row) {
  const m = row.menu;
  if (!m) {
    $('#dialogContent').innerHTML = `
      <div style="text-align:center; padding: 40px; color:var(--accent-red);">
        <p>Menu load nahi ho saka.</p>
        <button class="btn-action-sm" onclick="openMenuModal('${row.id}')" style="margin-top:12px;">Retry</button>
      </div>
    `;
    return;
  }

  const r = m.restaurant || row;
  const categories = [...new Set(m.items.map((x) => x.category).filter(Boolean))];

  $('#dialogTitle').textContent = r.name;
  $('#dialogContent').innerHTML = `
    <div class="dialog-venue-hero">
      ${r.image ? `<img class="dialog-venue-thumb" src="${esc(r.image)}" alt="${esc(r.name)}" onerror="this.style.display='none'">` : ''}
      <div class="dialog-venue-info">
        <h3>${esc(r.name)}</h3>
        <p style="color:var(--text-dim); font-size:12px;">
          ★ ${esc(r.rating || '4.0')} • ${esc(r.cuisines?.join ? r.cuisines.join(', ') : r.cuisines)} • ${esc(r.area)}
        </p>
      </div>
    </div>

    <!-- Coupons Deck -->
    <h4 style="font-family:var(--font-heading); font-size:16px; margin-bottom:12px;">🎟️ Verified Deals & Promo Codes (${m.coupons.length})</h4>
    <div class="dialog-coupons-grid">
      ${m.coupons.length ? m.coupons.map((c) => `
        <article class="dialog-coupon-card">
          <div class="dialog-coupon-top">
            <h4>${esc(c.title)}</h4>
            ${c.code ? `
              <button class="copy-coupon-btn" data-action="copy-code" data-code="${esc(c.code)}">${esc(c.code)} ⧉</button>
            ` : `
              <span class="copy-coupon-btn" style="background:#064e3b; color:#34d399; border-style:solid;">AUTO</span>
            `}
          </div>
          <p>${esc(c.terms || 'Verified deal')}</p>
          <small style="color:var(--accent-green); font-size:10px; font-weight:700; margin-top:6px; display:block;">
            ${c.payment_offer ? 'Bank / Card Offer' : c.automatic ? 'Auto-applied' : 'Standard Promo Code'}
          </small>
        </article>
      `).join('') : '<p style="color:var(--text-dim);">No coupons available.</p>'}
    </div>

    <!-- Dishes Catalog Controls -->
    <div style="display:flex; justify-content:space-between; align-items:center; margin-top:24px; margin-bottom:14px; flex-wrap:wrap; gap:10px;">
      <h4 style="font-family:var(--font-heading); font-size:16px; margin:0;">🍽️ Menu Catalog (${m.items.length} items)</h4>
      <div style="display:flex; gap:10px;">
        <input type="text" id="modalDishSearch" placeholder="Search dish..." style="background:rgba(255,255,255,0.05); border:1px solid var(--border-subtle); padding:6px 12px; border-radius:6px; font-size:12px; color:#fff;">
        <select id="modalCategoryFilter" style="background:var(--bg-card); border:1px solid var(--border-subtle); padding:6px 10px; border-radius:6px; font-size:12px; color:#fff;">
          <option value="">All Categories</option>
          ${categories.map((c) => `<option value="${esc(c)}">${esc(c)}</option>`).join('')}
        </select>
      </div>
    </div>

    <div class="dialog-dishes-grid" id="modalDishesGrid"></div>
  `;

  renderModalDishes(m.items, '', '', row);

  const searchInput = $('#modalDishSearch');
  const catFilter = $('#modalCategoryFilter');

  searchInput.oninput = () => renderModalDishes(m.items, searchInput.value.trim(), catFilter.value, row);
  catFilter.onchange = () => renderModalDishes(m.items, searchInput.value.trim(), catFilter.value, row);

  $('#dialogContent').querySelectorAll('[data-action="copy-code"]').forEach((b) => {
    b.onclick = () => {
      navigator.clipboard.writeText(b.dataset.code);
      playSound('copy');
      showToast(`Coupon ${b.dataset.code} copied!`);
    };
  });
}

function renderModalDishes(items, search, cat, row) {
  let filtered = items;
  if (cat) filtered = filtered.filter((x) => x.category === cat);
  if (search) {
    const k = norm(search);
    filtered = filtered.filter((x) => norm(x.name + ' ' + x.description).includes(k));
  }

  const grid = $('#modalDishesGrid');
  if (!filtered.length) {
    grid.innerHTML = '<p style="color:var(--text-dim); padding:20px;">No matching items found.</p>';
    return;
  }

  grid.innerHTML = filtered.map((d) => `
    <article class="dialog-dish-card">
      <div class="dish-details-left">
        <span class="dish-type-tag">${d.veg ? '🟢 VEG' : '🔴 NON-VEG'} • ${esc(d.category)}</span>
        <h4>${esc(d.name)}</h4>
        <div class="dish-price-tag">
          ₹${d.price}
          ${d.has_discount ? `<del>₹${d.original_price}</del>` : ''}
        </div>
        ${d.description ? `<p class="dish-desc-text">${esc(d.description)}</p>` : ''}
        
        <button class="btn-dish-add" data-dish-id="${d.id}">+ Add to Smart Cart</button>

        ${d.addons?.length ? `
          <details style="margin-top:6px; font-size:11px; color:var(--text-muted); cursor:pointer;">
            <summary>${d.addons.length} Add-on Options</summary>
            <div style="margin-top:4px; padding-left:8px; border-left:2px solid var(--accent-green);">
              ${d.addons.map((a) => `<div>+ ${esc(a.name)} (₹${a.price})</div>`).join('')}
            </div>
          </details>
        ` : ''}
      </div>
      ${d.image ? `
        <div class="dish-image-right">
          <img src="${esc(d.image)}" alt="${esc(d.name)}" loading="lazy" onerror="this.style.display='none'">
        </div>
      ` : ''}
    </article>
  `).join('');

  grid.querySelectorAll('.btn-dish-add').forEach((btn) => {
    btn.onclick = () => {
      const dish = items.find((x) => x.id === btn.dataset.dishId);
      if (dish) addToCart(dish, row);
    };
  });
}

// ============================================================================
// Mobile Bottom Navigation Bar
// ============================================================================
function initMobileBottomNav() {
  $('#mobNavHome').onclick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  $('#mobNavSearch').onclick = () => {
    $('#searchInput').focus();
    $('#searchInput').scrollIntoView({ behavior: 'smooth' });
  };
  $('#mobNavLoc').onclick = openLocationDrawer;
  $('#mobNavCart').onclick = openCartDrawer;
}

// ============================================================================
// PWA Service Worker & Install Sheet Engine
// ============================================================================
function initPwa() {
  // 1. Service Worker Registration
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then((reg) => {
          console.log('[PWA] Service Worker registered:', reg.scope);
        })
        .catch((err) => {
          console.warn('[PWA] Service Worker registration failed:', err);
        });
    });
  }

  // 2. Install Prompt Sheet Management
  let deferredPrompt = null;
  const sheet = $('#pwaInstallSheet');
  const btnInstall = $('#btnPwaInstall');
  const btnDismiss = $('#btnPwaDismiss');
  const isDismissed = sessionStorage.getItem('pwa_prompt_dismissed') === 'true';
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;

  if (isStandalone) {
    if (sheet) sheet.hidden = true;
    return;
  }

  // Intercept standard browser beforeinstallprompt
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    if (!isDismissed && sheet) {
      setTimeout(() => {
        sheet.hidden = false;
      }, 1800);
    }
  });

  if (btnInstall) {
    btnInstall.onclick = async () => {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
          showToast('🎉 Bhookhad App successfully installed!');
        }
        deferredPrompt = null;
        if (sheet) sheet.hidden = true;
      } else {
        // Fallback for Safari iOS or browsers without native prompt
        showToast('📱 Browser menu se "Add to Home Screen" select karein');
        if (sheet) sheet.hidden = true;
      }
    };
  }

  if (btnDismiss) {
    btnDismiss.onclick = () => {
      if (sheet) sheet.hidden = true;
      sessionStorage.setItem('pwa_prompt_dismissed', 'true');
    };
  }

  window.addEventListener('appinstalled', () => {
    if (sheet) sheet.hidden = true;
    showToast('🎉 Bhookhad App installed!');
  });

  // Mobile fallback display if beforeinstallprompt is suppressed but user hasn't dismissed
  if (!isDismissed && sheet && window.innerWidth <= 768) {
    setTimeout(() => {
      const currentDismissed = sessionStorage.getItem('pwa_prompt_dismissed') === 'true';
      const currentlyStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
      if (!currentDismissed && !currentlyStandalone && sheet.hidden) {
        sheet.hidden = false;
      }
    }, 4500);
  }
}

