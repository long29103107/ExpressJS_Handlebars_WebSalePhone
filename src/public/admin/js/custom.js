var tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]'),
);
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
});

function checkItemCheckboxChecked() {
    let listItemCheckBoxChecked = $('input[name="listCheckbox[]"]:checked');
    let iconDelete = $('#icon-delete');

    if (listItemCheckBoxChecked.length > 0) {
        iconDelete.addClass('active');
    } else {
        iconDelete.removeClass('active');
    }
}

$('#check-all').change(function () {
    let checkAll = $(this).is(':checked');
    let listItemCheckBox = $('input[name="listCheckbox[]"]');

    listItemCheckBox.prop('checked', checkAll);
    checkItemCheckboxChecked();
});

$('input[name="listCheckbox[]"]').change(function () {
    let checkAll = $('#check-all');
    let listItemCheckBox = $('input[name="listCheckbox[]"]');
    let listItemCheckBoxChecked = $('input[name="listCheckbox[]"]:checked');

    let isCheckAll = listItemCheckBox.length == listItemCheckBoxChecked.length;

    checkAll.prop('checked', isCheckAll);
    checkItemCheckboxChecked();

    // console.log($(this).data('id'));
});

$('#icon-delete').click(function () {
    let listCheckboxchecked = $('input[name="listCheckbox[]"]:checked');
    let listId = [];

    $.each(listCheckboxchecked, function (key, value) {
        listId.push($(value).data('id'));
    });

    $('#listId').val(listId);
});

$('#btn-confirm').click(function () {
    $('#form-delete').submit();
});
