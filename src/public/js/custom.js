$('input').keydown(function (e) {
    if (this.value.length === 0 && e.which === 32) e.preventDefault();
});
