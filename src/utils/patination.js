module.exports = {
    getPageCount: (itemCount, limit) => {
        return Math.ceil(itemCount / limit);
    },
    getPageItem: (currentPage, pageCount, req = null) => {
        const pageItem = [];
        let previousHref = '',
            nextHref = '';
        const { page, ...rest } = req;
        let newPageItem;
        const newPage = parseInt(page ?? 1);

        if (req != null && Object.keys(rest).length === 0) {
            for (let i = 0; i < pageCount; i++) {
                let item = {
                    index: i + 1,
                    pageHref: `?page=${i + 1}`,
                    active: i + 1 == currentPage,
                };
                pageItem.push(item);
            }

            previousHref = `?page=${parseInt(currentPage) - 1}`;
            nextHref = `?page=${parseInt(currentPage) + 1}`;
        } else {
            let param = '';
            let index = 0;

            for (let item in rest) {
                if (index == 0) {
                    param += item + '=' + rest[item];
                } else {
                    param += item + '=' + rest[item] + '&';
                }
                index++;
            }

            for (let i = 0; i < pageCount; i++) {
                let item = {
                    index: i + 1,
                    pageHref: `?page=${i + 1}&${param}`,
                    active: i + 1 == currentPage,
                };
                pageItem.push(item);
            }

            previousHref = `?page=${parseInt(currentPage) - 1}&${param}`;
            nextHref = `?page=${parseInt(currentPage) + 1}&${param}`;
        }

        if (pageCount > 5) {
            if (newPage < 4) {
                newPageItem = pageItem.filter((item) => item.index < 6); // 5 item + 1
            }
            if (newPage >= 4 && newPage < pageCount - 3) {
                newPageItem = pageItem.filter(
                    (item) =>
                        item.index > newPage - 3 && item.index < newPage + 3,
                );
            }
            if (newPage >= pageCount - 3) {
                newPageItem = pageItem.filter(
                    (item) => item.index > pageCount - 5,
                );
            }
        }

        return {
            pageItem: newPageItem ?? pageItem,
            previousHref: previousHref,
            nextHref: nextHref,
        };
    },
};
