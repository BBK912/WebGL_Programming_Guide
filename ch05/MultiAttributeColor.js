// MultiAttributeColor.js
// 顶点着色器 传递变量

var VSHADER_SOURCE =
    'attribute vec4 a_Position;\n' +
    'attribute vec4 a_Color;\n' +
    'varying vec4 v_Color; \n' +
    'void main () {\n' +
    '   gl_Position = a_Position;\n' +
    '   gl_PointSize = 10.0;\n' +
    '   v_Color = a_Color; \n' +
    '}\n';

// 片元着色器
var FSHADE_SOURCE =
    'precision mediump float;\n' + // 设置float精度
    'varying vec4 v_Color;\n' +
    'void main () {\n' +
    'gl_FragColor = v_Color;\n' +
    '}\n';
function main() {
    // 获取<canvas> 元素
    var canvas = document.getElementById('webgl');

    var gl = getWebGLContext(canvas);
    if (!gl) {
        console.log('Fail to get the rendering context for WebGL');
        return;
    }
    // 初始化着色器
    if (!initShaders(gl, VSHADER_SOURCE, FSHADE_SOURCE)) {
        console.log('Fail to initialize shaders.');
        return;
    }

    var n = initVertexBuffers(gl);
    // 设置画布背景色
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, n);
}
function initVertexBuffers(gl) {
    var verticesColors = new Float32Array([
        0.0, 0.5, 1.0, 0.0, 0.0,
        -0.5, -0.5, 0.0, 1.0, 0.0,
        0.5, -0.5, 0.0, 0.0, 1.0]);

    var n = 3;
    var FSIZE = verticesColors.BYTES_PER_ELEMENT;

    // 创建缓冲区对象
    var vertexColorBuffer = gl.createBuffer();
    if (!vertexColorBuffer) {
        console.log('Failed to create the buffer object');
        return -1;
    }

    // 绑定缓冲区
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBuffer);

    // 向缓冲区写入数据
    gl.bufferData(gl.ARRAY_BUFFER, verticesColors, gl.STATIC_DRAW);


    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    // 将缓冲区对象分配给 attribute 变量 
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE * 5, 0);
    // 开启 attribute 变量
    gl.enableVertexAttribArray(a_Position);

    var a_Color = gl.getAttribLocation(gl.program, 'a_Color');
    gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, FSIZE * 5, FSIZE * 2);
    gl.enableVertexAttribArray(a_Color)
    return n;
}
