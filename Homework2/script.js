function fetchStudents() {
  fetch(
    "https://raw.githubusercontent.com/sedc-codecademy/skwd9-04-ajs/main/Samples/students_v2.json"
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (students) {
      console.log(students);

      const studentsWithAvgGradeHigherThan3 =
        filterStudentsWithAvgGradeHigherThan3(students);
      console.log(
        "Students with average grade higher than 3:",
        studentsWithAvgGradeHigherThan3
      );

      const femaleStudentNamesWithAvgGradeOf5 =
        filterFemaleStudentNamesWithAvgGradeOf5(students);

      console.log(
        "Female students with an average grade of 5:",
        femaleStudentNamesWithAvgGradeOf5
      );

      const maleStudentsFromSkopje =
        filterMaleStudentsFullNamesFromSkopje(students);
      console.log(
        "Male students who live in Skopje and are over 18 years old:",
        maleStudentsFromSkopje
      );

      const averageGrade = calculateAverageGrade(students);
      console.log(
        "The average grade of all female students over the age of 24:",
        averageGrade.toFixed(2)
      );

      const maleStudentsStartingWithB =
        filterMaleStudentsWithNameStartingWithB(students);
      console.log(
        "Male students with a name starting with B and average grade over 2:",
        maleStudentsStartingWithB
      );
    })

    .catch(function (error) {
      console.error("Error fetching students:", error);
    });
}

fetchStudents();

const filterStudentsWithAvgGradeHigherThan3 = (students) => {
  return students.filter((student) => student.averageGrade > 3);
};

const filterFemaleStudentNamesWithAvgGradeOf5 = (students) => {
  return students
    .filter((student) => student.gender === "Female")
    .filter((student) => student.averageGrade === 5)
    .map((student) => student.firstName);
};

const filterMaleStudentsFullNamesFromSkopje = (students) => {
  return students
    .filter((student) => student.gender === "Male")
    .filter((student) => student.city === "Skopje")
    .filter((student) => student.age > 18)
    .map((student) => `${student.firstName} ${student.lastName}`);
};

const calculateAverageGrade = (students) => {
  let femaleStudentsAverageGrade = filterFemaleStudentsOver24(students);

  const sumGrades = femaleStudentsAverageGrade.reduce((sum, student) => {
    sum += student.averageGrade;
    return sum;
  }, 0);

  return sumGrades / femaleStudentsAverageGrade.length;
};

const filterMaleStudentsWithNameStartingWithB = (students) => {
  return students
    .filter((student) => student.firstName.startsWith("B"))
    .filter((student) => student.averageGrade > 2);
};

const filterFemaleStudentsOver24 = (students) => {
  return students
    .filter((student) => student.gender === "Female")
    .filter((student) => student.age > 24);
};
