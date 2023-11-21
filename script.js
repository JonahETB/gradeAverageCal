"use strict"

let elementinput = document.getElementById("grade"); // This line gets an input element with the id "grade".
var gradeObject = {
    grades: [], // An array to store student grades.
    studentCount: 0, // A variable to keep track of the number of students added. This is improtant when removing grades.
    setGrade: function () {
        let num = +elementinput.value; // Converts the input value to a number.
        this.grades.push(num); // Adds the grade to the 'grades' array.
        this.printIndividual(num);
    },
    calcTotalGrades: function () {
        return this.grades.reduce((a, b) => a + b, 0);
    },
    calcAverage: function () {
        let sum = this.grades.reduce((a, b) => a + b, 0);
        let average = (sum/this.grades.length).toFixed(2);
        return {sum, average};
    },
    calcHighScore: function () {
        return Math.max(...this.grades);
    },
    calcLowScore: function () {
        return Math.min(...this.grades);
    },
    calcPassedFailed: function () {
        // Separate numbers into two arrays: above and below the threshold
        const aboveThreshold = (this.grades.filter(num => num > 50)).length;
        const belowThreshold = (this.grades.filter(num => num <= 50)).length;
        return{aboveThreshold, belowThreshold};
    },
    calcOutputResult: function () {
        let passFail = this.calcPassedFailed();
        let cal = this.calcAverage()
        if(this.grades.length === 0 || cal.sum === 0) {
            alert('No students have been added yet');
            return;
        }
        document.getElementById("average").innerHTML = `You entered ${this.grades.length} grades<br>
            The total of all the grades is ${this.calcTotalGrades()}<br> The grade average is ${cal.average}<br>
            The highest score is ${this.calcHighScore()}<br> The lowest score is ${this.calcLowScore()}<br>
            ${passFail.aboveThreshold} people passed the test.<br> ${passFail.belowThreshold} people failed the test.<br>`;
    },
    printIndividual: function (num) {
        this.studentCount++;
        let text = "";
        const p = document.createElement("p"); // Creates a new paragraph element.
                p.id = `text${this.studentCount}`; // Assigns an id to the paragraph element.
        if (num >= 50) {
            text = document.createTextNode(`Student ${this.studentCount} passed with a grade of ${num}% `);
        } else {
            text = document.createTextNode(`Student ${this.studentCount} failed with a grade  of ${num}% `);
        }
                p.appendChild(text); // Appends the text node to the paragraph element.
        const delButton = document.createElement("input");
                delButton.type = "submit";
                delButton.value = "Delete";
                delButton.classList.add("delButton");
                delButton.setAttribute("onclick", `gradeObject.removeGrade(${this.studentCount})`); 
                p.appendChild(delButton);
                output.appendChild(p);
    },
    removeGrade: function (num) {
        console.log("run");
        document.getElementById(`output`).innerHTML = "";
        this.studentCount = 0;
        this.grades.splice(num-1, 1);
        // Reorders the grades array and updates the display for non-zero grades.
        for(let i = 0; i <= this.grades.length - 1; i++) {
            this.printIndividual(this.grades[i]);
        }
    },
}

function checkGrade () {
    let num = +elementinput.value;// Converts the input value to a number.
    // Checks if the grade is above 100 and sets it to 100, or if it's below 0 and sets it to 0.
    if (num > 100) {
        elementinput.value = 100;
    }
}

document.getElementById('input').addEventListener('keydown', function(event) {
    // Check if the pressed key is the Enter key
    if (event.key === 'Enter') {
      // Call a function or perform an action when Enter is pressed
      gradeObject.setGrade();
    }
  });