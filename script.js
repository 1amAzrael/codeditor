const htmlInput = CodeMirror.fromTextArea(document.getElementById('html-input'), {
  mode: 'htmlmixed', // Set mode to 'htmlmixed' for HTML syntax highlighting
  lineNumbers: true,
  theme: 'dracula',
  lineWrapping: true // Enable line wrapping
});

const cssInput = CodeMirror.fromTextArea(document.getElementById('css-input'), {
  mode: 'css',
  lineNumbers: true,
  theme: 'dracula',
  lineWrapping: true // Enable line wrapping
});

const jsInput = CodeMirror.fromTextArea(document.getElementById('js-input'), {
  mode: 'javascript',
  lineNumbers: true,
  theme: 'dracula',
  lineWrapping: true // Enable line wrapping
});

// Set font size for all CodeMirror instances
document.querySelectorAll('.CodeMirror').forEach(cm => {
  cm.style.fontSize = '25px';
});

// Set initial dimensions for CodeMirror instances
htmlInput.setSize('50%', '100vh');
cssInput.setSize('50%', '100vh');
jsInput.setSize('50%', '100vh');

const previewFrame = document.getElementById('preview');
let ht = document.getElementById('ht');
let cs = document.getElementById('cs');
let js = document.getElementById('js');

function showEditor(editor) {
  if (editor === 'html') {
    htmlInput.getWrapperElement().style.display = 'block';
    cssInput.getWrapperElement().style.display = 'none';
    jsInput.getWrapperElement().style.display = 'none';
    cs.style.display = 'none';
    js.style.display = 'none';
    ht.style.display = 'block';
  } else if (editor === 'css') {
    htmlInput.getWrapperElement().style.display = 'none';
    cssInput.getWrapperElement().style.display = 'block';
    jsInput.getWrapperElement().style.display = 'none';
    ht.style.display = 'none';
    js.style.display = 'none';
    cs.style.display = 'block';
  } else if (editor === 'js') {
    htmlInput.getWrapperElement().style.display = 'none';
    cssInput.getWrapperElement().style.display = 'none';
    jsInput.getWrapperElement().style.display = 'block';
    cs.style.display = 'none';
    ht.style.display = 'none';
    js.style.display = 'block';
  }
}

function updatePreview() {
  const htmlCode = htmlInput.getValue();
  const cssCode = `<style>${cssInput.getValue()}</style>`;
  const jsCode = `
    <script>
      document.addEventListener("DOMContentLoaded", function() {
        ${jsInput.getValue()}
      });
    </script>
  `;
  const combinedCode = `${htmlCode}${cssCode}${jsCode}`;
  const previewDoc = previewFrame.contentDocument || previewFrame.contentWindow.document;
  previewDoc.open();
  previewDoc.write(combinedCode);
  previewDoc.close();
}

htmlInput.on('change', updatePreview);
cssInput.on('change', updatePreview);
jsInput.on('change', updatePreview);

// Initial update to show HTML editor
showEditor('html');
// Initial update of preview
updatePreview();
