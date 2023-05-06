// HelloQuad.js
// 顶点着色器 传递变量

var VSHADER_SOURCE =
    'attribute vec4 a_Position;\n' +
    'void main () {\n' +
    '   gl_Position = a_Position;\n' +
    '}\n';

// 片元着色器
var FSHADE_SOURCE =
    'precision mediump float;\n' + // 设置float精度
    'uniform vec4 u_FragColor;\n' +
    'void main () {\n' +
    'gl_FragColor = u_FragColor;\n' +
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


    // 获取u_FragColor地址
    var u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');

    var n = initVertexBuffers(gl);

    gl.uniform4f(u_FragColor, 1.0, 0.0, 0.0, 1.0);
    // 设置画布背景色
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, n);
}
function initVertexBuffers(gl) {
    var vertexs = new Float32Array([-0.5, 0.5, -0.5, -0.5, 0.5, 0.5, 0.5, -0.5]);

    var n = 4;

    // 创建缓冲区对象
    var vertexBuffer = gl.createBuffer();

    if (!vertexBuffer) {
        console.log('Failed to create the buffer object');
        return -1;
    }

    // 绑定缓冲区
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

    // 向缓冲区写入数据
    gl.bufferData(gl.ARRAY_BUFFER, vertexs, gl.STATIC_DRAW);


    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    // 将缓冲区对象分配给 attribute 变量 
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
    // 开启 attribute 变量
    gl.enableVertexAttribArray(a_Position);

    return n;
}
