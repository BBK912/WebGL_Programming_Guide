// TexturedQuad.js
// 顶点着色器 传递变量

var VSHADER_SOURCE =
    'attribute vec4 a_Position;\n' +
    'attribute vec2 a_TexCoord;\n' +
    'varying vec2 v_TexCoord;\n' +
    'void main () {\n' +
    '   gl_Position = a_Position;\n' +
    '   v_TexCoord = a_TexCoord;\n' +
    '}\n';

// 片元着色器
var FSHADE_SOURCE =
    'precision mediump float;\n' + // 设置float精度
    'uniform sampler2D u_Sampler;\n' +
    'varying vec2 v_TexCoord;\n' +
    'void main () {\n' +
    ' gl_FragColor = texture2D(u_Sampler, v_TexCoord);\n' +
    '}\n';
function main() {
    // 获取<canvas> 元素
    var canvas = document.getElementById('webgl');

    gl = getWebGLContext(canvas);
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
    if (!initTextures(gl, n)) {
        console.log('Fail to initialize Texture.');
        return;
    }

}
function initVertexBuffers(gl) {
    var verticesTexCoords = new Float32Array([
        -0.5, 0.5, 0.0, 1.0,
        -0.5, -0.5, 0.0, 0.0,
        0.5, 0.5, 1.0, 1.0,
        0.5, -0.5, 1.0, 0.0]);

    var n = 4;
    var FSIZE = verticesTexCoords.BYTES_PER_ELEMENT;

    // 创建缓冲区对象
    var vertexTexCoordBuffer = gl.createBuffer();
    if (!vertexTexCoordBuffer) {
        console.log('Failed to create the buffer object');
        return -1;
    }

    // 绑定缓冲区
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexTexCoordBuffer);

    // 向缓冲区写入数据
    gl.bufferData(gl.ARRAY_BUFFER, verticesTexCoords, gl.STATIC_DRAW);


    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    // 将缓冲区对象分配给 attribute 变量 
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE * 4, 0);
    // 开启 attribute 变量
    gl.enableVertexAttribArray(a_Position);

    var a_TexCoord = gl.getAttribLocation(gl.program, 'a_TexCoord');

    gl.vertexAttribPointer(a_TexCoord, 2, gl.FLOAT, false, FSIZE * 4, FSIZE * 2);
    gl.enableVertexAttribArray(a_TexCoord)
    return n;
}

function initTextures(gl, n) {
    // 创建纹理对象
    var texture = gl.createTexture();

    var u_Sampler = gl.getUniformLocation(gl.program, 'u_Sampler');
    var image = new Image();

    image.onload = function () {
        loadTexture(gl, n, texture, u_Sampler, image)
    }
    image.src = '../resources/sky.jpg';
    return true;
}

function loadTexture(gl, n, texture, u_Sampler, image) {
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);

    gl.uniform1i(u_Sampler, 0);

    // 设置画布背景色
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, n)
}