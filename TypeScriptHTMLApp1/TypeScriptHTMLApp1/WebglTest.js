var WebglTest = (function () {
    function WebglTest() {
        this.testVertexCode = '\
    attribute vec3 aVertexPosition;\
    uniform mat4 uPMatrix;\
    void main(void){\
        gl_Position = uPMatrix*uMVMatrix*vec4(aVertexPosition,1.0);\
    }';
        this.testFragmentCode = '\
    void main(void){\
    gl_FragColor=vec4(1.0,1.0,1.0,1.0);\
    }';
        this.canvas = document.getElementById("renderCanvas");
        this.webgl = this.canvas.getContext('experimental-webgl') || this.canvas.getContext('webgl');
    }
    WebglTest.prototype.init = function () {
    };
    WebglTest.prototype.getVertShader = function () {
        if (this.vertShader)
            return this.vertShader;
        var vertShader = this.webgl.createShader(this.webgl.VERTEX_SHADER);
        this.webgl.shaderSource(vertShader, this.testVertexCode);
        this.webgl.compileShader(vertShader);
        return vertShader;
    };
    WebglTest.prototype.getFragShader = function () {
        if (this.fragShader)
            return this.fragShader;
        var fragShader = this.webgl.createShader(this.webgl.FRAGMENT_SHADER);
        this.webgl.shaderSource(fragShader, this.testFragmentCode);
        this.webgl.compileShader(fragShader);
        return fragShader;
    };
    return WebglTest;
}());
//# sourceMappingURL=WebglTest.js.map