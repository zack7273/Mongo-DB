db.getCollection('guns_list').insertMany([
  {
    _id: ObjectId(),
    name: "AKM",
    type: "Assault Rifle",
    bullets: "7.62mm"
  },
  {
    _id: ObjectId(),
    name: "M416",
    type: "Assault Rifle",
    bullets: "5.56mm"
  },
  {
    _id: ObjectId(),
    name: "Kar98k",
    type: "Sniper Rifle",
    bullets: "7.62mm"
  },
  {
    _id: ObjectId(),
    name: "UMP45",
    type: "SMG",
    bullets: "0.45 ACP"
  },
  {
    _id: ObjectId(),
    name: "AWM",
    type: "Sniper Rifle",
    bullets: ".300 Magnum"
  }
]);



// Print confirmation (works in mongosh)
print("🔥 Fired! Guns inserted successfully.");
