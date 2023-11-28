"use strict"

var gradeObject = {
    grades: [], // An array to store student grades.
    elementInput: document.getElementById("grade"), // This line gets an input element with the id "grade".
    studentCount: 0, // A variable to keep track of the number of students added. This is improtant when removing grades.
    setGrade: function () {
        if (this.elementInput.value != 0 && this.elementInput.value != null){
            this.grades.push(+this.elementInput.value); // Adds the grade to the 'grades' array.
            this.printIndividual(+this.elementInput.value);
        } else {
            alert('Please enter a valid number above 0');
        }
        this.elementInput.value = "";
    },
    calcAverage: function () {
        let sum = this.grades.reduce((a, b) => a + b, 0), average = (sum/this.grades.length).toFixed(2);
        return {sum, average};
    },
    calcHighLow: function () {
        let high = Math.max(...this.grades), low = Math.min(...this.grades);
        return {high, low};
    },
    calcPassedFailed: function () {
        const aboveThreshold = (this.grades.filter(num => num >= 50)).length, belowThreshold = (this.grades.filter(num => num < 50)).length;
        return{aboveThreshold, belowThreshold};
    },
    calcOutputResult: function () {
        const responses = [ this.calcPassedFailed(), this.calcHighLow(), this.calcAverage()];
        let person = [responses[0].aboveThreshold === 1 ? "person" : "people", responses[0].belowThreshold === 1 ? "person" : "people"];
        if(this.grades.length === 0 || responses[2].sum === 0) {
            alert('No students have been added yet or the sum of the grades must be above 0');
            return;
        }
        document.getElementById("average").innerHTML = `You entered ${this.grades.length} grades<br>The total of all the grades is 
        ${responses[2].sum}<br> The grade average is ${responses[2].average}<br>The highest score is ${responses[1].high}<br> The lowest score is ${responses[1].low}<br>
        ${responses[0].aboveThreshold} ${person[0]} passed the test.<br>${responses[0].belowThreshold} ${person[1]} failed the test.<br>`;
    },
    printIndividual: function (num) {
        this.studentCount++;
        let passFailText = num >= 50 ? "passed" : "failed";
        let text = document.createTextNode(`Student ${this.studentCount} ${passFailText} with a grade of ${num}% `) 
        const p = document.createElement("p"); // Creates a new paragraph element.S
                p.id = `text${this.studentCount}`; // Assigns an id to the paragraph element.
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
        document.getElementById(`output`).innerHTML = "";
        this.studentCount = 0;
        this.grades.splice(num-1, 1);  // Reorders the grades array and updates the display for non-zero grades.
        for(let i = 0; i <= this.grades.length - 1; i++) {
            this.printIndividual(this.grades[i]);
        }
    },
    checkGrade: function () {
        //checks how big the input number is and it also check the length if anything is out of the ordinary is fixes it
        let checkValue = this.elementInput.value >= 100 ? this.elementInput.value = 100 : this.elementInput.value = this.elementInput.value;
    }
};

document.getElementById('input').addEventListener('keydown', function(event) {
    if (event.code == 'Enter' || event.code == 'Space') { // Check if the pressed key is the Enter key or space
      gradeObject.setGrade(); // Call a function or perform an action when Enter is pressed
    }
  });