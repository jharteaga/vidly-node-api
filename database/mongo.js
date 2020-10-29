const mongoose = require('mongoose');

mongoose
  .connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch((err) => console.error('Could not connect to MongoDB...', err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
  const course = new Course({
    name: 'Angular Course',
    author: 'Mosh',
    tags: ['angular', 'frontend'],
    isPublished: true,
  });

  const result = await course.save();
  console.log(result);
}

async function getCourses() {
  const courses = await Course.find({ author: /^Mosh/ });

  //   .find().or([
  //     { author: 'Mosh' },
  //     { isPublished: true },
  //   ]);

  // .find({ price: { $gte: 10, $lte: 20 } })
  // .find({ price: { $in: [10, 15, 20] } })
  // .limit(10)
  // .sort({ name: 1 })
  // .select({ name: 1, tags: 1 });

  //   const courses = await Course.find({ author: 'Mosh', isPublished: true })
  //     .limit(10)
  //     .sort({ name: 1 })
  //     .select({ name: 1, tags: 1 });

  console.log(courses);
}

async function queryFirstCourse(id) {
  const course = await Course.findById(id);
  if (!course) return;
  course.set({
    isPublished: true,
    author: 'Another author',
  });
  const result = await course.save();
  console.log(result);
}

async function updateFirstCourse(id) {
  const course = await Course.findByIdAndUpdate(
    id,
    {
      $set: {
        author: 'Mosh',
        isPublished: false,
      },
    },
    { new: true }
  );

  console.log(course);
}

async function removeCourse(id) {
  const result = await Course.deleteOne({ _id: id });

  console.log(result);
}
