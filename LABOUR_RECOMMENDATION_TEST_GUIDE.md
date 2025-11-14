# 🤖 Smart Labour Recommendation System - Test Guide

## 📋 What's New?

✅ **Smart Matching Algorithm** - AI-powered labour recommendation with 5 scoring factors:
- **Skills Matching** (40% weight) - Matches labour skills with job requirements
- **Experience Level** (25% weight) - Considers years of experience
- **Location Proximity** (20% weight) - Prefers nearby labourers
- **Rating/Performance** (10% weight) - Based on past job ratings
- **Availability Status** (5% weight) - Prioritizes available workers

✅ **Match Score Display** - Shows percentage match for each labour
✅ **Smart Sorting** - Top matches appear first
✅ **Detailed Factors** - Backend returns breakdown of match factors

---

## 🚀 Setup Instructions

### Step 1: Add Sample Labour Data to Database

```bash
cd backend
node test_labour_recommendation.js
```

यह script 8 sample labour users database में add करेगा:
- **Ramesh Kumar** (Punjab, Harvesting, Irrigation, Plowing)
- **Suresh Singh** (Haryana, Sowing, Weeding)
- **Mahesh Yadav** (UP, Plowing, Harvesting)
- **Rajesh Patel** (Gujarat, Irrigation, Pesticide)
- **Vijay Kumar** (Punjab, Rice, Wheat specialist)
- **Mohan Lal** (Rajasthan, General labor)
- **Ravi Sharma** (Punjab, Tractor operation)
- **Santosh Kumar** (UP, Sugarcane specialist)

### Step 2: Restart Backend Server

```bash
cd backend
node server.js
```

### Step 3: Start Frontend

```bash
cd frontend
npm run dev
```

---

## 🧪 Test Cases

### Test Case 1: Basic Search (No Filters)
**Input:**
- Job Type: `Harvesting`
- Skills: (leave empty)
- Experience: (leave empty)
- Location: (leave empty)
- Duration: 5 days
- Workers Needed: 2

**Expected Result:**
- Should return all 8 labour users
- Sorted by overall rating and experience
- Match scores around 80-90%

---

### Test Case 2: Skills-Based Search
**Input:**
- Job Type: `Harvesting`
- Skills: `Harvesting, Plowing`
- Experience: 5
- Location: `Punjab`
- Duration: 7 days
- Workers Needed: 3

**Expected Result:**
- **Top matches:**
  - Vijay Kumar (95%+) - Punjab, 12 years exp, Harvesting specialist
  - Ramesh Kumar (90%+) - Punjab, 8 years exp, Harvesting + Plowing
  - Ravi Sharma (85%+) - Punjab, 7 years exp, Plowing specialist
- **Lower matches:**
  - Mahesh Yadav (70-80%) - UP (different location), but good skills

---

### Test Case 3: Location-Focused Search
**Input:**
- Job Type: `Irrigation`
- Skills: `Irrigation`
- Experience: 3
- Location: `Punjab`
- Duration: 10 days
- Workers Needed: 2

**Expected Result:**
- **Punjab labourers at top:**
  - Ramesh Kumar (Punjab + Irrigation skill)
  - Vijay Kumar (Punjab)
  - Ravi Sharma (Punjab)
- **Other states lower:**
  - Rajesh Patel (Gujarat, but has Irrigation skill)

---

### Test Case 4: Experience-Heavy Search
**Input:**
- Job Type: `Plowing`
- Skills: `Plowing`
- Experience: 8
- Location: (leave empty)
- Duration: 3 days
- Workers Needed: 1

**Expected Result:**
- **High experience labourers:**
  - Vijay Kumar (12 years) - Top match
  - Mahesh Yadav (10 years) - Second
  - Ramesh Kumar (8 years) - Third
- **Lower experience filtered out:**
  - Mohan Lal (3 years) - Low match score

---

### Test Case 5: Sugarcane Specialist
**Input:**
- Job Type: `General Labor`
- Skills: `Sugarcane`
- Experience: 2
- Location: `Uttar Pradesh`
- Duration: 15 days
- Workers Needed: 5

**Expected Result:**
- **Top match:**
  - Santosh Kumar (UP + Sugarcane Cutting skill)
- **Generic labourers:**
  - Mahesh Yadav (UP location match)
  - Suresh Singh (General Labor skill)

---

### Test Case 6: No Matches Scenario
**Input:**
- Job Type: `Others`
- Skills: `Dairy Farming, Cattle Care`
- Experience: 15
- Location: `Kerala`
- Duration: 30 days
- Workers Needed: 10

**Expected Result:**
- Low match scores (50-60%) for all labourers
- Error message: "No labour found matching your requirements"
- Or shows best available with low match scores

---

## 🔍 How Matching Works

### Scoring Breakdown Example:

**Requirements:**
- Skills: `Harvesting, Irrigation`
- Experience: 5 years
- Location: `Punjab`

**Labour: Ramesh Kumar**
- Skills: `Harvesting, Irrigation, Plowing, Tractor` ✅
- Experience: 8 years ✅
- Location: Punjab ✅
- Rating: 4.8/5 ⭐
- Availability: Available ✅

**Match Score Calculation:**
1. **Skills (40%):** 100% match (2/2 required skills) = 40 points
2. **Experience (25%):** 8 >= 5 years = 25 points
3. **Location (20%):** Punjab = Punjab = 20 points
4. **Rating (10%):** 4.8/5 × 10 = 9.6 points
5. **Availability (5%):** Available = 5 points

**Total Match Score:** 40 + 25 + 20 + 9.6 + 5 = **99.6% Match** ✨

---

## 📊 API Testing (Postman/Thunder Client)

### Endpoint:
```
POST http://localhost:5000/api/labour/recommend
```

### Headers:
```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer YOUR_JWT_TOKEN"
}
```

### Request Body:
```json
{
  "jobType": "Harvesting",
  "skills": "Harvesting, Plowing",
  "experience": "5",
  "location": "Punjab",
  "duration": "7",
  "workersNeeded": "3"
}
```

### Expected Response:
```json
{
  "success": true,
  "count": 6,
  "totalLabourers": 8,
  "requirements": {
    "jobType": "Harvesting",
    "skills": "Harvesting, Plowing",
    "experience": "5",
    "location": "Punjab",
    "duration": "7",
    "workersNeeded": "3"
  },
  "recommendations": [
    {
      "id": "...",
      "name": "Vijay Kumar",
      "email": "vijay.kumar@test.com",
      "phone": "+91-9876543214",
      "skills": ["Harvesting", "Sowing", "Rice Transplanting", "Wheat Threshing"],
      "experience": 12,
      "rating": 4.9,
      "location": "Amritsar, Punjab",
      "availability": "Available",
      "completedJobs": 267,
      "phoneVerified": true,
      "matchScore": 98,
      "matchFactors": [
        { "factor": "Skills", "score": "40.0" },
        { "factor": "Experience", "score": "25.0" },
        { "factor": "Location", "score": "20.0" },
        { "factor": "Rating", "score": "9.8" },
        { "factor": "Availability", "score": "5.0" }
      ]
    },
    // ... more recommendations
  ]
}
```

---

## 🎯 Frontend Testing Checklist

### ✅ Visual Tests:
- [ ] Form displays all input fields correctly
- [ ] Dropdown menus populate with options
- [ ] Loading spinner shows during API call
- [ ] Match score badges show with correct colors:
  - 🟢 Green (90-100%)
  - 🟠 Orange (75-89%)
  - 🔴 Red (below 75%)
- [ ] Labour cards display all information
- [ ] Skills show as tags
- [ ] Phone verified badge appears

### ✅ Functional Tests:
- [ ] Submit button disabled while loading
- [ ] Reset button clears form and results
- [ ] API call succeeds with valid token
- [ ] Error message displays if no matches
- [ ] Results sorted by match score (highest first)
- [ ] "View Profile" and "Contact Now" buttons present

---

## 🐛 Troubleshooting

### Issue 1: "No labour found in database"
**Solution:** Run `node test_labour_recommendation.js` to add sample data

### Issue 2: 401 Unauthorized
**Solution:** Make sure you're logged in as farmer and token is valid

### Issue 3: Empty recommendations array
**Solution:** Check if labour users have required fields (skills, location, experience)

### Issue 4: All match scores are low
**Solution:** This is normal if requirements don't match any labour. Adjust filters.

---

## 🎉 Success Criteria

Your Labour Recommendation System is working correctly if:
1. ✅ Sample data inserted successfully
2. ✅ API returns recommendations array
3. ✅ Match scores calculated (0-100%)
4. ✅ Results sorted by match score
5. ✅ Frontend displays labour cards with all details
6. ✅ Punjab search returns Punjab labourers at top
7. ✅ Skills matching works (Harvesting finds harvesters)
8. ✅ Experience filter works (8 years >= 5 years requirement)

---

## 📝 Quick Test Commands

```bash
# 1. Add sample data
cd backend
node test_labour_recommendation.js

# 2. Restart backend
node server.js

# 3. In another terminal, start frontend
cd frontend
npm run dev

# 4. Open browser
http://localhost:5173/farmer/labour-recommendation

# 5. Test with:
Job Type: Harvesting
Skills: Harvesting, Plowing
Experience: 5
Location: Punjab
Workers Needed: 3
```

---

## 🎊 Expected Output

You should see 3-6 labour recommendations with:
- **Match scores 80-99%** for Punjab + Harvesting skills
- **Vijay Kumar or Ramesh Kumar at top** (highest match)
- **Skills badges** showing matching abilities
- **Location** showing Punjab
- **Experience** 5+ years
- **Availability: Available** status
- **Phone Verified** badge

---

## 🚀 Next Steps

After testing:
1. Add more labour users with diverse skills
2. Implement "Contact Now" feature (WhatsApp/Call)
3. Add "View Profile" page with detailed labour history
4. Implement "Shortlist" feature for farmers
5. Add review/rating system after job completion

---

**Happy Testing! 🌾🤖✨**
