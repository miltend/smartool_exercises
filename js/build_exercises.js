const tree = document.createDocumentFragment();
let r = await axios.get("https://raw.githubusercontent.com/miltend/smartool_exercises/master/data/exercises.yml");
let json_data = jsyaml.loadAll(r.data);
let records = {};

for (let key of Object.keys(json_data)) {
    records[key] = json_data[key];
}


const data = records[0]
const main_content = document.createElement("div")
main_content.setAttribute("class", "container px-4")

const exercises_amount = Object.keys(data).length



function show_answer(x, answer_key) {
    x.innerHTML = answer_key;
    if (x.style.display === "block") {
        x.style.display = "none";
      } else {
        x.style.display = "block";
    }
}


for (var exercise_id = 1; exercise_id <= exercises_amount; exercise_id++) {
    var task_title = document.createElement("h3");
    task_title.setAttribute("style", "margin-top: 30px");

    // title+ topic + level in each exercise? story time?
    task_title.innerHTML = `${exercise_id}. ${data[exercise_id]["topic"]}&ensp;<i style="font-weight:normal">${data[exercise_id]["level"]}</i>`;
    
    main_content.appendChild(task_title);

    if (data[exercise_id]["title"] != null) {
        let instructions = document.createElement("div");
        instructions.innerHTML = data[exercise_id]["title"];
        main_content.appendChild(instructions);
    }

    

    


    if (data[exercise_id]["task"] != null) {
        var subtasks_amount = Object.keys(data[exercise_id]["task"]).length;
        var task_text = document.createElement("div");
        
        var task = document.createElement("p");
        task.appendChild.innerHTML = data[exercise_id]["task"][0];
        task_text.appendChild(task);
        main_content.appendChild(task_text);
    }

    if (data[exercise_id]["answer"] != null) {
        let answer = document.createElement("div");
        answer.setAttribute("class", "d-grid gap-3 d-md-flex justify-content-md-end");


        let answer_text = document.createElement("p");
        answer_text.style.display = "none";

        let button = document.createElement("button")
        button.setAttribute("type", "button")
        button.setAttribute("class", "btn btn-outline-primary float-end btn-sm")

        let new_answer = data[exercise_id]["answer"]

        button.onclick = function() {
            show_answer(answer_text, new_answer);
        };
        button.innerHTML = "Answer key";

        answer.appendChild(answer_text)
        main_content.appendChild(button)
        main_content.appendChild(answer)
    }


    if (data[exercise_id]["take_away_idea"] != null) {
        let answer = document.createElement("div");
        answer.setAttribute("class", "d-grid gap-3 d-md-flex justify-content-md-end");


        let answer_text = document.createElement("p");
        answer_text.style.display = "none";

        let button = document.createElement("button")
        button.setAttribute("type", "button")
        button.setAttribute("class", "btn btn-outline-primary float-end btn-sm")

        let new_answer = data[exercise_id]["take_away_idea"]

        button.onclick = function() {
            show_answer(answer_text, new_answer);
        };
        button.innerHTML = "Take-away idea";

        answer.appendChild(answer_text)
        main_content.appendChild(button)
        main_content.appendChild(answer)
    }


    tree.appendChild(main_content)
}



document.getElementById("content").appendChild(tree)