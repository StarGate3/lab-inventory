# Etap 1: Budowanie aplikacji
FROM node:18-alpine AS builder

# Ustawienie katalogu roboczego
WORKDIR /app

# Kopiowanie plików package.json oraz package-lock.json (jeśli istnieje)
COPY package*.json ./

# Instalacja zależności
RUN npm install

# Kopiowanie pozostałych plików projektu
COPY . .

# Budowanie aplikacji (tworzy katalog 'dist')
RUN npm run build

# Etap 2: Serwowanie aplikacji za pomocą Nginx
FROM nginx:alpine

# Usunięcie domyślnej zawartości katalogu serwowanego przez Nginx
RUN rm -rf /usr/share/nginx/html/*

# Kopiowanie zbudowanej aplikacji z etapu builder do katalogu Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Umożliwienie nasłuchiwania na porcie 80
EXPOSE 80

# Uruchomienie Nginx w trybie pierwszoplanowym
CMD ["nginx", "-g", "daemon off;"]
