import $ from 'jquery/dist/jquery';

export function get(url, data) {
    return $.get({
        url: url,
        data: data
    });
}

export function post(url, data) {
    return $.post({
        url: url,
        data: JSON.stringify(data),
        contentType: 'application/json'
    });
}