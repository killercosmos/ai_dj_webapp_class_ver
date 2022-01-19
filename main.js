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

    poseNet = ml5.poseNet(video, modelLoaded());
    poseNet.on("poses", gotPoses);
}

function modelLoaded() {
    console.log("Posenet is initialized");
}

function gotPoses(results) {
    if(results.length > 0) {
        scoreLeftWrist = results[0].pose.keypoint[9].score;
        scoreRightWrist = results[0].pose.keypoint[10].score;
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
}

function play() {
    song.play();
}