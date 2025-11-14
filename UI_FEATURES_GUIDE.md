# 🌾 Krishi Sangam - UI Features Guide

## 📋 Overview
Krishi Sangam is a comprehensive agricultural platform connecting farmers with skilled workers, providing intelligent tools and resources for modern farming.

---

## 🏠 Landing Page Features

### Navigation Bar (Home Page)
- **Home** - Scroll to hero section
- **Features** - Scroll to features showcase
- **About** - Learn about Krishi Sangam's mission
- **Contact** - Contact form and information
- **Register/Login** - Dropdown menu with options for:
  - 👨‍🌾 Farmer Register
  - 👨‍🌾 Farmer Login
  - 👷 Labour Register
  - 👷 Labour Login

### Sections
1. **Hero Section** - Welcome message with prominent registration buttons
2. **Features Section** - Showcase of all platform capabilities
3. **How It Works** - 4-step process explanation
4. **About Section** - Mission and value propositions
5. **Contact Section** - Contact information and message form

---

## 👨‍🌾 Farmer Features (After Registration/Login)

### Dashboard
- Welcome message with user name
- Quick statistics overview
- Quick action cards for all features
- Recent jobs posted

### Available Features

#### 1. **Create Job** 🔨
Post job requirements for agricultural workers
- Job title and description
- Crop type selection
- Job type (Plowing, Sowing, Harvesting, etc.)
- Duration and payment details
- Number of workers needed
- Location information

#### 2. **Crop Prediction** 🌾
AI-powered crop recommendations
- **Required Inputs:**
  - Nitrogen (N) content
  - Phosphorus (P) content
  - Potassium (K) content
  - Temperature (°C)
  - Humidity (%)
  - pH level
  - Rainfall (mm)
  - Soil type (Sandy, Loamy, Black, Red, Clayey)
  - Season (Kharif, Rabi, Zaid, Summer)
- **Output:** Best crop recommendations with probability scores

#### 3. **Yield Prediction** 📊
Estimate crop yield based on parameters
- **Required Inputs:**
  - Crop type
  - Area (in hectares)
  - Soil type
  - Season
  - Rainfall
  - Temperature
  - Fertilizer usage
  - Pesticide usage
  - Irrigation method
- **Output:** Estimated yield with recommendations

#### 4. **Today's Weather** 🌤️
Real-time weather information
- Current temperature
- Weather conditions
- Humidity levels
- Wind speed
- Location-based or manual city search
- Farming tips based on weather

#### 5. **Smart Labour Recommendation** 🤖
AI-based matching system
- Enter job requirements
- Get matched labour recommendations
- View skills, experience, and ratings
- Contact verified workers
- Track completed jobs

#### 6. **Government Schemes** 🏛️
Access to government programs
- PM-KISAN scheme information
- Crop insurance (PMFBY)
- Kisan Credit Card details
- Pension schemes
- Eligibility checker
- Application guidance
- Direct links to official portals

---

## 👷 Labour Features (After Registration/Login)

### Dashboard
- Welcome message
- Application statistics
- Recent job opportunities
- Quick action buttons

### Available Features

#### 1. **View All Jobs** 💼
Browse all available job postings
- Filter by job type
- Filter by location
- Search functionality
- View job details
- Apply for jobs directly

#### 2. **Apply for Jobs** ✅
Simple application process
- One-click apply
- Track application status
- View farmer contact details
- Receive notifications

#### 3. **My Applications** 📝
Track your applications
- View all applied jobs
- Filter by status (Pending, Accepted, Rejected)
- Application statistics
- Status updates
- Farmer contact information

#### 4. **Send Requests** 📨
Direct communication with farmers
- Request for specific jobs
- Negotiate terms
- Ask questions
- Express interest

#### 5. **Payment Management** 💰
*(Feature coming soon)*
- Track earnings
- Payment history
- Pending payments
- Invoice generation
- Payment requests

---

## 🎨 UI/UX Highlights

### Design Features
- **Clean and Modern** - Simple, intuitive interface
- **Responsive** - Works on all devices (mobile, tablet, desktop)
- **Attractive Color Scheme** - Green theme representing agriculture
- **Smooth Animations** - Fade-ins, hover effects, transitions
- **Easy Navigation** - Consistent navbar across all pages
- **Visual Icons** - Emoji and icon-based visual aids
- **Card-based Layout** - Information organized in clean cards
- **Quick Actions** - Direct access to all features from dashboard

### Color Palette
- Primary Green: `#2e7d32`
- Light Green: `#4caf50`
- Accent Green: `#8bc34a`
- Background: White and light grey
- Text: Dark grey for readability

### Typography
- Clean, readable fonts
- Hierarchical headings
- Bilingual support (English and Hindi)

---

## 🚀 Getting Started

### For Farmers:
1. Register on the landing page
2. Fill in farm details during registration
3. Access dashboard with all features
4. Start posting jobs or use prediction tools

### For Labour:
1. Register with your skills and experience
2. Browse available jobs
3. Apply for suitable positions
4. Track your applications
5. Connect with farmers

---

## 📱 Navigation Structure

```
Landing Page (/)
├── Home Section
├── Features Section
├── About Section
└── Contact Section

Farmer Portal (/farmer/*)
├── Dashboard
├── Create Job
├── Crop Prediction
├── Yield Prediction
├── Weather
├── Labour Recommendation
└── Government Schemes

Labour Portal (/labour/*)
├── Dashboard
├── All Jobs
└── My Applications
```

---

## 🔐 Authentication

### Registration Requirements
**Farmers:**
- Full Name
- Email
- Password
- Phone Number
- Address
- Farm Size
- Crops Grown

**Labour:**
- Full Name
- Email
- Password
- Phone Number
- Skills
- Experience

### Login
- Email and password based
- JWT token authentication
- Role-based access control
- Secure password storage (bcrypt)

---

## 🌟 Key Benefits

### For Farmers:
✅ Easy worker recruitment
✅ Intelligent crop planning
✅ Yield optimization
✅ Weather-based decisions
✅ Government scheme access
✅ All-in-one platform

### For Labour:
✅ Find jobs easily
✅ Direct farmer contact
✅ Track applications
✅ Verified opportunities
✅ Payment tracking
✅ Skill-based matching

---

## 📞 Support & Contact

**Email:** support@krishisangam.com  
**Phone:** +91 1800-XXX-XXXX  
**Address:** Agricultural Innovation Center, New Delhi, India

---

## 🎯 Future Enhancements

- [ ] Multi-language support
- [ ] Mobile app
- [ ] Video calls for interviews
- [ ] Digital contracts
- [ ] Integrated payment gateway
- [ ] Ratings and reviews system
- [ ] Weather alerts
- [ ] Crop disease detection
- [ ] Market price information
- [ ] Training resources

---

**Built with ❤️ for the farming community**
