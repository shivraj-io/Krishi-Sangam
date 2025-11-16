# Razorpay Payment Integration - Setup Guide

## 🔐 Step 1: Get Razorpay API Keys

1. Go to https://dashboard.razorpay.com/signup
2. Complete registration and KYC
3. Navigate to **Settings** → **API Keys**
4. Click **Generate Test Keys** (for testing)
5. Copy your keys:
   - **Key ID**: `rzp_test_xxxxxxxxxxxxx`
   - **Key Secret**: `xxxxxxxxxxxxx`

## ⚙️ Step 2: Configure Environment Variables

Update `backend/.env` file with your Razorpay keys:

```env
RAZORPAY_KEY_ID=rzp_test_your_actual_key_id_here
RAZORPAY_KEY_SECRET=your_actual_key_secret_here
```

⚠️ **IMPORTANT**: Replace the placeholder values with your actual Razorpay keys!

## 🧪 Step 3: Test the Integration

### Testing Cards (Test Mode Only):
```
Card Number: 4111 1111 1111 1111
CVV: Any 3 digits (e.g., 123)
Expiry: Any future date (e.g., 12/25)
Name: Test User
```

### UPI Testing:
```
UPI ID: success@razorpay
```

## 📋 Step 4: How to Test Payment Flow

1. **As Farmer:**
   - Login as Farmer
   - Create a job posting
   - Wait for labour to apply

2. **As Labour:**
   - Login as Labour  
   - Go to "All Jobs"
   - Apply for the job

3. **As Farmer (Accept & Pay):**
   - Go to Dashboard
   - See the application
   - Click "Accept" button
   - Payment section appears
   - Click "Pay ₹XXX" button
   - Razorpay checkout opens
   - Use test card: `4111 1111 1111 1111`
   - Complete payment

4. **Verify:**
   - Payment status shows "✅ Completed"
   - Check database for payment record
   - Labour will see payment in their records

## 🚀 Step 5: Start Servers

### Terminal 1 - Backend:
```bash
cd backend
npm start
```

### Terminal 2 - Frontend:
```bash
cd frontend
npm run dev
```

## 📊 Database Changes

New fields added to Job model:
- `paymentStatus`: 'pending', 'processing', 'completed', 'failed', 'refunded'
- `paymentDetails`: Object with payment info
- `totalAmount`: Total payment amount

New Payment model created with:
- Job reference
- Farmer and Labour references
- Razorpay order/payment IDs
- Payment status and timestamps

## 🔄 Payment Flow

```
1. Labour applies → Farmer accepts
2. Labour assigned to job
3. Payment button appears
4. Farmer clicks Pay
5. Razorpay checkout opens
6. Farmer completes payment
7. Backend verifies signature
8. Payment status updated
9. Money will be settled to your account (2-3 business days)
```

## 💰 Going Live

To use real payments:

1. Complete KYC on Razorpay
2. Get **Live API Keys** from dashboard
3. Update `.env` with live keys (replace `test` with `live`)
4. Remove test mode code
5. Deploy to production

## 🛡️ Security Notes

- Never commit `.env` file to git
- Keep secret keys private
- Always verify payment signatures on backend
- Use HTTPS in production

## 📞 Support

- Razorpay Docs: https://razorpay.com/docs/
- Payment Issues: Check Razorpay dashboard → Payments
- Integration Help: support@razorpay.com

---

## Quick Start Checklist

- [ ] Created Razorpay account
- [ ] Got test API keys
- [ ] Updated backend/.env with keys
- [ ] Restarted backend server
- [ ] Tested payment with test card
- [ ] Payment status updated correctly
- [ ] Ready to use!

🎉 **Payment integration is complete!**
