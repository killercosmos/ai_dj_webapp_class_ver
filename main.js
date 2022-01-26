song = "";

function preload() {
    song = loadSound("Hype.mp3");
}

scoreLeftWrist = 0;
scoreRightWrist = 0;

LeftWristX = 0;
RightWristX = 0;

RightWristY = 0;
LeftWristY = 0;

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}

function modelLoaded() {
    console.log("Posenet is initialized");
}

function gotPoses(results) {
    if(results.length > 0) {
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("Lefwrist score = " + scoreLeftWrist + "Rightwrist score = " + scoreRightWrist);

        LeftWristX = results[0].pose.leftWrist.x;
        RightWristX = results[0].pose.rightWrist.x;
        console.log("Left Wrist X =" + LeftWristX + "Right wrist X =" + RightWristX);

        LeftWristY = results[0].pose.leftWrist.y;
        RightWristy = results[0].pose.rightWrist.y;
        console.log("Left Wrist y =" + LeftWristY + "Right wrist Y =" + RightWristY);

    }
}
function draw() {

    image(video,0, 0, 600, 500);
    fill("#FF0000");
    stroke("#FF0000");

    if(scoreRightWrist > 0.2){
        circle(RightWristX, RightWristY, 20);
        
    
    if(RightWristY > 0 && RightWristY <= 100) {
        document.getElementById("speed").innerHTML = "Speed = 0.5";
        song.rate(0.5);
    }
    else if(RightWristY > 100 && RightWristY <= 200) {
        document.getElementById("speed").innerHTML = "Speed = 1";
        song.rate(1);
    }
    else if(RightWristY > 200 && RightWristY <= 300) {
        document.getElementById("speed").innerHTML = "Speed = 1.5";
        song.rate(1.5);
    }
    else if(RightWristY > 200 && RightWristY <= 300) {
        document.getElementById("speed").innerHTML = "Speed = 1.5";
        song.rate(1.5);
    }
    else if(RightWristY > 300 && RightWristY <= 400) {
        document.getElementById("speed").innerHTML = "Speed = 2";
        song.rate(2);
    }
    else if (RightWristY > 400 ){
        document.getElementById("speed").innerHTML = "Speed = 2.5";
        song.rate(2.5);
    }
}

if(scoreLeftWrist > 0.2) {
    circle(LeftWristX, LeftWristY, 20);
    var InNumberLeftWristY = Number(LeftWristY);
    var remove_decimal = floor(InNumberLeftWristY);
    var volume = remove_decimal/500
    document.getElementById("volume").innerHTML = "Volume = " + volume;
    song.setVoulume(volume);
}
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1)
}