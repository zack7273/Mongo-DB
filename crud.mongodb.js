use('crudDB');

db.createCollection('operators_list');

// Insert ek sample document
db.operators_list.insertOne({
  "_id": 1,
  "name": "Ravi Kumar",
  "age": 28,
  "email": "ravi.kumar@example.com",
  "city": "Delhi",
  "skills": ["JavaScript", "Python", "MongoDB"],
  "salary": 75000,
  "isActive": true,
  "bio": "Full stack developer with 5 years experience in web development.",
  "joined": ISODate("2021-05-15T08:00:00Z"),
  "tags": ["developer", "javascript", "remote"],
  "projects": [
    { "name": "Project A", "status": "completed", "budget": 10000 },
    { "name": "Project B", "status": "in progress", "budget": 20000 }
  ]
});



// 1. Comparison Operators

// $eq : exact match
db.operators_list.find({ age: { $eq: 28 } }); 
// Age bilkul 28 ke barabar hai

// $ne : not equal
db.operators_list.find({ age: { $ne: 28 } });
// Age 28 nahi hai

// $gt : greater than
db.operators_list.find({ salary: { $gt: 70000 } });
// Salary 70000 se zyada hai

// $gte : greater than or equal
db.operators_list.find({ joined: { $gte: ISODate("2021-05-15") } });
// Joined 15 May 2021 ya uske baad hai

// $lt : less than
db.operators_list.find({ age: { $lt: 30 } });
// Age 30 se kam hai

// $lte : less than or equal
db.operators_list.find({ salary: { $lte: 75000 } });
// Salary 75000 ya usse kam hai

// $in : field value array me se koi ek match kare
db.operators_list.find({ skills: { $in: ["JavaScript", "Go"] } });
// Skills me JavaScript ya Go hona chahiye

// $nin : field value array me nahi hona chahiye
db.operators_list.find({ skills: { $nin: ["PHP", "Ruby"] } });
// Skills me PHP ya Ruby nahi hone chahiye


// 2. Logical Operators

// $and : dono conditions true honi chahiye
db.operators_list.find({
  $and: [
    { age: { $gt: 25 } },
    { city: "Delhi" }
  ]
});
// Age 25 se bada aur city Delhi hai

// $or : koi bhi ek condition true ho
db.operators_list.find({
  $or: [
    { city: "Delhi" },
    { salary: { $gt: 80000 } }
  ]
});
// City Delhi ya salary 80000 se zyada

// $nor : dono conditions false honi chahiye
db.operators_list.find({
  $nor: [
    { isActive: true },
    { city: "Mumbai" }
  ]
});
// Active nahi hai aur Mumbai me nahi rehta

// $not : condition ko invert karta hai
db.operators_list.find({
  salary: { $not: { $gt: 70000 } }
});
// Salary 70000 se zyada nahi hai


// 3. Evaluation Operators

// $regex : regex pattern match karta hai
db.operators_list.find({ name: { $regex: /^Ravi/ } });
// Name Ravi se start hota hai

// $text : text search (text index hona chahiye)
db.operators_list.createIndex({ bio: "text" });
db.operators_list.find({ $text: { $search: "developer" } });
// Bio me "developer" shabd hona chahiye

// $where : JS expression ke through condition check karta hai
db.operators_list.find({
  $where: function() {
    return this.salary > 70000 && this.city === "Delhi";
  }
});
// JS logic salary > 70000 aur city Delhi ke liye


// 4. Update Operators (common ones)

// $set : field ki value update karta hai
db.operators_list.updateOne(
  { name: "Ravi Kumar" },
  { $set: { city: "Noida" } }
);
// Ravi Kumar ka city Noida kar diya

// $inc : numeric field ko increment/decrement karta hai
db.operators_list.updateOne(
  { name: "Ravi Kumar" },
  { $inc: { salary: 5000 } }
);
// Salary 5000 se badhaya

// $unset : field ko hata deta hai
db.operators_list.updateOne(
  { name: "Ravi Kumar" },
  { $unset: { bio: "" } }
);
// Bio field hata diya

// $push : array me element add karta hai
db.operators_list.updateOne(
  { name: "Ravi Kumar" },
  { $push: { skills: "TypeScript" } }
);
// Skills me TypeScript add kar diya

// $addToSet : array me unique element add karta hai (agar pehle se nahi hai)
db.operators_list.updateOne(
  { name: "Ravi Kumar" },
  { $addToSet: { skills: "Python" } }
);
// Skills me Python add karega agar nahi hai toh


// 5. Delete Operators

// deleteOne : ek document delete karta hai jo match kare
db.operators_list.deleteOne({ _id: 1 });
// _id 1 wala document delete karo

// deleteMany : saare documents delete karo jo match karte hain
db.operators_list.deleteMany({ isActive: false });
// Saare inactive documents delete karo

// Delete based on complex filter
db.operators_list.deleteMany({ salary: { $lt: 50000 } });
// Salary 50000 se kam wale sab delete kar do

