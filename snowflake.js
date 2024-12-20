function generateRandomString(n) {
    var chars = ['F', '+', '-','D', 'L','J','K'];
    var result = '';
    for (var i = 0; i < n; i++) {
        var randomChar = chars[Math.floor(Math.random() * chars.length)];
        result += randomChar;
    }
    return result;
}

function drawSnowflake() {
    // Generate new random strings each time
    var randomString = generateRandomString(Math.floor(Math.random()*30)+3);
    var randomStringRules = '+LDL+DFF' + generateRandomString(Math.floor(Math.random()*15)+3);
    console.log(randomString); // For debugging

    var axiom = randomString;
    var rules = {
        "F": randomStringRules
    };
    var iterations = 3;
    var initialAngle = 0;
    var angleIncrement = 30.000;
    var length = 5;

    var instructions = generateLSystem(axiom, rules, iterations);
    var center = view.center;
    var startPosition = center.subtract(new Point(100, 0));
    var path = drawLSystem(instructions, startPosition, initialAngle, angleIncrement, length);

    var snowflake = new Group([path]);
    for (var i = 0; i < 8; i++) {
        var clone = path.clone();
        clone.rotate(45 * i, center);
        snowflake.addChild(clone);
    }
}

function generateLSystem(axiom, rules, iterations) {
    var current = axiom;
    for (var i = 0; i < iterations; i++) {
        var next = "";
        for (var j = 0; j < current.length; j++) {
            var c = current[j];
            next += rules[c] || c;
        }
        current = next;
    }
    return current;
}

function drawLSystem(instructions, startPosition, initialAngle, angleIncrement, length) {
    var path = new Path();
    path.strokeColor = 'green';
    path.strokeWidth = 1.0; 

    var position = startPosition.clone();
    var angle = initialAngle;
    var stack = [];

    path.moveTo(position);

    for (var i = 0; i < instructions.length; i++) {
        var c = instructions[i];
        if (c === "F") {
            var nextPoint = position.add(new Point({
                length: length,
                angle: angle
            }));
            path.lineTo(nextPoint);
            position = nextPoint;
        } else if (c === "+") {
            angle += angleIncrement;
        } else if (c === "-") {
            angle -= angleIncrement;
        } else if (c === "D") {
          angle += angleIncrement * 0.25; 
        } else if (c === "L") {
          angle -= angleIncrement * 0.25; 
        } else if (c === "J") {
          angle -= angleIncrement * 0.7; 
        } else if (c === "K") {
          angle += angleIncrement * 0.03; 
        } else if (c === "[") {
            stack.push({ position: position.clone(), angle: angle });
        } else if (c === "]") {
            var state = stack.pop();
            position = state.position;
            angle = state.angle;
            path.moveTo(position);
        }
    }

    return path;
}

// Event listeners
document.getElementById('refreshBtn').addEventListener('click', function() {
    paper.project.clear();
    drawSnowflake();
});

// Initial draw
drawSnowflake();

var exportBtn = document.getElementById('exportBtn');
exportBtn.addEventListener('click', function() {
    var svg = project.exportSVG({ asString: true });
    var svgBlob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
    var url = URL.createObjectURL(svgBlob);
    var link = document.createElement('a');
    link.href = url;
    link.download = 'snowflake.svg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

    