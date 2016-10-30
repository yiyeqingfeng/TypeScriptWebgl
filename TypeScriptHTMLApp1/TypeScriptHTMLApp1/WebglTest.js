var WebglTest = (function () {
    function WebglTest() {
        this.testVertexCode = '\
    attribute vec3 aVertexPosition;\
    uniform mat4 uMVMatrix;\
    uniform mat4 uPMatrix;\
    void main(void){\
        gl_Position = uPMatrix*uMVMatrix*vec4(aVertexPosition,1.0);\
    }';
        this.testFragmentCode = '\
    void main(void){\
    gl_FragColor=vec4(1.0,1.0,1.0,1.0);\
    }';
        this.canvas = document.getElementById("Canvas");
        console.log("canvas:" + this.canvas);
        this.webgl = this.canvas.getContext('experimental-webgl') || this.canvas.getContext('webgl');
        if (this.webgl) {
            this.webgl.clearColor(0.0, 0.0, 0.0, 1.0); // Set clear color to black, fully opaque
            this.webgl.clearDepth(1.0); // Clear everything
            this.webgl.enable(this.webgl.DEPTH_TEST); // Enable depth testing
            this.webgl.depthFunc(this.webgl.LEQUAL); // Near things obscure far things
        }
    }
    WebglTest.prototype.init = function () {
        this.getVertShader();
        this.getFragShader();
        this.creatProgram();
        this.drawObj();
    };
    WebglTest.prototype.getVertShader = function () {
        if (this.vertShader)
            return this.vertShader;
        this.vertShader = this.webgl.createShader(this.webgl.VERTEX_SHADER);
        this.webgl.shaderSource(this.vertShader, this.testVertexCode);
        this.webgl.compileShader(this.vertShader);
        return this.vertShader;
    };
    WebglTest.prototype.getFragShader = function () {
        if (this.fragShader)
            return this.fragShader;
        this.fragShader = this.webgl.createShader(this.webgl.FRAGMENT_SHADER);
        this.webgl.shaderSource(this.fragShader, this.testFragmentCode);
        this.webgl.compileShader(this.fragShader);
        return this.fragShader;
    };
    WebglTest.prototype.creatProgram = function () {
        this.program = this.webgl.createProgram();
        console.log("program:" + this.program);
        this.webgl.attachShader(this.program, this.vertShader);
        this.webgl.attachShader(this.program, this.fragShader);
        this.webgl.linkProgram(this.program);
        this.webgl.useProgram(this.program);
    };
    WebglTest.prototype.drawObj = function () {
        var vertices = [
            1.0, 1.0, 0.0,
            -1.0, 1.0, 0.0,
            1.0, -1.0, 0.0,
            -1.0, -1.0, 0.0,
        ];
        var squareVerticesBuffer = this.webgl.createBuffer();
        var vertexPosAttr = this.webgl.getAttribLocation(this.program, "aVertexPosition");
        this.webgl.bindBuffer(this.webgl.ARRAY_BUFFER, squareVerticesBuffer);
        this.webgl.bufferData(this.webgl.ARRAY_BUFFER, new Float32Array(vertices), this.webgl.STATIC_DRAW);
        this.webgl.enableVertexAttribArray(vertexPosAttr);
        this.webgl.vertexAttribPointer(vertexPosAttr, 3, this.webgl.FLOAT, false, 0, 0);
        this.webgl.drawArrays(this.webgl.TRIANGLE_STRIP, 0, 4);
    };
    WebglTest.prototype.getShader = function (gl, id) {
        var shaderScript = document.getElementById(id);
        if (!shaderScript)
            return null;
        var theSource = "";
        var currentChild = shaderScript.firstChild;
        while (currentChild) {
            if (currentChild.nodeType == 3) {
                theSource += currentChild.textContent;
            }
            currentChild = currentChild.nextSibling;
        }
        var shader;
        if (shaderScript.getAttribute("type") == "x-shader/x-fragment") {
            shader = gl.createShader(gl.FRAGMENT_SHADER);
        }
        else if (shaderScript.getAttribute("tyep") == "x-shader/x-vertex") {
            shader = gl.createShader(gl.VERTEX_SHADER);
        }
        else {
            return null;
        }
        gl.shaderSource(shader, theSource);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            alert("An error occurred compiling the shaders: " + gl.getShaderInfoLog(shader));
            return null;
        }
        return shader;
    };
    return WebglTest;
}());
//# sourceMappingURL=WebglTest.js.map