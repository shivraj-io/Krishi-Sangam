# 💰 Complete Money Transfer System - Farmer to Labour

## Overview
This system enables **automatic money transfer** from farmer's payment to labour's bank account using **Razorpay Payment Gateway + Razorpay Route (Payouts)**.

---

## 🔄 Complete Flow

### 1️⃣ Labour Setup (One-time)
**Labour adds bank details:**
- Account Holder Name
- Account Number
- IFSC Code
- Bank Name
- Optional: UPI ID

**API:** `POST /api/payouts/bank-details`

---

### 2️⃣ Job Acceptance & Payment
1. Labour applies for job
2. Farmer accepts application
3. **Farmer makes payment** via Razorpay (₹350/day × 5 days = ₹1750)
4. Payment goes to **Farmer's Razorpay account**

**APIs:**
- `POST /api/payments/create-order` - Create Razorpay order
- `POST /api/payments/verify` - Verify payment signature

---

### 3️⃣ Automatic Payout (Money Transfer)
**After payment verification succeeds:**
1. System waits 3 seconds
2. **Automatically triggers payout** to labour's bank account
3. Creates Razorpay Contact (if not exists)
4. Creates Razorpay Fund Account (if not exists)
5. Initiates **IMPS transfer** to labour's bank

**API:** `POST /api/payouts/transfer`

**Payout Modes:**
- **IMPS** - Instant (24x7, ₹0-₹2 lakhs)
- **NEFT** - Next working day
- **RTGS** - Same day (₹2 lakhs+)
- **UPI** - Instant (if UPI ID provided)

---

## 💳 Payment Status Flow

### For Farmer:
```
Pending → Processing → Completed
```

### For Labour (Payout):
```
Pending → Queued → Processing → Processed ✅
```

**Status Meanings:**
- `pending` - Payout not initiated yet
- `queued` - In Razorpay queue
- `processing` - Bank processing transfer
- `processed` - ✅ **Money credited to labour's account**
- `reversed` - Failed, money returned
- `cancelled` - Cancelled by admin

---

## 🔧 Setup Requirements

### 1. Get Razorpay API Keys
```bash
# Visit: https://dashboard.razorpay.com/signup
# Complete KYC (PAN, GST, Bank Account)
# Go to: Settings → API Keys → Generate Test Keys
```

### 2. Enable Razorpay X (Payouts)
```bash
# Visit: https://dashboard.razorpay.com/app/razorpayx
# Activate Razorpay X account
# Get Account Number from: Settings → RazorpayX → Account
```

### 3. Configure .env
```env
# Payment Gateway Keys
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxxxxxxxx

# Razorpay X Payout
RAZORPAY_ACCOUNT_NUMBER=2323230xxxxxxx  # From RazorpayX dashboard
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret

# For testing without real keys
PAYMENT_MODE=mock
```

---

## 📊 Database Schema

### User Model (Labour)
```javascript
{
  bankDetails: {
    accountHolderName: String,
    accountNumber: String,
    ifscCode: String,
    bankName: String,
    upiId: String,
    verified: Boolean
  },
  razorpayContactId: String,
  razorpayFundAccountId: String
}
```

### Payment Model
```javascript
{
  job: ObjectId,
  farmer: ObjectId,
  labour: ObjectId,
  amount: Number,
  
  // Payment fields
  razorpayOrderId: String,
  razorpayPaymentId: String,
  status: 'created' | 'success' | 'failed',
  paidAt: Date,
  
  // Payout fields
  payoutId: String,
  payoutStatus: 'pending' | 'processing' | 'processed',
  payoutUtr: String,  // Bank UTR number
  transferredAt: Date
}
```

---

## 🎯 API Endpoints

### Labour APIs
```javascript
// Add bank details
POST /api/payouts/bank-details
Headers: { Authorization: Bearer <token> }
Body: {
  "accountHolderName": "John Doe",
  "accountNumber": "1234567890",
  "ifscCode": "SBIN0001234",
  "bankName": "State Bank of India",
  "upiId": "john@paytm"  // Optional
}
```

### Farmer APIs
```javascript
// Transfer money to labour (auto-triggered after payment)
POST /api/payouts/transfer
Headers: { Authorization: Bearer <token> }
Body: {
  "paymentId": "payment_object_id"
}

Response: {
  "success": true,
  "payout": {
    "id": "pout_xxxxx",
    "status": "processing",
    "utr": "UTRxxxxxxxxx",
    "amount": 1750
  }
}
```

### Status Check
```javascript
// Get payout status
GET /api/payouts/status/:paymentId
Headers: { Authorization: Bearer <token> }

Response: {
  "payment": {
    "payoutStatus": "processed",
    "payoutUtr": "UTR123456789",
    "transferredAt": "2025-11-16T10:30:00Z"
  }
}
```

---

## 🎨 Frontend Components

### 1. BankDetailsForm (Labour)
```jsx
import BankDetailsForm from './components/Labour/BankDetailsForm';

<BankDetailsForm onSubmit={(user) => console.log('Saved:', user)} />
```

### 2. PaymentButton (Farmer)
```jsx
import PaymentButton from './components/Payment/PaymentButton';

<PaymentButton
  job={job}
  amount={1750}
  onPaymentSuccess={() => alert('Payment + Transfer initiated')}
/>
```

### 3. MyApplications (Labour)
Shows:
- Payment Status
- Payout Status
- UTR Number
- Transfer date

---

## 🧪 Testing with Mock Mode

### Enable Mock Mode
```env
PAYMENT_MODE=mock
```

### What Happens:
1. ✅ Payment UI works perfectly
2. ✅ Creates mock Razorpay orders
3. ✅ Simulates payment verification
4. ✅ **Auto-triggers mock payout** after 3 seconds
5. ✅ Updates payout status to "processed"
6. ✅ Generates mock UTR number
7. ❌ **No real money charged**

### Mock IDs Generated:
```
Order ID: order_mock_1763284014315
Payment ID: pay_mock_1763284014315
Payout ID: pout_mock_1763284017315
UTR: UTR1763284017315
```

---

## 💡 Testing with Real Money

### Test Mode (₹0 cost)
```env
RAZORPAY_KEY_ID=rzp_test_xxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxx
PAYMENT_MODE=  # Remove or leave empty
```

**Test Cards:**
- Card: `4111 1111 1111 1111`
- CVV: Any 3 digits
- Expiry: Any future date
- **No real money charged in test mode**

### Test Bank Transfers:
Razorpay provides **test bank accounts** for payout testing:
```
Account Number: 1234567890
IFSC: SBIN0001234
Name: Test User
```

**Money flow:**
1. Test payment → Razorpay Test Account
2. Test payout → Returns to Razorpay (not real bank)
3. No real money involved

---

## 🚀 Production Deployment

### 1. Complete KYC
- Submit PAN card
- GST certificate
- Bank account details
- Business proof

### 2. Switch to Live Keys
```env
RAZORPAY_KEY_ID=rzp_live_xxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxx
RAZORPAY_ACCOUNT_NUMBER=live_account_number
PAYMENT_MODE=  # Must be empty for production
```

### 3. Add Webhook
```bash
# Dashboard → Settings → Webhooks
URL: https://yourdomain.com/api/payouts/webhook
Events: 
  - payout.processed
  - payout.reversed
  - payout.failed
```

### 4. Charges
- **Payment Gateway:** 2% + GST per transaction
- **Payouts:** ₹3-5 per transaction (depending on mode)

---

## 🔒 Security Features

✅ HMAC signature verification for payments
✅ Webhook signature verification
✅ Bank details encrypted in database
✅ JWT authentication for all APIs
✅ Role-based access control (Farmer/Labour)
✅ Payment status validation before payout
✅ Duplicate payout prevention

---

## 📞 Support

### Razorpay Support
- Docs: https://razorpay.com/docs/
- Support: https://razorpay.com/support/

### Debug Checklist
1. ✅ Valid Razorpay keys in .env
2. ✅ Labour bank details added
3. ✅ Payment completed successfully
4. ✅ Check backend logs for payout errors
5. ✅ Verify Razorpay X account activated
6. ✅ Check webhook URL is public & https

---

## 🎉 Success Flow Summary

```
┌─────────────┐
│   Farmer    │ Pays ₹1750 via Razorpay
└──────┬──────┘
       │
       ▼
┌─────────────────┐
│ Razorpay Gateway│ Verifies payment ✅
└──────┬──────────┘
       │
       ▼ (3 seconds)
┌─────────────────┐
│ Auto Payout     │ Transfers ₹1750 to Labour
└──────┬──────────┘
       │
       ▼
┌─────────────┐
│   Labour    │ Receives money in bank! 💰
└─────────────┘
```

**Timeline:**
- Payment: Instant
- Auto-trigger: 3 seconds after payment
- IMPS Transfer: 5-10 minutes
- Labour gets SMS: "Your a/c credited with ₹1750"

---

## 🎯 Next Steps

1. **Get Real Razorpay Keys** → https://dashboard.razorpay.com
2. **Enable Razorpay X** → Activate payouts
3. **Add Bank Details** → Labour side
4. **Test Payment** → Use test cards
5. **Verify Transfer** → Check payout status
6. **Go Live** → After testing

🎉 **Money transfer is now fully automated!**
