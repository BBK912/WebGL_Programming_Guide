// HelloPoint2.js
// 顶点着色器 传递变量

var VSHADER_SOURCE =
    'attribute vec4 a_Position;\n' +
    'attribute float a_PointSize;\n' +
    'void main () {\n' +
    '   gl_Position = a_Position;\n' +
    '   gl_PointSize = a_PointSize;\n' +
    '}\n';

// 片元着色器
var FSHADE_SOURCE =
    'void main () {\n' + 'gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' + '}\n';
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

    // 获取attribute变量的存储位置
    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    if (a_Position < 0) {
        console.log('Failed to get the storage locationnof a_Position');
        return;
    }

    var a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize');

    // 将点的位置传给attribute变量
    gl.vertexAttrib3f(a_Position, 0.0, 0.0, 0.0);
    // 将点的大小传给attribute变量
    gl.vertexAttrib1f(a_PointSize, 20.0);
    // 设置画布背景色
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.Points, 0, 1);
}
