// RotatedTriangle_Matrix.js
// 顶点着色器 传递变量

var VSHADER_SOURCE =
    'attribute vec4 a_Position;\n' +
    'uniform mat4 u_xformMatrix; \n' +
    'void main () {\n' +
    'gl_Position =  u_xformMatrix * a_Position ;\n' +
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
    // WebGL 矩阵 列主序
    var xformMatrix = new Float32Array([
        cosB, sinB, 0.0, 0.0,
        -sinB, cosB, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        0.0, 0.0, 0.0, 1.0
    ])
    var u_xformMatrix = gl.getUniformLocation(gl.program, 'u_xformMatrix');
    // 获取u_FragColor地址
    var u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
    var n = initVertexBuffers(gl);

    gl.uniform4f(u_FragColor, 1.0, 0.0, 0.0, 1.0);
    gl.uniformMatrix4fv(u_xformMatrix, false,  xformMatrix);

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
