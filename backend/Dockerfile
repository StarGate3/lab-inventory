# backend/Dockerfile
FROM python:3.11-slim

# Ustawienie zmiennej środowiskowej, aby logi Pythona były od razu wypisywane
ENV PYTHONUNBUFFERED=1

# Instalacja niezbędnych pakietów systemowych (m.in. kompilator i biblioteki do obsługi PostgreSQL)
RUN apt-get update && apt-get install -y \
    gcc \
    g++ \
    libpq-dev \
 && rm -rf /var/lib/apt/lists/*

# Ustawienie katalogu roboczego w kontenerze
WORKDIR /app

# Skopiowanie pliku z zależnościami
COPY requirements.txt .

# Instalacja zależności Pythona
RUN pip install --upgrade pip && pip install --no-cache-dir -r requirements.txt

# Skopiowanie pozostałych plików aplikacji
COPY . .

# Umożliwienie nasłuchiwania na porcie 8000
EXPOSE 8000

# Uruchomienie aplikacji przy pomocy uvicorn
# CMD ["sleep", "infinity"]

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
