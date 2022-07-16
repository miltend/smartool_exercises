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

    // if (data[exercise_id]["answer"] != null) {
        let answer = document.createElement("div");
        answer.setAttribute("class", "d-grid gap-3 d-md-flex justify-content-md-end");


        let answer_text = document.createElement("p");
        answer_text.style.display = "none";

        let answ_button = document.createElement("button")
        answ_button.setAttribute("type", "button")
        answ_button.setAttribute("class", "btn btn-outline-primary btn-sm")
        
        answ_button.setAttribute("style", "margin: 3px")    
        // answ_button.setAttribute("style", "margin-bottom: 5px")
        // answ_button.appendChild(document.createElement("br"))

        let new_answer = data[exercise_id]["answer"]

        answ_button.onclick = function() {
            show_answer(answer_text, new_answer);
        };
        answ_button.innerHTML = "Answer key";

        
    // }


    // if (data[exercise_id]["take_away_idea"] != null) {
        let ta_idea = document.createElement("div");
        ta_idea.setAttribute("class", "d-grid gap-3 d-md-flex justify-content-md-end");


        let ta_idea_text = document.createElement("p");
        // ta_idea_text.style.display = "none";

        let ta_idea_button = document.createElement("button")
        ta_idea_button.setAttribute("type", "button")
        ta_idea_button.setAttribute("class", "btn btn-outline-primary btn-sm")
        ta_idea_button.setAttribute("style", "margin: 3px")

        let new_ta_idea = data[exercise_id]["take_away_idea"]

        ta_idea_button.onclick = function() {
            show_answer(ta_idea_text, new_ta_idea);
        };
        ta_idea_button.innerHTML = "Take-away idea";

        ta_idea.appendChild(ta_idea_text)
        


        answer.appendChild(answer_text)

        
        
        main_content.appendChild(answ_button)
        main_content.appendChild(answer)
        // main_content.appendChild(document.createElement("br"))
        main_content.appendChild(ta_idea_button)
        
        
        // main_content.appendChild(document.createElement("br"))
        
        
        main_content.appendChild(ta_idea)

    // }


    tree.appendChild(main_content)
}



document.getElementById("content").appendChild(tree)