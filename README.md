# Deployment Failure Simulation and Recovery Using Version Rollback

A comprehensive mini-project demonstrating deployment failure recovery through automated health checks, version management, and quick rollback procedures.

## 📋 Project Overview

This project simulates a real-world deployment scenario where:
1. **Version 1.0.0** - A stable, working application is deployed
2. **Version 2.0.0** - A faulty version with intentional bugs is deployed
3. **Failure Detection** - Health checks identify the failure
4. **Rollback** - The system automatically rolls back to the stable version
5. **Post-Mortem** - A complete incident analysis is documented

## 🎯 Learning Objectives

- ✓ Understand deployment pipelines and version management
- ✓ Learn to detect failures through health checks and monitoring
- ✓ Implement reliable rollback mechanisms
- ✓ Document and analyze incidents through post-mortems
- ✓ Build best practices for production deployments

## 📁 Project Structure

```
deployment-rollback-project/
├── src/
│   └── app.js                 # Main application (switches between versions)
├── versions/
│   ├── app-v1.js              # Version 1.0.0 (stable)
│   ├── app-v2-faulty.js       # Version 2.0.0 (intentionally broken)
│   ├── current-version.txt    # Current deployed version
│   └── version-history.json   # Deployment history log
├── scripts/
│   ├── deploy-v1.js           # Deploy stable version
│   ├── deploy-v2.js           # Deploy faulty version
│   ├── health-check.js        # Detect failures
│   ├── rollback.js            # Execute rollback
│   └── monitor.js             # View deployment history
├── ROLLBACK_STEPS.md          # Detailed rollback procedures
├── POST_MORTEM.md             # Incident analysis report
├── README.md                  # This file
└── package.json               # Project dependencies
```

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Deploy Version 1 (Stable)
```bash
npm run deploy-v1
```
**Output:**
```
=== DEPLOYING VERSION 1.0.0 (STABLE) ===

✓ Version 1.0.0 deployed successfully
✓ App file updated
✓ Version history recorded

Deployment Status: SUCCESS
Current Version: 1.0.0
Status: STABLE AND HEALTHY
```

### 3. Verify Health
```bash
npm run health-check
```
**Output:**
```
=== HEALTH CHECK ===

Current Version: 1.0.0
Timestamp: 2026-01-29T14:30:00.000Z

✓ HEALTH CHECK PASSED
Status: HEALTHY
All systems operational
```

### 4. Deploy Version 2 (Faulty)
```bash
npm run deploy-v2
```
**Output:**
```
=== DEPLOYING VERSION 2.0.0 (FAULTY) ===

✓ Version 2.0.0 deployed
✓ App file updated
✓ Version history recorded

Deployment Status: COMPLETE
Current Version: 2.0.0
WARNING: This version contains intentional bugs for testing!
```

### 5. Detect Failure
```bash
npm run health-check
```
**Output:**
```
=== HEALTH CHECK ===

Current Version: 2.0.0-FAULTY
Timestamp: 2026-01-29T14:30:45.000Z

✗ HEALTH CHECK FAILED
Status: UNHEALTHY - Faulty version detected
Issue: This version contains known bugs

Action Required: ROLLBACK RECOMMENDED
```

### 6. Execute Rollback
```bash
npm run rollback
```
**Output:**
```
=== ROLLBACK PROCEDURE INITIATED ===

Step 1: Reading current version...
  Current: 2.0.0-FAULTY

Step 2: Restoring stable version (1.0.0)...
  ✓ Version 1.0.0 restored

Step 3: Updating version tracker...
  ✓ History recorded

Step 4: Verifying rollback...
  ✓ Rollback verified

=== ROLLBACK SUCCESSFUL ===
Rolled back from: 2.0.0-FAULTY
Current version: 1.0.0
Status: STABLE AND OPERATIONAL
```

### 7. Verify Recovery
```bash
npm run health-check
```
```bash
npm run monitor
```

## 📊 Deployment History

After running the complete cycle, view deployment history:
```bash
npm run monitor
```

**Example Output:**
```
=== MONITORING SYSTEM ===

Current Status:
  Version: 1.0.0
  Timestamp: 2026-01-29T14:32:15.000Z

Deployment History:
  1. v1.0.0 - ROLLED_BACK at 1/29/2026, 2:31:45 PM
     (Rolled back from 2.0.0-FAULTY)
  2. v2.0.0 - DEPLOYED at 1/29/2026, 2:30:45 PM
  3. v1.0.0 - DEPLOYED at 1/29/2026, 2:30:00 PM
```

## 🔍 The Intentional Bugs (Version 2.0.0)

Version 2.0.0 contains three intentional bugs for demonstration:

### Bug #1: Unhandled TypeError
```javascript
app.get('/health', (req, res) => {
  const buggyData = undefined.toString();  // ❌ TypeError!
  // ...
});
```

### Bug #2: Unhandled Exception
```javascript
app.get('/api/status', (req, res) => {
  throw new Error('Database connection failed');  // ❌ Uncaught error!
});
```

### Bug #3: Missing Error Handling
- No try-catch blocks
- No graceful degradation
- No fallback mechanisms

## 📚 Documentation

### Detailed Rollback Steps
See [ROLLBACK_STEPS.md](ROLLBACK_STEPS.md) for:
- Pre-rollback checklist
- Step-by-step rollback procedure
- Verification steps
- Post-rollback actions
- Automated rollback script

### Incident Post-Mortem
See [POST_MORTEM.md](POST_MORTEM.md) for:
- Executive summary
- Complete incident timeline
- Root cause analysis
- Impact assessment
- Corrective actions (immediate, short-term, long-term)
- Lessons learned
- Recommendations

## 🛡️ Key Features

### Version Management
- ✓ Clean version separation
- ✓ Easy restoration of any previous version
- ✓ Complete audit trail of all deployments

### Health Check System
- ✓ Detects failures immediately
- ✓ Clear error reporting
- ✓ Actionable alerts

### Rollback Mechanism
- ✓ One-command rollback
- ✓ Atomic operations (no partial failures)
- ✓ Automatic verification
- ✓ Version history tracking

### Monitoring & Logging
- ✓ Real-time status monitoring
- ✓ Deployment history tracking
- ✓ Rollback event recording

## 🔄 Complete Workflow Example

```bash
# 1. Deploy stable version
npm run deploy-v1

# 2. Verify it's healthy
npm run health-check

# 3. Deploy faulty version (simulate failure)
npm run deploy-v2

# 4. Detect the failure
npm run health-check

# 5. Execute rollback
npm run rollback

# 6. Verify recovery
npm run health-check
npm run monitor
```

## 📈 What You'll Learn

After running through this project, you'll understand:

1. **Deployment Pipelines** - How versions are deployed and switched
2. **Health Checks** - Detecting failures in real-time
3. **Rollback Strategies** - Quickly recovering from failures
4. **Version Control** - Managing multiple versions of code
5. **Incident Response** - How to respond to and analyze incidents
6. **Best Practices** - Production deployment safety measures

## 🎓 Extended Learning

Try these exercises to deepen your understanding:

1. **Add More Endpoints**
   - Create additional API endpoints in v1 and v2
   - Add more comprehensive health checks
   - Test rollback with multiple components

2. **Implement Load Testing**
   - Test performance differences between versions
   - Simulate traffic spikes during rollback
   - Measure recovery time under load

3. **Add Metrics**
   - Track request latency
   - Monitor memory usage
   - Log error rates

4. **Create v3.0.0 (Fixed)**
   - Fix the bugs from v2.0.0
   - Add proper error handling
   - Implement unit tests

5. **Automate with CI/CD**
   - Use GitHub Actions
   - Integrate automated testing
   - Automatic deployment on merge

## 📝 Project Files

| File | Purpose |
|------|---------|
| `src/app.js` | Main application (version switcher) |
| `versions/app-v1.js` | Stable working version |
| `versions/app-v2-faulty.js` | Faulty version with bugs |
| `scripts/deploy-v1.js` | Deploy stable version |
| `scripts/deploy-v2.js` | Deploy faulty version |
| `scripts/health-check.js` | Failure detection |
| `scripts/rollback.js` | Rollback execution |
| `scripts/monitor.js` | Monitoring & history |
| `ROLLBACK_STEPS.md` | Detailed rollback procedures |
| `POST_MORTEM.md` | Incident analysis report |

## 🤝 Contributing

Feel free to extend this project with:
- More versions and features
- Advanced monitoring
- Email/Slack alerts
- Database integration
- Docker containerization

## 📄 License

MIT License - Feel free to use this project for learning

## 🎯 Next Steps

1. ✓ Run through the complete workflow above
2. ✓ Study the ROLLBACK_STEPS.md document
3. ✓ Read the POST_MORTEM.md analysis
4. ✓ Try the extended learning exercises
5. ✓ Implement improvements and add your own features

---

**Created:** January 29, 2026  
**Last Updated:** January 29, 2026  
**Status:** Complete and Ready to Deploy
