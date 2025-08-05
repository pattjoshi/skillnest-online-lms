Front end :- `npm run dev`
Back end :- `npm run dev`
stripe :- `stripe listen --forward-to localhost:8080/api/v1/purchase/webhook`
`instructor`

#

# 📚 SkillNest LMS - Feature Checklist

This document outlines the key features and improvements to be implemented in the SkillNest Learning Management System.

---

## ✅ Basic Features (Planned / Todo)

- [x] **Role-Based Access Control (RBAC)** _(Instructor-specific)_  
       Add permission-based access control to restrict or grant features to specific user roles like Instructor and Student

- [x] **Coupon / Discount Code System**

  - [x] Instructor creates coupon and links to course(s)
  - [x] Student sees course card → sees discounted price + % off
  - [x] On checkout:
    - [x] Coupon is validated
    - [x] Discounted price is calculated

- [ ] **Discussion Forum / Q&A per Lecture**

  - [ ] Students can post questions or comments
  - [ ] Instructors or other students can reply
  - [ ] If instructors reply, show an icon/badge
  - [ ] Rich text input support
  - [ ] Like / Upvote replies
  - [ ] Sorting options (e.g., most recent, most liked)
  - [ ] Polling or refresh button to fetch new replies
  - [ ] Reply threading (nested replies)
  - [ ] Pagination or lazy loading of questions
  - [ ] Markdown or HTML formatting support
  - [ ] Admin/instructor moderation tools
  - [ ] Notification system for new replies or mentions

- [ ] **Student → Instructor Messaging**  
       Facilitate direct communication between students and instructors within the platform.

- [ ] **Certificate Generation on Completion**  
       Auto-generate personalized completion certificates for students who finish a course.

- [ ] **Multi-language Support**  
       Add i18n support to serve content in multiple languages.

---

## ⚙️ Infrastructure Improvements

- [ ] **Replace Cloudinary with AWS S3**  
       Use AWS S3 for storing and managing media assets more securely and at scale.

- [ ] **Dockerize the Application**  
       Containerize backend and frontend using Docker for easy deployment and consistent dev environment.

- [ ] **Set up CI/CD Pipeline**  
       Automate testing, build, and deployment processes using tools like GitHub Actions, GitLab CI, or Jenkins.

- [ ] **Deploy LMS to Production**  
       Launch the LMS with proper domain, HTTPS, load balancing, and error monitoring.

---

> 🛠️ This list will evolve as the project scales. Contributions welcome!
