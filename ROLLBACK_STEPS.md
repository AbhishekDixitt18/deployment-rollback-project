# Rollback Steps

## Overview
This document outlines the complete procedure for rolling back from a faulty deployment to a stable version.

## Pre-Rollback Checklist
- [ ] Confirm the current version is faulty and causing issues
- [ ] Verify the previous stable version is available
- [ ] Notify stakeholders of the rollback procedure
- [ ] Document the start time of the rollback

## Rollback Procedure

### Step 1: Detect Failure
```bash
npm run health-check
```
This command will identify if the current version is faulty.

**Expected Output:**
- If healthy: "HEALTH CHECK PASSED"
- If faulty: "HEALTH CHECK FAILED - Faulty version detected"

### Step 2: Execute Rollback
```bash
npm run rollback
```
This command will:
1. Read the current deployed version
2. Restore Version 1.0.0 (stable) to the main application
3. Update version tracking
4. Verify the rollback was successful

**Expected Output:**
```
=== ROLLBACK SUCCESSFUL ===
Rolled back from: 2.0.0-FAULTY
Current version: 1.0.0
Status: STABLE AND OPERATIONAL
```

### Step 3: Verify Rollback
```bash
npm run health-check
```
Verify that health check now passes with the restored version.

### Step 4: Monitor Status
```bash
npm run monitor
```
Review the deployment history to confirm the rollback event was recorded.

## Post-Rollback Actions
1. **Communication**: Notify users that service is restored
2. **Monitoring**: Monitor application health for next 30 minutes
3. **Analysis**: Review logs and root cause
4. **Fix**: Create and test a patched version (v2.1.0 or v3.0.0)
5. **Re-deployment**: Deploy the fixed version after thorough testing

## Rollback Timeline Example
```
14:30:00 - Version 2.0.0 deployed
14:30:45 - Users report errors
14:31:00 - Health check fails, issue detected
14:31:30 - Rollback initiated
14:31:45 - Rollback complete, health check passes
14:32:00 - Service restored to users
```

## Automated Rollback Script
A single-command rollback (if automated):
```bash
npm run rollback && npm run health-check && npm run monitor
```

## Important Notes
- Rollback should be executed immediately upon failure detection
- Keep deployment history for audit and post-mortem analysis
- Document the reason for each rollback in version-history.json
- Plan and test rollback procedures regularly

## Emergency Contacts
- DevOps Lead: [Contact Info]
- Platform Owner: [Contact Info]
