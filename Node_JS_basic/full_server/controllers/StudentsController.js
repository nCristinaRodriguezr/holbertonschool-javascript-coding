import readDatabase from '../utils';

class StudentsController {
  static async getAllStudents(req, res) {
    try {
      const students = await readDatabase('database.csv');
      res.status(200).send('This is the list of our students\n');

      const sortedFields = Object.keys(students).sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));

      sortedFields.forEach((field) => {
        const studentNames = students[field].join(', ');
        res.write(`Number of students in ${field}: ${students[field].length}. List: ${studentNames}\n`);
      });
      res.end();
    } catch (error) {
      res.status(500).send('Cannot load the database');
    }
  }

  static async getAllStudentsByMajor(req, res) {
    const { major } = req.params;

    if (major !== 'CS' && major !== 'SWE') {
      res.status(500).send('Major parameter must be CS or SWE');
      return;
    }

    try {
      const students = await readDatabase('database.csv');
      const studentNames = students[major].join(', ');
      res.status(200).send(`List: ${studentNames}`);
    } catch (error) {
      res.status(500).send('Cannot load the database');
    }
  }
}

export default StudentsController;
