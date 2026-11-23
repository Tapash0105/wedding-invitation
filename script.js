/* EDIT THIS CONFIGURATION TO PERSONALIZE YOUR INVITATION */
const CONFIG = {
  bride: 'Aarav',
  groom: 'Ananya',
  weddingDate: '2027-02-12T18:00:00+05:30',
  venueName: 'The Grand Palace',
  venueAddress: 'Bhubaneswar, Odisha, India',
  mapsQuery: 'Bhubaneswar Odisha India',
  storyHeading: 'Written in the stars',
  storyText: 'From a simple hello to a lifetime of togetherness, our story has been filled with laughter, friendship, and love. Now, we begin our forever.',
  // Put a couple photo in assets/couple.jpg and change to 'assets/couple.jpg'
  couplePhoto: '',
  events: [
    { name: 'Haldi', date: '2027-02-10T10:00:00+05:30', time: '10:00 AM', venue: 'Family Residence', icon: '🌼', theme: 'haldi', dress: 'Wear yellow' },
    { name: 'Mehendi', date: '2027-02-10T17:00:00+05:30', time: '5:00 PM', venue: 'Garden Courtyard', icon: '🌿', theme: 'mehendi', dress: 'Shades of green' },
    { name: 'Sangeet', date: '2027-02-11T19:00:00+05:30', time: '7:00 PM', venue: 'Celebration Hall', icon: '🎶', theme: 'sangeet', dress: 'Festive glam' },
    { name: 'Wedding', date: '2027-02-12T18:00:00+05:30', time: '6:00 PM', venue: 'The Grand Palace', icon: '💍', theme: 'wedding', dress: 'Traditional elegance' }
  ]
};

const $ = (id) => document.getElementById(id);
const wedding = new Date(CONFIG.weddingDate);
const dateFmt = (date, options) => new Intl.DateTimeFormat('en-IN', { timeZone: 'Asia/Kolkata', ...options }).format(date);

function initContent() {
  $('brideName').textContent = CONFIG.bride;
  $('groomName').textContent = CONFIG.groom;
  $('monogram').textContent = `${CONFIG.bride.charAt(0)} ♡ ${CONFIG.groom.charAt(0)}`;
  $('closingNames').textContent = `${CONFIG.bride} & ${CONFIG.groom}`;
  document.title = `${CONFIG.bride} & ${CONFIG.groom} | Wedding Invitation`;
  $('dateDay').textContent = dateFmt(wedding, { day: '2-digit' });
  $('dateMonth').textContent = dateFmt(wedding, { month: 'long' });
  $('dateYear').textContent = dateFmt(wedding, { year: 'numeric' });
  $('dateWeekday').textContent = dateFmt(wedding, { weekday: 'long', hour: 'numeric', minute: '2-digit', hour12: true });
  $('dateVenue').textContent = CONFIG.venueName;
  $('venueName').textContent = CONFIG.venueName;
  $('venueAddress').textContent = CONFIG.venueAddress;
  $('venueTime').textContent = dateFmt(wedding, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true });
  $('storyHeading').textContent = CONFIG.storyHeading;
  $('storyText').textContent = CONFIG.storyText;
  if (CONFIG.couplePhoto) {
    $('storyPhoto').style.backgroundImage = `url(${JSON.stringify(CONFIG.couplePhoto)})`;
    $('storyPhoto').querySelector('span').hidden = true;
  }
  $('directionsLink').href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONFIG.mapsQuery)}`;
  $('calendarLink').href = googleCalendarUrl('Wedding Celebration', wedding, new Date(wedding.getTime() + 4 * 3600000), CONFIG.venueAddress);
}

function googleCalendarUrl(title, start, end, location) {
  const utc = (d) => d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  const p = new URLSearchParams({ action: 'TEMPLATE', text: title, dates: `${utc(start)}/${utc(end)}`, details: `Celebrate the wedding of ${CONFIG.bride} and ${CONFIG.groom}!`, location });
  return `https://calendar.google.com/calendar/render?${p.toString()}`;
}

function updateCountdown() {
  const diff = Math.max(0, wedding.getTime() - Date.now());
  const secs = Math.floor(diff / 1000);
  $('days').textContent = String(Math.floor(secs / 86400)).padStart(2, '0');
  $('hours').textContent = String(Math.floor(secs / 3600) % 24).padStart(2, '0');
  $('minutes').textContent = String(Math.floor(secs / 60) % 60).padStart(2, '0');
  $('seconds').textContent = String(secs % 60).padStart(2, '0');
  if (diff === 0) $('countdown-title').textContent = 'THE CELEBRATION HAS BEGUN ♡';
}

function initScroll() {
  const card = $('scrollCard');
  const reveal = () => { card.classList.add('open'); $('revealButton').textContent = 'Our special day ♡'; };
  $('revealButton').addEventListener('click', reveal);
  $('pullHandle').addEventListener('click', reveal);
  let startY = null;
  $('pullHandle').addEventListener('pointerdown', (e) => { startY = e.clientY; });
  $('pullHandle').addEventListener('pointerup', (e) => { if (startY !== null && e.clientY - startY > 25) reveal(); startY = null; });
}

function initEvents() {
  const track = $('eventTrack');
  for (const event of CONFIG.events) {
    const card = document.createElement('article');
    card.className = `event-card ${event.theme}`;
    const icon = document.createElement('span'); icon.className = 'event-icon'; icon.textContent = event.icon;
    const name = document.createElement('h3'); name.textContent = event.name;
    const date = document.createElement('p'); date.className = 'event-date'; date.textContent = dateFmt(new Date(event.date), { day: 'numeric', month: 'long', year: 'numeric' });
    const time = document.createElement('p'); time.textContent = `${event.time} · ${event.venue}`;
    const dress = document.createElement('p'); dress.textContent = `Dress code: ${event.dress}`;
    const button = document.createElement('button'); button.type = 'button'; button.textContent = 'Add to Calendar +';
    button.addEventListener('click', () => {
      const start = new Date(event.date);
      window.open(googleCalendarUrl(event.name, start, new Date(start.getTime() + 3 * 3600000), event.venue), '_blank', 'noopener,noreferrer');
    });
    card.append(icon, name, date, time, dress, button); track.append(card);
  }
}

function initPetals() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const container = $('petals');
  for (let i = 0; i < 17; i++) {
    const petal = document.createElement('span'); petal.className = 'petal';
    petal.style.left = `${Math.random() * 100}%`;
    petal.style.animationDuration = `${8 + Math.random() * 10}s`;
    petal.style.animationDelay = `${-Math.random() * 18}s`;
    petal.style.opacity = String(.25 + Math.random() * .45);
    petal.style.scale = String(.6 + Math.random() * .8);
    container.append(petal);
  }
}

function initAnimations() {
  if (!('IntersectionObserver' in window)) { document.querySelectorAll('.reveal').forEach(e => e.classList.add('visible')); return; }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } });
  }, { threshold: .12 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

function initMusic() {
  const audio = $('bgMusic'); const button = $('musicToggle');
  button.addEventListener('click', async () => {
    if (!audio.paused) { audio.pause(); $('musicLabel').textContent = 'Music off'; button.setAttribute('aria-label', 'Play background music'); return; }
    try { await audio.play(); $('musicLabel').textContent = 'Music on'; button.setAttribute('aria-label', 'Pause background music'); }
    catch { $('musicLabel').textContent = 'Add music.mp3'; alert('To enable music, add your licensed audio file as assets/music.mp3 in the GitHub repository.'); }
  });
}

initContent(); initEvents(); initScroll(); initPetals(); initAnimations(); initMusic(); updateCountdown();
setInterval(updateCountdown, 1000);
