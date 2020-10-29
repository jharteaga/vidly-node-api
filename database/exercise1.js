const mongoose = require('mongoose');

mongoose
  .connect('mongodb://localhost/mongo-exercises')
  .then(() => console.log('MongoDB Connected...'));

const courseSchema = mongoose.Schema({
  name: String,
  author: String,
  date: { type: Date, default: Date.now },
  tags: [String],
  isPublished: Boolean,
  price: Number,
});

const Course = mongoose.model('Course', courseSchema);

async function getBackendCourses() {
  const result = await Course.find({
    isPublished: true,
    tags: 'backend',
  })
    .sort({
      name: 1,
    })
    .select({ name: 1, author: 1 });

  console.log(result);
}

async function getfrontBackCourses() {
  const result = await Course.find({
    isPublished: true,
    tags: { $in: ['frontend', 'backend'] },
  })
    .sort('-price')
    .select('name author');

  console.log(result);
}

async function solution3() {
  const result = await Course.find({ isPublished: true }).or([
    { price: { $gte: 15 } },
    { name: /.*by.*/i },
  ]);

  console.log(result);
}

solution3();
