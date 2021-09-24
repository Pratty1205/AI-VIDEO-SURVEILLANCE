var video = "";
var detection_status = "";
var objects_detected = [];

function setup() {
    canvas = createCanvas(650, 450);
    canvas.center();
}

function preload() {
    video = createVideo("video.mp4");
    video.hide();
}

function draw() {
    image(video, 0, 0, 650, 450);
    if (detection_status != "") {
        cocossd_model.detect(video, getResults);
        for (c = 0; c < objects_detected.length; c++) {
            document.getElementById("status").innerHTML = "Detected!!!";
            objects_count = objects_detected.length;
            document.getElementById("number_of_objects").innerHTML = objects_count;
            fill("red");
            percentage = floor(objects_detected[c].confidence * 100);
            text(objects_detected[c].label + "   " + percentage + "%", objects_detected[c].x + 15, objects_detected[c].y + 15);
            noFill();
            stroke("red");
            rect(objects_detected[c].x, objects_detected[c].y, objects_detected[c].width, objects_detected[c].height);
        }
    }
}

function start() {
    cocossd_model = ml5.objectDetector("cocossd", model_loaded);
    document.getElementById("status").innerHTML = "Detecting..."
}

function model_loaded() {
    console.log("Model is not loaded");
    detection_status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function getResults(result, error) {
    if (result) {
        console.log(result);
        objects_detected = result;
    } else {
        console.log(error);
    }
}