# Animated Wedding Invitation

A mobile-friendly, GitHub Pages-ready wedding invitation inspired by the supplied reference video. Built with HTML, CSS, and vanilla JavaScript.

## Files
- `index.html`: page structure
- `style.css`: design and animations
- `script.js`: editable wedding details, countdown, events, calendar, and interactions
- `assets/`: add optional `couple.jpg` and `music.mp3` here

## Customize
Open `script.js` and edit the `CONFIG` object at the top: names, weddingDate (ISO 8601 with `+05:30` offset for India), venue, map search, story, and events. For a couple photo, add `assets/couple.jpg` and set `couplePhoto: 'assets/couple.jpg'`. For background music, add an MP3 you have rights to use at `assets/music.mp3`. Browsers require a tap on the music button before audio can play.

The sample names, dates, and venues are placeholders. The countdown uses the timestamp in CONFIG. Dates are formatted in Asia/Kolkata time.

## Publish on GitHub Pages
1. Create a public GitHub repository, for example `wedding-invitation`.
2. Upload `index.html`, `style.css`, `script.js`, and `assets/` to the repository root (not inside another folder).
3. Go to **Settings → Pages → Build and deployment**.
4. Select **Deploy from a branch**, branch **main**, folder **/(root)**, and save.
5. Your URL will usually be `https://YOUR_USERNAME.github.io/wedding-invitation/` after deployment.

## Local preview
Open `index.html` in a browser. No installation/build needed.

## Notes
- Google Fonts and Google Calendar/Maps links need an internet connection.
- Google Calendar opens an event draft; guests must save it themselves.
- Map directions open a Google Maps search based on `mapsQuery`.
- The music file is optional and not included.
- Use your own photos and audio with permission.
