let clearbox = document.querySelector("#clearbox");
let submit = document.querySelector("#calculate");
let alart = document.querySelector(".alart");
let result = document.querySelector(".resultdata");
let unit=document.querySelector(".unit");
let converter=document.querySelector(".converter");
let overweight=document.querySelector(".overweight");
let underweight=document.querySelector(".underweight");
let normal=document.querySelector(".normal");
const today = new Date();
let printer = document.querySelector(".print");
let report = document.querySelector(".report");
let todaydate = today.getUTCFullYear();
let gender, height, weight, bmi, genderfill, angle, bmistatus;

clearbox.addEventListener('click', () => {
    document.getElementById('myform').reset();
    alart.classList.add("hide");
    result.classList.add("hide");
    document.getElementById("arrow").style.transform = 'rotate(0deg)';
    report.classList.add("hide1");

});
submit.addEventListener('click', () => {
    overweight.classList.add("hide1");
    underweight.classList.add("hide1");
    normal.classList.add("hide1");

    height = document.forms["myform"]["height"].value / 100;
    weight = document.forms["myform"]["weight"].value;
    let date = document.forms["myform"]["dob"].value;
    let userdate = parseInt(date.slice(0, 5));
    let age = todaydate - userdate;
    if (document.getElementById("male").checked) {
        gender = document.getElementById("male").value;
        genderfill = false;
    }
    else if (document.getElementById("female").checked) {
        gender = document.getElementById("female").value;
        genderfill = false;
    }
    else {
        genderfill = true;
    }
    if (height == "" || weight == "" || genderfill || date == "" || height <= 0 || weight <= 0 || age < 0) {
        document.getElementById('alart').innerHTML = "Fill all the box./ Enter a valid details.";
        alart.classList.remove("hide");
        result.classList.add("hide");
        document.getElementById("arrow").style.transform = 'rotate(0deg)';
        report.classList.add("hide1");
    }
    else if (age == 0 || age == 1) {
        document.getElementById('alart').innerHTML = "Please enter a age between 2 and 120";
        alart.classList.remove("hide");
        result.classList.add("hide");
        document.getElementById("arrow").style.transform = 'rotate(0deg)';
        report.classList.add("hide1");
    }
    else {
        alart.classList.add("hide");
        bmi = Math.round((weight / (height * height)) * 10) / 10;
        if (bmi <= 10) {
            document.getElementById("arrow").style.transform = 'rotate(0deg)';
        }
        else if (bmi > 10 && bmi <= 50) {
            angle = ((bmi - 10) * 10) * 0.45;
            document.getElementById("arrow").style.transform = 'rotate(' + angle + 'deg)';
        }
        else if (bmi > 50) {
            document.getElementById("arrow").style.transform = 'rotate(180deg)';
        }

        document.getElementById('bminumber').innerHTML = bmi + " kg/m<sup>2</sup>";
        if (bmi <= 18.4) {
            bmistatus = "UNDERWEIGHT";
            document.getElementById('bmicondition').innerHTML = "(UNDERWEIGHT)";
            document.getElementById('bmicondition').style.color = "rgb(201, 85, 85)";
        }
        else if (bmi > 18.4 && bmi <= 25) {
            bmistatus = "NORMAL";
            document.getElementById('bmicondition').innerHTML = "(NORMAL)";
            document.getElementById('bmicondition').style.color = "green";
        }
        else if (bmi > 25 && bmi <= 40) {
            bmistatus = "OVERWEIGHT";
            document.getElementById('bmicondition').innerHTML = "(OVERWEIGHT)";
            document.getElementById('bmicondition').style.color = "rgb(157, 171, 2)";
        }
        else if (bmi > 40) {
            bmistatus = "OBESITY";
            document.getElementById('bmicondition').innerHTML = "(OBESITY)";
            document.getElementById('bmicondition').style.color = "red";
        }

        result.classList.remove("hide");
        let idealupper = 25 * height * height;
        let ideallower = 18.4 * height * height;
        setTimeout(() => {
            document.getElementById('date').innerHTML = date;
            document.getElementById('age').innerHTML = age + " year";
            document.getElementById('sex').innerHTML = gender;
            document.getElementById('high').innerHTML = height * 100 + " cm";
            document.getElementById('wigh').innerHTML = weight + " kg";
            document.getElementById('bm').innerHTML = bmi + " kg/m<sup>2</sup>";
            document.getElementById('prime').innerHTML = (Math.round((bmi / 25) * 1000)) / 1000;
            document.getElementById('index').innerHTML = Math.round((weight / (height * height * height)) * 10) / 10 + " kg/m<sup>3</sup>";
            document.getElementById('idealbmi').innerHTML = (Math.round(ideallower * 10)) / 10 + " - " + (Math.round(idealupper * 10)) / 10;
            document.getElementById('bmstat').innerHTML = bmistatus;
            if(bmistatus=="UNDERWEIGHT"){
                underweight.classList.remove("hide1");
            }
            else if(bmistatus=="OVERWEIGHT"){
                overweight.classList.remove("hide1");
            }
            else if(bmistatus=="NORMAL"){
                normal.classList.remove("hide1");
            }

            report.classList.remove("hide1");
        }, 800);
    }
});
printer.addEventListener('click', () => {
    print();
});
unit.addEventListener('click',()=>{
    converter.classList.toggle("hide2");
});
document.addEventListener('click',e=>{
    if(!converter.contains(e.target) && e.target!==unit){
        converter.classList.add("hide2");
    }
});