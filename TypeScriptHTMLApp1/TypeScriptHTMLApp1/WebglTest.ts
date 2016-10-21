class WebglTest
{
    constructor()
    {
        this.canvas = <HTMLCanvasElement>document.getElementById("renderCanvas");
        this.webgl = this.canvas.getContext('experimental-webgl') || this.canvas.getContext('webgl');
    }

    private canvas: HTMLCanvasElement;
    private webgl: WebGLRenderingContext;
    private testVertexCode = '\
    attribute vec3 aVertexPosition;\
    uniform mat4 uPMatrix;\
    void main(void){\
        gl_Position = uPMatrix*uMVMatrix*vec4(aVertexPosition,1.0);\
    }';

    private testFragmentCode = '\
    void main(void){\
    gl_FragColor=vec4(1.0,1.0,1.0,1.0);\
    }';

    public init()
    {
        

    }

    private vertShader: WebGLShader;
    private fragShader: WebGLShader;

    private getVertShader(): WebGLShader
    {
        if (this.vertShader) return this.vertShader;
        var vertShader = this.webgl.createShader(this.webgl.VERTEX_SHADER);
        this.webgl.shaderSource(vertShader, this.testVertexCode);
        this.webgl.compileShader(vertShader);
        return vertShader;
    }

    private getFragShader(): WebGLShader
    {
        if (this.fragShader) return this.fragShader;
        var fragShader = this.webgl.createShader(this.webgl.FRAGMENT_SHADER);
        this.webgl.shaderSource(fragShader, this.testFragmentCode);
        this.webgl.compileShader(fragShader);
        return fragShader;
    }
}