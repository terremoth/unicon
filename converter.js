let originalFileName = 'image';

document.addEventListener('DOMContentLoaded', _ => {

    document.getElementById("image").addEventListener('change', evt => {
        const input = evt.target;
        const file = input.files[0];
        if (!file) return;

        originalFileName = file.name.replace(/\.[^/.]+$/, '');

        const canvas = document.getElementById('canvas');
        const context = canvas.getContext("2d");

        const img = new Image();
        
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            context.drawImage(img, 0, 0);
        };

        img.src = URL.createObjectURL(file);
    });
    
    document.getElementById('export').addEventListener('click', () => {
        const format = document.getElementById('format').value;
        export_as_format(format);
    });
});

function apply_filter() {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    ctx.filter = "contrast(1.4) sepia(1) drop-shadow(-9px 9px 3px #e81)";
    ctx.drawImage(canvas, 0, 0);

}


function export_as_format(format) {
    const canvas = document.getElementById('canvas');

    canvas.toBlob((blob) => {
        if (!blob) return;

        const fileName = `${originalFileName}_exported.${format}`;

        const file = new File([blob], fileName, {
            type: 'image/' + format
        });

        const url = URL.createObjectURL(file);

        const a = document.createElement('a');
        a.href = url;
        a.download = file.name;
        a.click();

        URL.revokeObjectURL(url);
    }, 'image/' + format, 0.75);
}

