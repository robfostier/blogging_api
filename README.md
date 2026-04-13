# Blogging API

*Elisa Delaunay, Robinson Fostier*

---

## Lancer le projet

### Prérequis

- Docker Desktop

### Installation

```bash
cp .env.example .env
# Modifier les valeurs dans .env si nécessaire
```

### Démarrage

```bash
docker compose up -d
docker compose logs -f api
```

L'API est disponible sur `http://localhost:3000/api/v1`.

### Arrêt

```bash
docker compose down
```

---
