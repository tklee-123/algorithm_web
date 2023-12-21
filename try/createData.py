import pymongo
from bson import ObjectId
import random

# Connect to MongoDB
client = pymongo.MongoClient("mongodb://localhost:27017/")  # Use the correct IP address or hostname
db = client["new_web"]
students_collection = db["students"]
positions_collection = db['positions']
promises_collection = db['promises']
# Function to generate a random float between min and max (inclusive)
for i in range(80):
    if i <= 9:
        student_id = f"2100210{i}"
    else:
        student_id = f"210021{i}"

    student = {
        "_id": student_id,
        "firstname": "ST",
        "lastname": str(i),
        "address": f"AD{i}",
        "major": "Data Science",
        "gpa": round(random.uniform(2.3, 3.8), 1)
    }
    students_collection.insert_one(student)

for i in range(40):
  position = {
    "_id": f"VT{i}",
    "name": f"BA{i}",
    "capacity": random.randint(3,7),
    "gpa_required": round(random.uniform(2.4, 3.2), 1)
  }
  positions_collection.insert_one(position)

  
indices = list(range(40))
random.shuffle(indices)

# Insert promises
for i in range(80):
    if i <= 9:
        student_id = f"2100210{i}"
    else:
        student_id = f"210021{i}"
    # Select unique indices for promise1, promise2, and promise3
    promise_indices = random.sample(indices, 3)
    promise = {
        "student_id": student_id,
        "promise1": f"VT{promise_indices[0]}",
        "promise2": f"VT{promise_indices[1]}",
        "promise3": f"VT{promise_indices[2]}"
    }

    promises_collection.insert_one(promise)
# Close MongoDB connection
client.close()
