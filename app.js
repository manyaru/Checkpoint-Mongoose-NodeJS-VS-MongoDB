const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

// Define a Schema and Model
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

const Person = mongoose.model('Person', personSchema);

// Create and Save a Record of a Model
const createAndSavePerson = async () => {
  const john = new Person({
    name: 'John Doe',
    age: 25,
    favoriteFoods: ['Pizza', 'Burger']
  });

  try {
    const data = await john.save();
    console.log('Person saved:', data);
  } catch (err) {
    console.error('Error saving person:', err);
  }
};

// Create Many Records with model.create()
const createManyPeople = async (arrayOfPeople) => {
  try {
    const data = await Person.create(arrayOfPeople);
    console.log('People created:', data);
  } catch (err) {
    console.error('Error creating people:', err);
  }
};

// Use model.find() to Search Your Database
const findPeopleByName = async (name) => {
  try {
    const people = await Person.find({ name });
    console.log('People found:', people);
  } catch (err) {
    console.error('Error finding people by name:', err);
  }
};

// Use model.findOne() to Return a Single Matching Document
const findOneByFavoriteFood = async (food) => {
  try {
    const person = await Person.findOne({ favoriteFoods: food });
    console.log('Person found:', person);
  } catch (err) {
    console.error('Error finding person by favorite food:', err);
  }
};

// Use model.findById() to Search Your Database By _id
const findPersonById = async (personId) => {
  try {
    const person = await Person.findById(personId);
    console.log('Person found by ID:', person);
  } catch (err) {
    console.error('Error finding person by ID:', err);
  }
};

// Perform Classic Updates by Running Find, Edit, then Save
const findEditThenSave = async (personId) => {
  try {
    const person = await Person.findById(personId);
    person.favoriteFoods.push('hamburger');
    const updatedPerson = await person.save();
    console.log('Person updated:', updatedPerson);
  } catch (err) {
    console.error('Error updating person:', err);
  }
};

// Perform New Updates on a Document Using model.findOneAndUpdate()
const findAndUpdate = async (personName) => {
  try {
    const updatedPerson = await Person.findOneAndUpdate(
      { name: personName },
      { age: 20 },
      { new: true }
    );
    console.log('Person updated:', updatedPerson);
  } catch (err) {
    console.error('Error updating person by name:', err);
  }
};

// Delete One Document Using model.findByIdAndRemove
const removeById = async (personId) => {
  try {
    const removedPerson = await Person.findByIdAndRemove(personId);
    console.log('Person removed:', removedPerson);
  } catch (err) {
    console.error('Error removing person by ID:', err);
  }
};

// MongoDB and Mongoose - Delete Many Documents with model.remove()
const removeManyPeople = async () => {
  try {
    const result = await Person.remove({ name: 'Mary' });
    console.log('People removed:', result);
  } catch (err) {
    console.error('Error removing people by name:', err);
  }
};

// Chain Search Query Helpers to Narrow Search Results
const queryChain = async () => {
  try {
    const people = await Person.find({ favoriteFoods: 'burritos' })
      .sort('name')
      .limit(2)
      .select('-age')
      .exec();
    console.log('Query Chain result:', people);
  } catch (err) {
    console.error('Error in query chain:', err);
  }
};

// Example usage
createAndSavePerson();
createManyPeople([
  { name: 'Jane Doe', age: 28, favoriteFoods: ['Salad'] },
  { name: 'Mark Smith', age: 30, favoriteFoods: ['Pasta'] },
  { name: 'Mary', age: 24, favoriteFoods: ['Fish', 'Chips'] },
  { name: 'Mary', age: 28, favoriteFoods: ['Chicken', 'Rice'] },
]);
findPeopleByName('John Doe');
findOneByFavoriteFood('Pizza');
findPersonById('your_person_id_here'); // Replace with a valid ID
findEditThenSave('your_person_id_here'); // Replace with a valid ID
findAndUpdate('John Doe');
removeById('your_person_id_here'); // Replace with a valid ID
removeManyPeople();
queryChain();
