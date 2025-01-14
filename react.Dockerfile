# Schritt 1: Nutze ein Node.js-Image als Basis
FROM node:16-alpine

# Schritt 2: Setze das Arbeitsverzeichnis im Container
WORKDIR /app

# Schritt 3: Kopiere die package.json und package-lock.json (oder yarn.lock)
COPY package*.json ./

# Schritt 4: Installiere alle Abhängigkeiten
RUN npm install

# Schritt 5: Kopiere den gesamten Quellcode in den Container
COPY . .

# Schritt 6: Baue die React-App für die Produktion
RUN npm run build

# Schritt 7: Nutze ein leichtes Web-Server-Image, um die App bereitzustellen
FROM nginx:alpine

# Schritt 8: Kopiere die gebaute App von vorher in den Nginx-Server
COPY --from=0 /app/build /usr/share/nginx/html

# Schritt 9: Exponiere den Port 80
EXPOSE 80

# Schritt 10: Starte den Nginx-Server
CMD ["nginx", "-g", "daemon off;"]
