# Resume Site

A simple, static resume site you can edit and preview locally.

## Folder structure
- warp/
  - index.html — Main HTML page with your resume content
  - css/style.css — Site styles (dark theme included)
  - img/ — Headshot and other images
- js/
  - main.js — Small enhancement for smooth in‑page scrolling
- resume.txt — Optional raw text copy of resume (not used by the site)
- mydp-cleaned.jpeg — Extra image (not used by the site)

## Editing your resume
Most content is in warp/index.html. Open it in a code editor and edit:
- About: the paragraph and headshot image at #about
  - Replace warp/img/headshot.jpg with your photo (keep the same filename or update the img src path)
- Contact: phone, email, LinkedIn, GitHub, etc. at #contact
- Experience: roles and bullet points at #experience
- Education: details at #education
- Skills: bullet points at #skills

Optional styling tweaks are in warp/css/style.css. Small behavior (smooth scrolling) is in js/main.js.

## Preview locally
Choose one of the options below:

1) Open the file directly
- Double‑click warp/index.html to open it in your browser.

2) Serve with a simple HTTP server (recommended for testing relative paths)
- Python 3:
  - From the project root: cd warp
  - python3 -m http.server 8000
  - Visit http://localhost:8000
- Node (npx serve):
  - From the project root: npx serve warp
  - Visit the URL shown (e.g., http://localhost:3000)

## Tips
- If you rename or move files, update paths in warp/index.html (e.g., the script tag referencing ../js/main.js and image src paths).
- Keep images in warp/img/ to avoid broken links.

