# 🐛 Debugging Guide - Money Not Showing

## Why the Banner Might Not Show

The "Money Received" banner only appears when **ALL** these conditions are met:

### Required Conditions:
1. ✅ Application status = `'accepted'`
2. ✅ `payoutStatus` = `'processed'` 
3. ✅ `totalAmount` exists and is not null

---

## 🔍 Step-by-Step Debugging

### Step 1: Check Debug Info Box
Open the labour's "My Applications" page in **Accepted** tab. You'll now see a gray debug box showing:
```
🔍 Debug Info:
Payment Status: [value]
Payout Status: [value]
Total Amount: [value]
UTR: [value]
```

### Step 2: Check Browser Console
Press **F12** → Console tab. Look for:
```javascript
📦 Applications Data: [...]
Application 1: {
  status: 'accepted',
  paymentStatus: 'completed',
  payoutStatus: 'processed',  // ← This MUST be 'processed'
  totalAmount: 15000,
  payoutUtr: 'UTR1234...'
}
```

---

## 🎯 Common Issues & Solutions

### Issue 1: Payout Status is NULL or PENDING
**Problem:** Payment made but payout not triggered

**Solution:**
```bash
# Check backend logs for:
🚀 Auto-triggering mock payout for payment: [ID]
✅ Auto-payout result: [message]

# If you don't see these logs, the auto-payout didn't run
# Possible causes:
- Backend crashed during payment
- Payment verification failed
- 3-second timeout didn't complete
```

**Fix:** Manually trigger payout via API:
1. Get the payment ID from database
2. Call: `POST /api/payouts/transfer`
   ```json
   {
     "paymentId": "6735abc123..."
   }
   ```

### Issue 2: Payment Status is not 'completed'
**Problem:** Farmer clicked "Pay Now" but payment didn't complete

**Check:**
- Payment gateway response
- Razorpay dashboard (if using real API)
- Backend payment verification logs

**Fix:** Complete the payment properly:
1. Farmer → Dashboard → Applications
2. Click "Pay Now"
3. Complete payment process
4. Wait 3 seconds for auto-payout

### Issue 3: Total Amount is NULL
**Problem:** Job doesn't have totalAmount field

**Fix:** Update job when payment is made:
```javascript
// In paymentController.js - verifyPayment
job.totalAmount = amount / 100; // Convert from paise
await job.save();
```

### Issue 4: Application Status Not 'accepted'
**Problem:** Farmer hasn't accepted the application

**Fix:**
1. Farmer logs in
2. Goes to Dashboard
3. Finds the application
4. Clicks "Accept"
5. Then makes payment

---

## 🧪 Testing the Complete Flow

### Quick Test (Mock Mode):

1. **Setup:**
   ```bash
   # Backend .env should have:
   PAYMENT_MODE=mock
   ```

2. **As Labour:**
   - Login as labour
   - Go to "All Jobs"
   - Apply for a job
   - Add bank details in Profile (if not done)

3. **As Farmer:**
   - Login as farmer
   - Go to Dashboard
   - Click "Applications" tab
   - Accept the labour's application
   - Click "Pay Now"
   - Use test card: `4111 1111 1111 1111`
   - CVV: `123`, Expiry: Any future date

4. **Wait 3 Seconds** (auto-payout trigger)

5. **As Labour:**
   - Go to "My Applications"
   - Click "Accepted" tab
   - **You should see:**
     - Debug box with all values filled
     - Green money banner at top! 💰

---

## 🔧 Manual Testing with MongoDB

### Check Database Records:

```javascript
// In MongoDB Compass or Shell:

// 1. Find the job
db.jobs.find({ title: "Your Job Title" })

// 2. Check payment record
db.payments.find({ job: ObjectId("job_id_here") })

// Should show:
{
  status: "success",
  payoutStatus: "processed",  // ← Important!
  payoutId: "pout_mock_...",
  payoutUtr: "UTR...",
  amount: 15000,
  transferredAt: ISODate(...)
}

// 3. Check job has totalAmount
db.jobs.findOne({ _id: ObjectId("job_id_here") })
// Should have:
{
  paymentStatus: "completed",
  totalAmount: 15000,  // ← Important!
  ...
}
```

---

## 🚀 Force Update Payout Status (For Testing)

If stuck in 'pending' or 'queued', manually update:

```javascript
// In MongoDB:
db.payments.updateOne(
  { job: ObjectId("job_id_here") },
  { 
    $set: { 
      payoutStatus: "processed",
      payoutUtr: "UTR" + Date.now(),
      transferredAt: new Date()
    }
  }
)

// Then refresh labour's page
```

---

## 📝 Backend Console Logs to Look For

### Successful Flow:
```
✅ Application accepted and labour assigned
💰 Creating mock order: [Amount]
✅ Mock payment verified successfully
🚀 Auto-triggering mock payout for payment: [ID]
⚠️ MOCK PAYOUT MODE - Simulating transfer
✅ Auto-payout result: Mock transfer completed
```

### Failed Flow:
```
❌ Auto-payout failed: [error message]
// OR no auto-payout logs at all
```

---

## 🎯 Verification Checklist

Before expecting the banner to show:

- [ ] Labour applied for job
- [ ] Farmer accepted application (status = 'accepted')
- [ ] Farmer made payment successfully
- [ ] Backend logs show "Auto-triggering mock payout"
- [ ] Backend logs show "Mock transfer completed"
- [ ] Payment record exists in database
- [ ] Payment status = 'success'
- [ ] Payout status = 'processed' ← **CRITICAL**
- [ ] Total amount is set on job
- [ ] Labour refreshed the page

---

## 🔥 Quick Fix Commands

```bash
# 1. Restart backend (if crashed)
cd backend
node server.js

# 2. Check backend is running
# Should see: "Server running on port 5000"

# 3. Restart frontend
cd frontend
npm run dev

# 4. Clear browser cache
# F12 → Application → Clear Storage → Clear site data

# 5. Hard refresh page
# Ctrl + Shift + R (Windows/Linux)
# Cmd + Shift + R (Mac)
```

---

## 💡 Expected Values for Banner to Show

```javascript
// Application object should have:
{
  status: 'accepted',           // ← Must be accepted
  paymentStatus: 'completed',   // ← Payment done
  payoutStatus: 'processed',    // ← Money transferred (CRITICAL!)
  totalAmount: 15000,           // ← Amount in rupees
  payoutUtr: 'UTR1234567890'   // ← Bank reference
}
```

**If ANY of these are missing/wrong, banner won't show!**

---

## 🆘 Still Not Working?

1. Share the **debug box values** from the UI
2. Share **backend console logs** during payment
3. Share **MongoDB payment document** for that job
4. Check if farmer actually completed payment (not just clicked button)

The most common issue is:
- ✅ Payment is completed
- ❌ But payout is still 'pending' (not 'processed')
- **Reason:** Auto-payout didn't trigger or failed

**Solution:** Manually call the payout API or update DB status to 'processed'.
