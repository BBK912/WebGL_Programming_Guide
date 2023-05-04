// HelloPoint1.js
// 顶点着色器

var VSHADER_SOURCE =
    'void main () {\n' +
    '   gl_Position = vec4(0.5, 0.5, 0.0, 1.0);\n' +
    '   gl_PointSize = 10.0;\n' +
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

    // 设置画布背景色
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.Points, 0, 1);
}
