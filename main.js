song = "";

leftWristX = 0;
leftWristY = 0;

rightWristY = 0;
rightWristX = 0;

scoreLeftWrist = 0;
scoreRighttWrist = 0;

function preload() {
    song = loadSound("music.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("Pose", gotPoses);
}

function modelLoaded() {
    console.log("PoseNet esta inicializado");
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);

        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRighttWrist = results[0].pose.keypoints[10].score;
        console.log("Confiabilidad de la muñeca izquierda: " + scoreLeftWrist + "Confiabilidad de la muñeca derecha" + scoreRighttWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("Ubicacion en X de la muñeca izquierda" + leftWristX + "Ubicacion en y de la muñeca izquierda" + leftWristY);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Ubicacion en X de la muñeca derecha" + rightWristX + "Ubicacion en y de la muñeca derecha" + rightWristY);
    }

}

function draw() {
    image(video, 0, 0, 600, 500);
    fill("#FF0000");
    stroke("FF0000");

    if (scoreLeftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        InNumberLeftWristY = Number(leftWristY);
        remove_decimals = floor(InNumberLeftWristY);
        volumen = remove_decimals / 500;
        document.getElementById("volume").innerHTML = "volumen= " + volumen;
        song.setVolumen(volumen);
    }

    if (scoreRighttWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        if (rightWristY > 0 && rightWristY <= 100) {
            document.getElementById("speed").innerHTML = "Velocidad de la cancion igual a 0.5x";
            song.rate(0.5);
        }
        else if (rightWristY > 100 && rightWristY <= 200) {
            document.getElementById("speed").innerHTML = "Velocidad de la cancion igual a 1x";
            song.rate(1);
        }
        else if (rightWristY > 200 && rightWristY <= 300) {
            document.getElementById("speed").innerHTML = "Velocidad de la cancion igual a 1.5x";
            song.rate(1.5);
        }
        else if (rightWristY > 300 && rightWristY <= 400) {
            document.getElementById("speed").innerHTML = "Velocidad de la cancion igual a 2x";
            song.rate(2);
        }
        else if (rightWristY > 400) {
            document.getElementById("speed").innerHTML = "Velocidad de la cancion igual a 2.5x";
            song.rate(2.5);
        }
    }
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}