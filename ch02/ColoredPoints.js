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

    // 获取attribute变量的存储位置
    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    if (a_Position < 0) {
        console.log('Failed to get the storage locationnof a_Position');
        return;
    }

    var a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize');

    // 获取u_FragColor地址
    var u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
    // 注册鼠标点击事件
    canvas.onmousedown = function (ev) {
        click(ev, gl, canvas, a_Position, u_FragColor);
    };

    // 将点的位置传给attribute变量
    gl.vertexAttrib3f(a_Position, 0.0, 0.0, 0.0);
    // 将点的大小传给attribute变量
    gl.vertexAttrib1f(a_PointSize, 5.0);
    // 设置画布背景色
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
}
var g_points = []; // 鼠标点击位置数组
var g_colors = []; // 存储点的颜色
function click(ev, gl, canvas, a_Position, u_FragColor) {
    var x = ev.clientX;
    var y = ev.clientY;
    var rect = ev.target.getBoundingClientRect();
    // 坐标转换 书中源码有误
    x = (x - rect.left - canvas.width / 2) / (canvas.width / 2);
    y = (canvas.height / 2 - (y - rect.top)) / (canvas.height / 2);

    g_points.push([x, y]);

    if (x >= 0.0 && y >= 0.0) {
        g_colors.push([1.0, 0.0, 0.0, 1.0]); // 红色
    } else if (x < 0 && y < 0) {
        g_colors.push([0.0, 1.0, 0.0, 1.0]); // 绿色
    } else {
        g_colors.push([1.0, 1.0, 1.0, 1.0]); //白色
    }

    gl.clear(gl.COLOR_BUFFER_BIT);
    var len = g_points.length;
    for (var i = 0; i < len; i++) {
        var xy = g_points[i];
        var rgba = g_colors[i];
        gl.vertexAttrib3f(a_Position, xy[0], xy[1], 0);
        gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
        gl.drawArrays(gl.Points, 0, 1);
    }
}
