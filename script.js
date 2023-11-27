"use strict"

var gradeObject = {
    grades: [], // An array to store student grades.
    elementInput: document.getElementById("grade"), // This line gets an input element with the id "grade".
    studentCount: 0, // A variable to keep track of the number of students added. This is improtant when removing grades.
    setGrade: function () {
        let inputValue = this.elementInput.value;
        if (inputValue !== 0){
            this.grades.push(+inputValue); // Adds the grade to the 'grades' array.
            this.printIndividual(+inputValue);
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
        const aboveThreshold = (this.grades.filter(num => num > 50)).length, belowThreshold = (this.grades.filter(num => num <= 50)).length;
        return{aboveThreshold, belowThreshold}; //creates an object out of the function with the grades filtered into the length of each array one above 50 and the other below
    },
    calcOutputResult: function () {
        let passFail = this.calcPassedFailed(), highLow = this.calcHighLow(), cal = this.calcAverage();
        let person1 = passFail.aboveThreshold === 1 ? "person" : "people", person2 = passFail.belowThreshold === 1 ? "person" : "people";
        if(this.grades.length === 0 || cal.sum === 0) {
            alert('No students have been added yet or the sum of the grades must be above 0');
            return;
        }
        document.getElementById("average").innerHTML = `You entered ${this.grades.length} grades<br>The total of all the grades is ${cal.sum}<br> The grade average is ${cal.average}<br>The highest score is ${highLow.high}<br> The lowest score is ${highLow.low}<br>${passFail.aboveThreshold} ${person1} passed the test.<br>${passFail.belowThreshold} ${person2} failed the test.<br>`;
    },
    printIndividual: function (num) {
        this.studentCount++;
        let text = num >= 50 ? document.createTextNode(`Student ${this.studentCount} passed with a grade of ${num}% `) : document.createTextNode(`Student ${this.studentCount} failed with a grade  of ${num}% `);
        const p = document.createElement("p"); // Creates a new paragraph element.
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
        let inputValue = this.elementInput.value >= 100 ? this.elementInput.value = 100 : this.elementInput.value = this.elementInput.value;
        let checkLength = (this.elementInput.value).length >= 6 ? this.elementInput.value = (this.elementInput.value).slice(0, -1) : this.elementInput.value = this.elementInput.value;
    }
};

document.getElementById('input').addEventListener('keydown', function(event) {
    if (event.code == 'Enter' || event.code == 'Space') { // Check if the pressed key is the Enter key or space
      gradeObject.setGrade(); // Call a function or perform an action when Enter is pressed
    }
  });