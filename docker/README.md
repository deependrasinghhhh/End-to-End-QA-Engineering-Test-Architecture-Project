# Experimental Upstream nopCommerce Docker Environment

> **Status:** Experimental / Optional Reference Environment  
> **CI Coverage:** Not covered in automated CI workflows  
> **Default Test Target:** The repository tests against the deterministic local staging simulator (`automation/staging-aut/server.js`) on port 5001.

---

## 1. Scope & Purpose

This Docker Compose environment is provided as an optional reference configuration for running an upstream instance of nopCommerce v4.70 backed by PostgreSQL 15.

- It is **not** executed or validated by the GitHub Actions CI pipeline.
- It is **not** the default test execution target for Playwright regression, smoke, or API tests.
- It serves as an exploratory/local containerization template for engineers interested in experimenting with live upstream nopCommerce container stacks.

---

## 2. Services Defined

| Service | Image | Role | Port |
|---|---|---|---|
| `postgresql-qa` | `postgres:15-alpine` | PostgreSQL database for nopCommerce | `5432` |
| `nopcommerce-aut` | `nopcommerce/nopcommerce:4.70.0` | Upstream nopCommerce container | `5000:80` |
| `playwright-runner` | `docker/Dockerfile.test` | Optional containerized Playwright runner profile | N/A |
| `jenkins` | `jenkins/jenkins:lts-jdk17` | Optional local Jenkins controller | `8080` |

---

## 3. How to Run Locally (Optional)

```bash
# Launch PostgreSQL and nopCommerce
docker compose up -d postgresql-qa nopcommerce-aut

# Monitor startup logs
docker compose logs -f nopcommerce-aut

# Stop containers
docker compose down
```

> [!NOTE]
> For standard test runs, use `npm test`, which runs against the deterministic local staging simulator (`automation/staging-aut/server.js`).
