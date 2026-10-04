# JENKINS CONFIGURATION & AGENT SETUP NOTES

**Target Platform:** Jenkins LTS  
**Executor Requirements:** Ubuntu 22.04 LTS / Debian 12 / Windows Server 2022  
**Runtime:** Node.js v20.x or v22.x LTS  

---

## 1. Agent Prerequisite Setup

Ensure the Jenkins execution agent has the required system dependencies for headless browser automation:

```bash
# Ubuntu / Debian Agent
sudo apt-get update && sudo apt-get install -y \
    libnss3 \
    libnspr4 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libcups2 \
    libdrm2 \
    libxkbcommon0 \
    libxcomposite1 \
    libxdamage1 \
    libxfixes3 \
    libxrandr2 \
    libgbm1 \
    libasound2
```

---

## 2. Automated Test Result Ingestion

The Jenkins pipeline produces JUnit XML test results at `reports/junit.xml`. The `junit` post-action parses this output to generate build-level metrics:
- Total tests executed
- Pass / Fail percentages
- Test duration trends
- Flakiness and regression identification

---

## 3. Discard Old Builds Strategy

To prevent executor disk space exhaustion from stored video recordings, traces, and screenshots, the pipeline configures `buildDiscarder`:
- **Retain builds:** 20 builds
- **Artifact retention:** Keep artifacts for failed builds and the last 5 successful builds only.
