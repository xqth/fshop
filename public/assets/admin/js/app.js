(function ($) {
    function removeActiveClass() {
        const activeItems = $('.nav-item.dropdown.active');
        activeItems.removeClass('active');
        activeItems.next().removeClass('show');
    }

    function handleLayoutModeChange(clickedElementId) {
        const checked = $('#' + clickedElementId).prop('checked');

        if (checked) {
            if (clickedElementId === 'light-mode-switch') {
                $('html').removeAttr('dir');
                $('#dark-mode-switch, #rtl-mode-switch, #dark-rtl-mode-switch').prop('checked', false);
                $('#bootstrap-style').attr('href', window.location.origin + '/assets/admin/css/bootstrap.min.css');
                $('body').attr('data-layout-mode', 'light');
                $('#app-style').attr('href', window.location.origin + '/assets/admin/css/app.min.css');
            } else if (clickedElementId === 'dark-mode-switch') {
                $('html').removeAttr('dir');
                $('#light-mode-switch, #rtl-mode-switch, #dark-rtl-mode-switch').prop('checked', false);
                $('body').attr('data-layout-mode', 'dark');
            }
            sessionStorage.setItem('is_visited', clickedElementId);
        }
    }

    function handleFullscreenChange() {
        if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement) {
            $('body').removeClass('fullscreen-enable');
        }
    }

    $(document).ready(function () {
        removeActiveClass();

        $('#side-menu').metisMenu();

        $('#vertical-menu-btn').on('click', function (e) {
            e.preventDefault();
            $('body').toggleClass('sidebar-enable');
            if ($(window).width() >= 992) {
                $('body').toggleClass('vertical-collpsed');
            } else {
                $('body').removeClass('vertical-collpsed');
            }
        });

        if ($('#sidebar-menu').length && $('#sidebar-menu .mm-active .active').length) {
            const activeOffset = $('#sidebar-menu .mm-active .active').offset().top;
            if (activeOffset > 300) {
                const scrollTop = activeOffset - 300;
                $('.vertical-menu .simplebar-content-wrapper').animate({ scrollTop }, 'slow');
            }
        }

        $('#sidebar-menu a').each(function () {
            const href = window.location.href.split('?')[0];
            if (href === this.href) {
                $(this).addClass('active'),
                    $(this).parent().addClass('mm-active'),
                    $(this).parent().parent().addClass('mm-show'),
                    $(this).parent().parent().prev().addClass('mm-active'),
                    $(this).parent().parent().parent().addClass('mm-active'),
                    $(this).parent().parent().parent().parent().addClass('mm-show'),
                    $(this).parent().parent().parent().parent().parent().addClass('mm-active');
                return false;
            }
        });

        $('#side-menu li').each(function () {
            const href = $(this).find('ul a').last().attr('href');
            if (href && window.location.href.includes(href)) {
                $(this).addClass('mm-active');
                $(this).find('ul').addClass('mm-show');
            }
        });

        $('.navbar-nav a').each(function () {
            const href = window.location.href;
            if (href === this.href) {
                $(this).addClass('active');
                $(this).parents('li').addClass('active');
                return false;
            }
        });

        $("[data-bs-toggle='fullscreen']").on('click', function (e) {
            e.preventDefault();
            $('body').toggleClass('fullscreen-enable');

            if (document.fullscreenElement) {
                document.exitFullscreen();
            } else if (document.mozFullScreenElement) {
                document.mozCancelFullScreen();
            } else if (document.webkitFullscreenElement) {
                document.webkitCancelFullScreen();
            } else {
                const elem = document.documentElement;
                if (elem.requestFullscreen) {
                    elem.requestFullscreen();
                } else if (elem.mozRequestFullScreen) {
                    elem.mozRequestFullScreen();
                } else if (elem.webkitRequestFullscreen) {
                    elem.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
                }
            }
        });

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
        document.addEventListener('mozfullscreenchange', handleFullscreenChange);

        $('.right-bar-toggle').on('click', function () {
            $('body').toggleClass('right-bar-enabled');
        });

        $(document).on('click', 'body', function (e) {
            const target = $(e.target);
            if (target.closest('.right-bar-toggle, .right-bar').length === 0) {
                $('body').removeClass('right-bar-enabled');
            }
        });

        if (document.getElementById('topnav-menu-content')) {
            const topnavMenuContent = document.getElementById('topnav-menu-content');
            const topnavMenuItems = topnavMenuContent.getElementsByTagName('a');

            for (let i = 0; i < topnavMenuItems.length; i++) {
                topnavMenuItems[i].onclick = function (e) {
                    if (e.target.getAttribute('href') === '#') {
                        e.target.parentElement.classList.toggle('active');
                        e.target.nextElementSibling.classList.toggle('show');
                    }
                };
            }

            window.addEventListener('resize', removeActiveClass);
        }

        $('[data-bs-toggle="tooltip"]').each(function () {
            new bootstrap.Tooltip(this);
        });

        $('[data-bs-toggle="popover"]').each(function () {
            new bootstrap.Popover(this);
        });

        $('.offcanvas').each(function () {
            new bootstrap.Offcanvas(this);
        });

        if (window.sessionStorage) {
            const isVisited = sessionStorage.getItem('is_visited');
            if (isVisited) {
                $('.right-bar input:checkbox').prop('checked', false);
                $('#' + isVisited).prop('checked', true);
                handleLayoutModeChange(isVisited);
            } else if ($('html').attr('dir') === 'rtl' && $('body').attr('data-layout-mode') === 'dark') {
                $('#dark-rtl-mode-switch').prop('checked', true);
                $('#light-mode-switch').prop('checked', false);
                sessionStorage.setItem('is_visited', 'dark-rtl-mode-switch');
                handleLayoutModeChange(isVisited);
            } else if ($('html').attr('dir') === 'rtl') {
                $('#rtl-mode-switch').prop('checked', true);
                $('#light-mode-switch').prop('checked', false);
                sessionStorage.setItem('is_visited', 'rtl-mode-switch');
                handleLayoutModeChange(isVisited);
            } else if ($('body').attr('data-layout-mode') === 'dark') {
                $('#dark-mode-switch').prop('checked', true);
                $('#light-mode-switch').prop('checked', false);
                sessionStorage.setItem('is_visited', 'dark-mode-switch');
                handleLayoutModeChange(isVisited);
            } else {
                sessionStorage.setItem('is_visited', 'light-mode-switch');
            }
        }

        $('#light-mode-switch, #dark-mode-switch, #rtl-mode-switch, #dark-rtl-mode-switch').on('change', function (e) {
            handleLayoutModeChange(e.target.id);
        });

        $('#password-addon').on('click', function () {
            const input = $(this).siblings('input');
            if (input.length > 0) {
                input.attr('type', input.attr('type') === 'password' ? 'text' : 'password');
            }
        });

        $(window).on('load', function () {
            $('#status').fadeOut();
            $('#preloader').delay(350).fadeOut('slow');
        });

        Waves.init();

        $('#check-all').on('change', function () {
            $('.table-check .form-check-input').prop('checked', $(this).prop('checked'));
        });

        $('.table-check .form-check-input').change(function () {
            const checkedCount = $('.table-check .form-check-input:checked').length;
            const totalCount = $('.table-check .form-check-input').length;
            $('#check-all').prop('checked', checkedCount === totalCount);
        });

        $('.btn-delete').click(async function (event) {
            event.preventDefault();
            const result = await Swal.fire({
                title: 'Are you sure you want to do it?',
                text: 'Deleted data cannot be recovered!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes',
                cancelButtonText: 'No',
                customClass: {
                    confirmButton: 'btn btn-success mt-2',
                    cancelButton: 'btn btn-danger ms-2 mt-2'
                },
                buttonsStyling: false
            });
            if (!result.isConfirmed) return;
            try {
                const { status, message } = await $.ajax({
                    url: $(this).attr('href'),
                    type: 'DELETE',
                    dataType: 'json'
                });
                $(this).closest('tr').remove();
                sendToastr(status, message);
            } catch {
                sendToastr('error', 'An error occurred, please try again later!');
            }
        });

        $('.btn-delete-checked').click(async function () {
            const result = await Swal.fire({
                title: 'Are you sure you want to do it?',
                text: 'Deleted data cannot be recovered!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes',
                cancelButtonText: 'No',
                customClass: {
                    confirmButton: 'btn btn-success mt-2',
                    cancelButton: 'btn btn-danger ms-2 mt-2'
                },
                buttonsStyling: false
            });
            if (!result.isConfirmed) return;
            const ajaxPromises = $('table tr .form-check-input:checked')
                .map(function () {
                    const deleteUrl = $(this).closest('tr').find('.btn-delete').attr('href');
                    if (!deleteUrl) return null;
                    return $.ajax({
                        url: deleteUrl,
                        type: 'DELETE',
                        dataType: 'json'
                    }).then(() => $(this).closest('tr').remove());
                })
                .filter((x) => x != null);
            try {
                await Promise.all(ajaxPromises);
                sendToastr('success', 'Successfully deleted!');
            } catch {
                sendToastr('error', 'An error occurred, please try again later!');
            }
        });

        $('.form-request').submit(async function (event) {
            event.preventDefault();
            const $form = $(this);
            try {
                const { status, message } = await $.ajax({
                    url: $form.attr('action'),
                    type: $form.attr('method'),
                    dataType: 'json',
                    data: $form.serialize()
                });
                sendToastr(status, message);
            } catch {
                sendToastr('error', 'An error occurred, please try again later!');
            }
        });
    });
})(jQuery);

toastr.options = {
    closeButton: false,
    debug: false,
    newestOnTop: false,
    progressBar: false,
    positionClass: 'toast-top-right',
    preventDuplicates: false,
    onclick: null,
    showDuration: 300,
    hideDuration: 1000,
    timeOut: 5000,
    extendedTimeOut: 1000,
    showEasing: 'swing',
    hideEasing: 'linear',
    showMethod: 'fadeIn',
    hideMethod: 'fadeOut'
};

function sendToastr(type, message) {
    toastr.remove();
    toastr[type](message);
}
