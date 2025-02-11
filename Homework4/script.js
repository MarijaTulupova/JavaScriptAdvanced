let institutionId = 0;

function generateInstitutionId() {
  institutionId++;
  return institutionId;
}

let courseId = 0;

function generateCourseId() {
  courseId++;
  return courseId;
}

let personId = 0;

function generatePersonId() {
  personId++;
  return personId;
}

function Institution(location, capacity) {
  this.id = generateInstitutionId();
  this.location = location;
  this.capacity = capacity;
  this.validateCapacity = function () {
    if (this.capacity < 1) {
      console.log("Error: Capacity must be at least 1.");
    }
  };
}

function Academy(
  location,
  capacity,
  name,
  students,
  subjects,
  start,
  end,
  numberOfClasses
) {
  Object.setPrototypeOf(this, new Institution(location, capacity));

  this.name = name;
  this.students = students;
  this.subjects = subjects;
  this.start = start;
  this.end = end;
  this.numberOfClasses = numberOfClasses;
  this.printStudents = function () {
    console.log(
      `Students in this academy: ${this.students
        .map((student) => student.firstName + " " + student.lastName)
        .join(", ")}.`
    );
  };

  this.printSubjects = function () {
    console.log(
      `The subjects in this academy: ${this.subjects
        .map((subject) => subject.title)
        .join(", ")}.`
    );
  };
}

function Course(description, price) {
  this.id = generateCourseId();
  this.description = description;
  this.price = price;
  this.validatePrice = function () {
    if (this.price < 0) {
      console.log("Error: Price must be above 0.");
    }
  };
}
function Subject(
  description,
  price,
  title,
  numberOfClasses = 10,
  isElective,
  Students,
  Academy = null
) {
  Object.setPrototypeOf(this, new Course(description, price));
  this.title = title;
  this.numberOfClasses = numberOfClasses;
  this.isElective = isElective;
  this.Academy = Academy;
  this.students = Students;
  this.overrideClasses = function (number) {
    if (number >= 3) {
      this.numberOfClasses = number;
      console.log(`Number of classes: ${this.numberOfClasses}.`);
    } else {
      console.log("Number of classes must be at least 3.");
    }
  };
}

function Person(email, phone) {
  this.id = generatePersonId();
  this.email = email;
  this.phone = phone;
  this.validateEmail = function () {
    if (!this.email.includes("@")) {
      console.log("Error: Invalid email.");
    }
  };
}

function Student(
  email,
  phone,
  firstName,
  lastName,
  age,
  completedSubjects = [],
  Academy = null,
  currentSubject = null
) {
  Object.setPrototypeOf(this, new Person(email, phone));
  this.firstName = firstName;
  this.lastName = lastName;
  this.age = age;
  this.completedSubjects = completedSubjects;
  this.Academy = Academy;
  this.currentSubject = currentSubject;
  this.startAcademy = function (newAcademy) {
    if (typeof newAcademy === "object" && newAcademy !== null) {
      this.Academy = newAcademy;
      console.log(`Academy is set to: ${this.Academy.name}.`);
    } else {
      console.log("No such Academy.");
    }
  };
  this.startSubject = function (subject) {
    if (!this.Academy) {
      console.log("Error: Student is not enrolled in any academy.");
      return;
    }

    const foundSubject = this.Academy.subjects.find(
      (academySubject) => academySubject.title === subject.title
    );

    if (!foundSubject) {
      console.log(
        `Error: The subject '${subject.title}' is not offered at ${this.Academy.name}.`
      );
      return;
    }

    this.currentSubject = subject;
    console.log(`Current subject set to: ${this.currentSubject.title}.`);
  };
}

let student1 = new Student(
  "marija.adjieva@gmail.com",
  3897100000,
  "Marija",
  "Tulupova",
  29
);

let student2 = new Student(
  "vili.tulupov@gmail.com",
  3897100400,
  "Vili",
  "Tulupov",
  28
);

let subject1 = new Subject("Learn js.", 250, "Java Script", 10, false, [
  student1,
  student2,
]);

let subject2 = new Subject("Learn html.", 200, "Html", 10, true, [
  student1,
  student2,
]);

const academy = new Academy(
  "Skopje",
  250,
  "Qinshift",
  [student1, student2],
  [subject1, subject2],
  new Date(2024, 9, 15, 17),
  new Date(2025, 9, 15, 21),
  40
);

academy.printStudents();
academy.printSubjects();
console.log(academy);

subject1.overrideClasses(4);
console.log(subject1);
subject2.overrideClasses(2);
console.log(subject2);

student1.startAcademy(academy);
student2.startAcademy(academy);
student1.startSubject(subject1);
student2.startSubject(subject2);
console.log(student2);
console.log(student1);
