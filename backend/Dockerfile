# Dockerfile dla backendu
FROM python:3.9-slim

# Ustawienie katalogu roboczego w kontenerze
WORKDIR /app

# Kopiowanie pliku requirements.txt i instalacja zależności
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Kopiowanie całego kodu aplikacji
COPY . .

# Eksponowanie portu (zgodnie z konfiguracją FastAPI)
EXPOSE 8000

# Uruchomienie aplikacji przy użyciu uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
