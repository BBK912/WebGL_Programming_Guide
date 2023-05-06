// RotatedTriangle.js
// 顶点着色器 传递变量

var VSHADER_SOURCE =
// x' = x cosb - y sinb
// y' = x sinb + y cosb
// z' = z
    'attribute vec4 a_Position;\n' +
    'uniform float u_CosB, u_SinB; \n' +
    'void main () {\n' +
    'gl_Position.x = a_Position.x * u_CosB - a_Position.y * u_SinB; \n' +
    'gl_Position.y = a_Position.x * u_SinB + a_Position.y * u_CosB; \n' +
    'gl_Position.z = a_Position.z;\n' +
    'gl_Position.w = 1.0;\n' +
    '}\n';

// 片元着色器
var FSHADE_SOURCE =
    'precision mediump float;\n' + // 设置float精度
    'uniform vec4 u_FragColor;\n' +
    'void main () {\n' +
    'gl_FragColor = u_FragColor;\n' +
    '}\n';
    
var ANGLE = 90.0;

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
    var radian = Math.PI * ANGLE / 180.0;
    var cosB = Math.cos(radian);
    var sinB = Math.sin(radian);
    var u_CosB = gl.getUniformLocation(gl.program, 'u_CosB');
    var u_SinB = gl.getUniformLocation(gl.program, 'u_SinB');
    // 获取u_FragColor地址
    var u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
    var n = initVertexBuffers(gl);

    gl.uniform4f(u_FragColor, 1.0, 0.0, 0.0, 1.0);
    gl.uniform1f(u_SinB, sinB);
    gl.uniform1f(u_CosB, cosB);

    // 设置画布背景色
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, n);
}
function initVertexBuffers(gl) {
    var vertexs = new Float32Array([0.0, 0.5, -0.5, -0.5, 0.5, -0.5]);

    var n = 3;

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
