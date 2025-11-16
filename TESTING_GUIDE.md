# 🧪 Testing Complete Money Transfer System

## 🎯 Step-by-Step Testing Guide

### ✅ Prerequisites
- Backend running on http://localhost:5000
- Frontend running on http://localhost:5173
- MongoDB connected
- Mock mode enabled (PAYMENT_MODE=mock in .env)

---

## 📝 Test Scenario: Complete Money Transfer Flow

### Step 1: Labour Setup (Add Bank Details)
1. **Login as Labour** → http://localhost:5173/labour/login
   - Email: stephin@gmail.com (or your labour account)
   - Password: your_password

2. **Go to Profile** → Click "🏦 Profile" in navbar

3. **Add Bank Details** → Fill the form:
   ```
   Account Holder Name: Stephin Kumar
   Account Number: 1234567890
   IFSC Code: SBIN0001234
   Bank Name: State Bank of India
   UPI ID (optional): stephin@paytm
   ```

4. **Save** → You'll see "✅ Bank details saved successfully!"

5. **Verify** → Check that bank details are displayed with ••••••7890

---

### Step 2: Farmer Creates Job & Accepts Labour
1. **Logout** → Switch to Farmer account

2. **Login as Farmer** → http://localhost:5173/farmer/login
   - Email: atharv@gmail.com (or your farmer account)

3. **Create Job** (if not exists):
   - Title: "Harvesting Work"
   - Wage: ₹350/day
   - Duration: 5 days
   - Workers needed: 1

4. **Labour Applies** → (Switch back to labour account and apply)

5. **Farmer Accepts** → Go to Dashboard → Accept the application

---

### Step 3: Payment & Auto-Transfer
1. **Click "Pay Now"** button on farmer dashboard

2. **Mock Payment Alert** appears:
   ```
   ⚠️ MOCK PAYMENT MODE
   This is a test payment. No real money will be charged.
   ```

3. **Click OK** → Wait 2 seconds

4. **Payment Success** → You'll see:
   ```
   ✅ Mock Payment Successful!
   Payment has been completed in test mode.
   ```

5. **Auto-Payout Triggered** → Check backend logs:
   ```
   💰 Payment completed for job: Harvesting Work
   🚀 Auto-triggering mock payout for payment: xxx
   ⚠️ MOCK PAYOUT MODE - Simulating transfer
   ✅ Auto-payout result: Mock transfer completed
   ```

6. **Payment Status Updates** → Job shows "Paid ✅"

---

### Step 4: Labour Checks Money Received
1. **Login as Labour** → stephin@gmail.com

2. **Go to "My Applications"** → You'll see:
   ```
   🎉 Congratulations! Your application has been accepted.
   
   ✅ Payment Status
   Status: Payment Received ✅
   Amount: ₹1750
   Paid on: [timestamp]
   
   Transfer Status: ✅ Money Received
   UTR Number: UTR1763284017315
   ```

3. **Verify Details**:
   - Payment Status: Completed ✅
   - Payout Status: Processed ✅
   - Amount: ₹1750 (₹350 × 5 days)
   - UTR number generated

---

## 🔍 Backend Logs to Watch

### Payment Flow:
```bash
💳 Creating order for job: xxx Amount: 1750
⚠️ MOCK PAYMENT MODE - Using fake order
✅ Mock order created: order_mock_xxx

🔐 Verifying payment: pay_mock_xxx
⚠️ MOCK PAYMENT MODE - Skipping signature verification
💰 Payment completed for job: Harvesting Work
```

### Auto-Payout Flow:
```bash
🚀 Auto-triggering mock payout for payment: xxx
💸 Initiating transfer for payment: xxx
⚠️ MOCK PAYOUT MODE - Simulating transfer
✅ Auto-payout result: Mock transfer completed
```

---

## 📊 Database Verification

### Check Payment Record:
```javascript
db.payments.findOne({ job: ObjectId("xxx") })

Expected:
{
  razorpayOrderId: "order_mock_xxx",
  razorpayPaymentId: "pay_mock_xxx",
  status: "success",
  paidAt: ISODate("2025-11-16..."),
  
  // Payout fields
  payoutId: "pout_mock_xxx",
  payoutStatus: "processed",
  payoutUtr: "UTRxxxxxxxxxxx",
  transferredAt: ISODate("2025-11-16...")
}
```

### Check User Bank Details:
```javascript
db.users.findOne({ email: "stephin@gmail.com" })

Expected:
{
  bankDetails: {
    accountHolderName: "Stephin Kumar",
    accountNumber: "1234567890",
    ifscCode: "SBIN0001234",
    bankName: "State Bank of India",
    verified: true
  },
  razorpayContactId: "cont_mock_xxx",  // Auto-created
  razorpayFundAccountId: "fa_mock_xxx"  // Auto-created
}
```

---

## ✅ Success Indicators

### Labour Dashboard:
- ✅ Bank details saved and displayed
- ✅ Account number masked (••••••7890)
- ✅ Verified badge shown

### Farmer Dashboard:
- ✅ Payment button visible
- ✅ Mock payment completes successfully
- ✅ Job shows "Paid ✅" status

### Labour Applications:
- ✅ Payment Status: "Payment Received ✅"
- ✅ Transfer Status: "✅ Money Received"
- ✅ Amount: ₹1750 displayed
- ✅ UTR number shown

### Backend:
- ✅ Payment record created
- ✅ Auto-payout triggered
- ✅ Payout status updated
- ✅ No errors in console

---

## 🐛 Troubleshooting

### Issue: Bank details not saving
**Solution:**
- Check network tab for API errors
- Verify token is present in localStorage
- Check backend logs for validation errors

### Issue: Payment button not showing
**Solution:**
- Ensure job has assignedTo field
- Check paymentStatus is 'pending'
- Refresh farmer dashboard

### Issue: Auto-payout not triggered
**Solution:**
- Check backend logs for payout controller errors
- Verify PAYMENT_MODE=mock in .env
- Wait 3 seconds after payment

### Issue: Labour not seeing payment status
**Solution:**
- Refresh My Applications page
- Check if payment record exists in DB
- Verify labour ID matches job.assignedTo

---

## 🎉 Expected Timeline (Mock Mode)

```
0s    → Farmer clicks "Pay Now"
2s    → Payment success alert
3s    → Auto-payout triggered
3-6s  → Payout completed
6s+   → Labour sees "Money Received ✅"
```

---

## 🚀 Next: Testing with Real Razorpay

### Setup Required:
1. Get real Razorpay keys
2. Enable Razorpay X
3. Update .env:
   ```env
   RAZORPAY_KEY_ID=rzp_test_xxxxxx
   RAZORPAY_KEY_SECRET=xxxxxx
   RAZORPAY_ACCOUNT_NUMBER=2323230xxxxx
   PAYMENT_MODE=  # Remove or leave empty
   ```
4. Test with Razorpay test cards
5. Monitor real IMPS transfer (5-10 mins)

### Real Money Flow:
```
Payment → Razorpay Gateway → Your Account
Your Account → IMPS → Labour's Bank → SMS notification
```

---

## 📝 Testing Checklist

- [ ] Labour can add bank details
- [ ] Bank details saved and masked
- [ ] Farmer can create payment order
- [ ] Mock payment completes successfully
- [ ] Auto-payout triggers after payment
- [ ] Payout status updates to "processed"
- [ ] Labour sees payment received
- [ ] Labour sees transfer status
- [ ] UTR number displayed
- [ ] No console errors
- [ ] Backend logs show complete flow
- [ ] Database records correct

---

## 💡 Tips

1. **Clear Browser Cache** if seeing old data
2. **Check Network Tab** for API call details
3. **Monitor Backend Logs** for real-time flow
4. **Use MongoDB Compass** to verify database
5. **Test Different Scenarios** (multiple jobs, multiple labours)

---

🎯 **All systems ready for testing!** Open http://localhost:5173 and follow the steps above.
