const renderPaginations = (totalPages, currentPage, url) => {
    const urlParts = new URL(url);
    const queryParameters = new URLSearchParams(urlParts.search);
    queryParameters.set('page', '');
    const newQueryString = queryParameters.toString();
    const pageUrl = urlParts.origin + urlParts.pathname + '?' + newQueryString;

    let pagination = '<ul class="pagination pagination-rounded justify-content-end mb-2">';
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(startPage + 4, totalPages);

    if (currentPage > 1) {
        pagination += `<li class="page-item"><a class="page-link" href="${pageUrl}${
            currentPage - 1
        }" aria-label="Previous"><i class="mdi mdi-chevron-left"></i></a></li>`;
    } else {
        pagination += `<li class="page-item disabled"><a class="page-link" href="${pageUrl}${
            currentPage - 1
        }" aria-label="Previous"><i class="mdi mdi-chevron-left"></i></a></li>`;
    }

    for (let i = startPage; i <= endPage; i++) {
        if (i === currentPage) {
            pagination += `<li class="page-item active"><a class="page-link" href="${pageUrl}${i}">${i}</a></li>`;
        } else {
            pagination += `<li class="page-item"><a class="page-link" href="${pageUrl}${i}">${i}</a></li>`;
        }
    }

    if (currentPage < totalPages) {
        pagination += `<li class="page-item"><a class="page-link" href="${pageUrl}${
            currentPage + 1
        }" aria-label="Next"><i class="mdi mdi-chevron-right"></i></a></li>`;
    } else {
        pagination += `<li class="page-item disabled"><a class="page-link" href="${pageUrl}${
            currentPage + 1
        }" aria-label="Next"><i class="mdi mdi-chevron-right"></i></a></li>`;
    }

    pagination += '</ul';
    return pagination;
};

export default renderPaginations;
